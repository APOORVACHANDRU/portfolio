import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const ownerName  = process.env.NEXT_PUBLIC_OWNER_NAME  ?? 'Developer'
const ownerTitle = process.env.NEXT_PUBLIC_OWNER_TITLE ?? 'Full Stack Developer'

export const metadata: Metadata = {
  title: `${ownerName} | ${ownerTitle}`,
  description: `Personal portfolio of ${ownerName} — ${ownerTitle}. Explore projects, skills, and get in touch.`,
  keywords: ['developer', 'portfolio', 'full stack', 'react', 'nextjs', 'typescript'],
  authors: [{ name: ownerName }],
  openGraph: {
    title: `${ownerName} | ${ownerTitle}`,
    description: `Personal portfolio of ${ownerName}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${ownerName} | ${ownerTitle}`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-dark-bg font-sans">
        {children}
      </body>
    </html>
  )
}
