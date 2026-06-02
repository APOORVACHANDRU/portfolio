import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Contact from '@/components/Contact'

describe('Contact', () => {
  it('renders the section heading', () => {
    render(<Contact />)
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })

  it('renders the form fields', () => {
    render(<Contact />)
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument()
  })

  it('submit button is disabled when form is empty', () => {
    render(<Contact />)
    const button = screen.getByText('Open in Email Client')
    expect(button).toBeDisabled()
  })

  it('submit button enables when form is filled', () => {
    render(<Contact />)
    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: 'jane@test.com' } })
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello!' } })

    const button = screen.getByText('Open in Email Client')
    expect(button).not.toBeDisabled()
  })

  it('renders social links', () => {
    render(<Contact />)
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
  })
})
