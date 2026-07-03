# FOURIER-LATEST — the fourier-analysis frontier vs value.js R

Lane FOURIER-LATEST. Read-only deep-read of the fourier-analysis frontier (tri-tranche-run,
CONSTELLATION.md, tranches M/E/D/N, ADOPTION-ASKS, git log). Every load-bearing claim cites
file:line. Verified against fourier HEAD `83d4c9f` (branch `m/w1-bump-migration`, dirty tree) and
value.js `tranche-q` @ `5480952` (v1.2.0).

---

## TL;DR

1. **The tri-tranche-run RUN-BOARD is PURPOSE-BUILT and 11-day-stale** — it coordinates
   keyframes-D+E / glass-ui-AU+slides-F / feedback-coder-L, NOT value.js. fourier's own M charter
   *explicitly retires its premise* (`M.md:28` "the 11-day-stale RUN-BOARD … long since cleared").
   value.js appears in it only as an **inbox cross-link target**, never a session. It is NOT the
   vehicle for value.js R, and R correctly never joins it.
2. **The live value.js↔fourier mechanism is the FN-charter letter** — value.js authored
   `docs/tranches/N/VALUEJS-R-UPLIFT-ASKS.md`, fourier committed it into its own tree at `83d4c9f`
   (an accept-into-N-intake act). No N charter exists around it yet; **FN-1..7 have no home**.
3. **fourier consumes value.js's `src/` library** (5 import sites) and is mid-bump to `^0.13.0` in
   its working tree. The imports are easing/timing-fn only today (color surface planned M.W7).
4. **NO incoming parse-that work in any fourier tranche** — parse-that is value.js-internal/bundled;
   `grep parse-that web/` = 0. The R-booked parse-that `^1.0.0` re-pin is invisible to fourier.
5. **The one real coordination gap R misses: the version-caret pin.** R cuts value.js **2.0.0**;
   fourier M.W1 pins `@mkbabb/value.js ^0.13.0`, which will **not** accept 2.0.0. R dispatches
   peer-floor re-pin letters to kf and glass-ui but **names no fourier re-pin note** — fourier
   would silently freeze at 0.13.x. (fourier's consumed surface is 2.0.0-safe; only the caret needs
   bumping.)

---

## 1 — The tri-tranche-run mechanism (precisely)

**Purpose-built, not extensible-as-designed.** `COORDINATION.md §1` (lines 15-24) fixes exactly
three sessions:

| Id | Session | Writes (inv-16) |
|---|---|---|
| S1 | keyframes-D+E | keyframes.js only |
| S2 | glass-ui AU + slides F | glass-ui + slides |
| S3 | feedback-coder L | feedback-coder only |

The mechanism (`COORDINATION.md §2-§7`, `RUN-BOARD.md §1-§4`):
- **inv-16** — each session writes ONLY its own repo(s); no session commits to a sibling
  (`COORDINATION.md:269-274`). Cross-repo items are name-forward (consume a published surface).
- **The RUN-BOARD is the sole cross-session channel** — a shared blackboard partitioned by
  row-ownership; a session edits only its own rows + the gate cells it owns (`COORDINATION.md:279-281`).
- **Edge/gate table** — consumer→producer edges (E1..E3, E-spring); an edge flips BLOCKED→CLEARED
  only when a **real command** passes (`npm view @mkbabb/glass-ui version` ≥ 3.3.0 for the E1 root
  hinge — `RUN-BOARD.md:46`, `COORDINATION.md:92-101`), never on a narration.
- **WAIT-OR-CIRCLE-BACK + heartbeat-poll** — at a blocked edge a session either drops to a
  gate-free wave or heartbeat-polls the real gate at a 20-30 min fallback cadence
  (`COORDINATION.md:192-225`).
- **Publish ledger** — the irreversible legs (`npm publish`, deploy) are USER-DOMAIN, confirm-first;
  agents stage to READY-TO-PUBLISH (`RUN-BOARD.md:67-89`).

**value.js's place in it: an inbox note, not a node.** The only value.js reference is
`COORDINATION.md:320-322`: "S2 → value.js inbox on E1 PUBLISHED: glass-ui 3.3.0 unblocks value.js
K.W3 … name-forward." value.js is a downstream consumer notified by cross-link, never a session
row, never an edge.

