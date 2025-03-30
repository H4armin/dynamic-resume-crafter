
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TemplatesShowcase = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold">Professional Templates</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Choose from our collection of professionally designed templates to make your resume stand out
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <img 
              src={`/public/lovable-uploads/${i === 1 ? '5f97d2a4-21c2-4d7b-b431-60b64cf76d34' : i === 2 ? '5165ab84-9149-467b-9bcb-fc442d1a9be2' : i === 3 ? '881d45df-3691-4b93-8002-dc100239d1e4' : '449e5016-df65-47df-8d7c-ea19d579fb32'}.png`}
              alt={`Template ${i}`}
              className="w-full h-40 object-cover object-top"
            />
          </div>
        ))}
      </div>
      
      <div className="text-center pt-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/templates')}
          className="hover-lift"
        >
          View All Templates
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default TemplatesShowcase;
