import { Hono } from "hono";

const app = new Hono();

const api = new Hono();

api.get("/health", c => c.json({ message: "OK" }));

app.route("/api", api);

export default app;
