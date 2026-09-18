# P-1 — Semantic-Equivalence Assay (Differential Harness)

**Seat:** PROOF SEAT P-1 (mechanical engineering; owner-mandated pre-execution gate, D-23 mirror-primary).
**Date:** 2026-07-20.
**Engines under differential:**

| role | engine | entry | mechanism |
|---|---|---|---|
| **LIVE** | value.js v4 public CSS surface | `dist/subpaths/css.js` → `parseCssColor` / `parseTimingFunction` / `parseStylesheet` / `collect*` / `parseKeyframeSelector` | regex + hand-rolled scanners; 8-code `ParseIssue` union |
| **C14 (mirror)** | `W/c14-css/src/css/api.ts` over `@mkbabb/parse-that@1.0.0` | `parseColor` / `parseEasing` / `parseStylesheet` | combinator CST → Value-like lowering; 3-code `CssDiagnostic` union |
| **WITNESS** | deposed pre-v4 parse-that tree (`W/deposed/src/parsing/`) | `parseCSSColor` / `parseCSSStylesheet` / `CSSValues` | **NOT RUNNABLE — see §5** |

## GATE VERDICT: 🟢 GREEN

**Zero unarbitrated MIRROR-DEFECTs on the frozen-surface subset.** Every cross-engine
difference is either (a) coverage-narrowing that C14's own `status.json` openly
declares born-RED, or (b) a **live-side (regex) finding where C14 is the
spec-correct engine**. C14 never produced a wrong value on an input it accepts,
never accepted an input the live parser + spec reject, and never falsely rejected
an input inside its own declared W0 shape.

---

## 1. Comparability boundary (why the asymmetry is by design)

The two engines are **deliberately asymmetric**. C14 is not a full CSS parser — its
`README` + `proof/status.json` declare it an *isolated W0 formation prototype*
whose **only product-shaped verticals are `oklch()`, `cubic-bezier()`, and one
qualified stylesheet rule**; "full … CSS L4 … stylesheet coverage" and
"production integration" are explicitly **born-RED (P01)**. Its `api.ts` exposes
exactly three doors:

- `parseColor` → **oklch-only** (`OklchValue`); grammar requires `oklch( <percentage> <number> <angle|number> [ / <alpha> ] )`.
- `parseEasing` → **cubic-bezier-only** (`CubicBezierValue`); 4 comma-separated numbers, x∈[0,1] enforced.
- `parseStylesheet` → **qualified-rules-only** (`StylesheetValue`); refuses all at-rules; deep-parses only `color` (→ oklch) and `animation-timing-function` (→ cubic-bezier) declarations, all other declaration values pass through **verbatim as opaque strings**.

The **FROZEN-SURFACE SUBSET** for the gate is therefore the *intersection* of the
value.js v4 frozen public surface with C14's declared W0 shape:
**`{ oklch(...) colors, cubic-bezier(...) easings, all-qualified stylesheets }`.**

A **MIRROR-DEFECT** (the only RED trigger) is one of:
- **(A) DIVERGENT_VALUE** — both engines accept an in-shape input but the numeric semantic cores disagree;
- **(B) MIS_ACCEPT** — C14 accepts an input the live parser **and spec** reject;
- **(C) FALSE_REJECT_IN_SHAPE** — C14 rejects an input unambiguously valid within C14's *own* declared W0 shape.

**COVERAGE_NARROWING** (C14 declines an input *outside* its declared shape that the
live superset accepts) is **not** a defect — `status.json` declares it. Likewise a
case where C14 accepts valid CSS the live regex parser over-validates and rejects
is a **live-side** finding (**LIVE_STRICTER**), never a mirror-defect.

---

## 2. Corpus

**403 deduplicated CSS strings**, assembled and provenance-tagged by
`W/equivalence/harvest.mjs`. Item-count reached by each provenance bucket
(buckets overlap, so counts sum > 403):

