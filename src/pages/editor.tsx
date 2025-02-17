
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
import type { ResumeFormValues } from "@/types/resume";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  summary: z.string().min(50, "Professional summary should be at least 50 characters"),
  experience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    period: z.string(),
    description: z.string()
  })).min(1, "Add at least one experience"),
  education: z.array(z.object({
    degree: z.string(),
    school: z.string(),
    year: z.string()
  })).min(1, "Add at least one education entry"),
  skills: z.array(z.string()).min(3, "Add at least 3 skills")
});

const Editor = () => {
  const { templateId } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: loadResumeFromStorage() || {
      fullName: "",
      email: "",
      phone: "",
      summary: "",
      experience: [{ title: "", company: "", period: "", description: "" }],
      education: [{ degree: "", school: "", year: "" }],
      skills: []
    }
  });

  const onSubmit = async (data: ResumeFormValues) => {
    try {
      const saved = saveResumeToStorage(data);
      if (saved) {
        toast.success("Resume saved successfully!");
      } else {
        throw new Error("Failed to save resume");
      }
    } catch (error) {
      toast.error("Failed to save resume");
      console.error("Save error:", error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const success = await generatePDF("resume-preview", `${form.getValues("fullName")}_resume.pdf`);
      if (success) {
        toast.success("Resume downloaded successfully!");
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) {
      toast.error("Failed to download resume");
      console.error("Download error:", error);
    }
  };

  const ResumePreview = ({ data }: { data: Partial<ResumeFormValues> }) => (
    <div id="resume-preview" className="bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.fullName || "Your Name"}</h1>
        <div className="text-gray-600 space-x-4">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-purple-600 mb-3 border-b border-gray-200 pb-2">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {data.summary || "Add your professional summary..."}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-purple-600 mb-3 border-b border-gray-200 pb-2">
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
        <h2 className="text-xl font-semibold text-purple-600 mb-3 border-b border-gray-200 pb-2">
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
        <h2 className="text-xl font-semibold text-purple-600 mb-3 border-b border-gray-200 pb-2">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
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
                <Button onClick={form.handleSubmit(onSubmit)} variant="secondary">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleDownloadPDF} variant="outline" className="border-white/20 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
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
                        <FormControl>
                          <Textarea
                            {...field}
                            className="bg-white/5 border-white/10 text-white h-32"
                            placeholder="Write a brief professional summary..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Additional form sections for experience, education, and skills */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Experience</h2>
                  {/* Add experience fields here */}
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Education</h2>
                  {/* Add education fields here */}
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Skills</h2>
                  {/* Add skills fields here */}
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className={`${isMobile ? 'w-full' : 'w-1/2'} bg-white/5 p-6 overflow-y-auto`}>
          <div className="w-full h-full">
            <ResumePreview data={form.watch()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
