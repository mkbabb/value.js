# X-DS — fourier: pass receipts

Wave: `waves/X-DS.md` (COHESION §0ej, refined at §0ek). App: fourier, `web/src/**`, repo `/Users/mkbabb/Programming/fourier-analysis`, branch `m/w1-bump-migration`. Canon: `execution/DS/fourier-canon.md`. Frames: `evidence/DS/fourier/pass-NN/`.

### pass 1

**Commits.** fourier `1c960d5` (the cure, 34 files) and `15e5e0c` (named golden re-baseline), pushed fast-forward. value.js `3d60b455e` (AFTER frames and census).

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| F1-01 | `AnimationControls.vue`: the seven-stop rainbow on the playing control and its infinite `rainbow-drift` are deleted. The state is `DockControl`'s own `[data-active]` fill. |
| F1-02 | `ContourEditorCanvas.vue`: the spline `drop-shadow` glow and the infinite `golden-shimmer` hover pulse are deleted. |
| F1-03 | `epicycles.ts` `drawTipDot`: one flat dot in `VIZ_COLORS.fourier`. The `sin(t)` halo, the white specular disc and the literal `#ff3b3b` are gone. |
| F1-04 | `lib/golden-shimmer.ts` → `lib/golden-stroke.ts` (`applyGoldenStroke`): the Sum stroke is steady, alpha 1, no `shadowBlur`; hover is a width step 5 → 7. `goldenShimmerAlpha` and `goldenShimmerShadow` are retired. |
| F1-05 | `BasisCanvas.vue`, `labels.ts`, `useCanvasHover.ts`: a hovered curve or label keeps its own hue at full strength against dimmed siblings; the epicycle chain keeps its spectrum and steps its stroke; the trail stays in the Fourier hue. The shimmer rAF loop and `drawEpicycleCircles`' `colorOverride` are deleted. |
| F1-06 | `PaperTocDrawer.vue`: the drawer toggle sits in the CONTENTS header while open, and is a labelled vertical edge tab flush against the paper when shut (tab right edge = article left edge, measured 354 = 354). Focus follows it. |
| F1-07 | `FunctionInput.vue`, `SliderControl.vue`: the Parseval control is a labelled "Auto" toggle in the Harmonics row, on glass ToggleGroup's pressed state. The amber `!important` recolour and `.harmonics-row` are deleted. `SliderControl` gains an `adornment` slot. |
| F1-08 | `GalleryCard.vue`: the compact arm keys below 12rem, so the 14rem desktop track keeps "ℱ Epicycles" and the slug; the phone's 171px card still takes it. |
| F1-09 | `PaperPageReadout.vue` (new, extracted from `PaperView`): the readout leaves the viewport-corner glass chip for the ToC hosts: the drawer's foot at desktop (beside the edge tab when shut) and the floating bar at phone width. No plate. |
| F1-10 | `ConvergenceLegend.vue`: the amber dot's glow is deleted. |
| F1-11 | `EquationView.vue`, `ConvergencePlot.vue`: the local casts over `glass-floating` are dropped; the hovercard border is `1px solid var(--border)`. |
| F1-12 | `PaperArticleWindow.vue`: `shadow-sm` off resting figures. |
| F1-13 | `GalleryCard.vue`: hover is a `--fill-hover` tone step. Measured: the computed `box-shadow` is identical at rest and on hover. |
| F1-14 | `MorphShapePreview.vue`: two fixed rows (a 2 × 2 grid) below 30rem; nothing clips, and the row still never re-flows. |
| F1-16 | `NotFoundCard.vue`: the server detail on `text-caption`; actions explicit `size="md"`. |
| F1-17 | `VisualizationView.vue`: ORIGIN's drop zone revived as a 1px dashed `--border` at `--radius-card` around the prompt and action. `--radius-control` resolves to a pill on glass 10.1.0, so the card rung is used. |
| F1-18 | `toast-policy.ts`: `errorToast()` replaces a repeated failure's toast instead of stacking it; all error sites call it and `ERROR_TOAST` is no longer exported. |

**No change.**
- **F1-15:** the a+b formula already scrolls inside glass `FadingScroll` with its edge fade (measured `clientWidth` 970, `scrollWidth` 1832, `overflow-x: auto`, mask present). The "stray −" is the term under the 16px fade. A wider fade is glass's.
- **F1-08, the dead space at 1440:** it is the empty sixth `auto-fill` track with four or five seeded cards. `auto-fit` would stretch a one-card gallery across the row, so the grid is unchanged.

**Glass-owned, left honest-RED and not overridden (O-87 FLAT-LIGHTING):** F1-19 … F1-30. **F1-31** is O-88 DOCK-COLLAPSE-MOTION (§0el).

**Census** (`scripts/ds-census.mjs`; `pass-01/census-after.json`).

