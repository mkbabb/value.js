# CHALLENGE-L · R2 — library structure under `GradientStopEditor.vue`

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier declared at
spawn. Declared, not inherited.

---

## 0. Why this file exists, and what I did not do

The seat brief named `challenge-L-library.md`. **That file already existed** (36,727 bytes,
2026-07-24, a prior Opus-5 CHALLENGE-L seat at this same HEAD, 14 findings). It is untracked —
`docs/tranches/V/megatranche/` appears in the git status as `??`, so an overwrite would have
been **unrecoverable**.

Per the standing V·π edict **E-3 (addenda, not patch)** I did not clobber it. This is R2: an
independent second pass, run without reading the R1 report until after my own evidence was
collected. A one-paragraph pointer was appended to R1's tail.

| | |
|---|---|
| Subject | `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` (392 lines) |
| Repo / HEAD | `/Users/mkbabb/Programming/value.js`, `tranche-u`, `c654824e` |
| Verdict | **DEFECTIVE** — R1's two BLOCKERs independently confirmed by different reproductions |
| R2's load-bearing delta | **R1-C1 — R1's L-8(b) is a false positive.** Also: a keyboard-only L-1 repro, an in-page proof of the round-trip rejection, and a corrected reading of L-8(a). |

**No source edits. No `INBOX.md` touched. Two files written, both under this seat's directory.**

---

## 1. Correction to R1 — the one finding that must not survive into the tranche

### R1-C1 · R1's **L-8(b) is a FALSE POSITIVE** — there are not two value.js builds in one build

R1 (`challenge-L-library.md:434-449`) asserts:

> *"**Defect (b) — two value.js's in one build.** The demo's *types* resolve to the installed
> package; its *runtime* resolves to the working-tree `dist/`. … typecheck reads one build and
> the browser executes another, and they are byte-different today. This is exactly the crack
> through which §L-2 shipped: the `.d.ts` promises `ParseResult`, the `.js` throws."*

It is not. Both resolve to the **repo's own `dist/`**. R1 misread TypeScript's `packageId`
label as a `node_modules` provenance marker; it is not one — it is the package *identity*
(`name/path@version`) of whichever package owns the file, and the repo's own `package.json`
declares `@mkbabb/value.js@4.0.0`. R1's own quoted `--explainFiles` line already shows the
repo-relative path `dist/subpaths/css.d.ts`, not `node_modules/@mkbabb/value.js/dist/...`.

**Evidence — the same command R1 ran:**

```
$ npx tsc -p tsconfig.demo.json --noEmit --explainFiles | grep -A3 "subpaths/css"
dist/subpaths/css.d.ts                                          ← repo-relative, NOT node_modules/
  Imported via "@mkbabb/value.js/css" from file 'demo/color-session/picker-color.ts' with packageId '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'
  … (10 more sites, all the same file)
```

**Evidence — the unambiguous form, absolute paths:**

```
$ npx tsc --noEmit -p tsconfig.demo.json --traceResolution | grep -A3 "value.js/css"
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.       ← the REPO's manifest
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts'             ← the REPO's dist
         with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

No `node_modules` segment anywhere in the resolution. `paths` has **no** `/css` entry, so TS
falls through to the repo's own `package.json#exports` — and `exports` publishes `./css` →
`./dist/subpaths/css.d.ts`. `vite.config.ts:38-47` generates the runtime alias from the *same*
map. **Types and runtime agree, and both are the working tree.**

R1's `cmp node_modules/@mkbabb/value.js/dist/subpaths/css.js dist/subpaths/css.js → DIFFERENT`
is factually true (I get `6dfbff9f` vs `0cd5611e`) and **irrelevant**: the installed copy is a
transitive artifact — `@mkbabb/keyframes.js@6.0.0` declares `"@mkbabb/value.js": "4.0.0"` as a
hard dependency (`node_modules/@mkbabb/keyframes.js/package.json`), glass-ui declares it as a
peer — and nothing in the demo graph ever consults it.

