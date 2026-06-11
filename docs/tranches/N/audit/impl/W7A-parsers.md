# N.W7.A-1 — the parsing slice (E1, E2, VJ-3)

**Lane:** W7A-1 (impl). **Date:** 2026-06-11. **Branch:** `tranche-f-handoff`.
**Owner-scope honoured:** `src/**` + `test/**` only. No `package.json`, no
`vite.config.ts`, no `demo/`, no `api/`. No git commit/push.
**Spec sheet:** `docs/tranches/N/audit/impl/W7A-recon.md` §1 (E1), §2 (E2), §11 (VJ-3).

Three items landed: the `linear()` easing parser (E1), the `steps()` /
step-position parser (E2), and the `light-dark()` / `currentColor` deferred
color sentinels (VJ-3). Every new public symbol exports through the
`src/index.ts` barrel; every feature carries vitest coverage.

---

## E1 — `linear()` parser → `LinearStop[]`

**What landed.** A new focused parser module `src/parsing/easing.ts` exposing
`parseLinearStops(input: string): LinearStop[]`. It produces the existing
`LinearStop` shape (`src/easing.ts:28`) and feeds the existing `cssLinear`
evaluator (`src/easing.ts:33`) unchanged. The recon flagged the
god-module-vs-new-file decision; I lifted a dedicated `parsing/easing.ts`
because the parse domain belongs under `src/parsing/` (not `src/easing.ts`,
which is the *evaluator* domain) and E1+E2 together justify the module. It
consumes the `number`/`integer`/`istring`/`tryParse` primitives from
`src/parsing/utils.ts`.

**Where.**
- `src/parsing/easing.ts` — `percentage`, `linearStop`, `linearStopList`,
  `linearFunction` combinators + `parseLinearStops` (lines 24–84).
- `src/index.ts:220-222` — barrel export `parseLinearStops`.

**Division of labour honoured (recon §1).** The parser emits raw stops *as
written* — it does NOT resolve omitted positions or fill gaps. `cssLinear`
already does first/last→0%/100% defaulting + linear gap distribution
(`src/easing.ts:41-68`); the parser would double that semantics if it
pre-resolved. A two-percentage stop (`0.5 25% 75%`, a flat segment) emits TWO
stops sharing `output`, matching `cssLinear`'s flat-segment handling
(`src/easing.ts:56-60`). `input` is the 0–100 percentage; `cssLinear` divides by
100 at resolution. Overshoot/negative outputs parse (output unbounded).

**Tests** (`test/parsing-easing.test.ts`, `describe("parseLinearStops …")`, 11):
`parses a flat-segment stop into two stops sharing output` ·
`parses two evenly-spaced stops (no explicit positions)` ·
`parses a single explicit position` ·
`parses negative / overshoot outputs (output is unbounded)` ·
`tolerates extra whitespace between number and percentages` ·
`does NOT pre-resolve gaps — emits raw stops for cssLinear to resolve` ·
`round-trips a kf-emitted spring through cssLinear at the boundaries`
(f(0)≈0, f(1)≈1, f(0.5)≈0.78 anchor) ·
`is case-insensitive on the function name` ·
`rejects empty linear()` · `rejects a trailing comma`.

---

## E2 — `steps()` parser → `{ count, jumpTerm }`

**What landed.** In the same `src/parsing/easing.ts`:
`parseSteps(input: string): StepsArgs` producing `{ count: number, jumpTerm:
JumpTerm }`, ready to feed the existing `steppedEase(count, jumpTerm)` evaluator
(`src/easing.ts:293`). `JumpTerm` is `(typeof jumpTerms)[number]` — the same
union the evaluator accepts (`jump-start|jump-end|jump-none|jump-both|start|end`,
plus the legacy aliases the evaluator maps). The step-position parser orders the
`jump-*` canonical forms ahead of the `start`/`end` legacy aliases and
lowercase-canonicalises.

