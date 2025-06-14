
import { ResumeFormValues } from "@/types/resume";

export const Template14 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white max-w-4xl mx-auto shadow-lg">
    {/* Header */}
    <div className="text-center p-8 border-b border-white/20">
      <h1 className="text-4xl font-bold mb-2">{data.fullName || "Enji Kusnadi"}</h1>
      <p className="text-xl text-purple-200 mb-4">Front-End Developer / UI/UX Designer</p>
      
      <div className="flex justify-center gap-2 mb-4">
        <span className="px-3 py-1 bg-purple-600 rounded-full text-sm">React</span>
        <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">TypeScript</span>
        <span className="px-3 py-1 bg-orange-600 rounded-full text-sm">JavaScript</span>
        <span className="px-3 py-1 bg-green-600 rounded-full text-sm">Node.js</span>
      </div>
      
      <div className="text-purple-200">
        📍 Pontianak 📧 {data.email}
      </div>
    </div>

    <div className="p-8 space-y-8">
      {/* Education */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Education</h2>
        <div className="bg-white/10 rounded-lg p-4">
          {data.education?.map((edu, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{edu.school}</h3>
                <p className="text-purple-200">{edu.degree}</p>
              </div>
              <div className="text-purple-300">{edu.year}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Experience</h2>
        <div className="space-y-4">
          {data.experience?.map((exp, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{exp.company}</h3>
                  <p className="text-purple-200">{exp.title}</p>
                </div>
                <div className="text-purple-300">{exp.period}</div>
              </div>
              <ul className="text-purple-100 space-y-1 text-sm">
                <li>• {exp.description}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Tools */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-cyan-300">Skills & Tools</h2>
          <div className="grid grid-cols-3 gap-2">
            {data.skills?.map((skill, index) => (
              <div key={index} className="bg-white/10 rounded px-2 py-1 text-xs text-center">
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-cyan-300">Languages</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>English</span>
              <span className="text-purple-300">Fluent</span>
            </div>
            <div className="flex justify-between">
              <span>Indonesian</span>
              <span className="text-purple-300">Native</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
