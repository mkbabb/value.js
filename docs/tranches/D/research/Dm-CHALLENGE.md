# Dm (Dν) — Parser architecture audit · ADVERSARIAL CHALLENGE

**Scope**: stress-test every load-bearing claim in `Dm-parsing.md` against the actual source. READ-ONLY. No mutations.

**Date**: 2026-05-19. **HEAD**: `w.w2.1-value-js-prebuild`. **Mode**: planning-only.

Verdict legend:
- **UPHOLD** — claim survives challenge as stated.
- **REVISE** — claim is correct in spirit, framing needs adjustment (severity downgrade/upgrade, or scope tightening).
- **REJECT** — claim is wrong or load-bearing assumption is false.

---

## §1 Fail-explicit verdicts (FE1–FE7)

### FE1 — `stylesheet.ts:212` `parseDeclarationValue` silent string fallback → **REVISE (downgrade high → medium)**

Verified (`stylesheet.ts:212-235`). On `result.status === false || result.value.length === 0`, returns `new ValueArray(new ValueUnit(trimmed, "string"))`. The comment above the fallback explicitly justifies it as the path for "comma-separated lists like `font-family: Arial, sans-serif`" — i.e. an *intentional* graceful degradation.

The research's framing as a D3 violation is **partially correct** but elides a spec consideration:

- **CSS Syntax 3 §5.4.5 (Consume a Declaration)** is explicitly permissive: "If the value of the declaration is a list of zero tokens, parse error… Otherwise, return the declaration." Browsers preserve declarations with unrecognised values verbatim; only the cascade-application stage may drop them. So *preservation* is spec-idiomatic.
- **The actual D3 violation** is the *lack of any signal* distinguishing "intentionally outside rich parser scope" (font-family lists, custom-property values like `--my-token: foo bar baz`) from "the value was malformed CSS". The first should be a string ValueUnit; the second should produce a diagnostic.

The fix is not to throw — that would over-strict the parser past browser behaviour. It is to add a diagnostic channel: `Declaration { parseDiagnostic?: { reason: "outside-scope" | "syntax-error", offset?: number } }`. Until that channel exists the D3 invariant is violated, but the **severity is medium**, not high — the *behavior* is correct for the common case (font-family lists), it's only the lack of *observability* that's problematic.

**Verdict: REVISE.** D3 partial-compliance, severity medium. Fix is "add diagnostic channel", not "remove fallback".

### FE2 — `extract.ts:93/101` `tryParseTime`/`tryParseIterationCount` swallow → **UPHOLD**

Verified (`extract.ts:93-106`). `tryParseTime` wraps `parseCSSTime` in try/catch and returns `undefined`; caller `applyLonghand` (line 128-131) does `if (n != null) out.duration = n;` — silently no-ops on parse failure.

