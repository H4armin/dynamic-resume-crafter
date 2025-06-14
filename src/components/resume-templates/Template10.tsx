
import { ResumeFormValues } from "@/types/resume";

export const Template10 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg border-4 border-blue-500">
    {/* Header */}
    <div className="bg-white p-8 text-right">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {data.fullName?.split(' ')[0] || "Rosemarie"} 
        <span className="text-blue-600"> {data.fullName?.split(' ').slice(1).join(' ') || "Sofo"}</span>, 
        <span className="text-gray-600"> Web Designer</span>
      </h1>
      <p className="text-gray-600 text-sm mb-4">2207 Bleach Avenue, Los Angeles, rosemariesofo@gmail.com, (854) 879 8743</p>
    </div>

    <div className="p-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4 border-b border-blue-200 pb-1">
              Profile
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4 border-b border-blue-200 pb-1">
              Education
            </h3>
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
        </div>

        {/* Center Column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4 border-b border-blue-200 pb-1">
              Employment
            </h3>
            <div className="space-y-4">
              {data.experience?.map((exp, index) => (
                <div key={index}>
                  <p className="text-gray-500 text-xs">{exp.period}</p>
                  <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                  <p className="text-gray-700 text-sm font-medium">{exp.company}</p>
                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4 border-b border-blue-200 pb-1">
              Skills
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sketch App</span>
                    <span className="text-gray-500">Expert</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Adobe Photoshop</span>
                    <span className="text-gray-500">Expert</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Premiere Pro</span>
                    <span className="text-gray-500">Expert</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">After Effects</span>
                    <span className="text-gray-500">Expert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4 border-b border-blue-200 pb-1">
              Figma
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">HTML/CSS</span>
                <span className="text-gray-500">Expert</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
