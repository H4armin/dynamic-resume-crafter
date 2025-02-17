
import { motion } from "framer-motion";
import { ChevronRight, Shield, Download, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container mx-auto px-4 py-8 md:py-16 space-y-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex rounded-full bg-black/5 px-3 py-1 text-sm leading-6 text-black ring-1 ring-black/10 hover:ring-black/20 mb-8">
            AI-Powered Resume Builder
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Build Your Resume Instantly
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Secure, Private, and Free!
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create, edit, and download your resume with ease, without worrying about data security.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-violet-600 text-white hover:bg-violet-700 hover-lift"
              onClick={() => navigate("/templates")}
            >
              Create Resume
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { icon: Shield, title: "Your Data, Your Privacy", desc: "We do not store or access your resume data" },
            { icon: Clock, title: "No Sign-ups Required", desc: "Use the app instantly without creating an account" },
            { icon: Lock, title: "Safe & Secure", desc: "Your information is stored locally on your system" },
            { icon: Download, title: "Instant Download", desc: "Generate and download your resume as PDF effortlessly" },
          ].map((item, i) => (
            <div key={i} className="glass p-6 rounded-xl text-center hover-lift">
              <item.icon className="w-12 h-12 mx-auto mb-4 text-violet-600" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl font-bold">How It Works?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "1", title: "Enter Your Details", desc: "Fill in your personal and professional details" },
              { number: "2", title: "Customize Your Resume", desc: "Choose from various templates and styles" },
              { number: "3", title: "Preview & Download", desc: "Save your resume as a PDF directly on your device" },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-4xl font-bold text-violet-600 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8 mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600">support@resumebuilder.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="space-x-4">
                <a href="#" className="text-gray-600 hover:text-violet-600">Twitter</a>
                <a href="#" className="text-gray-600 hover:text-violet-600">LinkedIn</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-x-4">
                <a href="#" className="text-gray-600 hover:text-violet-600">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-violet-600">Terms & Conditions</a>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-600 mt-8 pt-8 border-t">
            © 2025 Resume Builder | All rights reserved
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
