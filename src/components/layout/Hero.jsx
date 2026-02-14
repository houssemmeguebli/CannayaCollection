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
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-ken-burns"
        style={{ 
          backgroundImage: 'url(/cover.avif)',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 
          style={{ fontFamily: 'Playfair Display, serif' }} 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight animate-fade-in-up"
        >
          New Season
        </h1>
        <div className="w-24 h-0.5 bg-white mx-auto mb-6 animate-expand-width"></div>
        <p className="text-lg md:text-xl mb-8 font-light tracking-wide animate-fade-in-up-delay">
          Discover the latest collection
        </p>
        
        <div className="animate-fade-in-up-delay-2">
          <HeroButton onClick={scrollToCollection} primary>
            Shop Now
          </HeroButton>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

const HeroButton = ({ onClick, children, primary = false }) => (
  <button
    onClick={onClick}
    className={`inline-block px-10 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 transform hover:scale-105 ${
      primary
        ? 'bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl'
        : 'border-2 border-white text-white hover:bg-white hover:text-black'
    }`}
  >
    {children}
  </button>
)
