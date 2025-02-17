import { handle } from "hono/vercel";
import { Hono } from "hono";
import { cors } from "hono/cors";

export const runtime = "nodejs";

const app = new Hono().basePath("/api/v1");

app.use("*", cors());

const route = app.get("/ping", async c => c.text("pong", 200));

type AppType = typeof route;
const GET = handle(app);
const POST = handle(app);

export { GET, POST, type AppType };
