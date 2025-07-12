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

            {/* Navigation - Mobile First */}
      <nav className={`relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <div className="flex items-center justify-between p-4 md:p-6 lg:px-8">
          {/* Logo - Mobile First */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-sm md:text-lg lg:text-xl shadow-lg md:shadow-xl shadow-purple-500/50 hover:shadow-purple-500/75 transition-all duration-300 hover:scale-110">
              T
            </div>
            <span className="text-white text-base md:text-lg lg:text-xl font-semibold">Travelingo</span>
          </div>

          {/* Desktop Navigation Links - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8 text-gray-300">
            <a href="/" className="text-sm lg:text-base hover:text-white transition-all duration-200 hover:scale-110 hover:text-purple-300">Головна</a>
            <a href="/vocabulary" className="text-sm lg:text-base hover:text-white transition-all duration-200 hover:scale-110 hover:text-pink-300">Словник</a>
            <a href="/practice" className="text-sm lg:text-base hover:text-white transition-all duration-200 hover:scale-110 hover:text-cyan-300">Практика</a>
          </div>
        </div>
      </nav>

      {/* Main Content - Mobile First */}
      <div className="relative z-10 min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-140px)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-12 lg:pb-16">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12">
            
            {/* Main Content - Mobile First */}
            <div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none">
              {/* Title - Mobile First */}
              <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white leading-tight mb-4 md:mb-6 lg:mb-8">
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

              {/* Description - Mobile First */}
              <div className={`transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-gray-200 text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed mb-6 md:mb-8 lg:mb-12 max-w-lg mx-auto lg:mx-0">
                  Практичні фрази та граматика для реальних ситуацій у подорожі.
                </p>
              </div>

              {/* Buttons - Mobile First */}
              <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-6 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <a href="/vocabulary" className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-xl font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 lg:hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 inline-block text-center text-sm md:text-base">
                  <span className="group-hover:animate-pulse">Почати зі слів</span>
                </a>
                <a href="/practice" className="border-2 border-cyan-500 text-cyan-200 px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-xl font-semibold hover:border-cyan-400 hover:text-white transition-all duration-300 hover:scale-105 hover:bg-cyan-500/20 backdrop-blur-sm hover:shadow-lg inline-block text-center text-sm md:text-base">
                  Практика
                </a>
              </div>
            </div>

            {/* Right Side - Quiz Demo - Hidden on Mobile */}
            <div className={`hidden lg:block flex-1 max-w-lg transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'}`}>
              <div className={`bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border-2 border-gray-600/70 rounded-2xl p-6 lg:p-8 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 hover:border-purple-500/50 ${isTransitioning ? 'opacity-50 scale-95' : ''}`}>
                {/* Progress indicators */}
                <div className="flex gap-2 mb-4 lg:mb-6">
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

                <div className="mb-4 lg:mb-6">
                  <h3 className="text-purple-300 text-base lg:text-lg font-medium mb-3 lg:mb-4 animate-pulse">
                    {currentQuiz.question}
                  </h3>
                </div>

                <div className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
                  {currentQuiz.options.map((option) => (
                    <div 
                      key={option.letter}
                      className={`flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl border-2 transition-all duration-500 ${
                        showResult
                          ? option.correct
                            ? 'bg-green-500/30 border-green-400/70 shadow-xl shadow-green-500/40 scale-105'
                            : 'bg-gray-700/30 border-gray-500/50'
                          : 'bg-gray-700/50 border-gray-500/70'
                      }`}
                    >
                      <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs lg:text-sm font-semibold transition-all duration-500 ${
                        showResult && option.correct
                          ? 'bg-green-500 text-white shadow-xl shadow-green-500/50'
                          : 'bg-gray-600 text-gray-200'
                      }`}>
                        {showResult && option.correct ? '✓' : option.letter}
                      </div>
                      <span className="text-gray-100 font-medium text-sm lg:text-base">{option.text}</span>
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                {showResult && (
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/50 rounded-xl p-3 lg:p-4 animate-pulse">
                    <div>
                      <p className="text-gray-200 text-xs lg:text-sm leading-relaxed mb-2">
                        {currentQuiz.explanation}
                      </p>
                      <p className="text-green-300 font-medium text-xs lg:text-sm">
                        Правильна відповідь: "{currentQuiz.correctAnswer}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Mobile Landing Pages - Mobile First */}
      <div className="md:hidden relative z-10">
        {/* Vocabulary Section - Mobile First */}
        <section className="min-h-screen bg-gradient-to-br from-black via-purple-900/70 to-pink-900/50 relative overflow-hidden">
          {/* Background Effects - Mobile Optimized */}
          <div className="absolute inset-0 opacity-20 md:opacity-30">
            <div className="absolute top-16 left-6 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded-full blur-2xl md:blur-3xl animate-pulse"></div>
            <div className="absolute bottom-16 right-6 w-28 h-28 md:w-32 md:h-32 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full blur-xl md:blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 md:py-12">
            <div className="w-full max-w-xs md:max-w-sm text-center">
              {/* Icon - Mobile First */}
              <div className="relative mb-6 md:mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-white text-3xl md:text-4xl font-bold mx-auto shadow-xl md:shadow-2xl shadow-pink-500/50 animate-pulse">
                  📚
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-yellow-400 rounded-full animate-bounce"></div>
              </div>
              
              {/* Title - Mobile First */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Словник
              </h2>
              
              {/* Description - Mobile First */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 md:mb-8 px-2">
                Вивчайте найважливіші слова та фрази для подорожей. Від замовлення їжі до бронювання готелю.
              </p>
              
              {/* Example Card - Mobile First */}
              <div className="mb-6 md:mb-8">
                <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-sm border border-pink-500/30 rounded-xl p-3 md:p-4 text-left">
                  <div className="text-pink-300 text-xs font-semibold mb-1">ПРИКЛАД</div>
                  <div className="text-white text-sm md:text-base">"How much does it cost?" - Скільки це коштує?</div>
                </div>
              </div>
              
              {/* CTA Button - Mobile First */}
              <a 
                href="/vocabulary" 
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg md:shadow-xl shadow-pink-500/30 inline-block text-sm md:text-base"
              >
                Почати вивчати →
              </a>
            </div>
          </div>
        </section>

        {/* Practice Section - Mobile First */}
        <section className="min-h-screen bg-gradient-to-br from-black via-cyan-900/70 to-blue-900/50 relative overflow-hidden">
          {/* Background Effects - Mobile Optimized */}
          <div className="absolute inset-0 opacity-20 md:opacity-30">
            <div className="absolute top-24 right-4 w-30 h-30 md:w-36 md:h-36 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-2xl md:blur-3xl animate-pulse"></div>
            <div className="absolute bottom-24 left-4 w-36 h-36 md:w-44 md:h-44 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-full blur-xl md:blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 md:py-12">
            <div className="w-full max-w-xs md:max-w-sm text-center">
              {/* Icon - Mobile First */}
              <div className="relative mb-6 md:mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-white text-3xl md:text-4xl font-bold mx-auto shadow-xl md:shadow-2xl shadow-cyan-500/50 animate-pulse">
                  💬
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              {/* Title - Mobile First */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Практика
              </h2>
              
              {/* Description - Mobile First */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 md:mb-8 px-2">
                Практикуйте розмовну англійську з ШІ. Реальні ситуації з подорожей у безпечному середовищі.
              </p>
              
              {/* Feature Card - Mobile First */}
              <div className="mb-6 md:mb-8">
                <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-3 md:p-4 text-left">
                  <div className="text-cyan-300 text-xs font-semibold mb-1">ШІ ДОПОМАГАЄ</div>
                  <div className="text-white text-sm md:text-base">Розмовляйте про готелі, ресторани, транспорт</div>
                </div>
              </div>
              
              {/* CTA Button - Mobile First */}
              <a 
                href="/practice" 
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg md:shadow-xl shadow-cyan-500/30 inline-block text-sm md:text-base"
              >
                Почати практику →
              </a>
            </div>
          </div>
        </section>

        {/* Tenses Section - Mobile First */}
        <section className="min-h-screen bg-gradient-to-br from-black via-indigo-900/70 to-purple-900/50 relative overflow-hidden">
          {/* Background Effects - Mobile Optimized */}
          <div className="absolute inset-0 opacity-20 md:opacity-30">
            <div className="absolute top-20 left-8 w-32 h-32 md:w-38 md:h-38 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 rounded-full blur-2xl md:blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-8 w-34 h-34 md:w-40 md:h-40 bg-gradient-to-r from-purple-500/40 to-indigo-500/40 rounded-full blur-xl md:blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 md:py-12">
            <div className="w-full max-w-xs md:max-w-sm text-center">
              {/* Icon - Mobile First */}
              <div className="relative mb-6 md:mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-white text-3xl md:text-4xl font-bold mx-auto shadow-xl md:shadow-2xl shadow-indigo-500/50 animate-pulse">
                  ⏰
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              </div>
              
              {/* Title - Mobile First */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Часи
              </h2>
              
              {/* Description - Mobile First */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 md:mb-8 px-2">
                Опануйте англійські часи через практичні приклади з туристичних ситуацій.
              </p>
              
              {/* Feature Card - Mobile First */}
              <div className="mb-6 md:mb-8">
                <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-3 md:p-4 text-left">
                  <div className="text-indigo-300 text-xs font-semibold mb-1">ГРАМАТИКА</div>
                  <div className="text-white text-sm md:text-base">Present, Past, Future у туристичних фразах</div>
                </div>
              </div>
              
              {/* CTA Button - Mobile First */}
              <a 
                href="/tenses" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg md:shadow-xl shadow-indigo-500/30 inline-block text-sm md:text-base"
              >
                Вивчити часи →
              </a>
            </div>
          </div>
        </section>
      </div>


    </div>
  )
} 