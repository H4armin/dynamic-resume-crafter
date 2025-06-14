
import { ResumeFormValues } from "@/types/resume";

export const Template11 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg border border-blue-300">
    {/* Header with photo */}
    <div className="p-8">
      <div className="flex items-start gap-6 mb-8">
        {data.profileImage && (
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <div className="text-sm text-blue-600 mb-1">WEB-DESIGNER</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{data.fullName || "Sherry Betts"}</h1>
          <div className="space-y-1 text-sm text-gray-600">
            <div>📧 {data.email}</div>
            <div>📍 2207 Beach Avenue, Los Angeles</div>
            <div>🌐 behance.com/sherrybetts</div>
            <div>📱 {data.phone}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          {/* Profile */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Profile</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{data.summary}</p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Education</h2>
            <div className="space-y-4">
              {data.education?.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-gray-500">{edu.year}</div>
                    <h3 className="font-bold text-gray-800 text-sm">{edu.school}</h3>
                    <p className="text-gray-600 text-sm">{edu.degree}</p>
                  </div>
                  <div className="text-xs text-gray-400">Los Angeles</div>
                </div>
              ))}
            </div>
          </div>

          {/* Employment */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Employment</h2>
            <div className="space-y-6">
              {data.experience?.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-xs text-gray-500">{exp.period}</div>
                      <h3 className="font-bold text-gray-800 text-sm">{exp.title}</h3>
                    </div>
                    <div className="text-xs text-gray-400">Los Angeles</div>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Skills</h2>
          <div className="space-y-3">
            {data.skills?.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
