# CHALLENGE-C — `PreviewStrip.vue` · implementation

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, declared explicitly at
spawn by the orchestrating workflow (not inherited, not defaulted). Seat is properly declared.

---

## Subject and scope

| | |
|---|---|
| Component | `demo/color-session/color-chips/PreviewStrip.vue` (76 lines) |
| Module siblings | `PreviewRamp.vue`, `sample.ts`, `index.ts` |
| Hosts | `demo/workbenches/generate/GenerateControls.vue:245,274` (Preset + Harmony menus) · `demo/scenes/atmosphere/AuroraPane.vue:132` (Palette harmony) |
| Truth functions | `generate-color.ts#generatePalette` · `aurora-harmony-stops.ts#auroraHarmonyStops` |
| Repo state | branch `tranche-u`, HEAD `32b4040e` (task named `c654824e`; HEAD had advanced by two commits when this seat opened — noted, not a finding) |
| Live probes | Chromium + WebKit against `http://localhost:9000`, read-only, 5 scripted runs |

**VERDICT — DEFECTIVE.** Two BLOCKERs, six MAJORs, two MINORs. The strongest is not a style nit: the
component's own documented truth law (`data-stops` ≡ paint) is **false by construction** the moment a
palette exceeds 7 colors, and the single oracle in the repository that touches this component is
**RED at HEAD and is not run by CI at all**.

---

## The evidence base (commands run, output pasted)

### E-1 · the strip's only oracle is RED

```
$ npx playwright test --project=smoke e2e/smoke/oracles/o20-generate-plate.spec.ts -g "seed-exact" --reporter=line

  1) [smoke] › e2e/smoke/oracles/o20-generate-plate.spec.ts:63:5 › T-17 seed-exact strips:
     a preset row's stamped stops ≡ the palette selecting it yields

    Error: expect(received).toEqual(expected) // deep equality

    - Expected  - 5
    + Received  + 5

      Array [
    -   "oklch(80.727303929627% 0.064260062203 230.954823195934deg)",
    -   "oklch(90.822609081864% 0.048776818833 8.462587245972deg)",
    -   "oklch(80.845289043151% 0.064579532379 145.97035129601deg)",
    -   "oklch(87.101069216616% 0.065246249135 283.478115346048deg)",
    -   "oklch(82.01344359573% 0.046562705804 60.985879396086deg)",
    +   "oklch(0.807273 0.0642601 230.955)",
    +   "oklch(0.908226 0.0487768 8.46259)",
    +   "oklch(0.808453 0.0645795 145.97)",
    +   "oklch(0.871011 0.0652462 283.478)",
    +   "oklch(0.820134 0.0465627 60.9859)",
      ]

      > 105 |         expect(live).toEqual(stamped);
  1 failed
```

### E-2 · `data-stops` ≠ paint above the cap (both engines)

```
chromium · count=7   { n: 7,  painted: 7, mask: "none" }
chromium · count=8   { n: 8,  painted: 7, mask: "linear-gradient(90deg, rgb(0,0,0) 20%, rgba(0,0,0,0) 95%)" }
chromium · count=12  { n: 12, painted: 7, mask: "linear-gradient(...)" }
webkit   · count=8   { n: 8,  painted: 7, mask: "linear-gradient(...)" }
webkit   · count=12  { n: 12, painted: 7, mask: "linear-gradient(...)" }
```

### E-3 · the strip is a CONSTANT function of `count` for count ≥ 7

```
chromium · PAINTED pixels identical across count 8 vs 12?  true
webkit   · PAINTED pixels identical across count 8 vs 12?  true

chromium · painted@8  == painted@12 ==
  ["oklch(0.629106 0.168325 49.1738)", "oklch(0.640148 0.121468 341.19)",
   "oklch(0.564655 0.112417 75.9479)", "oklch(0.634146 0.142027 65.2226)",
   "oklch(0.577867 0.213365 350.963)", "oklch(0.79205 0.0891952 39.2551)",
   "oklch(0.662412 0.191178 331.271)"]

chromium · stamped@12 (the truth function's actual output)  →  12 entries
```

