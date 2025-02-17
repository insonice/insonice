import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/database/schemas.ts',
  out: './migrations',
  driver: 'd1-http',
  dialect: 'sqlite',
  dbCredentials: {
    accountId: process.env.CF_ACCOUNT_ID!,
    token: process.env.CF_USER_API_TOKEN!,
    databaseId: process.env.DB_REMOTE_DATABASE_ID!,
  },
});