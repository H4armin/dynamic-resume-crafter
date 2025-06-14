
import { ResumeFormValues } from "@/types/resume";
import { useCustomization } from "@/contexts/CustomizationContext";
import { Template1 } from "./resume-templates/Template1";
import { Template2 } from "./resume-templates/Template2";
import { Template3 } from "./resume-templates/Template3";
import { Template4 } from "./resume-templates/Template4";
import { Template9 } from "./resume-templates/Template9";
import { Template10 } from "./resume-templates/Template10";
import { Template11 } from "./resume-templates/Template11";
import { Template12 } from "./resume-templates/Template12";
import { Template13 } from "./resume-templates/Template13";
import { Template14 } from "./resume-templates/Template14";

interface ResumePreviewProps {
  data: Partial<ResumeFormValues>;
  templateId?: string;
}

const ResumePreview = ({ data, templateId }: ResumePreviewProps) => {
  const { colors, fontSize, spacing, sectionOrder } = useCustomization();

  // Render the appropriate template based on templateId
  const renderTemplate = () => {
    switch (templateId) {
      case "template1":
        return <Template1 data={data} />;
      case "template2":
        return <Template2 data={data} />;
      case "template3":
        return <Template3 data={data} />;
      case "template4":
        return <Template4 data={data} />;
      case "template9":
        return <Template9 data={data} />;
      case "template10":
        return <Template10 data={data} />;
      case "template11":
        return <Template11 data={data} />;
      case "template12":
        return <Template12 data={data} />;
      case "template13":
        return <Template13 data={data} />;
      case "template14":
        return <Template14 data={data} />;
      default:
        return <Template1 data={data} />; // Default to Template1
    }
  };

  return (
    <div id="resume-preview" className="w-full">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