### E-4 · geometry, measured live

```
chromium · count=7  { w: 41.875, h: 16.391, fs: "16.4px", rootFs: "16px", ratio: 2.5548,
                      display: "flex",
                      shadow: "oklab(0.216128 0.00350075 0.00518669 / 0.12) 0px 0px 0px 1px inset" }
webkit   · count=7  { w: 41.944, h: 16.248, fs: "16.4px", rootFs: "16px", ratio: 2.5815 }
φ² = 2.6180339887
truncated tail segment: { w: 5.984, mask: "linear-gradient(90deg, rgb(0,0,0) 20%, rgba(0,0,0,0) 95%)" }
segment x-offsets: 288.013 → 294.103 (Δ 6.09, contiguous — no seams)
```

### E-5 · test-surface census

```
$ grep -rn "PreviewStrip\|preview-strip" test/ e2e/
--- exit 1 ---            # ZERO hits

$ npx vitest run test/preview-chips.test.ts
 ✓ test/preview-chips.test.ts (4 tests) 11ms          # all four exercise sampleInterpolationRamp

$ grep -n "playwright\|e2e" .github/workflows/*.yml
(no output)                # e2e is NOT in CI
$ grep -n "run:" .github/workflows/ci.yml
 33: npm run lint · 34/35: vue-tsc · 36: npm run build · 37: npm test    # vitest only
```

### E-6 · idle cost (honest negative)

```
[data-stops] in document, menus CLOSED, count=5   →  0
.preview-strip-segment in document, menus CLOSED  →  0
[data-stops] in document, menus CLOSED, count=12  →  0
open Preset menu → chips: 10, segments: 70   (10 rows × cap 7)
```

### E-7 · the pictures (vision, magnified 8×, `.preview-strip` element screenshots)

`count=7` (7 stops, untruncated) and `count=8` (8 stops, truncated) are *near-identical*: same seven
segments, same closed rounded-rect plate, same hairline ring. The only delta is a soft right edge on
the seventh segment, which reads as **"the seventh colour is paler"**, not as **"there are more
colours"**. `count=12` is pixel-identical to `count=8`.
Files, banked next to this report:
`docs/tranches/V/megatranche/audit/components/PreviewStrip/chip-count5.png`,
`…/chip-count7.png`, `…/chip-count8.png`, `…/chip-count12.png`, `…/preset-menu-count12.png`.

---

## Findings

### C-1 · BLOCKER — `data-stops` carries two mutually contradictory referents; past the cap the component's own truth law is false

**Defect.** `PreviewStrip.vue:44` stamps `stampStops(stops)` — *every* stop the host's truth function
produced — while the template (`:49-51`) paints `visible`, which is `stops.slice(0, 7)` when
`stops.length > 7`. The file's own header (`:6-8`) states the contract it breaks:

> "the strip stamps them on `data-stops` and paints them as equal hard segments"

At `count = 12` the attribute asserts twelve colours and the element paints seven (E-2, both
engines). One attribute is being asked to be two different things at once:

* the **truth-function referent** — what selecting this row will yield (what `o20` reads, and what it
  *must* read: it compares the stamp to the live plate swatches);
* the **paint referent** — what this element actually renders (what `o14`'s chip law asserts for the
  ramp: "the painted gradient must embed exactly those stops", `o14-preview-truth.spec.ts:33`).

Above the cap these two are provably unequal, so no consumer can be correct. This is not a
documentation slip; it is the architecture of the attribute.

**Repro.** `/#/generate` → drag Color count to 12 → open the Preset menu → read any chip:
`data-stops` splits to 12, `element.children.length` is 7.

