# V·π SEAT H — ADVERSARIAL CRITIQUE + PROOF APPARATUS (harden, Opus)

2026-07-20 · contract `../CHARTER.md` · target `research-architecture.md` (seat R) ·
oracles: live `src/css/*` (recounted), census `../../parser-proof/coverage.md`,
P-1 `equivalence.md`+`equivalence-results.json` (403 items), P-3
`bench-results.json`. Engine `@mkbabb/parse-that@1.0.0` AS PUBLISHED — no edits.

## Verdict on R

**Architecture SOUND — adopt with the six amendments below.** The two-tier
transpose is correct; the census consumption is correct (I recounted 33 types +
19 runtime = 52, and 37 kf import-scoped symbols with **0 true orphans** — the
one `comm` residual is `parseKeyframeSelector as parseValueSelector`, an alias of
an exported symbol). R's central "serializers/collect\*/coerce are not
regex-parsing code" claim **holds on inspection** (H-6). The amendments are
scheduling and freeze corrections, not a redesign.

---

## 1. Adversarial findings

### H-1 — census/count RETRACTED (R correct)
52 exports recount-confirmed; 37 kf symbols import-scoped confirmed; 0 orphan
seams. Finding A of the census stands. No defect.

### H-2 — CONFIRMED (freeze is a ~24-site surface, not "one line")
R §0: *"deepFreeze sits behind one compile-time constant (`FREEZE` in
`result.ts`); harden flips one line."* **False as stated.** `Object.freeze`/
`deepFreeze` appears at: `grammar.ts` success/failure (5 sites, gated by
`success()`); **`stylesheet.ts` analyze helpers** `timingFunctionValue`:141/144,
cubic:157, steps:172, linear:183/185/188, `timelineValue`:201/202/216/231/237,
`keywordValue`:241/243, `numberValue`:245/247, `listValue`:251, arm:313;
**collectors** :754/755/760/805/829/860/871; `named-colors.ts`:1. R transposes
`analyze.ts`+`collect.ts` **verbatim** — so ~19 freeze calls ride along that the
`FREEZE` constant does not gate. **Fix:** the freeze decision is not one line; it
is a policy applied at every construction site. Ruling in §3 (strip all;
evidence-backed). W4's "verbatim transpose" is amended to **"verbatim MINUS
freeze"** — a named, enumerated divergence, not silent.

### H-3 — CONFIRMED (false parallelism: W4 CLOSE depends on W3, W1 color on W2)
R's lattice `W0 → {W1‖W2‖W3‖W4} → W5` with the per-door "differential green"
close rail is over-optimistic for **closure**:
- `collectTimelineOptions` (:879, W4) calls W3's
  `parseAnimationTimeline`/`parseAnimationRange` runtime via
  `serializeCssValue` round-trip; its private `parseTimelineScope` and
  `parseAnimationTrigger` helpers transpose with W4 from LIVE
  `stylesheet.ts:44-80` and consume those W3 parsers. The prior wording that
  assigned the private helpers to W3 was corrected 2026-07-21; no public
  feature or surface changed.
- `collectAnimationOptions`/`animationArm` call `timingFunctionValue` →
  `parseTimingFunction` — **W3** runtime.
- W1 color-bearing scalar fixtures activate only when W2 lands (R half-admits).

Authoring is 4-way parallel; **closure is not.** W4 cannot go differential-green
until W3 merges; W1's color fixtures gate on W2. **Fix:** amend the ceiling —
authoring ‖4, but the CLOSE order is `W2 ⟹ W1(color rows)` and
`{W2,W3} ⟹ W4`. Simultaneous-close ceiling is **3**, not 4 (§6 gate text).

### H-4 — RETRACTED (barrel `from`-provenance is free)
R re-homes `serializeCssColor` grammar.ts→serialize.ts and keeps the internal
`serializeCssValue` (correctly NOT a public export — verified absent from
`index.ts`). R calls the barrel "line-mirroring `src/css/index.ts`", which live
sources `serializeCssColor` `from "./grammar"`. The **d.ts parity gate is
name+type scoped, not `from`-scoped** — re-homing is invisible to it. Not a
defect; the parity script must compare the emitted export *set* and resolved type
text, never `from` clauses.

