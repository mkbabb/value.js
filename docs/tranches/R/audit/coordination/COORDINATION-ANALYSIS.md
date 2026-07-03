# COORDINATION-ANALYSIS — value.js R × keyframes S × fourier M/N × parse-that 1.0.0

> Owner-facing synthesis of the three coordination lanes (`KF-LATEST.md`, `FOURIER-LATEST.md`,
> `PT-SPINE.md`, this directory). Date 2026-07-03. value.js: branch `tranche-q` @ `5480952`,
> v1.2.0, **R RATIFIED not executed** (`audit/RATIFICATION-2026-07-03.md`). kf: 5.1.0, **S
> DEV-AUTHORED+CONVERGED, not impl-authorized**. fourier: M EXECUTING (W1b-gated on glass-ui BB),
> N = one accepted letter, no charter. parse-that: 0.13.0, span.ts deprecated-not-deleted.
> Every load-bearing claim below is verified in the lane reports with `repo:file:line` cites;
> this doc re-cites only the decisive ones.
>
> **The headline:** R's cross-repo bookkeeping is substantially correct — the letters are
> complete, the books are books-never-gates, R.W6 is correctly self-contained, and "don't
> pre-pin" is the right spine discipline. The genuine gaps are **four cheap doc amendments on
> the value.js side** and **two flags that only the kf owner can rule on** (the unscoped
> value.js-2.0.0 consume in S, and the two-event re-pin arithmetic). No new mechanism is
> needed; the letter+book idiom is the recommendation, extended by exactly one missing letter
> (fourier) and one addendum (kf).

---

## 1 — THE INTERLOCK MAP

### 1.1 The version lattice (live, verified 2026-07-03)

```
parse-that   0.13.0 ──► 1.0.0        cut+publish at kf S.H4 (S.H1∥S.H2 → S.H4; kf S.md:866-868)
                                     breaks UPSTREAM edge only: span.ts+15 *Span deleted,
                                     chainError retired, chain() falsy-seed FIXED
value.js     1.2.0  ──► 2.0.0        R.W1 (ratified, dispatchable NOW) on parse-that ^0.13.0
                          └► 2.0.x   the parse-that ^1.0.0 re-pin — a SEPARATE post-R publish (book)
keyframes.js 5.1.0  ──► (S)          parse-that-FREE (deps = value.js ^1.2.0 ONLY); receives
                                     parse-that 1.0.0 only TRANSITIVELY via value.js (two-hop)
glass-ui     4.x    ──► 5.0.0        BG/BH joint cut; value.js adopt-event book (R.md §3.3)
fourier web  vjs ^0.13.0 (mid-bump, uncommitted m/w1-bump-migration) — caret will NOT resolve 2.0.0
```

### 1.2 Every edge, with verdict

