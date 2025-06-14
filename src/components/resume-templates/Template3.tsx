
import { ResumeFormValues } from "@/types/resume";

export const Template3 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg">
    <div className="grid grid-cols-3">
      {/* Left Sidebar */}
      <div className="bg-blue-600 text-white p-8 space-y-6">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 mx-auto mb-4">
            <img 
              src={data.profileImage || '/placeholder.svg'} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold">{data.fullName || "Kate"}</h1>
          <h2 className="text-xl font-bold">{data.fullName?.split(' ')[1] || "Bishop"}</h2>
          <p className="text-blue-200 mt-2">Product Designer</p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Contact</h3>
          <div className="space-y-2 text-sm">
            <p className="text-blue-100">{data.email}</p>
            <p className="text-blue-100">linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '-')}</p>
            <p className="text-blue-100">{data.phone}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Skills</h3>
          <div className="space-y-1 text-sm">
            {data.skills?.map((skill, index) => (
              <p key={index} className="text-blue-100">{skill}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="col-span-2 p-8 space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">
            Work experience
          </h3>
          <div className="space-y-6">
            {data.experience?.map((exp, index) => (
              <div key={index}>
                <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
                <p className="text-blue-600 font-medium">{exp.company}</p>
                <p className="text-gray-600 text-sm">{exp.period}</p>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">
            Education & learning
          </h3>
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
);
