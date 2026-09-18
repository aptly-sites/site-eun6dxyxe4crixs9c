import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const formSubmissionsTable = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  formType: text("form_type").notNull(),
  data: jsonb("data").notNull(),
  emailStatus: text("email_status").notNull().default("pending"),
  emailError: text("email_error"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFormSubmissionSchema = createInsertSchema(formSubmissionsTable).omit({ id: true, createdAt: true });
export type InsertFormSubmission = Omit<typeof formSubmissionsTable.$inferInsert, "id" | "createdAt">;
export type FormSubmission = typeof formSubmissionsTable.$inferSelect;
