# CHALLENGE-C — PreviewRamp implementation (2026-07-28)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. That
is the tier this seat was explicitly spawned with; it is declared, not inherited. No sub-agents were
spawned: every command, probe and screenshot below was produced by this seat.

**Provenance (INFO).** The brief pins `HEAD c654824e`. The working tree is at `f36f780c`
(`git rev-parse HEAD` → `f36f780c5938390b8dc93cd87920418e82cdd81a`), downstream of the pin.
`git diff c654824e -- demo/color-session/color-chips/` is **empty** — `PreviewRamp.vue` and
`sample.ts` are byte-identical to the pinned commit, so every finding transfers. **No source file
was edited by this seat.** Everything measured against the live dev server on `http://localhost:9000`.

**VERDICT — DEFECTIVE.** Three BLOCKERs, three MAJORs, four MINORs, one INFO.

**Strongest defect: `C-1` — `PreviewRamp` cannot render at all in the shipped app.** Its sole host
is `MixConfigBar`; its stops come from `selectedColors`; the only affordance in the entire UI that
appends to `selectedColors` is the mix add-slot ghost, which glass-ui 7.0.0 renders as
`<span aria-hidden="true">` with `pointer-events: none`, `tabIndex -1`, and **no click handler
bound**. Measured: a real mouse click at the ghost's centre and a synthetic `element.click()` both
leave `[data-mix-source]` at **0**; every option row in the live listbox contains `<!--v-if-->`
exactly where the chip would be. The component is dark code behind a dead door — and the only test
of it that is currently GREEN is the one that asserts it is absent.

---

## Evidence base — every probe banked next to this file

All probes drive `http://localhost:9000` read-only with the repo's own Playwright. Pixels are read
for real (screenshot → data: URL → `<img>` → `canvas.drawImage` → `getImageData`; a same-origin data
URL does not taint the canvas).

| probe | what it decides |
|---|---|
| `probe-C-scout.mjs` | what `/#/mix` actually offers (`scout-mix.png`) |
| `probe-C-addslot.mjs` | the add-slot ghost's real DOM shape |
| `probe-C-ghost.mjs` | whether the ghost responds to click at all |
| `probe-C-operands.mjs` | the operand path end-to-end (`op-*.png`) |
| `probe-C-paint.mjs` | the sampler's real output + the gradient interpolation-space control (`paint-probe.png`) |
| `probe-C-paint2.mjs` | chip paint vs library truth **at chip scale**, per space; the oracle-regex dialect; the chip's font context |
| `probe-C-edge.mjs` | forced-colors, the dead alpha-replace, single-declaration poisoning, k-domain boundaries (`chip-normal.png`, `chip-forced-colors.png`) |

### P-1 · the add-slot ghost — `probe-C-ghost.mjs`

```json
{"ghost": {"tag": "SPAN", "rect": {"x":767,"y":346.65,"w":48,"h":48},
           "pointerEvents": "none", "visibility": "visible",
           "ariaHidden": "true", "tabIndex": -1,
           "hitTag": "DIV.swatch-row flex items-center gap-2.5 flex-wrap",
           "hitIsSelfOrChild": false},
 "swatchesBefore": 0, "swatchesAfterMouse": 0, "swatchesAfterSynthetic": 0,
 "tabReachable": {"tabIndex": -1, "isFocusable": false}}
```

`probe-C-addslot.mjs`, the same element's markup and the o14 spec's own locator:

```json
{"byRoleCount": 0,
 "addSlotGhost": [{"tag":"SPAN","ariaLabel":null,"role":null,"disabled":null,
   "outer":"<span data-v-292b9032=\"\" data-v-a3e86846=\"\" aria-hidden=\"true\" class=\"add-slot-ghost …"}],
 "anyAriaLabelMatch": 0}
```

Source says otherwise — `demo/workbenches/mix/MixSourceSelector.vue:165-175`:

```html
<WatercolorDot key="__add__" :color="…" variant="ghost" tag="button" seed="mix-add-slot"
    class="add-slot-ghost …" aria-label="Add current color to the mix"
    :disabled="!canAddColor || undefined" @click="addCurrentColor">
```

The producer drops all of it:

```
$ grep -o 'inheritAttrs[^,}]*' node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js
inheritAttrs: !1
$ grep -o '"aria-hidden":[^,]*' node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js
"aria-hidden": "true"
```

### P-2 · the chip's slot in the live DOM — `probe-C-operands.mjs` / `probe-C-paint2.mjs`

```json
"optionHtml": "<div class=\"interactive-item glass-menu-row …\" role=\"option\" …>
  <div class=\"flex flex-col gap-0.5 min-w-0\">
    <span id=\"reka-select-item-text-v-1-16\">OKLCh </span>
    <span class=\"flex items-center gap-2\"><!--v-if--><span class=\"text-micro …\">Perceptual, hue-preserving</span></span>
  </div></div>",
"stopsEls": 0, "options": 9
```

