import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { connectionStr } from "./config";
import * as auth from "./schema/auth";
import * as post from "./schema/post";

export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/pg-core";

export { getTableColumns } from 'drizzle-orm'
export const schema = { ...auth, ...post };

const psClient = new Pool({
  connectionString: connectionStr.href,
  log: console.log,
});

export const db = drizzle(psClient, { schema, logger: true });
