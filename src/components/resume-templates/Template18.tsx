
import { ResumeFormValues } from "@/types/resume";

export const Template18 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg border border-gray-200">
    {/* Minimalist Header */}
    <div className="border-b-4 border-rose-500 p-8">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-light text-gray-900 mb-2">{data.fullName || "Professional Name"}</h1>
        <p className="text-2xl text-rose-600 font-light tracking-wide">Product Designer</p>
      </div>
      
      <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
          <span>{data.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
          <span>{data.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
          <span>linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '-')}</span>
        </div>
      </div>
    </div>

    <div className="p-8">
      <div className="grid grid-cols-1 gap-12">
        {/* Summary */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-0.5 bg-rose-500 mx-auto mb-6"></div>
            <p className="text-gray-700 leading-relaxed text-lg font-light">{data.summary}</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-12">
          {/* Experience - 2 columns */}
          <div className="col-span-2">
            <h3 className="text-3xl font-light text-gray-900 mb-8 text-center">
              Experience
              <div className="w-12 h-0.5 bg-rose-500 mx-auto mt-2"></div>
            </h3>
            <div className="space-y-8">
              {data.experience?.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-medium text-gray-900 mb-1">{exp.title}</h4>
                    <p className="text-rose-600 font-medium">{exp.company}</p>
                    <p className="text-gray-500 text-sm mt-1">{exp.period}</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-center">{exp.description}</p>
                  {index < data.experience!.length - 1 && (
                    <div className="mt-8 flex justify-center">
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Education - 1 column */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">
                Skills
                <div className="w-8 h-0.5 bg-rose-500 mx-auto mt-2"></div>
              </h3>
              <div className="space-y-3">
                {data.skills?.map((skill, index) => (
                  <div key={index} className="text-center">
                    <span className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-light">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">
                Education
                <div className="w-8 h-0.5 bg-rose-500 mx-auto mt-2"></div>
              </h3>
              <div className="space-y-4">
                {data.education?.map((edu, index) => (
                  <div key={index} className="text-center">
                    <p className="text-rose-600 text-sm font-medium mb-1">{edu.year}</p>
                    <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-600 text-sm">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