**Why this correction matters, not just pedantry.** R1 uses L-8(b) as the causal explanation
for L-2 ("*exactly the crack through which §L-2 shipped*"). It is not the crack. L-2 shipped
because `src/css/grammar.ts:181` has a `!` on a possibly-`undefined` value — full stop, in the
working tree, in the published 4.0.0, in every build. If the tranche adopts R1's cure
("delete the `paths` block **and** make `node_modules/@mkbabb/value.js` a workspace link so
exactly one artefact serves both") it will do work that fixes nothing and land a workspace
link the resolution does not need. The `paths` block should still go — but as dead weight
(L-8(a)), not as a build-identity repair.

**Corrected severity.** R1's L-8 splits: (a) three dead `paths` entries — **MINOR, confirmed**;
(b) **WITHDRAWN**.

### R1-C2 · L-8(a) is real, and larger than R1 states — the whole `paths` block is redundant

R1 correctly finds three phantom entries. What R1 treats as a gap ("*no entry for
`@mkbabb/value.js/css`, which 10 demo files import*") is in fact the proof the block is
unnecessary: the two subpaths with **no** `paths` entry (`/css`, `/value`) resolve *correctly*
via `exports`, which is exactly what a real external consumer does.

```
package.json#exports  → ["./color","./value","./css","./easing","./math","./transform","./quantize"]   (7 keys, NO "." root)
tsconfig.demo.json:42 → "@mkbabb/value.js":         ["./dist/index.d.ts"]            $ ls dist/index.d.ts          → No such file
tsconfig.demo.json:44 → "@mkbabb/value.js/parsing": ["./dist/subpaths/parsing.d.ts"] $ ls src/subpaths/parsing.ts  → absent
tsconfig.demo.json:48 → "@mkbabb/value.js/units":   ["./dist/subpaths/units.d.ts"]   $ ls src/subpaths/units.ts    → absent
```

The block's own comment claims it "Mirrors the `vite.config.ts` runtime self-alias generated
from the same map" and describes "a CLOSED 8-key set". The map has **7** keys and no root.
A hand-written mirror of a generated map has drifted, undetected, because it is inert.
**Cure: delete the `paths` block entirely** (keep `vue`/`@vue/*`). `exports` is already the
one gate. No workspace link required.

---

## 2. Independent confirmations — different reproductions, same defects

R1's two BLOCKERs are real. I reached both by different routes, which is the point of a second
seat.

### R2 confirms L-1 (ordering) — **by keyboard alone, with no pointer maths involved**

R1 reproduced via drag, which leaves open the reading that the defect is a pointer-geometry
artifact. It is not: the invariant is absent from the *model*, so the plainest possible input
breaks it. Fresh page, ten `shift+ArrowRight` on `stops[0]`, then ten `shift+ArrowLeft` on
`stops[1]` (`GradientStopEditor.vue:173-187` → `update:position` → `useGradientModel.ts:127`):

```
afterA  labels: ["Gradient stop at 100%", "Gradient stop at 100%"]
        css:    linear-gradient(90deg, oklch(0.75 0.15 145) 100%, oklch(0.65 0.18 265) 100%)
afterB  labels: ["Gradient stop at 100%", "Gradient stop at 0%"]        ← INVERTED
        css:    linear-gradient(90deg, oklch(0.75 0.15 145) 100%, oklch(0.65 0.18 265) 0%)
errs:   []                                                              ← silent
```

And the round-trip rejection, proved **in the page against the real module** rather than a
scratch script — the app's own output fed to the app's own parser:

```js
await import('/@fs/…/demo/workbenches/gradient/composables/gradientParse.ts')
  .then(m => m.parseGradientCSS('linear-gradient(90deg, oklch(0.75 0.15 145) 100%, oklch(0.65 0.18 265) 0%)'))
→ "REJECT: stop positions must be non-decreasing (hard-stop reordering isn't modeled)"

// control
'linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)'  → OK
```

Two-stop minimum case — no third stop, no insert, no drag. The model's serializer emits what
the model's parser calls unmodelable, from the keyboard, on a two-stop default gradient.

Corroborating R1's rail evidence: my computed `--rail-ramp` came out **decreasing**
(`… 100.00%, 96.88%, …, 3.13%, 0.00%`), which CSS Images 3 §3.4.3 colour-stop fixup silently
repairs — the reason this has survived every gate.

**Coverage gap, confirmed independently:** `grep -rn "non-decreasing\|monotonic" e2e test`
finds the invariant only inside the parser and its own unit test. `e2e/smoke/views/gradient.spec.ts:144`
("stop add … drag … remove") never asserts order.

### R2 confirms L-2 (`parseCssColor` totality) — through the demo's parser, in-page

```
'linear-gradient(90deg, oklch(), red)'      → THROW: TypeError: Cannot read properties of undefined (reading 'replace')
'linear-gradient(90deg, rgb(), red)'        → THROW: …
'linear-gradient(90deg, color-mix(), red)'  → THROW: …
```

Root cause confirmed at the exact line R1 names:

```
src/css/grammar.ts:181
    const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```

A `!` over `splitTopLevel("", "/")` → `[]`. I add the live reachability chain, which R1 leaves
implicit: `GradientCodeEditor.onInput` → `debouncedParse` (`GradientCodeEditor.vue:55`) →
`emit("parse")` → `GradientVisualizer.onParseCSS` (`:102`) → `applyCSS` → `parseGradientCSS`.
The verdict UI that `e2e/smoke/views/gradient.spec.ts:222` certifies ("garbage input fails
LOUD") never runs for these 8 inputs — they fail *silently and wrongly*. I second R1's cure
and its prohibition: no try/catch in `isColorToken`; that is a masking fallback (edict 2).

### R2 confirms L-3 (the axis is mapped twice, over two different boxes)

R1's sharpest original finding, and I corroborate the mechanism from my own measurements. An
absolutely-positioned child's `left` percentage resolves against the containing block's
**padding box** (CSS 2.1 §10.3.7), while `getBoundingClientRect()` is the **border box**.
`.gradient-rail` carries `border: 1px solid` (`:319`), so the two maps have different origins
and different spans:

```
measured live:  rail  x=224.0  width=462.0  border 1px   ⇒ padding box: origin 225, width 460
                handle "0%"    getBoundingClientRect().left = 225   ⇒ centre 235
forward map at 235:  (235 - 224 - 10) / 442 * 100 = 0.226%          ⇒ not 0
```

`handleLeft` (`:56`) and `getPosition` (`:75-81`) are not inverse functions. Confirmed.

### R2 confirms L-5 / L-6 / L-7 / L-10 / L-13 (structure)

Independently reached, same evidence, no delta worth restating — with one enumeration R1 does
not give, which strengthens L-5: I traced **every** consumer of all seven names re-exported by
`useGradientModel.ts:19-29`. `serializeRailRamp`, `GradientParseResult` and `ParsedGradientModel`
have **zero** consumers through any door; the other four are imported from their real home by
every consumer. The **only** live pass-through is `INTERPOLATION_SPACES`/`HUE_INTERPOLATION_METHODS`
at `GradientVisualizer.vue:19-20` — two constants, two stacked "keep their import path" shims,
while `MixConfigBar.vue:18` imports the same two from the real home in one hop. The barrel is
100% dead but for one import statement that should not use it.

On L-13 I add the concrete transposition evidence R1 stops short of. The invariant L-1 loses is
**already implemented, shipped, and installed** in the dependency chain the demo already has:

```
node_modules/reka-ui/dist/Slider/SliderRoot.js:124   const nextValues = getNextSortedValues(currentModelValue.value, nextValue, atIndex);
node_modules/reka-ui/dist/Slider/utils.js:5,8        function getNextSortedValues(prevValues = [], nextValue, atIndex) { … return nextValues.sort((a, b) => a - b); }
node_modules/@mkbabb/glass-ui/dist/components/slider/types.d.ts
                                                     modelValue?: number[] | null;      ← already N-thumb
                                                     minStepsBetweenThumbs?: number;
                                                     variant?: SliderVariant;           ← "standard" | "spectrum"
demo/ui/slider/index.ts                              export { Slider } from "@mkbabb/glass-ui";
demo/workbenches/…/GradientVisualizer.vue:10         import { Slider } from "../../../ui/slider";   ← 126 lines above the rail it doesn't use
```

Thumb ordering under crossing is solved, tested and installed **one import line above** the
hand-rolled rail that loses it. A `variant="stops"` in glass-ui (edict 4: reuse the existing
component-type name) makes L-1 unrepresentable rather than guarded.

---

## 3. R2's own additions

### R2-A1 · MINOR · The "minimum 2 stops" rule has two homes

```
GradientStopEditor.vue:66      const removable = computed(() => stops.length > 2);
useGradientModel.ts:122-123    function removeStop(id) { if (stops.value.length <= 2) return; … }
```

They agree today. The component should consume the model's `canRemove`, not restate the rule.
Not in R1's fourteen.

### R2-A2 · INFO · Two clipboard idioms from one package in sibling files of one feature

```
GradientVisualizer.vue:12    import { writeClipboard } from "@mkbabb/glass-ui";
GradientEasingEditor.vue:29  import { useClipboard }   from "@mkbabb/glass-ui";
```

Same package, same feature directory, two idioms. Rides R1's L-6 cure.

### R2-A3 · INFO · The paint stack is a "material contract" replicated four times

Six identical declarations (`background: <layer>, var(--alpha-checker)` + `background-origin`
/ `-clip` / `-repeat` / `-size` + `box-shadow`) at `GradientStopEditor.vue:317-326`,
`GradientVisualizer.vue:271-278`, `GradientEasingEditor.vue:~240-247`, and inline at
`ComponentSliders.vue:191-199`. Each block's comment calls itself "a MATERIAL CONTRACT, not a
shorthand assembly" — but a contract written out four times is a convention. Edict 5 puts it at
the root, i.e. in the `Slider` variant of L-13.

---

## 4. Negative proofs (R2's own, independently measured)

- **No masking token fallback is firing.** Every `var(--x, fallback)` in the file resolves to a
  real declared token on the live page: `--touch-target: 2.75rem`, `--radius-pill: 9999px`,
  `--spring-snappy: linear(0, 0.00652 2.041%, …)`, `--spring-snappy-duration: calc(0.44s * 1)`,
  `--shadow-sm`, `--focus-ring-inner: rgba(0,0,0,0.85)`, `--alpha-checker`, `--card-edge`.
  I chased `--touch-target` because it is *never declared* inside glass-ui's own CSS (only ever
  consumed with the `2.75rem` fallback) — it is declared demo-side, and it resolves. Not a defect.
- **The `smallTapTargets` rows are a measurement artifact** — R1 says so; I measured the hit
  region rather than inferring it. `elementFromPoint` from the handle centre:
  `center → HANDLE`, `+11px → HANDLE`, `+13px → DIV.gradient-rail`, `+20px → DIV.gradient-rail`.
  Half-width between 11 and 13 px ⇒ a real 24×24 pointer target ⇒ WCAG 2.5.8 met. The audit
  harness's tap-target metric is structurally blind to `::before` inflation; that is a harness
  finding, not a component finding.
- **Subpath-only import surface, and it is genuine** (see R1-C1). 49 value.js import sites in
  `demo/`, all `@mkbabb/value.js/{color,css,math,easing,quantize}`; zero `../../src`, zero
  `@src`, zero bare-root. A real external consumer could write every one of them.
- **`debounce` in `demo/shared/utils.ts` is not a glass-ui duplicate.**
  `grep -c debounce` over `glass-ui/dist/{dom,reactive,index}.d.ts` → `0, 0, 0`.
- **Edicts 6, 7, 8 satisfied** — as R1 states; re-verified.
- **The route is clean at rest.** `/#/gradient`: `consoleErrors: []`, `pageErrors: []`,
  `overflowX: 0`, `main: 1` across all four Safari matrices (`REPORT.json`;
  `REPORT.md:125,140,155,170`), and the light-desktop screenshot renders the rail correctly —
  pill silhouette, ramp flush at both ends, both handles seated inside the track. **Every
  finding in R1 and R2 requires an interaction or an edit to surface.** That is why the visual
  matrix is green here and the component is nonetheless defective.

---

## 5. Hypothesis (labelled — not a finding, not this seat's)

Navigating to `#/gradient` while already on `#/gradient` produced a redirect to `#/` a beat
after load (observed twice; `location.reload()` at the same URL did **not**). Separately,
gradient model state survived a route change away and back. Not attributable to a module
boundary in my scope; no reproduction built. Recorded for the shell/router seat. **No defect
claimed.**

---

## 6. Disposition for the tranche

| R1 finding | R2 disposition |
|---|---|
| L-1 ordering (BLOCKER) | **CONFIRMED**, second independent repro (keyboard-only, 2-stop default) |
| L-2 `parseCssColor` totality (BLOCKER) | **CONFIRMED**, + live reachability chain from the CSS editor |
| L-3 double axis map | **CONFIRMED** by independent measurement |
| L-4 sampling law ×2 / missing `in <space>` | not independently re-tested by R2 |
| L-5 dead re-export shims | **CONFIRMED**, + full consumer enumeration (5 of 7 names have zero consumers) |
| L-6 `demo/ui/` alias barrel | **CONFIRMED** (19 dirs, 19 single-file barrels) |
| L-7 types inside the state factory | **CONFIRMED** |
| L-8(a) three phantom `paths` entries | **CONFIRMED**, and enlarged: delete the whole block |
| **L-8(b) two builds in one build** | **WITHDRAWN — false positive (R1-C1)** |
| L-9 double `update:position` per frame | not independently re-tested by R2 |
| L-10 selection double channel | **CONFIRMED** |
| L-11 `colorAt` optional + masking fallback | not independently re-tested by R2 |
| L-12 hand-rolled `clamp` vs `/math` | not independently re-tested by R2 |
| L-13 raw divs vs glass-ui `./slider` | **CONFIRMED**, + the reka `getNextSortedValues` transposition proof |
| L-14 two `oklch()` literal dialects | not independently re-tested by R2 |
| — | **R2-A1** min-2-stops rule ×2 · **R2-A2** two clipboard idioms · **R2-A3** paint stack ×4 |

R1's closing line — *"every defect above is one concept with two homes; the cure is never a
guard, it is a home"* — survives R2 intact. R1-C1 removes the one place where R1 named a second
home that does not exist.

---

## 7. Commands and probes

```
npx tsc -p tsconfig.demo.json --noEmit --explainFiles | grep -A3 subpaths/css      # R1-C1
npx tsc --noEmit -p tsconfig.demo.json --traceResolution | grep -A3 value.js/css   # R1-C1
node -e "…package.json#exports…"  ; ls dist/index.d.ts src/subpaths/               # R1-C2
shasum dist/subpaths/css.js node_modules/@mkbabb/value.js/dist/subpaths/css.js     # differ, irrelevant
grep -n "replace(/,/g" src/css/grammar.ts                                          # → 181
grep -n getNextSortedValues node_modules/reka-ui/dist/Slider/*.js                  # SliderRoot.js:124, utils.js:5
cat node_modules/@mkbabb/glass-ui/dist/components/slider/types.d.ts                # modelValue?: number[]
grep -rn "non-decreasing\|monotonic" e2e test                                      # coverage gap
playwright: navigate /#/gradient · evaluate tokens+geometry+elementFromPoint
            evaluate 10× shift+ArrowRight then 10× shift+ArrowLeft                 # L-1 repro
            evaluate import('/@fs/…/gradientParse.ts').parseGradientCSS(<emitted>) # L-1 proof
            evaluate parseGradientCSS('linear-gradient(90deg, oklch(), red)')      # L-2 proof
Read        audit/visual/shots/safari-desktop-light/gradient.png
```

*Artefacts written by this seat: this file, and a 6-line pointer appended to the tail of
`challenge-L-library.md`. Both under
`docs/tranches/V/megatranche/audit/components/wb-gradient-stopeditor/`. No source edits.*
