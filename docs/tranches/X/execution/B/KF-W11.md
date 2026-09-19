SERVED MODEL: claude-opus-5[1m]

# KF.W11 — Demo Scene Repair · EXECUTION RECORD (Track B · X·KF)

**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W11.md` (404 L, authored 2026-09-18 by the
SS-1/SS-2 fold seat, sitting date 2026-09-17, ref of record kf `69095552`).
**Wave status at this seat**: **BLOCKED-ON OP-0** — the spec's one HARD open precondition
(`G-KFW4-1` GREEN) is **RED at this seat's own clock, double-run**. **No `§Bounds` product path was
written by this seat**; the only bytes it wrote are this record, the LEDGER's own cells and its
event line. Baseline, mail sweep, seven precondition receipts and the **full 10-unit plan** are
banked below so that a grant (or a KF.W4 repair landing) dispatches the wave without a second
open sitting.
**Wave status at the SECOND sitting (2026-09-19, dated beside — E-3)**: **OPEN.** `COHESION.md §0u`
(`085b2121`) ruled OP-0 a **RATCHET**, answering ESCALATION KF11-E1 with disposition (b); the spec's
own `ADDENDUM 2026-09-19` (`KF-W11.md:408-417`) carries the ruling and adds unit **`.r`** FIRST. The
chassis is WIRED (`npm run check`'s first leg is `vue-tsc`), the count **54 · 54** is banked as the
ratchet's floor, and the plan dispatches as **11 units in 8 groups**. See `# SECOND SITTING` below —
nothing in the first sitting's blocks is altered.

---

## Open

**Date**: 2026-09-19 (wall clock, 01:2x–01:4x EDT). **Sitting of record: 2026-09-17**, the owner's
begin-word (COHESION §0j).
**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`, VERIFY-AND-BANK only.
**Substrate named, never assumed**: keyframes.js sacred checkout `/Users/mkbabb/Programming/keyframes.js`,
`master` — ⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD` → **`dd28da55`**;
⟨cmd⟩ `… rev-parse --short origin/master` → **`dd28da55`** (local == remote).
**Drift from the spec's ref of record**: ⟨cmd⟩ `git rev-list --count 69095552..HEAD` → **7** — all
seven are KF.W10's own close commits (`95e53f5e` · `b920b190` · `025e894c` · `27ec9c37` · `b50a23de` ·
`0a329c57` · `dd28da55`); **none touches a `demo/**` path this wave bounds** (the two `staged`
commits are the `v/w9-staging` merge of gate/test superfluity). Every §Bounds byte clause below
re-measures identically at `dd28da55` and at `69095552` except where noted.

### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → **2 untracked rows**,
both value.js-delivered mail packets (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-…`,
`…-2026-07-27-…`) — **outside every KF.W11 writable path**; nothing inherited.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → 2 modified rows:
`docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling seat's; untouched) and
`scripts/dev/dev.sh` (**unowned, never staged, never touched**). **No dirty path inside this
seat's writable set** (`docs/tranches/X/execution/B/KF-W11.md` did not exist; `LEDGER.md` clean;
`INBOX.md` clean). **Zero inherited hunks; nothing to finish or rewrite.**

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock, compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`; classification taken from each row's **Status cell by
position**, never from a bare `grep -i unread`; `INBOX.md` **self-excluded** (SELF-COUNT law).

1. **`docs/tranches/V/` + `V/coordination/`** — ⟨cmd⟩ `find docs/tranches/V -maxdepth 2 -type f
   -name '*.md' -newermt "2026-09-19 01:20"` → **1 member, `INBOX.md` (self)**. Newest five in
   `V/coordination/` = `INBOX.md` (self) + the four 2026-09-18 22:0x letters that are **ours and
   rowed** (O-34..O-38 tail).
2. **`../glass-ui/docs/tranches/BK/coordination/`** — **BK re-confirmed the newest tranche dir**:
   ⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -3` → `BK/` · `BJ/` · `BI/`. Newest
   letter = `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, rowed** (INBOX `:115`).
3. **`../keyframes.js/docs/tranches/V/coordination/`** — newest inbound-grammar file =
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21, ours, delivered**;
   `INBOUND-LEDGER.md` is keyframes' own ledger, not a letter.
4. **`../sci-report/atlas/docs/tranches/P/coordination/`** — newest =
   `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12, ours**; path UNMOVED. (The
   Q-lane letter that X-W0 rowed as I-31 re-read unmoved; `S/`, `T/`, `V/` carry no
   `coordination/` dir — ⟨cmd⟩ `ls sci-report/atlas/docs/tranches/{S,T,V}/coordination/` → empty.)

**Result**: **ZERO unrowed letters addressed to value.js · ZERO new `I-n` minted (register tail
stays I-35 / O-38) · ZERO UNREAD Status cells** — ⟨cmd⟩ `sed 's/\\|/@PIPE@/g' INBOX.md | awk -F'|'
'/^\| [IO]-[0-9]+[a-z]? \|/ {s=$6; gsub(/^ +| +$/,"",s); if (s ~ /^\*\*?UNREAD/) c++} END {print
c+0}'` → **0** · **0** (double-run) over **78** rows (⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|'`
→ **78**; the bare `[IO]-[0-9]+` pattern reads **74** — two patterns, one population, no
contradiction, as the 2026-09-19 terminalization records). **`INBOX.md` NOT touched by this seat**
(nothing to row); no sweep line appended for a blocked open — the sweep is recorded here, dated,
and the next KF.W11 sitting re-runs it.

### Preconditions — all seven §0 rows, measured at the bytes AND in the ledger

| # | precondition | this seat's measurement | verdict |
|---|---|---|---|
| **OP-0** | **`G-KFW4-1` GREEN** — the sequencing head (§State; KF-W4 §Sequencing: *"No repair packet and no UNIT may open before **G-KFW4-1** lands"*) | ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` → **54** · **54** (double-run, at `dd28da55`). LEDGER KF.W4 row reads **`CLOSED 2026-09-17 (honest-RED: G-KFW4-1 · G-KFW4-3 · G-KFW4-4 · G-KFW4-5 · G-KFW4-7)`**; CHECK 2 CONFORMANT-HONEST-RED. | **RED — HARD. THE WAVE IS BLOCKED.** |
| **OP-1** | KF.W7's per-surface SWAP verdict for `SequenceScrubber` + `AnimationVisualizer` (KF-AV-28) | ⟨cmd⟩ `git cat-file -t 4c03ceda` → `commit`; ⟨cmd⟩ `git log -1 --format='%h %ad %s' --date=short 4c03ceda` → *"`4c03ceda` 2026-09-18 docs(x-kf/w7.a · G1): the six-surface verdict table — KEEP-BESPOKE x6, zero SWAP, the empty discharge set stated…"*; `execution/B/KF-W7.md:510` *"**THE VERDICT: six surfaces, six KEEP-BESPOKE, ZERO SWAP.**"* · `:1346` *"the discharge set is EMPTY"*. | **MET** — the packet is UN-GATED; the discharge alphabet has **zero** members. |
| **OP-2** | the `grabDx` precedent (SquareScene MISS-1) | ⟨cmd⟩ `git -C ../keyframes.js cat-file -t 7225cdd1` → `commit`; subject = *"fix(kf · X.KF.W7.d · G3): a grab is not a teleport — the drag carries its grab offset…"*. | **MET AS LANDED CODE** — read as precedent, never copied. |
| **OP-3** | D-19 geometry re-derivation before any geometry cure | per-unit act at each unit's open sha (P1 latch seam · P2 geometry · P7 tether). | **OPEN BY DESIGN** — not an open-blocker. |
| **OP-4** | the spring-plot draw route's export decision | ⟨cmd⟩ `grep -c 'sampleNormalizedSpring\|resolveLinearStops' dist/keyframes.d.ts` → **0** · **0** (the artefact EXISTS — 224,427 B, 2026-09-19 00:17 — and carries neither symbol). | **UNLANDED, as the spec measured** — `.e` takes the anchor-hoist minimum, re-measured at its own open. |
| **OP-5** | KF-ES-2's facility-honesty spec | consumed by reference; not landed at this clock. | **NOT AN OPEN-BLOCKER** — `.c`/`.g` land KF-SS-10 / KF-SST-10 witness-only if still unlanded. |
| **OP-6** | the transport/ribbon packet (KF.W13) | KF.W13 `planned`; the seam is declared at both ends. | **CROSS-EDGE, not a block.** |
| **OP-7** | owner-decision gate D-2 (SquareInstrument layer sign-off) | ⟨cmd⟩ `grep -n "SquareInstrument\|layer sign-off" docs/tranches/X/COHESION.md` → one hit, the §0d register row 6 (a homing row, not a ruling). **No ruling exists at §0i–§0t** (read to file end, 1,540 L). | **OWNER-UNRULED** — gates a named subset of `.b`, not the wave. |

**Ledger-side reading of the spec's other `Opens after` names** (all verified in
`execution/LEDGER.md` Track B, and at the bytes): **KF.W7 CLOSED** (verdict table landed,
`4c03ceda`) · **KF.W8 CLOSED** · **KF.W6 CLOSED** (`a6418729`, the `kf-focus-ring` rename — its
consequence re-measured below) · **KF.W0 CLOSED** (§B-12 re-baseline law inherited). **Only OP-0
fails.**

### The blocking finding, stated whole — and the conflict of readings it exposes (ESCALATION KF11-E1)

The spec is unambiguous about its own open condition and about this exact fact pattern. §State,
verbatim: *"**G-KFW4-1 lands GREEN** … **measured RED at this seat, twice** … the LEDGER's KF.W4 row
reads `CLOSED 2026-09-17 (honest-RED: G-KFW4-1 …)`, so the head is CLOSED-honest-RED and **this
wave cannot open until a repair seat turns that count to 0**"*; §0 row OP-0: *"**RED — 54 · 54
vue-tsc errors. HARD.**"*; §0's closing line: *"**OP-0 is hard.**"* This seat re-measured that
same figure, unmoved, at a later HEAD: **54 · 54**. Under the spec that GOVERNS, the wave does not
open. **That is this seat's act, and it is the conservative one.**

**But the head's OWNING wave dispositions these three successors the other way**, and the sitting
must see it. `execution/B/KF-W4.md:2505` (CHECK 2, the fresh adversarial VERIFY-ONLY pass,
2026-09-18), verbatim row:

> | **KF.W11 · W12 · W13** | §Sequencing *"No repair packet and no UNIT may open before **G-KFW4-1**
> lands"* | the gate's **chassis landed** — wired, running, on the merge path, its diagnostics
> owner-named | not blocked by this wave's RED; they await the SS-1/SS-2 authoring block |

— with the same row at `:2191` (CHECK 1) and the section's own summary at `:2507`: *"No successor
is unlawfully unblocked by this close, and none is blocked by anything but KF.W4's own honest-RED
state."* The awaited condition in that row — the SS-1/SS-2 authoring block — **has since landed**
(`f208ff31`, 2026-09-18; the three specs of record exist).

**And the count-zero reading is circular at the bytes.** `KF-W4.md:2396`'s relief routes
G-KFW4-1's own diagnostics: *"**16 demo TS6133** → §C.6 **R4**, owners KF.W6 · KF.W7 · **the
UNITs**"* and *"**4 behavioural** … → §C.6 **R2**, ruled **honest-RED with named owners** at §0m.1
(**KF.W12–13**)"*. Measured here, the 54 decompose ⟨cmd⟩ (by code) as **20 TS2339 · 15 TS6133 · 5
TS2322 · 4 TS2379 · 3 TS7053 · 3 TS2769 · 2 TS2367 · 2 TS2345**, and **by file the largest cluster
is 24 in `demo/scenes/cube/orbital-drag/OrbitalDrag.vue`** — ⟨cmd⟩ `npx vue-tsc --noEmit -p
tsconfig.json 2>&1 | grep 'error TS' | sed 's/(.*//' | sort | uniq -c | sort -rn | head -3` →
`24 demo/scenes/cube/orbital-drag/OrbitalDrag.vue` · `3 …/useTimingFunctionEditor.ts` · `2
…/useEasingDemo.ts`. **`OrbitalDrag.vue` is unit `.a`'s own `modify` row** (§Bounds `:100`), and
three more error-bearing files (`useTransformState.ts`, `MatrixEditor.vue`, `CubeScene.vue`) are
`.a`'s as well; `useSpringDemo.ts` is `.c`'s. **No lawful seat outside KF.W11–13 can zero that
count**, because a repair seat that wrote `OrbitalDrag.vue` would be writing this wave's bounds.
A precondition only this wave's own units can satisfy is a deadlock, not a gate.

**ESCALATION KF11-E1 — for the orchestrator's sitting, never presumed by this seat.** Which reading
of *"G-KFW4-1 lands"* governs KF.W11's open: **(a)** the spec's OP-0 as written (the vue-tsc count
reaches **0** first — then the wave opens; and the sitting must name **who** may write
`OrbitalDrag.vue` to get there, since KF.W4 is CLOSED and the file is `.a`'s), or **(b)** the
head-wave's own CHECK-2 disposition (the gate's **chassis** landed — wired, running, diagnostics
owner-named — and the successors are *"not blocked by this wave's RED"*), under which KF.W11 opens
now and `.a` cures the 24 `OrbitalDrag.vue` diagnostics **inside** its cube packet as ordinary
cargo (they are OD model-contract rows by shape: `TS2339 Property 'rotate' does not exist on type
'T'` at `:68`/`:91`/`:92`, `TS2769 No overload matches this call` at `:43`/`:47`/`:48`)? A grant of
**(b)** needs no spec edit — it is a dated COHESION addendum-beside (E-3), and this record's §Unit
plan dispatches unchanged on it.

---

## Baseline — the ten born-RED gates, run READ-ONLY at this seat's clock, every figure double-run

All commands run from `/Users/mkbabb/Programming/keyframes.js` at `dd28da55`. **SELF-COUNT**: the
spec's §Gates roster is ⟨cmd⟩ `grep -c '^\*\*G-KFW11-' keyframes/waves/KF-W11.md` → **10**; ten
rows follow.

| gate | command (spec's own) | this seat's reading | verdict |
|---|---|---|---|
| **G-KFW11-1** | `npx vitest run --project demo test/demo/scenes/cube-roll-and-prestart.test.ts` | `No test files found, exiting with code 1` · same | **RED-AS-EXPECTED** |
| **G-KFW11-2** | `… test/demo/scenes/sequence-instrument-truth.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-3** | `… test/demo/scenes/spring-derby-truth.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-4** | `… test/demo/scenes/spring-trace-truth.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-5** | `… test/demo/scenes/spring-heatmap-reversibility.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-6** | `… test/demo/scenes/starting-style-artifact.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-7** | `… test/demo/scenes/square-editor-seam.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-8** | `… test/demo/scenes/amiga-paused-pose.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-9** | `… test/demo/instrument/drag-scrub-reentrancy.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-10** | `npm run test:demo 2>&1 \| tail -3` + `npx vue-tsc … \| grep -c 'error TS'` | **39 passed (39) / 286 passed (286)**, 3.44 s · **39 / 286**, 3.26 s; vue-tsc **54 · 54** | **RED** (by the vue-tsc clause + the nine absent files) |

**Pasted transcripts (the literal form, first pass).**

```
$ npx vitest run --project demo test/demo/scenes/cube-roll-and-prestart.test.ts
 RUN  v4.1.11 /Users/mkbabb/Programming/keyframes.js

