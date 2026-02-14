import { useCartStore } from '../../store/cartStore'
import { useState } from 'react'

export const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const [showCheckout, setShowCheckout] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' })

  const handleCheckout = () => {
    if (items.length === 0) return
    setShowCheckout(true)
  }

  const handleOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill all fields')
      return
    }

    const message = `Hello, I want to order:\n\n${items.map(item => 
      `- ${item.name} (Size: ${item.size}) x${item.quantity} - ${(item.salePrice || item.price) * item.quantity} DT`
    ).join('\n')}\n\nTotal: ${getTotal()} DT\n\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}`

    const whatsappUrl = `https://wa.me/21655562933?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    clearCart()
    setShowCheckout(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {showCheckout ? (
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-xl font-bold mb-4">Checkout</h3>
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

            <div className="border-t pt-4 mb-4">
              <h4 className="font-semibold mb-2">Order Summary</h4>
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="text-sm text-gray-600 mb-1">
                  {item.name} (Size: {item.size}) x{item.quantity}
                </div>
              ))}
              <div className="text-xl font-bold mt-4">Total: {getTotal()} DT</div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 py-3 border border-gray-300 hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={handleOrder}
                className="flex-1 py-3 bg-green-500 text-white hover:bg-green-600 transition"
              >
                Order via WhatsApp
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 mt-12">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b pb-4">
                      <img src={item.images[0]} alt={item.name} className="w-20 h-24 object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        <p className="font-bold mt-1">{item.salePrice || item.price} DT</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between mb-4 text-xl font-bold">
                  <span>Total:</span>
                  <span>{getTotal()} DT</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-3 hover:bg-gray-800 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
