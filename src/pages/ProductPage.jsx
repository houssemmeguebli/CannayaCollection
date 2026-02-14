import { useState } from 'react'
import { Footer } from '../components/layout/Footer.jsx'
import { useCartStore } from '../store/cartStore'

export const ProductPage = ({ product, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
      return
    }
    addItem(product, selectedSize)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center relative">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Added to Cart!</h3>
            <p className="text-gray-600">Product added successfully</p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center relative">
            <button
              onClick={() => setShowError(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Please Select Size</h3>
            <p className="text-gray-600">Choose a size before adding to cart</p>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Collection
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-gray-50 overflow-hidden rounded-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-[3/4] border-2 overflow-hidden rounded transition ${
                    selectedImage === idx ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              {product.ref && (
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">REF: {product.ref}</div>
              )}
              <h1 style={{ fontFamily: 'Playfair Display, serif' }} className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                {product.salePrice ? (
                  <>
                    <span className="text-4xl font-bold">{product.salePrice} DT</span>
                    <span className="text-2xl text-gray-400 line-through">{product.price} DT</span>
                    <span className="bg-red-600 text-white px-4 py-1.5 text-sm font-semibold rounded">SALE</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">{product.price} DT</span>
                )}
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
              <p className="text-gray-600 mt-4">Premium quality fabric with elegant design perfect for any occasion. Handcrafted with attention to detail.</p>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-900">Available Colors</h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <div
                      key={color}
                      className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-900">Select Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 transition ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 text-lg font-semibold hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

            <div className="border-t pt-8">
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-900">Product Details</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <span>Premium cotton blend fabric</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <span>Handcrafted with care</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <span>Machine wash cold, hang dry</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <span>Made in Turkey</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
              <Footer onContactClick={onBack} />
    </div>
  )
}
