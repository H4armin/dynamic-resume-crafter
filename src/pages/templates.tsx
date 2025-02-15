
import { motion } from "framer-motion";
import { FileText, Download, Eye, Settings2, FileCode2, Users, Award, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const categories = [
  { id: "all", name: "All templates", icon: FileText },
  { id: "simple", name: "Simple", icon: Settings2 },
  { id: "modern", name: "Modern", icon: Users },
  { id: "creative", name: "Creative", icon: FileCode2 },
  { id: "professional", name: "Professional", icon: Award },
  { id: "ats", name: "ATS", icon: BarChart }
];

const templates = [
  {
    id: "basic",
    name: "Professional Resume",
    description: "Clean and professional layout for traditional industries",
    image: "placeholder.svg",
    category: "professional"
  },
  {
    id: "modern",
    name: "Modern Creative",
    description: "Contemporary design with a creative touch",
    image: "placeholder.svg",
    category: "creative"
  },
  {
    id: "simple",
    name: "Simple Classic",
    description: "Elegant design with a focus on experience",
    image: "placeholder.svg",
    category: "simple"
  },
  {
    id: "ats-friendly",
    name: "ATS Optimized",
    description: "Designed to pass Applicant Tracking Systems",
    image: "placeholder.svg",
    category: "ats"
  }
];

const Templates = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleTemplateSelect = (templateId: string) => {
    navigate(`/editor/${templateId}`);
  };

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 overflow-x-auto py-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative group">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleTemplateSelect(template.id)}
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      Use Template
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white/10 text-white border-white hover:bg-white/20"
                      onClick={() => window.open(`/preview/${template.id}`, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600">{template.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;
