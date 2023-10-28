import { protectedProcedure } from "../../trpc";

export const myAllCourses = protectedProcedure.query(async ({ ctx }) => {
  return ctx.db.course.findMany({
    where: {
      instructorId: ctx.session.user.id,
    },
  });
});
