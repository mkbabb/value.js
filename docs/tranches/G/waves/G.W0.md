# G.W0 HEADLINE — Open: 6-agent audit + plan substrate + ratification ask

**Opens after**: G open directive (the canonical 6-agent-audit invocation).
**Mode**: planning-only.
**Lanes**: 6 read-only audit lanes (DONE) + substrate authoring (orchestrator) + ratification ask.
**Status**: planned → in-progress → **closes on user ratification**.

## Scope

Per the G-opening directive ("This is NOT an implementation phase. Tranche development only. Relay all carry-forward items to me for ratification."), G.W0 is the planning + audit + ratification phase. No source-code writes.

### Lane 1 — Prompts + precepts recap (DONE)

`audit/G-AUDIT-1-prompts-precepts.md` — 22 prompts cataloged + precept 30/30+/33 verified + 5 silent gaps surfaced.

### Lane 2 — Deferred-items ledger (DONE)

`audit/G-AUDIT-2-deferred-ledger.md` — 17 entries (2 FOLD + 1 RETIRE + 10 PEER-AUTH + 4 CARRY); 14 chronic-deferred.

### Lane 3 — State-at-G-open gate matrix (DONE)

`audit/G-AUDIT-3-state-at-G-open.md` — 16/16 gates PASS; zero drift since F merge.

### Lane 4 — Cross-repo state (DONE)

`audit/G-AUDIT-4-cross-repo-state.md` — glass-ui 0 drift; keyframes.js 14 commits unpushed; speedtest new tranche AK; fourier-analysis chronic.

### Lane 5 — Library + demo architecture (DONE)

`audit/G-AUDIT-5-library-demo-architecture.md` — `as any`=36 / `as unknown as`=11; 5 G-target transpositions identified.

### Lane 6 — api/ + e2e/ + CI state (DONE)

`audit/G-AUDIT-6-api-e2e-ci.md` — **CRITICAL CI-1 defect** (`origin/main` typo); 7 other improvements.

### Substrate authoring (orchestrator — DONE)

- `G.md` — master plan with G1-G4 invariants + 5-wave schedule + carry-forward ratification block.
- `G-PROMPTS.md` — verbatim G-open directive + prompt catalog inheritance.
- `findings.md` — audit-to-wave mapping.
- `coordination/Q.md` — cross-repo manifest refreshed at G open.
- `dispatch/AGENT.md` — G deltas vs F's contract.
- `waves/G.W0..G.W4.md` — 5 wave specs.
- `PROGRESS.md` — initial state.

### Ratification ask (G1 binding)

Per G1, the orchestrator relays all carry-forward items to the user via:
1. `G.md §7` — ratification block (A: 8 glass-ui asks; B: 3 PEER-AUTHORSHIP residuals; C: CW Phase-2; D: 9 FOLD-INTO-G items; E: 1 RETIRE-MOOT).
2. In the chat: explicit ratification ask listing the proposed dispositions + the user-decision items (notably R11 — keyframes.js push status).

## Gate

G.W0 closes when:
- 6 audit docs landed ✓
- Substrate authored ✓
- Ratification ask delivered to user ✓
- User ratification received (the close-trigger)

## Verification artefacts

- 6 audit docs at `docs/tranches/G/audit/G-AUDIT-1..6-*.md`.
- 5 wave specs at `docs/tranches/G/waves/G.W0..G.W4.md`.
- Substrate docs: `G.md`, `G-PROMPTS.md`, `findings.md`, `coordination/Q.md`, `dispatch/AGENT.md`, `PROGRESS.md`.
- Branch: `tranche-g` off master `6b3a41b`.

## Commit plan

- `docs(tranche-g/open): open Tranche G — type-system completion + architectural decomposition + invariant codification (planning-only)` — single open commit bundling all 6 audit docs + substrate.

## Dependencies

- Depends on: F close (merged + tagged v0.8.0).
- Blocks: G.W1+ (do not dispatch until user ratifies the carry-forward dispositions).
