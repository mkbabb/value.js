# KF-LATEST — the keyframes.js frontier vs value.js Tranche R

**Lane:** KF-LATEST (coordination audit). **Read-only** everywhere except this file.
**Date:** 2026-07-03. **kf frontier:** `/Users/mkbabb/Programming/keyframes.js` — published
**5.1.0** (Tranche R closed), **Tranche S DEV-AUTHORED + CONVERGED** (not yet impl-authorized;
`docs/tranches/S/` — S.md 81KB, PROGRESS.md 74-row ledger, 9 band specs S.A–S.H+S.Z, pass1/2/3
audit; head commit `7bb7f12` "S dev pass3 close: scene-stage first-principles CONVERGED 100/100").
**value.js frontier:** branch `tranche-q` @ v1.2.0; Tranche R **RATIFIED** (`docs/tranches/R/audit/
RATIFICATION-2026-07-03.md`) but **NOT yet executed** — 2.0.0 not cut.

Both sides are **pre-execution**. This is the correct moment to reconcile.

---

## 1 — What S IS (charter, relative to value.js)

S is a broad honesty+altitude tranche on kf's OWN repo + a parse-that dispatch. Its evidence base:
R (5.1.0) is substantively honest but master CI has been RED since Tranche K (S.md:200-238);
S.A0 re-authors a frozen PIN-LEDGER. S declares **exactly TWO external consume-edges** (S.md:112-119):
1. **S.E8/E6** — glass-ui 5.0.0 (third-party; joint BG/BH cut, unpublished).
2. **S.H4** — the owner-controlled **parse-that 1.0.0** publish-then-re-pin (born-SPECIFIED).

> **value.js 2.0.0 is NOT among S's named external edges.** S §1: *"No other wave may acquire an
> external dependency without an owner ruling"* (S.md:118). This is the load-bearing coordination
> gap — see §5.

---

## 2 — S.H2: the parse-that 1.0.0 legacy cut (INCOMING to value.js)

Source of record: `docs/tranches/S/waves/S.H.md` (S.H2 §, lines ~640-720). **Owner:** keyframes.js
(the parse-that dispatch is kf-authored; inv-16 = kf writes only, the parse-that edits are an
owner-controlled DISPATCH to the sibling repo). **Status:** DEVELOPMENT-ONLY — the wave opens on
explicit owner impl authorization; born-RED gates ship red, the H4 publish gates ship
born-SPECIFIED. **Timeline:** lands in **ONE 1.0.0 publish** (H1+H2 payload; kf re-pins exactly
once) at the S impl drive; must land **before S.Z** (S.H.md band-DAG).

**Exact scope of the 1.0.0 breaking cut (S.H.md S.H2 scope items S1–S5):**
- **DELETE `span.ts` + all 15 `*Span` exports** (fold row 48, DQ-2 — dead API, SpanParser KILL
  leftover). Flips `dist-surface.test.ts` from asserting `*Span` PRESENCE → ABSENCE
  (`proof:no-span-surface`, born-RED today).
- **`chain()` falsy-seed FIX (C-16 Option A)** — fold row 50. Today `chain()` short-circuits on
  error *before* reading, so a `0`/`''`/`false` success seed is dropped. Fix:
  `if (state.isError) return state; return fn(state.value).parser(state);`
- **RETIRE the `chainError` param** in the same breaking cut (dead-on-error, 0 callers — C-16
  evidence: *"0 hits in value.js and parse-that's own src"*, S.H.md).
- Refresh `parse-that/CLAUDE.md` (stale on four counts).

**S.H1 (parallel, REFINE):** packrat-epoch arming — a `PACKRAT_ARMED` latch so `packratEnter/Exit`
no-op until a `memoize()` is constructed (14–18% throughput / ~34% retained-heap on short CSS
values; fold row 49). **Transparent to value.js** — a GC win inherited at re-pin, no API change.

**S.H4 (born-SPECIFIED):** cuts the 1.0.0, re-pins kf once, and its gate **(c)** is *"the value.js
suite green against the re-pinned build"* (S.H.md S.H4 gate c). S.H4/S3 also verifies **fold row 46
(`color2Into` value.js WATCH)** AT the re-pin via the value.js suite — *"if unverifiable there, the
named exit fires — never silently re-WATCHed."*

