import { users } from '@/database/schemas';
import { getDb } from '@/database/db';

export const runtime = 'nodejs';

export const GET = async (req: Request) => {
  console.log("health check");
  const db = getDb();
  console.log(db);
  const result = await db.select().from(users).all();
  return new Response(JSON.stringify(result));
};
