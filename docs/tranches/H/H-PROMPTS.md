# H — prompts + charter

**Tranche letter**: H (value.js repo; seventh tranche).
**Branch**: `tranche-h` (off master HEAD `e166d37` — v0.9.0 / G merge).
**Opened**: 2026-05-22.
**Mode**: planning-only at open per the H-opening directive ("This is NOT an implementation phase. Tranche development only.").

## §1 — H-opening directive (verbatim)

> DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein.
>
> Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable.
>
> NO legacy code.
>
> Delineate any chronically deferred items and fold them into this new tranche.
>
> Delineate any deferred items and fold them into this new tranche.
>
> Recap ALL of our prompts and requests hitherto and ensure they've been addressed.
>
> This is NOT an implementation phase. Tranche development only.

This is the canonical 6-agent-audit invocation — the same shape that opened G (and F, in spirit). The doubled "delineate deferred items" clause is the F-thesis ("No deferrals") re-asserted as binding for H.

## §2 — Clause decomposition

| # | Clause | H disposition |
|---|---|---|
| 1 | "DEEPLY audit with 6 agents in parallel" | Dispatched at H open — 6 read-only audit agents (AUDIT-1..6); deliverables at `audit/H-AUDIT-1..6-*.md`. |
| 2 | "audit our original plan and waves thereof, alongside all changes made herein" | AUDIT-1 cumulates the full prompt corpus across A-G + the G-execution prompts + the H-open prompt. AUDIT-3 captures state at H open including every G outcome. |
| 3 | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches" | Binding for every H wave. Re-affirmed in `dispatch/AGENT.md`. |
| 4 | "architectural transpositions ... elegance, simplicity, and performance above all" | AUDIT-5 surfaces transposition candidates (post-G architectural state of `src/`, `demo/`, `api/`). |
| 5 | "NO legacy code" | Inherits F2 + G2 + G3. Codified by `proof:no-deprecated` + `proof:as-any-budget`. |
| 6 | "Delineate any chronically deferred items and fold them into this new tranche" (×2) | AUDIT-2 enumerates the chronic-deferred ledger across A-G; H disposition per item: FOLD / CARRY (with sharpened (c) trigger) / RETIRE-MOOT. The doubled clause = the F1 ("No deferrals") binding re-asserted. |
| 7 | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed" | AUDIT-1 cumulates the catalog G-AUDIT-1 began (22 prompts at G open) + every prompt since. Silent-gap detection mandatory. |
| 8 | "This is NOT an implementation phase. Tranche development only." | Binding: H.W0 is planning-only. NO execution-phase wave dispatches at H open. **H.W1+ requires explicit user authorization** (the established F+G pattern). |
| 9 | (implicit, by inheritance from G1) "Relay all carry-forward items to me for ratification" | Binding: every carry-forward item identified at H.W0 is relayed for explicit user ratification before H.W1+ dispatches. |

## §3 — Inherited charter

H inherits, verbatim, the binding clauses of every prior tranche:

- **F1** — No deferrals as binding.
- **F2** — `lerpLegacy` retired; codified by `proof:no-deprecated`.
- **F3** — Cross-repo write boundary (explicit + bounded). **H default: ZERO cross-repo writes**.
- **F4** — Tranche-discipline back-references where relevant.
- **G1** — Relay before ratification (carry-forward items presented to the user explicitly).
- **G2** — `as any` ≤ 5 in `src/` (current count 0; codified by `proof:as-any-budget`).
- **G3** — No god module; focused modules ≤ 350 LoC.
- **G4** — Invariant codification: structural invariants are runtime proof scripts, not review-dependent.
- **E1-E5, D1-D7** — architectural transposition over patching; pipeline parity (api/); standing audit cadence; sharpened deferral (a)(b)(c) triggers.
- **Precept invariants 30-33** — `proof:resolution` GREEN; precept submodule pinned (`68d9b20`).

## §4 — Authority

This file pins the H-opening directive verbatim. H's plan substrate flows from:
- The 6 audit deliverables (`audit/H-AUDIT-1..6-*.md`) — to be authored at H open.
- The synthesis at `H.md` + `findings.md`.
- The forward-carry seed at `docs/tranches/G/H-SEED.md` (predecessor-authored).
- F's + G's `FINAL.md` (the close states this builds on).

## §5 — Mode

Planning-only at H open. The 6-agent audit is the substrate basis. H.W1+ dispatches only after user ratification per G1.
