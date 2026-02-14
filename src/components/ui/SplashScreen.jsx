import { useEffect, useState } from 'react'

export const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onFinish, 500)
    }, 2500)

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center">
        <div className="animate-fade-in-up">
          <img
            src="/logo.png"
            alt="Cannaya Collection"
            className="h-32 md:h-40 w-auto mx-auto mb-8 animate-pulse-slow"
          />
          <h1
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="text-3xl md:text-4xl font-bold text-black mb-2 animate-fade-in-up-delay"
          >
            Cannaya Collection
          </h1>
          <p className="text-gray-600 text-sm md:text-base tracking-wider animate-fade-in-up-delay-2">
            Luxury Fashion
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
