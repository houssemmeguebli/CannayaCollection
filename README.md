# Luxury Fashion E-Commerce

Modern luxury fashion e-commerce website built with React, Vite, Tailwind CSS, and Zustand.

## Features

- 🎨 Minimal luxury design with black/white/beige color scheme
- 📱 Fully responsive mobile-first design
- 🛒 Shopping cart with localStorage persistence
- 🔍 Product filtering and search
- ⚡ Optimized performance with lazy loading
- 🎭 Smooth animations and hover effects
- ♿ Accessible components

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **Stylus** - CSS preprocessor for complex components
- **Zustand** - State management
- **Standard.js** - Code style

## Project Structure

```
src/
├── assets/          # Images and static files
├── components/
│   ├── ui/          # Reusable UI components
│   ├── layout/      # Layout components (Navbar, Hero, Footer)
│   ├── product/     # Product-related components
│   └── filters/     # Filter components
├── pages/           # Page components
├── services/        # API services
├── store/           # Zustand stores
├── hooks/           # Custom React hooks
├── theme/           # Theme configuration
└── utils/           # Utility functions
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Key Components

### Navbar
- Sticky navigation with scroll effect
- Shopping cart counter
- Mobile menu
- Search functionality

### Hero Section
- Full-screen banner
- Typography overlay
- CTA buttons

### Product Card
- Image hover swap effect
- Wishlist functionality
- Sale badge
- Color variants

### Filter Sidebar
- Price range slider
- Size selection
- Color selection
- Category filters

## State Management

### Cart Store (Zustand)
- Add/remove items
- Update quantities
- Persist to localStorage
- Calculate totals

### UI Store (Zustand)
- Mobile menu state
- Cart drawer state
- Search modal state

## Styling

- **Tailwind CSS** for layout, spacing, and utilities
- **Stylus modules** for complex component styling
- **Custom theme** with luxury fashion colors
- **Google Fonts**: Playfair Display + Poppins

## Performance Optimizations

- Lazy loading images with WebP format
- Code splitting with React.lazy
- Memoized components with React.memo
- Optimized re-renders with useCallback/useMemo

## SEO

- Meta tags for each page
- Semantic HTML structure
- Clean URLs
- JSON-LD structured data ready

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
