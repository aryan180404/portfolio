# Aryan Agarwal — Portfolio

Single-page portfolio built with React (Vite), GSAP ScrollTrigger and Lenis smooth scrolling.

## Open it right now
Open `dist/index.html` in a browser. Everything (JS, CSS, fonts) is inlined, so it works straight from the folder. Screenshots, decks and code maps sit next to it in `dist/`.

## Edit content
All text, links, projects, internships, awards and certificates live in **`src/data.js`**.
- Certificates: add a `verifyUrl` (Coursera share link) to make the card clickable.
- Logos: `public/logos/ey.svg` and `public/logos/techm.svg` are typographic stand-ins. Drop the official logo files in with the same names. `isro.svg` is the real mark (from Simple Icons).
- Photo: `public/aryan.jpg`. Screenshots: `public/shots/`.
- Decks: `public/decks/` (Kelvin Forward pitch, VoC Copilot deck). Code maps: `public/maps/`.

## Develop / rebuild
```bash
npm install
npm run dev      # local preview with hot reload
npm run build    # writes dist/
```

## Deploy
- Vercel: import the folder, framework "Vite", output `dist`.
- GitHub Pages / Netlify: upload the contents of `dist/`.

## Motion
Headline rises in on load, the photo sticker drifts against the headline on scroll, the marquee speeds up with scroll velocity, project screenshots parallax inside their frames, and the blue About section opens like a shutter. All motion turns off for visitors with "reduce motion" set.
