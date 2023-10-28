import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const addContent = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      body: z.string(),
      selectedCourse: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.db.content.create({
      data: {
        heading: input.title,
        textContent: input.body,
        courseId: input.selectedCourse,
      },
    });
  });
