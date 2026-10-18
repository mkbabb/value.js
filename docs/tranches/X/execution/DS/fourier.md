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

### pass 6
This is the cure for critic **F6**. The BEFORE is the critic's set, `pass-06/critic-f6/` (its frames, `darkprobe.mjs`, `f6probe.mjs`, `dockprobe.mjs`), plus the gallery hover frames it cites from pass 5's AFTER (`pass-05/f5/gallery-hover-*-1440`).
- fourier `64f7429`, on `m/w1-bump-migration`, pushed fast-forward `56619fc..64f7429`. Three files, committed by pathspec. `scripts/model-smoke.sh` and the `web/e2e/screenshots/` tree are dirty with other seats' changes and were not touched.
- value.js `c1127c265` holds the AFTER frames, the cure probe and its JSON, the census and the e2e logs, all in `pass-06/f6/`. The earlier loop's `pass-06/critic-f8/` and `f8/` sets are left as they were.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F6-C1 | **Root:** `:global(.dark) .gallery-card:hover` inside `<style scoped>` compiled to a bare `.dark { background-color: … }`. It repainted `<html>` whenever the GalleryCard chunk loaded, and the card itself kept the light arm. **Cure:** one token, `--card-hover-step`, in `style.css` (−0.02 under `:root`, +0.02 under `.dark`), read by one scoped rule: `oklch(from var(--card) calc(l + var(--card-hover-step)) c h)`. The second arm is deleted. **Measured** (`f6-cure-probe-after.json`): dark rest L 0.295 → hover **0.315** (lighter, toward the page's far end); light 0.974 → 0.954. Chroma and hue are kept (§0dm). The served CSSOM holds one `.gallery-card[data-v-…]:hover` rule and **no** bare `.dark{background-color}` rule (`bareDarkBg: false`, both arms). Frames: `gallery-hover-*-1440`. |
| DS-F6-C2 | `ConvergenceLegend.vue`: the f(t) key's dashed ring is inked `var(--muted-foreground)`. That is the ink ConvergencePlot strokes the dashed f curve in (it reads the canvas's `text-muted-foreground` colour). The literal `rgba(180,180,180,.6)` is deleted. **Measured:** ring = curve ink in both arms, rgb(112,89,66) light and rgb(195,185,172) dark. No glow, no size change. Frames: `equation-legend-*-1440`, `equation-*`. |

