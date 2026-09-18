claude-opus-5[1m] (served model id)

# CHALLENGE — `NotationPills.vue` · axis **L (LIBRARY)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/NotationPills.vue` (47 lines)
**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Every claim below carries a severity, a
`file:line` provenance, and the falsifier that would void it. Superlatives carry the same burden (L-18 runs
both ways). No browser was used; livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Writes.** This file only. `fourier-analysis` and `glass-ui` were read-only throughout.

**Read whole (component + full import closure + the resolved producer + both hosts + the sibling it claims to copy):**

| file | why |
|---|---|
| `web/src/components/equation/NotationPills.vue` | subject |
| `web/src/lib/equation/notation.ts` | import 1 (`NOTATION_OPTIONS`) — read whole, incl. `TIER_INFO`/`energyColor` |
| `web/src/lib/equation/types.ts` | import 2 (`NotationMode`) |
| `node_modules/@mkbabb/glass-ui/dist/button-BNDWhAZb.js` + `dist/button.{js,d.ts}` | import 3 (`Button`) — the compiled CVA + component |
| `node_modules/reka-ui/dist/Primitive/Primitive.js` | the element the `Button` actually renders |
| `node_modules/@mkbabb/glass-ui/src/styles/glass/surfaces.css` §`.btn-pill` | the base every `<Button>` composes |
| `node_modules/@mkbabb/glass-ui/src/styles/tokens/{light-dark,dark-arm,color-radius,offsets-sizing}.css` | the `--viz-*` / `--control-*` tokens |
| `web/src/components/equation/FunctionInput.vue` · `web/src/components/visualization/EquationPanel.vue` | the two hosts |
| `web/src/components/visualization/BasisSelector.vue` + `lib/basis-display.ts` · `web/src/lib/colors.ts` | the pattern `notation.ts:3-8` names as its model |
| `~/Documents/Codex/2026-08-02/fourier-mobile-safari-instance-source-plan-r6/outputs/DERIVED-REGISTRIES.json` | the R5-7 substrate (R6, the *cured* round) |

**Hitherto corpus folded, not re-invented:** `formation/fourier/CENSUS-2026-08-03.md` (:85-87 viz architecture, :96-101 shadows, :111-114 rAF/reduced-motion, :303-375 addendum), `formation/fourier/lane-frontend.md` (:138 census row, :269 import row, :441 shadow row, §4/§5/§6), `formation/fourier/lane-crud.md`, and the adjudicated intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (R5-7 :125, R6-5 :139, R6-6 :140, X-1 :152). **One explicit contradiction of the corpus is filed as C-1.**

**Tally: 20 findings — 2 BLOCKER · 6 MAJOR · 8 MINOR · 3 INFO · 1 CENSUS CORRECTION. Plus 5 superlatives
and 7 hypotheses tested-and-refuted (§7).** Sixteen findings are the component's/its module's own
(`L-*`); two are the derivation substrate's, filed here because this callsite is where they are provable
in one line (`D-1`, `D-2`); one corrects the hitherto corpus (`C-1`).

---

## §0 — The one-sentence verdict

The component's *seam* is right and its *shape* is right — it is a 47-line, zero-teardown, genuinely
controlled projection of a data table over the producer's own button variant — but it **does not actually
express the selection it exists to express** (no `aria-pressed`, no role, no name), its palette is the only
one in the equation/visualization families that is **mode-invariant** in a repo whose every sibling color is
a `light-dark()` token, and its option table is **not exhaustiveness-bound** to the union it claims to
enumerate. Separately, and independently of the component's own quality, this callsite is where the
**R5-7 derivation-model defect class is provably still live at R6** — the round that closed R5-7's letter —
with a **6× fabricated loop denominator** shipped under a `..._SOURCE_DERIVED` proof label.

---

## §1 — BLOCKERS

### L-1 · BLOCKER · The selection is rendered but never *stated*

`NotationPills.vue:17-26` renders three `<Button>`s whose only selection signal is a scoped class plus an
inline custom property:

```
23    :class="{ 'notation-active': modelValue === opt.value }"
24    :style="modelValue === opt.value ? { '--pill-color': opt.color } : {}"
```

There is no `aria-pressed`, no `role="radiogroup"`/`role="radio"`+`aria-checked`, no `aria-current`. The
component's single reason to exist is "show which `NotationMode` is active", and it discharges that duty
into presentation only. Three aggravators, each independently provable:

1. **The sibling it copies gets it right.** `BasisSelector.vue:144` binds `:aria-pressed="isBasisActive(key as string)"`,
   and its tint rule keys off that state (`BasisSelector.vue:269` `.basis-toggle[aria-pressed="true"]`).
   R6's registry records the contrast exactly:
   - `callsite:web/src/components/equation/NotationPills.vue:17:Button:0.0` → `"accessibility": []`
   - `callsite:web/src/components/visualization/BasisSelector.vue:140:Button:0.0.0.0` → `"accessibility": [{"name": ":aria-pressed", "value": "isBasisActive(key as string)"}]`
