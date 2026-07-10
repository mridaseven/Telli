# Phonem & Telli Website

A pixel-perfect Next.js + TypeScript implementation of the SVG designs in this repository.

## Pages

| Route | Description |
|-------|-------------|
| `/phonem` | Phonem Brand landing page |
| `/telli` | Telli landing page |
| `/phonem/select` | iPhone selection & checkout flow |
| `/telli/select` | iPhone selection & checkout flow |

## Responsive Layouts

- **Desktop (≥1024px):** Matches `Phonem.svg`, `Telli.svg`, `Phonem select page.svg`, and `Telli select page.svg`
- **Mobile (<1024px):** Matches `Telli Mobile.svg`, `Telli Select mobile page.svg`, `Telli mobile select page 2.svg`, and `phonem select page mobile 3.svg`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the root redirects to `/phonem`.

## Build

```bash
npm run build
npm start
```
