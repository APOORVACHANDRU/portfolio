import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Skills from '@/components/Skills'
import { skillCategories } from '@/lib/skills-data'

describe('Skills', () => {
  it('renders the section heading', () => {
    render(<Skills />)
    expect(screen.getByText('What I work with')).toBeInTheDocument()
  })

  it('renders all category labels', () => {
    render(<Skills />)
    skillCategories.forEach((category) => {
      expect(screen.getByText(category.label)).toBeInTheDocument()
    })
  })

  it('renders clickable skill badges with links', () => {
    render(<Skills />)
    // Title uses the original name, not uppercased (CSS handles uppercase visually)
    const reactLink = screen.getByTitle('React — visit official site')
    expect(reactLink).toHaveAttribute('href', 'https://react.dev')
    expect(reactLink).toHaveAttribute('target', '_blank')
  })

  it('renders specialization badges as non-clickable', () => {
    render(<Skills />)
    // Text in DOM is original case — CSS makes it uppercase visually
    const badge = screen.getByText('Distributed Systems')
    expect(badge.closest('a')).toBeNull()
    expect(badge.closest('span')).toBeInTheDocument()
  })
})
