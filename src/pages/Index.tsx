
import { motion } from "framer-motion";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import TemplatesShowcase from "@/components/landing/TemplatesShowcase";
import Testimonials from "@/components/landing/Testimonials";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container mx-auto px-4 py-8 md:py-16 space-y-20">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* How It Works */}
        <HowItWorks />
        
        {/* Template Showcase */}
        <TemplatesShowcase />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Call to Action */}
        <CallToAction />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
