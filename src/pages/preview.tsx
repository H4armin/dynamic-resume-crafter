
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Template1 } from "@/components/resume-templates/Template1";
import { Template2 } from "@/components/resume-templates/Template2";
import { Template3 } from "@/components/resume-templates/Template3";
import { Template4 } from "@/components/resume-templates/Template4";
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