| bucket | source | items reached |
|---|---|---|
| **(a)** | `test/parsing/**` (the parser test dir) | 19 |
| **(b)** | CSS-bearing string literals across the other `test/*.test.ts` files | 232 |
| **(c)** | demo CSS — `demo/**/*.css` (whole-file + per-rule slices) | 84 |
| **(d)** | the C14 assay's own CSS inputs — `c14-css/test/**` | 27 |
| **seed** | curated adversarial seed set (frozen-surface + edge coverage) | 70 |

**Provenance note on source (d).** `c14-css/proof/corpus.json` is **not** a CSS
corpus — it is a file-integrity ledger (`schema:"c14-corpus-receipt/1"`; rows are
`sha256 TAB bytes TAB path`, 49 files / 69 963 bytes). The assay's actual CSS
*input* corpus lives in its test files, which is what bucket (d) harvests. The
ledger fact is recorded in `corpus.json.c14LedgerNote`.

Routing hints (how each item was doored): stylesheet 121, color 84, value 120,
easing 43, keyframe-selector 22, (seed) sheet 13. `value` and `keyframe-selector`
items have **no C14 door** and are handled as out-of-scope + a mis-accept guard.

---

## 3. Congruence table

| verdict | count | meaning |
|---|---:|---|
| `STRUCT_CONGRUENT` | **105** | both accept; **numeric semantic cores identical** (representation differs only by field naming — see §3.1) |
| `CONGRUENT_REJECT` | **50** | both reject (malformed / invalid input) |
| `COVERAGE_NARROWING` | **95** | live accepts an input **outside C14's declared shape**; C14 declines (born-RED, not a defect) |
| `OUT_OF_SCOPE` | **142** | `value` / `keyframe-selector` items — no C14 door; mis-accept guard clean |
| `LIVE_STRICTER` | **10** | C14 accepts a well-formed qualified rule; **live over-validates and rejects** (live-side finding — §4.R2) |
| `ENGINE_EXCEPTION` | **1** | `oklch()` — **live throws**; C14 clean-rejects (live-side finding — §4.R1) |
| **`DIVERGENT_VALUE`** | **0** | — |
| **`MIS_ACCEPT`** | **0** | — |
| **`FALSE_REJECT_IN_SHAPE`** | **0** | — |

### 3.1 Frozen-surface subset — the gate scope

| door | in-shape inputs | both-accept → core check | congruent-reject | narrowing (non-defect) | live-throw |
|---|---:|---|---:|---:|---:|
| **oklch color** | 43 | **17 → all numerically identical** | 5 | 20 | 1 |
| **cubic-bezier easing** | 21 | **13 → all numerically identical** | 8 | 0 | 0 |
| **qualified stylesheet** | 134 | **75 → selectors + color/atf decl numerics identical** | 30 | 19 | 0 |

All **17** both-accept oklch inputs and all **13** both-accept cubic-bezier inputs
produced **bit-for-bit-equal semantic cores** (float tolerance 1e-9). Worked
examples (verified live == C14):

- `oklch(62.8% .257 29.23 / 85%)` → `channels [0.628, 0.257, 29.23], alpha 0.85`
- `oklch(50% .1 .5turn)` → `[0.5, 0.1, 180]` (turn→deg agreement)
- `oklch(50% .1 200grad)` → `[0.5, 0.1, 180]` (grad→deg agreement)
- `cubic-bezier(0.25, 0.1, 0.25, 1)` → `[0.25, 0.1, 0.25, 1]`
- `cubic-bezier(2, 0, -1, 1)` → **both reject** (x1 out of [0,1] — spec-correct on both)
- `.swatch:hover { color: oklch(…); animation-timing-function: cubic-bezier(…); }` → selector + both declaration numerics identical

