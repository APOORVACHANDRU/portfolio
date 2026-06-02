import { describe, it, expect, beforeEach } from 'vitest'
import { cn, checkRateLimit } from '@/lib/utils'

describe('cn (classname utility)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
  })

  it('merges tailwind conflicts correctly', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
  })
})

describe('checkRateLimit', () => {
  beforeEach(() => {
    // Rate limiter uses an in-memory map, each test starts fresh due to module isolation
  })

  it('allows requests under the limit', () => {
    const ip = '192.168.1.1'
    expect(checkRateLimit(ip, 5, 60000)).toBe(true)
    expect(checkRateLimit(ip, 5, 60000)).toBe(true)
    expect(checkRateLimit(ip, 5, 60000)).toBe(true)
  })

  it('blocks requests over the limit', () => {
    const ip = '10.0.0.1'
    for (let i = 0; i < 3; i++) {
      checkRateLimit(ip, 3, 60000)
    }
    expect(checkRateLimit(ip, 3, 60000)).toBe(false)
  })

  it('different IPs have independent limits', () => {
    const ip1 = '1.1.1.1'
    const ip2 = '2.2.2.2'
    for (let i = 0; i < 3; i++) {
      checkRateLimit(ip1, 3, 60000)
    }
    expect(checkRateLimit(ip1, 3, 60000)).toBe(false)
    expect(checkRateLimit(ip2, 3, 60000)).toBe(true)
  })
})
