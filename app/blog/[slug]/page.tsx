import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "../../../lib/notion-utils";
import { Calendar, ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {post.coverImage && (
            <div className="aspect-video relative">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <header className="mb-8">
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Calendar size={14} />
                <span>{formatDate(post.publishDate)}</span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {post.description}
              </p>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
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
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content ? (
                <div
                  className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400 italic">
                  Content is being loaded from Notion...
                </p>
              )}
            </div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}
