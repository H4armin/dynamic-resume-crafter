
import { ResumeFormValues } from "@/types/resume";
import { useCustomization } from "@/contexts/CustomizationContext";
import { useMemo } from "react";

const ResumePreview = ({ data }: { data: Partial<ResumeFormValues> }) => {
  const { colors, fontSize, spacing, sectionOrder } = useCustomization();
  
  // Generate dynamic styles based on customization settings
  const styles = useMemo(() => {
    // Font size classes
    const fontSizeClasses = {
      small: {
        heading: "text-2xl",
        subheading: "text-lg",
        normal: "text-sm",
      },
      medium: {
        heading: "text-3xl",
        subheading: "text-xl",
        normal: "text-base",
      },
      large: {
        heading: "text-4xl",
        subheading: "text-2xl",
        normal: "text-lg",
      },
    };

    // Spacing classes
    const spacingClasses = {
      compact: {
        section: "mb-4",
        item: "mb-2",
      },
      normal: {
        section: "mb-8",
        item: "mb-4",
      },
      spacious: {
        section: "mb-12",
        item: "mb-6",
      },
    };

    return {
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
      { id: 'summary', order: sectionOrder.summary, component: renderSummary },
      { id: 'experience', order: sectionOrder.experience, component: renderExperience },
      { id: 'education', order: sectionOrder.education, component: renderEducation },
      { id: 'skills', order: sectionOrder.skills, component: renderSkills }
    ];
    return sections.sort((a, b) => a.order - b.order);
  }, [sectionOrder]);

  function renderSummary() {
    return (
      <div className={styles.section}>
        <h2 className={`${styles.subheading} font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2`} style={{ color: colors.primary }}>
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed" style={{ color: colors.text }}>
          {data.summary || "Add your professional summary..."}
        </p>
      </div>
    );
  }

  function renderExperience() {
    return (
      <div className={styles.section}>
        <h2 className={`${styles.subheading} font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2`} style={{ color: colors.primary }}>
          Experience
        </h2>
        {data.experience?.map((exp, index) => (
          <div key={index} className={styles.item}>
            <h3 className="font-semibold text-gray-800" style={{ color: colors.text }}>{exp.title}</h3>
            <div className="text-gray-600">{exp.company} • {exp.period}</div>
            <p className="text-gray-700 mt-2" style={{ color: colors.text }}>{exp.description}</p>
          </div>
        ))}
      </div>
    );
  }

  function renderEducation() {
    return (
      <div className={styles.section}>
        <h2 className={`${styles.subheading} font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2`} style={{ color: colors.primary }}>
          Education
        </h2>
        {data.education?.map((edu, index) => (
          <div key={index} className={styles.item}>
            <h3 className="font-semibold text-gray-800" style={{ color: colors.text }}>{edu.degree}</h3>
            <div className="text-gray-600">{edu.school} • {edu.year}</div>
          </div>
        ))}
      </div>
    );
  }

  function renderSkills() {
    return (
      <div>
        <h2 className={`${styles.subheading} font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2`} style={{ color: colors.primary }}>
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: colors.secondary + "20", color: colors.text }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="resume-preview" className="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl mx-auto" style={{ backgroundColor: colors.background }}>
      <div className="text-center mb-8">
        <h1 className={`${styles.heading} font-bold text-gray-900 mb-2`} style={{ color: colors.text }}>
          {data.fullName || "Your Name"}
        </h1>
        <div className="text-gray-600 space-x-4">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
        </div>
      </div>

      {orderedSections.map(section => (
        <section.component key={section.id} />
      ))}
    </div>
  );
};

export default ResumePreview;
