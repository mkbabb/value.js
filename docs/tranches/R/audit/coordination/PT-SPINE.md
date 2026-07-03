# PT-SPINE — the parse-that spine truth for value.js Tranche R

> Lane PT-SPINE · analysis-only · 2026-07-03. Question: what is INCOMING from the
> parse-that 1.0.0 cut (driven by kf S.H2) that affects value.js R, what does R book
> correctly vs miss, and how should the three tranches sequence. Every load-bearing
> claim is cited `repo:path:line`.

---

## 0. TL;DR

- **parse-that is a monorepo** (`/Users/mkbabb/Programming/parse-that`): the npm package
  `@mkbabb/parse-that` lives at `typescript/` (v**0.13.0**, `typescript/package.json:2`);
  a Rust workspace at `rust/` is unrelated. It has its OWN tranche corpus
  (`docs/tranches/A/B/…` — A=0.11.0, B=0.12.0, Q=0.13.0), driven by the kf
  `KF-TO-PARSETHAT-*` dispatch letters.
- **The 1.0.0 breaking cut is BIGGER than "delete span"**: kf `S.H2` deletes
  `span.ts` + all 15 `*Span` exports **AND** retires the `chainError` param + fixes the
  `chain()` falsy-seed bug (kf `docs/tranches/S/S.md:863-865`, `:509-514`).
- **value.js's live parse-that surface is entirely in the SURVIVING 1.0.0 set** —
  `Parser, all, any, dispatch, regex, string, whitespace, ParserState`, plus `.chain()`
  (4 sites) and test-only `enableDiagnostics/disableDiagnostics`. **ZERO** consumers of
  `*Span / Span / spanToString / mergeSpans / SpanParser / thenMap / fuse / subTable /
  chainError`. **R's "0 `*Span` consumers — API-safe" claim is CONFIRMED against the
  live tree.**
- **R books the re-pin correctly on the span dimension and refuses to pre-pin a phantom
  (right call).** It **under-books two things**: the `chain()`/`chainError` half of the
  1.0.0 surface (GAP-A), and the transitive-consumer two-hop that reaches kf (GAP-B).

---

## 1. The parse-that spine truth

### 1.1 Version + layout
- `@mkbabb/parse-that` @ **0.13.0** — `typescript/package.json:2`. Barrel is
  `typescript/src/parse/index.ts` (NOT a repo-root index).
- git log (parse-that): `2c806fb Tranche Q (0.13.0)` · `7901314 Tranche B (0.12.0)` ·
  `6487219 Tranche A CLOSED 0.11.0`. **parse-that runs its own lettered tranches**, each
  driven by a kf dispatch letter (P→parse-that-B, Q→parse-that-Q, S.H→the 1.0.0 cut).
- Published subpaths: `.` `./core` `./diagnostics` `./packrat` `./utils`
  (`typescript/package.json` exports).

### 1.2 span.ts is DEPRECATED, not yet deleted
- `typescript/src/parse/span.ts` exists; its header:
  *"DEPRECATION (PT-Q4, 0.13.0) — scheduled for removal in 1.0.0"* — 15 closure-based
  `*Span` builders, **zero consumers across parse-that/value.js/kf** (span.ts:12-40).
- Still barrel-exported: `typescript/src/parse/index.ts:10` (the 15 `*Span`) +
  `:3` (`spanToString, mergeSpans` from state.js).
- The Q disposition chose arm **(b) DEPRECATE** (not adopt) — kf
  `docs/tranches/Q/KF-TO-PARSETHAT-Q.md` PT-Q4.

### 1.3 What BREAKS at parse-that 1.0.0 (kf S.H2)
kf `docs/tranches/S/S.md:863-865` — *"S.H2 is the 1.0.0 legacy cut: delete `span.ts` +
all 15 `*Span` exports (proof:no-span-surface), the C-16 chain() fix + `chainError`
retirement with the full regression suite, and the parse-that CLAUDE.md refresh."*

Three distinct breaking removals:
1. **`span.ts` + 15 `*Span` builders** deleted (`stringSpan…lookAheadSpan`). Also
   implicated: `spanToString`/`mergeSpans`/the `Span` type re-exports.
