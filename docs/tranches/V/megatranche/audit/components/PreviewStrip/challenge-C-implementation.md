# CHALLENGE-C — PreviewStrip implementation · PASS 2 (2026-07-28)

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this seat was
explicitly spawned with. Declared, not inherited. No sub-agents were spawned; every probe below was
run by this seat.

**Provenance note (INFO, C-15):** the brief pins `HEAD c654824e`. The working tree is at
`f36f780c` (`docs(V·mega): STATE — three OM censuses complete, findings at MT-F043`), 15+ commits
downstream. `git rev-parse HEAD` → `f36f780c5938390b8dc93cd87920418e82cdd81a`. Everything measured
here is against `f36f780c` with the live dev server on `:9000`. **No source file was edited.**
`demo/color-session/color-chips/PreviewStrip.vue` is byte-unchanged from `c654824e`
(`git diff c654824e -- demo/color-session/color-chips/` is empty), so the findings transfer.

---

## Why this is a pass-2 report

A pass-1 challenge-C report already existed at this path (written 11:33 today, ten findings, two
BLOCKERs). I read it **before** writing. It is preserved verbatim at
`challenge-C-implementation.pass-1-2026-07-28.md`. This file supersedes it and is additive: I
**independently re-measured** its two BLOCKERs and confirm both, and I add **four defects it did not
find**, one of which is a user-visible rendering failure with a one-attribute cure that already
exists in this repository.

**VERDICT — DEFECTIVE.** Pass-1's two BLOCKERs stand (independently reproduced below). Pass 2 adds
one MAJOR (forced-colors), one MAJOR (a third stamp dialect), two MINORs (em-context, open cost).

**Strongest defect in this pass:** `C-11` — under `@media (forced-colors: active)` the chip renders
as a **solid white rectangle**, all seven segments `rgb(255, 255, 255)`, `distinct: 1`. The repo
already ships a named two-tier forced-colors policy with an explicit color-display roster and a
generic `[data-color-surface]` hook (`demo/styles/foundation.css:678-700`). The preview chips are
not on it. A color tool's preview becomes a blank block for the WHCM user population, in the one
component whose entire payload is `background-color`.

---

## Pass-2 evidence base (commands run, output pasted)

Probe scripts banked next to this report: `probe-C2-forced-colors.mjs`, `probe-C2-open-cost.mjs`,
`probe-C2-em-context.mjs`. All drive `http://localhost:9000` read-only via the repo's own
Playwright 1.60.0.

### P-1 · forced-colors: the chip is destroyed (NEW)

`probe-C2-forced-colors.mjs` → `/#/generate`, Preset menu open, `page.emulateMedia({ forcedColors: "active" })`:

```json
"forcedColors": {
 "bgs": ["rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)",
         "rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)"],
 "distinct": 1
}
```

Element screenshot banked at `chip-forced-colors.png` — a featureless white rectangle. Compare
`chip-webkit-count12.png` (same chip, normal register, WebKit): seven distinct hard segments.

The roster it is missing from, verbatim (`demo/styles/foundation.css:678-700`):

```css
@media (forced-colors: active) {
    /* tier 1 — color-display surfaces keep their colors */
    canvas, .spectrum-picker, .gamut-overlay, .atmosphere-canvas,
    [data-glass-field-canvas], .gradient-rail, .rail-handle, .readout-rail,
    .swatch-row > *, .generate-swatch, .shadow-swatch, .goo-blob-canvas,
    .watercolor-swatch, .glass-slider[data-variant="spectrum"] .slider-range,
    [data-color-surface] {
        forced-color-adjust: none;
    }
```

`.preview-chip`, `.preview-strip`, `.preview-strip-segment` and `[data-stops]` appear nowhere in
that list, and `PreviewStrip.vue` never sets `data-color-surface`. The identical omission exists in
the `@media print` roster (`foundation.css:830-840`).

### P-2 · the `1em` law resolves in the wrong font context (NEW)

`probe-C2-em-context.mjs`, chip measured against the description lane it claims to join:

```json
{
 "chipFontSize": "16.4px",   "chipH": 16.26,  "chipW": 41.94,
 "wrapperFontSize": "16.4px",
 "microFontSize": "11px",  "microH": 13.64,  "microLineHeight": "13.75px",
 "nameFontSize": "16.4px",
 "rootFontSize": "16px"
}
```

