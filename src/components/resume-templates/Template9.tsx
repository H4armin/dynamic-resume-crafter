
import { ResumeFormValues } from "@/types/resume";

export const Template9 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-black text-white max-w-4xl mx-auto shadow-lg">
    {/* Header */}
    <div className="p-8 text-center">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 mx-auto mb-4">
        <img 
          src={data.profileImage || '/placeholder.svg'} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold mb-2">{data.fullName || "Andrew Bolton"}</h1>
      <p className="text-xl text-gray-300 mb-6">WEB DESIGNER</p>
    </div>

    <div className="grid grid-cols-3 gap-8 p-8">
      {/* Left Column */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Profile</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{data.summary}</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-4">Contacts</h3>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">📧 {data.email}</p>
            <p className="text-gray-300">📱 {data.phone}</p>
            <p className="text-gray-300">💼 linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '-')}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-4">Skills</h3>
          <div className="space-y-3">
            {data.skills?.slice(0, 6).map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">{skill}</span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-gray-600"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Column */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Education</h3>
          <div className="space-y-4">
            {data.education?.map((edu, index) => (
              <div key={index}>
                <p className="text-gray-400 text-xs">{edu.year}</p>
                <h4 className="text-white font-semibold">{edu.school}</h4>
                <p className="text-gray-300 text-sm">{edu.degree}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-4">Employment</h3>
          <div className="space-y-4">
            {data.experience?.map((exp, index) => (
              <div key={index}>
                <p className="text-gray-400 text-xs">{exp.period}</p>
                <h4 className="text-white font-semibold">{exp.title}</h4>
                <p className="text-gray-300 text-sm">{exp.company}</p>
                <p className="text-gray-400 text-xs mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Skills</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Figma</span>
                <span className="text-gray-500">Proficient</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Sketch</span>
                <span className="text-gray-500">Expert</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Photoshop</span>
                <span className="text-gray-500">Expert</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">After Effects</span>
                <span className="text-gray-500">Proficient</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Premiere Pro</span>
                <span className="text-gray-500">Good</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Indesign</span>
                <span className="text-gray-500">Good</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