### H-5 — CONFIRMED (R2 predicate is under-specified: it must also rule token *slotting*)
`optionDeclarationValid`:343 and `animationArm`:264 validate via
`scalarNumberValue`/`scalarKeyword` over CssValue items; a `var()`/`calc()` item
is `kind:"call"` → `scalarNumberValue`→`undefined`→reject (this IS R2). R's fix
("defer if var()/env(); math-heads satisfy numeric slots") is incomplete:
`animationArm` is a **positional greedy scan** — an opaque "satisfies-numeric"
token changes duration-vs-delay-vs-iteration slot assignment. `animation: n
calc(2s) 1` must resolve slots identically whether or not the mirror deferred.
**Fix — the R2 predicate is two rules, both required:**
1. **Acceptance (declaration parses):** an `animation*` declaration value whose
   tree contains any `var(`/`env(` call anywhere → `optionDeclarationValid`
   returns `true` (defer). Live's non-substitution checks (negative duration,
   bad direction/fill keywords, `emptyComma`) stay.
2. **Slotting (arm scan):** `animationArm` treats a math-head call
   (`calc|min|max|clamp|round|mod|rem|sin|cos|tan|asin|acos|atan|atan2|exp|log|pow|sqrt|hypot|sign|abs`)
   as satisfying the **first unfilled numeric slot in live's existing order**
   (duration→delay→iteration), never reordering. `attr()` is OUT of R2 (not a
   numeric substitution in `animation`).
3. **Collection consequence (state it):** post-parse, `components()` reading a
   deferred `var()` gets `undefined` → that row **omits** the field. The mirror
   ACCEPTS the declaration and yields a partial `CSSAnimationOptions` row. Assert
   both in the fixture (accept-bit AND omitted-field) — this is R2's real shape.

### H-6 — RETRACTED (transpose-verbatim regex-free claim holds — verified)
Read to confirm, not assumed: `serializeCssColor` (grammar.ts:289) = pure
switch/format, **no regex**. `serializeTimelineOptions`/`serializeTimeline`/
`Range`/`Scope`/`Trigger` (timeline.ts:86-124) = pure joins, no regex.
`collect`/`collectDeclarations`/`collectAnimationOptions`/`animationArm`/
`optionDeclarationValid`/`expandAnimationShorthand` = CssValue-tree walkers, no
recognition regex. `coerceToSyntax` uses **one** regex (syntax.ts:64) — a
keyword-guard `/^(initial|inherit|…)$/i.test(payload.value)` on an
already-parsed scalar, **not** a parser. `serializeCssValue` (stylesheet.ts:81)
uses **one** regex (`:92 .replace(/\s+([:;])/g,"$1")`) — output cosmetic, not
parsing. **R vindicated:** all of Tier-2 + serializers transpose near-verbatim.
Caveat carried forward: `collectTimelineOptions` correctness is coupled to
`serializeCssValue ↔ parseAnimationRange` **round-trip stability** — both live in
W4/W3; a per-fixture round-trip assertion belongs in W4's bank (§4).

### H-7 — CONFIRMED (framing: recognition tier is three layers, not "pure combinators")
R's law "every module consumes tokens ONLY from `lexeme.ts`; no bare regex; no
`map/mapState`." But block bodies, `@function` prelude (`([\s\S]*)`), custom-prop
fallback, and top-level list splitting need **depth/quote-aware balanced
scanning** that a sticky `RegExp` leaf cannot express. R supplies
`balancedUntil(stop)` + transposed `splitTopLevel`/`splitValueTokens` — these are
**hand-rolled imperative char loops**, not parse-that combinators. The
recognition tier is therefore (a) lexeme regex leaves, (b) imperative balanced
scanners, (c) combinator composition. **Fix:** state the three layers; the
scanners (b) carry their OWN born-RED unit tests for trim/drop/quote/depth
semantics (they are contract behavior at every raw-string seam — R3/R5/R8 all
live here). Do NOT bury them under "Tier-1 = combinators."