`<!--v-if-->` is `MixConfigBar.vue:111`'s `v-if="spaceRamps.get(s.value)"` evaluating false, on every
row, after two add-slot clicks.

### P-3 · the O-14 chip leg, run

```
$ npx playwright test e2e/smoke/oracles/o14-preview-truth.spec.ts --project=smoke --reporter=line -g "T-17 chip referent"
  2 failed
    o14-preview-truth.spec.ts:346:5 › every open-menu chip's painted gradient carries exactly its stamped stops
      → Test timeout of 30000ms exceeded.
        Error: locator.click: waiting for getByRole('button', { name: 'Add current color to the mix' })   [:355]
    o14-preview-truth.spec.ts:404:5 › the chip feasibility leg …
      → Test timeout of 30000ms exceeded.  [:414]
  1 passed (1.3m)
```

The one that passed is `o14-preview-truth.spec.ts:334` — *"honest absence: with <2 operands the rows
carry NO chip"*, `expect(count).toBe(0)`.

```
$ npx vitest run test/preview-chips.test.ts
 ✓ test/preview-chips.test.ts (4 tests) 9ms
 Test Files  1 passed (1)   Tests  4 passed (4)
```

All four exercise `sampleInterpolationRamp`. None mounts the SFC.

```
$ grep -n "run:" .github/workflows/ci.yml
  32: npm ci   33: npm run lint   34/35: vue-tsc   36: npm run build   37: npm test
  … (api job) 69: npm ci  70: tsc --noEmit  71: npm test
```

No playwright step exists in CI.

### P-4 · the oracle-regex dialect — `probe-C-paint2.mjs`

Run against the repo's only `data-stops` reader, `parseOklchTriples`
(`e2e/smoke/oracles/o14-preview-truth.spec.ts:162-168`, copied verbatim into the probe):

```json
"oracleRegex": {
 "stampSample":  "oklch(62% 0.27 9.8deg)",
 "paintSample":  "linear-gradient(90deg, oklch(0.62 0.27 9.8), oklch(0.608767 0.263144 28.1483), …",
 "paintedTriples": 17,
 "stampedTriples": 0,
 "o14Assertion": "expect(painted.length).toBe(stamped.length)"
}
```

### P-5 · what the browser does between the library samples — `probe-C-paint.mjs`

Three positionless/explicit gradients, endpoints `oklch(0.62 0.27 20)` → `oklch(0.62 0.27 200)`
(exactly 180° apart), midpoint pixel read from a real screenshot:

```json
"E (linear-gradient(90deg, A, B))":                      {"mid":[133,134,134]}
"F (linear-gradient(in oklch shorter hue 90deg, A, B))": {"mid":[148,140,0]}
"G (linear-gradient(in srgb 90deg, A, B))":              {"mid":[ 52, 65,127]}
```

Predicted OKLab midpoint: `a = 0.27·cos20° + 0.27·cos200° = 0`, `b = 0.27·sin20° + 0.27·sin200° = 0`,
`L = 0.62` → neutral grey, sRGB ≈ `[135,135,135]`. Measured `[133,134,134]`. **The engine
interpolates in OKLab** (the CSS Color 4 gradient default), and it is neither the row's candidate
space nor sRGB.

### P-6 · chip paint vs LIBRARY TRUTH, at chip scale — `probe-C-paint2.mjs`

Row 0 = exactly what `PreviewRamp` paints (17 positionless stops). Row 1 = the same operands sampled
by the library **once per painted column** and laid down as hard stops (no engine interpolation at
all) — the library truth. Row 2 = the forbidden arm (let the engine do the whole job from the two
endpoints). Width = 42 px, the chip's real width. Operands `oklch(0.62 0.27 9.8)` + `rebeccapurple`.

| space / arc | chip vs library truth | engine-2-stop vs library truth |
|---|---|---|
| `oklch` / longer | **max 8/255**, mean 0.86, 1 of 42 cols > 4 | max 185, mean 116.67, 42/42 |
| `hsv` / shorter | max 2/255, mean 0.43, 0 of 42 | max 71, mean 40.14, 40/42 |
| `xyz` / shorter | max 1/255, mean 0.43, 0 of 42 | max 43, mean 20.90, 38/42 |
| `hsl` / longer | **max 15/255**, mean 4.43, **16 of 42 cols > 4** | max 190, mean 119.57, 42/42 |

### P-7 · forced-colors and the poisoning arm — `probe-C-edge.mjs`

A span carrying `PreviewRamp.vue:40-49`'s exact declarations, painted with a real sampler ramp:

```json
"forcedColors": {"backgroundImage": "none",
                 "backgroundColor": "rgba(255, 255, 255, 0)",
                 "forcedColorAdjust": "auto",
                 "boxShadow": "none"}
"render": {"goodBg":     "linear-gradient(90deg, oklch(0.62 0.27 9.8), oklch(0.608767 …",
           "poisonedBg": "none",
           "poisonedBgColor": "rgba(0, 0, 0, 0)"}
```

`chip-normal.png` (a ramp) vs `chip-forced-colors.png` (the page showing straight through: the chip
paints **nothing**).

```
$ grep -n "preview-chip\|data-stops\|data-color-surface" demo/styles/*.css
demo/styles/foundation.css:694:    [data-color-surface] {      # inside @media (forced-colors: active), :678
demo/styles/foundation.css:837:    [data-color-surface] {      # inside @media print,               :800
```

`.preview-chip` appears in neither roster, and `PreviewRamp.vue` never sets `data-color-surface`.

### P-8 · the font context at the chip's exact slot — `probe-C-paint2.mjs`

```json
"fontContext": {"wrapperFontSize":"16.4px", "microFontSize":"11px",
                "microLineHeight":"13.75px", "microH":13.75,
                "nameFontSize":"16.4px", "rootFontSize":"16px",
                "chipWouldBe":{"wPx":41.888,"hPx":16.4},
                "wrapperHtml":"<span class=\"flex items-center gap-2\"><!--v-if--><span class=\"text-micro …\">"}
```

### P-9 · sampler domain boundaries — `probe-C-edge.mjs`

```json
"slash1Hits": {"hits": 0, "total": 612},
"serializeStopAlpha1":    "oklch(8.230913764844% 0.008035214733 240.750922799419deg)",
"serializeStopAlphaHalf": "oklch(8.230913764844% 0.008035214733 240.750922799419deg / 50%)",
"k1": [2 stops], "k0": [2 stops], "kNegative": {"n": 2},
"kNaN": {"n": 0},
"kInfinity": "NON-TERMINATING (observed: hung the page > 170 s, probe killed)",
"emptyStringOperand": null, "twelveOperands": {"n": 23}
```

---

## Findings

### C-1 · BLOCKER — the component cannot render: its only operand path is a dead `<span>`

**Defect.** `PreviewRamp` never appears in the shipped app. The chain is single-threaded and severed
at the far end:

* `MixConfigBar.vue:111` / `:133` — `<PreviewRamp v-if="spaceRamps.get(s.value)" …>`
* `MixConfigBar.vue:57-74` — `spaceRamps` / `hueRamps` call `sampleInterpolationRamp(operandColors,…)`,
  which returns `null` for `operandsCss.length < 2` (`sample.ts:58`)
* `MixPane.vue:103` — `:operand-colors="mode === 'colors' ? selectedColors.map(sc => sc.css) : []"`
* `useMixingState.ts:42` — `selectedColors = ref<SelectedColor[]>([])`; `:55-57` — the **only**
  mutator that appends is `addColor`
* `MixSourceSelector.vue:68-72` — the **only** emitter of `addColor` is `addCurrentColor`
* `MixSourceSelector.vue:165-175` — the only binding of `addCurrentColor` is `@click` on the ghost

P-1: the ghost is `<span aria-hidden="true">`, `pointer-events: none`, `tabIndex -1`, no `aria-label`,
no `role`, `document.elementFromPoint` at its own centre returns its **parent**. Mouse click → 0
operands; synthetic `.click()` → 0 operands (so the handler is not even bound). P-2: `<!--v-if-->`
in all nine live option rows.

**Mechanism.** The consumer expresses the affordance entirely through fall-through attributes —
`tag="button"`, `aria-label`, `@click`, `:disabled` — to a producer component that declares
`inheritAttrs: !1` and hard-codes `aria-hidden: "true"`. Vue drops every one of them **silently**;
no type error, no runtime warning, no lint. This is the glass-ui-7 whole-adoption seam (W44 / D58):
a producer version bump can turn a button into decoration with nothing in the build to notice.

**Reproduction.** `node docs/tranches/V/megatranche/audit/components/PreviewRamp/probe-C-ghost.mjs`
— or, by hand: `/#/mix` → click the dashed ghost in *Selected* → nothing is added, forever.

**Cure (gestalt, not patch).** The chip is downstream and blameless here, but the *class* is the
point: **semantics must not travel as fall-through attributes across a package boundary.**
`WatercolorDot` should take an explicit `as`/`tag` + `v-bind="$attrs"` (or expose a `<button>` slot
wrapper) so the operability contract is part of its API and breaks the type-check when it changes —
a glass-ui producer change, therefore owed a **BH-inbox relay** (owner edict 4, the standing relay
fond). Until that lands, the host owns the button and the dot is its decoration.

---