The chip's `1em` resolves against **16.4px — the option's NAME lane** (`.font-display`, same
`16.4px`), not the description lane's `11px`. `41.94 / 16.26 = 2.5793`; `φ² = 2.61803`.

### P-3 · open-time main-thread cost (NEW)

`probe-C2-open-cost.mjs` — four Preset-menu opens at each count, `PerformanceObserver({entryTypes:["longtask"]})`:

```json
"count1":  [{"clickToStrip":172,  "longtasks":[68]},   // first open = warm-up
            {"clickToStrip":115.1,"longtasks":[]},
            {"clickToStrip":164,  "longtasks":[]},
            {"clickToStrip":142.9,"longtasks":[]}],
"count12": [{"clickToStrip":163.7,"longtasks":[67]},
            {"clickToStrip":179,  "longtasks":[71]},
            {"clickToStrip":139.7,"longtasks":[56]},
            {"clickToStrip":187.2,"longtasks":[53]}],
"sliderStepMenuClosed": {"elapsed":697.3, "longtasks":[]}
```

Steady-state (post-warm-up) long tasks: **0 of 3 at count 1 · 3 of 3 at count 12, 53–71 ms each.**
Eleven `ArrowLeft` steps on the count slider with the menus **closed** — which re-runs
`generatePalette` and repaints the whole plate on every step — produced **zero** long tasks in
697 ms. So the cost is not the truth function; it is the strip's own DOM (10 rows × 7 spans =
70 elements, 10 of them masked) rebuilt from scratch on every open, with nothing memoized between
opens.

### P-4 · the third stamp dialect (NEW) — the house stamp parser cannot read the strip

`stampStops` is documented as "the `data-stops` stamp — **ONE serialization**, shared by chip +
oracle" (`sample.ts:88`). Measured live, the two hosts of *this one component* speak two different
dialects, and the ramp sibling a third:

| host | site | stamp shape (measured / source) |
|---|---|---|
| GenerateControls | `presetStops` / `harmonyStops` → `generatedCss` → `serializeCssColor` | `oklch(91.544939436018% 0.08243882705 151.076773675159deg)` *(measured, P-5)* |
| AuroraPane | `auroraHarmonyStops` → hand-built template literal, `aurora-harmony-stops.ts:39` | `oklch(0.7123 0.1 240)` — unitless, 4-dp |
| PreviewRamp | `serializeStop` → `colorToCss` → `serializePickerColor` → `serializeCssColor` (`picker-color.ts:206-211`) | same `%`/`deg` dialect as generate |

Run against the repo's only `data-stops` reader — `parseOklchTriples`,
`e2e/smoke/oracles/o14-preview-truth.spec.ts:162-168`:

```
$ node -e '<the spec's regex, verbatim>'
stripStamp       matches: 0 | oklch(91.544939436018% 0.08243882705 151.076773675159deg)
auroraStamp      matches: 1 | oklch(0.7123 0.1 240)
rampStampGuess   matches: 1 | oklch(0.71 0.1 240)
```

`[\d.]+` cannot cross `%` or `deg`. **Zero** triples parse out of a generate-host stamp. Any
canonicalisation fix must cover all three dialects, not two.

### P-5 · pass-1's BLOCKERs, independently reproduced

**o20 is unpassable by construction.** I bypassed the failing dock fixture entirely (hash-route
navigation), read a chip's stamp, clicked the row, and read the live plate swatches — o20's exact
assertion, `expect(live).toEqual(stamped)`:

```json
"stamped":      ["oklch(91.544939436018% 0.08243882705 151.076773675159deg)",
                 "oklch(90.361123135313% 0.04955718204 288.584537725196deg)",
                 "oklch(86.037656513043% 0.077112631071 66.092301775234deg)",
                 "oklch(88.288231003098% 0.085727399299 203.600065825272deg)",
                 "oklch(89.715884678997% 0.071315052854 341.10782987531deg)"],
"liveSwatchBg": ["oklch(0.915449 0.0824388 151.077)",
                 "oklch(0.903611 0.0495572 288.585)",
                 "oklch(0.860377 0.0771126 66.0923)",
                 "oklch(0.882882 0.0857274 203.6)",
                 "oklch(0.897159 0.0713151 341.108)"],
"o20WouldPass": false
```

