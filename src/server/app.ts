import { Hono } from "hono";
import { cors } from "hono/cors";

export const createServer = (prefix: string) => {
  const app = new Hono().basePath(prefix);
  app.use("*", cors());
  return app;
};