2. **The producer ships the contract and this component drops it.** The `outline` variant in
   `dist/button-BNDWhAZb.js` ends `... aria-pressed:bg-accent aria-pressed:text-accent-foreground` —
   two utilities that are **dead for every NotationPills instance** because no `aria-pressed` is ever set.
   The component pays the producer's state contract in bytes and takes none of it in behavior.
3. **The docblock claims otherwise** — see L-2.

Neither host repairs it: `EquationPanel.vue:96` mounts the group with no name at all, and
`FunctionInput.vue:222` reaches for a name but lands on a dangling `<label>` (L-10).

**Failure scenario.** A screen-reader user on `/equation` tabs the three pills and hears
`"sin Trig, button" · "eⁱ Exp, button" · "Ae Polar, button"` — three peer buttons, no group name, no
indication that one of them is the current notation and no way to confirm a selection took effect. On
`/visualize` the same three are unnamed as a set.

**Falsifier.** `grep -n "aria" web/src/components/equation/NotationPills.vue` → **empty**. If any ARIA state
existed in the file this claim is void.
**Falsifier-of-the-falsifier (pre-empted).** The repo *does* run an axe serious/critical gate over `/visualize`
(`web/e2e/visualization-ux.spec.ts:2,26-38,47`), and it passes. That does **not** void this: axe ships no
rule for an *absent* `aria-pressed` on a visually-selected button — it cannot infer that a tinted button was
meant to be a toggle. The gate's silence here is the finding, not the refutation.

---

### L-2 · MAJOR (promoted context for L-1) · The docblock describes an implementation that does not exist

`notation.ts:3-8`:

> *"Notation pill definitions … **matching the `.basis-toggle` pattern from BasisSelector** (glass-ui
> `<Button variant="outline" size="sm">` **with `aria-pressed` driving an instance-scoped tint**)."*

The tint is driven by `:class`, not `aria-pressed` (`NotationPills.vue:23`). The comment is not stale — it
is counterfactual at the moment it was written, and it is the reason a reviewer skimming `notation.ts`
would conclude the a11y leg is present. It also mis-states parity that L-9 shows does not hold on four
further axes.

**Falsifier.** Any `aria-pressed` in `NotationPills.vue` → void. There is none.

---

### D-1 · BLOCKER (derivation substrate) · `cardinality: 18` for a 3-element array, shipped under a `_SOURCE_DERIVED` proof label — the R5-7 class, **still live at R6**

R5-7 (`lane-fourier-r3-r6.md:125`, **ADOPT-AS-FACT**, **CARRY-TO-WAVE → F.W4**) established that
*"template-loop evidence keyed to **component** callsites is blind to native HTML element loops"*, and
R6-5/R6-6 (`:139-140`) cured that with a `NATIVE_TEMPLATE_LOOP` family.

**NotationPills sits on the safe side of R5-7's *letter*.** Its `v-for` is on a `<Button>` — a component
callsite — so it registers. R6's `DERIVED-REGISTRIES.json.loops` carries:

```json
{"callsiteId": "callsite:web/src/components/equation/NotationPills.vue:17:Button:0.0",
 "expression": "opt in NOTATION_OPTIONS", "iterable": "NOTATION_OPTIONS",
 "cardinality": 18, "proof": "FINITE_ARRAY_LITERAL_SOURCE_DERIVED"}
```

**`NOTATION_OPTIONS` has 3 elements** (`notation.ts:15-17`). The registry says **18** — a 6× overcount —
asserted under a proof label whose whole content is a claim of source-exactness.

**Mechanism, derived from three data points, not one.** Every `FINITE_ARRAY_LITERAL_SOURCE_DERIVED` row in
R6's registry is wrong, and the two single-line cases match a string-unaware comma count *exactly*:

| iterable | source | live length | registry | reconstruction |
|---|---|---:|---:|---|
| `tabs` | `AppHeader.vue:26-32` | **5** | **15** | 5 × (2 intra-object commas + 1 trailing) = 15 ✔ |
| `NOTATION_OPTIONS` | `notation.ts:14-18` | **3** | **18** | 3 × (3 intra-object + **2 inside the string `"hsl(6, 72%, 49%)"`** + 1 trailing) = 18 ✔ |
| `PRESETS` | `presets.ts:3-51` | **8** | **7** | multi-line elements take another branch: 8 objects → 7 inter-object separators ✔ |

So the "proof" is a **comma counter with no string/paren awareness** on single-line elements and an
**off-by-one separator count** on multi-line elements. It is correct for *object* literals
(`basisDisplay` 3→3, `strategyDescriptions` 6→6, both `FINITE_OBJECT_LITERAL_SOURCE_DERIVED`) and wrong for
**3 of 3** array literals it touched.

**Why this is the same class as R5-7, and why it is a BLOCKER for F.W4.** R5-7's defect was *loop rows
missing* — an empty leaf, visibly empty. This defect is *loop rows present with fabricated denominators* —
invisibly wrong, and worse, wrapped in a label that asserts it is not. R6 did **not** touch it: the
`cardinality: 18` row above is read **out of R6's own registry**, the round that shipped
`NATIVE-LOOP-GATE-VERDICT.json → verdict: "GREEN_BROAD_DERIVATION_RELEASED"` (`lane-fourier-r3-r6.md:139`).
A gate went green over a 6× denominator error in the very family it was gating. Any F.W4 per-component
D/L/C audit that reads `cardinality` inherits it.

