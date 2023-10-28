import { useState } from "react";
import SearchBar from "./SearchBar";
import { api } from "@/utils/api";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [searchQuery, changeSearchQuery] = useState("");
  // const searchCoursesAPI = api.courses.search.useQuery({ query: "Zaeem" });
  const allContent = api.courses.getAllContents.useQuery();

  const runQuery = () => {
    // console.log(searchCoursesAPI.data);
    console.log("Searching: ", { searchQuery });
  };
  // if (!allContent.data) return <></>;
  // if (allContent.data.length == 0) return <></>;
  return (
    <div>
      <SearchBar
        query={searchQuery}
        changeQuery={changeSearchQuery}
        runQuery={runQuery}
      />

      {!!allContent.data && (
        <div className="mt-10 flex flex-col gap-4">
          {allContent.data
            .filter((content) =>
              searchQuery == ""
                ? true
                : content.heading
                    .toLowerCase()
                    .search(searchQuery.toLowerCase()) >= 0,
            )
            .map((content) => {
              return (
                <div className="rounded-lg bg-gray-700 p-2" key={content.id}>
                  <div
                    className="flex w-full items-center justify-between rounded-lg bg-gray-700"
                    key={content.id}
                  >
                    <div className="text-lg ">{content.heading}</div>
                  </div>
                  <div className="p-2 opacity-70">
                    <p>{content.textContent}</p>
                  </div>
                  <div className="flex justify-end text-xs  opacity-50">
                    <div>
                      <h1>{content.PartOf.title}</h1>
                      <h1>{content.PartOf.Instructor.name}</h1>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
