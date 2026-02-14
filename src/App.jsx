import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/layout/Hero'
import { ProductGrid } from './components/product/ProductGrid'
import { ProductPage } from './pages/ProductPage'
import { ContactPage } from './pages/ContactPage'
import { CartPage } from './pages/CartPage'
import { Footer } from './components/layout/Footer'
import { FloatingButtons } from './components/ui/FloatingButtons'
import { useProducts } from './hooks/useProducts'
import { useState } from 'react'

export const App = () => {
  const { products, isLoading } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showContact, setShowContact] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    setShowCart(false)
    setShowContact(false)
    window.scrollTo(0, 0)
  }

  const handleContactOpen = () => {
    setShowContact(true)
    setShowCart(false)
    setSelectedProduct(null)
    window.scrollTo(0, 0)
  }

  const handleCartOpen = () => {
    setShowCart(true)
    setShowContact(false)
    setSelectedProduct(null)
    window.scrollTo(0, 0)
  }

  if (showCart) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar products={products} onProductSelect={handleProductSelect} onContactClick={handleContactOpen} onCartClick={handleCartOpen} />
        <CartPage onBack={() => setShowCart(false)} onContactClick={handleContactOpen} />
        <FloatingButtons />
      </div>
    )
  }

  if (showContact) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar products={products} onProductSelect={handleProductSelect} onContactClick={handleContactOpen} onCartClick={handleCartOpen} />
        <ContactPage onBack={() => setShowContact(false)} />
        <FloatingButtons />
      </div>
    )
  }

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar products={products} onProductSelect={handleProductSelect} onContactClick={handleContactOpen} onCartClick={handleCartOpen} />
        <ProductPage product={selectedProduct} onBack={() => setSelectedProduct(null)} />
        <FloatingButtons />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar products={products} onProductSelect={handleProductSelect} onContactClick={handleContactOpen} onCartClick={handleCartOpen} />
      <Hero />
      
      <main id="collection" className="max-w-full px-2 md:px-4 py-8 md:py-12" role="main">
        <article>
          <header className="mb-6 md:mb-8">
            <h1 style={{ fontFamily: 'Playfair Display, serif' }} className="text-2xl md:text-4xl font-bold text-center mb-2">
              Cannaya Collection
            </h1>
            <p className="text-center text-gray-600 text-sm md:text-base">Discover our latest arrivals</p>
          </header>
          
          <ProductGrid 
            products={products} 
            isLoading={isLoading}
            onProductClick={handleProductSelect}
          />
        </article>
      </main>
      
      <Footer onContactClick={handleContactOpen} />
      <FloatingButtons />
    </div>
  )
}