**Falsifier.** `NOTATION_OPTIONS.length !== 3` at `notation.ts:15-17`, or a registry `cardinality` of 3 for
that callsite. Neither holds. A second, cheap falsifier: if the reconstruction column were coincidence it
would fail on `tabs` — it does not (15/15, exact, including the trailing comma).
**Scope honesty.** This is a defect of the *audit substrate*, not of `NotationPills.vue`. It is filed here
because this callsite is where it is provable in one line, and because the lane law required the R5-7 class
be carried "where it applies".

---

## §2 — MAJOR

### L-3 · MAJOR · `NOTATION_OPTIONS` is not exhaustiveness-bound to `NotationMode` — a 4th mode ships silently

`notation.ts:9-18` annotates the table as `{label; value: NotationMode; icon; color}[]`. That enforces the
**value→union** direction (a typo fails `vue-tsc` — see S-3) but **not the union→table** direction. There is
no `as const satisfies`, no coverage assertion, no `Record<NotationMode, …>` keying.

**Failure scenario.** Add `| "phasor"` to `NotationMode` (`types.ts:1`) and wire the backend. `vue-tsc --noEmit`
under `web/tsconfig.json` (`strict: true`, no `noUncheckedIndexedAccess`) passes clean. `NotationPills`
renders three pills. `EquationView.vue:30` (`const notation = ref<NotationMode>(cached?.notation ?? "trig")`)
can now restore `"phasor"` from cache into a UI where **no pill is tinted and no pill can be clicked to
leave that state** — the only escape is picking one of the other three, which the user has no reason to
believe is necessary because nothing looks selected. The same hole reads as "the tint broke", not "a mode is
missing", which is the expensive kind of silent failure.

**Falsifier.** Perform the edit and run `vue-tsc --noEmit`. If it errors, void. Statically: nothing in
`notation.ts` references `NotationMode` in a position that forces coverage — line 11 is the union's only
appearance and it constrains a member, not the set.

---

### L-4 · MAJOR · Theme-blind hardcoded palette — the only mode-invariant color source in its family

`notation.ts:15-17` hardcodes `hsl(6, 72%, 49%)` / `hsl(224, 58%, 46%)` / `hsl(286, 46%, 47%)`. Every
comparable surface in this repo derives instead:

- The exactly-analogous sibling table, `components/visualization/lib/basis-display.ts:4-6`, reads
  `VIZ_COLORS.fourier|chebyshev|legendre`.
- `VIZ_COLORS` (`lib/colors.ts:77-88`) is a `reactive()` object re-resolved from the live CSS custom
  properties by `resolveVizColors()` (`lib/colors.ts:90-96`), which `App.vue:11-13` runs on mount **and on
  every theme mutation via a `MutationObserver`**.
- The producer ships those tokens as explicit light/dark pairs — `tokens/light-dark.css:145-147`
  `--viz-fourier: light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1))`, mirrored in
  `tokens/dark-arm.css:113-115`. The dark arms are materially **lighter** (L 0.579→0.693, 0.484→0.718,
  0.532→0.739) precisely so they hold contrast on a dark surface.
- The repo already carries a hand-authored WCAG remediation of exactly this class: `web/src/style.css:114-124`
  darkens `--viz-amber` because the upstream light token measured ≈3.54:1 — the census records it as one of
  the two upstream carries held locally (`CENSUS:90-92`, FE §3/§8).

`NOTATION_OPTIONS`' literals never lighten. The active pill's *text* is `color: var(--pill-color)`
(`NotationPills.vue:45`) over a background that is that same color at 12% (`:43`) over `--background`.

**Arithmetic.** `hsl(6, 72%, 49%)` = `#D73523`; relative luminance 0.1711. Against a dark app surface the
active label lands near **3.4:1** — below AA 4.5:1 for a `--control-text` (≈`text-sm`) label, and the 12%
tint *reduces* it further by lifting the background.
**Marked UNPROVEN-NEEDS-LIVE (SS-13)** for the exact ratio: I did not resolve the dark `--background`
(`tokens/color-radius.css:57` → `var(--neutral-0)`, whose dark arm I did not chase to a literal), so the
number is an estimate.
**PROVEN statically and sufficient on its own:** the value is a *mode-invariant literal* occupying the exact
slot where every sibling in the same repo holds a *mode-varying token*. That structural claim needs no browser.

**Falsifier.** Find any `light-dark()`, `var(--viz-*)`, `.dark` arm, or `VIZ_COLORS` reference reachable
from `NOTATION_OPTIONS` → void. `grep -n "viz\|light-dark\|dark" web/src/lib/equation/notation.ts` → empty.

---

### L-5 · MAJOR · The pill-tint recipe is triple-duplicated, once per file, with no shared seam — and one copy lives in the file that *hosts* this component

Three verbatim instances of the same three-declaration recipe
(`background: color-mix(… 12%, transparent)` · `border-color: color-mix(… 40%, transparent)` · `color: <c>`):

