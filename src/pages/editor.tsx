import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, Download, Wand2, MoreHorizontal, CheckCircle2, Factory, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { saveResumeToStorage, loadResumeFromStorage } from "@/utils/storage";
import { generatePDF } from "@/utils/pdf";
import { ResumeFormValues, defaultResumeValues, ExperienceItem, EducationItem } from "@/types/resume";

const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  period: z.string().min(1, "Period is required"),
  description: z.string().min(1, "Description is required")
});

const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  school: z.string().min(1, "School is required"),
  year: z.string().min(1, "Year is required")
});

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  summary: z.string().min(50, "Professional summary should be at least 50 characters"),
  experience: z.array(experienceSchema).min(1, "Add at least one experience"),
  education: z.array(educationSchema).min(1, "Add at least one education entry"),
  skills: z.array(z.string()).min(3, "Add at least 3 skills")
});

const Editor = () => {
  const { templateId } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: loadResumeFromStorage() || defaultResumeValues,
    mode: "onChange"
  });

  const onSubmit = async (data: ResumeFormValues) => {
    try {
      console.log("Submitting form data:", data); // Debug log
      const saved = saveResumeToStorage(data);
      if (saved) {
        toast.success("Resume saved successfully!");
        console.log("Resume saved to storage"); // Debug log
      } else {
        throw new Error("Failed to save resume");
      }
    } catch (error) {
      console.error("Save error:", error); // Debug log
      toast.error("Failed to save resume");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      toast.info("Generating PDF...");
      
      // Ensure the preview is fully rendered
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const success = await generatePDF(
        "resume-preview", 
        `${form.getValues("fullName").replace(/\s+/g, '_')}_resume.pdf`
      );
      
      if (success) {
        toast.success("Resume downloaded successfully!");
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAIContent = async (field: keyof ResumeFormValues, action: string = "generate") => {
    setIsGenerating(true);
    try {
      const currentValue = form.getValues(field);
  
      // Safety check for API key
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!API_KEY) {
        throw new Error("API key not configured");
      }
  
      // Prepare the prompt based on the action
      let prompt = "";
      switch (action) {
        case "generate":
          prompt = `Generate 3 professional variations for a resume ${field}. Current content: ${currentValue}. Format the response as 3 clear numbered options.`;
          break;
        case "professional":
          prompt = `Make this resume ${field} more professional while maintaining accuracy: ${currentValue}`;
          break;
        case "simplify":
          prompt = `Simplify this resume ${field} while keeping it professional and clear: ${currentValue}`;
          break;
        case "technical":
          prompt = `Enhance the technical details in this resume ${field}, focusing on industry-specific terminology and achievements: ${currentValue}`;
          break;
        default:
          prompt = `Improve this resume ${field}: ${currentValue}`;
      }
  
      // API endpoint
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  
      // Request payload
      const requestBody = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      };
  
      // API request
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        mode: "cors",
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Extract generated content
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!generatedText) {
        throw new Error("No content generated");
      }
  
      // Update form with generated content
      form.setValue(field, generatedText);
      toast.success("Content generated successfully!");
    } catch (error) {
      let errorMessage = "Failed to generate content. Please try again.";
      if (error instanceof Error) {
        errorMessage += ` (${error.message})`;
      }
      toast.error(errorMessage);
      console.error("AI generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const AIDropdown = ({ field }: { field: keyof ResumeFormValues }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-white/20 text-white"
          disabled={isGenerating}
        >
          <Wand2 className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-lg border-white/10 text-white">
        <DropdownMenuItem onClick={() => generateAIContent(field, "generate")}>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          <span>Generate Content</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateAIContent(field, "professional")}>
          <MoreHorizontal className="mr-2 h-4 w-4" />
          <span>Make it Professional</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateAIContent(field, "simplify")}>
          <Book className="mr-2 h-4 w-4" />
          <span>Simplify Text</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateAIContent(field, "technical")}>
          <Factory className="mr-2 h-4 w-4" />
          <span>Enhance Technical Details</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const ResumePreview = ({ data }: { data: Partial<ResumeFormValues> }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.fullName || "Your Name"}</h1>
        <div className="text-gray-600 space-x-4">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {data.summary || "Add your professional summary..."}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
          Experience
        </h2>
        {data.experience?.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold text-gray-800">{exp.title}</h3>
            <div className="text-gray-600">{exp.company} • {exp.period}</div>
            <p className="text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
          Education
        </h2>
        {data.education?.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
            <div className="text-gray-600">{edu.school} • {edu.year}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className={`flex ${isMobile ? 'flex-col' : 'h-screen'}`}>
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} overflow-y-auto p-6 border-r border-white/10`}>
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Create Your Resume</h1>
              <div className="flex gap-2">
                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  variant="secondary"
                  disabled={isGenerating}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button 
                  onClick={handleDownloadPDF}
                  variant="outline"
                  className="border-white/20 text-white"
                  disabled={isGenerating}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGenerating ? "Generating..." : "Download PDF"}
                </Button>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white/5 border-white/10 text-white" placeholder="John Doe" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="bg-white/5 border-white/10 text-white" placeholder="john@example.com" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-white/5 border-white/10 text-white" placeholder="+1 (555) 000-0000" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Professional Summary</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Textarea
                              {...field}
                              className="bg-white/5 border-white/10 text-white h-32"
                              placeholder="Write a brief professional summary..."
                            />
                          </FormControl>
                          <AIDropdown field="summary" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Experience</h2>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Education</h2>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Skills</h2>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className={`${isMobile ? 'w-full' : 'w-1/2'} bg-white/5 p-6 overflow-y-auto`}>
          <div id="resume-preview" className="w-full h-full bg-white rounded-lg shadow-lg">
            <ResumePreview data={form.watch()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
