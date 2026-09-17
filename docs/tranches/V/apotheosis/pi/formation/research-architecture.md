# V·π SEAT R — THE TRANSPOSE ARCHITECTURE (research, Fable)

2026-07-20 · contract: `../CHARTER.md` · oracle: live `src/css/` (1948 L incl.
named-colors) · census: `../../parser-proof/coverage.md` · perf mandate:
`../../parser-proof/PROFILE-ANALYSIS.md` O-1..O-4 · spec rule:
`../../parser-proof/equivalence.md` §4 (R1–R5). Engine: `@mkbabb/parse-that@1.0.0`
AS PUBLISHED (surface: `dist/index.d.ts` + `leaf/parser/state/utils/split.d.ts`).

## 0. The load-bearing ruling: two tiers, one skeleton

The live /css surface produces **8 diagnostic codes**. Two (`css_syntax`,
`trailing_input`) are recognition-shaped; six (`color_context_required`,
`keyframe_selector_invalid`, `syntax_*`, `animation_option_invalid`,
`timeline_option_invalid`) are **semantic adjudications live makes in hand-written
guard/validator code around its recognizers**. Therefore the mirror is two tiers:

- **Tier 1 — recognition**: parse-that combinators over the fused lexeme layer
  (§A). Engine failure → live-shaped `failure(source, "css_syntax", …)`.
- **Tier 2 — adjudication**: live's guard-and-validator skeleton **transposed
  near-verbatim** (it is not regex-parsing code — it is ordered decisions over
  parsed values), producing the six semantic codes at the same decision points
  live does. `success`/`failure`/`EMPTY_DIAGNOSTICS` (live `grammar.ts:33-61`)
  transpose verbatim into `result.ts`, so diagnostics are contract-shaped **by
  construction**, not by post-hoc mapping.

Two standing invariants this ruling fixes:

- **No-throw**: every public entry wraps its grammar in a try/catch returning
  `failure(source)` — the mirror can never reproduce the R1 crash class.
- **Fail-fast is CONTRACT, not a spec target**: `ParseResult` has no partial
  success; live fails a whole sheet on one bad construct. CSS-Syntax-3 error
  *recovery* (drop-invalid-and-continue) is explicitly OUT — spec-correctness
  (G-2) applies to the accept/reject decision and value of each construct, never
  to relaxing the all-or-nothing result model. (`recover()` exists in the engine;
  it is not used.)

**Freeze**: `deepFreeze` in `success()` sits behind one compile-time constant
(`FREEZE` in `result.ts`, default **false**) — harden's parity ruling flips one
line (Charter freeze-parity clause; PROFILE §2 fair-comparison caveat).

## A. The lexeme layer — `src/lexeme.ts`

O-1/O-2/O-3 by construction. **Every grammar module consumes tokens ONLY from
this file** — no bare `regex()`, no `.skip(trivia)`, no `map/mapState` staging
anywhere in the mirror. Custom leaves via the public `Parser` constructor +
`createParserContext`; trivia via the engine's `skipBlockComments` (in-place,
never fails — no `.opt()`, no benign-failure `mergeErrorState` traffic).

