# S.W0 design-assay lane — EXTRACT + MIX + GENERATE

**Mode**: AUDIT ONLY (tranche-S development). **Register assayed against**: the editorial instrument
(Fraunces display voice · Fira readout · cartoon-offset shadow · crayon primaries proportioned ·
ink+grain · perceptually-true fields). **Live target**: `http://localhost:9000` @ `c5aa091`
(branch `tranche-q`), Chromium via Playwright, isolated browser contexts, light+dark,
1440×900 + 390×844. **Evidence**: `docs/tranches/S/audit/lanes/assets/x-*.png` (+ 3 early
`extract-*.png` taken pre-isolation). Mix math spot-verified against `dist/value.js` (mix of
3 identical `lab(92% 88.8 20)` → `oklab(0.9583 0.2684 0.0465)`; denorm hand-check ✓ — no
correctness defect in the mix path).

**Method note / anomaly disclosure**: early probes showed "spontaneous" view resets
(`#/extract → #/`, `#/generate → #/palettes`). Instrumented `history.*` and re-ran in an
**isolated context**: never reproduced. Verdict: a **sibling audit lane driving the same shared
Playwright page**, not a product defect (an early screenshot even caught the picker/About view
mid-drive). All findings below were taken in isolated contexts. Do NOT book a routing defect
from this lane's early transcript.

Console on every cold boot (all 3 views): CORS failure
`https://api.color.babb.dev/colors/approved` from origin `localhost:9000` — the dev demo points
at the prod API, which rejects the origin (S-11's likely root; owned by the api/palettes lane;
root-route: **value.js demo** dev BASE_URL / vite proxy, `demo/@/lib/palette/api/client.ts`).

---

## P1 — register / hierarchy / platform (taste deficits are P1 here)

### 1. S-12 (owned) — the "undeveloped plate" copy is a second, louder invitation. Cut it.
`ExtractWorkbench.vue:162-167` renders
`· undeveloped plate — feed it an image ·` (Fira caps, tracking 2.59px, measured 645×21.6px)
directly under a drop zone that **already** says "Drop an image or click to browse"
(`ImageDropZone.vue:43`). Two invitations, the second shoutier (caps + tracking + interpuncts).
At 390px it wraps with a widowed `IMAGE ·` line (`x-extract-mobile-390.png`). The user has
judged this class superfluous. **Fix**: delete the copy line outright; the quiet invitation is
the ghost plate itself (see F2). Shots: `extract-light-1440.png`, `x-extract-mobile-390.png`.
**Root: value.js demo.**

### 2. Extract empty state wears the *loading* grammar — shimmer skeleton as permanent furniture
`ExtractWorkbench.vue:168` mounts `PaletteCardSkeleton` (k-count bones) whenever no palette
exists. A shimmering skeleton is the app's loading signifier — rendered at rest it reads
"stuck loading", and at 390px it burns ~340px of ghost slabs under the plate copy
(`x-extract-mobile-390.png`); in dark it renders as near-black banded slabs
(`x-extract-dark-1440.png`). Empty ≠ loading: if a specimen ghost stays, it must be **static**
(no shimmer motion) and small; better, cut it — the drop zone alone is the empty state.
Pairs with S-10's loading-variant work (palette-shaped skeletons belong to *loading*, sequenced).
**Root: value.js demo.** P1.

### 3. Mix "Palettes" tab: zero saved palettes → an **eternal skeleton** (silent-handling violation)
`MixSourceSelector.vue:213` — `<PaletteCardSkeleton v-if="savedPalettes.length === 0" :count="3" />`.
With nothing saved (every fresh visitor) the tab shimmers forever: no copy, no route to save a
palette, a fake loading state masquerading over an empty one. Shot:
`x-mix-palettes-tab-empty-light.png`. Precept: no silent handling — the state must say what it
is (a quiet one-liner + the existing dashed-well grammar), or the tab should be disabled with
reason when `savedPalettes.length < 2`. Note the inconsistency inside the same component:
colors-mode hides "From palettes" entirely when empty (`:167`) while palettes-mode fakes
loading — two grammars for one condition. **Root: value.js demo.** P1.

