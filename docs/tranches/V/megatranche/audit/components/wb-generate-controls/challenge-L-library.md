# CHALLENGE-L — library structure · `demo/workbenches/generate/GenerateControls.vue`

## Model receipt

I observe myself to be **Claude Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching
the explicit Opus 5 declaration this seat was spawned with. The seat is declared, not inherited.

> **A SECOND INDEPENDENT L PASS RAN 2026-07-27 (repo HEAD `9bcd5d91`).** It re-verified the pin,
> confirmed §L-0/§L-1/§L-2/§L-3/§L-4/§L-5 on fresh evidence, obtained the live save-name
> reproduction pass 1 had to abandon, **upgraded §L-10 from INFO to MAJOR** on measured evidence,
> and found **one new BLOCKER: the five per-swatch copy verbs on this plate do not exist in the
> product.** See **§8 — Pass 2** at the end of this file. Read §8 before acting on §6's wave table.

---

## 0. Pin verification (coordination boundary)

The CARRY-LEDGER §D glass BJ W4 hold pins this consumer at SHA-256
`4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6`.

```
$ shasum -a 256 demo/workbenches/generate/GenerateControls.vue
4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6  demo/workbenches/generate/GenerateControls.vue
```

**MATCHES. No drift.** The hold is intact; every finding below that lands *inside* this file is
authored as `BLOCKED-ON-GLASS-V8` with its release condition, never as a proposed edit. Findings
whose cure lands *outside* the pinned file (GeneratePane.vue, tsconfig, `demo/ui/**`, `src/`) are
free to move now and are marked **CURABLE NOW**.

---

## 1. Verdict

**DEFECTIVE.** The premise holds. Twelve defects, four of them structural at the library boundary
proper: (a) **the component speaks a design-system prop vocabulary glass-ui 7 does not read**, so its
declared visual hierarchy is not applied — 51 call sites repo-wide, three in this file (§L-0);
(b) the palette-generation *capability* lives on the wrong side of the `src/` ↔ `demo/` line;
(c) the demo's proof of the published subpath surface is **not a proof** — five of the seven public
specifiers are shadowed by a stale `tsconfig` `paths` mirror that never consults
`package.json#exports`; and (d) the design-system boundary is crossed through nineteen pure
re-export shim directories that the standing no-legacy edict forbids by name.

Two defects contend for strongest, and they are the same defect wearing different clothes — **a
contract that no layer enforces, so a silent break survives every gate**:

- **§L-0** — `<Button variant="…">` is inert against glass-ui 7 (whose axis is `emphasis`). The prop
  falls through to `$attrs`, the buttons render at default weight, `vue-tsc` is green, and the
  failure is *visible in the shipped screenshot*. This is the newer and wider finding: it indicts the
  producer/consumer seam for the whole demo, not one pane.
- **§L-1** — the palette name the user types is silently discarded on save, because the ownership
  seam between the component and its pane drops the emit payload. Proven live in the running app.

L-0 is ranked first because its blast radius is 51 call sites and its cure is a *producer* obligation
that belongs in the Glass 8 release condition; L-1 is a one-line consumer fix that should not wait.

---

## 2. Import trace — every edge, and where it goes

`GenerateControls.vue` lines 2–33, each import traced to its home:

| ln | specifier | resolves to | verdict |
|---|---|---|---|
| 2 | `vue` | host `vue@^3.5.34` (declared) | OK |
| 4–9 | `../../ui/select` | `demo/ui/select/index.ts` → `export {…} from "@mkbabb/glass-ui"` | **SHIM — L-2** |
| 10 | `../../ui/slider` | idem | **SHIM — L-2** |
| 11 | `../../ui/button` | idem | **SHIM — L-2** |
| 12 | `../../ui/badge` | idem | **SHIM — L-2** |
| 13 | `@lucide/vue` | declared `^1.16.0` | OK |
| 14 | `@mkbabb/glass-ui` | root barrel, `dist/glass-ui.js` (25,239 B) | **L-6** |
| 15 | `@mkbabb/glass-ui/watercolor-dot` | subpath, `dist/watercolor-dot.js` (4,560 B) | OK (correct register) |
| 16 | `../../palettes/browser/card` | **another feature's card cluster** | **CROSS-FEATURE — L-3** |
| 20 | `../../color-session/color-chips` | shared color layer | OK (direction correct) |
| 21 | `import type … ../../palettes/types` | **another feature's domain type** | **CROSS-FEATURE — L-3** |
| 22 | `./composables/useColorGeneration` | own feature | OK |
| 25–31 | `../../color-session/generate-color` | shared color layer → `@mkbabb/value.js/{color,css}` | direction OK, **home wrong — L-4** |
| 32 | `import type {PresetName, HarmonyName}` | idem | OK |
| 33 | `import type {AcceptableValue} from "reka-ui"` | declared `^2.9` | OK |

**No feature→shell, no component→boot, no demo→`src/` deep-path edge exists in this file or its
transitive closure.** The T.W1 dogfood keystone held on that axis: `grep` over the demo tree finds
zero `@src/` imports outside the exempt `assets/docs/*.md` reference pages. That is the negative
proof, and it is worth recording as a genuine strength.

`verbatimModuleSyntax` (edict 8): **clean.** Lines 21, 32, 33 are all `import type`. No violation.

---

## 3. Defects

### L-0 · BLOCKER · `<Button variant="…">` is a dead prop against glass-ui 7 — the declared hierarchy never renders

glass-ui 7.0.0's Button has **no `variant` prop**. Its visual axis is `emphasis`, orthogonal to
`tone`:

`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:4`
```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";

export interface ButtonProps extends PrimitiveProps {
    /** Visual priority. It does not change the command's semantics. */
    emphasis?: ButtonEmphasis;
    /** Semantic intent, orthogonal to emphasis. */
    tone?: Tone;
    size?: ButtonSize;
    iconOnly?: boolean;
    loading?: boolean;
    ...
}
```

The compiled chunk and the component stylesheet corroborate — the string `variant` does not occur at
all, and every rule keys off `[data-emphasis=…]`:

```
$ grep -o 'variant'  node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js | wc -l
       0
$ grep -o 'emphasis' node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js | wc -l
       6
$ grep -o 'data-emphasis[^ {,]*' node_modules/@mkbabb/glass-ui/dist/components/button/styles.css | sort -u
data-emphasis="primary"]
data-emphasis="quiet"]
data-emphasis="secondary"]
data-emphasis="text"]
$ grep -c 'audacious' node_modules/@mkbabb/glass-ui/dist/components/button/styles.css
0
```

All three Buttons in this file address the dead prop:

| line | written | read by glass-ui 7? |
|---|---|---|
| `GenerateControls.vue:158` | `variant="primary-audacious"` | **no** — not a prop; `audacious` is not a value anywhere in the package |
| `GenerateControls.vue:166` | `variant="ghost"` | **no** — not a prop; `ghost` is not an emphasis |
| `GenerateControls.vue:176` | `variant="ghost"` | **no** — idem |

Undeclared props fall through to `$attrs` and land on the DOM as inert literal attributes.
**All three buttons therefore render at glass-ui's default emphasis.** The comment at `:153-155` —
*"The one verb rides the deliberate-primary register (L6 rider — root vocabulary, no costume)"* —
describes an intent the code does not deliver. (`icon-only` at `:166,175` and `size="sm"` **are**
real props and do apply; only `variant` is inert.)

**The shipped screenshot is the confirmation.** In
`shots/safari-desktop-light/generate.png`, "Regenerate" and the two icon buttons beside it render at
**identical pale weight**. That is exactly what three default-emphasis buttons look like; a `primary`
emphasis would be a filled, saturated pill carrying the plate's one deliberate verb. The declared
hierarchy — one audacious primary flanked by two ghosts — is not on screen. This is a defect no code
read alone produces, and it is why §L-8's "graceful wrap" reads as dead space: the verb cluster has
no visual weight to anchor it.

**Blast radius — repo-wide, not local.** The Glass 6→7 rename (`variant` → `emphasis` + `tone`)
landed in the producer and never landed in the consumer:

```
$ grep -rn '<Button' -A4 demo/ | grep 'variant=' | wc -l
      51
$ grep -rn '<Button' -A4 demo/ | grep 'variant=' | sed 's/.*variant=/variant=/' | sort | uniq -c | sort -rn | head -3
  16 variant="ghost"
  15 variant="outline"
   2 variant="primary-audacious"
$ grep -rln 'emphasis=' demo/ | wc -l
       2
```

**51** Button call sites on the dead API; **2** on the live one (`demo/palettes/PalettesPane.vue:113`,
`demo/palettes/browser/admin/AdminUsersPanel.vue:174`). Neither `ghost` nor `outline` is a valid
glass-ui 7 emphasis name either, so even a mechanical `variant`→`emphasis` rename would not be
correct — the *values* need remapping too.

**Why every gate missed it.** The demo typecheck is green with all 51 sites present:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
(exit 0, no output)
```

Fallthrough attrs are not a type error, and an inert attribute is not a runtime error. W44's
"Glass 7.0.0 ADOPTED WHOLE — GREEN-WITH-RESIDUALS" is green *over* a silent contract break.

**The detail that explains the epidemic — glass-ui 7 is internally inconsistent.** Slider and Badge
*kept* `variant`; only Button moved to `emphasis`:

```
$ grep -n 'SliderVariant' node_modules/@mkbabb/glass-ui/dist/components/slider/types.d.ts
4:export type SliderVariant = "standard" | "spectrum";
```
Badge `VARIANT` keys: `default | secondary | outline`.

So this file's `Slider variant="spectrum"` (`:299`) and `Badge variant="secondary"` (`:150`) are
**correct**, sitting a handful of lines from three that are not. No author could have inferred the
difference from the call sites, and no tool told them.

**Mechanism:** a design-system prop contract enforced by neither the type system nor the runtime.
The producer may rename any prop and every consumer keeps compiling and keeps rendering *something*
— which is worse than breaking, because it is invisible.

**Cure — producer-first, and it belongs in the Glass 8 gate (G-3).** A 51-site consumer sweep is the
*symptom* fix and will rot on the next rename. glass-ui must make the contract non-optional: close
`ButtonProps` to unknown attributes, or assert in dev when a `variant` attr reaches a Button root.
Acceptance: `<Button variant="ghost">` **fails** — at typecheck or first render — reproducibly in CI.
Only then is the consumer sweep worth doing. Secondarily, glass-ui should reconcile its own axis
naming across Button/Slider/Badge, since the inconsistency is what made 51 sites wrong by default.

---

### L-1 · BLOCKER · The save seam drops the palette name — live data loss

`GenerateControls.vue:48-50` declares a two-payload contract and honours it at `:102-104`:

```ts
const emit = defineEmits<{ save: [colors: string[], name: string] }>();
function save() { emit("save", [...palette.value], paletteName.value); }
```

Its sole consumer, `demo/workbenches/generate/GeneratePane.vue:16-21`, declares a **one-parameter**
handler and hard-codes the name:

```ts
function onSave(colors: string[]) {                       // `name` never bound
    const paletteColors: PaletteColor[] = colors.map(...);
    pm.createPalette("Generated Palette", paletteColors); // literal, not the emit payload
}
```

TypeScript permits a narrower handler arity, so nothing fails at build. The in-file comment at
`GenerateControls.vue:44-47` asserts the wire exists — *"the save carries the plate's own name …
The pane's `createPalette` name-wire is its owner's one-liner … this emit is already truthful"*.
The emit is truthful; the wire was never landed.

**Reproduction (executed, live, against `http://localhost:9000/#/generate`):** typed
`PROBE-NAME-XYZ` into the plate title, clicked Save, read `localStorage`:

```json
{ "typedName": "PROBE-NAME-XYZ",
  "hits": [ { "key": "color-palettes", "hasProbeName": false, "hasHardcoded": true,
              "sample": "{\"version\":1,\"palettes\":[{\"id\":\"785315be-…\",\"name\":\"Generated Palette\",\"slug\":\"generated-palette-5fd9d37c\",…" } ],
  "restored": true }
```

The typed name is absent; the literal is persisted, and the slug is minted from the literal.
(The probe snapshotted and restored `localStorage`; no state was left behind.)

Second-order consequence: `demo/palettes/usePaletteStore.ts:66-77` de-dupes on
`name.toLowerCase() === name && colorsMatch(...)`. With a constant name, every generate-save enters
the library under one indistinguishable title — the palette browser cannot tell two saves apart by
name, only by swatches.

**Mechanism:** the concept "the name of the thing being saved" has two homes — a `ref` inside the
child (`:52`) and a string literal inside the parent — and the seam that was supposed to join them
is a Vue emit whose payload the parent is free to ignore silently.

**Cure — CURABLE NOW (lands in `GeneratePane.vue`, outside the pin):** bind the second parameter.
The *idiomatic* cure is the transposition in §5: the name belongs in a provided generate-session,
where there is no seam to drop it across.