### H-8 — CONFIRMED (color-door corpus + named-color exhaustiveness need enumeration)
The 403 corpus is color/sheet-skewed (color 84, sheet 121, value 120, easing 43,
kf-sel 22); 142 value/kf-sel items were OUT_OF_SCOPE for C14 and become in-scope.
`color()` space handling (srgb→rgb map, xyz-d50 D65 adapt grammar.ts:239-243) and
per-space legacy/modern/none-channel arms are thinly covered. **Fix:** §4
enumerates a color-door matrix (13 spaces × {legacy, modern, none-channel} + hex
{3,4,6,8} + `color()` {srgb, srgb-linear, display-p3, a98-rgb, prophoto-rgb,
rec2020, xyz, xyz-d50}) and asserts **exhaustive** round-trip over every
`NAMED_COLORS` entry (count read from source — file carries ~148–149 entries; the
fixture asserts `Object.keys(NAMED_COLORS).length` matches, not a hard-coded
number).

### H-9 — CONFIRMED-BENIGN (R's open questions Q4/Q5/Q6 resolved by probe)
- **Q6 `trailing_input`:** grep `src/css/{grammar,stylesheet,timeline,syntax}.ts`
  for a `trailing_input` **construction** = **0 sites** (only the type union
  declares it). Ruling: reserved-unused; mirror maps engine-trailing →
  `css_syntax`; a W0 born-GREEN guard asserts 0 construction sites in the mirror.
- **Q5 R7 (`--*` case):** kf reads custom props via **CSSOM
  `getPropertyValue`** (`resolve/browser.ts:208-210`), never from
  `parseStylesheet` declaration names. **Zero consumer reliance** on the
  lowercased form → R7 (preserve `--*` case) is safe.
- **Q4 R8 blast radius:** grep demo `styles/*.css` + kf `src` for `,,` / trailing
  `,)` = **0 hits**. Hardening the list grammar to reject empty items regresses
  no real corpus input; the `a,,b`/`a,` cases live only in the seed adversarial
  set → they become **expected-divergence fixtures** (§5), never silent changes.

---

## 2. FREEZE-PARITY RULING (Charter §freeze-parity; R Q1)

**Ruling: the mirror does NOT freeze — anywhere.** `deepFreeze` in `success()`,
the `Object.freeze` in `failure()`, and every analyze/collect freeze call (§H-2)
are stripped. Evidence and reasoning:

1. **Structural invisibility.** G-2 equivalence is structural value-equality
   (§5). `Object.isFrozen` is not part of value-equality — a frozen and a
   non-frozen object with identical enumerable members are `deepEqual`. Freeze
   is therefore **invisible to the differential**; it can neither create nor mask
   a mirror-defect.
2. **Zero consumer reliance (probed).** No `Object.isFrozen` / mutation-of-parse-
   result site exists in `keyframes-v-exec/src` or `value.js/demo` (the two
   `Object.freeze` hits in demo are unrelated `PICKER_*` constants). kf reads
   results deeply but read-only (`collectStyleRules(ast).at(-1)?.rule.declarations`,
   `collectKeyframes(ast).filter(r=>r.path.length===1)`, `parsed.diagnostics[0]`)
   — never mutates, never branches on frozen-ness.
3. **Bench fairness (PROFILE §2).** The P-3 ratio denominator is parse-that's
   `jsonParser` (un-frozen) and the relative peer is `deposed` (un-frozen); LIVE
   (the only deep-freezing engine) is not a bench denominator. No-freeze is
   apples-to-apples and removes a pure-overhead handicap.

**Equivalence meaning for freeze:** two results are equivalent iff their
`{ok, value|diagnostics}` trees are structurally value-equal; frozen-ness is
explicitly excluded from the comparison. **Codify** the reliance probe as a
standing W0 test (`freeze-independence.test.ts`): assert the two greps above
return empty (guards against a future kf/demo edit that would start depending on
freeze). If that guard ever reddens, re-open this ruling.

