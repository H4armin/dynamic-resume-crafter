
import { ResumeFormValues } from "@/types/resume";

export const Template1 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg">
    <div className="flex gap-6">
      <div className="w-2/3">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.fullName || "Your Name"}</h1>
        <div className="text-gray-600 mb-6">
          <span>{data.email}</span> • <span>{data.phone}</span>
        </div>
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      </div>
      <div className="w-1/3">
        <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
      </div>
    </div>

    <div className="grid grid-cols-[2fr,1fr] gap-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Experience</h2>
        {data.experience?.map((exp, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-bold text-gray-800">{exp.title}</h3>
            <div className="text-gray-600 mb-2">{exp.company} | {exp.period}</div>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Education</h2>
          {data.education?.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold text-gray-800">{edu.degree}</h3>
              <div className="text-gray-600">{edu.school}, {edu.year}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">Skills</h2>
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
  </div>
);
