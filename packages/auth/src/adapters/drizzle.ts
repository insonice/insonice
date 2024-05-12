/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "@auth/core/adapters";
import { and, eq, getTableColumns } from "drizzle-orm";

import { db, schema } from "@insonice/db";

import { nanoid } from "../lib/nanoid";

export function DrizzleAuthAdapter(): Adapter {
  const {
    users: usersTable,
    accounts: accountsTable,
    sessions: sessionsTable,
    verificationTokens: verificationTokensTable,
  } = schema;

  return {
    async createUser(data: AdapterUser & { login?: string }) {
      const hasDefaultId = getTableColumns(usersTable).id.hasDefault;
      console.log("users", data, hasDefaultId);
      const res = await db
        .insert(usersTable)
        .values(
          hasDefaultId
            ? data
            : {
                ...data,
                id: nanoid(),
                username: data.login, // github login
              },
        )
        .returning();
      return res[0] as AdapterUser;
    },
    async getUser(userId: string) {
      const res = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId));
      return res.length > 0 ? (res[0] as AdapterUser) : null;
    },
    async getUserByEmail(email: string) {
      const res = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));
      return res.length > 0 ? (res[0] as AdapterUser) : null;
    },
    async createSession(data: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }) {
      const res = await db.insert(sessionsTable).values(data).returning();
      return res[0] as AdapterSession;
    },
    async getSessionAndUser(sessionToken: string) {
      const res = await db
        .select({
          session: sessionsTable,
          user: usersTable,
        })
        .from(sessionsTable)
        .where(eq(sessionsTable.sessionToken, sessionToken))
        .innerJoin(usersTable, eq(usersTable.id, sessionsTable.userId));
      return res.length > 0
        ? (res[0] as { session: AdapterSession; user: AdapterUser })
        : null;
    },
    async updateUser(
      data: Partial<AdapterUser> & Pick<AdapterUser, "id"> & { login?: string },
    ) {
      if (!data.id) {
        throw new Error("No user id.");
      }

      const [result] = await db
        .update(usersTable)
        .set(data)
        .where(eq(usersTable.id, data.id))
        .returning();

      if (!result) {
        throw new Error("No user found.");
      }

      return result as AdapterUser;
    },
    async updateSession(
      data: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">,
    ) {
      return db
        .update(sessionsTable)
        .set(data)
        .where(eq(sessionsTable.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0]);
    },
    async linkAccount(data: AdapterAccount) {
      console.log("linkAccount", data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await db.insert(accountsTable).values(data as any);
    },
    async getUserByAccount(
      account: Pick<AdapterAccount, "provider" | "providerAccountId">,
    ) {
      const result = await db
        .select({
          account: accountsTable,
          user: usersTable,
        })
        .from(accountsTable)
        .innerJoin(usersTable, eq(accountsTable.userId, usersTable.id))
        .where(
          and(
            eq(accountsTable.provider, account.provider),
            eq(accountsTable.providerAccountId, account.providerAccountId),
          ),
        )
        .then((res) => res[0]);

      return result?.user ? (result.user as AdapterUser) : null;
    },
    async deleteSession(sessionToken: string) {
      await db
        .delete(sessionsTable)
        .where(eq(sessionsTable.sessionToken, sessionToken));
    },
    async createVerificationToken(data: VerificationToken) {
      return db
        .insert(verificationTokensTable)
        .values(data)
        .returning()
        .then((res) => res[0]);
    },
    async useVerificationToken(params: { identifier: string; token: string }) {
      const res = await db
        .delete(verificationTokensTable)
        .where(
          and(
            eq(verificationTokensTable.identifier, params.identifier),
            eq(verificationTokensTable.token, params.token),
          ),
        )
        .returning();

      return res.length > 0 ? (res[0] as VerificationToken) : null;
    },
    async deleteUser(id: string) {
      await db.delete(usersTable).where(eq(usersTable.id, id));
    },
    async unlinkAccount(
      params: Pick<AdapterAccount, "provider" | "providerAccountId">,
    ) {
      console.log("params", params);
      await db
        .delete(accountsTable)
        .where(
          and(
            eq(accountsTable.provider, params.provider),
            eq(accountsTable.providerAccountId, params.providerAccountId),
          ),
        );
    },
  };
}

export const drizzleAuthAdapter = DrizzleAuthAdapter();
