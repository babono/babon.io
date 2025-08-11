import Image from "next/image";
import Link from "next/link";
import { getProjects } from "../../lib/notion-utils";
import { Github, ExternalLink, Calendar } from "lucide-react";

export default async function Projects() {
  const projects = await getProjects();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#252525' }}>
            Projects
          </h1>
          <p className="text-lg" style={{ color: '#252525', opacity: 0.8 }}>
            A collection of my work and side projects
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No projects found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Connect your Notion database to display your projects here.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                To set up your projects:
              </h3>
              <ol className="text-left text-gray-600 dark:text-gray-300 space-y-2">
                <li>1. Create a Notion database with the following properties:</li>
                <li className="ml-4">• Name (Title)</li>
                <li className="ml-4">• Description (Rich Text)</li>
                <li className="ml-4">• Technologies (Multi-select)</li>
                <li className="ml-4">• GitHub URL (URL)</li>
                <li className="ml-4">• Live URL (URL)</li>
                <li className="ml-4">• Featured (Checkbox)</li>
                <li className="ml-4">• Start Date (Date)</li>
                <li className="ml-4">• Image (Files)</li>
                <li>2. Add your projects to the database</li>
                <li>3. Add the database ID to your .env.local file</li>
              </ol>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            {projects.some(p => p.featured) && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Featured Projects
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {projects
                    .filter(project => project.featured)
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} featured />
                    ))}
                </div>
              </section>
            )}

            {/* All Projects */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {projects.some(p => p.featured) ? 'Other Projects' : 'All Projects'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter(project => !project.featured)
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: any; featured?: boolean }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden ${featured ? 'lg:col-span-1' : ''}`}>
      {project.imageUrl && (
        <div className="aspect-video relative">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className={`font-bold text-gray-900 dark:text-white ${featured ? 'text-xl' : 'text-lg'}`}>
            {project.title}
          </h3>
          <div className="flex gap-2 ml-4">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github size={18} />
              </Link>
            )}
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ExternalLink size={18} />
              </Link>
            )}
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>

        {project.startDate && (
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <Calendar size={12} />
            <span>
              {formatDate(project.startDate)}
              {project.endDate && ` - ${formatDate(project.endDate)}`}
            </span>
          </div>
        )}

        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