Same colors, incompatible strings. And the spec does not even reach that line:

```
$ npx playwright test e2e/smoke/oracles/o20-generate-plate.spec.ts --project=smoke --reporter=line
  2 failed
    o20-generate-plate.spec.ts:22:5 › verb, actions, and bench-note seed live INSIDE the plate
      → locator.click at :57 — "element is outside of the viewport" / "element is not stable"
    o20-generate-plate.spec.ts:63:5 › T-17 seed-exact strips
      → Test timeout 30000ms at fixtures/dock.ts:78 (openView "Generate")
```

**`data-stops` ≠ paint above the cap, both engines.** Chromium and WebKit, count driven to 12:

```json
chromium  {"n": 7, "stamped": 12, "trunc": true,
           "widths":[5.97,5.98,5.98,5.98,5.98,5.98,5.98]}
webkit    {"n": 7, "stamped": 12, "trunc": true,
           "mask": "linear-gradient(90deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 95%)",
           "webkitMask": "linear-gradient(90deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 95%)"}
```

**Coverage is zero.**

```
$ grep -rn "PreviewStrip\|preview-strip\|STRIP_SEGMENT_CAP" test/ e2e/ | wc -l
       0
$ npx vitest run test/preview-chips.test.ts
 ✓ test/preview-chips.test.ts (4 tests) 15ms      # all four exercise sampleInterpolationRamp only
```

The `o14` chip leg (`o14-preview-truth.spec.ts:333-559`) only ever visits `openView(page, "Mix")`,
whose chips are `PreviewRamp`s; its locator reads `getComputedStyle(el).backgroundImage`, which is
`none` on a `PreviewStrip` (the strip paints via child `background-color`), so the strip could never
satisfy it even if the leg were pointed at Generate.

---

## Findings — NEW in pass 2

### C-11 · MAJOR — `@media (forced-colors: active)` blanks the chip; the strip is absent from the repo's own color-display roster

**Defect.** WHCM substitutes system colors for author `background-color`. All seven segments compute
`rgb(255, 255, 255)` (P-1, `distinct: 1`); the inset hairline ring is stripped too (box-shadow does
not paint in WHCM). The chip becomes a featureless white rectangle — `chip-forced-colors.png`. The
option row keeps its name and description, so an AT user loses nothing; the **sighted WHCM user**
loses the entire preview, in a component whose whole payload is color.

**Mechanism.** The repository has already solved this class, deliberately and by name: a two-tier
policy with a "COLOR-SURFACE ROSTER" (`foundation.css:653-700`) that grants
`forced-color-adjust: none` to every surface "whose whole PURPOSE is to show a color", plus a
generic escape hatch `[data-color-surface]` for exactly this case. `PreviewStrip` (born T.W6, after
the U-F57 roster landed) was never enrolled. Its sibling `PreviewRamp` has the identical omission,
and its `background-image` gradient is stripped the same way. The mechanism is **a named global
policy with an opt-in hook that a later component forgot to opt into** — the roster is a list, and
lists rot.

**Reproduction.** `node docs/tranches/V/megatranche/audit/components/PreviewStrip/probe-C2-forced-colors.mjs`
(section 3), or manually: `/#/generate` → open Preset → DevTools → Rendering → "Emulate CSS media
feature forced-colors: active". Output pasted at P-1.

**Cure (idiomatic, one attribute, no new mechanism).** Add `data-color-surface` to the chip root
span in `PreviewStrip.vue:39-45` and `PreviewRamp.vue:30-36`. `forced-color-adjust` **inherits**, so
the root attribute covers all seven segments and both media blocks (forced-colors *and* print) in
one move — no roster edit, no new selector, no per-instance override. The gestalt version, which
also dissolves C-7/C-8: root the chip plate once (one recipe carrying the geometry, the ring, *and*
`data-color-surface`) so the next chip species inherits the policy instead of re-forgetting it.

---

### C-12 · MINOR — the F7 "1em" law is evaluated in the NAME lane's font context, not the description lane's; the chip is 18% taller than the line it claims to join

