import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <Image
                src="/profile.jpg" // You'll need to add your profile photo
                alt="Profile photo"
                width={200}
                height={200}
                className="rounded-full mx-auto shadow-xl"
                priority
              />
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold mb-6" style={{ color: '#252525' }}>
              Hi, I'm{" "}
              <span style={{ color: '#0182C6' }}>
                Your Name
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: '#252525' }}>
              A passionate full-stack developer creating innovative solutions 
              and building exceptional digital experiences. I love turning 
              complex problems into simple, beautiful, and intuitive designs.
            </p>

            <div className="flex justify-center gap-6 mb-12">
              <Link
                href="mailto:your-email@example.com"
                className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all font-medium"
                style={{ backgroundColor: '#0182C6' }}
              >
                <Mail size={20} />
                Get in touch
              </Link>
              
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-6 py-3 border rounded-lg hover:opacity-80 transition-all font-medium"
                style={{ 
                  borderColor: '#0182C6', 
                  color: '#0182C6',
                  backgroundColor: 'white'
                }}
              >
                View Resume
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              <Link
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:opacity-80 transition-all hover:bg-gray-50 rounded-full"
                style={{ color: '#252525' }}
              >
                <Github size={24} />
              </Link>
              
              <Link
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:opacity-80 transition-all hover:bg-gray-50 rounded-full"
                style={{ color: '#252525' }}
              >
                <Linkedin size={24} />
              </Link>
              
              <Link
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:opacity-80 transition-all hover:bg-gray-50 rounded-full"
                style={{ color: '#252525' }}
              >
                <Twitter size={24} />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            <Link
              href="/projects"
              className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-3 transition-colors" style={{ 
                color: '#252525' 
              }}>
                <span className="group-hover:opacity-80">Featured Projects</span>
              </h3>
              <p style={{ color: '#252525', opacity: 0.8 }}>
                Explore my latest work and side projects, built with modern technologies
              </p>
            </Link>

            <Link
              href="/blog"
              className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-3 transition-colors" style={{ 
                color: '#252525' 
              }}>
                <span className="group-hover:opacity-80">Latest Posts</span>
              </h3>
              <p style={{ color: '#252525', opacity: 0.8 }}>
                Read my thoughts on development, technology, and industry trends
              </p>
            </Link>

            <Link
              href="/resume"
              className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-3 transition-colors" style={{ 
                color: '#252525' 
              }}>
                <span className="group-hover:opacity-80">Experience</span>
              </h3>
              <p style={{ color: '#252525', opacity: 0.8 }}>
                Learn about my professional background and technical skills
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 w-full h-80 overflow-hidden">
        {/* Wave 1 - Black (#000000) - Moving Left */}
        <div className="absolute bottom-0 w-full wave-1">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C100,45 200,30 300,45 C400,60 500,75 600,60 C700,45 800,30 900,45 C1000,60 1100,75 1200,60 L1200,120 L0,120 Z"
              fill="#000000"
            />
          </svg>
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ left: 'calc(100% - 1px)' }}
          >
            <path
              d="M0,60 C100,45 200,30 300,45 C400,60 500,75 600,60 C700,45 800,30 900,45 C1000,60 1100,75 1200,60 L1200,120 L0,120 Z"
              fill="#000000"
            />
          </svg>
        </div>

        {/* Wave 2 - Blue (#0B72FE) - Moving Right */}
        <div className="absolute bottom-0 w-full wave-2">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C100,25 200,10 300,25 C400,40 500,55 600,40 C700,25 800,10 900,25 C1000,40 1100,55 1200,40 L1200,120 L0,120 Z"
              fill="#0B72FE"
            />
          </svg>
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ left: 'calc(100% - 1px)' }}
          >
            <path
              d="M0,40 C100,25 200,10 300,25 C400,40 500,55 600,40 C700,25 800,10 900,25 C1000,40 1100,55 1200,40 L1200,120 L0,120 Z"
              fill="#0B72FE"
            />
          </svg>
        </div>

        {/* Wave 3 - Yellow (#FFCC01) - Moving Left */}
        <div className="absolute bottom-0 w-full wave-3">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C100,35 200,20 300,35 C400,50 500,65 600,50 C700,35 800,20 900,35 C1000,50 1100,65 1200,50 L1200,120 L0,120 Z"
              fill="#FFCC01"
            />
          </svg>
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ left: 'calc(100% - 1px)' }}
          >
            <path
              d="M0,50 C100,35 200,20 300,35 C400,50 500,65 600,50 C700,35 800,20 900,35 C1000,50 1100,65 1200,50 L1200,120 L0,120 Z"
              fill="#FFCC01"
            />
          </svg>
        </div>

        {/* Wave 4 - Orange (#FF6D00) - Moving Right */}
        <div className="absolute bottom-0 w-full wave-4">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C100,45 200,60 300,45 C400,30 500,15 600,30 C700,45 800,60 900,45 C1000,30 1100,15 1200,30 L1200,120 L0,120 Z"
              fill="#FF6D00"
            />
          </svg>
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ left: 'calc(100% - 1px)' }}
          >
            <path
              d="M0,30 C100,45 200,60 300,45 C400,30 500,15 600,30 C700,45 800,60 900,45 C1000,30 1100,15 1200,30 L1200,120 L0,120 Z"
              fill="#FF6D00"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
