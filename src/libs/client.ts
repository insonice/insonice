import { hc } from "hono/client";
import type { AppType } from "../app/api/v1/[[...path]]/route";

export const client: any = hc<AppType>("/");
