# F — Prompts ledger

This file captures every user-issued directive that informs Tranche F's scope. Verbatim where brief; paraphrased with attribution where lengthy. Updated only at wave boundaries.

## §1 — F-thesis seed (2026-05-20)

> No deferrals. New tranche for developing the above.

Issued immediately after the v0.7.0 push notification. "The above" refers to E's `FINAL.md §6` standing route-forward items (lerpLegacy, 7 glass-ui primitive asks, contract-v2 §2.1 font-asset residual, keyframes.js precept-pin drift) + the cross-repo coordination state surfaced at E close.

## §2 — F-opening directive (2026-05-20 — the canonical 6-agent-audit invocation)

Verbatim (mirrors the E-opening directive's shape):

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

### Decomposed clauses

1. **DEEPLY audit with 6 agents in parallel** — F-AUDIT-1..6 dispatched as parallel `general-purpose` agents at F open.
2. **Recapitulate ALL prompts** — F-AUDIT-1 catalogs 20 distinct user prompts across pre-A → A → B → D → E → E-FOLD → E execution → post-E-window → F-seed → F-open.
3. **NO quick solutions, NO workarounds: idiomatic, gestalt approaches** — binding standing mandate #1; carried as F-invariant.
4. **Architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable** — binding standing mandate #4; carried as F-invariant.
5. **NO legacy code** — binding standing mandate #2; codified as F2 (sharpened from E2 — `lerpLegacy` now retires in F per the §1 "no deferrals" thesis).
6. **Delineate any chronically deferred items and fold them into this new tranche** — F-AUDIT-2 enumerates 18 entity-level inherited items; per-disposition counts in `findings.md §2`.
7. **Delineate any deferred items and fold them into this new tranche** — restated for emphasis; same as #6.
8. **Recap ALL of our prompts and requests hitherto and ensure they've been addressed** — F-AUDIT-1 §6 zero-deferral verdict: HONORED at F open.
9. **This is NOT an implementation phase. Tranche development only.** — binding planning-only posture at F open; first execution session opens at F.W0 only after explicit user authorization.

## §3 — The 9 standing mandates (inherited verbatim from E-PROMPTS.md §3)

1. NO quick solutions, NO workarounds: idiomatic, gestalt approaches.
2. NO legacy code (codified as E2; sharpened as F2 — `lerpLegacy` retires in F).
3. DRY / KISS.
4. Architectural transpositions are necessary and desirable.
5. Run linting and type checking at every interval.
6. DEEPLY audit with N agents in parallel.
7. Tranche development only / planning-only at open.
8. Chronically deferred items must be folded.
9. Recapitulate every prompt.

All 9 are binding across F.

## §4 — Carry-forward authority

E's `FINAL.md §6` ("Standing route-forward items") is F's primary scope-seed. F's `findings.md` cross-walks E's route-forward items to F waves with the (a)(b)(c) escalations refined per F's "no deferrals" thesis.

## §5 — Open dependencies + scope-boundary

- F authorizes one explicit cross-repo write: applying the published `scripts/migrate-keyframes-js-lerp.mjs` codemod against `keyframes.js`. The codemod is parity-asserting + idempotent + dry-run-safe; applying it does not violate the cross-repo boundary because the codemod IS the published unblock action (the boundary's exception path).
- F does NOT authorize cross-repo writes for design-authority asks (glass-ui's 7 primitives, keyframes.js's precept-pin reconciliation, glass-ui's font-inlining). These require the peer maintainer's authorship; F's plan refines their (c) triggers.
- F does NOT authorize CW Phase-2 activation (speedtest-side authority; value.js is consumer).
