# T.W8 · critique pass — MICRO-CHROME ROSTER + THROWN-ERROR STATE · p1 (round 1 of ≤3)

**Filed**: 2026-07-12 · Fable + frontend-design · **PROBE-ONLY coherence PRE-FILTER**
(no authoring; no taste certified — a pass verdict is "coherent with the doctrine" or a
filed row, NEVER "beautiful"; lesson 12. Taste is the OWNER's.)
**Branch/head**: `tranche-t` @ `c8799fd` (docs-only commits atop the W6.5 close — the probed
product tree is **`5e4f1f6` byte-exact**, verified `git diff 5e4f1f6..HEAD -- demo/ src/ e2e/
api/` EMPTY; the same tree the owner's §0.7 evening audit judged and every W8 pass filed against).
**Spec of record**: `waves/T.W8.md` §Scope-1 · **h-gaps G-9 (the micro-chrome roster) + G-8 /
VERDICT §5-D3 (the thrown-error state = the declined-ledger row's judged surface)** ·
`SYNTHESIS.md §2` D1–D10 + T-24 (neutral consistency) + O-18 (contrast) + **R7 (error ≠
empty: role=status/alert + CircleAlert, never a ghost/trio)** + Q6 (error surfaces DROP the
specimen annotations — no eyebrow, no ghost register).
**Anchors re-derived via `w1-move-map.md` + the live tree**: `demo/color-picker/index.html`
(the `<title>` + `<meta description>`) · `@styles/style.css` (the ::selection / scrollbar /
cursor SITES — probed ABSENT) · `common/EmptyState.vue` (the two-species error/empty plate —
the R7 surface) · `panes/BrowsePane.vue:61-78` (the error plate's one live consume site) ·
`color-picker/controls/ComponentSliders/ComponentSliders.vue` (the `.slider-thumb` cursor
site) · `color-picker/controls/SpectrumCanvas/SpectrumCanvas.vue` (crosshair) ·
`gradient/GradientVisualizer/GradientStopEditor.vue` (the grab/copy precedent) ·
`image-palette-extractor/ExtractControls.vue` + `gradient/…/GradientEasingEditor.vue`
(the beyond-dock `title=` roster).

---

## §1 Method (the O-3 probe class — live drive, real engine, dpr 2)

- **Serve**: the live tree on **VJS_E2E_PORT=8700** (`VITE_API_URL=http://127.0.0.1:8709
  npx vite --port 8700` — the API pointed at a **DEAD port** so palette browse network-fails
  → the BrowsePane error plate renders, the forced-throw this pass judges; PERF_PORT 8701
  reserved unused; **the owner's :9000 untouched**).
- **Engine**: **HEADLESS** Chromium (`channel: chromium`, `--force-color-profile=srgb`) —
  headless renders **classic, overlay-less scrollbars**, i.e. the NON-macOS forced-scrollbar
  context roster item 2 demands (macOS overlay scrollbars hide the material on a real display).
- **Cells**: 1440×900 (+ a 1440×420 forced-overflow context for the scrollbar leg) × light+dark,
  deviceScaleFactor 2, `colorScheme` emulation.
- **Probes**: `document.title` · a full `[title]` DOM census per view (dock vs beyond-dock) ·
  declared `::selection`-rule count across every stylesheet + `getComputedStyle(el,'::selection')`
  + a real `Range` selection screenshot · computed `cursor` over each drag/hover affordance ·
  `scrollbar-width`/`scrollbar-color` on the `.pane-scroll-fade` scrollers across three panes ·
  the error plate's role/glyph/voice census + **composited pixel-sampled figure/ground**
  (screenshot-clip → PIL decode → WCAG in-script) + negative controls (trio/eyebrow scoped to
  the `[role=alert]` subtree).
- **Frames**: `docs/tranches/T/audit/pi/w8/microchrome/` (6 PNGs, gitignored-by-class on-disk):
  `1440-{light,dark}-selection.png` · `1440x420-{light,dark}-scrollbar.png` ·
  `1440-{light,dark}-error-plate.png`. Instruments + logs committed: `w8-microchrome-probe.mjs`
  + `w8-microchrome-probe-leg2.mjs` + the two `-log.txt`.

## §2 Console attest

**ONE console error per scheme, EXPECTED**: `net::ERR_CONNECTION_REFUSED` — the dead-API
precondition this pass deliberately arms to force the error plate. **Zero unexpected errors,
zero pageerrors** across every cell and driven state (picker / gradient / extract / mix /
browse). The forced throw is a network failure the app **catches** (`browseError` set in
`useBrowsePalettes` line 79) — never an uncaught exception; the demo has no global
`app.config.errorHandler`/`onErrorCaptured` boundary and needs none for this surface (the
error is domain-caught and rendered, not thrown to the framework).

## §3 COHERENCE VERDICT

**COHERENT WITH THE DOCTRINE, WITH FILED HYGIENE ROWS — and the THROWN-ERROR STATE PASSES
ITS R7/Q6 JUDGMENT CLEAN.** The declined-ledger surface (G-8) renders exactly the doctrine's
error species: `role="alert"` + a destructive `CircleAlert` glyph + a Fraunces display
statement ("The commons is unreachable.") + the Fira machine-truth ("Failed to load palettes")
+ a real Retry `<Button>` — with **NO ghost trio and NO eyebrow** (children census `[svg, p, p,
button]`, trio/eyebrow scoped-to-alert FALSE, both schemes): error ≠ empty is honoured to the
letter (R7/Q6). The micro-chrome roster is mostly clean: `<title>` present, scrollbars
coherently **suppressed** (not unthemed-leaked), spectrum/gradient/blob cursors all read their
affordance. **Except**: the §5 ledger files **three small LAND-hygiene rows — the `::selection`
ink is undefined so text selection paints the UA-default BLUE over the warm derived atmosphere
(both schemes); the color-channel slider thumbs compute `cursor: auto` (no drag affordance)
while the gradient stop-thumb correctly reads `grab` — an internal cursor-grammar fork; and the
light-scheme error DETAIL line composites 2.72:1 over the owner's derived brick field, below the
3:1 UI floor (O-18)** — and books three notes (the view-blind static `<title>`; the legacy-webkit
scrollbar-suppression fallback; the beyond-dock native-`title` voice/accessible-name residual).
Nothing here certifies taste.

## §4 The attested roster (item → live witness → read)

| Roster item | Live witness (probed, not assumed) | Read |
|---|---|---|
| **(1) ::selection ink** | **ZERO** declared `::selection` rules across every stylesheet (demo + glass-ui); `getComputedStyle(el,'::selection')` returns the element's own ink with `bg rgba(0,0,0,0)` = no rule; a real `Range` selection paints the **UA-default blue** (frame `1440-{L,D}-selection.png`: the blue highlight behind "Home" over the terracotta field) | **HYGIENE ROW §5 P11-R1** — the one foreign accent in a bespoke derived-atmosphere app; both schemes inherit the browser blue |
| **(2) scrollbar material (non-mac)** | every `.pane-scroll-fade` pane (glass-ui `Card`) computes **`scrollbar-width: none`** (the `scrollbar-hidden` class) + `scrollbar-color: auto`, uniform across gradient/extract/browse AND both platforms; the forced-overflow 1440×420 frame shows **no classic scrollbar** paints; the `.pane-scroll-fade` timeline fade-veil is the designed scroll affordance | COHERENT — scrollbars are **consciously & uniformly suppressed**, NOT an unthemed UA-gray leak; the roster's worry is a non-case here. **One booked note** (§6): no `::-webkit-scrollbar{display:none}` fallback for pre-18.2 Safari/legacy webkit (modern Chrome/FF/Safari honour `scrollbar-width`); desktop scroll-affordance rests wholly on the fade veil |
| **(3) cursor grammar** | spectrum `.spectrum-picker` → **crosshair** ✓ · gradient rail `.gradient-rail` → **copy** (add-a-stop) ✓ · gradient stop-thumb → **grab** ✓ · blob `.goo-blob-hit` → **pointer** ✓ · BUT the 4 color-channel slider thumbs (`L/A/B/ALPHA channel`, `.slider-thumb`) + their track → **`cursor: auto`** | COHERENT on spectrum/gradient/blob — **the slider thumb is the fork (§5 P11-R2)**: the app's primary drag control gives no draggable cursor while its sibling gradient thumb reads `grab` |
| **(4) static `<title>`** | `document.title = "Color Picker"` at every route; NO `document.title=`/`useTitle` anywhere in the tree — the SPA never updates it per view (gradient/browse/extract all read "Color Picker"); `<meta description>` is rich by contrast | COHERENT (present, honest, stable) — **one booked note** (§6): generic + **view-blind** (never reflects the active tool); a minor SEO/tab-legibility nicety, not a defect |
| **(5) native-`title` tooltips BEYOND the dock set** | at-rest runtime census: gradient `<code title="cubic-bezier(0,0,1,1)">` (informative full-value reveal on a truncated code line, **no aria**) · extract `<label title="Chroma weight">` (kC hint, **no aria**); the icon-only action buttons (Upload image / Open camera / Reset / Copy CSS) are **`DockIconButton`** instances (the dock set) carrying `title` as their **sole accessible name** (no `aria-label`); dormant `:title="color.css"` value-reveals on mix/extract/browse swatches + card meta (not mounted at rest) | COHERENT-with-notes — the beyond-dock native titles are FEW and **informative** (value/full-string reveals), not redundant labels. **Two booked notes** (§6): (a) the informative reveals could join the designed `Tooltip` grammar (the HeroBlob `TooltipContent` precedent) for a themed reveal; (b) icon-only DockIconButton actions rely on `title` alone for their name (a weak/unreliable accessible name) |
| **THROWN-ERROR STATE** (G-8 / VERDICT §5-D3 · R7 · Q6) | `BrowsePane` @ dead API → `[role="alert"]`; `CircleAlert` glyph (destructive `oklab(.574 .19 …/.8)` light / `.633` dark); message **Fraunces** ("The commons is unreachable.") L .216 light / .925 dark; detail **Fira Code** ("Failed to load palettes"); real Retry `<Button variant=outline>`; children `[svg, p, p, button]`; **trio-in-alert FALSE · eyebrow-in-alert FALSE · 0 watercolor/goo dots in alert** — both schemes | **PASSES** — the R7 error species is exact (alert role + CircleAlert, never a ghost/trio) and the Q6 annotation-drop is honoured (no eyebrow, no specimen conceit); the D-tier voice grammar (display statement + mono machine-truth) is coherent. **One contrast row (§5 P11-R3)**: the light detail line reads 2.72:1 |

## §5 THE ROW LEDGER (typed; anchors; zero adjective-only poles)

### P11-R1 · **LAND** (small · micro-chrome) — `::selection` ink is undefined: text selection paints the UA-default BLUE over the warm derived atmosphere, both schemes
- **Defect (coherence, not taste)**: **zero** `::selection`/`::-moz-selection` rules exist in
  any stylesheet (demo or glass-ui — probed across `document.styleSheets`). Consequence: every
  text selection in a bespoke terracotta/brick derived-atmosphere app paints the browser's
  default **blue** highlight — the single foreign accent in the palette (frame
  `1440-light-selection.png`: the blue block behind the dock "Home"; `1440-dark-selection.png`
  the same over the maroon field). T-24's neutral-consistency law and the whole derived-ground
  ethos want selection tied to the accent/foreground family, per scheme.
- **Cure shape (lane's call)**: a `::selection` (+ `::-moz-selection`) rule in `style.css`
  keyed to the accent or foreground token, per scheme — the same per-surface, per-scheme
  discipline the ink-walk cure applies (a background from the live accent at a legible alpha,
  ink from the scheme foreground). Never a hardcoded hue.
- **Anchor**: `demo/@/styles/style.css` (add the global `::selection` rule; the file already
  owns the `:root` token layer).
- **Failure scenario**: any user selecting a readout, a code line, or a heading sees a blue OS
  highlight foreign to every other pixel on the page.
- **Constraints (binding)**: `style.css` is the SHARED picker/band-pass file class — this row
  re-homes to whichever lane owns `style.css` at the batch cut (single-writer keyed on the FILE).

### P11-R2 · **LAND** (small · cursor grammar) — the color-channel slider thumbs compute `cursor: auto`; the gradient stop-thumb reads `grab` — an internal affordance fork
- **Defect (measured)**: all four `[role=slider]` thumbs (`.slider-thumb glass-specular-track
  …`, aria `L/A/B/ALPHA channel`, 12×24) AND the slider track compute **`cursor: auto`** (the
  default arrow) — the app's PRIMARY drag control signals no draggability. The sibling
  draggable control, the gradient stop-thumb, correctly reads **`cursor: grab`** (rail `copy`,
  drag `grabbing`); the spectrum reads `crosshair`; the blob `pointer`. The slider is the one
  drag affordance whose cursor does not read.
- **Cure shape (lane's call)**: the `.slider-thumb` reads `grab`/`grabbing` (the gradient
  precedent) — or, at minimum, `pointer`/`ew-resize`. The demo ALREADY styles `.slider-thumb`
  in `ComponentSliders.vue`'s unscoped block (targeting reka-ui's emitted markup class) — the
  cursor lands there, no `ui/slider` hand-edit and no producer ask.
- **Anchor**: `demo/@/components/custom/color-picker/controls/ComponentSliders/ComponentSliders.vue`
  (the unscoped `.channel-slider .slider-thumb` block, ~:291 — DEMO-owned, reka-ui markup
  targeted from the demo, glass-ui not touched).
- **Failure scenario**: a desktop pointer over the L/a/b/alpha thumbs shows the arrow, not a
  grab hint — the drag is discoverable only by trying.

### P11-R3 · **LAND** (small · contrast · O-18) — the light-scheme error DETAIL line composites 2.72:1 over the owner's derived brick field, below the 3:1 UI floor
- **Defect (composited pixel-sample @ dpr2, owner seed `lab(38% 32 24)`)**: the error plate's
  detail line — `text-muted-foreground` Fira ("Failed to load palettes") — samples
  **`rgb(112,89,66)` over ground `rgb(205,154,154)` = WCAG 2.72:1** in light, below even the
  3:1 large-text/UI floor (dark is fine: 5.22:1). The load-bearing **message** statement is
  safe both schemes (light **5.60:1** / dark **6.35:1**), and the CircleAlert glyph is
  decorative (`aria-hidden`), so the plate READS — but the machine-truth line, the one carrying
  the actual failure cause, is the least legible in light. This is the standing
  muted-foreground-over-a-mid-L-derived-field class (kin to GAP-L2 and the ramp referent
  concern): the quiet rung composited over the semi-transparent plate's brick ground.
- **Cure shape (lane's call)**: the error variant's detail rung lifts to a certified-legible
  ink over the local plate ground (per-surface referent — the ink-walk precedent), OR the error
  plate seats on a backing that raises the local contrast; never a scheme-blind constant.
- **Anchors**: `demo/@/components/common/EmptyState.vue:23` (the `text-mono-small
  text-muted-foreground` detail line) · the muted-foreground token + the atmosphere derive path
  (read-only context).
- **Failure scenario**: over any mid-L derived light ground (the owner's own brick reference
  does), the error's cause line reads at 2.72:1 — sub-floor.
- **Constraints (binding)**: the R7/Q6 SHAPE stands (the row touches the detail rung's contrast,
  never re-introduces an eyebrow/trio); a per-scheme certified output is in-bounds.

### P11-W1 · **WITNESS (the error state PASSES — no row)** — R7/Q6 honoured to the letter
- `[role="alert"]` + `CircleAlert` + Fraunces statement + Fira machine-truth + real Retry;
  trio-in-alert FALSE, eyebrow-in-alert FALSE, 0 ghost dots in the alert subtree, both schemes;
  children census `[svg, p, p, button]`. The declined-ledger surface (G-8 / VERDICT §5-D3) is
  the doctrine's error species, NOT the empty state — re-witnessed, not re-filed. Frames
  `1440-{light,dark}-error-plate.png`. (The leg-1 doc-scope `hasGhostTrio=true` was the My
  Palettes empty state in the adjacent right pane — a document-scope OR false positive, resolved
  by the leg-3 alert-scoped re-drive: trio-in-alert FALSE both schemes.)

## §6 Routing + loop state

- **Zero rows contradict a §12 ruling or a §4 retirement; nothing routes OWNER**: R7/Q6 are
  RESTORED-to/CONFIRMED by the error-state witness (P11-W1); T-24/O-18 are honoured by P11-R1
  (selection-ink family) and P11-R3 (per-surface contrast); no spec is re-litigated. All three
  rows are demo-side LAND-hygiene, no producer ask minted this pass.
- **Booked notes (owner-visible, not rows)**: (n1) the `<title>` is view-blind (a per-route
  title is a nicety, not a defect); (n2) `scrollbar-width: none` lacks a legacy-webkit
  `::-webkit-scrollbar` fallback + desktop scroll-affordance rests on the fade veil; (n3) the
  beyond-dock informative native `title=`s could join the designed `Tooltip` grammar, and the
  icon-only DockIconButton actions rely on `title` as their sole accessible name.
- **remediation_1 shared-file map (single-writer keyed on the FILE)**: P11-R1 anchors
  `style.css` (SHARED picker/band-pass file class — re-home to that lane at the batch cut).
  P11-R2 anchors `ComponentSliders.vue` (the picker-controls file class — one lane; DEMO-owned
  reka-ui markup, no `ui/slider` edit). P11-R3 anchors `EmptyState.vue` (the shared common
  plate — the empty/skeleton passes must not co-write it; single-writer at the cut).
- **Loop**: this is pass_1. Rows P11-R1..R3 feed remediation_1; pass_2 re-judges the landed
  state; ≤3 rounds then residual routes by class.
- **Oracle blind spots flagged for the triumvirate record (bounds expansion is not a pass's
  call)**: (1) `::selection` composited legibility — no slate leg samples selection ink over the
  derived ground; (2) the error-plate detail-line composited contrast (P11-R3 — O-18's text leg
  covers instruments, not the error-variant detail rung over a semi-transparent plate); (3)
  slider-thumb cursor affordance — no oracle asserts the drag-cursor grammar.

## §7 Probe evidence (values of record)

| Probe | 1440 light | 1440 dark |
|---|---|---|
| `document.title` | `"Color Picker"` (view-blind, all routes) | same |
| declared `::selection` rules (all stylesheets) | **0** | 0 |
| selection paint (real Range) | UA-default **blue** (frame witness) | UA-default blue |
| `.pane-scroll-fade` scrollbar-width / -color | **none** / auto (glass-ui `scrollbar-hidden`) | same |
| forced-overflow @420h: classic scrollbar paints? | **no** (suppressed; fade veil is affordance) | no |
| cursor — spectrum / gradient rail / stop-thumb / blob | crosshair / copy / **grab** / pointer | same |
| cursor — color-channel slider thumb + track | **auto** (×4 thumbs + track) | auto |
| `[title]` beyond-dock @ gradient / mix / extract / browse | 1 / 0 / 1 / 0 (informative `<code>`/`<label>`, no aria) | same |
| icon-only DockIconButton actions: aria-label | **absent** (title = sole name) | absent |
| error plate: role / glyph / children | alert / CircleAlert / `[svg,p,p,button]` | same |
| error plate: trio-in-alert / eyebrow-in-alert / ghost dots | **false / false / 0** | false / false / 0 |
| error message WCAG (composited, vs plate ground) | **5.60:1** (Fraunces statement) | 6.35:1 |
| error detail WCAG (composited, vs plate ground) | **2.72:1** (Fira muted-foreground — sub-floor) | 5.22:1 |
| console errors (expected `ERR_CONNECTION_REFUSED` only) | 1 (armed) | 1 (armed) |

*(Contrast/WCAG numbers are screenshot-composited pixel samples at dpr2 — PIL-decoded from the
clip crops, the honest ground over the semi-transparent plate, not the alpha-blind computed
approximation. The dead-API precondition is the deliberate forced-throw; the sole console error
per scheme is that armed network refusal, not an app fault. Every value re-derivable from
`w8-microchrome-probe{,-leg2}.mjs` + the committed logs.)*
