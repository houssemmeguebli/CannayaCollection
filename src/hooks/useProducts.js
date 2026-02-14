import { useState, useEffect } from 'react'

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const mockProducts = [
          {
            id: 1,
            ref: 'CAN-001',
            name: 'Elegant Modest Dress',
            price: 149,
            salePrice: null,
            images: [
              '/src/assets/images/0583ef60ce72ac85d8a97573ee727fdf.jpg',
              '/src/assets/images/0f005502050eb4a2e37b907fbead8266.jpg',
              '/src/assets/images/16fb07f733d86f53ecadd1a09e4c8d61.jpg'
            ],
            category: 'women',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Black', 'Navy'],
            description: 'Elegant modest dress with premium fabric'
          },
          {
            id: 2,
            ref: 'CAN-002',
            name: 'Premium Hijab Collection',
            price: 89,
            salePrice: 69,
            images: [
              '/src/assets/images/5188965c6678b083a44e836a2fb6b344.jpg',
              '/src/assets/images/5a359bef206b8ab21ddeb7d1ac8ee35f.jpg',
              '/src/assets/images/7e680b0f35173876d2c70212c3936a6b.jpg'
            ],
            category: 'women',
            sizes: ['One Size'],
            colors: ['Black', 'Beige', 'Grey'],
            description: 'Premium hijab with elegant design'
          },
          {
            id: 3,
            ref: 'CAN-003',
            name: 'Classic Abaya Set',
            price: 199,
            salePrice: null,
            images: [
              '/src/assets/images/81c7aebe3e362c18f918e0129afddad2.jpg',
              '/src/assets/images/8fb6ae1935d16ba94be168bfbc6dc289.jpg',
              '/src/assets/images/bef9c8f330c55ab07f77158a57b94509.jpg'
            ],
            category: 'women',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Black'],
            description: 'Traditional abaya with modern touch'
          },
          {
            id: 4,
            ref: 'CAN-004',
            name: 'Designer Modest Wear',
            price: 179,
            salePrice: 149,
            images: [
              '/src/assets/images/c0eca54e180a0c8851561ae880809c84.jpg',
              '/src/assets/images/c1a6bd7dfe456439bea66adf4e3ff6f6.jpg',
              '/src/assets/images/cf76d3c0fe9654646d6244e8ca38c90d.jpg'
            ],
            category: 'women',
            sizes: ['S', 'M', 'L'],
            colors: ['Beige', 'Brown'],
            description: 'Designer collection for modest fashion'
          },
          {
            id: 5,
            ref: 'CAN-005',
            name: 'Luxury Hijab Style',
            price: 119,
            salePrice: null,
            images: [
              '/src/assets/images/fa3f9a4ad3dfd29a9c568fa8f92c7efa.jpg',
              '/src/assets/images/hijab-a-enfiler-crepe-et-mousseline.jpg',
              '/src/assets/images/0583ef60ce72ac85d8a97573ee727fdf.jpg'
            ],
            category: 'women',
            sizes: ['One Size'],
            colors: ['Black', 'White'],
            description: 'Luxury hijab with premium quality'
          },
          {
            id: 6,
            ref: 'CAN-006',
            name: 'Modern Abaya Collection',
            price: 229,
            salePrice: 189,
            images: [
              '/src/assets/images/16fb07f733d86f53ecadd1a09e4c8d61.jpg',
              '/src/assets/images/5188965c6678b083a44e836a2fb6b344.jpg',
              '/src/assets/images/7e680b0f35173876d2c70212c3936a6b.jpg'
            ],
            category: 'women',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Black', 'Navy', 'Grey'],
            description: 'Contemporary abaya design'
          },
          {
            id: 7,
            ref: 'CAN-007',
            name: 'Elegant Evening Dress',
            price: 259,
            salePrice: null,
            images: [
              '/src/assets/images/8fb6ae1935d16ba94be168bfbc6dc289.jpg',
              '/src/assets/images/bef9c8f330c55ab07f77158a57b94509.jpg',
              '/src/assets/images/c0eca54e180a0c8851561ae880809c84.jpg'
            ],
            category: 'women',
            sizes: ['S', 'M', 'L'],
            colors: ['Black', 'Burgundy'],
            description: 'Elegant evening dress for special occasions'
          },
          {
            id: 8,
            ref: 'CAN-008',
            name: 'Premium Modest Set',
            price: 299,
            salePrice: 249,
            images: [
              '/src/assets/images/c1a6bd7dfe456439bea66adf4e3ff6f6.jpg',
              '/src/assets/images/cf76d3c0fe9654646d6244e8ca38c90d.jpg',
              '/src/assets/images/fa3f9a4ad3dfd29a9c568fa8f92c7efa.jpg'
            ],
            category: 'women',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Beige', 'Cream'],
            description: 'Complete modest fashion set'
          },
          {
            id: 9,
            ref: 'CAN-009',
            name: 'Casual Hijab Style',
            price: 79,
            salePrice: null,
            images: [
              '/src/assets/images/0f005502050eb4a2e37b907fbead8266.jpg',
              '/src/assets/images/5a359bef206b8ab21ddeb7d1ac8ee35f.jpg',
              '/src/assets/images/81c7aebe3e362c18f918e0129afddad2.jpg'
            ],
            category: 'women',
            sizes: ['One Size'],
            colors: ['Black', 'Grey', 'White'],
            description: 'Comfortable hijab for everyday wear'
          },
          {
            id: 10,
            ref: 'CAN-010',
            name: 'Formal Abaya Dress',
            price: 349,
            salePrice: 299,
            images: [
              '/src/assets/images/hijab-a-enfiler-crepe-et-mousseline.jpg',
              '/src/assets/images/0583ef60ce72ac85d8a97573ee727fdf.jpg',
              '/src/assets/images/16fb07f733d86f53ecadd1a09e4c8d61.jpg'
            ],
            category: 'women',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Black'],
            description: 'Formal abaya for elegant occasions'
          },
          {
            id: 11,
            ref: 'CAN-011',
            name: 'Chic Modest Outfit',
            price: 189,
            salePrice: null,
            images: [
              '/src/assets/images/5188965c6678b083a44e836a2fb6b344.jpg',
              '/src/assets/images/8fb6ae1935d16ba94be168bfbc6dc289.jpg',
              '/src/assets/images/c0eca54e180a0c8851561ae880809c84.jpg'
            ],
            category: 'women',
            sizes: ['S', 'M', 'L'],
            colors: ['Navy', 'Black'],
            description: 'Chic and modern modest outfit'
          },
          {
            id: 12,
            ref: 'CAN-012',
            name: 'Luxury Evening Abaya',
            price: 399,
            salePrice: 349,
            images: [
              '/src/assets/images/7e680b0f35173876d2c70212c3936a6b.jpg',
              '/src/assets/images/bef9c8f330c55ab07f77158a57b94509.jpg',
              '/src/assets/images/c1a6bd7dfe456439bea66adf4e3ff6f6.jpg'
            ],
            category: 'women',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Black', 'Gold'],
            description: 'Luxury abaya with elegant embellishments'
          }
        ]
        setProducts(mockProducts)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, isLoading, error }
}
