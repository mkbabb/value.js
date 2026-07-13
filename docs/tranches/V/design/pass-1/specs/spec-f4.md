# V · pass-1 · SPEC — Family 4 · TYPE-ONTOLOGY / DOMAIN-PRIMITIVE

**Pass 1 · SYNTHESIZE · 2026-07-13 · author: pass-1 synthesizer.**
Distilled from `f4-type-ontology.md` + `r4-type-ontology.md` + `t4-type-ontology.md` (Family 4,
TRIPLE-covered — the VJ corpus was verified three ways: `grep` on src, read on the drop sites, and
`t4` RAN each trigger against `dist/value.js`). Mechanism made concrete for D1–D4; no ranking.

---

## §0 The mechanism (what structure is DERIVED FROM)

The library's **CORE TYPE LATTICE**: the VALUE model (`ValueUnit` / `FunctionValue` / `ValueArray`),
the COLOR model (`Color<T>` + 17 space classes), the PARSE model (the parse-that combinator). The tree
mirrors the type lattice, and — the family's irreplaceable half — parsing VALIDATION becomes a
first-class typed `{ value, diagnostics }` boundary at the combinator seam, not a silent partial parse.

**Honest scope (all three probes CONFIRM the portfolio's charge)**: this is a **src-CENTRIC / D3
family** — a "typed-diagnostics + value-model-carve" DIMENSION, not a whole-tree shape. It contributes
nothing native to D1 (demo is Vue, not types), only ratifies D2's landed `ApiError`/brand discipline,
and its D4 angle is thin. It COMPOSES onto a layout family (F1/F3) — it ADDS the diagnostics axis
glass-ui's spec is silent on. Score it as a composed layer, not a standalone whole-problem answer.

---

## §1 · D1 — demo/ frontend

Non-native. Demo inherits the barrel/colocation hygiene from whichever layout family owns D1; F4 has no
type-lattice payload here. Defer to F1/F2/F3 placement.

## §2 · D2 — api/ backend

Ratify + extend, no restructure. api's typed `ApiError` + branded `SessionToken`/`UserSlug` nominal
types (tranche L) ARE this family already — every boundary crossing carries a typed result, never an
untyped throw. D2 = ratify the L-tranche brand discipline.

## §3 · D3 — src/ library (the heart)

### The parse-validation corpus (gap c — MEASURED 3 ways: exactly 2 of 11 VJ bugs OPEN)

`t4` ran every A6 trigger against `dist/value.js`; `f4`/`r4` grepped src. Consensus: **9 CLOSED, 2 OPEN,
1 consumer-seam.**

| # | class | verdict | evidence |
|---|---|---|---|
| **9** | no diagnostics channel → `parseable:true` false-positive | **OPEN** | `grep onParseError\|enableDiagnostics` on the 4 public entries = **0**; `parseCSSValue`/`parseCSSValues`/`parseCSSStylesheet` call `utils.tryParse(...)` with NO sink |
| **11** | `PropertyDescriptor` type-name collision (KF-7) | **OPEN** | still exported at 3 public surfaces (`index.ts:361`, `subpaths/parsing.ts:39`, `stylesheet/index.ts:18`; def `stylesheet-types.ts:33`); collides TS-lib `interface PropertyDescriptor` (`lib.es5.d.ts:108`); `grep CSSPropertyDescriptor src/` = 0 |
| 8 | unflatten array-boxing → NaN | **CONSUMER-SEAM** | `t4` ran the probe: `flattenObject` returns `Record<string,any[]>` BY DESIGN (`units/utils.ts:186`); NaN manifests only in the kf-U downstream consumer, NOT reproducible as a value.js public-API defect |
| 1/2/4/5/6/7/10 + 3 | landed/fixed | **CLOSED** | `t4` verbatim run outputs (multi-fn kept, `none` no-NaN, `--double(2)` FunctionValue, 3 `if()` branches, `contrast-color(red)`→`rgb(0 0 0)`, provenance retained, spring fixed) |

**Reframe `t4` measured**: value.js has **no `parseable` field** (`grep parseable src/` = a doc comment
only) — it is a keyframes.js consumer concept. value.js's #9 obligation is purely to EXPOSE diagnostics
so the consumer can compute an honest `parseable`. This SHRINKS Family 4's D3 payload from an "11-class
regression suite" to **2 fixes + turn the corpus into a fuzz gate**.

### The diagnostics decision (gaps a + b — the family's core tension, no free option)

- **Gap (a) cost**: `{ ast, diagnostics }` return = **BREAKING on 2 of 8 export keys' `.d.ts`** (`.` +
  `./parsing`; the 8 map KEYS don't churn — the portfolio's "8-key exports churn?" fear is mis-aimed) and
  rewrites the call-sites: `r4` counted **68 non-test** (41 src + 5 demo + 22 kf) **+ 423 test = 491**
  sites; a **major-version event** — the exact atomic-vs-publish hazard glass-ui deferred. An **additive
  optional `onParseError?` param = 0 external churn, non-breaking, 0 exports-map churn.**
