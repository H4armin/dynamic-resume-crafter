
import { ResumeFormValues } from "@/types/resume";
import { useCustomization } from "@/contexts/CustomizationContext";
import { useMemo } from "react";

export const Template1 = ({ data }: { data: Partial<ResumeFormValues> }) => {
  const { colors, fontSize, spacing, sectionOrder } = useCustomization();
  
  // Generate dynamic styles based on customization settings
  const styles = useMemo(() => {
    // Font size classes
    const fontSizeClasses = {
      small: {
        heading: "text-2xl sm:text-3xl md:text-4xl lg:text-[46px]",
        subheading: "text-lg sm:text-xl",
        normal: "text-xs sm:text-sm",
      },
      medium: {
        heading: "text-3xl sm:text-4xl md:text-5xl lg:text-[52px]",
        subheading: "text-xl sm:text-2xl",
        normal: "text-sm sm:text-base",
      },
      large: {
        heading: "text-4xl sm:text-5xl md:text-6xl lg:text-[58px]",
        subheading: "text-2xl sm:text-3xl",
        normal: "text-base sm:text-lg",
      },
    };

    // Spacing classes
    const spacingClasses = {
      compact: {
        section: "mb-4 sm:mb-6 lg:mb-8",
        item: "mb-2 sm:mb-3",
        container: "p-2 sm:p-4 md:p-6 lg:p-8"
      },
      normal: {
        section: "mb-8 sm:mb-12 lg:mb-16",
        item: "mb-4 sm:mb-6",
        container: "p-4 sm:p-8 md:p-12 lg:p-16"
      },
      spacious: {
        section: "mb-12 sm:mb-16 lg:mb-20",
        item: "mb-6 sm:mb-8",
        container: "p-6 sm:p-10 md:p-16 lg:p-20"
      },
    };

    return {
      container: spacingClasses[spacing].container,
      section: spacingClasses[spacing].section,
      item: spacingClasses[spacing].item,
      heading: fontSizeClasses[fontSize].heading,
      subheading: fontSizeClasses[fontSize].subheading,
      normal: fontSizeClasses[fontSize].normal,
    };
  }, [fontSize, spacing]);

  // Order sections based on the customization
  const orderedSections = useMemo(() => {
    const sections = [
      { id: 'summary', order: sectionOrder.summary },
      { id: 'experience', order: sectionOrder.experience },
      { id: 'education', order: sectionOrder.education },
      { id: 'skills', order: sectionOrder.skills }
    ];
    return sections.sort((a, b) => a.order - b.order);
  }, [sectionOrder]);

  // Render section content based on ID
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <div className={styles.section}>
            <div className="text-orange-500 font-serif text-base sm:text-lg mb-1" style={{ color: colors.accent }}>
              Product Designer
            </div>
            <h1 
              className={`font-serif ${styles.heading} leading-tight font-normal text-gray-900 mb-4 sm:mb-6`}
              style={{ color: colors.text }}
            >
              {data.fullName || "Your Name"}
            </h1>
            <div className="space-y-2">
              <div className={`flex items-center gap-2 text-gray-700 ${styles.normal}`} style={{ color: colors.text }}>
                <div 
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-orange-500 flex-shrink-0" 
                  style={{ backgroundColor: colors.accent }}
                />
                <span className="break-all">{data.email || "your-email@example.com"}</span>
              </div>
              <div className={`flex items-center gap-2 text-gray-700 ${styles.normal}`} style={{ color: colors.text }}>
                <div 
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-orange-500 flex-shrink-0" 
                  style={{ backgroundColor: colors.accent }}
                />
                <span>{data.phone || "+1 (555) 000-0000"}</span>
              </div>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div>
            <h2 
              className={`font-serif ${styles.subheading} text-orange-500 mb-6 sm:mb-8`} 
              style={{ color: colors.primary }}
            >
              Work experience
            </h2>
            {data.experience?.map((exp, index) => (
              <div key={index} className={styles.item}>
                <h3 
                  className={`text-lg sm:text-xl font-serif text-gray-900 mb-1`}
                  style={{ color: colors.text }}
                >
                  {exp.title || "Job Title"}
                </h3>
                <div className={`text-gray-600 italic mb-2 sm:mb-4 ${styles.normal}`}>
                  {exp.company || "Company Name"}, {exp.period || "2020 - Present"}
                </div>
                <p 
                  className={`text-gray-700 leading-relaxed ${styles.normal}`}
                  style={{ color: colors.text }}
                >
                  {exp.description || "Job description"}
                </p>
              </div>
            ))}
            {(!data.experience || data.experience.length === 0) && (
              <div className={styles.item}>
                <h3 
                  className="text-lg sm:text-xl font-serif text-gray-900 mb-1"
                  style={{ color: colors.text }}
                >
                  Job Title
                </h3>
                <div className={`text-gray-600 italic mb-2 sm:mb-4 ${styles.normal}`}>
                  Company Name, 2020 - Present
                </div>
                <p 
                  className={`text-gray-700 leading-relaxed ${styles.normal}`}
                  style={{ color: colors.text }}
                >
                  Job description
                </p>
              </div>
            )}
          </div>
        );
      case 'education':
        return (
          <div>
            <h2 
              className={`font-serif ${styles.subheading} text-orange-500 mb-6 sm:mb-8`}
              style={{ color: colors.primary }}
            >
              Education & Learning
            </h2>
            {data.education?.map((edu, index) => (
              <div key={index} className={styles.item}>
                <h3 
                  className="text-lg sm:text-xl font-serif text-gray-900 mb-1"
                  style={{ color: colors.text }}
                >
                  {edu.degree || "Degree"}
                </h3>
                <div className={`text-gray-600 italic ${styles.normal}`}>
                  {edu.school || "School Name"}
                </div>
                <div className={`text-gray-500 ${styles.normal}`}>
                  {edu.year || "2015 - 2019"}
                </div>
              </div>
            ))}
            {(!data.education || data.education.length === 0) && (
              <div className={styles.item}>
                <h3 
                  className="text-lg sm:text-xl font-serif text-gray-900 mb-1"
                  style={{ color: colors.text }}
                >
                  Degree
                </h3>
                <div className={`text-gray-600 italic ${styles.normal}`}>
                  School Name
                </div>
                <div className={`text-gray-500 ${styles.normal}`}>
                  2015 - 2019
                </div>
              </div>
            )}
          </div>
        );
      case 'skills':
        return (
          <div>
            <h2 
              className={`font-serif ${styles.subheading} text-orange-500 mb-6 sm:mb-8`}
              style={{ color: colors.primary }}
            >
              Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {data.skills?.map((skill, index) => (
                <span 
                  key={index} 
                  className={`text-gray-700 ${styles.normal}`}
                  style={{ color: colors.text }}
                >
                  {skill}
                </span>
              ))}
              {(!data.skills || data.skills.length === 0) && (
                <>
                  <span className={`text-gray-700 ${styles.normal}`} style={{ color: colors.text }}>Skill 1</span>
                  <span className={`text-gray-700 ${styles.normal}`} style={{ color: colors.text }}>Skill 2</span>
                  <span className={`text-gray-700 ${styles.normal}`} style={{ color: colors.text }}>Skill 3</span>
                  <span className={`text-gray-700 ${styles.normal}`} style={{ color: colors.text }}>Skill 4</span>
                </>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`bg-white ${styles.container} rounded-xl shadow-lg max-w-5xl mx-auto`}
      style={{ backgroundColor: colors.background }}
    >
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
        <div className="flex-1 order-2 sm:order-1">
          {renderSection('summary')}
        </div>
        <div className="flex-shrink-0 order-1 sm:order-2 mx-auto sm:mx-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-100 overflow-hidden">
            <img 
              src={data.profileImage || "/placeholder.svg"}
              alt="Profile" 
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1.5fr,1fr] gap-8 sm:gap-12 lg:gap-16">
        <div>
          {orderedSections
            .filter(section => section.id === 'experience')
            .map(section => (
              <div key={section.id}>
                {renderSection(section.id)}
              </div>
            ))}
        </div>
        <div className="space-y-8 sm:space-y-12">
          {orderedSections
            .filter(section => ['education', 'skills'].includes(section.id))
            .map(section => (
              <div key={section.id}>
                {renderSection(section.id)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
