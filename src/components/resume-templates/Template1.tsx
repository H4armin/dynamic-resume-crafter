
import { ResumeFormValues } from "@/types/resume";

export const Template1 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white p-16 rounded-xl shadow-lg max-w-5xl mx-auto">
    <div className="flex gap-12 mb-16">
      <div className="flex-1">
        <div className="text-orange-500 font-serif text-lg mb-1">Product Designer</div>
        <h1 className="font-serif text-[52px] leading-tight font-normal text-gray-900 mb-6">{data.fullName}</h1>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span>{data.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span>{data.phone}</span>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden">
          <img 
            src="/public/lovable-uploads/a779d399-caa5-4873-9919-132035b4ab09.png" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-[1.5fr,1fr] gap-16">
      <div>
        <h2 className="font-serif text-2xl text-orange-500 mb-8">Work experience</h2>
        {data.experience?.map((exp, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-serif text-gray-900 mb-1">{exp.title}</h3>
            <div className="text-gray-600 italic mb-4">{exp.company}, {exp.period}</div>
            <p className="text-gray-700 leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="font-serif text-2xl text-orange-500 mb-8">Education & Learning</h2>
          {data.education?.map((edu, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-serif text-gray-900 mb-1">{edu.degree}</h3>
              <div className="text-gray-600 italic">{edu.school}</div>
              <div className="text-gray-500">{edu.year}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-serif text-2xl text-orange-500 mb-8">Skills</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {data.skills?.map((skill, index) => (
              <span key={index} className="text-gray-700">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