---

### L-2 · MAJOR · `demo/ui/**` is nineteen pure re-export shims — the forbidden alias layer

Every one of the nineteen directories under `demo/ui/` is a single `index.ts` containing nothing but
a re-export from `@mkbabb/glass-ui`. Classified mechanically:

```
$ for d in demo/ui/*/; do … done
SHIM alert   SHIM avatar   SHIM badge    SHIM button   SHIM card
SHIM checkbox SHIM collapsible SHIM dialog SHIM dropdown-menu SHIM input
SHIM label   SHIM popover  SHIM radio-group SHIM select  SHIM separator
SHIM skeleton SHIM slider  SHIM switch   SHIM tooltip
```

```ts
// demo/ui/select/index.ts — the entire file
export { Select, SelectTrigger, SelectItem, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectSeparator } from "@mkbabb/glass-ui";
```

Zero real components remain in `demo/ui/`. This is the shadcn-vue tree after the glass-ui migration,
kept alive as an alias surface — precisely what the standing edict forbids: *"Never add
legacy-compat shims; migrate the consumer to the new API at the root."* The migration stopped one
step short of the root.

The consumer-visible symptom is inside the subject file: **three different specifier registers for
one package in twelve lines** — `../../ui/select|slider|button|badge` (lines 4–12), the root barrel
`@mkbabb/glass-ui` (line 14), and the per-component subpath `@mkbabb/glass-ui/watercolor-dot`
(line 15). A reader cannot tell from the import block which of these is the sanctioned way to reach
the design system, because all three are in use simultaneously.

Census over the whole demo: 37 root-barrel imports vs. 15 `/dock`, 11 `/watercolor-dot`, 9 `/dark`,
9 `/aurora`, 8 `/dom`, … — the subpath register is already the majority idiom by site count; the
shim register is the outlier that keeps the root barrel alive.

**Reproduction:** the classification loop above; `cat demo/ui/*/index.ts`.

**Cure — CURABLE NOW for the other 10 consumers, BLOCKED-ON-GLASS-V8 for this file:** delete
`demo/ui/` entirely and rewrite the 11 consuming files onto `@mkbabb/glass-ui/{select,slider,button,badge,card}`
— glass-ui 7.0.0 publishes every one of those subpaths (verified in its `exports` map). This file's
four lines cannot move until the pin lifts.

---

### L-3 · MAJOR · Cross-feature edge: the generate workbench reaches into the palettes feature

Line 16 and line 21:

```ts
import { PaletteColorStrip } from "../../palettes/browser/card";
import type { PaletteColor } from "../../palettes/types";
```

`workbenches/generate` → `palettes/browser/card` is a **feature → feature** edge into another
feature's card cluster, whose own barrel header describes it as *"palette-browser · card cluster"*.
The generate workbench does not traffic in the palettes domain: `useColorGeneration` produces
`string[]` (`generate-color.ts` returns `string[]`). The only reason `PaletteColor` appears here is
the adapter at `:55-57`:

```ts
const stripColors = computed<PaletteColor[]>(() =>
    palette.value.map((css, i) => ({ css, position: i })),   // `position` is invented, never read
);
```

`position` is fabricated to satisfy a foreign type that the strip never uses — `PaletteColorStrip.vue`
reads only `.css` and `.weight`. The adapter is pure boundary tax.

`PaletteColorStrip` has consumers in **three** places across **two** features:

```
$ grep -rln PaletteColorStrip demo/
demo/palettes/browser/card/PaletteCard/PaletteCard.vue
demo/palettes/browser/card/index.ts
demo/palettes/browser/index.ts
demo/palettes/types.ts
demo/workbenches/generate/GenerateControls.vue
demo/workbenches/mix/MixSourceSelector.vue
```

A component consumed by two workbenches *and* the palettes catalog is a **shared color primitive
misfiled inside one feature's card cluster**. Its correct home is `demo/color-session/color-chips/`,
beside `PreviewStrip` — the module whose header already declares itself *"ONE focused common module
for the multi-feature chip grammar, never a per-pane copy."* The strip family is split across two
homes for no reason other than which feature happened to write each half first.

**Mechanism:** unique semantic ownership violated — "render an ordered set of colors as adjacent
bands" has two homes (`PaletteColorStrip`, weighted, full-bleed; `PreviewStrip`, capped, chip-sized),
one filed under a feature and one under the shared layer, and this component imports **both**.

**Cure — CURABLE NOW for the move, BLOCKED-ON-GLASS-V8 for this file's two import lines:** move
`PaletteColorStrip.vue` to `demo/color-session/color-chips/`, retype it on
`readonly string[]` + optional `weights?: number[]`, and let the *palettes* feature do the
`PaletteColor[] → string[]` adaptation at its own edge (it is the only consumer that has a
`PaletteColor[]` in hand). The `stripColors` adapter and the `palettes/types` import then vanish
from this file, and the strip family lives in one place.

---

### L-4 · MAJOR · The library owns no palette generation; the demo owns 240 lines of it

`demo/color-session/generate-color.ts` is pure library-shaped code: no Vue, no DOM, no reactivity,
deterministic under an explicit seed, and its only outside calls are three value.js primitives —
`oklch()`, `mapColorToGamut()`, `serializeCssColor()`. It ships ten calibrated OKLCh preset ranges,
six harmony algorithms (golden-angle, analogous, complementary, triadic, split-complementary,
random), a hue-range clamp, a seeded palette generator, and a single-color generator.

`src/` contains none of it:

```
$ grep -rli "harmony\|generatePalette\|mulberry" src/      →  (no output)
$ grep -rn  "mulberry32\|seedrandom" src/                  →  (no output)
$ cat src/subpaths/quantize.ts
export type { QuantizeIssue, QuantizeOptions, QuantizedColor } from "../quantize";
export { dominantColor, quantizePixels } from "../quantize";
```

Meanwhile `package.json` advertises the domain in its own keyword list:

```json
"keywords": ["css","value","color","color-space","easing","transform","quantization","palette","rgb","xyz","lab"]
```

The library claims **palette**; it ships only palette *extraction* (`quantize`). Palette *synthesis*
— the harder, more valuable, more reusable half — lives in the demo, where no consumer can reach it
and no published type describes it. This is the wrong direction of ownership: the demo exists to
*dogfood* the library, and instead it privately owns a capability the library should publish.

Two supporting measurements:

- **The core is fast and total.** 288,000 calls across all 10 presets × 6 harmonies × counts 1–12
  × 400 seeds: **zero throws**, 144 µs mean. It is production-grade math sitting in a demo folder.
- **It inverts the library's own failure contract.** `generatedCss` consumes three `Result`s and
  converts each into an exception (`throw new Error("Generated color is invalid: …")`). The library's
  own description is *"Immutable, **failure-explicit** …"*. The demo demonstrates the Result API and
  then throws it away at the one place it matters. The fuzz proves those throws are unreachable
  today — so they are dead defensive code, not a live hazard — but they are the wrong shape for code
  that should move into `src/`.

**Cure — CURABLE NOW (lands in `src/`, not the pinned file):** promote to `src/palette/` and publish
`@mkbabb/value.js/palette` — `generatePalette`, `generateSingleColor`, `GENERATION_PRESETS`,
`HARMONY_DEFS`, `PresetName`, `HarmonyName` — returning `Result<string[], …>` in the house idiom, with
`mulberry32` moving to `src/math`. `demo/color-session/generate-color.ts` then deletes entirely, and
`useColorGeneration` becomes a ~25-line reactive wrapper over a **published** subpath — which is what
a dogfood is supposed to look like.

---

### L-5 · MAJOR · The demo's proof of the public API is not a proof — `paths` shadows `exports`

The challenge asks whether this component reaches value.js "through the published subpath export
map, or through a deep path that only works because the demo shares the repo." The answer is worse
than either: it reaches through a **stale mirror of the export map that has drifted from it**, and
the mirror wins.

```
package.json#exports  (7 keys):  ./color  ./value  ./css  ./easing  ./math  ./transform  ./quantize
tsconfig.demo.json#paths (8 keys): .  /color  /parsing  /math  /easing  /units  /transform  /quantize
```

Three `paths` targets do not exist on disk:

```
$ ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
ls: dist/index.d.ts: No such file or directory
ls: dist/subpaths/parsing.d.ts: No such file or directory
ls: dist/subpaths/units.d.ts: No such file or directory
```

Two published subpaths (`/css`, `/value`) have **no** `paths` entry. And the five that overlap are
resolved by `paths` substitution, which means TypeScript **never consults the `exports` map for
them**. `tsc --traceResolution`, on two imports in the *same file* (`generate-color.ts`):

```
======== Resolving module '@mkbabb/value.js/color' from '…/demo/color-session/generate-color.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/color'.
Module name '@mkbabb/value.js/color', matched pattern '@mkbabb/value.js/color'.
Trying substitution './dist/subpaths/color.d.ts' … use it as a name resolution result.
   ← no "Entering conditional exports", no Package ID: the exports map was never read

======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/generate-color.ts'. ========
Found 'package.json' at '…/value.js/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
======== … resolved to '…/dist/subpaths/css.d.ts' with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

Two imports, two different resolution mechanisms, one file.

**The consequence is the exact failure mode this seat exists to find:** delete `"./color"` from
`package.json#exports` and the demo typecheck stays **green** — `paths` substitutes straight to the
`.d.ts` — while every real consumer of `@mkbabb/value.js/color` breaks at install time. The demo's
25 `/color` imports (the single most-used specifier in the tree) are therefore **not** a proof of the
published surface. `/css` and `/value` *are* real proofs, by accident, because nobody wrote them a
`paths` entry.

The file's own header asserts the opposite, in prose: *"TS `paths` needs an explicit per-subpath
entry — there is no `.../*` wildcard because the `exports` map is a CLOSED 8-key set."* The map is a
closed **7**-key set with **different names**. The comment is documentation of a state that no
longer exists.

`vite.config.ts` is the counter-example done right: `valueJsSelfAlias` is **generated** by reading
`package.json#exports` at config time, precisely so it "can never drift from the exports map." The
runtime half is drift-proof; the typecheck half is a hand-maintained copy that drifted.

**Cure — CURABLE NOW:** delete the `@mkbabb/value.js*` `paths` block entirely. Self-reference
resolution already works — the `/css` trace above proves it, with a real Package ID — so all seven
subpaths would resolve through the genuine `exports` map, and removing a subpath from `exports` would
turn the demo typecheck red, which is what a dogfood is *for*. If a `paths` block must survive for
some other reason, generate it from `package.json#exports` the way Vite does, in a
`tsconfig.demo.json` emitted by a script — never hand-written.

---

### L-6 · MINOR · Root-barrel reach for a verb the subpath map already publishes

Line 14 imports `writeClipboard` from the glass-ui **root barrel** (`dist/glass-ui.js`, 25,239 B).
The verb is published on a narrow subpath:

```
$ grep -o "writeClipboard" node_modules/@mkbabb/glass-ui/dist/dom.js
node_modules/@mkbabb/glass-ui/dist/dom.js:134:export { … a as writeClipboard };   # dist/dom.js = 4,179 B
```

Eight demo sites already import from `@mkbabb/glass-ui/dom`; all twelve `writeClipboard` sites — this
one included — go through the root. `sideEffects: ["*.css"]` means a production build can tree-shake
most of the difference, so this is a **dev-graph and legibility** cost rather than a proven shipped-bytes
cost; I did not measure a production bundle, and I am not claiming one. The legibility cost is real:
the same file reaches one glass-ui symbol by root barrel (line 14) and another by subpath (line 15),
two lines apart, with no rule distinguishing them.

**Cure — BLOCKED-ON-GLASS-V8 for this file** (one-line change to `@mkbabb/glass-ui/dom`);
CURABLE NOW for the other eleven sites.

---

### L-7 · MINOR · The count-slider thumb is a 12×24 tap target — producer-owned

The mega-tranche visual audit reports 5 small tap targets on `/#/generate` in **all four** matrices
(`REPORT.md:124,139,154,169`). Of those five, exactly **one** belongs to this component — I checked
rather than assumed:

```json
{ "w": 12, "h": 24, "tag": "span", "label": "Color count" }
```

Live confirmation, scoped to the plate's subtree at 1440×900:

```json
"small": [ { "tag": "span", "role": "slider", "w": 12, "h": 24, "aria": "Color count" } ]
```

12 CSS px wide against the WCAG 2.2 §2.5.8 24×24 minimum. This is the reka/glass-ui `Slider`
thumb under `variant="spectrum"` (`GenerateControls.vue:297-307`) — a **producer-owned** geometry,
not a consumer choice.

Correction to the report's own row, worth recording so the next seat does not repeat my first guess:
the `{w:160,h:23,tag:"input",label:""}` row on this route is **not** this component's palette-name
input. Measured live, that input is **398×31** with `aria-label="Palette name"` present; the probe
derives `label` from `getAttribute("aria-label") || textContent`, so a `""` label means the element
has no aria-label at all. The 160×23 nameless input is dock/slug chrome.

