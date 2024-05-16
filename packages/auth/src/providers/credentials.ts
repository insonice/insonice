// import bcrypt from "bcrypt";
import crypto from "crypto";
import { first, omit } from "lodash";
import CredentialsProvider from "next-auth/providers/credentials";

import { db, eq, schema } from "@insonice/db";

import { nanoid } from "../lib/nanoid";

async function authorize(
  credentials: Partial<Record<"username" | "password", unknown>>,
  req: Request,
) {
  if (!credentials.username) {
    throw new Error('"username" is required in credentials');
  }

  // without the type check, the compiler will complain about the type of
  // credentials.password being unknown
  if (!credentials.password || "string" !== typeof credentials.password) {
    throw new Error('"password" is required in credentials');
  }

  const reqId = req.headers.get("x-vercel-id") ?? nanoid();
  console.time(`fetch user for login ${reqId}`);
  const maybeUser = first(
    await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, credentials.username as string))
      .limit(1),
  );
  console.timeEnd(`fetch user for login ${reqId}`);

  if (!maybeUser) {
    return null;
  }

  console.time(`bcrypt ${reqId}`);
  const hashed = crypto
    .pbkdf2Sync(credentials.password, "", 10, 64, "sha512")
    .toString("hex");
  if (hashed !== maybeUser.password) {
    return null;
  }
  console.timeEnd(`bcrypt ${reqId}`);

  return omit(maybeUser, "password");
}

export const Credentials = CredentialsProvider({
  credentials: {
    username: { type: "username" },
    password: { type: "password" },
  },
  authorize,
});
