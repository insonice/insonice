import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schemas";
import { getCloudflareContext } from "@opennextjs/cloudflare";

let db: DrizzleD1Database<typeof schema>;

export function getDb() {
  const { env } = getCloudflareContext();
  console.log(env.DATABASE);
  if (!db) {
    console.log("initializing db");
    db = drizzle(env.DATABASE, { schema, logger: true });
  }
  return db;
}