**Cure — BLOCKED-ON-GLASS-V8:** thumb hit-area ≥ 24×24 in glass-ui's `Slider` (an expanded
pseudo-element hit box preserves the 12 px visual). Nothing to change here.

---

### L-8 · MINOR · The plate chrome wraps at desktop; the comment says it wraps at 390

`GenerateControls.vue:138-142` documents the wrap as a small-screen behaviour: *"The row WRAPS
gracefully: name+count lead, the verb cluster rides `ml-auto` right — **at 390** the verbs settle
onto their own right-aligned line."*

Measured live at **1440×900** (desktop), child offsets within the chrome row:

```json
"chromeRow": { "width": 460, "height": 97, "kids": [
  { "tag": "input", "top": 10, "w": 398 },
  { "tag": "div", "cls": "badge-atom …", "top": 12, "w": 30 },
  { "tag": "div", "cls": "ml-auto flex items-center gap-2 shrink-0", "top": 47, "w": 233 } ] }
```

The verb cluster sits 35 px below the name row at full desktop width, because the pane's inner width
is 460 px, not the viewport's 1440. The desktop screenshot
(`shots/safari-desktop-light/generate.png`) shows the resulting two-line plate with dead space to the
right of the title. Not a rendering *fault* — the wrap is graceful, as designed — but the comment
describes a 390 px behaviour that is in fact the **default** behaviour, which will mislead the next
person who tunes this row.

**Cure — BLOCKED-ON-GLASS-V8** (the fix is a comment correction inside the pinned file, or a
`basis` retune; either way it waits).

---

### L-9 · INFO · The dropdown preview cost claim is true at count 5 and false at count 12

`:88-93` claims *"10 rows × 5-12 library generations is sub-millisecond."* Measured, on the bundled
generation core (node/V8, this machine):

| operation | ms |
|---|---:|
| one `generatePalette(count=5)` | 0.097 |
| one `generatePalette(count=12)` | 0.362 |
| preset dropdown open: 10 strips @ count=5 | **0.871** |
| harmony dropdown open: 6 strips @ count=5 | 0.699 |
| preset dropdown open: 10 strips @ count=12 | **2.80** |

The claim **holds at the default count 5** (0.871 ms) and **fails by 2.8× at count 12**. These are
desktop-V8 numbers; WebKit on the mobile matrix would be materially slower, putting a count-12
dropdown open into multi-frame territory.

Two structural notes behind the number, both real regardless of the timing:

1. `presetStops` / `harmonyStops` (`:94-100`) are **plain template function calls**, not `computed`s.
   Vue memoizes neither. Every re-render of the mounted `SelectContent` recomputes all sixteen
   strips from scratch.
2. `PreviewStrip` caps at seven segments (`STRIP_SEGMENT_CAP = 7`, a **private** constant in
   `PreviewStrip.vue`), so at count 12 the host pays to generate five colors the chip discards. The
   sibling RAMP form *does* publish its budget — `RAMP_SAMPLE_COUNT` is exported from
   `color-chips/sample.ts` and re-exported from the barrel. The chip module's public surface is
   asymmetric: the ramp tells hosts its budget, the strip hides it.

Note the cure is **not** "generate only 7" — `generateHues` for `analogous` derives its step from
`count`, so a 7-generation is not the prefix of a 12-generation, and truncating would break the
seed-exactness law the file rightly insists on. The cure is to **export the cap** so the host can
decide honestly, and to wrap the two truth functions in `computed`s keyed on
`(count, preset, harmony, seed)`.

---

### L-10 · INFO · "Palette stops → CSS rail" is hand-rolled in four places, and violates the chips module's own sampling law

`:65-73` builds the count-slider rail by handing raw stops to the CSS engine:

```ts
const countSliderGradient = computed(() => { … return `linear-gradient(to right, ${stops.join(", ")})`; });
```

`demo/workbenches/extract/composables/useExtractSession.ts:100-111` is a near-byte twin — same
`length === 0 → "var(--muted)"` guard, same `length === 1 ? 50 : (i/(len-1))*100`, same `.toFixed(0)`,
same join. Two more copies live at `demo/workbenches/mix/MixResultDisplay.vue:112` and
`demo/picker/controls/ComponentSliders/ComponentSliders.vue:195`. **Four implementations, one
concept, no owner.**

And the concept is one the shared layer has already legislated. `color-chips/sample.ts` states THE
SAMPLING LAW: *"ramps are k-sample discrete stops built from THE LIBRARY's `mixColors` interpolation
— **never** CSS `in <space>` gradient interpolation, because the preview must show what THE APP
computes, not what the browser's engine would … One mechanism for all rows, no engine divergence."*
The rail at `:65-73` is the forbidden mechanism, written eleven lines above an import of the module
that forbids it. (Strictly the law is scoped to the chip family, so this is a boundary-adjacent
violation rather than a flat one — hence INFO, not MAJOR — but the four-way duplication stands on its
own.)

The same four-copy pattern extends to the *markup*: `GenerateControls.vue:292-308` and
`ExtractControls.vue:18-34` are structurally identical — `relative flex-1 h-6 flex items-center`
wrapper, an `absolute inset-0 rounded-full overflow-hidden h-6` rail div, a
`Slider variant="spectrum" class="relative w-full"`, and a per-instance
`:style="{ '--slider-track-bg': 'transparent' }"`. That last line is a **per-instance override of a
design-system token**, which edict 5 forbids by name, and the whole idiom is a design-system
*primitive* living in two consumers, which edict 4 forbids by name. `--slider-track-bg` is
hand-overridden at four demo sites (`grep -rn slider-track-bg demo/`).

**Cure — BLOCKED-ON-GLASS-V8:** the rail belongs in glass-ui as a first-class affordance on the
existing `Slider` — a `track-gradient` prop (or a `spectrum` variant that accepts stops) — so no
consumer ever positions a div behind a slider or blanks a token per instance. Then both workbenches
delete their rail div, their `--slider-track-bg` override, and their gradient computed.

---

### L-11 · INFO · `.generate-swatch` is a per-component hook hand-added to two global lists that already carry the general seam

`GenerateControls.vue:205` sets `class="generate-swatch …"`, and the file has **no `<style>` block**
(`grep -c '<style' → 0`). The class's only rules live in `demo/styles/foundation.css` at `:689` and
`:834`, inside `@media (forced-colors: active)` and `@media print`:

```css
    .swatch-row > *,
    .generate-swatch,
    .shadow-swatch,
    .watercolor-swatch,
    [data-color-surface] {
        forced-color-adjust: none;
    }
```

