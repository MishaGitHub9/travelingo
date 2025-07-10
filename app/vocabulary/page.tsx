'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface VocabularyItem {
  ukrainian: string
  english: string
  pronunciation?: string
}

interface Category {
  id: string
  title: string
  emoji: string
  description: string
  words: VocabularyItem[]
  position: { top: string; left: string }
  completed: boolean
}

const vocabularyCategories: Category[] = [
  {
    id: 'planning',
    title: 'Планування подорожі',
    emoji: '🗓️',
    description: 'Основні фрази для планування поїздки',
    position: { top: '15%', left: '20%' },
    completed: false,
    words: [
      { ukrainian: 'Подорож', english: 'Trip', pronunciation: '[trɪp]' },
      { ukrainian: 'Резервація', english: 'Reservation', pronunciation: '[ˌrezərˈveɪʃn]' },
      { ukrainian: 'Паспорт', english: 'Passport', pronunciation: '[ˈpæspɔːrt]' },
      { ukrainian: 'Віза', english: 'Visa', pronunciation: '[ˈviːzə]' },
      { ukrainian: 'Багаж', english: 'Luggage', pronunciation: '[ˈlʌɡɪdʒ]' },
      { ukrainian: 'Квиток', english: 'Ticket', pronunciation: '[ˈtɪkɪt]' },
      { ukrainian: 'Маршрут', english: 'Route', pronunciation: '[ruːt]' },
      { ukrainian: 'Путівник', english: 'Guide book', pronunciation: '[ɡaɪd bʊk]' }
    ]
  },
  {
    id: 'airport',
    title: 'В аеропорту',
    emoji: '✈️',
    description: 'Фрази для аеропорту та реєстрації',
    position: { top: '35%', left: '70%' },
    completed: false,
    words: [
      { ukrainian: 'Аеропорт', english: 'Airport', pronunciation: '[ˈeərpɔːrt]' },
      { ukrainian: 'Реєстрація', english: 'Check-in', pronunciation: '[tʃek ɪn]' },
      { ukrainian: 'Посадковий талон', english: 'Boarding pass', pronunciation: '[ˈbɔːrdɪŋ pæs]' },
      { ukrainian: 'Виліт', english: 'Departure', pronunciation: '[dɪˈpɑːrtʃər]' },
      { ukrainian: 'Прибуття', english: 'Arrival', pronunciation: '[əˈraɪvl]' },
      { ukrainian: 'Ручна поклажа', english: 'Carry-on', pronunciation: '[ˈkæri ɒn]' },
      { ukrainian: 'Затримка', english: 'Delay', pronunciation: '[dɪˈleɪ]' },
      { ukrainian: 'Вихід', english: 'Gate', pronunciation: '[ɡeɪt]' }
    ]
  },
  {
    id: 'transport',
    title: 'Транспорт',
    emoji: '🚗',
    description: 'Пересування в місті',
    position: { top: '60%', left: '25%' },
    completed: false,
    words: [
      { ukrainian: 'Таксі', english: 'Taxi', pronunciation: '[ˈtæksi]' },
      { ukrainian: 'Автобус', english: 'Bus', pronunciation: '[bʌs]' },
      { ukrainian: 'Метро', english: 'Subway', pronunciation: '[ˈsʌbweɪ]' },
      { ukrainian: 'Зупинка', english: 'Stop', pronunciation: '[stɒp]' },
      { ukrainian: 'Станція', english: 'Station', pronunciation: '[ˈsteɪʃn]' },
      { ukrainian: 'Водій', english: 'Driver', pronunciation: '[ˈdraɪvər]' },
      { ukrainian: 'Адреса', english: 'Address', pronunciation: '[əˈdres]' },
      { ukrainian: 'Напрямок', english: 'Direction', pronunciation: '[dəˈrekʃn]' }
    ]
  },
  {
    id: 'hotel',
    title: 'Готель',
    emoji: '🏨',
    description: 'Проживання та сервіс',
    position: { top: '80%', left: '65%' },
    completed: false,
    words: [
      { ukrainian: 'Готель', english: 'Hotel', pronunciation: '[hoʊˈtel]' },
      { ukrainian: 'Номер', english: 'Room', pronunciation: '[ruːm]' },
      { ukrainian: 'Ключ', english: 'Key', pronunciation: '[kiː]' },
      { ukrainian: 'Рецепція', english: 'Reception', pronunciation: '[rɪˈsepʃn]' },
      { ukrainian: 'Сніданок', english: 'Breakfast', pronunciation: '[ˈbrekfəst]' },
      { ukrainian: 'Рушник', english: 'Towel', pronunciation: '[ˈtaʊəl]' },
      { ukrainian: 'Ліфт', english: 'Elevator', pronunciation: '[ˈeləveɪtər]' },
      { ukrainian: 'Поверх', english: 'Floor', pronunciation: '[flɔːr]' }
    ]
  },
  {
    id: 'restaurant',
    title: 'Ресторан',
    emoji: '🍽️',
    description: 'Їжа та напої',
    position: { top: '45%', left: '40%' },
    completed: false,
    words: [
      { ukrainian: 'Ресторан', english: 'Restaurant', pronunciation: '[ˈrestərɑːnt]' },
      { ukrainian: 'Меню', english: 'Menu', pronunciation: '[ˈmenjuː]' },
      { ukrainian: 'Замовлення', english: 'Order', pronunciation: '[ˈɔːrdər]' },
      { ukrainian: 'Рахунок', english: 'Bill', pronunciation: '[bɪl]' },
      { ukrainian: 'Чайові', english: 'Tip', pronunciation: '[tɪp]' },
      { ukrainian: 'Офіціант', english: 'Waiter', pronunciation: '[ˈweɪtər]' },
      { ukrainian: 'Вода', english: 'Water', pronunciation: '[ˈwɔːtər]' },
      { ukrainian: 'Десерт', english: 'Dessert', pronunciation: '[dɪˈzɜːrt]' }
    ]
  }
]

