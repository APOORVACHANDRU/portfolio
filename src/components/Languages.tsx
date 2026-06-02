'use client'

import { Globe } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

const levelColors: Record<string, string> = {
  Fluent:       'bg-green-500/20 text-green-400 border-green-500/30',
  Basic:        'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Native:       'bg-primary-500/20 text-primary-400 border-primary-500/30',
}

export default function Languages() {
  const { languages } = portfolioData

  return (
    <section id="languages" className="section-padding bg-dark-surface/50">
      <div className="container-max">
        <p className="text-primary-400 font-mono text-sm mb-3">Languages</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
          Languages
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="card flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-600/20 border border-primary-600/30
                              flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-400" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-white">{lang.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${levelColors[lang.level] ?? levelColors.Basic}`}>
                    {lang.level}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{lang.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