| site | selector |
|---|---|
| `NotationPills.vue:42-46` | `.notation-active` |
| `FunctionInput.vue:244-249` | `.preset-pill.is-active` — **same file that mounts `<NotationPills>` at :223** |
| `BasisSelector.vue:269-273` | `.basis-toggle[aria-pressed="true"]` |

Plus two drifted near-copies in one of those files: `FunctionInput.vue:235-240` `.compute-btn:hover`
(50%/8%) and `FunctionInput.vue:250-255` `.is-auto-active` (40%/8% with three `!important`s). Five sites,
three ratio pairs, zero shared token or utility. The producer has the natural home for it — glass-ui's
`.glass-btn[aria-pressed="true"]` (`glass/surfaces.css:111-116`) is the same idiom already tokenized
upstream as `--surface-tint-10`/`--surface-tint-25`.

**Failure scenario.** A designer changes the selected-tint strength. Three files change if they are found;
in practice one is missed and the app ships two different "selected" registers on the same screen —
`/equation` already renders `.preset-pill.is-active` and `.notation-active` within one collapsible
(`FunctionInput.vue` presets block and :223), so the divergence would be visible side by side.

**Falsifier.** `grep -rn "12%, transparent" web/src/components/` returning fewer than three distinct files
carrying the 12/40 pair → void.

---

### L-6 · MAJOR · Two hosts, two unsynchronised notation states, one of them silently non-durable

- `/equation`: `EquationView.vue:30` `const notation = ref<NotationMode>(cached?.notation ?? "trig")` →
  `EquationView.vue:204` `v-model:notation="notation"` → `FunctionInput.vue:30` `defineModel<NotationMode>("notation")`
  → `FunctionInput.vue:223` `<NotationPills v-model="notation" />`. **Cache-seeded, durable.**
- `/visualize`: `EquationPanel.vue:18` `const notation = ref<NotationMode>("trig")` — a bare component-local
  ref, never written to `useWorkspaceStore` — → `EquationPanel.vue:96`. And the panel is
  `v-if`-mounted: `VisualizationView.vue:231` `<EquationPanel v-if="showEquation && store.epicycleData && !isEditing" …>`.

**Failure scenario.** On `/visualize` the user picks *Polar*, closes the equation panel (or starts editing a
contour, or `store.epicycleData` momentarily falsifies), reopens — notation is back to `"trig"` with no
notice, and `EquationPanel.vue:61-66`'s `watchDebounced(…, { debounce: 300, immediate: true })` immediately
re-POSTs `simplifyCoefficients(…, "trig")`, so the panel repaints a *different equation* than the one the
user was reading. Crossing routes loses it too: the two `notation` states never see each other.

