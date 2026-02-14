import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, size) => {
        const items = get().items
        const existingItem = items.find(
          item => item.id === product.id && item.size === size
        )
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({ items: [...items, { ...product, size, quantity: 1 }] })
        }
      },
      
      removeItem: (id, size) => {
        set({ items: get().items.filter(item => !(item.id === id && item.size === size)) })
      },
      
      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size)
          return
        }
        set({
          items: get().items.map(item =>
            item.id === id && item.size === size
              ? { ...item, quantity }
              : item
          )
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.salePrice || item.price
          return total + price * item.quantity
        }, 0)
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)
