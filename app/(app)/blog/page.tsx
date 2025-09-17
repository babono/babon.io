import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "../../lib/notion-utils";
import { Calendar, Clock } from "lucide-react";

export default async function Blog() {
  const posts = await getBlogPosts();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#252525' }}>
            Blog
          </h1>
          <p className="text-lg" style={{ color: '#252525', opacity: 0.8 }}>
            Thoughts on development, technology, and life
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No blog posts found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Connect your Notion database to display your blog posts here.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                To set up your blog:
              </h3>
              <ol className="text-left text-gray-600 dark:text-gray-300 space-y-2">
                <li>1. Create a Notion database with the following properties:</li>
                <li className="ml-4">• Title (Title)</li>
                <li className="ml-4">• Description (Rich Text)</li>
                <li className="ml-4">• Slug (Rich Text)</li>
                <li className="ml-4">• Tags (Multi-select)</li>
                <li className="ml-4">• Publish Date (Date)</li>
                <li className="ml-4">• Published (Checkbox)</li>
                <li className="ml-4">• Cover Image (Files)</li>
                <li>2. Add your blog posts to the database</li>
                <li>3. Add the database ID to your .env.local file</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex flex-col md:flex-row">
                    {post.coverImage && (
                      <div className="md:w-1/3 aspect-video md:aspect-square relative">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>5 min read</span>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.description}
                      </p>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
