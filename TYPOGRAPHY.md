# 🎨 Typography System - Inter Font

## Overview
Professional typography system using **Inter** - the industry standard for modern web applications (used by GitHub, Stripe, and other leading platforms).

---

## 📦 Font Configuration

### Next.js Font Optimization
```javascript
// pages/_app.jsx
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter'
})
```

### Tailwind Configuration
```javascript
// tailwind.config.js
fontFamily: {
  'sans': ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
}
```

---

## 📏 Typography Scale

### Headings

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing | Usage |
|---------|---------------|---------------|--------|-------------|----------------|-------|
| **H1** | 56px (3.5rem) | 48px | 700 (Bold) | 1.2 | -0.02em | Page titles, hero headlines |
| **H2** | 48px (3rem) | 40px | 600 (SemiBold) | 1.2 | -0.01em | Section titles |
| **H3** | 30px (1.875rem) | 28px | 600 (SemiBold) | 1.2 | -0.01em | Subsection titles |
| **H4** | 24px (1.5rem) | 22px | 600 (SemiBold) | 1.2 | -0.01em | Card titles |
| **H5** | 20px (1.25rem) | 18px | 600 (SemiBold) | 1.2 | -0.01em | Small headings |
| **H6** | 18px (1.125rem) | 16px | 600 (SemiBold) | 1.2 | -0.01em | Micro headings |

### Body Text

| Class | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-xs` | 12px | 400 | 1rem | Fine print, captions |
| `text-sm` | 14px | 400 | 1.25rem | Secondary text, labels |
| `text-base` | 16px | 400 | 1.6 | Body text (default) |
| `text-lg` | 18px | 400 | 1.75rem | Emphasized body text |
| `text-xl` | 20px | 400 | 1.75rem | Lead paragraphs |
| `text-2xl` | 24px | 500 | 2rem | Large text blocks |

---

## 🎯 Font Weights

```css
font-normal   → 400 (Regular)  - Body text
font-medium   → 500 (Medium)   - Emphasized text
font-semibold → 600 (SemiBold) - Headings, buttons
font-bold     → 700 (Bold)     - H1, strong emphasis
```

---

## 📐 Letter Spacing

```css
tracking-tighter → -0.02em  - Large headings (H1)
tracking-tight   → -0.01em  - Headings (H2-H6)
tracking-normal  → 0        - Body text
tracking-wide    → 0.01em   - Subtle emphasis
tracking-wider   → 0.02em   - Uppercase text, buttons
tracking-widest  → 0.03em   - All caps labels
```

### Usage Examples
```jsx
// Hero headline
<h1 className="text-7xl font-bold tracking-tighter">
  I'll Cut Your AWS Bill by 60%
</h1>

// Section title
<h2 className="text-5xl font-semibold tracking-tight">
  Proven AWS Expertise
</h2>

// Uppercase button
<button className="uppercase tracking-wider font-semibold">
  Book Free Call
</button>
```

---

## 🎨 Color & Contrast

### Text Colors
```css
text-primary    → #1A202C  - Primary text (headings, important content)
text-secondary  → #4A5568  - Secondary text (descriptions, metadata)
body text       → #1a1a1a  - Body paragraphs (softer than pure black)
```

### Why #1a1a1a instead of #000000?
- **Better readability**: Pure black (#000) is too harsh on screens
- **Professional standard**: Used by Apple, Google, Medium
- **Eye comfort**: Reduces eye strain during long reading sessions

---

## 💡 Usage Guidelines

### ✅ DO

```jsx
// Clear hierarchy
<h1 className="text-6xl font-bold">Main Title</h1>
<h2 className="text-5xl font-semibold">Section Title</h2>
<p className="text-base text-secondary">Body text with good contrast</p>

// Proper emphasis
<p>
  I've saved companies <strong className="font-semibold text-primary">$2M+</strong> in AWS costs
</p>

// Uppercase with spacing
<span className="uppercase tracking-wider text-sm font-semibold">
  AWS Community Builder
</span>
```

### ❌ DON'T

```jsx
// Too many font weights
<p className="font-bold">Don't use bold for body text</p>

// Pure black text
<p className="text-black">Too harsh - use text-primary instead</p>

// Uppercase without spacing
<span className="uppercase">CRAMPED TEXT</span>

// Inconsistent heading sizes
<h2 className="text-3xl">Too small for H2</h2>
```

---

## 📱 Responsive Typography

### Mobile-First Approach
```jsx
// Responsive heading
<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
  Scales from 36px → 56px → 72px
