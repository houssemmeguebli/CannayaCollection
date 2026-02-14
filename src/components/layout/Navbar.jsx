import { useState, useEffect } from 'react'
import { useCartStore } from '../../store/cartStore'

export const Navbar = ({ products = [], onProductSelect, onContactClick, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleProductClick = (product) => {
    onProductSelect(product)
    setSearchQuery('')
    setShowResults(false)
  }

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-white transition-shadow ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex-1 flex justify-start">
              <a href="/" className="flex items-center">
                <img src="/logo.png" alt="Cannaya Collection" className="h-14 md:h-16 w-auto object-contain" />
              </a>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="hidden md:flex items-center space-x-8">
                <NavLink href="/">Collection</NavLink>
                <button onClick={onContactClick} className="text-sm font-medium tracking-wide hover:text-gray-600 transition">Contact</button>
                  <NavLink href="/">Shop</NavLink>
              </div>
            </div>

            <div className="flex-1 flex justify-end relative">
              <div className="flex items-center gap-4">
                <CartButton onClick={onCartClick} />
                
                <div 
                className="relative"
                onMouseEnter={() => setShowSearch(true)}
                onMouseLeave={() => {
                  if (!searchQuery) setShowSearch(false)
                }}
              >
                {showSearch ? (
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setShowResults(e.target.value.length > 0)
                    }}
                    onFocus={() => searchQuery && setShowResults(true)}
                    onBlur={() => {
                      setTimeout(() => {
                        setShowResults(false)
                        if (!searchQuery) setShowSearch(false)
                      }, 200)
                    }}
                    autoFocus
                    className="w-48 md:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-black transition"
                  />
                ) : (
                  <button className="p-2 hover:bg-gray-100 rounded-full transition" aria-label="Search">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                )}
                
                {showSearch && (
                  <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
                
                {showResults && filteredProducts.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    {filteredProducts.map(product => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition text-left"
                      >
                        <img src={product.images[0]} alt={product.name} className="w-12 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.price} DT</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

const NavLink = ({ href, children, className = '' }) => (
  <a 
    href={href}
    className={`text-sm font-medium tracking-wide hover:text-gray-600 transition ${className}`}
  >
    {children}
  </a>
)

const CartButton = ({ onClick }) => {
  const { getItemCount } = useCartStore()
  const itemCount = getItemCount()

  return (
    <button onClick={onClick} className="relative p-2 hover:bg-gray-100 rounded-full transition" aria-label="Cart">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  )
}
