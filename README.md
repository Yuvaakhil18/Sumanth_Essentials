# Sumanth Essentials | Luxury Fashion & Lifestyle Store

An ultra-modern, editorial e-commerce fashion storefront built with Apple-inspired UI/UX design principles, seamless micro-animations, and a **Warm Ivory & Carbon Black** aesthetic.

![Sumanth Essentials Banner](assets/hero-banner.png)

---

## ✨ Features & Highlights

### 🎨 Visual Identity & Aesthetic
- **Warm Ivory & Carbon Black Palette**: A timeless, high-contrast luxury editorial look:
  - **Warm Ivory (`#F5F2EB`, `#FAF8F5`, `#ECE7DD`)**: Soft linen & parchment canvas for backgrounds, card surfaces, and section blocks.
  - **Carbon Black (`#111111`, `#0A0A0A`)**: Framing headers, typography, buttons, and footers for maximum elegance.
- **Apple UI/UX Design System**:
  - SF Pro / Inter modern typography hierarchy with tight letter tracking.
  - Generous whitespace, refined border radii (`8px` to `28px`), and subtle elevation shadows.
  - Spring-curve cubic-bezier physics (`cubic-bezier(0.16, 1, 0.3, 1)`) for natural-feeling interactions.

---

### 🛍️ Interactive E-Commerce Experience
1. **Always-Accessible Sticky Header**:
   - Stays locked at the top during scroll.
   - Live interactive cart count badge with bounce animations.
   - Quick-access icons for Search, User Account, and Shopping Bag.

2. **Real-Time Search Overlay**:
   - Instant live search modal with quick-suggest category tags.
   - Real-time product filtering as you type with thumbnail previews and pricing.

3. **Interactive Slide-In Cart Drawer**:
   - Slide-in cart panel with backdrop blur.
   - Real-time quantity adjustments (`+` / `-`), item removal, and auto-calculated subtotals.
   - Instant "Product Added" toast notification on quick-add.

4. **Integrated Checkout Modal**:
   - Multi-field checkout flow with shipping address, payment selection, and instant order confirmation.

5. **Dynamic Product Grid & Filtering**:
   - Filter products by category (*All, Outerwear, T-Shirts, Jackets, Shoes*).
   - Card hover lift with smooth image zoom and slide-up *Quick Add* pill button.

6. **Bento-Style Promotional Sale Grid**:
   - Dynamic seasonal promotional tiles with dark gradient overlays and callouts (*"Sale 40% Off"*).

7. **Infinite Slow Marquees**:
   - Top promotional banner marquee (`Extra 55% OFF`, `Free Returns Within 30 Days`).
   - Trusted partner brand logo marquee (Nike, Adidas, Puma, New Balance, The North Face, Reebok) with hover pause.

8. **Editorial Fashion Stories**:
   - Curated journal cards with category badges, reading time, and article previews.

9. **Seamless Instagram Feed**:
   - Gapless 6-image editorial lifestyle collage with hover zoom and camera overlay.

10. **Luxury Editorial Footer**:
    - Brand manifesto and social links (Instagram, X / Twitter, Facebook, Pinterest).
    - Newsletter signup input with instant submission feedback.
    - Verified contact details and location.

---

## 🚀 Getting Started

No build tools or heavy installations required. The project is built entirely on native web standards (HTML5, Vanilla CSS3, ES6+ JavaScript).

### Running Locally

#### Option 1: Using Node.js `npx serve` (Recommended)
```bash
# Navigate to the project folder
cd ecommerce.11-main

# Launch dev server
npx serve -l 3000
```
Open `http://localhost:3000` in your browser.

#### Option 2: Using Python Simple Server
```bash
# Python 3
python -m http.server 3000
```
Open `http://localhost:3000` in your browser.

#### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and choose **"Open with Live Server"**.

---

## 📁 File Structure

```text
sumanth-ecommerce-site/
│
├── ecommerce.11-main/
│   ├── index.html        # Semantic HTML5 markup, SEO tags, accessible structure
│   ├── styles.css        # Modular CSS design tokens, animations, responsive layouts
│   ├── script.js         # Reactive state (Cart, Search, Filter, Drawers, Toast)
│   ├── README.md         # Project documentation and specifications
│   └── assets/           # Curated high-res fashion photography and partner logos
│       ├── hero-banner.png
│       ├── brand-*.png
│       ├── product-*.jpg
│       └── insta-*.jpg
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Markup** | Semantic HTML5, ARIA labels, Open Graph & SEO meta tags |
| **Styling** | Vanilla CSS3 (Custom Properties / Design Tokens, Flexbox, CSS Grid) |
| **Logic** | Vanilla JavaScript (ES6+, IntersectionObserver API, Local Storage support) |
| **Fonts** | Apple SF Pro System Fonts & Google Fonts (Inter) |
| **Icons** | Remix Icon CDN |

---

## 📱 Responsive Breakpoints

- **Desktop (1200px+)**: 4-column product grid, 3-column sale bento, 4-column footer.
- **Laptop / Tablet Landscape (900px - 1024px)**: 3-column product grid, 2-column bento, 2-column footer.
- **Tablet Portrait (768px)**: 2-column product grid, stacked hero with centered copy, collapsed navigation drawer.
- **Mobile (320px - 480px)**: 2-column compact product grid, single-column promo cards, touch-optimized button hit areas.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
