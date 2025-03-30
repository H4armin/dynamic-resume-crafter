
import { motion } from "framer-motion";
import { Edit, Layout, FileText, CheckCircle } from "lucide-react";
import ThreeDStepIcon from "@/components/ThreeDStepIcon";

const steps = [
  {
    number: "1",
    title: "Enter Your Details",
    desc: "Fill in your personal and professional details through our user-friendly form interface",
    icon: Edit,
    color: "#ff4d4d",
    bullets: [
      "Simple form interface",
      "AI-powered suggestions",
      "Save as you go"
    ]
  },
  {
    number: "2",
    title: "Customize Your Resume",
    desc: "Choose from various templates and styles to match your professional persona",
    icon: Layout,
    color: "#4da6ff",
    bullets: [
      "Multiple professional templates",
      "Customize colors and fonts",
      "Rearrange sections easily"
    ]
  },
  {
    number: "3",
    title: "Preview & Download",
    desc: "Review your finished resume and save it as a PDF directly on your device",
    icon: FileText,
    color: "#4dff88",
    bullets: [
      "Instant PDF generation",
      "Print-ready quality",
      "ATS-friendly formatting"
    ]
  }
];

const HowItWorks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-12"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold">How It Works?</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Our simple three-step process helps you create professional resumes in minutes, no experience needed.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative mb-6 w-full">
              <ThreeDStepIcon step={i + 1} color={step.color} />
            </div>
            
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-gray-600 mb-4 text-center">{step.desc}</p>
            
            <ul className="space-y-2 text-left w-full">
              {step.bullets.map((bullet, j) => (
                <li key={j} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HowItWorks;
