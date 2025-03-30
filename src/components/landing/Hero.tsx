
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-8"
    >
      <div className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
        <Sparkles className="mr-2 h-4 w-4" /> AI-Powered Resume Builder
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Create Your Perfect Resume
          <br />
          <span className="text-gray-400">in Minutes</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional templates combined with AI-powered content suggestions to help you craft the perfect resume.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 pt-4">
        <Button
          size="lg"
          className="bg-black text-white hover:bg-gray-800 hover-lift text-lg px-8"
          onClick={() => navigate("/templates")}
        >
          Create Resume
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="hover-lift text-lg px-8"
          onClick={() => navigate("/templates")}
        >
          View Templates
        </Button>
      </div>
    </motion.div>
  );
};

export default Hero;
