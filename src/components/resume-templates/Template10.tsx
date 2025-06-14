
import { ResumeFormValues } from "@/types/resume";

export const Template10 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg border border-blue-300">
    {/* Header */}
    <div className="text-center p-8 border-b">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{data.fullName || "Rosemarie Soto"}, Web-Designer</h1>
      <p className="text-gray-600">{data.email} • {data.phone}</p>
    </div>

    <div className="p-8 space-y-8">
      {/* Profile */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Profile</h2>
        <p className="text-gray-600 leading-relaxed">{data.summary}</p>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
        <div className="space-y-4">
          {data.education?.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500 mb-1">{edu.year}</div>
                  <h3 className="font-bold text-gray-800">{edu.school}</h3>
                  <p className="text-gray-600">{edu.degree}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employment */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Employment</h2>
        <div className="space-y-6">
          {data.experience?.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm text-gray-500">{exp.period}</div>
                  <h3 className="font-bold text-gray-800">{exp.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>
        <div className="grid grid-cols-2 gap-8">
          {data.skills?.slice(0, 6).map((skill, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{skill}</span>
              <span className="text-sm text-gray-500">Expert</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