**Defect.** Both chip files assert the same law — PreviewRamp states it outright: *"the chip joins
the description line — height 1em"* (`PreviewRamp.vue:9-10`). Measured (P-2): the chip is
**16.26 px** tall; the description line box it sits on is **13.75 px** with an **11 px** font. The
chip's own `font-size` is **16.4 px**, identical to the option's `.font-display` name lane.

**Mechanism.** The chip is a **sibling** of `.text-micro`, not a descendant — see
`GenerateControls.vue:243-247`:

```html
<span class="flex items-center gap-2 min-w-0">
    <PreviewStrip :stops="presetStops(p)" />
    <span class="text-micro text-muted-foreground">{{ … }}</span>
</span>
```

`em` is inherited-font-relative, so it resolves against the wrapper (16.4 px), which inherits the
option's display voice. The law says "description line"; the cascade says "name line". This is the
same root cause pass-1's C-6 measured as a broken φ² ratio (`2.5793` vs `2.61803`) but did not
attribute: `inline-size: 2.618rem` is **root**-relative while `block-size: 1em` is **inherited**-relative
(`PreviewStrip.vue:59-60`, `PreviewRamp.vue:43-44`), so the two axes are anchored to two different
font contexts and the plate is φ² only by coincidence at exactly 16 px root with exactly this
inherited size.

**Reproduction.** `node …/probe-C2-em-context.mjs`. Output at P-2.

**Cure.** Write the law in one unit against one anchor: `block-size: 1em; inline-size: 2.618em;`
(then the plate is φ² by construction at every scale), and set the chip's own `font-size` to the
lane it is claimed to join — i.e. move the chip *inside* the description lane, or give the chip
recipe `font-size: var(--text-micro)` so `1em` means what the comment says. Do it once, in the
single rooted chip recipe C-7's cure creates.

---

### C-13 · MINOR — every menu open at count 12 costs a 53–71 ms main-thread long task; nothing is memoized between opens

**Defect.** Measured (P-3): 3 of 3 steady-state Preset-menu opens at `count = 12` produce a long
task of 53, 56, 67, 71 ms; 0 of 3 at `count = 1`. Eleven count-slider steps with the menus closed —
which re-runs `generatePalette` and repaints the entire plate each step — produced **zero** long
tasks. The cost therefore is not the truth function (the `GenerateControls.vue:91` comment,
"sub-millisecond", is correct about `generatePalette`); it is the strip's own DOM.

**Mechanism.** `SelectContent` unmounts when closed (pass-1 E-6 measured idle cost = 0, and I
confirm the design). The consequence is that **every open rebuilds 70 `<span>`s from nothing**, ten
of them carrying a `mask-image` (which forces a separate compositing/paint path per masked
element), and re-runs `stampStops(stops)` in the template — an unmemoized `join("|")` over up to
12 long strings per row, re-executed on every render, not just every open, because it is a plain
function call in the template (`PreviewStrip.vue:44`) rather than a computed. The hosts compound it:
`:stops="presetStops(p)"` (`GenerateControls.vue:245`, `:274`) and
`:stops="auroraHarmonyStops(atoms, h)"` (`AuroraPane.vue:132`) are function calls in the template,
so each render mints a **new array identity** for every row and forces the child to re-render even
when the palette is byte-identical.

Severity is MINOR, honestly: 53–71 ms is under the 200 ms INP "good" bar, and the menu is not on the
critical path. It is a finding because it is *per open, forever*, and because the cure is free.

**Reproduction.** `node …/probe-C2-open-cost.mjs`. Output at P-3.

**Cure.** Two moves, both subtractive. (1) `stampStops(stops)` becomes a `computed` alongside
`truncated`/`visible` — the component already has the pattern two lines above; the template call is
the only un-memoized read in the file. (2) The hosts hand the chip a `computed` keyed on
`(count, seed, preset, harmony)` instead of calling the truth function in the template — the row
list is fixed and the truth function is pure and seeded, so one `computed` map serves every open.
If C-1's cure is taken and the cap moves to the host, both fall out for free: the host computes the
stops it wants shown, once, and the chip paints exactly what it is handed.

---

### C-14 · MAJOR — `stampStops` is documented as "ONE serialization" and is in fact three mutually unparseable dialects, two of them on this one component

