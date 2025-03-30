
import { motion } from "framer-motion";
import { FileText, Download, Eye, Settings2, FileCode2, Users, Award, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { id: "all", name: "All templates", icon: FileText },
  { id: "professional", name: "Professional", icon: Award },
  { id: "modern", name: "Modern", icon: Users },
  { id: "creative", name: "Creative", icon: FileCode2 },
  { id: "simple", name: "Simple", icon: Settings2 },
  { id: "ats", name: "ATS", icon: BarChart }
];

// Updated template data with placeholder images
const templates = [
  {
    id: "template1",
    name: "Creative Header",
    description: "Modern layout with circular photo and elegant typography",
    image: "/lovable-uploads/449e5016-df65-47df-8d7c-ea19d579fb32.png",
    placeholderImage: "/placeholder.svg",
    category: "creative"
  },
  {
    id: "template2",
    name: "Professional Clean",
    description: "Clean professional layout with clear sections",
    image: "/lovable-uploads/881d45df-3691-4b93-8002-dc100239d1e4.png",
    placeholderImage: "/placeholder.svg",
    category: "professional"
  },
  {
    id: "template3",
    name: "Modern Split",
    description: "Two-column design with sidebar focus",
    image: "/lovable-uploads/37098c6c-11be-41ef-ac62-49670d910613.png",
    placeholderImage: "/placeholder.svg",
    category: "modern"
  },
  {
    id: "template4",
    name: "Professional Photo",
    description: "Traditional layout with professional photo header",
    image: "/lovable-uploads/cd91647f-7f95-44a3-95e3-81644b7849bc.png",
    placeholderImage: "/placeholder.svg",
    category: "professional"
  }
];

const TemplateCard = ({ template, onSelect, onPreview }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={template.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all cursor-pointer"
      onClick={() => onSelect(template.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group aspect-[210/297]">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <Skeleton className="w-full h-full" />
          </div>
        )}
        <img
          src={template.image}
          alt={template.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isHovered || !imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(template.id);
              }}
              className="bg-white text-black hover:bg-gray-100"
            >
              Use Template
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template.id, e);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{template.name}</h3>
        <p className="text-white/70">{template.description}</p>
      </div>
    </motion.div>
  );
};

const Templates = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking if all images are loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleTemplateSelect = (templateId) => {
    navigate(`/editor/${templateId}`);
  };

  const handlePreview = (templateId, e) => {
    e.stopPropagation(); // Prevent triggering the parent div's click
    navigate(`/preview/${templateId}`);
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
            <TemplateCard 
              key={template.id}
              template={template}
              onSelect={handleTemplateSelect}
              onPreview={handlePreview}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;