export default function VocabularyPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [completedCategories, setCompletedCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category)
    setCompletedCategories(prev => new Set([...Array.from(prev), category.id]))
  }

  const closeModal = () => {
    setSelectedCategory(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-700/40 via-transparent to-blue-700/40 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-pink-600/30 via-transparent to-cyan-600/30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 flex items-center justify-between p-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-purple-500/50">
            T
          </div>
          <span className="text-white text-xl font-semibold">Travelingo</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <Link href="/" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-purple-300">Головна</Link>
          <Link href="/tenses" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-blue-300">Часи</Link>
          <span className="text-purple-400 font-semibold">Словник</span>
          <Link href="/practice" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-cyan-300">Практика</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Словник для
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block animate-pulse">
              подорожей
            </span>
          </h1>
          <p className="text-gray-200 text-lg lg:text-xl max-w-2xl mx-auto">
            Пройдіть шлях подорожі від планування до повернення додому
          </p>
        </div>

        {/* Journey Path */}
        <div className={`relative h-[600px] transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Path Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 120,90 Q 300,150 420,210 Q 500,250 150,360 Q 200,400 390,480"
              stroke="url(#pathGradient)"
              strokeWidth="4"
              fill="none"
              className="animate-pulse"
              strokeDasharray="10,5"
            />
          </svg>

          {/* Category Nodes */}
          {vocabularyCategories.map((category, index) => (
            <div
              key={category.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-110 cursor-pointer group ${
                completedCategories.has(category.id) ? 'z-20' : 'z-10'
              }`}
              style={{
                top: category.position.top,
                left: category.position.left,
                animationDelay: `${index * 200}ms`
              }}
              onClick={() => handleCategoryClick(category)}
            >
              {/* Node */}
              <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${
                completedCategories.has(category.id)
                  ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-xl shadow-green-500/50'
                  : 'bg-gradient-to-br from-purple-500 to-blue-600 shadow-xl shadow-purple-500/50 group-hover:shadow-purple-500/75'
              }`}>
                {completedCategories.has(category.id) ? '✓' : category.emoji}
                
                {/* Pulse Animation for uncompleted */}
                {!completedCategories.has(category.id) && (
                  <div className="absolute inset-0 rounded-2xl bg-purple-400 animate-ping opacity-20"></div>
                )}
              </div>

              {/* Label */}
              <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center">
                <h3 className="text-white font-semibold text-sm mb-1 whitespace-nowrap">
                  {category.title}
                </h3>
                <p className="text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-gray-300">Прогрес:</span>
            <div className="flex gap-2">
              {vocabularyCategories.map((category) => (
                <div
                  key={category.id}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    completedCategories.has(category.id)
                      ? 'bg-green-500'
                      : 'bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-purple-300 font-semibold">
              {completedCategories.size}/{vocabularyCategories.length}
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-600/50" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                  {selectedCategory.emoji}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCategory.title}</h2>
                  <p className="text-gray-300">{selectedCategory.description}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            {/* Words Grid */}
            <div className="grid gap-4">
              {selectedCategory.words.map((word, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-300 text-sm">{word.ukrainian}</span>
                      <h3 className="text-white font-semibold text-lg">{word.english}</h3>
                      {word.pronunciation && (
                        <span className="text-purple-300 text-sm">{word.pronunciation}</span>
                      )}
                    </div>
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-300">🔊</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 