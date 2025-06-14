
import { ResumeFormValues } from "@/types/resume";

export const Template8 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
    {/* Minimalist Header */}
    <div className="text-center mb-12 pb-8 border-b border-gray-200">
      <h1 className="text-5xl font-light text-gray-900 mb-4">{data.fullName || "Your Name"}</h1>
      <p className="text-xl text-gray-500 mb-6">UX/UI Designer</p>
      <div className="flex justify-center gap-8 text-gray-600">
        <span>{data.email || "email@example.com"}</span>
        <span>•</span>
        <span>{data.phone || "+1 (555) 000-0000"}</span>
      </div>
    </div>

    <div className="grid grid-cols-[1.5fr,1fr] gap-16">
      {/* Left Column */}
      <div>
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
            PROFILE
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{data.summary || "Professional summary goes here..."}</p>
        </div>

        <div>
          <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">
            EXPERIENCE
          </h2>
          {data.experience?.map((exp, index) => (
            <div key={index} className="mb-10">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-medium text-gray-800">{exp.title}</h3>
                  <p className="text-gray-600 font-medium">{exp.company}</p>
                </div>
                <span className="text-gray-500 text-sm">{exp.period}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div>
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
            SKILLS
          </h2>
          <div className="space-y-3">
            {data.skills?.map((skill, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-4"></div>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
            EDUCATION
          </h2>
          {data.education?.map((edu, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-medium text-gray-800">{edu.degree}</h3>
              <p className="text-gray-600">{edu.school}</p>
              <p className="text-gray-500">{edu.year}</p>
            </div>
          ))}
        </div>

        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <img 
            src={data.profileImage || "/placeholder.svg"}
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
);