**Defect.** `sample.ts:88` — *"The `data-stops` stamp — ONE serialization, shared by chip + oracle."*
Measured (P-4), `PreviewStrip`'s two hosts stamp two different dialects, and the ramp sibling adds a
third precision. The repository's only `data-stops` reader, `parseOklchTriples`
(`o14-preview-truth.spec.ts:162-168`), extracts **0** triples from a generate-host stamp and **1**
from an aurora-host stamp.

**Mechanism.** `stampStops` is a bare `join("|")`. It performs no serialization at all — it is a
*delimiter*, misnamed as a *format*. Each host therefore owns its own encoding by accident:
`generatedCss` → `serializeCssColor` (percent lightness, `deg` hue, full float precision);
`aurora-harmony-stops.ts:25-28,39` → a hand-rolled `fmt()` template literal (unit-interval
lightness, bare hue, 4 dp). Pass-1's C-2 named the author-vs-computed divergence between the stamp
and `getComputedStyle`; this is the *second* axis it missed — divergence **between two hosts of the
same component**, which means a canonicalisation applied only at the generate seam would silently
leave AuroraPane on a different dialect.

**Reproduction.** P-4, pasted above; `aurora-harmony-stops.ts:39` is
`` `oklch(${fmt(s.L)} ${fmt(s.C)} ${fmt(s.h)})` ``.

**Cure.** Make `stampStops` actually serialize: it takes `AnyColor[]` (or normalizes strings through
`serializeStop`) and emits one canonical dialect, so the docstring becomes true and the hand-rolled
`fmt()` in `aurora-harmony-stops.ts` is deleted rather than tolerated (owner edict 2 — no second
path). Both O-14 legs then read one dialect, and the `parseOklchTriples` tolerance band becomes a
belt on top of a canonical form rather than the only thing holding the law together.

---

## Findings CONFIRMED from pass 1 (independently re-measured this pass)

| id | severity | claim | my independent evidence |
|---|---|---|---|
| C-1 | BLOCKER | `data-stops` carries the truth referent and the paint referent at once; above the cap they are provably unequal | P-5: chromium **and** webkit, `stamped 12 / painted 7`, `trunc: true` |
| C-2 | BLOCKER | the strip's only oracle is RED at HEAD and is not in CI | P-5: o20's assertion reproduced outside the dock fixture → `o20WouldPass: false`, plus the spec failing at `dock.ts:78` before reaching line 105 |
| C-5 | MAJOR | vacuous gate — nothing reads this component's paint | P-5: `grep … test/ e2e/` → **0** hits; `o14`'s chip leg reads `backgroundImage`, which is `none` on a strip |
| C-6 | MAJOR | the golden-plate law is `rem`-vs-`em` and is not φ² | P-2: `41.94 / 16.26 = 2.5793` vs `2.61803` — and C-12 supplies the missing attribution |
| C-7 | MAJOR | `.preview-chip` minted twice in two disjoint scoped blocks | `PreviewStrip.vue:56-65` vs `PreviewRamp.vue:40-49` — same four declarations, and only the ramp copy still carries the F7/F8 rationale comment: the copy has already drifted in intent |

Pass-1's C-3 (the painted seven stops are byte-identical at count 8 and count 12) I did not
re-measure; its mechanism is sound on inspection — `generateHues` emits `seedHue + i·137.5°` for the
golden harmony independent of `count`, so the first seven are count-invariant.

---

## Negative proof — what pass 2 checked and found SOUND

