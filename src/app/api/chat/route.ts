import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/utils'
import { portfolioData } from '@/lib/portfolio-data'

const MAX_MESSAGES = 20
const MAX_RPM      = parseInt(process.env.RATE_LIMIT_RPM ?? '10', 10)

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    // Rate limiting by IP
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      '127.0.0.1'

    if (!checkRateLimit(ip, MAX_RPM)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      )
    }

    // Validate API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return NextResponse.json(
        { error: 'AI chatbot is not configured yet. Please add your OpenAI API key.' },
        { status: 503 }
      )
    }

    const body = await req.json()
    const { messages } = body as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    // Sanitize and limit message history
    const sanitizedMessages = messages
      .slice(-MAX_MESSAGES)
      .filter((m) => m.role && m.content && typeof m.content === 'string')
      .map((m) => ({
        role:    m.role as 'user' | 'assistant',
        content: m.content.slice(0, 2000),
      }))

    // Dynamic import to avoid build-time initialization issues
    const OpenAI = (await import('openai')).default
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const response = await client.chat.completions.create({
      model:      'gpt-4o-mini',
      max_tokens: 512,
      messages: [
        { role: 'system', content: portfolioData.chatbotContext },
        ...sanitizedMessages,
      ],
    })

    const text = response.choices[0]?.message?.content ?? ''

    return NextResponse.json({ message: text })
  } catch (error: unknown) {
    console.error('[Chat API Error]', error)

    const OpenAI = (await import('openai')).default
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json({ error: 'Invalid API key.' }, { status: 401 })
      }
      if (error.status === 429) {
        return NextResponse.json({ error: 'AI service rate limit reached. Try again shortly.' }, { status: 429 })
      }
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
