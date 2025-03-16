
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Preview = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();

  // Find the template image based on templateId
  const getTemplateImage = () => {
    switch (templateId) {
      case "template1":
        return "/lovable-uploads/449e5016-df65-47df-8d7c-ea19d579fb32.png";
      case "template2":
        return "/lovable-uploads/881d45df-3691-4b93-8002-dc100239d1e4.png";
      case "template3":
        return "/lovable-uploads/37098c6c-11be-41ef-ac62-49670d910613.png";
      case "template4":
        return "/lovable-uploads/cd91647f-7f95-44a3-95e3-81644b7849bc.png";
      default:
        return "/lovable-uploads/449e5016-df65-47df-8d7c-ea19d579fb32.png";
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
