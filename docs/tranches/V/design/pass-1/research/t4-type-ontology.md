# V · PASS-1 RESEARCH — Family 4 · TYPE-ONTOLOGY / DOMAIN-PRIMITIVE

**Researcher id**: `t4-type-ontology` · **family**: 4 (TYPE-ONTOLOGY) · **pass**: 1 · **date**: 2026-07-13 · **model**: opus (declared).
**Charter**: falsify/establish Family 4's four pass-1 gaps (`DESIGN-CAMPAIGN.md §3` row 4 + `portfolio.md`
Family 4): (a) what a `{ast, diagnostics}` public parse API costs (breaking? exports-map churn?); (b) is
threading `onParseError` sufficient or must the return type change; (c) full VJ bug-corpus verification —
which of A6's 11 are ACTUALLY still open; (d) does the type lattice imply a materially different `units/`
layout. Every claim carries its command; **every VJ verdict below was RUN against `dist/value.js`**, not read.

> **Assignment-recovery note (load-bearing, read first).** The orchestrator spawned this probe with the
> task template's `${x.id}`/`${x.family}`/`${x.focus}` UN-interpolated (literal placeholders). On disk,
> Family 1 (`r1.md`) and Family 2 (`p1-graph-projection.md` + `f2-graph-projection.md` — DOUBLE-covered)
> were already taken; **Families 3/4/5/6 were uncovered.** I self-selected **Family 4** because it is the
> ONE uncovered family whose research input — the keyframes.js `parseCSSValue` bug corpus (A6) and the
> parse-API-cost question — is (1) the owner's EXPLICIT D3 edict ("note and analyze the most recent
> keyframes.js tranches … parseCSSValue buggies and goblins"), (2) untouched by the covered graph/gate
> probes, and (3) concretely measurable RIGHT NOW against the built dist. Filename is descriptive
> (`t4-type-ontology.md`) to survive any sibling collision. Isolation honored: I read the charter
> §0/§0.1/§0.2/§1/§2, portfolio Part A (survey) + A6 + Part C, and Family 4's section ONLY — not F3/F5/F6.

---

## §0 Method (reproducible, from repo root `tranche-u`)

- Static: `grep -rn` over `src/`, `demo/`, `test/`; `wc -l`; `node -e "require('./package.json').exports"`.
- Dynamic: `node scratchpad/vj-probe.mjs` + `vj8.mjs` importing `dist/value.js` (dist present:
  `ls dist/value.js` → EXISTS). All VJ verdicts are RUN output, transcribed verbatim.
- TS-lib collision proof: `grep -n 'interface PropertyDescriptor' node_modules/typescript/lib/lib.es5.d.ts`.

---

## §1 GAP (c) — the VJ corpus, VERIFIED against `dist/value.js` (the load-bearing finding)

Ran each trigger input from A6. **9 of 11 are CLOSED; 1 OPEN; 1 consumer-seam (not a value.js src defect).**

