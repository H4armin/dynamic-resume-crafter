
import { ResumeFormValues } from "@/types/resume";

export const Template15 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg border-l-8 border-orange-500">
    {/* Header */}
    <div className="p-8 bg-gray-50">
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500">
          <img 
            src={data.profileImage || '/placeholder.svg'} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.fullName || "Professional Name"}</h1>
          <p className="text-xl text-orange-600 font-semibold mb-3">Senior Product Designer</p>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      </div>
    </div>

    <div className="p-8">
      <div className="grid grid-cols-4 gap-8">
        {/* Left Column - Contact & Skills */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-orange-600 mb-4 uppercase tracking-wide">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">{data.email}</p>
              <p className="text-gray-700">{data.phone}</p>
              <p className="text-gray-700">linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '-')}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-orange-600 mb-4 uppercase tracking-wide">Skills</h3>
            <div className="space-y-3">
              {data.skills?.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-700 text-sm font-medium">{skill}</span>
                    <span className="text-orange-600 text-xs">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Columns - Experience */}
        <div className="col-span-2 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-orange-600 mb-6 uppercase tracking-wide border-b-2 border-orange-200 pb-2">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {data.experience?.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-orange-200">
                  <div className="absolute w-4 h-4 bg-orange-500 rounded-full -left-2 top-0"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
                    <span className="text-orange-600 text-sm font-medium">{exp.period}</span>
                  </div>
                  <p className="text-orange-700 font-semibold mb-2">{exp.company}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Education */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-orange-600 mb-4 uppercase tracking-wide">Education</h3>
            <div className="space-y-4">
              {data.education?.map((edu, index) => (
                <div key={index} className="border-l-4 border-orange-300 pl-3">
                  <p className="text-orange-600 text-xs font-medium">{edu.year}</p>
                  <h4 className="font-bold text-gray-900 text-sm">{edu.degree}</h4>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
