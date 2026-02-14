import { ProductCard } from './ProductCard'
import { useState, useEffect } from 'react'

export const ProductGrid = ({ products, isLoading, onProductClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!products || products.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [products])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">No products found</p>
      </div>
    )
  }

  const firstRowProducts = products.slice(0, 3)
  const restProducts = products.slice(3)

  return (
    <div className="space-y-2 md:space-y-3">
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {[...products, ...products.slice(0, 3)].map((product, idx) => (
            <div key={`carousel-${idx}`} className="flex-shrink-0 w-1/2 lg:w-1/3 px-1">
              <ProductCard 
                product={product}
                onClick={() => onProductClick(product)}
              />
            </div>
          ))}
        </div>
        
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
          aria-label="Previous"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % products.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
          aria-label="Next"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        {restProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>
    </div>
  )
}

const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[3/4] bg-gray-200 mb-4" />
    <div className="h-4 bg-gray-200 rounded mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
)
