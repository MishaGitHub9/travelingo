'use client'

import React, { useEffect, useState, useRef } from 'react'

interface QuizOption {
  letter: string
  text: string
  correct: boolean
}

interface Quiz {
  question: string
  options: QuizOption[]
  explanation: string
  correctAnswer: string
}

const quizzes: Quiz[] = [
  {
    question: "Як сказати 'Де знаходиться найближчий банкомат?'",
    options: [
      { letter: 'A', text: 'Where is the nearest ATM?', correct: true },
      { letter: 'B', text: 'What is the nearest ATM?', correct: false },
      { letter: 'C', text: 'How is the nearest ATM?', correct: false }
    ],
    explanation: "Використовуємо 'Where' для запитання про місце розташування.",
    correctAnswer: "Where is the nearest ATM?"
  },
  {
    question: "Як запитати 'Скільки це коштує?'",
    options: [
      { letter: 'A', text: 'How many does it cost?', correct: false },
      { letter: 'B', text: 'How much does it cost?', correct: true },
      { letter: 'C', text: 'How does it cost?', correct: false }
    ],
    explanation: "'How much' використовується для запитання про ціну або кількість незлічуваних речей.",
    correctAnswer: "How much does it cost?"
  },
  {
    question: "Як сказати 'Я хотів би замовити номер'",
    options: [
      { letter: 'A', text: 'I want to book a room', correct: false },
      { letter: 'B', text: 'I would like to book a room', correct: true },
      { letter: 'C', text: 'I will book a room', correct: false }
    ],
    explanation: "'Would like' більш ввічливий спосіб висловити бажання порівняно з 'want'.",
    correctAnswer: "I would like to book a room"
  },
  {
    question: "Як запитати дорогу до аеропорту?",
    options: [
      { letter: 'A', text: 'Where is the airport?', correct: false },
      { letter: 'B', text: 'How can I get to the airport?', correct: true },
      { letter: 'C', text: 'What is the airport?', correct: false }
    ],
    explanation: "'How can I get to...' - стандартний спосіб запитати маршрут до місця призначення.",
    correctAnswer: "How can I get to the airport?"
  }
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    let timeElapsed = 0
    
    const startTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      
      timerRef.current = setInterval(() => {
        timeElapsed += 100
        
        // Show question for 5 seconds, then show answer for 4 seconds
        if (timeElapsed === 5000) {
          setShowResult(true)
        } else if (timeElapsed >= 9000) {
          // Transition to next question
          setIsTransitioning(true)
          setTimeout(() => {
            setCurrentQuizIndex((prev) => (prev + 1) % quizzes.length)
            setShowResult(false)
            setIsTransitioning(false)
            timeElapsed = 0
            startTimer() // Restart timer for next question
          }, 500)
          
          if (timerRef.current) {
            clearInterval(timerRef.current)
          }
        }
      }, 100)
    }

    startTimer()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, []) // Only run once on mount

  const currentQuiz = quizzes[currentQuizIndex]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 relative overflow-hidden">
      {/* Animated Background Gradient Mesh */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-700/40 via-transparent to-blue-700/40 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-pink-600/30 via-transparent to-cyan-600/30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-600/20 via-transparent to-purple-600/20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Large Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500/50 to-blue-500/50 rounded-full blur-3xl animate-pulse opacity-80"></div>
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/40 to-purple-500/40 rounded-full blur-3xl animate-pulse opacity-70" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-pink-500/35 to-cyan-500/35 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse opacity-50" style={{ animationDelay: '7s' }}></div>
      </div>

      {/* Animated Geometric Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Rotating squares */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-purple-400/60 rotate-45 animate-spin opacity-70" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-blue-400/70 rotate-12 animate-spin opacity-80" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border-2 border-purple-300/50 rotate-45 animate-spin opacity-60" style={{ animationDuration: '25s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 border-2 border-blue-300/60 rotate-12 animate-spin opacity-70" style={{ animationDuration: '18s', animationDirection: 'reverse' }}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border-3 border-cyan-400/60 rounded-full animate-bounce opacity-80" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/5 w-20 h-20 border-3 border-pink-400/60 rounded-full animate-bounce opacity-70" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 border-2 border-indigo-400/50 rounded-full animate-bounce opacity-60" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-14 h-14 border-2 border-purple-400/50 rounded-full animate-bounce opacity-50" style={{ animationDuration: '6s', animationDelay: '3s' }}></div>
      </div>

      {/* Floating Particles with different sizes and speeds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-gradient-to-r from-purple-400/70 to-blue-400/70 rounded-full animate-pulse shadow-lg`}
            style={{
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
            }}
          ></div>
        ))}
      </div>

      {/* Moving Line Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M 0,300 Q 200,200 400,300 T 800,300"
            stroke="url(#lineGradient1)"
            strokeWidth="3"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M 0,500 Q 300,400 600,500 T 1200,500"
            stroke="url(#lineGradient2)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <path
            d="M 0,150 Q 400,50 800,150 T 1600,150"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '4s' }}
          />
        </svg>
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 flex items-center justify-between p-4 md:p-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-xl shadow-purple-500/50 hover:shadow-purple-500/75 transition-all duration-300 hover:scale-110">
            T
          </div>
          <span className="text-white text-lg md:text-xl font-semibold">Travelingo</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="/" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-purple-300">Головна</a>
          <a href="/tenses" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-blue-300">Часи</a>
          <a href="/vocabulary" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-pink-300">Словник</a>
          <a href="/practice" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-cyan-300">Практика</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-gray-700/80 transition-colors duration-200"
        >
          <div className="flex flex-col gap-1">
            <div className={`w-5 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
              onClick={toggleMobileMenu}
            ></div>
            
            {/* Slide-out Menu */}
            <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-xl border-l border-gray-600/50 shadow-2xl transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    T
                  </div>
                  <span className="text-white text-lg font-semibold">Travelingo</span>
                </div>
                <button 
                  onClick={toggleMobileMenu}
                  className="w-10 h-10 bg-gray-700/80 rounded-lg flex items-center justify-center text-white hover:bg-gray-600/80 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Menu Items */}
              <nav className="p-6 space-y-2">
                <div className="bg-purple-600/30 text-purple-300 px-4 py-4 rounded-xl font-semibold flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Головна
                </div>
                <a 
                  href="/vocabulary" 
                  className="text-gray-300 hover:text-pink-300 hover:bg-gray-800/50 px-4 py-4 rounded-xl transition-all duration-200 flex items-center gap-3 group"
                  onClick={toggleMobileMenu}
                >
                  <span className="w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Словник
                </a>
                <a 
                  href="/practice" 
                  className="text-gray-300 hover:text-cyan-300 hover:bg-gray-800/50 px-4 py-4 rounded-xl transition-all duration-200 flex items-center gap-3 group"
                  onClick={toggleMobileMenu}
                >
                  <span className="w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Практика
                </a>
              </nav>

              {/* Menu Footer */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-center text-gray-500 text-sm">
                  Вивчайте англійську для подорожей
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center max-w-7xl mx-auto px-4 md:px-6 pt-2 md:pt-4 lg:pt-8 pb-4 md:pb-8 lg:pb-16 min-h-[calc(100vh-140px)] md:min-h-[calc(100vh-160px)]">
        {/* Left Side - Title and Content */}
        <div className="flex-1 max-w-2xl lg:pr-8">
          <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 md:mb-8">
              Вивчайте <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse drop-shadow-lg">
                англійську
              </span>
              <br />
              <span className="text-purple-200 animate-pulse" style={{ animationDelay: '0.5s' }}>для</span>
              <br />
              <span className="text-purple-300 animate-pulse drop-shadow-lg" style={{ animationDelay: '1s' }}>подорожей</span>
            </h1>
          </div>

          <div className={`transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-12 max-w-lg">
              Практичні фрази та граматика для реальних ситуацій у подорожі.
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="/vocabulary" className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 inline-block text-center">
              <span className="group-hover:animate-pulse">Почати зі слів</span>
            </a>
            <a href="/tenses" className="border-2 border-gray-500 text-gray-200 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:border-purple-400 hover:text-white transition-all duration-300 hover:scale-105 hover:bg-purple-500/20 backdrop-blur-sm hover:shadow-lg inline-block text-center">
              Часи
            </a>
          </div>
        </div>

        {/* Right Side - Auto Demo Quiz */}
        <div className={`hidden lg:block flex-1 max-w-lg transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'}`}>
          <div className={`bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border-2 border-gray-600/70 rounded-2xl p-8 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 hover:border-purple-500/50 ${isTransitioning ? 'opacity-50 scale-95' : ''}`}>
            {/* Progress indicators */}
            <div className="flex gap-2 mb-6">
              {quizzes.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    index === currentQuizIndex 
                      ? 'bg-purple-500' 
                      : index < currentQuizIndex 
                        ? 'bg-green-500' 
                        : 'bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-purple-300 text-lg font-medium mb-4 animate-pulse">
                {currentQuiz.question}
              </h3>
            </div>

            <div className="space-y-3 mb-6">
              {currentQuiz.options.map((option) => (
                <div 
                  key={option.letter}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-500 ${
                    showResult
                      ? option.correct
                        ? 'bg-green-500/30 border-green-400/70 shadow-xl shadow-green-500/40 scale-105'
                        : 'bg-gray-700/30 border-gray-500/50'
                      : 'bg-gray-700/50 border-gray-500/70'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                    showResult && option.correct
                      ? 'bg-green-500 text-white shadow-xl shadow-green-500/50'
                      : 'bg-gray-600 text-gray-200'
                  }`}>
                    {showResult && option.correct ? '✓' : option.letter}
                  </div>
                  <span className="text-gray-100 font-medium">{option.text}</span>
                </div>
              ))}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/50 rounded-xl p-4 animate-pulse">
                <div>
                  <p className="text-gray-200 text-sm leading-relaxed mb-2">
                    {currentQuiz.explanation}
                  </p>
                  <p className="text-green-300 font-medium text-sm">
                    Правильна відповідь: "{currentQuiz.correctAnswer}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


    </div>
  )
} 