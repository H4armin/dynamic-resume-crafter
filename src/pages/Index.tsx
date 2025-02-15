
import { motion } from "framer-motion";
import { ChevronRight, FileText, Sparkles, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Resume Builder
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Create Your Perfect Resume
            <br />
            <span className="text-gray-400">in Minutes</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional templates combined with AI-powered content suggestions to help you craft the perfect resume.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 hover-lift"
              onClick={() => navigate("/templates")}
            >
              Create Resume
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover-lift"
              onClick={() => navigate("/templates")}
            >
              View Templates
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          <div className="glass rounded-2xl p-6 hover-lift">
            <FileText className="w-12 h-12 text-black mb-4" />
            <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
            <p className="text-gray-600">
              Choose from our collection of carefully crafted resume templates.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 hover-lift">
            <Sparkles className="w-12 h-12 text-black mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Content Assistant</h3>
            <p className="text-gray-600">
              Get smart suggestions to enhance your resume content.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 hover-lift">
            <Layout className="w-12 h-12 text-black mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Customization</h3>
            <p className="text-gray-600">
              Customize every aspect of your resume with our intuitive editor.
            </p>
          </div>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Beautiful, Professional Results</h2>
          <div className="glass rounded-2xl p-8 hover-lift">
            {/* Placeholder for resume previews */}
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Resume Preview</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
