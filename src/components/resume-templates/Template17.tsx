
import { ResumeFormValues } from "@/types/resume";

export const Template17 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg relative">
    {/* Creative Header with Geometric Design */}
    <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-8 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 transform rotate-45 translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 translate-y-12"></div>
      
      <div className="relative z-10 text-center">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 mx-auto mb-4">
          <img 
            src={data.profileImage || '/placeholder.svg'} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold mb-2">{data.fullName || "Professional Name"}</h1>
        <p className="text-xl text-emerald-100 mb-4">Innovative Product Designer</p>
        <div className="inline-flex items-center gap-6 text-sm">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>Portfolio</span>
        </div>
      </div>
    </div>

    <div className="p-8">
      <div className="grid grid-cols-1 gap-8 mb-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-emerald-700 mb-4">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">{data.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Experience - Takes 2 columns */}
        <div className="col-span-2 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center">
              <div className="w-8 h-1 bg-emerald-500 mr-3"></div>
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience?.map((exp, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{exp.title}</h4>
                      <p className="text-emerald-600 font-semibold text-lg">{exp.company}</p>
                    </div>
                    <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Education */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center">
              <div className="w-8 h-1 bg-emerald-500 mr-3"></div>
              Skills
            </h3>
            <div className="space-y-3">
              {data.skills?.map((skill, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium text-gray-800">{skill}</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i < 4 ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center">
              <div className="w-8 h-1 bg-emerald-500 mr-3"></div>
              Education
            </h3>
            <div className="space-y-4">
              {data.education?.map((edu, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                    <span className="text-emerald-600 text-sm font-medium">{edu.year}</span>
                  </div>
                  <p className="text-gray-600">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
