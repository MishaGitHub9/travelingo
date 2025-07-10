'use client'

import React, { useEffect, useState } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
      <nav className={`relative z-10 flex items-center justify-between p-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-purple-500/50 hover:shadow-purple-500/75 transition-all duration-300 hover:scale-110">
            T
          </div>
          <span className="text-white text-xl font-semibold">Travelingo</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="#" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-purple-300">Головна</a>
          <a href="#" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-blue-300">Часи</a>
          <a href="#" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-pink-300">Словник</a>
          <a href="#" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-cyan-300">Практика</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Left Side - Title and Content */}
        <div className="flex-1 max-w-2xl">
          <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
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
            <p className="text-gray-200 text-lg lg:text-xl leading-relaxed mb-12 max-w-lg">
              Практичні фрази та граматика для реальних ситуацій у подорожі.
            </p>
          </div>

          <div className={`flex gap-4 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50">
              <span className="group-hover:animate-pulse">Почати з часів</span>
            </button>
            <button className="border-2 border-gray-500 text-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-purple-400 hover:text-white transition-all duration-300 hover:scale-105 hover:bg-purple-500/20 backdrop-blur-sm hover:shadow-lg">
              Словник
            </button>
          </div>
        </div>

        {/* Right Side - Quiz Card */}
        <div className={`hidden lg:block flex-1 max-w-md transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'}`}>
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border-2 border-gray-600/70 rounded-2xl p-8 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 hover:border-purple-500/50">
            <div className="mb-6">
              <h3 className="text-purple-300 text-lg font-medium mb-4 animate-pulse">
                Як сказати 'Де знаходиться найближчий банкомат?'
              </h3>
            </div>

            <div className="space-y-3">
              {[
                { letter: 'A', text: 'Where is the nearest ATM?', correct: true },
                { letter: 'B', text: 'What is the nearest ATM?', correct: false },
                { letter: 'C', text: 'How is the nearest ATM?', correct: false }
              ].map((option, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                    option.correct 
                      ? 'bg-purple-500/30 border-purple-400/70 hover:bg-purple-500/40 hover:shadow-xl hover:shadow-purple-500/40' 
                      : 'bg-gray-700/50 border-gray-500/70 hover:bg-gray-600/60 hover:border-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    option.correct 
                      ? 'bg-purple-500 text-white shadow-xl shadow-purple-500/50' 
                      : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                  }`}>
                    {option.letter}
                  </div>
                  <span className="text-gray-100 font-medium">{option.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Features - Mobile Responsive */}
      <div className={`lg:hidden relative z-10 max-w-4xl mx-auto px-6 pb-12 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border-2 border-gray-600/70 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-purple-300 text-lg font-medium mb-4 animate-pulse">
            Як сказати 'Де знаходиться найближчий банкомат?'
          </h3>
          
          <div className="space-y-3">
            {[
              { letter: 'A', text: 'Where is the nearest ATM?' },
              { letter: 'B', text: 'What is the nearest ATM?' },
              { letter: 'C', text: 'How is the nearest ATM?' }
            ].map((option, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-700/50 border-2 border-gray-500/70 hover:bg-gray-600/60 transition-all duration-300 hover:scale-105"
              >
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-semibold text-gray-200">
                  {option.letter}
                </div>
                <span className="text-gray-100 font-medium">{option.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 