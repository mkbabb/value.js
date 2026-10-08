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