| # | Edge | Vehicle | Verdict | Evidence |
|---|------|---------|---------|----------|
| E1 | value.js 2.0.0 → kf (KF-1 fix+rename, normalizeParam deletion map, ^2.0.0 ask) | `letters/KF-VALUEJS-2.0.0.md`, travels with the R.W1 publish | **SOUND** — complete, self-contained | letter §1–§5 |
| E2 | kf consumes value.js 2.0.0 (delete `normalizeParam`+`NormalizedParam`, simplify `coerceArg`, delete `VJS_PARAM_BUG_MAX`, re-pin ^2.0.0) | kf S — **no scoped home** | **MISSING (kf-side)** — S.A0 pin-ledger targets 1.2.0 (kf `S.md:70,221`); S.C4/S2 is only a conditional changelog check ("deleted per its own lifecycle if fixed upstream; **else KEEP**" — kf `S.C.md:397-398`, fold row 61 `S.C.md:447`); value.js 2.0.0 is a THIRD external edge where S declares "exactly TWO" (`S.md:112-119`) needing an owner ruling | KF-LATEST §5 |
| E3 | parse-that 1.0.0 → value.js ^1.0.0 re-pin | R book (`R.md` §3.3; `R.W1.md:188`) | **SOUND with two drifts** — trigger cited as "kf **S.H2** publishes" but the publish wave is **S.H4** (kf `S.md:866-868`: H1+H2 land in ONE 1.0.0 at H4); scope cited span-only, but 1.0.0 ALSO retires `chainError` + FIXES `chain()` falsy-seed (kf `S.md:863-865`, C-16 `S.md:507-514`) — value.js has 4 live `.chain()` sites (`stylesheet.ts:796`, `parsing/utils.ts:182`, `color.ts:599,650`) | PT-SPINE §1.3, §3.2 GAP-A |
| E4 | kf S.H4/S3 verifies value.js `color2Into` (fold row 46 WATCH) via the value.js suite at the re-pin, with a named exit | kf-side gate on a value.js surface | **MISSING (value.js book)** — letter §4 is silent; value.js must keep `color2Into` + suite green through the re-pin or kf's exit fires | KF-LATEST §5.2 |
| E5 | S.H3 Pratt sketch ↔ value.js `math.ts` calc() ratifying consume-edge | book both sides | **SOUND (quiescent)** — de-scoped to kf S §8 recorded-future; the sketch does NOT arrive during S; R's trigger "parse-that presents the sketch" is correct and dormant | KF-LATEST §3 |
| E6 | parse-that S.H1 packrat-arming → value.js | transparent | **SOUND** — no API change; the type ripple is `packrat.ts`-internal, not `ParserState`; value.js reads diagnostics structurally (`parsing/utils.ts:335-360`) | PT-SPINE §2.1 |
| E7 | value.js 2.0.0 → glass-ui peer-floor `^1.0.0→^2.0.0` | R.W1.7 dispatch note | **SOUND** — authored in plan (`R.W1.md:139`) | — |
| E8 | glass-ui 5.0.0 BG/BH → value.js adopt-event (subpath table, U6 dock-fission, uSatColor, aurora-metal) | R book | **SOUND** | R.md §3.3 |
| E9 | D8-1 no-shim verify (glass-ui BG relay, live) | R book riding a dispatched ask | **SOUND** | R.md §3.3 |
| E10 | value.js 2.0.0 → fourier web (`^0.13.0` caret) | **nothing** | **MISSING (G1)** — R.W1.7 dispatches kf+glass-ui notes only; fourier's caret silently freezes at 0.13.x; consumed surface (easings/timingFunctions, planned color fns) IS 2.0.0-safe — one-line caret note fixes it | FOURIER-LATEST §5 G1 |
| E11 | value.js FN-1..7 charter → fourier | `VALUEJS-R-UPLIFT-ASKS.md`, accepted at fourier `83d4c9f` | **SOUND (booked)** — but no fourier N.md exists; FN-1..7 unhomed, realistically post-M | FOURIER-LATEST §3 |
| E12 | fourier M.W10 version-shape transpose ↔ R.W6 contract fixture / FN-5 twin-currency guard | FN-5 (unhomed) | **AT-RISK (G3)** — M.W10 (fourier `M.md:88`) is exactly the change FN-5 guards, and lands before FN-5 exists; R.W6's in-tree note + shape-only fixture degrade this to a caught mismatch, not silent breakage — but nobody has flagged the ordering | FOURIER-LATEST §5 G3 |
| E13 | fourier cascade-vjs hygiene ask (unplugin-vue-markdown ^29→^32, `file:`→`^published`, lockfile regen) | fourier `ADOPTION-ASKS.md:118` | **MISSING (ack, low)** — untracked in R corpus; NOTE: the `file:`→published half **conflicts with R's Q4 ratification** (keep `file:` deliberately, `R.md` §3.4) — respond, don't silently ignore | FOURIER-LATEST §5 G4 |
| E14 | dispatch.sh retirement (rsync→git, hard kill-date) | R book ↔ fourier `M.md:142` | **SOUND** — reciprocal | R.md routing ledger |
| E15 | tri-tranche RUN-BOARD | fourier `docs/constellation/tri-tranche-run/` | **STALE — do not join** — purpose-built for keyframes-D+E / glass-ui-AU+slides-F / feedback-coder-L; 11-day stale; fourier's own `M.md:28` retires its premise; value.js was only ever an inbox cross-link (`COORDINATION.md:320-322`) | FOURIER-LATEST §1 |
| E16 | the two-hop transitive spine: parse-that 1.0.0 → value.js ^1.0.0 → kf | **unsurfaced both sides** | **MISSING (GAP-B)** — kf is parse-that-FREE, so kf `S.md:868` "kf re-pins exactly once" undercounts: KF-1 (`^2.0.0`) and parse-that-1.0.0 delivery are TWO distinct value.js versions unless kf deliberately sequences its single re-pin after value.js's `^1.0.0` follow-on | PT-SPINE §3.2 GAP-B |
| E17 | fourier D/E → value.js-I hand-off (COHORT-VALUE-JS-I) | historical | **SOUND (closed)** — executed, value.js now 2 majors past it | FOURIER-LATEST §2d |

