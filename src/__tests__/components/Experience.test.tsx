import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Experience from '@/components/Experience'

describe('Experience', () => {
  it('renders the section heading', () => {
    render(<Experience />)
    expect(screen.getByText("Where I've worked")).toBeInTheDocument()
  })

  it('renders all company names', () => {
    render(<Experience />)
    expect(screen.getByText('Prathama SRL')).toBeInTheDocument()
    expect(screen.getByText('Sinch')).toBeInTheDocument()
    expect(screen.getByText('DXC Technology')).toBeInTheDocument()
  })

  it('renders all job roles', () => {
    render(<Experience />)
    expect(screen.getByText('Senior Full Stack Engineer')).toBeInTheDocument()
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
    expect(screen.getByText('Web Developer')).toBeInTheDocument()
  })

  it('renders job periods', () => {
    render(<Experience />)
    expect(screen.getByText('Aug 2024 – Jan 2026')).toBeInTheDocument()
    expect(screen.getByText('Jan 2022 – July 2024')).toBeInTheDocument()
    expect(screen.getByText('Sept 2017 – Oct 2021')).toBeInTheDocument()
  })

  it('renders bullet point descriptions', () => {
    render(<Experience />)
    // Check one bullet from each company
    expect(screen.getByText(/Orchestrated CI\/CD integration/)).toBeInTheDocument()
    expect(screen.getByText(/Migrated legacy JavaScript applications/)).toBeInTheDocument()
    expect(screen.getByText(/Built serverless APIs on AWS Lambda/)).toBeInTheDocument()
  })

  it('renders tech tags', () => {
    render(<Experience />)
    expect(screen.getAllByText('React').length).toBeGreaterThan(0)
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0)
  })
})
