
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="bg-black text-white rounded-2xl p-8 md:p-12 text-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Create Your Professional Resume?</h2>
      <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
        Join thousands of job seekers who have successfully landed their dream jobs with our resume builder.
      </p>
      <Button 
        size="lg" 
        className="bg-white text-black hover:bg-gray-100 hover-lift text-lg px-8"
        onClick={() => navigate("/templates")}
      >
        Get Started Now
        <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </motion.div>
  );
};

export default CallToAction;