**Scorecard: 9 SOUND · 1 SOUND-with-drift · 1 STALE-don't-join · 1 AT-RISK · 5 MISSING** — of the
five MISSING, three are value.js-side one-liners (E4, E10, E13), two are kf-owner rulings (E2, E16).

---

## 2 — INCOMING (what is headed at value.js, and its blast radius on R waves)

### 2.1 parse-that 1.0.0 (foremost) — kf S.H4, timing = kf S impl drive (S not yet authorized)

The cut is **bigger than R books**. Three breaking removals + one fix in ONE publish
(kf `S.md:863-868`):

1. **`span.ts` + 15 `*Span` exports deleted** — value.js verified at **0 consumers** (only CSS
   property names `columnSpan`/`webkitColumnSpan`, `src/units/constants.ts:298,697`). R's
   "API-safe" claim CONFIRMED against the live tree.
2. **`chainError` param retired** — value.js verified at **0 callers** across its 4 `.chain()`
   sites. Non-breaking, but the 0-caller scan of record is kf-authored (C-16); value.js should
   mirror-verify at the re-pin (this audit already did: 0 hits).
3. **`chain()` falsy-seed FIX** — a **behavior change**, not an API removal: `0`/`''`/`false`
   seeds now thread where today they are dropped. value.js's 4 seeds are non-falsy by
   construction (matched idents/tokens) so practically inert — but "API-safe" understates it;
   the re-pin verify must exercise the chain surface, not assume it.