### value.js impact of S.H2 — VERIFIED against src

I inspected value.js src (read-only):
- **`*Span`: 0 consumers.** The only "Span" hits are CSS property names `columnSpan`/
  `webkitColumnSpan` (`src/units/constants.ts:298,697`). **The span.ts deletion is API-safe** —
  value.js R's "0 `*Span` consumers claimed — API-safe" booking is CORRECT.
- **`.chain()`: 4 call sites, 0 `chainError`.** `src/parsing/stylesheet.ts:796`, `parsing/utils.ts:182`,
  `parsing/color.ts:599`, `parsing/color.ts:650`. None pass `chainError` → the param retirement is
  safe. **BUT** the falsy-seed FIX is a *behavior change*, not purely additive: after the fix a
  `''`/`0`/`false` seed threads where today it is dropped. value.js's 4 seeds are prior-parser
  successes (matched color idents / unit tokens — non-empty by construction), so practically safe,
  but this is a semantic edge the "API-safe" framing understates. The S.H4 gate (c) + value.js's
  own "full suite re-verify" cover it; **flag it, don't block on it.**

---

## 3 — S.H3: the Pratt consume-edge for value.js math.ts calc()

**Status: DE-SCOPED to §8 Recorded-future (S.H.md S.H3; S.md:1057-1060).** No wave, no gate in S,
authors nothing. Rationale: its proposed gate ("design doc + external value.js sign-off") violated
T1 (runtime-tier absolutism) and would have been a THIRD external edge (T12 permits exactly two).
The Pratt binding-power combinator design **survives as a design appendix/seed over the Parser core
with the value.js `math.ts` consume-edge sketch**; *"not implemented without value.js ratification;
explicitly not a grammar-DSL move (no bbnf-lang)."*

**What it asks of value.js, and WHEN:** nothing during S. The sketch is parked. value.js's `math.ts`
calc() is named as the ratifying consume-edge, but the sketch **will not be presented during S** —
it is a recorded-future item, not an S deliverable.

**value.js R books this correctly** (`R.md:219`, letter §4 KF-6): *"S.H3 Pratt consume-edge |
parse-that presents the sketch | Design-review the math.ts calc() transposition; ratify or
decline."* ✅ Aligned — both sides parked, dormant. **Caveat:** value.js's trigger ("parse-that
presents the sketch") waits on an event S has explicitly deferred to §8; value.js should know the
sketch does NOT arrive during S. No action either side; correctly quiescent.

---

## 4 — S's other value.js/parse-that/glass-ui/fourier touchpoints

| S item | Where | Touches value.js? | Alignment |
|---|---|---|---|
| **S.C4/S2 — `VJS_PARAM_BUG_MAX` lifecycle** | `S.C.md` S.C4; fold row 61 | **YES — the KF-1 consume slot** | **UNDERSCOPED — see §5** |
| S.H1 packrat-arming | `S.H.md` S.H1 | transparent (GC win) | value.js KF-5 "no action" ✅ |
| S.H2 1.0.0 cut | `S.H.md` S.H2 | re-pin ^1.0.0 + verify | booked (with 1 precision drift, §5) |
| S.H4 fold-row-46 `color2Into` verify | `S.H.md` S.H4/S3 | kf verifies value.js's color2Into at re-pin | value.js letter is SILENT on this (§5) |
| glass-ui 5.0.0 (S.E8/E6) | `S.md:112` | value.js also consumes 5.0.0 separately | value.js books it (`R.md:216`) — glass-ui-side |
| S.A0 PIN-LEDGER target | `S.md:64,211` | pins value.js **1.2.0** (not 2.0.0) | **the root of the §5 gap** |
| fourier tri-tranche run-board | `fourier-analysis/docs/constellation/tri-tranche-run/RUN-BOARD.md` | STALE (D/E-era; pins glass-ui 3.2.0 / kf 3.0.0, dated 2026-06-05) | not a live mechanism for the R/S frontier (§6) |

---

## 5 — WHAT R BOOKS CORRECTLY vs WHAT IS MISSED

