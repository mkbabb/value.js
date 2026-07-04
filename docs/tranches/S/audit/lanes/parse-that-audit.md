# S-24 — parse-that backbone audit (value.js's parsing spine)

**Lane:** parse-that-audit · **Mode:** AUDIT-ONLY (dev, not impl) · **Date:** 2026-07-04
**Repos (READ-ONLY):** `../parse-that` @ `7eab78c` (v**1.0.0**) · value.js @ `4963f33` (branch `tranche-q`, v**2.0.1**)
**Method:** source reads (file:line), an installed-build throughput probe, a 175-test parsing subset run, cross-read of `../keyframes.js/docs/tranches/S/{waves/S.H.md,OWNER-ASKS.md,VALUEJS-R-COORDINATION-2026-07-03.md}`.

---

## 0. FRAMING CORRECTION (read first) — the prompt's premise is one tranche stale

The task brief describes "the 0.13.0 surface value.js consumes" and "the S.H1–H4 **forthcoming** cuts."
**That is no longer the state of the world.** Measured on the trees in front of me:

- parse-that `package.json` = **1.0.0**; git log shows S.H1 (`934b2fa` packrat arming), S.H2 (`043c4d1`
  span-cut + chain fix), S.H4 (`7eab78c` 1.0.0 cut) **already committed**.
