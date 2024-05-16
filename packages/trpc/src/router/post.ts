import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { desc, eq, schema } from "@insonice/db";
import { CreatePostSchema } from "@insonice/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.posts.findMany({
      orderBy: desc(schema.posts.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.posts.findFirst({
        where: eq(schema.posts.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.posts).values(input as any);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.posts).where(eq(schema.posts.id, input));
  }),
} satisfies TRPCRouterRecord;
