
import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "basic",
    name: "Basic Resume",
    description: "Clean and professional layout for traditional industries",
    image: "placeholder.svg"
  },
  {
    id: "modern",
    name: "Modern Resume",
    description: "Contemporary design with a creative touch",
    image: "placeholder.svg"
  },
  {
    id: "professional",
    name: "Professional Resume",
    description: "Elegant design with a focus on experience",
    image: "placeholder.svg"
  }
];

const Templates = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    navigate(`/editor/${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Choose Your Template</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our professionally designed templates to create your perfect resume
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl overflow-hidden hover-lift"
            >
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleTemplateSelect(template.id)}
                    className="w-full"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(`/preview/${template.id}`, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
