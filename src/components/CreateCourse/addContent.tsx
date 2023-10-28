import { api } from "@/utils/api";
import { useState } from "react";
import Loading from "../Loading";
import Select from "react-select";
import { toast } from "react-toastify";

const AddContent: React.FC = () => {
  const allCoures = api.courses.myAllCourses.useQuery(undefined, {
    onSuccess: (data) => {
      setIsLoading(false);
      const defaultCourse = data[0];
      if (defaultCourse) changeSelectedCourse(defaultCourse.id);
    },
  });
  const addContent = api.courses.addContent.useMutation();

  const [isLoading, setIsLoading] = useState(true);
  const [Contenttitle, changeContentTitle] = useState("");
  const [body, changeBody] = useState("");
  const [selectedCourse, changeSelectedCourse] = useState<string>();

  const submitContent = () => {
    if (Contenttitle.length == 0)
      return void toast.error("Title can't be empty");
    if (body.length == 0) return void toast.error("Body can't be empty");
    if (selectedCourse == undefined) return void toast.error("Select A Course");
    toast
      .promise(
        addContent.mutateAsync({ body, selectedCourse, title: Contenttitle }),
        {
          error: "Couldn't create",
          pending: "Creating",
          success: "Created",
        },
      )
      .then(() => {
        changeBody("");
        changeContentTitle("");
      })
      .catch(() => {
        console.error("Couldn't create");
      });
  };

  if (allCoures.isLoading || !allCoures.data) return <Loading />;
  if (allCoures.data.length == 0) return <></>;

  return (
    <div className="flex w-full flex-col  justify-center gap-4 rounded-xl border border-gray-500 bg-gray-700 px-9 py-5">
      <h2 className="flex w-full justify-center text-xl font-bold">
        Add Content To Course
      </h2>
      <div className="flex w-full items-center justify-center gap-2 rounded-lg text-lg ">
        <div className="whitespace-nowrap">Course Title</div>
        <Select
          className="basic-single w-full text-gray-100"
          classNamePrefix="select"
          onChange={(e) => {
            if (e) changeSelectedCourse(e.value);
          }}
          defaultValue={
            allCoures.data.map((data) => ({
              value: data.id,
              label: data.title,
            }))[0]
          }
          isDisabled={false}
          isLoading={isLoading}
          isSearchable={true}
          name="color"
          options={allCoures.data.map((data) => ({
            value: data.id,
            label: data.title,
          }))}
          styles={{
            option: (style) => ({ ...style, color: "black" }),
            control: (style) => ({
              ...style,
            }),
          }}
        />
      </div>
      <input
        value={Contenttitle}
        onChange={(e) => changeContentTitle(e.target.value)}
        id="large-input"
        className="sm:text-md block w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-lg text-gray-200 placeholder-gray-400 shadow-lg shadow-gray-800 focus:border-blue-500 focus:ring-blue-500"
        placeholder="Title Of Content"
      />
      <textarea
        value={body}
        onChange={(e) => changeBody(e.target.value)}
        id="large-input"
        className="sm:text-md block h-40 w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-lg text-gray-200 placeholder-gray-400 shadow-lg shadow-gray-800 focus:border-blue-500 focus:ring-blue-500"
        placeholder="Body Of Content"
      />

      <div className="flex justify-end">
        <button
          onClick={submitContent}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default AddContent;