| # | VJ class | probe input | MEASURED result | verdict |
|---|---|---|---|---|
| 1 | multi-fn truncation (VJ-L3) | `parseCSSValue("scale(2) rotate(45deg)")` / `parseCSSValues(…)` | `parseCSSValue` **THROWS** (CSSParseError, U-F29); `parseCSSValues` → `"scaleX(2) scaleY(2) rotateZ(45deg)"` (both fns kept) | **CLOSED** |
| 2 | serialize round-trip (VJ-Q9) | `oklch(0.6 none 200)` · `color(display-p3 1 0 0)` | → `"oklch(0.6 none 200)"` (none kept, **no NaN**) · → `"color(display-p3 1 0 0)"` (**no wrapper loss**) | **CLOSED** |
| 3 | @function colon-split / self-consistent garbage (KF-1) | (fixed @2.0.0) | serialize-fidelity gate covers it | **CLOSED** (fixed 2.0.0) |
| 4 | dashed-function call (VJ-Q6) | `parseCSSValue("--double(2)")` | ctor=FunctionValue, `name="--double"`, → `"--double(2)"` | **CLOSED** |
| 5 | if() multibranch lossy (VJ-Q7) | `if(style(--a): red; style(--b): green; else: blue)` | round-trips, **3 branches preserved** | **CLOSED** |
| 6 | contrast-color passthrough (VJ-Q1) | `parseCSSValue("contrast-color(red)")` | → `"rgb(0 0 0)"` (**eager-resolved**, not opaque) | **CLOSED** |
| 7 | flatten provenance drop (VJ-Q4/L1) | `--double(2)` retains `name` after parse (see #4) | `FunctionValue.name` preserved | **CLOSED** |
| 8 | unflatten array-boxing → NaN | `flattenObject({opacity:parseCSSValue("1.5")})` → `unflattenObject` | flat=`{"opacity":[1.5]}`; unflat.opacity **isArray=true**, `toString()="1.5"` (**no NaN at value.js surface**) | **CONSUMER-SEAM** — flatten's contract IS array-valued (`Record<string,any[]>`); the NaN manifests only in the kf-U downstream consumer, NOT reproducible as a value.js public-API defect |
| 9 | **NO diagnostics channel → `parseable:true` false-positive** | `parseCSSValue.length` (arity) = **0**; no `onParseError` param on the public fn | plumbing exists (`tryParse`/`parseResult` accept `OnParseError`; `ParseDiagnostic`/`OnParseError` exported on `.`+`./parsing`) but **NOT threaded to public `parseCSSValue`/`parseCSSValues`/`parseCSSStylesheet`** | **OPEN** |
| 10 | spring linear() asymmetry (VJ-L2) | (fixed @3.1.0) | — | **CLOSED** (fixed 3.1.0) |
| 11 | **`PropertyDescriptor` type-name collision** (KF-7) | `grep PropertyDescriptor` | value.js exports its own type-`PropertyDescriptor` on **`.`** (`src/index.ts:361`) + **`./parsing`** (`subpaths/parsing.ts:39`), def at `stylesheet-types.ts:33`; collides with TS-lib global `interface PropertyDescriptor` (`lib.es5.d.ts:108`) | **OPEN** |

**Net for pass-2**: the D3 corpus is ~90% hardened. Only **two** true value.js OPEN defects remain — **#9**
(diagnostics not wired to the public parse surface) and **#11** (`PropertyDescriptor` → `CSSPropertyDescriptor`
clean-break rename). #8 is a consumer-contract seam, not a value.js src bug (`flattenObject` returns
`Record<string, any[]>` **by design** — verified: `src/units/utils.ts:186` signature). This SHRINKS Family 4's
D3 payload from "11-class regression suite" to "2 fixes + turn the corpus into a fuzz gate."

`grep -rn "parseable" src/` → **only a doc comment** (`parsing/index.ts:512`). value.js has **no `parseable`
field**: it is a keyframes.js consumer concept. value.js's #9 obligation is purely to EXPOSE diagnostics so
the consumer can compute an honest `parseable` — this reframes the fix as "surface the sink", not "add a flag".

---

## §2 GAP (a) — cost of a `{ast, diagnostics}` public parse API

The exports map has **8 keys** (`node -e` dump): `.` · `./color` · `./parsing` · `./math` · `./easing` ·
`./transform` · `./units` · `./quantize`. **The parse surface lives on only 2 of the 8**: `.` (root barrel)
and `./parsing`. So the *map keys don't churn* — what a return-type change breaks is the **`.d.ts` CONTENT
under those 2 keys plus every call-site**. Measured blast radius (`grep -rn … demo src test`):