**Is it stale?** Yes — decisively. Its root hinge is "glass-ui 3.3.0 on npm" (`RUN-BOARD.md:46`);
glass-ui is now at 5.0.0 (per R state). fourier's own M charter calls the board "11-day-stale …
whose 'BLOCKED root hinge E1 = glass-ui 3.3.0 on npm' long since cleared" (`M.md:28`) and books
M.W0 to "re-ground the stale RUN-BOARD 3.2.0/3.3.0 edges to 4.0.0 reality" (`M.md:78`). The working
tree only touches the S1 row (keyframes E IMPL+CLOSED — `git diff RUN-BOARD.md`); **no value.js
row was added** — the ACTIVELY-MODIFIED state is a keyframes-E status flip, not a value.js
onboarding.

**Verdict on extensibility:** the blackboard *pattern* (inv-16 + real-gate-check + heartbeat) is
generic and sound, but this instance is bound to its three sessions and its 3.3.0-era gates. Do NOT
retrofit value.js R into it — the correct value.js↔fourier channel already exists and is lighter
(the FN letter, §4).

---

## 2 — Every fourier item that touches value.js

### 2a — web/ consumes value.js's `src/` library (LIVE, mid-bump)

`web/package.json` (working tree, uncommitted on `m/w1-bump-migration`) bumps
`@mkbabb/value.js "^0.10.0" → "^0.13.0"` (and glass-ui `^3.1.0→^4.0.0`, keyframes `^2.2.0→^4.3.0`).
Consumption sites (all `src/`, none `api/`):
- `web/src/components/equation/ConvergencePlot.vue:5` — `easeInOutSine`
- `web/src/components/equation/composables/useCurveTransition.ts:8` — `easeInOutSine`
- `web/src/components/equation/lib/harmonics.ts:5` — `easeInOutSine`
- `web/src/lib/easings.ts:9,16` — `timingFunctions` + named imports

**Planned (M.W7):** `mixColorsN` / `safeAccentColor` from value.js's color surface, to collapse "4
`spectrumColor` copies + a 118-line bespoke parser + the `STATIC.rainbow` twin" into ONE OKLCH ramp
(`M.md:39,85,136`). `sampleColorRamp` is **booked for value.js 0.13.0 with a kill-date**
(`M.md:180 #6`, `M.md:85`).

> **Reality check R should relay:** `sampleColorRamp` already SHIPPED — it is exported from
> `value.js/src/index.ts:165` and value.js is at **1.2.0**, two majors past fourier's target pin.
> fourier's M.W7 "book for 0.13.0" premise is stale.

### 2b — the CRUD twin / atomdiff / CONFORMANCE-MATRIX (api/, the R.W6 pairing)