2. **`chainError` param retired** — the 2nd param of `Parser.chain(fn, chainError?)`.
   C-16 (S.md:507-514): the live code short-circuits on error before `chainError` is
   read, so it is dead-on-error, and **"no caller passes `chainError=true` (verified:
   0 hits in value.js and parse-that's own src)"**. Removed as a documented breaking cut.
3. **`chain()` falsy-seed fix** — C-16 RULING: change to
   `if (state.isError) return state; return fn(state.value).parser(state);` (fixes the
   `0`/`''`/`false`-seed bug). A **behavior change**, not just an API removal.

NON-breaking companions in the same 1.0.0 publish:
- **S.H1 packrat-epoch arming** — a `PACKRAT_ARMED` latch; `packratEnter/packratExit`
  are true no-ops until armed; behavior-preserving (S.md:863, S.H.md:105-128). The
  "probe-mandated type ripple" (S.H.md:125-128) is **internal to `packrat.ts`'s
  `packratEnter()` return type** — it does NOT touch the `ParserState` type value.js
  imports.
- The PT-Q1/Q2 packrat re-entrancy + >1MB fixes already SHIPPED in 0.13.0
  (`typescript/CHANGELOG` / git `2c806fb`) — not a 1.0.0 concern.

### 1.4 Who drives / owns the 1.0.0 publish
kf `S.H` band: *"parse-that dispatch (own repo; ONE 1.0.0 publish then re-pinned)"*
(S.md:855). The kf tranche S is the **coordination vehicle**; the edits land in the
**parse-that repo**; kf then re-pins. DAG: `S.H1 ∥ S.H2 → S.H4 → (1.0.0 publish → kf
re-pin) → before S.Z` (S.md:908, S.H.md:54). **kf S is planning-only** — the 1.0.0 cut
is not yet dispatched.

---

## 2. Consumer surfaces (verified against live trees)

### 2.1 value.js — the complete parse-that symbol surface
Every `from "@mkbabb/parse-that"` import (src + test):
| symbol | sites | survives 1.0.0? |
|---|---|---|
| `Parser` (class) | index/color/math/units/easing/utils/scroll-timeline/stylesheet | ✅ |
| `all, any` | index, color, math, units, easing, scroll-timeline | ✅ |
| `dispatch` | `src/parsing/index.ts:1`, `src/parsing/color.ts:23` | ✅ |
| `regex, string, whitespace` | index, color, math, units, easing, utils, scroll-timeline | ✅ |
| `ParserState` (type) | `src/parsing/utils.ts:2` | ✅ |
| `enableDiagnostics/disableDiagnostics` | `test/tranche-f.test.ts:2` | ✅ |
| `Parser.chain()` method | stylesheet.ts:796 · utils.ts:182 · color.ts:599 · color.ts:650 | ✅ signature (fn only) |

**Span-family consumers: ZERO.** grep for `Span|spanTo|mergeSpan|SpanParser|thenMap|
fuse|subTable|chainError` across `src/` + `test/` returns only unrelated CSS-property
hits (`columnSpan`, prose "spans"). **The R book claim is CONFIRMED.**

`chainError`: **0 hits** — every value.js `.chain()` call passes a single `fn` arg
(verified at all 4 sites). The `chainError` retirement is **non-breaking for value.js**.

The `chain()` falsy-seed fix: value.js's 4 chain seeds are non-falsy strings (`name`,
`token`, `x` idents) → the fix is almost certainly **inert** for value.js, but it is a
behavior change the re-pin suite MUST exercise (see GAP-A).

`ParserState` resilience: `src/parsing/utils.ts:335-360` `buildDiagnostic` reads
`.furthest/.expected/.getLineAndColumn` off a **structural** param type, not the imported
`ParserState` — resilient to any S.H1 type ripple. R's KF-5 "no action; transparent win"
(R.W1.md:191) is **correct**.

No `bbnf-equivalence.test.ts` in `test/` (the MEMORY reference is stale); the
`src/parsing/grammars/*.bbnf` files are data, import nothing. No span exposure there.

### 2.2 keyframes.js — parse-that-FREE (transitive only)
- kf deps = **`{"@mkbabb/value.js":"^1.2.0"}` ONLY** (`keyframes.js/package.json`). **No
  direct parse-that dependency.** kf src has only *comments* about parse-that
  (`src/animation/internal/leaves.ts:9` "parse-that-FREE"; `parse-flatten.ts:125-128`
  "removes kf's direct `@mkbabb/parse-that` production").
