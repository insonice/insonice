import { drizzle } from "drizzle-orm/d1";
import { getRequestContext } from '@cloudflare/next-on-pages';

// @ts-ignore
export const db = drizzle(globalThis.env.DATABASE as any);

function initDbConnection() {
  if (process.env.NODE_ENV === 'development') {
    const { env } = getRequestContext();

    return drizzle(env.DB, { schema });
  }

  return drizzle(process.env.DB as unknown as D1Database, { schema });
}