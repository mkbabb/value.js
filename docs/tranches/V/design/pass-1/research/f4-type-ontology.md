# V · PASS-1 RESEARCH — Family 4 · TYPE-ONTOLOGY / DOMAIN-PRIMITIVE

**Researcher id**: `f4-type-ontology` · **family**: 4 (TYPE-ONTOLOGY) · **pass**: 1 · **date**: 2026-07-13
**Charter (portfolio Family-4 "Pass-1 research" + §3 gaps row 4)**: (a) what a `{ast,diagnostics}`
public parse API COSTS (breaking? 8-key exports churn?); (b) is threading `onParseError` through
`parseCSSValue` SUFFICIENT or must the return type change; (c) the full VJ bug-corpus verification —
which of A6's 11 are ACTUALLY still open in the current tree; (d) does the type lattice imply a
materially different `units/` layout. Plus the named failure mode: "the type ontology is not a
DIRECTORY ontology."

> **Assignment-recovery note (read first).** The orchestration spawned this probe with the task
> template's `${x.id}`/`${x.family}`/`${x.focus}` UN-interpolated (literal placeholders). On-disk
> coverage at spawn: `r1.md` = Family 1, `f2-graph-projection.md` + `p1-graph-projection.md` = Family 2
> (double-covered); Families 3–6 UNCOVERED. I self-assigned **Family 4** — the uncovered family the
> owner's §0 verbatim most heavily weights (D3 "complexity REDUCTION" + "parsing validations" + the
> explicitly-cited keyframes.js `parseCSSValue` "buggies and goblins") and the one whose four gaps are
> the most falsifiable-with-hard-evidence against today's tree. Filename descriptive (not `${x.id}.md`)
> to survive any sibling collision. Isolation: to recover the assignment I read the whole portfolio, but
> the analysis below targets ONLY Family 4's gaps — no cross-family advocacy. Where a finding
> independently lands on a node another family also names, that is reported as a fact about the tree.
> **Everything below was RAN/READ; no numbers estimated.**

---

## HEADLINE (6 load-bearing findings)

1. **The diagnostics VOCABULARY is ALREADY PUBLIC; only the WIRING is missing.** `src/index.ts:464-468`
   and `subpaths/parsing.ts:146-149` already export `tryParse`, `parseResult`, and
   `type { ParseDiagnostic, OnParseError }`. `tryParse`/`parseResult` (`parsing/utils.ts:571,593`) both
   already accept an optional `onParseError` sink. **Bug #9 is NOT "no diagnostics channel" — it is "the
   3 named convenience entries swallow the sink they wrap."**
2. **The `{ast,diagnostics}` API cost is NEAR-ZERO and NON-BREAKING for the failure half** — the fix is
   an additive optional `onParseError?` param on `parseCSSValue`/`parseCSSValues`/`parseCSSStylesheet`.
   **Zero exports-map churn** (the 8 keys are untouched — the portfolio's stated "8-key exports churn?"
   fear is mis-aimed; the only cost of a *return-type* change would be consumer-signature churn).
