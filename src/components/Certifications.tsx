'use client'

import { Award, ExternalLink } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

export default function Certifications() {
  const { certifications } = portfolioData

  return (
    <section id="certifications" className="section-padding">
      <div className="container-max">
        <p className="text-primary-400 font-mono text-sm mb-3">06. certifications</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Certifications
        </h2>
        <p className="text-gray-500 text-sm mb-12">
          Click any certification to view the verified credential.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <a
              key={cert.name}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group card flex items-start gap-4 hover:border-primary-500/60
                         hover:bg-primary-600/5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-600/20 border border-primary-600/30
                              flex items-center justify-center group-hover:bg-primary-600/30 transition-colors">
                <Award className="w-5 h-5 text-primary-400" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors leading-tight mb-1">
                  {cert.name}
                </h3>
                <p className="text-xs text-gray-500 font-mono">{cert.date}</p>
              </div>

              {/* External link icon */}
              <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-primary-400 transition-colors flex-shrink-0 mt-0.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