### 4. The hover veil paints the specimen false (perceptually-true-fields violation)
`ImageDropZone.vue:49-55`: a full-cover `bg-background/60` overlay + centered
"Click to sample colors" appears on hover over the uploaded image. Measured overlay
`oklab(0.9865 0.0003 0.0029 / 0.6)` — the plate washes to pastel the instant the pointer
enters it (compare `x-extract-developed-light-1440.png` vs `x-extract-hover-overlay-light.png`;
my saturated 4-field test PNG reads as chalk under the veil). The one surface whose colors must
never lie is occluded by the affordance that invites sampling it. **Fix**: edge affordance —
crosshair cursor + border ink + a corner Fira tag ("sample") — never a veil over the field.
**Root: value.js demo.** P1.

### 5. Mix's one verb has no ink — enabled Mix button is visually identical to disabled
`MixConfigBar.vue:103-110` (`<Button :disabled="!canMix" …>Mix</Button>`). In the shots the
button renders as a washed beige capsule in BOTH states — empty selection
(`x-mix-empty-light-1440.png`, disabled) and 3 colors selected (`x-mix-3colors-light.png`,
enabled) are indistinguishable; in dark the same (`x-mix-dark-1440.png`). The page's primary
action reads permanently disabled. Suspect: glass-ui `Button` default/primary variant over the
`wash` card tier resolves to a low-contrast surface. Per S-21 this is a **root** fix: verify the
Button primary recipe in glass-ui over wash/glass tiers (crayon-primary fill + cartoon edge is
the house grammar for the one verb), not a per-instance class. **Root: glass-ui producer**
(verify; demo consumes correctly). P1. Verdict: CONFIRMED visually, PLAUSIBLE on root cause.

### 6. Mix animation: flat page-wipe on Chromium, broken-by-API on Safari, and a 2.9s tax
- `useMixingAnimation.ts:114` — `ctx.filter = "blur(16px) saturate(120%)"`.
  `CanvasRenderingContext2D.filter` is **unsupported in WebKit/Safari** (never shipped): on
  Safari the "watercolor pooling" degrades silently to hard-edged opaque rects — an S-22
  violation by construction, and a fallback-by-silence the precepts ban.
- Even on Chromium the gathering phase reads as a **flat opaque field** covering the entire
  pane for ~2.3s (`x-mix-anim-gathering.png`) — with same/similar hues there are no visible
  sections, no texture, no ink: it reads as a rendering glitch, not paint pooling.
- `useMixingState.ts:86-104` hard-codes the choreography in `setTimeout`s (800/2300/2900ms):
  an instant computation is gated behind 2.9s of wall clock; under PRM the canvas is skipped
  (correctly, `useMixingAnimation.ts:61-64,206`) but the user still waits 2.9s staring at a
  **generic spinner** (`MixPane.vue:96-104`) — dead time, S-23.
- The reveal shrinks to a 48px rect at **canvas center** (`useMixingAnimation.ts:184-189`) but
  the result plate mounts **below the Mix button** — the animation converges on nowhere; no
  spatial handoff (`x-mix-anim-revealing.png` → `x-mix-result-light.png`).

**Fix shape** (KISS, no workarounds): drop `ctx.filter`; author the pooling with composable
primitives that are Safari-true (radial-gradient fills / globalAlpha layering, or a CSS/DOM
watercolor morph via glass-ui's existing watercolor idiom), cut total choreography to ≤1.2s,
land the reveal **at the result plate's position**, and delete the spinner row (the animation
IS the progress). **Root: value.js demo** (`mix/composables/*`). P1.

### 7. T19 (owned) — the dominance readout stutters: three tellings of one story
`ExtractWorkbench.vue:106-152`. Post-extract the column stacks: dominant WatercolorDot + stat
block → population-proportional `PaletteColorStrip` → `PaletteCard` whose header is **another
color strip** — two nearly-identical strips ~60px apart, and the dominant dot duplicates the
card's first swatch (`x-extract-developed-light-1440.png`, bottom third). Meanwhile at 1440×900
the actual deliverable (the palette card) sits below the fold (pane scrollHeight ≫ 772px client).
The stat itself is RIGHT — `40`% in the display voice with the Fira `oklch(…)` readout is the
instrument speaking. **Fix**: ONE strip — make the PaletteCard's own header strip
population-proportional (weights prop into `PaletteColorStrip` where the card already renders
it), and fold the dominance stat into the card's plate header (stat = the card's label line).
Kills the standalone strip row (`:135-139`) and one duplicate dot. **Root: value.js demo.** P1.