**Cure (architectural, not a patch).** Split the referents at the seam instead of overloading one
attribute. The chip stamps *what it paints* — `:data-stops="stampStops(visible)"` — and the host,
which owns the truth function, stamps the total on the row it owns
(`:data-preview-total="stops.length"` on the `SelectItem`). Then `o14`'s paint≡stamp law becomes
true for the strip species for the first time, and `o20`'s seed-exact law reads a referent that is
actually the truth function's whole output. The alternative gestalt — and the cleaner one — is to
delete the cap from the chip entirely and let the host decide how many stops to hand over; a chip
whose job is "paint the stops you are given" has no business silently discarding five of them.

---

### C-2 · BLOCKER — the strip's only oracle is RED at HEAD, and no CI gate runs it

**Defect.** `e2e/smoke/oracles/o20-generate-plate.spec.ts:105` fails (E-1). The mechanism is that
`stampStops()` (`sample.ts:89-91`) is a bare `join("|")` over the host's *author-level*
serialization: `generatedCss()` → `serializeCssColor()` emits
`oklch(80.727303929627% 0.064260062203 230.954823195934deg)`, while the oracle's other side reads
`getComputedStyle(...).backgroundColor`, which every engine canonicalises to
`oklch(0.807273 0.0642601 230.955)`. Percent-vs-unit-interval lightness, `deg`-vs-bare hue, and
precision truncation — three independent divergences, all of them structural.

The O-14 *ramp* leg survived exactly this hazard because someone wrote `parseOklchTriples()`
(`o14-preview-truth.spec.ts:162-168`) and compares numeric triples within a tolerance band. The
strip leg never got that treatment, so the "byte-identical" claim in the o20 header comment
(`:71-73`, "byte-identical rgb() strings") is doubly wrong — they are not byte-identical, and they
are not `rgb()`.

Compounding: `grep -n "playwright\|e2e" .github/workflows/*.yml` returns nothing (E-5). CI runs
lint, two `vue-tsc` passes, a build, and `npm test` (vitest). **The CI-enforced coverage of this
component is exactly zero**, and the one out-of-CI oracle that names it has been red without anyone
noticing.

**Cure.** Compare at the value level, not the string level — reuse the ramp leg's
`parseOklchTriples` (it already exists in the sibling oracle; do not mint a second one), or make
`stampStops` emit a canonical form once so both sides of every O-14 leg speak the same dialect. The
canonicalisation belongs in `sample.ts` — it is "the ONE serialization, shared by chip + oracle" by
its own docstring, and it currently is not one serialization at all.

---

### C-3 · MAJOR — the "seed-exact" preview stops tracking the control that drives it at count ≥ 7

**Defect.** Measured in both engines (E-3): the seven painted stops at `count = 8` are **byte-identical**
to the seven painted stops at `count = 12`. A user dragging the Color count slider from 8 to 12
watches the plate below grow from 8 swatches to 12 while every preview strip in both menus stays
frozen. `GenerateControls.vue:87-93` sells this preview as

> "each option row previews the EXACT palette selecting it yields … A preview that lies (random per
> open, or a canned swatch) is worse than none."

Above 7, the strip *is* the canned swatch that comment forbids: a constant image standing in for a
varying palette. (Proximate cause is the cap discarding indices 7…n−1; `generatePalette`'s first
seven entries happen to be count-invariant for this harmony, which makes the freeze total.)

**Repro.** `/#/generate` → set count 8 → screenshot any preset chip → set count 12 → screenshot the
same chip → identical, and `painted@8 === painted@12` deep-equals `true`.

**Cure.** Same as C-1: the chip should not be the thing that decides which stops exist. If a
7-segment ceiling is genuinely the taste knob, the honest form is *resampling* — show 7 stops
**drawn across the whole palette** (indices `round(i·(n−1)/6)`), which stays a truthful summary of an
n-colour palette and *does* move when n moves — rather than truncating to a prefix.

---

### C-4 · MAJOR — the truncation affordance is not perceptible as truncation

