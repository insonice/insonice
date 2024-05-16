import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger as createLogger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { timing } from "hono/timing";
import { db } from "@insonice/db";
import { logger } from "@insonice/logger";
// import { handle } from "hono/vercel";
import { type PageConfig } from "next";
import { handle } from "@hono/node-server/vercel";

const app = new Hono().basePath("/api/v1");

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

app
  .use(createLogger())
  .use(prettyJSON())
  .use(timing())
  .use(
    "*",
    cors({
      credentials: true,
      origin: (p) => p,
    }),
  );

function isBunRuntime() {
  return process.versions?.bun || process.env.BUN_INSTALL;
}

const users = new Hono();

users.get("", async (c) => {
  const res = await db.query.posts.findMany();
  console.log(res);
  return c.json({
    users: res,
  });
});

app.route("users", users);

app.get("/", (c) => {
  if (isBunRuntime()) {
    console.log("Running in Bun runtime");
  } else {
    console.log("Not running in Bun runtime");
  }
  logger.info("Hello, World!");

  return c.json({
    message: "Hello, World!",
  });
});

const handler = handle(app);

// export const GET = handler;
// export const POST = handler;
// export const PUT = handler;
// export const DELETE = handler;
// export const PATCH = handler;
// export const OPTIONS = handler;
// export const HEAD = handler;
export default handler;
