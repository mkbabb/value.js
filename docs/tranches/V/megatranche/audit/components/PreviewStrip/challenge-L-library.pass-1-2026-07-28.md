# CHALLENGE-L — library structure · `demo/color-session/color-chips/PreviewStrip.vue`

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## Subject and posture

- **File:** `/Users/mkbabb/Programming/value.js/demo/color-session/color-chips/PreviewStrip.vue` (76 lines)
- **Tree:** branch `tranche-u`. The prompt names HEAD `c654824e`; the working HEAD at audit time is
  **`32b4040e`** (`docs(V·mega): r3 DELTA COMPLETE …`). `git status --porcelain demo/ e2e/ test/ src/`
  → **empty**. Every measurement below is against a clean `demo/`/`e2e/`/`test/`/`src/` at `32b4040e`.
- **Consumers (exhaustive census):**

```
$ grep -rn "PreviewStrip\|color-chips" --include="*.vue" --include="*.ts" demo/ test/ e2e/ src/ \
    | grep -v "^demo/color-session/color-chips/"
demo/workbenches/mix/MixConfigBar.vue:23:      import { PreviewRamp, sampleInterpolationRamp } from "../../color-session/color-chips";
demo/workbenches/generate/GenerateControls.vue:20: import { PreviewStrip } from "../../color-session/color-chips";
demo/workbenches/generate/GenerateControls.vue:245:      <PreviewStrip :stops="presetStops(p)" />
demo/workbenches/generate/GenerateControls.vue:274:      <PreviewStrip :stops="harmonyStops(h)" />
demo/scenes/atmosphere/AuroraPane.vue:39:         import { PreviewStrip } from "../../color-session/color-chips";
demo/scenes/atmosphere/AuroraPane.vue:132:             <PreviewStrip :stops="auroraHarmonyStops(atoms, h)" />
test/preview-chips.test.ts:31:                    } from "../demo/color-session/color-chips/sample";
```

Two features (`workbenches/generate`, `scenes/atmosphere`) × three call sites, one vitest file that
imports the *sibling* module and never the component.

---

## §1 · Import trace — every edge, with its home

`PreviewStrip.vue` declares exactly two imports (lines 21–22):

| # | line | specifier | resolves to | direction | verdict |
|---|---|---|---|---|---|
| 1 | 21 | `vue` → `computed` | peer runtime | — | SOUND |
| 2 | 22 | `./sample` → `stampStops` | `demo/color-session/color-chips/sample.ts` | sibling | **VIOLATING — L-1** |

Edge 2 is the whole finding surface. `stampStops` is `stops.join("|")` (`sample.ts:89–91`) — zero
color dependencies. It lives inside the module whose own header (`sample.ts:2–3`) calls itself *"the
LIBRARY-sampling helper"*, and whose value imports are the color engine:

```
sample.ts:27-31   import { mixColors, type AnyColor, type HueInterpolationMethod } from "@mkbabb/value.js/color";
sample.ts:32      import { colorToCss, parseColorIn } from "../color-utils";
sample.ts:33      import type { PickerColorIn, PickerSpace } from "../picker-color";
```

Measured transitive closure (walker: `scratchpad/PSL-closure.mjs`, relative specifiers only, halting
at bare specifiers):

```
### demo/color-session/color-chips/PreviewStrip.vue
  relative modules in closure: 4  (15830 bytes)
    - demo/color-session/color-chips/PreviewStrip.vue  2615B
    - demo/color-session/color-chips/sample.ts         3721B
    - demo/color-session/color-utils.ts                1092B
    - demo/color-session/picker-color.ts               8402B
  bare specifiers reached:
    - @mkbabb/value.js/color   <- sample.ts, picker-color.ts, color-utils.ts
    - @mkbabb/value.js/css     <- picker-color.ts
    - vue                      <- PreviewStrip.vue
```

Both library edges are **value** imports, not erasable types — `picker-color.ts:1–27` pulls 20 named
runtime bindings from `/color`, and `picker-color.ts:28–34` pulls `parseCssColor` + `serializeCssColor`
from `/css`. Published bytes reachable from a 76-line component that needs a string join:

```
$ ls -la dist/subpaths/color.js dist/subpaths/css.js dist/*.js
   604 B  dist/subpaths/color.js
 43973 B  dist/subpaths/css.js
 12472 B  dist/anchors-C_wdoOYd.js
  6829 B  dist/operations-CB_1wGy4.js
   100 B  dist/result-CZJK1CwL.js
                            → 63,978 B ≈ 62.5 KiB
```

**No other edge in the file.** No feature→shell edge, no component→boot edge, no `demo/ui/` edge, no
glass-ui edge. The component itself is import-clean apart from #2.

### One hop out — the host's truth functions

The stop-producing functions the three call sites hand to this prop are *not* import-clean:

```
demo/scenes/atmosphere/aurora-harmony-stops.ts:24
    import { resolveCalibratedAtmosphere } from "../../color-picker/composables/boot/atmosphere-calibration";
```

`demo/scenes/atmosphere/` (a feature leaf) reaches into `demo/color-picker/composables/boot/` — the
app-shell boot chain. `demo/color-picker/` is the *entry* directory (`App.vue`, `router/`,
`index.html`, `composables/boot/`) misnamed after one feature, while the actual picker feature lives
at `demo/picker/`. `vite.config.ts:17` reaches into the same directory
(`import { injectGroundTokens } from "./demo/color-picker/composables/boot/ground"`) — build config
importing from a feature-named tree is the tell that the boot layer is homeless. This is a
feature→shell edge in the exact form the seat charter names; it is one hop from the subject, and it
is what makes AuroraPane's strip data reachable at all.

---

## §2 · The published-surface question — NEGATIVE PROOF

The charter asks whether the demo consumes `@mkbabb/value.js` through the exports map or through a
deep path a real consumer could not write. **It consumes the map, exclusively.** Proof:

```
$ grep -rho "@mkbabb/value\.js/[a-z]*" --include="*.vue" --include="*.ts" demo/ | sort | uniq -c | sort -rn
  25 @mkbabb/value.js/color
  10 @mkbabb/value.js/css
   6 @mkbabb/value.js/math
   5 @mkbabb/value.js/easing
   4 @mkbabb/value.js/quantize

$ grep -rn "@src/" --include="*.vue" --include="*.ts" demo/ | wc -l
       0
$ grep -rn 'value\.js/dist\|from "\.\./\.\./\.\./src/' --include="*.vue" --include="*.ts" demo/ | wc -l
       0

$ node -e "const p=require('./package.json'); ['./color','./css','./math','./easing','./quantize']
           .forEach(u=>console.log(u,'=>',p.exports[u]?'IN EXPORTS':'MISSING'))"
./color => IN EXPORTS
./css => IN EXPORTS
./math => IN EXPORTS
./easing => IN EXPORTS
./quantize => IN EXPORTS
```

Every specifier the demo writes is a declared subpath; the `@src` alias survives only for the
docs-page `?source` exemption and is now used **zero** times in `demo/`. `vite.config.ts:40–50`
*generates* the self-alias set from `package.json#exports` rather than hand-rolling it, so the demo
cannot drift off the published surface even by accident. **This axis is SOUND and is the strongest
structural property of the subject's neighbourhood.** The defects below are all *inside* the demo's
own lattice, not at the library boundary.

---

## §3 · Findings

### L-1 · MAJOR — wrong-direction edge: the discrete chip depends on the interpolation sampler

**Defect.** `PreviewStrip.vue:22` imports from `./sample`, the module that owns continuous-ramp
sampling. The strip never samples, never parses, never mixes: it needs `stops.join("|")`. The edge
exists because `stampStops` was filed under "sampling" rather than under "the chip's DOM protocol".

**Evidence.** `PreviewStrip.vue:22` · `sample.ts:88-91` (`stampStops` body = one `join`) ·
`sample.ts:2-3` (module self-description: *"the LIBRARY-sampling helper"*) · closure measurement in §1:
4 demo modules / 15,830 B + 62.5 KiB of published library chunk reachable from the component.

