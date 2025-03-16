
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import template images
import template1Image from "@/assets/templates/template1.png";
import template2Image from "@/assets/templates/template2.png";
import template3Image from "@/assets/templates/template3.png";
import template4Image from "@/assets/templates/template4.png";

const Preview = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();

  // Find the template image based on templateId
  const getTemplateImage = () => {
    switch (templateId) {
      case "template1":
        return template1Image;
      case "template2":
        return template2Image;
      case "template3":
        return template3Image;
      case "template4":
        return template4Image;
      default:
        return template1Image;
    }
  };

  return (
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
          <div className="flex justify-center">
            <div className="max-w-[800px] overflow-hidden rounded-lg shadow-md">
              <img 
                src={getTemplateImage()} 
                alt={`Template ${templateId} preview`} 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
