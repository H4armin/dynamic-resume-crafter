
import { useParams } from "react-router-dom";
import { Template1 } from "@/components/resume-templates/Template1";
import { Template2 } from "@/components/resume-templates/Template2";
import { Template3 } from "@/components/resume-templates/Template3";
import { Template4 } from "@/components/resume-templates/Template4";
import { defaultResumeValues } from "@/types/resume";

const Preview = () => {
  const { templateId } = useParams();

  const getTemplateComponent = () => {
    switch (templateId) {
      case "template1":
        return <Template1 data={defaultResumeValues} />;
      case "template2":
        return <Template2 data={defaultResumeValues} />;
      case "template3":
        return <Template3 data={defaultResumeValues} />;
      case "template4":
        return <Template4 data={defaultResumeValues} />;
      default:
        return <Template1 data={defaultResumeValues} />;
    }
  };

  return (
    <div className="min-h-screen w-full p-8 bg-gray-50">
      {getTemplateComponent()}
    </div>
  );
};

export default Preview;