Cross-cutting media rules *do* belong in a global sheet — that part is right, and edict 6 is not
violated (nothing was deleted). What is wrong is the shape: the selector lists are hand-maintained
enumerations of individual component class names sitting **beside** `[data-color-surface]`, the
attribute hook that already expresses the general concept ("this element paints meaningful color;
neither forced-colors nor print may repaint it"). Because this component's swatches do not carry that
attribute, two more class names had to be appended to two separate global lists — and the next
color-painting component will require a third append.

**Cure:** have the `WatercolorDot` carry `data-color-surface` (a producer one-liner, since the dot is
a glass-ui primitive). Both global lists then shrink to the attribute selector alone and
`.generate-swatch` deletes — along with `.shadow-swatch` and `.watercolor-swatch`.

---

### L-12 · INFO · The composable's docstring cites an alias W43 deleted

`demo/workbenches/generate/composables/useColorGeneration.ts:8`

> the pure generation math … RELOCATED DOWN to the shared color layer
> (`@composables/color/generate-color`)

`@composables` no longer exists. `tsconfig.demo.json:32-34` records the kill: *"the demo `@…` path
aliases were killed … No `@styles`/`@components`/`@utils`/`@lib`/`@composables`/`@assets` project
alias survives."* The real import two lines below is `../../../color-session/generate-color`. A
reader tracing the cited path finds nothing.

Trivial in isolation; worth recording because it is the same failure class as §L-5's stale `paths`
comment and §L-8's stale wrap comment — **three separate prose assertions in this component's closure
that document a state which no longer exists**. The component is heavily commented, and the comments
are load-bearing for the next author; their decay rate is itself a structural risk here.

---

## 4. God modules and the untyped verb chain

`GenerateControls.vue` at 311 lines is **not** a god module by mass, and its composable
(`useColorGeneration.ts`, 43 lines) is genuinely focused — the U-F47 relocation that pushed the pure
math down to the shared layer was the right call and is documented honestly. Credit where due.

The real dual-path defect on this axis is the **verb dispatch chain**, which crosses four hops and
loses its types twice:

```
GenerateControls.vue:115   defineExpose({ regenerate, save, copyColors })
        ↓
GeneratePane.vue:23-27     defineExpose({ regenerate: () => controlsRef.value?.regenerate?.(), … })
        ↓
App.vue:317                const generatePaneRef = ref<any>(null)
        ↓
usePaneRouter.ts:108       export interface PaneActionRefs { generate: Ref<any>; … }
        ↓
usePaneRouter.ts:196-198   handler: () => paneRefs.generate.value?.regenerate?.()
```

`any` at two declared points, and **two** optional-call operators per verb (`?.regenerate?.()` and
`controlsRef.value?.regenerate?.()`). Rename `regenerate` anywhere in the chain and the dock button
silently no-ops — no type error, no runtime error, no console warning. That is a masking fallback in
the sense edict 2 forbids: the `?.` on the *method* (as distinct from the instance) exists only to
swallow a contract mismatch.

The same three verbs are also rendered inline on the plate (`:157-184`), so one concept — "regenerate
this palette" — has a declarative path and an imperative path, and only the imperative one can break
silently.

---

## 5. Greenfield lattice — what I would build today

Stated concretely, no hedging. Four moves, in dependency order:

**1 — `@mkbabb/value.js/palette` (new published subpath).** `src/palette/{presets,harmony,generate}.ts`,
`src/math/prng.ts`. Result-returning, Vue-free, seeded. Deletes
`demo/color-session/generate-color.ts` and `demo/color-session/prng.ts`. The library finally ships
the "palette" it has advertised in its keywords since 4.0.0, and the demo's use of it becomes a real
dogfood instead of a private copy. (§L-4)

**2 — `tsconfig.demo.json` loses its `@mkbabb/value.js*` `paths` block.** Self-reference through
`package.json#exports` becomes the *only* resolution path, so the demo typecheck goes red the moment
the published surface changes. Drift becomes structurally impossible instead of merely discouraged,
matching what `vite.config.ts` already achieves at runtime by generating its aliases. (§L-5)

**3 — `demo/ui/` deleted; `color-chips` absorbs the strip family.** Eleven consumers rewritten onto
`@mkbabb/glass-ui/{select,slider,button,badge,card}`. `PaletteColorStrip` moves to
`demo/color-session/color-chips/`, retyped on `readonly string[]` + optional `weights`, joining
`PreviewStrip` and `PreviewRamp` under one barrel with one exported budget constant per form. The
rail idiom leaves the demo entirely for a glass-ui `Slider` affordance. After this, `demo/` reaches
the design system through exactly one register — the subpath — and the phrase "color strip" has
exactly one home. (§L-2, §L-3, §L-6, §L-10)

**4 — the verb chain inverts into a provided session.** `useGenerateSession()` (preset, harmony,
count, seed, **name**, palette, `regenerate()`, `save()`, `copyColors()`) is provided at
`GeneratePane` under a typed `InjectionKey`. The dock's action bar injects it and calls the verbs
directly. `GenerateControls` becomes pure presentation with no `defineExpose`; `GeneratePane` needs
no `controlsRef` and no relay; `App.vue`'s three `ref<any>` pane refs and `PaneActionRefs`'
`Ref<any>` all delete. The typed contract replaces four hops of optional calls — **and L-1 cannot
recur, because there is no seam left for the name to fall through.** The `save` verb reads the name
from the same session object that the input writes.

**5 — the design-system boundary becomes a *checked* boundary.** Moves 1–4 all assume that when this
tree names a glass-ui prop, the name is real. §L-0 proves that assumption is currently false in 51
places. So the lattice needs one more property, and it is the cheapest of the five: glass-ui's
components close their prop surface (or assert on unknown attrs in dev), so a stale prop name is a
build failure rather than an inert DOM attribute. Without this, every future producer rename
re-creates §L-0 silently, and the "one register, one home" discipline of moves 1–4 buys legibility
without buying correctness.

Move 4 is the one that pays for itself three times: it is simultaneously the elegance fix (one
declarative contract replacing an untyped imperative chain), the correctness fix (the name-drop
becomes unrepresentable), and the performance fix (session-level `computed`s replace per-render
template function calls, §L-9).

Note the through-line across moves 2, 5 and §L-0/§L-5: **three of this component's most serious
defects are the same defect** — a boundary asserted in prose and mirrored by hand, where the mirror
is allowed to drift from the thing it mirrors (`paths` vs `exports`; `variant=` vs `ButtonProps`;
`demo/ui/` vs glass-ui). Every one of them is cured by the same move: derive or enforce the mirror,
never maintain it. `vite.config.ts:41-50` already does this correctly for one of the three, and its
own comment states the principle — *"GENERATED (not hand-rolled) so the alias set can never drift."*
That is the architectural lesson this component is teaching, and it generalises well past it.

---

## 6. Wave — BLOCKED-ON-GLASS-V8

Per the CARRY-LEDGER §D BJ W4 hold, **no edit to `GenerateControls.vue` is authored here.** The
wave below states the release condition exactly.

**Release condition (verbatim):** *Glass 8 proves source-to-served identity for the pinned consumer
set — the gh-pages prod-preview mounts non-empty and the served `GenerateControls` bundle is
byte-derivable from source at
`4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` — at which point the pin lifts
and the consumer-side items below may land in one commit.*

**Blocked on the pin (inside `GenerateControls.vue`):**

| id | change | lines |
|---|---|---|
| L-2c | four `../../ui/*` shim imports → `@mkbabb/glass-ui/{select,slider,button,badge}` | 4–12 |
| L-3c | drop `PaletteColorStrip` + `PaletteColor` cross-feature imports; consume the relocated strip on `string[]`; delete the `stripColors` adapter | 16, 21, 55–57, 135 |
| L-6c | `writeClipboard` → `@mkbabb/glass-ui/dom` | 14 |
| L-8c | correct the wrap comment (or retune `basis-[10rem]`) to the measured desktop behaviour | 138–142 |
| L-9c | `presetStops`/`harmonyStops` → `computed` maps; consume an exported `STRIP_SEGMENT_CAP` | 94–100 |
| L-10c | delete the rail div + `--slider-track-bg` override; consume the glass-ui `Slider` track-gradient affordance | 65–73, 292–308 |
| L-0c | `variant="primary-audacious"` → `emphasis="primary"` (+ `tone` if the audacious register survives as a tone); both `variant="ghost"` → `emphasis="quiet"` | 158, 166, 176 |
| L-11c | drop `.generate-swatch` once the dot carries `data-color-surface` | 205 |

**Blocked on glass-ui itself (producer side, gates the above):**

- **G-1** `Slider` thumb hit-area ≥ 24×24 CSS px under `variant="spectrum"` (§L-7).
- **G-2** `Slider` gains a first-class gradient-track affordance so no consumer positions a rail div
  or blanks `--slider-track-bg` per instance (§L-10).
- **G-3** **`Button`'s prop contract becomes enforced, not advisory** (§L-0). Acceptance: a call site
  written `<Button variant="ghost">` **fails** — at typecheck or at first render — and the failure
  reproduces in CI. Until this holds, the 51-site consumer sweep is 51 blind edits that rot on the
  next rename. Secondary: reconcile the axis naming across Button (`emphasis`) / Slider (`variant`) /
  Badge (`variant`), since that inconsistency is what made 51 sites wrong by default.
- **G-4** `WatercolorDot` carries `data-color-surface`, retiring the per-component entries in
  `foundation.css`'s two forced-colors/print lists (§L-11).

**Ranking note for the executing wave:** G-3 gates the largest single correctness item in this
report and is cheap on the producer side (one prop-type change plus a dev assertion). It should be
sequenced **first** among the glass-ui obligations — G-1 and G-2 are ergonomic improvements, G-3 is
the one that stops a whole class of silent breakage across 51 sites and every future rename.

**Not blocked — may land now (outside the pin):**

- **L-1** bind the emitted `name` in `GeneratePane.vue:16-21`. *This is a live user-data loss and
  should not wait for Glass 8.*
- **L-5** delete the `@mkbabb/value.js*` `paths` block from `tsconfig.demo.json`, or generate it.
- **L-4** promote the generation core to `src/palette/` + `@mkbabb/value.js/palette`.
- **L-2/L-3/L-6** for the ten other consumers and the strip relocation itself.

---

## 7. Negative results — recorded so the next seat need not re-run them

- **No demo→`src/` deep import** exists in this file or its closure. The T.W1 keystone holds.
- **`verbatimModuleSyntax` is clean** in this file (lines 21, 32, 33 all `import type`).
- **No `useLayerTransition`-style local reimplementation** here; no `usePaletteExport` /
  `export/serializers` duplication (this component does not export); no `useDark` triplication in
  this closure.
- **The generation core does not throw in practice** — 288,000 seeded calls, 0 throws. The
  `throw`-in-`computed` hazard I hypothesised is disproven; the throws are dead code, not a live risk.
- **The visual audit is otherwise green for this route** — 0 page errors, 0 console errors,
  0 horizontal overflow, 0 nameless buttons, `main` count 1, in all four matrices
  (`REPORT.json`, `results[route="/#/generate"]`).
- **`reka-ui` is a declared dependency** (`^2.9`), so the `AcceptableValue` type import at line 33 is
  not an undeclared-dependency defect.
- **`Slider variant="spectrum"` (`:299`) and `Badge variant="secondary"` (`:150`) are VALID
  glass-ui 7 props** — do **not** "fix" these alongside §L-0. Verified against the shipped types:
  `SliderVariant = "standard" | "spectrum"` (`dist/components/slider/types.d.ts:4`) and Badge's
  `VARIANT` keys are `default | secondary | outline`. Only **Button** dropped `variant` for
  `emphasis`. A blanket `variant`→`emphasis` sweep would break both of these.
- **The value.js consumption in this cone is genuinely correct.** Verified across all nine files in
  the closure: zero `@src/*`, zero `../src/` reaching. The only value.js specifiers used are
  `@mkbabb/value.js/color` and `@mkbabb/value.js/css` — both real `package.json#exports` keys, both
  resolving under bare Node (`await import(…)` → `RESOLVED` for each). A real consumer could write
  these two imports verbatim. §L-5 is a defect in the *typecheck path*, not in the specifiers this
  component actually writes.
- **`WatercolorDot`'s deep subpath import is necessary, not gratuitous** — it is genuinely absent
  from the root barrel (`grep -c WatercolorDot dist/index.d.ts` → `0`), so
  `@mkbabb/glass-ui/watercolor-dot` (`:15`) is the only way to reach it. Contrast §L-6, where the
  root barrel *was* avoidable.
- **`vue-tsc -p tsconfig.demo.json --noEmit` exits clean (0 output).** Recorded as a measurement, not
  a reassurance: it is green *with* 51 dead-prop Button sites and *with* three phantom `paths`
  entries. On this component's two largest findings the demo typecheck has no opinion.

---

## Appendix — commands run

```bash
shasum -a 256 demo/workbenches/generate/GenerateControls.vue
node -e "…package.json exports keys…"                       # 7 keys, no '.'
ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts   # all 3 missing
npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep -A6 "value.js/(css|color)'"
for d in demo/ui/*/; do … done                              # 19/19 SHIM
grep -rln PaletteColorStrip demo/ ; grep -rln PreviewStrip demo/
grep -rho '"@mkbabb/glass-ui[a-z/-]*"' demo/ | sort | uniq -c | sort -rn
grep -rli "harmony\|generatePalette\|mulberry" src/         # no output
grep -rn  "slider-track-bg" demo/                           # 4 override sites
grep -rn  "linear-gradient(to right" demo/                  # 4 rail copies
npx esbuild demo/color-session/generate-color.ts --bundle --format=esm --platform=node --outfile=$S/gen.mjs
node $S/fuzz.mjs      # 288000 calls / 0 throws / 144.1 µs mean
node $S/bench.mjs     # 0.871 ms @count=5 ×10 rows · 2.80 ms @count=12 ×10 rows
```

Live probes (Playwright, WebKit, `http://localhost:9000/#/generate`, `localStorage` snapshot+restore):
plate geometry / chrome-row wrap offsets / scoped tap targets; save-name reproduction.

Images read: `shots/safari-desktop-light/generate.png`, `shots/safari-mobile-dark/generate.png`.

Second pass (§L-0, §L-11, §L-12) — glass-ui contract verification:

```bash
cat node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts      # emphasis|tone, NO variant
grep -o 'variant'  node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js | wc -l   # 0
grep -o 'emphasis' node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js | wc -l   # 6
grep -o 'data-emphasis[^ {,]*' .../components/button/styles.css | sort -u          # 4 emphasis values
grep -c 'audacious' .../components/button/styles.css                               # 0
grep -n 'SliderVariant' .../components/slider/types.d.ts                           # standard|spectrum (VALID)
grep -n -A12 'declare const VARIANT' .../components/badge/index.d.ts               # default|secondary|outline (VALID)
grep -rn '<Button' -A4 demo/ | grep 'variant=' | wc -l                             # 51 dead-prop sites
grep -rln 'emphasis=' demo/ | wc -l                                                # 2 live-API sites
npx vue-tsc -p tsconfig.demo.json --noEmit                                         # exit 0, no output
node --input-type=module -e "await import('@mkbabb/value.js'|'/css'|'/color'|'/parsing'|'/units')"
    # root/parsing/units → ERR_PACKAGE_PATH_NOT_EXPORTED; css/color → RESOLVED
grep -rn 'generate-swatch' demo/                    # 1 consumer, 2 global rule lists
grep -rl '\.\./demo/' test/*.ts | wc -l             # 10 of 22 library test files reach into demo/
```

**Probe abandoned, recorded for honesty:** I attempted an independent live re-confirmation of the
§L-1 save-name loss, but the shared Playwright MCP browser was being driven concurrently by parallel
audit seats — my tab was navigated to `#/mix` and `#/gradient` mid-evaluation, and one read returned
`hash: "#/mix"` while I was asserting against `#/generate`. I discarded the run rather than report
contaminated telemetry, and in particular I do **not** claim the "`/#/generate` redirects to `/#/`"
behaviour I briefly observed — that was almost certainly another seat's navigation, not a defect.
§L-1 stands on the prior seat's clean `localStorage` reproduction plus the static evidence
(`GeneratePane.vue:16-21` never binds the second emit parameter), neither of which needs a browser.

---
---

# §8 — PASS 2 (independent re-audit, 2026-07-27, repo HEAD `9bcd5d91`)

## 8.0 Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared for this seat. Declared, not inherited.

This is a second, independently-conducted CHALLENGE-L pass on the same component. I read the
pass-1 report only **after** completing my own trace, so §8.2's confirmations are genuine
independent replications, not restatements. Where pass 1 was right I say so and do not re-argue
it. Where I add, I add.

## 8.1 Pin re-verification at a later HEAD

```
$ git rev-parse HEAD
9bcd5d91d22ae660e9c56bb881d1d91358c55abd

$ shasum -a 256 demo/workbenches/generate/GenerateControls.vue
4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6  demo/workbenches/generate/GenerateControls.vue

$ git log --oneline c654824e..HEAD -- demo/workbenches/generate/
(empty)
```

**Pin still EXACT; still zero drift**, now re-verified across the commits that landed since pass 1.

One coordination note (INFO, not actionable by this seat): the hold's own authority line —
`CARRY-LEDGER.md:61-62`, *"Against Value authority `c654824e0b252cda7f8490b67f182a48c48cc0ed`"* —
and this seat's brief both name `c654824e`, while HEAD is now `9bcd5d91`. The intervening commits
touch only `docs/tranches/V/megatranche/**`; no `demo/`, `src/`, `api/`, `test/` or `e2e/`
movement. The authority SHA should be re-pinned at the next ledger touch so "against authority X"
keeps meaning something.

---

## 8.2 NEW · **L2-1 · BLOCKER** — the five per-swatch copy verbs do not exist in the product

Pass 1 found that `<Button variant="…">` is inert (§L-0). **The same disease has a third member,
and this one is not cosmetic — it is a whole interaction that is absent.**

### Consumer belief

`GenerateControls.vue:199-208`:

```vue
<WatercolorDot
    v-for="(css, i) in palette" :key="i" :color="css"
    tag="button"
    :seed="`gen-${css}-${i}`"
    class="generate-swatch w-9 h-9 sm:w-10 sm:h-10 … focus-visible:outline-none"
    :aria-label="`Copy ${css}`"
    @click="copyColor(css)"
/>
```

The comment at `:194-197` states the intent explicitly: *"the button stays the copy-verb seat
(`tag="button"`), the dot its organic face."* `:110-113` implements `copyColor`.

### Producer truth — glass-ui 7.0.0

`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`:

```ts
type __VLS_Props = {
    color: string;
    variant?: "solid" | "ghost";
    animate?: boolean;
    cycleDuration?: number;
    range?: [number, number];
    seed?: string;
};
```

**No `tag`. No emits.** And the shipped chunk is not merely indifferent to the extra attributes —
it actively suppresses them:

```
$ grep -o "inheritAttrs" node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js
inheritAttrs
$ grep -o 'aria-hidden[^,]\{0,20\}' node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js | head -3
aria-hidden": "true"
aria-hidden": "true"
aria-hidden": "true"
```

`inheritAttrs: false` + a hardcoded `aria-hidden="true"`. The dot is, by the producer's deliberate
design, a **decorative** element.

### Measured DOM (`/#/generate`, first `.generate-swatch`)

```json
{ "tag": "SPAN",
  "attrs": ["data-v-292b9032=", "aria-hidden=true",
            "class=generate-swatch w-9 h-9 sm:w-10 sm:h-10 ",
            "data-testid=watercolor-swatch", "data-variant=solid",
            "style=background-color: oklch(0.763646 0.15888…"] }
```

No `tag`, no `aria-label`, no `role`, no `tabindex`. The consumer's `aria-label` was swallowed with
everything else, and the element it would have named is `aria-hidden` regardless.

### Measured behaviour — the verb is dead, with a positive control

```json
// swatch.focus()
{ "matchesFV": false, "isActiveEl": false }

// swatch.click()  vs  the plate's "Copy all colors" button, same probe,
// navigator.clipboard.writeText patched to record calls
{ "afterSwatchClick": [],
  "afterCopyAllClick": ["oklch(76.364581747912% 0.158887496259 78.538275305182deg), o…"] }
```

Clicking a swatch produces **zero** clipboard writes. The control produces one, so the probe
instrumentation and `writeClipboard` are both live. The plate's complete focusable set:

```json
["INPUT:Palette name", "BUTTON:Regenerate", "BUTTON:Save palette", "BUTTON:Copy all colors"]
```

Five swatches, **zero** reachable — by pointer, by keyboard, or by assistive technology.

There is no other per-colour affordance on this pane. **Copying a single generated colour is not a
feature of this product**, contrary to the code, the comments, and the T-54/WR-6 lane record.

### Why every gate is green over it

| gate | measurement | why it is blind |
|---|---|---|
| demo typecheck | `npx vue-tsc -p tsconfig.demo.json --noEmit` → `EXIT=0`, 9.2 s | Vue permits arbitrary fallthrough attrs at the type level. Identical mechanism to §L-0. |
| O-20 oracle | `e2e/smoke/oracles/o20-generate-plate.spec.ts:97-105` | locates `.generate-swatch` and asserts only `getComputedStyle(el).backgroundColor`. The colour is right; the verb is never exercised. |
| mega-tranche visual audit | `REPORT.json` generate rows: `namelessButtons: 0`, `smallTapTargets` = shell chrome + slider thumb only | `capture.mjs:88-98` selects `a,button,input,…,[tabindex]:not([tabindex="-1"])`. An `aria-hidden` `<span>` is in none of those sets. |

**This last point amends a pass-1 negative result.** §7 records *"0 nameless buttons"* among the
route's clean signals. That number is not evidence of a11y health here: the swatches are not
buttons at all, so the probe cannot see them. A zero from a probe that cannot observe the element
is not a pass.

### Mechanism (same family as §L-0, one rung worse)

§L-0: a stale **style** prop → the wrong emphasis renders.
L2-1: a stale **structural** prop → the element is the wrong element, and the behaviour attached
to it never attaches.

Three sites in one 312-line file now address glass-ui 7 through props it does not declare
(`variant` ×3 at `:158,166,176`; `tag` ×1 at `:202`), while `Slider variant="spectrum"` and
`Badge variant="secondary"` in the same file are correct. No author could infer the difference and
no tool reports it. **This is not a Button problem. It is a producer-surface problem, and L2-1 is
the proof that its consequences reach past aesthetics into function.**

### Cure — architectural, and it strengthens §6's G-3

The dot is decorative and should stay decorative; the verb seat belongs to the consumer:

```
<button aria-label="Copy …" @click="copyColor(css)">      ← consumer owns role, name, focus, hit area
    <WatercolorDot :color="css" :seed="…" />               ← producer owns the organic face
</button>
```

This is also the only arrangement that honours T-28's outline law honestly: the *button* carries
the ring at the silhouette; the dot never does. Under the hold this is a **Glass 8 acceptance
row**, because the alternative — glass-ui ships a typed polymorphic root (`as`/`tag`) plus a
declared `click` emit — is a producer decision that must be taken before any consumer edit.

**§6's gate G-3 must be widened**: the acceptance test cannot be *"`<Button variant="ghost">`
fails"* alone. It must be *"any attribute reaching a glass-ui component root that is not in that
component's declared prop surface fails — at typecheck or at first render — reproducibly in CI."*
Narrowed to Button, G-3 would have shipped L2-1 untouched.

---

## 8.3 UPGRADE · **L2-2 · MAJOR** (was §L-10, INFO) — the duplicated ramp track diverged exactly at the WCAG cure

Pass 1 recorded *"'palette stops → CSS rail' is hand-rolled in four places"* as INFO. Measurement
lifts it: **the two copies are not equivalent, and the difference is the accessibility fix.**

| | copy A — extract | copy B — generate |
|---|---|---|
| gradient builder | `useExtractSession.ts:101-112` `kSliderGradient` | `GenerateControls.vue:65-73` `countSliderGradient` |
| markup | `ExtractControls.vue:20-33` | `GenerateControls.vue:292-307` |
| contrast ring | `boxShadow: inset 0 0 0 1.5px ${trackInk}` (`:22`) | **absent** |
| O-18 census hook | `data-o18="extract-k-rail"` + `extract-kc` | **absent** |

The builders are the same algorithm line for line — `pct = n === 1 ? 50 : (i/(n-1))*100`,
`.toFixed(0)`, `linear-gradient(to right, …)`, `"var(--muted)"` empty fallback. `:284-285` says so:
*"the extract k-slider pattern verbatim."*

**Measured**, live `/#/generate` rail element:

```json
{ "railBoxShadow": "none", "railRect": { "w": 434, "h": 24 },
  "railInlineBg": "background: linear-gradient(to right, oklch(0.63947 0.110159 190.777) 0%, …)" }
```

`boxShadow: none`. The T-44a cure — `ExtractControls.vue:59-64`, *"the track re-inks with the
CONTRACT: the live pick certified against its rung at the WCAG 1.4.11 graphics floor (the O-18
graphics leg is its born-RED gate)"* — exists on one copy only.

**The oracle split with the code:**

```
$ grep -n 'data-o18' e2e/smoke/oracles/o18-contrast-census.spec.ts
…:1106  page.locator('[data-o18="extract-kc"] .slider-track')
…:1126  '[data-o18="extract-kc"] .slider-track'
…:1133  '[data-o18="extract-k-rail"]'
```

The generate rail carries no `data-o18` attribute and appears in no census row. The WCAG 1.4.11
graphics floor is **enforced on one twin and unenforced on the other** — and the unenforced twin
is the one that ships an arbitrary user-generated palette against `bg-well`.

This is what makes a dual path a defect rather than an inefficiency: copies do not diverge at
random, they diverge wherever only one copy got the fix. The gradient builder is duplicated code;
the missing ring is a shipped accessibility regression hiding inside the duplication.

Cure unchanged from §6's **G-2** (glass-ui `Slider` owns a first-class ramp track), with one
addition to its acceptance: **the producer affordance must carry the contrast ring**, so a
consumer cannot obtain the ramp without obtaining the ring. Then both `--slider-track-bg:
transparent` overrides, both underlay divs and both gradient builders delete together.

---

## 8.4 NEW · **L2-3 · MAJOR** — two colour-harmony vocabularies in one application; the design system already owns one

`@mkbabb/glass-ui@7.0.0` ships a harmony union and its generator —
`dist/composables/color/index.d.ts:81,87`:

```ts
export type ColorHarmony = "analogous" | "complementary" | "split-complementary" | "triad" | "tetradic" | "monochrome";
export declare function deriveHue(anchorHue: number, harmony: ColorHarmony, hueSpread: number, t: number): number;
```

documented at `dist/components/aurora/composables/color.d.ts:29-34` as *"the PUBLIC alias of the
shared `ColorHarmony` vocabulary … The blob and aurora derive from this ONE union."*

The demo mints a rival — `demo/color-session/generate-color.ts:68-85`:

```ts
export const HARMONY_NAMES = ["golden","analogous","complementary","triadic","split-complementary","random"] as const;
```

with its own `generateHues` at `:93-149`.

**User-visible consequence, same product, two panes.** Generate's harmony menu
(`GenerateControls.vue:264-278`, capitalised at `:83-85`) offers **"Triadic"**. Atmosphere's
harmony menu (`demo/scenes/atmosphere/AuroraPane.vue:121-127`, typed
`AuroraHarmony = ColorHarmony` via `@mkbabb/glass-ui/aurora`) offers **`triad`**. One concept, two
spellings, two menus, two algorithms, three overlapping members (`analogous`, `complementary`,
`split-complementary`) and four disjoint ones.

Pass 1's §L-4 established that the library owns no palette generation. This is the sharper form of
the same inversion: the concept is not merely *absent* from `@mkbabb/value.js` — it is *present in
a UI package*, and the demo maintains a third, private copy beside it. Unique semantic ownership
is violated twice over.

**Cure.** One vocabulary, one home, and the home is the colour library, not the component library.
Fold `ColorHarmony` into pass 1's move 1 (`@mkbabb/value.js/palette`) and have **glass-ui consume
it**, rather than the reverse. That is a cross-repo ask on the RF-17 library-evolution wave, and it
is the correct direction of dependency: a colour vocabulary flowing from the colour library into
the design system. Until then, `triadic` vs `triad` is a user-facing inconsistency with no owner.

---

## 8.5 NEW · **L2-4 · MAJOR** — consumers reach past the design system into its own transitive dependency, because `Select` publishes no typed value

`GenerateControls.vue:33,75-81`:

```ts
import type { AcceptableValue } from "reka-ui";
function onPresetChange(value: AcceptableValue)  { preset.value  = value as PresetName; }
function onHarmonyChange(value: AcceptableValue) { harmony.value = value as HarmonyName; }
```

`AcceptableValue` is **reka-ui's** type — glass-ui's headless substrate. glass-ui does not
re-export it:

```
$ grep -c AcceptableValue node_modules/@mkbabb/glass-ui/dist/index.d.ts
0
```

so a consumer of glass-ui's `Select` has no way to name the type of the value its own event
delivers except by naming glass-ui's internal dependency.

**Census — 4 files, 9 unchecked casts:**

```
demo/workbenches/generate/GenerateControls.vue:33                       → casts at :76, :80
demo/workbenches/mix/MixConfigBar.vue:15                                → casts at :99, :122, :146
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:28  → casts at :164, :181, :198
demo/scenes/atmosphere/AuroraPane.vue:25                                → casts at :79, :81, :85, :92
```

Pass 1's negative result — *"`reka-ui` is a declared dependency, so the type import is not an
undeclared-dependency defect"* — is correct and I confirm it. But declaredness is not the defect.
**The direction is.** The demo depends on the design system's private choice of headless library;
if Glass 8 swaps reka-ui, four demo files break for a reason that has nothing to do with their own
concern, and every one of them launders the enum boundary through an `as` cast the compiler will
keep accepting either way.

**Cure — producer ask, filed alongside G-1/G-2/G-3.** `Select` becomes generic over its value:
`Select<T extends string>` with `@update:model-value: (v: T) => void`. Nine casts and four
`reka-ui` imports die, and the preset/harmony enum boundary becomes type-checked instead of
asserted. It is the same lesson as G-3 from the other side: a design-system prop *or event* whose
type the consumer must guess is not a contract.

---

## 8.6 CONFIRMED LIVE · §L-1 — the save-name loss, reproduced end to end

Pass 1 recorded (honestly) that it abandoned its live re-confirmation because the shared Playwright
browser was being driven by parallel seats. **The probe is obtainable**; it needs a self-healing
idiom rather than a navigation. Recorded here so no future seat abandons it again.

The interference is real: three `browser_navigate` calls to `/#/generate` were clobbered mid-flight
to `/#/palettes`, `/#/admin/users` and `/#/`. The fix is to re-assert the route *inside* the same
`evaluate` and poll for the component's own marker before acting:

```js
for (let i = 0; i < 12 && !plate; i++) {
  location.hash = '#/generate';
  await new Promise(r => setTimeout(r, 500));
  plate = document.querySelector('[data-generate-plate]');
}
```

I explicitly **corroborate pass 1's refusal to report the redirect as a defect**: I saw the same
clobbering, and it is other seats, not the router.

With that idiom, one call: set `input[aria-label="Palette name"]` to `ZZ-PROBE-NAME` via the native
value setter + `input` event, click `button[aria-label="Save palette"]`, read `localStorage`:

```json
{ "url": "http://localhost:9000/#/generate",
  "inputAfterSet": "ZZ-PROBE-NAME",
  "nameMatches": [["color-palettes", ["Generated Palette", "Sunset", "Empty Plate", "Overflowing"]]] }
```

The v-model round-trip is verified (`inputAfterSet`), the save fired, and the persisted store
contains **"Generated Palette"** — zero occurrences of `ZZ-PROBE-NAME`. `GeneratePane.vue:14`
declares `onSave(colors: string[])` (arity 1, the name parameter never bound) and `:19` passes the
literal `"Generated Palette"` to `pm.createPalette`.

**§L-1 is CONFIRMED at BLOCKER severity with an independent live reproduction.** TypeScript cannot
catch it: a handler is always assignable to an emit with more parameters. It is data loss on the
user's own input, in a pane whose entire purpose is producing a palette worth keeping.

---

## 8.7 Independently confirmed from pass 1 (no re-argument)

Each re-derived from primary sources before I read the pass-1 report:

- **§L-0** — glass-ui 7 Button has `emphasis`/`tone`, not `variant`. Confirmed. L2-1 is its third
  member and generalises the finding beyond Button.
- **§L-2** — `demo/ui/` shim layer. Independently measured: 19 `demo/ui/*/index.ts`; **18 are
  one-line pure re-exports** of `@mkbabb/glass-ui`, and the nineteenth (`alert/`) is also a pure
  re-export carrying only a comment. This file consumes the design system through **three** idioms
  at once (`../../ui/*` shim at `:3-12`; root barrel at `:14`; subpath at `:15`). glass-ui publishes
  `./badge ./button ./select ./slider` among 74 exports, and `sideEffects: ["*.css"]` means the root
  barrel tree-shakes as well as the subpaths — so the shim layer buys nothing at all, not even
  bundle size.
- **§L-3** — cross-feature edge. Independently censused: `PaletteColorStrip` has 4 consumers and
  **3 of 4 are outside `palettes/`** (`MixSourceSelector.vue:8,203`, `GenerateControls.vue:16,135`,
  `ExtractWorkbench.vue:200`); only `PaletteCard.vue:33,175` is in-feature. RF-15
  (`docs/tranches/V/audit/REFORMATION-2026-07-16.md:73`) names this species as work owed. The tax is
  measurable: the palettes domain type is fabricated at four sites
  (`GenerateControls.vue:56`, `GeneratePane.vue:15`, `CurrentPaletteEditor.vue:244`,
  `useGradientModel.ts:144`) to satisfy props that should have taken `string[]`.
- **§L-4** — library owns no palette generation. Confirmed, and sharpened by the sibling asymmetry:
  extract's core **is** a published subpath (`@mkbabb/value.js/quantize`, consumed at
  `quantize-worker.ts:6-7`, `useExtractSession.ts:14`, `useImageQuantize.ts:9`), while generate's
  equally-pure core sits in `demo/`. Same workbench tree, same shape of math, opposite side of the
  library line.
