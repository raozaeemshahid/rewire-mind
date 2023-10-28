import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const getContent = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    return ctx.db.content.findUnique({
      where: {
        id: input.id,
      },
      select: {
        id: true,
        textContent: true,
        heading: true,
        PartOf: {
          select: {
            title: true,
            Instructor: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  });
