
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
  profileImage?: string;
}

export const defaultResumeValues: ResumeFormValues = {
  fullName: "Katherine Elizabeth Bishop",
  email: "katherine.bishop@design-professional.com",
  phone: "+46 987 654 321",
  summary: "Senior Product Designer with over 8 years of experience creating intuitive and engaging digital experiences. Specialized in user-centered design principles and design systems. Proven track record of leading design teams and delivering successful products for Fortune 500 companies.",
  experience: [
    {
      title: "Senior Product Designer",
      company: "Finef Technologies",
      period: "Jan 2021 - Present",
      description: "Lead designer for financial technology products, managing a team of 4 designers. Implemented design system that reduced design inconsistencies by 60%. Increased user engagement by 45% through redesign of core features."
    },
    {
      title: "Product Designer",
      company: "Digital Innovations Co.",
      period: "Mar 2019 - Dec 2020",
      description: "Designed user interfaces for mobile applications with over 1M+ downloads. Conducted user research and usability testing for 5 major product launches. Collaborated with development teams to ensure pixel-perfect implementation."
    },
    {
      title: "UI/UX Designer",
      company: "Creative Solutions Agency",
      period: "Jun 2017 - Feb 2019",
      description: "Created responsive web designs for 20+ client projects. Developed interactive prototypes and conducted user testing sessions. Improved client satisfaction scores by 35% through iterative design processes."
    }
  ],
  education: [
    {
      degree: "Master's in Human-Computer Interaction",
      school: "Copenhagen School of Design and Technology",
      year: "2015 - 2016"
    },
    {
      degree: "Bachelor's in Digital Design",
      school: "Stockholm University of Arts",
      year: "2011 - 2015"
    },
    {
      degree: "Certificate in User Experience Design",
      school: "Design Academy Berlin",
      year: "2014"
    }
  ],
  skills: [
    "UI Design",
    "UX Research",
    "Figma",
    "Adobe Creative Suite",
    "Prototyping",
    "Design Systems",
    "User Testing",
    "Sketch",
    "HTML/CSS",
    "Design Thinking",
    "Agile/Scrum",
    "Team Leadership"
  ],
  profileImage: "/public/uploads/a779d399-caa5-4873-9919-132035b4ab09.png"
};