- **§L-5** — `paths` shadows `exports`. Confirmed against `tsconfig.demo.json`: 8
  `@mkbabb/value.js*` entries; `./dist/index.d.ts`, `./dist/subpaths/parsing.d.ts`,
  `./dist/subpaths/units.d.ts` do not exist; `./css` and `./value` have no entry.
  **I record that my own first-pass reading was wrong here** — I checked `tsconfig.json` and
  `demo/tsconfig.json`, found no `paths`, and was preparing to certify the subpath proof clean on
  both halves. Pass 1's finding stands and is the more careful one: the *runtime* half is
  drift-proof by generation (`vite.config.ts:37-47`), the *typecheck* half is a hand-written stale
  mirror. Two seats, same file, opposite conclusions from different config files — which is itself
  the argument for deleting the mirror.

---

## 8.8 Pass-2 additions to the §6 wave

Numbering continues §6's scheme. Release condition unchanged and quoted verbatim from
`CARRY-LEDGER.md:61-66`: hold all consumer edits and the `@mkbabb/glass-ui` pin until one unique
immutable v8 candidate proves exact **source→built→packed→installed→served** equality, is neither a
workspace/source link nor mutable v7, and survives **two unchanged-byte Sol critics**. Bound
packets: emitter `3547c78b…`, gate/package `458e5198…`, synthesis `1b8719a0…`. Pinned receiver
`GenerateControls.vue` @ `4f95c57c…` — re-verified matching at pass-2 time (§8.1).