* **The truncation mechanism itself is real on both engines.** WebKit and Chromium both compute
  `mask-image: linear-gradient(90deg, rgb(0,0,0) 20%, rgba(0,0,0,0) 95%)` *and* paint it — see
  `chip-webkit-count12.png`, where the seventh segment visibly fades. There is no
  unprefixed-`mask-image` Safari hazard here; the `-webkit-` alias computes identically. (Whether
  the fade *reads as truncation* is pass-1's C-4 and a design question, not an implementation one.)
* **Accessibility contributes nothing to the REPORT's defect tallies.** Measured with the option
  menu open: `aria-hidden="true"` is correctly on the chip root, and the a11y tree is intact —
  `- option "Vibrant" [selected]: Vibrant High chroma, bold tones`, `- option "Pastel": …` for all
  ten rows. Option hit rects measure `262 × 54` (Preset) and `280 × 55` (Harmony), well over the
  24 px floor. `REPORT.md:38` attributes 5 small tap targets to `/#/generate`, but the visual matrix
  captures menus **closed**, so none of them can be this component's. No nameless button, no missing
  name, no focus trap — the component renders no interactive element at all.
* **Every named local hazard is absent, verified by reading the file.** No `defineModel` (no stale
  round-trip). No oklch→HSV roundtrip, no `stableHue`. No `ValueUnit` — the component handles strings
  only, so there is no wrap-a-wrapped-value site. No reka-ui slider, no pointer capture, so no
  `pointercancel`/`lostpointercapture` recovery is owed. **No `requestAnimationFrame`** — zero
  contribution to the PRM-RAF epidemic. No WebGL. No `parseCssColor` call, so the live oklch parser
  crash class is not reachable from here.
* **No lifecycle, no leak surface.** Zero `onMounted`/`onUnmounted`/listeners/observers/timers/
  `async`/`fetch`. Network failure is not a reachable state. Nothing to clean up.
* **Reactivity fires correctly.** Vue 3.5 reactive props destructure used as intended; driving the
  count slider live moved `stamped` 5 → 12 and turned on `preview-strip--truncated` at 8, in both
  engines (P-5). Neither too-few nor too-many fires observed.
* **Domain boundaries hold.** `length 0` → nothing renders (`:40`); `length 1` → one full-width
  segment; `length 7` → exactly the cap, `mask: "none"` (measured at count 5: `lastMask: "none"`,
  `truncatedClass: false`). Nothing throws.
* **`verbatimModuleSyntax` (edict 8) satisfied** — the file's only two imports are value imports
  (`computed`, `stampStops`); there is no type-only import to mis-declare.
* **Edicts 1, 2, 6 satisfied.** 76 lines, one job, one component (no god module). No alias, shim,
  dual path, or masking fallback. No animation exists, so none was deleted; the one scoped rule that
  could be called motion (`mask-image`) is static paint and PRM-neutral.

---

## Family grouping — pass 2's additions fold into two mechanisms

| family | mechanism | findings |
|---|---|---|
| **F-α · one attribute, two referents** | `data-stops` is asked to be the truth-function output *and* the paint output; the cap makes them unequal, and `stampStops` is a delimiter masquerading as a serialization, so each host mints its own dialect on top | C-1, C-2, C-3, C-4 (pass 1) · **C-14** |
| **F-β · the primitive was never rooted** | the "n color segments in a clipped plate" primitive is minted three times with no shared root, so its law drifts (`rem` vs `em`), its font anchor is wrong, and it silently missed a global policy every rooted color surface already has | C-5..C-8 (pass 1) · **C-11, C-12, C-13** |

The gestalt cure is unchanged from pass 1 and pass 2 strengthens it: **root the primitive.** One chip
plate — one recipe carrying the geometry in one unit against one font anchor, the ring, and
`data-color-surface` — dissolves C-6, C-7, C-8, **C-11**, **C-12** in a single move and gives C-13's
memoization one place to live. **Split the referent** — the chip stamps what it paints, the host
stamps the total, and `stampStops` becomes a real canonical serialization — dissolves C-1, C-2, C-3,
**C-14**. Ten of the fourteen findings are two edits.

Owner-edict note (4 / the standing BH relay): the rooted chip plate is a design-system primitive by
the edict's own terms — a variant of the existing chip/swatch family, not a new demo/ui wrapper — so
the rooting move is a glass-ui change and owes a relay to the active glass-ui BH inbox before it
lands.

---

## Files

* This report — `docs/tranches/V/megatranche/audit/components/PreviewStrip/challenge-C-implementation.md`
* Pass 1, preserved verbatim — `…/challenge-C-implementation.pass-1-2026-07-28.md`
* Probes — `…/probe-C2-forced-colors.mjs`, `…/probe-C2-open-cost.mjs`, `…/probe-C2-em-context.mjs`
* Images — `…/chip-forced-colors.png` (the white block), `…/chip-webkit-count12.png` (WebKit, truncated)
* Subject — `demo/color-session/color-chips/PreviewStrip.vue`
* Hosts — `demo/workbenches/generate/GenerateControls.vue:245,274` · `demo/scenes/atmosphere/AuroraPane.vue:132`
* Policy the chip missed — `demo/styles/foundation.css:653-700` (forced-colors), `:830-840` (print)