**Defect.** `PreviewStrip.vue:73-75` fades the last *segment* with
`mask-image: linear-gradient(90deg, black 20%, transparent 95%)`. Measured, the last segment is
**5.984 px** wide, so the fade ramp spans x ∈ [1.20 px, 5.68 px] — a **4.5 px** cue at the far right
of a **41.9 px** chip, i.e. 10.7 % of the chip, ~4 device pixels at 1× DPR.

Worse, the cue is contradicted by the element it sits inside. CSS masks apply **per element**: the
mask is on the child, while `border-radius: var(--radius-sm)`, `overflow: hidden` and
`box-shadow: inset 0 0 0 1px …` are all declared on the **parent** `.preview-chip` (`:61-64`) and are
therefore *not* attenuated. The plate still terminates in a closed, ringed, rounded right edge. The
N-4 law this implements is quoted in the file itself (`:10-16`):

> "reading as 'continues', never as a complete palette it isn't"

The rendered artefact reads as a complete palette whose last swatch happens to be pale — see the
`count=7` vs `count=8` magnified screenshots (E-7), which a reader cannot tell apart without
counting. Nothing anywhere states *how many* colours were elided.

**Cure.** Put the fade on the thing whose edge must read as unfinished: mask the **chip**, and let
the ring and the corner clip fade with it (`mask-image` on `.preview-strip--truncated`, ring moved
from `box-shadow` to a masked pseudo-element or `outline` that the mask can reach). Or drop the
mask idiom entirely and adopt the C-3 resample, which needs no truncation affordance because nothing
is truncated.

---

### C-5 · MAJOR — vacuous gate: nothing in the repository reads this component's paint

**Defect.** `grep -rn "PreviewStrip\|preview-strip" test/ e2e/` → **zero hits** (E-5).
`test/preview-chips.test.ts` imports only `sample.ts` (`:27-33`) and its four green tests all
exercise `sampleInterpolationRamp` — a function `PreviewStrip` never calls. `o20` reads the
`data-stops` *attribute* and never touches a segment.

And the T-17 chip **feasibility leg** — the "every preview chip is perceptible / opaque / off the
near-black clamp" law (`o14-preview-truth.spec.ts:404-559`) — is structurally incapable of reaching
the strip species. It locates `[data-stops]` inside the **Mix** listbox only (strips live in
Generate and Atmosphere), and its measurement primitive is
`getComputedStyle(el).backgroundImage` gradient stops. Measured on a live `PreviewStrip`:
`bgImage: "none"` — the strip paints through **child** `background-color`, not a parent gradient. If
the leg ever did reach a strip, `matches.length` would be 0 and its own
`expect(m.count).toBeGreaterThanOrEqual(2)` (`:537`) would RED. So the law that exists precisely to
catch "a lying preview a byte-honest sampler would still serialize" is implemented for one of the
two chip species and silently absent for the other.

**Exact mutations that keep every suite green** (the vacuous-gate proof):

| # | mutation | vitest | o20 | o14 |
|---|---|---|---|---|
| a | delete `:style="{ backgroundColor: stop }"` (`:50`) — 7 invisible segments | green | green | green |
| b | `STRIP_SEGMENT_CAP = 1` | green | green | green |
| c | delete `truncated`/`visible`, render `stops` raw | green | green | green |
| d | `aria-hidden="true"` → `"false"` | green | green | green |
| e | delete the entire `<style scoped>` block | green | green | green |

(a) is decisive: the component can be reduced to seven invisible boxes and every gate in the
repository still passes.

**Cure.** `@vue/test-utils` is already a devDependency (`package.json:96`) and vitest already runs in
CI — a mount test asserting `wrapper.findAll(".preview-strip-segment")` count and each segment's
`background-color` against the props, plus the cap/truncation boundary at n = 7 / 8, is ~20 lines and
lands *inside* the CI gate rather than in the un-run e2e tree. Then generalise the o14 feasibility
leg over both chip species by measuring **rendered pixels** (the leg already builds a 1×1 canvas)
instead of parsing `backgroundImage`, so the species with no gradient is measurable at all.

---

### C-6 · MAJOR — the golden-plate law is written in `rem` and asserted in `em`; the plate measurably is not φ²

