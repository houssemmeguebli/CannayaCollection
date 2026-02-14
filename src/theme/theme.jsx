// theme.js
// Global design system for your e-commerce website
// Inspired by MOCATREND minimal luxury fashion UI

const theme = {
  // ===============================
  // BRAND COLORS
  // ===============================
  colors: {
    // Primary brand colors
    primary: "#111111", // Main black (luxury)
    secondary: "#FFFFFF", // White background

    // Accent fashion colors (luxury nude tones)
    beige: "#D6C7B9",
    nude: "#E8DED5",
    sand: "#C8B6A6",

    // Sale / Error / Promotion
    sale: "#E53935",

    // UI Grays (for borders, text secondary)
    gray: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#DDDDDD",
      400: "#CCCCCC",
      500: "#999999",
      600: "#666666",
      700: "#444444",
      800: "#222222",
    },
  },

  // ===============================
  // TYPOGRAPHY
  // ===============================
  fonts: {
    primary: "'Poppins', sans-serif", // Modern clean
    secondary: "'Playfair Display', serif", // Luxury titles
  },

  fontSizes: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "22px",
    "2xl": "28px",
    "3xl": "36px",
    "4xl": "48px",
  },

  // ===============================
  // SPACING SYSTEM (Design Scale)
  // ===============================
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
  },

  // ===============================
  // BORDER RADIUS
  // ===============================
  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },

  // ===============================
  // SHADOWS (Luxury Soft UI)
  // ===============================
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.08)",
    md: "0 4px 10px rgba(0,0,0,0.10)",
    lg: "0 10px 25px rgba(0,0,0,0.15)",
  },

  // ===============================
  // BREAKPOINTS (Responsive)
  // ===============================
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1280px",
    wide: "1536px",
  },
};

export default theme;
