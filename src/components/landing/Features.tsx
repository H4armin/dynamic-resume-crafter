
import { motion } from "framer-motion";
import { Shield, Clock, Lock, Download } from "lucide-react";

const featuresList = [
  { icon: Shield, title: "Your Data, Your Privacy", desc: "We do not store or access your resume data" },
  { icon: Clock, title: "No Sign-ups Required", desc: "Use the app instantly without creating an account" },
  { icon: Lock, title: "Safe & Secure", desc: "Your information is stored locally on your system" },
  { icon: Download, title: "Instant Download", desc: "Generate and download your resume as PDF effortlessly" },
];

const Features = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {featuresList.map((item, i) => (
        <div key={i} className="glass p-6 rounded-xl text-center hover-lift">
          <item.icon className="w-12 h-12 mx-auto mb-4 text-black" />
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.desc}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default Features;
