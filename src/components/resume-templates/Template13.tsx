
import { ResumeFormValues } from "@/types/resume";

export const Template13 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg relative overflow-hidden">
    {/* Decorative shapes */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-200 rounded-full translate-y-20 -translate-x-20 opacity-60"></div>
    <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-80"></div>

    <div className="relative z-10 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">{data.fullName || "Rick Tang"}</h1>
        <p className="text-xl text-gray-600 mb-4">Product Designer</p>
        <p className="text-gray-600 leading-relaxed max-w-2xl">{data.summary}</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Experience</h2>
            <div className="space-y-6">
              {data.experience?.map((exp, index) => (
                <div key={index}>
                  <h3 className="font-bold text-gray-800 text-lg">{exp.company}</h3>
                  <div className="text-gray-600 mb-2">{exp.title} • {exp.period}</div>
                  <ul className="text-gray-600 space-y-1">
                    <li>• {exp.description}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Education</h2>
            <div className="space-y-4">
              {data.education?.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-bold text-gray-800">{edu.school}</h3>
                  <div className="text-gray-600">{edu.degree}, {edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Details */}
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-semibold text-gray-800">Address</div>
                <div className="text-gray-600">San Francisco, California</div>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Phone</div>
                <div className="text-gray-600">{data.phone}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Email</div>
                <div className="text-gray-600">{data.email}</div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">Skills</h3>
            <div className="space-y-3">
              {data.skills?.map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{skill}</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">Links</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>LinkedIn</div>
              <div>Dribbble</div>
              <div>Behance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
