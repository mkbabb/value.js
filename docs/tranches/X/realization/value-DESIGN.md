# value — the realization DESIGN pass (2026-11-04)

**Order.** The owner, 2026-11-04, verbatim: "Ensure that our tranche extant, the megatranche, items aare fully realized and refined with design and planning passes thereof." Standing orders: the 2026-09-17 begin-word ("NO quick solutions, NO workarounds … completed the plan IN TOTALITY") and the post-reboot "No deferring any item to another time."

**Scope.** This is the value.js design pass over the realization inventory: 62 items. Every self-owned item gets a gestalt cure, a falsifier and the frames it is expected to produce. Glass-owned items get relay text. Owner acts get the exact ask. No engineering ran in this seat. The plan is executable as written, and nothing in it is deferred. Each glass-gated unit names the publish event that opens it, because those bytes are not ours.

**Law carried into every unit.**
- Every run goes through `~/.claude/guard/guarded`. Browser runs are never `--light`; WebKit runs use `--exclusive webkit`.
- Bounded workers: vitest `--maxWorkers=2`, playwright `--workers=1`.
- Every falsifier is RED before the change and GREEN after, run ×2, and every frame is Read.
- Commits by pathspec. COHESION and the LEDGER take addenda only (E-3). Glass is read-only to us.
- Identity colour, type and motion are owner rulings, never cures.
- Goldens are re-minted only by counterfactual attribution.

---

## 0 · What the served app shows (read 2026-11-04 19:5x, prod `index-B3dwCeez.js`, master `0a2c35d74`)

**Probes.** One guarded headless Chromium per run, one context per cell, closed in `finally`: `value-design-frames/frames.mjs` and `spectrum.mjs` (durable copies in `~/.dev-logs/x-design/`). There were 18 cells (picker at 390×844 / 430×932 / 844×390 / 1440×900 / 1800×1000; palettes and about at 390 and 1440; light and dark), with **0 page errors** and **0 horizontal overflow** (`scrollWidth == innerWidth` in every cell). The frames Read are banked in `docs/tranches/X/realization/value-design-frames/`.

| Reading | Value | Verdict |
|---|---|---|
| Dock centre offset (px from the viewport centre), all 18 cells | 0 | **Mobile centring GREEN.** Dock widths are 164 (390/430), 211 (844), 416–430 (1440), 428 (1800). |
| Card inline symmetry at 390 | 12 px gutter on each side | GREEN. The right/down hard shadow is the one-light elevation law (DESIGN §2.3), not a centring defect. |
| Spectrum aspect at 390×844 | 326.8×160 = **2.042** | within ≤ 2.5 |
| Spectrum aspect at 430×932 | 363.5×160 = **2.272** | within |
| Spectrum aspect at **844×390** | 359.2×96 = **3.741** | **RED, and the worst cell.** This is new; the OD-19 inventory names only the desktop widths. |
| Spectrum aspect at 1024×768 | 505.2×224 = 2.256 | within |
| Spectrum aspect at 1440 / 1800 / 2560 | 593.3×224 = **2.648** | RED (OD-19) |
| Dark aurora field (every dark frame) | brick/maroon, not the chosen Efflorescence pink | O-130. Glass 10.2.0 owns it (unit G-10.2). |
| About inspector at 1800 | 1036 px wide; the key/value grid splits at about 50 %, a 500 px gutter between label and value; 5 hairline separators | BC-CNL-24 and BC-CNL-9 (unit V-D4) |
| Breath of life | the blob idles and the aurora drifts in every frame | GREEN on presence; the dark-field *hue* is O-130 |

**Cube orbit refinement.** The cube is the keyframes.js surface; value ships no cube, so it has no value row. That ask is answered in the kf design pass.

**The dock and transitions.** Every open dock row is glass-owned (OD-1/5/5b/13/14/16/17/18, D-5/6/9/11/12/23/35). Value contributes witnesses and adoption reads only (units G-10.1.5, G-10.2, G-11).

---

## 1 · Self-owned units (one root and one falsifier set per unit)

### V-D1 · Picker proportion: the spectrum is bound by the picker measure, not by the viewport height
**Items:** OD-19-SPECTRUM, plus the 844×390 cell measured above.

**Root.** `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:11` sizes the plane by viewport *height* through per-breakpoint utilities: `h-[20dvh] min-h-24 max-h-40 lg:h-[14rem] lg:max-h-none`. The plane's inline size follows the picker measure (`--picker-measure` = 32rem × 1.272 ≈ 651 px, so the plane is 593 px). Its block size follows `dvh` or a fixed 14rem. Those are two unrelated scales, so the aspect is whatever they happen to divide to: 2.65 on desktop, and 3.74 at 844×390, where `20dvh` = 78 hits the 6rem floor.

**Gestalt cure (one rule, no per-view override, no breakpoint):**
- Make the figure the size container: `.spectrum-figure { container-type: inline-size }`.
- Drop the five height utilities from the plane.
- Give the plane one clamp whose bounds are aspect ratios from the φ ladder and whose preferred term is the existing breath of the viewport:

```css
.spectrum-picker {
    /* The plane's shape belongs to the picker measure. Its bounds are
       aspect ratios (φ ≤ w/h ≤ φ·√φ ≈ 2.058); the preferred term keeps
       the old 20svh breath where it fits inside them. */
    --spectrum-aspect-min: 1.618;          /* φ */
    --spectrum-aspect-max: 2.058;          /* φ·√φ — under the ≤ 2.5 bar by construction */
    block-size: clamp(
        calc(100cqi / var(--spectrum-aspect-max)),
        20svh,
        calc(100cqi / var(--spectrum-aspect-min))
    );
}
```

- The two aspect tokens go into `demo/styles/foundation.css` beside `--picker-measure`, with a line in DESIGN §3.1 (the ladders). The φ·√φ rung is the same half-step the OD-19 measure took (√φ); nothing new is invented.
- The pointer mapping (`SpectrumCanvas.vue:127–135`) already reads `rect`, so it is size-agnostic. The cursor-dot inset stays.
- `MiniColorPicker.vue` (palette search) and `ExtractControls.vue` are separate consumers. Each is checked for its own literal height; a plane rendered through `SpectrumCanvas` inherits the rule.

**Expected geometry (computed from the measured inline sizes):**

| Viewport | Inline size | Block size | Aspect |
|---|---|---|---|
| 390×844 | 326.8 | 168.8 (20svh) | 1.94 |
| 430×932 | 363.5 | 186.4 (20svh) | 1.95 |
| 844×390 | 359.2 | 174.5 (the min bound; was 96) | 2.058 |
| 1024×768 | 505.2 | 245.5 (the min bound) | 2.058 |
| 1440 / 1800 / 2560 / 3440 | 593.3 | 288.3 (the min bound) | 2.058 |

On desktop the picker card grows about 64 px (775 → about 839 at 1440×900, still inside the fold). At 844×390 it grows about 78 px; the page scrolls there already.

**Falsifier F-V-D1:** `e2e/smoke/od19-spectrum-aspect.spec.ts`, born RED.
- Cells: `.spectrum-picker` w/h at 390×844, 430×932, 844×390, 1024×768, 1440×900, 1800×1000, 2560×1440 and 3440×1440, for picker and mix, light and dark.
- Assert `1.6 ≤ aspect ≤ 2.5` everywhere, and `aspect ≤ 2.06 + 0.01` wherever the min bound binds.
- RED today at 844×390 (3.741) and at 1440+ (2.648).
- Joint guards, re-run unchanged: Z-chassis-2/3 and Z-LG-3 (`ss8-z1-app-chassis.spec.ts`, the stage = measure law), and the picker pointer-mapping unit (a corner click maps to the corner coordinate at three sizes).
- Run ×2 locally, then ×2 on prod at 1440/1800/2560/3440 with the §0ho.1 probe (`evidence/0ho/od19-measure/prod-probe.mjs`), extended with the 844×390 cell.

**Frames:** picker 1440 light (plane about 593×288; the sliders keep their rhythm), 844×390 dark (the plane is no longer a strip), 390 dark (unchanged within 9 px).

**Goldens:** re-mint only the picker, mix, palettes and blob stage goldens whose diff is confined to the spectrum box and the card's block size (attribution: a counterfactual build with only this rule reverted reproduces the old golden byte-for-byte).

**Coordination:** `wf_014d8c52` is working the root cure. This unit is the spec it is read against. Whichever seat lands first, the other reads F-V-D1 and does not land a second rule.

### V-D2 · The prod readings record (§0hn.2 owed, §0hr r1..r3)
**Items:** OD-PROD-REREADS.

**Cure.** There is no code; this unit puts the readings on the record.
1. Re-run OD-12 light. `~/.dev-logs/x-0hr/od12-r1-desk.log` is 0 B, so the run never wrote. Use `probe-served.mjs` with a guarded single browser, cells desk 1800×1000 and mob 390×844, ×2. The gate is dominant ΔE_OK ≤ 0.05 per seed. Teal's known 0.057 is reported under the OD-12 ruling (owner ask A-2), never loosened.
2. Append one dated addendum, "§0hu prod readings", to COHESION and the LEDGER, quoting the r1..r3 rows verbatim from `~/.dev-logs/x-0hr/od/*`:
   - OD-9 clippedPx 0
   - OD-10 crown ∩ Apply 0
   - OD-11 `data-slot=badge`
   - OD-15 stage 651 ≤ measure (palettes 450–562)
   - OD-3b grid lists both Daraksha rows (1800 and 390)
   - OD-19 spectrum 2.648 ×3 runs (the RED that V-D1 cures)
   - OD-12 light ×2

**Falsifier:** the addendum's rows are byte-equal to the log lines (`diff` of the extracted JSON). The OD-12 light log is non-empty and carries ×2 cells.

### V-D3 · The chip family: one module, one serializer home
**Items:** BC-R-4, BC-R-6, BC-R-14, BC-R-15, BC-R-16, BC-R-18, BC-R-19, BC-R-22, BC-R-24, BC-R-26, BC-PCS-10.