### C-2 · BLOCKER — the only oracle for this component is RED, is unpassable by construction, and is not in CI

**Defect.** Three independent failures of the same gate:

1. **RED.** P-3: the T-17 chip referent is `2 failed / 1 passed`. The passing test asserts the chip
   is *absent*.
2. **Unpassable even if reachable.** P-4: the chip stamps `oklch(62% 0.27 9.8deg)`; the computed
   `background-image` canonicalises to `oklch(0.62 0.27 9.8)`. The spec's own regex,
   `/oklch\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)…/`, cannot cross `%` or `deg`: **17 painted triples,
   0 stamped triples**, and the assertion is `expect(painted.length).toBe(stamped.length)`. Fix
   C-1 tomorrow and this leg is still RED.
3. **Not enforced.** `.github/workflows/ci.yml` runs `lint`, two `vue-tsc` passes, `build`, and
   `npm test` (vitest). There is no playwright job. The RED leg costs nothing to leave RED.

**The vacuous mutation.** With `test/preview-chips.test.ts` and CI as they stand, every one of these
edits to `PreviewRamp.vue` keeps the whole suite green:

* `linear-gradient(90deg, …)` → `linear-gradient(180deg, …)` (the ramp runs vertically in a 1em box —
  visually a flat colour);
* `stops.join(", ")` → `stops.join(" ")` (the gradient becomes invalid, the chip paints nothing —
  see C-8);
* `v-if="stops.length >= 2"` → `v-if="stops.length >= 99"` (the chip never renders);
* deleting the `<style>` block entirely (the chip becomes a zero-size inline span).

**Mechanism.** The component's truth is asserted only about its *input function* (`sample.ts`,
vitest) and only in a browser leg that is neither reachable nor runnable. `test/preview-chips.test.ts`
is a **sampler** test wearing a **chip** test's name (`preview-chips.test.ts`, docblock: "the chip
half of the PREVIEW TRUTH LAW").

**Reproduction.** P-3 and P-4, pasted above.

