import Navbar          from '@/components/Navbar'
import Hero            from '@/components/Hero'
import About           from '@/components/About'
import Skills          from '@/components/Skills'
import Experience      from '@/components/Experience'
import Projects        from '@/components/Projects'
import Certifications  from '@/components/Certifications'
import Languages       from '@/components/Languages'
import Contact         from '@/components/Contact'
import Footer          from '@/components/Footer'
import Chatbot         from '@/components/Chatbot'
import { getProjects, getExperiences, getCertifications } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [projects, experiences, certifications] = await Promise.all([
    getProjects(),
    getExperiences(),
    getCertifications(),
  ])

  // Serialize MongoDB documents for client components
  const serializedProjects = JSON.parse(JSON.stringify(projects))
  const serializedExperiences = JSON.parse(JSON.stringify(experiences))
  const serializedCertifications = JSON.parse(JSON.stringify(certifications))

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience data={serializedExperiences} />
        <Projects data={serializedProjects} />
        <Certifications data={serializedCertifications} />
        <Languages />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