| | before | after |
|---|---:|---:|
| static: `filter: drop-shadow` | 3 | **0** |
| static: `infinite` animations | 2 | **0** |
| static: `@keyframes` | 4 | 2 |
| static: `box-shadow` declarations | 8 | 4 (all focus or selection rings) |
| static: Tailwind shadow utilities | 1 | **0** |
| computed: decorative gradient on a control | 2 | **0** |
| computed: looping animations on chrome | 3 | 1 (glass's liquid Progress, F1-27) |
| computed: inset highlight layers | 333 | 334 (glass) |
| computed: multi-layer shadow stacks | 335 | 336 (glass) |
| computed: backdrop-blur elements | 300 | 305 (glass) |

The fourier-owned allowance is met. The glass-owned rows do not move until the 10.2.0 repin. The computed "before" column is the canon note's table, and the static "before" is this pass's run of the script on `git archive HEAD`.

**Defect found in pass-00:** `evidence/DS/fourier/pass-00/census-before.json` holds the **keyframes** census (`app: keyframes.js`, base `:5173`), at its first commit `31320666c`. The fourier numbers survive only in `fourier-canon.md`. Not rewritten here.

**Frames.** `evidence/DS/fourier/pass-01/`: 28 frames, 7 routes × light/dark × 1440/390, headless real Chrome. The `/v` cell is `/v/plush-evening-olive-squid`; pass-00's slug was an e2e seed row that no longer exists.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- **e2e is NOT ×2 GREEN.** The host was saturated by other workflows for the whole pass (load average 250 to 510; single tests ran for 8 to 16 minutes; the seed upload timed out; `POST /api/sessions` returned 429).
  - Directly affected set, serial, headless (`f-w14u-t`, `f-w14-residuals` G-r1, `f-w14u-paper` desktop, `f-w14v-u2` e201, `paper-performance` windowed): run 1 **16/16**; run 2 **14/16**. The two run-2 failures were stalls ("element not found" after 15.9 minutes; a page that never mounted); each passed when re-run alone (542 ms; 10.3 s).
  - Wider runs (218 tests, then 100) returned 37 and 17 failures, all timeouts or missing-element waits apart from the one real break below. They are not evidence either way and are owed a re-run on a quiet host.
  - One real break found and fixed: G-r1's `getByRole("button", { name: "Contents" })` also matched "Hide contents"; the locator is now exact.
- **Tests changed:** `f-w14u-paper` UIA-F-234's chip assertion (a `glass-quiet` chip at a role radius) is superseded by the owner's ruling and restated as F1-09 (in the ToC host, no plate, no shadow, never over the article). `.overlay-page` → `.page-readout` in three specs.
- **Named owner-ruling re-baseline (§0ej), `15e5e0c`:** `checkpoint-disclosure-body` and `checkpoint-tooltip-trigger` (mobile). Both follow from F1-07 and both diffs were read.
- **Owed:** the three card goldens (`card-resting`, `card-hover`, `card-modal`) still show the pre-pass card. Their tests never reach the screenshot: the "Open <name>" locator finds nothing, three runs out of three. `visual-checkpoint` was already on the X ledger as failing before this pass, but whether this exact failure predates it was not checked.

**Instrument note.** The dev mongod on `:27018` had been shut down at 13:08 by a signal; this seat restarted it with the same options to capture frames. The seat's e2e run rewrote 13 tracked evidence frames under `web/e2e/screenshots/f-w14/`; they were restored to HEAD and are not in any commit.

**For the pass-2 critic.**
- The shut drawer's edge tab is a quiet Button with no visible frame: check that it reads as attached to the paper.
- `/w` at 390 was not looked at with the new drop zone.
- The contour editor's hover state now has no feedback at all.
- The info hovercard keeps a local `background` and border over glass PopoverContent.

### pass 1

*(Second pass-1 receipt: the cure for the 2026-10-07 critic, `evidence/DS/fourier/critic-p1-2026-10-07/`, findings DS-F-*. The first pass-1 receipt above, and its frames at value.js `3d60b455e`, stand; this pass's AFTER frames replace the files in `pass-01/`.)*

**Commits.** fourier `5622c16` (the cure, 17 files) and `5ab31fa` (named golden re-baseline), pushed fast-forward on `m/w1-bump-migration`. latex-paper `9e0200f` (DS-F-C3, local on `master`; not pushed, not published). value.js `4d491d425` (AFTER frames and census).

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F-C1 | `surface="opaque"` on GalleryCard, MorphPhaseConfig, HarmonicLevelGrid, the morph button's Surface and NotFoundCard; `.glass-opaque` on the paper ToC rail and both phone ToC bars. One warm `--card` tone app-wide and no backdrop blur on resting plates. The gallery card also drops its `shadow` opt-in. The cast that remains is glass's (G2). |
| DS-F-C2 | `epicycles.ts`: circle strokes, arms and dots scale with the circle's on-screen radius. Strokes reach full weight at about 10 px, with a 1 px floor; dots are skipped under 3 px. Fixing the dots alone left the bloom, because a sub-pixel circle stroked at 4–5 px is itself a filled disc. The spectrum hues are kept. |
| DS-F-C3 | Cured at the latex-paper root: the theorem block's resting cast, hover lift, hover cast growth and the `::before` corner ornament are deleted; the left rule and its type hues stay. **The fourier repin is owed**; it needs a latex-paper release, which this seat did not publish. |
| DS-F-C4 | `.viz-panel-left` padding is 0, so the layer group's hairline is the aside's own edge. The same moat on `/equation` (`.eq-panel-left-wrap`) is cured the same way. The layer is now "Basis" with the sub "& resolution". Measured at 1440: no layer trigger truncates. Four e2e locators follow the new label. |
| DS-F-C5 | `/equation` failure: a plain status block replaces the Card, and the message prints only when it differs from the title. `/v` error: the detail is dropped when it names the slug the description already names. |
| DS-F-C6 | `/morph` ≥1024: the stage column starts on the title's axis (plate x = title x = 164), and the plate, readouts and actions share the 26rem measure. Below 1024, the sticky band repaints glass's `.paper-grid` (attachment fixed) over `--background`, so the grid runs through it. |
| DS-F-C7 | At ≤30rem the state chip takes its own row and the three readings share the next. **Relay owed (glass):** the `Metric` inline label ("SHAPE", "TOTAL") still out-sizes its mono value. That rung is glass's and is not restyled locally. |
| DS-F-C8 | SliderControl stays on glass's `md` rung. The fill is a 40% rung of the identity hue, and the thumb carries the hue at full strength. |
| DS-F-C9 | The page readout is the second line of the CONTENTS header, inside the rail's plate. It did not fit beside the label and three glyphs: the header's `scrollWidth` was 315 in a 250 box. |
| DS-F-C10 | The compact card's basis chip keeps its word ("Epicycles"). |

**Glass-owned, left honest-RED, nothing overridden locally.**
- O-87 FLAT-LIGHTING: DS-F-G1, G2, G3 (including the aside's 12 px offset from the stage), G4, G5, G6.
- O-88 DOCK-COLLAPSE-MOTION: DS-F-G7.
- Relay owed to glass: DS-F-G8 (menu row icon gap and size).

**Census** (`pass-01/census-after.json`; base: the committed tree served from a worktree). On the critic's seven routes, like for like:
- backdrop-blur elements: 260 → **216**;
- control gradients: 0 → 0;
- looping chrome animations: 0 → 0;
- multi-layer shadow stacks: 290 → 300, and inset highlights: 288 → 298. Both are glass's recipe (G1/G2); the change comes from the `/v` error card's controls.

Static (`web/src`): gradients 10 → 9; box-shadow declarations 4 (focus and selection rings only).

**Frames.** 32 frames in `evidence/DS/fourier/pass-01/`: 8 routes × light/dark × 1440/390, headless real Chrome, from the committed state. The routes include `/v/plush-evening-olive-squid` (the stage) and `/v/elegant-passing-mauve-swift`, the critic's slug, now the error card.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice. latex-paper `vitest`: 127/127.
- e2e, 13 directly affected specs, chromium headless, 145 tests: run A 141/145, run B 141/145.
  - The same four failed both times. Each was re-run against the committed tree (served from a worktree on :3102):
    - `f-w14-control-row` @1440 and @390: **pass at the commit**. The working-tree failure comes from an uncommitted orphan hunk (P2-07, the SliderControl subtitle as a third line) left by a dead pass-2 seat on 2026-10-06.
    - `f-w14u-gallery` g248: **passes at the commit**. Its working-tree failure comes from the orphan GalleryDraftsSection hover hunk (P2-01).
    - `f-w14v-au3` L1-12: pre-existing. The `/morph` titles are `h3`, not glass CardTitle (ESC-au3-1); this pass does not touch them.
- **Named owner-ruling re-baseline (§0ej), `5ab31fa`:** `checkpoint-disclosure-body`. The diff is DS-F-C4 (no inset ring) plus DS-F-C8 (the fill rung), and it was read. It was taken from the committed tree and re-run twice GREEN.
  - Still owed from before this pass: `card-resting`, `card-hover` and `card-modal`. Their "Open img-amber-fox-spiral-one" locator never resolves.

**Instrument.**
- At 11:06 the dev mongod on `:27018` was shut down by a signal; this seat restarted it with the same options.
- Run 1 of the e2e (33 failures) is void: the API's compute process pool was broken (`BrokenProcessPool`).
- This seat restarted uvicorn with `MONGO_URI=…27018`, `BLOB_DIR=~/.mongo-dev/fourier-blobs`, `ADMIN_TOKEN=dev` and `COMPUTE_RATE_LIMIT`/`WRITE_RATE_LIMIT=1000`; its log is `~/.dev-logs/fourier-api-ds.log`. Two runs on that instrument count as A and B.
- The e2e runs rewrote the tracked frames under `web/e2e/screenshots/f-w14/`; they were restored to HEAD.

**Left in the fourier tree, not this seat's.** The orphan pass-2 hunks in `GalleryDraftsSection.vue`, `GalleryView.vue`, `PaperView.vue`, `SliderControl.vue` (P2-07 only; P2-02's fill was adopted into C8 and its `sm` rung reverted to `md`) and `stores/gallery.ts`. Another seat's staged contour deletions are also left. None is in any commit.

### pass 2

*(The cure for the 2026-10-07 pass-2 critic, findings DS-F2-*; its frames are `evidence/DS/fourier/critic-p2-2026-10-07/`.)*

**Commits.**
- fourier, on `m/w1-bump-migration`:
  - `7df07e5`: the cure, 21 files;
  - `168b8cd`: DS-F2-C6's follow-through. The phone ToC plate's width reads the new gutter.
  - `d6bdc97`: named golden re-baseline.
- value.js `98ad6f4b6`: AFTER frames and census.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F2-C1 | `ImageUpload`'s root is now the `ConfiguratorLayer`, so glass fuses the Image layer with Basis: one hairline and squared joins, with no 12 px non-layer margin. The visually hidden `h3` moves inside the layer. No local border. |
| DS-F2-C2 | The coefficient rows sit on the caption rung, below the layer's labels. The amplitude column is `flex-none min-w-[6.5ch]`, with end padding. Measured: "103.19" is 56 px wide in a 56 px box and ends 4 px inside the port. |
| DS-F2-C3 | **P2-07 is ruled ADOPTED.** There is one hint idiom: the subtitle sits on its own caption line under the label, whole and never ellipsised. The inline mono "N" token is retired into the Harmonics hint ("N, the terms in each basis sum"), and the `token` prop and its CSS are deleted. `f-w14-control-row`'s height gate now reads one height per group: rows with a hint, and rows without one. |
| DS-F2-C4 | At ≥1024 the `/morph` grid is `26rem minmax(0, 1fr)`, and the cards take the freed width. The readouts and the Export/Reset row both start on the plate's edge (x = 161). |
| DS-F2-C5 | `.demo-page` pads inline on `--page-gutter` at every width. The 640 px override is deleted. |
| DS-F2-C6 | `.floating-toc-crumb` is capped at 55% only when it has a leaf (`:has(+ .floating-toc-crumb--leaf)`). The bar pads on `--page-gutter`. The plate's width is `100vw − 2 gutters − insets`, which keeps au1 L2-16 green at 844×390. |
| DS-F2-C7 | Shut, the drawer shows only the edge tab. The rotated readout is gone; it lives in the open header (C9). The tab has a 1 px `--border` hairline and squared corners on its paper side. |
| DS-F2-C8 | The number and title are one hanging-indent label inside the glass Button, with `--toc-hang` set per depth. Numbers hang on the first line, and wrapped titles align in one column (frame `paper-scrolled-*-1440`). |
| DS-F2-C9 | Under 480 px of plot width (`useElementSize`), the legend is one wrapped row under the curves with no plate. The hue dots and labels are kept, the divider is dropped, and the row has a 4.5rem scroll cap. Desktop is unchanged. |
| DS-F2-C10 | One glyph set: lucide Play/Pause, filled, `size-4`, on `/v` (`AnimationControls`) and on `/equation` (`ConvergenceTimeline`). The Font Awesome paths are deleted. |
| DS-F2-C11 | Domain and Presets use glass `LabeledField`, as Expression does. The radiogroup is named through the field's `labelledBy`, and its accessible name stays "Presets". |
| DS-F2-C12 | `.info-hovercard` keeps only `z-index`, `width` and `padding`. Its local background, border, ink and `tooltip-in` are deleted, and glass PopoverContent paints. |
| DS-F2-C13 | There is one pointer-neutral label, "Choose an image", and the `pointer: coarse` query is deleted. |
| DS-F2-C14 | The unlabelled duration marks and `DURATION_MARKS` are dropped. |
| DS-F2-C15 | The Fourier and Polynomial choosers each have a caption on the control-row label rung, and both start on the label column. |
| DS-F2-C16 | The gallery card uses Card `size="md"`, so its pad is `--space-body`: 12 px at 1440, where sm gave 8, and 8 px at 390, where sm gave 4. No local px value. **Residual:** the ORIGIN's 16 px is not on glass's fluid space scale at either width. |
| DS-F2-C17 | The heart and the eye are both `size-3.5`. Glass Button's coarse svg rule skips `size-*` classes, so the hit area keeps its floor. |
| DS-F2-C18 | "Advanced" sets `margin-inline-start: calc(var(--space-residue) - var(--button-size) / 2)`, which is the inverse of glass's own Button pad. It now sits on the label column (x = 1022). |
| DS-F2-C19 | Circles under 2 px on-screen radius are skipped; their arms still draw the chain. The circle stroke's ceiling is half its given weight: 2 px at rest, 2.5 px hovered. The spectrum hues are kept. **Residual:** a lighter green speckle remains at the tip from the 3–6 px circles' dots and arms. |
| DS-F2-C20 | `ContourSettings` takes `defaultOpen`. The contour editor mounts its only layer open, and the main aside keeps it shut. |

**Glass-owned, left honest-RED, nothing overridden locally.** Under O-87 FLAT-LIGHTING:
- DS-F2-G1: the `glass-floating` radial `::before` sheen on the detached stage and aside;
- DS-F2-G2: the dark amber button cast;
- DS-F2-G3: coarse control type over the heading and label rungs, relayed with G8 and the C7 Metric row.

All three are to be re-judged at the 10.2.0 repin.

**Census** (`pass-02/census-after.json`; base: the committed tree, fourier `d6bdc97`, served from a clean worktree). Like for like on the 7 routes both passes share (28 route × theme × width cells), every count is unmoved:
- shadow layers 1098;
- multi-layer stacks 334;
- inset highlights 332;
- backdrop blur 260;
- control gradients 0;
- looping chrome 0.

These rows are layout and consumer chrome; the remaining stacks and blur are glass's recipe (O-87). Static (`web/src`): gradients 9, box-shadow declarations 4 (focus and selection rings), unchanged.

**Frames.** `evidence/DS/fourier/pass-02/` holds 54 frames, all headless real Chrome, served from the committed tree:
- 28 route frames: 7 routes × light/dark × 1440/390;
- the critic's 26 cells, recaptured with its own script: `v-contour-coeffs`, `v-hover-stage`, `v-moremenu`, `dock-navmenu`, `v-editor`, `v-canvas-390`, `eq-coeffs`, `eq-info`, `eq-hover`, `eq-canvas-390`, `paper-scrolled`, `paper-drawer-shut` and `morph-scrolled`, each in both themes.

**Gates** (all on the committed tree):
- `vue-tsc -b`: 0, twice.
- `vitest run`: 116/116, twice.
- e2e: 21 directly affected specs, chromium plus mobile-chromium, headless, 3 workers, 223 tests. Run A 219/223, run B 219/223. The same 4 failed both times, and all 4 are pre-existing:
  - `f-w14v-au3` L1-12 (ESC-au3-1);
  - `visual-checkpoint` items 1·6·7, 2 and 5 (the owed `card-*` goldens; their "Open img-amber-fox-spiral-one" locator never resolves).
- **Named owner-ruling re-baseline (§0ej), `d6bdc97`:**
  - `checkpoint-disclosure-body`: the diff was read, and it is exactly C3 (hints on their own line) plus C11 (the Domain and Presets labels);
  - `checkpoint-tooltip-trigger` (mobile): the Auto toggle's crop moves with the rows above it.

**Instrument.**
- The first two e2e runs are void:
  - The worktree's symlinked `node_modules` sat outside Vite's fs allow-list, so the KaTeX fonts returned 403. A scratch `vite.ds.config.ts` (in the worktree only, never committed) widens the allow-list.
  - With full parallelism, `/equation` computes starved the single API ("Computing…" frames). Run at 3 workers, every equation spec passes. `equation-interaction` S2 passes alone.
- The e2e ran from the worktree, so the main tree's tracked `e2e/screenshots/f-w14/` frames were never rewritten.

**Push.** GitHub rejected the fourier fast-forward push four times with "Internal Server Error". The fifth attempt landed: `5ab31fa..d6bdc97` on `m/w1-bump-migration`. value.js `tranche-u` is pushed through `28484ef0d`.

**Left in the fourier tree, not this seat's.**
- The orphan hunks in `GalleryDraftsSection.vue`, `GalleryView.vue`, `PaperView.vue` and `stores/gallery.ts`.
- Another seat's staged contour deletions.

The `SliderControl` P2-07 hunk is no longer an orphan: it was ruled, adopted and committed in `7df07e5`.

### pass 3

*(The cure for the 2026-10-07 pass-3 critic, findings DS-F3-*; its frames are `evidence/DS/fourier/pass-03/critic-cells/`.)*

**Commits.**
- fourier, on `m/w1-bump-migration` (on origin; a later F.CT commit `afc3a87` sits on top):
  - `5ae8c99`: the cure, 18 files. `PaperView.vue` was committed with only this pass's hunk (through a temporary index); the orphan `shadow` hunk stays in the tree.
  - `6278475`: DS-F3-C4 follow-through (one fixed sub-row rung), and `f-w14v-u2` reads the renamed `--chip-hue` hook.
  - `7ba52ec`: named golden re-baseline.
- latex-paper `aa244de` (DS-F3-C9, C10), local on `master`; not pushed, not published.
- value.js `f2d3ec079`: AFTER frames, census and probes.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F3-C1 | `TrailManager.update` rebuilds the trail as the whole path up to t on any non-continuous step: the first frame, a seek, a loop or a scrub (a jump of more than 0.05 in t). A played tick still appends the tip, and a redraw at the same t adds no point. The reduced-motion terminal frame (`reset()` then `seek(1)`) now draws the reconstructed curve (frame `v-epicycle-hover-*-1440`). |
| DS-F3-C2 | `.katex-display` fades whichever edge still has ink beyond it. The fade rides the box's own inline scroll timeline: the trailing edge at rest, both edges mid-scroll, the leading edge at the end. A display that fits has no timeline, so it is never masked. Measured on (1.51), both with and without reduced motion (`cure/m-katex-prm.mjs`). The tag was already outside the scroll box (latex-paper's `.math-block__number` grid column). Fit-to-measure was not taken. |
| DS-F3-C3 | With a leaf crumb, the chapter crumb collapses to its number ("1. › 1.1. Fourier's Pr…"), because the leaf's number already carries the chapter. The 55% cap is deleted. |
| DS-F3-C4 | Every ToC depth of 1 or more is on one fixed 0.875rem rung in muted ink, on glass Button's `xs` rung. Depth reads as indent and tone. The active plate is the row's, so it runs under the chevron. The rung is fixed rather than glass's fluid `--type-caption`, which would split the drawer and the phone bar (12.2 px against 14.4 px, A2-FO-L1-1). |
| DS-F3-C5 | `FourierTimeline`'s track is glass's unsized 0.375rem rule. The hit area keeps glass's `--slider-touch-target` (1.5rem) through block padding, which reka's inline-axis mapping never reads. Measured: a 6 px track in a 24 px band. The `/equation` 20 px knob is deleted. |
| DS-F3-C6 | `NotFoundCard` is glass Card `size="md"`. **Residual:** at 390 the coarse button labels still out-size the title. That is the DS-F2-G3 glass relay (coarse control type) and is not restyled locally. |
| DS-F3-C7 | One hue-chooser tone, `.hue-chip` keyed on `--chip-hue` in `style.css`, replaces four restated rules (basis, gallery basis, notation, preset). Auto takes it. |
| DS-F3-C8 | The split form's aside hugs its sections: `align-self: start` and `max-block-size: 100%`, with glass's fading scroll inside. Measured: the aside ends at 767 over an 888 stage (122 px of empty plate before), and it caps at the stage's bottom on a 640 px viewport. |
| DS-F3-C11 | The phone ToC band repaints glass's `.paper-grid` over the page tone, fixed to the viewport (the DS-F-C6 morph-band recipe). Paper no longer shows between the dock and the bar. |
| DS-F3-C12 | The About link is glass's `text` Button with a lucide `ExternalLink` glyph, set on the card's text column. The local touch-floor rule is deleted, because glass owns it. |
| DS-F3-C13 | The phase is an inline `Metric` ("PHASE idle"); the tone is on its ink only, using the hue-chip ink recipe. The four readings take two rows at every width. |
| DS-F3-C14 | The Function layer's caption follows the rendered series' variable (`seriesVariable`, now f(t)), which is already the plot's and the legend's. |
| DS-F3-C15 | There is one labelled count, "all 21 harmonics, n = −20…20" (UIA-F-35's unit). The unlabelled "12 / 41" and the "(41 total)" are deleted. Bars grow from a square baseline with near-square ends and a 1 px minimum. |
| DS-F3-C16 | The teleport overlay's dead radial layer is deleted; the overlay is `var(--background)`. |
| DS-F3-C9, C10 | Cured at the latex-paper root (`aa244de`). The section divider is a flat 1 px rule at 25% of the section hue. The theorem block is `border-radius: 0 .5rem .5rem 0`. **The fourier repin is owed** (with DS-F-C3), so the served frames still show the old rule. |

**Glass-owned, left honest-RED, nothing overridden locally.**
- DS-F3-G1 (the dock ring and the floating "×"): O-88 DOCK-COLLAPSE-MOTION, the same row as DS-F-G7. `f-w14v-pd` "collapsed" ×6 is its standing RED.
- DS-F3-G2 (the current route is unmarked in the menu): O-59.
- DS-F3-G3 (cool floating surfaces over the warm paper) and DS-F3-G4 (the capsule hover ring): O-87 FLAT-LIGHTING. Both are to be re-judged at the 10.2.0 repin.

**Census** (`pass-03/census-after.json`; base: the committed tree, fourier `7ba52ec`, served from a clean worktree). These are the same 7 routes as pass 2 (28 cells).

| row | pass 2 | pass 3 |
|---|---|---|
| shadow elements | 428 | 424 |
| shadow layers | 1098 | 1086 |
| multi-layer stacks | 334 | 330 |
| inset highlights | 332 | 328 |
| backdrop blur | 260 | 256 |
| control gradients | 0 | 0 |
| looping chrome | 0 | 0 |

The four fewer stacks come from the `NotFoundCard` and `/v` error cards' controls. The rest is glass's recipe (O-87).

Static (`web/src`):
- gradients 9 → 8: the overlay radial is deleted, and the edge-cue mask is added;
- box-shadow declarations 4, unchanged;
- `@keyframes` 2 → 3: `math-edge-cue` is scroll-driven, not looping.

**Frames.** `evidence/DS/fourier/pass-03/` holds:
- 28 route frames;
- the critic's cells, recaptured with `cells.mjs`: `v-epicycle-hover`, `v-stage-dock-expanded`, `v-anim-dock-expanded`, `paper-deep` (1440 and 390), `paper-deeper`, `eq-info-button`, `eq-coeffs-open`, `gallery-card-hover`, and `morph-bottom` (1440 and 390), in both themes;
- `about-card-*` and `not-found-*`.

All are headless real Chrome, served from the committed tree.

**Gates** (on the committed tree, served from a clean worktree at `:3112`):
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice. latex-paper `vitest`: 127/127.
- e2e: 38 affected specs, chromium plus mobile-chromium, headless, 3 workers, 361 tests. Run 1: 348/361. Run 2: 349/361.
  - Both runs share 11 failures, and all are pre-existing:
    - `f-w14v-pd` collapsed ×6 (O-88, red at the pre-cure tree `d6bdc97` too);
    - `f-w14v-p` p3 @1024 (red at `d6bdc97`, at 1440 as well);
    - `f-w14v-au3` L1-12 (ESC-au3-1);
    - `visual-checkpoint` 1·6·7, 2 and 5 (the owed `card-*` goldens).
  - Three tests failed once each, under load: `f-w14u-d` d2 (run 1), `f-w14u-vedit` v83 (run 1) and `f-w14u-vstage` e169 (run 2). Each was isolated, twice on the cure and twice on `d6bdc97`: vstage and vedit passed all four runs, and d2 flaked once on each tree.
  - The first run, before `6278475`, also found two real regressions, both cured in `6278475`: A2-FO-L1-1 (the fluid rung) and `f-w14v-u2` (the renamed hook).
- **Named owner-ruling re-baseline (§0ej), `7ba52ec`.** Both diffs were read:
  - `checkpoint-disclosure-body`: exactly C14 (the "f(t)" caption) plus C7 (Auto's tone);
  - `checkpoint-tooltip-trigger` (mobile): exactly C7.

**Left in the fourier tree, not this seat's.**
- The orphan hunks in `GalleryDraftsSection.vue`, `GalleryView.vue`, `PaperView.vue` (`shadow` dropped from the article Card) and `stores/gallery.ts`.
- Another seat's staged contour deletions, preserved in the index.

### pass 2

*(This is the re-deployed loop's pass 2: the cure for the 2026-10-08 critic, findings DS-F4R-*. The critic's frames are `evidence/DS/fourier/critic-2026-10-08/`. The AFTER frames are in `evidence/DS/fourier/pass-02/f4r/`, because `pass-02/` already holds the first pass 2's frames.)*

**Commits.**
- fourier, on `m/w1-bump-migration`, pushed fast-forward `4961935..8665cdb`:
  - `013073d`: the cure, 11 source files plus the `f-w14v-au5` instrument. It was committed through a temporary index (HEAD plus this seat's hunks, 3-way merged). The dead pass-4 seat's DS-F4-* orphan hunks (2026-10-07, 14:22–14:29) and the pass-2 orphans stay in the tree, uncommitted.
  - `8665cdb`: a named golden re-baseline.
- value.js `65d9ff856`: AFTER frames, census and e2e listings.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F4R-C1 | The ToC plate keys on `data-leaf` (`isActive`), not on any `aria-current`. A chapter on the active chain keeps the hue ink only, so one row reads as selected (frame `paper-mid-*-1440`: "1.2. A Solution" alone carries the plate). |
| DS-F4R-C2 | `SliderControl`'s one track rule paints the fill as a centred 0.375rem rule (glass's own track fallback): the hue at 55% over `--muted-medium`, with the rest of the 24px track clear. The md thumb keeps the hue at full strength. This is one rule, and every slider follows it. |
| DS-F4R-C3 | Card titles (`MorphPhaseConfig`, `HarmonicLevelGrid`) are at weight 500, under the display title at 400. From 1280px the three phases sit three across and the levels card spans the row beneath, with no wrapper (`morph-light-1440`: all four cards are above the fold). |
| DS-F4R-C4 | Below 1024px the readings stand in one column beside the plate, and the plate is capped at 22svh. The sticky band measures about 318 of 844 px (38%, `morph-scrolled-*-390`). It was 450. |
| DS-F4R-C5 | The legend count ("123 of 401 circles", "N = …") is a caption: regular 13px, in `--muted-foreground` read from the canvas at draw time, so a theme switch re-inks it. The literal grey remains only as the parse fallback. |
| DS-F4R-C6 | The rim is kept, not dropped, because UIA-F-157's ruled rim test stands. It takes the active chapter's section hue through `ScrollProgressRim`'s own `stops` prop, so it is violet while reading ch. 1 (`paper-mid-*`). Its geometry is glass's. |
| DS-F4R-C7 | "Browse the gallery" is a md quiet Button inside the drop zone, under the primary and its format line. **Residual:** at 390 glass's coarse floor still enlarges it, as it does "Choose an image" (the DS-F2-G3 coarse-type relay). |
| DS-F4R-C8 | Below 6px on-screen radius, the remaining arms are one 1px polyline in the tail's hue, with no circles and no dots. The tip is a thin line, not a blob (`v-paused-*`). The hues are kept. |
| DS-F4R-C9 | The Function layer's f(t) caption is set in `--font-serif-math` italic, matching the formula. The other captions stay mono. |

**Glass-owned, cited, not overridden.**
- DS-F4R-G1 (the dock's plate and cast radii part during the morph): **O-88** DOCK-COLLAPSE-MOTION, with O-87 for the cast.
- DS-F4R-G2 (the flat primary/secondary ladder): **O-87** FLAT-LIGHTING.

**Census** (`pass-02/f4r/census-after.json`, served from the cure tree). The computed sum equals pass 3's:

| metric | value |
|---|---|
| shadow elements | 424 |
| shadow layers | 1086 |
| multi-layer stacks | 330 |
| inset highlights | 328 |
| backdrop blur | 256 |
| control gradients | 0 |
| looping chrome | 0 |

The static half is unchanged (4 box-shadow declarations, 8 gradients, 3 keyframes). The cure moved no lighting. Everything left is glass's recipe (O-87).

An earlier census pass showed +6 elements on `/gallery` (dark 1440, 390). That was data, not chrome: more seeded cards in the shared dev DB.

**Gates.** The cure tree is HEAD plus this seat's hunks in a clean detached worktree, served on `:3113` with its own vite cache.
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e: 47 affected specs, chromium plus mobile-chromium, headless, 3 workers, 430 tests. Run A: 409 passed, 18 failed. Run B: 409 passed, 18 failed.
  - Pre-existing in both runs:
    - `f-w14v-pd` collapsed ×6 (O-88);
    - `f-w14v-au3` L1-12 (ESC-au3-1);
    - `visual-checkpoint` 1·6·7, 2 and 5 (the owed `card-*` goldens);
    - `contrast-floor` ×3 and `f-w14v-c3` c3m/c3g. These five fail identically on HEAD `4961935`, served on `:3114` (`e2e-head-baseline.log`).
  - Known flakes, each in one run: `f-w14u-d` d2 (A light and dark, B dark) and `f-w14u-vstage` e169 (B). Both are recorded as flaky on both trees at pass 3.
  - This cure's own failures, both resolved:
    - `visual-checkpoint` item 3 is the named re-baseline below.
    - `f-w14v-au5` L1-19 failed because /morph now fits at 1440×900, which is C3's aim. Its window is re-aimed to 1440×600 with the assertions unchanged, and it is green.
  - An earlier run (void) served without the symlinked `node_modules` on vite's allow list, so KaTeX fonts returned 403 (`paper-performance`, `vedit` 390). The server was fixed, and the frames and both runs were re-taken after it.
- **Named owner-ruling re-baseline (§0ej), `8665cdb`:** `checkpoint-disclosure-body`. The diff was read: it is exactly C9 (the f(t) face) plus C2 (the Harmonics rule). It is green twice after.

**Frames** (`pass-02/f4r/`): 56 frames from the critic's own `capture.mjs` and `cells2.mjs`, re-aimed at `:3113`. They are headless real Chrome (§0ei).

### pass 3

*(This is the re-deployed loop's pass 3: the cure for the critic F5 findings, DS-F5-*. The critic judged the pass 2 F4R AFTER frames, `evidence/DS/fourier/pass-02/f4r/`. The AFTER frames are in `evidence/DS/fourier/pass-03/f5/`, because `pass-03/` already holds the first pass 3's frames.)*

**Commits.**
- fourier, on `m/w1-bump-migration`, pushed fast-forward `92c57cf..dc64212`:
  - `72b73e6`: the cure, 6 source files, committed by pathspec. It folds two uncommitted orphan hunks on purpose: DS-F4-C1 (SliderControl's label, FunctionInput's Notation) and DS-F4-C2 (the morph band's bleed and layers). Each of the 6 files was only orphan hunks plus this cure, so nothing of another seat's was taken.
  - `dc64212`: a named golden re-baseline.
- latex-paper `16709a1` (DS-F5-C6), local on `master`. Not pushed, not published.
- value.js `2b816d10f`: AFTER frames, census, probes and e2e listings.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F5-C1 | `SliderControl`'s unfilled stop is glass's hairline tint `--surface-tint-15` (the foreground at 15%) instead of `--muted-medium`, which in light was the card's own tone. The 0.375rem rule now has a visible extent in both themes, with one geometry. The 55% hue fill and the full-hue thumb stay. |
| DS-F5-C2 | `.control-row-label` loses its local size and weight, so it takes glass `Label`'s rung, the same one LabeledField uses. Notation is a `LabeledField`, and the morph card's Easing label is a glass `Label`. Measured: every peer label is 14.54px/500 at 1440 and 18.62px/500 at 390, on /equation and on /morph. |
| DS-F5-C3 | From 1280px each phase subtitle holds `2lh`, so the rows line up across the three cards: the subtitle, Duration and Easing rows sit at 248, 297 and 377 px in all three (`morph-light-1440`). Shared subgrid rows were tried first. glass Card's `contain: paint` makes each card an independent formatting context, so a card cannot be a subgrid; that containment is glass's. |
| DS-F5-C4 | Below 1024px the band bleeds over the page gutter (0 to 390), carries the shell's own layers (`.paper-texture` ground plus glass `.paper-grid`, both fixed), and ends on one `--border-soft` hairline. With the cards hidden, band and page ground measure identical: (250,249,247) in light and (15,14,13) in dark. The darker gutter beside the cards in the critic's frame is the glass card's cast (O-87). |
| DS-F5-C5 | Below 1024px the readings column is `flex: 1; min-width: 0`, and the plate is `min(22svh, 100% − gap − 9rem)`. The phase value's 10ch reservation is dropped in the one-column form, and the actions start on the plate's edge. "total 350 ms" now ends at x = 338 of 374, where it used to reach 374 or beyond. The coarse Metric label size is glass's (the DS-F2-G3 relay). |
| DS-F5-C6 | Cured at the latex-paper root (`16709a1`): `.section-header--sub` gets `margin-top: 1.5rem` and the chapter header gets `2rem`, with the bottom kept tight. This folds the orphan DS-F4-C5 hunk, a sibling rule that never matched, because fourier's `PaperArticleWindow` wraps each section in its own `.paper-window-section`. Measured with the rule injected into the served /paper (`cure/c6-probe.mjs`): "1.2.1" moves from about 8 px above and 22 px below to about 32 above and 22 below at 1440, and from 24 above to 48 above (22 below) at 390. Served frames still show 0.2.1, because the repin is owed (C7). |
| DS-F5-C8 | The gallery track floor is `16rem`. At 1440 the cards are 272 px, and all four slugs and dates are whole. **Residual:** with 4 results the grid still has a fifth empty track. auto-fill is kept, as the cure asked. |

**Refused, with reason.**
- DS-F5-C7 (land the owed latex-paper repin): a repin needs a latex-paper release. `npm whoami` returns E401, so publishing is an owner act, and this seat has no authority to push latex-paper. The release must carry `9e0200f`, `aa244de` and `16709a1`, followed by a re-capture of /paper.

**Glass-owned, cited, not overridden.**
- DS-F5-G1 (the pointer-tracked specular bloom on the detached Configurator's stage and aside): **O-87** FLAT-LIGHTING, to re-judge at the 10.2.0 repin.
- DS-F5-G2 (the 24px track well's lone inset top edge around the rule): **O-87**. The consumer half is C1.

**Census** (`pass-03/f5/census-after.json`, from fourier `scripts/ds-census.mjs`, served from the cure tree). The computed sum is identical to pass 2 F4R:

| metric | value |
|---|---|
| shadow elements | 424 |
| shadow layers | 1086 |
| multi-layer stacks | 330 |
| inset highlights | 328 |
| backdrop blur | 256 |
| control gradients | 0 |
| looping chrome | 0 |

The static half is unchanged (4 box-shadow declarations, 8 gradients, 3 keyframes). The cure adds one hairline border and moves no lighting. Everything left is glass's recipe (O-87).

**Gates.** The cure tree is HEAD plus this seat's hunks in a clean detached worktree, served on `:3115`. The HEAD baseline is a second clean worktree on `:3116`.
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice. latex-paper `vitest`: 127/127.
- e2e: 55 affected specs (pass 2's 47 plus every spec that touches /morph, /gallery, /equation or the changed selectors), chromium plus mobile-chromium, headless, 3 workers.
  - Run A: 500 passed, 26 failed. Run B: 492 passed, 34 failed.
  - Pre-existing, as at pass 2: `f-w14v-pd` collapsed ×6 (O-88), `f-w14v-au3` L1-12, `visual-checkpoint` 1·6·7, 2 and 5, `contrast-floor` ×3, and `f-w14v-c3` c3m/c3g.
  - These also fail on HEAD on `:3116` (`e2e-head-baseline.log`):
    - `equation-interaction`, `f-w13-radius` frame 5, `f-w14-uia` 634 ×2 and 657, `f-w14u-vedit` v83/v177, `f-w14v-au3` L1-6, `f-w14v-p` p3 and `gallery-admin-a11y` ×4;
    - the /equation set times out waiting on the shared API's compute and simplify responses (`.katex` never appears, `waitForResponse` 30 s).
  - Flakes in one run only:
    - `f-w14v-eq2` ×7 (run B): the same `.katex` load timeout. It is green in run A and on HEAD.
    - `f-w14u-d` d2 (run B): recorded as flaky at pass 3.
  - This cure's own failure: `visual-checkpoint` item 3, which is the named re-baseline below.
- **Named owner-ruling re-baseline (§0ej), `dc64212`:** `checkpoint-disclosure-body`. The diff was read: 206 px, which is exactly the "Harmonics" label moving onto glass Label's rung (C2). It is green twice after.

**Frames** (`pass-03/f5/`): 56 frames from the critic's own `capture.mjs` and `cells2.mjs`, re-aimed at `:3115`, plus the probe frames `cure/probe-morph-scrolled-*-390.png`. All were captured in headless real Chrome (§0ei).

### pass 4

*(The re-deployed loop's pass 4: the cure for the critic F6 findings, DS-F6-*. The critic's frames are in `evidence/DS/fourier/pass-04/critic-f6/`; the AFTER frames are in `evidence/DS/fourier/pass-04/f6/`.)*

**Commits.**
- fourier `2ebca43`, on `m/w1-bump-migration`, pushed fast-forward `cf5e950..2ebca43`. Two files. `VisualizationView.vue` also carries another seat's uncommitted hunks (DS-F4-C8/C9), so only this cure's hunk was staged (an index blob of HEAD plus the cure) and those hunks stay in the working tree.
- value.js `a973862c6`: AFTER frames, the cure probe, the census and the e2e logs.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F6-C1 | The sheet form's inactive aside now takes no box: `.configurator-aside:has(.viz-panel-left-wrap.panel-inactive)` joins the existing inactive-stage rule. This mirrors the rule /equation already had, with the same `panel-inactive` marker. Measured (`f6/cure/f6-cure-probe.json`): with the Canvas tab up at 390, the aside is `display: none` on /v and /equation, light and dark, and `elementFromPoint(200, 836..841)` hits only the stage card and the workspace. The 838–840 rule is gone. With the Controls tab up, the aside is unchanged (flex, 703 px) and the stage stays `none`. |
| DS-F6-C2 | Deleted the trailing `DropdownMenuSeparator` (and its import) from `EasingPicker.vue`. The More options menu has one separator, at y 508, between Speed and Easing. Its last child is the Easing group, which ends at 814 on the plate's own padding (plate bottom 827). |

**Glass-owned, cited, not overridden.**
- DS-F6-G1 (the collapsed transport's floating `1 ×` Metric, with the unit stranded from its digit and the summary outside the plate): **O-88** DOCK-COLLAPSE-MOTION, which folds O-65.
- DS-F6-G2 (the doubled inner ring in the /v stage toolbar's expand, at 1440 and on the 390 transport pill): **O-88**, with O-87 for the cast. The witness widens from DS-F4R-G1's /equation 390 to the /v stage toolbar at 1440.
- DS-F6-G3 (the dark glow halo on `.curve-tooltip.glass-floating`): **O-87**. fourier paints no cast there.
- DS-F6-G4 (the pointer-tracked specular bloom on /equation's stage): **O-87**. This widens DS-F5-G1's witness, to re-judge at the 10.2.0 repin.
- DS-F6-G5 (the /gallery filter popover's cool lens and grey resting chips): **O-87**, via the less-blur token and the material refinement at 10.2.0. Honest-RED.
- DS-F6-G6 (EasingCurve's dashed frame and its `0`/`1` captions at w-6): **O-87** relay, asking for a bare-curve size or variant. No local CSS.

**Census** (`pass-04/f6/census-after.json`, from fourier `scripts/ds-census.mjs`, served from the cure tree). It is identical to pass 3: shadow elements 424, layers 1086, multi-layer stacks 330, inset highlights 328, backdrop blur 256, control gradients 0, looping chrome 0. The static half is also unchanged (4 box-shadow declarations, 8 gradients, 3 keyframes). The cure removes a box and a separator and moves no lighting. What remains is glass's recipe (O-87).

**Gates.** The cure tree is HEAD plus this seat's hunks in a clean detached worktree, served on `:3117`. A clean HEAD worktree on `:3118` is the baseline.
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e: 26 affected specs (`f6/e2e-specs.txt`: every spec that touches the Configurator sheet, the Canvas/Controls tabs, the transport's More options menu or the easing), chromium plus mobile-chromium, headless, 3 workers.
  - Run A: 232 passed, 17 failed. Run B: 232 passed, 18 failed.
  - Failing in both runs, and also failing on HEAD `:3118` (`f6/e2e-head-baseline.log`): `f-w14v-pd` collapsed ×6 (O-88), `f-w14v-c3` c3m/c3g, `f-w14v-p` p3, and `visual-checkpoint` items 1·6·7, 2 and 5.
  - Failing in one run only (load flakes under concurrent seats on the shared API):
    - run A: `f-w14v-eq2` q1, q2 and frames 1440 light (`.katex` never loads), `f-w14v-u4` u170, and `visualization-crud` mobile (a `page.evaluate` timeout on the PATCH);
    - run B: `f-w14-uia` 634 ×2 and 657, `f-w14u-vedit` v83/v177 (both pre-existing on HEAD at pass 3), and `visualization-ux` save_contour_then_recompute.
    - u170, crud and save_contour were re-run alone on both trees and passed 5/5 on each.
  - No visual golden was re-baselined.

**Frames** (`pass-04/f6/`): 56 route and cell frames from the critic's own `capture.mjs` and `cells2.mjs`, plus 27 probe frames from `f6-probe.mjs` and `f6-probe3.mjs` (`probe/`: `v-canvas-tab-*-390`, `eq-canvas-tab-light-390`, `v-moremenu-*-1440`, `v-viewmenu-*-1440` and the rest), plus the cure probe's own frames (`cure/`), all re-aimed at `:3117`. All were captured in headless real Chrome (§0ei).

### pass 5

*(The re-deployed loop's pass 5: the cure for the critic F7 findings, DS-F7-*. The critic's frames are in `evidence/DS/fourier/pass-05/critic-f7/`; the AFTER frames are in `evidence/DS/fourier/pass-05/f7/`.)*

**Commits.**
- fourier `9a73776`, on `m/w1-bump-migration`, pushed fast-forward `4ed2df6..9a73776`. 16 files, committed by pathspec. The F.CT seat's uncommitted contour files (`drawing.py`, `test_contour_strokes.py`) were left alone.
- latex-paper `5166529` (DS-F7-C1, DS-F7-C4), local on `master` with a 0.3.0 `minor` changeset. Not pushed and not published: publishing is an owner act (npm E401), and this seat has no push authority for latex-paper. The release must carry `9e0200f`, `aa244de`, `16709a1` and `5166529`.
- value.js `32a2b784b`: AFTER frames, cure probes, census and e2e logs.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F7-C1 | **Root:** latex-paper `5166529` reads every colour as a full colour: `var(--token)`, with alpha as `color-mix(in srgb, var(--token) N%, transparent)`. There were 39 `hsl(var(--…))` sites. The display equation's hover rule-bar is deleted, along with its transparent border and transition. **Served (0.2.1 until the repin):** one bridge block in fourier `style.css` under `article.paper-article`, marked to be deleted at the 0.3.0 repin, restates the root's result. Measured (`f7/cure/c1-probe.json`, `f7/probe.json`): `.math-block` hover border is `0px`. The theorem rule and label are `--primary` (light: fourier's ink primary `hsl(24 10% 10%)`, by token rather than by fallback; dark: `oklch(0.739 0.134 318.1)`), with definitions and examples in `--accent-pink` and lemmas and asides in `--muted-foreground`. The sticky chapter and sub headers compute `rgb(253,245,236)` / `rgb(53,42,34)`, the article's own tone. Before, they computed `rgba(0,0,0,0)`. |
| DS-F7-C2 | No cast at rest or on hover, no transform and no transition. Corners are `0 .5rem .5rem 0`, so the left rule runs straight. The root has had this since `9e0200f`/`aa244de`; the bridge restates it. Measured: `box-shadow: none`, `transform: none` on hover, in both themes. |
| DS-F7-C3 | `::before` is `content: none` (bridge). The root deleted it in `9e0200f`. |
| DS-F7-C4 | `.section-header--sub { margin-top: 2.5rem }`, at the root (raised from 1.5rem) and in the bridge. Measured (`f7/cure/c4-probe.json`): "1.1" and "1.2.1" sit **40 px** under the content above and **20 px** over their own text, at 1440 and 390, light and dark. |
| DS-F7-C5 | The divider is a flat 1px `color-mix(… 25%, transparent)` of the section hue. The root has had this since `aa244de`; the bridge restates it. Measured: `background-image: none`. |
| DS-F7-C6 | The 390 legend inset is keyed on the canvas dock's state: `.canvas-stage[data-dock-expanded]`, set from the view's `dockExpanded`. BasisCanvas exposes `readInsets()`, and the view calls it when the dock toggles, because the inset had only been read on resize. Measured (`f7/cure/c6-probe.json`): collapsed, the inset is 16 px and the caption shares the toolbar row (`cure/v-canvas-tab-*-390.png`); expanded (dock 348 px wide), it is 79 px and the caption clears the dock (`cure/v-canvas-tab-expanded-*-390.png`). |
| DS-F7-C7 | Ownership: the hunks belonged to the dead pass-2 seat (2026-10-06) and the dead first-loop pass-4 seat (2026-10-07). Neither was alive after the limit reset, and no receipt claims them. This seat **adopted** them deliberately in `9a73776`: P2-01, P2-18, the article Card's `shadow` drop, and DS-F4-C2, C3, C4, C6, C7, C8 and C9. One assertion followed P2-01: `f-w14u-gallery` g248 reads the hover's paint as cast plus `background-image`, because the hover is now a tone step (the gallery card's idiom) rather than a cast. All gates below ran on a clean worktree of exactly this commit, served on `:3120`. |

**Not cured.** DS-F7-N1 (trivial: the a + b series scrolls in its fading scroller) needs no cure.

**Census** (`f7/census-after.json`, fourier `scripts/ds-census.mjs` served from the clean cure tree on `:3120`).

| metric | pass 4 | pass 5 |
|---|---|---|
| shadow elements | 424 | **420** |
| shadow layers | 1086 | **1076** |
| multi-layer stacks | 330 | **326** |
| inset highlights | 328 | **326** |
| backdrop blur | 256 | **254** |
| control gradients | 0 | 0 |
| looping chrome | 0 | 0 |

- The computed drop comes from the paper Card and draft card casts and the theorem block's stack.
- Static: the scan now includes the served latex-paper theme (C1). It reads 8 box-shadow declarations: 4 of fourier's focus and selection rings, plus 4 in the served 0.2.1 theorem recipe. It reads 10 gradients: fourier's 8, plus the draft card's flat hover tint written as a gradient layer (the gallery card's idiom), plus 0.2.1's three-stop divider.
- The 0.2.1 theme's 4 casts and its divider are neutralised in the served page by the bridge, and they leave the static count at the 0.3.0 repin, where the root carries 0 casts and 0 gradients.

**Gates.** The cure tree is this commit in a clean detached worktree on `:3120`. A clean HEAD (`4ed2df6`) worktree on `:3119` is the baseline.
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice. latex-paper `vitest`: 127/127.
- e2e: 25 affected specs (`f7/e2e-specs.txt`), chromium plus mobile-chromium, headless, 3 workers.
  - Run A: 217 passed, 16 failed. Run B: 218 passed, 16 failed.
  - Failing in both runs, all also failing on HEAD:
    - `contrast-floor` ×3, `equation-interaction`, `f-w14v-p` p3, `gallery-admin-a11y` ×4 and `visual-checkpoint` 1·6·7, 2 and 5 (all as at passes 3 and 4);
    - `paper-performance` 235, which also fails on the HEAD worktree (`e2e-head-baseline-2.log`). It is an instrument fault: a worktree's symlinked `node_modules` lies outside vite's allow list, so the KaTeX fonts return 403.
  - Failing in one run only:
    - run A: `visualization-ux` 128/145 and `visualization-crud` mobile. Re-run alone with `--repeat-each=2`, they pass 10/10 (`e2e-cure-rerun-flakes.log`);
    - run B: `f-w14-uia` 634 ×2 and 657, pre-existing on HEAD at pass 3.
  - No visual golden was re-baselined.
  - A void run 0 on the shared `:3100` dev server (`e2e-run0-devserver3100.txt`) failed the admin `f-w14-uia` 411/434/457 tests (empty Users tab). Served fresh from the same tree on `:3120`, they pass 3/3, and they also pass on HEAD, so the cause was the dev server's state.
- **Disclosure:** to narrow a too-broad first run, this seat ran `pkill -f "playwright test"`. That may also have ended another seat's Playwright run on this machine. Later stops were by PID or port only.

**Frames** (`pass-05/f7/`). All were captured in headless real Chrome (§0ei):
- the critic's own `probe.mjs`, `probe2.mjs` and `probe3.mjs`, re-run for the same cells: `theorem-*-1440`, `theorem-hover-*-1440`, `mathblock-hover-light`, `paper-sticky-*`, `eq-ab-*-1440` and `morph-scrolled-*-390`;
- the cure probes' frames: `cure/sub-11-*` and `cure/sub-121-*` at 1440 and 390, `cure/v-canvas-tab-*-390` and `cure/v-canvas-tab-expanded-*-390`.

### pass 6

*(The re-deployed loop's pass 6: the cure for the critic F8 findings, DS-F8-*. The critic's frames are in `evidence/DS/fourier/pass-06/critic-f8/`; the AFTER frames are in `evidence/DS/fourier/pass-06/f8/`.)*

**Commits.**
- fourier `a57e535` and `ed6a70a`, on `m/w1-bump-migration`, pushed fast-forward `74aac87..ed6a70a`. 16 files, committed by pathspec. The F.CT seat's uncommitted contour files (`drawing.py`, `parts.py`) were left alone.
- latex-paper `c7ebc52` (DS-F8-C1, C3, C5), local on `master`; the 0.3.0 changeset is extended. Not pushed and not published (an owner act, as at pass 5). The release must now also carry `c7ebc52`.
- value.js `224e90aa8`: AFTER frames, the cure probe, census and e2e logs.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F8-C1 | **Root:** latex-paper `c7ebc52` reads the theorem, proposition and corollary rule and label as `var(--theorem-accent, var(--primary))`, an optional token documented in the theme header. **fourier:** `article.paper-article { --theorem-accent: var(--section-color-7) }`, outside the bridge (it is fourier's lasting binding), and the 0.2.1 bridge's `--theorem-hue` reads it. Measured (`f8/f7-cells/probe.json`): light `3px solid oklch(0.532 0.18 317.5)`, where pass 5 was ink `rgb(28,25,23)`; dark keeps `oklch(0.739 0.134 318.1)`. One violet in both themes. Definitions and examples keep `--accent-pink`; lemmas and asides keep `--muted-foreground`. |
| DS-F8-C2 | Every live `text-sm`/`text-xs` (dead under glass's `bridges.css` `--text-sm/--text-xs: initial`) now uses glass's steps. Template sites take `text-small`/`text-caption`; `@apply text-sm` takes `font-size: var(--type-small)`. That covers PaperTocBar, PaperSearchResultRow, PaperSearchDropdown, PaperArticleWindow, GalleryFeaturedCarousel, GalleryView, GalleryDraftsSection, ContourSettings and CoefficientsSpectrum. Three sites were judged individually: the ToC drawer's uppercase CONTENTS eyebrow takes `--type-caption`; the 16 px overlay badge takes `--type-micro`; and CoefficientsSpectrum's Button `text-xs` is deleted, since the Button's glass sm step already sets the size. The other files the critic named (HarmonicLevelGrid, MorphPhaseConfig, AppDock, AdminUserToolbar) only mention the utilities in comments and have no live use. **The dialog:** DialogTitle drops `text-xl` and takes glass's dialog-title step. The section headings move from `0.875rem` to `--type-small`, sharing that step with "Harmonics", and the heading leads by weight. The views readout (`.modal-stat`) takes `--control-text-sm`. `.like-btn`'s local `0.875rem` override of glass's sm step is deleted (`ed6a70a`). Measured (`f8/cure/f8-cure-probe.json`, both themes): title 23.67 px over description 18.61 px; views 14.384 = like 14.384; Decomposition 16.4/600 and Harmonics 16.4/400. Before: views 18.6 against like 14, Harmonics 18.6 over the heading's 14, and title 20 against description 18.6. `--text-sm` is not re-declared locally. |
| DS-F8-C3 | `.math-block__number { font-style: normal }` at the root (`c7ebc52`), with one line in the bridge. Measured (`f8/probe3.json`): `(1.1)` inside Theorem 1.1 is `normal` Fira Code. Pass 5 measured it `italic`. |
| DS-F8-C4 | The phone bar renders one crumb. With a leaf active it shows the leaf, whose number names the chapter; otherwise it shows the chapter with its title. The chapter numeral, the `›` `::before`, the `:has(+ --leaf)` rule and the `--leaf` muted style are deleted. Measured: `["1.2.A Solution"]` in both themes (`cure/paper-119-*-390.png`). **Assertion:** `f-w14u-paper` UIA-F-236 counted 2 crumbs, a count tied to the deleted structure. It now requires the one crumb's number to be a section number with at least two components. A chapter-only bar ("1.") still fails, so the "reports chapter and section" intent is kept. |
| DS-F8-C5 | **/paper:** below 40rem the `.math-block` grid is one column and the number sits under its display, end-aligned. This is at the root (`c7ebc52`) and in the bridge. Measured at 390: eq (1.19) `scrollWidth 308 = clientWidth 308`, so it no longer overflows, the full `= 0` shows, and `(1.19)` sits below it. The fade there was already scroll-driven: no overflow means no timeline, so no mask. **/equation:** the a+b FadingScroll sets glass's own `--fade-scroll-width: 2rem` (from 1rem). Its fade is already shown only while ink lies past that edge (glass's `scroll(self inline)` ranges). Not done: ending the a+b line on a term boundary, since KaTeX's single-line series has no break to choose; the 2rem fade is the cue. |

**Glass-owned, cited, not overridden.**
- DS-F8-G1 (in dark, every glass resting shadow is mixed from the light `--foreground`, because dark-arm.css overrides `--shadow` but not `--shadow-color`; the gallery card's six-layer stack paints a light halo): **O-87** FLAT-LIGHTING. It needs a dark `--shadow-color` and a single-edge `--card-cast`, and is re-judged at the 10.2.0 repin. It widens DS-F6-G3's witness to every glass-resting card. No consumer override.

**Census** (`f8/census-after.json`, fourier `scripts/ds-census.mjs` on `:3100`, which serves this checkout). Identical to pass 5: shadow elements 420, layers 1076, multi-layer stacks 326, inset highlights 326, backdrop blur 254, control gradients 0, looping chrome 0. Static: 8 box-shadow declarations, 10 gradients, 3 keyframes. This pass moves type, hue and layout, not lighting. What remains is glass's recipe (O-87, with G1).

**Gates.** All runs used the `:3100` dev server, which serves this checkout. Its only other dirty files are the F.CT seat's Python, which no web route reads.
- `vue-tsc -b`: 0, three times. `vitest run`: 116/116, three times. latex-paper `vitest`: 127/127.
- e2e: the pass-5 list of 25 specs (`f8/e2e-specs.txt`), chromium plus mobile-chromium, headless, 3 workers.
  - Run A: 220 passed, 15 failed. Run B: 221 passed, 14 failed.
  - Every failure is on pass 5's pre-existing list: `contrast-floor` ×3, `f-w14-uia` 411/434/457 (the dev server's empty Users tab, as at pass 5), `f-w14v-p` p3, `gallery-admin-a11y` ×4, and `visual-checkpoint` 1·6·7, 2 and 5. Item 5, the card dialog, fails for the same reason as at pass 5: `toBeVisible`, element not found. `equation-interaction` failed in run A only; it is pre-existing at pass 5.
  - After `ed6a70a`: `f-w14u-gallery`, `gallery` and `visual-checkpoint` ×2 gave 29 passed and 3 failed per run, the same three visual-checkpoint items.
  - No visual golden was re-baselined.

**Frames** (`pass-06/f8/`). All were captured in headless real Chrome (§0ei):
- the critic's `probe.mjs`, `probe2.mjs` and `probe3.mjs`, re-run for the same cells: gallery, gallery hover, morph, visualize and its hovers, and the v-item set;
- the pass-5 cells in `f7-cells/`: `theorem-*-1440`, `theorem-hover-*`, `eq-ab-*-1440` and `morph-scrolled-*-390`;
- `cure/sub-11-*` and `cure/sub-121-*` at 1440 and 390;
- `cure/f8-cure-probe.mjs` with its frames: `modal-*-1440` and `paper-119-*-390`.

### pass 7

*(The re-deployed loop's pass 7: the cure for the critic F9 findings, DS-F9-*. The AFTER frames are in `evidence/DS/fourier/pass-07/`.)*

**Commits.**
- fourier `22e83e6`, on `m/w1-bump-migration`, pushed fast-forward `bd083b0..22e83e6`. 5 files, committed by pathspec. The F.CT seat's uncommitted contour files (`drawing.py`, `parts.py`, `test_contour_strokes.py`) were left alone.
- latex-paper `5be04ae` (DS-F9-C2, C3, C6), local on `master`; the 0.3.0 changeset is extended. Not pushed and not published (an owner act, as at passes 5 and 6). The release must now also carry `5be04ae`.
- value.js `dc7943c40`: AFTER frames, the cure probe, census and e2e logs.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F9-C1 | The tiles take `emphasis="quiet"`. Their own 1.5px border and `--card` fill define them, so they carry no capsule cast or bevel. The hover `scale(1.04)` is deleted; the border tone step stays, and `:active scale(0.96)` stays as press feedback. No local box-shadow. Measured on an unbound tile (`f9-cure-probe.json`), both themes: `box-shadow: none` at rest and on hover, `transform: none` on hover, border 50% ink stepping to 50% `--accent-red`. The band under the strip is gone (`morph-*-1440`, `morph-tilehover-*-1440`). |
| DS-F9-C2 | **Root:** latex-paper `5be04ae` restates `ol.paper-list { list-style: decimal }` and `ul.paper-list { list-style: disc }`, with a `--muted-foreground` `::marker`. **fourier:** three lines in the 0.2.1 bridge (deleted at the 0.3.0 repin). Measured: `ol` and `li` `decimal` in both themes; the four prerequisites read 1. to 4. (`paper-list-*-1440`). The optional mono numeral was not added. |
| DS-F9-C3 | **Root:** latex-paper `5be04ae`. `splitOnItem` dropped the `\item` command itself, so the description parser never saw its `[term]`. `splitItems` now keeps each item's command beside its body, and the description parser reads `item.optArgs[0]`. A parse test covers the form (`\item[Fourier Series]`, `\item[Fourier Transform]`). latex-paper vitest 128/128. **Served:** still `<dt></dt>` in both themes (`paper-top-*-1440`), because fourier parses through 0.2.1. The term is content, so it rides the 0.3.0 repin with no fourier-side shim, as the finding rules. **HONEST-RED until the repin.** |
| DS-F9-C4 | The 0.78rem fine-pointer arm is deleted, and so is the `max(1rem, 0.78rem)` iOS floor that existed only to undo it. The field takes glass Input's step. Measured: 16.4px in a 290×40 field, both themes, the same as /gallery's SearchField. |
| DS-F9-C5 | Both "Open Visualizer" CTAs (the gallery dialog footer and the /paper callout) are `size="md"`, emphasis primary. Measured in the dialog: CTA 16.4px/600 in a 40px button, under the 23.67px/400 title (`modal-*-1440`). The ℱ is kept, since it is identity (§0dm) and dropping it is an owner call. |
| DS-F9-C6 | **Root:** latex-paper `5be04ae` zeros `.math-block .katex-display` block-end margin and padding in the below-40rem arm. **fourier:** one rule in the bridge, needed because fourier's own global `.katex-display` sets the 0.75rem padding and 1rem margin. Measured at 390: eq (1.19) ink-to-number gap 0px (about 30px before) and the math block is 103px tall; `(1.19)` sits right under the display (`paper-119-*-390`). |

**Glass-owned, cited, not overridden.**
- DS-F9-G1 (the dock section menu paints no `[aria-current]` row; the menu plate carries the six-layer stack with blur and saturate): **O-59** for the `--fill-selected` current row and **O-87** for the plate. No local tint (UIA-F-128). Re-judged at the 10.2.0 repin.
- DS-F9-G2 (ConfiguratorLayer heading 25.888px/600 over an 11px sub): glass's rungs. It rides the DS-F2-G3 type relay (O-87 family): heading on the card-title step, sub on the caption rung. No local restyle.

**Census** (`pass-07/census-after.json`, fourier `scripts/ds-census.mjs` on `:3100`, which serves this checkout). Computed, against pass 6:

| metric | pass 6 | pass 7 |
|---|---|---|
| shadow elements | 420 | 392 |
| layers | 1076 | 996 |
| multi-layer stacks | 326 | 298 |
| inset highlights | 326 | 298 |
| backdrop blur | 254 | 214 |
| control gradients | 0 | 0 |
| looping chrome | 0 | 0 |

The drop is the /morph tile strip, whose quiet tiles carry no capsule cast, bevel or backdrop. The static count is unchanged: 8 box-shadow declarations, 10 gradients, 3 keyframes. What remains is glass's recipe (O-87).

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice. latex-paper `vitest`: 128/128, twice (`tsc --noEmit` there reports only the pre-existing `compile.ts` bbnf-lang `Nonterminals` mismatch).
- e2e: 37 specs (`pass-07/e2e-specs.txt`): pass 6's 25, plus the 12 that touch /morph, the paper search or the gallery CTA. chromium plus mobile-chromium, headless, 3 workers, on `:3100`.
  - Run A: 309 passed, 30 failed, 3 skipped. Run B: identical (the same 30).
  - 14 are on pass 6's pre-existing list: `contrast-floor` ×3, `f-w14-uia` 411/434/457, `f-w14v-p` p3, `gallery-admin-a11y` ×4, and `visual-checkpoint` 1·6·7, 2 and 5.
  - 7 fail on a clean HEAD (`bd083b0`) worktree served fresh on `:3121` (`e2e-head-baseline.txt`): `f-w14v-au3` L1-12 (the /morph card titles), and `f-w14v-pd` collapsed ×6 (DOCK-SUMMARY-SQUARE; O-88).
  - 9 are the `:3100` server's state: `f-w14v-au0` ×8 (an empty admin Audit Log, as with `f-w14-uia` 457) and `f-w14u-misc` m208 (the stage never reports `aria-busy` on `:3100`, failing 4/4 in a rerun there). With the cure diff applied to the clean HEAD worktree and served fresh on `:3121`, all 11 pass (`e2e-cure-fresh-3121.txt`), and m208 passes 2/2.
  - No visual golden was re-baselined. The runs' rewritten `web/e2e/screenshots/f-w14/*` were restored, not committed.

**Frames** (`pass-07/`). All were captured in headless real Chrome (§0ei) by `f9-cure-probe.mjs`: `morph-*-1440`, `morph-tilehover-*-1440`, `paper-list-*-1440`, `paper-top-*-1440`, `modal-*-1440` and `paper-119-*-390`, light and dark.

### pass 8

*(The re-deployed loop's pass 8: the cure for the critic F10 findings, DS-F10-*. The AFTER frames are in `evidence/DS/fourier/pass-08/`.)*

**Commits.**
- fourier `bd6558c`, on `m/w1-bump-migration`, pushed fast-forward `06d9853..bd6558c`. 6 files, committed by pathspec. The F.CT seat's uncommitted contour files (`drawing.py`, `strokes.py`) were left alone.
- value.js `47de19db2`: AFTER frames, the cure probe, census and e2e logs.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F10-C1 | `--strip-fade` goes from `var(--space-family)` (1.25rem) to `3rem`, about half a ~98px tile plus its 0.5rem gap. It is still gated on `data-more-end`. No arrow or chevron. Measured in both themes (`f10-cure-probe.json`): the mask resolves to `calc(100% - 48px)`. The 6px sliver of the 7th tile (1253 to 1351 against a 617 to 1259 grid) now sits in the fade's last 6px, at or under about 12% alpha, so it no longer reads as a rule. The n=12 tile fades out across its end instead (`crop-strip-end-*-1440`). |
| DS-F10-C2 | One registered `<length>` token, `--stage-inset-inline` (16px, `style.css`, set on `.canvas-stage`). The legend's `xBase` (`drawBasisLabels`) and `computeEpicycleFit`'s inline pad both read it through BasisCanvas's `readLegendTop`, and the private `pad = 12` is deleted. Hover still grows from the cached centre, but the grown box is clamped to the stage's inline-start inset and bottom reserve, so the larger chain keeps the frame's edge. Measured as the minimum over 3s of playing frames, in canvas CSS px: the legend's ink starts at 17. The chain's ink is at 37 (light) and 26 (dark) at rest, and at 32 in both themes at the hover scale. Before the cure it was about 8 at hover (`critic-2026-10-08/v-hover-left-dark-1440`). Identity hues are unchanged. |

**Glass-owned, cited, not overridden.**
- DS-F10-G1: the gallery dialog's metadata line, glass `DialogDescription`. Re-witnessed at 18.608px/400 in full `--foreground` in both themes (`modal-*-1440`). It rides the DS-F2-G3 type relay (O-87 family), which asks for the small or caption step in `--muted-foreground`. No local restyle of a glass slot.
- DS-F10-G2: the held glass lighting, emphasis and type rows (O-87: DS-F-G1..G6, DS-F4R-G2, DS-F5-G1, DS-F6-G4, DS-F8-G1, DS-F2-G3; O-88: DS-F6-G1). No consumer override is present and none was added. They stay honest-RED and are re-judged at the glass 10.2.0 repin.

**Census** (`pass-08/census-after.json`, fourier `scripts/ds-census.mjs` on `:3100`, which serves this checkout). The numbers are unchanged from pass 7: 392 shadow elements, 996 layers, 298 multi-layer stacks, 298 inset highlights, 214 backdrop blur, 0 control gradients, 0 looping chrome. Static: 8 box-shadow declarations, 10 gradients, 3 keyframes. Neither cure is a lighting site (a mask length and a canvas inset). What remains is glass's recipe (O-87).

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e: the 18 specs that reach /morph or the /v stage (`pass-08/e2e-specs.txt`). chromium plus mobile-chromium, headless, 3 workers, on `:3100`.
  - Run A: 150 passed, 9 failed. Run B: identical (the same 9).
  - 7 are on pass 7's clean-HEAD list: `f-w14v-au3` L1-12, and `f-w14v-pd` collapsed ×6 (DOCK-SUMMARY-SQUARE; O-88).
  - 2 are `f-w14v-c3` c3g and c3m. These are new to this run's list, because the spec was not in pass 7's set. Both fail the same way on a clean `06d9853` worktree served fresh on `:3121` (`e2e-head-baseline-c3.txt`, 2 failed and 4 passed). c3g is glass's DropdownMenuItem icon gap, which reads 0 (MENU-ICON-GAP).
  - No visual golden was re-baselined. The runs' rewritten `web/e2e/screenshots/f-w14/*` were restored, not committed.

**Frames** (`pass-08/`). All were captured in headless real Chrome (§0ei) by `f10-cure-probe.mjs`: `morph-*-1440`, `crop-strip-end-*-1440`, `v-*-1440`, `v-hover-left-*-1440`, `v-chain-hover-*-1440` and `v-chain-hover-full-*-1440`, and `modal-*-1440`, light and dark.

### pass 9

*(The re-deployed loop's pass 9 cures the critic F11 findings, DS-F11-*. The AFTER frames are in `evidence/DS/fourier/pass-09/`. The critic's own frames are in `pass-09/critic-f11/`.)*

**Commits.**
- fourier `33eedee`, on `m/w1-bump-migration`, pushed fast-forward `e26d48a..33eedee`. Eight files, committed by pathspec. The F.CT seat's concurrent contour and API commits were left alone.
- value.js `1696692ac` holds the AFTER frames, the cure probe, the census and the e2e logs.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F11-C1 | Info "About this approximation" (`EquationView.vue`) and Copy LaTeX (`EquationResult.vue`) are now `emphasis="quiet"`, the same rung as the Configurator Reset (size md, icon-only). The convergence play button (`ConvergenceTimeline.vue`) is now `secondary`. Compute is the route's one primary. There is no local CSS. Measured in `f11-cure-probe.json`, in both themes: Info and Copy have a transparent background and no box-shadow, with muted ink. The ladder reads quiet / quiet / secondary / primary. The secondary rung still carries glass's capsule fill and its inset/cast stack, which is glass's recipe (see G2). No e2e pinned these buttons to primary. |
| DS-F11-C2 | `transform: scale(1.02)` is deleted from `.morph-button:hover`. The 50% `--accent-red` border mix stays, and `:active` keeps `scale(0.98)` as press feedback, as on the tiles. The FR-MSP-11 comment and the au3 note now say the hover is the border tone step, which cites DS-F9-C1. Measured in both themes: rest and hover are both `none` at 416px, and the border goes to the 0.5 red mix (`morph-platehover-*-1440`). |
| DS-F11-C3 | The admin card's Delete is now `emphasis="quiet" tone="destructive"`, and `class="text-delete"` is dropped. That class was defined nowhere, so it painted nothing. Glass's tone routes `--button-quiet-ink` to `--destructive`. Measured on a stubbed admin gallery (`gallery-admin-card-*-1440`): transparent, no shadow, red glyph ink (rgb 219 36 36 in light). ConfirmDialog remains the one loud destructive surface. |
| DS-F11-C4 | Four scoped `"Fira Code", monospace` literals now read `var(--font-mono)`: `ConvergencePlot.vue`, `ConvergenceTimeline.vue`, `ConvergenceLegend.vue` and `EquationModeToggle.vue`. The served stack is unchanged (it resolves to the Fira Code stack, per `f11-cure-probe.json` `mono-*`). The canvas strings in `labels.ts` were left alone, as ruled. |

**Glass-owned, cited, not overridden.**
- DS-F11-G1: these held rows were re-witnessed by the critic and left honest-RED, with no consumer override present or added:
  - the aside's 12px offset and the pointer-tracked stage bloom;
  - the /morph Surface bevel stack;
  - the button casts;
  - the dark halos;
  - the /equation 390 dock radii;
  - the /v `1 ×` unit;
  - the slider track-well edge;
  - the 390 coarse-floor labels;
  - the /paper empty `<dt>`, which rides latex-paper 0.3.0, published by the owner.

  They are re-judged at the glass 10.2.0 repin. O-87: DS-F-G1..G6, DS-F4R-G2, DS-F5-G1/G2, DS-F6-G4, DS-F8-G1, and the DS-F2-G3 type relay. O-88: DS-F4R-G1, DS-F6-G1.
- New in this pass, and cited only: glass's `secondary` Button keeps the primary's capsule fill and its inset/cast stack (it changes only the veil and blur tier). So the play button is a rung down in emphasis but not in lighting. This is glass's recipe and folds into O-87. It is not restyled locally.

**Census** (`pass-09/census-after.json`, fourier `scripts/ds-census.mjs` on `:3100`):
- Computed, down from pass 8's 392 / 996 / 298 / 298 / 214:
  - 380 shadow elements;
  - 956 layers;
  - 286 multi-layer stacks;
  - 286 inset highlights.
- 216 backdrop blur, up 2 from the secondary rung's quiet veil.
- 0 control gradients and 0 looping chrome.
- The static half is unchanged: 8 box-shadow declarations, 10 gradients, 3 keyframes.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e covered 29 specs that reach /equation, /morph or admin /gallery (`pass-09/e2e-specs.txt`), on chromium plus mobile-chromium, headless, with 3 workers, on `:3100`.
  - Run A: 248 passed, 87 failed.
  - Run B: 245 passed, 90 failed. That is the same 87, plus 3 load timeouts (`equation-interaction` S2, `f-w13-radius` frames 1 and 2) that ran while the AFTER probe and the baseline shared the machine. The 3 pass 2/2 on a recheck (`e2e-runB-recheck.txt`).
- The 87 were re-run against the cured tree served fresh on `:3122` (`e2e-cure-fresh-3122.txt`): 73 pass and 14 fail. All 14 predate this pass:
  - 7 are on the earlier passes' lists: `f-w14v-au3` L1-12, and `f-w14v-pd` collapsed ×6 (O-88).
  - 7 fail identically on a clean `bd6558c` worktree served fresh on `:3121` (`e2e-head-baseline-3121.txt`): `gallery-admin-a11y` ×4 (axe `aria-hidden-focus` on the banner stat spans, and the panels), and `visual-checkpoint` items 1·6·7, 2 and 5.
  - The other 73 were `:3100` dev-server state: the admin tabs never render their stubbed rows there.
- No visual golden was re-baselined. The runs' rewritten `web/e2e/screenshots/f-w14/*` were restored, not committed.

**Frames** (`pass-09/`). All were captured in headless Chrome (Playwright `chromium` project; §0ei) by `f11-cure-probe.spec.ts`, run from a temporary copy in fourier `web/e2e/` that was deleted afterwards, against the cured tree on `:3122`:
- `equation-*-{1440,390}`;
- `eq-top-*-1440` (the stage corner, now two quiet glyphs);
- `eq-play-*-1440`;
- `morph-platehover-*-1440`;
- `gallery-admin-card-*-1440` and `gallery-admin-*-1440`;

each in light and dark.

### pass 10

*(The re-deployed loop's pass 10 cures the critic F12 findings, DS-F12-*. The AFTER frames are in `evidence/DS/fourier/pass-10/`. The critic's own frames are in `pass-10/critic-f12/`.)*

**Commits.**
- fourier `01fd861`, on `m/w1-bump-migration`, pushed fast-forward `33eedee..01fd861`. Three files, committed by pathspec.
- value.js `c9754cd4f` holds the AFTER frames, the cure probe, the census and the e2e logs.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F12-C1 | Both admin overlays (`GalleryCard.vue`) now sit inside `.card-media`'s corners, at `calc(var(--card-pad) + var(--space-atom))` on both axes. Before, they used `top-1.5` / `left-1.5` / `right-1.5` literals measured from the card's box. Measured in `f12-cure-probe.json` in both themes: the select plate is 8px in from the thumbnail's top-left on both axes, and the action row is 8px in from its top-right on both axes. Both lie wholly on the image, with a 14px gap between them. |
| DS-F12-C2 | `.select-plate` is renamed to the shared `.overlay-plate` (70% `--background`, `--radius-md`, in the same file). The label and the action row both wear it, so the tier group and the quiet Delete sit on one anchored backing (`deleteOnPlate: true`; Delete's box-shadow is `none`). The checkbox's plate drops its pad because glass's Checkbox already brings its own 44px hit square. The two plates then share one 44px height. The discs' lens and cast stay glass's (O-87). |
| DS-F12-C3 (border half) | `border-[1.5px]` is dropped from `GalleryAdminBanner.vue`. The amber rim now rides Card's 1px hairline (measured at 1px: rgb 157 101 21 in light, rgb 232 185 109 in dark). The colour and the shield mark are kept (§0dm). |
| DS-F12-C4 | The dashed `.drop-zone` (`VisualizationView.vue`) now fills the stage's content box. It is inset by `--space-body` (glass Card's md pad; the stage cell is not a Card, so `--card-pad` does not reach it). The prompt is centred in it, and its corner is concentric with the stage's (`--radius-card` less the inset). The duplicate phone gutter on `.drop-target` is gone. Measured: at 1440 the zone is 1382×774 in a 1406×798 stage; at 390 it is 340×746 in a 356×762 stage. Before, it was a 601×380 box in that 1406×798 stage. |

**Not forced (an owner design ruling to lift).**
- DS-F12-C3, the posture half: the six readings stay `posture="cell"`. The carry ruling GAB-2/K-4 (`fourier/carry/F-W1-CARRY.md`) names `<Metric posture="cell">` as the seat. The e2e `f-w14v-u3` e149 pins six `.metric[data-posture="cell"]` under the concentric law. As the critic's own clause says, moving to the plain posture is a ruling to lift, not a cure to force. The cell bevel and the dark halo stay O-87 (DS-F8-G1).

**Glass-owned, cited, not overridden.**
- DS-F12-G1: the Toaster's close glyph hangs off the plate's corner, and a one-line toast sits on a heavy saturated wash. Cited against O-87, with the "every glyph has a home" canon.
- DS-F12-G2: in the dark arm, `control-surface` (the Select) and `field-control` (the NumberField) take different fills. Cited against O-87 for tone parity at the 10.2.0 token wave.
- No local fill or override was added for either.
- The earlier held rows (DS-F11-G1's list) are unchanged.

**Census** (`pass-10/census-after.json`, fourier `scripts/ds-census.mjs` on `:3100`): unchanged from pass 9.
- Computed: 380 shadow elements, 956 layers, 286 multi-layer stacks, 286 inset highlights, 216 backdrop blur, 0 control gradients, 0 looping chrome.
- Static: 8 box-shadow declarations, 10 gradients, 3 keyframes.
- This pass's cures are geometry, border and frame, not lighting, and admin mode is not on the census routes.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e covered 21 specs that reach admin /gallery, the gallery card or the /w drop target (`pass-10/e2e-specs.txt`). They ran on chromium plus mobile-chromium, headless, with 3 workers, against the cured tree served fresh on `:3122`.
  - Run A: 232 passed, 7 failed. Run B: 232 passed, 7 failed.
  - The 7 are the same in both runs. They are the 7 that pass 9 found failing identically on a clean worktree: `gallery-admin-a11y` ×4, and `visual-checkpoint` items 1·6·7, 2 and 5.
  - `f-w14v-u3` e149 (the concentric law on the cells) and `f-w14u-admin` a105 (cell heights at 390) are green.
- No visual golden was re-baselined. The runs' rewritten `web/e2e/screenshots/f-w14/*` were restored, not committed.

**Frames** (`pass-10/`). All were captured in headless Chrome (Playwright `chromium` project; §0ei) by `f12-cure-probe.spec.ts`. It ran from a temporary copy in fourier `web/e2e/`, deleted afterwards, against `:3100`:
- `gallery-admin-card-*-1440`, `crop-admin-overlay-*` (DPR 2), `gallery-admin-*-1440` and `banner-*-1440`;
- `w-*-{1440,390}`;

each in light and dark.

### pass 11

*(The re-deployed loop's pass 11 cures the critic F13 findings, DS-F13-*. The AFTER frames are in `evidence/DS/fourier/pass-11/`, and the BEFORE cells for the same probe are in `pass-11/before/`.)*

**Commits.**
- fourier `d564234`, on `m/w1-bump-migration`, pushed fast-forward `01fd861..d564234`. Two files, committed by pathspec.
- value.js `934379738` holds the BEFORE and AFTER frames, the cure probe and its JSON, the census, and the e2e logs.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F13-C1 | `.like-btn` (`GalleryCard.vue`) now takes `line-height: inherit`, which is the row's 1.5, in place of glass Button's tight 1.1. Both counters now sit on one 19.5px line box. Before, the like count sat in a 14.3px box. Measured on admin and public /gallery at 1440 and 390, in both themes, the midline delta between the like and view counts is 0 (it was -0.4px on the Range box, which read as about 2px raised). See `stats-crop-*`. |
| DS-F13-C2 | The plate's gap is now one `--space-atom` (it was half an atom). That is the same step glass ToggleGroup puts between the tier discs: 8px, or 4px at 390. Delete therefore reads as the row's fourth member, measured as `lastDiscToDelete` = `discToDisc`. The trash glyph moves to TierControl's 14px through a `size-3.5` class, because glass Button's svg rule had overridden `:size="14"` to 16 (the DS-F2-C17 precedent). The first tier glyph now sits 15px in from the plate's left edge and the trash glyph 15px in from its right, where before the trash sat 14px in with a 16px box. The plate is 176/246px at 1440. The optional narrowing would need smaller discs, and the disc size belongs to glass, so it was not forced. |
| DS-F13-C3 | The /morph lede (`.demo-subtitle`, `FourierMorphDemo.vue`) now takes `text-wrap: pretty`, as the /w lede does. At 390 its last line is now "moon shapes."; before, "shapes." sat alone. At 1440 it is still one line. |

**Glass-owned, cited, not overridden.**
- DS-F13-G1: the casts and halos on buttons, plates and dark resting cards, and the lens fill on the tier discs. Held honest-RED against O-87 (DS-F8-G1, DS-F4R-G2, DS-F11-G1), to be re-judged at the 10.2.0 repin.
- DS-F13-G2: the /v transport "1 ×", the /equation 390 dock radii, the toast close glyph, the Metric type rungs and the /v aside offset. Held against O-87 and O-88.
- No local override was added for either.

**Census** (`pass-11/census-after.json`, fourier `scripts/ds-census.mjs` on `:3100`):
- Static is unchanged: 8 box-shadow declarations, 10 gradients, 3 keyframes.
- Computed: 388 shadow elements, 984 layers, 294 multi-layer stacks, 294 inset highlights, 216 backdrop blur, 0 control gradients, 0 looping chrome.
- The rise of 8 elements over pass 10 is data drift. The live /gallery serves one more card in each of its four cells (112 to 129 elements at 1440; 2 shadow elements per card), and the /v route now resolves a different slug. Per-card lighting is unchanged, and this pass's cures are metric, spacing and wrap, not lighting.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e covered 27 specs that reach /gallery, the gallery card or /morph (`pass-11/e2e-specs.txt`). They ran on chromium plus mobile-chromium, headless, with 3 workers, against the cured tree served fresh on `:3123`.
  - Run A: 314 passed, 15 failed.
  - Run B: 313 passed, 16 failed. That is the same 15, plus one load timeout (`visual-baseline` π equation @375), which passes 1/1 on a recheck (`e2e-runB-recheck.txt`).
  - The 15 fail identically on a clean `01fd861` worktree served fresh on `:3124` (`e2e-head-baseline-3124.txt`), so all of them predate this pass:
    - `f-w14v-au3` L1-12;
    - `f-w14v-p` p3 @1024 (the toast against the aside);
    - `f-w14v-pd` collapsed ×6 (O-88);
    - `gallery-admin-a11y` ×4;
    - `visual-checkpoint` items 1·6·7, 2 and 5.
- No visual golden was re-baselined. The runs' rewritten `web/e2e/screenshots/f-w14/*` were restored, not committed.

**Frames** (`pass-11/`). All were captured in headless Chrome (Playwright `chromium` project, DPR 2; §0ei) by `f13-cure-probe.spec.ts`. It ran from a temporary copy in fourier `web/e2e/`, deleted afterwards, against `:3100`:
- `gallery-admin-card-*-{1440,390}`, `stats-crop-*-{1440,390}`, `crop-plate-*-{1440,390}` and `gallery-admin-*-1440`;
- `gallery-*-{1440,390}` (public);
- `morph-*-{1440,390}` and `morph-lede-*-{1440,390}`;

each in light and dark.

### pass 12
- fourier `9935f2c`, on `m/w1-bump-migration`, pushed fast-forward `d564234..9935f2c`. Three files, committed by pathspec.
- value.js `6fe8bc90c` holds the BEFORE and AFTER frames, the cure probe and its JSON, the census, and the e2e logs (`pass-12/`).

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F14-C1 | `VisualizationView.vue`'s `stageError` branch no longer mounts `NotFoundCard`. The message is composed on `.stage-state` itself, on the type roles the /w empty stage uses: the route's h1 (`font-serif-math text-display-2`, 18ch, balanced), the body lede (52ch, `text-wrap: pretty`), the diagnosis on `text-caption`, and one centred, wrapping action row on a 0.75rem gap. `data-testid="not-found"` moves to the composed message. Measured on /v and /w unknown slugs at 1440 and 390 in both themes: no Card inside the stage, `box-shadow: none` and no border on the message (before, the six-layer stack: three insets, a cast and two halos). The message is 356px wide in the 358px stage at 390 (before, 292px), and the action row is centred on the stage (offset 0; before, -48px, start-aligned). `NotFoundCard` keeps its Card for the catch-all route only. No new component. |
| DS-F14-C2 | `MorphShapePreview.vue`: the shape value takes the phase value's guard, a `min-inline-size` of its longest word ("Moon", 4.5ch), dropped in the one-column phone form as the phase's is. On the first morph at 1440, the "total" reading now holds at x 346.5 throughout (sampled every 100ms for 4s). Before, it stepped from 331.7 to 339.9 when Sun turned Moon. |
| DS-F14-C3 | `HarmonicLevelGrid.vue`: a fading side of the strip now reaches alpha 0 a twelfth of the fade before the edge (4px at 3rem), so a tile rim caught in the last few px is gone. A side with no fade is unchanged, since the stop is `calc(100% - 0px / 12)`. No new variable. See `strip-end-*`. |

**Glass-owned, cited, not overridden.**
- DS-F14-G1 covers the dock halo, the card and capsule casts and dark halos, the /v aside offset and stage bloom, the /v transport "1 ×", the ConfiguratorLayer rungs, the Select/NumberField fill parity, the tag-chip rim and the tier-disc lens. The two action Buttons on the error stage keep glass's cast too. All are held honest-RED against O-87 FLAT-LIGHTING and O-88 DOCK-COLLAPSE-MOTION, to be re-judged at the 10.2.0 repin.
- The /paper empty `<dt>` stays on latex-paper 0.3.0 (DS-F9-C3).
- No local override was added.

**Census** (`pass-12/census-after.json`, on a fresh `:3123`):
- Static is unchanged: 8 box-shadow declarations, 10 gradients, 3 keyframes.
- Computed: 380 shadow elements, 956 layers, 286 multi-layer stacks, 286 inset highlights, 216 backdrop blur, 0 control gradients, 0 looping chrome.
- The fall of 8 elements from pass 11 is data drift. The live /gallery serves one card fewer in each of its four cells (129 to 112 elements at 1440; 2 shadow elements per card). /morph gains one element, the new shape-value span. /v resolves a different slug with identical totals.
- The census does not visit the error stage. There the probe measures one fewer shadow element (the nested Card's six layers).

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e covered 17 specs that reach /v or /w errors, /morph or the strip (`pass-12/e2e-specs.txt`). They ran on chromium plus mobile-chromium, headless, with 3 workers, against the cured tree served fresh on `:3123`.
  - Run A: 206 passed, 1 failed. Run B: 206 passed, 1 failed.
  - The one red is `f-w14v-au3` L1-12, which fails identically on a clean `d564234` worktree served fresh on `:3124` (`e2e-head-baseline-3124.txt`). It predates this pass, as it did in pass 11.
- Instrument note: an earlier attempt against the long-running `:3100` dev server failed 11 admin-table cells (UIA-F-36/37/42 and au0 ×8: rows never rendered). Those cells pass on both fresh servers, so the gate is read on fresh servers only.
- No visual golden was re-baselined. The runs' rewritten `web/e2e/screenshots/f-w14/*` were restored, not committed.

**Frames** (`pass-12/`, BEFORE in `pass-12/before/`). All were captured in headless Chrome (Playwright `chromium`, DPR 2; §0ei) by `f14-cure-probe.spec.ts`. It ran from a temporary copy in fourier `web/e2e/`, deleted afterwards. BEFORE ran against a clean HEAD worktree on `:3124`, AFTER against the cured tree on `:3100`:
- `v-error-*-{1440,390}` and `w-error-*-{1440,390}`;
- `morph-*-{1440,390}` and `strip-end-*-{1440,390}`;

each in light and dark.

### pass 13
- fourier `f76544a`, on `m/w1-bump-migration`, pushed fast-forward `9876aad..f76544a`. Five files, committed by pathspec.
- value.js `5de161b2f` holds the AFTER frames, the cure probe and its JSON, the mono-rung probe, the census and the e2e logs (`pass-13/`). BEFORE is pass 12's AFTER set: `web/src` did not change between `9935f2c` and the cure's parent.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F15-C1 | `MorphShapePreview.vue`: the slot-form phase and shape Metrics also pass `:value="phase"` and `:value="shapeName"`, so glass Metric no longer marks them `data-empty` and mutes the value to the label's ink. Measured in all 4 cells: every reading is non-empty and paints in `--foreground` (light rgb 28 25 23, dark rgb 233 230 226), before and after the Sun to Moon morph. The `.shape-value` and `.phase-value` spans keep the min-inline-size guard, and no reading moves (sampled every 100ms for 4s). No local colour rule. |
| DS-F15-C2 | `fira-code text-caption` and `fira-code text-small` become glass's `text-mono-small` at all 5 sites: the VisualizationView diagnosis, NotFoundCard, EquationView ×2 and the AppDock handle. The injected probe on the served tree (`mono-rung-probe.txt`) computes "Fira Code" for `text-mono-small` and "Computer Modern Serif" for both old pairs, which confirms the dead class. No local font rule. |
| DS-F15-C3 | 'Browse the gallery' on the error stage takes `emphasis="quiet"`, as on the /w empty stage. The result is one primary and one quiet action: the second button now has 0 shadow layers and a transparent fill (before, the primary's capsule and 5-layer stack). |
| DS-F15-C4 | The quoted slug in the stage-error lede is one `whitespace-nowrap` span. At 390 /v breaks before "from", and the slug keeps one line box (`slugRects` 1) in every cell. |
| DS-F15-C5 | `stageErrorDetail` also drops a bare `… not found` title, which restates the lede. The /w and /v unknown slugs now show only the title, the lede and the actions. A real server diagnosis still shows, on the mono rung. |
| DS-F15-C6 | Dissolved by C3. The second action has no plate, so the unequal stacked widths (177.5 over 147.3 px at 390) no longer read as a ragged column. No rule added. |

**Glass-owned, cited, not overridden.**
- DS-F15-G1 is the /morph plate's pointer-tracked radial specular and its 5-layer stack (glass Surface). It widens DS-F5-G1's witness from the Configurator stage to the /morph plate.
- DS-F15-G2 is every plated action's bevel stack plus its cast and warm halo (glass Button), already held at DS-F4R-G2, DS-F6-G3, DS-F11-G1 and DS-F14-G1.
- Both stay honest-RED against O-87 FLAT-LIGHTING and will be re-judged at the 10.2.0 repin. No local override was added.

**Census** (`pass-13/census-after.json`, on a fresh `:3123`):
- Static is unchanged: 8 box-shadow declarations, 10 gradients, 3 keyframes.
- Computed is identical to pass 12: 380 shadow elements, 956 layers, 286 multi-layer stacks, 286 inset highlights, 216 backdrop blur, 0 control gradients, 0 looping chrome.
- The census does not visit the error stage. There the probe measures the quiet action's 0 layers, one cast stack fewer than in pass 12.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e covered 20 specs (`pass-13/e2e-specs.txt`): pass 12's 17 plus the three /equation specs, because EquationView changed. They ran on chromium plus mobile-chromium, headless, with 3 workers, against the cured tree served fresh on `:3123`.
  - Run A: 226 passed, 1 failed. Run B: 226 passed, 1 failed.
  - The one red is `f-w14v-au3` L1-12, the same pre-existing red as in passes 11 and 12 (clean-HEAD baseline in `pass-12/e2e-head-baseline-3124.txt`).
- No visual golden was re-baselined. The runs' rewritten `web/e2e/screenshots/f-w14/*` were restored, not committed.

**Frames** (`pass-13/`). All were captured in headless Chrome (Playwright `chromium`, DPR 2; §0ei) by `f15-cure-probe.spec.ts`. It ran from a temporary copy in fourier `web/e2e/`, deleted afterwards, against `:3123`:
- `v-error-*-{1440,390}` and `w-error-*-{1440,390}`;
- `morph-*-{1440,390}`, taken after the morph click;

each in light and dark.

### pass 14
- fourier `188cb91`, on `m/w1-bump-migration`, pushed fast-forward `18c2077..188cb91`. Five files, committed by pathspec.
- value.js `636ada3cb` holds the AFTER frames, the cure probe and its JSON, the census and the e2e logs (`pass-14/`). BEFORE is the critic's set in `pass-14/critic-f16/` (a separate seat's capture; not committed by this seat).

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F16-C1 | `MorphPhaseConfig.vue`'s `.config-card-title` and `HarmonicLevelGrid.vue`'s `.card-title` move from `--type-heading` to `--type-subheading`, keeping `--type-leading-heading` and weight 500. Measured in all 4 cells: the four card titles are 20.352px/500 under the page title's 25.888px/400 at 390 and 41.888px/400 at 1440 (before, 25.888px/500 at both widths, level with the title at 390). The page title stays on display-1. Note for glass, not a lighting row: display-1's floor (1.618rem) equals `--type-heading`. |
| DS-F16-C2 | `VisualizationView.vue`: the empty-stage and load-error h1s drop `text-display-2 font-bold tracking-tight`. One shared rule (`.drop-target-title, .stage-error-title`) puts both on the /morph title's rung: `--type-display-1`, `--type-leading-display`, weight 400. Measured: 41.888px/400 at 1440 and 25.888px/400 at 390 on /v and /w errors and the /w empty stage (before, 53.3px/700 and 32.9px/700). The paper's book title keeps display-2/700. |
| DS-F16-C4 | `EquationModeToggle.vue`: both glyphs are on `var(--font-serif-math)` at `--type-small`, Σ upright and `a + b` in math italic with an upright +, as KaTeX sets it. `.eq-toggle-icon--mono` and the literal "Computer Modern Serif", Georgia stack are deleted. Measured: Computer Modern Serif at 16.4px (1440) and 14px (390), with no negative tracking (`eq-toggle-*-1440.png`). |
| DS-F16-C5 | `.stage-error-actions` is the drop zone's centred column (`flex-direction: column`, centred, 0.5rem gap), and the drop zone's primary moves from `lg` to `md`, the NotFoundCard page-action rung. Measured: in both states the primary and the quiet action are `md` (40px) and centred on the stage (cx 720 at 1440, 195 at 390). On the error stage the quiet action sits 8px beneath the primary; on the empty stage the format caption sits between them. |

**Glass-owned, cited, not overridden.**
- DS-F16-C3: the Configurator aside's section label (25.888px/600; ConfiguratorLayer heading). It is relayed to glass alongside the O-87 refinement: a heading-rung weight token (500) and a narrow-width step to `--type-subheading`, to meet the /morph cards now on subheading/500. No local override.
- DS-F16-G1: the pointer-tracked stage and plate specular, the plated primaries' cast and halo, the toolbar pill's doubled ring and the resting-card casts. These are held honest-RED against O-87 FLAT-LIGHTING (DS-F5-G1, DS-F4R-G2, DS-F6-G2, DS-F15-G1/G2) and O-88 for the transport's "1 ×" (DS-F6-G1), to be re-judged at the 10.2.0 repin. No local override.

**Census** (`pass-14/census-after.json`, on a fresh `:3123`):
- Static is unchanged: 8 box-shadow declarations, 10 gradients, 3 keyframes.
- Computed is identical to pass 13: 380 shadow elements, 956 layers, 286 multi-layer stacks, 286 inset highlights, 216 backdrop blur, 0 control gradients, 0 looping chrome. This pass moves type and layout, not lighting.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e covered pass 13's 20 specs (`pass-14/e2e-specs.txt`), which reach /v, /w, /morph and /equation, the routes of every changed file. They ran on chromium plus mobile-chromium, headless, with 3 workers, against the cured tree served fresh on `:3123`.
  - Run A: 226 passed, 1 failed. Run B: 226 passed, 1 failed.
  - The one red is `f-w14v-au3` L1-12 ("Settle Out is a glass CardTitle in a glass Card"), the same pre-existing red as in passes 11 to 13 (clean-HEAD baseline in `pass-12/e2e-head-baseline-3124.txt`). Its one-size clause holds: all four titles are 20.352px.
- No visual golden was re-baselined. The runs' rewritten `web/e2e/screenshots/f-w14/*` were restored, not committed.

**Frames** (`pass-14/`). All were captured in headless Chrome (Playwright `chromium`, DPR 2; §0ei) by `f16-cure-probe.spec.ts`, run from a temporary copy in fourier `web/e2e/` that was deleted afterwards, against `:3123`:
- `morph-*-{1440,390}`;
- `v-error-*-{1440,390}`, `w-error-*-{1440,390}` and `w-empty-*-{1440,390}`;
- `equation-*-{1440,390}` after Compute, plus `eq-toggle-*-1440`. At 390 the toggle sits behind the aside's tab, so it is measured while attached;

each in light and dark.

### pass 2
This is the second-round pass on critic **F2R**, whose findings were witnessed on pass 15's frames.
- fourier `a06c10e`, on `m/w1-bump-migration`, pushed fast-forward `94870dc..a06c10e`. Six files, committed by pathspec.
- value.js `83778ce5b` holds the AFTER frames, the cure probe and its JSON, the census and the e2e logs, all in `pass-02/f2r/`. The subdirectory keeps the original pass 2's committed frames intact, following the `pass-02/f4r/` precedent. BEFORE is the critic's set from pass 15 (`pass-15/`).

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F2R-C1 | `style.css`: the global `.dark .katex { color: var(--foreground) }` is deleted, so KaTeX inherits its host's ink in both themes. No per-chip rule was added. Measured in all 4 cells: each notation glyph's ink equals its label's, including on the pressed Trig chip, where both take the chip hue (dark `oklab(0.751 0.100 0.055)`). Display and paper math already sit in `--foreground` ink, so they are unchanged. |
| DS-F2R-C2 | One caption rule: a layer carries a caption only when it says something its rows do not. Basis loses `resolution` and Controls loses `harmonics & display`. /visualize's `sub="Fourier spectrum"` restated the label, so it goes, and `CoefficientsPanel`'s `sub` prop goes with it; /v now shows the count. A list with no rows states no count (it previously read "all 0 harmonics"). Measured headings: /v `Image · Basis · Contour · Coefficients all 201 harmonics, n = −200…200`; /equation `Function f(t) · Controls · Coefficients all 21 harmonics, n = −20…20`. |
| DS-F2R-C3 | `.drop-target` is inset by `--space-residue` (it was `--space-body`), and `.drop-zone`'s radius is `calc(var(--radius-card) - var(--space-residue))`. The dashed edge now hugs the plate's edge 5px in, with a 12px radius concentric with the plate's 16px. Before, it sat 13px in at 1440 and 9px in at 390, with radii of 4px and 8px. At 390 the zone is 348px wide (before, 340px). The glass stage's own hairline is glass-owned and is not re-styled. |
| DS-F2R-C4 | Both stage states' "Browse the gallery" (the empty /w zone and the load error) move from `quiet md` to glass's link rung, `emphasis="text" size="sm"`. They now read as a command, in `--button-accent` ink, not as a second muted caption. Order: primary, then the format caption, then the link. At 390 the link is 18.27px, under the primary's 21px and above the caption's 12.18px. That coarse-pointer step is glass's Button size ramp (sm 14.38 → 18.27 on coarse), so the remaining width-to-width change is glass-owned and is not overridden. |
| DS-F2R-C5 | `ConvergenceLegend.vue`: `.legend-overlay--column` takes `align-self: stretch`. Measured: the legend is 539.6px tall against a 539.6px plot (1440, both themes), so the rule runs the plot's full side. |
| DS-F2R-C6 | `FunctionInput.vue`: `.preset-group` becomes auto-filled grid tracks: `repeat(auto-fill, minmax(max(5rem, 22%), max-content))`, `inline-size: 100%`. Tightening the gap could not fix the wrap, because the orphan lacked about 56px. Measured rows, all single-line: 4/4 at 1440, 3/3/2 at 390 (it was 3/4/1), 3/3/2 at 1024 and 4/4 at 768. The control floor is unchanged. |

**Glass-owned, cited, not overridden.**
- DS-F2R-G1 is the resting, capsule and dock lighting recipe. It is held honest-RED on O-87 FLAT-LIGHTING and will be re-judged at the 10.2.0 repin.
- DS-F2R-G2 is the transport `1 ×`, plus the dock cast at 390. It is held on O-88 DOCK-COLLAPSE-MOTION, with O-87 for the cast.
- C4's coarse-pointer type step on Button sizes is glass's ramp.

No local override was added for any of these.

**Owner ruling only.** DS-F2R-G3 is the morph sun read as a gear at icon size. It is identity (§0dm) and was not touched.

**Census** (fourier `scripts/ds-census.mjs`, on `:3127`; `pass-02/f2r/census-after.json`):
- Static is unchanged: 8 box-shadow declarations, 10 gradients, 3 keyframes.
- Computed: on the first read, /equation light 1440 caught a transient busy state (+2 shadow elements, 1 running loop). The /equation re-read (`census-equation-reread.json`) is identical to pass 15 cell for cell. That gives sums of 380 shadow elements, 956 layers, 286 multi-layer stacks, 286 inset highlights, 216 backdrop blur, 0 control gradients and 0 looping chrome.
- This pass moves type, layout and ink, not lighting.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e covered pass 14's 20 specs plus `coarse-pointer` and `f-w14v-u2` (the notation glyph spec), 22 in all (`e2e-specs.txt`). They ran on chromium plus mobile-chromium, headless, with 3 workers. Playwright built and served its own preview of the cured tree on :4190.
  - Run A: 235/235.
  - Run B: 234/235. The one red was `f-w14-uia` UIA-F-17: the dock was still `expanded` at the 5s collapse expectation, with host load around 590. It is dock-collapse timing on a file this pass did not touch. Re-read alone: 32/32 (`e2e-runB-reread-uia.txt`).
  - Run C: 235/235.
  - So the suite passed in full twice (A and C).
- No visual golden was re-baselined. Before each run the seat backed up the `web/e2e/screenshots/` tree, including another seat's dirty files, and restored that state after each run. Nothing there was committed.

**Frames** (`pass-02/f2r/`). All were captured in headless real Chrome (channel `chrome`, DPR 2; §0ei) by `f2r-cure-probe.mjs` against `:3127`:
- `equation-*-{1440,390}` after Compute;
- `w-*-{1440,390}` (the empty stage), `v-*-{1440,390}` and `v-error-*-{1440,390}`;
- `notation-*-1440` and `presets-*-390` crops;

each in light and dark.

**Process note.** The evidence commit's first form swept in a foreign staged deletion from another seat's index (`demo/picker/composables/useHeaderCondense.ts`). It was amended out before any push, and the other seat's index state (the staged deletion) was restored.

### pass 3
This is the third-round pass on critic **F3**, whose findings were witnessed on the pass 2 (F2R) AFTER frames.
- fourier `24fce16`, on `m/w1-bump-migration`, pushed fast-forward `a06c10e..24fce16`. Five files, committed by pathspec.
- value.js `76c570e99` holds the AFTER frames, the cure probe and its JSON, the census and the e2e logs, all in `pass-03/f3/`. The subdirectory keeps the original pass 3's committed frames intact, following the `pass-02/f2r/` precedent. BEFORE is the critic's set (`pass-02/f2r/`).

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F3-C1 | `epicycles.ts`: the tail cut is relative to the chain, `max(12px, 4% of the largest on-screen radius)`, not a fixed 6px. The 6 to 15px circles, which stacked two dots each into a fuzz at the tip, now join the one thin tail polyline. Every circle still drawn is at least 12px, so no dot sits on a circle under about 10px. The hues are kept (§0dm). Frame `v-stage-*-1440`: the tip reads as a few nested circles leading into one line, and the pen is visible. |
| DS-F3-C2 | `CoefficientsPanel.vue`: the caption is one short token, `201 harmonics · n = ±200` (`a to b` when the span is not symmetric), with no literal ellipsis. The unit stays, per UIA-F-35 and `f-w14u-eq`'s `/21 harmonics/`. Measured in all 8 cells (/v and /equation, 1440 and 390, both themes): neither the label nor the caption is cut (`scrollWidth ≤ clientWidth`). Frame: `coeff-header-*-390`. Inside glass's layer header both spans are `truncate` in a shrinking flex row, so the label can still yield first. That is the header flex rule (label `flex: none`), which is glass's to change. It is relayed beside O-87, with no local override. |
| DS-F3-C3 | `FunctionInput.vue`: the `.compute-btn:hover` re-tone (red border, fill and ink) is deleted, and glass's primary hover runs. Only `width: 100%` stays. Measured on hover: the ink, fill and border equal glass's primary, light and dark. The equation cells were re-captured with the pointer parked at (0,0); `compute-hover-*-1440` shows the hover itself. |
| DS-F3-C4 | `VisualizationView.vue` (load error) and `NotFoundCard.vue` (unknown route): "Upload a new image" carries the same leading `<Upload />` glyph as the empty stage's "Choose an image". Measured: every visible primary in the `w`, `v-error` and `no-such-route` cells has its glyph. |

**Glass-owned, cited, not overridden.**
- DS-F3-G1: dark-arm casts inked from `--foreground` (a halo, not a drop) on capsule, resting and floating surfaces. It is a named row under O-87 FLAT-LIGHTING (dark-arm foreground-inked cast = halo), held honest-RED, and re-judged at the 10.2.0 repin.
- DS-F3-G2: the transport `1 ×` overflows the collapsed capsule at 1440 too, not only at 390. The O-88 DOCK-COLLAPSE-MOTION row is extended to every width.
- DS-F3-G3: the stage toolbar's ghost plate silhouette under `fit-content` (plate and body differ in radius and box). Cited under O-88 (dock form), with O-87 for the plate's cast.
- DS-F3-G4: the `text` link rung inks with `--primary`, which is black in light and violet in dark. Relayed beside O-87: the rung should take an accent ink, or an underline in light. The consumer keeps `emphasis="text"`.
- DS-F3-G5: the Metric label on the coarse control ramp outranks its `sm` value. Relayed with the DS-F2R-C4 coarse-pointer type-step residual.
- The ConfiguratorLayer header's label-yields-first flex order (from C2), as above.

No local override was added for any of these.

**Census** (fourier `scripts/ds-census.mjs`, against a fresh preview of the cured tree on `:3128`; `pass-03/f3/census-after.json`):
- Static is unchanged: 8 box-shadow declarations, 10 gradients, 3 keyframes.
- Computed sums: 388 shadow elements, 984 layers, 294 multi-layer stacks, 294 inset highlights, 216 backdrop blur, 0 control gradients, 0 looping chrome.
- Read cell for cell, the only deltas from pass 2 come from data, not lighting:
  - /gallery shows 2 more seeded cards (+2 elements and +7 layers per cell);
  - the /v cell follows the gallery's newest slug, so its key changed;
  - /equation light 1440 now matches pass 2's clean re-read, without the transient busy state.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e covered pass 2's 22 specs (`e2e-specs.txt`), which reach /v, /w, /equation and the not-found route. They ran on chromium plus mobile-chromium, headless, with 3 workers. The setup was a dev server of the cured tree on `:3000` (the config's BASE_URL) plus Playwright's own production preview on `:4190`.
  - Run A: 235/235.
  - Run B: 235/235.
- A first attempt pointed BASE_URL at the :4190 production preview and got 16 reds. Every one was a dev-only probe (`__vueParentComponent.__file`, the dev-only shape extractor) and not this cure. The log is kept as `e2e-runA0-wrong-base.txt`.
- No visual golden was re-baselined. Before the runs the seat backed up the `web/e2e/screenshots/` tree, including another seat's dirty files, and restored that state after each run. Nothing there was committed.

**Frames** (`pass-03/f3/`). All were captured in headless real Chrome (channel `chrome`, DPR 2; §0ei) by `f3-cure-probe.mjs` against `:3128`, with the pointer parked off the controls:
- `equation-*-{1440,390}` after Compute;
- `w-*`, `v-*`, `v-error-*` and `no-such-route-*` at 1440 and 390;
- crops: `v-stage-*`, `coeff-header-*-390` and `compute-hover-*-1440`;

each in light and dark.

### pass 4
This is the cure for critic **F4**. The critic's frames are in `pass-04/critic-f4/`, and that set is the BEFORE.
- fourier `010f2d4`, on `m/w1-bump-migration`, pushed fast-forward `24fce16..010f2d4`. Four files, committed by pathspec. `web/src/App.vue` is dirty with another seat's hunk and was not touched.
- latex-paper `0be0e33` (DS-F4-C1's style half), local on `master`, with the 0.3.0 changeset extended. It is not pushed and not published.
- value.js `994fce692` holds the AFTER frames, the cure probe and its JSON, the census and the e2e logs, all in `pass-04/f4/`. The subdirectory keeps the earlier loop's `pass-04/` sets (`critic-f6/`, `f6/`, `cure/`) intact.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F4-C1 | **The root is already cured:** latex-paper `5be04ae` (DS-F9-C3) parses `\item[term]` into the `<dt>`, and a parse test covers fourier's two items. **Style:** in `0be0e33` the `<dt>` moves to the semibold rung (600, was 700), flush, with its definition hanging 1.5rem under it, and no fill, rule or shadow. latex-paper vitest 128/128 ×2. **Served:** the terms are still empty, because fourier pins `^0.2.1` and the repin needs latex-paper 0.3.0. Publishing is an owner act: `npm whoami` returns E401 and this seat has no push grant for latex-paper. No fourier CSS papers over it. Measured: `paper-*` in the probe JSON still shows `dt` text "" at 700 in all 4 cells. **REFUSED (walled), not deferred:** the owner publishes 0.3.0 (`9e0200f` … `0be0e33`), then fourier bumps the pin. |
| DS-F4-C2 | `NotFoundCard.vue`: "Browse the gallery" is `emphasis="text" size="sm"`, the same grammar as the load error and the empty stage: one primary and one quiet link. The card itself is unchanged. Measured in all 4 cells: `primary/md` + `text/sm`. Census: /no-such-route drops one shadow element, 3 layers and one backdrop blur per cell. |
| DS-F4-C3 | `HarmonicLevelGrid.vue`: a fading side is at alpha 0 for a whole gap (`min(fade, 0.5rem)`; it was fade/12 = 4px), so a tile rim that lands in the last gap's width is cut, never left as a lone hairline. The strip also snaps (`scroll-snap-type: x mandatory`, cells `scroll-snap-align: start`), so a scrolled rest cuts at a tile boundary. Measured: the cut tile shows 6px at 1440 and 2px at 390, both inside the cleared band. The strip and the sliders share the card's content edges (617–1259 at 1440, 29–361 at 390). Frames: `morph-levels-*`. |
| DS-F4-C4 | `GalleryInfiniteGrid.vue`: `auto-fit`, so a short set collapses its empty tracks and the cards run to the gutter the toolbar runs to. The grid's measure is capped at 24rem per card for the set it holds (`--gallery-count`), so one or two results stay card-sized. Measured at 1440: last card right = search right = 1424 (it was 1140 against 1424). A long gallery is unchanged. |
| DS-F4-C5 | `epicycles.ts`: the sub-cut tail thread draws at 0.35 (it was 0.6, above the circles' 0.5). It is the quietest stroke in the chain, in its hue (§0dm). Frames: `v-stage-*-1440`, `v-epicycle-hover-*-1440`. |

**Glass-owned, cited, not overridden.**
- DS-F4-G1: primary and secondary `Button` are the same plate (10.1.0's primary sets only depth and 600 weight). Relayed beside O-87 (10.2.0 band 0): primary needs a real fill or ink step inside the flat material. Compute is not re-toned locally, since DS-F3-C3 removed exactly that.
- DS-F4-G2: the stage capsule's ghost plate and the transport's thumbless speed bar are not regressed. They are held under O-88 and O-87 (DS-F3-G2/G3).

**Census** (`scripts/ds-census.mjs` against the cured tree on `:3100`; `census-after.json`):
- Static is unchanged: 8 box-shadow declarations, 10 gradients, 3 keyframes.
- Computed sums: 384 shadow elements, 972 layers, 290 multi-layer stacks, 290 inset highlights, 212 backdrop blur, 0 control gradients, 0 looping chrome. Pass 3 read 388 / 984 / 294 / 294 / 216.
- The only per-cell delta is /no-such-route (C2), at −1 element and −3 layers in each of its 4 cells. The /v cell follows the gallery's newest slug.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e covered 28 specs that reach the changed files (`e2e-specs.txt`: not-found, /morph, /gallery, /v, and the visual checkpoint). They ran on chromium plus mobile-chromium, headless, with 3 workers, against BASE_URL `:3100`. `:3000` is held by the value.js api.
  - Run A: 318 passed, 10 failed.
  - Run B: 319 passed, 5 failed. Two earlier attempts at B died in global-seed with a `POST /api/sessions` timeout at host load ~150–180; their logs are kept as `e2e-runB0/B1-seed-timeout.txt`.
- **Every red also fails on the unmodified HEAD tree.** I checked this with a HEAD worktree served on `:3129` (`e2e-head-baseline.txt`, the same 10 red).
  - The 5 `visual-checkpoint` goldens are stale: the card golden is 240×301 and HEAD renders 277×238.
  - The 4 `gallery-admin-a11y` axe cells and `f-w14v-p` p3 failed in A and passed in B.
  - None was introduced by this cure.
- **No visual golden was re-baselined.** The checkpoint card golden was already RED at HEAD. Under C4 the card's width follows its row (358px in the checkpoint's short set). Re-baselining the card goldens is left to a named owner-ruled re-baseline (§0ej).
- The `web/e2e/screenshots/` tree, including another seat's dirty files, was backed up before the runs and restored after each one. Nothing there was committed.

**Frames** (`pass-04/f4/`). All were captured in headless real Chrome (channel `chrome`, DPR 2; §0ei) by `f4-cure-probe.mjs` against `:3100`, with the pointer parked at (0,0). The critic's cells are `gallery-*`, `gallery-hover-*-1440`, `morph-*`, `morph-scroll-*`, `paper-*` and `v-epicycle-hover-*-1440`. Added: `no-such-route-*`, the crops `morph-levels-*` and `paper-description-*`, and `v-stage-*-1440`. Each was taken in light and dark, at 1440 and 390 where it applies.

### pass 5
This is the cure for critic **F5**. The BEFORE is pass 4's AFTER set (`pass-04/f4/`, the frames the critic judged), with the cure probe's BEFORE measurements in `pass-05/f5/f5-cure-probe-before.json`.
- fourier `56619fc`, on `m/w1-bump-migration`, pushed fast-forward `7f807a3..56619fc`. Six files, committed by pathspec. `scripts/model-smoke.sh` and the `web/e2e/screenshots/` tree are dirty with other seats' changes and were not touched.
- value.js `1168ef218` holds the AFTER frames, the cure probe and its before/after JSON, the census and the e2e logs, all in `pass-05/f5/`. The earlier loop's `pass-05/critic-f7/` and `f7/` sets are left as they were.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F5-C1 | `FourierMorphDemo.vue` + `MorphShapePreview.vue`: below 1024px only the plate and its readings pin. Export and Reset leave the sticky `.stage-column`. The wrapper `.stage-rail` is a plain div (not a component). It is `display: contents` below 1024px, so the actions are an ordinary item that scrolls with the controls, and at 1024px and up it is the sticky column (plate, readings, then actions, as UIA-F-254 placed them). The plate is a 7.5rem strip (120px, the m115 floor), and the four readings fit inside its height, so they add nothing to the band. Measured at 390: the band went from 243 to **133 css px** (28.8% to **15.7%** of 844), and the hairline is kept. The actions moved out of the band (`actionsInStage: false`). Frames: `morph-scroll-*-390` and `morph-*-390`. |
| DS-F5-C2 | **REFUSED (walled), not deferred.** The cause is unchanged from DS-F4-C1. The latex-paper root is cured (`5be04ae`, `0be0e33`), but publishing 0.3.0 is an owner act (npm E401), and fourier repins after that. No local CSS shim was added. Measured: `paper-*` still shows `dt` text "" at 700 in all 4 cells. |
| DS-F5-C3 | `HarmonicLevelGrid.vue`: one tile form at every width. The shape is 64px everywhere (the 48px phone rung is deleted), the tile has a block pad (`--space-atom`), and it is `aspect-ratio: 1` with the automatic minimum in place of the recipe's control-height floor. Measured: at 390 the tile went from a 102×70 capsule to **118×118**. At 1440 it is 98×109, the content holding open the taller side. The `n=` label now clears the foot by 9px (it was 1px). Frames: `morph-levels-*`. |
| DS-F5-C4 | `GalleryCard.vue`: the hover is a lightness step in the card's own hue, `oklch(from var(--card) calc(l ∓ 0.02) c h)` (−0.02 in light, +0.02 under `.dark`). It replaces the `--foreground` veil, which greyed the cream. Measured on hover: light rest `srgb(0.994 0.96 0.926)` → `oklch(0.954 0.0149 67.5)`; dark rest `srgb(0.207 0.165 0.133)` → `oklch(0.275 0.0216 59.2)`. Chroma is kept, and the cream stays cream. The static census loses one decorative gradient (10 → 9). Frames: `gallery-hover-*-1440`. |
| DS-F5-C5 | `NotFoundCard.vue` (layout only; glass's skin is untouched): the text link pulls back by its inset (`--space-residue` + its 1px edge), and the row's column gap grows by the same amount. Wrapped at 390, the glyph is at **x 25 = the title's 25** (it was 30). Beside the primary at 1440 the glyph stays at 748.1, so the spacing there is unchanged. Frames: `no-such-route-*`. |
| DS-F5-C6 | `GalleryInfiniteGrid.vue`: back to `auto-fill, minmax(16rem, 1fr)`, which reverses pass 4's DS-F4-C4 `auto-fit` and its count-keyed 24rem cap. The track count now follows the field's width alone. Measured at 1440: 5 tracks of **272px**, both at the full set (4 results) and when a search term is typed. Before, 4 results gave 343px cards, and the card size followed the result count. A full row ends on the gutter the toolbar runs to. Of the critic's two options this is the stable one. It returns the checkpoint card to its pre-C4 width (277px), so **no golden is re-baselined**. A short set leaves its empty tracks, which is the trade that DS-F4-C4 had tried to remove. |

**Glass-owned, cited, not overridden (O-87 FLAT-LIGHTING named rows).**
- **DS-F5-G1:** `glass-floating`'s `--glass-specular-disc` hover layer sits on the detached Configurator's resting cards (the stage and the aside, from `layout="detached"` in configurator `:69`). It is a disc of about 280px with no pointer tracking, pinned at 50%/50%, and it fades in from 0 to 0.1 on hover. The ask: detached cards take a resting recipe, or the disc leaves `glass-floating` under the "one quiet edge" ruling. Held honest-RED and re-judged at the 10.2.0 repin. `VisualizationView` keeps `layout="detached"`, and no local `::before` override was added.
- **DS-F5-G2:** the `.slider-track.track-well` inset rim is painted on a well taller than the 4–6px track, so every glass Slider reads as two tracks. The ask: the one edge hugs the track, or the decorative bevel is dropped. Held honest-RED, with no local override.

**Census** (`scripts/ds-census.mjs` against the cured tree on `:3100`; `census-after.json`):
- Static: 8 box-shadow declarations, **9** gradients (pass 4 had 10; GalleryCard's hover gradient is gone), 3 keyframes.
- Computed sums: 364 shadow elements, 933 layers, 278 multi-layer stacks, 278 inset highlights, 201 backdrop blur, 0 control gradients, 0 looping chrome. Pass 4 read 384 / 972 / 290 / 290 / 212.
- Read cell by cell, the only deltas are /gallery dark 390 (−2 elements: two fewer seeded cards in that read) and the /v cell, which follows the gallery's newest slug (now `mossy-pulsing-cedar-badger`, dark 390 read in its loading state). Both are data, not lighting. The cures' own surfaces add no shadow, blur or gradient.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- e2e covered the 28 specs from pass 4 (`e2e-specs.txt`), which reach /morph, /gallery, not-found, /v and the visual checkpoint. They ran on chromium plus mobile-chromium, headless, with 3 workers, against BASE_URL `:3100`. Playwright built and served its own `:4190` preview of this tree.
  - Run A: 318 passed, 6 failed.
  - Run B: 318 passed, 6 failed. The same 6 failed in both runs.
  - One earlier attempt at A died in global-seed with a `POST /api/sessions` timeout at host load ~112–130; its log is kept as `e2e-runA0-seed-timeout.txt`.
- **Every red is also red on the unmodified HEAD:**
  - The 5 `visual-checkpoint` goldens are the same stale set as pass 4's HEAD baseline. Card 240×301 golden vs 277×238 rendered; modal 636 vs 628; disclosure; tooltip. The numbers match `pass-04/f4/e2e-head-baseline.txt`.
  - `f-w14u-misc` m208 is a race: about 10 sequential `toBeDisabled` checks against a ~450ms morph under host load ~120. A HEAD worktree served on `:3129` failed it 2 of 3 (`e2e-m208-head-baseline.txt`), and nothing in this cure touches the morph's timing or the tiles' `disabled`.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/` tree, including other seats' dirty files, was backed up before the runs and restored byte for byte after them. Nothing there was committed.

**Frames** (`pass-05/f5/`). All were captured in headless real Chrome (channel `chrome`, DPR 2; §0ei) by `f5-cure-probe.mjs` against `:3100`, with the pointer parked at (0,0):
- `gallery-*` and `gallery-hover-*-1440`;
- `morph-*`, `morph-scroll-*` and `morph-levels-*`;
- `paper-*` and `paper-description-*`;
- `no-such-route-*`;
- `v-stage-*-1440` and `v-epicycle-hover-*-1440` (for G1).

Each was taken in light and dark, at 1440 and 390 where it applies.
