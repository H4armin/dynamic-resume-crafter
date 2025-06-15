import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Template1 } from "@/components/resume-templates/Template1";
import { Template2 } from "@/components/resume-templates/Template2";
import { Template3 } from "@/components/resume-templates/Template3";
import { Template4 } from "@/components/resume-templates/Template4";
import { Template9 } from "@/components/resume-templates/Template9";
import { Template10 } from "@/components/resume-templates/Template10";
import { Template11 } from "@/components/resume-templates/Template11";
import { Template12 } from "@/components/resume-templates/Template12";
import { Template13 } from "@/components/resume-templates/Template13";
import { Template14 } from "@/components/resume-templates/Template14";
import { Template15 } from "@/components/resume-templates/Template15";
import { Template16 } from "@/components/resume-templates/Template16";
import { Template17 } from "@/components/resume-templates/Template17";
import { Template18 } from "@/components/resume-templates/Template18";
import { defaultResumeValues } from "@/types/resume";
import { CustomizationProvider } from "@/contexts/CustomizationContext";

const Preview = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();

  // Create sample resume data for preview
  const sampleData = {
    ...defaultResumeValues,
    fullName: "Katherine Elizabeth Bishop",
    email: "katherine.bishop@design-professional.com",
    phone: "+46 987 654 321",
    summary: "Senior Product Designer with over 8 years of experience creating intuitive and engaging experiences. Passionate about applying design principles and design systems.",
    experience: [
      {
        title: "Senior Product Designer",
        company: "Fintel Technologies",
        period: "Jan 2021 - Present",
        description: "Lead designer for financial technology products, managing a team of 4 designers. Implemented design system that reduced design inconsistencies by 60%. Increased user engagement by 35% through redesign of core features."
      },
      {
        title: "Product Designer",
        company: "Digital Innovations Co.",
        period: "Mar 2019 - Dec 2020",
        description: "Designed user interfaces for mobile applications with over 1M+ downloads. Conducted user research and usability testing for 5 major product launches. Collaborated with development teams to ensure pixel-perfect implementation."
      },
      {
        title: "UI/UX Designer",
        company: "Creative Solutions Agency",
        period: "Jun 2017 - Feb 2019",
        description: "Created responsive web designs for 20+ client projects. Developed interactive prototypes and conducted user testing sessions. Improved client satisfaction scores by 35% through iterative design processes."
      }
    ],
    education: [
      {
        degree: "Master's in Human-Computer Interaction",
        school: "Copenhagen School of Design and Technology",
        year: "2015 - 2018"
      },
      {
        degree: "Bachelor's in Digital Design",
        school: "Stockholm University of Arts",
        year: "2011 - 2015"
      }
    ],
    skills: [
      "UI Design", 
      "UX Research", 
      "Figma", 
      "Adobe Creative Suite", 
      "Prototyping", 
      "Design Systems", 
      "User Testing", 
      "Sketch"
    ],
    profileImage: "/uploads/5f97d2a4-21c2-4d7b-b431-60b64cf76d34.png"
  };

  // Render the actual template component
  const renderTemplateComponent = () => {
    switch (templateId) {
      case "template1":
        return <Template1 data={sampleData} />;
      case "template2":
        return <Template2 data={sampleData} />;
      case "template3":
        return <Template3 data={sampleData} />;
      case "template4":
        return <Template4 data={sampleData} />;
      case "template9":
        return <Template9 data={sampleData} />;
      case "template10":
        return <Template10 data={sampleData} />;
      case "template11":
        return <Template11 data={sampleData} />;
      case "template12":
        return <Template12 data={sampleData} />;
      case "template13":
        return <Template13 data={sampleData} />;
      case "template14":
        return <Template14 data={sampleData} />;
      case "template15":
        return <Template15 data={sampleData} />;
      case "template16":
        return <Template16 data={sampleData} />;
      case "template17":
        return <Template17 data={sampleData} />;
      case "template18":
        return <Template18 data={sampleData} />;
      default:
        return <Template1 data={sampleData} />;
    }
  };

  // Find the template image based on templateId
  const getTemplateImage = () => {
    switch (templateId) {
      case "template1":
        return "/uploads/449e5016-df65-47df-8d7c-ea19d579fb32.png";
      case "template2":
        return "/uploads/881d45df-3691-4b93-8002-dc100239d1e4.png";
      case "template3":
        return "/uploads/37098c6c-11be-41ef-ac62-49670d910613.png";
      case "template4":
        return "/uploads/cd91647f-7f95-44a3-95e3-81644b7849bc.png";
      case "template9":
        return "/lovable-uploads/b68b8d53-6239-43fd-82e0-836ee6e2962f.png";
      case "template10":
        return "/lovable-uploads/4d2aff6f-4d59-4210-8c9a-bd6e1810b0d6.png";
      case "template11":
        return "/lovable-uploads/a75ab361-dc1b-4621-a365-1bd1631a479f.png";
      case "template12":
        return "/lovable-uploads/63cf6638-861c-4856-bde8-053b5b15cff7.png";
      case "template13":
        return "/lovable-uploads/40cefb1b-f64b-4545-8337-72cb45d1d10a.png";
      case "template14":
        return "/lovable-uploads/6ef5744f-4aad-40bc-9e18-75f0d15122de.png";
      case "template15":
        return "/placeholder.svg"; // You can upload specific images for these templates
      case "template16":
        return "/placeholder.svg";
      case "template17":
        return "/placeholder.svg";
      case "template18":
        return "/placeholder.svg";
      default:
        return "/uploads/449e5016-df65-47df-8d7c-ea19d579fb32.png";
    }
  };

  return (
    <CustomizationProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6" 
            onClick={() => navigate('/templates')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Template Preview</h1>
            
            <div className="grid grid-cols-1 gap-8">
              {/* Display the actual template component */}
              <div id="preview-template" className="max-w-5xl mx-auto w-full overflow-hidden rounded-lg shadow-md">
                {renderTemplateComponent()}
              </div>
              
              {/* Display the template image for reference */}
              <div className="max-w-5xl mx-auto w-full overflow-hidden rounded-lg shadow-md">
                <img 
                  src={getTemplateImage()} 
                  alt={`Template ${templateId} preview`} 
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomizationProvider>
  );
};

export default Preview;