No test files found, exiting with code 1

filter:  test/demo/scenes/cube-roll-and-prestart.test.ts
projects: demo
```

```
$ npm run test:demo 2>&1 | tail -8          # run 1
(node:45773) ExperimentalWarning: localStorage is not available because --localstorage-file was not provided.

 Test Files  39 passed (39)
      Tests  286 passed (286)
   Start at  01:26:15
   Duration  3.44s (transform 8.20s, setup 0ms, import 10.32s, tests 5.30s, environment 19.96s)

$ npm run test:demo 2>&1 | tail -6          # run 2
 Test Files  39 passed (39)
      Tests  286 passed (286)
   Start at  01:26:25
   Duration  3.26s
```

All nine absent files confirmed absent twice by `[ -f … ]` before the vitest runs, and each vitest
command was itself run twice (18 invocations, one output form).

### Byte clauses — every §Gates clause, double-run

| clause | command | reading (run 1 · run 2) | spec's banked figure | delta |
|---|---|---|---|---|
| G-1 latch | `grep -c 'useEventListener(window, "keydown"' demo/scenes/cube/orbital-drag/OrbitalDrag.vue` | **1** · **1** | 1 · 1 (must reach 0) | — |
| G-1 variant | `grep -rc 'variant:' demo \| grep -v ':0'` | `CubeScene.vue:2` · `SpringScene.vue:2` (both passes) | identical | — |
| G-2 word | `grep -c 'focus-ring' demo/scenes/sequence/SequenceTarget.vue` | **0** · **0** | 0 · 0 (must reach ≥1) | — |
| G-2 css | `grep -c 'box-shadow: var(--focus-ring-shadow)' demo/scenes/sequence/SequenceTarget.css` | **1** · **1** | 1 · 1 (must reach 0) | — |
| G-3 rail | `grep -c 'class="spring-rail stage-field-x focus-ring' demo/scenes/spring/SpringTarget.vue` | **1** · **1** | 1 · 1 (recorded) | — |
| G-4 clock | `grep -c 'sampleNormalizedSpring\|resolveLinearStops' dist/keyframes.d.ts` | **0** · **0** | 0 · 0 | — |
| G-5 clamp | `grep -c 'clamp(values\[i\] ?? 0, 0, 1)' demo/scenes/spring/SpringPhysicsFacet.vue` | **1** · **1** | 1 · 1 (must reach 0) | — |
| G-6 aria | `grep -c 'aria-expanded\|aria-pressed' demo/scenes/spring/StartingStyleTarget.vue` | **0** · **0** | 0 · 0 (must reach ≥1) | — |
| G-7 pacing | `grep -c 'setTimeout(step, 520)' demo/scenes/square/useSquareKeyboard.ts` | **1** · **1** | 1 · 1 (must reach 0) | — |
| G-7 pause | `grep -rc 'animationGroup.pause()' demo \| grep -v ':0'` | `SquareScene.vue:1` · same | identical | — |
| G-7 docblock | `sed -n '29p' demo/scenes/square/useSquareDemo.ts \| grep -c ':161'` | **1** · **1** | 1 · 1 (must reach 0) | — |
| G-7 viewBox | `grep -c 'viewBox' demo/scenes/square/SquareInstrument.vue` | **0** · **0** | 0 · 0 (must STAY 0) | — |
| G-7 witness | `grep -rl 'usesDefaultRenderer\|adoptCompiled' test/demo \| wc -l` | **0** · **0** | 0 · 0 | — |
| G-9 acquire (scrub) | `grep -c 'acquireSelectSuppression()' demo/composables/useDragScrub.ts` | **1** · **1** | 1 · 1 | — |
| G-9 acquire (capture) | `grep -c 'acquireSelectSuppression()' demo/components/instrument/transport/composables/useDragCapture.ts` | **1** · **1** | 1 · 1 | — |
| G-9 pointerId | `grep -c 'pointerId' demo/composables/useDragScrub.ts` | **1** · **1** | 1 · 1 (a mention, NOT a latch) | — |

**Every banked byte clause in the spec reproduces exactly at `dd28da55`.** The frontier re-anchor
table (§B.1 rows 1–8) is therefore unmoved by KF.W10's seven commits, and §B.1's readings stand as
written.

### GREEN-BEFORE-CURE (R.2)

**NONE.** Ten gates, ten RED — `0 GREEN-BEFORE-CURE`. No packet row may be booked `LANDED-BY
<sha>` at this open.

### Dated observations beside the spec (E-3 — the spec is NOT amended)

1. **The demo project's file count is 39, not 30.** §Bounds `:143` describes the harness as
   *"measured by the thirty existing demo test files"*. ⟨cmd⟩ `find test/demo -name '*.test.ts' |
   wc -l` → **39** · **39**; and it was already 39 at the spec's own ref — ⟨cmd⟩ `git ls-tree -r
   --name-only 69095552 -- test/demo | grep -c '\.test\.ts$'` → **39**. The *substance* of the
   bounds row (the harness is present; no manifest change is owed) is unaffected; only the figure
   drifts. `G-KFW11-10`'s baseline is therefore **39 files / 286 tests**, recorded here as the
   open figure the close re-measures against.
2. **`dist/keyframes.d.ts` exists** (224,427 B, 2026-09-19 00:17) and carries neither
   `sampleNormalizedSpring` nor `resolveLinearStops` — OP-4's **0** is a genuine absence of the
   export, not an absence of the artefact. `.e` re-measures at its own open.

### Ledger commit provenance — a disclosed cross-hunk contamination (2026-09-19 01:32 EDT)

This seat's two LEDGER edits (the KF.W11 status-cell clause and the event line) were written to the
working tree at 01:32 and **swept into a sibling seat's pathspec commit on the same file before this
seat could commit them**: ⟨cmd⟩ `git log --oneline -1` → **`ea67828e` docs(X·exec/LEDGER): X.P.W3
round 6 CLOSED (VERIFY-ONLY)…** (Track D, 01:32:59), and ⟨cmd⟩ `git show ea67828e --
docs/tranches/X/execution/LEDGER.md | grep -c "KF.W11 OPEN ATTEMPT"` → **1**. **Nothing is lost and
nothing is wrong at the bytes** — ⟨cmd⟩ `git show HEAD:docs/tranches/X/execution/LEDGER.md | sed -n
'56p'` carries this wave's BLOCKED-ON cell verbatim, ⟨cmd⟩ `… | tail -1` carries the event line, and
⟨cmd⟩ `git diff --stat -- docs/tranches/X/execution/LEDGER.md` → **0** (no residue). Recorded here
because the LEDGER is one file four tracks write concurrently: **a pathspec on one's own commit does
not protect a shared file from a sibling's pathspec on the same path**, and the X-W0 guard (*"pathspec
on the `commit`, never only on a preceding `add`"*) addresses the other direction only. This seat's
own commit therefore carries `execution/B/KF-W11.md` alone.

---

## Unit plan — 10 units, 4 phases, banked for dispatch

**Not dispatched at this sitting** (OP-0 RED). Model tiering per M-12 TRI-FOLD and the spec's own
§Execution-shape sentence: *"the three decision-shaped units (`.d`'s canonical domain, `.e`'s N-1
fork, `.f`'s field encoding) are Fable-worker ∥ Opus-worker → fresh-Fable arbiter; the
roster-and-precedent units are Opus solo."*

**Ordered groups (spec phases, packed to the owner's 2-concurrent dispatch cap; no two concurrent
units share a modify path)**:

| group | units | why it is lawful |
|---|---|---|
| 1 | `.a` ∥ `.b` | phase 1; directory-disjoint (`cube/` + the 2-line `SpringScene.vue` carve · `square/` + the `useKeyframeOps.ts` carve) |
| 2 | `.d` | phase 1 remainder (sequence); first writer of `SequenceScrubber.vue` |
| 3 | `.c` ∥ `.h` | phase 2; `.h` after `.b` (§Seq 7, met in group 1); `spring/` vs `amiga/` directory-disjoint; `.c` inherits `.a`'s landed `variant:` carve (§Seq 6) |
| 4 | `.g` | phase 2 remainder — placed AFTER `.c` so KF-SST-31's `useSpringDemo.ts` byte is landed, never a parallel write (§Bounds `:120`) |
| 5 | `.e` ∥ `.f` | phase 3; `.e` after `.c`'s M-3 commit (§Seq 2); `SpringTrace.vue` vs `SpringHeatmap.vue`+`SpringPhysicsFacet.vue` |
| 6 | `.i` | phase 3 remainder — after `.d` (§Seq 3, same file) and after the KF.W7 KEEP verdict (§Seq 4, met) |
| 7 | `.j` | phase 4, close, serial, last |

### Per-unit dispatch cards

**`.a` — the cube packet · Opus · phase 1.** Spec: §Agent Units `:219-223` · §Carry P1 `:163-168` ·
§Bounds rows `:96-103` · §Gates G-KFW11-1 `:289` · §Commit plan 1 `:376`.
Writable (kf): `demo/scenes/cube/CubeTarget.vue` · `CubeTarget.css` · `CubeScene.vue` ·
`matrix-editor/{MatrixEditor.vue,transformMath.ts,useTransformState.ts}` ·
`orbital-drag/OrbitalDrag.vue` · `orbital-drag/{composables/**,quaternionEuler.ts,types.ts,index.ts}`
(carve) · `{useCubeDemo.ts,useCubeRelit.ts,cubeTransformStore.ts,cubeKeys.ts}` (carve) ·
`demo/scenes/spring/SpringScene.vue` **two `variant:` lines `:202`/`:225` ONLY** ·
`test/demo/scenes/cube-roll-and-prestart.test.ts` (create) · `test/demo/scenes/cube-scene.test.ts`
(extend) · `demo/DESIGN.md` (prose only). Writable (value.js): this record (receipt append) ·
`docs/tranches/X/keyframes/evidence/W11/**`.
Gate: **G-KFW11-1**. Locks: the four-site `variant:` family is **ONE commit, MUST NOT SPLIT**
(CubeScene ×2 + SpringScene ×2); ARB-1 **delete arm only** (the `headerLeft` 'fill' arm is a TRAP);
LAW A census §B.3(3) before the latch deletion; glass-producer rows → SS-6, never demo-side;
the OD latch-family sha is **KF.W12 AXISLINE-UNIT's open point** and must be printed.
Brief: re-resolve every P1 anchor at the open sha; land CubeTarget **#53's demo half first** (the
`Matrix3dCall` serialized before `transformTargetsStyle`), then the Roll stack (#1·#2·#5·#15·#20·#38·#49),
the latch/pointer seam, lighting truth #4/#16/#36/#56 **as a graph-attitude parameter** (a bare
`0.6 → −0.6` fails the gate); then CubeScene's matrix-editor family with **ME-30/31 as ONE
sync-topology spec** and **ME-42's edit representation stated in the receipt** (a display-only cure
is the defect), state/identity, the four-site glass-conformance commit; then OrbitalDrag's four
families, the latch family becoming **KF-AX-1's registry adoption + blur clear + exposed `reset`**.
Declare #7's library half to KF.W5 by id; never write `src/**` or `CubeAxisLines.vue`.

**`.b` — the square packet · Opus · phase 1.** Spec: §Agent Units `:225-229` · §Carry P7 `:199-203`
· §Bounds rows `:121-124` · §Gates G-KFW11-7 `:301` · §Commit plan 2 `:377`.
Writable (kf): `demo/scenes/square/SquareScene.vue` · `SquareScene.css` · `SquareInstrument.vue` ·
`{useSquareDemo.ts,useSquareKeyboard.ts,useSquareTumble.ts,squareKeys.ts}` ·
`demo/components/instrument/keyframes/composables/useKeyframeOps.ts` **(`updateFromString` hunk
`:58-69` ONLY)** · `test/demo/scenes/square-editor-seam.test.ts` (create) ·
`test/demo/scenes/square-scene.test.ts` (extend) · `demo/DESIGN.md` (prose). Plus the value.js
receipt/evidence rows.
Gate: **G-KFW11-7**. Locks: tether family D-1+D-6+D-16+N-SQ-4 **MUST NOT SPLIT** and **never cures
by adding a `viewBox`** (fails by construction); MISS-3's settle-paced tour **and its assertion in
ONE commit** (travelling lock 3); OP-7 gates a named subset of SquareInstrument — state which rows
**before** spending any cure, delete no layer un-ruled; the L-2 sha is **KF.W12 KFED-UNIT's open
point**.
Brief: land L-2's demo half (`updateFromString` re-supplies the receiver's renderer;
`usesDefaultRenderer(frame.transform)` is the oracle, read-only from `src/`), the `RAFPlayback`
degrade-not-wedge rider, the playback-authority packet (the sole `animationGroup.pause()` goes
behind the machine, 1 → 0), the colour packet **with the `:29` docblock's `:161` → `:163`
correction**, the instrument packet after OP-3's re-derivation, the input/a11y packet (MISS-1 via
`7225cdd1`'s shape — **read, never copied**; the bare `focus-ring` at `:46`), geometry D-8, the
hygiene tail, and MISS-3 last. The library half of L-2 is DECLARED to KF.W5/KF.W8, never written.

**`.d` — the sequence packet · FABLE (tri-fold: Fable-worker ∥ Opus-worker → fresh-Fable arbiter;
the canonical-domain decision) · phase 1.** Spec: §Agent Units `:237-241` · §Carry P2 `:170-178` ·
§Bounds rows `:104-110` · §Gates G-KFW11-2 `:291` · §Commit plan 3 `:378`.
Writable (kf): `demo/scenes/sequence/SequenceScene.vue` · `SequenceTarget.vue` ·
`SequenceTarget.css` · `SequenceAxis.vue` · `SequencePlayhead.vue` ·
`{useSequenceDemo.ts,useSequenceInstrument.ts,useTypedTrigger.ts,sequenceKeys.ts}` (carve) ·
`SequenceScrubber.vue` **(first writer; `.i` opens on this unit's sha)** ·
`test/demo/scenes/sequence-instrument-truth.test.ts` (create) ·
`test/demo/scenes/sequence-scene.test.ts` + `test/demo/instrument/sequence-scrubber-mount.test.ts`
(extend, never weaken) · `demo/DESIGN.md` (prose). Plus receipt/evidence.
Gate: **G-KFW11-2**. Locks: **the decision precedes the patch** (§Seq 8) — M-10's canonical-domain
spec is **written in the receipt before the family's first commit**, one spec not four patches;
K-25 (N-1's domain cure and N-2's recompute cure land against each other); **N-14 sequenced after
N-1**; **ST-1 = one word + the `SequenceTarget.css:175-178` deletion in ONE sha** (L-9) with LAW A
census §B.3(1); geometry only after OP-3.
Brief: write the canonical-domain decision first; then the loop-seam commit (one
`SweepSceneOptions`), SC-2's expose-or-delete decision, the reel packet, the geometry commit, ST-4's
one binding (`:loading="demo.isReeling.value"` — three rows for one line), ST-1, the N-14 valuetext,
the scrubber's single `applyScrub(p, {gesture})` spec, the prose-truth sweep, store hygiene, the
Axis trio + `--tick-count`. KF.W9 holds ST-1's before/after witnesses and lands no cure. Print the
sha `.i` opens on.

**`.c` — the spring packet · Opus · phase 2.** Spec: §Agent Units `:231-235` · §Carry P3 `:180-185`
· §Bounds rows `:115-117` · §Gates G-KFW11-3 `:293` · §Commit plan 4 `:379`.
Writable (kf): `demo/scenes/spring/SpringScene.vue` (the rest — the two `variant:` lines arrive
landed from `.a`, never re-touched) · `SpringTarget.vue` ·
`{useSpringDerby.ts,useSpringDemo.ts,useSpringHotPath.ts,useCompiledEntry.ts,useSpringLinearStops.ts,springPresets.ts,springKeys.ts}`
(carve) · `test/demo/scenes/spring-derby-truth.test.ts` (create). **READ-ONLY witness**:
`useSpringKeyframesEditor.ts` (KF.W12's seam — measure the mount, never cure it). Plus
receipt/evidence.
Gate: **G-KFW11-3** (the four born-RED cases a–d). Locks: **M-4→M-3 — the parser, both dead guards
and the regex die together**, LAW A census §B.3(2) pasted first; comment-stated invariants are test
obligations; glass-producer → SS-6; the M-3 sha is **`.e`'s open point**; the M-5 race halts and
escalates at the third reproduction without a deterministic harness (§3a).
Brief: C-1 first (the contract head sizes the rest), then M-2/D-2/D-7 with the six prose
corrections re-anchored (clamp sites re-resolved — they read `:210`/`:222` today), M-4→M-3, M-5
(clearTimeout + `derbyActive` gate), N-1, the one gesture spec, the a11y one-edit family including
`SpringTarget.vue:63`'s bare `focus-ring`, the flag/register passes, the hygiene tail; then
SpringScene's KF-SS-1/-2/-3/-8(scene half)/-10(witness) and the sweep. Name KF-SS-8's ribbon half
to KF.W13 and KF-SS-3's API signal to KF.W5 in the receipt; write no `src/**` byte.

**`.g` — spring-artifact-truth · Opus · phase 2 (placed after `.c`).** Spec: §Agent Units `:255-259`
· §Carry P6 `:195-197` · §Bounds row `:120` · §Gates G-KFW11-6 `:299` · §Commit plan 5 `:380`.
Writable (kf): `demo/scenes/spring/StartingStyleTarget.vue` ·
`test/demo/scenes/starting-style-artifact.test.ts` (create). Plus receipt/evidence. **Never writes
`useSpringDemo.ts`** — KF-SST-31's byte there is `.c`'s; if unlanded at this unit's open, the row is
named `complete_with_misses`.
Gate: **G-KFW11-6**. Locks: OP-5 (KF-ES-2 consumed by reference; witness-only if unlanded).
Brief: the artifact core KF-SST-3·4·5·9 (+11·12·26) as ONE spec — one source of truth for the
endpoints, true polarity/duration, a case-preserving register (rendered ≡ copied), a
readable+reachable viewport, one honest state model with a refusal surface; then the verb/state
pair KF-SST-1·6 (the survivor gets `aria-expanded`/`aria-pressed` — 0 today), KF-SST-2, -10, -31,
the prose sweep, the hygiene tail.

**`.h` — the amiga packet · Opus · phase 2 (after `.b`).** Spec: §Agent Units `:261-265` · §Carry P8
`:205-207` · §Bounds rows `:125-126` · §Gates G-KFW11-8 `:303` · §Commit plan 5 `:380`.
Writable (kf): `demo/scenes/amiga/AmigaScene.vue` ·
`{useAmigaDemo.ts,useAmigaThree.ts,useSphereSpin.ts,utils.ts,amigaKeys.ts}` (carve) ·
`test/demo/scenes/amiga-paused-pose.test.ts` (create) ·
`test/demo/scenes/amiga-sphere-spin.test.ts` (extend, never weaken — 5 `it(` today). Plus
receipt/evidence.
Gate: **G-KFW11-8**. Locks: **§Seq 7 — D-2's shared idiom is a BORROWING from SquareScene and is
verified against `.b`'s LANDED cure, never against the bank's description of it**; the roster commit
names every P8 id LANDED or KILLED-with-rationale.
Brief: D-1 first (BLOCKER: `rendered` is written only under `playing`; nothing reads `pose` outside
that branch and the gate is doubled — `onFrame` false at rest, `setProgress` never marks dirty);
then L-B1, D-2's borrow, D-3+C-18+M-3, the L-M/C pairs, MISSED-A/C/E/F/G, C-16/-17/-20/-10/-5,
L-m3/L-m6, INFO.

**`.e` — spring-plot · FABLE (tri-fold; the N-1 fork is a decision seat) · phase 3, after `.c`'s M-3
commit.** Spec: §Agent Units `:243-247` · §Carry P4 `:187-189` · §Bounds row `:118` · §Gates
G-KFW11-4 `:295` · §Commit plan 5 `:380`.
Writable (kf): `demo/scenes/spring/SpringTrace.vue` ·
`test/demo/scenes/spring-trace-truth.test.ts` (create). Plus receipt/evidence.
Gate: **G-KFW11-4**. Locks: the instrument-truth core **D-1 + N-1 + N-2 + C-2/L-3 is ONE family,
MUST NOT SPLIT**, with **the N-1 fork decided FIRST, in the receipt** (drop the prop, or label x in
ms and discharge D-6), then the draw route per **OP-4 re-measured at this unit's own clock** (the
anchor-hoist minimum unless the export has landed).
Brief: decide, then draw; parser posture D-12/L-6/C-4 + the filter cell, L-5's bindings, D-11's
label, **L-10's extraction + its unit test against the engine's own samples** inside the same
family; then mark-design D-3+D-4+N-3 (neutral reference vocabulary, EasingTarget precedent) +
D-6·D-7·D-13; the type/register pass; N-5; L-8; L-14; D-16 recorded clean-by-construction so no
sweep manufactures work.

**`.f` — spring-physics-facet · FABLE (tri-fold; the field-encoding design decision) · phase 3.**
Spec: §Agent Units `:249-253` · §Carry P5 `:191-193` · §Bounds row `:119` · §Gates G-KFW11-5 `:297`
· §Commit plan 5 `:380`.
Writable (kf): `demo/scenes/spring/SpringHeatmap.vue` · `SpringPhysicsFacet.vue` ·
`test/demo/scenes/spring-heatmap-reversibility.test.ts` (create). Plus receipt/evidence.
Gate: **G-KFW11-5**. Locks: **the decision precedes the patch** — what the field encodes, on which
axes, at what scale, with what legend, written before the family opens; **SPF-13 is spent ONLY once
KF.W12's OPTIONS-UNIT has recorded KF-CO-47's decision**, else named `complete_with_misses`; SPF-4's
producer constraint rides **SS-6** as a rider on KF-ET-4's letter — never a demo-side workaround.
Brief: the instrument-truth core D-B1·D-B2·D-M8·D-M1; the input-integrity core (one lattice, one
gesture/focus spec, one honest published tolerance); the two-`defineModel` contract; N-SH-3; the
ramp redesign; **SPF-3's overshoot cure** (remap `[-0.25,1.25]→[0,1]` or a stated-geometry headroom
cap — the four presets' analytic peaks are 1.005 / 1.068 / 1.205 / 1.000; L's cure #2 is KILLED by
K-10); SPF-5's mix (4.464 FAIL → AA); SPF-7's two `!important` deletions; L-m-5's three born-RED
tests.

**`.i` — the drag-seam packet · Opus · phase 3, after `.d`.** Spec: §Agent Units `:267-271` · §Carry
P9 `:209-211` · §Bounds rows `:110-114` · §Gates G-KFW11-9 `:305` · §Commit plan 6 `:381`.
Writable (kf): `demo/composables/useDragScrub.ts` ·
`demo/components/instrument/transport/composables/useDragCapture.ts` ·
`demo/utils/gestureSelectSuppression.ts` (carve, only if the guard belongs at the token) ·
`demo/components/playback/AnimationVisualizer.vue` **(KF-AV-16's machine-seam carve ONLY)** ·
`demo/scenes/sequence/SequenceScrubber.vue` (the seam rows, on `.d`'s sha) ·
`test/demo/instrument/drag-scrub-reentrancy.test.ts` (create). Plus receipt/evidence.
Gate: **G-KFW11-9**. Locks: **KF-SCR-1 + L·D-1 + KF-AV-15 = ONE guard family in BOTH composables,
ONE commit, MUST NOT SPLIT** (two guards, or one in only one composable, is L-18 base (iii));
`useDragCapture`'s **exported surface is unchanged** — `PlaybackRibbon.vue` is KF.W13's consumer and
is never edited here; the KF-AV-28 KEEP verdict is **STATED before the first byte** and the unit
emits **zero** SWAP-discharge receipts (the discharge alphabet §Excluded names has no members, and
this record must never spell that string literally — **G-KFW11-10 greps this very file for it and
requires 0**; every seat appending here states the emptiness in words, as this line does).
Brief: state the verdict; land the re-entrancy guard + `pointerId` latch + scope-disposal release +
the corrected "Nesting-safe" docblock in `useDragScrub.ts` and the same family in
`useDragCapture.ts` (whose `:20` `tryOnScopeDispose` claim is false against installed @vueuse 14) in
ONE commit; then C·C-1 ≡ KF-AV-16 as ONE throttle-vs-decouple decision at the machine seam covering
pointer **and** coast; then KF-SCR-5's dead-API/prose cleanup on the same seam edit; then the
born-RED two-pointer test over both composables (`activeGestureCount` exactly 1 on the second
`pointerdown`, 0 on the last `pointerup`, 0 on unmount mid-drag, ≤1 machine dispatch per frame at
240 Hz).

**`.j` — close · Opus · phase 4, serial, last.** Spec: §Agent Units `:273-277` · §Gates G-KFW11-10
`:307` · §Commit plan 7 `:382` · §Format/Verification `:384-386`.
Writable (value.js only): `docs/tranches/X/execution/B/KF-W11.md` ·
`docs/tranches/X/execution/LEDGER.md` (this wave's cells + appended event lines ONLY) ·
`docs/tranches/V/coordination/INBOX.md` + the SS-6 accretion register (COHESION §4a) ·
`docs/tranches/X/keyframes/evidence/W11/**`.
Gate: **G-KFW11-10** + a re-run of all ten at this seat's own clock, double-run.
Brief: re-run every gate; audit each commit sha against §Bounds by `git show --stat`; write the BH
relay entries for every producer row surfaced (CubeScene D-2/C-3's `variant`, SPF-4's
`role`/`aria-pressed` filter, any Boolean-cast `default: undefined` ask) into the SS-6 accretion
register; run the E13 four-path sweep and append the sweep line; move the LEDGER cells and append
the event line; list residuals and escalations; **state positively that zero SWAP-discharge receipts
exist**; `npm run check`, `npm run test:demo` and the §Format eslint scope at close.

### Standing law carried by every unit (spec `:279-281`)

CRASH-RECOVERY first · the spec GOVERNS (no quick fix, no workaround, no masking fallback — no
`try/catch` around a defect, no `test.skip`, no allowlist, no copied producer selector, no
`node_modules` patch; each a HIGH defect) · idiomatic root-cause cures · pathspec commits **on the
commit itself**, one per meaning, declared families unsplit · E-3 · WRITE-THEN-MEASURE, double-run ·
SELF-COUNT · quote-by-command · sibling trees READ-ONLY, glass-ui READ-ONLY always (producer rows →
SS-6) · no stash / `reset --hard` / force-push · E13 · probe parsimony (§5.2) · `scripts/dev/dev.sh`
never staged · LEDGER edited only by minimal in-place cell replacement or appended lines · **any
write outside §Bounds is an ESCALATION returned, never a write** (notably: every `src/**` byte, and
`CubeAxisLines.vue` / `PlaybackRibbon.vue` / `TimelineTrack.vue` / `KeyframeTimeline.vue`).

### Worktree plan (spec `:153-155`)

Parallel units run in sibling worktrees `keyframes-kfw11-<unit>` (absolute path stated in each
dispatch), each on its own branch, merged to `master` by the orchestrator in phase order; serial
dependents open on the merged sha named in the predecessor's receipt; `.j` runs on `master`. No
Cargo.

---

# SECOND SITTING — 2026-09-19, the §0u re-open. **STATUS: OPEN.**

*(Dated beside, E-3. Nothing above this line is altered: the first sitting's measurements, its
BLOCKED-ON verdict and ESCALATION KF11-E1 stand as that seat wrote them. What changed is not a
measurement but a RULING — `COHESION.md §0u` (2026-09-19, `085b2121`) answered KF11-E1 with
**disposition (b)**, and `KF-W11.md`'s own **ADDENDUM 2026-09-19** (`:408-417`, the same commit)
carries it into the spec as a dated addendum-beside. This seat re-measures everything at its own
clock, double-run, and opens the wave.)*

**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`, VERIFY-AND-BANK only — **no `§Bounds` product byte
was written by this seat**; the only bytes it wrote are this section, the LEDGER's own cells, its
event line and the INBOX sweep line.
**Substrate, named never assumed**: ⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js rev-parse
--short HEAD` → **`dd28da55`**; ⟨cmd⟩ `… rev-parse --short origin/master` → **`dd28da55`** (local
== remote; unmoved since the first sitting).
**Spec of record, E-3 integrity**: ⟨cmd⟩ `shasum -a 256 docs/tranches/X/keyframes/waves/KF-W11.md`
→ `55ec4fd2…cbda2`; ⟨cmd⟩ `git log --oneline -1 -- …/KF-W11.md` → **`085b2121`** (the §0u commit).
⟨cmd⟩ `git show HEAD:…/KF-W11.md | grep -c "KF.W11.r"` → **2** — the addendum is in the committed
bytes, appended beside the authored spec, **not patched into it**: §0–§Provenance are byte-identical
to the fold seat's file and the new material lives entirely below `## ADDENDUM 2026-09-19`.

## Crash-recovery (standing law, first act of this sitting)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → **2 untracked rows**,
both value.js-delivered mail packets (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-…`,
`…-2026-07-27-…`) — **outside every KF.W11 writable path; not this seat's, not touched**.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → **11 modified rows**, none
inside this seat's writable set: eight `demo/**` rows + `eslint.config.js` (a sibling track's
working tree), `docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling seat's) and
`scripts/dev/dev.sh` (**unowned, never staged, never touched**).
⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/B/KF-W11.md
docs/tranches/X/execution/LEDGER.md docs/tranches/V/coordination/INBOX.md` → **empty** — **zero
inherited hunks inside this seat's own set; nothing to finish, nothing to rewrite.**

## The ruling that opened the wave — OP-0 as a RATCHET (COHESION §0u)

KF11-E1 asked which reading of *"G-KFW4-1 lands"* governs. **§0u rules (b), the chassis-landed
reading**, and states the mechanism in three parts, quoted:

> **(1)** The precondition each of the three waves checks at open is the **chassis**: `vue-tsc`
> wired as a blocking leg of `npm run check` on the merge path (G-KFW4-1's WIRED half, GREEN since
> KF.W4). **(2)** Each wave banks the count at its open and **may not raise it**; every unit
> **zeroes the diagnostics inside its own §Bounds rows** as part of the cure that owns them (a
> diagnostic that is the type-level shadow of a named cure falls WITH that cure, never before it by
> a cast or a suppression — `@ts-expect-error`, `as`, and `// eslint-disable` are REFUSED as cures).
> **(3)** **The count reads 0 at KF.W13's close**, which asserts it double-run.

**The chassis, measured at this seat**: ⟨cmd⟩ `node -e "…package.json.scripts.check"` →
`vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure`
— **`vue-tsc` is the FIRST and blocking leg**; a `.vue` file can fail the build. **OP-0's WIRED half
is GREEN. THE WAVE OPENS.**

**The banked count (the ratchet's floor)**: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 |
grep -c 'error TS'` → **54** · **54** (double-run, at `dd28da55`, exit 2 both passes). **This figure
may not rise.** `.j` re-reads it at close and the close row states the delta against 54.

## Preconditions — all eight rows (the spec's seven + `.r`'s R-C3), re-measured at this seat

| # | precondition | this seat's measurement | verdict |
|---|---|---|---|
| **OP-0** | `G-KFW4-1` — **read as a RATCHET per §0u** | chassis WIRED (the `npm run check` string above, `vue-tsc` leg 1); count **54 · 54** banked | **MET (chassis) — the wave opens; the count is a ratchet, not a threshold** |
| **OP-1** | KF.W7's per-surface SWAP verdict (`SequenceScrubber` + `AnimationVisualizer`, KF-AV-28) | ⟨cmd⟩ `git cat-file -t 4c03ceda` → `commit`, 2026-09-18; LEDGER KF.W7 row → **`CLOSED 2026-09-17`**; `execution/B/KF-W7.md:510` *"six surfaces, six KEEP-BESPOKE, ZERO SWAP"* | **MET** — packet UN-GATED; the discharge alphabet has **zero** members (stated in words; never spelled) |
| **OP-2** | the `grabDx` precedent (SquareScene MISS-1) | ⟨cmd⟩ `git -C ../keyframes.js cat-file -t 7225cdd1` → `commit`; subject *"a grab is not a teleport…"*, 2026-09-18 | **MET AS LANDED CODE** — read as precedent, never copied |
| **OP-3** | D-19 geometry re-derivation before any geometry cure | per-unit act at each unit's open sha (P1 latch seam · P2 geometry · P7 tether) | **OPEN BY DESIGN** — not an open-blocker |
| **OP-4** | the spring-plot draw route's export decision | ⟨cmd⟩ `grep -c 'sampleNormalizedSpring\|resolveLinearStops' dist/keyframes.d.ts` → **0** · **0**; artefact PRESENT (224,427 B, 2026-09-19 00:17) | **UNLANDED, as the spec measured** — `.e` takes the anchor-hoist minimum, re-measured at its own open |
| **OP-5** | KF-ES-2's facility-honesty spec | consumed by reference; not landed at this clock | **NOT AN OPEN-BLOCKER** — `.c`/`.g` land KF-SS-10 / KF-SST-10 witness-only |
| **OP-6** | the transport/ribbon packet (KF.W13) | KF.W13 = `BLOCKED-ON OP-0` at its own 2026-09-19 sitting; the seam is declared at both ends | **CROSS-EDGE, not a block** |
| **OP-7** | owner-decision gate D-2 (SquareInstrument layer sign-off) | ⟨cmd⟩ read `COHESION.md` §0i–§0v to file end (1,562 L): **no ruling exists**; the one `SquareInstrument` hit is the §0d register row 6, a homing row | **OWNER-UNRULED** — gates a named subset of `.b`, not the wave |
| **R-C3** | the kf lockfile (`.r` act 1) | ⟨cmd⟩ `grep -c '@vue/test-utils' package-lock.json` → **0**; manifest `devDependencies["@vue/test-utils"]` → `^2.5.1` | **BORN-RED, as §0u measured** — `.r`'s first act |

**Ledger-side reading of the spec's `Opens after` names**, each read in `execution/LEDGER.md`
Track B: **KF.W0 CLOSED 2026-09-17** · **KF.W4 CLOSED 2026-09-17 (honest-RED)** · **KF.W6 CLOSED
2026-09-17** · **KF.W7 CLOSED 2026-09-17** · **KF.W8 CLOSED 2026-09-17**. **Every `Opens after`
condition is met at the bytes AND in the ledger.**

## E13 Step-0 — the four-path mail sweep, re-run at this seat's clock

Swept read-only, compared against **every row** of `docs/tranches/V/coordination/INBOX.md`;
classification taken from each row's **Status cell by position**, never from a bare
`grep -i unread`; `INBOX.md` **self-excluded** (SELF-COUNT law).

1. **`docs/tranches/V/` + `V/coordination/`** — newest five in `V/coordination/` = `INBOX.md`
   (self) + the four 2026-09-18 `*-inbox-2026-09-18-value-4.1-*` letters, **ours and rowed**
   (O-34..O-38 tail). `V/` root carries specs, not letters.
2. **`../glass-ui/docs/tranches/BK/coordination/`** — **BK re-confirmed the newest tranche dir**:
   ⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ | head -4` → `BK/` · `BJ/` · `BI/` ·
   `IOS27-MICRO/`. Newest letter = `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35,
   rowed** (`INBOX.md:115`).
3. **`../keyframes.js/docs/tranches/V/coordination/`** — newest inbound-grammar file =
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21, ours, delivered**;
   `INBOUND-LEDGER.md` is keyframes' own ledger, not a letter.
4. **`../sci-report/atlas/docs/tranches/P/coordination/`** — newest =
   `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12, ours**; path UNMOVED.

**Result**: **ZERO unrowed letters addressed to value.js · ZERO new `I-n` minted (register tail
stays I-35 / O-38) · ZERO UNREAD Status cells** — ⟨cmd⟩ the positional Status-cell scan → **0** ·
**0** (double-run) over **78** rows (⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **78**).
A dated sweep line is appended at `INBOX.md`'s end by this sitting.

## Baseline — the ten born-RED gates, READ-ONLY at this seat's clock, every figure double-run

**SELF-COUNT (LAW D(3))**: the spec's §Gates roster is ⟨cmd⟩ `grep -c '^\*\*G-KFW11-'
keyframes/waves/KF-W11.md` → **10**; ten rows follow. All commands run from
`/Users/mkbabb/Programming/keyframes.js` at `dd28da55`.

| gate | command (spec's own) | this seat's reading (run 1 · run 2) | verdict |
|---|---|---|---|
| **G-KFW11-1** | `npx vitest run --project demo test/demo/scenes/cube-roll-and-prestart.test.ts` | `No test files found, exiting with code 1` · same | **RED-AS-EXPECTED** |
| **G-KFW11-2** | `… test/demo/scenes/sequence-instrument-truth.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-3** | `… test/demo/scenes/spring-derby-truth.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-4** | `… test/demo/scenes/spring-trace-truth.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-5** | `… test/demo/scenes/spring-heatmap-reversibility.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-6** | `… test/demo/scenes/starting-style-artifact.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-7** | `… test/demo/scenes/square-editor-seam.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-8** | `… test/demo/scenes/amiga-paused-pose.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-9** | `… test/demo/instrument/drag-scrub-reentrancy.test.ts` | `No test files found…` · same | **RED-AS-EXPECTED** |
| **G-KFW11-10** | `npm run test:demo 2>&1 \| tail -3` + the vue-tsc count + the self-trip grep | **39 passed (39) / 286 passed (286)**, 3.41 s · **39 / 286**, 3.23 s; vue-tsc **54 · 54**; self-trip grep **0** · **0** | **RED** (by the vue-tsc clause + the nine absent files) |

All nine absent files confirmed absent twice by `[ -f … ]` before the vitest runs (⟨cmd⟩ the
nine-path loop → `ABSENT` ×9, twice), and each vitest command was itself run twice (**18
invocations, one output form**).

**Pasted transcripts (the literal form).**

```
$ npx vitest run --project demo test/demo/scenes/cube-roll-and-prestart.test.ts   # run 1 and run 2
 RUN  v4.1.11 /Users/mkbabb/Programming/keyframes.js

No test files found, exiting with code 1

filter:  test/demo/scenes/cube-roll-and-prestart.test.ts
projects: demo
```

```
$ npm run test:demo 2>&1 | tail -6          # run 1
 Test Files  39 passed (39)
      Tests  286 passed (286)
   Start at  02:54:04
   Duration  3.41s (transform 8.06s, setup 0ms, import 10.99s, tests 5.09s, environment 19.27s)

$ npm run test:demo 2>&1 | tail -6          # run 2
 Test Files  39 passed (39)
      Tests  286 passed (286)
   Start at  02:54:08
   Duration  3.23s (transform 7.57s, setup 0ms, import 9.90s, tests 5.20s, environment 16.01s)
```

### Byte clauses — every §Gates clause, double-run at this seat

| clause | command | reading (run 1 · run 2) | spec's banked figure | delta |
|---|---|---|---|---|
| G-1 latch | `grep -c 'useEventListener(window, "keydown"' demo/scenes/cube/orbital-drag/OrbitalDrag.vue` | **1** · **1** | 1 · 1 (must reach 0) | — |
| G-1 variant | `grep -rc 'variant:' demo \| grep -v ':0'` | `CubeScene.vue:2` · `SpringScene.vue:2` (both passes) | identical | — |
| G-2 word | `grep -c 'focus-ring' demo/scenes/sequence/SequenceTarget.vue` | **0** · **0** | 0 · 0 (must reach ≥1) | — |
| G-2 css | `grep -c 'box-shadow: var(--focus-ring-shadow)' demo/scenes/sequence/SequenceTarget.css` | **1** · **1** | 1 · 1 (must reach 0) | — |
| G-3 rail | `grep -c 'class="spring-rail stage-field-x focus-ring' demo/scenes/spring/SpringTarget.vue` | **1** · **1** | 1 · 1 (recorded) | — |
| G-4 clock | `grep -c 'sampleNormalizedSpring\|resolveLinearStops' dist/keyframes.d.ts` | **0** · **0** | 0 · 0 | — |
| G-5 clamp | `grep -c 'clamp(values\[i\] ?? 0, 0, 1)' demo/scenes/spring/SpringPhysicsFacet.vue` | **1** · **1** | 1 · 1 (must reach 0) | — |
| G-6 aria | `grep -c 'aria-expanded\|aria-pressed' demo/scenes/spring/StartingStyleTarget.vue` | **0** · **0** | 0 · 0 (must reach ≥1) | — |
| G-7 pacing | `grep -c 'setTimeout(step, 520)' demo/scenes/square/useSquareKeyboard.ts` | **1** · **1** | 1 · 1 (must reach 0) | — |
| G-7 pause | `grep -rc 'animationGroup.pause()' demo \| grep -v ':0'` | `SquareScene.vue:1` · same | identical | — |
| G-7 docblock | `sed -n '29p' demo/scenes/square/useSquareDemo.ts \| grep -c ':161'` | **1** · **1** | 1 · 1 (must reach 0) | — |
| G-7 viewBox | `grep -c 'viewBox' demo/scenes/square/SquareInstrument.vue` | **0** · **0** | 0 · 0 (must STAY 0) | — |
| G-7 witness | `grep -rl 'usesDefaultRenderer\|adoptCompiled' test/demo \| wc -l` | **0** · **0** | 0 · 0 | — |
| G-9 acquire (scrub) | `grep -c 'acquireSelectSuppression()' demo/composables/useDragScrub.ts` | **1** · **1** | 1 · 1 | — |
| G-9 acquire (capture) | `grep -c 'acquireSelectSuppression()' …/transport/composables/useDragCapture.ts` | **1** · **1** | 1 · 1 | — |
| G-9 pointerId | `grep -c 'pointerId' demo/composables/useDragScrub.ts` | **1** · **1** | 1 · 1 (a mention, NOT a latch) | — |
| G-10 self-trip | `grep -c` of **the SWAP-discharge receipt string G-KFW11-10 forbids** over `execution/B/KF-W11.md` — **the pattern is stated in words, never spelled here, because the gate greps this very file** (the first sitting's `0a8191d6` cleared exactly this trap) | **0** · **0** | 0 | — |

**Every banked byte clause in the spec reproduces exactly at `dd28da55`, at a second seat's clock,
seventeen for seventeen.** The §B.1 frontier re-anchor table (rows 1–8) stands as written.

### GREEN-BEFORE-CURE (R.2)

**NONE.** Ten gates, ten RED — `0 GREEN-BEFORE-CURE`. No packet row may be booked `LANDED-BY <sha>`
at this open.

## The §0u enumeration — every `vue-tsc` diagnostic, homed by wave (seat 0's own act)

§0u: *"Seat 0 enumerates at open every diagnostic outside the W11–W13 §Bounds rows, by file."*
Decomposed from the settled bytes of both passes (identical file histograms):

| home | files (diagnostic count) | n |
|---|---|---|
| **KF.W11 §Bounds** | `OrbitalDrag.vue` **24** (`.a`) · `matrix-editor/useTransformState.ts` **2** (`.a`) · `matrix-editor/MatrixEditor.vue` **1** (`.a`) · `CubeScene.vue` **1** (`.a`) · `spring/useSpringDemo.ts` **1** (`.c`) | **29** |
| **KF.W12 §B.2** | `useKeyframeOps.ts(80,13)` **1** (W12 `.c`; **outside** W11 `.b`'s `:58-69` carve) · `KeyframesEditor.vue` **2** · `KeyframesStringControls.vue` **2** · `useTimingFunctionEditor.ts` **3** · `ChannelControls.vue` **1** · `ChannelOptions.vue` **1** · `LayerConfigPanel.vue` **1** · `TimingFunctionPanel.vue` **1** · `EasingSidebar.vue(27,14)` **1** (inside the two-call-site carve) | **13** |
| **KF.W13 §B.2** | `MbabbMenu.vue(208,12)/(208,36)` **2** · `TransportDock.vue(276,7)/(366,9)` **2** (+ `ChannelOptions.vue` again on W13's declared KF-CO-15 carve — counted once, at W12) | **4** |
| **UNOWNED — `.r`'s enumeration** | `demo/scenes/easing/useEasingDemo.ts(294,13) TS2322` · `(310,43) TS2345` · `demo/scenes/easing/EasingScene.vue(8,10) TS6133 'computed'` · `(45,7) TS6133 'isPlaying'` · `demo/components/instrument/shell/EditorShell.vue(175,10) TS2379` | **5** |
| **UNOWNED AND UNWRITABLE — ESCALATED, not cured** | `src/animation/group/composite/compositor.ts(79,11) TS6133 'groupedKeys'` · `src/animation/group/waapi.ts(9,1) TS6133 'KeyframesAnimation'` · `src/animation/physics/smooth.ts(194,13) TS6133 '_startLoop'` | **3** |
| | **TOTAL** | **54** ✓ |

### ESCALATION KF11-E2 — the three `src/**` diagnostics, returned not written

§0u gives `.r` *"exactly the files act (2)'s enumeration names"* and bars only W11–W13 §Bounds rows.
But `KF-W11.md` §Excluded row 1 and §Triumvirate dispatch make **any `src/**` write a
wave-invalidating bound** — *"Bounds whose expansion invalidates the wave: any `src/**` write …
ESCALATE, never expand"* — and §0u does not name `src/**` or lift that bound. **This seat does not
presume the lift.** `.r` therefore **ESCALATES** the three rows with their owning waves named
(KF.W5 / KF.W8, the library waves), citing each diagnostic, and **writes no `src/**` byte** — which
is exactly what act (2)'s own closing clause directs for a row `.r` may not cure. **Disclosed
consequence, loud**: all three are `TS6133` unused-declaration rows, so §0u part (3) — *"the count
reads 0 at KF.W13's close"* — **cannot be met by KF.W11–W13 alone**; a library seat (or an owner
grant extending `.r`'s set to `src/**` for TS6133-only cures) must land those three. The ratchet's
other two parts are unaffected: the count may not rise, and every in-bounds diagnostic falls with
its owning cure. **KF11-E2 is returned to the orchestrator; it blocks no unit's dispatch.**

**A second disclosure, beside**: the five UNOWNED demo rows sit in `demo/scenes/easing/**` and
`demo/components/instrument/shell/`, both named in §Excluded's *"Do NOT touch"* list. That list's
stated reason for easing is *"no easing packet exists in this partition"* — it bars a **packet**
cure, and §0u's `.r` performs no packet act: it removes two unread declarations and narrows three
assignments **at the type level only, each cited to its diagnostic**. This seat reads the later,
dated §0u as governing `.r`'s set for that class and for that class alone. **`EditorShell.vue:116`
— the `G-0.5` glass HOLD's subject — is NOT `.r`'s row and is not touched**; `.r`'s only
`EditorShell.vue` act is the `:175` `exactOptionalPropertyTypes` argument.

## Unit plan — 11 units, 8 ordered groups (the banked 10 + `.r` FIRST, §0u)

Model tiering per M-12 TRI-FOLD and the spec's own §Execution-shape sentence: *"the three
decision-shaped units (`.d`'s canonical domain, `.e`'s N-1 fork, `.f`'s field encoding) are
Fable-worker ∥ Opus-worker → fresh-Fable arbiter; the roster-and-precedent units are Opus solo."*
`.r` is **Opus** by the addendum's own parenthetical. Groups are packed to the owner's
**2-concurrent** dispatch cap (below the spec's declared peak of 3); **no two concurrent units share
a modify path**.

| group | units | why it is lawful |
|---|---|---|
| 1 | `.r` | §0u: FIRST, alone. Its paths are in no wave's §Bounds; the lockfile cure must precede any CI reading. |
| 2 | `.a` ∥ `.b` | phase 1; directory-disjoint (`cube/` + the 2-line `SpringScene.vue` carve · `square/` + the `useKeyframeOps.ts:58-69` carve) |
| 3 | `.d` | phase 1 remainder (sequence); first writer of `SequenceScrubber.vue` |
| 4 | `.c` ∥ `.h` | phase 2; `.h` after `.b` (§Seq 7, met in group 2); `spring/` vs `amiga/` directory-disjoint; `.c` inherits `.a`'s landed `variant:` carve (§Seq 6) |
| 5 | `.g` | phase 2 remainder — AFTER `.c` so KF-SST-31's `useSpringDemo.ts` byte is landed, never a parallel write (§Bounds `:120`) |
| 6 | `.e` ∥ `.f` | phase 3; `.e` after `.c`'s M-3 commit (§Seq 2); `SpringTrace.vue` vs `SpringHeatmap.vue`+`SpringPhysicsFacet.vue` |
| 7 | `.i` | phase 3 remainder — after `.d` (§Seq 3, same file) and after the KF.W7 KEEP verdict (§Seq 4, met) |
| 8 | `.j` | phase 4, close, serial, last |

**`KF.W11.r` — the unowned remainder and the lockfile · Opus · FIRST.** Spec: ADDENDUM 2026-09-19
`:408-416` (COHESION §0u).
Writable (kf): `package-lock.json` · `demo/scenes/easing/useEasingDemo.ts` ·
`demo/scenes/easing/EasingScene.vue` · `demo/components/instrument/shell/EditorShell.vue`
(**type-level only, each cure cited to its diagnostic**). Writable (value.js): this record (receipt
append) · `docs/tranches/X/keyframes/evidence/W11/**`.
Sub-gate: `npm ci` exit **0** · the CI run observed and its id + both jobs' outcomes recorded · the
vue-tsc count after `.r` = **54 − 5 = 49**, double-run.
Locks: no `src/**` byte (KF11-E2 — escalate, never write); no `@ts-expect-error` / `as` /
`eslint-disable` as a cure (§0u part 2); `EditorShell.vue:116` untouched; no `node_modules` byte
committed.
Brief: act (1) **R-C3** first — `npm install --package-lock-only` in the sacred checkout so
`package-lock.json` takes `@vue/test-utils@^2.5.1` (⟨cmd⟩ `grep -c '@vue/test-utils'
package-lock.json` → **0** today, manifest `^2.5.1`), then `npm ci` to exit 0, commit
`chore(lock): the lockfile takes the manifest` by pathspec on `package-lock.json` alone, push, and
record the CI run id with both jobs' outcomes. Act (2): re-run the enumeration at your own clock
(it must reproduce 54 and the five-row remainder), then cure each of the five at the type level —
delete the two unread declarations (`computed`, `isPlaying`), narrow `useEasingDemo.ts`'s two
string-to-`Easing` sites at their source rather than casting, and give `EditorShell.vue:175`'s
argument the `undefined` the target's optional properties require. **Escalate the three `src/**`
TS6133 rows by id to KF.W5/KF.W8 in the receipt; write no `src/**` byte.**

**`KF.W11.a` — the cube packet · Opus · phase 1.** Spec: §Agent Units `:219-223` · §Carry P1
`:163-168` · §Bounds rows `:96-103` · §Gates G-KFW11-1 `:289` · §Commit plan 1 `:376`.
Writable (kf): `demo/scenes/cube/CubeTarget.vue` · `CubeTarget.css` · `CubeScene.vue` ·
`matrix-editor/{MatrixEditor.vue,transformMath.ts,useTransformState.ts}` ·
`orbital-drag/OrbitalDrag.vue` · `orbital-drag/{composables/**,quaternionEuler.ts,types.ts,index.ts}`
(carve) · `{useCubeDemo.ts,useCubeRelit.ts,cubeTransformStore.ts,cubeKeys.ts}` (carve) ·
`demo/scenes/spring/SpringScene.vue` **two `variant:` lines `:202`/`:225` ONLY** ·
`test/demo/scenes/cube-roll-and-prestart.test.ts` (create) · `test/demo/scenes/cube-scene.test.ts`
(extend) · `demo/DESIGN.md` (prose only). Writable (value.js): this record (receipt append) ·
`docs/tranches/X/keyframes/evidence/W11/**`.
Gate: **G-KFW11-1**. **Ratchet duty (§0u)**: the **28** diagnostics in this unit's own rows
(`OrbitalDrag.vue` 24 · `useTransformState.ts` 2 · `MatrixEditor.vue` 1 · `CubeScene.vue` 1) fall
WITH the cures that own them — the OD rows are model-contract shadows (`TS2339 Property 'rotate'
does not exist` at `:68`/`:91`/`:92`; `TS2769 No overload` at `:43`/`:47`/`:48`), the four TS6133s
die with the declarations their cures retire. No cast, no suppression.
Locks: the four-site `variant:` family is **ONE commit, MUST NOT SPLIT** (CubeScene ×2 + SpringScene
×2); ARB-1 **delete arm only** (the `headerLeft` 'fill' arm is a TRAP); LAW A census §B.3(3) before
the latch deletion; glass-producer rows → SS-6, never demo-side; the OD latch-family sha is
**KF.W12 AXISLINE-UNIT's open point** and must be printed.
Brief: re-resolve every P1 anchor at the open sha; land CubeTarget **#53's demo half first** (the
`Matrix3dCall` serialized before `transformTargetsStyle`), then the Roll stack
(#1·#2·#5·#15·#20·#38·#49), the latch/pointer seam, lighting truth #4/#16/#36/#56 **as a
graph-attitude parameter** (a bare `0.6 → −0.6` fails the gate); then CubeScene's matrix-editor
family with **ME-30/31 as ONE sync-topology spec** and **ME-42's edit representation stated in the
receipt** (a display-only cure is the defect), state/identity, the four-site glass-conformance
commit; then OrbitalDrag's four families, the latch family becoming **KF-AX-1's registry adoption +
blur clear + exposed `reset`**. Declare #7's library half to KF.W5 by id; never write `src/**` or
`CubeAxisLines.vue`.

**`KF.W11.b` — the square packet · Opus · phase 1.** Spec: §Agent Units `:225-229` · §Carry P7
`:199-203` · §Bounds rows `:121-124` · §Gates G-KFW11-7 `:301` · §Commit plan 2 `:377`.
Writable (kf): `demo/scenes/square/SquareScene.vue` · `SquareScene.css` · `SquareInstrument.vue` ·
`{useSquareDemo.ts,useSquareKeyboard.ts,useSquareTumble.ts,squareKeys.ts}` ·
`demo/components/instrument/keyframes/composables/useKeyframeOps.ts` **(`updateFromString` hunk
`:58-69` ONLY)** · `test/demo/scenes/square-editor-seam.test.ts` (create) ·
`test/demo/scenes/square-scene.test.ts` (extend) · `demo/DESIGN.md` (prose). Plus the value.js
receipt/evidence rows.
Gate: **G-KFW11-7**. **Ratchet duty**: **0** diagnostics sit in this unit's rows —
`useKeyframeOps.ts(80,13)` is OUTSIDE the `:58-69` carve and belongs to KF.W12 `.c`. The count may
not RISE: if the L-2 cure would add a diagnostic, cure the type at its source.
Locks: tether family D-1+D-6+D-16+N-SQ-4 **MUST NOT SPLIT** and **never cures by adding a
`viewBox`** (fails by construction); MISS-3's settle-paced tour **and its assertion in ONE commit**
(travelling lock 3); OP-7 gates a named subset of SquareInstrument — state which rows **before**
spending any cure, delete no layer un-ruled; the L-2 sha is **KF.W12 KFED-UNIT's open point**.
Brief: land L-2's demo half (`updateFromString` re-supplies the receiver's renderer;
`usesDefaultRenderer(frame.transform)` is the oracle, read-only from `src/`), the `RAFPlayback`
degrade-not-wedge rider, the playback-authority packet (the sole `animationGroup.pause()` goes
behind the machine, 1 → 0), the colour packet **with the `:29` docblock's `:161` → `:163`
correction**, the instrument packet after OP-3's re-derivation, the input/a11y packet (MISS-1 via
`7225cdd1`'s shape — **read, never copied**; the bare `focus-ring` at `:46`), geometry D-8, the
hygiene tail, and MISS-3 last. The library half of L-2 is DECLARED to KF.W5/KF.W8, never written.

**`KF.W11.d` — the sequence packet · FABLE (tri-fold: Fable-worker ∥ Opus-worker → fresh-Fable
arbiter; the canonical-domain decision) · phase 1.** Spec: §Agent Units `:237-241` · §Carry P2
`:170-178` · §Bounds rows `:104-110` · §Gates G-KFW11-2 `:291` · §Commit plan 3 `:378`.
Writable (kf): `demo/scenes/sequence/SequenceScene.vue` · `SequenceTarget.vue` ·
`SequenceTarget.css` · `SequenceAxis.vue` · `SequencePlayhead.vue` ·
`{useSequenceDemo.ts,useSequenceInstrument.ts,useTypedTrigger.ts,sequenceKeys.ts}` (carve) ·
`SequenceScrubber.vue` **(first writer; `.i` opens on this unit's sha)** ·
`test/demo/scenes/sequence-instrument-truth.test.ts` (create) ·
`test/demo/scenes/sequence-scene.test.ts` + `test/demo/instrument/sequence-scrubber-mount.test.ts`
(extend, never weaken) · `demo/DESIGN.md` (prose). Plus receipt/evidence.
Gate: **G-KFW11-2**. **Ratchet duty**: 0 diagnostics in this unit's rows; the count may not rise.
Locks: **the decision precedes the patch** (§Seq 8) — M-10's canonical-domain spec is **written in
the receipt before the family's first commit**, one spec not four patches; K-25 (N-1's domain cure
and N-2's recompute cure land against each other); **N-14 sequenced after N-1**; **ST-1 = one word +
the `SequenceTarget.css:175-178` deletion in ONE sha** (L-9) with LAW A census §B.3(1); geometry
only after OP-3.
Brief: write the canonical-domain decision first; then the loop-seam commit (one
`SweepSceneOptions`), SC-2's expose-or-delete decision, the reel packet, the geometry commit, ST-4's
one binding (`:loading="demo.isReeling.value"` — three rows for one line), ST-1, the N-14 valuetext,
the scrubber's single `applyScrub(p, {gesture})` spec, the prose-truth sweep, store hygiene, the
Axis trio + `--tick-count`. KF.W9 holds ST-1's before/after witnesses and lands no cure. Print the
sha `.i` opens on.

**`KF.W11.c` — the spring packet · Opus · phase 2.** Spec: §Agent Units `:231-235` · §Carry P3
`:180-185` · §Bounds rows `:115-117` · §Gates G-KFW11-3 `:293` · §Commit plan 4 `:379`.
Writable (kf): `demo/scenes/spring/SpringScene.vue` (the rest — the two `variant:` lines arrive
landed from `.a`, never re-touched) · `SpringTarget.vue` ·
`{useSpringDerby.ts,useSpringDemo.ts,useSpringHotPath.ts,useCompiledEntry.ts,useSpringLinearStops.ts,springPresets.ts,springKeys.ts}`
(carve) · `test/demo/scenes/spring-derby-truth.test.ts` (create). **READ-ONLY witness**:
`useSpringKeyframesEditor.ts` (KF.W12's seam — measure the mount, never cure it). Plus
receipt/evidence.
Gate: **G-KFW11-3** (the four born-RED cases a–d). **Ratchet duty**: **1** diagnostic in this unit's
rows — `useSpringDemo.ts(1,29) TS6133 'onScopeDispose' declared but never read`; it falls with the
cure that owns the import (a deletion, not a suppression).
Locks: **M-4→M-3 — the parser, both dead guards and the regex die together**, LAW A census §B.3(2)
pasted first; comment-stated invariants are test obligations; glass-producer → SS-6; the M-3 sha is
**`.e`'s open point**; the M-5 race halts and escalates at the third reproduction without a
deterministic harness (§3a).
Brief: C-1 first (the contract head sizes the rest), then M-2/D-2/D-7 with the six prose
corrections re-anchored (clamp sites re-resolved — they read `:210`/`:222` today), M-4→M-3, M-5
(clearTimeout + `derbyActive` gate), N-1, the one gesture spec, the a11y one-edit family including
`SpringTarget.vue:63`'s bare `focus-ring`, the flag/register passes, the hygiene tail; then
SpringScene's KF-SS-1/-2/-3/-8(scene half)/-10(witness) and the sweep. Name KF-SS-8's ribbon half
to KF.W13 and KF-SS-3's API signal to KF.W5 in the receipt; write no `src/**` byte.

**`KF.W11.g` — spring-artifact-truth · Opus · phase 2 (placed after `.c`).** Spec: §Agent Units
`:255-259` · §Carry P6 `:195-197` · §Bounds row `:120` · §Gates G-KFW11-6 `:299` · §Commit plan 5
`:380`.
Writable (kf): `demo/scenes/spring/StartingStyleTarget.vue` ·
`test/demo/scenes/starting-style-artifact.test.ts` (create). Plus receipt/evidence. **Never writes
`useSpringDemo.ts`** — KF-SST-31's byte there is `.c`'s; if unlanded at this unit's open, the row is
named `complete_with_misses`.
Gate: **G-KFW11-6**. **Ratchet duty**: 0 diagnostics in this unit's row; the count may not rise.
Locks: OP-5 (KF-ES-2 consumed by reference; witness-only if unlanded).
Brief: the artifact core KF-SST-3·4·5·9 (+11·12·26) as ONE spec — one source of truth for the
endpoints, true polarity/duration, a case-preserving register (rendered ≡ copied), a
readable+reachable viewport, one honest state model with a refusal surface; then the verb/state
pair KF-SST-1·6 (the survivor gets `aria-expanded`/`aria-pressed` — 0 today), KF-SST-2, -10, -31,
the prose sweep, the hygiene tail.

**`KF.W11.h` — the amiga packet · Opus · phase 2 (after `.b`).** Spec: §Agent Units `:261-265` ·
§Carry P8 `:205-207` · §Bounds rows `:125-126` · §Gates G-KFW11-8 `:303` · §Commit plan 5 `:380`.
Writable (kf): `demo/scenes/amiga/AmigaScene.vue` ·
`{useAmigaDemo.ts,useAmigaThree.ts,useSphereSpin.ts,utils.ts,amigaKeys.ts}` (carve) ·
`test/demo/scenes/amiga-paused-pose.test.ts` (create) ·
`test/demo/scenes/amiga-sphere-spin.test.ts` (extend, never weaken — 5 `it(` today). Plus
receipt/evidence.
Gate: **G-KFW11-8**. **Ratchet duty**: 0 diagnostics in this unit's rows; the count may not rise.
Locks: **§Seq 7 — D-2's shared idiom is a BORROWING from SquareScene and is verified against `.b`'s
LANDED cure, never against the bank's description of it**; the roster commit names every P8 id
LANDED or KILLED-with-rationale.
Brief: D-1 first (BLOCKER: `rendered` is written only under `playing`; nothing reads `pose` outside
that branch and the gate is doubled — `onFrame` false at rest, `setProgress` never marks dirty);
then L-B1, D-2's borrow, D-3+C-18+M-3, the L-M/C pairs, MISSED-A/C/E/F/G, C-16/-17/-20/-10/-5,
L-m3/L-m6, INFO.

**`KF.W11.e` — spring-plot · FABLE (tri-fold; the N-1 fork is a decision seat) · phase 3, after
`.c`'s M-3 commit.** Spec: §Agent Units `:243-247` · §Carry P4 `:187-189` · §Bounds row `:118` ·
§Gates G-KFW11-4 `:295` · §Commit plan 5 `:380`.
Writable (kf): `demo/scenes/spring/SpringTrace.vue` ·
`test/demo/scenes/spring-trace-truth.test.ts` (create). Plus receipt/evidence.
Gate: **G-KFW11-4**. **Ratchet duty**: 0 diagnostics in this unit's row; the count may not rise.
Locks: the instrument-truth core **D-1 + N-1 + N-2 + C-2/L-3 is ONE family, MUST NOT SPLIT**, with
**the N-1 fork decided FIRST, in the receipt** (drop the prop, or label x in ms and discharge D-6),
then the draw route per **OP-4 re-measured at this unit's own clock** (the anchor-hoist minimum
unless the export has landed).
Brief: decide, then draw; parser posture D-12/L-6/C-4 + the filter cell, L-5's bindings, D-11's
label, **L-10's extraction + its unit test against the engine's own samples** inside the same
family; then mark-design D-3+D-4+N-3 (neutral reference vocabulary, EasingTarget precedent) +
D-6·D-7·D-13; the type/register pass; N-5; L-8; L-14; D-16 recorded clean-by-construction so no
sweep manufactures work.

**`KF.W11.f` — spring-physics-facet · FABLE (tri-fold; the field-encoding design decision) · phase
3.** Spec: §Agent Units `:249-253` · §Carry P5 `:191-193` · §Bounds row `:119` · §Gates G-KFW11-5
`:297` · §Commit plan 5 `:380`.
Writable (kf): `demo/scenes/spring/SpringHeatmap.vue` · `SpringPhysicsFacet.vue` ·
`test/demo/scenes/spring-heatmap-reversibility.test.ts` (create). Plus receipt/evidence.
Gate: **G-KFW11-5**. **Ratchet duty**: 0 diagnostics in this unit's rows; the count may not rise.
Locks: **the decision precedes the patch** — what the field encodes, on which axes, at what scale,
with what legend, written before the family opens; **SPF-13 is spent ONLY once KF.W12's
OPTIONS-UNIT has recorded KF-CO-47's decision**, else named `complete_with_misses`; SPF-4's producer
constraint rides **SS-6** as a rider on KF-ET-4's letter — never a demo-side workaround.
Brief: the instrument-truth core D-B1·D-B2·D-M8·D-M1; the input-integrity core (one lattice, one
gesture/focus spec, one honest published tolerance); the two-`defineModel` contract; N-SH-3; the
ramp redesign; **SPF-3's overshoot cure** (remap `[-0.25,1.25]→[0,1]` or a stated-geometry headroom
cap — the four presets' analytic peaks are 1.005 / 1.068 / 1.205 / 1.000; L's cure #2 is KILLED by
K-10); SPF-5's mix (4.464 FAIL → AA); SPF-7's two `!important` deletions; L-m-5's three born-RED
tests.

**`KF.W11.i` — the drag-seam packet · Opus · phase 3, after `.d`.** Spec: §Agent Units `:267-271` ·
§Carry P9 `:209-211` · §Bounds rows `:110-114` · §Gates G-KFW11-9 `:305` · §Commit plan 6 `:381`.
Writable (kf): `demo/composables/useDragScrub.ts` ·
`demo/components/instrument/transport/composables/useDragCapture.ts` ·
`demo/utils/gestureSelectSuppression.ts` (carve, only if the guard belongs at the token) ·
`demo/components/playback/AnimationVisualizer.vue` **(KF-AV-16's machine-seam carve ONLY)** ·
`demo/scenes/sequence/SequenceScrubber.vue` (the seam rows, on `.d`'s sha) ·
`test/demo/instrument/drag-scrub-reentrancy.test.ts` (create). Plus receipt/evidence.
Gate: **G-KFW11-9**. **Ratchet duty**: 0 diagnostics in this unit's rows; the count may not rise.
Locks: **KF-SCR-1 + L·D-1 + KF-AV-15 = ONE guard family in BOTH composables, ONE commit, MUST NOT
SPLIT** (two guards, or one in only one composable, is L-18 base (iii)); `useDragCapture`'s
**exported surface is unchanged** — `PlaybackRibbon.vue` is KF.W13's consumer and is never edited
here; the KF-AV-28 KEEP verdict is **STATED before the first byte** and the unit emits **zero**
SWAP-discharge receipts (the discharge alphabet §Excluded names has no members, and this record must
never spell that string literally — **G-KFW11-10 greps this very file for it and requires 0**; every
seat appending here states the emptiness in words, as this line does).
Brief: state the verdict; land the re-entrancy guard + `pointerId` latch + scope-disposal release +
the corrected "Nesting-safe" docblock in `useDragScrub.ts` and the same family in
`useDragCapture.ts` (whose `:20` `tryOnScopeDispose` claim is false against installed @vueuse 14) in
ONE commit; then C·C-1 ≡ KF-AV-16 as ONE throttle-vs-decouple decision at the machine seam covering
pointer **and** coast; then KF-SCR-5's dead-API/prose cleanup on the same seam edit; then the
born-RED two-pointer test over both composables (`activeGestureCount` exactly 1 on the second
`pointerdown`, 0 on the last `pointerup`, 0 on unmount mid-drag, ≤1 machine dispatch per frame at
240 Hz).

**`KF.W11.j` — close · Opus · phase 4, serial, last.** Spec: §Agent Units `:273-277` · §Gates
G-KFW11-10 `:307` · §Commit plan 7 `:382` · §Format/Verification `:384-386`.
Writable (value.js only): `docs/tranches/X/execution/B/KF-W11.md` ·
`docs/tranches/X/execution/LEDGER.md` (this wave's cells + appended event lines ONLY) ·
`docs/tranches/V/coordination/INBOX.md` + the SS-6 accretion register (COHESION §4a) ·
`docs/tranches/X/keyframes/evidence/W11/**`.
Gate: **G-KFW11-10** + a re-run of all ten at this seat's own clock, double-run.
Brief: re-run every gate; audit each commit sha against §Bounds by `git show --stat`; write the BH
relay entries for every producer row surfaced (CubeScene D-2/C-3's `variant`, SPF-4's
`role`/`aria-pressed` filter, any Boolean-cast `default: undefined` ask) into the SS-6 accretion
register; run the E13 four-path sweep and append the sweep line; move the LEDGER cells and append
the event line; list residuals and escalations (**KF11-E2 among them**); **state positively that
zero SWAP-discharge receipts exist**; `npm run check`, `npm run test:demo` and the §Format eslint
scope at close. **The ratchet's close clause**: read the vue-tsc count double-run and state the
delta against the banked **54** — it may not have risen; name every diagnostic still standing with
its owning wave (§0u part 3 reads 0 only at KF.W13's close, and KF11-E2's three `src/**` rows are
outside all three waves).

### Standing law carried by every unit (spec `:279-281`)

CRASH-RECOVERY first · the spec GOVERNS (no quick fix, no workaround, no masking fallback — no
`try/catch` around a defect, no `test.skip`, no allowlist, no copied producer selector, no
`node_modules` patch; each a HIGH defect) · idiomatic root-cause cures · pathspec commits **on the
commit itself**, one per meaning, declared families unsplit · E-3 · WRITE-THEN-MEASURE, double-run ·
SELF-COUNT · quote-by-command · sibling trees READ-ONLY, glass-ui READ-ONLY always (producer rows →
SS-6) · no stash / `reset --hard` / force-push · E13 · probe parsimony (§5.2) · `scripts/dev/dev.sh`
never staged · LEDGER edited only by minimal in-place cell replacement or appended lines · **any
write outside §Bounds is an ESCALATION returned, never a write** (notably: every `src/**` byte, and
`CubeAxisLines.vue` / `PlaybackRibbon.vue` / `TimelineTrack.vue` / `KeyframeTimeline.vue`) · **§0u's
ratchet: bank, never raise; zero your own rows with the cure that owns them; no cast, no
`@ts-expect-error`, no `eslint-disable` as a cure.**

### Worktree plan (spec `:153-155`)

Parallel units run in sibling worktrees `keyframes-kfw11-<unit>` (absolute path stated in each
dispatch), each on its own branch, merged to `master` by the orchestrator in phase order; serial
dependents open on the merged sha named in the predecessor's receipt; `.r` and `.j` run on `master`.
No Cargo.

### Ledger commit provenance — the shared-file hazard, restated

The first sitting's LEDGER edits were swept into a sibling seat's pathspec commit on the same file
(`ea67828e`, Track D) before that seat could commit them; nothing was lost. **A pathspec on one's
own commit does not protect a shared file from a sibling's pathspec on the same path.** This
sitting re-reads `LEDGER.md` immediately before editing, edits only KF.W11's own cells and appends
its own event line, and verifies the landed bytes after committing.

---

## Unit receipts

*(empty — no unit was dispatched at this sitting; the wave is BLOCKED-ON OP-0. Each unit appends
its receipt here, first line `SERVED MODEL: <id>`, with its commands double-run, its SELF-COUNTs and
its inherited-paths clause.)*
