
import { ResumeFormValues } from "@/types/resume";

export const Template6 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
    {/* Header with Photo */}
    <div className="flex items-center gap-8 mb-12 pb-8 border-b-2 border-gray-200">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
        <img 
          src={data.profileImage || "/placeholder.svg"}
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.fullName || "Your Name"}</h1>
        <p className="text-xl text-orange-500 mb-4">Senior Product Designer</p>
        <div className="flex gap-6 text-gray-600">
          <span>{data.email || "email@example.com"}</span>
          <span>{data.phone || "+1 (555) 000-0000"}</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-[2fr,1fr] gap-12">
      {/* Left Column */}
      <div>
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{data.summary || "Professional summary goes here..."}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
            WORK EXPERIENCE
          </h2>
          {data.experience?.map((exp, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.title}</h3>
              <div className="text-orange-500 font-semibold mb-2">{exp.company} | {exp.period}</div>
              <p className="text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div>
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
            SKILLS
          </h2>
          <div className="space-y-4">
            {data.skills?.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">{skill}</span>
                  <span className="text-gray-500">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-orange-500 h-3 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
            EDUCATION
          </h2>
          {data.education?.map((edu, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold text-gray-800">{edu.degree}</h3>
              <p className="text-gray-600">{edu.school}</p>
              <p className="text-orange-500 font-semibold">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
