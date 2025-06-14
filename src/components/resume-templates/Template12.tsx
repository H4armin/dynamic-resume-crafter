
import { ResumeFormValues } from "@/types/resume";

export const Template12 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto shadow-lg flex">
    {/* Left Sidebar */}
    <div className="bg-teal-700 text-white p-8 w-1/3">
      {data.profileImage && (
        <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-white">
          <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
        </div>
      )}
      
      <h1 className="text-2xl font-bold mb-2">{data.fullName || "Rick Tang"}</h1>
      <p className="text-teal-200 mb-8">{data.fullName?.includes("Designer") ? "Product Designer" : "Product Designer"}</p>

      {/* Details */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Details</h3>
        <div className="space-y-3 text-sm">
          <div>
            <div className="font-semibold">Address</div>
            <div className="text-teal-200">San Francisco, California</div>
          </div>
          <div>
            <div className="font-semibold">Phone</div>
            <div className="text-teal-200">{data.phone}</div>
          </div>
          <div>
            <div className="font-semibold">Email</div>
            <div className="text-teal-200">{data.email}</div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Links</h3>
        <div className="space-y-2 text-sm text-teal-200">
          <div>LinkedIn</div>
          <div>Dribbble</div>
          <div>Behance</div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-bold mb-4">Skills</h3>
        <div className="space-y-4">
          {data.skills?.slice(0, 6).map((skill, index) => (
            <div key={index}>
              <div className="text-sm mb-1">{skill}</div>
              <div className="w-full bg-teal-600 rounded-full h-1">
                <div className="bg-white h-1 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Content */}
    <div className="flex-1 p-8">
      {/* Profile */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Profile</h2>
        <p className="text-gray-600 leading-relaxed text-sm">{data.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Experience</h2>
        <div className="space-y-6">
          {data.experience?.map((exp, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-800">{exp.company}</h3>
              <div className="text-sm text-gray-600 mb-2">{exp.title} • {exp.period}</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {exp.description}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
        <div className="space-y-4">
          {data.education?.map((edu, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-800">{edu.school}</h3>
              <div className="text-sm text-gray-600">{edu.degree}, {edu.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