**Defect.** `PreviewStrip.vue:59-60`:

```css
inline-size: 2.618rem; /* one golden plate — φ² × 1em (F7) */
block-size: 1em;
```

The comment asserts a relation to `1em`; the declaration is `rem`. These agree only where the local
font size equals the root font size, which is nowhere the chip is actually used. Measured live at
every real call site: chip `font-size: 16.4px`, root `font-size: 16px` ⇒

| engine | w (px) | h (px) | w/h | φ² |
|---|---|---|---|---|
| Chromium | 41.875 | 16.391 | **2.5548** | 2.6180 |
| WebKit | 41.944 | 16.248 | **2.5815** | 2.6180 |

The plate is 2.4 % short of golden in Chromium and 1.4 % short in WebKit, and the two engines
disagree with each other. Identical defect verbatim at `PreviewRamp.vue:43-44`.

Secondary, same block: `display: inline-flex` (`:57`) is **inert**. Measured `display: "flex"` in
both engines, because the chip is a flex item of the `#description` wrapper
(`GenerateControls.vue:244`) and is blockified per CSS Display §2.7. A declaration that never takes
effect at any live call site is dead code by the no-legacy edict.

**Cure.** One unit. `block-size: 1em; inline-size: calc(2.618 * 1em)` if the plate is meant to ride
the line it joins (it is — F7 says "joins the description line"), or both in `rem` if it is meant to
be an absolute plate. Not one of each.

---

### C-7 · MAJOR — `.preview-chip` is minted twice, in two disjoint scoped blocks, and has already drifted

**Defect.** The same class name and the same "F7 law" exist in two files:

* `PreviewStrip.vue:56-65` — `display: inline-flex`, `overflow: hidden`, `2.618rem`, `1em`, `--radius-sm`, `inset 0 0 0 1px color-mix(in oklab, var(--foreground) 12%, transparent)`
* `PreviewRamp.vue:40-49` — `display: inline-block`, **no** `overflow`, otherwise identical

Both live in `<style scoped>`, so they compile to `[data-v-A]` and `[data-v-B]` — two disjoint rules
that no single edit can reach. The shared law (plate width, 1em height, radius token, hairline ring
recipe) therefore has **no root**, in direct violation of the root-level-styling edict, and it has
already drifted: the `display` differs, the `overflow` differs, and the F7/F8 rationale comment
survives only on the ramp.

**Cure.** The chip base is one thing; give it one home. Either a `color-chips/chip.css` imported by
both SFCs (smallest honest move, zero new directories — KISS-compliant), or — the idiomatic
transposition under the glass-ui-is-the-design-system edict — a glass-ui primitive, which is where a
reusable chip plate belongs and where `@mkbabb/glass-ui/chip` (`Chip`, `chipVariants`) already lives.
The per-species deltas (`inline-flex`+`overflow` for the segmented form, gradient paint for the
continuous form) stay in the SFCs as modifiers.

---

### C-8 · MAJOR — a third mint of the same visual primitive is imported into the same file

**Defect.** `demo/palettes/browser/card/PaletteColorStrip.vue` renders exactly the same primitive —
*n* hard colour segments inside an `overflow-hidden` flex box — with weights and an 8 % legibility
floor. `GenerateControls.vue` imports **both** (`:16` `PaletteColorStrip`, `:20` `PreviewStrip`) and
renders both on the same screen (`:135`, `:245`, `:274`).

Neither knows the other exists. Consequences that are already load-bearing:

* the weighted/floored segment maths (`PaletteColorStrip` `WEIGHT_FLOOR = 0.08`) is unavailable to
  the preview chips;
* the cap/truncation grammar (`STRIP_SEGMENT_CAP`) is unavailable to the card strip, which will
  render 40 sub-pixel slivers for a 40-colour palette;
* the prop shapes have diverged for no reason (`PaletteColor[]` vs `readonly string[]`);
* the two a11y treatments have diverged (`aria-hidden` alone vs `aria-hidden` + `role="presentation"`).

