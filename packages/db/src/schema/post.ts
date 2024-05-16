import { sql } from "drizzle-orm";
import { serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgSqlTable } from "./_table";
import { users } from "./auth";

export const posts = pgSqlTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  createdById: varchar("createdById", { length: 255 })
    .notNull()
    .references(() => users.id),
  content: varchar("content", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
