import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import adapter from "@hono/vite-dev-server/cloudflare";
import serverAdapter from "hono-react-router-adapter/vite";

const entry = "./app/node.server.ts";

export default defineConfig(({ command, isSsrBuild }) => ({
  build: {
    rollupOptions: {
      input: isSsrBuild ? entry : undefined,
    },
  },
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: command === "build" ? true : undefined,
    resolve: {
      conditions: ["workerd", "worker", "browser"],
      externalConditions: ["workerd", "worker"],
    },
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    serverAdapter({
      adapter,
      entry,
    }),
  ],
}));
