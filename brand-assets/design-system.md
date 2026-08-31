# Capital Hills Design System

This document contains the visual identity, colors, and typography used in the Capital Hills project. You can use these guidelines and the included logo file (`capital-hills-logo.png`) to bootstrap a new project with the same aesthetic.

## 🎨 Color Palette

The project relies on a carefully selected palette of warm, earthy, and premium tones.

### Primary Brand Colors
- **Dark Burgundy (Primary Text / Base)**: `#4b1e2d`
  - *Usage*: Main text, solid buttons, dark sidebars, borders.
- **Gold / Accent**: `#c9a36a`
  - *Usage*: Highlights, active states, key icons, badges.

### Background Colors (Cream/Sand Variations)
- **Main Background (Light Cream)**: `#f6f0e4`
  - *Usage*: The main application background.
- **Card Background (Off-white Cream)**: `#faf6ef`
  - *Usage*: Project cards, message cards, slightly elevated surfaces.
- **Tertiary Background (Sand)**: `#eadfce`
  - *Usage*: Profile headers, subtle active states, hover effects on buttons.

### Overlays & Dark Mode Elements
- **Dark Overlay**: `#26131b`
  - *Usage*: Image gradients, modal backdrops (usually with opacity like `/95`).
- **Dark Text (Muted)**: `#e6dacf`
  - *Usage*: Text on top of dark backgrounds (like the lock screen).

---

## ✍️ Typography

The project uses three distinct Google Fonts to create a modern, elegant, and readable experience.

1. **Display (Serif)**
   - **Font Family**: `Instrument Serif` (Fallback: Georgia, serif)
   - *Usage*: Large headings, project titles, elegant callouts.
   - *Classes*: `.serif` in Tailwind, or applied to `h1`, `h2`, `h3`.

2. **Body (Sans-Serif)**
   - **Font Family**: `DM Sans` (Fallback: sans-serif)
   - *Usage*: Standard UI text, paragraphs, buttons, navigation links.
   - *Note*: This is the default font across the application.

3. **Accent / Eyebrows (Monospace)**
   - **Font Family**: `DM Mono` (Fallback: monospace)
   - *Usage*: Small uppercase labels, metadata (e.g. "HOMES WORTH COMING HOME TO").
   - *Classes*: `.mono` in Tailwind, usually paired with `text-[9px] uppercase tracking-[.2em]`.

### Google Fonts Import
To use these in another project, include this CSS import:
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
```

---

## 📐 UI Components & Patterns

- **Border Radius**: The standard border radius for cards and images is `rounded-[18px]` or `rounded-[20px]`. Buttons are typically fully rounded (`rounded-full`).
- **Shadows**: 
  - Standard Card: `shadow-[0_14px_28px_rgba(75,30,45,.11)]`
  - Floating Action Buttons: `shadow-[0_4px_14px_rgba(75,30,45,.12)]`
- **Gradients**: Image overlays usually have a bottom-to-top gradient to make white text readable.
  - *Example*: `bg-gradient-to-t from-[#26131b]/45 to-transparent`
- **Noise/Grain**: The application uses a subtle noise texture overlay (`.grain` class) on main backgrounds to give it a premium, organic feel.

---

## 📁 Assets Included
- `capital-hills-logo.png` - The primary brand mark (dark background recommended or inverted for light).
