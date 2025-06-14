
import { ResumeFormValues } from "@/types/resume";

export const Template11 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg relative">
    {/* Decorative corner elements */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 opacity-80"></div>
    <div className="absolute bottom-0 right-0 w-32 h-20 bg-blue-400 opacity-60 rounded-tl-full"></div>

    <div className="p-8 relative z-10">
      {/* Header */}
      <div className="text-right mb-8">
        <h1 className="text-5xl font-bold text-blue-900 mb-2">
          {data.fullName?.split(' ')[0] || "Rick"} 
          <span className="block text-6xl">{data.fullName?.split(' ')[1] || "Tang"}</span>
        </h1>
      </div>

      <div className="grid grid-cols-5 gap-8">
        {/* Left Column - 2/5 width */}
        <div className="col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">Profile</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">{data.email}</p>
              <p className="text-gray-700">{data.phone}</p>
              <p className="text-gray-700">linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '-')}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">Education</h3>
            <div className="space-y-3">
              {data.education?.map((edu, index) => (
                <div key={index}>
                  <p className="text-gray-500 text-xs">{edu.year}</p>
                  <h4 className="font-semibold text-gray-900">{edu.school}</h4>
                  <p className="text-gray-700 text-sm">{edu.degree}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">Skills</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {data.skills?.slice(0, 8).map((skill, index) => (
                <p key={index} className="text-gray-700">{skill}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 3/5 width */}
        <div className="col-span-3 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-6 border-b-2 border-blue-200 pb-2">
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience?.map((exp, index) => (
                <div key={index}>
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
        </div>
      </div>
    </div>
  </div>
);
