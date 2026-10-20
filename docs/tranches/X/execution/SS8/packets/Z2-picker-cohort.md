# SS-8 packet — Z2-picker-cohort (zero-residue sweep)

**SERVED MODEL:** `claude-opus-5-5` (Opus 5.5). This is the model ID in this seat's own system prompt. It was not inherited from another seat.
**Seat:** SS-8 WITNESS · 2026-10-20 · authority: EXECUTION-RUNBOOK §4.1 (the zero-residue gap), COHESION §0gd.4.
**Records (IMMUTABLE, E-3; nothing was written into them):** `docs/tranches/V/megatranche/registry/adjudicated/{ColorPicker,ColorInput,ColorSpaceSelector,ConfigSliderPane}.md`.
**Method.** None of these records has a §UNPROVEN section. For each record, this seat took the claims in its verdict register that a browser (or the shipped library) can decide live: behaviour, visual, a11y and timing claims. It numbered them `Z-<record>-n` and witnessed each one. Claims that only grep or `tsc` can decide (dead exports, import edges, `any` casts, vacuous tests) are left out, because they are not live-witnessable. In the table, the verdict is about **the record's claim as stated**:
- **PROVEN** means the claim reproduces live.
- **REFUTED** means the live state contradicts it. Most refutations are defects that were cured after the record's HEAD `c654824e`.
- **UNPROVEN** means the probe could not decide the claim. The reason is given in the row.

**Tally: 67 items. PROVEN 32 · REFUTED 30 · UNPROVEN 5.**

| Record | Items | PROVEN | REFUTED | UNPROVEN |
|---|---|---|---|---|
| ColorPicker | 26 | 14 | 10 | 2 |
| ColorInput | 15 | 9 | 4 | 2 |
| ColorSpaceSelector | 9 | 2 | 7 | 0 |
| ConfigSliderPane | 17 | 7 | 9 | 1 |
| **Total** | **67** | **32** | **30** | **5** |

