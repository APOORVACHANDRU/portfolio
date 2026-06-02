'use client'

import Image from 'next/image'
import { skillCategories, type Skill } from '@/lib/skills-data'

function SkillBadge({ skill }: { skill: Skill }) {
  // Non-clickable badge for items without a URL (e.g. specializations)
  if (!skill.url) {
    return (
      <span
        className="flex items-center gap-2 px-3 py-2 rounded-lg
                   bg-dark-muted/50 border border-dark-border"
      >
        <span className="text-xs font-medium text-gray-300 whitespace-nowrap">
          {skill.name}
        </span>
      </span>
    )
  }

  return (
    <a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${skill.name} — visit official site`}
      className="group flex items-center gap-2 px-3 py-2 rounded-lg
                 bg-dark-muted/50 border border-dark-border
                 hover:border-primary-600/50 hover:bg-primary-600/10
                 transition-all duration-200 hover:scale-105"
    >
      {skill.icon && (
        <div className="relative w-5 h-5 flex-shrink-0">
          <Image
            src={skill.icon}
            alt={`${skill.name} icon`}
            fill
            sizes="20px"
            className="object-contain"
            unoptimized
          />
        </div>
      )}
      <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">
        {skill.name}
      </span>
    </a>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <p className="text-primary-400 font-mono text-sm mb-3">02. skills</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          What I work with
        </h2>
        <p className="text-gray-500 text-sm mb-12">
          Click any skill to visit its official documentation.
        </p>

        <div className="space-y-6">
          {skillCategories.map((category) => (
            <div key={category.key}>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2 uppercase">
                <span>{category.emoji}</span>
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
