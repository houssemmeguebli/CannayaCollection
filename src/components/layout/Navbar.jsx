import { useState, useEffect } from 'react'
import { useCartStore } from '../../store/cartStore'

export const Navbar = ({ products = [], onProductSelect, onContactClick, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    setShowSearch(false)
  }

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'shadow-lg border-b border-gray-100' : 'shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-1 flex justify-start">
              <a href="/" className="flex items-center group">
                <img 
                  src="/logo.png" 
                  alt="Cannaya Collection" 
                  className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="flex-1 flex justify-center">
              <div className="hidden md:flex items-center space-x-10">
                <NavLink href="/">Collection</NavLink>
                <button 
                  onClick={onContactClick} 
                  className="text-sm font-medium tracking-wide text-gray-700 hover:text-black transition-colors duration-200 relative group"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </button>
                <NavLink href="/">Shop</NavLink>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex-1 flex justify-end items-center gap-2">
              {/* Search */}
              <div 
                className="relative"
                onMouseEnter={() => setShowSearch(true)}
                onMouseLeave={() => {
                  if (!searchQuery) setShowSearch(false)
                }}
              >
                {showSearch ? (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
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
                      className="w-48 md:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all duration-200"
                    />
                    <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                ) : (
                  <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-200" aria-label="Search">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                )}
                
                {showResults && filteredProducts.length > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50 animate-fade-in-up">
                    {filteredProducts.map(product => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200 text-left first:rounded-t-2xl last:rounded-b-2xl"
                      >
                        <img src={product.images[0]} alt={product.name} className="w-14 h-18 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500 mt-0.5">{product.price} DT</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart */}
              <CartButton onClick={onCartClick} />

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md animate-fade-in-up">
            <div className="px-4 py-6 space-y-4">
              <a href="/" className="block text-base font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200">Collection</a>
              <button 
                onClick={() => { onContactClick(); setMobileMenuOpen(false); }} 
                className="block w-full text-left text-base font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200"
              >
                Contact
              </button>
              <a href="/" className="block text-base font-medium text-gray-900 hover:text-gray-600 transition-colors duration-200">Shop</a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

const NavLink = ({ href, children, className = '' }) => (
  <a 
    href={href}
    className={`text-sm font-medium tracking-wide text-gray-700 hover:text-black transition-colors duration-200 relative group ${className}`}
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
  </a>
)

const CartButton = ({ onClick }) => {
  const { getItemCount } = useCartStore()
  const itemCount = getItemCount()

  return (
    <button 
      onClick={onClick} 
      className="relative p-2.5 hover:bg-gray-100 rounded-full transition-all duration-200 group" 
      aria-label="Cart"
    >
      <svg className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium animate-scale-in">
          {itemCount}
        </span>
      )}
    </button>
  )
}
