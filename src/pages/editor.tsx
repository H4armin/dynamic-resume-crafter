
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { 
  Save, Download, Wand2, MoreHorizontal, CheckCircle2, 
  Factory, Book, Upload, Plus, Trash2, Link, Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { saveResumeToStorage, loadResumeFromStorage } from "@/utils/storage";
import { generatePDF } from "@/utils/pdf";
import { ResumeFormValues, defaultResumeValues, ExperienceItem, EducationItem } from "@/types/resume";
import { Template1 } from "@/components/resume-templates/Template1";
import { Template2 } from "@/components/resume-templates/Template2";
import { Template3 } from "@/components/resume-templates/Template3";
import { Template4 } from "@/components/resume-templates/Template4";
import { parseLinkedInProfile } from "@/utils/linkedin-parser";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  summary: z.string().min(1, "Summary is required"),
  experience: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      company: z.string().min(1, "Company is required"),
      period: z.string().min(1, "Period is required"),
      description: z.string().min(1, "Description is required")
    })
  ).min(1, "At least one experience entry is required"),
  education: z.array(
    z.object({
      degree: z.string().min(1, "Degree is required"),
      school: z.string().min(1, "School is required"),
      year: z.string().min(1, "Year is required")
    })
  ).min(1, "At least one education entry is required"),
  skills: z.array(z.string()),
  profileImage: z.string().optional(),
  linkedinUrl: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const Editor = () => {
  const { templateId } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImportingLinkedIn, setIsImportingLinkedIn] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [showLinkedinDialog, setShowLinkedinDialog] = useState(false);
  const isMobile = useIsMobile();
  const newSkillRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: loadResumeFromStorage() || defaultResumeValues,
    mode: "onChange"
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = 
    useFieldArray({
      control: form.control,
      name: "experience"
    });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = 
    useFieldArray({
      control: form.control,
      name: "education"
    });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      // This endpoint is provided by Lovable for file uploads
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { url } = await response.json();
      form.setValue('profileImage', url);
      toast.success('Profile image updated successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Submitting form data:", data);
      const saved = saveResumeToStorage(data);
      if (saved) {
        toast.success("Resume saved successfully!");
        console.log("Resume saved to storage");
      } else {
        throw new Error("Failed to save resume");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save resume");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      toast.info("Generating PDF...");
      
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

  const addNewSkill = () => {
    const skillValue = newSkillRef.current?.value.trim();
    if (skillValue && !form.getValues("skills").includes(skillValue)) {
      const currentSkills = form.getValues("skills");
      form.setValue("skills", [...currentSkills, skillValue]);
      if (newSkillRef.current) {
        newSkillRef.current.value = "";
      }
    }
  };

  const removeSkill = (indexToRemove: number) => {
    const currentSkills = form.getValues("skills");
    form.setValue("skills", currentSkills.filter((_, i) => i !== indexToRemove));
  };

  const handleImportFromLinkedIn = async () => {
    if (!linkedinUrl) {
      toast.error("Please enter a LinkedIn profile URL");
      return;
    }

    setIsImportingLinkedIn(true);
    try {
      toast.info("Importing data from LinkedIn...");
      const profileData = await parseLinkedInProfile(linkedinUrl);
      
      // Update form with LinkedIn data
      Object.entries(profileData).forEach(([key, value]) => {
        if (key !== 'profileImage') { // Don't overwrite profile image
          form.setValue(key as keyof FormValues, value as any);
        }
      });
      
      setShowLinkedinDialog(false);
      toast.success("LinkedIn data imported successfully!");
    } catch (error) {
      console.error("LinkedIn import error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to import LinkedIn data");
    } finally {
      setIsImportingLinkedIn(false);
    }
  };

  const generateAIContent = async (field: keyof FormValues, index?: number, subField?: string, action: string = "generate") => {
    setIsGenerating(true);
    try {
      // Determine what content to generate based on field and index
      let currentValue = "";
      let promptContext = "";
      
      // Handle nested fields like experience[0].description
      if (index !== undefined && subField) {
        if (field === "experience") {
          const expItem = form.getValues("experience")[index];
          currentValue = expItem[subField as keyof ExperienceItem] as string;
          promptContext = `For a ${expItem.title} at ${expItem.company} during ${expItem.period}`;
        } else if (field === "education") {
          const eduItem = form.getValues("education")[index];
          currentValue = eduItem[subField as keyof EducationItem] as string;
          promptContext = `For a ${eduItem.degree} at ${eduItem.school} in ${eduItem.year}`;
        }
      } else {
        currentValue = form.getValues(field as any);
      }

      // Create different prompts based on field and action
      let prompt = "";
      switch (action) {
        case "generate":
          if (field === "skills") {
            const jobTitle = form.getValues("experience")[0]?.title || "professional";
            prompt = `Generate 8 professional skills relevant for a ${jobTitle}. Format as a simple comma-separated list.`;
          } else if (subField === "description" && field === "experience") {
            const expItem = form.getValues("experience")[index as number];
            prompt = `Write 3 impressive bullet points for a ${expItem.title} at ${expItem.company}. Focus on achievements, metrics, and impact. Format as paragraph text.`;
          } else {
            prompt = `Generate 3 professional variations for a resume ${field}${subField ? '.' + subField : ''}. ${promptContext}. Current content: ${currentValue}. Format the response as 3 clear numbered options.`;
          }
          break;
        case "professional":
          prompt = `Make this resume ${field}${subField ? '.' + subField : ''} more professional while maintaining accuracy: ${currentValue}. ${promptContext}`;
          break;
        case "simplify":
          prompt = `Simplify this resume ${field}${subField ? '.' + subField : ''} while keeping it professional and clear: ${currentValue}. ${promptContext}`;
          break;
        case "technical":
          prompt = `Enhance the technical details in this resume ${field}${subField ? '.' + subField : ''}, focusing on industry-specific terminology and achievements: ${currentValue}. ${promptContext}`;
          break;
        default:
          prompt = `Improve this resume ${field}${subField ? '.' + subField : ''}: ${currentValue}. ${promptContext}`;
      }

      // This API key would typically be provided in the environment
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!API_KEY) {
        throw new Error("API key not configured. Please set VITE_GEMINI_API_KEY in your environment variables.");
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
      
      const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        throw new Error("No content generated");
      }

      // Set the generated content back to the form
      if (index !== undefined && subField) {
        if (field === "experience") {
          const currentExperiences = [...form.getValues("experience")];
          currentExperiences[index] = {
            ...currentExperiences[index],
            [subField]: generatedText,
          };
          form.setValue("experience", currentExperiences);
        } else if (field === "education") {
          const currentEducation = [...form.getValues("education")];
          currentEducation[index] = {
            ...currentEducation[index],
            [subField]: generatedText,
          };
          form.setValue("education", currentEducation);
        }
      } else if (field === "skills" && action === "generate") {
        // Parse comma-separated skills
        const skillList = generatedText
          .split(",")
          .map(skill => skill.trim())
          .filter(skill => skill.length > 0);
        form.setValue("skills", skillList);
      } else {
        form.setValue(field as any, generatedText);
      }

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

  const AIDropdown = ({ 
    field, 
    index, 
    subField 
  }: { 
    field: keyof FormValues; 
    index?: number; 
    subField?: string 
  }) => (
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
        <DropdownMenuItem onClick={() => generateAIContent(field, index, subField, "generate")}>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          <span>Generate Content</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateAIContent(field, index, subField, "professional")}>
          <MoreHorizontal className="mr-2 h-4 w-4" />
          <span>Make it Professional</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateAIContent(field, index, subField, "simplify")}>
          <Book className="mr-2 h-4 w-4" />
          <span>Simplify Text</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateAIContent(field, index, subField, "technical")}>
          <Factory className="mr-2 h-4 w-4" />
          <span>Enhance Technical Details</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const ResumePreview = ({ data, templateId }: { data: FormValues; templateId?: string }) => {
    switch (templateId) {
      case "template1":
        return <Template1 data={data} />;
      case "template2":
        return <Template2 data={data} />;
      case "template3":
        return <Template3 data={data} />;
      case "template4":
        return <Template4 data={data} />;
      default:
        return <Template1 data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className={`flex ${isMobile ? 'flex-col' : 'h-screen'}`}>
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} overflow-y-auto p-6 border-r border-white/10`}>
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Create Your Resume</h1>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowLinkedinDialog(true)}
                  variant="outline"
                  className="border-white/20 text-white"
                  disabled={isGenerating || isImportingLinkedIn}
                >
                  <Link className="w-4 h-4 mr-2" />
                  Import LinkedIn
                </Button>
                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  variant="secondary"
                  disabled={isGenerating || isImportingLinkedIn}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button 
                  onClick={handleDownloadPDF}
                  variant="outline"
                  className="border-white/20 text-white"
                  disabled={isGenerating || isImportingLinkedIn}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGenerating ? "Generating..." : "Download PDF"}
                </Button>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-700">
                        <img 
                          src={form.watch('profileImage') || '/placeholder.svg'} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                        <label 
                          htmlFor="profile-image" 
                          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <Upload className="w-6 h-6 text-white" />
                        </label>
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/5 border-white/10 text-white" placeholder="John Doe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" className="bg-white/5 border-white/10 text-white" placeholder="john@example.com" />
                        </FormControl>
                        <FormMessage />
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Experience Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Experience</h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white"
                      onClick={() => appendExperience({ 
                        title: "", 
                        company: "", 
                        period: "", 
                        description: "" 
                      })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                  
                  {experienceFields.map((field, index) => (
                    <div key={field.id} className="border border-white/10 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Experience #{index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={() => removeExperience(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <FormField
                          control={form.control}
                          name={`experience.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Job Title</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-white/5 border-white/10 text-white" placeholder="Product Designer" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`experience.${index}.company`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Company</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-white/5 border-white/10 text-white" placeholder="Acme Inc." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`experience.${index}.period`}
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel className="text-white">Time Period</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/5 border-white/10 text-white" placeholder="Jan 2020 - Present" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`experience.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Description</FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Textarea
                                  {...field}
                                  className="bg-white/5 border-white/10 text-white h-24"
                                  placeholder="Describe your responsibilities and achievements..."
                                />
                              </FormControl>
                              <AIDropdown field="experience" index={index} subField="description" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>

                {/* Education Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Education</h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white"
                      onClick={() => appendEducation({ 
                        degree: "", 
                        school: "", 
                        year: "" 
                      })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                  
                  {educationFields.map((field, index) => (
                    <div key={field.id} className="border border-white/10 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Education #{index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`education.${index}.degree`}
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel className="text-white">Degree</FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input {...field} className="bg-white/5 border-white/10 text-white" placeholder="Bachelor of Science" />
                              </FormControl>
                              <AIDropdown field="education" index={index} subField="degree" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`education.${index}.school`}
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel className="text-white">School</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/5 border-white/10 text-white" placeholder="University of Example" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`education.${index}.year`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Year</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/5 border-white/10 text-white" placeholder="2015 - 2019" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>

                {/* Skills Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white"
                        onClick={() => generateAIContent("skills", undefined, undefined, "generate")}
                        disabled={isGenerating}
                      >
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate Skills
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {form.watch("skills").map((skill, index) => (
                      <div 
                        key={index} 
                        className="bg-white/10 text-white px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <span>{skill}</span>
                        <button 
                          type="button" 
                          onClick={() => removeSkill(index)}
                          className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input 
                      ref={newSkillRef}
                      className="bg-white/5 border-white/10 text-white" 
                      placeholder="Add a skill..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addNewSkill();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-white/20 text-white"
                      onClick={addNewSkill}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className={`${isMobile ? 'w-full' : 'w-1/2'} bg-white/5 p-6 overflow-y-auto`}>
          <div id="resume-preview" className="w-full h-full bg-white rounded-lg shadow-lg">
            <ResumePreview data={form.watch()} templateId={templateId} />
          </div>
        </div>
      </div>

      {/* LinkedIn Import Dialog */}
      <Dialog open={showLinkedinDialog} onOpenChange={setShowLinkedinDialog}>
        <DialogContent className="bg-black/90 backdrop-blur-lg border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Import from LinkedIn</DialogTitle>
            <DialogDescription>
              Enter your LinkedIn profile URL to import your professional details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <FormItem>
              <FormLabel className="text-white">LinkedIn Profile URL</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://www.linkedin.com/in/yourprofile/"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </FormControl>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Example: https://www.linkedin.com/in/username
              </div>
            </FormItem>
          </div>

          <DialogFooter>
            <Button
              variant="outline" 
              onClick={() => setShowLinkedinDialog(false)}
              className="border-white/20 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleImportFromLinkedIn}
              disabled={isImportingLinkedIn || !linkedinUrl}
              variant="secondary"
            >
              {isImportingLinkedIn ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Link className="w-4 h-4 mr-2" />
                  Import Data
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Editor;