4. **S.H1 packrat-arming** rides the same publish — transparent GC win (14-18% throughput /
   ~34% retained-heap on short CSS values), no value.js action (R's KF-5 booking correct).

**Blast radius on R: ZERO waves.** R.W1 ships 2.0.0 on `^0.13.0` (unchanged); the `^1.0.0`
re-pin is a booked post-R publish (2.0.x/2.1.0) — a trivial bump+retest, no code change, since
value.js's entire parse-that surface (`Parser, all, any, dispatch, regex, string, whitespace,
ParserState`, `.chain()`, test-only diagnostics) is in the surviving 1.0.0 set (PT-SPINE §2.1).

**One kf-side gate rides the re-pin at value.js:** kf S.H4/S3 dispositions fold row 46
(`color2Into` WATCH) via "the value.js suite green against the re-pinned build," with a named
exit if unverifiable. value.js must keep `color2Into` + suite green through the re-pin (E4).

### 2.2 From kf S otherwise

- **S.H3 Pratt**: nothing during S — parked in kf §8 recorded-future; dormant both sides. R's
  book stands unchanged; know only that the trigger event will not fire during S.
- **The reciprocal risk (outbound-but-blocked)**: kf S as written CANNOT complete the KF-1
  lifecycle — S.C4/S2 fires its "else KEEP" branch against a pin ledger baked at 1.2.0, and a
  `^2.0.0` re-pin is an unbudgeted third external edge. If unreconciled, `normalizeParam` +
  `VJS_PARAM_BUG_MAX` persist another kf tranche and the letter's §2 deletion map goes unread.
  Both tranches are pre-execution **now** — the ideal reconciliation window.

### 2.3 From fourier M/N

- **No parse-that edge exists** (grep `web/` = 0; transitive/bundled only). R owes fourier
  nothing on the spine.
- **fourier is a live value.js consumer mid-bump to `^0.13.0`** (uncommitted,
  `m/w1-bump-migration`) — 5 import sites, easing/timing only; M.W7 plans the color surface
  (`mixColorsN`, `safeAccentColor`) and books `sampleColorRamp` "for 0.13.0" — **stale premise**:
  it already ships (`src/index.ts:165`) and value.js is at 1.2.0→2.0.0.
- **M.W10 version-shape transpose** (delete phantom version chain, `/diff` to-param,
  `atom_diff` recompute) touches the contract shape R.W6's fixture asserts, before FN-5 exists.
  R.W6's blast radius: a conformance mismatch would be *caught* (shape-only fixture), not
  silent — but the FN-5-before-M.W10 ordering should be said out loud (E12).
- **FN-1..7**: accepted into fourier's tree, unhomed, realistically post-M. R.W6's
  self-containment (gates on nothing external, `R.md:190`) is exactly right for this.
- **cascade-vjs** hygiene ask (E13) — value.js-maintainer item, partially in tension with Q4.

### 2.4 From glass-ui BG/BH

Unchanged by this audit: the 5.0.0 adopt-event book + D8-1 relay are SOUND. The R.W1
peer-floor note (`^1.0.0→^2.0.0`) is authored in plan. No amendment needed.

---

## 3 — R CORRECTIONS

### 3.1 Already RIGHT (do not touch)

| R artifact | Why it stands |
|---|---|
| `letters/KF-VALUEJS-2.0.0.md` §1–§3, §5 | Complete, self-contained, correct deletion map; the gap is kf-side scoping, not the letter |
| "Don't pre-pin" (`R.W1.md:188`; R.md §3.3) | Correct — can't pin a phantom; decoupling ratified R from planning-only S is right |
| S.H3 Pratt book (R.md §3.3; letter §4 KF-6) | Correctly dormant; ratify-or-decline preserved |
| KF-5 packrat "no action" (`R.W1.md:191`) | Verified: type ripple never touches `ParserState` |
| R.W6 self-containment (`R.md:190`) | Verified: fourier has no FN home; all deliverables tree-local |
| Q9/FN-7 doc homes, byte-parity struck, dispatch.sh kill-date, R8-18/R8-19 carries | All verified reciprocal against the fourier/kf trees |
| Q4 pin policy (`file:` kept deliberately, §3.4) | Stands; but requires an explicit *response* to fourier's cascade-vjs `file:`→published ask, not silence |

### 3.2 AMEND (exact doc + wording)

1. **`R.md` §3.3, parse-that row + `letters/KF-VALUEJS-2.0.0.md` §4 KF-2** — retarget the
   trigger and widen the scope. Replace
   *"kf S.H2 publishes the 1.0.0 cut … Re-pin, full suite re-verify (0 `*Span` consumers —
   API-safe). Wait, don't pre-pin"*
   with:
   *"kf **S.H4** publishes the 1.0.0 (H1+H2 in one cut) → re-pin `^1.0.0` as a distinct
   value.js publish. Verify = span-absence (0 `*Span` consumers, confirmed) **+ the 4
   `.chain()` sites** (`stylesheet.ts:796`, `parsing/utils.ts:182`, `color.ts:599,650`) — 1.0.0
   also retires `chainError` (value.js passes 0) and FIXES `chain()` falsy-seed semantics
   (value.js seeds non-falsy; verify, don't assume). Wait, don't pre-pin."*

2. **`R.md` §3.3 — ADD one book row**:
   *"**color2Into currency through the parse-that re-pin** | kf S.H4/S3 dispositions fold row
   46 via the value.js suite green against the re-pinned 1.0.0 | keep `color2Into` + its suite
   green through the `^1.0.0` re-pin so kf's row-46 gate closes without firing its named
   exit."*

3. **`R.W1.md` §R.W1.7 dispatch list — ADD the fourier peer-floor note** (third letter):
   *"the fourier note (`letters/FOURIER-NOTE.md`): value.js 2.0.0 published; your consumed
   surface (`easeInOutSine`, `timingFunctions`, `mixColorsN`, `safeAccentColor`,
   `sampleColorRamp`) is unaffected by the 2.0.0 renames (they touch the `@property`/KF-1
   descriptor grammar only); bump `^0.13.0→^2.0.0` to receive it. Also: `sampleColorRamp`
   already ships (since ≤1.2.0) — your M.W7 'book for 0.13.0' is dischargeable on adopt."*
   And amend the W1 hard-gate wording "both dispatch letters written" → "the three dispatch
   letters written."

4. **`letters/KF-VALUEJS-2.0.0.md` — ADD a §6 coordination addendum** (kf-owner-facing; flags,
   not acts — read-only discipline honored):
   - *(a)* "kf S as authored has no budgeted slot to consume this letter: S.A0's pin ledger
     targets value.js 1.2.0; S.C4/S2 is a conditional `VJS_PARAM_BUG_MAX` check whose 'else
     KEEP' branch fires as written; a `^2.0.0` re-pin is a third external edge under S §1's
     two-edge budget. Owner ruling requested: re-scope S.C4/S2 into a named value.js-2.0.0
     consume-edge (the §2 deletion map + `^2.0.0`), or BOOK the full payload to the kf
     successor tranche explicitly — not the silent else-KEEP."
   - *(b)* "'kf re-pins exactly once' (S.md:868) undercounts: kf is parse-that-FREE, so
     parse-that 1.0.0 reaches kf only via value.js's `^1.0.0` follow-on publish. Either
     sequence your single value.js re-pin AFTER that follow-on (one re-pin, both payloads), or
     accept two re-pin events (`^2.0.0` for KF-1 now, the 1.0.0-carrying 2.0.x later). Pick one
     on the record."

5. **R.W6 paired-authoring scope — ADD one FN-charter line** (a fourier-tree write, legal under
   the charter's paired-authorship grant, executed AT R.W6):
   *"FN-5 should be authored before or with fourier M.W10 (the version-shape transpose is
   exactly the change FN-5 guards); until then value.js's in-tree contract-of-record note +
   shape-only fixture are the interim protection."*

6. **R corpus (routing ledger or R.W7 relay §8) — one acknowledgment line** for cascade-vjs
   (fourier `ADOPTION-ASKS.md:118`): the unplugin-vue-markdown `^29→^32` bump + lockfile regen
   are accepted maintainer items; the `file:`→`^published` half is **declined per Q4**
   (ratified 2026-07-03, `R.md` §3.4) — cite the Q4 record back so the ask closes rather than
   dangles.

All six are doc-only, pre-execution amendments — R is ratified but not dispatched, so they cost
nothing and ride the existing waves (1–4 before/at W1; 5 at W6; 6 at W7).

---

## 4 — THE COORDINATION MECHANISM (evaluate three, recommend ONE)

**Option A — join/extend fourier's tri-tranche RUN-BOARD.** REJECT. The board is purpose-built
for three sessions value.js was never one of, its root hinge ("glass-ui 3.3.0 on npm") cleared
weeks ago, and fourier's own M charter calls it stale (`M.md:28`). Retrofitting R into it means
re-grounding a board fourier owns (M.W0's job), acquiring a session row nobody asked for, and
maintaining a second source of truth beside the letters. The *pattern* (inv-16 +
real-command gate checks + heartbeat) is sound and already lives inside the letter idiom's
"verify at adopt-time with `npm view`" discipline.

**Option B — a new shared board.** REJECT. Three repos, five edges, all of which fire at most
once per tranche — a standing board is coordination bureaucracy where a letter suffices (KISS).
The RUN-BOARD's own fate (11 days to staleness because it hard-coded version gates) is the
argument: boards rot; letters travel with the event that makes them true.

**Option C — the letter+book idiom, extended by exactly one letter and one addendum.**
**RECOMMEND.** It is already the working mechanism on every SOUND edge in §1.2: kf's
`KF-TO-{REPO}-*` dispatches, value.js's `letters/` + §3.3 books, fourier's `ADOPTION-ASKS.md`
ledger + FN charter. Its two failure modes in this audit were both *omissions* (a missing
letter, an unscoped consume), not mechanism failures.

**Concretely — who authors what, where, and when (against R's rounds W0 → W1∥W2∥W6 → W3 → W4 → W7):**

| Sync point | Author | Artifact | Content |
|---|---|---|---|
| **Pre-W1 dispatch** (now) | value.js orchestrator | `R.md` §3.3 + `R.W1.md` + letter §4/§6 edits | Amendments §3.2 items 1, 2, 3, 4 |
| **R.W1 close** (2.0.0 publish) | value.js | THREE letters: `KF-VALUEJS-2.0.0.md` (+§6 addendum) · glass-ui peer-floor note · `FOURIER-NOTE.md` | Each travels with the registry event that makes it true; each cites `npm view`-checkable facts, never narration |
| **kf S impl authorization** (kf-owned, whenever) | kf owner | S.C4/S2 re-scope OR successor book | Rules on §6(a)+(b); the letter is already in hand |
| **kf S.H4** (parse-that 1.0.0 publish) | value.js | the `^1.0.0` re-pin work-order (post-R publish 2.0.x) | Verify = span-absence + 4 `.chain()` sites + full suite + `color2Into` green (closes kf fold row 46) |
| **R.W6** | value.js (paired-authorship grant) | FN charter one-line amendment in fourier's tree | §3.2 item 5 (FN-5 before M.W10) |
| **R.W7 close** | value.js | relay letter §8 + routing-ledger ack | §3.2 item 6 (cascade-vjs response citing Q4) |
| **glass-ui 5.0.0 / adopt events** | value.js | the existing §3.3 books | Unchanged — books fire on their named triggers, never gate R |

No standing meetings, no board, no polling: every cross-repo fact travels as a letter pinned to
a publish event, every future obligation is a book with a named trigger, and every consume is
verified against the registry at adopt-time. Books-never-gates holds throughout — nothing above
gates any R wave.

---

## 5 — SEQUENCING RULING (the version-cut ordering + do-not-interleave constraints)

**The order:**

```
1. value.js 2.0.0        R.W1, NOW, on parse-that ^0.13.0    (independent; do not wait for anyone)
2. glass-ui 5.0.0        BG/BH, own cadence                   (disjoint edge; adopt-event book at value.js)
3. parse-that 1.0.0      kf S.H4, at the S impl drive         (kf-owned dispatch; ONE publish, H1+H2)
4. value.js 2.0.x        the ^1.0.0 re-pin, post-(3)          (trivial bump+retest; chain+span+color2Into verify)
5. kf next               value.js re-pin, post-(4) preferred  (ONE re-pin carrying KF-1 + parse-that 1.0.0)
                         — or ^2.0.0 immediately post-(1) accepting a SECOND re-pin after (4)
6. fourier web ^2.0.0    any time post-(1), fourier's cadence (caret bump only; surface unaffected)
```

**Do-not-interleave constraints:**

1. **Never pre-pin an unpublished version.** value.js does not pin `^1.0.0` before (3) exists
   on the registry (R already honors this); fourier does not pin `^2.0.0` before (1).
2. **value.js 2.0.0 must NOT wait on parse-that 1.0.0.** The cuts sit on disjoint edges
   (2.0.0 breaks downstream/KF-1; 1.0.0 breaks upstream/span+chain); R is ratified, S is
   planning-only. The "ideal" collapsed order (parse-that first, value.js pins `^1.0.0` in one
   shot, kf re-pins once) is unreachable without blocking a ratified tranche on an unauthorized
   one — record it as the ideal, ship the decoupled path.
3. **kf must not treat its value.js re-pin as one event without choosing when.** If kf re-pins
   `^2.0.0` immediately after (1), its install tree runs parse-that 0.13.0 (the
   deprecated-span build) and the freshly-published 1.0.0 is orphaned at kf until a second
   re-pin after (4). Legal, but it must be chosen, not discovered. The single-re-pin path
   requires kf to sequence after (4).
4. **kf's fold-row-46 close rides (4), not (3).** The `color2Into` verification runs against
   the value.js suite on the re-pinned build — value.js keeps that surface green through (4).
5. **glass-ui 5.0.0 and the parse-that spine never constrain each other** — different edges;
   the only shared fact is glass-ui's peerDependencies floor riding `^1.0.0→^2.0.0` at (1),
   which the R.W1 note already carries.
6. **fourier's caret bump (6) has no ordering constraint** beyond post-(1); its M cadence
   (W1b-gated on glass-ui BB) is its own affair. FN-1..7 execute post-M in a fourier tranche
   that does not exist yet — R.W6 correctly assumes nothing about when.

---

## 6 — DO-NEXT (action · owner · when · channel)

| # | Action | Owner | When | Channel |
|---|---|---|---|---|
| 1 | Amend the parse-that book: trigger S.H2→**S.H4**; widen verify to span **+ the 4 `.chain()` sites** (chainError retired, falsy-seed fix) | value.js orchestrator | pre-W1 dispatch (now) | `R.md` §3.3 + `KF-VALUEJS-2.0.0.md` §4 KF-2 edit |
| 2 | Add the **color2Into-currency book** (keep it + suite green through the `^1.0.0` re-pin; kf fold row 46 closes against it) | value.js orchestrator | pre-W1 dispatch | new `R.md` §3.3 row |
| 3 | Add the **fourier peer-floor note** to R.W1.7 ("surface unaffected; bump `^0.13.0→^2.0.0`; `sampleColorRamp` already ships — strike your M.W7 booking"); gate wording "both letters"→"three letters" | value.js orchestrator | authored pre-W1, dispatched at the 2.0.0 publish | `letters/FOURIER-NOTE.md` + `R.W1.md` edit |
| 4 | Add **§6 addendum to the kf letter**: (a) value.js-2.0.0 consume is unscoped in S (S.C4 else-KEEP fires; third-edge ruling needed) — re-scope S.C4/S2 or BOOK the full deletion payload to the successor; (b) "re-pins exactly once" is two events unless sequenced after value.js's `^1.0.0` follow-on — pick one on the record | value.js authors the flag; **kf owner rules** | addendum pre-W1; ruling at S impl authorization | `KF-VALUEJS-2.0.0.md` §6 (travels with 2.0.0) |
| 5 | Execute the **`^1.0.0` re-pin as a named post-R publish** (2.0.x): bump, span-absence + 4 `.chain()` sites + mirror the chainError 0-caller scan + full suite + `color2Into` green | value.js maintainer | on kf S.H4's registry publish | the booked re-pin work-order |
| 6 | Add the **FN-5-before-M.W10** sequencing line to the FN charter (fourier-tree write under the paired-authorship grant) | value.js R.W6 lane; fourier owns scheduling | at R.W6 | FN charter (`docs/tranches/N/VALUEJS-R-UPLIFT-ASKS.md`) amendment |
| 7 | **Respond to cascade-vjs**: accept the unplugin-vue-markdown bump + lockfile regen as maintainer items; decline `file:`→published citing the Q4 ratification | value.js maintainer | R.W7 (relay §8) | routing-ledger ack + relay letter line |
| 8 | **Do NOT join or rebuild the tri-tranche RUN-BOARD**; keep letter+book; fourier re-grounds its own board at M.W0 | all three owners (standing ruling) | now (record once) | this doc, §4 |