3. **Gap (b) splits**: `onParseError`-threading is SUFFICIENT for the FAILURE class but INSUFFICIENT for
   the LOSSY-SUCCESS class (the exact bug #9 "partial parse reported valid"). `onParseError` fires only
   when `state.isError`; the stylesheet's `kind:"unknown"` recovery branch (`stylesheet-types.ts:107-118`)
   SUCCEEDS with degraded fidelity and never sets `isError`. That class needs a warnings channel — grow
   the already-public `parseResult`'s `{status,value}` struct with an additive `diagnostics?` field.
4. **VJ corpus MEASURED: exactly 2 of 11 still OPEN** — **#9** (diagnostics unwired: 0 sink references on
   any public entry) and **#11** (`PropertyDescriptor` type-name collision: still exported, 0
   `CSSPropertyDescriptor`). The 4 "verify" bugs (#1/#4/#5/#6) all LANDED as claimed. #8 needs a runtime
   probe (SPEC-ONLY here).
5. **Gap (d): the type lattice implies exactly ONE materially-different `units/` change** — split the
   `units/index.ts` god-impl-file (451 LoC, all THREE value primitives + it IS the barrel) into
   kind-named siblings, mirroring the color model's ALREADY-landed `base.ts`+`spaces.ts` precedent.
   Beyond that one carve the lattice does NOT imply a relayout.
6. **Failure-mode CONFIRMED + quantified**: "type ontology ≠ directory ontology." Family 4's UNIQUE,
   non-overlapping payload is the D3 typed-diagnostics boundary (gaps a/b/c); its layout half (gap d)
   collapses to the same one-god-file barrel-carve every shape-family reaches. It is a **D3-validation
   thesis**, not a whole-tree thesis — score it as such.

---

## GAP (c) — VJ bug-corpus verification against the current tree (MEASURED, per-bug)

Commands: `grep` over `src/`. Every verdict carries its file:line evidence.

| # | VJ class | portfolio A6 status | **MEASURED verdict** | evidence |
|---|---|---|---|---|
| 1 | multi-fn truncation (VJ-L3) | landed — verify | **LANDED** | `parseCSSValues` FunctionArgs-first, `parsing/index.ts:600-616`; sibling `parseCSSValue` now LOUD-FAILS on trailing tokens (U-F29, `index.ts:525-555`, `.eof()` at 528) — truncation replaced by throw-or-full-list |
| 4 | dashed-function call (VJ-Q6) | landed — verify | **LANDED** | `fnDashed` arm `index.ts:440-471` (`--ident(args)`, `-` first-char bucket) |
| 5 | if() multibranch lossy (VJ-Q7) | landed — verify | **LANDED** | `splitTopLevel(body, c===";")` splits ALL branches, `index.ts:280-290` |
| 6 | contrast-color passthrough (VJ-Q1) | FIXED | **FIXED (confirmed)** | eager `contrastColorEval`, `parsing/color/color.ts:398-427` |
| **9** | **no diagnostics → `parseable:true` false-positive** | plumbing landed, NOT wired — effectively OPEN | **OPEN (confirmed)** | `grep onParseError\|enableDiagnostics` on `src/index.ts` + `subpaths/parsing.ts` + `parsing/index.ts` + `stylesheet.ts` = **0**; `parseCSSValue` (`index.ts:545`), `parseCSSValues` (`index.ts:612`), `parseCSSStylesheet` (`stylesheet.ts:637-639`) all call `utils.tryParse(...)` with NO sink arg |
| **11** | `PropertyDescriptor` type-name collision (KF-7) | OPEN | **OPEN (confirmed)** | still exported `stylesheet-types.ts:33`; re-exported `index.ts:361`, `subpaths/parsing.ts:39`; `grep CSSPropertyDescriptor src/` = **0** — clean-break rename not done |
| 2/3/7/10 | serialize/@function/provenance/spring | fixed/landed | not re-verified here (out of the load-bearing pair) | — |
| 8 | unflatten array-boxing → NaN | kf-U — verify | **NEEDS RUNTIME PROBE (SPEC-ONLY)** | seam present `units/utils.ts:186` (`unflattenObject`); the unitless-`1.5`→`ValueUnit[]`→NaN path needs an executed input probe, not a grep |

**Verdict (c)**: exactly **2 of 11 CONFIRMED OPEN** (#9, #11) — matching portfolio Part-C #5, now
measured. The whole D3-validation payload of Family 4 rests on these two + the #8 runtime probe.

---

## GAPS (a) + (b) — the `{ast,diagnostics}` public parse API: cost + sufficiency (MEASURED)

### The current diagnostics machinery (all READ)
- **Types + low-level runners are ALREADY PUBLIC**: `src/index.ts:464-468` exports `tryParse`,
  `parseResult`, `export type { ParseDiagnostic, OnParseError }`; identical in `subpaths/parsing.ts:146-149`.
- **`ParseDiagnostic`** (`utils.ts:513-525`) = `{message, offset, line, column, expected?, input}` — a
  csstree-`onParseError`-shaped record. **`OnParseError`** (`:528`) = `(d)=>void` pluggable sink.
- **`tryParse<T>(parser, input, onParseError?)`** (`:571-583`) emits the diagnostic to the sink BEFORE
  the throw. **`parseResult<T>(parser, input, onParseError?)`** (`:593-603`) returns `{status, value}`
  and emits to the sink on failure (no throw). **Both already carry the sink param.**
- **The gap**: the three ergonomic named entries wrap `tryParse` and DROP the sink —
  `parseCSSValue` (`index.ts:542-558`), `parseCSSValues` (`index.ts:600-616`), `parseCSSStylesheet`
  (`stylesheet.ts:637-643`). A consumer CAN already get diagnostics by calling `tryParse(grammar, input,
  sink)` directly, but the discoverable API swallows them.

### Gap (a) — cost of the diagnostics API
- **Failure-half fix = ADDITIVE optional param, NON-BREAKING, ZERO exports-map churn.** Add
  `onParseError?: OnParseError` as the trailing arg on the 3 named entries and forward it into the
  wrapped `tryParse`. The 8 `package.json.exports` keys (`.`,`/color`,`/parsing`,`/math`,`/easing`,
  `/transform`,`/units`,`/quantize` — RAN `node -p`) are UNTOUCHED. **The portfolio's "8-key exports map
  churn?" worry is mis-aimed**: neither an additive param NOR a struct-return change touches the exports
  KEYS — the functions stay at the same subpaths. The only conceivable cost of the *heavier* option (a
  `{value,diagnostics}` return) is CONSUMER-signature churn.
- **Consumer blast radius if the return type changed (MEASURED)**: in-repo call sites of the 3 entries =
  **15 src** + **19 test files** + **2 demo** = ~36 in-repo consumers (`grep` counts; 473 total
  occurrences across all trees incl. relayed keyframes uses, which live in kf's own tree). A
  return-type break forces every one to destructure — avoidable entirely by the additive-param path.
- **Memoize interaction (verified benign)**: `parseCSSValue` is `memoize((input)=>…, {keyFn:(input)=>input})`.
  The sink must NOT enter the cache key (functions aren't keyable), and it doesn't need to: `onParseError`
  fires only on FAILURE, and the memoize wrapper "never caches the throw" (`index.ts:540` comment) — a bad
  input re-runs every call, so the sink re-fires deterministically. Wiring `(input, onParseError?) =>
  tryParse(ValuesValueEOF, input, onParseError)` with the same `keyFn` is clean.

### Gap (b) — is `onParseError` threading SUFFICIENT? — it SPLITS
- **SUFFICIENT for the FAILURE class**: a hard parse failure (`state.isError`) already builds and emits a
  full `ParseDiagnostic`; threading the sink closes it additively.
- **INSUFFICIENT for the LOSSY-SUCCESS class** — which IS bug #9's actual "malformed decl partially
  parses, reported valid." `onParseError` fires ONLY when `state.isError` (`utils.ts:577,599`). value.js
  has DELIBERATE recovery branches that SUCCEED with degraded fidelity and never set `isError`: the
  `StylesheetItem` `kind:"unknown"` arm (`stylesheet-types.ts:107-118`) captures an unrecognized at-rule
  VERBATIM rather than failing. A consumer sees a non-throwing parse and reads it as "valid" — the exact
  false-positive. To report "parsed but did not fully understand," value.js needs a **warnings channel**:
  either (i) grow the already-public `parseResult`'s `{status,value}` struct with an additive
  `diagnostics?: ParseDiagnostic[]` field (non-breaking — adding an optional field to an existing
  public struct-return), and/or (ii) have the recovery branches themselves emit a `warning`-severity
  diagnostic to the sink.
- **VERDICT (b)**: threading `onParseError` is sufficient for FAILURE diagnostics (cheap, additive,
  non-breaking) but NOT for LOSSY-SUCCESS. The full honest closure = additive sink on the 3 entries
  (failure) + a `diagnostics?` field on the struct-return / severity-tagged emission from recovery
  branches (lossy-success). **Notably, value.js ALREADY ships a public struct-returning parse
  (`parseResult`) whose shape can carry diagnostics additively — so no fully-breaking return-type change
  is required for either half.** The `ParseDiagnostic` type would want an additive
  `severity?: "error"|"warning"` field to distinguish the two.

---

## GAP (d) — does the type lattice imply a materially different `units/` layout? (MEASURED)

The library's core primitives (portfolio Family-4 substrate): the VALUE model
(`ValueUnit`/`FunctionValue`/`ValueArray`), the COLOR model (`Color<T>` + 17 space classes), the PARSE
model (parse-that combinator). Test whether the directory already mirrors the lattice:

- **COLOR model is ALREADY lattice-split** (the precedent): `units/color/base.ts` (`abstract class
  Color<T>`, 357 LoC, `:109`) + `units/color/spaces.ts` (17 concrete `*Color<T> extends Color<T>`
  classes: RGB/HSL/HSV/HWB/LAB/LCH/OKLAB/OKLCH/XYZ/Kelvin/LinearSRGB/DisplayP3/AdobeRGB/ProPhoto/
  Rec2020/ICtCp/Jzazbz, 486 LoC). This IS a type-lattice-mirroring layout — landed at W1-8. No change.
- **VALUE model is NOT lattice-split** — it is a god-impl-file. `units/index.ts` (451 LoC) holds ALL
  THREE primitives in one file AND is itself the barrel: `ValueUnit` (`:16-190`), `FunctionValue`
  (`:192-344`), `ValueArray` (`:346-…`) + `InterpolatedVar`/`ComputedEndpointCache` types. The type
  ontology says three distinct primitives; the directory says one file named `index.ts`.
- **The type-ontology move for `units/` = apply the color model's OWN precedent to the value model**:
  split `units/index.ts` into kind-named siblings (`base` / `value-unit.ts` / `function-value.ts` /
  `value-array.ts`) behind a PURE re-export barrel — exactly the `color/{base,spaces}` shape. This is a
  materially different LEAF layout for the value model, and it is the SINGLE such change the lattice
  implies.

**Honest bound (the failure-mode confirmation)**: beyond that one god-file split, the lattice does NOT
imply a wholesale `units/` relayout. `conversions/` (10 `{from}2{to}` modules), `gamut/`, `normalize`,
`interpolate`, `dispatch` are PROCESS/ALGORITHM modules, not type-primitives — forcing them into a
type-mirror would fight the good conversion-cluster/gamut-cluster decomposition that already exists
(survey A3). So **"the type ontology is not a directory ontology" is CONFIRMED**: the layout payload of
Family 4 reduces to ONE god-file carve (`units/index.ts`), which is the same node the survey's
barrel-purity finding (#4: "god-IMPL-files masquerading as barrels") independently names. Family 4's
DISTINCTIVE contribution is therefore the D3 typed-diagnostics boundary (a/b/c), NOT the tree shape.

---

## D4 note (in-scope for Family 4: type-driven complexity reduction)
- **`as any` in `src/` = 0** (CLAUDE.md verified): the single `grep "as any"` hit is a COMMENT
  (`parsing/index.ts:567` — "no cross-realm `as any` cast is needed"). The "narrow `any` seams"
  reduction has no `as any` target left in `src/`.
- **`as unknown as` = 8** (`grep -c`, matches CLAUDE.md's tranche-S count): the documented irreducible
  erasure class — `Color<T>` generic-component erasure (`dispatch.ts`, `contrast.ts`,
  `parsing/color/color.ts:427`) + the DOM `CSSStyleDeclaration` no-string-index class
  (`units/layout-cache.ts`). These are the ontology's KNOWN, load-bearing-commented seams, not cleanup
  targets — the `Color<T>` component-type is the lattice's genuine TS-inexpressible edge.
- **#11 rename** (`PropertyDescriptor`→`CSSPropertyDescriptor`) is a type-ontology D4 win: it removes a
  DOM/TS-lib global collision (API-Extractor mangling) via a clean-break rename across 3 export sites +
  ~6 internal `stylesheet/` uses (`grep` census: `stylesheet-types.ts`, `extract.ts`, `stylesheet.ts`,
  `serialize.ts`, `index.ts`, `subpaths/parsing.ts`, `src/index.ts`).

---

## Net verdict for Family 4 (scored against its own gaps)

| gap | status | evidence |
|---|---|---|
| (a) `{ast,diagnostics}` API cost | **NEAR-ZERO / non-breaking; 0 exports-map churn** | types+`tryParse`+`parseResult` already public (`index.ts:464-468`); additive param path; the "8-key churn" fear is mis-aimed |
| (b) is `onParseError` threading sufficient | **SPLITS: yes for failure, no for lossy-success** | `onParseError` fires only on `isError`; `kind:"unknown"` recovery succeeds silently (`stylesheet-types.ts:107-118`); grow `parseResult` struct + a `severity` field |
| (c) VJ corpus — which still open | **2 of 11 OPEN (#9, #11); #8 needs runtime probe** | 0 sink wiring on public entries; `PropertyDescriptor` un-renamed; #1/#4/#5/#6 landed |
| (d) materially different `units/` layout | **ONE god-file split (`units/index.ts`), mirroring color's `base`+`spaces`** | value model in 1 god-impl-barrel; color model already lattice-split |
| failure mode ("ontology ≠ directory") | **CONFIRMED** | layout half = 1 barrel-carve; unique value = D3 typed diagnostics |

**Family 4's strongest, load-bearing contribution**: the concrete, non-breaking closure of the two
still-open D3 validation bugs the owner's §0 explicitly cites —
1. **#9 (diagnostics)**: forward `onParseError?` into the 3 named entries (additive, 0 exports churn) +
   a `diagnostics?`/`severity` growth on the already-public `parseResult` struct to catch the
   lossy-success `kind:"unknown"` class the sink alone misses.
2. **#11 (collision)**: clean-break `PropertyDescriptor`→`CSSPropertyDescriptor` across 3 export sites.
3. **#8**: an EXECUTED unitless-`1.5` unflatten probe (SPEC-ONLY here — flagged for pass-2 prototype).

**Family 4's ceiling (honest)**: it is a **D3-validation + type-diagnostics thesis**, not a whole-tree
shape-thesis. Its layout payload (gap d) is a single barrel-carve that any shape-family also reaches; it
COMPOSES with a shape-family (F1/F3 for the tree, an execution-family for the move) rather than replacing
one — exactly the "src-centric family in disguise" the portfolio named, now measured. Its irreplaceable
half is the typed `{value, diagnostics}` boundary, achievable NON-BREAKING because the vocabulary is
already public.

## Hand-offs to synthesis / other passes
- The additive-param diagnostics fix (0 exports-map churn) is the shared D3 input for any execution
  family (F5 gate: a `proof:diagnostics-wired` born-RED probe asserting the 3 entries forward the sink;
  F6 codemod: trivial signature widen).
- The `units/index.ts` value-model split is the SAME node as survey finding #4 (barrel-purity) and the
  measured cycle-spine — a shape-family consumes it directly; Family 4 supplies the type-lattice
  RATIONALE (`base`/`value-unit`/`function-value`/`value-array`, per the color `base`+`spaces` precedent).
- #8 (unflatten array-boxing → NaN) is the one corpus item requiring an EXECUTED probe — deferred to a
  pass-2 isolated-worktree prototype (not run here).
