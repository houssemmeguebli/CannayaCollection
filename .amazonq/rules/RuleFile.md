You are an expert in JavaScript, React, Vite, Zustand, Shadcn UI, Radix UI, Tailwind CSS, and Stylus.

Build a modern scalable fashion e-commerce frontend with clean architecture and high performance.

==================================================
CODE STYLE AND STRUCTURE
==================================================
- Write concise technical JavaScript following Standard.js rules.
- Use functional and declarative programming patterns only.
- Avoid classes; use functions and hooks.
- Prefer modular reusable components over duplicated code.
- Use descriptive variable names (isLoading, hasError, hasProduct).
- Structure files in this order:
  - exported component
  - subcomponents
  - hooks
  - helpers
  - static content

==================================================
STANDARD.JS RULES
==================================================
- Use 2 space indentation.
- Use single quotes for strings except when escaping.
- Do not use semicolons unless required.
- Do not declare unused variables.
- Add space after keywords and before function parentheses.
- Always use === instead of ==.
- Space infix operators.
- Space after commas.
- Keep else on same line as closing brace.
- Always use curly braces for multi-line if.
- Always handle error parameters.
- Use camelCase for variables and functions.
- Use PascalCase for React components.

==================================================
NAMING CONVENTIONS
==================================================
- Use lowercase-with-dashes for directories:
  components/product-card
- Favor named exports for components.
- File names must match component names.

==================================================
REACT BEST PRACTICES
==================================================
- Use functional components only.
- Use hooks correctly and follow Rules of Hooks.
- Extract reusable logic into custom hooks.
- Use React.memo for pure components.
- Use useCallback for functions passed as props.
- Use useMemo for expensive calculations.
- Avoid inline functions inside JSX.
- Prefer composition over inheritance.
- Use children and render props patterns.
- Use React.lazy + Suspense for code splitting.
- Use controlled components for forms.
- Use cleanup functions in useEffect.
- Use ternary and short-circuit rendering.

==================================================
STATE MANAGEMENT
==================================================
- Use Zustand for global state (cart, user, UI state).
- Persist cart state in localStorage.
- Do not fetch data directly in UI components; use services layer.
- Lift state only when needed.

==================================================
UI AND STYLING
==================================================
- Use Shadcn UI and Radix UI primitives.
- Use Tailwind CSS mobile-first.
- Use Stylus modules for complex component styling.
- Never use @apply in Tailwind.
- Use Tailwind for layout and spacing.
- Use Stylus for unique visual effects and components.

==================================================
STYLUS FILE STRUCTURE
==================================================
components/
  ProductCard/
    ProductCard.js
    ProductCard.module.styl

==================================================
STYLUS BEST PRACTICES
==================================================
- Use variables for colors and fonts.
- Use mixins for repeated patterns.
- Use nesting with & selector.
- Avoid deep nesting and high specificity.
- Use theme.jsk file colors and names 

==================================================
PERFORMANCE RULES
==================================================
- Optimize images with WebP and sizes.
- Lazy load all product images.
- Code split routes and heavy components.
- Avoid unnecessary useEffect and useState.
- Minimize bundle size.
- Use dynamic imports for heavy UI blocks.
- Prefer static rendering when possible.

==================================================
ARCHITECTURE
==================================================
src/
  assets/
  components/
    ui/
    layout/
    product/
    filters/
  pages/
  services/
  store/
  hooks/
  theme/
  utils/
  App.js
  main.js

==================================================
FORMS AND VALIDATION
==================================================
- Use controlled inputs.
- Use react-hook-form for complex forms.
- Use Zod for schema validation.

==================================================
ERROR HANDLING
==================================================
- Use guard clauses and early returns.
- Handle API and UI errors explicitly.
- Log errors and show user-friendly messages.

==================================================
ACCESSIBILITY (A11Y)
==================================================
- Use semantic HTML.
- Add ARIA attributes.
- Ensure keyboard navigation.

==================================================
SEO (IMPORTANT FOR E-COMMERCE)
==================================================
- Use meta tags per page.
- Clean URLs (/products/shoes/nike-air).
- Generate sitemap.xml and robots.txt.
- Add JSON-LD structured data for products.

==================================================
SECURITY
==================================================
- Never expose secrets in frontend.
- Sanitize user input.
- Avoid dangerouslySetInnerHTML unless sanitized.



==================================================
AI CODING RULES
==================================================
- Always follow this architecture.
- Never create monolithic components.
- Prefer reusable UI primitives.
- Optimize for performance and scalability.
- Comment complex logic.
