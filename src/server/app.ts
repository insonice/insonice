import { Hono } from "hono";
import { cors } from "hono/cors";
import type { BlankEnv, BlankSchema } from "hono/types";

/**
 * Create a server with a prefix
 * @param prefix The prefix of the server
 * @returns The server
 */
export function createServer<Prefix extends string>(prefix: Prefix) {
  // Create the app
  const app = new Hono().basePath(prefix);

  // Middleware
  app.use("*", cors());

  // Routes
  app.get("/ping", async c => c.text("pong", 200));

  return app as Hono<BlankEnv, BlankSchema, Prefix>;
}