**Glass-owned, cited, not overridden.**
- **DS-F6-G1** (the /equation 390 dock plate is an ellipse inside a stadium ghost): re-measured on the AFTER tree. The radius is `50% calc(49.0385% + 0.31px) …` at 390, and 9999px at 1440. That is glass's `--dock-run` cap animation interpolating to a percentage `--dock-cap-cut`. Cited under **O-88 DOCK-COLLAPSE-MOTION** (dock form) beside **O-80 DOCK-OVERFLOW-LAYOUT**. No consumer dock radius is set or added.
- **DS-F6-G2** (the `#persistent` '1024 pts' readout about 7px off the plate's leading edge, with the ghost plate behind it): glass renders `#persistent` outside `.dock-layers` with no inline inset. Cited under **O-88** with DS-F3-G3. No local padding literal. Frame: `v-edit-light-1440`.
- **DS-F6-G3** (the section menu paints no current row; zero icon-to-label gap): fourier sets `aria-current="page"` (AppDock.vue:143). The paint is glass's half (O-59, not in the pinned glass). Relayed beside **O-87** with DS-F-G8, asking for the flat `--fill-selected` tint. No local tint. Frame: `dock-menu-light-1440`.
- **DS-F6-G4** (the Configurator aside's last row cut mid-glyph at its rim, with no edge cue): glass `.configurator-aside` is `overflow-y: auto` with no scroll-edge affordance. Relayed under **O-87**, asking for a flat page-tone fade of at most 1rem, or a hairline when scrolled. No local mask. Frames: `equation-*-1440`.

**Census** (`scripts/ds-census.mjs` against the cured tree on `:3100`; `census-after.json`):
- Static is unchanged: 8 box-shadow declarations, 9 gradients, 3 keyframes. The C1 cure removes a rule and adds no lighting. C2 swaps a literal for a token.
- Computed sums: 384 shadow elements, 972 layers, 290 multi-layer stacks, 290 inset highlights, 212 backdrop blur, 0 control gradients, 0 looping chrome. These equal pass 4's read exactly.
- Against pass 5 (364 / 933 / 278 / 278 / 201), the delta is data, not lighting:
  - the /v cell is back on `plush-evening-olive-squid` (pass 5 read `mossy-pulsing-cedar-badger` in its loading state);
  - /gallery dark 390 holds two more seeded cards (106 → 122 elements, +2 shadow elements).
- The first census attempt died on a mid-evaluate navigation under host load; its log is kept as `census-attempt1-nav-race.log`.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116, twice.
- **e2e: NOT GREEN ×2. The reds are instrument and backend faults, measured, and none is on a surface this cure changed.**
  - The spec set is 32 specs: pass 5's 28 plus `equation-interaction`, `f-w14u-eq`, `f-w14v-eq2` and `f-w13-radius` for C2 (`e2e-specs.txt`). It ran headless on chromium plus mobile-chromium, 3 workers, at host load ~160–520.
  - `e2e-3100-hung/`: against the shared `:3100` dev server.
    - Run A: 332 passed, 15 failed. The 6 production-bundle cases got ERR_CONNECTION_REFUSED on `:4190`, because the preview could not bind ("Port 4190 is already in use"). There were 3 admin-table backend timeouts, item 8 failed on a 5s screenshot fonts-wait, and the 5 stale goldens failed.
    - Run B then died in global-seed 5 times: `:3100` stopped answering even `GET /gallery` (20s+), while the backend on `:8000` answered in 30ms.
  - `e2e-8000-compute-500/`: against my own dev server of this tree on `:3131`, proxied to the shared backend on `:8000`.
    - **Run A: 339 passed, 8 failed.** The 5 `visual-checkpoint` goldens are the same stale set that is RED at HEAD since pass 4: card 246×307 golden vs 277×238 rendered. The other 3 are load-bound timeouts: an `equation-interaction` compute wait, UIA-F-19's canvas attach and UIA-F-48's Drafts list.
    - **Run B: 331 passed, 16 failed.** 11 /equation reds plus the 5 goldens. The 11 are one cause: the shared uvicorn (pid 75924, up since 10-08) answers **`POST /api/equations/compute` with 500 "Internal server error" in 36 ms**. That was measured by `curl` straight to `:8000` with `{"expression":"x^2"}`, so no web code was involved. A focused recheck of those specs failed the same 11 (`e2e-runB-equation-recheck.txt`).
  - A backend started from this checkout on `:8131` (the shared one's `MONGO_URI`/`BLOB_DIR`/rate-limit env) computes the same expression (200). But its `extract-contour` pool deadlocked: 8.5 GB resident, the worker idle, and global-seed timing out at 120s 8 times (`e2e-8131-contour-hang/`). This is the §0em contour-model fault class, so that instrument could not seed a run.
  - A CSS custom property and a border colour cannot produce an HTTP 500 or a seed timeout. A green ×2 needs the shared backend's compute restored. That process belongs to another seat; it was not restarted.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/` tree, including other seats' dirty files, was backed up before the runs and restored after each one. Nothing there was committed.

**Frames** (`pass-06/f6/`). All were captured in headless real Chrome (channel `chrome`, DPR 2; §0ei) by `f6-cure-probe.mjs` against `:3100` before it hung, with the pointer parked at (0,0):
- `gallery-*` and `gallery-hover-*-1440` (C1);
- `equation-*`, `equation-legend-*-1440` and `equation-scroll-*` (C2, G1, G4);
- `v-*-1440`, `v-edit-light-1440` and `dock-menu-light-1440` (G2, G3).

Each was taken in light and dark, at 1440 and 390 where it applies.

### pass 2
This is a **re-witness, not a new cure.** The workflow was redeployed and handed this seat critic **F2R**'s findings again. Those six consumer rows were cured on 2026-10-09 at fourier `a06c10e` (the earlier "### pass 2" receipt above, evidence `pass-02/f2r/`). The seat checked each cure against the tree before touching anything, found all six standing at fourier HEAD `c6a242d`, and changed no fourier file.
- fourier: no commit and no push. `a06c10e` is an ancestor of `c6a242d` on `m/w1-bump-migration`.
- value.js `b36045ef4` holds the re-read frames, the probe JSON and the census in `pass-02/f2r-rewitness/`. The original `pass-02/` frames and `f2r/`, `f4r/` are left as they were.

**Consumer findings, re-measured on the served HEAD tree** (`f2r-cure-probe-after.json`, the pass's own probe re-run against `:3100`).

| id | standing |
|---|---|
| DS-F2R-C1 | `style.css` holds no `.dark .katex` rule. Each notation glyph's ink equals its label's ink in all 4 /equation cells, the pressed Trig chip included. |
| DS-F2R-C2 | Only two captions remain in `web/src`: Function's `f(t)` and Coefficients' count. /equation reads `Function f(t) · Controls · Coefficients 21 harmonics · n = ±20`; /v reads `Image · Basis · Contour · Coefficients`. |
| DS-F2R-C3 | Stage 1408×800 at radius 16px; dashed zone 5px in at radius 12px (1440). At 390 the zone is 348px wide in a 358px stage. |
| DS-F2R-C4 | "Browse the gallery" is `emphasis="text" size="sm"` on the empty stage, the error stage and NotFoundCard: 14.38px at 1440, 18.27px at 390 (glass's coarse-pointer ramp), after the format caption. |
| DS-F2R-C5 | Legend 539.6px against a 539.6px plot at 1440, both themes. |
| DS-F2R-C6 | Preset rows 4/4 at 1440 and 3/3/2 at 390, both themes. |

One reading differs from the first receipt: /v's Coefficients heading carried no count in these frames (the first receipt read `all 201 harmonics`). The probe reads 6 s after load, and the census caught the same cell still loading, so this is most likely the list not yet filled; it was not chased further.

**Glass-owned, cited, not overridden.** DS-F2R-G1 holds honest-RED on O-87 FLAT-LIGHTING until the glass 10.2.0 repin. DS-F2R-G2 holds on O-88 DOCK-COLLAPSE-MOTION, with O-87 for the cast. No local override exists or was added.

**Owner ruling only.** DS-F2R-G3 (the morph sun reads as a gear at icon size) is identity (§0dm) and was not touched.

**Census** (`scripts/ds-census.mjs` on `:3100`; `f2r-rewitness/census-after.json`). Still RED on the glass rows.
- Static: 8 box-shadow declarations, 12 layers, 7 gradients, 3 keyframes, 0 infinite animations.
- Computed sums: 378 shadow elements, 948 layers, 283 multi-layer stacks, 283 inset highlights, 212 backdrop blur, 0 control gradients, 1 looping animation. The one loop is the /v light 1440 cell read mid-load; it was not re-read.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116 (20 files), twice.
- e2e: **not run.** No file changed, so no spec touches a changed file; the 22-spec set last ran for these cures in the first pass-2 receipt.
- No visual golden was re-baselined.

**Frames** (`pass-02/f2r-rewitness/`). Headless real Chrome (channel `chrome`, DPR 2; §0ei), `f2r-cure-probe.mjs` against `:3100`: `equation-*`, `w-*`, `v-*` and `v-error-*` at 1440 and 390, plus `notation-*-1440` and `presets-*-390`, each in light and dark.

### pass 3
This is the cure for critic **F3R** (the redeploy's pass-3 critic). The BEFORE is the critic's set, `pass-03/critic-f3r/` (its frames, `f3r-critic-probe.mjs`, `f3r-critic-probe2.json`), plus the frames it cites from `pass-02/f2r-rewitness/`.
- fourier `c4b6a0f`, on `m/w1-bump-migration`, pushed fast-forward `c6a242d..c4b6a0f`. Four files, committed by pathspec. `scripts/model-smoke.sh`, `src/fourier_analysis/contours/ml.py` and the `web/e2e/screenshots/` tree are dirty with other seats' changes and were not touched.
- value.js `cbe5b632d` holds the AFTER frames, the cure probe and its JSON, the census and the e2e logs, all in `pass-03/f3r/`. The earlier loop's pass-03 sets (`cure/`, `f3/`, `f5/`, the top-level frames) are left as they were.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F3R-C1 | `BasisSelector.vue`: `.basis-group-label` takes `font-size: var(--control-label)`, the token glass Label (and so `.control-row-label`) is sized by. `--type-small` is deleted from the rule. **Measured** (`f3r-cure-probe-after.json`): heading = row label in all four cells, 14.54px at 1440 and 18.62px at 390 (was 14px under 18.6px at 390). At 1440 the heading was 16.4px over 14.5px; it now sits on the row's rung there too, which is what the pass-2 comment on the rule already claimed. Frames: `v-controls-*-390`, `v-loaded-*-1440`. |
| DS-F3R-C2 | `GallerySearchBar.vue`: the Separator loses `h-5 shrink-0` and takes one scoped rule, `align-self: center; block-size: calc(var(--control-h-xs) - 0.5rem)`. Glass's vertical Separator is `align-self: stretch`, so a fixed height hung from the top of the actions run. **Measured:** off-centre 0 in all four cells; the rule is 20px in the 40px field at 1440 and 36px in the 60px field at 390. The actions slot did not top-align, so nothing is relayed to glass. Frames: `gallery-*`. |
| DS-F3R-C3 | `style.css`, beside the paper bridge: `article.paper-article .paper-cite { hyphens: manual; white-space: nowrap; }`. The class is latex-paper's (`<cite class="paper-cite">`). **Measured:** each cite is one line box, none overflows the article at 390 (115px in a 358px column), and prose still computes `hyphens: auto`. The paper's longest cites are two-key (`szego_orthogonal, gray_toeplitz`); those sections were not scrolled into view, so their fit at 390 is by arithmetic, not by frame. Frames: `paper-scrolled-*`. |
| DS-F3R-C5 | `VisualizationView.vue`: decided once, the critic's first option. `.drop-zone`'s border is `1px dashed transparent` at rest and is inked (`--focus-ring-color`) only under `.drop-target[data-dragging]`, the rule that already existed. The stage's own hairline is the one frame; the zone's box and radius are unchanged (5px in, radius 12px in a 16px stage), so the pass-2 C3 concentricity holds for the drag state. **Measured:** rest `rgba(0,0,0,0)`; dragging `rgb(28,25,23)` light, `rgb(186,183,171)` dark. Frames: `w-*`, `w-dragging-*-1440`. |

**Refused: an owner ruling, not a cure.**
- **DS-F3R-C4** (Epicycles and Series both wear the script-F). The glyph on both chips was restored by owner ruling at F.W14U.c2 (COHESION §0dc: "The ℱ glyph is back on the Epicycles and Series chips"). Swapping one for a Sigma or dropping both removes the identity mark from a chip, which §0dm reserves to the owner. Left as it stands; the row is open for the owner.

**Glass-owned, cited, not overridden.**
- **G1** (stacked bevel and casts on stage, aside, cards, buttons, docks), **G2** (the pointer-following `::before` specular) and **G7** (the progress rail's fill and sweep): held honest-RED on **O-87 FLAT-LIGHTING** until the 10.2.0 repin.
- **G3** (dock collapse form, the transport pill, the 390 ellipse): held on **O-88 DOCK-COLLAPSE-MOTION**, with O-87 for the halo cast.
- **G4** (the translucent section menu; no current-row paint, no icon gap), **G5** (text-emphasis Button is ink in light and violet in dark), **G6** (the coarse ramp grows labels but not values, inputs or captions; inputs under 16px), **G8** (Select and Input wear two field fills) and **G9** (the Strategy Select's chevron; not re-checked on a fresh load): for relay to glass beside O-87. This seat wrote no relay file and no local plate, colour, ramp or fill.

**Census** (`scripts/ds-census.mjs` on `:3100`; `f3r/census-after.json`). Still RED on the glass rows; unchanged by this cure.
- Static: 8 box-shadow declarations, 12 layers, 7 gradients, 3 keyframes, 0 infinite animations.
- Computed sums: 378 shadow elements, 948 layers, 283 multi-layer stacks, 283 inset highlights, 212 backdrop blur, 0 control gradients, 1 looping animation (a cell read mid-load, as in the pass-2 re-witness). These equal the re-witness's read exactly.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116 (20 files), twice.
- **e2e: NOT GREEN ×2.** Nine specs (`e2e-specs.txt`), headless, chromium plus mobile-chromium, 3 workers, against `:3100`, at host load 90–190.
  - Run A: 78 passed, 4 failed. Run B: 78 passed, 4 failed. Three reds repeat: `f-w13-image-controls:200` (playback autostart never reads `aria-pressed="true"`), `f-w14u-vstage:300` e169 (the "Edit contour" button never appears) and `visual-checkpoint:164` item 3 (no `POST /api/equations/compute` response in 30s). All three wait on a backend compute.
  - Serial recheck of those three (`e2e-recheck-3b.txt`, 1 worker): 3 passed (both e169 cells and item 3), 1 failed (the playback autostart again). The first recheck attempt died in global-seed: `POST /api/sessions` took 32–40s by `curl` at load ~190 (`e2e-recheck-3.txt`).
  - None of the reds asserts on a surface this cure changed, but the playback-autostart red was not isolated against the parent commit, so it is unproven rather than cleared.
- **No visual golden was re-baselined.** `web/e2e/screenshots/` was backed up before the runs and restored after each one.

**Frames** (`pass-03/f3r/`). Headless real Chrome (channel `chrome`, DPR 2; §0ei), `f3r-cure-probe.mjs` against `:3100`, pointer parked at (0,0): `gallery-*`, `paper-scrolled-*` and `w-*` at 1440 and 390, `v-loaded-*-1440`, `v-controls-*-390` and `w-dragging-*-1440`, each in light and dark.

### pass 3
This is the cure for critic **F3C** (the third redeploy's pass-3 critic). The BEFORE is the critic's frame set, `critic-p3-2026-10-14/`.
- fourier `3084b6c`, on `m/w1-bump-migration`, one file (`labels.ts`), committed by pathspec and pushed fast-forward `3d2f80d..512f5a9`. The push also carried `512f5a9`, another seat's evidence commit that landed on the branch after this one.
- value.js `615e13215` holds the AFTER frames, the cure probe and its JSON, the census and the e2e logs, all in `pass-03/f3c/`. The earlier sets under `pass-03/` are left as they were.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F3C-C2 | `canvas-drawing/labels.ts`: the legend title ("Epicycles", in both `drawBasisLabels` and `drawEpicycleLabel`) is set in `--font-text`, read off the canvas at draw time the way the caption ink is read, with the CM serif stack as the fallback. Mono stays on the count caption only, and the hue is unchanged. **Measured** (`f3c-cure-probe-after.json`, 1440, both themes): the title font is `bold 16px "Computer Modern Serif", …`, which is the chip's computed face. The count is still `13px "Fira Code"`. Frames: `v-*-1440`. **At 390 the legend was not witnessed.** The probe read the default Controls tab, where the stage is not drawn (`v-*-390` shows the aside). The probe now clicks the Canvas tab, but its re-run never got a guard slot (see Gates). |

**Refused (walled), not deferred.**
- **DS-F3C-C1** (/paper `<dt>` empty). This is the same row as DS-F9-C3, DS-F4-C1 and DS-F5-C2.
  - The parser root is already cured in latex-paper: `5be04ae` parses `\item[term]` into `DescriptionNode.term`, and `0be0e33` styles the term. Both are local on latex-paper `master` under the 0.3.0 changeset, which is not published.
  - Publishing is an owner act: `npm whoami` still returns E401 (2026-10-15). After the release, fourier bumps `^0.2.1`.
  - **Measured:** `dt` text is `""` at weight 700 in all 4 cells (`paper-*`). No local CSS was added and the TeX was not rewritten, as the finding rules.

**Glass-owned, cited, not overridden.** No local override exists or was added for any of these.
- **G1** (the coarse-pointer type ramp inverts label, value and card title at 390) is for relay to glass as a type-ramp row beside **O-87**. Once glass ships it, `.config-card-title` (MorphPhaseConfig.vue:195) moves to the heading rung. No per-instance font-size was set.
- **G2** (the in-stage fit-content docks draw a doubled plate and ellipse ring, and carry a floating cast) is held honest-RED on **O-88 DOCK-COLLAPSE-MOTION**, with **O-87** for the cast, until the 10.2.0 repin.
- **G3** (text-emphasis Button is ink in light and violet in dark, because `--primary` differs between the arms) and **G4** (the SelectTrigger's resting fill differs from field-control's in dark) are for relay to glass beside O-87.

**Census** (`scripts/ds-census.mjs` on `:3100`; `f3c/census-after.json`). Still RED on the glass rows.
- Static: 7 box-shadow declarations, 11 layers, 7 gradients, 3 keyframes, 0 infinite animations. That is one fewer declaration and layer than at F3R, from fourier `3d2f80d` (pass 4), not from this cure.
- Computed sums: 378 shadow elements, 950 layers, 284 multi-layer stacks, 284 inset highlights, 212 backdrop blur, 0 control gradients, 0 looping animations.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run`: 116/116 (20 files), twice.
- **e2e: GREEN ×1 only; the second run is owed.** The specs that read the canvas legend, `f-w14v-u4` and `f-w14u-vstage`, ran headless on chromium plus mobile-chromium with 1 worker against `:3100`.
  - Run A: 29/29 passed (`e2e-runA.txt`).
  - Run B died in global-seed: `POST /api/sessions` timed out after 30s at host load about 80–120 (`e2e-runB.txt`). The same call answered in 16 ms by `curl` afterwards.
  - The re-run of B, together with the 390 probe, waited more than 3 hours for one of `guarded`'s 3 heavy slots, with 15–55 heavy runs queued machine-wide. Two background waits were also killed from outside the seat (exit 144). It was stopped unrun.
- **No visual golden was re-baselined.** `web/e2e/screenshots/` was backed up before the runs and restored after each one; this seat left no changes in it.

**Frames** (`pass-03/f3c/`). Headless real Chrome (channel `chrome`, DPR 2; §0ei), `f3c-cure-probe.mjs` against `:3100`: `paper-*` and `v-*` at 1440 and 390, each in light and dark. The `v-*-390` frames show the Controls tab, not the stage.

### pass 4
This is the cure seat for critic **F4X** (the redeploy's pass-4 critic, 2026-10-15). The BEFORE is the critic's frame set, `pass-04/critic-p4-2026-10-15/` (its frames and `p4-critic-probe.mjs`/`.json`).
- **No fourier change.** None of the three rows is a consumer defect: two are glass-owned and one is a witness. fourier stays at `6b46ef1` on `m/w1-bump-migration`, and nothing was pushed.
- value.js `293019af0` holds the AFTER frames, the probe and its JSON, the census and the gate logs, all in `pass-04/f4x/`. The other sets under `pass-04/` are left as they were.

**Glass-owned, cited, not overridden.** No local override exists or was added; fourier sets no `--glass-specular-intensity-*` and no `--mouse-x`/`--mouse-y` (grep of `web/src`).
- **DS-F4X-G1** (the hover disc on the /v stage sits at the centre, not under the pointer). Re-measured at fourier HEAD (`f4x-probe.json`). `.configurator-stage` is `glass-floating`. Its `::before` is glass 10.1.0 `material.css`'s radial gradient at `var(--mouse-x,50%) var(--mouse-y,50%)` with `plus-lighter`. Both variables are empty on the stage, so the disc is centred. Opacity goes from 0 at rest to 0.1 (light) or 0.08 (dark) with the pointer at (230,640). Held honest-RED on **O-87 FLAT-LIGHTING** until the 10.2.0 repin: a resting stage gets no hover specular, or the disc tracks the pointer. Frames: `v-hover-*-1440` against `v-*-1440`.
- **DS-F4X-G2** (/paper's ScrollProgressRim draws a full-width track at value 0). Re-measured: `.scroll-progress-rim__track` is 3px tall and 1424px wide at 1440 (374px at 390). It is `oklch(0.888 …)` in light and `oklch(0.131 …)` in dark, while `__fill` is transparent. It is for relay to glass beside **O-87**: draw the fill only, or use a hairline track, and hide the rim at value 0. If glass declines, the owner rules whether /paper keeps the rim (UIA-F-157's ruled rim test stands, DS-F4R-C6). Fourier supplies only the chapter-hue `stops`. Frames: `paper-*`.

**Witness (no cure owed).**
- **DS-F4X-W1:** the 390 Canvas-tab legend is witnessed. "Epicycles" is in the bold CM serif with the ℱ mark in the identity red, and "39 of 401 circles" is in mono beneath it, top-left in the stage, as at 1440. This closes the 390 gap left at pass 3 F3C, so DS-F3C-C2 holds at 390. Frames: `v-light-390`, `v-dark-390`.

**Census** (`scripts/ds-census.mjs` on `:3100`; `f4x/census-after.json`). Still RED on the glass rows, and unchanged by this pass.
- Static: 7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations.
- Computed sums: 378 shadow elements, 950 layers, 284 multi-layer stacks, 284 inset highlights, 212 backdrop blur, 0 control gradients, 0 looping animations. These equal pass 3 F3C's read exactly.

**Gates.**
- `vue-tsc -b`: 0, twice.
- `vitest run --maxWorkers=2`: 116/116 (20 files), twice. Run 1 waited about 20 minutes for a heavy `guarded` slot (12–14 queued). Run 2 ran under `guarded --light`, because the suite takes 2.3s.
- **e2e: not run.** No fourier file changed, so no spec touches a changed file.
- **No visual golden was re-baselined.**

**Frames** (`pass-04/f4x/`). Headless real Chrome (channel `chrome`, DPR 2; §0ei), `f4x-probe.mjs` against `:3100`, using the critic's cells:
- `v-*` at 1440 and 390 (390 on the Canvas tab);
- `v-hover-*-1440` (pointer at 230,640);
- `paper-*` at 1440 and 390;
- each in light and dark.

### pass 5
This is the cure seat for critic **F5X** (the redeploy's pass-5 critic, 2026-10-16). The BEFORE is the critic's cells (`equation-*-390`, `dock-equation-late`, `toc-hover`), which the critic did not commit; the earlier sets under `pass-05/` (`critic-f7`, `f5`, `f7`) are left as they were.
- fourier `52a68a0`, on `m/w1-bump-migration`, one file (`web/src/components/paper/PaperTocTree.vue`), committed by pathspec and pushed fast-forward `9c82849..52a68a0`. The push also carried `6b46ef1`, another seat's F.REL commit that was local on the branch.
- value.js `f91799a7b` holds the AFTER frames, the probe and its JSON, the census and the gate logs, all in `pass-05/f5x/`.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F5X-C1 | Tokens before instances. The selected leaf's plate moves from an ad-hoc `color-mix(--muted 40%)` to glass's `--fill-selected` (0.12) on `--foreground`. Hover now paints the **row**, `.toc-row:has(> .toc-link:not([aria-current]):hover)`, on `--fill-hover` (0.05), and the link's own quiet-Button hover fill is set transparent. Both states share the row's shape, with the chevron inside, and the row carries glass's engage transition. No shadow or weight step was added. **Measured** (`f5x-probe.json`, 1440, both themes): the leaf row's alpha is 0.12 and the hovered row's ("2. Lens I") is 0.05, both 290px wide with the chevron inside; the link fill is transparent; the fill clears when the pointer leaves. Frames: `toc-hover-*-1440`, `paper-*-1440`. |
| DS-F5X-T1 | The probe parks the pointer at (0,0) before navigating and throws unless no `.toc-link` matches `:hover` at rest. Measured: 0 hovered in both themes (`rest.hovered`). |

**Glass-owned, cited, not overridden.** fourier sets no `.dock-plate` radius and no `--mouse-x`/`--mouse-y`.
- **DS-F5X-G1** (the /equation 390 dock plate is an ellipse inside the pill). Re-measured: `.dock-plate` border-radius is `50% calc(49.0385% + 0.307692px) calc(49.0385% + 0.307692px) 50%` at load and still after 8 s idle, at a plate width of 370px; the `.app-dock` shell is `9999px`. This is a new witness on **O-88 DOCK-COLLAPSE-MOTION**: the morph must settle the plate on `--radius-pill`, including on the always-expanded first mount, with a born-RED witness at 390 on a 370px dock. It is held honest-RED until the 10.2.0 repin. Frames: `equation-*-390`, `dock-equation-late`.
- **DS-F5X-G2** (the centred hover specular on the /paper ToC aside, `.glass-floating::before`). Folded into **DS-F4X-G1** under **O-87 FLAT-LIGHTING** as a second site, with no new row; re-judged at the 10.2.0 repin. It is visible in `toc-hover-*-1440`.

**Census** (`scripts/ds-census.mjs` on `:3100`; `f5x/census-after.json`). Still RED on the glass rows, and unchanged by this cure.
- Static: 7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations.
- Computed sums: 378 shadow elements, 950 layers, 284 multi-layer stacks, 284 inset highlights, 212 backdrop blur, 0 control gradients, 0 looping animations. These equal pass 4 F4X's read exactly.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run --maxWorkers=2`: 116/116 (20 files), twice (under `guarded --light`).
- **e2e: GREEN ×2.** The five specs that read the ToC (`e2e-specs.txt`: `f-w14-uia`, `f-w14u-paper`, `f-w14u-misc`, `f-w14-residuals`, `f-w14u-t`) ran headless on chromium plus mobile-chromium with 1 worker against `:3100`. Run A: 92/92 passed. Run B: 92/92 passed.
- **No visual golden was re-baselined**; `web/e2e/` was left clean after both runs.

**Frames** (`pass-05/f5x/`). Headless real Chrome (channel `chrome`, DPR 2; §0ei), `f5x-probe.mjs` against `:3100`:
- `paper-*-1440` (at rest) and `toc-hover-*-1440` (pointer on a non-selected row);
- `equation-*-390` and `dock-equation-late` (light, after 8 s idle);
- each in light and dark.

### pass 6
This is the cure seat for critic **F6X** (the redeploy's pass-6 critic, 2026-10-16). The BEFORE is the critic's set, `pass-06/critic-f6x/` (its frames, `probe.mjs`/`.json` and `metric.mjs`), plus `pass-05/f5x/equation-dark-390.png`. The other sets under `pass-06/` (`critic-f6`, `f6`) are left as they were.
- fourier `6f2748e`, on `m/w1-bump-migration`, one file (`web/src/components/gallery/GalleryCard.vue`), a comment-only change committed by pathspec. It reached origin fast-forward under another seat's later F.REL push (`e89b032`, on top of it).
- value.js `d23ac91c1` holds the AFTER frames, the probe and its JSON, the census and the gate logs, all in `pass-06/f6x/`.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F6X-T1 | The stale sentence in the `.gallery-card` style comment ("Hover lifts the cast one rung — glass's own `--card-cast-rung` …") is replaced by one that names what the rule below does: hover is the F1-13 tone step, never a cast promotion or a transform. No behaviour change. |
| DS-F6X-T2 | **No cure, as the finding rules.** The empty fifth track at 1440 is honest `auto-fill` with the 4-item seed corpus, and it resolves with a real corpus. `auto-fit` would make few cards over-wide, so `auto-fill` is kept; the owner may rule otherwise. Frame: `gallery-dark-1440`. |

**Glass-owned, cited, not overridden.** fourier defines no `--shadow-color` and no per-instance cast (grep of `web/src`: 0 hits), and none was added.
- **DS-F6X-G1** (in dark, every glass cast is a cream glow halo, not a shadow). Re-measured at fourier HEAD (`f6x-probe.json`, dark 1440): the /equation Compute capsule's cast is `color(srgb 0.914 0.9 0.886 / 0.14) 0 8px 24px`, and `article.glass-resting.gallery-card` stacks `oklch(0 0 0 / 0.08) -1.5px 4px 16px -2px` under two cream layers (`/ 0.12 0 4px 20px`, `/ 0.08 0 4px 16px`). The cause is glass 10.1.0 binding `--shadow-color: var(--foreground)`, which flips to cream under `.dark`. This is a new witness on **O-87 FLAT-LIGHTING**, distinct from DS-F2R-G1 (that row is the stack and recipe; this one is the inverted cast colour): in dark, glass derives the cast from a near-black ink, or drops resting casts and lets the single quiet edge carry the separation. Held honest-RED and re-judged at the 10.2.0 repin. Frames: `equation-dark-390`, `equation-dark-1440`, `visualize-dark-1440(-hover)`, `gallery-dark-1440`, `morph-dark-390`.
- **DS-F6X-G2** (the /morph 390 `.demo-info` glass Metric row: the label outweighs its value on the coarse ramp). Folded into **DS-F3C-G1** (the coarse type-ramp relay beside O-87) as a new witness: Metric's label must stay at or below its value on every ramp. No consumer override was added. Frame: `morph-dark-390`.

**Census** (`scripts/ds-census.mjs` on `:3100`; `f6x/census-after.json`). Still RED on the glass rows, and unchanged by this cure (the change is a comment).
- Static: 7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations.
- Computed sums: 378 shadow elements, 950 layers, 284 multi-layer stacks, 284 inset highlights, 212 backdrop blur, 0 control gradients, 0 looping animations. These equal pass 5 F5X's read exactly.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run --maxWorkers=2`: 116/116 (20 files), twice (under `guarded --light`).
- **e2e: GREEN ×2.** The three specs that read the gallery card (`e2e-specs.txt`: `f-w14u-gallery`, `gallery`, `f-w14v-au4`) ran headless with `--project=chromium --project=mobile-chromium`, 1 worker, against `:3100`; the specs select chromium only. Run A: 49/49 passed. Run B: 49/49 passed. `visual-checkpoint` was not run, because a comment cannot move a pixel.
- **No visual golden was re-baselined**; `web/e2e/` was left clean after both runs.

**Frames** (`pass-06/f6x/`). Headless real Chrome (channel `chrome`, DPR 2; §0ei), `f6x-probe.mjs` (the critic's probe, with /equation 390 added) against `:3100`:
- `visualize-*` at 1440 and 390, plus `visualize-*-1440-hover`;
- `equation-*`, `morph-*` and `gallery-*` at 1440 and 390;
- each in light and dark.

### pass 7
This is the cure seat for critic **F7X** (the redeploy's pass-7 critic, 2026-10-16). The BEFORE is the critic's cells (`/v`, `/visualize`, `/equation`, `/paper` 1440 and 390, `/morph` 1440), which the critic did not commit, plus `pass-06/f6x/morph-light-1440.png` and `pass-00/ref-576e40a/morph-light-1440.png` (PRE-DOCK). The other sets under `pass-07/` (`f7`, the loose `pass-07/*` files) are left as they were.
- fourier `5fbe1cf`, on `m/w1-bump-migration`, four files (`web/src/components/paper/PaperTocBar.vue`, `web/src/components/paper/PaperTocDrawer.vue`, `web/src/components/ui/SliderControl.vue`, `web/e2e/f-w14-control-row.spec.ts`), committed by pathspec. Origin had moved on (F.CT3 r1, `8a5e1bc`), so it was merged in (`9338e26`, no file overlap) and pushed fast-forward `8a5e1bc..9338e26`.
- value.js (this commit's sibling) holds the AFTER frames, the probe and its JSON, the census and the gate logs, all in `pass-07/f7x/`.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F7X-C1 | Glass first. The two hand-assembled ToC plates leave the `.glass-opaque` class (whose `--glass-level: 0` never reaches the tier's finished blur token, G1) for glass's own `data-surface="opaque"`, which is the rule Card `surface="opaque"` renders (`surface-axis.css`: solid `--card`, `backdrop-filter: none`). The rail keeps its `glass-quiet` rung and the bar its `glass-resting` rung. No local `backdrop-filter`. **Measured** (`f7x-probe.json`): `nav.sidebar-nav` at 1440 and `.floating-toc-bar` at 390 read `backdrop-filter: none`, `data-surface="opaque"`, in light and dark (before: `blur(14px) saturate(1.5)` and `blur(16px) saturate(1.5)`). On /paper 390 the only blur left is the dock plate. The f-w14u-paper chip and rail assertions are green ×2. |
| DS-F7X-C2 | Revive the PRE-DOCK density at the root (`SliderControl`, the one control-row idiom). The row marks its kind (`data-row-kind`: `hint` or `plain`). At `(min-width: 1024px) and (pointer: fine)`, a plain row lays label, field and track on one line, and the track takes the free space. The order is label, field, track, which is the DOM order (so the tab order is unchanged) and PRE-DOCK's measured order in `576e40a` (the finding's cure text says label, track, field, but its own description of the reference frame and the frame itself read label, field, track). Labels get PRE-DOCK's 2.5 rem column (`.level-label`), so Low and High start on one x. The track has an 8 rem floor, and a row too narrow for it wraps back to today's stack: line 1 takes the full width, the field sits at its end, and the track has its own line. Hint rows keep P2-07's caption line, and the coarse and 390 ramps keep the stack. No hue or glass recipe changed. **Measured** (`f7x-probe.json`, both themes): at 1440, Low and High are 36 px one-line rows (before about 80), with the field at x 48 and the track at x 132 (510 px) in both. The Harmonic Levels card is 303 px (before about 510). At 1024, the three Duration rows and Low/High are 36 px one-line rows. At 390 every row is the stack (82 px). **Residual, stated:** at 1440 the three phase cards' Duration rows stay stacked (68 px), because the card's content is 178 px, under label + field + unit + the 8 rem floor; PRE-DOCK's cards were wider (no stage column). Six whole tiles still show at 1440, because the strip's tile count is set by its width, not by the card's height. If the owner wants Duration one-line inside the 3-up cards at 1440, that needs a narrower field rung or a different card grid, which is an owner layout ruling. |
| f-w14-control-row | Restated per row kind, as the finding asks. The track lies beneath line 1 **or** on it after the field (`inline`). The height gate is grouped by hint × inline. A new assertion: a hint row never goes one-line. Run A at 1440 logged `morph Low/High … inline=1 … h=36`. |

**Glass-owned, cited, not overridden.** fourier adds no `backdrop-filter` anywhere (grep of `web/src`: 0 declarations).
- **DS-F7X-G1** (`.glass-opaque` keeps the tier's frost). Re-measured at fourier `5fbe1cf` (`f7x-probe.json`): the /equation `.configurator-stage` and `aside.configurator-aside` still read `blur(20px) saturate(1.5)` at 1440 (the aside also at 390), and so does the /visualize stage. The cause is glass 10.1.0's `ladder-undershadow.css`, which sets only `.glass-opaque{--glass-level:0}`, while the tier tokens `--glass-blur-*` resolve `var(--glass-level)` at the theme scope and inherit as finished values. This is a new witness on **O-87 FLAT-LIGHTING**: glass makes `.glass-opaque` honour `glass-system.md:13` ("solid --card + blur(0)"), either by re-declaring the three blur tokens (or `backdrop-filter: none`) on `.glass-opaque` and the tier classes, or by aliasing the class to `[data-surface="opaque"]`. Held honest-RED and re-judged at the 10.2.0 repin. The Configurator plates keep the class (the comments at `VisualizationView.vue:433/444` and `EquationView.vue:413` rely on glass's documented contract), and no local override was added. Frames: `equation-*-1440`, `equation-*-390`, `visualize-*-1440`.

**Census** (`scripts/ds-census.mjs` on `:3100`; `f7x/census-after.json`). Still RED on the glass rows.
- Static: 7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations (unchanged).
- Computed sums: 378 shadow elements, 950 layers, 284 multi-layer stacks, 284 inset highlights, **208 backdrop blur (from 212: the two ToC plates × light/dark, C1)**, 0 control gradients, 0 looping animations.

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run --maxWorkers=2`: 116/116 (20 files), twice (under `guarded --light`).
- **e2e: GREEN ×2.** The ten specs that read the changed files (`e2e-specs.txt`: `f-w14-control-row`, `f-w14u-paper`, `f-w14u-misc`, `f-w14v-au3`, `f-w14-uia-r2`, `f-w14v-au0`, `f-w14v-au1`, `f-w14u-vstage`, `f-w14v-x7`, `paper-performance`) ran headless with `--project=chromium --project=mobile-chromium`, 1 worker, against `:3100`. Run A: 124/124 passed. Run B: 124/124 passed.
- **No visual golden was re-baselined** (`visual-checkpoint` frames neither /morph nor the ToC plates). The `e2e/screenshots/f-w14/after-*` frames that the control-row spec rewrites were restored to HEAD after the runs, so `web/e2e/` holds only other seats' hunks.

**Frames** (`pass-07/f7x/`). Headless real Chrome (channel `chrome`, DPR 2; §0ei; 390 with touch), `f7x-probe.mjs` against `:3100`:
- `morph-*` at 1440, 1024 and 390;
- `paper-*` at 1440 and 390;
- `equation-*` at 1440 and 390, and `visualize-*-1440`;
- each in light and dark.

### pass 8
This is the cure seat for critic **F8X** (the redeploy's pass-8 critic, 2026-10-16). The BEFORE is the critic's cells (/morph at 1440 and 1024 from `pass-07/f7x/morph-*`, whose `tilesWhole` read 6 and 4; /visualize empty at 1440 from `pass-07/f7x/visualize-*-1440`), with `pass-00/ref-65c1565/visualize-light-1440` (ORIGIN) as the reference. The other sets under `pass-08/` (the loose F10 files) are left as they were.
- fourier `3168b89`, on `m/w1-bump-migration`, three files (`web/src/components/morph/HarmonicLevelGrid.vue`, `web/src/components/visualization/VisualizationView.vue`, `web/e2e/f-w14u-misc.spec.ts`), committed by pathspec and pushed fast-forward `386397e..3168b89`. Other seats' uncommitted files (`.github/workflows/ci.yml`, `web/e2e/fixtures/gallery.ts`) were left alone.
- value.js (this commit) holds the AFTER frames, the probe and its JSON, the census and the gate logs, all in `pass-08/f8x/`.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F8X-C1 | At `(min-width: 1024px) and (pointer: fine)`, the Harmonic Levels strip is a wrapping grid, `repeat(auto-fill, minmax(5.5rem, 1fr))`, with `overflow: visible`, `mask-image: none` and no snap. Coarse pointers and 390 keep the scroller and its fade. **Measured** (`f8x-probe.json`, both themes): at 1440, 10 of 10 tiles are whole in 2 rows (6 + 4, 100 px tiles), the bound tiles n=5 and n=50 are in view, the mask is `none`, and the card is 420 px (303 before, 510 before pass 7). At 1024, 10 of 10 tiles are whole in 2 rows (5 + 5, 96 px), and the card is 418 px. At 390 the strip is unchanged: flex, a 48 px fade, 2 whole tiles. **Spec:** `f-w14u-misc` m210f, at 1440 and 1024, checks that the bound High tile is in view, that every tile is whole, and that the mask is `none`. It skips on a coarse pointer, where m210 keeps the strip. |
| DS-F8X-C2 | Of the finding's two options, this cure takes the first. The empty stage's `.drop-target` (already `inset: 0` in the stage) takes glass's `.paper-grid` class (identity, §0dm), with `background-attachment: fixed`, so its lines register with the page ground's grid round the plate. This is the `.band-grid` idiom on /morph. There is no new wrapper and no local colour or token, and the one drop ring (DS-F4R-C1) is unchanged. **Measured:** the drop target is 1406×798 inside the 1408×800 stage at 1440, and 356×758 at 390. It paints glass's four grid layers, `fixed` and `multiply` (the dark arm uses glass's `screen` blend). The plate now reads as ORIGIN's empty drawing surface (`visualize-*-1440`), and the census counts it as no control gradient. |
| DS-F8X-T1 | The template comment ("F1-17: the drop zone is drawn (the origin's dashed hairline)") is rewritten to say that the zone draws no frame (DS-F4R-C1): the stage's hairline is the frame and the stage's ring is the one drop signal. A comment above the drop target names the C2 grid. |

**Glass-owned, cited, not overridden.**
- **DS-F8X-G1** (the glass Button capsule at rest: an inset bevel stack, `0 8px 24px` at 14% and a 0.5 px ring; in dark the cast is `--foreground` cream; glass Card `surface="opaque"` keeps its bevel and three casts). This is a fresh witness, folded into **DS-F2R-G1** (the resting and capsule recipe) and **DS-F6X-G1** (the dark cream cast) on **O-87 FLAT-LIGHTING**. Re-measured on /visualize's "Choose an image" (`f8x-probe.json`): `rgba(255,255,255,.1) 0 1px inset, … / .06 0 -1px inset, … / .04 1px 0 inset, … / .14 0 8px 24px, … / .05 0 0 0 .5px`. fourier adds no shadow, and none was added. Held honest-RED and re-judged at the glass 10.2.0 repin, whose band 0 should drop the resting capsule cast and make `surface=opaque` solid `--card` with one quiet edge.

**Census** (`scripts/ds-census.mjs` on `:3100`; `f8x/census-after.json`). The numbers are unchanged from pass 7 F7X, and it is still RED on the glass rows.
- Static: 7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations.
- Computed sums: 378 shadow elements, 950 layers, 284 multi-layer stacks, 284 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations.
- Neither cure is a lighting site (one is a grid layout, the other glass's identity grid on a non-control).

**Gates.**
- `vue-tsc -b`: 0, twice. `vitest run --maxWorkers=2`: 116/116, twice (under `guarded --light`).
- e2e: the 21 specs that reach /morph's levels card or the /visualize empty stage (`e2e-specs.txt`). They ran on chromium plus mobile-chromium, headless, 1 worker, with BASE_URL `:3100`.
  - A first attempt ran without BASE_URL and hit `:3000`, so the global seed got a 404 (`e2e-runA0-wrong-base.txt`).
  - Run A: 193 passed, 1 failed. Run B: identical.
  - The one red is `f-w14u-d` d2 (1440 light): the canvas dock never reports `collapsed` after the View-options menu closes. It is not this cure. On a clean `dfdf0fd` HEAD worktree served fresh on `:3121`, the same d2 failed 2 of 3 runs (`e2e-head-baseline-d*.txt`: the first passed 6/6, the next two failed d2 1440 light). With the cure applied on `:3121` it failed d2 once in light and once in dark (`e2e-cure-fresh-3121-d-*.txt`). It is a timing-sensitive collapse on the loaded stage, where the cure changes nothing (the drop target is `v-if` on an empty stage, and /v has no levels card).
  - The new m210f passed in both runs, on chromium at 1440 and 1024. It skipped on mobile-chromium, which has a coarse pointer.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD.

**Frames** (`pass-08/f8x/`). Headless real Chrome (channel `chrome`, DPR 2; §0ei; 390 with touch), `f8x-probe.mjs` against `:3100`:
- `morph-*` at 1440, 1024 and 390, scrolled to the levels card;
- `visualize-*` (the empty stage) at 1440 and 390;
- each in light and dark.

### pass 9
This is the cure seat for critic **F9X** (the redeploy's pass-9 critic, 2026-10-16). The BEFORE is the critic's cells, `pass-08/f8x/visualize-*` (390 and 1440) and `pass-08/f8x/morph-*` (1440, 1024 and 390, with `f8x-probe.json`). The reference is `pass-00/ref-65c1565/visualize-light-1440` (ORIGIN). The other sets under `pass-09/` (`critic-f11` and the loose F11 files) are left as they were.
- fourier `c313ea8`, on `m/w1-bump-migration`, three files (`web/src/components/visualization/VisualizationView.vue`, `web/src/components/morph/HarmonicLevelGrid.vue`, `web/e2e/f-w14u-misc.spec.ts`), committed by pathspec. Origin had moved on (F.CT3 r3, `be5ede6`), so it was merged in (`6b98e22`, no file overlap) and pushed fast-forward `be5ede6..6b98e22`.
- value.js (this commit) holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs, all in `pass-09/f9x/`.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F9X-C1 | Glass's `.paper-grid` leaves `.drop-target` for a layer of its own inside it (`.drop-target-grid paper-grid`, `aria-hidden`, `z-index: -1` inside the target's stacking context). This is the `.band-grid` idiom on /morph and `.floating-toc-grid` on /paper. The layer keeps `background-attachment: fixed`, so the lines still register with the ground. **Why a layer rather than the token alone:** glass declares `--paper-grid-line`, `--paper-grid-line-major` and `--paper-grid-texture` at `:root` (`tokens/scale-paper.css`), so they inherit as finished values. Re-setting `--paper-grid-opacity` on `.drop-target` therefore changes nothing (an inert knob, a glass note below). The layer's opacity is the ratio `calc(0.035 / var(--paper-grid-opacity))`, so the plate reads at an effective token of 0.035 and follows glass's token if it moves. It adds no local colour, gradient or mask, and touches no glass file. **Measured** (`f9x-probe.json`): the layer reads opacity 0.4375 over the 0.08 token, with 4 layers, `fixed`, `multiply` in light and `screen` in dark, at 1440 and 390. That puts the majors at about 5.6 % and the minors at 3.5 %, against 12.8 % and 8 % before. `.drop-target` itself now paints no background. In the frames, the lines no longer cross the title, the lede or the caption at 390. |
| DS-F9X-C2 | The column count follows the level count, not the strip's width. The strip sets `--levels-per-row: ceil(levels / 2)`, and the grid is `repeat(var(--levels-per-row), minmax(0, 1fr))`. **Measured:** at 1440 the levels sit 5 + 5 in 122 px tiles, and the card is 434 px (420 before). At 1024 they sit 5 + 5 in 96 px tiles. Both bound tiles are in view, and the mask is `none`. |
| DS-F9X-C3 | The finding's second option, at every width and pointer. HarmonicLevelGrid is now **one** grid: the phone and coarse scroller is deleted, along with its fading edges (UIA-F-210), its snap, `measureStrip` with its resize observer, and the scroll-into-view. Nothing is hidden, so nothing needs to say it continues. The tile takes the atom pad inline as well as on its block axis (the coarse recipe's 26 px inline pad is what held it at 118 px). Its shape fills the track up to 64 px. **Measured** at 390 (coarse, touch; both themes): 5 + 5 tiles of 60 × 80 px, 10 of 10 whole, n=5 and n=50 in view, and the card is 410 px. Identity is unchanged: the accent-red shapes, the mono labels, the bound and active edges, and the press scale. |
| f-w14u-misc m210 / m210f | **Restated.** m210 (390) keeps "a preview never rewrites the range" and "the chosen tile is in view", and drops the fade assertion (no scroller). m210f now runs at 1440, 1024 **and 390**. It asserts that both bound tiles are in view, that every tile is whole, two rows that differ by at most one tile, and mask `none`. Note: `mobile-chromium` runs only `@coarse`-tagged tests, so m210 and m210f run on chromium. The coarse 390 cell is witnessed by the probe (`isMobile`, `hasTouch`). |

**Glass-owned, cited, not overridden.**
- **DS-F9X-G1** (the glass Metric's label outweighs its value on a coarse pointer). Re-measured (`f9x-probe.json`): at 390 the label is 18.62 px and the value 14 px (phase, n, shape, total). At 1440 the label is 14.54 px and the value 16.4 px; at 1024 they are 13.62 and 15.36. This is a new witness folded into **DS-F3C-G1** (the coarse type-ramp inversion) beside **O-87 FLAT-LIGHTING**. The ask: glass keys `.metric__label` to a caption rung that never exceeds the value rung at any pointer. It is re-judged at the glass 10.2.0 repin. fourier adds no override.
- **Note to glass (with C1):** `--paper-grid-opacity` is documented as the grid's strength knob, but it is inert on any scope below `:root`, because the derived line and texture tokens are declared only at `:root`. If glass re-declares the three derived tokens on `.paper-grid` itself, the knob works per surface, and this consumer's ratio stays correct either way.

**Census** (fourier `scripts/ds-census.mjs` on `:3100`; `f9x/census-after.json`). Unchanged from pass 8 F8X, and still RED on the glass rows.
- Static: 7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations.
- Computed sums: 378 shadow elements, 950 layers, 284 multi-layer stacks, 284 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations.

**Gates** (`f9x/gates.txt`).
- `vue-tsc -b`: 0, twice. `vitest run --maxWorkers=2`: 116/116 (20 files), twice (under `guarded --light`).
- **e2e:** pass 8's 21 specs (`e2e-specs.txt`) ran headless with `--project=chromium --project=mobile-chromium`, 1 worker, BASE_URL `:3100`.
  - Run A: 194 passed, 1 failed.
  - Run B: 193 passed, 2 failed.
  - Every red is `f-w14u-d` d2 at 1440 (the canvas dock's view dot on a loaded /v stage). This is the pre-existing intermittent red that pass 8 recorded.
  - **Baseline:** on a clean `3168b89` HEAD worktree served fresh on `:3123`, `--repeat-each=3` failed d2 3 of 6 at 1440 (`e2e-head-baseline-3123-d.txt`). The cure tree on `:3100` failed it 4 of 6 (`e2e-cure-3100-d.txt`). Neither cure reaches a loaded /v stage: the drop target is `v-if` on an empty stage, and /v has no levels card.
  - m210 and m210f (1440, 1024 and 390) passed in both runs.
  - The worktree and its server were removed afterwards.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD.

**Frames** (`pass-09/f9x/`). Headless real Chrome (channel `chrome`, DPR 2; §0ei; 390 with touch), `f9x-probe.mjs` against `:3100`:
- `morph-*` at 1440, 1024 and 390, scrolled to the levels card;
- `visualize-*` (the empty stage) at 1440 and 390;
- each in light and dark.

### pass 10
This is the cure seat for critic **F10X** (the redeploy's pass-10 critic, 2026-10-16). The BEFORE is this seat's own reading of the critic's cells on the pre-cure tree, `pass-10/f10x/before/` (frames and `f10x-probe.json`: /morph at 1440, 1024 and 390; /gallery at 1440 and 390; /equation at 1440; light and dark). The other sets under `pass-10/` (`critic-f12` and the loose F12 files) are left as they were.
- fourier `73fc6ec`, on `m/w1-bump-migration`, two files (`web/src/App.vue`, `web/src/components/morph/HarmonicLevelGrid.vue`), committed by pathspec and pushed fast-forward `06c2d92..73fc6ec`.
- value.js (this commit) holds the AFTER frames, the probe and its JSON, the census, the gate and e2e logs and the refused C2 trial, all in `pass-10/f10x/`.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F10X-C1 | **Cured.** The tile's corner is `--radius-card` at every pointer, one declaration in the existing `glass-overrides` block. The recipe derives its corner from the control height (`--button-size / 2`), which the coarse ramp grows to 30 px; on a 60 px track that made a stadium. The shape is capped at `min(64px, 65%)` of the tile's content box, so the shape, the gap and the caption label fit inside the tile's `aspect-ratio: 1`. The two rows of 5 are kept. **Measured** (`f10x-probe.json`, both themes): at 390 the tiles are 60 × 62.3 (ratio 1.04, against 1.33 before), the radius is 16 px = 0.27 × W (30 px = 0.5 × W before), and the shape is 33 px. At 1024 the tiles are 96.4 × 96.4 (96 × 108 before) with a 51 px shape. At 1440 they are unchanged at 122 square, with the 64 px shape and a 16 px radius (20 before). Identity is unchanged: the accent-red shapes, the mono caption labels, the bound and active edges, and the press scale. |
| DS-F10X-C2 | **REFUSED: a conflict with a standing ruling, so it is the owner's pick.** The cure was tried and measured (`c2-refused/`): `--page-measure: 80rem` centred on `.gallery-grid-host` and the toolbar row gave four 303 px tracks, centred on the dock's axis (host 80 → 1360, no phantom track). But it moves the gallery's content edge to 96 px at 1440. That fails **f-w14v-au1 L3-6** ("the content edge holds across route switches": `gutters {"visualize":16,"equation":16,"gallery":96}`), which holds the one page gutter of X.F.W14V.au1 **A2-FO-L3-6**. Restating that spec would undo a ruled cure, so the change is reverted. **ESC-DS-F10X-C2:** either every route takes the origin's centred measure (and au1 L3-6 is restated by ruling), or the gallery keeps the shared gutter. |
| DS-F10X-C3 | **Cured with the finding's first arm.** `<main>` carries a 1 px block-start border: transparent at rest, and `--border-soft` once it has scrolled (`data-scrolled` from a passive scroll listener on the existing `main` ref). This is the same hairline as DS-F5-C4. The edge is pulled up its own pixel (`-mt-px`), so no route moves. **Measured:** at rest `1px solid rgba(0,0,0,0)` on every cell; on /morph 1024 scrolled 200 px, `data-scrolled="true"` and `1px solid color(srgb .778 .705 .622 / .45)` in light and `(… .394 .34 .286 / .45)` in dark. The `morph-*-1024-scrolled` frames show the rule where the card used to be sliced at y≈155. There is no new component, no shadow, no gradient and no keyframes. |
| DS-F10X-T1 | **Closed by reading.** The aside is not a bare clip. Glass's `FadingScroll` (`scroll-mode="auto"`) already ends it on a 16 px block-end mask fade (`linear-gradient(… calc(100% - 16px), transparent 100%)`), and the aside has its own 1 px edge. Its overflow at 1440 is 24 px (810 / 786). A wider fade would be glass's `--fade-scroll-width`, which is not overridden locally. |

**Glass-owned, cited, not overridden.**
- **DS-F10X-G0** has no new witness. Everything measured falls within the held rows: DS-F2R-G1, DS-F6X-G1 and DS-F8X-G1 (casts and bevels, and the cream cast in dark), DS-F7X-G1, DS-F4X-G1, DS-F2R-G2, DS-F5X-G1, DS-F3C-G1/G3/G4 and DS-F9X-G1. The census re-reads the dark `.dock-plate` at `blur(16px) saturate(1.3) brightness(1.14)`. These are held honest-RED on **O-87 FLAT-LIGHTING** and re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs` against the final tree on `:3124`; `f10x/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations). The cure adds no lighting site.
- Computed sums: 260 shadow elements, 670 layers, 202 multi-layer stacks, 202 inset highlights, 156 backdrop blur, 0 control gradients, 0 looping animations.
- **The fall from pass 9's 378 / 950 / 284 / 284 / 208 is not this cure.** By the time of the census the dev gallery was empty (the API returned `items: []`), because the e2e seed's rows had been removed. The gallery's card casts dropped out with them. Still RED on the glass rows.

**Gates** (`f10x/gates.txt`).
- On the final tree (HEAD `6b98e22` plus the two files, worktree `p10x-cure`): `vue-tsc -b` 0 twice, and `vitest run --maxWorkers=2` 116/116 (20 files) twice, under `guarded --light`. On the merged tree (HEAD `06c2d92` plus the cure): `vue-tsc -b` 0.
- **e2e:** the union of pass 9's 21 specs and every spec that reaches /gallery or the levels card, 33 in all (`e2e-specs.txt`). They ran headless with `--project=chromium --project=mobile-chromium`, 1 worker, each against its own vite server for the tree under test.
  - **Environment, recorded:** the shared dev API on `:8000` rate-limited, then died, partway through this seat. A destructive "Rate limit exceeded" toast covered the 390 Controls tab, which accounts for the 25 reds in `e2e-cure-3124-reds.txt`. The seed then failed (`POST /api/sessions` 500, `e2e-head-baseline-3125-reds.txt`). The seat restarted the API on `:8000` with `COMPUTE_CONCURRENCY=1`, `COMPUTE_RATE_LIMIT=1000`, `WRITE_RATE_LIMIT=1000` and `BLOB_DIR` under `~/.cache` (scripts/e2e.sh's harness), and stopped it at the end.
  - Run A, with C2 still applied: 356 passed, 2 failed: d2 and **au1 L3-6**, the C2 conflict above.
  - Runs B and C, on the final tree after the refusal: 357 passed with 1 failed, then 356 passed with 2 failed. **Every red is `f-w14u-d` d2 at 1440**, the pre-existing intermittent recorded at passes 8 and 9 (it fails on a clean HEAD). au1 L3-6 passed in both.
  - The merged tree (with F.REL .x5's AppDock `2a519c9`) ran the dock and shell specs (`f-w14v-nav`, `shell-header`, `f-w14u-shell`, `f-w14v-au1`, `f-w14u-misc`) on `:3100`: 83/83, twice.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD. Both worktrees were removed.

**Frames** (`pass-10/f10x/`). Headless real Chrome (channel `chrome`, DPR 2; §0ei; 390 with touch), `f10x-probe.mjs` against the final tree:
- `morph-*` at 1440, 1024 and 390, scrolled to the levels card, plus `morph-*-1024-scrolled` (main scrolled 200 px, the C3 rule);
- `equation-*-1440` (the T1 reading);
- each in light and dark.
- The /gallery cells have no AFTER, because C2 was refused and the gallery is unchanged from HEAD; the empty dev gallery at capture time is recorded in `f10x-probe.json`. The C2 trial frames are in `c2-refused/`, and the BEFORE frames in `before/`.

### pass 11
This is the cure seat for critic **F11X** (the redeploy's pass-11 critic, 2026-10-16). The AFTER frames are in `evidence/DS/fourier/pass-11/f11x/`. The other sets under `pass-11/` (the F13 cure set and `before/`) are left as they were.
- fourier `4de08dc`, on `m/w1-bump-migration`, seven files, committed by pathspec and pushed fast-forward `01253e3..4de08dc`. The files: `AppDock.vue`, `HarmonicLevelGrid.vue`, `MorphShapePreview.vue`, `VisualizationView.vue`, `stores/workspace.ts`, `e2e/contrast-pairs.ts` and `e2e/f-w14u-misc.spec.ts`.
- value.js `118dee34b` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F11X-C1 | **Cured with the finding's first arm.** The measured rule (§0fo.2) is kept, and its answer is now the same on every route. `fitNavLabel` tries the run with every section's name, plus "Sections" for routes off the five, one after another in microtask turns, so no trial name is ever painted. The name shows only if the run holds all of them. The fit re-runs on viewport resize, font `loadingdone` and sign-in/out, and no longer on a route switch. A generation counter makes the latest fit win. **Measured** (`f11x-probe.json`, both themes): at 390 every route (/, /paper, /gallery, /visualize, /equation, /morph) shows the glyph-only form; the dock is 303 px and the run is 279/279 with 0 px overhang. Before, the widths were 348 / 358 / 370 / 354 / 303. The accessible name still carries the section. It adds no breakpoint, no wrapper and no glass override. |
| DS-F11X-C2 | **Cured.** The edge now belongs to one state. The `.is-bound:not(.active)` full-ink edge is deleted, and the selection keeps the accent edge and its 2px 15% ring. Both bounds, the active one included, are marked on the caption at `--foreground` and weight 600. The red active caption is retired, so the caption carries one meaning. **Measured:** n=5 has the resting 50% edge, no ring, and a caption of `rgb(28,25,23)` / 600 (dark: `rgb(233,230,226)`). n=50 has the accent edge with the ring, and the same caption ink and weight. The contrast pair **FMD-18** is restated as `[bound-tile-caption]` (text, foreground on card), and m254 now reads the caption ink. Identity is unchanged: the accent-red shapes, the mono captions and the press scale. |
| DS-F11X-T1 | **Cured.** The loaders' fallback strings are exported once as `LOAD_FALLBACK` from `stores/workspace.ts` and used at both loaders. `stageErrorDetail` returns nothing for them, so the mono diagnosis line renders only for a problem that carries its own detail. **Measured** (route-intercepted `/api/visualizations/f11x-missing`): a bare 502 renders the h1 and the lede only. A 503 problem with a detail renders the detail as the third line. |
| DS-F11X-T2 | **Cured, in a different form from the one the finding suggested.** The finding's premise does not hold. The stage column is the plate's ruled 26rem (416 px) at both 1024 and 1440, not 576. The four readings, with their longest-word reservations, need 483 px on one line (phase 166, n 51, shape 111, total 119, plus 3 × 12 gap). One wrapping row (tried first; e2e runs A and B ran on it) left "total" alone on the second line. The family is now one 2-column grid: **phase · n over shape · total**, two even rows with aligned columns, phase first. It is 297 px at 1440 and 280 px at 1024, with tops 616/616/646/646. The phone's one-column band is unchanged. The dead `.phase-reading` rules are deleted. |

**Glass-owned, cited, not overridden.**
- **DS-F11X-G0** has no new witness. Everything measured falls within the held rows: DS-F8X-G1/F6X-G1, DS-F2R-G1, DS-F4X-G1, DS-F2R-G2/O-88, DS-F-G1, DS-F3C-G1/F9X-G1, DS-F3C-G3, DS-F4X-G2 and DS-F3C-G2. These are held honest-RED on **O-87 FLAT-LIGHTING** and **O-88**, re-judged at the glass 10.2.0 repin, with no local override.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3131`; `f11x/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations.
- **The rise from pass 9's 378 / 950 / 284 / 284 / 208 is data, not the cure.** Per page, it is all on /gallery: 2 more seeded cards (elements 112 → 129). Every other page is flat apart from −1 element at 390. Still RED on the glass rows.

**Gates** (`f11x/gates.txt`).
- On the final tree: `vue-tsc -b` 0, twice, and `vitest run --maxWorkers=2` 116/116 (20 files), twice, under `guarded --light`.
- **e2e:** 22 specs (`e2e-specs.txt`): every spec that reaches the app dock, /morph's levels or readout, or the /v error stage, plus `contrast-floor`. They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker. The seat's own API ran on `:8011` (`COMPUTE_CONCURRENCY=1`, rate limits 1000, dev mongo `:27018`, `BLOB_DIR` under `~/.cache`) behind vite on `:3131`. Both were stopped at the end.
  - Runs A and B, on the flex-wrap T2 form: 229/229, twice.
  - Runs C and D, on the final tree: 229/229, twice.
  - The pre-existing `f-w14u-d` d2 intermittent is outside this spec set.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD.

**Frames** (`pass-11/f11x/`). Headless real Chrome (channel `chrome`, DPR 2; §0ei; 390 with touch), `f11x-probe.mjs` against the final tree:
- `dock-*-390-<route>` (the dock band) on /, /paper, /gallery, /visualize, /equation and /morph;
- `morph-*-{1440,1024,390}-{readout,levels,levels-card}`;
- `v-error-{bare,detail}-*-1440`;
- each in light and dark.

### pass 12
This is the cure seat for critic **F12X** (the redeploy's pass-12 critic, 2026-10-16). The AFTER frames are in `evidence/DS/fourier/pass-12/f12x/`. The other sets under `pass-12/` (`critic-f12x/`, `before/` and the F14 cure set at the root of `pass-12/`) are left as they were.
- fourier `d9ebf2a`, on `m/w1-bump-migration`, two files, committed by pathspec and pushed fast-forward `4de08dc..d9ebf2a`. The files: `HarmonicLevelGrid.vue` and `e2e/contrast-pairs.ts`.
- value.js `f9b7b8215` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F12X-C1 | **Weight arm cured, tone arm refused.** The resting tile edge is now a 1 px hairline instead of 1.5 px. That is the weight of the card's own edge (1 px, measured), so the inner tile no longer outweighs its container. The selection keeps the accent edge and its 2 px 15% ring, and is the only heavier mark. The change is one declaration at `HarmonicLevelGrid.vue:271`, with no shadow and no wrapper. The press scale, the accent-red shapes and the mono captions are unchanged (§0dm). **Why the tone arm is refused:** the 50% `--foreground` ink is the WCAG 1.4.11 non-text floor that `contrast-floor` grades as **HLG-37[grid-cell-border]**. On `--card` the probe measures the kept ink at 3.295 L / 3.993 D, `--border` at 1.865 L / 2.001 D, and `--border-soft` at 1.309 L / 1.352 D. Both of the critic's tokens fall below 3:1. Taking either one would turn the gate RED, or would mean retiring an a11y row that `SP-3` raised for exactly this grid. That trade is the owner's to rule, so it is not made here. The pair's `what` is restated for the 1 px width; its stack and floor are unchanged. The f-w14u-misc spec does not read the edge's width or alpha. |

**Glass-owned, cited, not overridden.**
- **DS-F12X-G0** has no new witness. Everything measured falls within the held rows: DS-F2R-G1, DS-F6X-G1 and DS-F8X-G1, DS-F7X-G1, DS-F4X-G1, DS-F2R-G2 and DS-F5X-G1 (O-88), DS-F3C-G1 and DS-F9X-G1, DS-F3C-G2, DS-F3C-G3, DS-F3C-G4, DS-F5-G2 and DS-F4X-G2. The census reads the dark `.dock-plate` at `blur(16px) saturate(1.3) brightness(1.14)`. These rows are held honest-RED on **O-87 FLAT-LIGHTING** and **O-88**, and re-judged at the glass 10.2.0 repin. There is no local override.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3132`; `f12x/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 11. They are 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients and 0 looping animations.
- The cure adds no lighting site. The census is still RED, on the glass rows only.

**Gates** (`f12x/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`. After the final comment-only edit, `vue-tsc -b` was run once more and exited 0.
- **e2e:** 14 specs (`e2e-specs.txt`), being every spec that reaches /morph or the levels card, plus `contrast-floor`. They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker. The seat's own API ran on `:8012` (`COMPUTE_CONCURRENCY=1`, rate limits 1000, dev mongo `:27018`, `BLOB_DIR` under `~/.cache`) behind vite on `:3132`. Both were stopped at the end.
  - Runs A and B passed 142/142 each.
  - An earlier launch never reached the tests: the seed got ECONNREFUSED because the guard had reaped the vite server. Its log was overwritten by run A.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD.

**Frames** (`pass-12/f12x/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f12x-probe.mjs` against the final tree:
- `morph-*-{1440,1024,390}-{levels,levels-card}`, in light and dark;
- `f12x-probe.json`, which records the resting edge, the active edge and ring, and the card's edge for each cell, plus the contrast of the three candidate inks on `--card`.

### pass 13
This is the cure seat for critic **F13X** (the redeploy's pass-13 critic, 2026-10-16). The AFTER frames are in `evidence/DS/fourier/pass-13/f13x/`. The earlier pass-13 set at the root of `pass-13/` is left as it was.
- fourier `020a77f`, on `m/w1-bump-migration`, one file (`HarmonicLevelGrid.vue`), committed by pathspec and pushed fast-forward `d9ebf2a..020a77f`.
- value.js `33a33b06a` holds the AFTER frames, the probe and its JSON, the census, the gate and e2e logs, and the DS-F3C-G4 relay note.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F13X-T1 | The selected tile's ring is now one solid accent pixel (`box-shadow: 0 0 0 1px var(--accent-red)`), so the selection is a crisp 2 px accent edge in both themes. Before, it was a 2 px ring at a 15% accent mix. That ring lost its edge on the dark `--card` and read as a soft halo. The ring is still spread-only (no blur, no offset), so it is the same flat "selected" ring vocabulary (FR-MSP-11). There is no dark-only counter-style. It is one declaration in the same rule. **Measured** (`f13x-probe.json`, every cell): the ring is `<accent> 0 0 0 1px`. On `--card` it grades 4.53:1 in light and 3.89:1 in dark, where the 15% mix graded 1.26 and 1.19. The resting 1 px hairline (DS-F12X-C1), the HLG-37 ink and the accent shapes are unchanged (§0dm). Frames: `morph-*-{1440,1024,390}-levels-card`. |

**Glass-owned, cited, not overridden.**
- **DS-F13X-G0** has no new glass witness. Every item falls within a held row:
  - the 6-layer card ring is on DS-F8X-G1, F2R-G1 and F6X-G1;
  - the cream capsule cast in dark is on F8X-G1 and F6X-G1;
  - the doubled slider well is on DS-F5-G2;
  - the dark thumb frame is glass's own (SliderControl.vue:332 cites O-87);
  - the coarse ramp inversion is on DS-F3C-G1 and F9X-G1;
  - the /equation aside offset is on DS-F-G3.

  These rows are held honest-RED on **O-87 FLAT-LIGHTING** and **O-88**, and re-judged at the glass 10.2.0 repin. There is no local override.
- **DS-F3C-G4** gains its light-theme twin. The Easing `SelectTrigger` is a tan control tone beside the cream numeric field in the same card. The trigger's own `background-color` computes transparent, so the tone is glass's material. The field is `rgb(243, 236, 226)` light and `rgb(63, 55, 49)` dark. This is added as an addendum to `relay/X-ALL-BK-FLAT-LIGHTING.md` (one control tone for a resting trigger and field, in both themes).

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3133`; `f13x/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 12. They are 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients and 0 looping animations.
- The cure keeps the one spread-only ring, so it adds no lighting site. The census is still RED, on the glass rows only.

**Gates** (`f13x/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** the same 14 specs as pass 12 (`e2e-specs.txt`): every spec that reaches /morph or the levels card, plus `contrast-floor`. They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker. The seat's own API ran on `:8013` (`COMPUTE_CONCURRENCY=1`, rate limits 1000, dev mongo `:27018`, `BLOB_DIR` under `~/.cache`) behind vite on `:3133`. Both were stopped at the end.
  - Runs A and B passed 142/142 each.
  - A first launch found no tests, because zsh did not word-split the spec list. No test ran; the launch was corrected.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD.

**Frames** (`pass-13/f13x/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f13x-probe.mjs` against the final tree:
- `morph-*-{1440,1024,390}-{levels,levels-card}`, in light and dark;
- `f13x-probe.json`, which records the resting and active edges and the ring, the ring's contrast on `--card` before and after, and the Select-vs-field tones.

### pass 14
This is the cure seat for critic **F14X** (the redeploy's pass-14 critic, 2026-10-16). The AFTER frames are in `evidence/DS/fourier/pass-14/f14x/`.
- fourier `fd853a2`, on `m/w1-bump-migration`, two files (`MorphShapePreview.vue` and `HarmonicLevelGrid.vue`), committed by pathspec and pushed fast-forward `020a77f..fd853a2`.
- value.js `58452073c` holds the AFTER frames, the stroke probe and its JSON, the census, and the gate and e2e logs.
  - That commit also swept in another seat's untracked `pass-14/critic-f16/` by mistake.
  - `e7ade4135` untracks those files again. They are still on disk, untouched, for their owner to commit.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F14X-P1 | **The morph line now has one weight in screen space.** Both the stage plate's path and the levels tiles' paths use `vector-effect: non-scaling-stroke`. The plate is 3 px, which is PRE-DOCK's rendered weight. The tiles are 1.5 px.<br>**Before:** the stroke was a fixed number of user units, so it grew and shrank with the box. The plate's 4.5 units rendered at about 8.4 px at 1440 and 1024 (a 374 px svg) and about 2.3 px at 390. The tiles' 4 units rendered at 1.3, 1.0 and 0.65 px.<br>**After:** the plate is 3 px and the tiles are 1.5 px in every cell (1440, 1024 and 390, both themes). That is one ratio, 2:1, where before the two weights were about 6x apart (`f14x-probe.json`).<br>**How:** the plate gets one `.morph-button :deep(path)` rule beside its existing `:deep(svg)` rule. The tiles get one attribute. There is no new component, and the `FourierMorphSvg` leaf is unchanged, so the dark-mode toggle's 14-unit glyph is untouched. The accent hues and the morph motion are unchanged (§0dm).<br>Frames: `morph-*-{1440,1024,390}-{stage,levels}`. |
| DS-F14X-T1 | The FR-MSP-11 "ONE RING VOCABULARY" comment in `MorphShapePreview.vue` now records that HarmonicLevelGrid's selected ring was a 2 px ring at a 15% mix and has been one solid accent pixel since DS-F13X-T1. The vocabulary itself, a flat ring meaning "selected", is unchanged. This is a comment change only. |

**Glass-owned:** this critic named none. The rows held from earlier passes stay honest-RED on **O-87 FLAT-LIGHTING** and **O-88**, to be re-judged at the glass 10.2.0 repin. There is no local override.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3134`; `f14x/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 13. They are 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients and 0 looping animations.
- `vector-effect` is not a lighting site. The census is still RED, on the glass rows only.

**Gates** (`f14x/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** the same 14 specs as passes 12 and 13 (`e2e-specs.txt`). They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker. The seat's own API ran on `:8014` (`COMPUTE_CONCURRENCY=1`, rate limits 1000, dev mongo `:27018`, `BLOB_DIR` under `~/.cache`) behind vite on `:3134`. Both were stopped at the end.
  - Runs A and B passed 142/142 each.
  - A first launch never reached the tests: the seed got ECONNREFUSED because the guard reaped servers whose launching shell had exited. The servers were relaunched as background tasks, and that run's log was overwritten by run A.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD.

**Frames** (`pass-14/f14x/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f14x-probe.mjs` against the final tree:
- `morph-*-{1440,1024,390}-{stage,levels}`, in light and dark;
- `f14x-probe.json`, which records each cell's svg size, stroke width, `vector-effect`, rendered px for the plate and a tile, and their ratio.

### pass 15
This is the cure seat for critic **F15X** (the redeploy's pass-15 critic, 2026-10-16). The AFTER frames are in `evidence/DS/fourier/pass-15/f15x/`. Other files in `pass-15/` (the `f17-*` probe and its frames) belong to another seat and are not part of this receipt.
- fourier `70f1d8a`, on `m/w1-bump-migration`, six files, committed by pathspec and pushed fast-forward `fd853a2..70f1d8a`.
- value.js `0fc21ba29` holds the AFTER frames, the probe and its JSON, the census, the gate and e2e logs, and the O-87 relay addendum.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F15X-C1 | The five indeterminate `Progress` sites drop `variant="liquid"` and use glass's default: `EquationView.vue` (the status pill and the cold "Computing…" state), `VisualizationView.vue` (both stage busy bars) and `ImageUpload.vue` (the replace upload). Size, aria and status text are unchanged, and the "busy" motion stays.<br>**Measured after the drop** (`f15x-probe.json`): with `:model-value="null"` the fill sits at translate -100% and paints nothing. The whole visible state is glass's `.track-flow::after`, a white `plus-lighter` gradient swept on a loop, on `--track-well-recess`, which is `oklch(0.131 0.003 57)` in dark. So glass's default indeterminate has the same gloss and the same black rail. That half is relayed as a **new witness on O-87 FLAT-LIGHTING** (addendum in `relay/X-ALL-BK-FLAT-LIGHTING.md`) and is not overridden locally.<br>Frames: `equation-computing-*-1440`, `equation-recompute-*-1440` (+ `-pill`), `visualize-busy-*-1440`. |
| DS-F15X-C2 | At SliderControl's DS-F7X-C2 gate (`(min-width:1024px) and (pointer:fine)`), the Easing row has the Duration row's grammar: the label sits in the card's shared label column, then the select at a 12rem measure instead of `w-full`.<br>`--row-label-col` (3.75rem) is set on the phase card. SliderControl's plain-row label reads it, falling back to 2.5rem, so the levels card's Low and High rows are unchanged.<br>The row wraps back to the stack in a narrow card (the three-column 1440 cards). The coarse and phone ramps keep the stack.<br>**Measured at 1024:** the select starts on the Duration field's x (541.0 vs 541.2 px), at 192 px instead of about 500. There is no wrapper component, only tokens and layout.<br>Frames: `morph-*-{1440,1024,390}-cards`. |
| DS-F15X-T1 | The /morph sticky band's block-end rule changes from `--border-soft` to `--border`. That is one token swap, with no shadow or fade. Measured at 390: `rgb(101, 87, 73)` in dark and `rgb(198, 180, 159)` in light.<br>Frames: `morph-*-390-levels`. |

**Glass-owned: DS-F15X-G0** has no new witness. It is folded into the held rows: DS-F2R-G1, F6X-G1 and F8X-G1 (casts); canon glass item 7 (slider track-well); F3C-G4 (select); F3C-G1 and F9X-G1 (ramp); and F3C-G3 (`--primary`). These stay honest-RED on **O-87 FLAT-LIGHTING** (and O-88), to be re-judged at the glass 10.2.0 repin. There is no local override. The only new glass row from this pass is C1's glass half, described above.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3135`; `f15x/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 14. They are 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients and 0 looping animations.
- The census routes do not open a busy state, so the `track-flow` loop that C1 measured is outside its cells. The census is still RED, on the glass rows only.

**Gates** (`f15x/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** 25 specs (`e2e-specs.txt`): pass 14's 14 specs, plus every spec that reaches /equation's busy states, the morph cards, the stage band or `progressbar`. They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker. The seat's own API ran on `:8015` (`COMPUTE_CONCURRENCY=1`, rate limits 1000, dev mongo `:27018`, `BLOB_DIR` under `~/.cache`) behind vite on `:3135`. Both were stopped at the end.
  - Runs A and B passed 240/240 each.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-15/f15x/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f15x-probe.mjs`, which holds the compute requests open to show the busy states:
- 22 PNGs in light and dark;
- `f15x-probe.json`, which records each bar's variant, rail and fill tones and its sweep, the card's label, field and select boxes, and the band's rule.
- At 390 the equation's cold state sits in the inactive Canvas tab, so the C1 cells are at 1440.

### pass 16
This is the cure seat for critic **F16X** (the redeploy's pass-16 critic, 2026-10-16). The AFTER frames are in `evidence/DS/fourier/pass-16/`.
- fourier `a48bd7b`, on `m/w1-bump-migration`, three files, committed by pathspec and pushed fast-forward `70f1d8a..a48bd7b`.
- value.js `1a54150b6` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F16X-C1 | **Cured at the token seat.** `--row-label-col: 3.75rem` moved from MorphPhaseConfig's `.config-card` to FourierMorphDemo's `.controls-column`, under the same `(min-width:1024px) and (pointer:fine)` gate. Every control row in the column now reads one label column: the phase cards' Duration and Easing, and the levels card's Low and High. SliderControl's 2.5rem fallback stays for other surfaces. This is one token move, with no wrapper and no new rule.<br>**Measured** (`f16x-probe.json`): at 1024, all four stacked cards start their fields at x 541.2 (the Easing select at 541.0); Low and High were at about 519. At 1440, the levels card's Low and High fields move to 685.4, a 3.75rem column inside the full-row card, and the phase cards still stack. At 390 nothing changes.<br>Frames: `morph-*-{1440,1024,390}-{stage,cards,levels}`. |
| DS-F16X-T1 | **Kept as is.** The critic marked it optional. The 12rem Easing measure is pass 15's deliberate choice (a preset name, not the card's whole width, so the secondary control is not the card's heaviest element). Stretching it to the track's right edge would undo that. |

**Glass-owned: DS-F16X-G0** has no new witness. It is folded into the held rows: the indeterminate Progress gleam and dark rail (pass 15's O-87 addendum); the Recomputing pill cast; the plated-primary casts (DS-F2R-G1, F6X-G1, F8X-G1); the pointer-centred specular (DS-F4X-G1, F5X-G2); the toolbar doubled ring (DS-F3C-G2); the transport's floating "1 ×" (DS-F2R-G2, F5X-G1, O-88); the Select fill (DS-F3C-G4); the 390 coarse-ramp inversions (DS-F3C-G1, F9X-G1); the aside top offset (DS-F-G3); and the resting-card casts in dark. These stay honest-RED on **O-87 FLAT-LIGHTING** (and O-88), to be re-judged at the glass 10.2.0 repin. There is no local override.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3136`; `pass-16/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 15 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). Still RED, on the glass rows only.

**Gates** (`pass-16/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** 18 specs (`e2e-specs.txt`): every spec that reaches /morph, the control rows or SliderControl, plus `visual-checkpoint` and `f-w14-residuals`. They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker. The seat's own API ran on `:8016` (`COMPUTE_CONCURRENCY=1`, rate limits 1000, dev mongo `:27018`, `BLOB_DIR` under `~/.cache`) behind vite on `:3136`. Both were stopped at the end.
  - Runs A and B passed 182/182 each.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-16/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f16x-probe.mjs`: 18 PNGs of /morph (light and dark, 1440, 1024 and 390, each with stage, cards and levels), and `f16x-probe.json`, which records every card's label column, each row's label and field boxes, and the Easing select box.

### pass 5
This is the cure seat for critic **F5C** (pass 5, 2026-10-16). The AFTER frames are in `evidence/DS/fourier/pass-05/f5c/`. The other folders in `pass-05/` (`f5`, `f5x`, `f7`, `critic-f7`) belong to earlier seats and are not part of this receipt.
- fourier `8d6b3ab`, on `m/w1-bump-migration`, seven files, committed by pathspec and pushed fast-forward `a48bd7b..8d6b3ab`.
- value.js `e6f32c8d3` holds the AFTER frames, the probe and its JSON, the census, the gate and e2e logs, and the O-87 relay addendum.

**Consumer findings, cured at the root.**

| id | cure |
|---|---|
| DS-F5C-C1 | **The failure has its own channel.** The workspace store records a background compute's failure (contour extraction, epicycles, bases) in its own `computeError`, separate from `error`. `error` stays the toast and stage-card channel for acts the person started: save, visibility, delete, and a load. A 429 or 503 reads "Server busy, not computed yet"; anything else keeps the act's own fallback.<br>**The Basis layer stays mounted** on a failure (`hasData \|\| store.computeError`). It shows one muted status line (`--muted-foreground`, no surface, tint or border) with a glass `emphasis="text"` Retry button. Retry calls `store.retryCompute`, which re-extracts the contour if none exists and then runs both computes. The contour editor, where Contour is the aside's only layer (`defaultOpen`), shows the same line.<br>**Deleted:** ContourSettings' destructive `Alert` and `shortError`, and with them the glass root-barrel import. The loader's toast watcher was clearing `store.error` before that Alert could render, so the Alert never showed. The line uses one shared rule, `.compute-status` in `style.css`, with no new component.<br>**Measured** (`f5c-probe.json`, every compute answered 429 by `page.route`): no toast at 1440 or 390 in either theme. The layers are Image, Basis and Contour, with the status line in the Basis layer. After Retry, the computes land: the line is gone and Coefficients mounts.<br>Frames: `w-429-*-{1440,390}-controls`, `-after-retry`. |
| DS-F5C-T1 | **Partly cured.** The toolbar row aligns on its block-end at ≥ sm (`sm:items-end`), so the search's foot sits on the tabs' underline. At 1440 the tablist bottom and the search bottom are both 139.5 px; before, the field was centred on the tab text. The underline is drawn inside glass's `SegmentedTabs`, so its length is not changed locally and the rule still stops under the tabs. Frames: `gallery-*-{1440,390}`. |
| DS-F5C-T2 | The stale BasisCanvas comment now says the trail keeps the fourier identity hue at rest and on hover, and that the golden re-ink was deleted at pass 1, F1-05. |

**Glass-owned rows.** Both are relayed as an O-87 FLAT-LIGHTING addendum (`relay/X-ALL-BK-FLAT-LIGHTING.md`) and are not overridden locally:
- **DS-F5C-G1:** the toast's close glyph sits on the corner outside the plate; the plate stacks blur, a tinted bloom and a halo; and below sm the toast is forced to the top and covers the dock.
- **DS-F5C-G2:** a menu row with `aria-current` paints nothing (folded into O-59). Re-measured: all five menu rows compute a transparent background, including Visualize, which carries `aria-current="page"`.

Both stay honest-RED until the glass 10.2.0 repin. Since C1 removed the toasts for background computes, the toast now shows only after an act the person started.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3137`; `f5c/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 16 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations).
- Still RED, on the glass rows only.

**Gates** (`f5c/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** 35 specs (`e2e-specs.txt`): every spec that reaches the Basis or Contour layer, Coefficients, a Retry, or the gallery toolbar and tabs, plus `workspace-flow`.
  - They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker. The seat's own API ran on `:8017` (`COMPUTE_CONCURRENCY=1`, rate limits 1000, dev mongo `:27018`, `BLOB_DIR` under `~/.cache`) behind vite on `:3137`. Both were stopped at the end.
  - Runs A and B passed 384/384 each.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-05/f5c/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f5c-probe.mjs`: 18 PNGs in light and dark.
- The forced-429 `/w` cells, before and after Retry;
- `v-*-390` and `v-controls-*-390`;
- `v-menu-*-1440` (G2, recorded unchanged);
- `gallery-*-{1440,390}`.

### pass 6
This is the cure seat for critic **F6C** (pass 6, 2026-10-17). The AFTER frames are in `evidence/DS/fourier/pass-06/f6c/`. The other folders in `pass-06/` (`f6`, `f6x`, `f8`, `critic-*`) belong to earlier seats and are not part of this receipt.
- fourier `43fb488`, on `m/w1-bump-migration`, one file, committed by pathspec and pushed fast-forward `8d6b3ab..43fb488`.
- value.js holds the AFTER frames, the probe and its JSON, the census, the gate and e2e logs, and the O-87 relay addendum: `3c9b02e7e`.

**Consumer finding, cured at the root.**

| id | cure |
|---|---|
| DS-F6C-C1 | **The stage carries the state.** A new `stageComputeFailed` (`store.computeError` set, not computing, no epicycle or bases data) renders the SAME `.compute-status` line (message plus a glass `emphasis="text"` Retry calling `store.retryCompute`) centred in the stage's existing message slot, `.stage-state--over`, where the first compute's busy mark sits. It uses one channel (`computeError`) and the shared rule in `style.css`, with no new component. One scoped rule keeps the line pressable inside the slot's `pointer-events: none` and bounds it to the stage. The aside's line stays unchanged and remains the only `role="status"`, so the failure is announced once.<br>**Measured** (`f6c-probe.json`, every compute answered 429 by `page.route`): at 1440 the stage line is centred on the plate (light: stage 970 × 798 at x 17; line 245 × 36 at x 379, y 470), and the aside line is still there. At 390 the Canvas tab now shows the line on the plate. There are no toasts. Pressing Retry **on the stage** after unrouting lands the computes in all four cells: both lines are gone and the epicycles draw.<br>Frames: `w-429-*-1440-controls`, `w-429-*-390-{canvas,controls}`, `w-429-*-{1440,390}-after-retry`. |

**Glass-owned: DS-F6C-G1** is a new witness of the held coarse type-ramp inversion (DS-F3C-G1, F9X-G1). Measured at 390 with touch: the caption is 12.179 px and the text-emphasis Retry is 18.27 px (1.5×), in the aside and on the stage, in light and dark. At 1440 both are 14.384 px. The relay is widened by an O-87 addendum (`relay/X-ALL-BK-FLAT-LIGHTING.md`, 2026-10-17): a text-emphasis Button inherits the surrounding font size at every pointer and keeps only its hit floor. There is no local override, and the row stays honest-RED until the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3138`; `f6c/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 5 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). Still RED, on the glass rows only.

**Gates** (`f6c/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** the same 35 specs as pass 5 (`e2e-specs.txt`), since they cover every spec that reaches the stage, the Basis or Contour layer, Coefficients or a Retry. They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker. The seat's own API ran on `:8018` (`COMPUTE_CONCURRENCY=1`, rate limits 1000, dev mongo `:27018`, `BLOB_DIR` under `~/.cache`) behind vite on `:3138`. Both were stopped at the end.
  - Runs A and B passed 384/384 each.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-06/f6c/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f6c-probe.mjs`: 10 PNGs in light and dark of the forced-429 `/w` cells (1440 with the aside; 390 on the Canvas and Controls tabs) and after a stage Retry. The seat's fresh `BLOB_DIR` does not hold that image's blob, so the Image layer reads "Image unavailable" in these cells. That is a fixture artefact and not part of the finding.

### pass 7
This is the cure seat for critic **F7C** (pass 7, 2026-10-17). The AFTER frames are in `evidence/DS/fourier/pass-07/f7c/`. The other files and folders in `pass-07/` (`f7`, the f9 cure files) belong to earlier seats and are not part of this receipt.
- fourier `a1dc2eb`, on `m/w1-bump-migration`, one file, committed by pathspec and pushed fast-forward `43fb488..a1dc2eb`.
- value.js `241fa2c26` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F7C-C1 | **Each label keeps its one line.** In `ImageUpload.vue`, `.image-row` now wraps (`flex-wrap: wrap`, keeping its 0.75rem gap). The Replace Button carries `flex: none; white-space: nowrap` (scoped class `.image-replace`, set on glass's Button root), and `.image-missing p` is `nowrap`. There is no new wrapper and no override of glass's type rung.<br>**Measured** (`f7c-probe.json`, image-unavailable state, because the seat's fresh `BLOB_DIR` lacks the blob): at 390 with touch, in light and dark, the caption "Image unavailable" is 1 line (95.9 × 15.8). "Replace image" is a 1-line 190.8 × 44 pill that drops whole under the caption (y 224.1, under the caption's row), and the 314 px row does not overflow. At 1440 the caption and command stay side by side (Replace 140.4 × 36), as before.<br>Frames: `w-{light,dark}-{1440,390}-controls.png`. |
| DS-F7C-E1 | **Environment only; no code change.** The shared `:3100` vite has a stale dependency prebundle, with Vue split across two chunks. This seat served its own vite on `:3139` with a private `cacheDir` (`~/.cache/fourier-f7c-vitecache`) and saw zero page errors on `/w`.<br>**Disclosure:** this seat first launched its vite with `--force` against the default cacheDir. That rewrote the shared `web/node_modules/.vite/deps` at 02:21, under the running `:3100`. The seat stopped it within a minute and restarted on the private cacheDir. The finding's cure still stands: the owner of `:3100` restarts it with `--force`. |

**Glass-owned.** The coarse type rung of Button `sm` (18.27 px against the 12.18 px caption at 390) is still held on **DS-F6C-G1** under O-87. It is not overridden locally and will be re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3139`; `f7c/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 6 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). Still RED, on the glass rows only.

**Gates** (`f7c/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** 14 specs (`e2e-specs.txt`): every spec that reaches the Image layer's row (`coarse-pointer`, `f-w13-image-controls`, `f-w14-dpr`, `f-w14-veil`, `f-w14u-d`, `f-w14u-s`, `f-w14u-vstage`, `f-w14v-au2`, `f-w14v-detached`, `visualization-crud`), plus `visualization-ux`, `visual-checkpoint`, `visual-baseline` and `workspace-flow`.
  - They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker. The seat's own API ran on `:8019` (`COMPUTE_CONCURRENCY=1`, rate limits 1000, dev mongo `:27018/fourier`, a fresh `BLOB_DIR` under `~/.cache`) behind vite on `:3139`. Both were stopped at the end.
  - **Run A: 106 passed, 3 skipped.**
  - **Run B: 104 passed, 3 skipped, 2 failed**, both `f-w14u-d` d2 at 1440: the canvas dock never reaches `.collapsed` after its View-options menu closes. An earlier run B (`e2e-runB-first.txt`) failed the same two.
- **d2 is not this change.**
  - It fails with HEAD `43fb488`'s `ImageUpload.vue` swapped back in (`e2e-head-f-w14u-d.txt`: 1 failed, 1440 dark).
  - It is intermittent on the cure tree (`e2e-f-w14u-d-repeat-cure.txt`, `--repeat-each=2`: 10 passed, 2 failed).
  - It is a pre-existing dock-collapse flake in O-88 DOCK-COLLAPSE-MOTION territory, held honest-RED and not cured locally.
  - Every other test is GREEN ×2.
- **No visual golden was re-baselined.** The `web/e2e/screenshots/f-w14/after-veil-*` frames that the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-07/f7c/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f7c-probe.mjs`: 4 PNGs of `/w/placid-stirring-opal-viper`, the 1440 aside and the 390 Controls tab, in light and dark.

### pass 8
This is the cure seat for critic **F8C** (pass 8, 2026-10-17). The AFTER frames are in `evidence/DS/fourier/pass-08/f8c/`. The other files and folders in `pass-08/` (`critic-f8c`, `f8x`, the f10 cure files, the loose frames) belong to other seats and are not part of this receipt.
- fourier `47c5f71`, on `m/w1-bump-migration`, five paths, committed by pathspec and pushed fast-forward `a1dc2eb..47c5f71`.
- value.js `0c1d6f066` holds the AFTER frames, the probe and its JSON, the census, the gate and e2e logs, and the O-87 relay addendum.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F8C-C1 | **/gallery takes /paper's page measure.** GalleryView's root column is the route's scroller, so it stays full width: the wheel and the scrollbar stay at the window's edge. It centres its content in the 72rem measure that /paper's `max-w-6xl` and /morph use, with one inline-padding utility on that existing container: `px-[max(0px,calc((100%-var(--container-6xl))/2))]`. Every child keeps its own `--page-gutter` inside the measure, as /paper's `.paper-layout` does. The toolbar, the grid, the admin banner, the carousel, Drafts and the admin tabs all move together. There is no new wrapper and no per-child override.<br>**Measured** (`f8c-probe.json`, headless real Chrome, DPR 2):<br>• At 1440 in light and dark, the toolbar box is 144 to 1296 (1152 = 72rem). The tabs and the grid start at x 160, and the grid is 1120 wide. auto-fill gives **4 columns of 271 px** (the last card's right edge is at 1280). There is no horizontal scroll.<br>• At 390 with touch, nothing moves: the grid is x 16, 358 wide, in 2 columns of 173 px.<br>• There are zero page errors.<br>Frames: `gallery-{light,dark}-{1440,390}.png`. |
| DS-F8C-E1 | **Environment only; no code change.** The shared `:3100` server's stale prebundle (duplicate Vue) remains for its owner to restart with `--force`. This seat served its own vite on `:3150` with a private `cacheDir` (`~/.cache/fourier-f8c/vitecache`, never `--force` on the shared cache) and its own API on `:8020`, because `:8000` was down. |

**Glass-owned: cited against O-87, not overridden locally.** The relay addendum is in `relay/X-ALL-BK-FLAT-LIGHTING.md`, dated 2026-10-17, for fourier pass 8. All three rows stay honest-RED until the glass 10.2.0 repin.
- **DS-F8C-G1:** at coarse, Metric's `--control-label` (18.62 px) outranks its 14 px value. This widens the DS-F6C-G1 / DS-F3C-G1 type-ramp row to name Metric.
- **DS-F8C-G2:** the material's hover specular disc blooms on the resting Configurator stage. The ask is no hover specular on resting or large panels.
- **DS-F8C-G3:** in dark, the filled primary Button is told from the page by its 5-layer cast rather than by its tone. This is a named dark-arm instance of DS-F2R-G1 and DS-F3C-G3.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3150`; `f8c/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 7 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). Still RED, on the glass rows only.

**Gates** (`f8c/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** 22 specs (`e2e-specs.txt`), every spec that reaches `/gallery`, including `visual-checkpoint` and `visual-baseline`. They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker. The seat's own API ran on `:8020` (`COMPUTE_CONCURRENCY=1`, rate limits 1000, dev mongo `:27018/fourier`, a fresh `BLOB_DIR`) behind vite on `:3150`. Both were stopped at the end.
  - **Run A** came before the restatement and the re-baseline: 275 passed and 4 failed, and the measure itself caused all four.
    - `au1 L3-6 (1440)`: the gutters were `{visualize:16, equation:16, gallery:160}`.
    - Three visual-checkpoint goldens changed geometry only: the card went from 277×238 to 245×214, and the admin banner from 1248 to 1120 wide.
  - **au1 L3-6 is restated, not weakened.** At ≥ 640 the gallery's content edge must **equal** /paper's measure edge (strict `toBe`). Below 640 every route, gallery and /paper included, still shares the one gutter.
  - **Named re-baseline** (§0ej; DS-F8C-C1; `rebaseline.txt`): `checkpoint-card-resting`, `checkpoint-card-hover` and `checkpoint-admin-banner` (chromium-darwin). These are the same card and banner in the narrower measure.
  - **Runs B and C passed 279/279 each.**
- The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-08/f8c/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f8c-probe.mjs`: 4 PNGs of `/gallery`, at 1440 and 390, in light and dark.

### pass 9
This is the cure seat for critic **F9C** (pass 9, 2026-10-17). The AFTER frames are in `evidence/DS/fourier/pass-09/f9c/`. The other files and folders in `pass-09/` (`critic-f11`, `f9x`, the f11 cure files, the loose frames) belong to other seats and are not part of this receipt.
- fourier `4f77d94`, on `m/w1-bump-migration`, three paths, committed by pathspec and pushed fast-forward `47c5f71..4f77d94`.
- value.js `b12409f02` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F9C-C1 | **The /404 card's pad now agrees with its title.** The h1 stays on the route rung (display-1, as DS-F4R-C5 ruled), and the card stays glass's `md`. Glass ships no `lg` Card (`CardSize = "sm" \| "md"`), so the card instead takes glass's own `--card-pad` token one step up the space ladder (`--space-family`). That is one custom property on a class on the existing Card. There is no wrapper and no change to the material.<br>**Measured** (`f9c-probe.json`):<br>• At 1440 the header pad goes from 12 to **20 px**. The title's line box starts **15 px** from the card's top and **21 px** from its left (it was 13 and 13). The card is 448×171, and the dead space right of the actions falls from about 110 to **67 px**.<br>• At 390 the compact ladder resolves `--space-family` to 12 px, so the pad is unchanged there, beside a 25.9 px title.<br>• No horizontal scroll and no page errors.<br>Frames: `404-{light,dark}-{1440,390}.png`. |
| DS-F9C-C2 | **The gallery search ends on the grid's edge.** The 32rem `--search-measure` (FR-GSB-30, DS-F7-C4) was set before the 72rem page measure existed, so it is **deleted**, not countered. The pill fills its root, and at ≥ sm the root is the toolbar row's `flex-1`. Because the auto-fill tracks are `1fr`, the grid's right edge is the measure's edge at every width.<br>**Measured** at 1440, in light and dark: the search runs from 344.9 to **1280**, and the grid's 4th column ends at **1280**. At 390 nothing moves: the search spans 16 to 374, the full row under the tabs.<br>• No horizontal scroll and no page errors.<br>Frames: `gallery-{light,dark}-{1440,390}.png`. |
| DS-F9C-E1 | **Environment only; no code change.** The shared `:3100` server still has a stale prebundle, for its owner to restart with `--force`. This seat served its own vite on `:3153`, with a private `cacheDir` (`~/.cache/fourier-f9c/vitecache`), and its own API on `:8039`. Both were stopped at the end. |

**Glass-owned rows:** none this pass, so there is no O-87 addendum.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3153`; `f9c/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 8 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). Still RED, on the glass rows only.

**Gates** (`f9c/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** 22 specs (`e2e-specs.txt`): every spec that reaches `/gallery` or the not-found card, including `visual-checkpoint` and `visual-baseline`. They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker, against the private stack. **Run A passed 297/297, and so did run B.**
- No golden was re-baselined. The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-09/f9c/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f9c-probe.mjs`: 8 PNGs, of `/404` and `/gallery`, at 1440 and 390, in light and dark.

### pass 10
This is the cure seat for critic **F10C** (pass 10, 2026-10-17). The AFTER frames are in `evidence/DS/fourier/pass-10/f10c/`, and the BEFORE frames are in `pass-10/f10c/before/`. The other files and folders in `pass-10/` (`critic-f12`, `f10x`, the f12 cure files, the loose frames) belong to other seats and are not part of this receipt.
- fourier `6226157`, on `m/w1-bump-migration`, two paths, committed by pathspec and pushed fast-forward `4f77d94..6226157`.
- value.js `dcd6d7708` holds the BEFORE and AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F10C-C1 | **The card's stats row ends one `--card-pad` from the bottom.** `.card-stats` is drawn at its 14 px stat glyphs' height (`--stat-glyph: 0.875rem`, as its `line-height`). The like Button keeps its 24 px hit box, and glass's coarse width floor and skin are untouched. A negative block margin, `calc((var(--stat-glyph) - 1.5rem) / 2)`, lets that box overflow the row without setting its height. There is no wrapper and no absolutely positioned target.<br>**Measured** (`f10c-probe.json` against `before/f10c-probe.json`), in both themes:<br>• At 1440 the glyph ink ends **13 px** from the card's bottom edge (it was 20.8), which matches the thumbnail's 13 px top inset. The row is 14 px tall (it was 29.5). The like hit box is 38.5×24.<br>• At 390 the inset is **9 px** (it was 16.8), against a 9 px top inset. The hit box is 44×24.<br>• The card is 15.5 px shorter. No horizontal scroll and no page errors.<br>Frames: `gallery-{light,dark}-{1440,390}.png`. |
| DS-F10C-T1 | **The Basis busy notice takes the section head's gap.** The notice is BasisSelector's own, so the rule is scoped there. It gets `margin-block-end: calc(var(--spacing) * 4)`, the same step glass composes above it (the trigger's `py-2` under the heading plus the layer body's `py-2`). Before, the shared `.compute-status`'s `margin: 0` had zeroed the body's `space-y` step, and the notice sat flush on the Fourier caption.<br>**Measured** with the compute endpoints answering 429 in the probe, in both themes:<br>• At 1440 the gap is **16 px above and 16 px below** (it was 16 and 0).<br>• At 390 it is 19.7 px above and 16 px below. The 3.7 px residue above is inside the layer body, as glass composes it, and it is not countered locally.<br>• The Retry rung (18.3 px coarse, beside a 12.2 px caption) is unchanged. It is re-judged at the glass 10.2.0 repin under DS-F6C-G1, with no local override.<br>Frames: `v-{light,dark}-{1440,390}.png`. |
| DS-F10C-E1 | **Environment only; no code change.** The shared `:3100` server still has a stale or duplicated prebundle, for its owner to restart with `--force`. This seat served its own vite on `:3171`, with a private `cacheDir` (`~/.cache/fourier-f10c/vitecache`), and its own API on `:8061` (`COMPUTE_CONCURRENCY=1`). Both were stopped at the end. |

**Glass-owned rows:** none this pass, so there is no O-87 addendum.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3171`; `f10c/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 9 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). Still RED, on the glass rows only.

**Gates** (`f10c/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** 25 specs (`e2e-specs.txt`). These are pass 9's 22 `/gallery` specs (including `visual-checkpoint` and `visual-baseline`, and `f-w14-uia-r2`, which drives `.like-btn`), plus the three that reach the Basis section: `f-w13-image-controls`, `f-w14v-detached` and `f-w14v-u4`. They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker, against the private stack. **Run A passed 316/316, and so did run B.**
- No golden was re-baselined. The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-10/f10c/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f10c-probe.mjs`: 8 AFTER PNGs and 8 BEFORE PNGs, of `/gallery` and the `/v` Basis section, at 1440 and 390, in light and dark.

### pass 11
This is the cure seat for critic **F11C** (pass 11, 2026-10-17). The AFTER frames are in `evidence/DS/fourier/pass-11/f11c/`. The other files and folders in `pass-11/` belong to other seats and are not part of this receipt.
- fourier `61e0512`, on `m/w1-bump-migration`, one path, committed by pathspec and pushed fast-forward `6226157..61e0512`.
- value.js `e97b2e7ce` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F11C-C1 | **One recovery grammar for a failed compute.** /equation's no-result failure now uses the shared `.compute-status` line, the one /visualize's stage and aside already use: the message, then glass's `emphasis="text"` Retry, kept in the `.eq-state` slot with `role="alert"`. The centred "Computation failed" title, the filled secondary pill with its leading RotateCcw and "Try again", and `.eq-state-failure` are **deleted**, not countered. The only addition is one `max-inline-size: 100%` on the line in that slot, as /visualize's stage gives its own. Glass's Button cast is not overridden: the pill that wore it is gone. The with-result overlay (`.eq-status`, quiet Retry) is untouched.<br>**Measured** (`f11c-probe.json`, with the compute endpoints answering 503), in both themes:<br>• At 1440 the /equation line is 273×36 at y 470, and /v's stage line is 245×36 at y 470. Both have a 14.4 px message and a text "Retry" with 0 glyphs, no box-shadow and a transparent fill.<br>• At 390 the line is 245×44 at 12.2 px, the same rung as /v's aside line (314×44, 12.2 px).<br>• There are 0 "Try again" buttons, no horizontal scroll and no page errors.<br>Frames: `equation-{light,dark}-{1440,390}.png` and `v-{light,dark}-{1440,390}.png`. |
| DS-F11C-E1 | **Environment only; no code change.** The shared `:3100` server still has a stale or duplicated prebundle, for its owner to restart with `--force`, and `:8000` is down. This seat served its own vite on `:3191` through `createServer` **with cwd = the fourier repo root**, as the critic warned, so that Tailwind's source scan holds. It used a private `cacheDir` (`~/.cache/fourier-f11c/vitecache`) with `optimizeDeps.force`, and its own API on `:8071` (`COMPUTE_CONCURRENCY=1`). Both were stopped at the end. |

**Glass-owned rows:** none this pass, so there is no O-87 addendum. The coarse Retry rung (DS-F6C-G1) is unchanged and is re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3191`; `f11c/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 10 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). Still RED, on the glass rows only. The census serves /equation with a live API, so it does not reach the failure state. The removed pill's cast is counted in the probe instead.

**Gates** (`f11c/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** 17 specs (`e2e-specs.txt`), every spec that reaches `/equation`. They include `f-w14u-eq` (q202 failure states; the no-Retry-on-4xx check) and `visual-checkpoint` and `visual-baseline`. They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker, against the private stack. **Run A passed 164/164, and so did run B.**
- No golden was re-baselined. The `web/e2e/screenshots/f-w14/after-*` frames that the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-11/f11c/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f11c-probe.mjs`: 8 AFTER PNGs, of the `/equation` and `/v` compute-failure states, at 1440 and 390, in light and dark.

### pass 12
This is the cure seat for critic **F12C** (pass 12, 2026-10-17). The AFTER frames are in `evidence/DS/fourier/pass-12/f12c/`; the BEFORE cells are pass 11's `pass-11/f11c/v-{light,dark}-1440.png`. The other files and folders in `pass-12/` belong to other seats and are not part of this receipt.
- fourier `2e11542`, on `m/w1-bump-migration`, two paths, committed by pathspec and pushed fast-forward `61e0512..2e11542`.
- value.js `fd31e4fbe` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | cure |
|---|---|
| DS-F12C-C1 | **One compute-failure line per visible surface.** `BasisSelector` takes `stageSaysFailed`, which the view passes as `stageComputeFailed && !tabbed` (`tabbed` is the existing glass-read form, `sheet`). When it is true, the section does not render its `.compute-status` copy, and the stage's line takes `role="status"`, so the live region stays single. In the tabbed sheet both lines stay as they were, with the aside's still the live region. There is no new component, token or CSS.<br>**Measured** (`f12c-probe.json`, with the compute route answering 503):<br>• At 1440 (split form), in both themes, **1** visible `.compute-status` (was 2), on the stage at y 470, with 1 `role=status`. The Basis section's Fourier caption now sits at y 256, where the duplicate line used to sit.<br>• At 1024 (rail form): 1 visible line, on the stage.<br>• At 390, in both themes: 1 visible line on each tab (the aside's on Controls, the stage's on Canvas), with 1 `role=status`.<br>• No page errors and no horizontal scroll.<br>Frames: `v-{light,dark}-1440.png`, `v-light-1024.png`, `v-{light,dark}-390-{controls,canvas}.png`. |
| DS-F12C-T1 | **No change, by the canon.** The aside's last section head is cut by honest scroll overflow. A fade would be a gradient, and padding tuned to land on a section rule would hold for only one content height, so neither was added. Frames for proportion: `equation-{light,dark}-1440.png`. |

**Glass-owned rows (DS-F12C-G-held).** These were re-observed and are unchanged, with no local override. They stay honest-RED on **O-87 FLAT-LIGHTING** (DS-F-G1..G6, DS-F2R-G1, DS-F3C-G1/G3/G4, DS-F6C-G1, DS-F8C-G1/G2/G3) and **O-88 DOCK-COLLAPSE-MOTION** (DS-F2R-G2, DS-F3C-G2), and are re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3201`; `f12c/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 11 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). Still RED, on the glass rows only.

**Gates** (`f12c/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** 9 specs (`e2e-specs.txt`): every spec that reaches the /v Basis section or the stage-state slot (`f-w13-image-controls`, `f-w14v-detached`, `f-w14v-u4`, `f-w14u-vstage`, `settings-persistence`, `slider-scrub-contrast`, `visualization-ux`), plus `visual-checkpoint` and `visual-baseline`. They ran headless with `--project=chromium --project=mobile-chromium` and 1 worker, against a private stack: API `:8081` (`COMPUTE_CONCURRENCY=1`) and vite `:3201` (`createServer`, cwd = the fourier root, private `cacheDir`). Both were stopped at the end. **Run A passed 77/77, and so did run B.**
- No golden was re-baselined.

**Frames** (`pass-12/f12c/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f12c-probe.mjs`: 10 AFTER PNGs.

### pass 5
This is the cure seat for critic **P5** (the redeploy's pass-5 critic, `pass-05/critic-p5-2026-10-17/`, 2026-10-17). The AFTER frames are in `evidence/DS/fourier/pass-05/f5p/`; the BEFORE cells are the critic's frames. The other folders in `pass-05/` (`f5`, `f5c`, `f5x`, `f7`, `critic-f7`) belong to other seats and are not part of this receipt.
- **No fourier commit.** The pass's one consumer row was measured already cured, so the fourier tree is unchanged (`m/w1-bump-migration` at `2e11542`).
- value.js `bb2eee510` holds the AFTER frames, the probe and its JSON, the census, and the gate logs.

**Consumer finding.**

| id | outcome |
|---|---|
| DS-F5P-T1 | **No change: measured already registered.** The empty stage's `.drop-target-grid` is already `background-attachment: fixed` (pass 8, DS-F8X-C2), so its origin is the viewport, the same as the page's `.paper-grid`.<br>**Measured** (`f5p-probe.json` → `gridT1`): column and row profiles from a DPR-2 frame, folded on the 64 px major pitch. The major lines sit at phase 0 (0.5 in dark, the centre of the 1 px line) inside the plate and on the page outside it, on both axes, in light and dark. Re-reading the critic's own `visualize-light-1440.png` gives the same result.<br>The step a reader sees at the hairline is the plate's quieter register (the layer's opacity is 0.035 / `--paper-grid-opacity`, from DS-F9X-C1) and the plate's own tone, not a phase shift. Opacity and identity are unchanged. |

**Glass-owned rows (DS-F5P-G0a..G0e).** These were re-witnessed and are unchanged, with no local override:
- G0a: the stage's hover disc is centred because `--mouse-x/y` is unset (DS-F4X-G1/F5X-G2);
- G0b: the resting and plated casts (DS-F2R-G1/F6X-G1/F8X-G1);
- G0c: the /v toolbar's doubled plate, and the transport's orphan `×` (DS-F3C-G2, DS-F2R-G2/F5X-G1);
- G0d: the text-emphasis link changes hue family between themes (DS-F3C-G3);
- G0e: ScrollProgressRim draws an empty track at 0 (DS-F4X-G2).

They stay honest-RED on **O-87 FLAT-LIGHTING**, and G0c also on **O-88 DOCK-COLLAPSE-MOTION**. All are re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3211`; `f5p/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 12 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). Still RED, on the glass rows only.

**Gates** (`f5p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** none. No fourier file changed, so no spec touches a changed file.
- No golden was re-baselined.
- The stack was a private vite on `:3211` (`serve.mjs`, its own `cacheDir`), proxying the running dev API on `:8000` read-only. It was stopped at the end.

**Frames** (`pass-05/f5p/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f5p-probe.mjs`, the critic's cells re-shot: 26 PNGs.
- `gallery`, `equation`, `equation-scroll`, `morph`, `v` and `visualize`, each at `{light,dark}-{1440,390}`;
- `v-hover-{light,dark}-1440` (G0a, recorded unchanged).

### pass 6
This is the cure seat for critic **P6** (the redeploy's pass-6 critic, `pass-06/critic-p6-2026-10-17/`, 2026-10-17). The AFTER frames are in `evidence/DS/fourier/pass-06/f6p/`; the BEFORE cells are the critic's frames. The other folders in `pass-06/` (`f6`, `f6c`, `f6x`, `f8`, `critic-f6`, `critic-f6x`, `critic-f8`) belong to other seats and are not part of this receipt.
- fourier `076253a` (`m/w1-bump-migration`, pushed fast-forward) holds the cure.
- value.js `6b610f5cf` holds the AFTER frames, the probe and its JSON, the pixel readings, the census and the gate logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F6P-C1 | **Cured.** The rail's search and its CONTENTS header (label, three tools, page readout) are one held head, `.sidebar-head` (`position: sticky; top: 0`), on the rail's own opaque fill (`--card`, which is what glass's `data-surface="opaque"` paints). Only the list scrolls under it. The nav stays the scroll port, so latex-paper's `useSidebarFollow` is untouched. The nav's top inset moved onto the head, so the layout at rest is unchanged. There is no new component, no shadow and no rule.<br>**Measured** (`f6p-probe.json` → `paperLate.rail`, 1440, both themes): `navScrollTop` 475 with the head held at the nav's top (`headHeldAtTop: true`) and the label in view. The rail in `paper-late-*-1440` now starts at the search field and CONTENTS, not mid-tree. |
| DS-F6P-C2 | **Cured, with the hairline.** /paper owns its scroll, so the shell's `<main>` edge rule never showed there. `.paper-scroll` now ends on that same one hairline once scrolled (`data-scrolled` from the reading progress), and is transparent at rest. There is no fade and no shadow, so DS-F7-C3 stands.<br>The rule is **not** pulled up a pixel as the shell's is. `<main>` clips at its padding box, and the first cut's −1px rule sat inside `<main>`'s border band and was clipped away (measured: the border computed but painted no pixel), so the port now starts 1px lower.<br>The shell's own rule moves from `--border-soft` to `--border`, which has been the /morph band's rule since DS-F15X-T1, so the app has one hairline.<br>**Measured** (`f6p/pixels.txt`): two device rows of `--border` at the port's top, rgb(198 180 159) in light and rgb(101 87 73) in dark, at 1440 and 390. |
| DS-F6P-C3 | **Cured (interim).** Line-art figures blend into `--card` through the token `--paper-figure-blend` (style.css: `multiply` in light, `screen` in dark), read only by `.paper-figure`; portraits keep their ground.<br>The first cut computed the blend but left the slab (#000). The cause is that each `.paper-window-section` has `content-visibility: auto`, whose paint containment isolates the blend group over a transparent backdrop. The section now takes `--card`, the tone it already sits on (the article is the opaque `--card` plate), so the blend reads the card and nothing else changes.<br>**Measured:** the Figure 6.1 ground reads rgb(53 42 34) in dark and rgb(253 245 236) in light, which is `--card`, where the critic's frames read 0 0 0 and 255 255 255. The asset-side repair (dark variants) stays **K-17** on the LATEX-PAPER relay. |
| DS-F6P-C4 | **Cured in the method.** `f6p-probe.mjs` scrolls the real scrollers (`scrollAll`: every `overflow-y: auto|scroll` element, so the /equation aside at 1440 and `.configurator-controls` at 390), and it carries /paper top, mid and late cells at both widths in both themes. |

**Glass-owned rows (DS-F6P-G1..G3).** These are held with no local override:
- G1: the dock's section menu is a translucent lens over photographs, its `aria-current` row is unpainted, and its icons touch their labels (O-59, DS-F-G8);
- G2: the /v Configurator aside's top inset shows a 5px sliver of the scrolled-away Sample Points slider;
- G3: the /equation playback rail's light track is a 1px inset line under a 6px fill (track-well).

All three stay honest-RED on **O-87 FLAT-LIGHTING** and are re-judged at the glass 10.2.0 repin. The `dock-menu-*`, `v-open-foot-*` and `equation-foot-*` AFTER frames re-witness them.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3212`; `f6p/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 5 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). Still RED, on the glass rows only. This pass added no shadow, filter or gradient.

**Gates** (`f6p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`, on the final tree.
- **e2e:** 138/138 passed twice, in headless chromium with `--workers=1` against a preview built from the tree (`:4190`). The 13 specs (`f6p/e2e-specs.txt`) are every spec that names the rail, the paper scroll port, the figures, /paper or the shell's `<main>` edge.
- No golden was re-baselined.

**Frames** (`pass-06/f6p/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f6p-probe.mjs`, the critic's cells re-shot: 24 PNGs.
- `paper`, `paper-mid`, `paper-late` and `equation-foot`, each at `{light,dark}-{1440,390}`;
- `v-open`, `v-open-foot`, `dock-menu` and `404`, each at `{light,dark}-1440`.

### pass 7
This is the cure seat for critic **P7** (the redeploy's pass-7 critic, 2026-10-17). The AFTER frames are in `evidence/DS/fourier/pass-07/f7p/`; the BEFORE cells are the critic's frames (its `f6p` and `p7` cells). The other folders in `pass-07/` (`f7`, `f7c`, `f7x`, and the loose files) belong to other seats and are not part of this receipt.
- fourier `4eb00c4` (`m/w1-bump-migration`, pushed fast-forward) holds the cure for C1 and T1.
- latex-paper `04c3992` (DS-F7C-C2), local on `master`; the 0.3.0 changeset is extended. Not pushed and not published (an owner act, as at passes 5 and 6). The release must now also carry `04c3992`.
- value.js `0496ac9bd` holds the AFTER frames, the probe and its JSON, the census and the gate logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F7C-C1 | **Cured.** The port's `border-block-start` (DS-F6P-C2) is deleted, so nothing runs full-bleed across the page grid or sits above the ToC band.<br>**Below lg**, the rule is at the cut, the ToC band's foot. `.floating-toc` ends one atom under the bar (/morph's band recipe, DS-F5-C4), and its `::after` is a 1px line hung at `-1px`, so the band's height does not change. PaperView sets `--floating-toc-rule: var(--border)` once the port has scrolled; at rest the line is transparent. The landscape arm (844×390) zeroes the foot pad, so the band stays one title rung.<br>**At lg**, the rule is a 1px sticky `::before` of `.paper-columns`, placed in the article's own grid cell (column 2, row 1, with the article), so it is exactly the article's measure.<br>No fade and no shadow (DS-F7-C3 stands).<br>**Measured** (`f7p-probe.json`): the port's `borderTopWidth` is `0px` in every cell. At 1440 scrolled, the `::before` is sticky, 1px, in grid column 2, and computes rgb(198 180 159) in light and rgb(101 87 73) in dark (`--border`); it is transparent at rest, and the article spans 510..1278. At 390 scrolled, the band spans 76..152 with the bar at 84..148, and the rule (`::after`, bottom `-1px`) computes `--border`; it is transparent at rest. At 844×390 the band spans 68..136 against the bar's 72..136.<br>The first cut drew the rule as a border with a foot pad. au1 L2-16 caught the landscape band growing past one title rung (23 > 14, `e2e-run0-first-cut.txt`), so the rule became the non-sizing `::after`. |
| DS-F7C-C2 | **Cured at the latex-paper root (`04c3992`).** The template's line breaks around the period condensed to a `" . "` text node. The period now follows the title span with no whitespace (`<span class="paper-proof-title" …/>.`), and the built renderer emits `"."`. latex-paper `vitest` passed 128/128. There is no CSS patch in fourier.<br>**Served:** still 0.2.1 until the repin, so `paper-proof-*-1440` still reads "Proof ." (probe: `"Proof sketch . "`). **The fourier repin is owed** with the rest of 0.3.0. |
| DS-F7C-T1 | **Cured.** `PaperPageReadout` reserves its widest string, `pg ${totalPages}/${totalPages}` (10 characters), as `min-inline-size: calc(var(--readout-chars) * (1ch + 0.02em) + 2px)`, using mono tabular figures, the tracking and the separator's margins. The bar sets the figures at the end, against the search button. In the desktop drawer, the readout keeps its full-width second line.<br>**Measured** (`f7p-probe.json` → `chevron`, 390, both themes): the chevron's x is 191.5 at pg 5, 11, 29, 57 and 101 of 110 (the critic measured 214 and then 205), and the readout is 77.5px wide throughout. |

**Glass-owned rows.** These are held with no local override:
- DS-F7C-G1: on /morph at 390 (coarse), Metric's label is on the `--control-label` rung, which grows under the coarse floor, so the label outranks its value. Glass should put it on a caption rung that does not inflate. It is relayed beside O-87 with the DS-F3C-G1 type-ramp row. `morph-{light,dark}-390` re-witness it unchanged.
- DS-F7C-G2: in dark, the primary-emphasis fill sits almost on `--card`, and only the cast separates it (the DS-F5P-G0b family). Glass should give it a real tone step. `equation-foot-dark-*`, `visualize-dark-390` and `404-dark-1440` re-witness it.

Both stay honest-RED on **O-87 FLAT-LIGHTING** and are re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3213`; `f7p/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed: 394 shadow elements, 1006 layers, 300 multi-layer stacks, 300 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations. Pass 6 read 386 / 978 / 292 / 292. The whole delta is data: /gallery now serves 6 cards where it served 5, which is +2 glass elements (card and badge) and +7 layers in each of the 4 gallery cells. Every /paper cell is identical to pass 6. This pass added no shadow, filter or gradient. Still RED, on the glass rows only.

**Gates** (`f7p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`, on the final tree.
- **e2e:** 20 specs (`f7p/e2e-specs.txt`), every spec that names /paper, the ToC bar, the readout, the scroll port or its columns. They ran headless (chromium and mobile-chromium) with `--workers=1`.
  - Against a preview built from the tree (`:4190`): 196 passed twice. The same 2 tests failed in each run, and both visit `/demo/shape-extractor`, a dev-only route that the production preview does not carry.
  - Those 2 tests passed twice on the private dev server (3 passed, `e2e-devroute-dev-run*.txt`), and `f-w14u-misc` (dev-route frames) passed 29/29 twice there.
  - So every touched spec is GREEN twice on a server that carries its route.
- No golden was re-baselined. The misc spec's rewritten `e2e/screenshots/f-w14` frames were restored to HEAD.

**Frames** (`pass-07/f7p/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; the 390 width with touch) by `f7p-probe.mjs`: 22 PNGs.
- `paper`, `paper-mid` and `paper-late`, each at `{light,dark}-{1440,390}`;
- `paper-mid-{light,dark}-844x390` and `paper-proof-{light,dark}-1440`;
- `morph-{light,dark}-390` (G1);
- `equation-foot-dark-{1440,390}`, `visualize-dark-390` and `404-dark-1440` (G2).

### pass 8
This is the cure seat for critic **F8C** (the redeploy's pass-8 critic, 2026-10-17). The AFTER frames are in `evidence/DS/fourier/pass-08/f8p/`; the BEFORE cells are the critic's (`pass-07/f7p/paper-proof-*-1440`, `paper-late-*-390`, `paper-mid-*-844x390`, `morph-*-390`). The other folders in `pass-08/` belong to other seats.
- fourier `5087628` (`m/w1-bump-migration`, pushed fast-forward) holds C3, T2 and the 0.2.1 bridge rows for C2 and T1.
- latex-paper `2468553` (C1, C2, T1 at the root), local on `master`; the 0.3.0 changeset is extended. Not pushed and not published (an owner act, as at passes 5 to 7). The release must now also carry `2468553`.
- value.js `fac07a425` holds the AFTER frames, the probe and its JSON, the T1 scans, the census and the gate logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F8C-C1 | **Cured at the latex-paper root (`2468553`).** A theorem-like environment's optional title was kept as one raw text node, so `cleanRawLatex` read `\c` as the cedilla and left "ite<key>". The bracket is now parsed by the inline parser, the prose path (`bracketContent` in `grammar/primitives.ts`), so `\cite` renders as `.paper-cite`, and accents, math and nested commands render too. A unit test was added; latex-paper `vitest` passed 129/129. Run through the local root, fourier's three cited titles read `Bernstein Ellipse Theorem [Trefethen, 2013]`, `Circulant Diagonalization [Davis, 1979]` and `Eckart–Young [Eckart et al., 1936]` (`c1-local-latex-paper-titles.txt`). There is no CSS or text patch in fourier.<br>**Served:** still 0.2.1 until the repin, so `paper-proof-*-1440` still reads "Circulant Diagonalization itedavis_circulant" (probe `c1`). **The fourier repin is owed** with the rest of 0.3.0 (with DS-F7C-C2). |
| DS-F8C-C2 | **Cured at the root and bridged.** latex-paper `2468553` sets `.paper-cite` in the text face on the line (`font: inherit`, with no mono, no 0.8em and no `vertical-align: super`); every citation it renders is author-year. Until the repin, fourier's 0.2.1 bridge restates it (`article.paper-article .section-body .paper-cite`: `font: inherit; vertical-align: baseline; line-height: inherit`). It is in the block marked DELETE AT THE 0.3.0 REPIN.<br>**Measured** (probe `c2`, 1440, both themes): "[Davis, 1979; Bassett, 2018]" computes Computer Modern at 18px, `baseline`, identical to its paragraph. The colour stays `--primary`, which is the ink in light. |
| DS-F8C-C3 | **Cured.** /morph's `.stage-column` ends on `1px solid transparent`, and `main[data-scrolled] .stage-column` sets it to `--border`. `data-scrolled` is App.vue's existing attribute on the shell scroller. This is /paper's band recipe (DS-F7C-C1), with no fade and no shadow.<br>**Measured** (390, both themes): at scrollTop 0 the rule is `rgba(0,0,0,0)` (`morph-*-390`, with no line across the grid at y≈307). At scrollTop 160 it is rgb(198 180 159) in light and rgb(101 87 73) in dark (`morph-scrolled-*-390`).<br>The first cut wrote `:global(main[data-scrolled]) .stage-column`, which this Vue compiles to `main[data-scrolled] {…}`, dropping the band. The probe caught it, and the plain scoped selector replaced it. |
| DS-F8C-T1 | **Cured at the latex-paper root and bridged; the cause is corrected.** The overflow was **inline** math, not a `.katex-display`, which already scrolls with its edge cue. latex-paper's theme set `.paper-article .math-inline { white-space: nowrap }` (found by CDP matched styles, `t1-ws.mjs`), and that defeated KaTeX's own breaks between bases. At 390, seven inline formulas ran 3 to 134px past the article's content edge, although no single base was wider than the measure (`t1-scan-before.json`, `t1-bases-before.json`). latex-paper `2468553` deletes the rule, and fourier's bridge restores `white-space: normal` until the repin.<br>**Measured** (probe `t1`, the whole paper at 390, both themes): 0 KaTeX boxes past the edge. The Example 6.1.1 verification breaks after its `=` onto two lines and ends at x=328, against the content edge at 358 (`paper-late-*-390`). |
| DS-F8C-T2 | **Cured.** At `min-width: 40rem`, `.floating-toc-title-btn` is `flex: 0 1 auto; max-inline-size: 100%`, and the readout takes `margin-inline-start: auto`, so the readout and search keep the bar's end. On the phone the button still fills the bar, so DS-F7C-T1's fixed chevron is unchanged.<br>**Measured** (844×390, both themes): the label spans 45..236 and the chevron 240..254, a gap of 4px (it was ~400px). The readout is at 682..765 (`paper-mid-*-844x390`). |

**Glass-owned rows:** none were named by F8C.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3217`; `f8p/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed: 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations. Pass 7 read 394 / 1006 / 300 / 300.
- The whole delta is data: /gallery serves one card fewer in each of the 4 gallery cells (−7 layers each). Every /paper and /morph cell is identical to pass 7. This pass added no shadow, filter or gradient. Still RED, on the glass rows only.

**Gates** (`f8p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** the 23 specs that visit /paper or /morph ran headless (chromium and mobile-chromium) with `--workers=1` against the private dev server, and 234 passed twice.
  - The same 5 failed in each run. They are the `f-w14u-misc` storage-blocked tests, which hard-code `:4190` and found no server there.
  - Those 5 passed twice on a preview built from the tree at `:4190`.
  - So every touched spec is GREEN twice on a server that carries its route.
- No golden was re-baselined. The misc spec's rewritten `e2e/screenshots/f-w14` frames were restored to HEAD.

**Frames** (`pass-08/f8p/`). These were taken in headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f8p-probe.mjs`: 10 PNGs.
- `paper-proof-{light,dark}-1440` (C1 as served, C2);
- `morph-{light,dark}-390` and `morph-scrolled-{light,dark}-390` (C3);
- `paper-late-{light,dark}-390` (T1);
- `paper-mid-{light,dark}-844x390` (T2).

### pass 9
This is the cure seat for critic **F9C** of the redeployed loop (pass 9, 2026-10-17; the earlier `### pass 9` above is a different F9C, on /404 and /gallery). The AFTER frames are in `evidence/DS/fourier/pass-09/f9p/`; the BEFORE cells are the critic's (`morph-scrolled-*-390`, `paper-mid-*-844x390`, `paper-proof-*-1440`, the /equation and /visualize 1440 asides). The other folders in `pass-09/` belong to other seats.
- fourier `c6a80b2` (`m/w1-bump-migration`, five paths by pathspec, pushed fast-forward `5087628..c6a80b2`) holds L1, L2 and T1.
- value.js `19f1e9298` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F9C-L1 | **Cured.** A route whose sticky band carries the cut owns it: `/morph` declares `meta.ownsCut` (typed in `routes.ts`), App.vue mirrors it as `data-owns-cut` on `<main>`, and `max-lg:data-[owns-cut]:data-[scrolled]:border-transparent` keeps the shell's scrolled `border-t` off there. The band's own foot rule (DS-F8C-C3) is the one cut, as on /paper. At lg the band is static and borderless, so the shell's rule stands. No new component.<br>**Measured** (`f9p-probe.json`), both themes: at 390 scrolled (scrollTop 160) `<main>`'s rule is `rgba(0,0,0,0)` and the band's foot (y 209) is `--border` (rgb(198 180 159) light, rgb(101 87 73) dark); at rest both are transparent. /gallery at 390 scrolled keeps the shell rule (`--border`); /morph at 1440 scrolled keeps it too. |
| DS-F9C-L2 | **Cured.** The bar was 64 px because glass's coarse `sm` rung (`max(2.25rem × 1.5, floor)`) grew the icon-only search button to 54 px, inside 4 px plate padding. In the short-landscape arm the bar's `padding-block` is 0 and the search and close buttons take glass's own `--control-h-xs` rung, which the coarse floor holds at the 44 px touch target. `--control-floor` is unchanged.<br>**Measured** (844×390, both themes): bar 72..118 (46 px, was 64), title and search both 44, band 68..118 (50 px). The chrome is 118 of 390 px (30%, was 136 / 35%). |
| DS-F9C-T1 | **Cured.** `.paper-columns` defines `--paper-cut-top`, the article cut's sticky line (`::before { top: var(--paper-cut-top) }`), and the ToC rail's `--sidebar-top-inset` reads the same token (it was a separate 0.5rem).<br>**Measured** (1440, both themes): at rest the aside and the article share 88; scrolled, the aside's top is 80 and the cut sits on the port's top, 80 (they were ~7 px apart). |
| DS-F9C-T2 | **Left, by the canon** (as DS-F12C-T1): the aside's foot is honest scroll overflow. A fade is a gradient, and a foot rule there would have to track the port's own scroll state for one trivial cell. Frames: `equation-*-1440`, `visualize-*-1440`. |

**Glass-owned rows (DS-F9C-G0).** Re-observed and unchanged, with no local override: the resting casts under cards and buttons, the dark primary-emphasis halo, the light track-well rim, coarse labels outranking values at 390, the text-emphasis link's hue change across themes, the centred hover specular on /v, the transport's orphan `×`, and the aside's 12 px top inset. The `.toggle-group__item.control-surface` "control gradient" hits are flat one-colour tint layers (allowed). They stay honest-RED on **O-87 FLAT-LIGHTING**, the dock and transport also on **O-88 DOCK-COLLAPSE-MOTION**, and are re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3219`; `f9p/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 8 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). Still RED, on the glass rows only.

**Gates** (`f9p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** 24 specs (`e2e-specs.txt`): every spec that visits /paper or /morph or reads the shell's scroll state, plus `visual-checkpoint` and `visual-baseline`. They ran headless (chromium and mobile-chromium) with `--workers=1` against a private vite on `:3219` (served from the fourier root, private `cacheDir`), with the config's own preview on `:4190` for `f-w14u-misc`. **Run A passed 245/245, and so did run B.** Both servers were stopped at the end.
- No golden was re-baselined. The `web/e2e/screenshots/f-w14/after-*` frames the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-09/f9p/`). Headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f9p-probe.mjs`: 14 PNGs — `morph-{light,dark}-390`, `morph-scrolled-{light,dark}-{390,1440}` (L1), `paper-mid-{light,dark}-844x390` (L2), `paper-proof-{light,dark}-1440` (T1), `equation-{light,dark}-1440` and `visualize-{light,dark}-1440` (T2).

### pass 10
This is the cure seat for critic **F10C** of the redeployed loop (pass 10, 2026-10-17; the earlier `### pass 10` headings above belong to other passes of the loop). The AFTER frames are in `evidence/DS/fourier/pass-10/f10p/`; the BEFORE cells are the critic's (`paper-mid-*-844x390`, `morph-scrolled-*`, `paper-proof-*-1440`). The other folders in `pass-10/` belong to other seats.
- fourier `4041480` (`m/w1-bump-migration`, five paths by pathspec, pushed fast-forward `c6a80b2..4041480`) holds L1 and T1.
- value.js `7312665db` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F10C-L1 | **Cured.** One rule width per route, the column's measure. /paper: `.floating-toc::after` is inset by `--page-gutter`, the token the band already pads the bar with. /morph below lg: the band's `border-block-end` (on the full-bleed band) is replaced by an `::after` inset by the gutter and hung under the band's foot, /paper's recipe. /morph at lg: `meta.ownsCut` now holds at every width (the `max-lg:` gate in App.vue is gone), and the cut is a 1px sticky `.demo-page::before` in the page's content box, pulled up through the top padding and giving the pixel back, so nothing moves. No new element, no shadow or fade.<br>**Measured** (`f10p-probe.json`, scrolled, both themes): /paper 844×390 rule 16..828 = bar 16..828 = article 16..828 (it was 0..844); /paper 390 rule 16..374 = bar = article; /morph 390 rule 16..374 = cards 16..374 (shell rule `rgba(0,0,0,0)`); /morph 1440 rule 160..1280 = the title's and the column's edge (shell rule off). Colour `--border` (rgb(198 180 159) light, rgb(101 87 73) dark). |
| DS-F10C-T1 | **Cured.** The root ToC list computes each depth's widest ordinal in characters (`--toc-ord-<depth>`; "0.1." among the chapters, "2.10." at depth 1), and each ordinal takes `min-inline-size: calc(var(--toc-ord) * 1ch)` in its own Fira Code figures. The label is a baseline flex row (the gap is the old 0.22rem), so the title column starts at the ordinal's measure and wrapped lines keep it, replacing the fixed-rem `text-indent` hang that "0.1." outran. Unnumbered rows keep the empty measure.<br>**Measured** (1440, both themes): one title edge per depth: depth 0 at 219.2 (was 219.2 / 215.6), depth 1 at 239, depth 2 at 247 (was 247 / 202 for the unnumbered rows). Frame `paper-proof-*-1440`. |
| DS-F10C-T2 | **Carried, not a new defect.** "Proof ." still renders as served (probe `proofText`). It is cured at the latex-paper root (`04c3992`, DS-F7C-C2); the 0.3.0 publish and the fourier repin, which also drop the 0.2.1 bridge rules (DS-F8C-C1/C2/T1), are owner acts. |

**Glass-owned rows (DS-F10C-G0).** Re-stated and unchanged, with no local override: the five-layer glass-resting stack on `.floating-toc-bar` (inset bevel, two ink rims, cast, `--shadow-lg`), the glass-floating configurator stack, the dark emphasis halo, the stage capsules, the track-well, the transport's `1 ×`, the dock menu, the text-emphasis hue swap, and the aside's 12px top offset. Fourier's own CSS still has no glow, text-shadow, drop-shadow or infinite chrome animation. Held honest-RED on **O-87 FLAT-LIGHTING** (dock and transport also **O-88**), re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3221`; `f10p/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 9 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). The rules are 1px backgrounds, not shadows. Still RED, on the glass rows only.

**Gates** (`f10p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** the 24 specs of pass 9 (`e2e-specs.txt`; they include every spec that reads `.floating-toc`, the ToC tree, `.stage-column` or the shell's scroll state) ran headless (chromium and mobile-chromium) with `--workers=1` against a private vite on `:3221`, with the config's own preview on `:4190` for `f-w14u-misc`. **Run A passed 245/245, and so did run B.** Both servers were stopped at the end.
- No golden was re-baselined. The `web/e2e/screenshots/f-w14/after-*` frames the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-10/f10p/`). Headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f10p-probe.mjs`: 12 PNGs — `paper-mid-{light,dark}-{844x390,390x844}` and `morph-scrolled-{light,dark}-{390,1440}` (L1), `paper-proof-{light,dark}-1440` (T1, T2 as served).

### pass 11
This is the cure seat for critic **F11C** of the redeployed loop (pass 11, 2026-10-18; the earlier `### pass 11` headings above belong to other passes of the loop). The AFTER frames are in `evidence/DS/fourier/pass-11/f11p/`; the BEFORE cells are the critic's (`paper-proof-*-1440`). The other folders in `pass-11/` belong to other seats.
- fourier `05b408d` (`m/w1-bump-migration`, one path by pathspec, pushed fast-forward `4041480..05b408d`) holds L1.
- latex-paper `70da236` (master, local, not pushed; publishing 0.3.0 is the owner's act) holds the root half and its 0.3.0 changeset line.
- value.js `503b7ac04` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F11C-L1 | **Cured.** The 0.2.1 bridge in `web/src/style.css` now restates the root's result for `.paper-proof-block`: `border-left: 3px solid var(--border)`, `border-radius: 0 0.5rem 0.5rem 0` (straight, as the theorem bridge) and `background: none`. The 60% card tint is dropped, because it was a tone step too faint to read. At the root (latex-paper `70da236`) the proof block takes the same straight radius and loses the tint, so the bridge row and the root agree. The row is deleted with the bridge at the 0.3.0 repin.<br>**Measured** (`f11p-probe.json`, the Hermite proof at 2.6.3, both themes): border-left `3px solid rgb(198 180 159)` light and `rgb(101 87 73)` dark (was `0px none`), radius `0 8px 8px 0`, background transparent. Label and body left = paragraph left + 3 + 16 (570 against 551 at 1440; 52 against 33 at 390). |

**Glass-owned rows (DS-F11C-G0).** Re-stated and unchanged, with no local override: the glass-resting stacks (dock and plate, gallery-card, config-card, paper-article, the ToC aside and the floating-toc band), field-control and toggle items, the primary buttons, the in-stage toolbar plates, the /v transport "1 ×", the stage hover disc, the track-well hairline, the dark primary-emphasis fill and halo, the coarse type ramp, the ScrollProgressRim track, and the text-emphasis hue shift. Held honest-RED on **O-87 FLAT-LIGHTING** (dock and transport also **O-88**; type ramp beside O-87), re-judged at the glass 10.2.0 repin. "Proof ." (DS-F10C-T2) stays carried on the latex-paper 0.3.0 owner act.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3231`; `f11p/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 10 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). The cure is a border, not a shadow. Still RED, on the glass rows only.

**Gates** (`f11p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 (20 files) twice, under `guarded --light`.
- **e2e:** the 20 specs that reach /paper or `.paper-article` (`e2e-specs.txt`) ran headless (chromium and mobile-chromium) with `--workers=1` against a private vite on `:3231`. **Run A passed 227/227, and so did run B.** The server was stopped at the end.
- No golden was re-baselined. The `web/e2e/screenshots/f-w14/after-*` frames the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-11/f11p/`). Captured in headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f11p-probe.mjs`: `paper-proof-{light,dark}-{1440,390}`.

### pass 12
This is the cure seat for critic **F12C** of the redeployed loop (pass 12, 2026-10-18; the earlier `### pass 12` headings above belong to other passes of the loop). The AFTER frames are in `evidence/DS/fourier/pass-12/f12p/`; the BEFORE measurement is the critic's (`pass-12/critic-f12/f12-env.json`). The other folders in `pass-12/` belong to other seats.
- fourier `d45a96a` (`m/w1-bump-migration`, one path by pathspec, pushed fast-forward `05b408d..d45a96a`) holds T1.
- latex-paper `8500f8b` (master, local, not pushed; publishing 0.3.0 is the owner's act) holds the root half and its 0.3.0 changeset line.
- value.js `02b34d0e1` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F12C-T1 | **Cured.** At the root (latex-paper `8500f8b`) the theorem and the proof read one inset rule, `.paper-article :is(.theorem-block, .paper-proof-block) { padding: 0.75rem 1.25rem }`; the proof's own `0.875rem 1rem` and its `border-radius` are deleted (no fill, no right or bottom border: it drew nothing). The 0.2.1 bridge in `web/src/style.css` restates the result for the proof (`padding: 0.75rem 1.25rem`, `border-radius: 0`), and goes with the bridge at the 0.3.0 repin.<br>**Measured** (`f12p-probe.json`, Theorem 2.6.3.1 Hermite Orthogonality and its Proof, both themes): both blocks `12px 20px`, both labels at block+23 and block-top+12 (574 at 1440, 56 at 390; the proof was 570 and 52), label step 0. Proof radius `0px` (was `0 8px 8px 0`); the rule is unchanged (`3px solid` `--border`). |
| DS-F12C-N1 | **Noted, none owed.** Display math wider than the 390 measure scrolls inside the article, as display math should; this is content, not chrome lighting. |

**Glass-owned rows (DS-F12C-G0).** Re-stated and unchanged, with no local override: the dock plate and cast, the glass-resting cards (/paper article and aside, /gallery cards and their dark halo, /morph config cards and stage, /v and /equation stage and Configurator aside with its 12px top offset), the primary-button warm halo in dark, field and toggle bevel stacks, the /v toolbar's doubled plate, the transport "1 ×", the track-well, the coarse type ramp (/morph 390 label outranking its value) and the text-emphasis hue shift. Held honest-RED on **O-87 FLAT-LIGHTING** (dock and transport also **O-88**), re-judged at the glass 10.2.0 repin. "Proof ." (DS-F10C-T2) stays carried on the latex-paper 0.3.0 owner act.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3241`; `f12p/census-after.json`).
- Static: unchanged (7 box-shadow declarations, 11 layers, 1 inset, 7 gradients, 3 keyframes, 0 infinite animations, 0 text-shadow).
- Computed sums: identical to pass 11 (386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations). The cure is padding and a radius, not lighting. Still RED, on the glass rows only.

**Gates** (`f12p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 twice, under `guarded --light`.
- **e2e:** the 20 specs of pass 11 that reach /paper or `.paper-article` (`e2e-specs.txt`) ran headless (chromium and mobile-chromium) with `--workers=1` against a private vite on `:3241`. **Run A passed 227/227, and so did run B.** The server was stopped at the end.
- No golden was re-baselined. The `web/e2e/screenshots/f-w14/*` frames the runs rewrote were restored to HEAD after each run.

**Frames** (`pass-12/f12p/`). Captured in headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f12p-probe.mjs`: `paper-env-{light,dark}-{1440,390}`.

### pass 13
This is the cure seat for critic **F13C** of the redeployed loop (pass 13, 2026-10-18; the earlier `### pass 13` headings above belong to other passes of the loop). The AFTER frames are in `evidence/DS/fourier/pass-13/f13p/`; the BEFORE reading is `f13p/before/f13p-probe-before.json` (it matches the critic's: 36/48 at 1440, 36/42 at 390). The other folders in `pass-13/` belong to other seats.
- fourier `0ee8d0d` (`m/w1-bump-migration`, one path by pathspec, pushed fast-forward `d45a96a..0ee8d0d`) holds T1 and N1.
- latex-paper `94c6b22` (master, local, not pushed; publishing 0.3.0 is the owner's act) holds the root half and its 0.3.0 changeset line.
- value.js `1772a2318` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F13C-T1 | **Cured, with the critic's cure amended on one measured point.** The critic proposed `padding-block: 0.25rem` on the display, relying on `overflow-clip-margin: 0.75rem` for headroom. Measured: beside `overflow-x: auto`, `overflow-y: clip` computes to `hidden` (Overflow 3 §3), so the clip margin never applies and the display's 0.75rem padding is the only tall-ink headroom. The padding stays; the margin goes. In `web/src/style.css`: `.math-block .katex-display { margin-block: 0 }`; a theorem-body row is `margin-block: 0.75rem; padding-block: 0`, and the last row ends on the block's own inset (`margin-block-end: 0`, which the theme's `> :last-child` rule meant but lost on specificity). Below 40rem the stacked equation number carries `margin-block-end: 0.75rem`, because the display's padding now sits between the formula and the number. The DS-F9-C6 override is deleted. The root is latex-paper `94c6b22`, which the bridge restates until the 0.3.0 repin. The stale `clip` comment in style.css now carries the measured correction.<br>**Measured** (`f13p-probe-after.json`, headless real Chrome, both themes): Theorem 2.6.3.1 is label-to-ink 24 and ink-to-foot 24 at 1440 and at 390 (it was 36/48 and 36/42). Its height at 1440 is 131.8 (was 167.8). Definition 2.6.3.1 is 24/24. The proof's (2.74) and a prose display are 32/32 (they were 48). At 390 the foot is measured from the number, which is the row's last ink and sits 12 below the formula. |
| DS-F13C-N1 | **Cured.** The bridge's theorem radius is `0` (was `0 0.5rem 0.5rem 0`), and so is the root's (latex-paper `94c6b22`). No visual change. |

**Glass-owned rows (DS-F13C-G0).** These are pass 12's DS-F12C-G0 rows, unchanged and with no local override, held honest-RED on **O-87 FLAT-LIGHTING** (dock and transport also **O-88**) and re-judged at the glass 10.2.0 repin. "Proof ." (DS-F10C-T2) stays carried on the latex-paper 0.3.0 owner act.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3244`; `f13p/census-after.json`).
- Static and computed sums are identical to pass 12: 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients, 0 looping animations.
- The cure is spacing and a radius, not lighting. The census is still RED, on the glass rows only.

**Gates** (`f13p/gates.txt`).
- `vue-tsc -b` exited 0 twice. `vitest run --maxWorkers=2` passed 116/116 twice.
- **e2e:** pass 12's 20 specs ran headless (chromium and mobile-chromium, `--workers=1`) against plain `vite` on `:3244`. **Run A passed 227/227, and so did run B.** No golden was re-baselined, and the screenshots the runs rewrote were restored to HEAD.
- **Instrument notes:**
  - Pass 12's private `createServer` recipe served Tailwind without `h-dvh` this session, so `f-w13-radius` frame 2 failed there even with HEAD's sheet. That is why the runs used plain `vite`.
  - A production preview run gave 217/227 ×2 (`f13p/preview-runs/`). The 10 failures all hit `/demo/shape-extractor`, a dev-only route that a production bundle does not carry.

**Frames** (`pass-13/f13p/`). Captured in headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f13p-probe.mjs`: `paper-env-{light,dark}-{1440,390}`.

### pass 14
This is the cure seat for critic **F14C** of the redeployed loop (pass 14, 2026-10-18). Earlier `### pass 14` headings in this file belong to other passes of the loop. The AFTER frames are in `evidence/DS/fourier/pass-14/f14p/`. The BEFORE reading is the critic's (`pass-14/critic-f14c/`). The other folders in `pass-14/` belong to other seats.
- fourier `47e0df6` (`m/w1-bump-migration`, two paths by pathspec, pushed fast-forward `0ee8d0d..47e0df6`) holds the bridge for T1 and T2, and L1.
- latex-paper `ebdf787` (master, local, not pushed; publishing 0.3.0 is the owner's act) holds the root half of T1 and T2 and its 0.3.0 changeset line.
- value.js `c535032bf` holds the AFTER frames, the probe and its JSON, the census, and the gate and e2e logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F14C-T1 | **Cured.** At the root (latex-paper `ebdf787`), `:is(.theorem-block, .paper-proof-block)` is `padding-block: 0.75rem; padding-inline: 1.25rem 0`. The inline-end inset drew nothing: there is no fill and no right border. It only narrowed the measure. The 0.2.1 bridge restates the change with `padding-inline-end: 0` on the existing theorem-block rule and `padding: 0.75rem 0 0.75rem 1.25rem` on the existing proof rule. No new rule was added.<br>**Measured** (`f14p-probe-after.json`, all 4 cells): (2.70), (2.72), (2.73), (2.74) and (2.75) all end at 1237 at 1440, the prose's right edge. At 390, (2.72) to (2.74) end at 357, the measure. Before, the in-block numbers ended at 1217 and 337. |
| DS-F14C-T2 | **Cured.** At the root, `.math-block` loses `padding-left: 1rem`, which cleared the hover rule DS-F7-C1 deleted. `.theorem-body .math-block` is `margin: 0.75rem 0`, dropping the 0.5rem inline-start margin. The bridge restates both: `padding-left: 0` on the existing `.math-block` rule, and `margin: 0.75rem 0` on the existing theorem-body rule.<br>**Measured:** at 390, the theorem's and the proof's displays both start at x=56, the text edge inside the block, with clientWidth 301 for both. Before, the theorem started at 80 and the proof at 72, with clientWidth 257 against 265. At 1440, prose displays start at 551 on the measure (clientWidth 624), and theorem and proof displays both start at 574 (601). Computed `.math-block` padding-left and margin-left are 0 in every context. |
| DS-F14C-L1 | **Cured.** `PaperTocDrawer.vue` uses the DS-F7C-C1 idiom. `.sidebar-head::after` is a 1px rule at the head's foot, transparent at rest, and `var(--border)` once the nav carries `data-scrolled`. The nav's own passive `scroll` event sets the attribute, so the follow's programmatic scroll sets it too. There is no shadow, no fade and no new component.<br>**Measured** (1440, both themes): at rest, scrollTop 0, no `data-scrolled`, rule `rgba(0,0,0,0)`. In this run the follow left the rail at rest, so the probe scrolled the list until "2. Lens I: Linear Algebra" was cut under the head (scrollTop 86), as in the critic's frame. The rule then reads rgb(198,180,159) in light and rgb(101,87,73) in dark, which is `--border`, 1px across the head's 290px (`aside-*-1440.png`). |

**Glass-owned rows (DS-F14C-G0).** These are pass 13's DS-F13C-G0 rows, unchanged, with no local override:
- the 390 floating-toc band's cast below its rule;
- the dock plate's cast;
- the aside and article casts at 1440;
- the ScrollProgressRim's empty track.

They are held honest-RED on **O-87 FLAT-LIGHTING** (the dock also on **O-88**) and will be re-judged at the glass 10.2.0 repin. "Proof ." (DS-F10C-T2) stays carried on the latex-paper 0.3.0 owner act.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3246`; `f14p/census-after.json`).
- Static is identical to pass 13.
- Computed is identical on every cell except `/equation|dark|1440`. There the capture found 162 elements against 397: the route was partly mounted under machine load 27 to 37. This cure touches no /equation style.
- Sums: 380 shadow elements, 962 layers, 287 multi-layer stacks, 287 inset highlights, 204 backdrop blur, 0 control gradients, 0 looping animations. Pass 13's were 386, 978, 292, 292, 208.
- The cure is padding, a margin and one transparent-at-rest hairline, not lighting. The census is still RED, on the glass rows only.

**Gates** (`f14p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 twice.
- **e2e, headless** (chromium and mobile-chromium, `--workers=1`, plain `vite` on `:3246`). Other workflows held the machine at load 27 to 37, and pass 13's 20-spec set did not complete:
  - one attempt hit the 40-minute guard at 36/227;
  - a second reached 41/227 in 30 minutes and was stopped.

  Every failure in those attempts was a 30s timeout on /v, /gallery or /admin. Both logs are kept.
- The runs that count use the 10 specs that reach `/paper`, `.paper-article` or the ToC rail (82 tests, `e2e-specs-paper.txt`):
  - Run A: 80 passed, 2 failed (UIA-F-46 on /gallery; the π-capture of /morph at 375).
  - Run B: 80 passed, 2 failed (UIA-F-159's 15s wait for the paper to load; the π-capture of shape-extractor).

  All four failures were timeouts, and the two runs failed on different tests. Rerun on their own against the cured tree, the same 4 tests passed 4/4, twice. This is **not a clean ×2 on the full set**. It is the paper surface ×2, with load flakes shown to pass in isolation.
- No golden was re-baselined. The screenshots the runs rewrote were restored to HEAD.

**Frames** (`pass-14/f14p/`). Captured in headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f14p-probe.mjs`: `paper-env-{light,dark}-{1440,390}` (Hermite Orthogonality, its proof and (2.70) to (2.75)) and `aside-{light,dark}-1440` (the rail with the list scrolled under the head).

### pass 15
This is the cure seat for critic **F15C** of the redeployed loop (pass 15, 2026-10-18). Earlier `### pass 15` headings in this file belong to other passes of the loop. The AFTER frames are in `evidence/DS/fourier/pass-15/f15p/`. The other folders in `pass-15/` belong to other seats.
- **No consumer source changed.** fourier stays at `47e0df6` and latex-paper at `ebdf787`. No fourier or latex-paper commit was made.
- value.js `1fd4b0dca` holds the AFTER frames, the probe and its JSON, the census, and the gate logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F15C-N1 | **No change: the cure's premise does not hold when measured.** The critic offered an optional cure: give consecutive `.theorem-block` siblings the theorem-to-proof gap, on the premise that this gap is wider. `f15p-probe-after.json` (all four cells, headless real Chrome) measures the gaps between every mounted pair of adjacent environment blocks. Theorem to theorem is 16, and so is theorem to proof. Proof to theorem is 20. Definition 2.6.3.1 to Theorem 2.6.3.1 is 16 in every cell. Both rules come from the root's `margin: 1rem 0` on each block, and the margins collapse. So the critic's cure would change nothing. Any other value would be a new spacing rung that the canon does not ask for. The two rules stay separate because their hues differ (pink, then violet), and `paper-env-*-1440.png` shows this. The finding is trivial, and it is closed with this measurement. |
| DS-F15C-N2 | **No change.** As the critic rules, the ToC head's 1px cut rule sitting on the ascenders of the row scrolled beneath it is the intended DS-F14C-L1 state. A fade or row-tuned padding would break the canon, as in DS-F12C-T1. |

**Glass-owned rows (DS-F15C-G0).** These are pass 14's DS-F14C-G0 rows, unchanged, with no local override:
- the casts and inset bevels on resting glass (the dock plate, the /paper article and aside, the 390 floating-toc band, /gallery cards, /morph cards, the stage plate and Export, the /equation stage, and the Configurator aside);
- the dark cast that reads as a cream halo;
- the Compute primary fill sitting almost on `--card`;
- the toolbar plate;
- the aside's 12px top offset on /equation;
- the coarse type rung;
- the ScrollProgressRim.

They are held honest-RED on **O-87 FLAT-LIGHTING** (the dock and the transport also on **O-88**) and will be re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3252`; `f15p/census-after.json`).
- Static is identical to pass 14.
- Computed sums are 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients and 0 looping animations. That is identical to pass 13. `/equation|dark|1440` mounts in full (397 elements), so pass 14's lower sums were its partial capture.
- The census is still RED, on the glass rows only.
- `census-attempt1-server-down.json` is a void first attempt: the `:3251` vite reached its 90-minute guard, so the census captured the browser's error page (20 elements per cell).

**Gates** (`f15p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 twice, under `guarded --light`.
- **e2e:** no file changed, so no spec touches a changed file, and none was run. Pass 14's paper-surface runs stand on the identical tree.
- No golden was re-baselined.

**Frames** (`pass-15/f15p/`). Captured in headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f15p-probe.mjs`: `paper-env-{light,dark}-{1440,390}`, with Definition 2.6.3.1 and Theorem 2.6.3.1 seated near the top. `before/` is a first reading of the same tree; its dark cells did not complete under load.

### pass 16
This is the cure seat for critic **F16C** of the redeployed loop (pass 16, 2026-10-18). The AFTER frames are in `evidence/DS/fourier/pass-16/f16p/`. The other files in `pass-16/` belong to other seats.
- fourier **`95eed0c`** (`m/w1-bump-migration`, pushed fast-forward) adds one rule to `web/src/style.css`. latex-paper is unchanged.
- value.js `1497cc02b` holds the AFTER frames, the probe and its JSON, the census, and the gate logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F16C-T1 | **Cured at the root, in one rule.** The 1.1em display scale belongs to the desktop measure. Below the 40rem arm, `.katex-display > .katex` now takes `1em`, the text size. `f16p-probe-after-{light,dark}-390.json` measures it headless in real Chrome at 390x844, DPR 2, in both themes. (2.70) now has scrollWidth 324 against clientWidth 324 (it was 344 against 324), and `--math-edge-end` is 0px, so it shows in full with no mask: `paper-env-*-390.png`, top display. (2.74) still overflows, 343 against 301, and keeps its 40px scroll cue unchanged. The fade was not touched. At 1440 the scale stays 1.1em (19.8px; `seat-hermite/`). |
| DS-F16C-H1 | **No new work.** "Proof ." closes at the latex-paper 0.3.0 publish and fourier repin, which is an owner act. That repin also deletes the style.css 0.2.1 bridge block. |

**Glass-owned rows (DS-F16C-G0).** These are pass 15's rows, unchanged, with no local override:
- the dock plate and its halo;
- the /paper 390 floating-toc band's five-layer glass-resting stack;
- the Configurator aside, gallery cards, /morph cards and Export;
- the primary casts on /w and /v;
- the /v transport;
- the coarse type ramp.

They are held honest-RED on **O-87 FLAT-LIGHTING** (the dock and the transport also on **O-88**) and will be re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3262`; `f16p/census-after.json`).
- Static is identical to pass 15.
- The computed sums are identical to pass 15: 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients and 0 looping animations.
- The cure is a font size, not lighting. The census is still RED, on the glass rows only.

**Gates** (`f16p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 twice, under `guarded --light`.
- **e2e, headless** (chromium and mobile-chromium, `--workers=1`, plain `vite` on `:3262`). The runs used pass 14's 10 specs that reach `/paper`, `.paper-article` or the ToC rail (82 tests), with other workflows holding the load at 15 to 37:
  - Run A: 80 passed, 2 failed (f-w14u-t t4; the π-capture of /morph at 1280). Both were context-teardown timeouts.
  - Run B: 79 passed, 3 failed (UIA-F-26 Parseval; the π-captures of home at 375 and workspace at 1440). All three were 30s timeouts.

  The two runs failed on different tests. Rerun on their own against the cured tree, the same 5 tests passed 5/5, twice. This is the paper surface ×2, with load flakes shown to pass in isolation. It is not a clean ×2 on the full set.
- No golden was re-baselined, and no tracked file was left modified.

**Frames** (`pass-16/f16p/`). Captured in headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f16p-probe.mjs`: `paper-env-{light,dark}-390`, with display (2.70) seated near the top. `seat-hermite/` holds first readings seated on Hermite Orthogonality, as in passes 14 and 15. The `*attempt*`/`*stall*` logs are probe runs that stalled under load. Their JSON is void.

### pass 17
This is the cure seat for critic **F17C** of the redeployed loop (pass 17, 2026-10-18). The AFTER frames are in `evidence/DS/fourier/pass-17/f17p/`.
- **No consumer source changed.** fourier stays at `95eed0c` and latex-paper at `ebdf787`. No fourier or latex-paper commit was made.
- value.js `1713124d8` holds the AFTER frames, the probe and its JSON, the census, and the gate logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F17C-H1 | **Held on the owner act; added to the H1 hold.** `f17p-probe-after.json` confirms it in all four cells: the §0.1 `<dl>` has two `<dt>` with empty text and 0px height (`paper-intro-*.png`). latex-paper 0.2.1's `parseDescriptionEnv` drops the `\item[...]` term before reading it. The root fix is latex-paper `5be04ae` (DS-F9-C2), which is local on master and unpublished (npm is still 0.2.1). A CSS bridge cannot restore text the parser drops, so there is no fourier patch. The cure is the latex-paper **0.3.0** publish and fourier repin (the same owner act H1 already waits on). It is re-judged by re-capturing /paper §0.1, where the `<dt>` must read "Fourier Series" / "Fourier Transform" in the semibold text face. Until then the H1 hold names two visible rows: "Proof ." and the empty description terms. |
| DS-F17C-N1 | **No change; measured.** At 1440 the header row is 290 wide with 270 of content. The label is 102.5, and the three glass `md` icon-only Buttons are 40 each at x 329/371/413, so they are evenly spaced (a 2px gap each). That leaves 43.5 for the readout, which reserves about 76 (`pg 110/110`). Even glass's `sm` rung would not make room. The readout on its own second line is the deliberate DS-F-C9 layout (`PaperTocDrawer.vue`, "the 17rem row has no room"). The 390 band shares its row because that bar is wider. The finding is trivial and closes on this measurement. |
| DS-F17C-N2 | **No change; measured.** The chip-to-stats gap is the card's own `--card-gap` at both widths: 8 at 1440 and 4 at 390 (`gallery-*.png`). That is glass Card's `--space-atom`, which glass ramps down at phone width. Every other row gap in the card (media, title, meta, chips) halves with it. Holding 8 only at the foot would break the card's single rhythm and override a glass density token locally. The finding is trivial and closes on this measurement. |

**Glass-owned rows (DS-F17C-G0).** These are pass 16's rows, unchanged, with no local override:
- the casts and halos on resting glass (gallery, config and morph cards, the paper article and ToC aside);
- the doubled dock plate;
- the dark primary-emphasis halo on "Choose an image" and "Compute";
- the Export cast and the /equation info and copy capsule;
- the dark Select fills;
- the coarse type ramp (at 390 the metric labels outrank their values);
- the /equation aside's 12px offset.

They are held honest-RED on **O-87 FLAT-LIGHTING** (the dock also on **O-88**) and will be re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3100`; `f17p/census-after.json`).
- Static and computed per-page counts are identical to pass 16.
- The sums are 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients and 0 looping animations.
- The census is still RED, on the glass rows only.

**Gates** (`f17p/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 twice, under `guarded --light`.
- **e2e:** no file changed, so no spec touches a changed file and none was run. Pass 16's paper-surface runs stand on the identical tree.
- No golden was re-baselined.

**Frames** (`pass-17/f17p/`). Captured in headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f17p-probe.mjs`: `paper-intro-{light,dark}-{1440,390}` (§0.1 with its description list), `paper-toc-{light,dark}-1440` (the aside head) and `gallery-{light,dark}-{1440,390}`. These are one reading of the unchanged tree.

### pass 18
This is the cure seat for critic **F18C** of the redeployed loop (pass 18, 2026-10-18). The AFTER frames are in `evidence/DS/fourier/pass-18/`.
- fourier `5d9dc3e` (`m/w1-bump-migration`, pushed fast-forward) changes `PaperTocBar.vue` and `NotFoundCard.vue`.
- value.js `8f184ecad` holds the AFTER frames, the probe and its JSON, the census, and the gate logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F18C-T1 | **Cured at the root.** The chevron sat at the end of the title button because the label (`.floating-toc-section`) took `flex: 1`. The label now takes `flex: 0 1 auto`, so the chevron follows it at every width. Below 40rem the button still fills the bar, so the whole free run stays its tap target. Measured at 390 in both themes (`f18p-probe-after.json`): the label ends at 154.8, the chevron starts at 158.8 (a 4px gap, against about 44 before), and the readout holds 233.5–311 (`paper-top-{light,dark}-390.png`). |
| DS-F18C-T2 | **Cured.** `NotFoundCard` goes from `w-full max-w-md` to `w-fit max-w-md`. At 1440 the card is 402.5 wide (it was 448), and its right slack is 21, which is the card's 20px pad. At 390 it still fills the gutter (358) (`nf-rest-{light,dark}-{1440,390}.png`). |

**Glass-owned rows (DS-F18C-G0).** These are pass 17's rows, unchanged, with no local override:
- the casts and halos on resting glass and on emphasis buttons;
- the doubled toolbar plate and the transport's orphan "1 ×";
- the dock, its menu lens and the lens's 0px icon-to-label gap;
- the Select dark fill;
- the track-well hairline and the ScrollProgressRim track;
- the coarse type-ramp inversion;
- the aside's 12px top offset.

They are held honest-RED on **O-87 FLAT-LIGHTING** (the dock and transport also on **O-88 DOCK-COLLAPSE-MOTION**) and will be re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3263`; `pass-18/census-after.json`).
- Static and computed per-page counts are identical to pass 17.
- The sums are 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients and 0 looping animations.
- The census is still RED, on the glass rows only.

**Gates** (`pass-18/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 twice.
- **e2e** (headless, chromium and mobile-chromium, `--workers=1`): the 9 specs that reach `.floating-toc-*` or the not-found card (`e2e-specs.txt`) passed 132/132 on both runs.
- No golden was re-baselined.

**Frames** (`pass-18/`). Captured in headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f18p-probe.mjs`: `paper-top-{light,dark}-390` and `nf-rest-{light,dark}-{1440,390}`.

### pass 19
This is the cure seat for critic **F19C** of the redeployed loop (pass 19, 2026-10-18). The BEFORE and AFTER frames are in `evidence/DS/fourier/pass-19/`.
- fourier `75182fb` (`m/w1-bump-migration`, pushed fast-forward) changes `NotFoundCard.vue`.
- value.js `3af16fbe1` holds the frames, the probe and its JSON, the census, and the gate logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F19C-N1 | **Cured at the root, as layout only.** The critic guessed the cause was the row's gap or a block margin. Measured (`f19p-probe-before.json`), the row had no margins, and both box insets were 13. The weight came from the quiet link's own box: wrapped at 390, glass's coarse `[data-control-target]` floor makes "Browse the gallery" 44px tall around a 20px line, so about 12px of empty box sat on top of the card's 12px bottom pad. Ink to edge read 23 at the bottom against 9 at the top. The link keeps its whole tap box. Its block slack, `(box − 1lh) / 2`, is bled out of layout on both sides, so it stays centred in an unwrapped row, and the row gap takes the same amount back. The box size is read from glass's own sizing (`--control-h-sm`, and `--touch-target` on coarse pointers). After the cure (`f19p-probe-after.json`), at 390 the bottom ink inset is 11 against 9.1 at the top, the spacing from the primary to the link is unchanged, the link's box lies inside the card, and the card is 12px shorter. At 1440 every box is unchanged (`nf-rest-{light,dark}-{1440,390}.png`, with `-before` twins). |

**Glass-owned rows (DS-F19C-G0).** These are pass 18's rows, unchanged, with no local override:
- the resting casts on the dock, the paper article, the ToC band and aside, the config, gallery and not-found cards, and the /equation stage and aside;
- the dark primary-emphasis halo under Compute, Upload a new image, Choose an image and Export;
- the glass stacked-edge recipe;
- the transport's orphan "1 ×";
- the coarse type-ramp inversion (the /equation presets, and the /morph metric labels outranking their values at 390);
- the aside's top offset against the stage on /equation and /v at 1440.

They are held honest-RED on **O-87 FLAT-LIGHTING** (the dock and transport also on **O-88 DOCK-COLLAPSE-MOTION**) and will be re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3263`; `pass-19/census-after.json`).
- Static and computed per-page counts are identical to pass 18.
- The sums are 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients and 0 looping animations.
- The census is still RED, on the glass rows only.

**Gates** (`pass-19/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 twice.
- **e2e** (headless, chromium and mobile-chromium, `--workers=1`): the 7 specs that reach the not-found card (`e2e-specs.txt`) passed 120/120 on both runs. None is tagged `@coarse`, so mobile-chromium selected none of them.
- No golden was re-baselined.

**Frames** (`pass-19/`). Captured in headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f19p-probe.mjs`: `nf-rest-{light,dark}-{1440,390}`, with `-before` frames of the uncured tree.

### pass 20
This is the cure seat for critic **F20C** of the redeployed loop (pass 20, 2026-10-18). The AFTER frames are in `evidence/DS/fourier/pass-20/`.
- No fourier file changed; fourier stays at `75182fb` (`m/w1-bump-migration`).
- value.js `bcb8ac7e1` holds the frames, the probe and its JSON, the census, and the gate logs.

**Consumer findings.**

| id | outcome |
|---|---|
| DS-F20C-N1 | **Recorded and closed on the measurement; no cure owed.** At 1440 in both themes (`f20p-probe-after.json`), the card's top edge to the title ink is 15. The last action's box to the bottom edge is 23 and its text ink to the bottom edge is 33. This is the display title's half-leading against the bottom pad, with the button boxes as measured, and it is within optical tolerance. At 390 the insets stay balanced: 9.1 at the top against 11 at the bottom, with the wrapped link's tap box bled into the pad as pass 19 set it. The card is 402.5 wide at 1440 and 358 at 390, unchanged from pass 19 (`nf-rest-{light,dark}-{1440,390}.png`). |

**Glass-owned rows (DS-F20C-G0).** These are pass 19's rows, unchanged in the fresh frames, with no local override:
- the dock plate and its halo;
- the glass-resting casts on the /visualize and /equation stage, the Configurator aside, /gallery cards, /morph config cards and Export, the /paper article and ToC aside, and the not-found card;
- the dark primary-emphasis halo under Compute, Choose an image and Upload a new image;
- the doubled info/copy toolbar plate on /equation and the transport's orphan "1 ×";
- the dark Select fill on the /morph "Linear" triggers;
- the light track-well hairline over the slider fill;
- the coarse type-ramp inversion at 390;
- the aside's top offset of about 12px against the stage on /equation and /v at 1440.

They are held honest-RED on **O-87 FLAT-LIGHTING** (the dock and transport also on **O-88 DOCK-COLLAPSE-MOTION**) and will be re-judged at the glass 10.2.0 repin.

**Census** (fourier `scripts/ds-census.mjs --chrome` on `:3265`; `pass-20/census-after.json`).
- The static totals and sites, and the computed per-page counts and sums, are identical to pass 19.
- The sums are 386 shadow elements, 978 layers, 292 multi-layer stacks, 292 inset highlights, 208 backdrop blur, 0 control gradients and 0 looping animations.
- The census is still RED, on the glass rows only.

**Gates** (`pass-20/gates.txt`).
- `vue-tsc -b` exited 0 twice, and `vitest run --maxWorkers=2` passed 116/116 twice.
- **e2e:** no file changed, so no spec touches a changed file and none was run. Pass 19's not-found runs (120/120 ×2) stand on the identical tree.
- No golden was re-baselined.

**Frames** (`pass-20/`). Captured in headless real Chrome (channel `chrome`, DPR 2, §0ei; touch below 1024) by `f20p-probe.mjs`: the critic's 20 route cells, `{visualize,equation,morph,gallery,paper}-{light,dark}-{1440,390}`, and `nf-rest-{light,dark}-{1440,390}`. These are one reading of the unchanged tree.
