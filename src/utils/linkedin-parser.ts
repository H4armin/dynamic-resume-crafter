
import { ResumeFormValues, ExperienceItem, EducationItem } from "@/types/resume";

export const parseLinkedInProfile = async (linkedinUrl: string): Promise<Partial<ResumeFormValues>> => {
  try {
    // In a real-world implementation, this would call a backend API
    // that scrapes LinkedIn or uses their API (which requires authorization)
    // For demo purposes, we'll simulate a response with a slight delay
    
    // Check if the URL seems like a LinkedIn profile
    if (!linkedinUrl.includes('linkedin.com/in/')) {
      throw new Error('Invalid LinkedIn profile URL. Should be in format: https://www.linkedin.com/in/username');
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Parse the username from URL
    const username = linkedinUrl.split('/in/')[1]?.split('/')[0]?.split('?')[0];
    
    if (!username) {
      throw new Error('Could not parse LinkedIn username from URL');
    }
    
    // Generate mock data based on username
    // In a real implementation, this would come from actual LinkedIn scraping
    const firstLetter = username.charAt(0).toUpperCase();
    const remainingLetters = username.slice(1).toLowerCase();
    const capitalizedUsername = firstLetter + remainingLetters;
    
    // Create properly typed experience items
    const experienceItems: ExperienceItem[] = [
      {
        title: `Senior ${username.length > 5 ? 'Developer' : 'Designer'}`,
        company: `${capitalizedUsername} Technologies`,
        period: `Jan ${2020 - (username.length % 3)} - Present`,
        description: `Led a team of ${username.length % 5 + 2} professionals in delivering high-quality solutions. Improved project efficiency by ${40 + (username.length % 20)}% through process optimization.`
      },
      {
        title: `${username.length % 2 === 0 ? 'Product Manager' : 'Project Lead'}`,
        company: `Global ${capitalizedUsername} Solutions`,
        period: `Mar ${2017 - (username.length % 3)} - Dec ${2019 - (username.length % 3)}`,
        description: `Managed the development of ${username.length} major projects with combined budget of $${username.length * 100}K. Increased client satisfaction by ${30 + (username.length % 15)}%.`
      }
    ];

    // Create properly typed education items
    const educationItems: EducationItem[] = [
      {
        degree: `Master's in ${username.length % 2 === 0 ? 'Computer Science' : 'Business Administration'}`,
        school: `University of ${capitalizedUsername}`,
        year: `${2010 - username.length % 5} - ${2014 - username.length % 5}`
      },
      {
        degree: `Bachelor's in ${username.length % 3 === 0 ? 'Information Technology' : 'Digital Marketing'}`,
        school: `${capitalizedUsername} State University`,
        year: `${2006 - username.length % 5} - ${2010 - username.length % 5}`
      }
    ];

    // Create properly typed skills array
    const skillsList: string[] = [
      "Problem Solving",
      `${username.length % 2 === 0 ? 'React' : 'Figma'}`,
      `${username.length % 3 === 0 ? 'Python' : 'JavaScript'}`,
      "Project Management",
      "Team Leadership",
      `${capitalizedUsername} Development`,
      "Strategic Planning",
      "Data Analysis",
      `${username.length % 2 === 0 ? 'UX Design' : 'API Integration'}`
    ];
    
    return {
      fullName: `${capitalizedUsername} ${capitalizedUsername.split('').reverse().join('')}`,
      email: `${username.toLowerCase()}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      summary: `Experienced professional with a background in ${username.length > 5 ? 'technology' : 'business'} and ${username.length % 2 === 0 ? 'marketing' : 'design'}. Passionate about creating user-centered solutions and driving innovation.`,
      experience: experienceItems,
      education: educationItems,
      skills: skillsList
    };
  } catch (error) {
    console.error('LinkedIn parsing error:', error);
    throw error;
  }
};
