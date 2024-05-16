import type { Config } from "drizzle-kit";
import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";
import { dbPrefix } from "./const";

const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

export const connectionStr = new URL(env.DATABASE_URL);

export default {
  schema: "./src/schema",
  dialect: "postgresql",
  dbCredentials: { url: connectionStr.href },
  tablesFilter: [`${dbPrefix}*`],
} satisfies Config;
