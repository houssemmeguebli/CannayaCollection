import { useState, useCallback } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import styles from './ProductCard.module.styl'

export const ProductCard = ({ product, onClick, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, once: true })

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])
  const toggleWishlist = useCallback((e) => {
    e.stopPropagation()
    setIsWishlisted(prev => !prev)
  }, [])

  const currentImage = isHovered && product.images[1] ? product.images[1] : product.images[0]
  const hasDiscount = product.salePrice && product.salePrice < product.price

  return (
    <article 
      ref={ref}
      className={`${styles.card} ${isVisible ? styles.visible : styles.hidden}`}
      onClick={onClick}
      style={{ 
        cursor: 'pointer',
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div 
        className={styles.imageWrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={currentImage}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
        
        {hasDiscount && (
          <span className={styles.badge}>Sale</span>
        )}
        
        <button
          onClick={toggleWishlist}
          className={styles.wishlist}
          aria-label="Add to wishlist"
        >
          <svg 
            className="w-5 h-5" 
            fill={isWishlisted ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.name}>
          {product.name}
        </div>
        
        <div className={styles.priceWrapper}>
          {hasDiscount ? (
            <>
              <span className={styles.salePrice}>{product.salePrice}DT</span>
              <span className={styles.originalPrice}>{product.price}DT</span>
            </>
          ) : (
            <span className={styles.price}>{product.price}DT</span>
          )}
        </div>
        
        {product.colors && product.colors.length > 0 && (
          <div className={styles.colors}>
            {product.colors.map((color) => (
              <span 
                key={color}
                className={styles.colorDot}
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
