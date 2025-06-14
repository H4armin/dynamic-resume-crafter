
import { ResumeFormValues } from "@/types/resume";

export const Template4 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-gray-50 max-w-4xl mx-auto shadow-lg">
    {/* Header */}
    <div className="bg-gray-600 text-white p-8">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20">
          <img 
            src={data.profileImage || '/placeholder.svg'} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{data.fullName || "Kate Bishop"}</h1>
          <p className="text-xl text-gray-200">Product Designer</p>
        </div>
      </div>
    </div>

    <div className="p-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              Email
            </h3>
            <p className="text-gray-700 text-sm">{data.email}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              LinkedIn
            </h3>
            <p className="text-gray-700 text-sm">linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '-')}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              Phone
            </h3>
            <p className="text-gray-700 text-sm">{data.phone}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              Skills
            </h3>
            <div className="space-y-1 text-sm">
              {data.skills?.map((skill, index) => (
                <p key={index} className="text-gray-700">{skill}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-4">Work experience</h3>
            <div className="space-y-4">
              {data.experience?.map((exp, index) => (
                <div key={index}>
                  <h4 className="font-bold text-gray-900">{exp.title}</h4>
                  <p className="text-gray-600 font-medium">{exp.company}</p>
                  <p className="text-gray-500 text-sm">{exp.period}</p>
                  <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-4">Education & learning</h3>
            <div className="space-y-4">
              {data.education?.map((edu, index) => (
                <div key={index}>
                  <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-gray-500 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
