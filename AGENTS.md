# AGENTS.md

## Cursor Cloud specific instructions

This repository (`mridaseven/telli`) currently contains **only static design mockups** — there is
no application source code, no package manager manifest, no build system, no tests, and no lint
configuration.

Contents:
- Top-level `*.svg` / `*.jpg` landing-page mockups (e.g. `Phonem.svg`, `Phonem.jpg`).
- `public/designs/*.svg` — additional "Phonem" / "Telli" desktop and mobile page designs.

### Running / previewing

There is nothing to build. To preview the design assets in a browser, serve the repo root with any
static file server, for example:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/` for the directory listing, or a specific design such as
`http://localhost:8000/public/designs/Telli.svg`. Browsers render the SVGs directly.

### Notes / gotchas

- **No dependencies to install.** The startup update script is intentionally a no-op.
- The SVGs reference proprietary fonts (Arial Rounded MT Bold, Myriad Pro, etc.) that are usually
  not installed on the VM, so previewed text spacing/kerning can look slightly off. This is a font
  substitution artifact, not a problem with the assets.
- If application code (e.g. a web frontend implementing these designs) is added later, replace this
  section with real setup/build/test/run instructions and update the startup update script
  accordingly.
