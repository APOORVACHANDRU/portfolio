'use client'

import Image from 'next/image'
import { ArrowDown, Mail } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

// SVG brand icons (lucide-react v0.400+ removed brand icons)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export default function Hero() {
  const { personal } = portfolioData

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max section-padding text-center relative z-10">

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Glowing ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500 via-purple-500 to-pink-500 blur-sm opacity-70 scale-105" />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/10">
              <Image
                src={personal.avatarUrl}
                alt={`${personal.name} profile photo`}
                fill
                sizes="(max-width: 640px) 112px, 128px"
                className="object-cover"
                priority
              />
            </div>
            {/* Online indicator */}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-bg" />
          </div>
        </div>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
          Available for new opportunities
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Hi, I&apos;m{' '}
          <span className="gradient-text">{personal.name}</span>
        </h1>

        {/* Title */}
        <p className="text-xl sm:text-2xl text-gray-400 font-medium mb-6">
          {personal.title}
        </p>

        {/* Tagline */}
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {personal.tagline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            View My Work
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
          >
            Get In Touch
          </button>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4">
          {[
            { href: personal.github,   icon: GithubIcon,   label: 'GitHub'   },
            { href: personal.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
            { href: personal.twitter,  icon: TwitterIcon,  label: 'Twitter'  }
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 glass rounded-xl text-gray-400 hover:text-white hover:border-primary-400/50 transition-all duration-200 hover:scale-110"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  )
}