### 8. Generate (owned, whole composition) — the product is subordinate to the form
`GenerateControls.vue:78-173` + shots `generate-light-1440.png`, `x-generate-mobile-390.png`:
- The page's primary verb (**regenerate**) is a small ghost `DockIconButton` parked at the end
  of the `seed:` metadata row (`:153-160`). The palette — the deliverable — is the last, smallest
  element; ~40% of the pane at 1440×900 is dead space below it. Hierarchy inverted end-to-end.
- The 2-col PRESET/HARMONY grid crushes at 390px: permanent subtitles truncate to
  "High chroma, bold…" / "Golden angle —…" — copy that self-destructs (see F10).
- COUNT slider: `variant="spectrum"` with **no gradient supplied** (`:137-145`) renders a dead
  grey capsule with a ghost thumb — the one control that could carry the generated ramp's own
  hues is inkless (S-2/S-16 family). Either feed it the live ramp (extract already does exactly
  this: `session.kSliderGradient` → `ExtractControls.vue:11-23`) or it's the standard variant.
  glass-ui side: a spectrum slider with no track bg should be a loud failure, not an empty
  capsule (no-silent-handling) — `glass-ui src/components/ui/slider/Slider.vue` (spectrum recipe).
**Candidate recomposition**: palette plate as the hero (full-bleed swatch plate up top, Fraunces
name + count badge), a real "Regenerate" action in the plate's toolbar (seed readout stays Fira,
`select-all` kept — it's good instrument copy), controls as marginalia beneath, count slider
carrying the ramp. **Root: value.js demo** (+ 1 glass-ui guard). P1.

### 9. Dark mode on all three pages: the ambient field stays light — cards go mud
`x-extract-dark-1440.png`, `x-generate-dark-1440.png`, `x-mix-dark-1440.png`: with
`html.dark` confirmed true, the page field remains **full-saturation light pink** (or cream)
while cards switch to dark translucent glass → brown-purple mush, two-tone header banding on
every pane card, and contrast collapse: `section-label`/`section-subtitle` rows (COLOR SPACE /
HUE METHOD / PRESET / HARMONY) sit at an estimated <2:1 over the mixed field; "Drop an image or
click to browse" is illegible; sliders render black-pill-on-black. Corroborates S-18 and extends
it: the aurora ignores the theme axis, not just the color axis — and it is
**boot-nondeterministic** (same view, same color: pink field one boot —
`x-mix-3colors-light.png` cream, `extract-light-1440.png` pink). Cross-lane (S-18 owner:
shell/aurora lane); recorded here because it wrecks all three pages' dark register.
**Root: demo aurora wiring → glass-ui aurora producer** (whichever holds the L/C/H derivation;
per S-18 it must vary H and C in OKLCH and respond to `dark`). P1.

### 10. Dev-boot API dead end (S-11 corroboration)
Every cold boot: CORS-blocked `GET https://api.color.babb.dev/colors/approved` (2 errors/boot,
every context). Local dev has no working palette backend → saved/browse/name flows silently
empty (which is also why F3's eternal skeleton is every dev's first impression of Mix-palettes).
**Root: value.js demo** (`api/client.ts` BASE_URL env routing / vite dev proxy to local `api/`).
P1 for the dev loop; owned by the api lane — evidence filed here.

---

## P2 — off-register moments / duplication / composition

### 11. Permanent select subtitles duplicate the dropdown's own descriptions
`GenerateControls.vue:86,109` and `MixConfigBar.vue:52,70`: each select carries an always-visible `section-subtitle` that restates the selected item's description — the same text the
`SelectItem #description` slot already shows in the menu (`x-generate-preset-open-light.png`).
Double-telling at rest; truncated noise at 390px. **Cut the subtitle line** (S-12 class);
the label + value is the instrument register. **Root: value.js demo.**

### 12. Generic spinner rows on an editorial instrument
`MixPane.vue:96-104` ("Gathering…/Mixing…/Revealing…") and `ExtractWorkbench.vue:75-85`
("Extracting...") both use the stock `border-2 … border-t-primary animate-spin` circle —
default-shadcn furniture. Extract's quantize is near-instant (indicator barely flashes);
Mix's duplicates the canvas animation it overlays. Delete both rows; where a wait is real,
the page's own materia (k-slider ramp shimmer, plate ghost) is the progress voice.
**Root: value.js demo.**

### 13. Eyedropper overlay composition: the specimen floats small in a veiled void
`x-extract-eyedropper-light.png`: on open, the image renders at modest scale low-left inside a
full-pane veil; "Tap to sample" + a dashed dot sit top-left; the majority of the overlay is
empty blur. The plate should be the event: center it, fit-to-viewport (respecting aspect), loupe
as the hero interaction. `ImageEyedropper/ImageEyedropper.vue` (layout region `:1-86`).
**Root: value.js demo.**

