import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getUserByEmail: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    //have if statement where if und dont call
    return ctx.db.user.findFirst({
        where: {
            email: input,
        },
    });
  }),
  createUser: publicProcedure.input(z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string()
    })
    ).mutation(async ({ ctx, input }) => {
        //TODO: Add a rate limiter
        const user = await ctx.db.user.create({
            data: {
                name: input.name,
                email: input.email,
                phone: input.phone
            },
        });
        
        return user;
    }),
});
