
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
    image: "https://cdn.discordapp.com/attachments/1214599475930452049/1214599651684380712/image.png?ex=65fa4c48&is=65e7d748&hm=60ff5937ad0e29a0b9cc7d3e48e2515cd9e56fcf0278b726e86fad9f7a3523fa&",
    category: "professional"
  },
  {
    id: "template2",
    name: "Creative Modern",
    description: "Unique two-column design with bold accents",
    image: "https://cdn.discordapp.com/attachments/1214599475930452049/1214599709490675732/image.png?ex=65fa4c56&is=65e7d756&hm=f6b8b68b321eca675c6e3804f6997a79560872c32e505c9b89e67c0b80d7fb7f&",
    category: "creative"
  },
  {
    id: "template3",
    name: "Executive Clean",
    description: "Sophisticated design for senior professionals",
    image: "https://cdn.discordapp.com/attachments/1214599475930452049/1214599766214144060/image.png?ex=65fa4c63&is=65e7d763&hm=e506e71a8a2621c315c440def8b2f0e5f371e9f08b61a66af27936e61ec3cae5&",
    category: "professional"
  },
  {
    id: "template4",
    name: "Minimal Impact",
    description: "Clean design with effective space utilization",
    image: "https://cdn.discordapp.com/attachments/1214599475930452049/1214599818705166346/image.png?ex=65fa4c70&is=65e7d770&hm=c8389e800addd89e81ba1ca075d72a46f26849737a924a445f3f30d5206e5304&",
    category: "simple"
  },
  {
    id: "template5",
    name: "Modern Tech",
    description: "Contemporary layout for tech professionals",
    image: "https://cdn.discordapp.com/attachments/1214599475930452049/1214599869846056960/image.png?ex=65fa4c7c&is=65e7d77c&hm=fb24cc95412c9f4c1cedd6d80108b695470520be5196888c5b9d7660756c8645&",
    category: "modern"
  },
  {
    id: "template6",
    name: "ATS Optimized",
    description: "Structured layout for ATS compatibility",
    image: "https://cdn.discordapp.com/attachments/1214599475930452049/1214599911902212196/image.png?ex=65fa4c86&is=65e7d786&hm=022d04ce5383f5403c7aadf895360426d4c49046bec552a9cbbb4b178ef80aaa&",
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
