
import { ResumeFormValues } from "@/types/resume";

const ResumePreview = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div id="resume-preview" className="bg-white p-8 rounded-xl shadow-lg">
    {/* This component is being replaced by direct template rendering in the editor */}
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

export default ResumePreview;
