
import { ResumeFormValues } from "@/types/resume";

export const Template3 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden">
    <div className="grid grid-cols-[1fr,2.5fr]">
      <div className="bg-gray-900 text-white p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{data.fullName || "Your Name"}</h1>
          <div className="text-gray-400 text-sm space-y-1">
            <div>{data.email}</div>
            <div>{data.phone}</div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills?.map((skill, index) => (
              <span key={index} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Education</h2>
          {data.education?.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{edu.degree}</h3>
              <div className="text-gray-400 text-sm">{edu.school}, {edu.year}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
          {data.experience?.map((exp, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold text-gray-800 text-lg">{exp.title}</h3>
              <div className="text-gray-600 mb-2">{exp.company} | {exp.period}</div>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