The module docstring (`index.ts:2-4`) claims the opposite: "ONE focused common module for the
multi-feature chip grammar, never a per-pane copy". The per-pane copy predates it and was never
folded in.

**Cure.** One segmented-strip primitive with a `segments` contract that carries an optional weight —
equal widths are the degenerate case of weighted widths, so `PreviewStrip` is
`PaletteColorStrip` + a size token + a cap, not a separate component. Under the design-system edict
that primitive belongs in glass-ui alongside `Chip`; the two demo call sites then differ only by
props.

---

### C-9 · MINOR (HYPOTHESIS) — no honest-absence path for an unpaintable stop

**Defect.** The ramp species has one: `sampleInterpolationRamp` returns `null` on an unparseable
operand (`sample.ts:60-66`) and the host `v-if`s the chip away (`MixConfigBar.vue:111,133`) — "honest
absence, never a canned swatch". `PreviewStrip` has none. `:style="{ backgroundColor: stop }"` with a
non-CSS string is silently dropped by the CSSOM; the segment paints **transparent**, the menu ground
shows through, and `data-stops` still asserts a colour there. That is precisely the "lying preview"
`sample.ts:15-19` forbids.

A reachable-in-principle source: `aurora-harmony-stops.ts:27,39` builds
`` `oklch(${fmt(s.L)} ${fmt(s.C)} ${fmt(s.h)})` `` with `fmt(v) = v.toFixed(4).replace(/\.?0+$/,"")`,
which maps `NaN → "NaN"` and `Infinity → "Infinity"`, yielding `oklch(0.63 0 NaN)`. Its only guard is
upstream in `resolveCalibratedAtmosphere`.

**Repro — NONE.** I verified only the mechanism (an invalid `background-color` string is dropped by
both Chromium and WebKit); I did not find a live input that produces a non-finite stop. Labelled a
hypothesis per evidence law. (I did verify `fmt`'s trailing-zero regex is *correct* for finite input
— `100.0000 → "100"`, `0.1000 → "0.1"`, `0.0000 → "0"` — so that is not the hazard.)

**Cure.** The strip should own the same honesty contract as the ramp: validate at the module seam
(`sample.ts` already owns "the ONE serialization") and let the host render nothing rather than a
transparent lie.

---

### C-10 · MINOR — a11y: elision is conveyed only by a decorative alpha ramp, and the whole payload is `background-color`

**Defect.** `aria-hidden="true"` (`:43`) is the right call for the swatch itself. But it means "5 of
these 12 colours are not shown" is unavailable to AT with **no textual substitute anywhere in the
row** — the description lane carries a static blurb (`"High chroma, bold tones"`), never a count.
The same information is also unavailable under `forced-colors: active`, where the segments'
`background-color` is replaced by the forced palette: the component's entire payload is
`background-color`, and it declares no `forced-color-adjust`.

**Cure.** If the strip is decorative, the row's description must carry the count when the strip
truncates (`"12 colours · showing 7"` in the existing `#description` lane — no new surface). If the
strip is informative, it stops being `aria-hidden` and gets a name. It cannot be both, and today it
is informative-but-hidden.

---

## Negative proof — what I checked and found SOUND

These are the checks the challenge brief demanded, run and cleared. They are the counterweight to
the findings above and they are why the verdict is DEFECTIVE rather than DEFECTIVE-everywhere.

* **All six named local hazards are ABSENT.** No `defineModel` (so no stale-read round-trip; the
  component has no writable model at all). No oklch→HSV roundtrip and no `stableHue` dependency. No
  `ValueUnit` wrapping — the component never touches library colour objects, only strings. No
  reka-ui slider and no pointer capture. **No `requestAnimationFrame`** — the component has no
  animation, no transition, no motion of any kind, so it contributes zero sites to the PRM-RAF
  epidemic. No WebGL.