**Representation-difference note (why STRUCT_ and not EXACT_ congruent).** The
engines return the same *numbers* in different *shapes* — that is a named
representation difference, deliberately normalized away for the semantic check:
- color: live `{space,channels,alpha}` vs C14 `{type,space,channels,alpha}`;
- easing: live `{kind,x1,y1,x2,y2}` vs C14 `{name,coordinates:[…]}`;
- stylesheet: live rich `StylesheetItem[]` AST (declaration values are a full
  `CssValue` tree) vs C14 flat `cssRules` with color/atf lowered + everything
  else kept as a raw string; selectors: live canonicalizes whitespace to a
  `string[]`, C14 preserves the raw source `selectorText` (its serialize-oracle
  contract). Selectors were compared whitespace-normalized; declaration names
  comment-stripped; only the color/cubic-bezier declaration numerics compared.

---

## 4. Every divergence, classified

**MIRROR-DEFECTs (C14 wrong): NONE.** Mis-accept guard on the color/easing doors:
**0 failures** — C14 never accepted a `value`, `keyframe-selector`, hex, named, or
non-oklch/non-cubic-bezier string through `parseColor`/`parseEasing`.

The differential *did* surface live-side (regex) findings. These are recorded for
the wider audit; **none flips the mirror gate** because in each the witness+spec
agree that **C14 is the correct engine**:

- **R1 — `parseCssColor` throws on empty-body functional colors (REGEX-DEFECT).**
  `oklch()`, `rgb()`, `hsl()`, `lab()`, `color()`, `rgba()`, `oklch( )` all throw
  `TypeError: Cannot read properties of undefined (reading 'replace')` from
  `parseFunctionalColor` (`src/css/grammar.ts` ~L181: `splitTopLevel(slash[0]!.replace(…))`
  where `slash[0]` is `undefined` for an empty body). The frozen public
  `parseCssColor` should return a clean `ok:false`. **C14 clean-rejects all of
  them.** (verified by direct probe.)

- **R2 — `parseStylesheet` over-validates known declarations (10 × LIVE_STRICTER).**
  Live rejects *valid* qualified rules whose declarations it recognizes and
  semantically validates, e.g.
  `.stagger-children > * { animation: stagger-child-in var(--…) var(--…) both; }`
  (`animation_option_invalid`),
  `… { animation-delay: calc(var(--stagger-base,0ms) + 240ms); }`
  (`animation_option_invalid`),
  `.specimen-seg { --specimen-ink: color-mix(in oklab, … oklch(from …) …); }`
  (`css_syntax`, relative-color inside color-mix). C14 correctly captures each as
  an opaque qualified-rule declaration value. All 10 are structurally well-formed
  CSS (balanced braces, real selectors) — this is live validation-depth /
  over-strictness, **not** a C14 mis-accept.

- **R3 — live leniency on a dangling alpha slash (bucketed under narrowing).**
  `oklch(50% .1 20 /)` — **live accepts** (drops the empty alpha, defaults α=1);
  **C14 rejects** (spec-correct: a trailing `/` with no alpha is invalid — the C14
  test asserts this). C14 is the correct engine; not a mirror-defect.

- **R4 — kf-selector range check (see §6).** Live `parseKeyframeSelector`
  range-validates percentages (rejects `150%`, `-10%`); C14's percent edge-witness
  does not. That witness is percentage-only and **not on the public api**.

- **R5 — comment-trivia attachment.** In a rule body, live folds a *preceding*
  comment into the following declaration's property **name**
  (e.g. name `"/* c */ --code-comment"`), whereas C14 yields the clean name
  `"--code-comment"`. Live still parses the declaration *value* correctly; C14 is
  the cleaner engine here. Live-side quirk; normalized away for the gate.

---

## 5. Witness (arbiter) — NOT RUNNABLE, arbitration on spec

The task designates the deposed pre-v4 tree the primary arbiter for DIVERGENT
cases. **A bounded execution attempt failed deterministically:**

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '…/deposed/src/units/color'
  imported from …/deposed/src/parsing/color/color.ts
