import { api } from "@/utils/api";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateCourse: React.FC = () => {
  const createCourseAPI = api.courses.create.useMutation();
  const [title, changeTitle] = useState("");
  const apiContext = api.useUtils();

  const runQuery = () => {
    if (title.length == 0) return;
    toast
      .promise(createCourseAPI.mutateAsync({ title }), {
        success: "Created",
        pending: "Creating..",
        error: "Couldn't Create",
      })
      .then(() => {
        void apiContext.courses.myAllCourses.invalidate();
      })
      .catch(() => {
        console.error("Couldn't create");
      });
  };

  return (
    <div className="flex w-full flex-col  justify-center gap-4 rounded-xl border border-gray-500 bg-gray-700 px-9 py-5">
      <h2 className="flex w-full justify-center text-xl font-bold">
        Create New Course
      </h2>
      <div className="flex w-full items-center justify-center gap-2 rounded-lg text-lg ">
        <label className="block whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          Course Name
        </label>
        <input
          type="email"
          id="helper-text"
          value={title}
          aria-describedby="helper-text-explanation"
          onChange={(e) => {
            changeTitle(e.target.value);
          }}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Course Name"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={runQuery}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
