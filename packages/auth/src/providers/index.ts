import type { NextAuthConfig } from "next-auth";

import { Credentials } from "./credentials";
import { GitHub } from "./github";

export const providers: Required<NextAuthConfig["providers"]> = [
  GitHub,
  Credentials,
];
