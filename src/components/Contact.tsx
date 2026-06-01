'use client'

import { useState } from 'react'
import { Mail, Send, User, MessageSquare, Briefcase } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-6 h-6'} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-6 h-6'} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-6 h-6'} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const SUBJECTS = [
  { value: 'opportunity',  label: '💼 Job Opportunity'      },
  { value: 'project',      label: '🚀 Project Collaboration' },
  { value: 'freelance',    label: '🛠️ Freelance Work'        },
  { value: 'question',     label: '💬 General Question'      },
  { value: 'other',        label: '✉️ Other'                 },
]

const SUBJECT_LINES: Record<string, string> = {
  opportunity: 'Job Opportunity',
  project:     'Project Collaboration',
  freelance:   'Freelance Inquiry',
  question:    'Question for You',
  other:       'Getting in Touch',
}

export default function Contact() {
  const { personal } = portfolioData

  const [form, setForm] = useState({
    name:    '',
    email:   '',
    subject: 'opportunity',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subjectLine = `[Portfolio] ${SUBJECT_LINES[form.subject] ?? 'Getting in Touch'}`

    const body = [
      `Hi Apoorva,`,
      ``,
      form.message,
      ``,
      `---`,
      `From: ${form.name}`,
      `Reply to: ${form.email}`,
    ].join('\n')

    const mailto = `mailto:${personal.email}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`

    // Open in a new tab — more reliable than window.location.href
    // Works with Gmail (if set as default), Outlook, Apple Mail, etc.
    const link = document.createElement('a')
    link.href = mailto
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const isValid = form.name.trim() && form.email.trim() && form.message.trim()

  return (
    <section id="contact" className="section-padding bg-dark-surface/50">
      <div className="container-max">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-primary-400 font-mono text-sm mb-3">Contact</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Have a project, opportunity, or question? Fill in the form and it will
              open your email client with a ready-to-send message.
            </p>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="card space-y-5 mb-10"
            noValidate
          >
            {/* Name + Email row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <User className="w-3.5 h-3.5" /> Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className={cn(
                    'w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2.5 text-sm',
                    'text-gray-200 placeholder-gray-600 outline-none transition-all',
                    'focus:border-primary-600/60 focus:ring-1 focus:ring-primary-600/30'
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <Mail className="w-3.5 h-3.5" /> Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className={cn(
                    'w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2.5 text-sm',
                    'text-gray-200 placeholder-gray-600 outline-none transition-all',
                    'focus:border-primary-600/60 focus:ring-1 focus:ring-primary-600/30'
                  )}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5" /> Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={cn(
                  'w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2.5 text-sm',
                  'text-gray-200 outline-none transition-all cursor-pointer',
                  'focus:border-primary-600/60 focus:ring-1 focus:ring-primary-600/30'
                )}
              >
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value} className="bg-dark-bg">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" /> Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, role, or question..."
                className={cn(
                  'w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2.5 text-sm',
                  'text-gray-200 placeholder-gray-600 outline-none transition-all resize-none',
                  'focus:border-primary-600/60 focus:ring-1 focus:ring-primary-600/30'
                )}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm',
                'transition-all duration-200 active:scale-[0.98]',
                isValid
                  ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/20'
                  : 'bg-dark-muted text-gray-600 cursor-not-allowed'
              )}
            >
              <Send className="w-4 h-4" />
              Open in Email Client
            </button>

            <p className="text-xs text-gray-600 text-center">
              This will open your default email app with the message pre-filled.
            </p>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-dark-border" />
            <span className="text-xs text-gray-600 uppercase tracking-widest">or find me on</span>
            <div className="flex-1 h-px bg-dark-border" />
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-8">
            {[
              { href: personal.github,   icon: GithubIcon,   label: 'GitHub'   },
              { href: personal.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
              { href: personal.twitter,  icon: TwitterIcon,  label: 'Twitter'  },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex flex-col items-center gap-2 text-gray-500 hover:text-primary-400 transition-colors group"
              >
                <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-xs">{label}</span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
