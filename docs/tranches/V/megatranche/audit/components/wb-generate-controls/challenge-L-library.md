# CHALLENGE-L — library structure · `demo/workbenches/generate/GenerateControls.vue`

## Model receipt

I observe myself to be **Claude Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching
the explicit Opus 5 declaration this seat was spawned with. The seat is declared, not inherited.

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
