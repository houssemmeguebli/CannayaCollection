export const Hero = () => {
  const scrollToCollection = (e) => {
    e.preventDefault()
    const element = document.getElementById('collection')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/cover.avif)',
          filter: 'brightness(0.7)'
        }}
      />
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 style={{ fontFamily: 'Playfair Display, serif' }} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          New Season
        </h1>
        <p className="text-lg md:text-xl mb-8 font-light tracking-wide">
          Discover the latest collection
        </p>
        
        <HeroButton onClick={scrollToCollection} primary>
          Shop Now
        </HeroButton>
      </div>
    </section>
  )
}

const HeroButton = ({ onClick, children, primary = false }) => (
  <button
    onClick={onClick}
    className={`inline-block px-10 py-3 text-sm font-medium tracking-wider uppercase transition ${
      primary
        ? 'bg-white text-black hover:bg-gray-100'
        : 'border-2 border-white text-white hover:bg-white hover:text-black'
    }`}
  >
    {children}
  </button>
)