### R books correctly ✅
- **parse-that ^1.0.0 re-pin, wait-don't-pre-pin, 0 `*Span` API-safe** (`R.md:217`, letter §4 KF-2).
  Verified: 0 `*Span` consumers, 0 `chainError` callers. value.js ships 2.0.0 on parse-that
  **^0.13.0** (current) and re-pins ^1.0.0 as a *separate later* value.js release — correct
  sequencing, no pre-pin. ✅
- **S.H3 Pratt** — booked design-review, dormant both sides. ✅
- **S.H1 packrat** — KF-5 "transparent, no action." ✅
- The value.js→kf **2.0.0 letter is authored and complete** (`docs/tranches/R/letters/
  KF-VALUEJS-2.0.0.md`): the KF-1 grammar fix + `type→syntax`/`defaultValue→default` rename, the
  full `normalizeParam` deletion map, the ask to re-pin ^2.0.0. This is a strong, self-contained
  outbound dispatch.

### R misses / imprecise ⚠️

1. **[PRECISION] The parse-that 1.0.0 publish wave is S.H4, not S.H2.** `R.md:217` + letter §4 KF-2
   attribute the trigger to *"kf S.H2 publishes the 1.0.0 cut."* Per `S.H.md`, S.H2 is the
   breaking-cut *wave*; the **publish + re-pin happens at S.H4** (H1+H2 land in ONE 1.0.0 at S.H4).
   Functionally harmless (value.js waits on the registry artifact either way) but the coordination
   reference should cite **S.H4** as the publish trigger.

2. **[SILENT] R does not know kf verifies `color2Into` at the parse-that re-pin.** S.H4/S3 books
   fold row 46 (`color2Into` value.js WATCH) to disposition via *the value.js suite green against
   the re-pinned parse-that 1.0.0*, with a named exit if unverifiable. value.js's letter §4 has no
   line acknowledging this — value.js should keep its `color2Into` (VJ-P1) surface + suite green
   through the parse-that 1.0.0 re-pin so kf's row-46 gate closes cleanly.

3. **[BEHAVIOR] The chain() fix is understated as "API-safe."** True at the *surface* (no removed
   symbol value.js uses); but the falsy-seed fix is a semantic change at value.js's 4 `.chain()`
   sites. Covered by re-verify; worth an explicit note in the value.js re-pin work-order.

### THE LOAD-BEARING MISS — on the KF SIDE, not value.js's ⚠️⚠️

**kf S has no budgeted slot to CONSUME value.js 2.0.0.** value.js R's outbound letter
(`KF-VALUEJS-2.0.0.md §2`) asks kf to **delete `normalizeParam` + `NormalizedParam` entirely,
simplify `coerceArg`, delete `VJS_PARAM_BUG_MAX`, and re-pin `@mkbabb/value.js` → ^2.0.0** — the S7
lifecycle completion. But kf S, authored while value.js was 1.2.0, provides only:

- **S.A0 PIN-LEDGER target = `5.1.0/1.2.0/0.13.0`** (`S.md:64,211`) — value.js **1.2.0**, not 2.0.0.
- **S.C4/S2 = a CONDITIONAL lifecycle check** (`S.C.md` S.C4/S2): *"`VJS_PARAM_BUG_MAX` checked
  against the value.js changelog and deleted per its own lifecycle **if** `extractFunctions` is
  fixed upstream; **else KEEP with a citation**."* Its HARD GATE is only `proof:pin-ledger-current`
  green + dependency-cruiser baseline `[]` — it does **NOT** scope the full `normalizeParam`/
  `NormalizedParam` deletion, the `coerceArg` simplification, or a **^2.0.0 re-pin**. S.C4 bumps
  dep-cruiser/fast-check/@types-node and HOLDS pins; it is not sized for a value.js major consume.
- **value.js 2.0.0 is not one of S's "exactly TWO external consume-edges"** (glass-ui 5.0.0 +
  parse-that 1.0.0). A ^2.0.0 re-pin is a THIRD external edge; S §1 (`S.md:118`) requires an
  **owner ruling** for any wave to acquire an external dependency.

**Consequence if unreconciled:** when value.js publishes 2.0.0 + dispatches the letter, kf S.C4 —
as written, pinned at 1.2.0 — will **KEEP `VJS_PARAM_BUG_MAX` with a citation** and the KF-1
lifecycle will NOT complete during S. The letter arrives against a conditional hook that fires the
*"else KEEP"* branch, because S's pin target and external-edge budget are baked at 1.2.0. The
`normalizeParam` shim (`resolve-function.ts:69-92`) + `VJS_PARAM_BUG_MAX` (`:35`) persist another
tranche. value.js R's letter §2 already flags the deletion gate was *"unreachable under a
rename-only cut"* — it is reachable now, but only if kf **scopes the consume**.

