import { db, schema } from "@insonice/db";

export const GET = async () => {
  const res = ((await db.select().from(schema.users).limit(1)));
  return Response.json(res);
};
