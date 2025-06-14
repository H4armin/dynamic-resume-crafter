
import { motion } from "framer-motion";
import { FileText, Download, Palette, Shield, Target, Sparkles } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Professional Templates",
    description: "Choose from a variety of modern, ATS-friendly templates designed by professionals."
  },
  {
    icon: Target,
    title: "ATS Resume Analyzer",
    description: "Compare your resume with job descriptions and get AI-powered suggestions for better match rates."
  },
  {
    icon: Sparkles,
    title: "AI-Powered Optimization",
    description: "Get intelligent recommendations for keywords, formatting, and content optimization."
  },
  {
    icon: Palette,
    title: "Easy Customization",
    description: "Personalize your resume with custom colors, fonts, and layouts that match your style."
  },
  {
    icon: Download,
    title: "Instant PDF Export",
    description: "Download your resume as a high-quality PDF ready for job applications."
  },
  {
    icon: Shield,
    title: "ATS-Friendly",
    description: "All templates are optimized to pass through Applicant Tracking Systems successfully."
  }
];

const Features = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-12"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold">Why Choose Our Resume Builder?</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Everything you need to create a standout resume that gets you noticed by employers and passes ATS systems.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <feature.icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Features;
