import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const blogViewsTable = pgTable("blog_views", {
  slug: text("slug").primaryKey(),
  count: integer("count").notNull().default(0),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export type BlogView = typeof blogViewsTable.$inferSelect;
