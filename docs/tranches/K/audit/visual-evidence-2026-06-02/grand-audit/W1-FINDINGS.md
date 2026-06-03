# W1 — Playwright capture findings (grounded mechanism-level)

**2026-06-02/03.** Captures in this dir. value.js: local `:9001` + prod `color.babb.dev`. Siblings: prod where reachable. These are the spec seeds for W5 authorship — grounded in live DOM, not impressions.

## value.js (picker) — local :9001 + prod color.babb.dev (IDENTICAL → regression is SHIPPED)

| # | Critique | Mechanism root-cause (live DOM) | Owner / wave |
|---|---|---|---|
| **C1** | Dock not smooth | dock = `fixed top-dock-inset inset-x-0 z-dock … pointer-events-none`, computed **`transition: all`**. Transitions every property (layout/filter/color), not compositor-only `transform`/`opacity` → jank. 8-rules violation. | value.js K (motion) + glass-ui dock token |
| **C2** | Aurora = sky, not palette-derived | `body` bg IS the active color (`lab(92 88.8 20)` pink), but a **full-viewport WebGL canvas** (`canvas.absolute.inset-0.w-full.h-full`, 1440×900) **overpaints** with a fixed sky gradient. No `--active-color`/palette uniform feeds it — **decoupled by construction**. | value.js K.W4 + glass-ui deriveAurora (twin chronic) |
| **C3** | Blob over-large, mis-placed, tiny satellites | wrapper `goo-blob-wrapper w-[7rem]` (112px) but canvas renders **179×179** at **(367,126)** — over-large + offset right of card, not corner-nestled. 2nd `goo-blob-canvas` is **0×0** (satellites collapsed). | value.js K.W3 + glass-ui Metaballs/BlobDot lift |
| — | Card chrome | **OK** — `.glass-resting rounded-card shadow-[var(--shadow-card)]`, bg `srgb .98 .98 .97/.65`. Earlier "chrome absent" was transient build state. **Removed from defect set.** | — |

Modern tokens already present: `--accent`/`--primary` use `light-dark()`.

## fourier-analysis — prod fourier.babb.dev/visualize

- **Controls-side (the mandate):** layout = glass-ui `Configurator` composition → `configurator-stage` (visualization, **LEFT**, x=9 w=1022) + `configurator-aside` (**controls**, **RIGHT**, x=1031 w=400). Today controls = right-aside (a small image-upload card top-right). **Mandate: flip aside → LEFT.** `Configurator` is glass-ui-owned (storybook `primitives/configurator`); muster + speedtest share the stage|aside pattern → fix = **glass-ui `asideSide:'left'|'right'` variant**, fourier+siblings adopt (NOT a fourier-local hack).
- **CSP defects (console, prod):** `font-src 'self'` **blocks the KaTeX/Computer-Modern `data:font/woff2` font** (math typography degraded); `script-src` **blocks the Cloudflare Insights beacon** (analytics dead). → fourier CSP wave (allow `data:` font-src; decide on beacon).
- **Perf:** 3 Computer-Modern Serif preloads (`cmunrm/cmunbx/cmunti.woff`) **wasted** — crossorigin credentials-mode mismatch → preload not used. Fix `crossorigin` attr.

## keyframes.js — prod keyframes.babb.dev
- Playful: 3D cube ("M. cubert") on transparent checkerboard, **bold serif display type** ("Select an animation…"), top dock ("Home" pill + share/settings) + bottom control dock (list/undo/delete/play). Distinctive aesthetic — strong per frontend-design axes. Pages: /cube /amiga /square /easing /spring.

## friday.institute apps — NOT publicly reachable
- `speedtest.friday.institute` → **NXDOMAIN** from this network; slides + words (`mbabb.friday.institute/words`) likewise VPN-gated (words dossier: SSH port 1022 behind VPN). **W6 deploy finding:** friday.institute targets are VPN-gated / unresolvable publicly. Deploy dossier lists alt `speedtest.pages.dev`. Ground these from code + dossiers (rich) + a VPN-side capture booked at execution.

## Not live-captured (grounded via code + W0 dossier + storybook manifest instead)
- **glass-ui storybook** (local :5173) — full 127-story inventory already from W0; the primitive audit reads `demo/stories/manifest.ts` + component source directly.
- **muster** (local :5173/:3030), **bbnf-buddy** (local :5175) — dossiers carry known-defects + past-critiques; W2/W3 agents read code.

## Lighthouse
Real Lighthouse runs need apps up + the CLI = execution-phase → **booked**. W3 agents do a **code-grounded perf audit** now (bundle overages, CLS roots, font preloads, content-visibility gaps) keyed off the dossier defects (speedtest dial-CLS 0.3228; muster CLS 0.0729; words SW-rot; eager-bundle overages).