- **Gap (b) SPLITS**: threading `onParseError` is **sufficient + non-breaking for the FAILURE/throw
  class** (`state.isError`), but **INSUFFICIENT for the LOSSY-SUCCESS class** — the exact #9 sting. The
  sink fires ONLY on `state.isError`; value.js's deliberate recovery branches SUCCEED silently:
  `stylesheet-types.ts:107-118` (`kind:"unknown"` at-rule captured verbatim) and
  `stylesheet.ts:227-234` (`liftKeyframeMetadata` drops an `!important` decl per CSS-Animations §3, a
  `.map()` closure with NO access to any top-level sink). kf's `validate.ts:33-34` (READ-ONLY sibling)
  states verbatim that value.js "silently drops it at the AST" and rebuilds its own diagnostics channel
  BECAUSE value.js emits nothing.
- **THE MEMOIZE FORCING FUNCTION (`t4`'s new finding — the decisive architectural cost)**: `parseCSSValue`
  and `parseCSSStylesheet` are `memoize`d with `keyFn:(input)=>input` (`parseCSSValue.length` arity = 0,
  the wrapper). A side-effect sink **NEVER fires on a cache HIT** → a callback is structurally UNSOUND
  through a memoized entry. A diagnostics array **embedded in the return is cached alongside the value and
  survives every hit.** So for the memoized entries specifically, if diagnostics must appear on SUCCESS,
  the `{ ast, diagnostics }` return is strictly MORE correct than a sink — the memoize interaction, not
  aesthetics, is the forcing function. (`parseCSSValues` is NOT memoized — it can thread the sink cleanly.)
- **The three closure mechanisms (the design fork, stated honestly)**: (1) threaded diagnostics
  accumulator reaching the drop sites (non-breaking types, but a DEEP internal rewire of `.map()`
  closures); (2) `{ ast, diagnostics }` return (clean ontology, breaking, the deferred hazard, but the
  memoize interaction favors it); (3) grammar **fail-CLOSED** so a malformed decl becomes a total failure
  the throw+sink catches (`t4` preferred — aligns charter §0 "no masking fallbacks"). There is NO free
  option — this is the family's real tension, not cosmetic.

### The units/ layout move (gap d — exactly ONE materially-different carve)

- **The value model is a god-impl-file**: `units/index.ts` (**451 LoC**) holds all three primitives
  (`ValueUnit` L16–191 ~176, `FunctionValue` L192–345 ~154, `ValueArray` L346–387 ~42) + 2 types AND is
  itself the barrel. The type ontology says three peers → **carve into `value-unit.ts` / `function-value.ts`
  / `value-array.ts` / `types.ts` behind a PURE re-export barrel** — mirroring the color model's
  ALREADY-landed precedent (`units/color/base.ts` `Color<T>` 357 L + `spaces.ts` 17 classes 486 L).
- **The color cluster is ALREADY lattice-shaped** (`base`/`spaces`/`conversions/`/`gamut/`/`dispatch`) —
  Family 4 RATIFIES it, no move. Forcing the tree to FURTHER mirror the `Color<T>` lattice would fight the
  good conversion/gamut decomposition; the `as unknown as` = 8 seams are the ontology's KNOWN irreducible
  `Color<T>` generic-component erasure (not cleanup targets). **So the lattice implies ONE carve, not a
  wholesale `units/` re-layout** — confirming "type ontology ≠ directory ontology," and that ONE carve is
  the SAME node F1 (§2.1) and F2 (cycle spine) independently reach.

## §4 · D4 — repo hygiene

Type-driven complexity reduction: `as any` in src = **0** (the 1 grep hit is a comment); `as unknown as`
= **8** (the documented irreducible erasure class — not cleanup targets). The **#11 rename**
(`PropertyDescriptor` → `CSSPropertyDescriptor`) is the one type-ontology D4 win: a clean-break rename
across **7–8 src files** (index, stylesheet, index-barrel, extract, serialize, subpaths/parsing,
stylesheet-types), **0 external callers** (kf imports `parseCSSStylesheet`/`extractKeyframes`, never
`PropertyDescriptor`) — cheap, do it.

---

## §5 · Gate shapes this family lands (CC-6)

The **one gate D3 wants to ADD** (the owner-sanctioned exception to the gate cull — "the cull is against
overfit ceremony, not a real correctness corpus"): **`proof:grammar-fuzz`** seeded with the 11 A6 inputs
as auto-flipping tripwires — the browser/spec-actuated oracle that neither a sink NOR a `{ast,diagnostics}`
return can replace (EN-a: a self-round-trip oracle is BLIND to spec-invalidity). Plus a
**`proof:diagnostics-wired`** born-RED probe asserting the public parse entries forward/surface
diagnostics (RED today — 0 sink refs). Both fold into F5's battery.

## §6 · What the pass-2 prototype MUST demonstrate (measured, isolated worktree)

1. **EXECUTE the #8 unflatten probe** (SPEC-ONLY until now): confirm/close `flattenObject`→`unflattenObject`
   on unitless `1.5` produces no NaN at the value.js public surface (t4 partly ran this; close it).
2. **Wire `onParseError?` on `parseCSSValues`** (non-memoized, clean) → prove a hard-failure input FIRES
   the sink; then **demonstrate the memoize hazard** on `parseCSSValue` (the sink does NOT fire on a cache
   hit) — the measured forcing function.
3. **Prototype the lossy-success closure** (option 2 or 3) on the stylesheet `kind:"unknown"` /
   `!important`-drop path → prove the drop now surfaces a `warning`-severity diagnostic (or fails closed).
4. **Do the #11 rename** (7–8 files) → `npm run typecheck` exit 0 + `grep CSSPropertyDescriptor src/` > 0
   + `grep '\bPropertyDescriptor\b' src/` = 0.
5. **Author + RUN `proof:grammar-fuzz`** seeded with the 11 A6 inputs → GREEN on the 9 closed, RED on #9/#11.

## §7 · Honest current weaknesses

- **Single-surface (D3)** — CONFIRMED by all three probes. Nothing native to D1; only ratifies D2; thin
  D4. Its layout half (gap d) collapses to the one barrel-carve every shape-family also reaches.
- **The diagnostics fork has no free option**: the cheap additive sink is insufficient for the real bug
  (lossy-success + the memoize unsoundness); the clean `{ast,diagnostics}` return is breaking (491 sites,
  the deferred hazard); the grammar-fail-closed path is a per-branch rewire. A genuine tension to resolve,
  not a one-liner.
- **#5/#8 have no auto-tripwire** today (the absent grammar-fuzz gate) — landed by code presence, not by
  a flipping test.

## §8 · Composition (facts, NOT a ranking)

F4 ADDS a DIMENSION (typed diagnostics + the value-model carve) that composes with a layout family
(F1/F3 for D1/D2/D4) and an execution family (F5 gate `proof:diagnostics-wired` + `proof:grammar-fuzz`;
F6 codemod = a trivial signature widen + the #11 rename). **Convergence facts**: the `units/index.ts`
value-model split is the SAME node as survey #4 (barrel-purity) and the F2 cycle-spine — F4 supplies the
type-lattice RATIONALE (`base`/`value-unit`/`function-value`/`value-array`, per the color `base`+`spaces`
precedent); `lib/palette/types.ts` as a demo kernel/types home is where F4 and F2 agree.