**Producer gates — additions and one widening:**

| id | gate | why |
|---|---|---|
| **G-3′** | **widen G-3**: acceptance is not *"`<Button variant="ghost">` fails"* but *"**any** attribute reaching **any** glass-ui component root that is not in that component's declared prop surface fails — at typecheck or first render — reproducibly in CI."* | Narrowed to Button, G-3 ships L2-1 untouched. `tag` on `WatercolorDot` is the same defect on a different component, with a functional consequence. |
| **G-2′** | G-2's ramp-track affordance **must carry the WCAG 1.4.11 contrast ring**, so the ramp cannot be obtained without the ring | L2-2: the hand-rolled twins diverged precisely at the ring. |
| **G-4** | `WatercolorDot`: either (a) documented as decorative-only — `aria-hidden`, no verb, consumers wrap it in their own `<button>` — or (b) ships a typed polymorphic root + declared `click` emit. **A decision, taken before any consumer edit.** | L2-1. Under (a) the consumer change is a wrapper element, under (b) it is a prop rename. The two are not interchangeable and the consumer cannot choose. |
| **G-5** | `Select<T extends string>` with a typed `update:model-value`, or a re-export of the value type from the glass-ui root | L2-4: 4 files / 9 casts currently reach into reka-ui. |

**Consumer rows — additions to §6's blocked table:**

| id | change | lines |
|---|---|---|
| **L2-1c** | under G-4(a): wrap each `WatercolorDot` in a consumer-owned `<button :aria-label>` carrying the click and the focus ring; the dot stays decorative. Under G-4(b): pass the producer's typed prop. | 199-208 |
| **L2-1t** | **O-20 gains a behavioural assertion**: click a swatch → the clipboard receives that swatch's CSS string. The existing `backgroundColor` assertion is retained but is not sufficient — it was green throughout the entire life of the dead verb. | `e2e/smoke/oracles/o20-generate-plate.spec.ts` |
| **L2-2c** | add `data-o18="generate-count-rail"` and a matching O-18 census row, so the generate ramp is censused like its extract twin — **required whether or not G-2′ lands**, since it is the only thing that would have caught the divergence | 292-296 + `o18-contrast-census.spec.ts` |
| **L2-4c** | delete the `reka-ui` import and both `as` casts once G-5 lands | 33, 75-81 |

**Not blocked on Glass 8 (RF-17 library-evolution wave):**

| id | change |
|---|---|
| **L2-3l** | fold `ColorHarmony` into the new `@mkbabb/value.js/palette` subpath and have glass-ui consume it; retire the demo's rival `HARMONY_NAMES`. Resolves `triadic` vs `triad`. 4.0.0 is immutable — next cut only. |

