import AddContent from "./addContent";
import CreateCourse from "./createCourse";

const CreateContent: React.FC = () => {
  return (
    <div className="flex w-full flex-col justify-center gap-12 p-4">
      <CreateCourse />
      <AddContent />
    </div>
  );
};

export default CreateContent;