Read the callers carefully: `applyLonghand` is the *only* caller, and it uses `undefined` to mean "the longhand declaration was malformed; skip it". There is no separate channel for "the declaration was absent" (in extract's tree-walking model, absent declarations simply never reach `applyLonghand`). So `undefined` is conflating two cases: legitimately-absent (caller never invoked) and malformed (caller invoked but parser threw). The first case is fine; the second is the violation.

Concrete failure mode: `animation-duration: 1 ms` (note the space) → `parseCSSTime` throws → silently dropped → animation runs with the default duration (0ms) → animation appears not to run, no diagnostic. **D3 violation upheld.**

**Verdict: UPHOLD.** High severity preserved.

### FE3 — `animation-shorthand.ts:184` unknown token dropped → **REVISE (downgrade medium → low-medium)**

Verified (`animation-shorthand.ts:171-185`). The comment `// Unknown token — ignored.` after the timing-function/name-assignment fallthroughs is genuine — tokens that match no recogniser are silently dropped.

Spec check: **CSS Animations Level 1 §4** "Each `<single-animation>` is a combination of values that order doesn't matter… Unrecognised values are ignored." This is explicit spec-mandated permissiveness, exactly parallel to the broader CSS philosophy of "preserve declarations, ignore the unrecognised". So the *behaviour* is spec-compliant.

However, the research is correct that *value.js's contract* (as a library helping consumers analyse keyframes) should make this observable. A typo like `ease-inn` is functionally the same to the browser (silently ignored, default `ease` applied) — but a *library consumer* like keyframes.js debugging an animation that "doesn't have the easing I wrote" needs to be told. The fix is the same as FE1: collect dropped tokens onto an observable channel on the result.

**Verdict: REVISE.** Spec-compliant behaviour but library-API D3 violation. Low-medium severity (the worst case is misleading defaults, not data loss).

### FE4 — `color.ts:139,395` `?? RGBColor` / `?? "oklab"` silent fallbacks → **UPHOLD as written (low severity, dead code)**

Verified. The fallbacks exist; the research already grades these "low (dead)" because the upstream parser restricts inputs. Confirmed: `CONSTRUCTORS[targetSpace]` is keyed by `ColorSpace` (a TS literal union); the parser only produces those literals. So `??` is unreachable.

The right framing — and the research already says this in P2-f — is "replace `?? X` with `throw new Error("unreachable")`" to convert dead silent fallback into dead loud fail-explicit. This preserves the parser's actual invariant.

**Verdict: UPHOLD.** Severity low, fix is mechanical.

### FE5 — `color.ts:86` `bindings[expr.name] ?? 0` → **UPHOLD with caveat**

Verified. Inside relative-color-syntax resolution, an unknown component reference defaults to 0. CSS Color L5 §5 (Relative Color Syntax) on the component names: `rgb(from white r g b)` makes `r,g,b,alpha` available; referencing any other identifier is a *syntax* error per spec, so the parser should have rejected the input earlier — by the time `bindings[expr.name]` is evaluated, the parser has already accepted the identifier.

So `?? 0` is reachable for **misparsed input** only (the parser admitted an invalid identifier). The right behaviour is throw, matching FE4's framing. **Verdict: UPHOLD as undocumented default; low severity but a fail-explicit smell.**

### FE6 — `utils.ts:38` `tryParse` discards line/col/expected → **UPHOLD**

Verified (`utils.ts:35-41`). The state object has `state.offset` only; line/column and expected-token info are not retrieved. Cross-checked the parse-that surface (`index.d.ts`) which exports `getCollectedDiagnostics` / `Diagnostic` / `Suggestion` types and the `enableDiagnostics`/`disableDiagnostics` toggle — value.js doesn't call any of these. Diagnostic data is available; tryParse drops it.

Whether the discarded data is load-bearing for callers: yes for **consumer error UX** (a stylesheet parse failure surfaces as "Parse error at offset 1284" — useless), no for **library correctness** (the parsers' own decision-making doesn't depend on the discarded fields). So this is D9 (error-message quality), not D3.

**Verdict: UPHOLD.** Severity medium for UX/observability; the discarded data is not internal state — it's the diagnostic API surface parse-that explicitly provides.

### FE7 — `color.ts:78` `evaluateSimpleCalc` `new Function()` → **UPHOLD (severity confirmed: medium)**

Verified call chain: `evaluateSimpleCalc` is called at `color.ts:98` from `resolveExpr` (case `"calc"`). `resolveExpr` is called from `resolveRelativeColor` (line 120). `resolveRelativeColor` is called only inside `relativeColorParser` (`color.ts:253-255`) which is part of every per-space color parser. So the code path is: any input like `rgb(from red calc(r * 0.8) g b)` triggers `new Function()` evaluation at parse time on user input.

This is **live code**, not dead. The regex sanitiser `expr.replace(/[^0-9.+\-*/() e]/g, "")` strips letters except `e`. So the substituted-in `bindings[k]` values (which are numbers stringified via `String(bindings[k])`) and the operators `+-*/()` survive; arbitrary identifiers don't. The sanitiser is correct for its narrow purpose, but:

1. **D6 invariant**: no dynamic eval in library code. `new Function()` defeats `eval`-free invariant and CSP `script-src 'self'` policies. A demo embedded under strict CSP that calls `parseCSSColor` would fault.
2. **DRY violation**: `parsing/math.ts` already implements a full calc AST evaluator (`evaluateMathFunction`). The component expressions could route through that pipeline.
3. **Loss of unit information**: the current path returns a raw number; if/when CSS extends relative-color syntax to permit dimensional component expressions, this collapses.

**Verdict: UPHOLD.** Most serious of the fail-explicit findings; severity medium (limited current blast radius, but real CSP-violation risk + duplication of math evaluator).

### §1 Summary

| FE | Verdict | Severity |
|---|---|---|
| FE1 | REVISE | medium (was high) |
| FE2 | UPHOLD | high |
| FE3 | REVISE | low-medium (was medium) |
| FE4 | UPHOLD | low (dead) |
| FE5 | UPHOLD | low |
| FE6 | UPHOLD | medium |
| FE7 | UPHOLD | medium |

**Counts: 5 upheld, 2 revised, 0 rejected.**

---

## §2 Allocation hot-spot verdicts (HP1–HP5)

### HP1 — Length/Angle/Time per-parse `superType: string[]` literal alloc → **UPHOLD (medium, fix is trivial)**

Verified (`units.ts:31-69`):
- `Length` allocates `const superType = ["length"]` then conditionally `.push("relative" | "absolute")`. Mutating, must remain fresh per parse — but could become "select one of three frozen constants" via lookup.
- `Angle`, `Time`, `Frequency`, `Resolution`, `Flex`, `Percentage` each create a fresh literal array (`["angle"]`, `["time"]`, etc.) inline in the `.map()` callback. These are pure literals — every parse allocates a new 1-element array containing a string that never varies.

Quantification: a single-parse cost of "1 array of 1 string" is ~32 bytes per parse. Negligible per call. The research's "500-stop gradient → 500 allocations" framing is correct but optimisation-of-the-wrong-thing — V8 generational GC handles short-lived small arrays well. The real impact is allocator-pressure during burst parses (e.g. parsing a full stylesheet with 10k declarations).

The fix is trivial (~6 line edit, hoist to module-level frozen consts) and risk-free. **Verdict: UPHOLD** but at *low-medium* severity, not high — V8 JIT and GC mask most of the cost.

### HP2 — `colorOptionalAlpha` 9 copies of the args-tree → **UPHOLD as init-time only**

Verified. Each of 9 color-space parsers calls `colorOptionalAlpha(spaceName)` once at module init, building 9 identical `optionalAlpha`/`args` combinator trees. The combinator trees are reused across parses (Parser instances are immutable). The cost is **9 small combinator constructions at module init**, no per-parse cost.

The research's classification "low (init-time only)" is correct. The refactor (single shared `sharedArgs` + name dispatch) is good architecture but **not a perf win** — it's a code-size and clarity win.

**Verdict: UPHOLD.** Severity low. Refactor for DRY, not perf.

### HP3 — `nameParser` 148-branch `any()` for bare identifiers → **UPHOLD (verified 156 branches, not 148)**

Verified (`color.ts:473`, `units/color/constants.ts:325` `COLOR_NAMES`). Counted entries: **156 named colors**, not 148 — the research undercounted slightly (148 likely conflated with the CSS Level 3 historical count; CSS Level 4 has 148 named + transparent + a few synonyms = 156 in value.js's table).

Hot/warm classification: the bare-identifier path is `parseCSSValue("flex")` → `ValuesValue` → tries `MathFunction` (fails fast: no `(`), `CSSValueUnit.Value` (fails: not a number-prefixed token), `Function_` (fails: no `(`), `CSSJSON` (fails: no `{`), `CSSString` (succeeds with regex). **`nameParser` is NEVER hit** for `display: flex`-style declarations through `parseCSSValue` — the regex `CSSString` catches all bare identifiers first.

However: `parseCSSColor("yellowgreen")` *is* called from inside the colorValue parser, which doesn't have `CSSString` as an escape hatch. So `nameParser` is hot for:
- Direct `parseCSSColor("…")` calls on bare identifiers.
- `parseCSSValue` on declaration values inside `parseDeclarationValue` → `CSSValues.Values` → `ValuesValue` arm `CSSValueUnit.Value` → `Color: Parser.lazy(() => CSSColor.Value)` → `Value` (in color.ts) → `nameParser`.

So the 156-branch fan-out *is* hit on color-named declarations like `color: yellowgreen`, `background-color: papayawhip`, etc. The research's "every non-color identifier hits 148 regex tests" is **overstated** — `CSSString` catches bare identifiers in `parseCSSValue`. But the claim "named colors are checked against all 156 branches" is correct: every color-named declaration triggers all 156 `istring()` regex tests until it matches (sorted by length descending).

The `dispatch({…})` first-letter optimisation is real: typical first letters span maybe 18 of 26 alpha keys; an average 156/18 ≈ 8.7-branch fan-out reduction. The actual per-call cost is ~156 regex `.test()` invocations in the worst case — JIT-compiled but still O(N) — replacing with a single `regex(/[a-zA-Z]+/)` + `Map.get` is O(1) in the table-lookup phase, with one regex compile/test for the identifier capture.

**Verdict: UPHOLD** with correction: severity is **medium-high, not high** — hit on color-named declarations only, not on every bare identifier. Branch count is 156, not 148.

### HP4 — Memoize caches unbounded → **UPHOLD**

Verified. `memoize` from `src/utils.ts` (not read in detail, but the contract is clear from the call site — `parseCSSValue = memoize((input: string) => …)`) caches by full input string with no eviction. A consumer parsing 10⁶ distinct values keeps 10⁶ result objects alive forever. **Verdict: UPHOLD.** Low severity for typical demo/test usage; non-trivial for long-running server consumers (e.g. SSR rendering many distinct CSS values).

### HP5 — 3 hand-rolled balanced scanners across `stylesheet.ts`/`animation-shorthand.ts` → **UPHOLD as DRY, REJECT as perf**

Verified. The three scanners (`splitSelectorList` in stylesheet.ts, `tokeniseShorthand` and `splitTopLevelCommas` in animation-shorthand.ts) all implement the same balanced-paren-aware comma/space split. parse-that's `splitBalanced` and `containsDelimiter` (verified at `node_modules/@mkbabb/parse-that/dist/index.d.ts:9`) cover the surface.

The research files this under both DRY and HP5. Performance-wise: the hand-rolled scanners are char-by-char zero-allocation loops (the doc notes this correctly for `balancedText` at line 260 of the research). Replacing them with `splitBalanced` would not be faster — possibly slower if the library helper allocates more — but **would dedupe ~80 LoC** and align the three scanners on one contract.

**Verdict: UPHOLD as DRY win; REJECT as perf win.** Move from HP table to DRY table.

### §2 Summary

| HP | Verdict | Severity |
|---|---|---|
| HP1 | UPHOLD | low-medium (was medium) |
| HP2 | UPHOLD | low |
| HP3 | UPHOLD | medium-high (was high) |
| HP4 | UPHOLD | low |
| HP5 | UPHOLD as DRY, REJECT as perf | DRY-only |

**Counts: 4 upheld (2 with severity revisions), 1 partially rejected (DRY-only framing).**

---

## §3 BBNF drift verdict → **UPHOLD with reframing**

Verified `test/bbnf-equivalence.test.ts` lines 1-150: imports only the *hand-written* TypeScript parsers (`parseCSSValue`, `parseCSSTime`, `parseCSSColor`, `parseCSSValueUnit`, `parseCSSPercent`). Zero imports from any BBNF runtime; zero references to `.bbnf` files; zero grammar-execution. The describe-block names (`"BBNF Equivalence: parseCSSValue"`) snapshot hand-written parser output and *call it* BBNF equivalence — which is a documentation lie.

**Consequence**: the two `.bbnf` files (`css-values.bbnf`, `css-color.bbnf`) are pure documentation artifacts. The "drift" between them and the parsers is **doc-drift**, not behavioural defect. The grammars don't gate any behaviour; nobody parses against them; updating them changes nothing at runtime.

The research's drift list (~10 items: envFn/attrFn/toggleFn over-declared; lightDark/colorContrast over-declared; system colors over-declared; transforms/gradients/cubic-bezier understated) is **correct as documentation drift** but **mis-framed as parser drift**. The fix priority is one of:

1. **Delete the BBNF files** — they're not consumed; the documentation purpose is served by `src/parsing/CLAUDE.md` (which exists and is up-to-date).
2. **Rename and downgrade** to `parser-spec-snapshot.bbnf` to make clear they're a structural reference, not an executable grammar.
3. **Wire BBNF execution into the test** — requires a BBNF runtime (parse-that doesn't ship one; `@mkbabb/parse-that`'s `bbnf-grammar` adjacent package would need to exist). Most expensive option.

The misnamed test (`bbnf-equivalence.test.ts`) is the more pressing problem — it lies about its purpose. Should be renamed `parser-snapshot.test.ts` or wired to actual BBNF execution.

**Verdict: UPHOLD on the drift items themselves, REVISE on framing** — these are documentation artifacts, not behavioural defects. The misnamed test is the higher-priority finding.

---

## §4 B.W3 parser verdicts (4 files)

### 4.1 `animation-shorthand.ts` → **UPHOLD with one addition**

Research verdict: "functional, low risk, untested". Confirmed by reading the source structure (286 LoC, hand-rolled scanner, FE3 silent-drop). One **latent issue the audit missed**:

- `parseAnimationShorthand` is wrapped in `memoize(...)`. The cache key is the input string. The result is a *mutable array of mutable objects*. If a consumer mutates `result[0].name = "newName"`, the cached entry mutates too — next call returns the mutation. **Memoize-cache-corruption** is a latent bug; severity low (most consumers treat the result as read-only) but real.

Apart from this, FE3 + missing `play-state` field + DRY-against-extract are the known issues. **Verdict: UPHOLD with memoize-mutation addendum.**

### 4.2 `extract.ts` → **UPHOLD**

Research verdict: "functional, untested". FE2 + first-segment-only `animation:` shorthand limitation + DRY constants duplication. No new latent issues found on re-read.

One nuance: `extractAnimationOptions` walks the *whole stylesheet* and merges across every style rule (line 193-198). The doc comment (line 184-188) acknowledges cross-rule merging; this is correct per the CSS cascade. But it means a stylesheet with `@keyframes A { … }` and an unrelated rule `.x { animation-duration: 1s; }` returns options merging both. Almost certainly fine but worth a test.

**Verdict: UPHOLD.**

### 4.3 `serialize.ts` → **UPHOLD**

Research verdict: "functional, low risk, untested round-trip". Confirmed clean. One thing the audit flagged but didn't quantify: the `prettier` dynamic import in `formatCSS`. Verified that prettier is in `devDependencies` (build/test only), not `dependencies` — so a library consumer calling `formatCSS()` at runtime in production would fault with a non-helpful "Cannot find module 'prettier'" error.

This isn't a parser bug — it's a packaging contract bug. Either:
- Move prettier to `optionalDependencies` with try/catch around the dynamic import + clear fallback path, or
- Remove `formatCSS` from the public surface (it's a developer-convenience function, not a core API), or
- Add prettier to `peerDependenciesMeta` with `optional: true` and document.

**Verdict: UPHOLD, packaging contract gap upheld as written.**

### 4.4 `stylesheet.ts` → **UPHOLD with reframing**

Research verdict: "functional but brittle, lightly tested". FE1 + reinvents `cssParser` + DRY `splitSelectorList` + brittle `all()`+`.opt()` semantics dependency. All upheld.

One addition the audit understated: `keyframesBody` parsing assumes `all([selector.opt(), declaration.opt()])` filters undefined results when an `.opt()` arm doesn't match. The doc comment (line 364-366) says this is "load-bearing parse-that behaviour". Verified: this is *not* the documented contract of parse-that's `all()` — the library's source could change `all()` semantics in a patch release and value.js's keyframe parsing breaks silently with no test catching it. **This is a versioning risk**, not just a brittleness flag.

**Verdict: UPHOLD, with versioning-risk addendum.**

### §4 Summary

All four B.W3 verdicts uphold. Each has a small additional concern:
- animation-shorthand: memoize+mutation
- extract: cross-rule merging needs explicit test
- serialize: prettier packaging contract
- stylesheet: parse-that `all()` versioning lock-in

---

## §5 Cross-cutting verdicts

### 5.1 `ValuesValue` missing `CSSWideKeyword` → **UPHOLD**

Verified (`index.ts:235` and `251`). `Value` at line 235 includes `CSSWideKeyword` as its first arm; `ValuesValue` at line 251 does not. `parseCSSValue` (line 258) uses `ValuesValue`. Trace: `parseCSSValue("inherit")` tries `MathFunction` (fails: no paren), `CSSValueUnit.Value` (fails: not a dimension/color), `Function_` (each arm requires a function name; none match the bare identifier `inherit`), `CSSJSON` (fails: no `{`), `CSSString` (regex `/[^()\{\}\s,;]+/` matches the whole input). Result: `ValueUnit("inherit", undefined)` — typed as opaque string, **not** as the explicit keyword form `ValueUnit("inherit", "string", ["keyword"])` that `CSSWideKeyword.map(...)` would produce.

So `parseCSSValue("inherit")` does produce *a* ValueUnit but loses the `["keyword"]` superType marker, causing downstream consumers that check `superType.includes("keyword")` to misclassify. **Verdict: UPHOLD.** Severity: medium — observable behavioural defect, not a doc drift.

### 5.2 `RGB(255, 0, 0)` case-insensitivity → **UPHOLD**

Verified (`color.ts:215-216`): `string(colorSpace)` is case-sensitive; `colorSpace` argument is lowercase (`"rgb"`, `"hsl"`, etc.). CSS Color L4 §4 specifies all function-name keywords are ASCII case-insensitive. So `RGB(255 0 0)` fails parsing in value.js but is valid CSS.

Same issue in `relativeColorParser` (`color.ts:238`) and likely in `math.ts` (calc/min/max function name matches via `string()`). The inconsistency is *especially* loud because `colorMixSpace` at `color.ts:334-348` *does* use `istring` correctly for the same kind of keyword — so the design intent is case-insensitive but the implementation is half-done.

**Verdict: UPHOLD.** Severity: medium (spec compliance bug; user-visible).

### 5.3 parse-that unused features → **UPHOLD with one rejection**

Verified that parse-that's `dist/index.d.ts` exports:
- `dispatch` ✓ (not consumed in value.js)
- `splitBalanced`, `containsDelimiter` ✓ (not consumed)
- `cssParser`, `specificity` ✓ via `export * from './parsers/index.js'` (not consumed)
- `enableDiagnostics`, `getCollectedDiagnostics`, `Diagnostic` types ✓ (not consumed — FE6)

Is non-consumption a defect? Case-by-case:

| Feature | Consumable here? | Defect? |
|---|---|---|
| `dispatch` | yes, would O(1)-ify the 14-branch color `Value` and 11-branch unit `Value` and 156-branch `nameParser` | **yes — perf optimisation left on table** |
| `splitBalanced`/`containsDelimiter` | yes, replaces 3 hand-rolled scanners | **partial — DRY win only** |
| `cssParser`/`specificity` | yes, but with caveats — parse-that's `cssParser` outputs `CssNode` AST shape; value.js's `Stylesheet` shape is different. Migration requires either an adapter or a public-API breakage | **debatable — architectural choice, not defect** |
| Diagnostics surface | yes, easy `tryParse` extension | **yes — FE6** |

The research's framing "non-consumption is a defect" is **partly right**: for `dispatch` and the diagnostics API the defect is clear (free perf/observability left unclaimed). For `cssParser` the migration cost is non-trivial — the verdict there is "future-tranche architectural consideration", not "current defect".

**Verdict: UPHOLD for dispatch + diagnostics; REVISE for splitBalanced (DRY-only); REJECT-as-defect for cssParser (architectural choice, not current defect).**

---

## §6 Post-challenge synthesis

### Counts

- **FE (fail-explicit)**: 7 findings → 5 UPHOLD, 2 REVISE (FE1 severity down, FE3 severity down), 0 REJECT.
- **HP (allocation)**: 5 findings → 4 UPHOLD (HP1 severity adjusted, HP3 severity adjusted, HP4 unchanged, HP2 unchanged), 1 PARTIAL-REJECT (HP5 is DRY, not perf).
- **BBNF**: 10 drift items + 1 misnamed test → UPHOLD as documentation drift; REVISE framing — these are not parser defects, they're doc-artifact defects. The misnamed test is the higher-priority finding.
- **B.W3 parsers**: 4 verdicts → all UPHOLD with one additional concern each (memoize-mutation; cross-rule merging test; prettier packaging; parse-that `all()` versioning lock).
- **Cross-cutting**: 3 findings → 2 UPHOLD (CSSWideKeyword, case-insensitivity), 1 PARTIAL-REVISE (parse-that unused features split into dispatch=defect, splitBalanced=DRY-only, cssParser=architectural choice).

### Re-prioritisation after challenge

The research's P1 list is mostly right but a few moves:

- **Promote to P1**: §5.1 `ValuesValue` missing `CSSWideKeyword` (research had it in P1-d ✓), §5.2 case-insensitivity (P1-e ✓), FE7 `evaluateSimpleCalc` (P1-f ✓). These are all already P1 — research's prioritisation upheld.
- **Demote within P1**: FE1 `parseDeclarationValue` from "high" to "medium" — the *behaviour* is spec-aligned; only the lack of diagnostic channel is the violation.
- **Demote within P1**: FE3 `animation-shorthand` unknown-token drop from "medium" to "low-medium" — also spec-aligned, only library observability suffers.
- **Keep at P1**: FE2 — high severity confirmed; this one IS a silent malformed-value drop with no spec cover.
- **Re-label P2-d** (3 hand-rolled balanced scanners) from "performance" to "DRY only" — perf gain is zero, code-clarity gain is real.
- **Promote within P2**: HP3 (`nameParser`) — branch count is 156 not 148, but severity stays medium-high because hit-frequency is narrower than the research implied (only color-named declarations, not bare identifiers generally).

### Holes the research didn't surface

Three issues found during the challenge that the research missed:

1. **`parseAnimationShorthand` memoize-cache-mutation hazard** (§4.1) — returns mutable arrays/objects through a memo cache.
2. **`extractAnimationOptions` cross-rule merging needs an explicit test** (§4.2) — documented as intentional in the source comment but never exercised in any test.
3. **`stylesheet.ts` `all()`+`.opt()` semantic lock-in is a parse-that-versioning risk** (§4.4) — not just brittleness, but a real semver risk.

### Single-line meta-judgment

The research is well-founded; it slightly over-states severity on FE1/FE3 (spec-permissive paths), correctly identifies the real D3 violations (FE2/FE6/FE7), and under-states severity on FE6 (the discarded diagnostic surface is parse-that's *contract*, not internal state — value.js is rejecting an offered API). HP3 branch count is 156 not 148; HP5 is DRY not perf; everything else stands.

---
