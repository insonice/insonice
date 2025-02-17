import type { D1Database } from '@cloudflare/workers-types';

declare global {
  interface CloudflareEnv {
    NODE_ENV: "development" | "production";
    DATABASE: D1Database;
  }
}