---

## 6 — HOW kf COORDINATES TODAY

- **Outbound-letter convention (primary).** kf authors `docs/tranches/{TRANCHE}/KF-TO-{REPO}-*.md`
  dispatch letters — 13 of them across K–Q (`KF-TO-VALUEJS-Q.md`, `KF-TO-PARSETHAT-Q.md`,
  `KF-TO-GLASSUI-Q.md`, etc.). Convention: *"publish-then-consume, DAG-ordered, never cross-write;
  inv-16 = no sibling source written from kf"* (`KF-TO-VALUEJS-Q.md` preamble). value.js mirrors
  this inbound with `docs/tranches/R/letters/KF-VALUEJS-2.0.0.md` (outbound to kf) +
  `GLASSUI-RELAY.md`.
- **PIN-LEDGER + `proof:pin-ledger-current`** (kf-side machine gate) is the pin-truth mechanism —
  the S.A0/S.C4 re-author, and the S.H4 born-SPECIFIED gate (a) that must reflect parse-that 1.0.0.
- **Fold-row ledger (PROGRESS.md, 74 rows)** — cross-repo WATCH rows (e.g. row 46 `color2Into`, row
  61 `VJS_PARAM_BUG_MAX`) carry across tranches with named dispositions/exits.
- **NO live run-board for the R/S frontier.** The fourier `tri-tranche-run/RUN-BOARD.md` exists as a
  coordination *pattern* (a shared blackboard across sessions) but the actual board is **STALE** —
  it pins glass-ui 3.2.0 / kf 3.0.0 / slides `6a79d38`, dated **2026-06-05** (the D/E-era run). It
  does not mention S.H, parse-that 1.0.0, or value.js 2.0.0. Current kf↔value.js↔parse-that
  coordination runs on letters + fold-rows + PIN-LEDGER, **not** a live board.

---

## 7 — RECOMMENDED COORDINATION FIXES

**For value.js R (cheap, this side):**
1. Retarget the parse-that ^1.0.0 booking trigger from **"S.H2 publishes"** → **"S.H4 publishes the
   1.0.0 (H1+H2 payload)"** in `R.md:217` + letter §4 KF-2. (precision)
2. Add a booking line: **keep `color2Into` + its suite green through the parse-that 1.0.0 re-pin** so
   kf's S.H4/S3 fold-row-46 gate closes without firing its named exit.
3. In the parse-that ^1.0.0 re-pin work-order, note the **chain() falsy-seed semantic change** at
   value.js's 4 `.chain()` sites (verify, not assume).

**For the kf side (requires the kf owner — flag, do not act; read-only mandate):**
4. **The value.js 2.0.0 consume needs a scoped home in kf.** Either (a) re-scope **S.C4/S2** from a
   conditional `VJS_PARAM_BUG_MAX`-only lifecycle check into a named value.js-2.0.0 consume-edge
   (full `normalizeParam`/`NormalizedParam` deletion + `coerceArg` simplify + ^2.0.0 re-pin), with
   the owner ruling S §1 requires for a third external edge; **or** (b) explicitly BOOK the value.js
   2.0.0 consume to a successor kf tranche with the full deletion payload named — not leave it as an
   underscoped `else KEEP` that silently defers the S7 lifecycle. value.js's letter is complete and
   correct; the gap is entirely a **kf-side scoping** one, and both tranches are pre-execution now —
   the ideal window to reconcile.

**Sequencing truth (for reference):** value.js R.W1 cuts **value.js 2.0.0 on parse-that ^0.13.0**
(current). LATER, kf S.H4 publishes **parse-that 1.0.0**; value.js then re-pins ^1.0.0 as a separate
post-R release. kf independently re-pins parse-that ^1.0.0 (S.H4) and, separately, must decide when
to consume **value.js 2.0.0** (unscoped today). The spine parse-that → value.js → keyframes holds;
the one unbudgeted edge is kf←value.js 2.0.0.
