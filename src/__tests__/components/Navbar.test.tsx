import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('renders the logo with first name', () => {
    render(<Navbar />)
    expect(screen.getByText('Apoorva')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Certifications')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders the resume link', () => {
    render(<Navbar />)
    const resumeLink = screen.getByText('Resume')
    expect(resumeLink).toBeInTheDocument()
    expect(resumeLink.closest('a')).toHaveAttribute('href', '/resume.pdf')
  })

  it('toggles mobile menu on button click', () => {
    render(<Navbar />)
    const menuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(menuButton)
    // Mobile menu should be visible (duplicated links)
    const aboutLinks = screen.getAllByText('About')
    expect(aboutLinks.length).toBeGreaterThan(1)
  })
})
