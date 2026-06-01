import { Code2 } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

export default function Footer() {
  const { personal } = portfolioData
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-dark-border py-8">
      <div className="container-max section-padding py-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary-600" />
            <span>Built by {personal.name}</span>
          </div>
          <span>© {year} · Next.js + Tailwind + OpenAI</span>
        </div>
      </div>
    </footer>
  )
}