- **kf receives parse-that ONLY transitively through value.js.** This is the crux of
  GAP-B: for parse-that 1.0.0 to reach kf, value.js must first re-pin `^1.0.0` AND kf
  must re-pin that value.js.
- kf is at **5.1.0**.

### 2.3 fourier-analysis — downstream, STALE, no parse-that
- `fourier-analysis/web/package.json`: `@mkbabb/value.js: "^0.13.0"` +
  `@mkbabb/keyframes.js: "^4.3.0"` — **both badly stale** (value.js is 1.2.0→2.0.0; kf
  5.1.0). **No parse-that dependency** (direct or named). fourier consumes parse-that
  purely transitively and is far behind the spine; the 1.0.0 cut does not touch it
  directly, but its value.js floor won't even resolve the 2.0.0 line. (fourier's problem,
  flagged for the FN-7 co-decision, not a parse-that break.)
- No `bbnf-buddy` directory found under fourier.

---

## 3. What R books — CORRECT vs MISS

### 3.1 CORRECT
| R book | cite | verdict |
|---|---|---|
| parse-that `^1.0.0` re-pin fires on kf S.H2; "0 `*Span` consumers — API-safe"; **"don't pre-pin"** | R.md:217, R.W1.md:188 | ✅ span-safe confirmed; refusing to pin a not-yet-published version is correct discipline |
| S.H3 Pratt consume-edge = design-review only (`math.ts` calc() the ratifying edge; ratify-or-decline) | R.md:219, R.W1.md:189 | ✅ matches S.md S.H3 de-scope-to-§8 (a sketch, not a cut) |
| KF-5 (packrat S.H1) — no action, transparent win at next re-pin | R.W1.md:191 | ✅ S.H1 is behavior-preserving; its type ripple is packrat.ts-internal, not ParserState |
| R.W1 ships value.js 2.0.0 pinned parse-that **`^0.13.0`** (unchanged), does NOT touch `../keyframes.js` | R.W1.md:163, :188 | ✅ decouples a ratified tranche from a planning-only sibling |

### 3.2 GAPS / MISSES

**GAP-A — R under-scopes the 1.0.0 breaking surface to `*Span` only.**
R's "API-safe" rests solely on the span dimension (R.md:217). The 1.0.0 cut *also*
retires `chainError` and *fixes* `chain()` semantics (S.md:863-865, C-16). value.js is a
**heavy `.chain()` consumer** (4 sites). The re-pin verify must cover the chain surface,
not just span. Live evidence makes it low-risk (0 `chainError` args; non-falsy seeds), but
R should BOOK the chain dimension explicitly: *"parse-that 1.0.0 also retires `chainError`
(value.js passes 0) + fixes `chain()` falsy-seed (value.js seeds non-falsy) — re-pin suite
re-runs the 4 `.chain()` sites."* As written, R would re-pin against a build whose chain()
behavior changed without a named check.

**GAP-B — the transitive two-hop to kf is unsurfaced.** kf is parse-that-FREE (§2.2), so
parse-that 1.0.0 reaches kf **only** after (i) value.js re-pins `^1.0.0` and (ii) kf
re-pins that value.js. If R.W1 ships value.js 2.0.0 on parse-that 0.13.0 and kf re-pins
`^2.0.0` for KF-1 *immediately*, **kf's install tree runs parse-that 0.13.0 (the
deprecated-span build) — the 1.0.0 kf S.H2 just published is orphaned** until a SECOND
value.js re-pin (the booked `^1.0.0` event → value.js 2.0.x) AND a SECOND kf re-pin.
kf S.md's *"kf re-pins exactly once"* (S.md:857) **undercounts**: KF-1 (value.js 2.0.0)
and the parse-that-1.0.0 transitive delivery are two distinct value.js versions unless
deliberately collapsed. Neither R nor S surfaces this.

**GAP-C — the `chainError` 0-caller scan is kf-authored, not value.js-mirrored.** C-16's
"0 hits in value.js" scan (S.md:509) lives in the kf tranche. value.js is the consumer of
record; R should re-assert it at the re-pin (this audit already did: **0 hits**).

---

## 4. The version lattice + non-interleave constraints

