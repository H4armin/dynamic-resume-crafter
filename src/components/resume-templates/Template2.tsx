
import { ResumeFormValues } from "@/types/resume";

export const Template2 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg">
    {/* Header */}
    <div className="bg-white p-8 border-b">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.fullName || "Kate Bishop"}</h1>
      <p className="text-xl text-blue-600 font-semibold mb-4">Product Designer</p>
      <p className="text-gray-700 max-w-3xl">{data.summary}</p>
    </div>

    <div className="p-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">{data.email}</p>
              <p className="text-gray-700">linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '-')}</p>
              <p className="text-gray-700">{data.phone}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Skills</h3>
            <div className="space-y-1 text-sm">
              {data.skills?.map((skill, index) => (
                <p key={index} className="text-gray-700">{skill}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column - Experience */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-4">Work experience</h3>
            <div className="space-y-4">
              {data.experience?.map((exp, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4">
                  <h4 className="font-bold text-gray-900">{exp.title}</h4>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-gray-600 text-sm italic">{exp.period}</p>
                  <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Education */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-4">Education & learning</h3>
            <div className="space-y-4">
              {data.education?.map((edu, index) => (
                <div key={index}>
                  <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-gray-500 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