**Mechanism.** Misfiled symbol → a leaf presentational component is coupled to the color engine.
The barrel amplifies it: `index.ts:25-32` exports both components *and* the sampler from one entry,
so `import { PreviewStrip } from "…/color-chips"` (GenerateControls.vue:20, AuroraPane.vue:39) takes
the sampler edge unconditionally. Measured barrel closure: 6 modules / 19,113 B, same two library
subpaths.

**Reproduction.** `node scratchpad/PSL-closure.mjs demo/color-session/color-chips/PreviewStrip.vue`
→ output pasted in §1. The direction is verifiable by deletion: remove `stampStops` from `sample.ts`
into any leaf and `PreviewStrip`'s closure collapses to `{PreviewStrip.vue, vue}`.

**Proposed cure.** `stampStops` is not a sampling concern and not a serialization concern — it is the
**chip↔oracle wire protocol**. In the collapsed lattice of §5 it disappears entirely: the protocol
becomes "the stops that are painted", read off the painted segments, and both the attribute and its
helper are deleted. If the attribute is kept as an interim, it moves to a dependency-free leaf.

---

### L-2 · MAJOR — one `Result`, four failure policies, at the same prop boundary

**Defect.** value.js's headline property is *"Immutable, failure-explicit"* (`package.json`
`description`). Four producers feed `PreviewStrip`'s `stops` prop, and each one discharges the
library's `Result` differently. There is no single adapter that turns `Result<string>` into "a
paintable stop", so the failure policy is decided per call site.

**Evidence.**

| policy | site | behaviour on library failure |
|---|---|---|
| throw ×3 | `generate-color.ts:237, 239, 241` | `throw new Error("Generated color is invalid: …")` — escapes into render |
| null | `sample.ts:60-66, 81` | `return null` — the whole chip vanishes ("honest absence") |
| throw | `picker-color.ts:104-107, 210` `valueOrThrow` → reached from `sample.ts:40` `serializeStop` → `color-utils.ts:23` `colorToCss` | `throw new PickerColorError(code)` |
| unreachable | `aurora-harmony-stops.ts:26-28, 38` | no `Result` at all — the string is hand-built, so failure cannot be represented |

**Mechanism.** The internal inconsistency is sharpest *inside one function*:
`sampleInterpolationRamp` documents itself (`sample.ts:48-50`) as *"Returns null when the preview has
nothing TRUE to say"*, and honours that for parse (`:63-65`) and mix (`:81`) failures — but line 82
calls `serializeStop`, whose `colorToCss` → `serializePickerColor` → `valueOrThrow` path **throws**.
A serialization failure therefore escapes as an exception from a function whose contract is
total-with-null.

**Reproduction.** Static: read the four sites above; the `valueOrThrow` body is
`picker-color.ts:104-107`. This is a **hypothesis** as to a live crash — I did not construct an input
that makes `serializeCssColor` fail on an in-gamut OKLCh triple. The *structural* claim (four
policies, one boundary, no owning adapter) is fully established by the file:line table.

**Proposed cure.** One adapter owns the conversion, in the color layer, with one policy:
`toPaintableStop(color): PaintableStop | null` returning a branded string. Every producer routes
through it; the chip's prop types on `readonly PaintableStop[]` so a raw `string[]` cannot reach it.
`generate-color.ts`'s three throws and `aurora-harmony-stops.ts`'s hand-built template both die.

---

### L-3 · MAJOR — "serialize a color for a preview chip" has three homes and three incompatible formats

**Defect.** The `stops: readonly string[]` prop (`PreviewStrip.vue:27-30`) is an untyped protocol.
Three independent serializers write into it, producing three different CSS forms.

**Evidence — measured live** (`scratchpad/PSL-probe2.mjs`, Chromium, `http://localhost:9000`):

