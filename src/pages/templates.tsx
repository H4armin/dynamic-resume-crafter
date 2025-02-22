
import { motion } from "framer-motion";
import { FileText, Download, Eye, Settings2, FileCode2, Users, Award, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const categories = [
  { id: "all", name: "All templates", icon: FileText },
  { id: "professional", name: "Professional", icon: Award },
  { id: "modern", name: "Modern", icon: Users },
  { id: "creative", name: "Creative", icon: FileCode2 },
  { id: "simple", name: "Simple", icon: Settings2 },
  { id: "ats", name: "ATS", icon: BarChart }
];

const templates = [
  {
    id: "template1",
    name: "Professional Classic",
    description: "Traditional layout with modern typography",
    image: "/lovable-uploads/template1.png",
    category: "professional"
  },
  {
    id: "template2",
    name: "Creative Modern",
    description: "Unique two-column design with bold accents",
    image: "/lovable-uploads/template2.png",
    category: "creative"
  },
  {
    id: "template3",
    name: "Executive Clean",
    description: "Sophisticated design for senior professionals",
    image: "/lovable-uploads/template3.png",
    category: "professional"
  },
  {
    id: "template4",
    name: "Minimal Impact",
    description: "Clean design with effective space utilization",
    image: "/lovable-uploads/template4.png",
    category: "simple"
  },
  {
    id: "template5",
    name: "Modern Tech",
    description: "Contemporary layout for tech professionals",
    image: "/lovable-uploads/template5.png",
    category: "modern"
  },
  {
    id: "template6",
    name: "ATS Optimized",
    description: "Structured layout for ATS compatibility",
    image: "/lovable-uploads/template6.png",
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
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-lg sticky top-0 z-10">
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
                      ? "bg-white text-black"
                      : "text-white/70 hover:bg-white/10"
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
              className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="relative group aspect-[210/297]">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleTemplateSelect(template.id)}
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      Use Template
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white/20"
                      onClick={() => window.open(`/preview/${template.id}`, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{template.name}</h3>
                <p className="text-white/70">{template.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;
