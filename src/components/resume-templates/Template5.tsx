
import { ResumeFormValues } from "@/types/resume";

export const Template5 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
    <div className="grid grid-cols-[1fr,2fr] gap-8">
      {/* Left Column - Dark Blue */}
      <div className="bg-slate-800 text-white p-6 rounded-lg">
        <div className="text-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
            <img 
              src={data.profileImage || "/placeholder.svg"}
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">{data.fullName || "Your Name"}</h1>
          <p className="text-blue-300 text-lg">Product Designer</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-blue-300">CONTACT</h2>
          <div className="space-y-3 text-sm">
            <div>{data.email || "email@example.com"}</div>
            <div>{data.phone || "+1 (555) 000-0000"}</div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-blue-300">SKILLS</h2>
          <div className="space-y-3">
            {data.skills?.map((skill, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>{skill}</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full w-[90%]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-blue-300">EDUCATION</h2>
          {data.education?.map((edu, index) => (
            <div key={index} className="mb-4 text-sm">
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-gray-300">{edu.school}</p>
              <p className="text-gray-400">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - White */}
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">ABOUT ME</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary || "Professional summary goes here..."}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">WORK EXPERIENCE</h2>
          {data.experience?.map((exp, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{exp.title}</h3>
                  <p className="text-blue-600 font-semibold">{exp.company}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-3 ml-7">{exp.period}</p>
              <p className="text-gray-700 ml-7">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