| public fn | total call-sites | product (demo+src) | test | return type today |
|---|---|---|---|---|
| `parseCSSValue` | **237** | 4 + 21 = **25** | 210 | `ValueUnit \| FunctionValue` |
| `parseCSSValues` | **23** | — | — | `ValueUnit \| ValueArray \| FunctionValue` |
| `parseCSSStylesheet` | **156** | — | — | `Stylesheet` |

**Cost verdict**: changing `parseCSSValue`/`parseCSSStylesheet` to return `{ ast, diagnostics }` is a
**BREAKING change on 2 of 8 export keys** and rewrites **~25 product + ~400 test call-sites** — a mass churn
justified ONLY if the diagnostics genuinely can't ride a side channel. It CAN for the common case (see §3),
so the return-type change is **not warranted for `parseCSSValue`**. The `#11` rename is the *cheaper* breaking
change: `PropertyDescriptor`→`CSSPropertyDescriptor` touches **8 src files** (`grep`) + the 2 same export keys,
no runtime (type-only), so it's a pure `.d.ts`-surface break — do it as a clean break (charter §0: no aliases).

---

## §3 GAP (b) — is `onParseError` sufficient, or must the return type change? (the crux)

The plumbing (`src/parsing/utils.ts`): `tryParse<T>(parser, input, onParseError?)` fires the sink **only when
`state.isError`** (line 577), i.e. TOTAL failure; `buildDiagnostic` emits ONCE at the furthest reach.
There is **no per-branch emission on an overall-SUCCESS parse**. This splits the answer cleanly:

- **Total-failure class (the `parseCSSValue` throw, U-F29 `.eof()` full-consumption)** — `onParseError` as an
  **optional additive param IS sufficient AND non-breaking** (the `ParseDiagnostic`/`OnParseError` types
  already ship on `.`+`./parsing`). No return-type change needed. This covers #9 for the single-value surface.
- **Partial-validity class (`parseCSSStylesheet`: a malformed declaration whose value partially parses while
  `stylesheet.many()` overall SUCCEEDS)** — `state.isError` is **false**, so `onParseError` **NEVER fires**.
  A single sink is **INSUFFICIENT** here. This is bug #9's real sting. Two honest options: (i) accumulate
  per-declaration diagnostics through successful branches into a `{ ast, diagnostics[] }` return, OR (ii)
  tighten the declaration grammar to **fail-closed** so a malformed decl becomes a total failure the throw+sink
  catches. Option (ii) aligns with charter §0 ("no masking fallbacks") better than a richer return.
