import app from "@/server/server";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

export const GET = handle(app);
export const POST = handle(app);
