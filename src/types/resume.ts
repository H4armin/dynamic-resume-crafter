
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