* **No lifecycle surface at all.** Zero `onMounted`/`onUnmounted`, zero listeners, zero observers,
  zero timers, zero async, zero fetch. There is nothing to leak and nothing to clean up. Network
  failure is not a reachable state for this component.
* **Idle cost is genuinely zero.** `GenerateControls.vue:91` claims the `SelectContent` unmounts when
  closed; measured true — `[data-stops]` count in the document with menus closed is **0** at
  count = 5 and at count = 12, and `.preview-strip-segment` is **0**. No work per frame, per
  keystroke, or per reactive tick while the menus are shut.
* **Reactivity is correct.** Vue 3.5 reactive props destructure is used as intended; `truncated` and
  `visible` compile to `__props.stops` reads and *do* re-fire — verified live by driving the count
  slider and observing `stampedN` change 5 → 12 and the truncated class appear at 8.
* **Segment geometry is clean.** Measured x-offsets 288.013 → 294.103 at w = 6.09 px: contiguous, no
  sub-pixel seams, no gaps, no overflow. The chip never overflows its 41.9 px box.
* **`mask-image` is not a Safari hazard.** Both engines compute the unprefixed `mask-image` and the
  `-webkit-` alias identically. No prefix-only failure.
* **Domain boundaries hold.** `stops.length === 0` → `v-if` renders nothing (`:40`).
  `stops.length === 1` → one full-width segment, which is the truth. `stops.length === 7` → exactly
  the cap, untruncated. Verified live at counts 1, 5, 7, 8, 12. Nothing throws; there is no parse
  path in this component, so the repo's live `parseCssColor` crash class is not reachable here.
* **`verbatimModuleSyntax` is satisfied.** The file's only imports are value imports (`computed`,
  `stampStops`); there is no type-only import to mis-declare.
* **God-module and legacy edicts are satisfied.** 76 lines, one job, one exported component, no
  aliases, no shims, no dual paths, no back-compat fallbacks.
* **Zero contribution to the visual REPORT's defect tallies.** `namelessButtons` (18 total) and
  `smallTapTargets` (60 total) both count **0** rows from this component: it renders no interactive
  element, and it is not in the DOM at capture time (menus closed — measured 0 above). The `/#/generate`
  row's 5 small tap targets and `/#/atmosphere` row's 7 belong to other components. When a menu *is*
  open, the option rows measure **266.6 × 49.9 px**, comfortably above the 24 px floor. No horizontal
  overflow, no page errors, no console errors attributable to this component (the one console error
  in the whole matrix is `safari-desktop-light /#/: WebGL: context lost`, and the one seen in my own
  probes is the dev-server `VITE_API_URL` misconfiguration notice — neither is this component's).

---

## Family grouping — the two mechanisms underneath ten findings

| family | mechanism | findings |
|---|---|---|
| **F-α · one attribute, two referents** | `data-stops` is simultaneously the truth-function output and the paint output; the cap makes them provably unequal, and the serialization is author-level on one side and computed on the other | C-1, C-2, C-3, C-4 |
| **F-β · the primitive was never rooted** | the "n colour segments in a clipped plate" primitive is minted three times (PreviewStrip / PreviewRamp / PaletteColorStrip) in two scoped blocks with no shared root, so its law drifts, its units disagree, and no gate can see any of it | C-5, C-6, C-7, C-8 |
| (leaf) | strip lacks the ramp's honesty contract | C-9 |
| (leaf) | informative content marked decorative | C-10 |

The gestalt cure is one move, not ten: **root the primitive** (one segmented-strip component, one
chip plate stylesheet, one canonical stop serialization — the design-system edict says in glass-ui),
and **split the referent** (paint stamps what it paints; the host stamps the total). C-6, C-7, C-8
dissolve into the first; C-1, C-2, C-3 dissolve into the second; C-4 and C-5 become writable gates
once there is one thing to gate.

---

*Seat: CHALLENGE-C · implementation. No source edits were made from this seat. All writes are
confined to `docs/tranches/V/megatranche/audit/components/PreviewStrip/`.*
