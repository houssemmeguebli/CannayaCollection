import { create } from 'zustand'

export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  closeSearch: () => set({ isSearchOpen: false })
}))
