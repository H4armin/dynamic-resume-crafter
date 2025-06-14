
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-8"
    >
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Create Your Perfect Resume in{" "}
          <span className="text-blue-600">Minutes</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Build professional, ATS-friendly resumes with our AI-powered builder. 
          Choose from beautiful templates and get your resume analyzed for maximum impact.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link to="/templates">
          <Button size="lg" className="px-8 py-3">
            <FileText className="w-5 h-5 mr-2" />
            Create Resume
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        
        <Link to="/ats-analyzer">
          <Button variant="outline" size="lg" className="px-8 py-3">
            <Target className="w-5 h-5 mr-2" />
            Analyze Resume
          </Button>
        </Link>
      </div>
      
      <div className="text-sm text-gray-500">
        No credit card required • Free templates • ATS optimization
      </div>
    </motion.div>
  );
};

export default Hero;
