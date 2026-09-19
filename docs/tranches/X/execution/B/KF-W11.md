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

---

### KF.W11.r

SERVED MODEL: claude-opus-5[1m]

**Unit**: `KF.W11.r` — the unowned remainder and the lockfile (FIRST, alone; group 1). Spec:
`KF-W11.md` **ADDENDUM 2026-09-19** `:408-417`, the `### KF.W11.r` block `:412-416`; authority
`COHESION.md` **§0u** `:1542-1550`. **Status: PARTIAL — 1 of 2 acts fully DONE, act (2) 2 of 5 rows
cured and 3 ESCALATED, plus one substrate escalation the act itself uncovered.**
**Evidence**: `docs/tranches/X/keyframes/evidence/W11/r-unowned-remainder-and-lockfile-2026-09-19.md`
(every transcript, census and probe in full).

**CRASH-RECOVERY (standing law, first act).** `git -C ../keyframes.js status --porcelain` -> **2
untracked rows**, both value.js-delivered mail packets under
`docs/tranches/V/coordination/VALUEJS-INBOUND-*` — outside this unit's writable set, not touched.
`git -C . status --porcelain -- <this unit's 2 value.js paths>` -> **empty**. `git status --porcelain`
in value.js -> the same 11 modified rows seat 0 recorded (8 `demo/**` + `eslint.config.js` +
`CARRY-LEDGER.md` + `scripts/dev/dev.sh`), **none in this unit's set**; `scripts/dev/dev.sh` never
touched. **ZERO inherited hunks on any path this unit may write — nothing to finish, nothing to
rewrite.** Substrate at open: `git rev-parse --short HEAD` -> `dd28da55` (== `origin/master`).

#### Act 1 — R-C3, the lockfile takes the manifest. **DONE.**

Born-RED, measured first: `grep -c '@vue/test-utils' package-lock.json` -> **0** against a manifest
`devDependencies["@vue/test-utils"] = "^2.5.1"`; `npm ci --dry-run` -> `npm error code EUSAGE …
Missing: @vue/test-utils@2.5.1 from lock file`, with `| grep -c '^npm error Missing:'` -> **16**.

