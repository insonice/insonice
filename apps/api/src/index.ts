import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { timing } from "hono/timing";
import { db } from "@insonice/db";

const app = new Hono();

app
  .use(logger())
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
  return (process.versions && process.versions.bun) || process.env.BUN_INSTALL;
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

  return c.json({
    message: "Hello, World!",
  });
});

export default {
  ...app,
  port: 3001,
};
