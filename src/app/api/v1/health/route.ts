import { users } from '@/database/schemas';
import { db } from '@/database/db';

export const GET = async (req: Request) => {
  console.log("health check");
  const result = await db.select().from(users).limit(10).all()
  return new Response(JSON.stringify(result));
};