```
             CURRENT            NEXT (breaking)          consumes / re-pins
parse-that   0.13.0    ──────►  1.0.0  (kf S.H2)         upstream break: span+chainError → value.js
value.js     1.2.0     ──────►  2.0.0  (R.W1)            downstream break: KF-1 rename → kf
                                 └► 2.0.x  parse-that ^1.0.0 re-pin (R book, follow-on)
keyframes.js 5.1.0     ──────►  ?      (kf S)            re-pins value.js; parse-that-FREE (transitive)
glass-ui               ──────►  5.0.0                    re-pins kf
fourier      vjs^0.13 / kf^4.3  STALE                    transitive only; no parse-that
```

**Two INDEPENDENT breaking cuts on DIFFERENT edges:**
- value.js **2.0.0** (R.W1) breaks its **downstream** edge (KF-1 `type→syntax`,
  `defaultValue→default` — R.W1.md:14, :138). Pinned parse-that `^0.13.0` (unchanged).
- parse-that **1.0.0** (kf S.H2) breaks its **upstream** edge (span/chainError → value.js).

**Where cuts must NOT interleave:**
1. value.js must **NOT pin parse-that `^1.0.0` before parse-that 1.0.0 is published** —
   can't pin a phantom. R gets this ("don't pre-pin", R.W1.md:188). ✅
2. parse-that 1.0.0 must **NOT be cut on the assumption value.js consumes it
   synchronously** — value.js's consume is a **separate follow-on publish** (2.0.x), and
   kf's transitive receipt is a **further** re-pin. (GAP-B.)
3. The R.W1 2.0.0 cut and the parse-that 1.0.0 cut can proceed in **either order** because
   they touch disjoint edges — but the *cleanest global order* collapses them (below).

**The right move for R.W1 (recommendation):** KEEP the decoupled plan. value.js's entire
parse-that surface is in the surviving 1.0.0 set (§2.1), so the `^1.0.0` re-pin is a
**trivial bump+retest, no code change** — a cheap follow-on. Blocking ratified value.js R
on planning-only kf S to "pin in one shot" is **not worth the coupling risk**. R.W1's
"don't pre-pin, ship 2.0.0 on `^0.13.0`" is correct.

**But add two books to R:**
- **B1**: the parse-that `^1.0.0` re-pin is a *named distinct value.js publish* (2.0.x /
  2.1.0) post-2.0.0, whose verify covers **both** span-absence AND the `chain()`/`chainError`
  surface (GAP-A).
- **B2**: flag to kf S that its value.js re-pin is **two events** unless collapsed:
  `^2.0.0` (KF-1) then `^2.0.x` (parse-that-1.0.0-carrying) — OR kf sequences its single
  value.js re-pin to land *after* value.js's `^1.0.0` re-pin, against the
  parse-that-1.0.0-consuming value.js version (GAP-B). This is the coordination the
  RUN-BOARD should own.

**The cleaner-IF-timelines-allow global order** (record as the ideal, not a blocker):
`parse-that 1.0.0 → value.js 2.0.0 pins ^1.0.0 in one shot → kf re-pins value.js ONCE
(transitively gets parse-that 1.0.0)`. Collapses 3 re-pins to a linear spine. Requires kf
S.H2 to land *before* value.js R.W1 — which it will not (kf S is planning-only, value.js R
is dispatchable now). So the decoupled path stands; B1/B2 make the follow-on honest.

---

## 5. Coordination recommendations (the three tranches)

1. **value.js R** — add GAP-A (chain surface) + GAP-B (two-hop) notes to the R.md §3.3
   parse-that book; keep "don't pre-pin". The re-pin verify = span-absence + the 4
   `.chain()` sites + the full suite.
2. **kf S** — correct "kf re-pins exactly once" (S.md:857): the value.js re-pin is two
   events (KF-1 `^2.0.0`, then the parse-that-1.0.0-carrying value.js) unless kf
   deliberately sequences one re-pin after value.js's parse-that follow-on. Record that
   kf has **no direct parse-that dep** — its parse-that 1.0.0 "consume" is transitive via
   value.js.
3. **The shared RUN-BOARD** (fourier `docs/constellation/tri-tranche-run/RUN-BOARD.md`,
   the live coordination mechanism) should track the spine as an ordered edge list, not
   per-repo, so the two-hop (parse-that 1.0.0 → value.js re-pin → kf re-pin) is a single
   visible chain. fourier's own value.js `^0.13.0` / kf `^4.3.0` floors are stale and
   should ride at the FN-7 co-decision.