**Root.** `demo/shared/ui/color-chips/` is the ruled single home of the preview-chip grammar, but its contract leaks in three ways. The golden plate is defined against the root em rather than the chip's own em. The stops → CSS serialization has no single home: the gradient string is minted at five or more sites in two idioms. And the chip root does not declare itself a colour surface.

**Cure (one module pass):**
1. **Proportion (R-4).** In `chip.css`, replace `inline-size: 2.618rem` with `aspect-ratio: 2.618` and keep `block-size: 1em`, so the plate is φ² × the *chip's* em at any font size. Update the header comment ("F7: one golden plate of its own em").
2. **Forced colours (R-6).** Add `data-color-surface` on both chip roots (PreviewRamp, PreviewStrip), joining the shared forced-colors rule that already protects the palette strip and the generate plate.
3. **One serializer (R-18, R-19).** `sample.ts` becomes the producer home and exports `stopsToGradient(stops, { direction })`. Its one idiom is `linear-gradient(in oklch 90deg, …)`, with `serializeStop` as the one notation. These sites migrate to it:
   - `palette-rail.ts:28`
   - `ComponentSliders.vue:236`
   - `MixResultDisplay.vue:122` (`to right` → `90deg`)
   - `useGradientCSS.ts:212`
   - `PreviewRamp.vue:24`
   - every `data-stops` producer

   The o14 dialect test then reads one notation.
4. **Dead code (R-14).** Delete `.replace(/ \/ 1\)$/, ")")` in `serializeStop`; `colorToCss` already omits alpha 1.
5. **Domain guard (R-15).** At the entry of `sampleInterpolationRamp`: `const k = Number.isFinite(kIn) ? Math.max(2, Math.floor(kIn)) : RAMP_SAMPLE_COUNT`.
6. **Memoise (R-16).** `const stamped = computed(() => stampStops(stops))` in both chips; the template binds `stamped`.
7. **Totality (R-26).** Filter unpaintable stops before composing the gradient. If fewer than 2 remain, stamp `data-absent` and paint the well (honest absence), so one bad stop no longer nulls the whole `background-image`.
8. **Map truth (R-22).** Correct the CONSUME MAP in `index.ts:11–13`: the ramp's consumers are `InterpolationFields.vue` (gradient and mix rows) and MixConfigBar. The GradientVisualizer consume was never wired, and the X-W6 decision is recorded as "not wired: the visualizer shows the real gradient, so a ramp there is redundant".
9. **Notation (R-24).** **Recommend keep:** `data-stops` is the O-14 public test contract on a data surface, and it costs bytes only. Record it in DESIGN §4.2 as a named contract, so it is no longer unruled scaffolding. (Stripping it in production would fork the DOM the e2e reads.)
10. **Compact palette (PCS-10).** The five compact palette renders unify on one `CompactPalette` primitive in `demo/shared/ui/`, with one truncation policy: show N swatches plus a "+k" count, N from the container (`cqi / swatch`). It joins the chip module's grammar; it is not a new shared directory.

**Falsifiers:**
- **Unit** (`demo/test/color-chips.test.ts`):
  - NaN and Infinity k → the default count, finite and bounded (RED: `[]` / hang, run under a 2 s timeout).
  - One unpaintable stop among three → a 2-stop gradient (RED: null).
  - `stopsToGradient` output is byte-equal across all five sites' inputs.
- **e2e:**
  - Chip inline/block = 2.618 ± 0.01 at `font-size` 12/16/24 px (RED at 12 and 24).
  - `forced-colors: active` leaves the chip visible: the computed `background-image` is not `none` and `forced-color-adjust: none` is on the root (RED).
  - Every compact render at 390 shows its "+k" when truncated.
- **Repo grep:** zero matches for `linear-gradient(to right` in `demo/**`.

**Frames:** mix config menu at 1440 light (ramps φ² at the menu font), forced-colors 1440 (the chips survive), palettes rail at 390 (+k).

### V-D4 · The About inspector: the colour-space nutrition label
**Items:** BC-CNL-4, BC-CNL-8, BC-CNL-9, BC-CNL-11, BC-CNL-16, BC-CNL-17, BC-CNL-24, BC-CNL-25.

**Root.** `demo/scenes/about/ColorNutritionLabel.vue` is one component that predates the X product-surface laws. It takes the whole model by two-way binding, flattens its data into prose, divides itself with rules, and fails open on ink.