---

## 3. FIXTURE BANK SPEC (Charter §proof; R Q7)

Two tiers: **(A)** per-wave born-RED module tests (mechanical, door-local);
**(B)** the graduated differential corpus (cross-engine, full-surface at W6).

### A. Per-wave born-RED banks (in `pi/mirror/test/`)
Every export ships a test file that is RED at W0 (barrel over stubs) and flips
GREEN at its owning wave. Minimum contents per door:

- **W0 scaffold:** `barrel.test.ts` (all 52 names importable + type-level probe),
  `dts-parity.test.ts` (emitted `index.d.ts` export-set + resolved type text ==
  live's, symbol- and member-for-member — the parity gate, born-GREEN),
  `lexeme.test.ts` (num/numUnit/ident/fnHead/quoted/lit + `skipBlockComments`
  span-seal-before-trivia), `scanners.test.ts` (splitTopLevel/splitValueTokens/
  balancedUntil trim/drop/quote/depth — H-7), `freeze-independence.test.ts` (§2),
  `no-trailing-input.test.ts` (H-9).
- **W1 values:** scalar {number+unit, quoted, operator/`:`/`;` keyword, ident};
  value {comma>slash>space precedence, nesting via `lazy`, R8 empty-item reject};
  kf-selector {from/to→0/1, percent range R4, named+offset}.
- **W2 color:** the **color-door matrix** (H-8): 13 spaces × {legacy comma,
  modern space, none-channel} · hex {3,4,6,8} · `color()` {srgb→rgb, srgb-linear,
  display-p3, a98-rgb, prophoto-rgb, rec2020, xyz, xyz-d50 D65-adapt} ·
  **exhaustive** NAMED_COLORS round-trip (count from source) · guards
  {var/env→context code, hsv/kelvin/ictcp/jzazbz→css_syntax, transparent} ·
  R1/R3/R6/R9 fixtures · `serializeCssColor` canonical-form round-trip incl.
  `color(xyz …)`.
- **W3 easing+timeline:** 4 `CssTimingFunction` kinds (keyword ×5, step-start/end,
  cubic-bezier x∈[0,1], steps aliases + jump-none≥2, linear ≥2 stops ≤2 pos);
  timeline {auto/none/scroll()/view()/--name, R10 comma-reject, R11 unitless-reject};
  range {1/2-split disambiguation, R11}.
- **W4 analysis:** collect\* over hand-built `Stylesheet` fixtures (path model,
  important-cascade); `collectAnimationOptions` incl. **R2 accept+omit** (H-5);
  `collectTimelineOptions` **round-trip stability** (H-6 caveat);
  `coerceToSyntax` both `syntax_*` codes; `serializeCssValue` `:`/`;` spacing.
- **W5 stylesheet:** all 9 `StylesheetItem` kinds; nesting; `@property`/`@function`/
  scope/scroll-timeline/view-timeline descriptor validation; unknown-at-rule
  passthrough; R2/R5/R7/R12; **hostile set** — empty bodies `{}`, dangling slash,
  unterminated comment, `!important` trailing, comment-before-name (R5),
  uppercase `--*` (R7), nested recovery-not-attempted (fail-fast).

### B. The graduated differential corpus (full-surface, W6)
Composition = the P-1 403 (`equivalence-results.json`; provenance b=232 test
literals, c=84 demo css, seed=70, d=27 c14, a=19 `test/parsing`) **+** the 142
formerly-OUT_OF_SCOPE value/kf-selector items now in-scope **+** the R1–R12
expected-divergence set **+** hostile additions (H-7/H-8/H-9 class generalized):
empty functional-color bodies (`oklch()`,`rgb( )`,`hsl()`…), dangling `/`, `,,`
and trailing `,`, comment trivia in every seam, `--*` case, mixed legacy/modern
color commas, unitless timeline offsets, unterminated comment/brace/quote.
**Per-door minimums** (Q7 ruled): **≥50 accepted + ≥20 reject per door**, color
exhaustive over named + the space matrix. A **property lane** (round-trip
`parse ∘ serialize == parse` for color, timeline options, value) enters G-2 as a
GREEN rail, NOT as fuzz gating (bounded, deterministic seed list — no random
fuzzer in the gate).

---

## 4. HARNESS GRADUATION SPEC (Charter G-2; R Q2)

The differential runs **mirror vs LIVE export-by-export** (the P-1 harness
resurrected against the full mirror barrel; witness stays spec/test-arbitrated —
it is NOT RUNNABLE, `equivalence.md §5`). For each corpus item routed to a door:

- **Gating equality:** `result.ok` EXACT **and** (`ok` ⇒ value tree structurally
  value-equal, freeze-excluded §2) **and** (`!ok` ⇒ `diagnostics[0].code` EXACT
  **and** `expected[]` EXACT). `expected[]` is gating because R transposes live's
  hand-written strings verbatim — matching them is cheap and proves the Tier-2
  skeleton landed at the right decision points.
- **Recorded-not-gating:** `start`/`end`/`actual`. Live emits `start=0,
  end=source.length` at nearly every `failure()` (grammar.ts:49-50); spans are
  ad-hoc. Record them; **escalate a span to gating only if** a differential run
  surfaces a live callsite passing non-trivial `start/end` on a door in scope
  (then that door's Tier-2 transpose must be call-site-exact). This resolves R
  Q2 without over-committing the whole surface to span parity.
- **Divergence classes:** every item lands in exactly one of — `AGREE` (default
  GREEN); `EXPECTED_DIVERGENCE` (item ∈ R1–R12 ledger → mirror ≠ live is
  **asserted**, GREEN); `MIRROR_DEFECT` (any other disagreement → **RED**, halts
  the wave). The R1–R12 ledger is the **spec-correction whitelist**; it is
  closed — a disagreement not on it is a defect by construction.
- **Census re-run:** W6 re-executes P-2 `coverage.md` against the mirror barrel →
  must read **52/52 TOTAL + 37/37 kf TOTAL** (was 0/3/49 for the C14 assay).

---

## 5. BORN-RED GATE TEXT PER WAVE (amended by §1)

Each gate is mechanically checkable: a `vitest run` subset + a differential-door
subset + (W6) a census row-flip. Close = all three GREEN, born-RED bank
discharged.

- **π.W0** — `tsc --strict` clean; `dts-parity.test.ts` GREEN; `lexeme.test.ts`
  + `scanners.test.ts` + `freeze-independence.test.ts` + `no-trailing-input`
  GREEN; barrel imports all 52; **every door's differential is RED** (stubs).
  *Gate:* the four infra tests GREEN + all doors provably born-RED.
- **π.W1 VALUES** — `parseCssScalar`/`parseCssValue`/`parseCssValues`/
  `parseKeyframeSelector` differential GREEN on the value + kf-selector doors
  **for non-color inputs**; color-scalar fixtures remain RED behind the W2 seam
  (H-3). *Gate:* value/kf-sel doors GREEN sans color; W1 bank (minus color rows)
  discharged.
- **π.W2 COLOR** — color door differential GREEN on the H-8 matrix + exhaustive
  named + R1/R3/R6/R9 expected-divergences; `serializeCssColor` round-trip GREEN;
  **W1's color-scalar rows now flip GREEN** (close-order `W2 ⟹ W1`). *Gate:*
  color door GREEN; W1 color rows discharged.
- **π.W3 EASING+TIMELINE** — easing + timeline + range doors GREEN incl.
  R10/R11; all 4 timing kinds. Independent of W1/W2. *Gate:* three doors GREEN.
- **π.W4 ANALYSIS** — collect\* + `coerceToSyntax` + `serializeCssValue` GREEN
  over hand-built Stylesheet fixtures; **R2 accept+omit** (H-5) asserted;
  `collectTimelineOptions` round-trip-stable (H-6). **Close-gated on W3** (H-3:
  `timingFunctionValue`/`parseAnimationRange` are W3 runtime) **and W2**
  (serializer arm). *Gate:* analyze/collect doors GREEN — **after** W2+W3 merge.
- **π.W5 STYLESHEET** — `parseStylesheet` differential GREEN on all 9 item kinds,
  nesting, every descriptor validator, unknown passthrough, R2/R5/R7/R12, the
  hostile set; **fail-fast affirmed** (whole-sheet `ok:false` on one bad
  construct — kf `validate.ts:182` depends on it, Q8 CONFIRMED). The join wave;
  W may split W5a blocks+declarations / W5b at-rules. *Gate:* stylesheet door
  GREEN; fail-fast fixtures GREEN.
- **π.W6 GRADUATION** — full-surface differential (§3B) with **0 MIRROR_DEFECT**;
  R1–R12 all asserted EXPECTED_DIVERGENCE; kf types-only seam probe compiles (Q10
  — a `tsc`-only module importing all 37 kf symbols from the mirror d.ts); P-2
  census → 52/52 + 37/37. *Gate:* G-1 + G-2 GREEN.
- **π.W7 BENCH** — §6. *Gate:* both bars reported; G-3 verdict emitted.

**Amended simultaneous-close ceiling: 3** (author ‖4; W4 closes after W2+W3).

---

## 6. BENCH PROTOCOL (Charter G-3; R Q9)

**Rig frozen to `bench-results.json`** (schema `p3-comparative-bench-aggregate/1`,
Apple M5 Max, node v26): **5 invocations × 15 samples × N=1000 inner**, warmup 50/
sample; ratio statistic = **peak MB/s of engine ÷ peak MB/s of parse-that
`jsonParser`** (interleaved per sample — shared machine/load state, U-F14 recipe).

- **Scenarios (frozen, do NOT add):** `value-historical`, `sheet-historical`,
  `sheet-demo`, `value-common`, `sheet-common` — so W7's numbers are comparable
  to the C14/deposed baselines. The mirror grammar accepts MORE of each corpus
  than C14 did; scenario *inputs* stay byte-identical (sha256-pinned in the
  rig) — only the engine under test changes.
- **When measured:** **W7 only** — but O-1 (skipBlockComments trivia leaf), O-2
  (fused lexeme, span before trivia, no map/mapState staging), O-3 (one-pass
  numbers) are built into `lexeme.ts` from W0, so W7 is measurement, not
  retrofit. O-4 dispatch tables applied ONLY where the V8 profile shows a real
  ladder; O-5 `memoize` only if backtracking is measured.
- **Close protocol — report BOTH bars, per scenario, over the 5 invocations:**
  1. **Absolute:** `VALUE_RATIO_FLOOR 0.05`, `SHEET_RATIO_FLOOR 0.10` vs
     jsonParser peak (`gate.bar_source proof-perf-target.mjs @ b3f4f76e`).
  2. **Relative:** mirror peak ≥ deposed peak, per scenario.
  3. **Spread bound:** report the 5-invocation verdict vector (as the rig does:
     C14 was `[RED×5]`); a bar is "met" only if met in the **median** and not
     RED in a majority of invocations.
- **Known target — SHEET is the hard bar.** Baselines: C14 value ratio
  **0.0640 (PASS ≥0.05)**, sheet ratio **0.0537 (FAIL ≥0.10)** → `[RED×5]`. The
  mirror must roughly **2×** the sheet throughput to clear absolute. If the
  mirror meets relative (≥ deposed) but not absolute sheet, that is the **OC-1
  owner-decision row** at close (the bench-bar recalibration is owner's, per
  Charter G-3 — H does not pre-empt it). Absolute-met on both = unconditional
  GREEN.

---

## 7. RISK REGISTER

| # | risk | detection | mitigation |
|---|---|---|---|
| K-1 | **parse-that expressiveness cliff** — a needed token (balanced body, `[\s\S]*` prelude) can't be a sticky-regex leaf | W0 `scanners.test.ts` RED; a grammar module reaching for bare `regex()` in review | H-7: sanction `balancedUntil` + transposed `splitTopLevel` as the imperative recognition layer, unit-tested; they are NOT combinators and that is fine |
| K-2 | **freeze silently transposed** into analyze/collect, defeating the O-perf and the §2 ruling | grep the mirror for `Object.freeze`/`deepFreeze` at W4/W6 close = must be 0 | H-2/§2: enumerate the 24 sites; strip all; `freeze-independence.test.ts` guards consumer side |
| K-3 | **W4 closed before W3** (false parallelism) → green on stubs, red on merge | W4 gate requires the LIVE W3 exports, not the seam stub, in its differential | H-3: close-order `{W2,W3} ⟹ W4`; simultaneous-close ceiling 3 |
| K-4 | **R2 slotting drift** — deferred `var()`/math token lands in the wrong animation arm slot vs live | H-5 fixture asserts arm-by-arm slot assignment on `animation: n calc(2s) 1 …` | H-5: predicate = accept-rule + slot-rule + collection-omit, all three asserted |
| K-5 | **AST-shape drift discovered late** — a mirror value tree differs in field naming/order from the frozen d.ts | W0 `dts-parity.test.ts` (structural) + W6 differential value-equality per door | keep types.ts byte-parity; the parity gate is born-GREEN at W0, re-run every wave |
| K-6 | **corpus blind spot** — a door passes its ≥50 but a real spec arm is untested (e.g. `color()` xyz-d50 adapt, none-channels) | per-door minimum + the H-8 enumerated matrix as an explicit checklist, not a count | §3A door matrices; exhaustive named; property-lane round-trip catches asymmetric parse/serialize |
| K-7 | **bench sheet bar unreachable** even at spec parity (structural cost of the full 9-kind sheet grammar) | W7 5-invocation vector; compare to C14 0.0537 | O-1/O-2/O-3 from W0 + O-4 profile-driven; if relative-only → OC-1 owner row, do NOT relax G-2 to chase perf |
| K-8 | **context/seat overrun** — W5 (L) too big for one Opus seat (live stylesheet.ts is 899 L) | seat journals a work-order; StructuredOutput crash on over-scope (L-tranche lesson) | pre-authorize the W5a/W5b split (blocks+declarations / at-rules); W2 and W5 are the two L doors — budget them alone |
| K-9 | **`serializeCssValue↔parseAnimationRange` round-trip instability** breaks `collectTimelineOptions` | W4 round-trip fixture (H-6 caveat) | land `serializeCssValue` before `collectTimelineOptions` in W4; assert `parse(serialize(v))≡canonical` |

---

## 8. R's 11 questions — H disposition

Q1 freeze → **§2 ruling (strip all; probe-codified).** Q2 diagnostic depth →
**§4 (code+ok+expected gating; spans recorded-not-gating, escalate on evidence).**
Q3 R2 predicate → **H-5 (two rules + collection consequence).** Q4 R8 blast →
**H-9 (nil in demo/kf; seed items → expected-divergence).** Q5 R7 reliance →
**H-9 (kf reads CSSOM, not parse names; safe).** Q6 `trailing_input` →
**H-9 (0 construction sites; map trailing→css_syntax; guard test).** Q7 corpus →
**§3 (≥50 accept/≥20 reject per door; color exhaustive; property lane GREEN-rail
not fuzz).** Q8 fail-fast → **CONFIRMED contract (kf validate.ts:182 depends).**
Q9 bench freeze → **§6 (scenarios frozen; sheet is the hard bar; OC-1 owner
row).** Q10 kf seam probe → **W6 gate (tsc-only 37-symbol import module).** Q11
`splitBalanced` → **default the transposed `splitTopLevel` (K-1); swap only on a
`scanners.test.ts` proof of behavioral identity — unproven, so do not swap.**

— seat H, V·π formation, 2026-07-20.

model_served: claude-opus-4-8[1m]