**Cure.** Give the SFC a mount test — `@vue/test-utils` in vitest, asserting that the rendered
`background-image` embeds exactly `data-stops` and that `<2` stops renders nothing. That is a
node-level test, so it runs in CI on the existing `npm test` step and does not depend on the mix
flow being operable at all. Then make `stampStops` a real canonical serialisation (C-2's dialect
half and the sibling report's C-14 are the same defect) so the browser leg's regex becomes a belt,
not the only thing holding the law up.

---

### C-3 · BLOCKER — the paint violates this module's own SAMPLING LAW: most of the chip is engine-interpolated in OKLab

**Defect.** `PreviewRamp.vue:24-26`:

```ts
const gradient = computed(() => `linear-gradient(90deg, ${stops.join(", ")})`);
```

The stops carry **no positions**, so this is a *continuous* gradient: the engine interpolates every
pixel between consecutive library samples. `sample.ts:5-16` forbids exactly that, by name:

> ramps are k-sample discrete stops built from THE LIBRARY's `mixColors` interpolation — **never CSS
> `in <space>` gradient interpolation**, because the preview must show what THE APP computes, not what
> the browser's engine would … One mechanism for all rows, **no engine divergence**.

And `PreviewRamp.vue:6-7` states the false thing outright: *"paints them as a **discrete-stop** linear
gradient."* It is not discrete. Measured:

* **the engine's space is OKLab** (P-5): `[133,134,134]` at the midpoint of two 180°-opposed oklch
  stops — the OKLab-lerp prediction `[135,135,135]` — not the oklch arc `[148,140,0]`, not sRGB
  `[52,65,127]`. So the *"HSV"* row, the *"XYZ"* row, the *"RGB"* row all have their in-between
  pixels drawn by OKLab, whatever the row is named.
* **17 samples across 42 px**: at most 17 of the chip's 42 painted columns can be library truth;
  **≥ 60 % of the chip is engine fill.**
* **it is measurably wrong** (P-6): `hsl / longer` deviates from library truth by up to **15/255**
  per channel, with **16 of 42 columns off by more than 4/255**; `oklch / longer` peaks at 8/255.

`sample.ts:16-19` says the quiet part: *"a chip that approximates the library output is FORBIDDEN."*
The chip approximates the library output.

**Mechanism.** The sampler was built to keep the engine out of the interpolation, and then its
output was handed to the engine as a *continuous* gradient — the one CSS construct that puts the
engine back in. The discretisation the docblock describes exists nowhere in the file. The sibling
`PreviewStrip` does it correctly (`background-color` per segment, no engine interpolation), which is
why the divergence survived review: two chips, one law, one of them actually implementing it.

**Reproduction.** `node …/probe-C-paint.mjs` (P-5) and `node …/probe-C-paint2.mjs` (P-6);
`paint-probe.png` shows the chip paint, the hard-stop reference and the forbidden 2-stop arm stacked.

**Cure (idiomatic, subtractive).** Emit the hard stops the docblock already claims:
`stops.map((s,i) => \`${s} ${i/n*100}% ${(i+1)/n*100}%\`)`. That deletes the engine from the
interpolation entirely, makes the docblock true, makes `data-stops` and the paint the *same* object
rather than two referents, and makes the chip structurally identical to `PreviewStrip` — at which
point the honest gestalt move is the one the sibling report also lands on: **one rooted chip plate**
with a `stops` list and a `discrete | continuous` intent, not two components that disagree about
what "discrete" means. (If a genuinely continuous ramp is what design wants, then the sampling law
must be amended and the row must declare its own space — `linear-gradient(in oklch longer hue …)` —
not silently inherit OKLab. That is a design ruling, not an implementation choice, and it belongs to
the D seat.)

---

### C-4 · MAJOR — under `forced-colors: active` the chip paints nothing at all

**Defect.** P-7: `background-image: none`, `background-color: rgba(255,255,255,0)`,
`box-shadow: none`, `forced-color-adjust: auto`. The chip is a **transparent hole** — see
`chip-forced-colors.png` (the page shows straight through) against `chip-normal.png`. Worse than the
sibling's white block: the strip at least keeps a rectangle.

**Mechanism.** The repository has already solved this class by name — `foundation.css:653-700`
declares a "COLOR-SURFACE ROSTER" granting `forced-color-adjust: none` to every surface "whose whole
PURPOSE is to show a color", with a generic `[data-color-surface]` opt-in hook, reused by
`@media print` at `:800-840`. `.preview-chip` is on neither list and `PreviewRamp.vue` never sets
the attribute. **A named global policy with an opt-in hook that a later component forgot to opt
into** — the roster is a list, and lists rot. (`PreviewStrip` has the identical omission; the
sibling seat filed it as its C-11. That two chips born in the same wave both missed it is the
argument for the hook, not the list.)

**Reproduction.** `node …/probe-C-edge.mjs`, or `/#/mix` → DevTools → Rendering → *Emulate CSS media
feature `forced-colors: active`*.

**Cure.** One attribute on the chip root: `data-color-surface`. `forced-color-adjust` inherits, so
it covers both media blocks in one move — no roster edit, no new selector, no per-instance override.
The gestalt version is C-3's: put it on the one rooted chip plate so the next chip species inherits
the policy instead of re-forgetting it.

---

### C-5 · MAJOR — the F7 "golden plate" law is false as written: the two axes are anchored to two different font contexts

**Defect.** `PreviewRamp.vue:9-11` and `:43-44`:

```
 * PROPORTION (F7): the chip joins the description line — height 1em, width
 * one golden plate (φ² ≈ 2.618rem) …
    inline-size: 2.618rem; /* one golden plate — φ² × 1em (F7) */
    block-size: 1em;
```

Measured at the chip's exact DOM slot (P-8): the wrapper it would live in is **16.4 px**; the
description lane it claims to join is **11 px / 13.75 px line box**. So the chip is
`41.888 × 16.4 px` → ratio **2.554**, not φ² = **2.61803**, and it is **19 % taller** than the line
it says it joins.

**Mechanism.** `inline-size` is in `rem` (root-anchored, 16 px) and `block-size` is in `em`
(inheritance-anchored, 16.4 px). Two axes, two anchors. The comment's own arithmetic — "φ² × 1em" —
is only true when the inherited font size is exactly the root font size, which it is not here and
would not be at any user font-size override either. And the chip is a **sibling** of `.text-micro`,
not a descendant (`MixConfigBar.vue:110-113`), so "joins the description line" was never true of the
cascade.

**Reproduction.** `node …/probe-C-paint2.mjs`, section `fontContext`.

**Cure.** One unit, one anchor: `block-size: 1em; inline-size: 2.618em;` — φ² by construction at
every scale — and give the chip the font size of the lane it claims: `font-size: var(--text-micro)`
on the chip recipe, or move the chip inside the description lane. Once, in the single rooted chip
plate.

---

### C-6 · MAJOR — `.preview-chip` is minted twice, in two disjoint scoped blocks, and has already drifted

**Defect.** The same class name carries two different rule sets in two scoped SFCs:

| | `PreviewRamp.vue:40-49` | `PreviewStrip.vue:56-65` |
|---|---|---|
| `display` | `inline-block` | `inline-flex` |
| `overflow` | *(absent)* | `hidden` |
| `flex`, `inline-size`, `block-size`, `border-radius`, `box-shadow` | identical | identical |
| the F7/F8 rationale comment | present | **deleted** |

Scoped styles mean the two never collide, so nothing ever forced them to agree — and they already do
not. The `overflow: hidden` divergence is not cosmetic: it is precisely the declaration that would
be needed if C-3's cure turned the ramp into child segments.

**Mechanism.** A shared *primitive* implemented as a duplicated *declaration block*. Owner edict 5
(style at the root component level, never per-instance) and edict 3 (KISS, no contrivance) both
point the same way; edict 4 says the root is glass-ui, not `demo/ui/`.

**Reproduction.** Read both files; `grep -n "preview-chip" demo/**/*.vue`.

**Cure.** Root the chip plate once — one recipe carrying geometry (C-5's single anchor), the ring,
and `data-color-surface` (C-4) — as a glass-ui variant of the existing chip/swatch family. That
single move dissolves C-4, C-5 and C-6, and gives C-9's memoisation one place to live. Being a
glass-ui change, it owes a BH-inbox relay before it lands.

---

### C-7 · MINOR — `serializeStop`'s alpha `.replace()` is dead code

**Defect.** `sample.ts:39-41`:

```ts
export function serializeStop(stop: AnyColor): string {
    return colorToCss(stop, "oklch").replace(/ \/ 1\)$/, ")");
}
```

Measured (P-9) across **9 spaces × 4 hue arcs × 17 stops = 612 serialisations**: `hits: 0`. And
fed an explicitly alpha-1 colour, the serialiser already omits alpha:
`serializeStop(parseColorIn("rgb(1 2 3 / 1)", "oklch"))` → `oklch(8.23…% 0.008… 240.75…deg)` — no
`/ 1`. At alpha 0.5 it emits `/ 50%`, which the regex would not match either (it is anchored on the
literal `1`).

**Mechanism.** A defensive normalisation written against a serialiser behaviour that does not exist
— a masking fallback for an impossible input (owner edict 2: no shims, no masking fallbacks). It
also silently *would not work* if the behaviour it guards against ever appeared, because the modern
serialiser emits percentages.

**Reproduction.** `node …/probe-C-edge.mjs`, `slash1Hits` / `serializeStopAlpha1`.

**Cure.** Delete the `.replace(…)`. If a canonical stamp dialect is wanted, do it deliberately in
`stampStops` (C-2), not by string surgery in the serialiser.

---

### C-8 · MINOR — the whole chip is one CSS declaration: a single unpaintable stop makes it invisible while `data-stops` keeps claiming 17

**Defect.** P-7: replacing stop 8 of 17 with an unparseable colour makes the *entire* declaration
invalid — `backgroundImage: "none"`, `backgroundColor: "rgba(0, 0, 0, 0)"`. The chip becomes a
transparent hole, and because `stampStops` is computed independently, `data-stops` still stamps all
17. The O-14 law reads "the painted gradient must embed exactly those stops"; in this state the
painted gradient embeds none of them, and only the *stamp* would be checked by anything.

`PreviewStrip` cannot fail this way: it paints `background-color` per child, so one bad stop costs
one segment.

**Reproduction.** `node …/probe-C-edge.mjs`, `render.poisonedBg`.

**REPRODUCTION OF A LIVE TRIGGER: NONE FOUND — this is a robustness finding, not a live bug.** I
tried the boundary operands through the real sampler: `transparent` → valid `oklch(… / 0%)` stops;
`oklch(0.5 0.1 none)` → the `none` hue collapses to a number, no `none` reaches the paint;
`currentColor` → `null` (honest absence); `""` → `null`; identical operands → 17 identical valid
stops; `kelvin` space → valid. Every path I could reach serialises paintable OKLCh. The finding is
that the *failure mode* is total and silent, not that it fires today.

**Cure.** C-3's hard-stop cure does not fix this (still one declaration). The structural cure is the
rooted plate painting per-segment children, which makes the failure local and visible — the same
move C-3 and C-6 want.

---

### C-9 · MINOR — the sampler's `k` parameter breaks its own contract at the domain boundary, including a non-terminating arm

**Defect.** `sample.ts:52-57` documents `string[] | null` where the array is a ramp; `:69` computes
`perSegment = Math.max(2, Math.ceil(k / segments) + 1)`. Measured (P-9):

| `k` | result | contract |
|---|---|---|
| `0`, `1`, `-5` | 2 stops | fine (the `Math.max(2, …)` floor holds) |
| `NaN` | **`[]`** — an empty array, not `null` | **violated**: `[]` is neither `null` nor a ramp; `PreviewRamp`'s `v-if="stops.length >= 2"` catches it, but `MixConfigBar.vue:111`'s `v-if="spaceRamps.get(…)"` does **not** (`[]` is truthy) |
| `Infinity` | **non-terminating** | `Math.ceil(Infinity/1)+1 = Infinity` → `for (j < Infinity)` never exits. Observed: hung the page for > 170 s, probe killed |

**REPRODUCTION: direct call only. `k` is never passed by any host** (`MixConfigBar.vue:62`/`:71` use
the default 16), so neither arm is reachable from the running app today. Labelled a hypothesis-grade
robustness finding on that basis.

**Mechanism.** A public exported parameter with no domain guard, in a module whose whole thesis is
"honest absence, never a canned swatch" — the honesty is enforced for operands (`:58`, `:64`) and
not for `k`.

**Cure.** `if (!Number.isInteger(k) || k < 2) return null;` at the top, beside the operand guard.
One line, same idiom as the line above it.

---

### C-10 · MINOR — `stampStops(stops)` is an unmemoised template call, and the host resolves each ramp twice per row

**Defect.** `PreviewRamp.vue:34` — `:data-stops="stampStops(stops)"` is a plain function call in the
template, so the `join("|")` over 17 long strings re-runs on **every render**, not every stop change.
The file already has the correct idiom two lines above (`gradient` is a `computed`). Its sibling has
the identical defect (`PreviewStrip.vue:44`).

The host compounds it: `MixConfigBar.vue:111` calls `spaceRamps.get(s.value)` **twice** per row
(once in `v-if`, once in `:stops`), and `:133` likewise — 26 Map lookups per render across the two
menus where 13 would do.

Severity is honestly MINOR: 17 joins is microseconds, and the menu is not on the critical path. It
is a finding because it is per-render forever and the cure is one word.

**Reproduction.** Read `PreviewRamp.vue:24-36`; the asymmetry with `gradient` on line 24 is the
whole evidence.

**Cure.** `const stamp = computed(() => stampStops(stops));`. In the host, `v-for` over precomputed
`{ meta, ramp }` pairs so each ramp is resolved once.

---

### C-11 · INFO — the ramp direction is physical (`90deg`), not logical

`linear-gradient(90deg, …)` always runs left→right. The chip sits inside a text lane whose flow
direction is the document's, and the ramp encodes operand *order*, which is a reading-order fact.
There is no `dir="rtl"` anywhere in the demo today, so nothing is broken; noting it because the fix
is free (`to inline-end`) and the chip is the only place in this module where a direction is written
down at all.

---

## Negative proof — what I checked and found SOUND

* **The sampler genuinely earns its keep.** The forbidden shortcut — let the engine interpolate from
  the two endpoints — is not remotely equivalent: measured deviation from library truth of
  mean 116.67 / max 185 (oklch·longer), 40.14 / 71 (hsv), 20.90 / 43 (xyz), 119.57 / 190
  (hsl·longer), with 38–42 of 42 columns wrong (P-6). Whatever C-3 costs, the k-sample apparatus is
  buying something real. This is the strongest argument *for* the module.
* **Honest absence works, exactly as documented.** `<2` operands → `null` → no chip; unparseable
  operand → `null`; `""` → `null`; `currentColor` → `null`. Measured in-browser through the real
  module (P-9) and asserted by `test/preview-chips.test.ts:90-96`. The one currently-green browser
  test of this component is this arm.
* **Every named local hazard is absent, verified by reading the file.** No `defineModel` (no
  `WritableComputedRef` async round-trip, no stale read, no `shallowRef` cache owed). No oklch→HSV
  roundtrip and no `stableHue` — the chip performs no colour maths at all (`sample.ts:11-13`: parsing
  rides `parseColorIn`, sampling rides `mixColors`, serialisation rides `colorToCss`). No `ValueUnit`
  anywhere in the chain — the component handles `readonly string[]` only, so there is no
  wrap-a-possibly-wrapped-value site. No reka-ui slider and no pointer capture, so no
  `pointercancel`/`lostpointercapture` recovery is owed. **No `requestAnimationFrame`** — zero
  contribution to the PRM-RAF epidemic; the docblock's "Static paint — no motion, PRM-neutral"
  (`:14`) is true. No WebGL. No direct `parseCssColor` call in the SFC.
* **No lifecycle, no leak surface.** Zero `onMounted`/`onUnmounted`, zero listeners, observers,
  timers, `async`, `fetch`. Network failure is not a reachable state for this component; there is
  nothing to clean up and nothing that can grow unbounded.
* **Reactivity is idiomatic Vue 3.5 and fires correctly.** `const { stops } = defineProps<…>()` is
  reactive props destructure used as intended; both reads (`gradient`'s `stops.join`, the template's
  `stampStops(stops)`) compile to `__props.stops`. Neither too-few nor too-many fires. Edict 7
  satisfied (no `useTemplateRef` is owed — there is no template ref).
* **`verbatimModuleSyntax` (edict 8) satisfied.** The file's only two imports are value imports
  (`computed`, `stampStops`); there is no type-only import to mis-declare. `sample.ts:27-33` uses
  `type` on all four type imports correctly.
* **Edicts 1, 2, 6 satisfied by the SFC.** 50 lines, one job, no god module. No alias, dual path or
  back-compat shim in the component (the one masking fallback in the module is C-7, in `sample.ts`).
  No animation exists here, so none was deleted.
* **Accessibility contributes nothing to the visual REPORT's tallies — and could not.**
  `aria-hidden="true"` is correctly placed on a decorative element whose information is carried by
  the option's name and description (`INTERPOLATION_SPACES` / `HUE_INTERPOLATION_METHODS`,
  `color-space-meta.ts:26-42` — every row has a real label and a real description). The component
  renders no interactive element, so it contributes 0 nameless buttons and 0 small tap targets.
  `REPORT.md:37` attributes 8 small tap targets and `:99` 1 nameless button to `/#/mix`, but the
  visual matrix captures menus **closed** and the chip never renders in any case, so none of them are
  this component's. Measured option hit rect with the menu open: `219 × 52.36` — far over the 24 px
  floor.
* **No console or page errors.** All probes registered `pageerror` and `console.error` listeners on
  `/#/mix`; none fired. The REPORT agrees: `/#/mix` shows `pageErr 0`, `consoleErr 0`, `overflowX 0`
  in all four Safari matrices (`REPORT.md:123`, `:138`, `:153`, `:168`).

---

## Family grouping — ten findings, three mechanisms

| family | mechanism | findings |
|---|---|---|
| **F-α · the law is asserted in prose and contradicted in code** | the docblock states a discrete, library-only, description-lane-proportioned chip; the implementation is a continuous engine-interpolated gradient in a name-lane font context with a dead alpha guard | **C-3**, **C-5**, **C-7**, C-11 |
| **F-β · the primitive was never rooted** | "a colour plate in a clipped 1em box" is minted twice with no shared root, so its geometry drifts, its font anchor splits, it misses a global policy every rooted colour surface already has, and its memoisation has nowhere to live | **C-4**, **C-6**, **C-10** |
| **F-γ · nothing enforces any of it** | semantics cross a package boundary as fall-through attributes and are silently dropped, killing the only path to the component; the component's only browser oracle is RED, textually unpassable, and absent from CI; its vitest file tests the sampler, not the chip | **C-1**, **C-2**, **C-8**, **C-9** |

**The gestalt cure is two moves, and it dissolves eight of the ten.**

1. **Root the chip plate** (a glass-ui variant of the existing chip/swatch family — edict 4, so it
   owes a BH relay): one recipe, geometry in one unit against one anchor, the ring,
   `data-color-surface`, and per-segment children. That is C-3, C-4, C-5, C-6, C-8 in one edit, and
   it gives C-10 a home.
2. **Make the gate real where it can run**: an SFC mount test in vitest (paint ≡ stamp, `<2` → nothing)
   so CI enforces the chip's own contract without depending on the mix flow; plus `stampStops`
   becoming a genuine canonical serialisation so the browser leg's regex is a belt rather than the
   law. That is C-2 and C-9, and it is what would have caught C-1 the day the ghost died.

C-1 itself is the one that must leave this repo as mail: it is a producer-side contract failure in
glass-ui 7.0.0, it silences an operable control on a shipped route, and it is the reason a whole
component is currently unobservable.

---

## Files

* This report — `docs/tranches/V/megatranche/audit/components/PreviewRamp/challenge-C-implementation.md`
* Probes — `probe-C-scout.mjs`, `probe-C-addslot.mjs`, `probe-C-ghost.mjs`, `probe-C-operands.mjs`,
  `probe-C-paint.mjs`, `probe-C-paint2.mjs`, `probe-C-edge.mjs` (all in this directory)
* Images — `chip-normal.png` (the ramp), `chip-forced-colors.png` (the hole), `paint-probe.png`
  (chip paint vs hard-stop reference vs the forbidden arm), `scout-mix.png`, `op-menu-open.png`
* Subject — `demo/color-session/color-chips/PreviewRamp.vue`
* Its module — `demo/color-session/color-chips/sample.ts` · `…/index.ts`
* Sole host — `demo/workbenches/mix/MixConfigBar.vue:23,57-74,111,133`
* The severed chain — `demo/workbenches/mix/MixPane.vue:103` ·
  `demo/workbenches/mix/composables/useMixingState.ts:42,55-57` ·
  `demo/workbenches/mix/MixSourceSelector.vue:68-72,165-175`
* Oracles — `test/preview-chips.test.ts` (sampler only) ·
  `e2e/smoke/oracles/o14-preview-truth.spec.ts:162-168,333-472` (RED, not in CI)
* Policy the chip missed — `demo/styles/foundation.css:678-700` (forced-colors), `:800-840` (print)
* Producer defect — `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` (`inheritAttrs: !1`,
  hard-coded `aria-hidden: "true"`)
