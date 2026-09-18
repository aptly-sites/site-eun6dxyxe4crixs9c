#!/usr/bin/env node
/**
 * One-off script to upload a single untracked file to GitHub via the Git Tree API.
 * Usage: REMOTE_PATH=<repo-relative-path> LOCAL_PATH=<local-path> node scripts/upload-single-file.mjs
 */
import { readFileSync } from 'fs';

const OWNER  = 'EquityTeam';
const REPO   = 'ET-Replit';
const BRANCH = 'main';
const TOKEN  = process.env.GITHUB_PAT;
const API    = 'https://api.github.com';

const REMOTE_PATH = process.env.REMOTE_PATH;
const LOCAL_PATH  = process.env.LOCAL_PATH;

if (!TOKEN) { console.error('ERROR: GITHUB_PAT not set'); process.exit(1); }
if (!REMOTE_PATH || !LOCAL_PATH) { console.error('ERROR: REMOTE_PATH and LOCAL_PATH required'); process.exit(1); }

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
  'User-Agent': 'EquityTeam-Replit-Push/1.0',
};

async function api(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method, headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${await res.text()}`);
  if (res.status === 204) return null;
  return res.json();
}

const buf = readFileSync(LOCAL_PATH);
console.log(`Uploading ${LOCAL_PATH} (${Math.round(buf.length/1024)}KB) → ${REMOTE_PATH}`);

const blob = await api('POST', `/repos/${OWNER}/${REPO}/git/blobs`, {
  content: buf.toString('base64'),
  encoding: 'base64',
});
console.log('Blob SHA:', blob.sha);

const head = await api('GET', `/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
const headSha = head.object.sha;

const tree = await api('POST', `/repos/${OWNER}/${REPO}/git/trees`, {
  base_tree: headSha,
  tree: [{ path: REMOTE_PATH, mode: '100644', type: 'blob', sha: blob.sha }],
});

const commit = await api('POST', `/repos/${OWNER}/${REPO}/git/commits`, {
  message: `Add hero image: ${REMOTE_PATH}`,
  tree: tree.sha,
  parents: [headSha],
});

await api('PATCH', `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
  sha: commit.sha,
});

console.log('Done! Commit:', commit.sha);