**Escalation, restated with force.** §L-1 (the name drop) touches the pinned file, so §6 correctly
leaves it blocked. It is **data loss on user input**, now reproduced live twice by two independent
seats. Recommend the owner grant a hold exemption for the one-line pane-side fix
(`GeneratePane.vue` is **not** in the hold's pinned receiver set — the four pinned files are
`ComponentSliders.vue`, `ConfigSliderPane.vue`, `ExtractControls.vue`, `GenerateControls.vue`).
**Binding the second emit argument in `GeneratePane.vue:14-19` requires no edit to any pinned
file** and cures the data loss today; the fuller session-hoist (pass 1's move 4) still waits for
the unblock. This is the single highest-value action available before Glass 8.

---

## 8.9 Pass-2 command log

```bash
git rev-parse HEAD                                              # 9bcd5d91
shasum -a 256 demo/workbenches/generate/GenerateControls.vue    # 4f95c57c… MATCH
git log --oneline c654824e..HEAD -- demo/workbenches/generate/  # empty

cat node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts
grep -o "inheritAttrs" node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js          # present
grep -o 'aria-hidden[^,]\{0,20\}' node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js | head -3

python3 -c "…glass-ui package.json…"    # v7.0.0, 74 exports, sideEffects ["*.css"]
                                        # ./badge ./button ./select ./slider ./watercolor-dot present
grep -n "ColorHarmony" node_modules/@mkbabb/glass-ui/dist/composables/color/index.d.ts   # :81 union, :87 deriveHue
grep -c AcceptableValue node_modules/@mkbabb/glass-ui/dist/index.d.ts                    # 0

for d in demo/ui/*/; do … done                                  # 19 barrels, 18 pure shims, alert/ also pure
grep -rn "palettes/browser/card" demo | grep -v "^demo/palettes/"   # 3 cross-feature importers
grep -rn 'css, i) => ({' demo --include='*.vue' --include='*.ts'    # 4 PaletteColor synthesis sites
grep -rn "AcceptableValue" demo --include='*.vue' --include='*.ts'  # 4 files, 9 cast sites
grep -rn "value.js/quantize" demo                                   # 3 extract files on the published subpath
sed -n '95,125p' demo/workbenches/extract/composables/useExtractSession.ts   # kSliderGradient ≡ countSliderGradient
grep -n "slider-track-bg" -B12 -A14 demo/workbenches/extract/ExtractControls.vue  # the inset ring generate lacks
grep -rn "data-o18" e2e/smoke/oracles/o18-contrast-census.spec.ts   # extract-kc / extract-k-rail only
python3 -c "…REPORT.json…"                                          # generate tap targets = shell + slider thumb
time npx vue-tsc -p tsconfig.demo.json --noEmit                     # EXIT=0, 9.2 s
```

Live probes (Playwright/WebKit, `http://localhost:9000/#/generate`, self-healing hash idiom of
§8.6): swatch DOM attributes · `focus()` reachability · `click()` → clipboard with positive
control · rail computed `boxShadow`/geometry/inline gradient · plate focusable census ·
save-name `localStorage` reproduction.

Image read: `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/generate.png`.

**Not claimed** (recorded so the next seat does not chase them): the `/#/generate` → `/#/palettes`
/ `/#/admin/users` / `/#/` redirects I observed are other seats driving the shared browser, not a
router defect — same conclusion pass 1 reached. The glass-ui root-barrel import of
`writeClipboard` (`:14`) is a real structural point (pass 1 §L-6) but I could not substantiate a
*bundle-size* cost for it: `sideEffects: ["*.css"]` plus 71–260-byte subpath re-export stubs mean
Rollup tree-shakes the root barrel as well as a subpath. Treat §L-6 as an idiom/consistency
finding, not a performance one.

---
---

# §9 — PASS 3 (independent re-audit, 2026-07-27, repo HEAD `7cae8bd0`)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit Opus 5 declaration this seat was spawned with. Declared, not inherited.

This is the third CHALLENGE-L pass. Passes 1 and 2 are thorough and I do not re-argue them. **Every
finding below is new**, and all of them come from one region neither prior pass entered: the repo's
*test and type-program topology*, which is where this component's library boundary is actually
decided. One pass-1 cure is **corrected** (§9.5), and one pass-1/pass-2 finding is **upgraded from
eyeball to measurement** (§9.8).

## 9.1 Pin re-verification at a third HEAD

```
$ git rev-parse --short HEAD
7cae8bd0
$ shasum -a 256 demo/workbenches/generate/GenerateControls.vue
4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6  demo/workbenches/generate/GenerateControls.vue
$ git log --oneline c654824e..HEAD -- demo/workbenches/generate/ | wc -l
0
```

**Pin EXACT, zero drift**, now across three HEADs (`c654824e` → `9bcd5d91` → `7cae8bd0`). No consumer
edit is authored here.

**A property of this pass worth stating up front:** unlike passes 1 and 2, whose yield was
concentrated *inside* the pinned file, **every pass-3 defect lands in `test/`, `tsconfig.*.json`, or
`src/` — none touches `GenerateControls.vue`.** Pass 3's entire wave table is therefore
**CURABLE NOW**, unblocked by Glass 8.

---

## 9.2 NEW · **L3-1 · MAJOR** — `test/` is type-checked by no program, and already holds 27 errors

The repo splits its TypeScript into two leaf programs, and the split is documented as a structural
invariant — `tsconfig.json:3-8`: *"the PUBLISHED library graph (tsconfig.lib.json, `src/` only) is
glass-ui-free by construction, while the demo graph (tsconfig.demo.json, `demo/`) resolves glass-ui
from source."*

Measured includes:

```
$ node -e "…tsconfig.lib.json…"
include: ["src/subpaths/color.ts", … 13 enumerated src patterns …]   exclude: undefined
$ node -e "…tsconfig.demo.json…"
include: ["demo/","src/vite-env.d.ts"]                                exclude: undefined
$ tsconfig.json → { "files": [], "references": [lib, demo] }
```

`test/` appears in none of them. The compiler's own file list confirms it:

```
$ npx tsc -p tsconfig.lib.json  --noEmit --listFilesOnly | grep -c "/value.js/test/"
0
$ npx tsc -p tsconfig.demo.json --noEmit --listFilesOnly | grep -c "/value.js/test/"
0
$ npx tsc -p tsconfig.demo.json --noEmit --listFilesOnly | grep -c "/value.js/demo/test/"
3
```

**0 of the library's 19 `test/*.ts` files are in any program; 3 `demo/test/` files are.** The demo's
own tests are gated; the library's are not. And the binding gate cannot reach them —
`package.json`: `typecheck = vue-tsc -p tsconfig.lib.json --noEmit && vue-tsc -p tsconfig.demo.json --noEmit`.
Nor does the runner: `vitest.config.ts` has **no `typecheck` block**, so vitest transpiles
types away with esbuild and never checks them.

**The region is not merely unchecked — it is already broken.** I built a throwaway config identical
to `tsconfig.demo.json` but with `include: ["test/","demo/","src/vite-env.d.ts"]`, ran `vue-tsc
--noEmit`, and deleted it (`rm -f tsconfig.probe-test.json`; `git status` clean):

```
total errors:                     27
errors under test/:               27
errors under demo/:                0
```

A representative sample:

```
test/value-domain-clamp.test.ts(35,26): error TS2339: Property 'hue' does not exist on type
  'Readonly<{ key: string; min: number; max: number; unit: "" | "%" | "deg" | "K"; hue?: true; }>
   | { key: string; min: number; max: number; unit: "K"; }'.
test/status-lamp.test.ts(149,15): error TS2488: Type '[message?: any, …] | undefined' must have a
  '[Symbol.iterator]()' method that returns an iterator.
test/math.test.ts(318,40): error TS2345: Argument of type 'number[][]' is not assignable to
  parameter of type 'readonly (readonly [x: number, y: number])[]'.
```

`test/value-domain-clamp.test.ts` is a **demo-importing** test (`../demo/color-session/picker-color`),
and its error is a real one: the test reads `.hue` off a union whose `unit: "K"` arm has no such
property. The assertion is only reached because the runtime object happens to carry it.

**Mechanism.** `test/` is the *only* region of this repository that crosses the `src/` ↔ `demo/`
boundary (§9.3), and it is the one region no type program covers. The boundary the whole two-program
split exists to police is enforced everywhere except at the single place it is actually crossed.

Note the irony precisely: the lib program **is** genuinely clean — `npx tsc -p tsconfig.lib.json
--noEmit --listFilesOnly | grep -c "glass-ui\|/value.js/demo/"` → **0** of 88 files. inv-K-1 holds.
But it holds partly *because* the files that would violate it were placed outside every program.

**Cure — CURABLE NOW.** Add a third leaf, `tsconfig.test.json`, extending `tsconfig.base.json` with
`include: ["test/"]` and references to both leaves, and append it to the `typecheck` script. The 27
errors must be fixed, not suppressed — and fixing `value-domain-clamp` and `status-lamp` will
sharpen the demo types they consume. Then delete the `@src/*` alias per §9.3.

---

## 9.3 NEW · **L3-2 · MAJOR** — the `@src/*` deep-path alias is alive in `test/`, kept breathing by the bundler alone

The challenge asks whether this component's cone reaches value.js *"through the published subpath
export map, or through a deep path that only works because the demo shares the repo."* Pass 1
answered for `demo/` and recorded the negative proof (zero `@src/` in the demo tree). That proof is
correct and I confirm it. **It is also incomplete: the alias survives in `test/`.**

```
$ grep -rn "@src/" test/
test/gradient-v4-consume.test.ts            ← "@src/subpaths/css";
test/parsing/timeline/parsing-easing.test.ts ← "@src/subpaths/css";
test/parsing/timeline/parsing-easing.test.ts ← "@src/subpaths/easing";
test/transform/path-geometry.test.ts        ← "@src/transform/path";
test/transform/decompose-targeted.test.ts   ← "@src/transform/decompose";   (×2)
```

Six imports, four files. **Every one has an exact published equivalent** — verified against
`src/subpaths/transform.ts`, which re-exports the whole of both reached internals:

| deep path written | published specifier that covers it |
|---|---|
| `@src/subpaths/css` | `@mkbabb/value.js/css` |
| `@src/subpaths/easing` | `@mkbabb/value.js/easing` |
| `@src/transform/decompose` | `@mkbabb/value.js/transform` — exports `decomposeMatrix2D/3D`, `recompose*`, `slerp`, `interpolateDecomposed`, `DecomposedMatrix2D/3D`, `Vec4`, `Mat4` |
| `@src/transform/path` | `@mkbabb/value.js/transform` — exports `PathGeometry`, `getTotalLength`, `getPointAtLength`, `Point`, `PathSample` |

The two `@src/subpaths/*` cases are the sharpest: they reach the **subpath entry file itself** by
filesystem path, deliberately stepping around the `exports` map that exists to serve exactly that
module. The deep path buys nothing at all.

**And the alias exists in only one of the two resolvers.** `vitest.config.ts:11` defines
`"@src": path.resolve(…, "src")`; `tsconfig.demo.json:6` records that the `@src/*` **path was
RETIRED**. So the specifier resolves at runtime and fails at typecheck — which is why six of my 27
errors are `TS2307: Cannot find module '@src/…'`. It is not that the alias is unchecked incidentally;
**the only reason these imports have never failed is that no type program has ever looked at them.**

**Mechanism — pass 1's §L-5 inverted.** §L-5 found a `paths` mirror shadowing `exports`. This is the
same disease with the mirror missing: a bundler alias with **no** type-program counterpart, so the
weaker resolver is the only one consulted. Both are instances of the through-line pass 1 named in §5
— *a boundary asserted in one tool and unenforced in another.*

Consequence for this component specifically: the library's proof of its own published surface has a
hole exactly where transform and easing are concerned, and the demo-dogfood keystone (T.W1) is
narrower than it has been reported to be. It is a **demo→internal-deep-path claim that is true of
`demo/` and false of `test/`.**

**Cure — CURABLE NOW.** Rewrite the six imports onto the published specifiers, then delete the
`@src` alias from `vitest.config.ts:11`. `vite.config.ts:70-74` documents `@src` as surviving for two
other reasons — the `sourceExportPlugin`'s `@src/…?source` snippets and "the vitest suite's own
`@src` alias" — so the second justification dies with these six lines and the alias narrows to the
`?source` plugin only.

---

## 9.4 NEW · **L3-3 · MAJOR** — the library's unit suite depends on `demo/`; the one module that should be in `src/` is the one it skipped

```
$ grep -rl "\.\./demo/" test/*.ts | wc -l
10          # of 19 library test files
```

Ten of nineteen. The library's own unit suite cannot run without `demo/` on disk. Enumerated, the
suite has annexed modules from **six** demo areas — `demo/picker/…/sliderAnnouncement`,
`demo/platform/transport/availability`, `demo/shell/dock/status-lamp`, `demo/shell/viewSchema`,
`demo/palettes/mix`, `demo/workbenches/gradient/composables/{gradientParse,useGradientCSS,
useGradientInterpolation,useGradientModel}`, `demo/workbenches/extract/…/useImageSampler`, and five
`demo/color-session/*` modules.

That is a de-facto verdict, already rendered: **the repo's own test infrastructure cannot tell where
the library ends.** It is independent corroboration of pass 1's §L-4 from a direction §L-4 never
used — not "this code looks library-shaped", but "the library's test suite already treats it as
library code."

**And the coverage is inverted exactly where it matters here.** Per-module, for
`demo/color-session/` (24 modules), asking which are imported by a `test/**` file:

| module | lines | covered by the LIBRARY suite |
|---|---:|---|
| `picker-color.ts` | 217 | yes (2 tests) |
| `ink.ts` | 174 | yes (2 tests) |
| `palettes-ramp.ts` | 120 | yes |
| `color-chips/sample.ts` | 91 | yes |
| `view-accent.ts` | 47 | yes |
| `color-utils.ts` | 25 | yes (2 tests) |
| **`generate-color.ts`** | **243** | **no — zero unit coverage** |
| `prng.ts` | 11 | no |

`generate-color.ts` is the **largest module in the directory** and the most nearly-pure (no Vue, no
DOM, deterministic under an explicit seed — pass 1 fuzzed it at 288,000 calls / 0 throws). Its
sibling `color-chips/sample.ts`, 91 lines in the same folder and used by the same dropdown rows this
component renders, **is** covered by `test/preview-chips.test.ts`. There is no rule distinguishing
them; there is only history.

Its sole automated coverage anywhere is an end-to-end browser oracle:

```
$ grep -rln "generate-color\|generatePalette" test/ e2e/
e2e/smoke/oracles/o20-generate-plate.spec.ts
```

**A pure, seeded, total, sub-millisecond numeric function whose only test drives Safari.** That is an
inverted test pyramid, and it is why every property this component *relies* on — seed-exactness (the
F5 TRUTH LAW at `GenerateControls.vue:86-93`), hue-range clamping, `count`-dependence of
`generateHues` — is unasserted. Pass 2's §8.2 showed what an oracle-only regime misses: O-20 asserted
`backgroundColor` and stayed green through the entire life of a dead verb.

**Cure — CURABLE NOW, and it sequences *before* pass 1's move 1.** Write
`test/generate-color.test.ts` against the current demo module: seed-exactness (same
`(count,preset,harmony,seed)` ⇒ identical output), preset-range containment in OKLCh, harmony hue
geometry, and the `count`-dependence that forbids truncation (pass 1 §L-9). Those tests are the
*specification* the `src/palette/` promotion needs, and they are written once and moved with the
code. Promoting 243 untested lines into a published subpath first would ship an unspecified public
API.

---

## 9.5 CORRECTION · **L3-4 · MAJOR** — pass 1's `src/palette/` cure, as written, would ship UI copy in the colour library

Pass 1 §L-4 and move 1 propose promoting `demo/color-session/generate-color.ts` to `src/palette/` and
publishing `GENERATION_PRESETS` and `HARMONY_DEFS`. **Those two tables are not pure math.** They carry
user-facing English:

```
$ grep -cn "label:\|description:" demo/color-session/generate-color.ts
18
```

`generate-color.ts:47-56` and `:79-84`:

```ts
vibrant: { l:[0.55,0.80], c:[0.12,0.30], h:[[0,360]], description: "High chroma, bold tones" },
pastel:  { l:[0.80,0.92], c:[0.04,0.10], h:[[0,360]], description: "Soft, light, airy" },
earth:   { l:[0.35,0.65], c:[0.04,0.12], h:[[30,90]], description: "Muted clay and soil" },
…
"split-complementary": { description: "Base + two flanking complements" },
```

Sixteen presentation strings, and this component renders them verbatim —
`GenerateControls.vue:246` `{{ GENERATION_PRESETS[p].description }}` and `:275`
`{{ HARMONY_DEFS[h].description }}`.

Promoting the file as-is would make `@mkbabb/value.js/palette` a package that ships English prose,
permanently un-internationalisable behind a semver contract, and would hand every future consumer of
the numeric ranges a copy deck they did not ask for. The numeric half is the reusable half; the copy
is this application's voice.

**Corrected cure.** Split at the promotion, not after it:

- `src/palette/presets.ts` publishes `PRESET_RANGES: Record<PresetName, {l,c,h}>` — numbers only.
- `src/palette/harmony.ts` publishes the six generators and `HarmonyName` — algorithms only.
- The `description` strings stay in `demo/`, as a `Record<PresetName, string>` copy table beside the
  component that renders them, keyed by the published union so a missing entry is a **type error**.

This preserves the whole of pass 1's argument (the capability belongs in the library) while keeping
the library's published surface free of application voice. Recorded as a correction because the cure
as originally written would have created a new, harder-to-reverse defect in `src/` — the one place in
this report where a proposed remedy needed changing rather than endorsing.

---

## 9.6 NEW · **L3-5 · MAJOR** — seeded randomness has two implementations; this file invokes both, on the same element, and `/math` publishes neither

```
$ grep -rn "mulberry32" demo src test
demo/color-session/prng.ts:2:export function mulberry32(seed: number) {
demo/color-session/generate-color.ts:35:import { mulberry32 } from "./prng";
demo/color-session/generate-color.ts:219:  const rng = seed != null ? mulberry32(seed) : Math.random;
demo/workbenches/generate/GenerateControls.vue:89: // mulberry32-seeded, so the strip and …

$ grep -o "mulberry[A-Za-z0-9]*" node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js | sort -u
mulberry32
```

**Two independent mulberry32 implementations are live in this application**, and
`GenerateControls.vue` drives both at the *same visual element*:

- `:95,99` → `generatePalette(count, preset, harmony, seed)` → demo's `mulberry32(number)` decides the
  swatch's **colour**;
- `:204` → `:seed="`gen-${css}-${i}`"` → glass-ui's compiled `mulberry32(string-hashed)` decides the
  same swatch's **shape**.

One dot, two PRNGs, two packages, two seed types (`number` vs `string`), no shared definition of
"deterministic given a seed". The `seed:` bench note at `:212-214` reports one of the two.

Meanwhile the library that exists to publish numeric primitives ships none:

```
$ cat src/subpaths/math.ts
/** `@mkbabb/value.js/math` — pure numeric math (O.W2). parse-that-FREE. */
export { clamp, scale, lerp, lerpArray, logerp, deCasteljau, cubicBezier,
         interpBezier, cubicBezierToString } from "../foundation/math";
$ grep -rn "mulberry32\|seedrandom" src/
(no output)
```

`clamp`, `lerp` and `deCasteljau` are published; the seeded PRNG that two separate packages each
needed badly enough to hand-roll is not. **Wrong home**, by the same argument as §L-4 and with a
sharper proof: the concept has already been independently re-derived twice, which is the empirical
signature of a missing shared primitive.

**Cure — CURABLE NOW.** `src/math/prng.ts` → `mulberry32`, plus a `hashSeed(string): number` so the
string and numeric seed registers are one register; publish from `@mkbabb/value.js/math`.
`demo/color-session/prng.ts` deletes. glass-ui consuming it is the cross-repo half — same direction of
dependency as pass 2's §L2-3 `ColorHarmony` ask (colour/numeric primitives flow *from* the library
*into* the design system), so the two should be filed as one RF-17 row rather than two.

