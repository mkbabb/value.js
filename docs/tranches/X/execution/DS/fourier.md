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
