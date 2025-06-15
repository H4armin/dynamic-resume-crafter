
import { ResumeFormValues } from "@/types/resume";

export const Template16 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-gradient-to-r from-slate-50 to-blue-50 max-w-4xl mx-auto shadow-lg">
    {/* Modern Header */}
    <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-2">{data.fullName || "Professional Name"}</h1>
        <p className="text-2xl text-blue-200 mb-4">Creative Product Designer</p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>{data.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Portfolio</span>
          </div>
        </div>
      </div>
    </div>

    <div className="p-8">
      <div className="grid grid-cols-5 gap-8">
        {/* Left Sidebar */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4">About Me</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Core Skills</h3>
            <div className="grid grid-cols-2 gap-2">
              {data.skills?.map((skill, index) => (
                <div key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-xs font-medium text-center">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Education</h3>
            <div className="space-y-4">
              {data.education?.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-slate-800 text-sm">{edu.degree}</h4>
                    <span className="text-blue-600 text-xs">{edu.year}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-3 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Professional Journey</h3>
            <div className="space-y-6">
              {data.experience?.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-slate-800">{exp.title}</h4>
                      <p className="text-blue-600 font-semibold">{exp.company}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                  {index < data.experience!.length - 1 && (
                    <div className="mt-6 border-b border-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
