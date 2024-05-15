import { fileURLToPath } from "url";
import createJiti from "jiti";
import dotenv from  'dotenv'

dotenv.config({ path: '../../.env', override: true, debug: true })

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./env");

import { createApp } from "./app";

const app = await createApp()

export default {
  ...app,
  port: 3001,
};
