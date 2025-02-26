
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
  fullName: "Kate Bishop",
  email: "kate.bishop@katedesign.com",
  phone: "+46 98 765 43 21",
  summary: "Product Designer with expertise in creating end-to-end experiences for digital products.",
  experience: [
    {
      title: "Product Designer",
      company: "Finef",
      period: "Oct 2019 - Present",
      description: "Designing end-to-end experience for financial products on mobile & web platforms. Working closely with managers, marketing specialists and developers."
    }
  ],
  education: [
    {
      degree: "Master's in Human-Computer Interaction",
      school: "Copenhagen School of Design and Technology",
      year: "2015 - 2016"
    }
  ],
  skills: ["UI Design", "Product Discovery", "UX Research", "Prototyping", "Figma", "Adobe Illustrator"]
};
