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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Languages />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
