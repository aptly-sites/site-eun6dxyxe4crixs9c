import { Router } from "express";
import { sql, eq } from "drizzle-orm";
import { db, blogViewsTable } from "@workspace/db";
import { logger } from "../lib/logger";

const router = Router();

const BOT_UA = /googlebot|bingbot|yandexbot|baiduspider|facebookexternalhit|twitterbot|linkedinbot|applebot|whatsapp|slackbot|redditbot|embedly|showyoubot|outbrain|pinterest|skypeuripreview|quora|discourse|qwantify|prerender|sogou|exabot|ia_archiver|gptbot|claudebot|perplexitybot|anthropic-ai|ccbot|chatgpt|cohere-ai|dataforseobot|dotbot|duckduckbot|grapeshotcrawler|heritrix|httrack|mj12bot|msnbot|nutch|petalbot|semrushbot|siteauditbot|spbot|velenpublicwebcrawler|wget|yisouspider|screaming frog|ahrefsbot|rogerbot/i;

router.post("/blog-views/:slug", async (req, res) => {
  const { slug } = req.params as { slug: string };
  const ua = (req.headers["user-agent"] as string) ?? "";

  if (BOT_UA.test(ua)) {
    const [row] = await db.select().from(blogViewsTable).where(eq(blogViewsTable.slug, slug));
    res.json({ count: row?.count ?? 0, incremented: false });
    return;
  }

  const [updated] = await db
    .insert(blogViewsTable)
    .values({ slug, count: 1 })
    .onConflictDoUpdate({
      target: blogViewsTable.slug,
      set: {
        count: sql`${blogViewsTable.count} + 1`,
        lastUpdated: sql`now()`,
      },
    })
    .returning();

  logger.info({ slug, count: updated.count }, "Blog view recorded");
  res.json({ count: updated.count, incremented: true });
});

router.get("/blog-views/:slug", async (req, res) => {
  const { slug } = req.params as { slug: string };
  const [row] = await db.select().from(blogViewsTable).where(eq(blogViewsTable.slug, slug));
  res.json({ count: row?.count ?? 0 });
});

export default router;
