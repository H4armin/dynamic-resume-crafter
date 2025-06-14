
import { ResumeFormValues } from "@/types/resume";

export const Template14 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-gradient-to-br from-purple-100 to-blue-100 max-w-4xl mx-auto shadow-lg relative overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full -translate-y-20 translate-x-20 opacity-70"></div>
    <div className="absolute bottom-0 left-0 w-60 h-40 bg-purple-400 rounded-tr-full opacity-60"></div>

    <div className="relative z-10 p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">{data.fullName || "Professional Name"}</h1>
        <p className="text-2xl text-blue-600 font-medium">Product Designer</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">{data.email}</p>
              <p className="text-gray-700">{data.phone}</p>
              <p className="text-gray-700">linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '-')}</p>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Skills</h3>
            <div className="space-y-2">
              {data.skills?.slice(0, 8).map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">{skill}</span>
                  <div className="w-12 bg-gray-300 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Education</h3>
            <div className="space-y-3">
              {data.education?.map((edu, index) => (
                <div key={index}>
                  <p className="text-gray-500 text-xs">{edu.year}</p>
                  <h4 className="font-semibold text-gray-900 text-sm">{edu.school}</h4>
                  <p className="text-gray-700 text-xs">{edu.degree}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center and Right Columns */}
        <div className="col-span-2">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h3>
            <div className="space-y-6">
              {data.experience?.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
                    <span className="text-gray-500 text-sm">{exp.period}</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Summary</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