- value.js `package.json` = **2.0.1**, pinned `"@mkbabb/parse-that": "^1.0.0"`; `node_modules` carries
  **1.0.0**. The re-pin is **committed** (`a7eabcc`: *"2.0.1: the booked parse-that ^1.0.0 re-pin … widened
  verify green (58/1998, tsc, build, css-parity, color2Into currency)"*).

So the entire S.H external SPINE (parse-that 1.0.0 → value.js `^1.0.0` 2.0.x follow-on) **has landed
end-to-end**. This lane is therefore **post-facto verification of a completed consumption** + a forward
ask-list, *not* a pre-cut risk audit. That reframing is itself the lane's top finding — any S wave-item
predicated on "value.js still on 0.13.0" or "arm the S.H cuts" is a no-op against reality.

---

## 1. VERIFIED-CLEAN — the 1.0.0 consumption is honest (evidence)

| Claim (widened-verify contract, coordination doc §3) | Verified on the tree |
|---|---|
| 0 `*Span` consumers | ✅ `grep` in `src/` finds only CSS **property names** `columnSpan`/`webkitColumnSpan` (`units/constants.ts:298,697`) — not the excised `regexSpan`/`stringSpan` API. |
| 0 `chainError` callers | ✅ zero hits in `src/`. C-16's param retirement is a non-event here. |
| 4 live `.chain()` sites, falsy-seed-safe | ✅ `stylesheet.ts:831`, `utils.ts:182`, `color.ts:600`, `color.ts:651` — each seeds on a **non-empty ident/unit string** (at-rule name, unit token, color name), never a falsy `0`/`''`/`false`. C-16's falsy-seed fix cannot change their behavior. *(Coordination doc cited `:796/:599/:650` — ~1-line drift, sites correct by identity.)* |
| Suite green under 1.0.0 | ✅ ran a 175-test parsing/color subset (parsing, stylesheet, both grammar-2026 gates, easing, color-function, animation-shorthand) — **175/175 pass**. R's full close = 1996/1996. |

**S.H1 packrat arming is a PURE WIN for value.js, fully realized.** value.js never constructs a parse-that
`memoize()` (its only `memoize` is the unrelated result-cache in `src/utils.ts:116`; it uses `Parser.lazy()`,
which routes through `createLazyCached` — a plain closure cache that does **not** touch packrat, `lazy.ts:17`).
The latch arms only inside `makeMemoized` (`packrat.ts:290`), so **`PACKRAT_ARMED` stays `false` for
value.js's entire parse workload** → `packratEnter` returns `null` immediately (`packrat.ts:217`), the
3-Map default-path allocation is gone. **Measured throughput of the real grammar (installed 1.0.0 build,
12 representative CSS values, 240 k parses): 82 ns/parse, ~12.1 M parses/s.** Perf of the CSS value grammar
is **not** a value.js pain point and is not parse-that-routed.

---

## 2. PAIN POINTS (ranked, root-routed)

### P1 — `ParseDiagnostic.expected` is structurally always-`undefined` (dead field)
`src/parsing/utils.ts:340-359` (`buildDiagnostic`) reads `state.expected` and forwards it into the
`ParseDiagnostic` value.js surfaces to keyframes.js's `ResolvedKeyframes.diagnostics`. **But** parse-that
populates `state.expected` **only when `diagnosticsEnabled`** (`../parse-that/…/utils.ts:33,38`), a
process-global opt-in — and **value.js never calls `enableDiagnostics()`** (grep: zero hits in `src/`+`demo/`).
Therefore the `expected?: string[]` field is **always absent**; the promised "what the parser wanted at the
derail point" never reaches consumers. The `offset`/`line`/`column` half works — `furthest` is tracked
unconditionally and cheaply (`state.furthest`, `utils.ts:29-32`).
**Root routing:** the field is value.js's, but the *ergonomic wall* is parse-that's global-toggle diagnostics
model (a global flag + a re-parse is the only way to get `expected`). **Split verdict:** value.js src (either
drop the dead field or re-parse-with-diagnostics on the error path) **+** parse-that ASK (a scoped
per-parse diagnostics mode — see §4 ask #1).

### P1 — 52 `Parser<any>` in the parsing layer (typing weakness, not a cast-budget breach)
Counts: `math.ts` 20, `index.ts` 14, `color.ts` 8, `stylesheet.ts` 2, `units.ts` 1 (`Parser<any>` / `: any`
/ `any[]`; the parse-that `any()` *combinator* is excluded). These are **type parameters, not `as any`
casts**, so the CLAUDE.md "0 `as any` in src" discipline is intact — but they are a real precision hole:
the combinator return types don't thread cleanly through heterogeneous `.map()` transforms into the
`ValueUnit | FunctionValue | ValueArray` union, so value.js reaches for `Parser<any>` at every recursive/
lazy composition (esp. the calc AST, `math.ts:48-98`).
**Root routing:** mostly value.js src (model a `ParsedNode` union and thread it); partially parse-that
(inference on `all`/`any`/`.chain`/`.map` chains). **Verdict:** value.js src primary; a parse-that
inference-tightening is a *nice-to-have* ask (§4 #2), not a defect.

### P2 — `round(A, B)` strategy-omitted form throws (value.js grammar-2026 gap, NOT parse-that)
`parseCSSValue("round(25px, 5px)")` throws **"t is not iterable"** (minified `args is not iterable`).
Root: `src/parsing/math.ts:151` — the `.map(([strategy, args]) => …)` destructure assumes the
strategy-present arm shape; the strategy-omitted arm delivers a different tuple. Pure value.js `math.ts`
bug, already booked as a known divergence in `test/grammar-2026-values.test.ts` (clause C1). **Route: value.js
src.** Candidate S wave-item (grammar-2026 completion), out of parse-that's realm.

---

## 3. THE BBNF EQUIVALENCE-TEST IDIOM — dead; already retired *de facto*; recommend DELETE

- `test/bbnf-equivalence.test.ts` **no longer exists** (last touched at v0.6.0/D-close `7ac4ecc`; since deleted).
- The two grammars — `src/parsing/grammars/css-values.bbnf` (99 L) + `css-color.bbnf` (135 L), 234 L total —
  have **zero runtime consumers**: the only reference anywhere is the phantom `declare module "*.bbnf?raw"`
  type decl at `src/vite-env.d.ts:3`; **nothing imports them**. `src/parsing/CLAUDE.md` even labels them
  *"documentation only, not executed at runtime."*
- **Verdict: the idiom is NOT earning its keep — it is already orphaned dead surface.** The equivalence test
  (the thing that made the grammars load-bearing) is gone; the grammars are now inert `.bbnf` files + a
  build-time type declaration guarding an import pattern used by no one.
- **Recommendation (precepts: KISS, no dead surface, excise-don't-keep):** DELETE the two `.bbnf` files, the
  `*.bbnf?raw` vite-env decl, and the stale CLAUDE.md rows. If instead they are to be revived as spec
  oracles, that is a *new* wave (author a live equivalence test); do not leave them in the current limbo.
  **Route: value.js src.** Candidate S wave-item.

---

## 4. WHAT value.js SHOULD ASK parse-that FOR (letter-candidate list, post-1.0.0)

Framed as **1.1.0+ asks** (1.0.0 shipped). Ranked by value-to-value.js.

1. **Scoped per-parse diagnostics** *(HIGH — cures P1 #1).* A way to run one `parseState` with the
   furthest-`expected` set collected **without** flipping the process-global `enableDiagnostics()` and
   without a second parse — e.g. `parser.parseState(input, { diagnostics: true })` returning a state whose
   `expected`/`suggestions`/`secondarySpans` are populated for that call only. Today value.js's
   `ParseDiagnostic.expected` is permanently dead because the only path to it is a global toggle it (rightly)
   won't set on the hot path. This is the single ask that unlocks real error messages for keyframes.js's
   `ResolvedKeyframes.diagnostics`.

2. **Tighter combinator inference** *(MEDIUM — shrinks P1 #2).* Better generic propagation through
   `all(...)` / `any(...)` / `.chain(fn)` / `.map(fn)` so heterogeneous-node grammars don't collapse to
   `Parser<any>`. value.js would still own its `ParsedNode` union, but sharper inference would let it drop a
   large fraction of the 52 `any`s. Nice-to-have; the current `any`s are type params, not casts.

3. **Pratt / binding-power combinator (S.H3)** *(LOW — keep dormant).* value.js is a **weak** consume-edge:
   `createCalcParser` (`math.ts:48-98`) has only **two** precedence tiers (`mul`, `add`), each a ~10-line
   idiomatic `first + (op, rhs).many()` left-fold. A binding-power table would DRY the two near-identical
   folds into one, but the duplication it removes is tiny. The book ("parse-that presents the sketch → value.js
   `math.ts` calc() ratifies") is **correctly dormant** (S.H3 de-scoped to §8 recorded-future, confirmed by
   the coordination doc §2). value.js should NOT pull this forward — it does not clear a KISS/DRY bar here.

*(Non-asks, for the record: packrat perf — already delivered by S.H1, pure win, nothing to ask. `*Span`/
`chainError` cut — already consumed clean.)*

---

## 5. CANDIDATE S WAVE-ITEMS (this lane's contribution to the tranche DAG)

| # | Item | Route | Priority | Evidence |
|---|---|---|---|---|
| PT-A | Excise the orphaned BBNF grammars + `*.bbnf?raw` decl + stale CLAUDE.md rows (or revive a live equivalence test) | value.js src | P1 | §3 |
| PT-B | Decide `ParseDiagnostic.expected`: drop the dead field **or** re-parse-with-diagnostics on the error path; pair with the parse-that scoped-diagnostics ask | value.js src + parse-that ASK | P1 | §2 P1, §4 #1 |
| PT-C | Fix `round(A,B)` strategy-omitted destructure (`math.ts:151`); close grammar-2026 C1 | value.js src | P2 | §2 P2 |
| PT-D | Optional: model a `ParsedNode` union to retire the bulk of the 52 `Parser<any>` | value.js src | P2 | §2 P1 |
| PT-E | Author the parse-that 1.1.0 ask letter (scoped diagnostics #1; inference #2; Pratt-stays-dormant #3) | parse-that dispatch (future) | P2 | §4 |

**No parse-that source is touched by this tranche on value.js's account** — parse-that 1.0.0 is complete and
clean for value.js's needs; the only outbound motion is a *letter* (PT-E), and the actionable code all routes
to **value.js src** (PT-A/B/C/D). No god-module, DRY, or import-nesting concerns surfaced in the parsing layer.
