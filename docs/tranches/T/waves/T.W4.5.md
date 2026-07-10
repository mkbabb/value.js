# T.W4.5 — THE MID-TRANCHE CHECKPOINT (Q6 "both." — the LIGHT hardening pass)

**Name**: W4.5 — The mid-tranche checkpoint (the ruled-in second stage of E-7: catch drift
EARLY, at the round-3 boundary, so W5/W6 build on critiqued ground)
**Opens after**: T.W4 (round 3.5 — MINTED-AT-RATIFICATION 2026-07-09: Q6 ruled "both.", cascade
1 amends the DAG `… → W4 → T.W4.5 → { W5 · W6 } → …`).
**Spec of record**: `audit/RATIFICATION-2026-07-09.md` §1 Q6 + §3 cascade 1 (the minting law) ·
`waves/T.W8.md` (the pass grammar REUSED on a reduced surface set — the W8 doc's own Q6 clause
anticipated exactly this) · `audit/SYNTHESIS.md §2` (the doctrine D1–D10 the passes judge
against) · `MANDATE-2026-07-06.md §0` + addenda (the owner's verbatim lines per surface).
**On any divergence between this wave doc and its spec-of-record sections, the spec wins** (the
T.md charter clause, restated here so the rule is self-evident in-file); above all,
`RATIFICATION-2026-07-09.md §0` + `MANDATE-2026-07-06.md §0` + addenda are VERBATIM LAW.
**Agents**: critique passes + remediation lanes in **batches of three** (E-6); every pass runs
Fable + frontend-design; ONE iteration round per surface (LIGHT — the ≤3-round loop is W8's);
the delta-report assembled by a NON-authoring agent.
**Hard gate**: composite (§Hard gate) — every through-W4 surface has a filed pass · filed rows
landed-or-booked · the owner delta-report delivered · **NO certification package** (that stays
W8's; the owner's verdict is NOT this wave's gate).
**Status**: RATIFIED 2026-07-09 — PENDING, gated on T.W4 close (round 3.5).

---

## §Goal criterion

Everything landed through W4 is critiqued at the Fable/frontend-design bar BEFORE the round-4
waves build on it — drift caught mid-tranche instead of at close (the Q6 "both." rationale:
"catches drift earlier"); what falls short is remediated or honestly booked; the owner sees a
delta-report of the tranche's first half.

## §Completion criterion

Per-surface pass records filed for the through-W4 surface census; every filed row landed or
booked with rationale (zero silent drops); ONE delta-report delivered to the owner
(informational — brackets flagged, not ruled; no certification asked); suites green; the wave
closes on its own gates, never on an owner verdict (W8 keeps that).

---

## §Scope (LIGHT — the W8 pass grammar on the reduced through-W4 set)

1. **Per-surface critique passes** (batches of three; Fable + frontend-design; coherence
   PRE-FILTER only — no pass certifies taste, lesson 12). Surface census (re-derived at
   wave-open from the live tree + the W1 MOVE-MAP): **boot overture + atmosphere + blob emerge**
   (W2: beats, gradient ground, T-26 field) · **the material ladder + neutrals + ink** (W3:
   rungs, C3/Q18 neutral family, certified contrast) · **the picker recomposition** (W4: ×φ/Q11a
   titles, readout tuple, console WELL, blob seat, veil) · **the colocation seams** (W1:
   structural spot-check — barrels, no old-path shims) · **the W0 oracle-floor state** (flipped
   boot oracles re-read as evidence). Each pass drives the surface LIVE (the O-3 probe class),
   judges against D1–D10 + the owner's verbatim lines + **the §12 RULED outcomes** (a pass that
   contradicts a ruling or a §4 retirement files nothing — it routes to the owner).
2. **Remediation lanes** for what falls short (batches of three; single-writer keyed on the
   FILE per the W8 M-20 law; PP-8 per batch; producer-owned rows route to the letter/inbox).
   Rows too large for a LIGHT pass are BOOKED to their owning surface's standing wave or to W8,
   named — never silently dropped.
3. **THE DELTA-REPORT to the owner** (ONE, assembled by a non-authoring agent): what landed
   W0→W4 vs the mandate's findings (the §1.2 map rows touched so far), annotated
   before/after frames per surface (both schemes), the PI-1 Lighthouse ledger state
   through W4 (the Q14 tracking instrument mid-read), open brackets FLAGGED for W8 (not ruled).
   **NO certification package** — no bracket table for ruling, no verdict requested (that is
   W8's terminal package; this is a checkpoint dispatch, the S relay-letter register).

## §Triumvirate dispatch

Mandatory on: a filed row contradicting a §12 RULED outcome or a §4 retirement (owner routing,
never re-litigation); any pass certifying taste or any lane weakening a gate; a defect class the
oracle slate cannot see (a NEW mint is a bounds expansion); **loop halt**: this wave gets ONE
critique→remediation round per surface — a surface still short after its round is BOOKED (to W8
or its owning wave), never looped here.

## §File bounds · disjointness · worktrees

| Surface | Files | Access |
|---|---|---|
| critique passes | the live app (probe-only: drives, frames, console/CDP traces) | probe |
| remediation lanes | the filed rows' files ONLY, single-writer per file, lane worktrees cut from the wave head | modify |
| the delta-report | `docs/tranches/T/audit/w45-checkpoint/` — `REPORT.md` · `passes/<surface>.md` · `ROWS.md` (the ledger W8's passes re-read) · `PROGRESS.md` | create |

Do NOT touch: `src/` (a src row is a boundary call), `../glass-ui`, `../keyframes.js`,
`docs/precepts/`, the §4 retired specs, W5/W6's surfaces (un-landed — nothing to critique).
Anchors re-derived against the W1 MOVE-MAP (PP-11).

## §Hard gate

1. Every census surface has a filed pass record (coherence verdict + rows, or clean).
2. Every filed row landed, or booked BY NAME (to W8 / the owning wave / the letter) with
   rationale — zero silent drops.
3. The delta-report delivered (non-authoring assembler; the PI-1 ledger state + Q14 tracking
   read included); **no certification package authored** — a package here is a scope breach.
4. PP-8 repo-wide sweep after the remediation lanes; `npm run lint` 0 · `npm run typecheck` 0 ·
   `npm test` green · e2e all-project green · clean `git status`.

## §No-workaround prohibitions (binding)

- **LIGHT means light** — one round per surface; no certification package; the owner's verdict
  is NOT this gate (W8's terminal authority is not pulled forward).
- **Critique is a PRE-FILTER, never a certification**; brackets are FLAGGED here, RULED at W8.
- **No re-litigation** of §12 RULED outcomes or §4 retirements; producer rows route to packets.
- **No gate weakened** to green the checkpoint — reds ride into the delta-report as reds.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each remediation batch; `npx playwright
test` at close. The tool-artefact grep `grep -rnE '</?(content|invoke|parameter|antml)'` over the
wave's touched docs MUST be empty before any docs commit (the §Recovery seam class — M-1).

## §Verification artefacts

Saved at close (cited in `PROGRESS.md`): the per-surface pass records; the ROWS.md ledger (row →
landed commit / book); the delta-report path; the PI-1 ledger state; per-lane commit hashes.

## §Commit plan

Per-surface remediation commits (row-scoped); the delta-report commit (docs); a wave status
commit. Scopes name the surface.

## §Recovery (STANDING — the `T.md §8` completion-brief rider binds every dispatch AND resume of this wave; PP-14/PP-15 operationalized)

The four-step protocol (audit-partial → patch-brief at
`audit/recovery/T.W<n>-<lane>-brief-<date>.md` → resume-from-work-order → seam-audit-at-close)
is standing law in `T.md §8`; E-6 batches-of-three is the prevention half, this rider the cure.
This wave's type-specific deltas: **partial signatures** — a filed row un-landed and un-booked;
a delta-report half-assembled; a pass filed against a pre-remediation frame. **Resume
specifics** — the `w45-checkpoint/passes/` records ARE the journal (a resumed checkpoint reads
them, never re-critiques fresh); the non-authoring-assembler law binds the resume; the ONE-round
law binds identically (a wall mid-round resumes the SAME round, never a second).

## §Dependencies

- **Depends on**: T.W4 closed (and with it W0–W3 — the DAG); the W0-5 oracle floor (a pass over
  an unminted oracle's surface reads the honest red, never asserts green).
- **Blocks**: T.W5 ∥ T.W6 (round 4 opens on this checkpoint — its remediations are round 4's
  settled ground).

## §BOOKS opened/serviced (books-never-gates)

- Any row booked-not-landed opens a named book row handed to W8 (its passes re-read `ROWS.md`)
  or to the owning wave's queue.
- EXPECTED-RED oracle rows (O-16 R1 et al.) ride into the delta-report with their packet cites,
  unaltered.

## §Evidence packets consumed

`audit/RATIFICATION-2026-07-09.md` §1 Q6 + §3 cascade 1 · `waves/T.W8.md` (the pass grammar) ·
`MANDATE-2026-07-06.md §0` + addenda · `audit/SYNTHESIS.md §2/§6.1` · the W0–W4 wave-close
artefact sets (the frames baseline).

## §Hand-off

W5/W6 open on critiqued, remediated ground; W8 inherits `w45-checkpoint/ROWS.md` + the flagged
brackets as its pass inputs (the deep wave re-judges the full census, this record in hand); the
delta-report is the owner's mid-tranche window — the certification ask comes only at W8.
