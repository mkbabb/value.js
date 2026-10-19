SERVED MODEL: claude-opus-5[1m]

# X-W4 · artefact 4 — the A-16 RE-TEST RECEIPT (gate **B3**, CC-046)

**Filed BEFORE the first slider prop edit of this unit**, which is what CC-046's condition says
verbatim (`W4.md:390`): *"CC-046's condition is explicitly **before any schema fold**, so a receipt
filed at close is a failure, not a pass."*

- **Unit**: `X.W4.b` · **Track A · X·V (value.js)** · wave **X-W4** · sitting date of record
  **2026-09-17** (the owner's begin-word).
- **Wall clock at the measuring seat**: `2026-09-19 00:16:35 EDT`
  ⟨cmd⟩ `date "+%Y-%m-%d %H:%M:%S %Z"`.
- **HEAD at measurement**: `bda34afa` ⟨cmd⟩ `git log --oneline -1` · branch `tranche-u`
  ⟨cmd⟩ `git rev-parse --abbrev-ref HEAD`.
- **Slider prop edits landed by `X.W4.b` at the moment this receipt was written**: **ZERO**
  ⟨cmd⟩ `git status --porcelain -- demo/` → *(empty)*.

Every figure below was read from the **installed bytes on disk**, never from the spec's prose and
never from the wave record, and every count is **double-run**.

---

## 1. Installed producer — version, at the package's own bytes

```text
⟨cmd⟩ node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"
run1 → 7.0.0
run2 → 7.0.0

⟨cmd⟩ node -p "JSON.stringify(require('./package.json').dependencies['@mkbabb/glass-ui'])"
     → "^7.0.0"
```

**Installed `@mkbabb/glass-ui` = 7.0.0.** This is the version the whole of B3 is measured against.
It is NOT 8.x — X-W0.j's `GLASS8-REPIN-CENSUS.md` §0 returned **FAIL (1 of 4 at the elected 8.0.0)**,
so `X.W4.g` stays closed and nothing in this receipt depends on a Glass-8 byte.

## 2. `SliderProps` — the published direction seam, quoted at the file and line the spec names

`node_modules/@mkbabb/glass-ui/dist/components/slider/types.d.ts`, lines **11-12**, verbatim:

```ts
    dir?: Direction;
    inverted?: boolean;
```

Surrounding context from the same file (`:6-10`, `:1-3`), so the two lines are not quoted out of
their interface:

```ts
import type { Direction, FormFieldProps } from "../_shared/primitive";
export interface SliderProps extends FormFieldProps {
    modelValue?: number[] | null;
    defaultValue?: number[];
    disabled?: boolean;
    orientation?: Orientation;
    dir?: Direction;
    inverted?: boolean;
```

`Direction` is a published, closed union — `dist/components/_shared/primitive.d.ts:5`:

```ts
export type Direction = "ltr" | "rtl";
```

**The seam is not merely a type.** Both members are **runtime-declared props** on the packed
component, so a consumer that passes them is consuming a real prop and not an ambient attribute
⟨cmd⟩ `node -e "…slider-DzqeQmMu.js…"` → the `Slider` `props` object contains, verbatim:

```js
	__name: "Slider",
	props: {
		modelValue: {}, defaultValue: {}, disabled: { type: Boolean },
		orientation: {},
		dir: {},
		inverted: { type: Boolean },
		min: {}, max: {}, step: {}, …
```

**Verdict: A-16's re-test against installed disk PASSES.** Direction and inversion are expressible
today, at 7.0.0, through published props alone — no Glass-8 dependency, no producer byte, no wrapper.

## 3. `--slider-range-origin` — the zero-count, double-run

The spec's own instrument, verbatim (`W4.md:390`): *"`--slider-range-origin` = **0** hits in `demo/`
and `src/`"*.

```text
⟨cmd⟩ for i in 1 2; do grep -rn -- '--slider-range-origin' demo src | wc -l; done
run1 → 0
run2 → 0
```

**0 hits, both runs.** The A-16 variable is read nowhere in this repository's consumer surface.

## 4. What "producer-internal" MEANS here — a measured rule, not an opinion

A fence needs a rule that a later seat can re-run. The producer's own CSS supplies one: a variable
the producer **declares** is its own state; a variable the producer only **reads** through `var()`
is a consumer feed seam. Measured over `node_modules/@mkbabb/glass-ui/dist/glass-ui.css`:

| variable | declared by the producer? | read by the producer | classification |
|---|---|---|---|
| `--slider-range-origin` | **YES** — `--slider-range-origin:left center` · `--slider-range-origin:right center` (3 declaration sites; the direction re-shape) | 2 | **PRODUCER-INTERNAL** |
| `--slider-track-bg` | no (0 declarations) | 2 | consumer feed seam |
| `--slider-thumb-bg` | no (0 declarations) | 1 | consumer feed seam |
| `--slider-thumb-border-color` | no (0 declarations) | 1 | consumer feed seam |

The full producer slider vocabulary at 7.0.0, for the record
⟨cmd⟩ `grep -rhoE '\-\-slider[a-zA-Z0-9_-]*' …/glass-ui.css | sort -u` → **15**:
`--slider-range-bg` · `--slider-range-blur` · `--slider-range-origin` · `--slider-range-shadow` ·
`--slider-thumb-bg` · `--slider-thumb-border-color` · `--slider-thumb-border-w` ·
`--slider-thumb-hover-ring-color` · `--slider-thumb-hover-ring-w` · `--slider-thumb-shadow` ·
`--slider-thumb-size` · `--slider-thumb-spring` · `--slider-track-bg` · `--slider-track-height` ·
`--slider-vertical-size`.

Of those 15, the consumer surface reads exactly **three**, and all three are feed seams, never
internals ⟨cmd⟩ (per-variable `grep -rn … demo src | wc -l`):

```text
--slider-thumb-bg           : 1
--slider-thumb-border-color : 3
--slider-track-bg           : 8
```

All other twelve — `--slider-range-origin` among them — read **0**.

**The eight `--slider-track-bg` reads are already owned elsewhere and are NOT this unit's to move**:
`W4.md:89-90` books *"the four `--slider-track-bg` sites and `useSliderAnnouncements.ts`"*
(CC-105 / CC-106) to **`X.W4.g`** — *"they die in `X.W4.g` at the single 8.0.0 repin census, never
before, never by shim."* The census returned FAIL, so they stand untouched, by ruling.

## 5. The direction/inversion NEED, measured — there is none to express

CC-046's clause is conditional: *"express **any** direction/inversion need through `dir` / `inverted`
only."* This seat measured whether such a need exists inside its writable set before honouring the
clause, so the fence is not asserted over an empty set by accident:

| consumer `<Slider>` seat (in this unit's bounds) | direction / inversion signal at HEAD |
|---|---|
| `demo/picker/controls/ComponentSliders/ComponentSliders.vue:65` (the four channel strips) | **none** — `variant`, `min`, `max`, `step`, `class`, `:model-value`, `:style` (the three feed seams above) and `@update:model-value`. ⟨cmd⟩ `grep -n 'dir\|invert\|scaleX\|reverse\|rtl' <file>` returns only the prose word *"inverted"* inside a `<style>` comment at `:270` describing the touch-gate thumb FILL, and `--slider-*` feed names — **no direction mechanism, hand-rolled or otherwise** |
| `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:232` (gradient direction, 0–360°) | **none** — the control's *subject* is an angle; its track is not reversed. No `dir`, no `inverted`, no transform flip |
| `demo/workbenches/generate/GenerateControls.vue:297` (colour count, 1–12) | **none** |

**Conclusion: zero slider prop edits are owed by `X.W4.b`.** There is no direction or inversion need
to express, so expressing one would be invention, not execution. B3(ii) therefore closes as what the
spec calls it — a **regression fence**: this unit introduces **no** new read of a producer-internal
slider variable, and the fence is made permanent as a test in
`e2e/smoke/a11y-select-title.spec.ts` rather than left as a one-time grep.

## 6. What this receipt does NOT claim

- It does **not** claim `X.W4.g` may open. X-W0.j's census verdict stands: **FAIL, 1 of 4**.
- It does **not** retire CC-105 / CC-106. The eight `--slider-track-bg` reads and
  `useSliderAnnouncements.ts` are listed here only so the fence's denominator is honest.
- It does **not** re-litigate A-16. It re-tests A-16's premise against installed disk, which is the
  act CC-046 names, and records the result: **the premise holds at 7.0.0**.
