import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('renders the greeting with name', () => {
    render(<Hero />)
    expect(screen.getByText('Apoorva Chandrashekar')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<Hero />)
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<Hero />)
    expect(screen.getByText(/I build fast, scalable web apps/)).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByText('View My Work')).toBeInTheDocument()
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })

  it('renders social links with correct aria labels', () => {
    render(<Hero />)
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
  })

  it('renders availability badge', () => {
    render(<Hero />)
    expect(screen.getByText('Available for new opportunities')).toBeInTheDocument()
  })

  it('renders avatar image', () => {
    render(<Hero />)
    expect(screen.getByAltText('Apoorva Chandrashekar profile photo')).toBeInTheDocument()
  })
})
