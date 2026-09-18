#!/usr/bin/env node
/**
 * push-to-github.mjs
 *
 * Full mirror sync of this Replit workspace to EquityTeam/ET-Replit on GitHub
 * using the GitHub REST Git Tree API — no local `git push` required.
 *
 * File discovery:
 *   Uses `git ls-files` (with GIT_DISCOVERY_ACROSS_FILESYSTEM=1) to get the
 *   exact set of git-tracked files — the same list git would push.
 *
 * Deletion handling:
 *   Fetches the current remote blob tree, diffs against tracked local files,
 *   and sends sha:null tree entries for any remote blob no longer tracked
 *   locally — keeping the remote repo in true sync even when files are deleted.
 *
 * Usage:
 *   node scripts/push-to-github.mjs
 *   (or click the "Push to GitHub" workflow button in Replit)
 *
 * Required secret: GITHUB_PAT  (set in Replit Secrets tab)
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { createHash } from 'crypto';
import { join, relative } from 'path';

const OWNER  = 'EquityTeam';
const REPO   = 'ET-Replit';
const BRANCH = 'main';
const TOKEN  = process.env.GITHUB_PAT;
const API    = 'https://api.github.com';
const ROOT   = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

if (!TOKEN) {
  console.error('ERROR: GITHUB_PAT secret is not set.');
  console.error('       Add it in the Replit Secrets tab, then re-run.');
  process.exit(1);
}

const apiHeaders = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
  'User-Agent': 'EquityTeam-Replit-Push/1.0',
};

async function api(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: apiHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${method} ${path} → ${res.status}: ${text}`);
  }
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return null;
  }
  return res.json();
}

function getTrackedFiles() {
  const buf = execSync('git ls-files -z', {
    cwd: ROOT,
    env: { ...process.env, GIT_DISCOVERY_ACROSS_FILESYSTEM: '1' },
  });
  const paths = buf.toString('utf8').split('\0').filter(Boolean);
  if (paths.length === 0) {
    throw new Error('git ls-files returned no files — is the workspace tracked by git?');
  }
  // Also include any local files in the heroes directory that aren't git-tracked yet
  // (images uploaded via upload-single-file.mjs land here and bypass git add).
  const heroesDir = join(ROOT, 'artifacts/et-website-v1/public/images/locations/heroes');
  if (existsSync(heroesDir)) {
    const heroFiles = readdirSync(heroesDir)
      .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
      .map(f => relative(ROOT, join(heroesDir, f)));
    for (const p of heroFiles) {
      if (!paths.includes(p)) paths.push(p);
    }
  }
  // Include untracked-but-not-ignored files too (e.g. new source files that
  // haven't been `git add`ed). This mirrors what a normal commit would capture
  // and prevents new modules from being silently dropped from the push.
  const seen = new Set(paths);
  const othersBuf = execSync('git ls-files --others --exclude-standard -z', {
    cwd: ROOT,
    env: { ...process.env, GIT_DISCOVERY_ACROSS_FILESYSTEM: '1' },
  });
  for (const p of othersBuf.toString('utf8').split('\0').filter(Boolean)) {
    if (!seen.has(p)) {
      paths.push(p);
      seen.add(p);
    }
  }
  return paths;
}

function isBinary(buf) {
  for (let i = 0; i < Math.min(buf.length, 512); i++) {
    if (buf[i] === 0) return true;
  }
  return false;
}

async function createBlob(repoPath, buf) {
  if (isBinary(buf)) {
    const data = await api('POST', `/repos/${OWNER}/${REPO}/git/blobs`, {
      content: buf.toString('base64'),
      encoding: 'base64',
    });
    return data.sha;
  } else {
    const data = await api('POST', `/repos/${OWNER}/${REPO}/git/blobs`, {
      content: buf.toString('utf8'),
      encoding: 'utf-8',
    });
    return data.sha;
  }
}

async function getRemoteBlobs(treeSha) {
  const data = await api(
    'GET',
    `/repos/${OWNER}/${REPO}/git/trees/${treeSha}?recursive=1`,
  );
  if (data.truncated) {
    console.warn('  WARNING: remote tree response was truncated — very large repos may need pagination.');
  }
  const map = new Map();
  for (const item of data.tree) {
    if (item.type === 'blob') map.set(item.path, item.sha);
  }
  return map;
}

function gitBlobSha(buf) {
  const header = Buffer.from(`blob ${buf.length}\0`);
  const hash = createHash('sha1');
  hash.update(header);
  hash.update(buf);
  return hash.digest('hex');
}

function runBuildCheck() {
  console.log('\n==> Build check: compiling @workspace/et-website-v1...\n');
  try {
    execSync('pnpm --filter @workspace/et-website-v1 build', {
      cwd: ROOT,
      stdio: 'inherit',
    });
    console.log('\n    Build succeeded.\n');
  } catch {
    console.error('\nERROR: Build failed — fix the errors above before pushing to GitHub.');
    process.exit(1);
  }
}

async function main() {
  if (process.env.SKIP_BUILD !== '1') runBuildCheck();

  console.log(`\n==> Discovering tracked files via git ls-files...\n`);

  const trackedPaths = getTrackedFiles();
  const trackedSet = new Set(trackedPaths);
  console.log(`    ${trackedPaths.length} tracked files found locally.\n`);

  console.log('==> Fetching current HEAD commit from GitHub...');
  const refData = await api('GET', `/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
  const baseSha = refData.object.sha;
  console.log(`    HEAD: ${baseSha}\n`);

  const commitData = await api('GET', `/repos/${OWNER}/${REPO}/git/commits/${baseSha}`);
  const baseTreeSha = commitData.tree.sha;

  console.log('==> Fetching remote tree to diff against local files...');
  const remoteBlobs = await getRemoteBlobs(baseTreeSha);
  console.log(`    ${remoteBlobs.size} blobs in remote tree.\n`);

  console.log('==> Computing diff (comparing local content hashes to remote)...\n');
  const addedPaths    = [];
  const modifiedPaths = [];
  const unchangedPaths = [];
  const fileBuffers   = new Map();

  for (const repoPath of trackedPaths) {
    const absPath = `${ROOT}/${repoPath}`;
    if (!existsSync(absPath)) {
      console.warn(`  WARN: tracked file missing on disk, skipping: ${repoPath}`);
      continue;
    }
    let buf;
    try {
      buf = readFileSync(absPath);
    } catch (err) {
      throw new Error(`Failed to read tracked file ${repoPath}: ${err.message}`);
    }
    fileBuffers.set(repoPath, buf);
    const localSha = gitBlobSha(buf);
    const remoteSha = remoteBlobs.get(repoPath);
    if (!remoteSha) {
      addedPaths.push(repoPath);
    } else if (localSha !== remoteSha) {
      modifiedPaths.push(repoPath);
    } else {
      unchangedPaths.push(repoPath);
    }
  }

  const deletedPaths = [...remoteBlobs.keys()].filter(p => !trackedSet.has(p));

  const changedCount = addedPaths.length + modifiedPaths.length + deletedPaths.length;
  console.log(`==> Change summary: ${changedCount} file(s) changed, ${addedPaths.length} added, ${modifiedPaths.length} modified, ${deletedPaths.length} deleted (${unchangedPaths.length} unchanged, skipped)\n`);

  if (addedPaths.length > 0) {
    console.log(`    Added (${addedPaths.length}):`);
    for (const p of addedPaths) console.log(`      + ${p}`);
    console.log('');
  }
  if (modifiedPaths.length > 0) {
    console.log(`    Modified (${modifiedPaths.length}):`);
    for (const p of modifiedPaths) console.log(`      M ${p}`);
    console.log('');
  }
  if (deletedPaths.length > 0) {
    console.log(`    Deleted (${deletedPaths.length}):`);
    for (const p of deletedPaths) console.log(`      - ${p}`);
    console.log('');
  }

  if (changedCount === 0) {
    console.log('Nothing to push — remote is already up to date.');
    return;
  }

  console.log('==> Uploading blobs for changed files...\n');
  const treeItems = [];
  let done = 0;
  const pathsToUpload = [...addedPaths, ...modifiedPaths];

  for (const repoPath of pathsToUpload) {
    const buf = fileBuffers.get(repoPath);
    const sha = await createBlob(repoPath, buf);
    treeItems.push({ path: repoPath, mode: '100644', type: 'blob', sha });
    done++;
    if (done % 20 === 0 || done === pathsToUpload.length) {
      process.stdout.write(`    ${done}/${pathsToUpload.length} blobs uploaded\r`);
    }
  }
  if (pathsToUpload.length > 0) console.log('\n');

  for (const repoPath of deletedPaths) {
    treeItems.push({ path: repoPath, mode: '100644', type: 'blob', sha: null });
  }

  console.log('==> Creating new Git tree...');
  const newTree = await api('POST', `/repos/${OWNER}/${REPO}/git/trees`, {
    base_tree: baseTreeSha,
    tree: treeItems,
  });
  console.log(`    Tree SHA: ${newTree.sha}\n`);

  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  const summary = `${done} files synced${deletedPaths.length ? `, ${deletedPaths.length} deleted` : ''}`;
  const message = `Sync from Replit — ${timestamp}\n\n${summary}`;

  console.log('==> Creating commit...');
  const newCommit = await api('POST', `/repos/${OWNER}/${REPO}/git/commits`, {
    message,
    tree: newTree.sha,
    parents: [baseSha],
    author: {
      name: 'mctcincy',
      email: 'mark@equityteam.com',
      date: new Date().toISOString(),
    },
  });
  console.log(`    Commit: ${newCommit.sha}\n`);

  console.log('==> Updating branch ref...');
  await api('PATCH', `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    sha: newCommit.sha,
    force: false,
  });

  console.log(`\nDone! ${done} file(s) uploaded${deletedPaths.length ? `, ${deletedPaths.length} deleted` : ''}, ${unchangedPaths.length} unchanged.\n`);
  console.log(`    Commit:  https://github.com/${OWNER}/${REPO}/commit/${newCommit.sha}`);
  console.log(`    Vercel:  https://vercel.com/equityteam (auto-deploys via GitHub integration)\n`);
}

main().catch(err => {
  console.error('\nERROR:', err.message);
  process.exit(1);
});