</h1>

// Responsive body text
<p className="text-base md:text-lg">
  16px on mobile, 18px on desktop
</p>

// Responsive line height
<p className="leading-relaxed md:leading-loose">
  Comfortable reading on all devices
</p>
```

---

## 🔧 Utility Classes

### Custom Typography Utilities

```css
/* globals.css */

/* Smooth font rendering */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Balanced text wrapping */
.text-balance {
  text-wrap: balance;
}

/* Uppercase with proper spacing */
.uppercase {
  letter-spacing: 0.02em;
}
```

### Usage
```jsx
<h1 className="text-balance">
  Long headlines that wrap beautifully
</h1>

<button className="uppercase tracking-wider">
  Call to Action
</button>
```

---

## 🎯 Component Examples

### Hero Section
```jsx
<section className="hero">
  <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-primary mb-6">
    I'll Cut Your AWS Bill by 60% (Guaranteed)
  </h1>
  <p className="text-xl md:text-2xl text-secondary mb-8 leading-relaxed">
    4x AWS Community Builder | $2M+ Saved for Clients
  </p>
  <button className="btn-primary uppercase tracking-wider font-semibold">
    Get Free Audit
  </button>
</section>
```

### Card Component
```jsx
<div className="card">
  <h3 className="text-2xl font-semibold text-primary mb-3">
    Cost Optimization
  </h3>
  <p className="text-base text-secondary leading-relaxed">
    Reduce AWS spend by 30-70% through right-sizing, reserved instances, 
    and automated scaling.
  </p>
</div>
```

### Metric Display
```jsx
<div className="metric">
  <div className="text-5xl font-bold text-accent mb-2">
    60%
  </div>
  <div className="text-sm font-medium text-secondary uppercase tracking-wider">
    Average Cost Reduction
  </div>
</div>
```

---

## 📊 Performance

### Font Loading Strategy
- **Display: swap** - Shows fallback font immediately, swaps to Inter when loaded
- **Subset: latin** - Only loads Latin characters (reduces file size)
- **Weights: 400, 500, 600, 700** - Only loads needed weights
- **Next.js optimization** - Automatic font subsetting and preloading

### Expected Performance
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1 (no font swap flash)

---

## 🔍 Accessibility

### WCAG Compliance
- **Minimum font size**: 16px (1rem) for body text ✅
- **Line height**: 1.6 for body text (WCAG recommends 1.5+) ✅
- **Color contrast**: 
  - `text-primary` (#1A202C) on white: 14.7:1 (AAA) ✅
  - `text-secondary` (#4A5568) on white: 7.5:1 (AA) ✅

### Best Practices
```jsx
// Good contrast
<p className="text-primary">High contrast text</p>

// Sufficient size
<p className="text-base">Minimum 16px</p>

// Readable line height
<p className="leading-relaxed">Comfortable spacing</p>
```

---

## 🚀 Quick Reference

### Common Patterns

```jsx
// Page Title
<h1 className="text-6xl font-bold tracking-tighter">Title</h1>

// Section Header
<h2 className="text-5xl font-semibold mb-6">Section</h2>

// Card Title
<h3 className="text-2xl font-semibold mb-3">Card</h3>

// Body Text
<p className="text-base text-secondary leading-relaxed">Content</p>

// Emphasized Text
<strong className="font-semibold text-primary">Important</strong>

// Small Label
<span className="text-sm text-secondary uppercase tracking-wider">Label</span>

// Button Text
<button className="font-semibold uppercase tracking-wider">Action</button>
```

---

## 📚 Resources

- **Inter Font**: https://rsms.me/inter/
- **Google Fonts**: https://fonts.google.com/specimen/Inter
- **Next.js Font Optimization**: https://nextjs.org/docs/basic-features/font-optimization
- **Typography Best Practices**: https://material.io/design/typography

---

## 🎓 Typography Principles

1. **Hierarchy**: Clear visual distinction between heading levels
2. **Consistency**: Use defined scale, don't create custom sizes
3. **Readability**: Proper line height (1.6 for body, 1.2 for headings)
4. **Contrast**: Sufficient color contrast for accessibility
5. **Spacing**: Negative letter spacing for large text, positive for uppercase
6. **Performance**: Load only needed weights, use font-display: swap

---

**Last Updated**: September 30, 2025  
**Version**: 1.0.0  
**Font**: Inter (400, 500, 600, 700)
