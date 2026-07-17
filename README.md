# Telli Website

A pixel-perfect Next.js + TypeScript implementation of the Telli SVG designs in this repository.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Telli landing page |
| `/select` | iPhone selection & checkout flow |

Legacy routes `/phonem`, `/telli`, and their `/select` paths redirect to the routes above.

## Responsive Layouts

- **Desktop (≥1024px):** Matches `Telli.svg` and `Telli select page.svg`
- **Mobile (<1024px):** Matches `Telli Mobile.svg`, `Telli Select mobile page.svg`, and `Telli mobile select page 2.svg`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```
