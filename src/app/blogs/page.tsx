import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react'
import { getBlogs } from '@/lib/db/queries'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | Apoorva Chandrashekar',
  description: 'Technical articles on React, Next.js, TypeScript, AWS, AI, and full-stack development.',
}

export default async function BlogsPage() {
  const blogPosts = await getBlogs()

  return (
    <div className="min-h-screen bg-dark-bg">
      <header className="border-b border-dark-border">
        <div className="container-max section-padding py-0">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Portfolio</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="section-padding">
        <div className="container-max max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-gray-500 text-lg mb-12">
            Technical articles on web development, cloud architecture, and personal growth.
          </p>

          {blogPosts.length === 0 ? (
            <div className="card text-center py-16">
              <p className="text-gray-500">No articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group card block overflow-hidden hover:border-primary-500/60 hover:bg-primary-600/5
                             transition-all duration-300 hover:translate-x-1 p-0"
                >
                  <div className="flex flex-col sm:flex-row">
                    {post.coverImage && (
                      <div className="relative w-full sm:w-56 lg:w-64 h-48 sm:h-auto flex-shrink-0">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 256px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="tag text-xs">{tag}</span>
                          ))}
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
