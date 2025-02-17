import { createRequestHandler } from "react-router";
import app from "./server/app";

app.use(async c => {
  // @ts-expect-error - virtual module provided by React Router at build time
  const build = await import("virtual:react-router/server-build");
  const handler = createRequestHandler(build, import.meta.env.MODE);
  const response = await handler(c.req.raw);
  response.headers.set("x-powered-by", "Hono");
  return response;
});

export default app;
