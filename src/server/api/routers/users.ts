import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getUserByEmail: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findFirst({
        where: {
            email: input,
        },
    });
  }),
});