**Cure (one component pass):**
1. **Props (CNL-16).** Replace `defineModel<ColorModel>` with `defineProps<{ space: ColorSpace }>()`. The parent passes `selectedColorSpace`, which ends the per-tick fan-out of the whole model.
2. **Ink is a Result (CNL-4).** The library gains `contrastInk(fill, opts): Result<Color, ContrastRefusal>` in `src/units/color/` (exported on `@mkbabb/value.js/color`). It generalises the demo's `contrastInkFor` (`demo/color-session/ink.ts:788`), which today returns `null` for alpha < 1, a gamut-map failure, or no floor reached. The demo's `contrastInkFor` becomes a thin consumer. The node renders `data-ink-refused` with an outline-only treatment and its label in body ink, never `"" → inherit`. This is a library minor (4.3.0, folded with X·P W10's 4.3.0 cut; one release).
3. **Composite referent (CNL-17).** `ink.ts` composes tint-over-ambient in **linear-light** sRGB (premultiplied over), then converts to OKLab for the floor test; today it lerps OKLab L. Re-certify against the measured resting plate, with the 4.5 floor (the W11.10(e) fold).
4. **Rhythm, not rules (CNL-9).** Delete the five `<Separator />` (lines 25, 62, 90, 112, 165). Section rhythm is the `--phi-3` block gap between sections and `--phi-1` from heading to body (DESIGN §3.1). Drop the Separator import.
5. **Semantics and measure (CNL-24).** The key/value groups become `<dl>` with `grid-template-columns: max-content 1fr`, which removes the 500 px label-value gutter seen at 1800. Components becomes `<dl>` with `repeat(var(--channel-count), minmax(0, 1fr))`, the count taken from the space's channel count instead of an unconditional `grid-cols-3`. Applications and industries become `<ul>` inline lists, not `.join(", ")`. The prose blocks take `max-inline-size: 66ch`.
6. **Interaction truth (CNL-8).** The conversion-path rows are not interactive, so drop `hover:bg-accent/50` and the mouse handlers. If the path-highlight is wanted, the row becomes a `<button>` with an equivalent `:focus-visible` highlight and the same state on focus and touch. **Recommend drop:** the graph highlight has no non-hover consumer.
7. **Bidi (CNL-11, with AB-36).** Wrap each value in `<bdi>` and put `unicode-bidi: isolate` on the dl cells. Use logical properties only.
8. **Decorative icons (CNL-25).** `aria-hidden="true"` on `ArrowRight` and on any icon sitting next to text.

**Falsifiers:**
- **Unit:** `contrastInk` on `oklch(0.6 0.1 30 / 0.5)` → `{ ok: false, reason: "translucent" }`; on an unreachable fill it returns the floor refusal (RED: the function does not exist). The demo node with that seed carries `data-ink-refused` (RED: inherits silently). The linear-light composite matches a hand-computed premultiplied over within 1e-6 (RED: the OKLab-L lerp differs by more than 0.01 on the plate).
- **e2e:**
  - Zero `[data-orientation][role=none]` separators in `.nutrition-label` (RED: 5).
  - At 1800 the label-to-value gutter is ≤ `--phi-3` + 1 px (RED: about 500 px).
  - An `rtl` capture shows component rows intact (RED: broken).
  - axe reports zero `svg` without a name or `aria-hidden` (RED).
  - Keyboard: no element with a `:hover` background lacks a focus path.
- Both ×2.

**Frames:** about 1440 light/dark, 1800 dark (no rules; the dl column hugs the labels), 390 light, rtl 1440.

### V-D5 · The palettes area seam
**Items:** BC-PCS-9, V′ CARRY-LEDGER D57 (legacy export), BC-PCS-31.

**Read.** `demo/palettes/usePaletteExport.ts` (64 lines) is a **thin adapter** over `export/serializers.ts`: it only adds format validation and an `ExportOutcome` ref. It is not the legacy path. D57's order ("retire the legacy export") was consumed when the serializers landed. The composable is the area's UI port.

**Cure:**
- Author `demo/palettes/index.ts` as the area seam, so other areas import only through it. Its exports: `PalettesPane`, `BrowsePane`, `usePaletteStore`, `usePaletteExport`, `usePalettePorts`, and the types. It is a seam, not a ui barrel, and the barrel ban is respected.
- Re-point the eslint `no-restricted-imports` rule so cross-area deep imports of `demo/palettes/*` are refused.
- Move `usePaletteExport.ts` to `export/usePaletteExport.ts` beside its serializers (one directory, one concern).
- D57 gets a terminal row: "consumed, adapter retained by design".
- PCS-31 (RTL SVG export): the export serializer emits its swatch order through `direction`-aware placement (`x = isRtl ? W - x - w : x`), read from the document's `dir`. It ships in this unit; the RTL audit is already authored.

**Falsifier:**
- `eslint demo` with a planted deep import `../palettes/usePaletteStore` from `demo/workbenches/**` fails (RED: passes today) and passes when routed through the seam.
- Unit: an SVG export under `dir=rtl` orders swatches right-to-left (RED).
- vue-tsc stays clean.

### V-D6 · Demo type plumbing: delete the phantom paths
**Items:** BC-PCS-30 / W-HYGIENE H-c.

**Read.** `tsconfig.demo.json:39–49` maps `"@mkbabb/value.js"` to `dist/index.d.ts`, which does not exist. It also maps `/parsing` and `/units`, which are not in the exports map (the live map is `./color`, `./value`, `./css`, `./easing`, …). The comment's "CLOSED 8-key set" is false.

**Cure.** Per the FOLD ruling, delete the whole inert `@mkbabb/value.js*` paths block. The package's self-reference resolves through `exports` under `moduleResolution: bundler`, which is the same resolution the Vite self-alias mirrors.

**Falsifier:**
- `vue-tsc -p tsconfig.demo.json --noEmit` is clean before and after. A planted `import "@mkbabb/value.js/parsing"` errors after the change (RED today: it resolves through the phantom path to a missing file and errors differently, or silently to `any` under `skipLibCheck`).
- The generator-parity command (`vite.config.ts` self-alias vs the exports map) reports equality.

### V-D7 · Pane-granular error boundaries
**Items:** FB BOUNDARY-SCOPE AB-4/AB-5.

**Root.** There is one app-level `demo/app/ErrorBoundary.vue`, so a throw in any pane blanks the scene.

**Cure.** `PaneShell` already wraps every pane. Its default slot renders inside an `onErrorCaptured` boundary local to the shell. The fallback is the pane's own card with an honest message ("This pane hit an error.") and a Retry that re-keys the slot. The error propagates to the app boundary's reporter, and the event returns `false` only after it has been recorded. There is no new component directory: the boundary is PaneShell's behaviour. The app-level boundary remains for shell-level faults.

**Falsifier:** a crash battery, `e2e/smoke/pane-boundary.spec.ts`. Per pane (picker, inspector, palettes, browse, generate, gradient, mix, extract, blob), a test hook (`?__throw=<pane>`, compiled only in the `e2e` mode build) throws in setup. Assert that the sibling pane stays interactive, the dock stays live, and the fallback is visible with Retry. RED today: the whole app shows the app boundary. ×2.

### V-D8 · The records: one crosswalk addendum
**Items:** RECORDS O-132 id collision, FINAL Annex A `ESC-R1-XP-REST.`, the RECORDS wave honest-RED labels (LEDGER:28–42), FB PRE-X MT-REGISTER, the X-W12/W12U glass lineage (its value half), the CARRY-LEDGER §B–§F crosswalk, and INDEX hygiene.

**Cure:** one records seat writes these dated addenda (E-3):
1. **INBOX erratum.** The fourier follow-up to O-119, already renumbered once to O-132 at `7bb8c06a5`'s erratum, collides with the glass Safari outbound O-132 (booked at glass `b2eb9950a`). It is renumbered **O-133**. A COHESION §0hm.3 addendum names the change. Rule: outbound ids are allocated by `grep -o 'O-[0-9]+' INBOX.md | sort -V | tail -1` + 1 at send time.
2. **FINAL Annex A addendum.** `ESC-R1-XP-REST.` is a census tokenisation artifact: the sentence-final period was taken into the id. The id is `ESC-R1-XP-REST`, escalated in the X-W7 REPAIR 1 list (LEDGER:628, "… ESC-R1-VHD-IMMEDIATE · ESC-R1-XP-REST. vitest 803/805"). Its disposition is the same as its siblings': **superseded-by X-W7 CLOSED 2026-09-17**, with its X·P remainder carried into X·P (P layer CONFORMANT p10; residuals at parse-that W9). The census parser is fixed to strip trailing punctuation, and the annex is regenerated as a new file.
3. **Wave-label crosswalk.** One table, one row per honest-RED label on LEDGER:28–42. Columns: label · status (cured-at `<sha/run>` | glass-held → unit G-x | owner-held → ask A-x) · command. The spot-cures are read and cited: X-W1 G-17/19/20 → ci 41920320369 and deploy 41939659512; CI npm-test C-5/NG-6 → 1515/1515; X-W2 G3 TBT → GPU lhci 61–84 ms.
4. **MT→X crosswalk.** 15 records, id for id. The 4 BLOCKERs are re-measured on the live tree, each with its command and reading.
5. **X-W12 lineage.** Each label gets an id-for-id terminal row, written at its adoption read (G-10.1.5 / G-10.2 / G-11), not before.
6. **CARRY-LEDGER §B–§F.** A row-level crosswalk to X rows or terminal dispositions. D57 → V-D5.
7. **INDEX hygiene.** The 11 staged `evidence/0hm/*` files and the chassis `x-track-A/B.js` belong to the §0hm seat; that seat commits them by pathspec. This seat never commits with the bare index.

**Falsifier:** a script, `docs/tranches/X/realization/records-check.mjs`, exits 0 only when all of these hold (RED today on every leg):
- every LEDGER:28–42 label has a crosswalk row;
- every FINAL Annex A id matches `/[A-Za-z0-9-]$/`;
- the INBOX outbound ids are unique;
- every MT-* id has an X row.

### V-D9 · CI truth: `webkit-hosted` reports something true
**Items:** WEBKIT-HOSTED never green.

**Read.** `webkit-hosted.yml` (macos-15) has never been green in 82+ runs. The failures are the hosted VM's GL loss plus the O-106 legs. A check that is always red reports nothing.

**Cure (recommended arm, the gestalt one).** Split by what the cell can know.
- The hosted job runs only the **GL-independent** WebKit manifest (`e2e/webkit-hosted.manifest.json`: specs tagged `@no-gl`, about layout, forms, routing, a11y) and must be green. It becomes a deploy *signal*, and stays non-gating until it has been green ×2.
- WebGL, aurora and dock-morph WebKit truth is the darwin real-GPU cell of record (§0ge.2), run `guarded --exclusive webkit`.
- The workflow header names that split, and the honest-red reporter is not used here, because a scoped green is truer than a manifest of reds.

Recorded as a ruling in the COHESION addendum.

**Falsifier:** two consecutive hosted runs on the cure head are success (RED: 0 of 82). A planted GL-dependent spec without `@no-gl` is refused by the manifest check step.

### V-D10 · R19-5: the Playwright dependency pass (un-carried, per "No deferring")
**Items:** R19-5.

**Cure.** One dependency-pass unit on its own branch off tranche-u:
- Bump `@playwright/test` and `playwright` to the current release that is at least two weeks old, exactly pinned, and run `npx playwright install` under guard.
- Re-mint every golden by **binary-only attribution**. The counterfactual is the old binary on the same head; a golden is re-minted only where old binary + same head reproduces the old golden and new binary + same head reproduces the new one. Any diff that does not attribute to the binary is a defect, not a re-mint.
- CI 8/8, the darwin WebKit cell ×2 (`guarded --exclusive webkit … --workers=1`), then an ordinary §0ga merge.
- Sequencing: it lands **after** G-10.1.5, so the two re-mint sets never mix attribution.

**Falsifier:** `npx playwright --version` equals the pin. The attribution table lists 100 % of the changed goldens with binary-only cause. The e2e suite is green ×2 on the new binaries.

### V-D11 · Parser instruments at the current release
**Items:** RC-P at V=4.2.0, the R-2 drift probe substrate, the X.P quiet-host L-G1 re-read (its value half), O-104 acks (tracked).

**Cure:**
- **RC-P.** Re-run conjuncts 1·2·3·5·6 against the `@mkbabb/value.js@4.2.0` tarball (`npm pack`, then the TOTALITY probe with `--preserve-symlinks-main`) ×2, banked to `bench/records/rc-p-4.2.0/`.
- **R-2.** Re-author the fourier drift instrument as a **new file** (`scripts/probes/drift-subpath.mjs`, E-3) that imports the subpath surface (`@mkbabb/value.js/color`, `/value`, `/css`). The 0.13-era root path is gone, so the old probe's ERR_MODULE_NOT_FOUND is the expected RED. Legs 1 and 2 report the registry coordinate. Run ×2.
- **L-G1.** Owned by parse-that W9 `.rd`. Value supplies only the quiet window (load < 8, `guarded`, serial) and banks it; this pass does not schedule a second run.
- **O-104 acks.** Owned by parse-that W9 `.o104`; listed here so the value row closes when that unit rows the acks.

**Falsifier:** RC-P reports all 5 conjuncts GREEN ×2 at 4.2.0 (RED: no reading exists). `drift-subpath.mjs` exits 0 and prints the 4.2.0 coordinate (RED: the old probe exits with ERR_MODULE_NOT_FOUND).

### V-D12 · The adoption reads (value bytes: a repin only)
These are the value halves of the glass-gated rows. Each runs on glass's publish ping. The glass text is in §2.

- **G-10.1.5.** Covers GLASS-ADOPT-10.1.5, OD-1/5/5b, OD-16, OD-17/13, D-5, D-6, D-9 and D-23.
  - Exact repin `@mkbabb/glass-ui@10.1.5`, with the lock `integrity` equal to the registry's.
  - CI 8/8, attributed re-mint, §0ga merge, deploy.
  - Served reads ×2:
    - the resting plate's border-radius is uniform at half the block size at 390, 430 and 844×390 (OD-1/5/5b, D-5: no ellipse, `rx == ry`);
    - the collapsed seal radius per frame, WebKit and Chromium, with a settle snap ≤ 0.5 px (OD-16, D-6);
    - the focus ring and seat ring are whole on all four edges and every seat, collapsed, expanded and input (OD-17/13: ring bbox ⊂ the clip rect);
    - the slider thumb is visible and the same size at min, mid and max (D-9);
    - input/subtitle type ratio ≤ 1.25 at 390 (D-23).
  - Then the V-D8 terminal rows for DOCK-CAP-ELLIPSE (O-83) and the 10.1.5-placed lineage labels.
- **G-10.2.** Covers OD-12-DARK / D-10, OD-14/18 and D-11/12, VITEST-HELD ×5, O-87/O-88, ESC-SS8r-0132, and the 5 O-104 rows placed in 10.2.0.
  - Flip `DARK_FIELD_SEED_FAITHFUL` to `true` (`seeded-ground.ts:48`) and unwrap the `it.fails` at `aurora-seed-fidelity.test.ts:119`.
  - ss8-b09 6/6 over the faithful dark field, with no oracle loosened.
  - The prod ΔE table ×2, light and dark.
  - The WebKit and Chromium tool-click trace ×2: maxWidthStepFrac ≤ 0.125, settleRadiusJump ≈ 0, 0 elliptical frames, no swap dt > 20 ms.
  - The 5 vitest-held rows GREEN ×2. If the Palettes title ramp or the pane caption still fails over the mean-ambient referent, the consumer ink model certifies display ink against the *local* field, which is the linear-light composite of V-D4.3; that is one model, not a second one.
  - Tools ink ≥ 4.5 over the dock band ×2. O-87/O-88 are re-judged on the same frames, id for id.
- **G-11.** Covers E2E-HELD ×4, the 14 O-104 rows, the O-109..O-111/O-120/O-121/O-123 perf rows, D-35, and O-106 if W-E.4 rides it.
  - Each `producer-held.json` row leaves by adoption, reading GREEN ×2, with no `test.fail` and no skip.
  - The perf gates are re-measured on the real-GPU cell ×2.
  - O-106: a guarded `--exclusive webkit --workers=1` run of the w7-destructive-seats legs ×2.

**Falsifier (all three):** the producer-held manifests shrink to empty exactly by the rows named, and the repo grep for `it.fails` / `test.fail` tagged with those O-ids returns 0.

---

## 2 · Glass relays (to glass-ui-b5 via SendMessage, logged in INBOX as O-134..)

The ids are allocated at send time by the V-D8 rule; O-133 is the fourier renumber. This seat drafts them; the orchestrator sends.

**R-G1 (O-134), the adoption ping and the 10.1.5 contents check:**
> value-js-cc → glass-ui-b5. Value is ready to adopt 10.1.5 whole on your publish ping (10.1.4 skipped by ruling; pin 10.1.3). Please confirm that 10.1.5 carries all of these, so value's read matrix matches your gates: O-129 r1 (resting-plate ellipse: OD-1/5/5b, D-5), r2 plus the OD-16 extension (uniform collapse radius from 80 % to rest, the square ghost, the 24.4 px settle snap: D-6), r5 (the slider thumb at min/max: D-9), r6 (the 16 px input floor: D-23), and O-132 OD-17 (the ring plus hover ink inside `--dock-run-reserve`). Value's adoption read ×2 at 390/430/844×390/1440: rx == ry on the resting plate; seal radius settle ≤ 0.5 px in WebKit and Chromium; ring bbox ⊂ clip on every seat; thumb size equal at min/mid/max; input/subtitle ≤ 1.25 at 390. We will not shim any of these locally. Please reply with the publish run id.

**R-G2 (O-135), the 10.2.0 gates value will read:**
> value-js-cc → glass-ui-b5. For 10.2.0, value's adoption read is:
> (1) O-130 W-0.1 plate L-floor: value flips DARK_FIELD_SEED_FAITHFUL and requires ss8-b09 6/6, oracle unchanged;
> (2) W-0.8 §11: WebKit and Chromium tool-click traces ×2 against your banked GREEN (maxWidthStepFrac ≤ 0.125, settleRadiusJump ≈ 0, 0 elliptical frames, no swap dt > 20 ms);
> (3) O-62(a) INK-VEIL-MIDBAND: the 5 vitest-held rows (D6 resolveMutedInk ×2, T-35 cream-collapse ×3);
> (4) O-83/O-87 dock-band rung: Tools ink ≥ 4.5 over the light dock band (4.42 today);
> (5) the O-87/O-88 X-DS rows (V20C-G1, V19C-G1/08, V18C-G1/G2, V17C-G1..G4, V15C-04, V13C-01, V1C-G1..G4, V8C-G1/G2, the 390 dock bulge), re-judged on the same frames;
> (6) the 5 O-104 rows you placed in 10.2.0.
>
> Question: does 10.2.0 also carry D-26's press grammar? The owner's ruling is pending (ask A-4); please hold the 0.96 default without shipping a direction change until it lands. Question: D-35, are dock-seat tooltips intended? If they are, value wires nothing; it reads DockIconButton's tooltip on adoption.

**R-G3 (O-136), the 11.0.0 placement check:**
> value-js-cc → glass-ui-b5. For 11.0.0, value expects W-G.1/G.2/G.5 to discharge e2e producer-held rows 1–4 (o29:395 no repaint after restore; webgl-blob-idle:276 painted chroma ×2; o21:287 loseContext timeout), the 14 O-104 rows, W-G.4 (seed stop, tonemap, temperatureShift), and the O-109..O-111/O-120/O-121/O-123 mount-cost rows. Please confirm which release carries W-E.4 (O-106, deliberate trailing activation on the WebKit real-GPU cell: the w7-destructive-seats legs, 191/199). Value will run each row GREEN ×2 with no test.fail or skip. Please also confirm the X-W12 lineage labels (DOCK-MORPH-ROOT, DOCK-TRIGGER-CLIP, DOCK-COLLAPSED-FORM, GLASS-SELECT-GREY, SIDE-DOCK-EDGE, GLASS-VEIL-GREY, DOCK-SCROLL-MORPH→O-55, O-74, O-99) by the release that discharges each, so value can write the id-for-id terminal rows.

---

## 3 · Owner asks (exact)

| # | Item | The ask | Recommendation |
|---|---|---|---|
| A-1 | OD-3b-TRANSFER | "What is your account slug on color.babb.dev?" Then a seat calls `POST /admin/palettes/daraksha/owner` and `…/daraksha-gradient/owner` with it, reads the audit rows back, and checks My Palettes ×2. | — |
| A-2 | OD-12-RULING | (a) "Does OD-12 (the chosen colour's dark field) supersede F-6's luminous-dark band?" (b) "Is teal's 0.057 dominant ΔE (bar 0.05; area-mean 0.077, curry-leaf 0.06 against 0.07; hue 7.6°/8.4°) accepted as the T-37 seam floor, or must fidelity win at the seam?" | (a) yes, OD-12 supersedes. (b) accept the seam floor as measured, re-read at G-10.2. |
| A-3 | DEAD-BAND | "The darkest stop's bare 4.196 and the resting plate's 4.240 sit under 4.5. Do you hold identity chroma over the floor for that band, or should the floor win?" | — (identity; no recommendation) |
| A-4 | D-26 | "Dock press: should it press in (0.96, fourier) or out (1.07, value), and how deep? Should keyframes adopt it?" | press in, 0.96, all apps, through `--dock-press-spring` |
| A-5 | D-36 | "'@mbabb' is set in Fira Code among the Fraunces dock labels. Keep the mono handle, or set it in Fraunces?" | — (identity) |
| A-6 | BC-R-12 | "Between the 17 samples the engine interpolates. Should the chip use hard stops (the law holds), or should the law be amended to admit the measured band?" | hard stops: it is the law's literal reading and costs nothing |
| A-7 | O-131 | "On npmjs.com, add a trusted publisher for `@mkbabb/value.js` and `@mkbabb/keyframes.js` (repo mkbabb/<repo>, workflow `release.yml`), then tell us." A seat then removes `NODE_AUTH_TOKEN`, deletes the secret, and confirms an OIDC provenance publish. | — |
| A-8 | L-18 | "The acceptance gauntlet needs an arbiter tier, and your 2026-09-23 order is Opus-only. Lift Fable for the arbiter seat, or name Opus as the arbiter?" | name Opus (a fresh seat) as arbiter, so the gauntlet can run now |
| A-9 | R-vrb-1 | "Guard policy: is the browser-pool and WebKit-exclusive contention accepted as designed (queueing, not failure)?" | accept it; it is the machine law working |
| A-10 | AF-50 | "Move the session from a localStorage bearer to a `__Host-` HttpOnly cookie (D55.iii)?" | yes; the API and demo session port move together |
| A-11 | MIGRATE-DIALOG | "Keep or remove the migrate-palettes dialog? Removal ships with the recovery article (D-14)." | — |
| A-12 | DR-24 | "`scripts/dev/dev.sh` is modified: commit it, or restore it?" | — |
| A-13 | CARRY-LEDGER diff | "The uncommitted +34 lines in V′ CARRY-LEDGER (glass BJ W4 / v8 Slider, W8 refract-state; dated 07-22) are stale against glass 10.x. Discard them, or commit them as an addendum?" | discard; V-D8.6 carries their substance into the crosswalk |
| A-14 | .worktrees | "Adopt or discard each of p2-work (8 dirty files), ss8r (6), v1 (5), v1-bis (1), v1c-wt (18), v1e-wt (4), v1f-wt (18) and od19-mint (detached)?" | discard all except od19-mint until V-D1 lands |
| A-15 | D-4 | "The fourier gallery is empty (`items: []`). Will you publish the first visualizations, or seed them?" | — |
| A-16 | V-D9 arm | "Do you ratify webkit-hosted as a scoped GL-independent green, with the darwin cell as the WebGL record?" | yes |

---

## 4 · Other repos (tracked; no value bytes)
- **O-119 / O-133:** the fourier co-signature. It is delivered when a fourier session is live, and the reply is rowed in INBOX.
- **O-104:** the parse-that and bbnf-lang acks (parse-that W9 `.o104`).
- **parse-that dirty tree:** the parse-that-bbnf workflow owns it. No value seat touches it.

## 5 · Order of execution
1. V-D2 (records only). Then V-D1 (with wf_014d8c52), V-D6, V-D3, V-D4, V-D5, V-D7, V-D11 and V-D8, serially, one heavy run per seat.
2. V-D4.2's library minor folds into the 4.3.0 cut.
3. On each glass publish ping: G-10.1.5, then V-D10 (Playwright, after G-10.1.5), then G-10.2, then G-11.
4. Owner asks A-1..A-16 go out as one message, now.
5. Each unit closes with: falsifier RED→GREEN ×2, frames Read, an attributed re-mint where needed, a pathspec commit, a COHESION and LEDGER addendum, and for a deployed unit the served reads ×2.
