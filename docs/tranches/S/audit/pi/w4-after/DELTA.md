# S.W4 — π CLOSE archive DELTA notes (w4-before → w4-after)

Captured by the S.W4 **independent gate verifier** (non-authoring), 2026-07-05, at
tranche-q HEAD `18dcf44` — the same harness (`../pi-capture.mjs`), states, viewports,
and serve convention as the baseline (`npm run dev:web-only`-style bare vite on a free
**:4300**, never the owner's :9000, `VITE_API_URL` pointed at an unreachable loopback so
the run reads the honest `unavailable` state). 34 shots, 3 viewports × light/dark. PNGs
self-ignore under `.gitignore:19 *.png` (the R/S standing convention); this manifest +
these notes + the harness are the committed record; frames reproduce on demand.

Tree note (verifier-honest): two NON-W4 files were dirty in the working tree at capture
(`useSpectrumCrossfade.ts` — the W3-8 PRM-probe swap; `useMixingAnimation.ts` — the W3-6
mix lane, in flight). Neither bears on any static state this archive owns (the crossfade
change swaps the reduced-motion *probe mechanism* only; no mix shot exists in this
matrix). An authoring-lane pre-staged w4-after (16:26, same HEAD) was overwritten by this
independent recapture.

## Per-state deltas

- **selector-parity (1024/1440 × L/D)** — the §Hard-gate-1 row, MET. BEFORE: both hosts
  wrap the space name in the `veil-surface` capsule with the `COLOR SPACE — 06 / 18`
  eyebrow counter; the picker readout wraps to TWO lines at 1440. AFTER: the capsule and
  eyebrow are GONE in both hosts; the space name is the plate TITLE — bare
  `font-display` italic + safeAccent ink + the small inked caret as the only affordance,
  sitting directly on the field; the About header composes it inline ("About the color
  spaces, *Lab* ⌄"). The grammar is verbatim-identical in both hosts (computed-style
  parity verified in-browser at certification: same family/style/weight/ink; zero
  surface — `background: none`, no border, no shadow, in both).
- **lab-readout (1440 × L/D)** — BEFORE: `92.0%, 88.8,` / `20.0` — two lines. AFTER: ONE
  line (`92.0%, 88.8, 20.0`). Same in the parity frames. (Both before/after frames
  inherit the harness-sequence dock/scroll residue from the preceding docs-about shot —
  present identically in the baseline; a capture-order artifact, not a regression.)
- **picker-plate (all 3 viewports × L/D)** — the W4-2 re-composition reads: the blob
  reservation is scoped to the title row; the readout spans the full header width (three
  stacked lines → one at 1024); the whole plate — spectrum + all four channel rows —
  now fits the element crop at 1024 where BEFORE cut the B row.
- **slider-rest / slider-hover (all 3 × L/D)** — the W4-3 demo half: thumb ink alphas
  visibly softened (the black leg no longer reads as a hard 0.8 ring against light
  tracks); hover on the first thumb scales without any track/surface change. The
  gradient-editor dead-hover half is not a state in this matrix (no gradient shot);
  verified in-source at certification.
- **selector-picker / selector-about (390 × L/D)** — mobile halves of the parity pair:
  same de-capsuled grammar both tabs; the About title wraps as text (title-line wrap at
  390 is text flow, not band growth); readout one line even at 390.
- **docs-about (all 3 × L/D)** — inline-code chips are BACK (`L*` / `a*` / `b*` render
  as mono chips where BEFORE the classless-`<code>`→KaTeX hijack set them as math
  italics); heading ink no longer hue-spins per level (BEFORE: orange `Historical
  Context` vs pink `Key Characteristics`; AFTER: one accent hue, L/C ladder); the About
  sticky band is down to a single title line (BEFORE: the 167px title+capsule stack).
  Code plates render in the one house hljs token theme in BOTH schemes.

## Verifier state-drive measurements (the four-state grammar, in-browser at 1440 light)

Sibling `state-*.png` shots (self-ignored like the matrix PNGs) captured during the
independent drive; the numbers of record:

- **rest**: `background: transparent`, `border: none`, `box-shadow: none` (all-zero),
  padding `0 0 4px` (descender room only), Fraunces italic, ink =
  safeAccent @ 0.86 alpha; the underline box pre-laid `transparent` (zero layout shift).
- **hover** (both hosts): ink → full `oklch(0.62 0.272 9.834)`; underline enters as the
  same ink; background/shadow stay zero — NO surface re-growth; letterforms unmoved
  (same size/weight/family).
- **focus-visible** (keyboard-reached, `:focus-visible` matched true): the C5 ring —
  `box-shadow: accent/0.3 0 0 0 2px + accent/0.15 0 0 8px`, `border-radius: 6px
  (--radius-md)`, background transparent — ring, never pill; rest ink held.
- **open**: `data-state=open`, title HOLDS full hover ink + underline; trigger surface
  still zero; the caret rotates via the CSS `rotate` property `none → 180deg` with
  `transition-property: rotate` (the producer-owned glass-ui SelectTrigger fix — the L18
  ask, shipped; the demo carries no consumer rotation utility); all glass belongs to the
  SelectContent (`oklab(0.956 0.010 0.030 / 0.749)` catalog, 18 specimen options, both
  hosts).
- **host parity**: computed-style diff across every surface/face/state property = ONE
  field, `font-weight` (picker 400 standalone vs About 700), which is host-cascade
  inheritance from the composed About title line — neither instance overrides the
  grammar (S-21 holds: zero per-instance overrides).
- **sticky band** (About scrolled, 1440): `.pane-header` 66.3px = one composed title
  line (54.3px, the inlined selector's rung dominating the line box) + 12px padding
  rhythm; description fully collapsed. BEFORE: 167px.
- **readout**: height 37.81px vs line-height 37.83px — exactly ONE line at 1440 (Lab).
- **WebKit (smoke-safari device class, 390×844)**: 9 KaTeX nodes each carrying BOTH
  `.katex-mathml` and `.katex-html` (`output: htmlAndMathml` live); 11 inline-code
  chips; KaTeX fonts load same-origin (20 @font-face rules → local
  `katex/dist/fonts/*.woff2`; `KaTeX_Main` + `KaTeX_Math italic` status `loaded`; the
  gh-pages bundle ships the font files under `assets/KaTeX_*`).

## Residue (named honestly, none gate-bearing)

- The sticky band is translucent enough at 1440 that the `Detailed Guide` heading reads
  through it while passing under — legible but slightly muddy in the scrolled frames.
- The channel rail still hand-rolls its letters and the alpha row still reads `A`
  (L/A/B/A collision) — the W4-5 re-home is BOOKED (verify record `38d83e4`: the
  SegmentedTabs native pill cannot yield; the S-3 letter-rail book FIRED), so this is
  the sanctioned deferral, not drift.
- Dark-scheme Definition callout at 1440 grazes low contrast where its light band
  crosses the text (taste note, pre-existing register).