```ts
import { Parser, createParserContext, skipBlockComments } from "@mkbabb/parse-that";

// O-2: the fused leaf. ONE sticky exec at state.offset; span end sealed BEFORE
// trivia; skipBlockComments advances in place; ONE object built; zero staging.
export function lexeme<T>(
    re: RegExp,                                   // MUST be sticky ("y"); asserted at module load
    build: (m: RegExpExecArray, start: number, end: number) => T,
): Parser<T> {
    return new Parser<T>((state) => {
        re.lastIndex = state.offset;
        const m = re.exec(state.src);
        if (m === null) return state.err(undefined, state.offset);
        const end = re.lastIndex;                 // span end BEFORE trivia
        const out = state.ok(build(m, m.index, end), end);
        skipBlockComments(out);                   // O-1: trivia after the seal
        return out;
    }, createParserContext("regex", undefined, re));
}

// Literal token: charCode/startsWith compare + skipBlockComments. No regex.
export function lit(text: string): Parser<string>;

// O-3: numbers in ONE pass — parseFloat + unit from match groups, no second exec.
const NUM = String.raw`[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?`;
export type NumTok = Readonly<{ value: number; unit: string }>;
export const num: Parser<NumTok>;                 // (NUM) — unit ""
export const numUnit: Parser<NumTok>;             // (NUM)(%|[a-zA-Z-]*)? — unit from m[2] ?? ""
export const ident: Parser<string>;               // css ident incl. --custom (lexed, case preserved)
export const fnHead: Parser<string>;              // ([a-zA-Z_-][\w-]*)\(  → lowercased name
export const quoted: Parser<string>;              // "…"/'…' with escapes, raw incl. quotes

// Balanced raw capture — for contract fields that ARE raw strings (selector
// prelude, unknown at-rule prelude/body, custom-property fallback): depth/quote
// tracking scan to a stop char at depth 0; yields the raw slice. Transposed from
// live's scanners so trim semantics match exactly.
export function balancedUntil(stop: string): Parser<string>;

// Entry plumbing: parseState + offset===length check; exception → null.
export function runComplete<T>(grammar: Parser<T>, input: string): T | null;
```

Failure paths carry no engine labels — Tier 2's transposed `failure()` calls own
`expected[]` wording (live's are hand-written strings; matching them exactly is
part of the transpose). `util.ts` transposes `splitTopLevel`/`splitValueTokens`/
`topLevelColon`/`emptyComma` verbatim (live `grammar.ts:63-126`,
`stylesheet.ts:365-384,580-593`) — their exact trim/drop semantics ARE contract
behavior at the raw-string seams (selectors, scope prelude, cascade fallbacks).
Engine `splitBalanced` is used only if harden proves it behavior-identical (§G-11).

## B. Module map — `pi/mirror/src/`

Package: seeded from the assay skeleton (`package.json` shape, parse-that pinned
`1.0.0`, tsc strict); **kept** from C14: pin, tsconfig discipline, `runComplete`
outer-guard idea, the l4 topology as naming precedent. **Re-founded**: all of
`combinators.ts` (replaced by §A — that is the O-1/O-2 mandate) and every l4
module (247 L total, thin witnesses — re-authored on `lexeme()`).

```
lexeme.ts  util.ts  result.ts            — §A + transposed helpers + success/failure/FREEZE
types.ts                                 — the 33 contract types, verbatim (§C)
deps/foundation.ts                       — Result/ok/err (live foundation/result.ts, 6 L, verbatim)
deps/color-model.ts                      — SpaceId…ColorFactory + SPACE_SCHEMA + factories +
                                           isAnyColor (live color/model.ts:4-134, verbatim subset)
                                           + adaptXyzD50ToD65 + D50_TO_D65 + multiply
                                           (live color/anchors.ts:70-80 + matrix helper)
deps/value-types.ts                      — CssValue/CssScalar/CssCall/CssList (live value.ts:3-23)
                                           + JumpPosition (live easing.ts:13)
named-colors.ts                          — verbatim (150 L)
grammar/color.ts                         — parseCssColor + functional-color dispatch
grammar/value.ts                         — parseCssScalar/parseCssValue/parseCssValues
grammar/easing.ts                        — parseTimingFunction
grammar/keyframe-selector.ts             — parseKeyframeSelector + serializeKeyframeSelector (internal)
serialize.ts                             — serializeCssColor + serializeCssValue (verbatim transpose)
syntax.ts                                — coerceToSyntax + isSupportedSyntaxDescriptor (verbatim;
                                           only the parseCssValue import rewired)
timeline.ts                              — parseAnimationTimeline/parseAnimationRange (Tier-1 grammars
                                           + Tier-2 codes) + serializeTimelineOptions (verbatim)
stylesheet/blocks.ts                     — block-structure grammar (prelude/body, quotes, comments)
stylesheet/declarations.ts               — declaration grammar + Tier-2 validation wiring
stylesheet/analyze.ts                    — timingFunctionValue/timelineValue/animationArm/
                                           expandAnimationShorthand/optionDeclarationValid/
                                           animationCascade/components/repeated (live
                                           stylesheet.ts:99-363,781-825 — CssValue-TREE code,
                                           near-verbatim; NOT parsing code)
stylesheet/at-rules.ts                   — @keyframes/@property/@function/@scope/@starting-style/
                                           @scroll-timeline/@view-timeline/unknown
stylesheet/index.ts                      — parseItems/parseStylesheet
stylesheet/collect.ts                    — collect + 4 typed collectors + collectDeclarations +
                                           collectAnimationOptions + collectTimelineOptions (verbatim)
index.ts                                 — the 52-export barrel, line-mirroring src/css/index.ts
```

The decisive observation: **of live's 899-line `stylesheet.ts`, ~60% is
CssValue-tree analysis, not text parsing** — it transposes near-verbatim and is
untouched by the combinator rewrite. Only `blocks()`, declaration/row splitting,
and the prelude scanners become grammar.

### The 19 runtime exports

TOTAL (G-1) uniformly means: exported by name from `index.ts` · signature/type
identical to live's d.ts · differential GREEN on its door's corpus under the §E
expected-divergence ledger · its born-RED tests discharged. Per-export deltas
noted. Grades: S ≤½ seat-day · M ≈1 · L ≥2.

| export (live anchor) | strategy | grade | TOTAL specifics |
|---|---|---|---|
| `parseCssColor` `grammar.ts:257` | Tier-2 skeleton transposed (trim → var/env+context guard `:260` → hsv/kelvin/ictcp/jzazbz reject `:263` → transparent `:264` → named `:265` → hex `:267` → fn dispatch); Tier-1 per-space channel grammars over `numUnit`; channel/percent scaling per live `:183-252`; colors built via transposed factories (`deps/color-model`) | **L** | 13 spaces + hex(3/4/6/8) + 148 named + `color()` (srgb→rgb, xyz-d50 adapt `:239-243`) + all guards; R1/R3/R6/R9 per §E |
| `parseCssScalar` `grammar.ts:334` | thin: trim → color door → number+unit lexeme → quoted → operator keywords `:327` → ident | S | operator/`:`/`;` keyword acceptance preserved (contract) |
| `parseCssValue` `grammar.ts:393` | list grammar (comma > slash > space precedence `:341-369`); top-level `:`/`;` are standalone keyword tokens (splitValueTokens parity `:117`); call grammar with color-name exclusion `:371`, zero-arg rules `:374-382`, comma-args flattening `:385-387` | **M** | nesting via `Parser.lazy`; R8 per §E |
| `parseCssValues` `grammar.ts:397` | wrapper: non-list → singleton space list | S | verbatim |
| `parseKeyframeSelector` `grammar.ts:405` | dispatch head (§D-4): from/to→percent 0/1 (contract-shaped), percent w/ 0..100 range → `keyframe_selector_invalid`, named+offset `:418-425` | S | R4 range check IS live+spec here — keep |
| `parseTimingFunction` `grammar.ts:436` | dispatch head (§D-3): 5 keywords, step-start/end, cubic-bezier (x∈[0,1] `:449`), steps (aliases+jump-none≥2 `:457-462`), linear (≥2 stops, ≤2 positions `:466-478`) | M | 4 kinds of `CssTimingFunction` |
| `serializeCssColor` `grammar.ts:289` | **verbatim transpose** (format/angle/alphaSuffix `:283-287` + the 10-arm switch) | S | isAnyColor + CSS_COLOR_SPACES guards intact |
| `coerceToSyntax` `syntax.ts:91` | **verbatim transpose** of syntax.ts whole (101 L); rewire `parseCssValue` import | S | both `syntax_*` codes |
| `parseAnimationRange` `timeline.ts:66` | Tier-1 boundary grammar + transposed 2/1-split disambiguation `:78-82`; `timeline_option_invalid` | M | R11 per §E |
| `parseAnimationTimeline` `timeline.ts:17` | dispatch head (§D-5); scroll()/view() arg grammars | M | R10 per §E |
| `serializeTimelineOptions` `timeline.ts:108` | **verbatim transpose** (+ serializeTimeline/Range/Scope/Trigger `:86-107`) | S | — |
| `collectAnimationOptions` `stylesheet.ts:827` | **verbatim transpose** (rides analyze.ts) | M* | *M for the analyze.ts block as a whole |
| `collectCustomFunctions` `:767` | verbatim (generic `collect` `:747-761`) | S | path model frozen |
| `collectDeclarations` `:772` | verbatim (important-cascade map) | S | — |
| `collectKeyframes` `:763` | verbatim | S | — |
| `collectPropertyDescriptors` `:765` | verbatim | S | — |
| `collectStyleRules` `:769` | verbatim | S | — |
| `collectTimelineOptions` `:879` | verbatim transpose (re-parse via serialize round-trip `:874-897` preserved) | S | — |
| `parseStylesheet` `:743` | Tier-1 blocks grammar (transposing `blocks()` `:431-482` semantics: comment skip, `;`-preludes, balanced braces/quotes) + at-rule dispatch (§D-2) + `parseStyleBody` declarations-else-nested fallback `:559-578` + all descriptor validation (`@property` `:638-674`, `@function` prelude `:595-622`, scope prelude `:524-557`, scroll/view-timeline `:703-721`, unknown passthrough `:723-733`) | **L** | full `StylesheetItem` 9-kind union; nesting; R2/R5/R7/R12 per §E |

Type exports (33): one wave-zero verbatim transpose — §C.

## C. AST/type contract — exact `index.d.ts` parity

- `types.ts` transposes live `src/css/types.ts:1-131` **byte-for-byte in the
  type bodies**; only the four import lines rewire (`../color/model` →
  `deps/color-model`, `../foundation/result` → `deps/foundation`, `../easing` →
  `deps/value-types` (JumpPosition), `../value` → `deps/value-types`). The
  `types.ts:131` convenience re-exports (`ColorIssue, Result, JumpPosition,
  CssList, CssScalar, CssValue`) exist on the module but are NOT in `index.ts` —
  the barrel mirrors `src/css/index.ts` exactly: 33 types + 19 runtime, nothing
  more. **Frozen shapes**: the `ParseIssue` 8-code union (`types.ts:10-24`), the
  9-kind `StylesheetItem` union (`:118-127`), `Stylesheet = readonly
  StylesheetItem[]`, `CollectedRule` path model.
- **Parity gate (scaffold deliverable)**: a script diffing the mirror's emitted
  `index.d.ts` export set + resolved type text against live's — symbol-for-symbol,
  member-for-member. Runs in CI-of-the-package; born-GREEN at W0 close.
- **Assay private shapes — every replacement point**:
  - `OklchValue` (`value.ts:1-6`) → `Color<"oklch">` = `{space, channels:[Channel×3], alpha}` — **no `type` field**; channels may be `"none"`.
  - `CubicBezierValue` (`:8-12`) → `CssTimingFunction` kind `"cubic-bezier"` `{x1,y1,x2,y2}` — named fields, not a coordinates tuple.
  - `DeclarationValue = string|…` (`:14`) → full `CssValue` tree — no opaque-string declarations anywhere.
  - `StyleRuleValue.selectorText` (`:16-20`) → `StyleRule.selectors: readonly string[]` (top-level comma split, live `:738`) — raw-source `selectorText` is retired.
  - `StylesheetValue.cssRules` (`:22-25`) → `Stylesheet` item array with all 9 kinds; declarations are ordered `Declaration[]`, not a name-keyed record.
  - `CssDiagnostic` 3-code + line/column (`result.ts:3-15`) → `ParseIssue` `{code×8, start, end, expected, actual}` — no line/column, no `CSS_EXCEPTION` (exceptions become `css_syntax` failures via the no-throw guard).
  - CST `Captured`/`Span` (`cst.ts`) → **internal only**; no spans on the public surface.
  - Assay `serialize.ts` (SourceDocument/serializeExact) → **dropped** — no live peer; source-edit machinery is C12 growth material, not G-1 surface.

## D. Dispatch-table sites

`dispatch()` (engine `leaf.d.ts`, O(1) first-char) where ladders form; for
**function-name** ladders the mirror uses a better structure the engine's PT-Q5
note anticipates: lex `fnHead` ONCE, then a `Record<string, Parser>` name-keyed
jump — no first-char c-bucket megamorphism at all (answers the engine's
"value.js real c-bucket" question grammar-side, zero engine asks).

| site | keying |
|---|---|
| D-1 value-atom head (`grammar/value.ts`) | `dispatch`: `0-9`,`+`,`.` → numeric · `#` → hex-color · `"` `'` → quoted · `-` → ordered any(number, ident/custom) · `a-z_` → ident-or-fnHead ladder |
| D-2 at-rule head (`stylesheet/at-rules.ts`) | after `@`: `dispatch` on next char — `k`eyframes · `p`roperty · `f`unction · `v`iew-timeline · `s` bucket (scope/starting-style/scroll-timeline, 3-way lit ladder) · default → unknown passthrough |
| D-3 easing head (`grammar/easing.ts`) | `dispatch`: `l` (linear kw / `linear(`) · `e` (ease*) · `s` (steps kw+fn) · `c` (`cubic-bezier(`) |
| D-4 keyframe-selector head | `dispatch`: digit/`+`/`-`/`.` → percent · `f`rom · `t`o · `e` (entry/exit) · `c` (cover/contain) |
| D-5 timeline head (`timeline.ts`) | `dispatch`: `a`uto · `n`one · `s` (`scroll(`) · `v` (`view(`) · `-` (`--name`) |
| D-6 color-function body (`grammar/color.ts`) | name-keyed Record after `fnHead`: rgb/rgba/hsl/hsla/hwb/lab/lch/oklab/oklch/color → per-space channel grammar (each row carries its percent-scale triple + hue flag, live `:183-224`) |

O-4 law: D-1/D-2 land WITH their waves (ladders provably wide); D-3/D-4/D-5 are
authored as tables from day one (cheap); further tables only on W7 profile
evidence. O-5 `memoize` only if W7 measures backtracking (the grammar is
near-LL(1); expected unused).

## E. Spec-correction ledger

Law (Charter): spec (Color 4 / Easing 1 / Syntax 3 / scroll-animations /
css-variables 1) overrides live where they conflict. R1–R5 are adjudicated
(equivalence §4); R6+ are seat-R finds — each graded, all become
expected-divergence fixtures in the differential (live-vs-mirror difference is
EXPECTED and asserted, never a defect).

| # | live behavior (anchor) | spec ruling → mirror behavior |
|---|---|---|
| R1 | empty-body functional color throws (`grammar.ts:181` `slash[0]!`) | clean `ok:false` `css_syntax` — guaranteed by the no-throw entry guard |
| R2 | over-validates animation declarations: rejects `var()`/`calc()`-bearing values (`optionDeclarationValid` `:343`, `animationArm` `:264`) | **substitution-guard**: a declaration value containing `var()`/`env()` anywhere defers semantic validation (valid at parse time); math-function heads (calc/min/max/clamp/round/mod/rem/trig/exp/sign) satisfy numeric slots opaquely. Exact predicate = harden Q-3. Live's remaining semantic checks (negative duration, bad keywords…) stay |
| R3 | dangling alpha slash accepted, α defaults 1 (`splitTopLevel` drops empty part) | trailing `/` with no alpha → reject (grammar requires alpha after `/`) |
| R4 | (live is correct here) kf-selector percent range-checked | keep live: 0..100% → `keyframe_selector_invalid` outside |
| R5 | preceding comment folds into declaration NAME (`blocks`/split seam) | clean name; comment is trivia (lexeme layer gives this for free) |
| R6 | `hsl()`/`hwb()` `<number>` sat/light/white/black taken RAW (`:190,196`: scale 1 → `hsl(120 50 50)` yields s=50 in a 0..1 channel) | Color 4: number ≡ percentage → `/100`. Fixture `hsl(120 50 50)` → s=0.5 |
| R7 | ALL declaration names lowercased (`stylesheet.ts:391`) — custom-property case destroyed | css-variables 1: `--*` case-SENSITIVE → preserve case for `--*`, lowercase others |
| R8 | empty list items silently dropped: `a,,b`→[a,b], `a,`→[a] (`splitTopLevel:63`); only animation-* guarded (`emptyComma:365`) | Syntax 3: empty item invalid → list grammar rejects empty/trailing items everywhere; animation-* keep the `animation_option_invalid` coded path (contract fixture) |
| R9 | commas normalized to spaces in color bodies (`:181`) — mixed `rgb(255, 0 0)` accepted | Color 4: legacy = ALL commas, modern = none → two arms, mixed rejected |
| R10 | same comma-to-space leniency in `scroll()`/`view()` (`timeline.ts:23,38`) | scroll-animations: space-separated only → commas rejected |
| R11 | bare unitless non-zero accepted as `<length-percentage>` offset/inset (`timeline.ts:16`) | unit required except 0 → reject `entry 5`, accept `entry 0` |
| R12 | custom-property VALUES hard-parsed → spec-valid token soup rejected (R2's third fixture class: relative-color inside `color-mix` in a `--*` decl) | `<declaration-value>` is near-arbitrary → `--*` values: attempt `parseCssValue`; on failure fall back to raw keyword scalar `{type:"keyword", value:<raw>}` (contract-type-safe, serialize round-trips identically) |

**Contract-shaped keeps (adjudicated NOT-corrected, for the differential's
expected-AGREEMENT list)**: whole-sheet fail-fast (§0) · `from`/`to` lowered to
percent 0/1 (`KeyframeSelector` has no from/to kind) · `trailing_input` declared
but never emitted by live (grep: zero call sites) — mirror maps engine-trailing
to `css_syntax` to match, code stays reserved (harden Q-6) · operator/`:`/`;`
keyword scalars (`grammar.ts:327`) · zero-arg call rules (`:374-382`) ·
serializeCssColor canonical forms incl. `color(xyz …)` · unterminated comment
fails the sheet (subsumed by fail-fast).

## F. Wave decomposition PROPOSAL (seat W finalizes)

Continuous rail: **every wave closes only with its door's differential green +
its born-RED bank discharged** — the harness graduates per-door as doors land,
not only at the end. Each wave = one Opus execution seat.

- **π.W0 SCAFFOLD (M)** — must deliver before ANY fan-out: package at
  `pi/mirror/` (assay-seeded, parse-that 1.0.0 exact) · `deps/*` + `named-colors`
  + `types.ts` transposes · `result.ts` (success/failure/FREEZE) · `lexeme.ts` +
  unit tests · `util.ts` transposed splitters · `index.ts` full 52-export barrel
  over stub modules · **d.ts parity script GREEN** · differential-harness
  skeleton wired to the barrel · born-RED test bank enumerating every export ·
  bench harness stub. Gate: tsc strict green; parity green; lexeme tests green;
  all doors born-RED.
- **π.W1 VALUES (M)** — `grammar/value.ts` + `parseCssScalar` +
  `keyframe-selector.ts`. Color door imported via seam (typed stub until W2).
- **π.W2 COLOR (M/L)** — `grammar/color.ts` + `serialize.ts::serializeCssColor`.
  Merging W2 activates W1's color-scalar fixtures.
- **π.W3 EASING+TIMELINE (M)** — `grammar/easing.ts` + `timeline.ts` (all three
  exports). Text-level parsers; independent of W1/W2.
- **π.W4 ANALYSIS TRANSPOSE (M)** — `stylesheet/analyze.ts` + `collect.ts` +
  `syntax.ts` + `serialize.ts::serializeCssValue`. Mechanical near-verbatim over
  CssValue trees; consumes W2's serializer arm via seam.
- **π.W5 STYLESHEET (L)** — `blocks.ts` + `declarations.ts` + `at-rules.ts` +
  `stylesheet/index.ts`; wires W1 values, W3 timeline validators, W4 analyzers.
  The join wave. (W may split W5a blocks+declarations / W5b at-rules if seat-sized.)
- **π.W6 GRADUATION (M)** — full-surface differential sweep: 403-item corpus +
  per-door growth (§G-7), R1–R12 expected-divergence fixtures asserted, kf
  type-seam probe (§G-10), P-2 re-census of `coverage.md` → 52/52 + 37/37 TOTAL.
- **π.W7 BENCH (M)** — P-3 resurrection on the full grammar; V8 profile; O-4
  tables applied ONLY where the profile shows ladders; O-5 only-if-measured;
  report BOTH bars (absolute 0.0500/0.1000 vs jsonParser peak; relative vs
  deposed per scenario) → OC-1 row if relative-only.

Dependency lattice: `W0 → {W1‖W2‖W3‖W4} → W5 → {W6‖W7}` — four-way parallel
mid-section, arithmetic ceiling ≈4 concurrent Opus seats.

## G. Open questions → the harden seat

1. **Freeze-parity evidence protocol**: define the grep/probe set over kf +
   demo proving no consumer relies on frozen-ness (`Object.isFrozen`, strict-mode
   mutation reliance). Ruling flips `FREEZE`; also rules what the bench's "fair
   bar" is if frozen (PROFILE §2 caveat — feeds OC-1).
2. **Diagnostic-equality depth for G-2**: propose code + ok-bit EXACT;
   `start/end/expected/actual` recorded-not-gating (live's are ad hoc:
   `expected:[error.code]` at `grammar.ts:172`, spans mostly 0..len). Confirm, or
   demand exact-span parity (then Tier-2 transposition must be call-site-exact).
3. **R2 predicate**: exact substitution-guard (var/env only? attr()? — and the
   math-head list satisfying numeric slots). Which live semantic checks survive.
4. **R8 blast radius**: corpus scan for `a,,b`/trailing-comma acceptances in
   demo/kf inputs before hardening the list grammar.
5. **R7 reliance scan**: does any consumer read lowercased `--*` names back?
6. **`trailing_input`**: confirm reserved-unused (mirror maps trailing →
   `css_syntax`), or rule the mirror starts emitting it (a live-divergence).
7. **Corpus sufficiency**: 403 items skew color/sheet; the 142 OUT_OF_SCOPE
   value/kf-selector items become in-scope — set per-door minimums (proposal:
   ≥50/door incl. adversarial), all 148 named colors exhaustively, and rule
   whether a fuzz/property lane (round-trip serialize∘parse) enters G-2.
8. **Fail-fast confirmation**: affirm §0's no-recovery ruling as contract
   (kf validate.ts depends on whole-sheet ok:false).
9. **Bench scenario freeze**: full-surface grammar accepts more of the corpus
   than W0 did — freeze P-3 scenarios so W7's numbers are comparable to
   `bench-results.json` baselines.
10. **kf seam probe**: adopt a types-only consumer probe compiling kf's 27
    import sites' 37 symbols against the mirror's d.ts (compile-time TOTALity
    witness for Surface 2).
11. **`splitBalanced` vs transposed `splitTopLevel`**: engine util's quote/trim
    semantics unverified — default is the transposed live util; swap only on
    proven behavioral identity.

— seat R, V·π formation, 2026-07-20.

model_served: claude-fable-5