## Served state and apparatus
- **The shared `:9000` dev server was DOWN.** At 2026-10-20 14:35, `curl http://localhost:9000/` returned `000` and nothing was listening on 9000. The first probe run hit `ERR_CONNECTION_REFUSED` on all 9 cells; that run is discarded and not cited. This seat did not touch `scripts/dev/dev.sh`.
  - **Fallback:** `probes/Z2-picker-cohort/run-own-vite.sh` serves the same working tree (HEAD `2ec2fbcde` plus the other seats' dirty `demo/**` hunks, as served) with the repo's own dev config, on `:8096`, with `VITE_API_URL=http://localhost:3000`. It stops the server on exit.
- **API-less in effect.** The API on `:3000` rejects origin `:8096` under CORS (`colors/approved` preflight blocked in every cell's console). As a result:
  - No data-backed arm was judged.
  - The dock shows "backend offline — saved locally".
- **Probes** (all under `docs/tranches/X/execution/SS8/probes/Z2-picker-cohort/`):
  - **Banked by an aborted earlier Z2 seat on 2026-10-19, re-run here:** `lib.mjs`, `probe-picker.mjs`, `probe-input-css-csp.mjs`, `probe-followup.mjs`. That seat's outputs are not cited. Its `evidence/…/recon.json` (`:9022`, 10-19) is stale and is not cited.
  - **Written by this seat:** `probe-extra.mjs`, `probe-final.mjs` and `lib-parse-totality.mjs` (node only).
  - Every browser probe runs headless Chromium (the Playwright default), with one browser per run and a new context per cell, both closed in `finally`.
- **Runs** (each through `~/.claude/guard/guarded`; browser runs never use `--light`):
  1. `guarded --timeout 25 -- bash …/run-own-vite.sh probe-picker.mjs` → `E/run-picker-all.json` (14:49)
  2. `guarded --timeout 30 -- bash …/run-own-vite.sh probe-input-css-csp.mjs` → `E/run-icc-all.json` (15:21). Load average was 43. The `ci` cell timed out on `locator.hover` and the `css` cell on `goto`; both were re-run in runs 3 and 4.
  3. `guarded --timeout 45 -- bash …/run-own-vite.sh probe-followup.mjs probe-input-css-csp.mjs:css probe-extra.mjs` → `E/run-followup-all.json`, `E/run-icc-css.json`, `E/run-extra-all.json` (15:44–15:47)
  4. `guarded --timeout 25 -- bash …/run-own-vite.sh probe-final.mjs` → `E/run-final-all.json` (15:59)
  5. `guarded --light --timeout 3 -- node …/lib-parse-totality.mjs` (no browser; it imports `dist/subpaths/css.js`, mtime 2026-10-20 14:43) → `E/lib-parse-totality.json`
- `E/` = `docs/tranches/X/execution/SS8/evidence/Z2-picker-cohort/`.
  - **Force-added PNGs:** `cp-ambient-1440-dark.png`, `ci-after-notacolor-enter.png`, `csp-390-rest.png`, `parity-parity-390.png`.
  - All other frames stay on disk only.
- **Chromium only.** WebKit and safari-app were not run. Nothing here transfers to them (I-20). The dark-scheme and GL-loss arms that the records bind to WebKit stay with that cell.
- **Instrument errors, disclosed and not used as evidence:**
  1. `probe-extra` `paint[].contrast` parses `oklab()` and `color()` strings as RGB, so its 1.01 is meaningless. Raw colours are quoted instead.
  2. `[role=slider]` boxes in the glass `scrubber` variant measure 0 wide, so every "rendered sliders = 0" count (`csp-390-visible`, `csp-390-reach`) is false. The frame `csp-390-rest.png` decides that item.
  3. The ColorInput popover detector (`/Enter a color/`) matched nothing even on hover, so D-15 and L-16 stay UNPROVEN.

## Verdicts — ColorPicker (`demo/picker/ColorPicker.vue`, route `#/`)

| id | record claim (abridged) | probe | verdict | evidence |
|---|---|---|---|---|
| Z-ColorPicker-1 | L-2: at 390×844 the nav exposes **zero** of the six picker actions present at 1440 | extra `parity-1440` / `parity-390` (count visible actions; tap "Toggle action bar", then "Menu") | **REFUTED** | 1440: 6/6 visible after one Toggle. 390: **4/6** (Copy, Random, Palettes, Open color input). `Reset color` and `Extract palette` are **not in the DOM** at 390 (`E/run-extra-all.json`, `parity-parity-390.png`). Owner: **consumer**. Root cure: either mount Reset and Extract on the mobile action bar, or have the owner rule them desktop-only. "Zero" is false today. |
| Z-ColorPicker-2 | L-5/C-3: the deactivated (KeepAlive) picker preventDefaults Cmd+K on `#/gradient` | picker `keys`: SPA-nav to `#/gradient`, press Meta+K | **PROVEN** | `pickerInDom:false`, then `kdGradient` `{key:"k",meta:true,prevented:true}` (`E/run-picker-all.json`) |
| Z-ColorPicker-3 | C-5: while the chord is held, any keydown is swallowed (Cmd+A) | `keys` held Meta+K, then press a | **PROVEN** | `{key:"a",meta:true,prevented:true}` |
| Z-ColorPicker-4 | C-5 (adopted second defect): the first chord of a session is inert; the second opens | `keys` chord1/chord2 | **PROVEN** | `chord1 expanded:"false"` → `chord2 expanded:"true"` |
| Z-ColorPicker-5 | D-12: no affordance names Cmd+K | `keys` text and `aria-keyshortcuts` scan | **PROVEN** | `affordanceNamesChord:false` |
| Z-ColorPicker-6 | C-1: after one keystroke into the readout, **every later model write no-ops** for the life of the session | picker `c1`: End, type "5", then 8×ArrowLeft on the L slider | **REFUTED** | After the slider write the readout `99.2` = URL `oklch(99.2% …)` = title. The readout recovers. Owner: **consumer**, record correction only. The write path that causes Z-6/Z-7 still stands (3 `[contenteditable][role=textbox]` in the readout). |
| Z-ColorPicker-7 | D-01: one keystroke makes display, URL and title disagree | `c1` afterType | **PROVEN** | readout `["100.05","0.2","2.0"]` vs URL and title `oklch(100% 0.185 2deg)` |
| Z-ColorPicker-8 | C-2: two readout edits 120 ms apart; the 500 ms debounce drops the first | picker `c2`: L := 30, h := 10 | **PROVEN** | after 1.8 s: readout `["30","0.2","10"]` but URL `oklch(73% 0.185 10deg)`. The L write is lost and the readout shows a value the model does not hold. |
| Z-ColorPicker-9 | C-7 (replacement): at 390×480 a real wheel condenses the header 183.95 → 87.29 | picker `condense` + followup `picker-390x480-scroll` (8 wheel ticks) | **REFUTED** | `h 119.09 → 119.09`, `condensed:"false"`. No inner scroll host. The **document** scrolls (`docTop 0→720`, `docOver 7719`). Owner: **consumer**. Root cure: re-adjudicate C-7's original "dead condense surface" against today's scroll host (`useHeaderCondense` watches a host that no longer scrolls at this band). Either bind it to the real scroller or delete it. |
| Z-ColorPicker-10 | L-13: an unknown pane silently renders the flagship picker | picker `unknown` `#/does-not-exist` | **REFUTED** | "Not found — This address names no view of this app … Back to the picker", `picker:false`. Owner: consumer. Cured at HEAD; no further cure. |
| Z-ColorPicker-11 | C-13: the picker's only aria-live is `off`, so it has no polite status channel | extra `picker-live` | **REFUTED** | `.picker-header` is `aria-live="polite"` (text `OKLCh73.0%,0.2,2.0deg`). The `channel-meter`s are `off`. The parse-failure arm is witnessed at Z-ColorInput-15. Owner: consumer. Cured, no further cure. |
| Z-ColorPicker-12 | C-16/D-07: the route's first picker heading is `H3[data-slot=card-title]` with three `[contenteditable][role=textbox]` descendants | picker `desk` | **PROVEN** | `firstPickerHeading {tag:"H3", slot:"card-title", text:"73.0%,0.2,2.0deg", textboxDesc:3}`. Shell `h1` = 1 ("Home"); that is the shell's arm, now present. |
| Z-ColorPicker-13 | L-12/D-11: two peer "Select color space" controls over one state, at 53.28px vs 41.888px | `desk` + `mobile` | **PROVEN** | 1440: `[{OKLCh, 53.28px}, {OKLCh, 41.888px}]`. At 390 there are also **2** (`combos:2`), where the record says 1. |
| Z-ColorPicker-14 | D-02: the label→readout seam is about 70px against the φG ≈ 14.87 ceiling (a 2-line reservation) | `desk` seam | **REFUTED** | trigger bottom → glyph `4.16px`; title-row → figure box `7.16px`; `.readout` min-height `46.91px` = 1 line. Owner: consumer. Cured. |
| Z-ColorPicker-15 | D-04: exact 50/50 columns `512px 512px` | `desk` grid | **PROVEN** | `.pane-container` `grid-template-columns: 512px 512px` |
| Z-ColorPicker-16 | D-05: the readout/label ratio differs by band (390 → 0.7861, 1440 → 0.9750) | `desk` + `mobile` ratio | **REFUTED** | 0.7862 at **both** bands (1440: 41.888/53.28; 390: 25.888/32.928). Owner: consumer. Cured: one paired ratio. |
| Z-ColorPicker-17 | D-06: the readout computes Fraunces, not Fira Code | `desk` | **PROVEN** | `fontFamily: Fraunces, "Fraunces Fallback", serif` |
| Z-ColorPicker-18 | D-08: Picker nests a Card | `desk` | **PROVEN** | `[data-slot=card] [data-slot=card]` inside `.pane-shell` = 1 |
| Z-ColorPicker-19 | D-03: the spectrum is `role="img"`, pointer-only, with no keyboard path | `desk` spectrum | **PROVEN** | `figure.spectrum-figure`: roles `["img"]`, `tabindex` null, focusables 0 |
| Z-ColorPicker-20 | D-13: at 390 the 3-tuple breaks 2+1 | followup `picker-390` | **REFUTED** | `.readout-cell` tops `[195,195,195]`, 1 line. Also seen in frame `cp-mobile-390.png`. Owner: consumer. Cured. |
| Z-ColorPicker-21 | D-15/D-17: the plate-land clock in effect is 0.35s, not `--overture-plate-land` | followup `picker-boot-clock` (rAF sampling of `.pane-shell.getAnimations()`) | **REFUTED** | `overture-plate-settle dur 450ms`, token `calc(0.45s * 1)`. The clock now equals the token. D-17's 850ms literal is a source claim and is not live-decidable here. Owner: consumer. Cured. |
| Z-ColorPicker-22 | D-18a: dark scheme keeps the **same bright** ambient gradient as light | picker `ambient-light`/`ambient-dark` (mean relative luminance outside plates and dock) | **REFUTED** (Chromium) | ambient mean Y `0.468` light vs `0.027` dark; max `0.793` vs `0.066` (`cp-ambient-1440-dark.png`). The record's evidence was a WebKit capture, and that cell was not run. Owner: consumer. Cured in Chromium. |
| Z-ColorPicker-23 | D-18b: dark plates are seed-tinted, not neutral, and the Blob is a near-white mass, among the brightest objects in the dark frame | same frame, read by eye plus a plate sample | **PROVEN** (Chromium) | plate sample `rgb(93,37,49)` (maroon). In `cp-ambient-1440-dark.png` the Blob at the top right of the picker plate is a pale pink-white mass against a ground with max Y 0.066. Owner: **owner-ruling** (the dark-pole canon versus the seed tint). Producer Blob tone: glass O-row, relayed by the orchestrator. |
| Z-ColorPicker-24 | C-19: `/#/` loses the WebGL context (`WebGL: context lost.`), a settle outlier | console of every picker cell | **UNPROVEN** | Not reproduced in the Chromium dev cell: no context-lost line in 9 cells. The record banks the decider on the **built artifact** across both matrices, including WebKit. Neither was run. |
| Z-ColorPicker-25 | L-9/C-18: the debug overlay and instrumentation are static, so they cost chunk weight | `desk` request log | **UNPROVEN** | The dev cell shows `/demo/picker/debug/usePointerDebug.ts` fetched at boot and `PointerDebugOverlay` not fetched. The record's claim is a bundle delta, which needs the built artifact. Not run. |
| Z-ColorPicker-26 | D-20: alpha is never a headline cell while the α rail exists | `desk` + dark frame | **PROVEN** | headline cells `["73.0","0.2","2.0"]` (3); the `ALPHA channel` slider is present (`α 100.0%` in frame). |

## Verdicts — ColorInput (`demo/shell/dock/ColorInput.vue`, dock action bar on `#/`)

| id | record claim (abridged) | probe | verdict | evidence |
|---|---|---|---|---|
| Z-ColorInput-1 | L-1 BLOCKER: the shipped parser **THROWS** on degenerate bodies (`oklch() rgb() hsl() lab() lch() color() oklab() "hsl(  )"`) | `lib-parse-totality.mjs` against `dist/subpaths/css.js` | **REFUTED** | all 8 return `ok:false` with `[{code:"css_syntax", …, expected:["color"]}]`; no throw (`E/lib-parse-totality.json`). Owner: **library** (the π parser band cured it). Root cure: ColorInput's BANK-1 has fired, so delete any internal-fault seam or bare catch kept for the throw. |
| Z-ColorInput-2 | G1/D-6: the failure surfaces as a user-blaming constant, and the parser's diagnostics never reach the surface | followup `ci`: type `oklch()` + Enter, then `notacolor` + Enter | **PROVEN** | both show the badge `"not a valid color"`. The degenerate body and the bare word are indistinguishable, and the `css_syntax` diagnostic is not shown. `pageErrors:[]`. |
| Z-ColorInput-3 | D-1: the focus indicator is erased (`focus-visible:outline-none`) and the border is painted from raw user colour | followup `ci` focused | **PROVEN** | focused: `outline: none`, `border-top-color: oklch(0.73 0.185 2)`, which is the live picker colour. |
| Z-ColorInput-4 | D-1 (forced colors): the span matches nothing in the forced-colors roster, so focus is invisible | followup `ci-forced` (`forcedColors:"active"`) | **PROVEN** | rest and focused are identical: `border rgb(0,0,0)`, `outline none`, `box-shadow none`. |
| Z-ColorInput-5 | D-3: the send button is nameless, untyped and 24×24 | `forced`/`ci` field census | **REFUTED** (name arm, the record's "substance") | `aria-label="Apply color"`. The residuals stand: `type` null (latent; no `<form>`) and rect `24×24`. Owner: consumer. Name cured; the 24px seat stays PR-12 work. |
| Z-ColorInput-6 | D-4: the error badge overlaps the send button (20px, 83%) | followup `afterDegenerate`/`afterWord` | **PROVEN** | overlap = **72.1%** of the button's area in both states. Frame `ci-after-notacolor-enter.png`: the badge covers the button and clips the typed text to "nota". |
| Z-ColorInput-7 | G3: no field-error semantics (`aria-invalid`, `-describedby`, `-errormessage`) | same | **PROVEN** | all `null` while the badge shows |
| Z-ColorInput-8 | D-5: the 2000ms trailing debounce means no preview under 2s of typing | followup `debounce`: type `rgb(10 200 30)`, no Enter, sample title | **PROVEN** | title unchanged at 300, 700 and 1300ms; `rgb(10 200 30) — Color Picker` at 2400ms |
| Z-ColorInput-9 | D-7/G8: the field is a contenteditable span, not an input | `forced` census | **PROVEN** | `SPAN contenteditable="" role="textbox"` |
| Z-ColorInput-10 | L-12: the inline `animation: crown-appear` names a scoped-only keyframe, so the entrance never runs | followup `crownKeyframes` (CSSOM walk) | **REFUTED** | a global `@keyframes crown-appear` is present in the served CSSOM. The entrance actually running on a named colour was not observed (`crown:null` after `rebeccapurple`, API-less). Owner: consumer. Cured. |
| Z-ColorInput-11 | D-15: the popover is hover-only, with no keyboard path | followup `popOnKeyboardFocus`/`popOnHover` | **UNPROVEN** | 0 on keyboard focus **and** 0 on hover. The detector failed on the positive control, so the keyboard 0 decides nothing. |
| Z-ColorInput-12 | L-16: after an invalid entry, the echo shows the previous committed colour | followup `echo` | **UNPROVEN** | the echo was not captured (same instrument failure) |
| Z-ColorInput-13 | D-13: on mobile, no gesture reaches free-text colour entry | extra `parity-390` | **REFUTED** | 390: after Toggle, `Open color input` is visible; the field is typed and committed; title → `rgb(10 200 30) — Color Picker`. Owner: consumer. Cured. |
| Z-ColorInput-14 | D-11: no size role; the field inherits 18.608px | `forced` census | **PROVEN** | `fontSize 18.608px` |
| Z-ColorInput-15 | ColorPicker C-13 arm: a parse failure never reaches AT | followup + `forced` (`liveRegionsInDock`) | **PROVEN** | the badge has no live ancestor; the only dock live region is `status|polite|"Save edit"`. |

## Verdicts — ColorSpaceSelector (`demo/shared/ui/ColorSpaceSelector.vue`, `#/` picker trigger and About)

| id | record claim (abridged) | probe | verdict | evidence |
|---|---|---|---|---|
| Z-ColorSpaceSelector-1 | L-1/G3: choosing a space without catalog or doc entries renders the CIE-rgb card or a bare guide heading | icc `css` + followup `css2` (display-p3, rec2020, jzazbz, a98-rgb) | **REFUTED** | each has its own Definition, Basic information and Components, `mentionsCIERGB:false`, and an honest guide line ("No long-form guide is written for Display P3 yet — …"). `ictcp` was not selected: the option click missed and the title stayed OKLCh, so it is undecided inside this row. Owner: consumer. Cured. |
| Z-ColorSpaceSelector-2 | L-2: the rgb row prints raw 12-decimal coordinates (`rgb(385.302835934518 …)`) | `css` census | **REFUTED** | `color(srgb 1.009 0.4286 0.6218)`, max 4 decimals on every row. (The boot colour now differs: `oklch(73% 0.185 2deg)`.) |
| Z-ColorSpaceSelector-3 | L-3a/G6: five out-of-gamut rows are unmarked | `css` + final `css-forms` | **REFUTED** | rgb, hsl, hsv, hwb, srgb-linear and hex carry `data-out-of-gamut="true"` plus the title "Outside …'s gamut — shown as measured, not mapped", and print unmapped coordinates (`1.009`). |
| Z-ColorSpaceSelector-4 | L-3b/G5: `space · a · b` pseudo-syntax rows sit in the CSS slot with no declared form | final `css-forms` | **REFUTED** | 6 rows (hsl, hsv, hwb, kelvin, ictcp, jzazbz) declare `data-specimen-form="channels"`; 12 rows declare `css` |
| Z-ColorSpaceSelector-5 | G4: 16 of 18 captions overflow (worst 758/234px) | final `css-forms` (`scrollWidth` vs `clientWidth`) | **REFUTED** | 0 of 18 overflow |
| Z-ColorSpaceSelector-6 | L-9/G8: 18 identical dot silhouettes (`feTurbulence seed 240` ×18) | `css` census | **REFUTED** | 18 distinct seeds (143, 155, 165, 21, 67, …) |
| Z-ColorSpaceSelector-7 | L-8: dead `tag=` attribute on the dots | `css` census | **REFUTED** | `dotTag:null` ×18 |
| Z-ColorSpaceSelector-8 | L-12/L-6: two live writers; the About-hosted selector writes the model and drives the picker conversion | followup `css2.viaSecond` (About selector → Lab) | **PROVEN** | URL `space=a98-rgb …` → `space=lab&color=lab(66.39% 60.46 3.34)`; readout `0.9,0.4,0.6` → `66.4,60.5,3.3`; both combos read "Lab" |
| Z-ColorSpaceSelector-9 | L-1: 18 spaces offered | `css` census | **PROVEN** | 18 `[role=option][data-space]` (17 spaces + hex) |

## Verdicts — ConfigSliderPane (`demo/scenes/ConfigSliderPane.vue`, `#/blob` · `#/atmosphere`)

| id | record claim (abridged) | probe | verdict | evidence |
|---|---|---|---|---|
| Z-ConfigSliderPane-1 | C-1: Reset replaces the live `color.paletteStops` with the canned triad | extra `csp-blob`: Copy JSON → clipboard, nudge, Reset, Copy JSON | **PROVEN** | before `["#c861ad","#e86fa5","#ff869c","#ffaba2"]` → after `["#b5947f","#d4b27d","#dad6b1"]`. That is the exact canned triad the record names. Owner: **consumer**. Root cure: the record's declared-key reset (write only the declared def paths). |
| Z-ConfigSliderPane-2 | C-2/G2: 31/31 `aria-valuetext` null; the announced value differs from the rendered cell | icc `csp` + extra `paint` | **PROVEN** | `valuetextNull 31/31`; `aria-valuenow "0.22"` vs rendered `0.220`; `now "1"` vs `1.00` |
| Z-ConfigSliderPane-3 | C-3/D-3/D-14: the `spectrum` variant is defeated (range paints transparent) and the meniscus is reserved on non-chromatic axes | icc `csp` + extra `paint` (after 800ms settle) | **REFUTED** | `data-variant="scrubber"` 31/31 on blob, 3/3 on atmosphere. `.slider-range` background `oklab(0.216 0.0035 0.0052 / 0.88)` (dark ink, painted). Owner: consumer. Cured. |
| Z-ConfigSliderPane-4 | D-4: `--ink-muted` text ink as an area fill on the track | extra `paint` | **REFUTED** | track `color(srgb 0.963 0.953 0.937 / 0.5)` (a light paper wash); the ink sits on the filled extent |
| Z-ConfigSliderPane-5 | C-4: Copy's result is discarded, UI-silent | followup `csp-clip` + extra | **REFUTED** (visual arm) | the label swaps to `Copied` and the clipboard holds the JSON (`{"geometry":{"canvasSize":200,…`). The AT arm is witnessed at Z-6. Owner: consumer. Cured. |
| Z-ConfigSliderPane-6 | D-10: no status region; Copy and Reset are never announced | extra `liveAfterCopy`/`liveAfterReset` | **PROVEN** | no live-region text after Copy or Reset. The pane's only polite region is the header ("BlobTune metaball…"). Owner: consumer. Root cure: a pane status region (record §4). |
| Z-ConfigSliderPane-7 | C-6/G3: 31 orphan labels, 0 grouping | icc `csp` + extra `census` | **PROVEN** | `groups 0`, `labelsFor 0`, `aria-labelledby` null 31/31. Owner: consumer + glass O-row B-3 (label-id prop-through). |
| Z-ConfigSliderPane-8 | C-8/G5b: 12×24 thumbs | extra `census.thumb` | **REFUTED** | the scrubber variant draws no grab glyph (`.slider-thumb` 0×9). The 12×24 geometry no longer ships here. Owner: glass (the variant) / consumer. Nothing to cure on this axis. |
| Z-ConfigSliderPane-9 | D-6/G6: dividing lines where the canon says "none" (8 on blob, 2 on atmosphere) | extra `census.dividingLines` (bordered or ≤2px painted boxes wider than 100px) | **PROVEN** (lines ≠ 0; counts differ) | blob **2** (`console-well`, `config-action-bar`); atmosphere **6**. Owner: consumer. Root cure: deletion (record G6). |
| Z-ConfigSliderPane-10 | D-7/G10: the section heading recipe equals the row-label recipe | extra `census` | **REFUTED** | heading `Fraunces 20.352px 600` vs row label `Plus Jakarta Sans 14.5411px 500` |
| Z-ConfigSliderPane-11 | D-11/G7: no reserved readout width | icc `csp` `shownMinInline` | **PROVEN** | `min-inline-size: auto` on the value cells. The precision arm is undecided live because step is not exposed; the source now derives it from step. |
| Z-ConfigSliderPane-12 | D-12/G5a: `data-size` null; row 60.97px under "ONE RHYTHM SOURCE" | extra `paint`/`census` | **REFUTED** | `data-size="sm"` 31/31; row `58.97px`. Owner: consumer. Cured: the producer size is stamped. |
| Z-ConfigSliderPane-13 | D-8: a well inside the resting Card (`.console-well`, INTERIM) | extra `census` | **PROVEN** | `.config-console.console-well` is present inside the pane card (no nested `[data-slot=card]`). Owner: glass O-row B-4 (`.glass-well`) + chassis band. |
| Z-ConfigSliderPane-14 | CSP-X1: a second `.glass-dock` (the action bar) makes the shell tint-reader order-dependent | icc `csp` + extra | **REFUTED** | `.glass-dock` count = 1 on both routes |
| Z-ConfigSliderPane-15 | D-1/G4: in forced colors a focused config slider gets outline `none` while the action-bar button gets `solid 2px` | final `csp-forced` (`matchMedia` asserted first: `true`) | **REFUTED** | slider `SPAN[role=slider]` `:focus-visible` `outline: solid 2px`; button `Copy JSON` `solid 2px`, the same. Owner: consumer. Cured. |
| Z-ConfigSliderPane-16 | D-2 (rescoped): below 1024 the configurator leaves the DOM; one dock tap mounts it | icc `csp-mobile` + final `csp-390-reach` + frame | **REFUTED** (leaves-DOM arm) | 390×844 `#/blob`: 31 sliders in the DOM, and frame `csp-390-rest.png` shows the Blob configurator painted at rest (Geometry, Membrane rows). No tap is needed. The "rendered 0" counts are the zero-width scrubber instrument error disclosed above. |
| Z-ConfigSliderPane-17 | D-15: at Satellites=0 the dependent controls drive nothing and are not disabled | — | **UNPROVEN** | The record itself classes the shader arm UNVERIFIABLE (glass metaball behaviour). The live `aria-disabled` count is 0/31 at satellites=3, not at 0; this seat did not drive Satellites to 0. |

## REFUTED rows: owner and root cure, condensed
- **Cured after the record's HEAD; the record's born-RED reading is stale and no further cure is needed (owner: consumer).** Picker-10, 11, 14, 16, 20, 21, 22 · ColorInput-5 (name arm), 10, 13 · CSS-1..7 · CSP-3, 4, 5, 10, 12, 14, 15, 16. The record keeps its text (E-3); the next wave that opens on these records reads this packet as the live green.
- **Library cure landed:** ColorInput-1 (π parser band). BANK-1 has fired: delete the demo's internal-fault seam.
- **Live state differs from the record, and a consumer act remains:**
  - **Picker-1:** 2 of the 6 actions are still absent at 390. Mount them on the mobile action bar, or get an owner ruling that they are desktop-only.
  - **Picker-9:** the condense is dead at 390×480 because the document scrolls. Re-open C-7's dead-surface question against `useHeaderCondense`.
- **Record-arm corrections, not a product cure:**
  - **Picker-6:** the readout does recover. The live defect is Picker-7 (the lie until the next write), whose cure is the record's own: delete the contenteditable write path.
  - **CSP-8:** the thumb geometry is gone with the scrubber variant.
- **Named glass O-rows touched (the orchestrator relays; this seat sends no mail):**
  - B-3: label-id/valuetext prop-through (CSP-2, CSP-7).
  - B-4: `.glass-well` (CSP-13).
  - Blob dark-tone (Picker-23, with the owner ruling on dark-plate tint).

## UNPROVEN, carried with the measured reason
- Picker-24 C-19: needs the built artifact and the WebKit cell.
- Picker-25 L-9/C-18: needs the built bundle delta.
- ColorInput-11 D-15 and ColorInput-12 L-16: the popover detector failed its hover positive control.
- CSP-17 D-15: shader behaviour; Satellites=0 was not driven.
