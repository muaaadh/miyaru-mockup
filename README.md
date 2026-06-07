# Miyaru — dive equipment mockup

A concept website mockup for **Miyaru**, a Maldivian dive-equipment brand
(*miyaru* means *shark* in Dhivehi). Refillable pocket O₂ cylinders,
low-volume & full-face masks, and long-blade freediving fins.

🔗 **Live preview:** https://muaaadh.github.io/miyaru-mockup/

Built by **Dheemi** as a pitch concept — not a production store.

## What's inside

- `index.html` — marketing home (hero, story, categories, gallery, reef pledge)
- `shop.html` — filterable / sortable product catalogue
- `product.html` — product detail (`?id=<product>`), gallery, specs, related
- `checkout.html` — 3-step mock checkout with order confirmation
- `css/styles.css` — ocean-themed design system (fluid type, caustics / bubbles / wave animations, full `prefers-reduced-motion` support)
- `js/products.js` — catalogue data
- `js/app.js` — shared header/footer/cart injection, localStorage cart, page controllers

## Tech

Pure static HTML / CSS / vanilla JS — no build step, no dependencies.
Cart state persists in `localStorage`. Fonts: Space Grotesk + Inter (Google Fonts).

## Notes

- A mock cart & checkout — no payment is processed.
- Product photography supplied by the brand; ambient ocean imagery from Unsplash.
