import { drizzle } from "drizzle-orm/d1";

// @ts-ignore
export const db = drizzle(env.DATABASE as any);
