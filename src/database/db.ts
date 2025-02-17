import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schemas";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getDb() {
  const { env } = getCloudflareContext();
  console.log(env.DATABASE);
  return drizzle(env.DATABASE, { schema, logger: true });
}
