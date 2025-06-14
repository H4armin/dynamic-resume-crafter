
import { ResumeFormValues } from "@/types/resume";

export const Template12 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg">
    <div className="grid grid-cols-5">
      {/* Left Sidebar - Teal */}
      <div className="col-span-2 bg-teal-600 text-white p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-4">Profile</h3>
          <p className="text-teal-100 text-sm leading-relaxed">{data.summary}</p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Contact</h3>
          <div className="space-y-2 text-sm">
            <p className="text-teal-100">{data.email}</p>
            <p className="text-teal-100">{data.phone}</p>
            <p className="text-teal-100">linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '-')}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Education</h3>
          <div className="space-y-3">
            {data.education?.map((edu, index) => (
              <div key={index}>
                <p className="text-teal-200 text-xs">{edu.year}</p>
                <h4 className="font-semibold text-white">{edu.school}</h4>
                <p className="text-teal-100 text-sm">{edu.degree}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Skills</h3>
          <div className="space-y-2 text-sm">
            {data.skills?.map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-teal-100">{skill}</span>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-teal-300"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="col-span-3 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.fullName || "Professional Name"}</h1>
          <p className="text-xl text-teal-600">Product Designer</p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-teal-600 mb-6 border-b-2 border-teal-200 pb-2">
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience?.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
                    <span className="text-gray-500 text-sm">{exp.period}</span>
                  </div>
                  <p className="text-teal-600 font-medium mb-2">{exp.company}</p>
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