### 14. Slider thumb ink (S-2/S-16 family, measured)
All `[role=slider]` thumbs on extract measure **12×24px, transparent fill, 2px `rgb(251,250,248)`
border** — a white outline ghost that vanishes on pale tracks (kC slider: white thumb on white
track, `x-extract-developed-light-1440.png`; count slider same, `generate-light-1440.png`; black
variant on dark, `x-extract-dark-1440.png`). Same recipe family as the picker's S-2 black thumbs.
**Root: glass-ui producer** (`Slider.vue` spectrum/standard thumb recipes — S-21: at the root,
one fix for every consumer). Hover/press states should follow the gradient-picker grammar (S-16).

### 15. `useColorGeneration` is homed in the wrong feature tree
`GenerateControls.vue:16-22` imports the entire generation engine from
`@components/custom/color-picker/composables/useColorGeneration` — Generate's domain logic lives
in the color-picker's subtree. Move to `custom/generate/composables/` (colocation discipline;
the demo tree's own convention). Mechanical. **Root: value.js demo.**

### 16. Mix ⇄ gradient coupling for space metadata
`MixConfigBar.vue:15` imports `INTERPOLATION_SPACES`/`HUE_INTERPOLATION_METHODS` from
`gradient/composables/useGradientModel` — shared vocabulary living inside a sibling feature.
If it's shared, it's `@lib/` or src-level metadata (the labels/descriptions are color-space
facts, not gradient facts). **Root: value.js demo.** (DRY-correct today, cohesion-wrong home.)

### 17. Dock segmented pill cutoffs at 390px (S-7 evidence, cross-lane)
`x-generate-mobile-390.png`: dock segment reads "Generate | **Pa**" (Palettes clipped mid-glyph);
`x-mix-mobile-390.png`: "Picker | Mi**x**" (x clipped by the pill edge). Filed for the dock lane
(S-7/S-8 owner) with shots. Also every shot re-confirms `@MBABB` uppercase (S-5) and the
collapsed-dock text-over-dot clipping ("Ext"/"Mix"/"Ge…", S-8). **Root: dock/glass-ui.**

### 18. `kC` micro-label is unglossed
`ExtractControls.vue:50` — bare `kC` (title-attr only). Instrument shorthand is in-register,
but the plate never teaches it. One Fira gloss on first render or a proper label
("chroma ×0.5"). **Root: value.js demo.** P3-leaning; bundled with F8's control rework.

---

## What already sings (keep; do not regress in the wave)
- The T19 stat voice: Fraunces `40`**%** + Fira `oklch(…)` — exactly the atlas-plate grammar.
- WatercolorDot ghost add-slot with seeded dashed silhouette (`MixSourceSelector.vue:150-162`)
  and the dashed-well "Selected" tray — the house empty-slot grammar, correctly quiet.
- Extract's k-slider carrying the extracted ramp (`ExtractControls.vue:8-24`) — the instrument
  showing its own state; this is the pattern Generate's count slider should copy.
- `seed: cd50a0ff` Fira readout with `select-all` — good bench-notes register.
- Mix math verified exact (identical-input mix returns the identical color; denorm ✓).

## Candidate wave-items (concrete, precept-clean)
1. **W-EXTRACT-PLATE**: delete plate copy (F1); de-shimmer/cut empty skeleton (F2); hover veil →
   edge affordance (F4); one proportional strip + stat folded into the card header (F7);
   eyedropper centered fit (F13). All `image-palette-extractor/*`.
2. **W-MIX-VERB+POUR**: Button primary over wash fixed at glass-ui root (F5); mix animation
   re-authored Safari-true, ≤1.2s, reveal lands on the result plate, spinner rows deleted
   (F6, F12); palettes-tab honest empty state (F3).
3. **W-GENERATE-HERO**: recompose Generate — palette plate hero, real Regenerate action,
   subtitles cut, count slider carries the ramp (F8, F11); `useColorGeneration` moved home (F15).
4. **W-SLIDER-INK** (glass-ui): thumb ink + hover grammar for spectrum/standard recipes (F14);
   spectrum-without-bg fails loudly (F8b).
5. Cross-lane hand-offs: aurora theme/color axes (F9→S-18 lane), dock pill clipping (F17→S-7/S-8
   lane), dev API BASE_URL (F10→api lane).
