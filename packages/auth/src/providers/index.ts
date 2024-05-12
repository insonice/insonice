import type { NextAuthConfig } from "next-auth";

import { Credentials } from "./credentials";
import { GitHub } from "./github";
import { Google } from "./google";

export const providers: Required<NextAuthConfig["providers"]> = [
  GitHub,
  Credentials,
  Google,
];
