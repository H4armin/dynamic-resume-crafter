
import { ResumeFormValues } from "@/types/resume";

export const Template1 = ({ data }: { data: Partial<ResumeFormValues> }) => (
  <div className="bg-white p-4 sm:p-8 md:p-12 lg:p-16 rounded-xl shadow-lg max-w-5xl mx-auto">
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
      <div className="flex-1 order-2 sm:order-1">
        <div className="text-orange-500 font-serif text-base sm:text-lg mb-1">Product Designer</div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-tight font-normal text-gray-900 mb-4 sm:mb-6">
          {data.fullName}
        </h1>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-orange-500 flex-shrink-0" />
            <span className="break-all">{data.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-orange-500 flex-shrink-0" />
            <span>{data.phone}</span>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 order-1 sm:order-2 mx-auto sm:mx-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-100 overflow-hidden">
          <img 
            src={data.profileImage || "/placeholder.svg"}
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-[1.5fr,1fr] gap-8 sm:gap-12 lg:gap-16">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-orange-500 mb-6 sm:mb-8">Work experience</h2>
        {data.experience?.map((exp, index) => (
          <div key={index} className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-serif text-gray-900 mb-1">{exp.title}</h3>
            <div className="text-gray-600 italic mb-2 sm:mb-4 text-sm sm:text-base">
              {exp.company}, {exp.period}
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-8 sm:space-y-12">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl text-orange-500 mb-6 sm:mb-8">Education & Learning</h2>
          {data.education?.map((edu, index) => (
            <div key={index} className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-serif text-gray-900 mb-1">{edu.degree}</h3>
              <div className="text-gray-600 italic text-sm sm:text-base">{edu.school}</div>
              <div className="text-gray-500 text-sm sm:text-base">{edu.year}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-serif text-xl sm:text-2xl text-orange-500 mb-6 sm:mb-8">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {data.skills?.map((skill, index) => (
              <span key={index} className="text-gray-700 text-sm sm:text-base">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
