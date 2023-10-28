import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const createCourse = protectedProcedure
  .input(z.object({ title: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.course.create({
      data: {
        Instructor: { connect: { id: ctx.session.user.id } },
        title: input.title,
      },
    });
  });