- **Self-consistent-garbage class (KF-1/#3 lesson, EN-a)** — NEITHER a sink NOR a `{ast,diagnostics}` return
  catches it; only a **browser/spec-actuated oracle** does. This is a GATE (`proof:grammar-fuzz`), not an API
  shape. Confirms A6's EN-a: a self-round-trip oracle is blind to spec-invalidity.

**The decisive architectural cost (new finding — not in the portfolio).** `parseCSSValue` and
`parseCSSStylesheet` are **`memoize`d with `keyFn: (input) => input`** (`src/parsing/index.ts:557`,
`stylesheet.ts:640`; `parseCSSValue.length` arity measured = **0**, the wrapper). A `keyFn` that ignores the
sink means **on a cache HIT the inner fn is not invoked → an `onParseError` sink NEVER fires.** A side-effect
callback is therefore **structurally unsound through a memoized entry** (it fires on cold miss only). By
contrast, a diagnostics array **embedded in the return value is cached alongside the value** and survives
every hit. So *for the memoized public entries specifically*, if diagnostics must appear on SUCCESS, the
`{ ast, diagnostics }` return is strictly more correct than a sink — the memoize interaction, not aesthetics,
is the real forcing function. (Note: `parseCSSValues` is **NOT** memoized — `src/parsing/index.ts:600` is a
plain `function` — so it can thread `onParseError` cleanly today. The memoize hazard is entry-specific.)

**Verdict (b)**: threading `onParseError` is sufficient + non-breaking for the *throw* class (single value +
total-failure stylesheet), and it is the right minimal fix for #9's single-value half. It is INSUFFICIENT for
partial-validity, where the choice is grammar-fail-closed (preferred, clean-break) vs. a breaking
`{ast,diagnostics}` return that the memoize interaction actually favors over a sink. **Do not blanket-change
the return type**; wire the sink where it works, fail-closed where it doesn't, and put self-consistency under a
gate.

---

## §4 GAP (d) — does the type lattice imply a materially different `units/` layout?

**YES for the value-model root; NO (leave alone) for the color cluster.**

- **The value primitives**: `src/units/index.ts` is **451 LoC** (`wc -l`) and is a **god-impl-file named
  `index.ts`** (A3/finding #4): three runtime classes jammed together — `ValueUnit` (L16–191, ~176 LoC),
  `FunctionValue` (L192–345, ~154 LoC), `ValueArray` (L346–387, ~42 LoC) + 2 types (`InterpolatedVar`,
  `ComputedEndpointCache`) + a re-export block (L5). The type-ontology thesis and glass-ui's own-runtime-
  sibling rule (§2.1: a barrel mixing own-runtime exports → kind-named siblings) AGREE: carve into
  `value-unit.ts` / `function-value.ts` / `value-array.ts` + `types.ts`, leaving `index.ts` a PURE barrel.
  **This is a materially different, lattice-derived layout AND it is the single highest-value glass-ui-law
  alignment target simultaneously** — the same finding #4 the survey ranks #1. Family 4 and Family 1 CONVERGE
  here.
- **The color cluster** already mirrors its ontology well: `units/color/{base,spaces,conversions/,gamut/,
  dispatch}` (A3). Family 4's OWN stated severest-failure-mode holds under measurement: forcing the file tree
  to further mirror the `Color<T>` type lattice would fight a decomposition that is already good, and the
  `Color<T>` generic erasure is the reason for the accepted `as unknown as` class (CLAUDE.md) — the type
  ontology is NOT a directory ontology there. So the lattice implies **ONE** materially different carve (the
  value-model root), not a wholesale `units/` re-tree.

---

## §5 Severest-failure-mode check + composition verdict (honest)

Family 4's declared risk — "a D3 thesis wearing a whole-problem costume; weak for D1/D4" — is **CONFIRMED by
measurement**. Its payload is entirely src/: (c) shrinks to 2 fixes; (a)/(b) are a parse-API decision; (d) is
ONE carve that Family 1 also produces. It contributes **nothing native to D1** (demo is Vue, not types —
portfolio's own admission) and its D4 claim (type-driven complexity reduction) overlaps the graph/gate
families. **Family 4 is real but NARROW: it is the "typed-diagnostics + value-model-carve" DIMENSION, not a
whole-tree shape.** Per the portfolio's own composition note, it should COMPOSE onto a layout family (F1 or
F3) — it ADDS the diagnostics axis glass-ui's spec is silent on, and it seconds F1's `units/index.ts` carve.

**Recommendation for pass-2 (disposition):** do NOT run Family 4 as a standalone shape thesis. FOLD its two
live payloads into whichever layout family wins: (1) the **`units/index.ts` → 3-sibling carve** (converges
with F1/finding #4); (2) a **D3 parse-validation mini-plan** = wire `onParseError` on the single-value +
total-failure surface (additive, non-breaking), grammar-fail-closed the partial-validity stylesheet path,
rename `PropertyDescriptor`→`CSSPropertyDescriptor` (clean break, 8 files), and ADD the **one** gate D3 wants —
`proof:grammar-fuzz` seeded with the 11 A6 inputs as auto-flipping tripwires (the browser/spec oracle that
`onParseError` and `{ast,diagnostics}` both CANNOT replace). That single ADD is the owner-sanctioned exception
to the gate cull ("the cull is against overfit ceremony, not a real correctness corpus").
