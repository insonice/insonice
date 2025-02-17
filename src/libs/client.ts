import type { AppType } from "../app/api/v1/[[...path]]/route";
import { hc } from "hono/client";

export const client = hc<AppType>("/");
