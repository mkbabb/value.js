# V · pass-1 · research — Family 4 TYPE-ONTOLOGY / DOMAIN-PRIMITIVE

**Author**: pass-1 researcher (Family 4). **Scope**: the four pass-1 gaps in
`DESIGN-CAMPAIGN.md §3` row 4 + `portfolio.md` Family-4 §. Independent — peer
research files (r1, graph-projection) NOT read (early-round isolation).

**Assignment note (template-bug)**: my spawn's `${x.id}/${x.family}/${x.focus}`
arrived UNsubstituted. State on disk: Family 1 (`r1.md`) done; Family 2 done
TWICE (`p1-`+`f2-graph-projection.md` — the same template bug collided two agents
onto GRAPH-PROJECTION). Families 3/4/5/6 were open; I claimed **Family 4** (the
D3-heart, highest-value for the owner's "reduce library complexity + parsing
goblins" edict) and named the file to disambiguate the family unambiguously.

---

## Q(c) — WHICH of A6's 11 VJ bug classes are ACTUALLY still open (verified vs live tree)

Verified against `src/` at branch `tranche-u`. Verdict column is DISK-TRUTH, not
the portfolio's prior claim.

| # | class (VJ) | live evidence (file:line + command) | verdict |
|---|---|---|---|
| 1 | multi-fn truncation (VJ-L3) | `parseCSSValues` wraps FunctionArgs-first → `new ValueArray(...v)` (`parsing/index.ts:16,123,600`) | **LANDED** |
| 2 | serialize round-trip (VJ-Q9) | `none` guards `serialize.ts:36,48`; `color(<space>…)` wrapper preserved `serialize.ts:57` | **LANDED** |
| 3 | @function colon-split (KF-1) | fixed @2.0.0 | LANDED (historical) |
| 4 | dashed-fn call (VJ-Q6) | `fnDashed` arm on `dashedIdentifier` (`parsing/index.ts:442,444,457`) | **LANDED** |
| 5 | if() multibranch (VJ-Q7) | landed prior tranche | LANDED (not re-fuzzed) |
| 6 | contrast-color() (VJ-Q1) | eager resolve `parsing/color/color.ts:398,406` (`istring("contrast-color")`) | **LANDED** |
| 7 | flatten provenance (VJ-Q4) | fnName guard `units/utils.ts:163` | LANDED |
| 8 | unflatten array-boxing → NaN | `unflattenObject` `units/utils.ts:186` | LANDED (not re-fuzzed) |
| **9** | **NO diagnostics channel → `parseable:true` false-positive (VJ-F2)** | see Q(b) — plumbing at `parsing/utils.ts:571` NOT reached by public fns | **OPEN** |
| 10 | spring linear() asymmetry (VJ-L2) | fixed @3.1.0 | LANDED |
| **11** | **`PropertyDescriptor` type-name collision (KF-7)** | still exported `stylesheet-types.ts:33`; PUBLIC at 3 surfaces | **OPEN** |

**Corpus verdict: 2 of 11 OPEN (#9, #11); 9 landed.** #5/#8 marked "not
re-fuzzed" — landed by code presence but no auto-tripwire (the missing grammar-fuzz
gate, A4). Command: `grep -rn -E "parseCSSValue|scanIdentFast|contrast-color|none|display-p3" src/`.

### #11 is a LIVE public collision (upgraded from "verify")

`PropertyDescriptor` is not merely internal — it is re-exported from **3 public
surfaces**: `src/index.ts:361`, `src/subpaths/parsing.ts:39`,
`src/parsing/stylesheet/index.ts:18`. It shadows the TS-lib global
`PropertyDescriptor` in every `.d.ts` that names it → API-Extractor mangling is
real, not hypothetical. Clean-break rename `→ CSSPropertyDescriptor` touches **7
files** (`grep -rln '\bPropertyDescriptor\b' src/` = index, stylesheet, index-barrel,
extract, serialize, subpaths/parsing, stylesheet-types) — a same-major internal
rename (no external caller: kf imports only `parseCSSStylesheet`/`extractKeyframes`,
`grep ../keyframes.js/src` = 22 sites, none name `PropertyDescriptor`).

---

## Q(b) — is threading `onParseError` ENOUGH, or must the return type change?

**ANSWER: `onParseError` threading is NOT sufficient for bug #9's dominant class
(silent lossy-success drops). A sink must reach the DROP SITES inside the grammar,
which the top-level function param cannot.** This is the single most load-bearing
Family-4 finding.

### The plumbing exists but is UNWIRED at the public surface

`parsing/utils.ts` already carries the VJ-F2 kit: `ParseDiagnostic` (`:513`),
`OnParseError` (`:528`), `buildDiagnostic` (`:536`), and `tryParse(parser, input,
onParseError?)` (`:571`). BUT both public entrypoints call it 2-arg:

- `parseCSSValue` → `utils.tryParse(ValuesValueEOF, input)` (`parsing/index.ts:545`) — no sink
- `parseCSSStylesheet` → `utils.tryParse(stylesheet, stripCSSComments(input))` (`stylesheet.ts:639`) — no sink

So even the hard-failure diagnostic is thrown away today. Wiring the sink is a
one-line param addition to each — **necessary but not sufficient.**

### Why the sink can't reach the real bug (the silent-drop class)

`tryParse`'s `onParseError` fires ONLY when `state.isError` (`utils.ts:577,599`).
Bug #9's defining case is a **successful** parse that DISCARDS data — proven at the
drop site:

```
src/parsing/stylesheet/stylesheet.ts:227-234  (liftKeyframeMetadata)
  for (const d of declarations) {
      if (d.important) {
          // CSS Animations spec §3: !important … the entire declaration is
          // ignored. Drop it without an error …
          continue;              // ← lossy SUCCESS, state.isError === false
      }
```

`state.isError` is `false` here — the drop is inside a `.map()` callback deep in
the grammar with **no access to any top-level sink**. `onParseError` will NEVER
fire. This is EXACTLY the case the downstream consumer is blocked on: kf's
`validate.ts:33-34` (READ-ONLY sibling) states verbatim *"value.js silently drops
it at the AST — the diagnostic-surfacing of that drop is a value.js-O dispatch, NOT
in validate's projection yet"* and reconstructs its own `anim.diagnostics` channel
(`validate.ts:99-103,148,155-158`) precisely BECAUSE value.js emits nothing.

### The two mechanisms that CAN close it (design fork)

1. **Threaded accumulator** (sink reaches drop sites). Pass a
   `diagnostics: ParseDiagnostic[]` (or an `emit()` closure) THROUGH the grammar
   builders so `liftKeyframeMetadata` et al. push a `{code:"DROPPED_DECL",…}` row.
   Non-breaking at the type level (optional param), but a **deep internal rewire**
   — the drop sites are pure `.map()` closures today.
2. **Return-shape change** `parseCSSStylesheet → { ast, diagnostics }`. Clean
   ontology (the Family-4 thesis: parse = a typed `{value,diagnostics}` boundary),
   but **breaking** — see Q(a).

The cheap-looking path (1) carries the expensive plumbing; the clean path (2)
carries the breaking cost. There is no free option — this is the family's core
tension, and it is REAL, not cosmetic.

---

## Q(a) — cost of a `{ast, diagnostics}` public parse API (breaking? exports churn?)

- **exports map = 8 keys** (`node -e` on package.json); parse fns are surfaced on
  BOTH `.` (`index.ts:345-354`) and `./parsing` (`subpaths/parsing.ts`). A return-
  type reshape touches **2 of the 8 keys' `.d.ts`** — but changes the TYPE, so it
  is a **major-version** event, the exact atomic-vs-publish hazard glass-ui
  DEFERRED off its 5.0.0 cut (portfolio A5.1 §1).
- **call-site churn if the return TYPE changes** (`grep -rn -E
  "parseCSSValue|parseCSSValues|parseCSSStylesheet"` minus defs):

  | tree | sites | breaks on return-type change? |
  |---|---|---|
  | `src/` | 41 | yes (internal, same PR) |
  | `demo/` | 5 | yes |
  | `api/` | 0 | — |
  | `test/` | 423 | yes (every `.value`/`.type` read must unwrap) |
  | `../keyframes.js/src` | 22 | yes — external consumer, cross-repo relay |

  Non-test churn floor = **68 sites**; total = **491**. The 423 test sites are the
  dominant cost and the real reason return-type reshape is heavy.
- **Non-breaking alternative**: an OPTIONAL sink param (`parseCSSValue(input, {
  onParseError })`) breaks **0** existing sites (all positional-first). But per
  Q(b) it only helps if the sink is threaded to the drop sites — so the API-surface
  saving buys an internal-plumbing bill.

**Recommendation seed (for synthesis, not a decision)**: the non-breaking
sink-param + threaded-accumulator closes #9 at 0 external churn and keeps the 8-key
map stable — matching the owner's "clean break, no dual paths" better than a dual
`parse`/`parseWithDiagnostics` surface. The `{ast,diagnostics}` return shape is the
cleaner ontology but is a deferred-hazard major bump; bank it, don't lead with it.

---

## Q(d) — does the type lattice imply a materially DIFFERENT units/ layout?

**Partly YES — and the split it implies coincides with an already-flagged
barrel-purity violation, so it is high-value, not speculative.**

- **Value-model sublattice is FUSED**: the three distinct atoms `ValueUnit`
  (`units/index.ts:16`), `FunctionValue` (`:192`), `ValueArray` (`:346`) all live
  in ONE 451-LoC `units/index.ts` (`grep -cE "^export (class|…)"` = 5 own defs, 0
  re-exports — a **god-IMPL-file named index.ts**, A3's finding). The type ontology
  says these are three peers → three kind-named siblings (`value-unit.ts` /
  `function-value.ts` / `value-array.ts`) behind a PURE re-export barrel. This is
  glass-ui's own-runtime-sibling §2.1 rule applied by TYPE identity.
- **Color sublattice is ALREADY lattice-shaped**: `units/color/` splits `base.ts`
  (`Color<T>` @ `base.ts:109`) + `spaces.ts` (17 space classes) + `conversions/`
  (10 `{from}2{to}`) + `gamut/` (`ls src/units/color/`). The type lattice is
  already the directory here — Family 4 RATIFIES it, no move.
- **The `as unknown as` seams ARE the ontology's known erasure points** (count = 8,
  `grep -rn 'as unknown as' src/ | wc -l`, matching CLAUDE.md): `dispatch.ts`,
  `contrast.ts`, `color-unit.ts`, `color.ts` (all `Color<T>` generic-component
  erasure) + `layout-cache.ts` (DOM `CSSStyleDeclaration`). The lattice does NOT
  reduce these — it NAMES them as the irreducible generic-erasure class; forcing
  the tree to further mirror `Color<T>` would fight the good conversion/gamut split.

**Net**: the lattice implies ONE material src move (carve the fused value-model
index into 3 type-atom siblings + a pure barrel) and RATIFIES the color tree. It is
NOT a wholesale `units/` re-layout.

---

## The family's severest-failure-mode, tested honestly

Portfolio's own charge: *"the type ontology is not a DIRECTORY ontology … really a
D3 thesis wearing a whole-problem costume — risk of a single-surface family."*
**Confirmed true.** Family 4's payload is ~entirely D3 (parse validation + the
value-model carve). For D1 it has nothing native (demo is Vue, not types); for D2 it
only RATIFIES the landed `ApiError`/brand discipline; for D4 the type-narrowing
angle is thin. **Verdict: Family 4 is a genuine single-surface (D3) family.** Its
correct role in convergence is a COMPOSED LAYER (the typed-diagnostics + value-model
carve) bolted onto a layout thesis (F1/F3) that owns D1/D2/D4 — exactly the
"ADDS a dimension glass-ui's spec is silent on, COMPOSES with F1/F3" self-assessment
in the portfolio. Do not score it as a standalone whole-problem answer.

