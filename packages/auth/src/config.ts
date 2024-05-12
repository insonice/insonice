import type { DefaultSession, NextAuthConfig } from "next-auth";

import { drizzleAuthAdapter } from "./adapters/drizzle";
import { defaultCookies } from "./lib/cookie";
import { providers } from "./providers";
import { schema, eq, db } from "@insonice/db";
import { omit } from "lodash";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: drizzleAuthAdapter,
  cookies: defaultCookies(),
  providers,
  session: {
    strategy: "jwt",
  },
  secret: "niceai",
  callbacks: {
    async jwt({ token, session }) {
      if (!token.sub) return token;
      const users = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, token.sub))
        .limit(1);
      const user = omit(users[0], ["password"]);
      return {
        ...token,
        session,
        user,
      };
    },
    session({ session, token, user }) {
      if (token.user) {
        return {
          ...session,
          user: token.user,
        };
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
} satisfies NextAuthConfig;
