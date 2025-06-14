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

// Updated template data with new templates
const templates = [
  {
    id: "template1",
    name: "Creative Header",
    description: "Modern layout with circular photo and elegant typography",
    image: "/uploads/449e5016-df65-47df-8d7c-ea19d579fb32.png",
    placeholderImage: "/placeholder.svg",
    category: "creative"
  },
  {
    id: "template2",
    name: "Professional Clean",
    description: "Clean professional layout with clear sections",
    image: "/uploads/881d45df-3691-4b93-8002-dc100239d1e4.png",
    placeholderImage: "/placeholder.svg",
    category: "professional"
  },
  {
    id: "template3",
    name: "Modern Split",
    description: "Two-column design with sidebar focus",
    image: "/uploads/37098c6c-11be-41ef-ac62-49670d910613.png",
    placeholderImage: "/placeholder.svg",
    category: "modern"
  },
  {
    id: "template4",
    name: "Professional Photo",
    description: "Traditional layout with professional photo header",
    image: "/uploads/cd91647f-7f95-44a3-95e3-81644b7849bc.png",
    placeholderImage: "/placeholder.svg",
    category: "professional"
  },
  {
    id: "template9",
    name: "Black Header Classic",
    description: "Elegant design with black header and profile photo",
    image: "/lovable-uploads/b68b8d53-6239-43fd-82e0-836ee6e2962f.png",
    placeholderImage: "/placeholder.svg",
    category: "professional"
  },
  {
    id: "template10",
    name: "Clean Border",
    description: "Simple design with blue border and clear sections",
    image: "/lovable-uploads/4d2aff6f-4d59-4210-8c9a-bd6e1810b0d6.png",
    placeholderImage: "/placeholder.svg",
    category: "simple"
  },
  {
    id: "template11",
    name: "Photo Sidebar",
    description: "Modern layout with photo and contact details",
    image: "/lovable-uploads/a75ab361-dc1b-4621-a365-1bd1631a479f.png",
    placeholderImage: "/placeholder.svg",
    category: "modern"
  },
  {
    id: "template12",
    name: "Teal Sidebar",
    description: "Professional design with colored sidebar",
    image: "/lovable-uploads/63cf6638-861c-4856-bde8-053b5b15cff7.png",
    placeholderImage: "/placeholder.svg",
    category: "creative"
  },
  {
    id: "template13",
    name: "Artistic Shapes",
    description: "Creative design with decorative elements",
    image: "/lovable-uploads/40cefb1b-f64b-4545-8337-72cb45d1d10a.png",
    placeholderImage: "/placeholder.svg",
    category: "creative"
  },
  {
    id: "template14",
    name: "Dark Gradient",
    description: "Modern dark theme with gradient background",
    image: "/lovable-uploads/6ef5744f-4aad-40bc-9e18-75f0d15122de.png",
    placeholderImage: "/placeholder.svg",
    category: "modern"
  }
];

const TemplateCard = ({ template, onSelect, onPreview }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = template.image;
    img.onload = () => setImageLoaded(true);
  }, [template.image]);

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
          src={imageLoaded ? template.image : template.placeholderImage}
          alt={template.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
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
    // Preload images
    const preloadImages = async () => {
      const imagePromises = templates.map(template => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = template.image;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      
      await Promise.all(imagePromises);
      setIsLoading(false);
    };
    
    preloadImages();
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
