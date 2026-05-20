# E — Prompts ledger

The single canonical ledger of every user prompt that opens tranche E + the carried-over standing mandates that bind all value.js tranches.

## §1 — E-opening directive (verbatim)

Issued by the user 2026-05-20, the turn immediately after D's close-ceremony + the v0.6.0 merge to master + the push to origin.

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
>
> In particular, analyze the recent speedtest and glass-ui and fourier analysis work.

## §2 — Decomposed clauses + dispositions

| # | Clause | Disposition |
|---|---|---|
| 1 | "DEEPLY audit with 6 agents in parallel" | LANDED — 6 parallel agents dispatched + 6 audit docs at `docs/tranches/E/audit/E-AUDIT-1..6` (311 + 354 + 383 + 441 + 742 + 433 = 2,664 LoC). |
| 2 | "Devise a path forward" | LANDED — this substrate (E.md + waves + dispatch + coordination/Q.md + findings.md). |
| 3 | "Recapitulate our original prompts, plans, and precepts" | LANDED — `E-AUDIT-1` carries the full 84-clause ledger across pre-A + A + B + D + E-open; verified 68 ADDRESSED, 6 ROUTED, 0 silent-deferred, 10 NEW. |
| 4 | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches" | INVARIANT — restated as a standing mandate; binds every E wave. |
| 5 | "Architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable" | DIRECTION — E's primary thesis is architectural; the 15 transposition opportunities in `E-AUDIT-5` are the main scope of E.W1. |
| 6 | "NO legacy code" | INVARIANT — `lerpLegacy` (the lone `@deprecated` in src/, zero consumers) is the canonical surface for the rule; E.W1 deletes it + every other dead/legacy item the audit found. |
| 7 | "Delineate any chronically deferred items and fold them into this new tranche" | LANDED in audit — `E-AUDIT-2` enumerates 38 items across 4 tranches; FOLD-INTO-E count = 10; RETIRE count = 3; ROUTE-FORWARD count = 14 (each with explicit rationale, not silent). |
| 8 | "Delineate any deferred items and fold them into this new tranche" | LANDED — same `E-AUDIT-2` covers BOTH the chronically-deferred (cross-tranche) AND the recently-deferred (D.W6 named-destinations). |
| 9 | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed" | LANDED — `E-AUDIT-1 §1` enumerates every prompt; coverage matrix in §6 of that doc shows zero clauses are neither-addressed-nor-routed. |
| 10 | "This is NOT an implementation phase. Tranche development only." | POSTURE — E is opened planning-only; the first execution session opens at E.W0 only after the orchestrator authorizes (per user explicit signal). |
| 11 | "Analyze the recent speedtest and glass-ui and fourier analysis work" | LANDED — `E-AUDIT-4` reports the full cross-repo state. Headline finding: glass-ui shipped `9275584` (`./styles.css → dist/glass-ui.css`) which CLOSES the D-FINAL-named contract-v2 §2.1 keystone gap. Speedtest's CW seed (monorepo workspace transposition) is the largest in-flight constellation change; value.js is a CONSUMER not author. Fourier-analysis consumes value.js easings; zero v0.6.0 breakage. |

## §3 — Standing user mandates (cross-tranche binding clauses)

Per `E-AUDIT-1 §2`, the following clauses have been issued repeatedly across A + B + D + E-open and are binding for every tranche of value.js:

1. **NO quick solutions, NO workarounds: idiomatic, gestalt approaches.**
2. **NO legacy code.**
3. **DRY / KISS.**
4. **Architectural transpositions are necessary and desirable.**
5. **Run linting and type checking at every interval.**
6. **DEEPLY audit with N agents in parallel** (the standing audit-cadence directive — issued at B turn-4, D-open, and E-open; codified as a precept-binding pattern).
7. **Tranche development only / planning-only at open** (the planning-vs-execution gate).
8. **Chronically deferred items must be folded** (no silent deferrals — D5 invariant generalized).
9. **Recapitulate every prompt** (the audit-doc cross-walk discipline).

These nine binding mandates are NOT E-specific — they are the value.js project's binding edicts. Tranche E's invariants (E.md §2) extend D's invariants D1-D7 with E-specific additions, but the nine above apply categorically.

## §4 — Inherited prompts from A + B + D

The cumulative prompt corpus (per `E-AUDIT-1 §1`):

- **Pre-A modernization directive** — 10-phase modernization (Sass→CSS, gl-matrix→inline, TS strict, radix→reka, etc.). All closed at A.W0.
- **A turn-1 mandate** (13 clauses: 7 styling + design audit, root-level restyling, glass-ui-for-all, flatten complex components, skip duplicates, gaps in value.js AND glass-ui, Playwright user + admin flows). Per `findings.md §4`: every mandate FULL or PARTIAL-with-named-route across A + B + D.
- **B turn-1** — "continue the tranche in totality; idiomatic gestalt approaches".
- **B turn-4 hardening** — "DEEPLY audit with 6 agents". Codified.
- **D-opening** — 6 named scope items + architectural binds; the entire D substrate is documented at `D-PROMPTS.md §1`.
- **D library-perf round** — "Analyze with 6 agents + 6 challenge agents; converge on optimum and research-backed claims; KISS." Folded as the `D-LIB-OPTIMIZATION-SYNTHESIS.md` with 12 REJECTED claims.
- **D reactivity round** — "Proper, instant, reactivity; commit history excavation; merge + version bump." Folded as the REACTIVITY-A/B audits + the L8 microbenchmark gate + the v0.6.0 release plan.
- **D close-ceremony** — "Continue, re-deploy all agents." LANDED — D.W6 closed + merged to master + tagged v0.6.0 + pushed.
- **E-opening** — THIS PROMPT.

## §5 — Authority

E's plan substrate flows from:
1. The 6 audit deliverables under `docs/tranches/E/audit/E-AUDIT-1..6`.
2. The synthesis in `findings.md` (audit-to-wave mapping).
3. The wave specs in `waves/E.W0..E.W5.md`.

Each E wave's dispatch will cite this prompts-ledger as the gate of intent.
