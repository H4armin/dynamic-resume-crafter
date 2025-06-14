
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Target } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white"
    >
      <h2 className="text-3xl font-bold mb-4">
        Ready to Land Your Dream Job?
      </h2>
      <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
        Join thousands of job seekers who have successfully created ATS-optimized resumes 
        and landed interviews at top companies.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/templates">
          <Button size="lg" variant="secondary" className="px-8 py-3">
            <FileText className="w-5 h-5 mr-2" />
            Start Building
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        
        <Link to="/ats-analyzer">
          <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
            <Target className="w-5 h-5 mr-2" />
            Analyze Resume
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CallToAction;