```

**12 of the 18** witness source files import the retired pre-v4 value.js core
(`../../units`, `../../units/color/*`, `../../units/utils`, `../../utils`,
`../../easing`) — none present in the snapshot or in the v4 repo, which **removed
those trees at commit `164343c1` (`feat(v4)!: … retire pre-v4 src trees`)**.
(The witness *would* consume the same `@mkbabb/parse-that@1.0.0` the assay pins;
the blocker is the value.js-core dependency subtree, not parse-that.) Reconstructing
it means extracting the entire `src/units`+`src/utils`+`src/easing` subtree with
its transitive deps — **disproportionate, and moot: there are ZERO DIVERGENT cases
requiring arbitration.**

**Arbitration therefore rests on the CSS specs (Color 4 §oklch, Easing 1
§cubic-bezier, Syntax 3 §qualified-rule) + C14's own committed test oracle + the
live frozen surface, flagged witness-infeasible.** In every cross-engine
difference the three-way spec/live/C14-test agreement is unambiguous; none is a
SPEC-QUESTION, and none is a MIRROR-DEFECT.

---

## 6. kf consume-seam SHAPES (task item 4)

`keyframes-v-exec/src` reaches `@mkbabb/value.js/css` for exactly these seam
shapes (grep-confirmed): `parseStylesheet(css)` + `collectKeyframes(ast).map(({rule}) => rule.name)`
(`animation/validate.ts`, `animation/compile/adapter.ts`) and
`parseKeyframeSelector(start)` (`animation/compile/selector.ts`). Tested against
whatever the assay exposes:

| seam shape | LIVE | C14 |
|---|---|---|
| `parseKeyframeSelector("from"/"to")` | accept | **reject** — C14 has no `from`/`to` |
| `parseKeyframeSelector("50%")` | accept | accept (percent edge-witness) |
| `parseKeyframeSelector("entry 10%"/"cover")` | accept | **reject** — no named selectors |
| `parseKeyframeSelector("150%"/"-10%")` | **reject** (range 0–100%) | **accept** (no range check) |
| `parseStylesheet("@keyframes pulse {…}")` | accept | **reject — refuses all at-rules** |
| `collectKeyframes(ast)` → names | `["pulse"]` | **method does not exist** |

**Seam serviceability: NO.** C14 cannot serve the keyframes consume seams — it
refuses `@keyframes` (indeed every at-rule), exposes no `collectKeyframes`, and its
only keyframe-selector artifact (`grammar/l4/keyframes.ts` `completeKeyframeSelector`)
is a **non-exported, percentage-only, non-range-checking** edge witness. This is a
**coverage** result consistent with `status.json` (keyframes = born-RED thin
witness), **not** a gate defect: the frozen-surface subset excludes keyframes.

---

## 7. Verdict

> **🟢 GREEN — zero unarbitrated MIRROR-DEFECTs on the frozen-surface subset.**
>
> Across 403 corpus items and the frozen-surface intersection (43 oklch / 21
> cubic-bezier / 134 stylesheet), C14 produced **no wrong value, no mis-accept, no
> in-shape false-reject**. All 30 both-accept in-shape color/easing inputs are
> numerically identical to the live parser; 75 both-accept stylesheets agree on
> selectors and on every color/atf declaration's numerics. The only cross-engine
> disagreements are (i) declared coverage-narrowing and (ii) five live-side (regex)
> findings — R1 empty-functional-color crash, R2 over-strict stylesheet validation
> (×10), R3 dangling-slash leniency, R4 kf-selector range, R5 comment folding —
> in each of which C14 is the spec-correct engine.

**Reproduce:** `cd W/c14-css && node_modules/.bin/tsx W/equivalence/harness.ts`
(after `npm ci` in `c14-css`; live imported from the repo's built
`dist/subpaths/css.js`). Corpus regenerated by `node W/equivalence/harvest.mjs`.
Evidence retained in `W/equivalence/` (`harvest.mjs`, `harness.ts`, `corpus.json`,
`probe*.ts`, `witness-attempt.ts`). Machine form: `equivalence-results.json`.

*W = `/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof`.*