| producer | code | measured output |
|---|---|---|
| `sample.ts:39-41` `serializeStop` | `colorToCss(stop,"oklch")` + `.replace(/ \/ 1\)$/, ")")` | `oklch(…)` via `serializePickerColor` |
| `generate-color.ts:235-243` `generatedCss` | `mapColorToGamut` → `serializeCssColor` | `"oklch(88.673398030922% 0.060467090141 33.371415752918deg)"` |
| `aurora-harmony-stops.ts:26-28, 38` | local `fmt` + template literal, library serializer **bypassed** | `oklch(L C h)` hand-built |

The third is the sharpest: a demo module reimplements CSS-color serialization — a capability the
published `@mkbabb/value.js/css` surface already owns and which `picker-color.ts:28-34` already
imports — with `v.toFixed(4).replace(/\.?0+$/, "")`. That is library logic living in `demo/`.

**Consequence (the L-mechanism behind an already-filed C defect).** Because the protocol carries the
library's *string form* rather than a value, the strip's only oracle is red at HEAD:

```
$ VJS_E2E_PORT=9000 npx playwright test --project=smoke \
    e2e/smoke/oracles/o20-generate-plate.spec.ts --reporter=list
  ✓ 1 … verb, actions, and bench-note seed live INSIDE the plate (30.0s)
  ✘ 2 … T-17 seed-exact strips: a preset row's stamped stops ≡ the palette selecting it yields (9.1s)

    - Expected  "oklch(89.858355603181% 0.068344892119 162.556336484849deg)",  (stamped)
    + Received  "oklch(0.898584 0.0683449 162.556)",                           (getComputedStyle)
    at e2e/smoke/oracles/o20-generate-plate.spec.ts:105
  1 failed, 1 passed (43.1s)
```

Numerically identical, textually never equal. `git log -S "serializeCssColor(mapped.value)"` →
`a68ecdc1 feat(demo)!: v4 consumer migration` — the v4 library migration changed the emitted string
form and silently broke a demo contract that was pinned to the *form*.

**Attribution.** The o20 RED itself is already in `registry/DEFECT-LEDGER.md:4480, 20007, 20990`
(wb-generate-controls seat). **New here:** the three-producer census and the naming of the
library-structure mechanism — a string-form protocol with no owning serializer.

**Proposed cure.** As L-2: one branded `PaintableStop` minted by one adapter. The oracle then compares
*parsed* colors (`parseCssColor` both sides, per-channel ≤ 1e-9), which is form-independent — and
`e2e/smoke/oracles/o14-preview-truth.spec.ts`'s hand-written `parseOklchTriples` regex (a fourth
place that re-derives the serializer's grammar) dies with it.

---

### L-4 · MAJOR — four homes for "truncated palette preview", three caps, three truncation grammars, one of them dishonest

