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
import { toast } from "sonner";

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
  const [isGenerating, setIsGenerating] = useState(false);
  
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      summary: "",
      experience: [{ title: "", company: "", period: "", description: "" }],
      education: [{ degree: "", school: "", year: "" }],
      skills: []
    }
  });

  const generateAIContent = async (field: keyof ResumeFormValues) => {
    setIsGenerating(true);
    try {
      const prompt = getPromptForField(field, form.getValues());
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      form.setValue(field, data.content);
      toast.success("Content generated successfully!");
    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
      console.error("AI generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getPromptForField = (field: keyof ResumeFormValues, values: ResumeFormValues) => {
    switch (field) {
      case "summary":
        return `Write a professional summary for someone with the following details:
                Name: ${values.fullName}
                Experience: ${values.experience.map(e => e.title).join(", ")}
                Skills: ${values.skills.join(", ")}`;
      default:
        return "";
    }
  };

  const onSubmit = async (data: ResumeFormValues) => {
    console.log("Form submitted:", data);
    toast.success("Resume saved successfully!");
  };

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
      <div className="flex h-screen">
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

        <div className="w-1/2 bg-white/5 p-6 overflow-y-auto">
          <div className="w-full h-full">
            <ResumePreview data={form.watch()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
