import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Chatbot from '@/components/Chatbot'

describe('Chatbot', () => {
  it('renders the FAB button', () => {
    render(<Chatbot />)
    expect(screen.getByLabelText('Open AI chat assistant')).toBeInTheDocument()
  })

  it('opens chat window on FAB click', () => {
    render(<Chatbot />)
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Portfolio AI')).toBeInTheDocument()
  })

  it('shows welcome message when opened', () => {
    render(<Chatbot />)
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'))
    expect(screen.getByText(/Ask me anything/)).toBeInTheDocument()
  })

  it('shows suggested questions', () => {
    render(<Chatbot />)
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'))
    expect(screen.getByText("What's your tech stack?")).toBeInTheDocument()
    expect(screen.getByText('Tell me about your projects')).toBeInTheDocument()
  })

  it('has a message input field', () => {
    render(<Chatbot />)
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'))
    expect(screen.getByLabelText('Chat message input')).toBeInTheDocument()
  })

  it('send button is disabled when input is empty', () => {
    render(<Chatbot />)
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'))
    expect(screen.getByLabelText('Send message')).toBeDisabled()
  })

  it('send button enables when input has text', () => {
    render(<Chatbot />)
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'))
    fireEvent.change(screen.getByLabelText('Chat message input'), { target: { value: 'Hello' } })
    expect(screen.getByLabelText('Send message')).not.toBeDisabled()
  })

  it('closes chat on close button click', () => {
    render(<Chatbot />)
    fireEvent.click(screen.getByLabelText('Open AI chat assistant'))
    // Use getAllByLabelText since both the header X and the FAB have "Close chat"
    const closeButtons = screen.getAllByLabelText('Close chat')
    fireEvent.click(closeButtons[0]) // click the one in the header
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
