
import { ResumeFormValues } from "@/types/resume";
import { useCustomization } from "@/contexts/CustomizationContext";
import { Template1 } from "./resume-templates/Template1";
import { Template2 } from "./resume-templates/Template2";
import { Template3 } from "./resume-templates/Template3";
import { Template4 } from "./resume-templates/Template4";

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
