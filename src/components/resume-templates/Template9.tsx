
import { ResumeFormValues } from "@/types/resume";

export const Template9 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg">
    {/* Header with black background */}
    <div className="bg-black text-white p-8 text-center">
      {data.profileImage && (
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white">
          <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2">{data.fullName || "Andrew Bolton"}</h1>
      <p className="text-lg text-gray-300 tracking-wide">WEB DESIGNER</p>
    </div>

    <div className="p-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Profile</h2>
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
            {data.education?.map((edu, index) => (
              <div key={index} className="mb-4 flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">{edu.year}</div>
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                </div>
                <div className="text-gray-400 text-sm">GPA: 3.9/4.0</div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Employment</h2>
            {data.experience?.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm text-gray-500">{exp.period}</div>
                    <h3 className="font-bold text-gray-800">{exp.title}</h3>
                  </div>
                  <div className="text-gray-400 text-sm">New York</div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Contacts</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div>📍 2207 Beach Avenue, Los Angeles</div>
              <div>📧 {data.email}</div>
              <div>📱 {data.phone}</div>
              <div>🌐 dribbble.com/andrew.bolton</div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>
            <div className="space-y-4">
              {data.skills?.slice(0, 6).map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill}</span>
                    <span className="text-xs text-gray-500">Expert</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-800 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