**Defect.** `PreviewStrip` legislates an *honest truncation* law in its own header
(`PreviewStrip.vue:10-16`: *"past the cap the strip renders the first 7 and fades the tail segment
out … reading as 'continues', never as a complete palette it isn't"*). Three other components solve
the same problem, independently, with different constants and different honesty.

**Evidence — census of every "show a palette in a small space" implementation:**

| home | cap | source of cap | truncation affordance |
|---|---|---|---|
| `demo/color-session/color-chips/PreviewStrip.vue:25` | 7 | `const STRIP_SEGMENT_CAP = 7` (module-private) | `mask-image` fade (`:73-75`) |
| `demo/palettes/browser/dialog/VersionHistoryDrawer.vue:53` | 8 | `.slice(0, 8)` literal | `+{{ n-8 }}` text (`:58-63`) |
| `demo/palettes/browser/admin/AdminFlaggedPanel.vue:54` | 5 | `.slice(0, 5)` literal | **NONE — silent** |
| `demo/palettes/browser/card/PaletteColorStrip.vue` | none | — | n/a (weighted, full width) |

`AdminFlaggedPanel.vue:52-58` renders `(item.palette?.colors ?? []).slice(0, 5)` with no indicator:
a flagged 12-color palette reads to the moderator as a complete 5-color palette. That is exactly the
lie `PreviewStrip`'s N-4 law was written to forbid, shipped in the same tree.

The asymmetry is also *inside* the subject's own module: `RAMP_SAMPLE_COUNT` is exported from the
barrel (`sample.ts:36`, `index.ts:28`) while `STRIP_SEGMENT_CAP` is module-private
(`PreviewStrip.vue:25`) — two taste knobs of the same kind, two visibilities.

**Reproduction.** `grep -rn "slice(0, [0-9])" demo/palettes/` → 6 hits, of which exactly two are
palette-color caps (`AdminFlaggedPanel.vue:54`, `VersionHistoryDrawer.vue:53`); the other four are
uuid/hash/tag slices. Live: `scratchpad/PSL-probe.mjs` drives the Generate count slider to its max
(`GenerateControls.vue:302 :max="12"`) and reads every preset row:

```json
{"stamped": 12, "painted": 7, "cls": "preview-chip preview-strip preview-strip--truncated",
 "lastSegMask": "linear-gradient(90deg, rgb(0,0,0) 20%, rgba(0,0,0,0) 95%)"}   // ×6 rows
```

The captured frame (`scratchpad/PSL-generate-menu.png`, count 12, preset menu open) shows the
consequence rendered: seven ~6 px bands with the tail band masked out, on a row whose description
lane promises the palette that selecting it yields. The fade is legible — the N-4 grammar *works*;
it is the three copies of the concept that do not have it.

**Attribution.** The count-12 stamp/paint divergence is filed at `DEFECT-LEDGER.md:20018-20030`.
`PaletteColorStrip`'s misfiling is filed by the wb-generate-controls L seat
(`wb-generate-controls/challenge-L-library.md:325-348`). **New here:** the four-home / three-cap
census including the two admin/dialog strips, and the identification of `AdminFlaggedPanel:54` as a
silent-truncation violation of the law `PreviewStrip` itself declares.

**Proposed cure.** One `PreviewChip` owns "N colors, bounded width, honest overflow" with the cap as
one exported token, and the three copies are deleted. See §5.

---

### L-5 · MINOR — the chip material is duplicated across two scoped style blocks and has already diverged

**Defect.** `PreviewStrip.vue:56-65` and `PreviewRamp.vue:40-49` declare the *same* `.preview-chip`
class — the "F7 law" material — twice. Under `<style scoped>` these compile to two distinct
`[data-v-*]`-qualified rules; nothing links them.

**Evidence.** Diff of the two blocks:

```
PreviewStrip.vue:57   display: inline-flex;      │  PreviewRamp.vue:41   display: inline-block;
PreviewStrip.vue:58   flex: none;                │  PreviewRamp.vue:42   flex: none;
PreviewStrip.vue:59   inline-size: 2.618rem;     │  PreviewRamp.vue:43   inline-size: 2.618rem;
PreviewStrip.vue:60   block-size: 1em;           │  PreviewRamp.vue:44   block-size: 1em;
PreviewStrip.vue:61   border-radius: var(--radius-sm);│ PreviewRamp.vue:45  border-radius: var(--radius-sm);
PreviewStrip.vue:62   overflow: hidden;          │  (absent)
PreviewStrip.vue:63-64 box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 12%, transparent);
                                                 │  PreviewRamp.vue:47-48  (identical)
```

Two divergences already (`display`, `overflow`) in a material both files' prose calls one law. Owner
edict 5 (root-level styling, never per-instance) and edict 1 (no duplication) both bite.

**Reproduction.** Read both blocks; the divergence is textual. Live confirmation
(`scratchpad/PSL-probe.mjs`): every strip measures `rect: [42, 16]` — 2.618rem × 1em at a 16px root —
so the two literals are currently in agreement *by luck*, not by construction.

---

### L-6 · MINOR — a design token exists for the chip's width and both chips re-hardcode its value

**Defect.** `demo/styles/foundation.css:462` declares `--phi-4: 2.618rem; /* base × φ² */`, and the
ladder's own comment (`:453-457`) states the law verbatim:

> *"one ladder, never a re-hardcoded arbitrary value."*

Both chips hardcode the number:

```
demo/color-session/color-chips/PreviewStrip.vue:59   inline-size: 2.618rem; /* one golden plate — φ² × 1em (F7) */
demo/color-session/color-chips/PreviewRamp.vue:43    inline-size: 2.618rem; /* one golden plate — φ² × 1em (F7) */
```

**Evidence.**

```
$ grep -rn "2.618rem" demo/ --include="*.vue" --include="*.css"
demo/scenes/about/AboutPane.vue:33            (prose)
demo/picker/display/…/ColorComponentDisplay.vue:138   min(var(--type-display-4), max(11.65cqi, 2.618rem))
demo/color-session/color-chips/PreviewStrip.vue:59
demo/color-session/color-chips/PreviewRamp.vue:43
demo/styles/foundation.css:462                --phi-4: 2.618rem;

$ grep -rn "var(--phi-4)" demo/
demo/scenes/about/markdown/Markdown.vue:122, 208, 311, 362
demo/styles/foundation.css:156                --spacing-phi-4: var(--phi-4);
```

Four consumers read the token; the two chips (and one clamp expression) write the literal. A φ-ladder
retune moves four call sites and silently strands the chips.

**Proposed cure.** `inline-size: var(--phi-4)` in the one collapsed chip. Zero behaviour change
(measured identical: 42px), one owner.

---

### L-7 · MINOR — the `data-stops` protocol carries two different meanings under one name

**Defect.** `sample.ts:88` claims *"The `data-stops` stamp — ONE serialization, shared by chip +
oracle."* The claim is false: the attribute means two different things depending on which component
writes it.

| writer | `data-stops` means | asserting oracle |
|---|---|---|
| `PreviewRamp.vue:34` | exactly the stops painted (`stops.join(", ")` into the gradient, `:24-26`) | `o14-preview-truth.spec.ts:360-390` — paint ≡ stamp |
| `PreviewStrip.vue:44` | the host's **full** list; the paint is `visible` (`:33-35`), a prefix | `o20-generate-plate.spec.ts:88-105` — plate ≡ stamp; **the strip's own paint is asserted nowhere** |

**Evidence.** `scratchpad/PSL-probe.mjs` at count 12: `{"stamped":12,"painted":7}` on all six rows.
`o14`'s assertion reads `getComputedStyle(el).backgroundImage` (`:365`), which on a strip is `"none"`
(measured) — the ramp oracle can never cover the strip by construction. `test/preview-chips.test.ts`
(97 lines) exercises **only** `sampleInterpolationRamp`/`serializeStop`; `grep -rn
"auroraHarmonyStops\|PreviewStrip\|preview-strip" test/ e2e/` → **no matches**, so
`aurora-harmony-stops.ts:9-12`'s claim that *"the vitest oracle holds this function strictly equal to
a direct recompute"* is also false.

**Attribution.** Corroborates `DEFECT-LEDGER.md:20018`. **New here:** the naming of the mechanism
(one attribute, two semantics, two disjoint oracles, one of them structurally incapable of covering
the strip) and the falsification of `aurora-harmony-stops.ts`'s coverage claim.

---

## §4 · Negative proofs — what I looked for and did not find

These were hunted deliberately and are **clean**; recording them so a later seat need not re-walk them.

1. **Published-surface consumption** — §2. Zero deep imports; the alias set is *generated* from
   `package.json#exports` (`vite.config.ts:40-50`). A real consumer could write every specifier the
   demo writes.
2. **`verbatimModuleSyntax` (edict 8)** — `PreviewStrip.vue:21` imports only the value `computed`;
   `sample.ts:29-30, 33` correctly mark `type AnyColor`, `type HueInterpolationMethod`, and the whole
   `import type { PickerColorIn, PickerSpace }`. No mixed import in the closure.
   `npx vue-tsc -p tsconfig.demo.json --noEmit` is green per the ledger's independent runs.
3. **Idiomatic Vue 3.5 (edict 7)** — reactive props destructure at `PreviewStrip.vue:27`
   (`const { stops } = defineProps<…>()`), `computed` for derived state, no `ref` mirror, no
   `defineModel` round-trip, no template ref needed. Correct.
4. **glass-ui reimplementation (edict 4)** — checked. glass-ui 7.0.0 exports `./chip`
   (`dist/components/chip/chipVariants.d.ts`: `SIZE`/`SHAPE` = pill/cell/icon glass *pill*, padding +
   gap + text) and `./watercolor-dot`. Neither is a color-swatch strip. `PreviewStrip` is **not** a
   demo-local copy of a glass-ui primitive. The only residue is nominal: the demo mints the word
   "chip" (`.preview-chip`) for a swatch while the design system already owns `Chip`/`glass-chip` for
   a pill — an INFO-grade name collision, not a duplication.
5. **`demo/ui/` leakage** — `PreviewStrip` imports nothing from `demo/ui/`. (`GenerateControls` does,
   at `:10-12`; that is the wb-generate-controls seat's row, not this one.)
6. **Animations (edict 6)** — the component is static paint by design (`PreviewRamp.vue:14`
   "PRM-neutral"). No keyframes present, none deleted, nothing to relocate.
7. **God module** — 76 lines, one prop, one derived pair, one template, one style block. Not a god
   module and does not add to one.
8. **Route health** — `audit/visual/REPORT.md:124, 126, 139, 141, 154, 156, 169, 171`: `/#/generate`
   and `/#/atmosphere` across all four Safari matrices report `overflowX 0`, `pageErr 0`,
   `consoleErr 0`. The chip renders only inside an open `SelectContent`, which the static capture does
   not open — so the visual matrix is *silent* on this component, neither exonerating nor accusing it.
   The live probes in §3 are the substitute.

---

## §5 · Greenfield — the lattice I would build today

The subject's neighbourhood conflates four concepts in three files. Separated:

```
┌─ LIBRARY ─────────────────────────────────────────────────────────────┐
│ @mkbabb/value.js/color   mixColors · sampleRamp(colors, {space,hue,k}) │  k-sampling is
│ @mkbabb/value.js/css     serializeCssColor  (the ONLY serializer)      │  general color math,
└───────────────────────────────────────────────────────────────────────┘  not a demo concern
                    ▲ published subpaths only (already true — §2)
┌─ demo/color-session ─ (the color layer: model · parse · convert) ─────┐
│ picker-color.ts · color-utils.ts                                      │
│ stops.ts   ← NEW, the single adapter                                  │
│              type PaintableStop = string & {__brand}                  │
│              toPaintableStop(color): PaintableStop | null   ONE policy │
│              paletteStops(...) · rampStops(...)  ← all producers here  │
└───────────────────────────────────────────────────────────────────────┘
                    ▲ features import DOWN
┌─ demo/shared/ui ─ (cross-feature presentation; the dir already exists)┐
│ PreviewChip.vue    props: { stops: readonly PaintableStop[],          │
│                             mode?: "segments" | "gradient" }          │
│   one material (var(--phi-4) × 1em, --radius-sm, inset ring)          │
│   one guard, one aria-hidden, one exported PREVIEW_STOP_CAP           │
│   one honest-overflow grammar                                          │
└───────────────────────────────────────────────────────────────────────┘
     ▲                    ▲                        ▲
 workbenches/generate  workbenches/mix     scenes/atmosphere · palettes/browser/*
```

Concretely, five moves, none of which mints a directory or a wrapper (edict 3 — `demo/shared/ui/`
already exists and already holds `EmptyState.vue` + `PaneHeader.vue`):

1. **Collapse `PreviewStrip` + `PreviewRamp` into one `PreviewChip`.** They differ in exactly one
   thing — paint strategy over the same `stops` list. Everything else is byte-duplicated: the
   material (L-5), the `aria-hidden`, the `data-stops` stamp, the `v-if` guard, the golden-plate
   literal (L-6). Two files, 127 lines → one file, ~55.
   *Aggressive variant, offered not hedged:* drop `mode` entirely and paint segments always. At the
   measured chip width of **42 px**, `RAMP_SAMPLE_COUNT = 16` gives **2.6 px** per segment — a ramp
   the eye reads as continuous. That deletes the gradient path, makes `data-stops` mean one thing
   again (L-7), and lets **one** oracle read segment `backgroundColor`s for both forms — which also
   retires `o14`'s hand-written `parseOklchTriples` regex, already wanted at
   `DEFECT-LEDGER.md:20786`.
2. **Move the chip to `demo/shared/ui/`.** It is cross-feature presentation (3 features, 4 call
   sites); it currently lives inside the color *data* layer. Moving it up makes L-1 structurally
   impossible: a `shared/ui` leaf cannot reach `color-session/sample.ts`, so the 62.5 KiB edge cannot
   be re-drawn by a future writer.
3. **One `stops.ts` adapter in `color-session/`** owning `Result` discharge and serialization (L-2,
   L-3). `serializeStop`'s regex, `generatedCss`'s three throws, and `aurora-harmony-stops.ts`'s
   `fmt` all delete. `stampStops` deletes with them.
4. **Absorb the three other truncated strips** (L-4): `PaletteColorStrip` (retyped on
   `readonly PaintableStop[]` + optional `weights`), `VersionHistoryDrawer:53`, and
   `AdminFlaggedPanel:54` — the last of which stops lying the moment it inherits the shared overflow
   grammar.
5. **Rehome `demo/color-picker/composables/boot/`** to a shell/boot home so
   `scenes/atmosphere → boot` stops being an upward edge (§1). This is a lattice-wide row, larger
   than this component; recorded here because the subject's third call site depends on it.

Elegance ledger: **−1 component, −1 barrel export, −3 serializers, −3 truncation grammars, −2
hardcoded literals, −1 e2e regex, −1 wrong-direction edge, −62.5 KiB of reachable library from a
presentational leaf.** Nothing is added but one 4-line adapter and one branded type.

---

## §6 · Verdict

**DEFECTIVE.** The component's own two-line import list is nearly clean and its consumption of the
published library surface is exemplary (§2) — but the module it is filed in is filed wrong, and the
protocol it exists to serve has no owner. Seven findings: 4 MAJOR (L-1 wrong-direction edge with a
measured 62.5 KiB reach · L-2 four failure policies at one boundary · L-3 three serializers, one
untyped protocol, oracle RED at HEAD · L-4 four homes / three caps / one silent lie), 3 MINOR (L-5
duplicated material, already divergent · L-6 a token exists and is re-hardcoded twice · L-7 one
attribute, two semantics).

Strongest: **L-1** — because it is the one defect whose cure (move the chip up to `demo/shared/ui/`,
move the protocol out of the sampler) makes the others structurally *unrepeatable* rather than merely
repaired.

### Gates a cure must pass

- **G-1** `node scratchpad/PSL-closure.mjs <chip>` → relative closure = 1 module, bare specifiers =
  `{vue}` only. Zero `@mkbabb/value.js/*` reachable from the presentational leaf.
- **G-2** `grep -rn "SEGMENT_CAP\|2\.618rem" demo/` → exactly one exported cap constant, and zero
  hardcoded `2.618rem` outside `demo/styles/foundation.css:462`. (Today: `PreviewStrip.vue:25` +
  `:59` and `PreviewRamp.vue:43`.)
- **G-3** `grep -rc "\.preview-chip" demo/ --include="*.vue" | grep -v ":0" | wc -l` → 1 (today: 2 —
  `PreviewStrip.vue`, `PreviewRamp.vue`, one declaration each).
- **G-4** `VJS_E2E_PORT=9000 npx playwright test --project=smoke e2e/smoke/oracles/` → o20 test 2
  GREEN, with the comparison done on **parsed** colors, plus a new leg asserting
  `stopsPerChip === segmentsPerChip` at every reachable count (1…12) — the count-12 form of the
  L-7/L-4 divergence.
- **G-5** `grep -rn "oklch(\${" demo/` → zero hand-built CSS color templates; every stop originates
  at the one adapter.

### Probe artifacts

`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`
— `PSL-closure.mjs` (import-closure walker), `PSL-probe.mjs` (count-12 strip census +
`PSL-generate-menu.png`), `PSL-probe2.mjs` (stamp vs. computed-style vs. painted-segment identity,
three legs).
