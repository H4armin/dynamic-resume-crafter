
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonialsList = [
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
];

const Testimonials = () => {
  return (
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
        {testimonialsList.map((testimonial, i) => (
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
  );
};

export default Testimonials;
