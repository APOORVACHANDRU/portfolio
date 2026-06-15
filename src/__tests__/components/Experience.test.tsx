import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Experience from '@/components/Experience'

const mockData = [
  {
    _id: '1',
    company: 'Prathama SRL',
    role: 'Senior Full Stack Engineer',
    period: 'Aug 2024 – Jan 2026',
    description: [
      'Developed and maintained scalable front-end applications using React.',
      'Designed and implemented backend services using Python and FastAPI.',
    ],
    tech: ['React', 'Python', 'FastAPI'],
  },
  {
    _id: '2',
    company: 'Sinch',
    role: 'Full Stack Developer',
    period: 'Jan 2022 – July 2024',
    description: ['Migrated legacy JavaScript applications to TypeScript.'],
    tech: ['React', 'TypeScript', 'AWS'],
  },
]

describe('Experience', () => {
  it('renders the section heading', () => {
    render(<Experience data={mockData} />)
    expect(screen.getByText("Where I've worked")).toBeInTheDocument()
  })

  it('renders all company names', () => {
    render(<Experience data={mockData} />)
    expect(screen.getByText('Prathama SRL')).toBeInTheDocument()
    expect(screen.getByText('Sinch')).toBeInTheDocument()
  })

  it('renders all job roles', () => {
    render(<Experience data={mockData} />)
    expect(screen.getByText('Senior Full Stack Engineer')).toBeInTheDocument()
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
  })

  it('renders bullet point descriptions', () => {
    render(<Experience data={mockData} />)
    expect(screen.getByText(/Developed and maintained scalable/)).toBeInTheDocument()
    expect(screen.getByText(/Migrated legacy JavaScript/)).toBeInTheDocument()
  })

  it('renders tech tags', () => {
    render(<Experience data={mockData} />)
    expect(screen.getAllByText('React').length).toBeGreaterThan(0)
  })
})
