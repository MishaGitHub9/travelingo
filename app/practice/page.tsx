'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Topic {
  id: string
  title: string
  emoji: string
  description: string
  examples: string[]
}

const topics: Topic[] = [
  {
    id: 'planning',
    title: 'Планування подорожі',
    emoji: '📋',
    description: 'Практикуйте розмови про бронювання, маршрути та підготовку до подорожі',
    examples: [
      'I\'d like to book a hotel room',
      'What\'s the best time to visit?',
      'How much does the flight cost?'
    ]
  },
  {
    id: 'airport',
    title: 'В аеропорту',
    emoji: '✈️',
    description: 'Навчіться спілкуватися в аеропорту, проходити реєстрацію та контроль',
    examples: [
      'Where is check-in?',
      'Is my flight on time?',
      'I need to declare this'
    ]
  },
  {
    id: 'hotel',
    title: 'В готелі',
    emoji: '🏨',
    description: 'Освойте спілкування з персоналом готелю та вирішення питань проживання',
    examples: [
      'I have a reservation',
      'Can I have the wifi password?',
      'My room needs cleaning'
    ]
  },
  {
    id: 'restaurant',
    title: 'В ресторані',
    emoji: '🍽️',
    description: 'Практикуйте замовлення їжі та спілкування з офіціантами',
    examples: [
      'Can I see the menu?',
      'I\'d like to order...',
      'Could I have the check, please?'
    ]
  },
  {
    id: 'transportation',
    title: 'Транспорт',
    emoji: '🚗',
    description: 'Навчіться замовляти таксі та користуватися громадським транспортом',
    examples: [
      'Can you call me a taxi?',
      'How do I get to the station?',
      'What time does the bus arrive?'
    ]
  },
  {
    id: 'shopping',
    title: 'Покупки',
    emoji: '🛍️',
    description: 'Освойте спілкування в магазинах та на ринках',
    examples: [
      'How much does this cost?',
      'Do you have this in another size?',
      'Can I try this on?'
    ]
  },
  {
    id: 'sightseeing',
    title: 'Огляд пам\'яток',
    emoji: '🏛️',
    description: 'Практикуйте розмови про екскурсії та туристичні місця',
    examples: [
      'What time does the museum open?',
      'Is there a guided tour?',
      'Can I take photos here?'
    ]
  },
  {
    id: 'emergency',
    title: 'Надзвичайні ситуації',
    emoji: '🆘',
    description: 'Навчіться просити допомогу та пояснювати проблемні ситуації',
    examples: [
      'I need help',
      'I lost my passport',
      'Call an ambulance!'
    ]
  }
]

export default function PracticePage() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startConversation = (topic: Topic) => {
    setSelectedTopic(topic)
    setMessages([
      {
        role: 'assistant',
        content: `Hello! 👋 Let's practice English conversation about "${topic.title.toLowerCase()}". I'm here to help you improve your travel English. Feel free to ask questions or start a conversation. What would you like to talk about?`,
        timestamp: new Date()
      }
    ])
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !selectedTopic || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          topic: selectedTopic.id
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetConversation = () => {
    setSelectedTopic(null)
    setMessages([])
    setInputMessage('')
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [inputMessage])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 relative overflow-hidden">
      {/* Background Elements - same as other pages */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-700/40 via-transparent to-blue-700/40 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-pink-600/30 via-transparent to-cyan-600/30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500/50 to-blue-500/50 rounded-full blur-3xl animate-pulse opacity-80"></div>
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/40 to-purple-500/40 rounded-full blur-3xl animate-pulse opacity-70" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-xl shadow-purple-500/50">
                T
              </div>
              <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Travelingo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-white transition-colors">
                Головна
              </Link>
              <Link href="/vocabulary" className="text-white/80 hover:text-white transition-colors">
                Словник
              </Link>
              <Link href="/practice" className="text-white bg-purple-600/30 px-4 py-2 rounded-lg">
                Практика
              </Link>
            </div>

            {/* Mobile Navigation - Simple back button */}
            <div className="md:hidden">
              <Link 
                href="/" 
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                ← Назад
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-4 pb-20">
        {!selectedTopic ? (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  AI Практика 🤖
                </span>
              </h1>
              <p className="text-base md:text-xl text-white/80 max-w-3xl mx-auto px-2">
                Оберіть тему для розмови з ШІ та практикуйте англійську мову в реальних туристичних ситуаціях
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => startConversation(topic)}
                  className="group cursor-pointer bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      {topic.emoji}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/70 mb-3 md:mb-4">
                      {topic.description}
                    </p>
                    <div className="space-y-1 hidden md:block">
                      <p className="text-xs text-white/50 font-medium">Приклади фраз:</p>
                      {topic.examples.slice(0, 2).map((example, index) => (
                        <p key={index} className="text-xs text-purple-300/80 italic">
                          "{example}"
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 md:mt-4 flex justify-center">
                    <span className="text-xs bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full">
                      Почати розмову
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-2 md:px-4 sm:px-6 lg:px-8 h-full">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-t-2xl p-3 md:p-4 border border-white/10 border-b-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-xl md:text-2xl">{selectedTopic.emoji}</span>
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-semibold text-white">
                      {selectedTopic.title}
                    </h2>
                    <p className="text-xs md:text-sm text-white/60">
                      🤖 Практика з ШІ
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetConversation}
                  className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="bg-black/20 backdrop-blur-md border-x border-white/10 h-[60vh] md:h-96 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-xs lg:max-w-md px-3 md:px-4 py-2 md:py-3 rounded-2xl shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-white/10 text-white border border-white/20 backdrop-blur-sm'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="text-xs md:text-sm prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            // Кастомізація компонентів Markdown
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong className="font-bold text-yellow-300">{children}</strong>,
                            em: ({ children }) => <em className="italic text-blue-300">{children}</em>,
                            code: ({ children }) => <code className="bg-gray-800/80 px-1.5 py-0.5 rounded text-green-300 text-xs">{children}</code>,
                            ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="text-xs md:text-sm">{children}</li>,
                            h1: ({ children }) => <h1 className="text-sm md:text-lg font-bold mb-2 text-purple-300">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-sm md:text-base font-bold mb-2 text-purple-300">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-xs md:text-sm font-bold mb-1 text-purple-300">{children}</h3>,
                            blockquote: ({ children }) => <blockquote className="border-l-2 border-purple-400 pl-3 italic text-purple-200 my-2">{children}</blockquote>,
                            hr: () => <hr className="border-gray-600 my-2" />
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-xs md:text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
                    <p className="text-xs opacity-60 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString('uk-UA', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white border border-white/20 px-4 py-3 rounded-2xl backdrop-blur-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-b-2xl p-3 md:p-4 border border-white/10 border-t-0 shadow-lg">
              <div className="flex space-x-2 md:space-x-3">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Напишіть повідомлення англійською..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 md:px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 resize-none min-h-[40px] max-h-32 text-sm md:text-base backdrop-blur-sm"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-4 md:px-6 py-2 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-white/50 mt-2 hidden md:block">
                Натисніть Enter для відправки, Shift+Enter для нового рядка
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 