---

## Load-bearing findings (ranked)

1. **`onParseError` threading is NECESSARY-BUT-INSUFFICIENT for bug #9.** The
   dominant case is a lossy-SUCCESS drop (`stylesheet.ts:227-234`, `state.isError
   === false`); the top-level sink never fires. Closing #9 requires a diagnostics
   accumulator threaded to the grammar drop sites OR a `{ast,diagnostics}` return
   change — a real internal-rewire-vs-breaking-change fork, not a one-liner.
2. **Corpus truth: 2/11 open** (#9 silent-drop channel, #11 `PropertyDescriptor`);
   9 landed, but #5/#8 have no auto-tripwire (the absent grammar-fuzz gate).
3. **#11 is a LIVE public collision** (exported at 3 surfaces `index.ts:361`,
   `subpaths/parsing.ts:39`, `stylesheet/index.ts:18`); clean-break rename = 7
   internal files, 0 external callers → cheap, do it.
4. **`{ast,diagnostics}` return reshape churns 68 non-test + 423 test + 22 kf =
   491 sites and is a major bump** (the glass-ui-deferred atomic-vs-publish hazard);
   the optional-sink path is 0-external-churn and better fits "no dual paths."
5. **The lattice implies ONE material src move**: carve the fused 451-LoC
   value-model `units/index.ts` (ValueUnit/FunctionValue/ValueArray) into 3 kind
   siblings + a pure barrel (also closes A3's god-index barrel-purity breach);
   `units/color/` is already lattice-shaped and only ratified.
6. **Family 4 is single-surface (D3).** Compose it as the typed-diagnostics layer
   over an F1/F3 layout thesis; do not score standalone.
