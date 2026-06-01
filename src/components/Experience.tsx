'use client'

import { Briefcase } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

export default function Experience() {
  const { experience } = portfolioData

  return (
    <section id="experience" className="section-padding bg-dark-surface/50">
      <div className="container-max">
        <p className="text-primary-400 font-mono text-sm mb-3">Experience</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
          Where I&apos;ve worked
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-dark-border hidden sm:block" />

          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="relative sm:pl-16">
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 w-4 h-4 rounded-full bg-primary-600 border-2 border-dark-bg hidden sm:block" />

                <div className="card hover:translate-x-1 transition-transform duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                      <div className="flex items-center gap-2 text-primary-400 text-sm mt-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        {job.company}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-mono bg-dark-muted px-3 py-1 rounded-full">
                      {job.period}
                    </span>
                  </div>

                  {Array.isArray(job.description) ? (
                    <ul className="list-disc list-outside ml-4 space-y-2 text-gray-400 text-sm leading-relaxed mb-4">
                      {job.description.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {job.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <span key={t} className="tag text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
