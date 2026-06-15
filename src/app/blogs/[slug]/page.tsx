import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { getBlogBySlug, getBlogs } from '@/lib/db/queries'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug)
  if (!post) return { title: 'Not Found' }

  return {
    title: `${post.title} | Apoorva Chandrashekar`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <header className="border-b border-dark-border">
        <div className="container-max section-padding py-0">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/blogs"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">All Articles</span>
            </Link>
          </div>
        </div>
      </header>

      {post.coverImage && (
        <div className="relative w-full h-64 sm:h-80 lg:h-96">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent" />
        </div>
      )}

      <main className={post.coverImage ? '-mt-24 relative z-10' : ''}>
        <div className="section-padding">
          <article className="container-max max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
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

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((tag) => (
                <span key={tag} className="tag text-xs">{tag}</span>
              ))}
            </div>

            <div className="space-y-4">
              {post.content.split('\n').map((line, i) => {
                const trimmed = line.trim()
                if (trimmed === '') return null
                if (trimmed.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-semibold text-white mt-10 mb-4">{trimmed.slice(3)}</h2>
                }
                if (trimmed.startsWith('### ')) {
                  return <h3 key={i} className="text-lg font-semibold text-white mt-8 mb-3">{trimmed.slice(4)}</h3>
                }
                if (trimmed.startsWith('- ')) {
                  return (
                    <div key={i} className="flex gap-3 ml-4">
                      <span className="text-primary-400 mt-1.5">•</span>
                      <p className="text-gray-400 text-sm leading-relaxed">{renderInline(trimmed.slice(2))}</p>
                    </div>
                  )
                }
                return <p key={i} className="text-gray-400 leading-relaxed">{renderInline(trimmed)}</p>
              })}
            </div>

            <div className="mt-16 pt-8 border-t border-dark-border">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all articles
              </Link>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-gray-200">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="text-primary-300 bg-dark-muted px-1.5 py-0.5 rounded text-sm">{part.slice(1, -1)}</code>
    }
    return <span key={i}>{part}</span>
  })
}
