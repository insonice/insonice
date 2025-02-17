import { handle } from "hono/vercel";
import { createServer } from "@/server/app";
export const runtime = "nodejs";

const prefix = "/api/v1";

const app = createServer(prefix);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;
