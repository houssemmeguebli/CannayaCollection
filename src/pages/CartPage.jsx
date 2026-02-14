import { useCartStore } from '../store/cartStore'
import { useState } from 'react'
import { Footer } from '../components/layout/Footer'
import { sendOrderEmail } from '../services/emailService'

export const CartPage = ({ onBack, onContactClick }) => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleOrder = async () => {
    if (items.length === 0) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    if (!formData.name || !formData.phone || !formData.address) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        items: items.map(item => ({
          name: item.name,
          ref: item.ref,
          size: item.size,
          quantity: item.quantity,
          price: item.salePrice || item.price,
          total: (item.salePrice || item.price) * item.quantity
        })),
        total: getTotal(),
        customer: formData
      }

      await sendOrderEmail(orderData)
      
      setShowSuccess(true)
      clearCart()
      setFormData({ name: '', phone: '', address: '' })
      setTimeout(() => {
        setShowSuccess(false)
        onBack()
      }, 3000)
    } catch (error) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Processing your order...</p>
          </div>
        </div>
      )}

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
            <h3 className="text-2xl font-bold mb-2">Order Placed!</h3>
            <p className="text-gray-600">Thank you for your order. We will contact you soon.</p>
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
            <h3 className="text-2xl font-bold mb-2">Error!</h3>
            <p className="text-gray-600">Please fill all fields and try again.</p>
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
          Continue Shopping
        </button>

        <h1 style={{ fontFamily: 'Playfair Display, serif' }} className="text-4xl font-bold mb-8">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
            <button
              onClick={onBack}
              className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-6 border-b pb-6">
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-32 h-40 object-cover rounded"
                  />
                  <div className="flex-1">
                    {item.ref && (
                      <p className="text-xs text-gray-500 uppercase mb-1">REF: {item.ref}</p>
                    )}
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-2">Size: {item.size}</p>
                    <p className="text-2xl font-bold mb-4">{item.salePrice || item.price} DT</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="px-4 py-2 hover:bg-gray-100 transition"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="px-4 py-2 hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Address *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
                      rows="3"
                      placeholder="Delivery address"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total:</span>
                    <span>{getTotal()} DT</span>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-4 text-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer onContactClick={onContactClick} />
    </div>
  )
}
