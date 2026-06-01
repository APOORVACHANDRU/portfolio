'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2, RotateCcw, Minimize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { portfolioData } from '@/lib/portfolio-data'

interface Message {
  id:        string
  role:      'user' | 'assistant'
  content:   string
  timestamp: Date
}

const WELCOME_MESSAGE: Message = {
  id:        'welcome',
  role:      'assistant',
  content:   `Hi! I'm an AI assistant trained on ${portfolioData.personal.name}'s portfolio. Ask me anything — about their experience, projects, skills, or how to get in touch! 👋`,
  timestamp: new Date(),
}

const SUGGESTED_QUESTIONS = [
  "What's your tech stack?",
  'Tell me about your projects',
  'Are you open to work?',
  'How can I contact you?',
]

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex gap-3 mb-4', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      <div className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs',
        isUser
          ? 'bg-primary-600 text-white'
          : 'bg-dark-muted border border-dark-border text-primary-400'
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Bubble */}
      <div className={cn(
        'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
        isUser
          ? 'bg-primary-600 text-white rounded-tr-sm'
          : 'bg-dark-muted text-gray-200 rounded-tl-sm border border-dark-border'
      )}>
        {message.content}
      </div>
    </div>
  )
}

export default function Chatbot() {
  const [isOpen,     setIsOpen]     = useState(false)
  const [messages,   setMessages]   = useState<Message[]>([WELCOME_MESSAGE])
  const [input,      setInput]      = useState('')
  const [isLoading,  setIsLoading]  = useState(false)
  const [error,      setError]      = useState<string | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef       = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized, messages, scrollToBottom])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = {
      id:        crypto.randomUUID(),
      role:      'user',
      content:   trimmed,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const history = [...messages, userMessage]
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: history }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to get response')
      }

      const assistantMessage: Message = {
        id:        crypto.randomUUID(),
        role:      'assistant',
        content:   data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE])
    setError(null)
    setInput('')
  }

  const showSuggestions = messages.length === 1 // only welcome message

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div
          className={cn(
            'fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96',
            'bg-dark-surface border border-dark-border rounded-2xl shadow-2xl shadow-black/50',
            'flex flex-col transition-all duration-300',
            isMinimized ? 'h-14' : 'h-[520px]'
          )}
          role="dialog"
          aria-label="AI Chat Assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary-600/20 border border-primary-600/40 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-400" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-dark-surface" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Portfolio AI</p>
                <p className="text-xs text-gray-500">Powered by OpenAI</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="p-1.5 text-gray-500 hover:text-gray-300 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Reset chat"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-gray-500 hover:text-gray-300 rounded-lg hover:bg-white/5 transition-colors"
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-300 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}

                {/* Suggested questions */}
                {showSuggestions && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-gray-600 text-center">Try asking:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-xs px-3 py-1.5 rounded-full border border-dark-border text-gray-400
                                     hover:border-primary-600/50 hover:text-primary-400 transition-all"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-dark-muted border border-dark-border flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-400" />
                    </div>
                    <div className="bg-dark-muted border border-dark-border rounded-2xl rounded-tl-sm px-4 py-3">
                      <Loader2 className="w-4 h-4 text-primary-400 animate-spin" />
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 mb-2">
                    {error}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 p-3 border-t border-dark-border flex-shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  maxLength={500}
                  className="flex-1 bg-dark-muted border border-dark-border rounded-xl px-4 py-2.5 text-sm
                             text-gray-200 placeholder-gray-600 outline-none
                             focus:border-primary-600/60 focus:ring-1 focus:ring-primary-600/30
                             disabled:opacity-50 transition-all"
                  aria-label="Chat message input"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 bg-primary-600 hover:bg-primary-500 disabled:opacity-40 disabled:cursor-not-allowed
                             text-white rounded-xl transition-all active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* FAB toggle button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false) }}
        className={cn(
          'fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-lg shadow-primary-600/30',
          'flex items-center justify-center transition-all duration-300 active:scale-95',
          isOpen
            ? 'bg-dark-surface border border-dark-border text-gray-400 hover:text-white'
            : 'bg-primary-600 hover:bg-primary-500 text-white hover:shadow-xl hover:shadow-primary-600/40 hover:scale-110'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open AI chat assistant'}
      >
        {isOpen
          ? <X className="w-5 h-5" />
          : <MessageCircle className="w-6 h-6" />
        }
      </button>
    </>
  )
}
