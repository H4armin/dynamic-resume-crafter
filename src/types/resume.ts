
export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  year: string;
}

export interface ResumeFormValues {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

export const defaultResumeValues: ResumeFormValues = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 890",
  summary: "Experienced professional with a track record of success in...",
  experience: [{
    title: "Senior Developer",
    company: "Tech Corp",
    period: "2020 - Present",
    description: "Led development teams and implemented key features..."
  }],
  education: [{
    degree: "Bachelor of Science in Computer Science",
    school: "University of Technology",
    year: "2019"
  }],
  skills: ["JavaScript", "React", "TypeScript", "Node.js"]
};
