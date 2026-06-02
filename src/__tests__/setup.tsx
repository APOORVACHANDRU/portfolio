import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; [key: string]: unknown }) => (
    <img src={props.src} alt={props.alt} data-testid="next-image" />
  ),
}))

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  JetBrains_Mono: () => ({ variable: '--font-mono' }),
}))