---

## 9.7 NEW · **L3-6 · MINOR** — the two visual matrices that could falsify §L-11 and §L2-1 do not cover this route

```
$ ls docs/tranches/V/megatranche/audit/visual/shots/
forced-colors-desktop/  keyboard-focus-desktop/  reduced-motion-desktop/  rtl-desktop/  rtl-mobile/
safari-desktop-dark/  safari-desktop-light/  safari-mobile-dark/  safari-mobile-light/  zoom-200-desktop/

$ ls forced-colors-desktop/   →  adminusers.png  blob.png  browse.png  gradient.png  picker.png
$ ls keyboard-focus-desktop/  →  adminusers.png  blob.png  browse.png  gradient.png  picker.png
```

`generate.png` exists in the four `safari-*` matrices and in **none** of the specialised ones. The
two omitted matrices are precisely the two that bear on this component's open accessibility-structural
findings:

- **`forced-colors-desktop`** is the only probe that would exercise §L-11 — the
  `@media (forced-colors: active)` block in `foundation.css:689` whose hand-maintained selector list
  had to grow a `.generate-swatch` entry.
- **`keyboard-focus-desktop`** is the only probe that would exhibit §L2-1 — five swatches with zero
  focus reachability. Pass 2 had to obtain that by hand-driven Playwright precisely because the
  matrix that should show it does not run on this route.

Not a defect in the component; a **gap in the evidence base this formation is reasoning from**, and
worth recording because two of this file's three most serious open items sit in the blind spot.

**Cure — CURABLE NOW:** extend both matrices to `/#/generate` (and to the other routes they omit)
before the mega-tranche closes its visual evidence.

---

## 9.8 EVIDENCE UPGRADE · §L-10 / §L2-2 — the rail's divergence, measured

Pass 1 rated the hand-rolled CSS rail INFO, reasoning that `color-chips/sample.ts`'s SAMPLING LAW is
*"scoped to the chip family, so this is boundary-adjacent."* Pass 2 lifted it to MAJOR on the missing
contrast ring. **Neither quantified the interpolation divergence the law exists to prevent.** I did.

Reading `shots/safari-desktop-dark/generate.png`: the plate's five swatches are orange, teal,
magenta, chartreuse, blue — and the count rail beneath carries a **visibly washed, low-chroma band
between the teal and magenta stops** that appears nowhere in the palette or in the specimen strip
above it.

Taking that adjacent pair and computing both paths against the shipped library
(`dist/subpaths/{color,css}.js`):

```
APP    midpoint (OKLCh lerp — what color-chips/sample.ts legislates) : oklch(0.640, 0.215, 262.5deg)
ENGINE midpoint (sRGB lerp — a raw CSS linear-gradient stop pair)    : oklch(0.522, 0.160, 279.3deg)

chroma: app=0.215  engine=0.160  → the engine desaturates the midpoint by 25.5%
hue:    app=262.5deg  engine=279.3deg  → 16.8deg of hue drift
```

`GenerateControls.vue:65-73` hands raw stops to `linear-gradient(to right, …)` with no `in <space>`,
so **which** of these two the user sees is the rendering engine's choice, not the application's — and
engine defaults for legacy gradients differ. That is the exact hazard the law names in prose (*"the
preview must show what THE APP computes, not what the browser's engine would … One mechanism for all
rows, no engine divergence"*), now with a number: **up to 25.5% chroma and 16.8° of hue, per stop
pair, on the instrument whose entire job is to show the palette it controls.**

This does not change pass 2's MAJOR rating or its cure. It removes the remaining reason to treat the
SAMPLING LAW as advisory here: the divergence is not theoretical, it is a quarter of the chroma, and
it is on screen in the shipped screenshot.

---

## 9.9 Pass-3 negative results (measured, so no fourth seat re-runs them)

- **`demo/` is type-clean.** My probe config type-checked `test/` **and** `demo/` together: 27 errors,
  **0 of them under `demo/`**. Every error is in the unchecked region. The demo tree earns this.
- **inv-K-1 holds structurally.** `npx tsc -p tsconfig.lib.json --noEmit --listFilesOnly` → 88 files,
  `grep -c "glass-ui\|/value.js/demo/"` → **0**. The published library graph is genuinely glass-ui-free
  and demo-free.
- **`src/` never imports `demo/`.** `grep -rn "\.\./demo\|@/demo" src/` → no output. The inversion in
  §9.4 is one-directional (tests only), which is why it is MAJOR and not BLOCKER.
- **`color-session` is a real layer, not a fourth feature.** Zero back-edges: `grep -rn
  "from \"\.\./workbenches\|\.\./palettes\|\.\./picker\|\.\./shell\|\.\./scenes" demo/color-session/`
  → one hit, `color-chips/sample.ts:33 → ../picker-color`, which is *within* `color-session` itself.
  Fan-in is broad and downward-only: workbenches 18, palettes 14, picker 8, shell 7, color-picker 6,
  scenes 4. Passes 1 and 2 marked this file's lines 20 and 25–31 "direction correct" — **confirmed by
  measurement**, and it is the one boundary in this component's import block that is unambiguously
  right.
- **The absent root `.` export is deliberate and documented, not a defect.** `package.json#exports`
  has 7 keys and no `.`; `main`/`module`/`types` are all `undefined`; `README.md:15-21` lists exactly
  those 7 subpaths and every example imports one (`:30 /css`, `:52 /color`, `:75 /easing`,
  `:89 /quantize`). No source file anywhere imports the bare specifier. The published surface and its
  documentation agree. (`tsconfig.demo.json:42` still maps a bare `@mkbabb/value.js` to a
  non-existent `./dist/index.d.ts` — already covered by pass 1's §L-5 phantom-entry finding.)
- **`files: ["dist","!dist/gh-pages","!dist/gh-pages/**"]`** — the demo never ships in the tarball.
  §9.4's test-suite inversion is a *development-graph* defect, not a published-package one.

---

## 9.10 Pass-3 wave rows — all CURABLE NOW, none touches the pin

| id | change | home | blocked? |
|---|---|---|---|
| **L3-1c** | add `tsconfig.test.json` (`include: ["test/"]`, references both leaves); append to the `typecheck` script; fix the 27 errors — no suppressions | `tsconfig.test.json`, `package.json`, `test/**` | **no** |
| **L3-2c** | rewrite the 6 `@src/*` imports onto `@mkbabb/value.js/{css,easing,transform}`; delete the `@src` alias from `vitest.config.ts:11`; narrow `vite.config.ts`'s `@src` to the `?source` plugin only | `test/**`, `vitest.config.ts` | **no** |
| **L3-3c** | write `test/generate-color.test.ts` — seed-exactness, preset-range containment, harmony geometry, `count`-dependence. **Sequence before pass 1's move 1**; the tests are the spec the promotion needs and they move with the code | `test/` | **no** |
| **L3-4c** | **amends pass 1 move 1**: promote *numbers only* to `src/palette/{presets,harmony}.ts`; the 16 `description` strings stay in `demo/` as a copy table keyed by the published union | `src/palette/`, `demo/` | **no** |
| **L3-5c** | `src/math/prng.ts` → `mulberry32` + `hashSeed(string)`, published from `@mkbabb/value.js/math`; delete `demo/color-session/prng.ts`. File the glass-ui half **with** pass 2's §L2-3 `ColorHarmony` ask as one RF-17 row | `src/math/`, RF-17 | **no** |
| **L3-6c** | extend the `forced-colors-desktop` + `keyboard-focus-desktop` matrices to `/#/generate` | visual capture harness | **no** |

**Sequencing.** L3-1c and L3-2c are prerequisites, not peers: until `test/` is in a program, L3-3c's
new tests join the same unchecked region and inherit the same blindness. Order:
**L3-1c → L3-2c → L3-3c → L3-4c/L3-5c**. L3-6c is independent and should land before the mega-tranche
seals its visual evidence.

**Relation to the hold.** Nothing above requires a `GenerateControls.vue` edit, and nothing above
waits on Glass 8. Combined with pass 2's escalation on `GeneratePane.vue` (the one-line name-drop
cure, outside the pinned receiver set), the pre-Glass-8 landable set for this component is now: the
save-name fix, the test-program closure, the deep-path retirement, the generation-core spec, and the
two library promotions. The Glass-8-blocked set is unchanged.

---

## 9.11 Pass-3 command log

```bash
git rev-parse --short HEAD                                      # 7cae8bd0
shasum -a 256 demo/workbenches/generate/GenerateControls.vue    # 4f95c57c… MATCH (3rd HEAD)
git log --oneline c654824e..HEAD -- demo/workbenches/generate/  # 0
git log --oneline c654824e..HEAD -- test/ tsconfig.*.json       # 0

node -e "…tsconfig.lib.json / tsconfig.demo.json include…"      # lib: 13 src patterns; demo: ["demo/", src/vite-env.d.ts]
npx tsc -p tsconfig.lib.json  --noEmit --listFilesOnly | grep -c "/value.js/test/"       # 0
npx tsc -p tsconfig.demo.json --noEmit --listFilesOnly | grep -c "/value.js/test/"       # 0
npx tsc -p tsconfig.demo.json --noEmit --listFilesOnly | grep -c "/value.js/demo/test/"  # 3
npx tsc -p tsconfig.lib.json  --noEmit --listFilesOnly | grep -c "glass-ui\|/value.js/demo/"  # 0 of 88
grep -n typecheck vitest.config.ts                              # none — transpile-only

# throwaway program over the unchecked region, then removed
node -e "…write tsconfig.probe-test.json, include:[test/,demo/,src/vite-env.d.ts]…"
npx vue-tsc -p tsconfig.probe-test.json --noEmit                # 27 errors: 27 test/, 0 demo/
rm -f tsconfig.probe-test.json                                  # git status clean

grep -rn "@src/" test/                                          # 6 deep imports / 4 files
cat src/subpaths/transform.ts                                   # both reached internals are published
grep -rl "\.\./demo/" test/*.ts | wc -l                         # 10 of 19
grep -rln "generate-color\|generatePalette" test/ e2e/          # e2e oracle only
for f in demo/color-session/*.ts …; do …; done                  # per-module test coverage + line counts
grep -rn "mulberry32" demo src test                             # demo/color-session/prng.ts only
grep -o "mulberry[A-Za-z0-9]*" node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js | sort -u  # mulberry32
cat src/subpaths/math.ts ; grep -rn "mulberry32\|seedrandom" src/   # published: no PRNG
grep -n "description:" demo/color-session/generate-color.ts     # 16 UI strings in the "pure" core
grep -rn "from \"\.\./workbenches\|\.\./palettes\|…" demo/color-session/   # 1 intra-layer hit, 0 back-edges
grep -rn "\.\./demo\|@/demo" src/                               # none
node -e "…package.json exports/main/module/types/files…"        # 7 keys, no '.', files=["dist",…]
grep -n "@mkbabb/value.js" README.md                            # 7 subpaths, every example on a subpath
node --input-type=module -e "…OKLCh lerp vs sRGB lerp midpoint…"  # 25.5% chroma / 16.8deg hue divergence
ls docs/tranches/V/megatranche/audit/visual/shots/*/            # generate.png in 4 safari matrices only
```

Image read: `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-dark/generate.png`
(chosen as the one generate matrix neither prior pass read).

**Not claimed.** I did not re-run passes 1–2's live browser probes; §L-1 and §L2-1 already carry two
independent reproductions each and adding a third would spend the shared browser for nothing. I make
no bundle-size claim (pass 2's §L-6 caveat stands). I did not adjudicate *which* colour space a given
engine picks for a legacy `linear-gradient` — §9.8's point is that the application does not get to
decide, which is the defect regardless of the answer.
