import { publicProcedure } from "../../trpc";

export const getAllContents = publicProcedure.query(async ({ ctx }) => {
  return ctx.db.content.findMany({
    select: {
      id: true,
      heading: true,
      textContent: true,
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
