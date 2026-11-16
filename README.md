# Aryan Agarwal — Portfolio

Single-page portfolio built with React (Vite), GSAP ScrollTrigger and Lenis smooth scrolling.

## Open it right now
Open `dist/index.html` in a browser. Everything (JS, CSS, fonts) is inlined, so it works straight from the folder. Screenshots, decks and code maps sit next to it in `dist/`.

## Edit content
All text, links, projects, internships, awards and certificates live in **`src/data.js`**.
- Certificates: add a `verifyUrl` (Coursera share link) to make the card clickable.
- Logos: `public/logos/`. Tech Mahindra, Tech Mahindra Foundation, IBM, Google and the Kelvin Forward mark are the official files; `isro.svg` is from Simple Icons. `ey.svg` is still a typographic stand-in: replace it with the official logo under the same name.
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
Headline rises in on load, the photo sticker drifts against the headline on scroll, section headings rise in, project screenshots parallax inside their frames, the blue About section opens like a shutter, and experience rows slide in one by one and fill blue on hover. All motion turns off for visitors with "reduce motion" set.
