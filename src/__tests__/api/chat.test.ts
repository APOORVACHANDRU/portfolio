import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock OpenAI
vi.mock('openai', () => {
  return {
    default: class MockOpenAI {
      chat = {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [{ message: { content: 'Hello! I am the portfolio AI assistant.' } }],
          }),
        },
      }
    },
  }
})

// Mock env
vi.stubEnv('OPENAI_API_KEY', 'sk-test-valid-key')

describe('Chat API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('module can be imported without errors', async () => {
    const module = await import('@/app/api/chat/route')
    expect(module.POST).toBeDefined()
    expect(typeof module.POST).toBe('function')
  })
})