`npm install --package-lock-only` -> *"up to date, audited 426 packages"*; after it
`grep -c '@vue/test-utils' package-lock.json` -> **3**, `git diff --stat` -> **1 file changed, 206
insertions(+)**, and `git diff package-lock.json | grep -c '^-'` -> **1** (the `--- a/` header alone:
**ZERO removals** — the change is purely additive). SELF-COUNT: the added `node_modules/…` entries
number **16**, exactly the 16 `Missing:` rows — `@vue/test-utils` plus its transitive closure
(`js-beautify`, `vue-component-type-helpers`, `editorconfig`, `glob`, `nopt`, `path-scurry`,
`minipass`, `config-chain`, `ini`, `proto-list`, `@one-ini/wasm`, `abbrev`, `js-cookie`, and
`editorconfig`'s nested `commander`/`minimatch`).

**`npm ci; echo $?` -> `0` · `0`** (double-run; run 2 *"added 425 packages, and audited 426 packages
in 10s"*). **No `node_modules` byte is tracked or committed** (`git status --porcelain` after both
runs shows only `M package-lock.json` beside the two untracked mail packets).

Commit **`d8eb43ff`** `chore(lock): the lockfile takes the manifest`, `--no-verify`, **pathspec
`package-lock.json` alone on the commit itself**, pushed `dd28da55..d8eb43ff`.

**CI run observed: id `35428272041`** (workflow `ci`, push, `master`, 2026-09-19T07:03:17Z, 1m10s),
**conclusion failure**, and **both jobs now get PAST `npm ci`**:

| job | id | conclusion | `npm ci` | first failing step |
|---|---|---|---|---|
| demo correctness (browser roster) | `105857976499` | **failure** | **success** | `publish artifact boundary (post-build)` — `proof:published-surface — FAIL (1 finding(s))`, five HEAVY exports with `NEITHER` doc coverage |
| library gates (library tests + proof:publish) | `105857976658` | **failure** | **success** | `check library types` — **exactly the three `src/**` TS6133 rows of KF11-E2**, annotated `smooth.ts#194` · `waapi.ts#9` · `compositor.ts#79` |

**R-C3 is DISCHARGED**: the step that killed both jobs at the landing sha and the pre-landing control
alike now succeeds in both, so *"on the merge path"* is true of a pipeline that runs. The second push
(`35428755040`, jobs `105859324420` / `105859324523`) reproduces the same two failing steps exactly.
**Banked as a finding, not a cure**: the `library gates` blocker IS KF11-E2's escalated set —
independent CI-side corroboration that §0u part (3) cannot be met by KF.W11–W13 alone.

#### Act 2 — the enumeration re-run. **54 does NOT reproduce at this seat's clock; 31 does.**

`npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` -> **31 · 31** (exit 2 both,
outputs byte-identical). **Act 1 is the cause, and it is disclosed loudly.** The enumeration seat read
54 against a `node_modules` that did **not** match `package-lock.json` — the lockfile carried no
`@vue/test-utils` at all, yet the package was installed and 39 demo test files ran, so the tree was
locally unreproducible. `npm ci` replaced it with exactly the lockfile's resolutions, which is what CI
has always installed. **31 is the CI-faithful, reproducible figure at `d8eb43ff`.**

Delta at the bytes, **54 − 24 + 1 = 31**: `demo/scenes/cube/orbital-drag/OrbitalDrag.vue` **24 -> 0**
(the whole banked `.a` block is absent under the lockfile's pins), and
`demo/components/instrument/transport/TransportDock.vue(95,34)` `TS2322` is **new** — a **KF.W13
§B.2** row, booked there, untouched here. **Every other file's count reproduces the banked
enumeration exactly, and all five of `.r`'s rows and all three KF11-E2 rows reproduce at their banked
coordinates character for character.** Installed pins after `npm ci`: `vue 3.5.35 · vue-tsc 3.3.11 ·
typescript 6.0.3 · @vue/language-core 3.3.11 · @vueuse/core 14.3.0 · gl-matrix 3.4.4 ·
@mkbabb/value.js 4.0.0 · @mkbabb/glass-ui 7.0.0`.

**The ratchet is NOT violated — the count FELL and did not rise.** Re-homed at this clock (SELF-COUNT:
5 + 13 + 5 + 5 + 3 = **31** ✓): KF.W11 §Bounds **5** · KF.W12 §B.2 **13** · KF.W13 §B.2 **5** ·
UNOWNED (`.r`'s) **5** · UNOWNED-AND-UNWRITABLE (KF11-E2) **3**.

#### Act 2 — the five UNOWNED rows: **2 CURED, 3 ESCALATED**

**CURED — `EasingScene.vue(8,10)` + `(45,7)`, both `TS6133`** (commit **`2b649a1d`**). LAW A census
before the delete: `grep -n 'computed' …/EasingScene.vue` -> `:8` (the import) **and nothing else**;
`grep -n 'isPlaying' …` -> `:42`/`:43` (a comment) · `:45` (the alias) · `:86`/`:101` (both read
`demo.isPlaying`) · `:128` (a comment) — **the local alias has ZERO readers**. Both declarations
deleted. Under the MISS-3 comment-truth lock the note that captioned the alias is re-pointed at its
two live read sites **in the same commit**, so no comment is left true-sounding beside a deleted line.

**ESCALATED — `useEasingDemo.ts(294,13)` `TS2322` + `(310,43)` `TS2345` (KF11-E3).** The specified
cure is *"narrow the string->`Easing` at source, never a cast"*; **measured at the bytes it is not
reachable inside `.r`'s set**, so the file is left **byte-unchanged** rather than substituted
(`git diff --stat HEAD -- …/useEasingDemo.ts` -> empty). The seam is `cssValue` (`:93`), whose value
type feeds both sites — one correct annotation would close both. Annotating it with
`NonNullable<InputAnimationOptions["timingFunction"]>` moves the defect to its source exactly as
directed (`(93,85) TS2769: Argument of type '() => string' is not assignable…`; count 31 -> **28**),
but the getter stays `() => string` because two arms root outside this set: **arm 1**
`cubicBezierToString(...)` is declared `: string` at
`node_modules/@mkbabb/value.js/dist/subpaths/math.d.ts:5` though it returns the template literal
(`math.js:44`) — a **@mkbabb/value.js library declaration**, and a `node_modules` patch is a HIGH
defect; **arm 3** `return name` rides `currentEasingName = ref("ease")` fed by
`selectEasing(name: string)` from `EasingTarget.vue:251`. **The arm-3 narrowing was attempted,
MEASURED and reverted**: typing the ref + setter as
`Extract<NonNullable<InputAnimationOptions["timingFunction"]>, string>` takes the count **28 -> 42**,
with the `EasingSidebar.vue`/`EasingTarget.vue` rows going **1 -> 5** — **+4 NEW errors in files
outside `.r`'s writable set**, a ratchet violation and an out-of-bounds write. The cascade also shows
*why*: the bare editor modes `"steps"` and `"cubic-bezier"` that this file branches on
(`:71 :76 :82 :85 :96 :99 :109 :254 :269 :270`) have **no member** in
`TimingFunctionNames | CssEasingLiteral` — translating them into real CSS is precisely `cssValue`'s
job, and the open `string` is the seam's honest demo-side type. Owning acts named: a value.js
declaration fix (a producer row, never a keyframes-side hack) and/or a three-file easing-name
contract — **KF.W12's OPTIONS-UNIT carve** (§Excluded: *"`EasingSidebar.vue`'s seat rows are KF.W12's
OPTIONS-UNIT carve"*).

**ESCALATED — `EditorShell.vue(175,10)` `TS2379` (KF11-E4).** The brief's cure — *"give the argument
the `undefined` its optional targets require"* — **has no target at the true bytes**. The diagnostic's
own chain names the property: *"Types of property `key` are incompatible. Type `string | undefined` is
not assignable to type `PropertyKey`."* `key` is Vue's `VNodeProps['key']?: PropertyKey`, not a prop of
`AnimationControlsGroup` and not editable from this repo; the component's own optional props
**already** carry the explicit `| undefined` the suggestion asks for (the error text prints
`readonly channels?: TransportChannel[] | undefined; readonly superKey?: string | undefined`), which
is this file's own documented idiom at `:256`. **Probed and reverted**: deleting the single line
`:key="superKey"` clears the row and nothing else (count 29 -> **28**, `grep EditorShell` -> nothing)
— proving `key` is the sole blocker, and proving the only cures are behavioural: that deletion
contradicts the file's `:164` docblock (*"`AnimationControlsGroup` below is `:key`ed to `superKey`
and remounts on every swap"*), a `?? ""` fallback changes the emitted key value, and making `superKey`
required changes a public prop contract documented as defaulting to `undefined` (`:256`, `:277`) and
cascades to hosts outside this set. §0u grants type-level cures only and orders that anything needing
a behavioural change is **ESCALATED … never forced**. **`EditorShell.vue:116` — the `G-0.5` glass HOLD
subject — was never touched**; the file is byte-unchanged.

#### Gates BEFORE -> AFTER

| gate | before | after | verdict |
|---|---|---|---|
| `npm ci` exit 0 (R-C3) | `EUSAGE`, 16 missing entries | **0 · 0** | **GREEN** |
| CI run observed, id + both jobs' outcomes | both jobs killed at `npm ci` | run **`35428272041`**; `105857976499` failure at `proof:publish` · `105857976658` failure at the 3 KF11-E2 `src/**` rows; **`npm ci` success in BOTH** | **GREEN** |
| vue-tsc count, double-run | **31 · 31** (the reproducible floor; the banked 54 was read off an unreproducible tree) | **29 · 29**, outputs byte-identical | **GREEN against §0u's sub-gate** (*"the count after `.r` = the count before minus the remainder"*: 31 − 2 = 29) · **RED against the brief's literal `54 -> 49`** |
| `npm run test:demo` | 39 files / 286 tests passed | **39 / 286 passed** | unmoved |
| `npx eslint demo/scenes/easing/EasingScene.vue` | — | exit **0** | clean |
| `git diff --check` | — | clean | clean |

#### Escalations returned

- **KF11-E2** (inherited, re-measured, now **CI-corroborated**) — the three `src/**` TS6133 rows to
  KF.W5 / KF.W8. They are the **sole** cause of the `library gates` job's failure.
- **KF11-E3** (new) — `useEasingDemo.ts(294,13)` / `(310,43)`: needs a `@mkbabb/value.js` declaration
  fix and/or KF.W12's OPTIONS-UNIT easing-name contract. Forcing it in-set raises 28 -> 42 with +4 rows
  outside the set (measured, reverted).
- **KF11-E4** (new) — `EditorShell.vue(175,10)`: the failing property is Vue's `VNodeProps['key']`;
  every available cure is behavioural. To the shell seam's owning wave.
- **KF11-E5** (new, **substrate**) — **the banked OP-0 count 54 is not reproducible.** The CI-faithful
  floor at `d8eb43ff` is **31**, and `OrbitalDrag.vue`'s 24-diagnostic block — the largest single item
  in `.a`'s type-level shadow — **is absent under the lockfile's pins**. **`.a` must re-derive its own
  OP-0 reading at its open before spending a cure against the banked 24**, and **`.j` must state the
  close delta against 31, not 54**. Every later unit banks its own figure with `npm ci` settled.

#### Commits (both pushed to `origin/master`)

| sha | subject | pathspec |
|---|---|---|
| `d8eb43ff` | `chore(lock): the lockfile takes the manifest` | `package-lock.json` alone |
| `2b649a1d` | `fix(kf/easing · X.KF.W11.r): the two unread declarations die with their diagnostics` | `demo/scenes/easing/EasingScene.vue` |

No `src/**` byte · no `node_modules` byte · no `@ts-expect-error` / `as` / `eslint-disable` · no
`test.skip` · `EditorShell.vue:116` untouched · `scripts/dev/dev.sh` never staged · the LEDGER row is
`.j`'s and was not touched by this unit.

---

### KF.W11.a

SERVED MODEL: claude-opus-5[1m]

**Unit**: `KF.W11.a` — the cube packet (phase 1 / group 2). Spec: `KF-W11.md` §Agent Units
`:219-223` · §Carry P1 `:163-168` · §Bounds rows `:96-103` · §B.3(3) · §Gates G-KFW11-1 `:289` ·
§Commit plan 1 `:376`. **Status: DONE** — G-KFW11-1 GREEN on both its runtime run and both its byte
clauses, this unit's §0u rows 4 → 0, zero escalations that block anything, three declared residuals.
**Evidence**: `docs/tranches/X/keyframes/evidence/W11/a-cube-packet-2026-09-19.md` (every census,
transcript and re-derivation in full).

**CRASH-RECOVERY (standing law, first act).** ⟨cmd⟩ `git -C ../keyframes.js status --porcelain --
demo/scenes/cube demo/scenes/spring/SpringScene.vue test/demo/scenes demo/DESIGN.md` → **empty**;
⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/B/KF-W11.md
docs/tranches/X/keyframes/evidence/W11` → **empty**. **ZERO inherited hunks on any path this unit may
write — nothing to finish, nothing to rewrite.** Dirty rows outside the set (keyframes' two untracked
`VALUEJS-INBOUND-*` mail packets; value.js's `CARRY-LEDGER.md`, `union-prototype-walk.md` and
`scripts/dev/dev.sh`) were not touched; `scripts/dev/dev.sh` never staged. Open sha **`2b649a1d`**.

#### Act 0 — OP-0 re-derived at this unit's open. **KF11-E5 REPRODUCES: the banked 24 are not there.**

`.r` ordered it (*"`.a` must re-derive its own OP-0 reading at its open before spending a cure
against the banked 24"*). ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` →
**29**; the histogram over this unit's §Bounds rows reads **`OrbitalDrag.vue` 0 · `useTransformState.ts`
2 · `MatrixEditor.vue` 1 · `CubeScene.vue` 1 = 4**, against the record's banked **28**. The 24
`OrbitalDrag.vue` rows (`TS2339 Property 'rotate'`, `TS2769 No overload`) **do not exist under the
lockfile's pins**. This unit's ratchet duty is therefore **4 → 0**, and it is **0 · 0** at close
(double-run, byte-identical). No cure was spent against a diagnostic that is not there and none was
manufactured; **zero casts, zero `@ts-expect-error`, zero `eslint-disable`** in the roster. The
whole-tree figure is NOT claimed here — `.b` writes the same index concurrently and its rows moved
29 → 31 → 29 → 25 inside this unit's window.

#### Acts 1–9 — in the spec's own order

1. **`bc5cc128` · #53 + #7 demo half.** `transformTargetsStyle` skips object values; both painter
   call sites handed it a structural `Matrix3dCall`, so the die's ONLY pre-start orientation writer
   had never written. Serialized at the call site (`matrix3dCss` over the already-validated
   `matrixValues`). The compile path keeps the structural call — `fromVars` flattens it itself —
   which is the half the gate asserts beside the paint. **#7's library half (the renderer's silent
   object-skip made fail-explicit, `src/animation/compile/value/compile.ts`) is DECLARED TO KF.W5 BY
   ID and NOT WRITTEN.**
2. **`37764477` · the Roll stack + the lighting frame contract.** Five mechanisms, one repair each
   invisible behind the others: **#1** the recognizer moved to OrbitalDrag's CAPTURE element (a
   descendant is never on the dispatch path once capture is set — the surface is published by
   `defineExpose`, the sibling eggs never had the bug because `useDragScrub` captures on `el`
   itself); **#2** structural `CssValue` frames instead of a nested object that flattened to
   `transform.rotateX`/`transform.rotateY`, names CSSOM discards silently; **#5** frames measured
   FORWARD from an accumulated attitude, so roll n+1 no longer cuts to identity in five of six
   landings; **#6** the roll owns `.idle-hover`, an element with no other transform writer, so each
   element in the 3D chain has ONE authority; **#20** the gesture lock released by the arc's own
   completion in a `finally`, not a hand-tuned 1200 ms timer. Lighting: **#4** `KEY_LIGHT`'s `+0.6`
   lit a Y-DOWN frame from beneath (top rested 0.20, bottom 0.80) and **#56** the model never saw
   the 30° attitude its `.graph` ancestor is parked at — **the attitude is a REQUIRED PARAMETER**,
   single-sourced and consumed by three sites. **A bare `0.6 → −0.6` is measured FAILING in the
   gate**, which keeps the attitude-blind reading beside the attitude-aware one.
3. **`9e7aca87` · the latch/pointer seam (#54 · #55 · OD-25).** The three document listeners were
   registered inside `onPointerDown` — a DOM event callback with no active scope, where vueuse's
   `tryOnScopeDispose` is a hard no-op — so the docblock promising unmount coverage was false and the
   add/remove bookkeeping also carried OD-25 (a mouse-up while a finger was down tore down all three).
   ONE honest registration in the composable's own scope against the container's `ownerDocument`,
   handlers early-returning unless a gesture is live. **#55**: the acquire is guarded exactly as the
   release already was, so a throw after `startDrag` can no longer strand a phantom drag.
4. **`dd7c6008` · the matrix-editor family, with ME-30/31 as ONE sync-topology spec** written at the
   head of `useTransformState.ts` BEFORE the family's first byte: one writer per channel and the
   writer is an INTENT never an echo (the echo guard is the house form OrbitalDrag already uses —
   read as precedent, not copied); never write both endpoints from one pose; `acos(diagonal)` is not
   a rotation read; one retained animation per concern. Riding it: **ME-7** (two retained tweens,
   stopped-and-retargeted, stopped on dispose), **ME-1** (an incomplete numeric literal refused at the
   parse boundary instead of throwing a `TypeError` from inside a rAF), **ME-38**, **ME-39** (with its
   stale comment corrected, mandatory in that commit). **ME-42's EDIT representation, STATED**:
   display = 2 dp, **edit = the cell's full stored precision**, switched on focus, with the full value
   in `title` in both states — **a display-only cure would have been the defect**. **ME-43**: the
   `title` is the recovery affordance the record found absent, on the selected cell too.
5. **`dc3f0900` · the four phantom `variant:` sites — ONE commit, TWO files, NOT SPLIT.** Installed
   glass-ui 7's `ButtonProps` carries `emphasis/tone/size/iconOnly/loading/type/disabled/class` and
   **no `variant`**, so all four were phantom props falling through to the DOM. `git show --stat`
   names `CubeScene.vue` AND `SpringScene.vue` in the one sha; `.c` inherits the two SpringScene lines
   landed. **ARB-1 DELETE ARM ONLY — the `headerLeft` 'fill' arm was not touched.**
6. **`fff7232c` · the OD latch family → the registry. THIS IS KF.W12 AXISLINE-UNIT'S OPEN POINT.**
   KF-AX-1 ≡ OD-3/OD-4/OD-5/OD-6/OD-31 as one cure: six labelled `registerShortcut` registrations by
   **`event.code`** (keydown + keyup), which discharges the editable-target guard, the modal absence,
   the non-Latin-layout limb and the ⌘Z/⌘⇧Z collision together; plus OD-5's blur/visibilitychange
   clear and an exposed `resetPressedKeys`. **LAW A census §B.3(3) pasted before the delete**:
   ⟨cmd⟩ `grep -rn "updatePressedKeys" demo test scripts` → **exactly two readers tree-wide, both the
   window listeners being replaced**. Byte clause **1 → 0**.
7. **`5f1c8208` · hygiene tail + prose truth.** The last `TS6133` dies with its row; the MISS-3
   comment-truth law applied to every cured line (two OrbitalDrag docblocks still named the retired
   window pair as the latch's writer).
8. **`482e5aa0` · `test(… G-KFW11-1)` — the born-RED gate**, 17 cases over five mechanisms.
9. **`4226e566` · hygiene** — the keyless `v-for` (an eslint error standing at the open sha, on this
   unit's own row, proven pre-existing by linting the open-sha file itself) and the #56
   single-source witness in `cube-scene.test.ts`.

#### The three decisions written before their patches

**(a)** the ME-30/31 sync topology (four clauses, at the head of the composable); **(b)** ME-42's
**edit** representation, stated as a pair of named formatters in `transformMath.ts` beside the values
they format; **(c)** #56 as a graph-attitude **PARAMETER**, required, not a constant folded into the
lighting math. All three are quoted in full in the evidence file.

#### Gates BEFORE → AFTER (every figure double-run)

| gate / clause | BEFORE (`2b649a1d`) | AFTER (`4226e566`) | verdict |
|---|---|---|---|
| **G-KFW11-1** runtime, `npx vitest run --project demo test/demo/scenes/cube-roll-and-prestart.test.ts` | `No test files found, exiting with code 1` · same | **17 passed (17)** · **17 passed (17)** | **GREEN** |
| G-1 byte: `grep -c 'useEventListener(window, "keydown"' …/OrbitalDrag.vue` | **1** · **1** | **0** · **0** | **GREEN** |
| G-1 byte: `grep -rc 'variant:' demo \| grep -v ':0'` | `CubeScene.vue:2` · `SpringScene.vue:2` | **nothing** · **nothing** | **GREEN** (4 → 0, ONE sha) |
| §0u ratchet, this unit's rows | **4** · **4** | **0** · **0** | **GREEN** |
| `npm run test:demo` | 39 files / 286 tests (seat 0) | **316 passed (316)** · **316 passed (316)** | GREEN (includes `.b`'s concurrent adds) |
| `npx tsc --noEmit -p tsconfig.test.json`, this unit's rows | 0 | **0** | clean |
| `npx eslint demo/scenes/cube demo/composables test/demo/scenes/cube-*.test.ts` | 1 error (pre-existing `vue/require-v-for-key`) | exit **0** | GREEN |
| self-trip `git diff 2b649a1d..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | — | **0** | GREEN |
| `git diff --check` | — | clean | clean |

#### Residuals, declarations and returns

- **#7 → KF.W5 by id** (the renderer's object-skip diagnostic); **no `src/**` byte written.**
- **#31/#57 → KF.W12's AXISLINE-UNIT** (booked here, cured there); **`CubeAxisLines.vue` untouched.**
- **KF-AX-1's consumer half opens on `fff7232c`.**
- **kf-CubeScene L-2/C-5 — `complete_with_misses`, declared in the source.** `isPlaying` has no
  writer anywhere; its ONE authority is shared with kf-SquareScene L-8/C-2 and the writer lives in
  `demo/app/scene/useSceneMachineShellBinding.ts` — KF.W13's bounds, outside this wave's. A
  scene-side derivation off the raw non-reactive group would be a SECOND authority, the exact defect
  the row exists to retire, so **nothing was shimmed**.
- **#10 (PRM on the roll)** stays KF.W9's per the registry's own routing (`K10` ≡ kf-CubeScene
  D-8+M-7); named, not spent. **#16/#36** carried by id — their r1 text is superseded at the registry
  path and not quotable at this seat's bytes; the lighting family's ONE cure landed.
- **KF11-E6 (new, producer → SS-6)** — `registerShortcut`'s combo chip renders a `code` spelling
  verbatim (`formatCombo("KeyX")` → `"KeyX"`). Registering SPATIAL bindings by `event.code` is what
  discharges OD-4's layout limb, so the ask is producer-side (a display override on
  `ShortcutOptions`, or `formatComboParts` learning the `Key*`/`Digit*` family). **Relayed at `.j`,
  never worked around demo-side.**
- **KF11-E7 (new, HARNESS)** — the demo vitest lane **cannot import any SFC that transitively loads
  `@mkbabb/glass-ui`'s spring chunk**: a probe importing `MatrixEditor.vue` dies with `Cannot find
  package '@mkbabb/keyframes.js' imported from node_modules/@mkbabb/glass-ui/dist/useSpring-*.js`,
  while `CubeTarget.vue` and `OrbitalDrag.vue` import clean — vite externalises `node_modules`, so
  `vitest.config.ts`'s self-alias does not reach inside an externalised dep. Same class of silent
  coverage cap that KF.W4's G-KFW4-2 cured for the SFC transform, and it caps every future
  glass-consuming mount (KF.W12's KFED/OPTIONS units and KF.W13's dock units will meet it).
  `vitest.config.ts` is in §Excluded's *"Do NOT touch"*, so **nothing was changed to work around
  it**: ME-42/ME-43's policy was lifted into `transformMath.ts` (a better home regardless) and is
  asserted there. **Returned to the orchestrator; it blocks no unit's dispatch.**

#### Commits (keyframes.js `master`, local — not pushed; `.b` shares this index)

`bc5cc128` · `37764477` · `9e7aca87` · `dd7c6008` · **`dc3f0900`** (the unsplit four-site family) ·
**`fff7232c`** (KF.W12's open point) · `5f1c8208` · `482e5aa0` · `4226e566`.

Every commit carries its own pathspec ON the commit; each `git show --stat` audited against §Bounds
rows `:96-103` — **zero writes outside the writable set**, the only non-cube product byte being the
two-line `SpringScene.vue` carve this unit is assigned. No `src/**` · no `CubeAxisLines.vue` · no
`node_modules` · no glass-ui byte · no `test.skip`/`.only` · no `@ts-expect-error`/`as`/
`eslint-disable` · no stash, no `reset --hard`, no force-push · `scripts/dev/dev.sh` never staged ·
the LEDGER row is `.j`'s and was not touched by this unit.

---

### KF.W11.b

SERVED MODEL: claude-opus-5[1m]

**Unit** KF.W11.b — the **square packet** (Track B · X·KF) · **Date** 2026-09-19
**Repo** `/Users/mkbabb/Programming/keyframes.js` @ `master` · **open** `bc5cc128` · **close** `2c5f8c04`
**Evidence** `docs/tranches/X/keyframes/evidence/W11/b-square-packet-2026-09-19.md` (full tables, every figure double-run)

**STATUS: GREEN.** G-KFW11-7 GREEN on all four acceptance limbs and all four byte clauses; the §0u ratchet holds at **0** in this unit's rows, open and close.

#### Gates — double-run at the settled bytes

| ⟨cmd⟩ | spec (today · must read) | run 1 | run 2 |
|---|---|---|---|
| `npx vitest run --project demo test/demo/scenes/square-editor-seam.test.ts` | `No test files found` · GREEN | 1 file / **7 passed (7)** | with `square-scene.test.ts`: 2 files / **30 passed (30)** |
| `grep -c 'setTimeout(step, 520)' demo/scenes/square/useSquareKeyboard.ts` | 1 · **0** | **0** | **0** |
| `grep -rc 'animationGroup.pause()' demo \| grep -v ':0'` | `SquareScene.vue:1` · **nothing** | *(empty)* | *(empty)* |
| `sed -n '29p' demo/scenes/square/useSquareDemo.ts \| grep -c ':161'` | 1 · **0** | **0** | **0** |
| `grep -c 'viewBox' demo/scenes/square/SquareInstrument.vue` | 0 · **still 0** | **0** | **0** |
| `grep -rl 'usesDefaultRenderer\|adoptCompiled' test/demo \| wc -l` | 0 today | **1** | **1** |
| `npm run test:demo` | — | 41 files / **328 passed (328)** | 41 files / **328 passed (328)** |
| `npx vue-tsc --noEmit -p tsconfig.json \| grep -E 'square\|Square'` | ratchet **0** | *(empty)* | *(empty)* |
| `git diff 1233e42e~1..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | **0** | **0** | **0** |

Three byte clauses tripped mid-unit **on my own prose** — the gate greps bytes and a comment quoting the banned string is a byte (`animationGroup.pause()` read 2, `viewBox` read 4, `setTimeout(step, 520)` read 1). Each was **reworded, never suppressed**, and each re-read 0 twice. Recorded so a future seat knows the clean count was earned.

#### §0u ratchet (OP-0)

**0 diagnostics in this unit's rows at every measurement; the count never rose.** The *global* figure is not mine to own (four tracks, one tree; `.r` re-derives the CI-faithful floor as **31 → 29**): it read 29 at my open, rose to **30** mid-unit, and reads **25** at my close. I enumerated the rise by file before continuing — the added diagnostic was `demo/scenes/cube/CubeTarget.vue`, **unit `.a`'s row**, from sibling commit `bc5cc128` in this same working tree. Nothing of mine changed. `.j` states the close delta against 31.

#### L-2 — the sha KF.W12 KFED-UNIT asked for

**`L-2` sha = `d7f68225`** ("the renderer belongs to the RECEIVER, and a failed frame degrades instead of wedging — G-RENDERER + G-RAF", KF.W5.d, 2026-09-17).

`kf-SquareScene.md:40` disposes L-2 as an **OR** and the **library arm landed first**: `compile-bridge.ts` now keeps `receiver.own` across a transplant, where `d7f68225^` was a bare transplant with **no renderer clause at all**. Per **R.2 GREEN-BEFORE-CURE** the row is booked **`LANDED-BY d7f68225`** — born witness written, passes twice at my open sha, cause named, **not re-cured and not claimed**. Consequence stated plainly: **`useKeyframeOps.ts` is byte-unchanged by this unit**; the `:58-69` carve was not spent, and `useKeyframeOps.ts(80,13)` is **outside** the carve and left to KF.W12 untouched. The `RAFPlayback` degrade-not-wedge rider split the same way — library half at `d7f68225`, **demo half landed here** (`num()` made TOTAL; `colorAt`'s two static parses moved out of the frame path).

#### OP-3 re-derivation — performed *before* the geometry cure

full-drag half-extent `96×1.12 + 110 + 8 = 225.5px` · tour-corner `96×1.08 + 90 + 8 = 201.7px` · mobile half-width `187.5 @375 · 195 @390`. Both half-extents exceed both mobile half-widths inside an `overflow:hidden` plate — **the subject amputated during the scene's own headline animation**. Reproduces the record's figures and justifies the clamp. After: `@375 → 151.8 ≤ 187.5` · `@320 → 128.9 ≤ 160` · `≥524` byte-identical to the fixed pair. One custom property is read **and re-read on resize**, so the spring's coordinate world and the painted geometry cannot drift apart.

#### OP-7 — the gated subset, NAMED BEFORE ANY CURE WAS SPENT

**D-2** (the caption/telemetry prune — the OD-5/T.M2 sign-off decides which layers live) · **D-18** (the badge live region, rides D-2) · **D-10** (legend casing — *moot if D-2's prune takes the legend*) · **N-SQ-5** (title rung — rides the D-2 sign-off) · **D-22** *(added by this seat: the block IS the legend; its type register cannot be unified without pre-empting D-10 and the prune — declared gated by adjacency, not cured)*. The **scene**'s D-9 is the same decision as N-SQ-5 and is gated with it. **No layer was deleted un-ruled.** The **instrument**'s D-9 core ≡ C-7 is a different row — an orphaned class token, not a layer — and was cured with its LAW A census.

#### Locks — all honoured

- **Tether family D-1 + D-6 + D-16 + N-SQ-4 did NOT split**: one commit, `b9b5476c`, and the cure derives the frame **from travel** — never by adding a user-space box, exactly as N-SQ-4 orders. The byte clause reads 0 twice.
- **MISS-3's settle-paced tour AND its assertion in ONE commit**: `8c0122e1`. There is no timer left in the file; the assertion (advance 10 s → no movement; four settles → four legs in order; extras → nothing) lands beside it.
- **L-2's library half DECLARED, never written.**
- **LAW A** ran before every delete (`palette-sweep-host` 1 site · `.square-live-caption` 1 site, no rule in *any* revision · the dead cross-boundary tether PRM rule · `tourTimer` 4 refs, all file-local).

#### Commits — 10, each by exact pathspec, each with the session trailer

`1233e42e` L-2 born witness · `769f3aec` D-27/L-7/C-9 · `61f3fdb4` one playback authority · `43cb2c05` colour packet · `b9b5476c` tether-truth · `f6ea8ba1` instrument-truth · `3af1422b` input + disclosure · `c71642c9` field · `8c0122e1` MISS-3 · `2c5f8c04` geometry + chrome + hygiene tail.

#### ESCALATION — one, bounded

**`SquareScene` cannot be mounted under vitest**: `Cannot find package '@mkbabb/keyframes.js' imported from node_modules/@mkbabb/glass-ui/dist/useSpring-9u2_shxV.js` — the producer's built chunk imports by bare specifier and the demo project's resolver has no alias. The one-line fix is in **`vitest.config.ts`, explicitly in §Bounds' "Do NOT touch" list**. I did **not** patch it, patch `node_modules`, mock the producer, or skip the case — each is the masking-fallback class the dispatch names a HIGH defect. **Bounded consequence:** the gate's PAUSE-through-the-machine limb is witnessed without a mount — by the byte census (the group's own `pause()` has exactly one caller, behind the machine) plus the 8-branch takeover-before-reseat ordering assertion. A real witness of the invariant; not a mounted-component witness. **Ask:** whichever unit owns `vitest.config.ts` adds the alias — every square scene-level mount witness in this wave and the next is blocked on it.

#### Residuals — declared, not dropped

**L-16/C-10** (the seam is `useSweepScene`, **outside my writable set** — not written) · **L-13/C-11** (routed *NO-WAVE-OWNER + a library rider*; no honest demo-only cure) · **L-D6** (the adjudication scopes it **SS-13 #8, a trace**, not a cure) · **D-20 / D-12 RTL** (house-wide rider, routed to **KF.W9**) · **D-16 magnitude** (row marks it UNPROVEN; SS-13 #10 wants it re-derived under the producer PRM override).

#### Inherited-paths clause

**Zero writes outside the writable set.** No `src/**` byte (the library oracle was **read-only**) · no `useKeyframeOps.ts` byte at all · no `vitest.config.ts` · no `node_modules` · no glass-ui byte · no sibling track's paths · no `test.skip`/`.only` · no `@ts-expect-error`/`as any`/`eslint-disable` added · no stash, no `reset --hard`, no force-push · **`scripts/dev/dev.sh` never staged**. Every commit used `git add <exact paths>` + `--` with the same exact paths; the LEDGER row for this wave is `.j`'s and was **not** touched by this unit.

#### SELF-COUNT

This receipt: **10** commits listed and **10** exist in `git log` · **9** gate commands tabled, each with **two** runs · **5** OP-7 rows named · **5** residuals declared · **1** escalation · **4** locks discharged · **0** claims not read from settled bytes.

### KF.W11.d

SERVED MODEL: claude-fable-5-1

**Unit** KF.W11.d — the **sequence packet** (Track B · X·KF · phase 1, group 3) · **Date** 2026-09-19
**Repo** `/Users/mkbabb/Programming/keyframes.js` @ `master` · **open** `2c5f8c04` (`.b`'s close)
**Spec** `KF-W11.md` §Agent Units `:237-241` · §Carry P2 `:170-178` · §B.1 row 2 `:82` · §Bounds rows `:104-110` · §B.3(1) `:147` · §Gates G-KFW11-2 `:291` · §Sequencing 8 `:324` · §Commit plan 3 `:378`.
**Evidence** `docs/tranches/X/keyframes/evidence/W11/d-sequence-packet-2026-09-19.md`.

#### Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` → two untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-*` mail packets — outside every `.d` path, untouched. ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → five modified rows (`demo/shell/dock/layers/SlugEditLayer.vue`, `docs/tranches/V/reformation/CARRY-LEDGER.md`, `e2e/smoke/a11y-gradient-stop-grammar.spec.ts`, `eslint.config.js`, `scripts/dev/dev.sh`) + one untracked dir (`docs/tranches/X/fourier/conformance/walk/`) — all sibling-seat or unowned rows, none inside this unit's set; `scripts/dev/dev.sh` never staged. ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/B/KF-W11.md docs/tranches/X/keyframes/evidence/W11` → **empty**. **ZERO inherited hunks on any path this unit may write.**

#### Anchors re-resolved at the open sha (KF-AT-28 / D-19)

⟨cmd⟩ `git diff --numstat 69095552..2c5f8c04 -- demo/scenes/sequence/` → **empty** — every sequence file is BYTE-IDENTICAL to the spec's ref, so every §B.1 and §Carry anchor binds unchanged: `SequenceTarget.css:175-178` is the `.seq-handle:focus-visible` rule (`:177` the `box-shadow`), `SequenceTarget.vue` has 0 `focus-ring` hits, `SequenceScrubber.vue:176` cites `design-idioms.css:584` in a 300-line file, `SequencePlayhead.vue:27` carries the `top: calc(0.75rem + 1.25rem)` literal, `SequenceScene.vue:30-31` the mint-on-read getter + inert write. **Ratchet at open**: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'` → **25** whole-tree; filtered to `demo/scenes/sequence` → **0** (this unit's floor; may not rise).

#### THE DECISION — the canonical time domain (M-10's frame; K-25; §Seq 8) — written BEFORE the family's first commit

Four domains are live at the bytes, and they disagree:

| # | domain | where it is painted or announced today |
|---|---|---|
| 1 | the **authoring range** `at ∈ [0, STAGGER_MAX = 1600 ms]` | handle `left: at/1600·100%`, `--row-start = at/1600`, the axis labels `q·1600`, the row sliders' `aria-valuemax` |
| 2 | the **master clock** `t ∈ [0, sequence.duration]` ms (1940 at the default staircase; STALE after any retime — N-2) | the engine's own loop; `sequence.progress = t/duration` |
| 3 | the **normalized progress** `p ∈ [0, 1]` | the playhead `--playhead-p`, the scrubber, the header `Metric` (%), the timecode `0.000`, the master slider's `aria-valuenow` (0–100) |
| 4 | the **pixel domain** — three p→x maps on one rail | handle centre at `at/1600·100%`; ball LEFT-anchored at `(row-start + ball-p·(1−row-start))·(100cqw − ball-size)`; playhead at `p·100cqw − 50%`; scrub-ball centred at `p·100cqw` |

**CANONICAL = domain 2 — the master clock in milliseconds, `duration = max over rows of (at + ROW_DURATION)`.** It is the one clock the engine actually drives, and the one the ruler's own charter (J.W7c C-SEQ-2, `SequenceAxis.vue:5`) says it names. One spec, four consequences:

1. **Every horizontal position is `t / duration` of the track column.** Handles at `at/duration`; `--row-start = at/duration`; the playhead at `time/duration`; the axis labels `q · duration` with the **terminal label = `sequence.duration`** (N-1's born-RED gate). `STAGGER_MAX` survives ONLY as the row slider's control range (`aria-valuemin/max`, the clamp) — a control's range, never a painted domain.
2. **N-2 lands AGAINST N-1 in the same sha (K-25).** With `duration` the denominator everywhere, the engine's stale `_duration` (written only by `add()`, monotone, private) would poison every position after the first drag. The demo therefore stops mutating `entries` in place: on every retime and on reset it **rebuilds the engine `Sequence` from `childAnims` + `delays` through the public `add()`** — the only `_duration` writer — and re-seeks the retained master time. `sequence.duration` is then honest by construction and the axis reads it. The engine-side rider (recompute `_duration` on entry mutation, or close `entries` mutability) is **DECLARED to KF.W5/KF.W8 by id (N-2) and not written** (`src/**` is a wave-invalidating bound).
3. **Domain 3 is derived, never authored**: `p = time/duration`. The master slider announces the canonical unit — `aria-valuetext = "<ms> ms of <duration> ms"` — and the row sliders `"<at> ms"` (**N-14, sequenced AFTER N-1** inside the same family: the domain hunks precede the valuetext hunks and the test asserts them in one run). The header `Metric` becomes the canonical clock's visual-numeric exposure (ms, N-14's rider) at a rung below the scene title (D-6); the scrubber's timecode keeps the normalized scalar with its prose corrected (D-3).
4. **Domain 4 collapses to ONE p→x convention — centre-anchored on the track column**: handle centre, ball centre and playhead line all sit at `f · 100cqw` with a self-centring `−50%` / `−ball-size/2`; the ball rests ON its gate at `--ball-p = 0` by construction (N-4), the playhead track is placed on the same grid line as the axis and the tracks (D-1, after OP-3 below).

**OP-3 re-derivation (D-19), performed before the geometry cure, at `2c5f8c04`**: the stage grid is `grid-template-columns: var(--label-col) 1fr` with `gap: 0.5rem 0` (`SequenceTarget.css:56`), `--label-col: 3.25rem`, `--col-gap: 0.75rem`, `--track-inset: calc(--label-col + --col-gap) = 4rem`, padding `0.75rem 1rem 1rem`. Column 2 therefore starts at padding-left + 3.25rem = **1rem + 3.25rem = 4.25rem** from the stage's border-box (the axis, `grid-column: 2`); the row track sits in the subgrid with `column-gap: var(--col-gap)` = 0.75rem, whose extra gutter is redistributed inside the parent's 0-gap column pair — the SS-13 #1 branch (4.25 / ~4.625 / 5rem); the playhead track is abspos at `left: calc(1rem + var(--track-inset))` = **5rem**. Split at p = 0: **12px** (5 − 4.25 = 0.75rem), decaying to 0 at p = 1 (both right edges at `right: 1rem`). The banked figure reproduces exactly. **Cure**: the stage declares `gap: 0.5rem var(--col-gap)` so the parent and subgrid gutters coincide (no redistribution branch survives to be ambiguous about), and the playhead track is **placed on the grid** (`grid-column: 2; grid-row: 2 / -1; inset: 0`) instead of transcribing the padding, so its left edge is the same grid line by construction, its top is the rows' top (D-2/L-4/C-5's hardcoded axis height and the 4.8px mobile drift die), and the diamond head can no longer strike the axis strip (the SS-13 #4 collision rider lands in the same commit, as the axis record orders).

#### THE GESTURE SPEC (kf-SequencePlayhead N-12 · N-13 · N-3 · N-18; kf-SequenceScrubber C-2/L-D-4 + KF-SCR-6 + the N-13 bloom rider + C-12) — one spec

- **What the playhead affords: nothing.** It is a reading mark (`pointer-events: none`, `cursor: default`); the grab cue it wore (`cursor: grab` beneath it via the handles) is the handles' own. The diamond is not a handle.
- **Which element carries the name (N-18)**: the phosphor line in the stage IS "the master playhead" (`SequencePlayhead.vue`); the rail below is "the master scrub rail" that DRIVES it — its eyebrow, aria-label and prose say "master clock", never "master playhead".
- **Which gestures light the well (N-13)**: every master-clock scrub — pointer (down→up) AND keyboard (keydown→keyup/blur) — sets `isScrubbing`; row retimes are authoring gestures, not scrubs, and do not light the well (declared, not omitted).
- **When the streak flips (N-3, C-12)**: per admitted sample, from the sign of `p − lastP`, with a **deadband** — a zero-delta sample leaves the direction untouched; the keyboard path writes the same latch.
- **One helper, four consumers (C-2/L-D-4, KF-SCR-6)**: `applyScrub(p, { gesture })` in `SequenceScrubber.vue` — pointer samples and the four keyboard verbs all route through it; the keyboard step is the **named** `SCRUB_KEY_STEP` (declared beside `ROW_AT_STEP`'s posture, not a bare literal).
- **The NaN guard belongs at the projector** (the ruling-8 family): a zero-width rail projects to the current progress, never to `0/0`.

#### THE STATE-SIGNAL SPEC (kf-SequenceTarget D-9 + D-15 + ST-2 + ST-4 + ST-10)

The reel's running state is the shipped Button `loading` contract — `:loading="demo.isReeling.value"` — which emits `aria-busy`/`data-loading` and suppresses activation: it IS the announcement D-9.2 lacked, the affordance D-15 promised as a "pulse", and the user-visible form of `playReel`'s silent guard. `.reel-active` (a `border-color` on a 0-width border, ST-2) and the default-valued `emphasis="secondary"` (ST-10) die with it; the button takes `size="xs" iconOnly` (C-2) and a hover name (D9). The badge gains `role="status"` (D20) and its dead `reverse` arm dies with SC-2 (D19(a)).

#### SC-2 — the transport-surface decision (expose or delete)

`reverse`, `setTimeScale`, `resume`, `play`, `togglePlay`, `isReversed`, `timeScale`, `delays`, `scenePlayback` have **zero consumers** through the injector (census re-run below). **Decision**: `reset` is EXPOSED — it becomes the drag gesture's undo, a visible header button beside the reel ("Reset the storyboard rows to the default stagger"); the six transport verbs/flags with no affordance and no engine need are DELETED together with `isReversed`'s badge arm (the F.W9 docblock's "reverse / timeScale" claim is corrected — the prose-truth sweep). `pause`/`isPlaying` stay (consumed internally and by the badge). The engine-side rider joins N-2's declaration.

#### ESCALATION KF11-E(d1) — the loop-seam family, returned not written

**L-3 + L-10 + SC-5 + SC-6 = ONE commit whose cure is "one `SweepSceneOptions` parameter"** (`kf-SequenceScene.md:154`; spec §Carry P2). `SweepSceneOptions` is declared in `demo/composables/scene-runtime/useSweepScene.ts` (measured: `interface SweepSceneOptions` at `:43-64`, `useSceneVisibilityPause(() => playback.running, stopLoop, startLoop)` at `:119` bound to its OWN `RAFPlayback`) — **a path outside this unit's writable set** (§Bounds `:104-110`; `.b` declared the same file out of bounds for L-16/C-10). The specified cure is impossible at this unit's bytes without a write the spec makes an ESCALATION, and a demo-side substitute (hand-wiring `useSceneVisibilityPause` to the Sequence loop) is exactly the duplication the seam exists to end. **Not written; not substituted; the family is NOT split** — none of L-3/L-10/SC-5/SC-6 lands here. The cure shape, for whichever seat is granted the file: `SweepSceneOptions.loop?: { start(): void; stop(): void; running(): boolean }` — when supplied, `startLoop`/`stopLoop` drive that loop (the Sequence's `play`/`resume`/`pause`) beside the mirror, `isLoopRunning` reads it, and the visibility pause gates it; the sequence demo then deletes its hand-built `createRafAdapter` (L-10), publishes the seam's `scenePlayback` as the ONE adapter under ONE name (SC-6), and `isPlaying()` reads the loop that moves the pixels (SC-5). The demo-side consumption hunk is ready to land on that seam in one commit.

#### The mount bound, stated before the test is written

⟨cmd⟩ a scratch mount of `SequenceTarget` under `npx vitest run --project demo` → `Error: Cannot find package '@mkbabb/keyframes.js' imported from node_modules/@mkbabb/glass-ui/dist/useSpring-9u2_shxV.js` — `.b`'s blocker reproduced: `SequenceTarget` imports glass-ui `Button`/`Card`/`Metric`; the fix is the alias in `vitest.config.ts`, a §Bounds Do-NOT-touch row; no mock, no `node_modules` patch, no skip. **Consequence**: G-KFW11-2's runtime file mounts the import-free leaves (`SequenceAxis`, `SequencePlayhead`, `SequenceScrubber`) against the REAL `useSequenceDemo` (warmed engine), and witnesses the Target-only clauses (ST-4's binding; the three-rect equality) at the settled bytes — the rect equality as a **grid-model invariant over the parsed stylesheets** (parent gap ≡ subgrid gap ≡ `var(--col-gap)`; axis, track and playhead track each on `grid-column: 2`; no transcribed `left:` offset) with the pixel witness named to SS-13 #1/#10. **Ask (repeating `.b`'s)**: the unit that owns `vitest.config.ts` adds the alias; every scene-level Target mount in this wave is blocked on it.

#### Acts in order — thirteen families, thirteen commits, each by exact pathspec with the session trailer

Evidence: `docs/tranches/X/keyframes/evidence/W11/d-sequence-packet-2026-09-19.md` (the double-run transcripts, the full id roster, the commit audit). ⟨cmd⟩ `git log --oneline 2c5f8c04..HEAD` → **A** `36ec392e` canonical domain + instrument-truth core (N-1 · N-2 · N-14 · N-4 · L-10/C-4 · C-11) · **B** `b235ab03` SC-2 (reset EXPOSED, nine names DELETED, D19(a)) · **C** `e8f973cf` reel packet (D7 · SC-3/L-5 · ST-7/L-9 · L-8/ST-6 · SA-5/N-17) · **D** `e15eb9ed` geometry after OP-3 (D-1 ruling 1 `gap: 0.5rem var(--col-gap)`; the playhead track PLACED on the grid — `grid-column: 2; grid-row: 2 / -1; inset: 0` — D-2/L-4/C-5 · D-10/L-2 · D-13/L-12 · N-8; the ruler's placement hoisted; the label column + register; ST-9 · D-22 · D-8) · **E** `26467cf2` stacking, one deletion (D-3/L-3) · **F** `d09e1911` property hygiene (D-11 · L-9/C-6 · D-14 · N-9 · N-5/N-6/N-7/N-15 · D-17/D-18 · D-12) · **G** `f4249cb0` ST-1 — the one word `kf-focus-ring` on the row slider + the `.seq-handle:focus-visible` deletion in ONE sha (⟨cmd⟩ `grep -c 'focus-ring' SequenceTarget.vue` → `1`; ⟨cmd⟩ `grep -c 'box-shadow: var(--focus-ring-shadow)' SequenceTarget.css` → `0`, double-run) · **H** `da8281df` ST-4 — `:loading="demo.isReeling.value"` (D-9.2 · D-15 · ST-2/SC-7 · ST-10 · C-2/D22 · D9 · D20) · **I** `344c0ba2` the gesture spec — ONE `applyScrub(p, {gesture})` for pointer samples and the four keyboard verbs, every scrub lights the well through `demo.setScrubbing` (the local shadow ref deleted, C-5/L-D-3), key-up/blur cool it, direction latched per admitted sample with C-12's deadband, `SCRUB_KEY_STEP` named beside `ROW_AT_STEP`, the projector's zero-width guard, `kf-focus-ring` + `touch-action: none` + `h-12` on the rail, the eyebrow at the one caption rung with `.seq-eyebrow` deleted, the comet grows in/out (D-6/C-8); mount witness 6 → 10 cases, none weakened · **J** `dd3eb6eb` the Axis trio — its own two-pitch tick band driven by an inline `--tick-count` (L-2), labels `q × duration` ms, the unit legend once on the terminal label (D-3/D-2/D-4), legend posture (SA-2), edge-hug by `:nth-child(1 of S)` (D-8a/L-10), an `@container` fold under 260px (SA-4), tranche ids out of the comments (D-13); the boot arm gains the playhead (N-20) with its PRM arm · **K** `f26966a5` prose-truth sweep + store hygiene — SC-1/D23 both lines gone with the `@state` import, the scene docblock's `scenePlayback`/`CONTROL_SURFACES`/transport claims corrected (L-6/C-5 · L-11/C-4), the target is the scene's root (D21), the playhead docblock's `--track-inset`/"no per-frame JS"/"master red" corrected (N-19/D-4/D-5/L-7), the Target stylesheet's "clock green" header → the master authority, `seq-root` + one-child `gap-4` deleted (L-8), the scene name an `h2` (D-5); DESIGN.md's two sequence statements checked true, nothing written · **L** `a83f2df8` the gate file committed last, GREEN against the cures it was born RED against · **M** `ba12b2ba` `sequence-scene.test.ts` extended (SC-2's census as a witness; D7's guard) — 4 → 6 cases.

#### Gates — BEFORE → AFTER, double-run

| gate | BEFORE (at `2c5f8c04`) | AFTER (at `a83f2df8` / `ba12b2ba`) | verdict |
|---|---|---|---|
| **G-KFW11-2** runtime | ⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/sequence-instrument-truth.test.ts` → `5 failed (5)` · `5 failed (5)` | `5 passed (5)` · `5 passed (5)` | **GREEN** |
| **G-KFW11-2** byte clauses | `focus-ring` in `SequenceTarget.vue` `0`; the ring-shadow decl in `SequenceTarget.css` `1` | `1` · `1` ; `0` · `0` — flipped in ONE sha `f4249cb0` | **GREEN** |
| mount witness | `6 passed (6)` | `10 passed (10)` · `10 passed (10)` | GREEN |
| `sequence-scene.test.ts` | `4 passed (4)` | `6 passed (6)` · `6 passed (6)` | GREEN |
| `npm run test:demo` | `.b`'s close figure at this sha (record :598): 39 files / 286 tests — not re-measured by this seat | `42 / 337` · `42 / 337` at `a83f2df8`; `42 / 339` · `42 / 339` at `ba12b2ba` | GREEN |
| skip-grep ⟨cmd⟩ `git diff 2c5f8c04..HEAD -- test \| grep -c 'test.skip\|it.skip\|\.only('` | — | `0` · `0` | GREEN |
| `git diff --check 2c5f8c04..HEAD -- demo/scenes/sequence test/demo` | — | clean | GREEN |
| **§0u ratchet** ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | `25` whole tree · `0` in `scenes/sequence` | `25` · `25` whole tree · `0` · `0` in `scenes/sequence` — never rose; no cast/`@ts-expect-error`/`eslint-disable` written | GREEN |

Positively: this seat wrote **zero** of the discharge receipt strings G-KFW11-10 forbids (the pattern is stated in words here, never spelled).

#### Locks — all honoured

Own-set paths only (⟨cmd⟩ `git show --stat` on each of the 13 shas → every path under the `.d` writable set); `useSweepScene.ts`, `vitest.config.ts`, `src/**`, glass-ui, `design-idioms.css` never written (the loop-seam family and the mount alias returned as escalations, above); `scripts/dev/dev.sh` never staged; no stash/reset/force; E-3 honoured (no dated artefact edited — this receipt and the evidence file are appended/created); the record's `.d` head untouched, this receipt appended beneath it; no index.lock met.

#### Escalations — two, both bounded, neither a write

1. **KF11-E(d1)** (stated in the head, unchanged at close): the loop-seam family L-3 + L-10 + SC-5 + SC-6 needs `SweepSceneOptions.loop?: {start, stop, running}` in `demo/composables/scene-runtime/useSweepScene.ts` — out of bounds; nothing of it landed, the family not split; `useSequenceDemo.ts` still builds its `scenePlayback` adapter internally for `facility.playback`, exactly as at open. Owner: the unit that holds `demo/composables/scene-runtime/**` (KF.W12 by the spec's roster).
2. **The vitest alias** (`.b`'s ask, repeated): `vitest.config.ts` — every scene-level Target mount in this wave is blocked on it; G-KFW11-2's Target clauses are witnessed at the bytes and through the real composable meanwhile.

#### Residuals — declared, not dropped (the full roster is evidence §4)

KILLED-with-rationale: SA-3 (axis) · D16 (target). Carried by path: D-9 (axis; the breakpoint-token family, T.F's gate) · L-11/C-4's other two instances (`EasingScene.vue:24` → KF.W12 OPTIONS-UNIT; `SpringScene.vue:74-77` → `.c`) · D-10/L-11 scene-token rename (idiom-owned names) · N-12 (the diamond is declared NOT an affordance by the gesture spec) · ST-8 (error posture: throws by C-11's ruling) · C-13 (the default projector, `.i`'s) · D21 partial (the target's own width bound is the cell's question, KF.W12). GREEN-BEFORE-CURE: D25 LANDED-BY `3c8a5525`. Two corrections to commit prose, stated here because a commit message is a record: family I's "9 → 15 cases" is truly **6 → 10**; family L's "the sha `.i` opens on" is superseded by family M.

#### Inherited-paths clause

`SequenceScrubber.vue` was this unit's first writer; every other `.d` row was inherited from the registry's adjudicated state at `2c5f8c04` (byte-identical to `69095552` at open, per the head). `test/demo/instrument/sequence-scrubber-mount.test.ts` extended only (6 → 10), never weakened: the C·C-4 guard, the 0.55/0.45 keyboard figures and the `[1, 1, -1]` latch assertions are unchanged at the bytes.

#### SELF-COUNT

13 families declared in this receipt, 13 shas listed, 13 in ⟨cmd⟩ `git log --oneline 2c5f8c04..HEAD | wc -l` → `13`. Files touched: 11 in keyframes.js (10 at `a83f2df8` + `sequence-scene.test.ts`), 2 in value.js (this record; the evidence file). SFC line counts at close all ≤ 317 (evidence §5).

**The sha KF.W11.i opens on: `ba12b2ba`** (keyframes.js `master`).

---

### KF.W11.c

SERVED MODEL: claude-opus-5[1m]

**Unit**: `KF.W11.c` — the spring packet (phase 2). Spec: `KF-W11.md` §Agent Units `:231-235` ·
§Carry P3 `:180-185` · §B.1 rows 5/6 `:85-86` · §Bounds rows `:115-117` · §B.3(2) `:147` ·
§Gates G-KFW11-3 `:293` · §Commit plan 4 `:379`. **Status: PARTIAL** — every row of P3 landed
except **M-4→M-3**, whose bytes §Bounds assigns to another unit; that family and gate case (b) are
returned as **ESCALATION KF11-E(c1)**. G-KFW11-3 GREEN on its runtime run (9/9, double-run) with case
(b) absent-and-declared, never skipped. This unit's §0u rows **1 → 0**. One residual of this seat's
own making is disclosed at the foot.
**Evidence**: `docs/tranches/X/keyframes/evidence/W11/c-spring-packet-2026-09-19.md` (every census,
re-anchor, re-derivation and transcript in full).

**CRASH-RECOVERY (standing law, first act).** ⟨cmd⟩ `git -C ../keyframes.js status --porcelain --
demo/scenes/spring test/demo/scenes` → **empty**; ⟨cmd⟩ `git status --porcelain --
docs/tranches/X/execution/B/KF-W11.md docs/tranches/X/keyframes/evidence/W11` → **empty**.
**ZERO inherited hunks on any path this unit may write — nothing to finish, nothing to rewrite, no
inherited paths to name.** Dirty rows outside the set (keyframes' two untracked `VALUEJS-INBOUND-*`
packets; value.js's `CARRY-LEDGER.md` and `scripts/dev/dev.sh`) were read and left untouched;
`scripts/dev/dev.sh` never staged. **Open sha `ba12b2ba`.**

#### Act 0 — the anchors, re-resolved at true bytes before any cure

The banked coordinates bind to `81a56990` (470 L); the file at open is **476 L**, so each was
re-resolved at both refs. **Five of seven hold exactly** (`:126-130` the on-stage copy · `:75-79` the
false target-line invariant · `:179-180` the orphaned clamp comment · `:91-93` the painter comment ·
`useSpringDerby.ts:100-101`). **Two MOVED and are re-anchored**: the *"fades in/out"* cell
`:402-403` → **`:411`** (+8), and `SpringScene.vue:192-193`'s *"or taps the rail — `reseat` re-arms
the loop directly"* → **`:250`** (+57). §B.1 row 6's own subject reproduces exactly: the clamp sites
read `:210` and `:222` at this seat, as the spec measured. §Seq 6 verified before the first byte:
`.a`'s glass-conformance carve arrived landed — ⟨cmd⟩ `grep -rc 'variant:' demo | grep -v ':0'` →
**nothing** (4 → 0 at `.a`'s `dc3f0900`), and this unit never re-touched those two lines.

#### Acts 1–9 — the packet in the record's own order

1. **`8dcf5882` · C-1, the contract head — and it sizes the rest, as the brief says.** The chain
   re-walked at the bytes: `reseat` armed a loop whose `frame()` returned false on
   `machine.status !== "playing"` **before** `liveSpring.tickDt`, so on the scene's documented entry
   state the marker and `aria-valuenow` responded while the ball stayed parked. **The repair is the
   contract decision the record says it is, and it is written down in the file**: PLAY-intent owns the
   unbounded sampler SWEEP and only the transport dispatches it; CHASE-intent is the rail's, runs the
   SOLVER to its own settle, and withdraws itself. A cure that bought motion by dispatching PLAY
   would have re-opened VERDICT #19 (the sampler swept forever at idle, ~33 % of a core) — the
   regression `autoPlays: false` exists to hold, which superlative 5 protects — so the gate asserts
   the sweep phase is **byte-identical** after a rail tap. Rest-on-entry is preserved exactly:
   `chaseIntent` is born false and the mount's `startLoop()` still runs one frame that finds neither
   intent and stops (asserted, not assumed). Riding, same meaning: **D-3**'s three-site flag pass
   (`SPRING_BASE`, `respectReducedMotion: true` — under PRM `set target` snaps, so the settle check
   is already true on frame 1 and the chase paints no travel); **KF-SS-8**'s scene half (the loop
   advances the SELECTED channel, so Play no longer moves every clock except the one on stage);
   **KF-SS-33**'s four dead exports with their censuses; **KF-SS-2 DECLARED** at the byte that blocks
   it; and the **§0u ratchet row** `useSpringDemo.ts(1,29) TS6133` falling with the
   `onScopeDispose` import it named — a deletion, never a suppression.
2. **`0c8e4096` · the honest-instrument core M-2 + D-2 + D-7/C-8 + the prose.** **OP-3's
   re-derivation was performed first and is pasted in the file**: at 375w the Card content box is
   **279** and `overflow-hidden` clips at **303**, so value 1.18 puts the 36 px ball **44.2 px** off
   the plate; at the `lg` measure the same 1.18 is **124 px** off. **The failure scales with width,
   so no fixed-px reserve can hold a fractional overshoot** — that measurement is what chose the
   cure. The rail now RESERVES the engine's documented 0.18 band at both ends and every mark reads
   one `railPct` map, so the clamp is an explicit ALLOWANCE (not the silent `[0,1]` truncation M-2
   convicts) and **a clamped ball is on the plate at every width by construction** — D-7's clip limb
   dies with the geometry rather than by a cap. The rail became the gesture surface and the
   container; an inset `.spring-track` is the value axis, so `.stage-field-x`'s quarter gridlines
   mark **true value quarters** and the groove's right edge really is value 1 — the invariant
   `:75-79` asserted and the old full-width geometry could not deliver. **D-2**: the settle pulse
   moved off the line pinned to one end of a user-mutable axis onto the marker, which is the mark
   that knows where the field rested; the line keeps an honest job as the value-1 scale reference;
   and the marker's `transition: border-color` — dead CSS with no writer, N-3's half — is now written
   by the pulse it was always shaped for. Riding: C-5/N-8 (the marker leaves the `left` property for
   `translateX(<cqw>)`, retiring the per-pointermove read-after-write reflow pair), the derby tag's
   own reserved gutter, **KF-SS-5/D-4**'s AA cure through `.status-badge`'s documented mix with the
   opacity composite the adjudicated arithmetic convicts, N-2/MM-29's letter-spacing half, m-6 · m-7
   · m-10 · N-7, and the two false prose surfaces.
3. **M-4→M-3 — NOT LANDED. ESCALATION KF11-E(c1)**, stated in full below.
4. **`14bf3a32` · M-5.** The guard and the flag the overlay renders on were two booleans with two
   lifetimes (~1340 ms vs ~2040 ms), so a re-entry in that 700 ms window passed the guard and
   `derbyTimers.length = 0` **orphaned** the pending hide-timer, which then unmounted the lanes
   mid-race; the same truncation emptied the array `onScopeDispose` iterates. One state, and one
   `cancelTimers()` that clears before it drops, used by re-entry and disposal alike. `derbyRunning`
   deleted with its **LAW A census (§B.3(2))** pasted at the site — four lines, all in that file, zero
   consumers elsewhere, no comment to bury. **Also here, disclosed**: the derby's settle now re-arms
   the chase it owes — the egg used to reach `reseat(0)` and inherit its arming, and the
   restore-the-pose settle this packet landed writes targets directly, so it must assert the intent
   itself. Caught by walking the C-1 contract back through every target writer, not by a gate.
5. **`db588faa` · N-1.** Both halves. The opacity transition moved from inside
   `.spring-rail--derby` to the base rules (the modifier-only asymmetry: class-add faded, class-remove
   SNAPPED), and the `v-if` overlay gained a real `<Transition>`; `@keyframes derby-fade-in` deleted
   with its single consumer and its census. The PRM block keeps its local `animation: none` (**K-6** —
   the universal override constrains duration and iteration-count, never `animation-name`) and
   deliberately declares nothing for the overlay's transition, because that override's `!important`
   would make it dead CSS — the very class this packet is clearing.
6. **`cf5fb201` · the gesture spec (D-5 · m-11 · i-18 · N-3) — ONE spec, written at the seam.** Six
   clauses in the file. N-3's whole vocabulary (the `dragging` ref `useDragScrub` has been returning
   all along was never destructured); D-5's keyboard parity for the egg — **a key, not a reinstated
   affordance**, because the on-stage legend's retirement is an owner decision left where the owner
   put it; m-11's race-time refusal and i-18's pose restore (bytes in acts 1 and 4, the spec they
   answer to here). Riding: **KF-SS-30**'s key collision (`preventDefault` without
   `stopPropagation` while the global transport binds the same keys and the dispatcher exempts no
   `div[role=slider]`).
7. **`a683198b` · the a11y one-edit family D-6 + D-14 + N-4.** A heading and landmark where a grep
   returned zero across seven files, on the sibling's own semantics; the badge becomes the
   `role="status"` region (the 6 Hz restraint preserved — it flips on a transition, never per tick —
   and it doubles as the derby's only announcement channel, since the overlay is correctly
   `aria-hidden` decoration); and the name stops being an instruction naming a modality while
   `aria-valuenow` stops announcing a 0-100 scale that appears nowhere in a `[0,1]` UI. The valuetext
   deliberately omits the live value: that would make a slider announce 6×/s. Riding: KF-SS-32's
   missing APG step ladder, `aria-keyshortcuts`, and **§B.1 row 5's second and last bare
   `focus-ring` host** — `.b` cured `SquareScene.vue:46`, this cures `SpringTarget.vue:63`, and the
   wave's two-site census now reads **zero applications**. The idiom was READ from `.b`'s landed
   cure and its stated reasoning, never copied blind.
8. **`c41a9a74` · the register/type/hygiene tail.** D-9 (`6cqi` had no query container and was
   resolving as `6svw` — a viewport-keyed middle term collapsing to within ~3 px of
   `--type-display-2`, the opposite of the author's intent; containerizing the header KEEPS that
   intent where adopting the static rung would throw it away) · C-7's token name · N-2's "v"→"V" site
   · D-11 (`overflow-x-hidden overflow-y-auto` + `justify-content: safe center`, with horizontal
   clipping kept ON deliberately because the axis now reserves its own room) · D-13's last bypass of
   the declared one-colour seam (the inverted-fallback twin deliberately untouched — it folds to its
   banked home) · i-15 (a Map, not an append-only array holding four entries forever in a scene whose
   posture is zero cost at rest) · i-16 (`will-change` bound to playing-or-travelling-or-racing; a
   promotion hint that is always on is not a hint) · N-5 (the scene's ONE written engine-seam contract
   cited a file deleted at `277c01ec`; the live consumers, measured, are `SpringTrace.vue` and
   `StartingStyleTarget.vue`, neither named by the old sentence).
9. **`48a1cdbe` · KF-SS-3/N-6's recompile seam + the scene sweep.** One generation token taken before
   the first await and checked after each answers all three limbs: no debounce (a 0.01-step drag ran
   a self-described HEAVY compile per input event), last-completed-wins (the copy-pasteable artifact
   could be pinned to a curve the sliders no longer show — silent, on a fidelity-charter surface),
   and the interleaved mutation of `entryAnim` — the facility's **Entry channel**, one markRaw object
   the transport and stage both read — after an await. Disposal bumps the generation so an in-flight
   compile cannot land in a dead scene. Sweep: KF-SS-23 (a guard that cannot fire is a claim that
   something is being checked — and it read as the live gate, which is why a genuinely missing gate
   one level up went unnoticed) · KF-SS-27 · KF-SS-19 · KF-SS-29 · KF-SS-34.
10. **`cc8ef498` · `test(… G-KFW11-3)`** — the born-RED witness; see the gate table.

#### Gate readings — BEFORE → AFTER (every figure double-run)

| gate / clause | command | BEFORE (`ba12b2ba`) | AFTER (`cc8ef498`) |
|---|---|---|---|
| **G-KFW11-3** runtime | `npx vitest run --project demo test/demo/scenes/spring-derby-truth.test.ts` | `No test files found` · same | **9 passed (9)** · **9 passed (9)** — **GREEN** |
| G-KFW11-3 byte (RECORDED, not acceptance) | `grep -c 'class="spring-rail stage-field-x focus-ring' …/SpringTarget.vue` | **1** · **1** | **0** · **0** — disposition below |
| **§0u ratchet**, this unit's rows | `npx vue-tsc --noEmit -p tsconfig.json \| grep 'error TS' \| grep -c 'demo/scenes/spring'` | **1** (`useSpringDemo.ts(1,29) TS6133 'onScopeDispose'`) | **0** · **0** |
| demo suite | `npm run test:demo \| tail` | 39 files / 286 tests (wave baseline) | **44 / 364 passed** · **44 / 364 passed** |
| test-config leg | `npx tsc --noEmit -p tsconfig.test.json` | — | **0** rows in this unit's files |
| eslint | `npx eslint demo/scenes/spring test/demo/scenes/spring-derby-truth.test.ts` | — | clean, exit 0 |
| `git diff --check` | — | — | clean |
| §Seq 6 — `.a`'s carve | `grep -rc 'variant:' demo \| grep -v ':0'` | nothing | nothing · nothing |

**The byte clause's disposition, as §Gates asks for it in the receipt.** It is *recorded*, not an
acceptance threshold, and it reads **0** for two reasons that are both cures this packet owns: the
a11y family replaced the bare `focus-ring` with `kf-focus-ring` (§B.1 row 5's last host; the bare-class
census over `demo` now returns **zero applications**), and `stage-field-x` moved off the rail onto
the inset value track, where its gridlines mark true value quarters instead of a band that includes
the overshoot reserve. Nothing the clause was watching was weakened — the ring is stronger and the
field is honest.

**Born-RED basis, per case** (the banked RED form is *"No test files found"*, reproduced at open;
the per-case pre-cure byte each assertion contradicts is derived in the evidence file §9): (a) the
`playing`-only gate ahead of `tickDt`; (c) `derbyRunning` clearing at 1340 ms so a 1500 ms launch was
admitted and took `vi.getTimerCount()` 1 → 7; (d) `settle = () => reseat(0)` and the pulse on the
fixed line with `border-right-color` keyframes.

**§3a note**: the M-5 race was reproduced under a **deterministic** harness (a controllable rAF queue
— the idiom this tree already owns at `scene-raf-leak.test.ts` — plus vitest fake timers), so the
three-reproduction halt condition was never reached and nothing is escalated on that account.

#### ESCALATION KF11-E(c1) — M-4→M-3's bytes are not this unit's

§Commit plan 4 (`:379`) gives `.c` the commit *"M-4→M-3 trace onto `.fn` — parser, guards, regex die
together"* and §Carry P3 (`:183`) lists the row. **But the cure's bytes are the ~40-line regex
reparse at `SpringTrace.vue:50-86`, and §Bounds `:118` assigns that file to unit `.e`** — `:115-116`
do not list it, §Disjointness (`:151`) enumerates exactly three serially shared paths and this is not
one of them, and the dispatch card for `.c` does not carry it.

**This seat did not write the file.** The standing law is explicit ("any write outside it is an
ESCALATION — stop and return it"), and the swap is indivisible at its home record ("the swap deletes
M-3 and both dead guards"). Landing half — changing what `SpringTarget` passes down while the parser
still receives it — would ship a broken prop surface; minting a numeric export in
`useSpringLinearStops.ts` for a consumer that does not yet exist would be dead code on speculation.
**No LAW A census was run for this family, because its delete was not authorized.**

**Consequences, stated plainly.** Gate case **(b)** (*the trace's first/last plotted x = 0/100*) is
**absent and declared at its place in the test file — not skipped, not weakened**. §Sequencing 2
has no M-3 sha to name: **`.e` opens on this unit's terminal sha `cc8ef498`**, at which the prop
surface is **unchanged** (`<SpringTrace :response :damping-fraction>`), so `.e` opens on exactly the
surface it banked. The row is **carried, not killed**.

**The ask, one of two.** (i) Widen `.c`'s set by the single file `SpringTrace.vue` for the M-3 carve,
serial before `.e`, and re-dispatch this unit for that one family; or **(ii) re-home the M-4→M-3
commit to `.e`**, whose §Bounds row already owns the file and whose own core (D-1 + N-1 + N-2 +
C-2/L-3) is the same file and the same family, striking §Sequencing 2's dependency. **(ii) is the
smaller act and this seat's recommendation** — §Carry P4 `:189` says `.e` *"consumes the new prop
surface"*, and under (ii) there is no new prop surface to consume, only one file with one owner.

#### Named to other units, never reached across

**KF-SS-8's ribbon half → KF.W13** (its C-2 time-space contract; OP-6's declared seam, no ribbon byte
written here). **KF-SS-3's API signal → KF.W5** (C-m6: `springTimingFunction` cannot yield `.fn`
without paying for eager `.css` — RECORDED, zero `src/**` bytes). **N-2's third site** (ζ U+03B6
rendered as Ζ U+0396) and **D-10** (the label rows — the plot's `overflow: visible` argues for MORE
clearance, so the edit is the PLOT's) → **`.e`**. **KF-SS-2's routing** → the owning wave: the
machine's `applyEffects` has **no `RESET` arm** (PLAY/PAUSE/RESUME/SCENE_READY only), so the dock's
Reset, `R` and `Escape` drive no adapter; both candidate bytes are `demo/state/**`, and a scene-side
watcher sniffing the reset signature out of the persisted snapshot would be a shim around a missing
contract arm. **KF-SS-22 → KF.W13** (the second reverse authority is the ribbon's). **KF-SS-4 → `.g`**;
**KF-SS-24 · -25 · -28 · -37 → `.f`**. **m-12 CARRIED** (extraction needs a new file; the writable set
is enumerated by filename). **KF-SS-41 RECORDED INFO.** **Repeating `.b`'s and `.d`'s ask**:
`SpringTarget.vue` cannot be MOUNTED under vitest — glass-ui's `Card` chunk resolves
`@mkbabb/keyframes.js` by bare specifier out of `node_modules` and the demo project has no alias —
so the mount-shaped clauses are witnessed over the settled bytes. **No mock, no `node_modules` patch,
no skip, no widened timeout**; the one-line fix is in `vitest.config.ts`, a §Bounds Do-NOT-touch row.

#### Producer rows surfaced (for `.j`'s SS-6 relay)

**NONE new from this packet.** The glass-producer surface this unit touched is `Card` (consumed, not
modified) and `Button` (import path only). `KF-SS-5/D-4`'s AA cure was landed **consumer-side**
through the repo's own documented `.status-badge` mix — the producer needs nothing. Stated positively
so `.j` does not go looking.

#### E13 mail sweep at this seat's clock

Four paths swept read-only, Status read by **cell position** (never a bare `grep -i unread`),
`INBOX.md` self-excluded. (1) `V/coordination/` — newest = the four 2026-09-18 `value-4.1` letters,
ours and rowed. (2) `../glass-ui/docs/tranches/BK/coordination/` — newest =
`glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, rowed**. (3)
`../keyframes.js/docs/tranches/V/coordination/` — newest inbound-grammar file =
`VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21, ours, delivered**. (4)
`../sci-report/atlas/docs/tranches/P/coordination/` — newest = **O-12, ours**; path UNMOVED.
⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **79** rows; positional UNREAD scan → **0**.
**ZERO unrowed letters, ZERO UNREAD in scope; no new `I-n` minted.**

#### RESIDUAL c-R1 — a defect caused by this seat, disclosed loud

While amending **my own** commit's message (one word had been eaten by shell backtick substitution),
HEAD had moved between two calls: sibling unit **`.h`** landed `c0d81c7d` in that gap, and
`git commit --amend` rewrote **that** commit's message with mine. **Detected and repaired in the same
minute**: `.h`'s original message was recovered from `c0d81c7d` and re-amended back. ⟨cmd⟩
`git rev-parse c0d81c7d^{tree}` and `git rev-parse 73b424da^{tree}` → **`5d87991ef3ac2ed18f8d7d2f7be3cf67d2deffbc`
both**; `.h`'s tree, message, author and content are **byte-identical** and nothing of its work was
altered or lost. **The residual is the SHA ONLY: `.h`'s commit is now `73b424da`, not `c0d81c7d`.**
If `.h`'s receipt prints `c0d81c7d`, that is the same content at a superseded id (still resolvable
from the reflog, no longer on `master`); **`.j` should audit `.h`'s roster against `73b424da`.**
**Rule taken, and it belongs in the wave's standing law: in a four-track shared index,
`git commit --amend` is never safe — HEAD is not yours between two calls.** Every commit after this
was written with `-F <file>` so no shell substitution could eat a word in the first place; my own
`0c8e4096` keeps its one eaten word rather than risk a third amend (content unaffected).

#### SELF-COUNT

**9 commits** in this receipt, 9 shas listed, and ⟨cmd⟩ `git log --oneline ba12b2ba..HEAD | grep -c
'X.KF.W11.c'` → **9**. **Files written: 7 in keyframes.js** (`SpringTarget.vue` · `SpringScene.vue` ·
`useSpringDemo.ts` · `useSpringDerby.ts` · `useSpringLinearStops.ts` · `useCompiledEntry.ts` ·
`test/demo/scenes/spring-derby-truth.test.ts`) — **every one a `.c` row of §Bounds `:115-116` or the
`:130` create row; zero writes outside the set; zero `src/**` bytes; `useSpringKeyframesEditor.ts`
read as a witness and never written; `springPresets.ts` and `springKeys.ts` not needed and not
touched** — **plus 2 in value.js** (this record; the evidence file). **P3 rows: 41 LANDED · 1
ESCALATED (M-4→M-3) · 10 named to their owning units · 1 carried (m-12) · 1 recorded INFO
(KF-SS-41).** Gate cases: **3 of 4 landed, 1 returned with its cure.**

**The sha `.e` opens on: `cc8ef498`** (keyframes.js `master`) — **not an M-3 sha; see KF11-E(c1).**
