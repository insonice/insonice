import { createServer } from "./app";

const prefix = "/api/v1";

const app = createServer<typeof prefix>(prefix);

export type AppType = typeof app;

export default app;
