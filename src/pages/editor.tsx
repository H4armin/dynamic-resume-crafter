
import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, Download, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

type ResumeFormValues = z.infer<typeof formSchema>;

const Editor = () => {
  const { templateId } = useParams();
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: [{ title: "", company: "", period: "", description: "" }],
      education: [{ degree: "", school: "", year: "" }],
      skills: []
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const onSubmit = async (data: ResumeFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        {/* Form Section - Left Side */}
        <div className="w-1/2 overflow-y-auto p-6 border-r border-white/10">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Create Your Resume</h1>
              <div className="flex gap-2">
                <Button onClick={() => form.handleSubmit(onSubmit)()} variant="secondary">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="border-white/20 text-white">
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
                        <div className="flex gap-2">
                          <FormControl>
                            <Textarea
                              {...field}
                              className="bg-white/5 border-white/10 text-white h-32"
                              placeholder="Write a brief professional summary..."
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="border-white/20 text-white"
                            onClick={() => generateAIContent("summary")}
                            disabled={isGenerating}
                          >
                            <Wand2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Experience Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Experience</h2>
                  {/* Experience fields will be implemented here */}
                </div>

                {/* Education Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Education</h2>
                  {/* Education fields will be implemented here */}
                </div>

                {/* Skills Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Skills</h2>
                  {/* Skills fields will be implemented here */}
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Preview Section - Right Side */}
        <div className="w-1/2 bg-white/5 p-6 overflow-y-auto">
          <div className="bg-white rounded-xl h-full w-full p-8">
            {/* Resume preview will be rendered here */}
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
