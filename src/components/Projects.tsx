'use client'

import { useState } from 'react'
import { ExternalLink, Star } from 'lucide-react'
import { portfolioData, type Project } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={cn(
      'card flex flex-col h-full group',
      project.featured && 'border-primary-600/30 hover:border-primary-500/60'
    )}>
      {project.featured && (
        <div className="flex items-center gap-1.5 text-xs text-primary-400 mb-3">
          <Star className="w-3 h-3 fill-current" />
          Featured Project
        </div>
      )}

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
        {project.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t) => (
          <span key={t} className="tag text-xs">{t}</span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-dark-border">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            aria-label={`${project.title} GitHub`}
          >
            <GithubIcon />
            Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary-400 transition-colors"
            aria-label={`${project.title} live demo`}
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const { projects } = portfolioData

  const featured = projects.filter((p) => p.featured)
  const others   = projects.filter((p) => !p.featured)
  const displayed = showAll ? others : []

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <p className="text-primary-400 font-mono text-sm mb-3">Projects</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
          Things I&apos;ve built
        </h2>

        {/* Featured projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Other projects toggle */}
        {others.length > 0 && (
          <>
            <div className="text-center mb-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn-secondary"
              >
                {showAll ? 'Show Less' : `Show ${others.length} More Projects`}
              </button>
            </div>

            {showAll && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayed.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
