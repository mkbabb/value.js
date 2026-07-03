# R.W7 — WIRE + CLOSE (the deploy ceremony + relay dispatches + FINAL.md; gates on nothing outside this repo)

**Name**: W7 — Wire + close
**Opens after**: R.W4 + R.W6 (R.W5 KILLED at the 2026-07-03 ratification — Q1 FLIP; **W4 → W7 directly**).
**Spec of record**: `SYNTHESIS-v2.md §3 R.W7` + `§8` (the relay letter) + `§9` (the kf/parse-that slate, dispatched at R.W1) · `PASS3-VERDICT.md §3` (Q2) + `§4` (the process lessons FINAL.md folds).
**Status**: DISPATCHABLE (RATIFIED-2026-07-03 — **Q2 FLIPPED**: X2 is an in-wave item and the §Hard gate includes it; **Q8 RATIFIED**: the hard-ask posture rides inside the already-authored relay letter).

---

## §Charter

Prod serves I-era code; the deploy ceremony N.W8′ speced never fired. This wave fires the wire (X1/X3), retires the NCSU alias in-wave (X2 — the Q2 FLIP, 2026-07-03: owner order "no ncsu alias"), folds the rollback knowledge into the runbook (X5) with the X4 decision on the record, dispatches the standing letters, and closes the tranche — FINAL.md, merge, tag. The close wave **gates on nothing outside this repo**: every cross-repo wait is already a BOOK with a named trigger. (X2 is maintainer-on-host — inside this repo's maintainership, not an external wait.)

## §Goal criterion

The tranche is closed with the wire honest: production serves HEAD-lineage api code; the Pages pipeline has one green wire run on the record; the rollback path is a runbook a stranger can follow; both sibling letters are in their recipients' hands; `R/FINAL.md` tells the truth about every gate, miss, and book; and `master` carries the tranche with its tag.

## §Completion criterion

The §Hard gate below — X2 IS in it (the Q2 FLIP, RATIFIED-2026-07-03).

---

## §Items

### 1 · X1 — deploy HEAD api to prod

Fire the prod deploy: HEAD-lineage api via `scripts/deploy.sh api` over the committed `api/compose.yaml` rs0 artefact + `scripts/deploy-hook.sh` (the N-P0-3 carry: the compose-no-rs0 = txns-throw defect was cured in-tree; prod still runs I-era code until this fires). Post-deploy verification: the deployed api answers with current-lineage behavior (spot-probe an R-era surface — e.g. the `/diff` envelope the R.W6 rows assert — against `mbabb.fi.ncsu.edu/colors/`).

### 2 · X2 — NCSU-alias retirement (**Q2 FLIPPED at the 2026-07-03 ratification: in-wave work, in the gate**)

A maintainer **on-host** op (DEC-9 honesty), now **R.W7 in-wave work by owner order** ("no ncsu alias"): retire the NCSU alias during this wave, maintainer at the keyboard, and record the retirement in `R/FINAL.md`. The speced default (a standing action outside the gate) was FLIPPED — the alias does not outlive the tranche. The W7 gate includes X2 (§Hard gate).

### 3 · X3 — the first CF-Pages wire run

`deploy-pages.yml` (green-CI-gated; fires post-merge — `deploy-pages.yml:11-13`) has never had a wire run (CH-14a + A5 carry). The R.W7 master-merge (item 6) is its natural trigger: confirm the workflow fires on the merge, completes green, and the published Pages artifact serves the R-era demo (the R.W2 boot cure + Tabs migration mean the deployed demo is buildable against glass-ui 4.2.0 for the first time since the drift).

### 4 · X5 rollback runbook fold + X4 decision record

- **X5**: fold the rollback note into `docs/dev-deploy-standard.md` (the runbook) — the deploy path landed in item 1 gets its inverse documented in the same pass: how to re-point prod at the previous api lineage, and how to re-run Pages at a prior ref. Discharges the N.W8′-folded BOOK.
- **X4**: record the openapi **table-vs-source** decision (value.js-side; produces nothing for fourier) — one paragraph in the runbook or FINAL.md naming which artifact is authoritative and why. A decision *record*, not new tooling.

### 5 · Relay-letter dispatches (the letters are pre-authored; dispatch is the act)

- **The glass-ui relay** — dispatch `docs/tranches/R/letters/GLASSUI-RELAY.md` (SYNTHESIS-v2 §8, items 1–7; routing: BG owns `src/`, BH owns the 5.0.0 reshape + ceremony). **D8-1 rides as a verify-at-consume entry, having been dispatched early** to the live BG agent at pass-2 time (dispatch-homes B.3): if the `layer(components)` dist has landed by now, the letter's item 7 is a confirmation; if not, it carries the ask forward verbatim. Dispatch earlier than W7 if the 5.0.0 cut approaches (§8 header discipline).
- **The kf/parse-that slate** — CONFIRM `docs/tranches/R/letters/KF-VALUEJS-2.0.0.md` was dispatched at R.W1 inside the 2.0.0 cut (R.W1 item 7); if the confirmation finds it undispatched, dispatch now and record the slip in FINAL.md.

### 6 · R/FINAL.md + merge + tag

Author `docs/tranches/R/FINAL.md`: the per-wave gate table (evidence-backed, misses with **named successors** — cross-tranche deferral is not a routine close path); the authoritative test/spec counts (the per-tranche FINAL.md carries the numbers — CLAUDE.md discipline); the `bench/gamut-boundary.mjs` number from R.W1 (no standing threshold script); the R.W6 contract-of-record note carried forward; the open BOOKS table (§3.3 verbatim — D8-1 no-shim verify if still open, glass-ui 5.0.0 adopt event, parse-that `^1.0.0` re-pin, vue-router 5, S.H3 Pratt, CH-10/CH-13/R8-23, FN-7); **the PASS3-VERDICT §4 process lessons folded verbatim** (worktrees-from-head; byte-identity ≠ head-cleanliness; record count drift; certify-in-the-amended-text; hoist-before-cleanup; unbounded-safety-claims-never-auto-ratify). Then the close ceremony per `docs/RELEASE.md`: merge the tranche branch → `master`, annotated tag at the close commit. (The 2.0.0 registry publish + its tag happened at R.W1; this is the tranche-close merge + tag, not a second publish.)

---

## §Hard gate (verbatim per SYNTHESIS-v2 §3 R.W7)

- **Prod serves current** (X1 fired + spot-probe green).
- **X2 fired: the NCSU alias is retired** (the Q2 FLIP, RATIFIED-2026-07-03 — maintainer-on-host, in-wave; the retirement recorded in FINAL.md).
- **Relay letters dispatched** (glass-ui §8 letter sent; kf §9 slate confirmed-dispatched).
- **FINAL.md authored** (gate table + books + lessons + counts).
- **master merged, tagged.**
- X3's wire run green (fires on the merge; verified before close).
- **Gates on nothing outside this repo.** X2 is maintainer-on-host — this repo's own maintainership, not an external wait; no gate waits on glass-ui landing D8-1, on kf consuming the letter, or on fourier-N opening.

## §BOOKS opened/serviced by this wave (books, NEVER gates)

- *(X2 is NOT a book — the Q2 FLIP at the 2026-07-03 ratification made it in-wave work, item 2, in the §Hard gate.)*
- **D8-1 no-shim verify** — if the glass-ui `layer(components)` dist has not landed by close, the book stays open past R with the relay letter carrying the ask; the trigger is unchanged (the next `file:../glass-ui` dist rebuild carrying it).
- **The §3.3 book table** carries forward intact into FINAL.md — glass-ui 5.0.0 adopt event (goo-blob→blob re-point, GAP-3 subpath walk, uSatColor consume, aurora-metal re-verify, U6 dock-fission verify), parse-that `^1.0.0` re-pin, K-W5RT vue-router 5, S.H3 Pratt consume-edge, CH-10/CH-13/R8-23 spec-gated longhands, FN-7 co-decision + CONSTELLATION.md pointer.

## §Evidence packets consumed

`SYNTHESIS-v2.md §3 R.W7` + `§3.3` (the book table) + `§8`/`§9` (the letters' binding content) · `dispatch-homes.md PART B` (B.3 early-dispatch record; B.4 verify-at-consume wording) · `PASS3-VERDICT.md §3` (Q2 row) + `§4` (the six process lessons) · `docs/RELEASE.md` (the close ceremony) · N.W8′ (the X1..X5 provenance — `docs/tranches/N/waves/N.W8-prime.md`).

## §Hand-off

Tranche S (or the next letter) receives: the open books table; any gate-miss with its named successor. (No R.W5 hand-off — hero-lab was KILLED at ratification, not slipped.) glass-ui receives the relay letter; kf's letter is already in flight from R.W1. The constellation receives a value.js at 2.0.0, deployed, with the demo buildable and the twin-tie durable.
