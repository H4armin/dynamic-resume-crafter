
import { ResumeFormValues } from "@/types/resume";

export const Template1 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white max-w-4xl mx-auto p-8 shadow-lg">
    {/* Header Section with Photo */}
    <div className="flex items-start gap-6 mb-8">
      <div className="flex-shrink-0">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
          <img 
            src={data.profileImage || '/placeholder.svg'} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-orange-600 mb-1">
          {data.fullName || "Kate"}
        </h1>
        <h2 className="text-xl font-semibold text-orange-500 mb-1">
          {data.fullName?.split(' ')[1] || "Bishop"}
        </h2>
        <p className="text-lg text-orange-600 font-medium mb-4">Product Designer</p>
        
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span className="text-gray-700">{data.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span className="text-gray-700">linkedin.com/in/{data.fullName?.toLowerCase().replace(' ', '-')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span className="text-gray-700">{data.phone}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-5 gap-8">
      {/* Left Column - 3/5 width */}
      <div className="col-span-3 space-y-6">
        {/* Work Experience */}
        <div>
          <h3 className="text-xl font-bold text-orange-600 mb-4 border-b-2 border-orange-200 pb-1">
            Work experience
          </h3>
          <div className="space-y-4">
            {data.experience?.map((exp, index) => (
              <div key={index}>
                <h4 className="font-bold text-gray-800">{exp.title}</h4>
                <p className="text-gray-600 italic">{exp.company}, {exp.period}</p>
                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Associate UX Designer */}
        <div>
          <h4 className="font-bold text-gray-800">Associate UX Designer</h4>
          <p className="text-gray-600 italic">Gensility, Dec 2016 - Aug 2017</p>
          <p className="text-gray-700 text-sm mt-1">
            Redesigned company's homepage and lead generation forms using existing design system. 
            Reduced user time on browsing leads by 40% and increased leads by 15%.
          </p>
        </div>
      </div>

      {/* Right Column - 2/5 width */}
      <div className="col-span-2 space-y-6">
        {/* Education & Learning */}
        <div>
          <h3 className="text-xl font-bold text-blue-600 mb-4">Education & Learning</h3>
          <div className="space-y-4">
            {data.education?.map((edu, index) => (
              <div key={index}>
                <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-gray-500 text-sm">{edu.year}</p>
              </div>
            ))}
            
            <div>
              <h4 className="font-bold text-gray-800">Design Leadership Masterclass</h4>
              <p className="text-gray-600">Design Lab</p>
              <p className="text-gray-500 text-sm">Jan 2021</p>
            </div>

            <div>
              <h4 className="font-bold text-gray-800">UX Interaction Designer</h4>
              <p className="text-gray-600">Designlab</p>
              <p className="text-gray-500 text-sm">Nov 2016</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-xl font-bold text-orange-600 mb-4">Skills</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {data.skills?.slice(0, 12).map((skill, index) => (
              <div key={index} className="text-gray-700">{skill}</div>
            )) || [
              "Product discovery", "UI design", "Figma",
              "Business analysis", "Illustration", "Sketch", 
              "UX research & testing", "Interaction design", "Adobe Illustrator",
              "Wireframing", "User journey mapping", "Prototyping",
              "Information architecture", "Design sprints", "Miro",
              "Marketing", "Workshop facilitation", "Notion",
              "Prototyping", "A/B testing", "Jira"
            ].map((skill, index) => (
              <div key={index} className="text-gray-700">{skill}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
