import { createTRPCRouter } from "@/server/api/trpc";
import { createCourse } from "./createCourse";
import { myAllCourses } from "./myCourses";
import { addContent } from "./addContent";
import { getAllContents } from "./getAllContent";
import { getContent } from "./getContent";

export const courseRouter = createTRPCRouter({
  create: createCourse,
  myAllCourses,
  addContent,
  getAllContents,
  getContent
});
