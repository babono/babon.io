import { getAllExperiences, getAllEducation } from "@/lib/cms";
import { Calendar, MapPin } from "lucide-react";

export default async function Resume() {
  const [experiences, education] = await Promise.all([
    getAllExperiences(),
    getAllEducation(),
  ]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#252525' }}>
            Resume
          </h1>
          <p className="text-lg" style={{ color: '#252525', opacity: 0.8 }}>
            My professional experience and educational background
          </p>
        </div>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 pb-2" style={{ 
            color: '#252525',
            borderBottom: `2px solid #0182C6`
          }}>
            Experience
          </h2>
          
          {experiences.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">
                Add your experience entries in Payload to display them here.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 sm:mt-0">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar size={14} />
                        <span>
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {exp.description.length > 0 && (
                    <div className="mb-4">
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        {exp.description.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b-2 border-blue-600 pb-2">
            Education
          </h2>
          
          {education.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">
                Add your education entries in Payload to display them here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {edu.institution}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400">
                        {edu.degree} in {edu.field}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 sm:mt-0">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                      {edu.gpa && (
                        <p className="mt-1">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  </div>
                  
                  {edu.description && (
                    <p className="text-gray-700 dark:text-gray-300 mt-3">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Skills Section (Static for now, you can make this dynamic later) */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b-2 border-blue-600 pb-2">
            Technical Skills
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