fourier's Python/FastAPI `api/` is the twin of value.js's TS/Hono `api/`. The atomdiff + publish
work is **DONE-in-sibling** on value.js's side (`ADOPTION-ASKS.md:122-123`): value.js shipped
`api/src/lib/crud/atomdiff.ts`, `PaletteVersion.atomDiff`, `POST /:slug/remix`, `GET /:slug/diff`,
`POST /:slug/{publish,unpublish}` + the [P0] `visibility="public"` filter, carried through L CLOSED.
The named **residual is fourier's OWN `/diff` + publish envelope parity confirm** (fourier-local
Python probe) — booked K.W6, now folded to **M.W12** (`M.md:90` "the fourier-local Python `/diff` +
publish envelope parity probe against `J-diff-shape.md`") and `ADOPTION-ASKS.md:122-123` "Residual =
fourier's OWN … PARITY confirm."

This is exactly the surface R.W6 pairs with. The FN charter (`VALUEJS-R-UPLIFT-ASKS.md`) formalizes
it: FN-5 (twin-currency invariant ↔ value.js R.W6 inv), FN-6 (fourier's own fixture reader), FN-7
(doc home + CONSTELLATION.md pointer), plus FN-1..4 (fourier-internal api hardening).

### 2c — M.W10 data-model transpose TOUCHES the contract shape R.W6 asserts

M.W10 (`M.md:88`) does a **version-shape edit**: "DELETE the phantom within-viz version chain; keep
the per-viz atom `/diff` + cross-viz `fork_of`; … `/diff` `to`-param real, migration `atom_diff`
recompute." This is precisely the class of change FN-5 is meant to guard ("any `atomdiff.py` /
version-shape / URN-catalog change re-verifies the value.js twin + updates the CONFORMANCE-MATRIX"
— `VALUEJS-R-UPLIFT-ASKS.md:92`). See gap G3 below.

### 2d — the E/D hand-off (historical, RESOLVED)

The task's "E … + valuejs hand-off" refers to two distinct things:
- **fourier's Tranche E** hand-off = `docs/tranches/E/coordination/COHORT-VALUE-JS-I.md` — the
  CRUD-cohesion cohort that seeded **value.js-I** (visibility split, soft-delete, SOTA envelopes,
  conformance suite). Predecessor `D/coordination/VALUE-JS-ASK.md` (the 53 DEFERRED-TO-VALUE.JS
  cells). **This is fully RESOLVED** — value.js-I was executed and closed; value.js is now at 1.2.0
  through tranche Q. It is historical, not incoming.
- **The RUN-BOARD's "valuejs-sota-handoff.md"** (`RUN-BOARD.md:22`) is a **keyframes** Tranche-E
  artifact (S1 = keyframes-D+E), out of this lane — a keyframes→value.js library-perf proposal,
  not a fourier item.

### 2e — fourier's standing ADOPTION-ASKS TO value.js (maintainer-owned, mostly deploy/infra)

`ADOPTION-ASKS.md` carries open value.js-maintainer asks that are NOT R-tranche library work but
sit in R's cross-repo field of view:
- **Ask 3** — palette-api rsync-dir → git checkout (the dispatcher-retirement critical path;
  `ADOPTION-ASKS.md:59-64,111`). R already books this: "`dispatch.sh` retirement BOOKED with a hard
  kill-date = value.js `rsync→git` green-CI" (`R.md:298` BOOKS / fourier `M.md:142`).
- **Ask 5 / inv-22-color** — CF-Pages convergence + `api.color` 4-endpoint vhost
  (`ADOPTION-ASKS.md:80,116`). value.js-maintainer-owned; not R library scope.
- **cascade-vjs** (`ADOPTION-ASKS.md:118`) — bump `unplugin-vue-markdown ^29→^32` (vite `^8` peer) +
  `@mkbabb/{glass-ui,keyframes.js}` `file:`→`^published` + regen lockfile to clear an `npm ci`
  ERESOLVE. This is a live value.js-repo hygiene ask R does not appear to track (see gap G4).

---

## 3 — fourier timeline vs R.W6 (when would FN-1..7 execute?)

**fourier M is EXECUTING but hard-gated.** M.W1 was executed this session on branch
`m/w1-bump-migration` (`M.md:15`); the multi-major bump is the keystone. But the design + close arm
is **W1b-GATED on glass-ui BB publishing 4.1.0** — "only W0/W1a/W2–W4 proceed now" (`M.md:15`). So
fourier's near-term is: finish the bump, land the deploy spine (M.W2–W4), then wait on glass-ui BB.

**FN-1..7 have NO home.** `docs/tranches/N/` contains exactly ONE file — the value.js letter itself
(`VALUEJS-R-UPLIFT-ASKS.md`); there is no `N.md` charter, no disposition doc. The letter states this
directly: "fourier's head tranche M is deploy/design-only, so the CRUD-twin currency work has no
home yet" (`VALUEJS-R-UPLIFT-ASKS.md:12`) and "these need not be 'N'; the number is fourier's to
assign" (line 13). fourier committed the letter (`83d4c9f`) — an *accept-into-intake* act — but has
authored no charter around it. M.md contains zero `FN-` references (grep = 0).

**Realistic FN execution: post-M, a future fourier tranche.** fourier is heads-down on the
bump/deploy/design of M, itself blocked on glass-ui BB. FN-1..7 (net-new api-hardening + the
twin-tie) land in a fourier tranche that does not yet exist. **This is exactly why R.W6 gates on
nothing outside value.js** — and that is the correct design.

**R.W6 is correctly self-contained** (`R.md:190`): its deliverables are all value.js-tree-local (5
inline fixture rows in `api/test/conformance/diff.test.ts` read locally; an in-tree
contract-of-record note; the contract-currency invariant), and it "gates on nothing outside this
repo." The FN charter confirms: "R.W6 gates on nothing outside fourier or value.js crossing the
seam" and "none of them gate either repo's close" (`VALUEJS-R-UPLIFT-ASKS.md:21-24`).

---

## 4 — Incoming parse-that work in fourier: NONE

- `grep -rn "parse-that\|parse_that" web/` = **0 matches**. fourier consumes value.js's public
  easing/color exports; parse-that is a value.js runtime dependency, bundled and transitive —
  invisible to fourier.
- The R-booked **parse-that `^1.0.0` re-pin** (`R.md:298` BOOKS; triggered by "kf S.H2 publishes the
  1.0.0 cut" per R state) is a value.js-internal dependency change. It crosses no fourier edge. As
  long as value.js's public API is stable across the re-pin, fourier sees nothing.
- No fourier tranche (M/E/D/N) authors or consumes parse-that. **No parse-that coordination owed
  to/from fourier.**

---

## 5 — What R books correctly vs misses

### Books CORRECTLY

- **FN-1..7 dispatched + accepted** — the letter is authored and committed into fourier's tree
  (`83d4c9f`); R records it as a BOOK with fourier owning shape + scheduling
  (`R.md:221,298`; charter §2).
- **R.W6 self-containment** — all deliverables value.js-tree-local; gates on nothing external
  (`R.md:190`). Correct given fourier has no FN home.
- **R8-18 carry** — CONFORMANCE-MATRIX corrections + fourier-web pin bump named as
  "carry, fourier-owned" (`R.md:299`; charter §2 "Named carry"). Correct.
- **Q9 / FN-7 doc homes** — fixture inline read-locally (zero cross-repo reads verified); J-diff-shape.md
  stays put; CONSTELLATION.md pointer + relocation booked to FN-7 as fourier-tree writes
  (`R.md:322`, charter §3). Correct — matches value.js's own zero-cross-repo-read posture
  (`diff.test.ts:5-6` transcribes, never `readFile`s a sibling).
- **Byte-parity struck permanently** — float-repr + set-hash divergences are irreducible; fixture
  asserts SHAPE only, each repo asserts its own payload (`R.md:274`, charter §0). Correct.
- **dispatch.sh retirement** — booked with hard kill-date = value.js `rsync→git` green-CI
  (`R.md:298`); mirrors fourier `M.md:142` / `ADOPTION-ASKS.md:56-57`. Correctly reciprocal.

### MISSES / gaps

**G1 — The version-caret pin gap (the one real miss).** R.W1 cuts value.js **2.0.0** and dispatches
peer-floor re-pin letters to **kf** (`^2.0.0`) and **glass-ui** (`^1.0.0→^2.0.0`) — `R.md:243-244`.
It names **no fourier re-pin note**. But fourier is a live value.js consumer whose M.W1 pins
`@mkbabb/value.js ^0.13.0` (working tree); a `^0.13.0` caret will **not** resolve 2.0.0 — fourier
silently freezes at 0.13.x when 2.0.0 publishes. The consumed surface IS 2.0.0-safe (R.W1's renames
`type→syntax` / `defaultValue→default` are on the `@property`/KF-1 descriptor grammar, not on
`easeInOutSine` / `timingFunctions` / `mixColorsN` / `safeAccentColor` / `sampleColorRamp`), so the
fix is a one-line caret bump. **R should add a fourier peer-floor note** ("value.js 2.0.0 published;
your consumed surface is unaffected; bump `^0.13.0→^2.0.0` to receive it") alongside the kf/glass-ui
notes. Cost: one line in the R.W1 dispatch list.

**G2 — Stale-premise relay.** fourier's entire M plan is built on a value.js 0.12/0.13 world
(`M.md:102-103,180`); value.js is at **1.2.0** and `sampleColorRamp` already ships
(`src/index.ts:165`). fourier's M.W7 "book `sampleColorRamp` for 0.13.0 with kill-date" is already
dischargeable. R's fourier-facing note (G1) should carry this fact so fourier can strike the booking
on adopt.

**G3 — FN-5 arrives after the change it guards.** fourier M.W10 (`M.md:88`) executes a version-shape
transpose (delete phantom version chain; `/diff` `to`-param; `atom_diff` recompute) — exactly the
change FN-5 is meant to trigger a twin re-verify on (`VALUEJS-R-UPLIFT-ASKS.md:92`). But FN-5 has no
home (§3), so M.W10's contract-touching edit **predates** the paired guard. R's in-tree
contract-of-record note (R.W6) is the interim protection, and the fixture asserts SHAPE not payload,
so a drift here degrades to a caught conformance mismatch rather than silent breakage — but R does
not flag that **fourier's M.W10/W12 is an imminent contract-shape wave landing before FN-5 exists**.
Worth a one-line note in R.W6 / the FN charter: "FN-5 should be authored before or with fourier
M.W10, else the twin-tie is unguarded across that transpose."

**G4 — cascade-vjs untracked.** `ADOPTION-ASKS.md:118` books a value.js-repo hygiene fix (bump
`unplugin-vue-markdown ^29→^32` for the vite `^8` peer + `@mkbabb/{glass-ui,keyframes.js}`
`file:`→`^published` + regen lockfile to clear an `npm ci` ERESOLVE). This is a live value.js ask
fourier tracks; R's corpus does not appear to. Low-severity (demo/build hygiene, not R library
scope), but it is a real incoming value.js-maintainer item worth acknowledging.

---

## 6 — How the three tranches should coordinate better

1. **Keep the FN-letter mechanism; do NOT join the tri-tranche RUN-BOARD.** The letter (docs-only
   cross-repo grant, inv-16, paired-authorship precedent per `VALUEJS-R-UPLIFT-ASKS.md:8`) is the
   right, lighter channel. The RUN-BOARD is purpose-built + stale (§1) and would need re-grounding
   fourier itself owns (M.W0). value.js has no session row there and should not acquire one.
2. **Add the missing fourier peer-floor note at R.W1** (fixes G1+G2). value.js already dispatches
   re-pin notes to kf + glass-ui; fourier is the fourth consumer and the only one left implicit.
3. **Sequence FN-5 with fourier M.W10** (fixes G3). The twin-currency invariant should be authored
   as a matched pair with — or ahead of — fourier's version-shape transpose, not after.
4. **A single source-of-truth for cross-repo version state.** The RUN-BOARD went 11 days stale
   because it hard-coded `3.3.0` gates. The durable pattern is fourier's own `ADOPTION-ASKS.md`
   ledger + per-repo letters that cite `npm view` at author-time and re-verify at adopt-time — which
   is already the working mechanism. R's contribution is to make sure value.js's published-version
   events (2.0.0, the parse-that re-pin) land as letters into that ledger, not just into value.js's
   own docs.

---

## Appendix — evidence index

- tri-tranche mechanism: `fourier docs/constellation/tri-tranche-run/COORDINATION.md:15-24,92-101,192-281`,
  `RUN-BOARD.md:1-114`; value.js inbox-only: `COORDINATION.md:320-322`.
- RUN-BOARD staleness: `M.md:28,78`; working-tree diff touches only S1 row.
- web consumption: `web/package.json` (working tree, `^0.13.0`); imports at
  `web/src/{components/equation/ConvergencePlot.vue:5, components/equation/composables/useCurveTransition.ts:8,
  components/equation/lib/harmonics.ts:5, lib/easings.ts:9,16}`.
- CRUD twin residual: `ADOPTION-ASKS.md:122-123`; `M.md:90`.
- M.W10 version-shape edit: `M.md:88`.
- E/D hand-off (historical): `E/coordination/COHORT-VALUE-JS-I.md`, `D/coordination/VALUE-JS-ASK.md`.
- FN charter: `docs/tranches/N/VALUEJS-R-UPLIFT-ASKS.md` (whole); committed `83d4c9f`; no `N.md`.
- parse-that absence: `grep parse-that web/` = 0.
- R bookings: `value.js docs/tranches/R/R.md:190,221,243-244,298-299,322`.
- value.js version + exports: `package.json:3` (1.2.0); `src/index.ts:154,165,246,250`.
- fourier version premise: `M.md:102-103,180`; sampleColorRamp shipped `src/index.ts:165`.
- cascade-vjs: `ADOPTION-ASKS.md:118`.
