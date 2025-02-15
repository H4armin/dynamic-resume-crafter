
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
    // Handle form submission
  };

  const generateAIContent = async (field: string) => {
    setIsGenerating(true);
    try {
      // TODO: Implement Gemini AI integration
      console.log("Generating content for:", field);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Create Your Resume</h1>
            <div className="flex gap-2">
              <Button onClick={() => form.handleSubmit(onSubmit)()}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="glass rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="john@example.com" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="+1 (555) 000-0000" />
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
                      <FormLabel>Professional Summary</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Write a brief professional summary..."
                            className="h-32"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
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
              <div className="glass rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Experience</h2>
                {/* Experience fields will be implemented here */}
              </div>

              {/* Education Section */}
              <div className="glass rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                {/* Education fields will be implemented here */}
              </div>

              {/* Skills Section */}
              <div className="glass rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                {/* Skills fields will be implemented here */}
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default Editor;
