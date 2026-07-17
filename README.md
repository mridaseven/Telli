# Telli Website

A pixel-perfect Next.js + TypeScript implementation of the Telli SVG designs in this repository.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Telli landing page (served directly, no redirect) |
| `/select` | iPhone selection & checkout flow |

`/phonem` and `/telli` are legacy paths that redirect to `/` and `/select`.

## Responsive Layouts

- **Desktop (≥1024px):** Matches `Telli.svg` and `Telli select page.svg`
- **Mobile (<1024px):** Matches `Telli Mobile.svg`, `Telli Select mobile page.svg`, `Telli mobile select page 2.svg`, and `Telli select capacity mobile.svg`

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
