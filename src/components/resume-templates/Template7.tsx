
import { ResumeFormValues } from "@/types/resume";

export const Template7 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white rounded-xl shadow-lg max-w-5xl mx-auto overflow-hidden">
    {/* Header - Green Background */}
    <div className="bg-emerald-600 text-white p-8">
      <div className="flex items-center gap-8">
        <div className="w-28 h-28 rounded-full bg-white/20 overflow-hidden">
          <img 
            src={data.profileImage || "/placeholder.svg"}
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{data.fullName || "Your Name"}</h1>
          <p className="text-emerald-100 text-xl mb-4">Creative Director</p>
          <div className="flex gap-6 text-emerald-100">
            <span>{data.email || "email@example.com"}</span>
            <span>{data.phone || "+1 (555) 000-0000"}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="p-8">
      <div className="grid grid-cols-[1fr,2fr] gap-10">
        {/* Left Column */}
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-emerald-600 mb-4 pb-2 border-b border-emerald-200">
              ABOUT ME
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary || "Professional summary goes here..."}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-emerald-600 mb-4 pb-2 border-b border-emerald-200">
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, index) => (
                <span key={index} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-emerald-600 mb-4 pb-2 border-b border-emerald-200">
              EDUCATION
            </h2>
            {data.education?.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-gray-800 text-sm">{edu.degree}</h3>
                <p className="text-gray-600 text-sm">{edu.school}</p>
                <p className="text-emerald-600 text-sm font-semibold">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-2xl font-bold text-emerald-600 mb-6 pb-2 border-b border-emerald-200">
            WORK EXPERIENCE
          </h2>
          {data.experience?.map((exp, index) => (
            <div key={index} className="mb-8 relative pl-6">
              <div className="absolute left-0 top-2 w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div className="absolute left-1.5 top-5 w-0.5 h-full bg-emerald-200"></div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{exp.title}</h3>
              <div className="text-emerald-600 font-semibold mb-2">{exp.company}</div>
              <p className="text-gray-500 text-sm mb-3">{exp.period}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