**Falsifier.** Any write of `notation` into the workspace store or into `localStorage` from
`EquationPanel.vue` → void. `grep -n "notation" web/src/components/visualization/EquationPanel.vue` → lines
**6, 18, 48, 62, 96 only**; :18 is the bare `ref` (the sole write is the child's `v-model` at :96), and
:48/:62 are reads. Nothing reaches `useWorkspaceStore`.
**Scope honesty.** The *defect* is the hosts'; the *contributing* property is NotationPills' — being purely
controlled with no persistence seam and no default-source prop, it cannot help a host that forgets. Filed
here because a `./chip` migration (lane-frontend.md:441) would have to re-decide this.

---

## §3 — MINOR

### L-7 · MINOR · Two of the three declarations in `.notation-pill` are no-ops

```
37  .notation-pill {
38      border-radius: 9999px;      /* DEAD */
39      min-width: 4.5rem;          /* live */
40      justify-content: center;    /* DEAD */
41  }
```

Every glass-ui `<Button>` composes `.btn-pill` in its CVA base
(`dist/button-BNDWhAZb.js`, `"btn-pill tap-squish focus-ring …"`), and `.btn-pill`
(`glass/surfaces.css:119-156`) already sets `@apply inline-flex items-center justify-center` (`:120`) **and**
`border-radius: var(--radius-pill)` (`:134`). `size="sm"` adds `rounded-pill` on top. Line 38 additionally hardcodes
`9999px` past the token, so a `--radius-pill` retheme would skip these three pills. The dead twin
`.preset-pill { border-radius: 9999px }` sits at `FunctionInput.vue:241-243`.

**Falsifier.** Delete lines 38 and 40; if the pills lose stadium shape or centering, void.

### L-8 · MINOR · The active pill has no hover state at all, and the inactive pills hover unlike every other pill row in the app

`.notation-active` is a Vue-scoped rule → **unlayered**, so it beats Tailwind v4's `@layer utilities`
regardless of specificity. It therefore silently kills the variant's `hover:bg-accent hover:text-accent-foreground`
on the active pill — and no replacement is authored. `BasisSelector` handles both legs deliberately:
`:264-268` neutralizes the inactive hover to `background: transparent`, `:274-277` restores an active hover
at 16%. NotationPills does neither, so the *inactive* notation pills flash `bg-accent` while the *inactive*
basis pills do not, and the *active* notation pill is inert under the pointer.

**Falsifier.** The cascade reasoning is static and checkable by reading the two style blocks. The rendered
result is **UNPROVEN-NEEDS-LIVE (SS-13)**.

### L-9 · MINOR · Four measurable divergences from the pattern `notation.ts:3-8` says it matches

| leg | `.basis-toggle` | `.notation-pill` |
|---|---|---|
| resting border weight | `border-width: 2px` (`BasisSelector.vue:260`) | absent → variant's 1px |
| resting border color | `--foreground 12%` (`:261`) | absent → `border-input` |
| resting text color | `--muted-foreground` (`:262`) | absent |
| uniform min-width | `5.5rem` (`:259`) | `4.5rem` (`NotationPills.vue:39`) |
| mobile compaction | `@media (max-width: 639px)` block (`:279-293`) | absent (relies on `flex-wrap`, `:16`) |

Two pill rows, one design system, five divergences — none of them decisions the code records.
**Falsifier.** Diff `NotationPills.vue:36-47` against `BasisSelector.vue:258-293`.

### L-10 · MINOR · No labelling seam — the component cannot be named by its host

The root is a bare `<div class="flex flex-wrap justify-center gap-1.5">` (`:16`) with no `role="group"`, and
the component exposes no `id` / `aria-label` / `aria-labelledby` pass-through. The consequence is visible in
both hosts: `FunctionInput.vue:222` reaches for a name and gets a **dangling `<label>`** — no `for`, not
wrapping any control, therefore associated with nothing — and `EquationPanel.vue:96` gives no name at all.

**Falsifier.** `grep -n 'for=' web/src/components/equation/FunctionInput.vue` → the `<label>` at :222 has no
`for`. Any `role`/`aria-*` on `NotationPills.vue:16` → void.

### L-11 · MINOR · `notation.ts` is three unrelated concerns in one module, mis-homed relative to its own sibling, with a self-duplicated palette

- `NOTATION_OPTIONS` (`:9-18`) — pill data, consumed **only** by `NotationPills.vue:3`.
- `TIER_INFO` (`:20-42`) — tier chrome, consumed by `EquationView.vue:7` and `InfoCard.vue:5`.
- `energyColor` (`:44-48`) — a numeric→color function, consumed by `EquationPanel.vue:6`, `EquationView.vue:7`, `InfoCard.vue:5`.

No consumer wants more than one of the three. Meanwhile the *exactly analogous* table `basisDisplay` is
colocated at `components/visualization/lib/basis-display.ts`, beside its only consumer — so the repo
demonstrates the right placement and this module contradicts it. And `energyColor`'s three literals
(`:45,46,47`) are verbatim re-declarations of `TIER_INFO`'s three `color` fields (`:25,31,37`) **in the same
file**, with no shared constant: change a tier color and the energy ramp silently disagrees with the tier badge.

**Falsifier.** `grep -rn "from \"@/lib/equation/notation\"" web/src` → 3 files, each importing a disjoint
subset. And `grep -n "hsl(142, 71%, 45%)" web/src/lib/equation/notation.ts` → two hits.

### L-12 · MINOR · `TIER_INFO: Record<string, …>` should be `Record<EquationTier, …>` — the type lies in the direction that hides its own guard

`notation.ts:20-22` widens the key to `string` while `EquationTier` is exported two files away
(`types.ts:2`) and **both** consumers index with a value already typed `EquationTier`
(`EquationView.vue:69` `result.value.tier`; `InfoCard.vue:13` `props.tier`). Under `Record<string, X>` with
`noUncheckedIndexedAccess` off (`web/tsconfig.json` sets neither), the index expression types as
non-optional `X` — so the `?? TIER_INFO.spline` guards at both callsites are **invisible to the checker as
necessary and live at runtime**, i.e. exactly the configuration in which a future "remove the redundant `??`"
cleanup is type-safe and wrong. `Record<EquationTier, …>` would make the guard genuinely dead *and* make a
new tier a compile error.

**Falsifier.** `grep -n "noUncheckedIndexedAccess" web/tsconfig.json` → absent. Any consumer indexing
`TIER_INFO` with a non-`EquationTier` value → would justify the widening; there is none.

### L-13 · MINOR · Exported render source is mutable

`NOTATION_OPTIONS` (`notation.ts:9-18`) is a plain `T[]`, not `readonly` / `as const`. Any module that
imports it can `.push()`, `.sort()`, or reassign `.length`, mutating the render source for every mounted
instance across both routes at once. `TIER_INFO` and `basisDisplay` share the shape. Nothing exploits it
today — this is a hardening gap, not a live break.

**Falsifier.** `NOTATION_OPTIONS.length = 0` typechecks and compiles today.

### L-14 · MINOR · Idiom split inside a two-file chain: the host uses `defineModel`, the leaf hand-rolls it

`FunctionInput.vue:25-30` uses `defineModel` for all six of its models — **including `notation` itself at :30**
— and then hands that model to a child that implements the same contract by hand
(`NotationPills.vue:6-12`: `defineProps<{modelValue}>()` + `defineEmits<{"update:modelValue"}>()`, then a
manual `emit(...)` at `:25`). `defineModel<NotationMode>()` collapses lines 6-12 to one and removes the
hand-written emit. Same repo, same Vue, same call chain, two idioms.

**Falsifier.** `grep -n "defineModel" web/src/components/equation/FunctionInput.vue` → 6 hits;
`… NotationPills.vue` → 0.

---

## §4 — INFO, plus the second derivation finding and the census correction

### L-15 · INFO (latent, explicitly NOT a live defect) · The rendered `<button>` carries no `type`

Chain: `NotationPills.vue:17` `<Button>` → glass-ui `Button` forwards `type: props.type` (undefined) through
`mergeProps` into reka-ui `Primitive` → `Primitive.js:11,26` (`inheritAttrs: false`,
`h(props.as, attrs, {default: slots.default})` with `as` defaulting to `"button"`) → Vue omits `undefined`
attributes → the DOM node has **no `type`**, i.e. the HTML default `type="submit"`.

**I am explicitly not claiming a live break:** `grep -rn "<form" web/src` → **empty**. The whole app is
form-free, so nothing submits. Recorded so a later wave that introduces a `<form>` — or a `./chip` migration
that changes the underlying element — does not have to re-derive this, and so that a future auditor does not
file it as live.

### L-16 · INFO · Zero behavioral coverage

Census FE §0/§9 (`CENSUS:114-116`): **vitest is absent repo-wide**; the only frontend gates are `vue-tsc`
plus 29 Playwright tests on a single chromium project. `grep -rn "notation\|pill" web/e2e/` returns only two
incidental `btn-pill` *comments* (`visualization-ux.spec.ts:122,171`). **No spec clicks a notation pill,
asserts the tint, asserts the emitted mode, or asserts persistence.** Every finding above — L-1's ARIA gap,
L-3's silent 4th mode, L-6's reset-on-reopen — is in a region with no automated witness at all.

### L-17 · INFO · The `polar` icon is a fragment

`notation.ts:17` `icon: "Ae"`. The other two read as notation (`"sin"`, `"eⁱ"`); polar's is the first two
characters of `Ae^{iφ}` with the meaning-bearing part removed, and it is rendered in `cm-serif` at 1.3em
(`NotationPills.vue:27-30`) where it reads as a truncation rather than a glyph. Cosmetic; filed because a
`./chip` migration re-authors these anyway. Not measurable without a live render — **UNPROVEN-NEEDS-LIVE (SS-13)**.

### D-2 · MAJOR (derivation substrate) · Every glass-ui callsite in the tree is an unresolved leaf — 89/89 `Button`, 396/512 overall

The same registry row exposes a second blind spot of the R5-7 family:

```
callsite:web/src/components/equation/NotationPills.vue:17:Button:0.0  →  "resolution": "LOCAL_OR_GLOBAL_OPEN", "target": null
```

Repo-wide over R6's 512 callsites: `RESOLVED` **110** · `LOCAL_OR_GLOBAL_OPEN` **396** (77.3%) ·
`DYNAMIC_TARGET_OPEN` 6. **All 89 `Button` callsites are open — 89/89.** The deriver resolves relative-path
SFC imports (both `NotationPills` *host* callsites are `RESOLVED`, with `target` set) but not bare-specifier
package imports. Against the census's own framing of fourier as *"the deepest, cleanest consumer in the
constellation — 95 named-import statements / 21 subpaths / 49 symbols"* (`CENSUS:89-91`), a derivation that
resolves **zero** of them cannot support any instance denominator over the glass surface — which is the
principal surface the mega-tranche's 4.0.0→7.0.0 uplift (`CENSUS §5`, lane-frontend.md §5) has to budget.

**Severity is MAJOR, not BLOCKER, and the distinction is the point.** Unlike D-1, this defect is *declared*:
`LOCAL_OR_GLOBAL_OPEN` is an honest label for an open leaf. D-1 is a blocker precisely because it labels a
fabricated number `..._SOURCE_DERIVED`.

**Falsifier.** Any registry callsite whose `tag` resolves to a `@mkbabb/glass-ui` subpath with
`resolution: "RESOLVED"` → void. Over all 512 rows there are none.

### C-1 · CENSUS CORRECTION (explicit contradiction, per lane law) · `lane-frontend.md:441` "currently 6× `Button`" is not sourced from the tree

`formation/fourier/lane-frontend.md:441` records the NotationPills shadow row as
`| equation/NotationPills.vue | 47 | ./toggle-chip (4.0.0) → ./chip (5.0.0+) | currently 6× Button |`.

The tree carries **one** `<Button>` tag (`NotationPills.vue:17`), and R6's registry carries exactly **one**
`Button` callsite in the file — the only other two `Notation`-matching callsite rows are the two *hosts*
(`FunctionInput.vue:223`, `EquationPanel.vue:96`). Both readings that could produce a 6 fail:

- **(a) `18 ÷ 3 = 6`** — i.e. derived from D-1's corrupted `cardinality`. Plausible provenance, wrong number.
- **(b) 3 options × 2 mount sites** — but the two mounts are on **mutually exclusive routes**:
  `EquationPanel` → `VisualizationView.vue:231` → `/visualize`; `FunctionInput` → `EquationView.vue:204` →
  `/equation`. Six instances never co-exist.

**The correct row:** *1 `<Button>` callsite · 3 instances per mount · 2 mutually-exclusive mount sites
(max 3 live).* Everything else in that row stands — the `./toggle-chip` → `./chip` disposition and its
blocker are correct, and the **resolution deadlock** (`CENSUS:107-110`: glass 4→7 ∧ keyframes 4.3→6 ∧
value 0.13→4.0 is one atomic transaction) means **no fix below may be written as "migrate to `./chip`"** —
every repair here must be authored against the installed 4.0.0 `Button`.

---

## §5 — The viz render path: where this component touches it, and where it does not

Census FE §6 (`CENSUS:85-87`): *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases
(epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF;
FrequencyGraph watch-driven) + 12 SVG surfaces."* `CENSUS:111-114`: the two rAF clocks are **ungated under
`prefers-reduced-motion: reduce`**.

NotationPills touches that path at exactly one place, and the touch is **compositing, not raster**:

- **`/visualize`** — it mounts inside `EquationPanel.vue:70` `<div class="eq-panel glass-wash">`, an
  `absolute` overlay at `z-index: var(--z-controls)` (`:118-120`) stacked directly over the epicycle canvas
  driven by the store rAF clock. `glass-wash` is a `backdrop-filter` surface, so a notation click repaints a
  `color-mix()` background *inside a backdrop-filtered layer that sits above a per-frame-invalidated canvas* —
  the one configuration where a trivial CSS state change can cost real compositor work.
- **It does not reach the raster.** A notation change reaches only `EquationPanel.vue:61-66`'s
  `watchDebounced(…, 300ms)` → `simplifyCoefficients` (a POST) → `latex`/`energy`; on `/equation` it reaches
  `EquationView.vue:176-178`'s "cheap re-render on notation/budget change". **No canvas, no coefficient
  recompute, no rAF, no WebGL** — consistent with §6's WebGL/WebGPU-ABSENT finding.
- **Not a finding, filed to prevent a double-count.** The pill's transitions are inherited from `.btn-pill`
  (`glass/surfaces.css:149-155`: surface legs — background-color/border-color/box-shadow/color/opacity — on
  `--duration-fast`/`--ease-standard`, plus a `scale` leg on `--spring-smooth`).
  NotationPills authors **no** motion of its own and therefore owes **no**
  `prefers-reduced-motion` guard — the reduced-motion seat for that scale leg is the producer's
  (`CENSUS:111-114` names `DockBackgroundToggle` as the canonical one). F.W4 should not charge
  `CENSUS:111-114`'s rAF gap to this component.
- **UNPROVEN-NEEDS-LIVE (SS-13):** whether the 12%/40% `color-mix` repaint inside `glass-wash` over a running
  rAF canvas produces a measurable frame cost. Static analysis establishes the stacking relationship; only a
  live trace establishes the cost. Cheapest live probe: toggle notation with the epicycle clock running and
  read paint/composite in a performance trace of `/visualize` with the equation panel open.

---

## §6 — Superlatives (L-18 runs both ways — each carries its falsifier)

**S-1 · Goldilocks, exactly — and structurally leak-proof.** 47 lines; one job; no state, no lifecycle, no
watcher, no composable, no listener, nothing to tear down. In a family whose head is `EquationView.vue` at
469 and `ConvergencePlot.vue` at 410 (lane-frontend.md:128-141), this is the only equation-family SFC with a
**zero-teardown surface** — the leak/teardown leg of the LIBRARY axis is not merely passed here, it is
*vacuous*, which is the strongest form of passing it.
**Falsifier.** `grep -nE "onMounted|onUnmounted|onBeforeUnmount|watch|addEventListener|setInterval|setTimeout|requestAnimationFrame" NotationPills.vue` → **empty**.

**S-2 · The data/render split is the right one.** The option table is data (`notation.ts:9-18`) and the
component is a pure projection of it, so adding a notation is a one-line data edit rather than a template
edit. This is what makes L-3 worth fixing rather than worth rewriting: the shape is already correct, it
just needs the union bound to the table.
**Falsifier.** Any option-specific branch in the template → void. There is none; `:17-32` is uniform over `opt`.

**S-3 · Half the union correspondence *is* enforced, with the cheapest possible mechanism.** `value: NotationMode`
(`notation.ts:11`) makes a typo in any option's `value` a `vue-tsc` error. The direction that a plain
annotation *can* enforce is enforced; L-3 is precisely and only the other direction.
**Falsifier.** Change `"polar"` to `"polr"` at `:17` and typecheck — it errors.

**S-4 · Genuinely controlled: no local mirror, therefore no desync surface.** The component holds
**no** `ref`/`computed` shadowing `modelValue`; `:key="opt.value"` is a stable non-index key over a
non-reordering finite table; `@click` emits the option's own `value`, never a derived index; the payload is
typed `[value: NotationMode]` (`:11`). Contrast the sibling it is compared to throughout this file:
`BasisSelector.vue:37-39` keeps a local `selected` ref re-synced by a `watch` on the prop — a real desync
surface (and the seat of BasisSelector's own `props.activeBases`-vs-`selected` divergence risk) that
NotationPills simply does not have. **On v-model correctness the subject beats its own model.**
**Falsifier.** Any `ref(props.modelValue)` or `watch(() => props.modelValue, …)` in the file → void. There is none.

**S-5 · The producer seam is the correct one, and it is the house idiom.** It consumes the producer's variant
(`variant="outline" size="sm"`) and adds exactly one per-instance retint hook projected as a single custom
property (`--pill-color`), rather than re-implementing the button. That is verbatim the law
`BasisSelector.vue:249-257` writes down: *"`.basis-toggle` is the per-instance retint hook over
`<Button variant="outline" size="sm">`. The variant already ships the focus-ring, the press-scale, the
rounded-pill shape, and the disabled geometry."* And the projection is *mechanically sound* end to end,
which I verified rather than assumed: glass-ui `Button` declares `class` as a prop so it reaches `cn()`
exactly once (no double-application), while `style` is undeclared and therefore falls through `$attrs` →
`Primitive` (`inheritAttrs: false`, explicit `h(props.as, attrs, …)` at `Primitive.js:26`) → onto the real
`<button>`. **`--pill-color` demonstrably lands.** L-1/L-8/L-9 are about legs the component forgot to author
on a correct seam — not about the seam.
**Falsifier.** If `class` were undeclared on the glass-ui `Button` it would double-apply; if `Primitive` did
not forward `attrs` for non-self-closing tags, `--pill-color` would never reach the element. Both were read:
`dist/button-BNDWhAZb.js` props block declares `class`; `Primitive.js:26` forwards `attrs`.

---

## §7 — Hypotheses tested against the tree and **REFUTED** (recorded so no later wave re-files them)

| hypothesis | why it failed |
|---|---|
| The 1.3em icon span overflows the pill's content box | `--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor))` (`tokens/offsets-sizing.css:150`) = 36px at identity; `.btn-pill` padding-block `calc(0.5rem * --ui-scale)` = 8px; border 1px → content box **18px**. Icon = 1.3 × `--control-text` (≈14px) = **18.2px**. 0.2px, sub-pixel. **Not claimable.** (Note: `.basis-icon` at 1.5em = 21px *would* overflow — not this component.) |
| The scoped `.notation-pill` fails to reach the `<button>` through two component layers | Vue propagates the parent scope id through single-root component chains; and the identical construction is the app's shipped idiom at `BasisSelector.vue:143` (`class="basis-toggle"` on the same producer `<Button>`). **No defect.** |
| `class` + `:class` double-applies because glass-ui declares `class` as a prop | The template compiler merges static + dynamic into one `normalizeClass([...])` binding; declaring `class` as a prop removes it from `$attrs`. Applied exactly once through `cn()`. **No defect.** |
| `cm-serif` (`NotationPills.vue:27`) is a dead class | It is a real producer `@utility` (`typography/utilities.css:60-65`), reachable because `src/style.css:3` imports `@mkbabb/glass-ui/styles`. **No defect.** |
| The multi-line `class` attribute (`:27-28`) breaks Tailwind v4 candidate extraction | The v4 scanner splits candidates on whitespace, newlines included. **No defect.** |
| No `type="button"` causes form submission | `grep -rn "<form" web/src` → empty. Latent only; filed as L-15 with the negative result stated. |
| `NotationPills` is swallowed by R5-7's blind spot | Its `v-for` is on a *component* callsite and **does** register (R6 registry, `…NotationPills.vue:17:Button:0.0`). R5-7's letter does not reach it — but its uncured sibling does, which is D-1. |

---

## §8 — Repair order (authored against installed glass-ui **4.0.0**; `./chip` is deadlock-blocked per `CENSUS:107-110`)

1. **L-1** — bind `:aria-pressed="modelValue === opt.value"` and rekey the tint to
   `.notation-pill[aria-pressed="true"]`. This single edit discharges L-1, makes L-2's docblock true, and
   revives the producer's two dead `aria-pressed:` utilities. Add `role="group"` + a labelling seam (L-10).
2. **D-1** — re-derive `cardinality` by parsing the literal (or refuse to emit a `_SOURCE_DERIVED` proof
   label when the count is not AST-derived). **Blocking for F.W4** — it consumes these denominators.
3. **L-3** — `as const satisfies readonly { value: NotationMode; … }[]` plus a union-coverage assertion.
4. **L-4** — route the three colors through `VIZ_COLORS` / `--viz-*` (`basis-display.ts:4-6` is the pattern).
5. **L-6** — decide, once, whether notation is workspace state; if yes, both hosts read one source.
6. **L-5 / L-7 / L-8 / L-9** — collapse the three tint copies onto one hook, drop the two dead declarations,
   author the missing hover and resting legs.
7. **L-11 / L-12 / L-13 / L-14** — split `notation.ts`, key `TIER_INFO` by `EquationTier`, freeze the
   exports, adopt `defineModel`.
8. **L-16** — the first spec in this family should assert the emitted mode and the pressed state; today
   nothing here has a witness.
