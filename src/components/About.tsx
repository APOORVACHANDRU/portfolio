'use client'

import Image from 'next/image'
import { MapPin, Mail, Calendar } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

export default function About() {
  const { personal } = portfolioData

  return (
    <section id="about" className="section-padding bg-dark-surface/50">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <p className="text-primary-400 font-mono text-sm mb-3">About me</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Engineered for precision
            </h2>
            <h3 className="text-xl sm:text-xl text-white mb-6">
              A glimpse into the person behind the architecture.
            </h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              {personal.bio.split('\n\n').map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>

            {/* Quick info */}
            <div className="mt-8 space-y-3">
              {[
                { icon: MapPin,   text: personal.location },
                { icon: Mail,     text: personal.email    },
                { icon: Calendar, text: '8+ years experience' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-gray-400">
                  <Icon className="w-4 h-4 text-primary-400 flex-shrink-0" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar + Stats */}
          <div className="flex flex-col items-center gap-8">

            {/* Profile photo */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary-500 via-purple-500 to-pink-500 blur-md opacity-40 scale-105" />
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={personal.avatarUrl}
                  alt={`${personal.name} profile photo`}
                  fill
                  sizes="(max-width: 640px) 192px, 224px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {[
                { value: '8+',  label: 'Years Experience' },
                { value: '99.99%', label: 'Uptime SLA'  },
                { value: 'M+', label: 'Users Served'      },
                { value: '∞',   label: 'Coffees Consumed'  },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="card text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-4xl font-bold gradient-text mb-2">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
