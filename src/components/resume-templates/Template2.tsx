
import { ResumeFormValues } from "@/types/resume";

export const Template2 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white p-12 rounded-xl shadow-lg max-w-5xl mx-auto">
    <div className="border-l-8 border-blue-600 pl-8 mb-12">
      <h1 className="text-[40px] font-black text-gray-900 mb-3 tracking-wide">{data.fullName || "John Doe"}</h1>
      <div className="text-gray-600 text-lg">
        {data.email} <span className="mx-2">•</span> {data.phone}
      </div>
    </div>

    <div className="mb-12">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Professional Summary</h2>
      <p className="text-gray-700 text-lg leading-relaxed">{data.summary}</p>
    </div>

    <div className="mb-12">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Experience</h2>
      {data.experience?.map((exp, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
          <div className="text-gray-600 mb-3">
            {exp.company} <span className="text-gray-400 mx-2">|</span> {exp.period}
          </div>
          <p className="text-gray-700 leading-relaxed">{exp.description}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Education</h2>
        {data.education?.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
            <div className="text-gray-600">{edu.school}, {edu.year}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, index) => (
            <span 
              key={index} 
              className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);