**Where.**
- `src/parsing/easing.ts` — `JumpTerm`, `StepsArgs`, `stepPosition`,
  `stepsFunction` + `parseSteps` (lines 86–142).
- `src/index.ts:221-222` — barrel export `parseSteps` + types `JumpTerm`,
  `StepsArgs`.

**Spec semantics (recon §2).** Position defaults to `jump-end` when omitted
(matches `steppedEase`'s default). `count` must be a positive integer: the
combinator parses the integer, and `parseSteps` guards
`Number.isInteger(count) && count >= 1`, throwing on `steps(0)` / `steps(-3)`.
`steps(4.5)` is rejected by the parse itself (the integer regex consumes `4`,
leaving `.5)` unconsumed → `wrap(rparen)` fails → `tryParse` throws). E2 is the
`steps(...)` *function* form only; the `step-start`/`step-end` keyword shorthands
remain the separate keyword surface (`stepStart`/`stepEnd`, `src/easing.ts:312`),
unchanged — as the charter scopes E2 to the function.

**Tests** (`test/parsing-easing.test.ts`, `describe("parseSteps …")`, 9):
`defaults the step position to jump-end` ·
`parses an explicit jump-start position` ·
`parses every spec step-position keyword` (all 6) ·
`is case-insensitive and canonicalises to lowercase` ·
`feeds steppedEase to reproduce the staircase` (f(0)=0, f(0.99)≈0.75, f(1)=1) ·
`steps(1, jump-none) is the guarded passthrough` ·
`rejects a zero count` · `rejects a negative count` ·
`rejects a non-integer count` · `rejects an empty steps()`.

---

## VJ-3 — `light-dark()` / `currentColor` sentinels

**What landed.** Two new color parsers in `src/parsing/color.ts`, wired into the
O(1) first-char `dispatch` table's letter buckets, producing typed *sentinels*
that defer resolution to the consumer's render seam and survive
parse → normalize → serialize verbatim:

- `currentColor` → `ValueUnit("currentColor", "color-keyword", ["color"])`
- `light-dark(a, b)` →
  `ValueUnit(FunctionValue("light-dark", [a, b]), "color-keyword", ["color"])`

**Where.**
- `src/parsing/color.ts` — `currentColorParser` + `lightDarkParser`
  (inserted after `nameParser`, ~lines 554–593).
- `src/parsing/color.ts` letter buckets — `c: any(currentColorParser, colorMix,
  colorFunction, nameParser)` and `l: any(labParser, lchParser, lightDarkParser,
  nameParser)`. The sentinels sit ahead of `nameParser` (the broad named-color
  identifier regex would otherwise consume `currentColor`/`light-dark` and reject
  on the COLOR_NAMES miss). The functional families (`color-mix`/`color()`/
  `lab`/`lch`) keep their per-bucket priority — byte-identical resolution for
  every currently-parsing input.
- `src/units/constants.ts:58` — `COLOR_UNITS = ["color", "color-keyword"]`. The
  sentinel unit joins the color-unit family in the `UNITS` tuple. `isColorUnit`
  (`src/units/utils.ts:22`) keeps its exact `=== "color"` check, so the sentinel
  is **deliberately excluded** from the RGB normalize path (its value is a
  keyword string or a `light-dark` FunctionValue, not a `Color`).
- `src/units/index.ts:74` — `ValueUnit.toString()` treats `"color-keyword"` like
  `"color"` (emits the wrapped value verbatim, no unit suffix), so the sentinel
  round-trips un-baked: `currentColor` → `currentColor`,
  `light-dark(white, black)` → `light-dark(rgb(255 255 255), rgb(0 0 0))`.

**Spec semantics (recon §11).** Both forms hard-parse-failed before (the BBNF
grammar `css-color.bbnf:90-93` declared `light-dark` but the live dispatch table
had no branch). The sentinel does NOT bake to RGB: the per-target resolution
(`currentColor` against inherited `color`; `light-dark` against the target's own
`color-scheme`) is the consumer's fold (keyframes.js BOOK). value.js emits the
sentinel only. `light-dark`'s arms ARE resolved to concrete colors at parse time
(only the per-scheme *pick* is deferred), and nesting holds: `light-dark(
currentColor, red)` keeps `currentColor` as a nested `color-keyword` sentinel.
System colors (`Canvas`, etc.) are MED priority and out of this slice (recon §11
"may be a follow-on"); `contrast-color()` (F2b) is a separate richer surface, not
aliased here (recon §11 caveat honoured).

**Tests** (`test/color-sentinels.test.ts`, 13):
- currentColor (3): typed sentinel not RGB; case-insensitive canonical spelling;
  round-trip verbatim.
- light-dark (6): FunctionValue sentinel of two colors; arms resolve to real
  colors; round-trip as a `light-dark(...)` string; case-insensitive name; nests
  a `currentColor` sentinel un-baked; accepts functional-syntax arms.
- byte-stability (4): `lavender` (l-bucket name) → RGB; `coral` (c-bucket name) →
  RGB; `color-mix(in oklab, …)` still parses; `lab()`/`lch()` still parse.

**Cross-effect caught + fixed.** Adding `"color-keyword"` to `UNITS` surfaced a
test that iterates the unit tuple asserting each is a parsable dimension
(`test/parsing.test.ts:27` `PARSABLE_UNITS`). `color-keyword` is a meta/sentinel
unit (like `var`/`calc`/`string`/`color`, already excluded) — added it to that
test's exclusion list (test/** scope).

---

## Gate outputs

- `npx vitest run` → **1640 passed (38 files)** — up from 1607 by the 33 new
  tests (`parsing-easing.test.ts` 20, `color-sentinels.test.ts` 13). ALL green.
- `npm run build` → **green**; `.d.ts` emitted; barrel exports
  `parseLinearStops`/`parseSteps`/`JumpTerm`/`StepsArgs` resolve in
  `dist/index.d.ts`.
- `npm run lint` → **exit 0** (`eslint . --max-warnings=0`).
- `npx tsc --noEmit -p tsconfig.lib.json` → **exit 0** (library typecheck clean).

## Files touched

- `src/parsing/easing.ts` (new) — E1 + E2 parsers.
- `src/parsing/color.ts` — VJ-3 sentinel parsers + dispatch-bucket wiring.
- `src/units/constants.ts` — `COLOR_UNITS` gains `"color-keyword"`.
- `src/units/index.ts` — `ValueUnit.toString()` serialises `color-keyword`
  verbatim.
- `src/index.ts` — barrel exports for E1/E2.
- `test/parsing-easing.test.ts` (new) — E1 + E2 coverage (20).
- `test/color-sentinels.test.ts` (new) — VJ-3 coverage (13).
- `test/parsing.test.ts` — `color-keyword` added to the `PARSABLE_UNITS`
  exclusion (meta-unit, not a dimension).

## Notes for downstream / coordination

- **Consume targets.** E1's kf-side consume target is the
  `kf/src/animation/utils.ts:106-130` `parseLinearStops` shim (recon §1 P2); E2
  bundles with E1 (kf's local `STEPS_LITERAL`). The VJ-3 sentinel's consumer is
  keyframes.js, which resolves `currentColor`/`light-dark` per-target at
  frame-prep against the target's OWN computed `color-scheme` (recon §11 / the
  binding caveat: NOT `:root`'s, NOT a global `matchMedia`). value.js ships the
  sentinel; the per-target fold is kf BOOK.
- **No new `as any` / `as unknown as`.** The slice adds zero type escapes; the
  sentinel typing flows through the existing `ValueUnit<T,U>` / `FunctionValue`
  generics. The `light-dark` arm `.map` destructure types narrow off `all(...)`.
- The diagnostics-sink item (VJ-F2, recon §8) is the *other* W7.A parse item and
  was not in this lane's LANE W7A-1 assignment (E1/E2/VJ-3 only); it is gated on
  the parse-that `^0.9` re-pin (recon §13, W7.B scope) regardless.
