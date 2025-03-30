import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Shield, Clock, Lock, Download, CheckCircle, Edit, Layout, FileText, Award, Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

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
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
            <Sparkles className="mr-2 h-4 w-4" /> AI-Powered Resume Builder
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Create Your Perfect Resume
              <br />
              <span className="text-gray-400">in Minutes</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional templates combined with AI-powered content suggestions to help you craft the perfect resume.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 hover-lift text-lg px-8"
              onClick={() => navigate("/templates")}
            >
              Create Resume
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover-lift text-lg px-8"
              onClick={() => navigate("/templates")}
            >
              View Templates
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
              <item.icon className="w-12 h-12 mx-auto mb-4 text-black" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* How It Works - Enhanced with images and more details */}
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
            {[
              {
                number: "1",
                title: "Enter Your Details",
                desc: "Fill in your personal and professional details through our user-friendly form interface",
                icon: Edit,
                image: "/lovable-uploads/de190eac-26bf-497b-9b53-ecd4b360aedd.png",
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
                image: "/public/lovable-uploads/a779d399-caa5-4873-9919-132035b4ab09.png",
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
                image: "/public/lovable-uploads/cd91647f-7f95-44a3-95e3-81644b7849bc.png",
                bullets: [
                  "Instant PDF generation",
                  "Print-ready quality",
                  "ATS-friendly formatting"
                ]
              },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-48 object-cover object-top"
                  />
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
        
        {/* Template Showcase */}
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
        
        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Thousands of job seekers have used our platform to create winning resumes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah J.",
                role: "Marketing Specialist",
                quote: "Created my resume in under 15 minutes and got called for an interview the next day!",
                rating: 5
              },
              {
                name: "Michael T.",
                role: "Software Engineer",
                quote: "The templates are clean and professional. I love how easy it is to customize everything.",
                rating: 5
              },
              {
                name: "Emma R.",
                role: "Recent Graduate",
                quote: "As someone with little experience, this tool helped me highlight my skills effectively.",
                rating: 4
              }
            ].map((testimonial, i) => (
              <Card key={i} className="hover-lift">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star 
                        key={j} 
                        className={`h-5 w-5 ${j < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
        
        {/* Call to Action */}
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

        {/* Footer with more details */}
        <footer className="border-t border-gray-200 pt-8 mt-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <p className="text-gray-600 text-sm">
                We're dedicated to helping job seekers create professional, ATS-friendly resumes that get noticed by employers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600 text-sm">support@resumebuilder.com</p>
              <p className="text-gray-600 text-sm mt-2">Mon-Fri: 9AM - 5PM EST</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-black">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-600 mt-8 pt-8 border-t">
            <p>© 2025 Resume Builder | All rights reserved</p>
            <p className="text-sm mt-2">Helping job seekers land their dream jobs since 2023</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
