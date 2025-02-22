
import { ResumeFormValues } from "@/types/resume";

export const Template2 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg">
    <div className="border-l-4 border-blue-600 pl-6 mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.fullName || "Your Name"}</h1>
      <div className="text-gray-600">
        <span>{data.email}</span> • <span>{data.phone}</span>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Professional Summary</h2>
      <p className="text-gray-700 leading-relaxed">{data.summary}</p>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Experience</h2>
      {data.experience?.map((exp, index) => (
        <div key={index} className="mb-6">
          <h3 className="font-bold text-gray-800 text-lg">{exp.title}</h3>
          <div className="text-gray-600 mb-2">{exp.company} | {exp.period}</div>
          <p className="text-gray-700">{exp.description}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Education</h2>
        {data.education?.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold text-gray-800">{edu.degree}</h3>
            <div className="text-gray-600">{edu.school}, {edu.year}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);
