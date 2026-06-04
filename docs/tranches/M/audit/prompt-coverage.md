# M — Prompt-coverage recap (ALL prompts + requests + precepts, the user's "recap ALL" mandate)

Every distinct user mandate across the arc, recapped with its addressed-state and M
disposition. **Verdict (Wave-1 Lane A, corroborated): zero un-recapped prompts. The coverage
docs are honest. The open items are all UNADDRESSED-IN-CODE requests — folded, none yet landed —
which is exactly what M exists to land.**

## §1 — This session's mandates (CONSTELLATION-arm → L → this audit)

| # | Mandate (verbatim intent) | State | M disposition |
|---|---|---|---|
| S1 | "Read CONSTELLATION.md + tranche L, inv-16, orchestrate waves with parallel agents, gate on own green CI, no workarounds, idiomatic, no legacy. Continue indefatigably until complete in totality." | ✅ **DONE** — L executed W0–W4 + CLOSED (`66dcd68`), all 9 invariants verified by independent close-audit, inv-16 held | KEEP (the green backend M builds on) |
| S2 | "Finish tranche L: close-audit, cross-check counts, commit, flag the demo/CLAUDE.md revert" | ✅ **DONE** — committed; the demo/CLAUDE.md revert RECOVERED from a dangling blob | KEEP |
| S3 | "DEEPLY audit with 6 agents in parallel… recap ALL prompts… fold chronically-deferred + deferred… NO legacy, idiomatic gestalt, architectural transpositions for elegance/simplicity/performance… NOT implementation, tranche development only… consider fourier + glass-ui tranches in a 2nd wave of 6" | ✅ **THIS DELIVERABLE** — two 6-agent waves (value.js-internal + cross-repo) → tranche M (planning only) | — |

## §2 — The K-arc mandates (recapped from `K/audit/request-coverage.md`)

| Mandate | State | M disposition |
|---|---|---|
| K execution (cross-repo frontend cohesion) | W2 executed; W2.5/2.6/W3–W6 specced | **superseded → M** (§0 of M.md) |
| post-W2 audit (the resolution-transposition correction) | specced (K.W2.5), unimplemented; the violation LIVE | **M.W1** |
| visual-grounded re-audit (screenshot session, desktop-P0, π lane) | π baseline captured (84); desktop-P0 specced (K.W2.6) | **M.W2** (desktop-P0) + **M.W9** (π) |
| "glass-ui-first" (design-system primitives live in glass-ui, not demo/ui/) | upheld; the lift (CH-1/CH-3) unshipped | **M.W7** (the extirpation) |
| "no god module" / "≤400 LoC demo, ≤350 api" | upheld at L; audit re-confirmed 0 violators | KEEP (M.W6 dispatch.ts is the one real decomposition) |
| "KISS / no contrivance" | upheld (L.W4 verify-not-split is the proof) | re-affirmed (M does NOT rote-split; it deletes) |
| "no backwards-compat shims" | upheld (L excised the legacy fields at root) | re-affirmed (M deletes the precept fossil, not shims around it) |
| "preserve animations (move/tokenize, never delete)" | upheld | M.W3 PRM-gates (does not delete) the watercolor loop |
| "proof:* idiom retired as overfit" | upheld through K/L | re-affirmed (M invariants are structural) |

## §3 — The two OLDEST still-UNADDRESSED-IN-CODE mandates (the headline)

These are the user's two oldest requests, deferred 7+ tranches, **pixel-confirmed open** in the
2026-06-04 84-capture session. M lands both:

| # | Mandate | First asked | M wave |
|---|---|---|---|
| **m.13 / D-open #6** | **aurora-derived-from-a-singular-color** (the atmosphere derives its palette from the picked color, not a static "Sky") | tranche A turn-1 | **M.W5** (C2 + VAL-1 ship-or-KILL; producer `deriveAurora` now shipped in glass-ui 3.2.0) |
| **D-open #6** | **blob-facility extirpation into glass-ui** (the goo-blob + watercolor-dot facilities become design-system primitives) | tranche D | **M.W7** (the cohort lift → glass-ui 3.3.0) |

## §4 — Precept conformance (the standing contracts)

| Precept | State at M-open | M action |
|---|---|---|
| **contract-v2** (`docs/precepts/cross-repo-dev-resolution.md`) — consumers resolve `dist/`; the `development` source-resolution condition is ABROGATED | **VIOLATED** at `package.json:27` (the sole constellation violator) | **M.W1 deletes it** (mechanism-C by deletion; the v1.0.0 release-gate) |
| §2.4 — no self-aliasing a package's own published name | **VIOLATED** (`vite.config.ts:37` self-aliases `@mkbabb/value.js`) | **M.W1 deletes it** |
| inv-16 — write only your own repo | upheld (L; this audit reads cross-repo, writes only value.js) | re-affirmed (M's cohort asks are glass-ui's to author) |
| DEC-2 — consumers adopt the PUBLISHED version, never `file:` | not yet (both peers `file:../`) | **M.W4/M.W9** (0.11.0 + v1.0.0 registry consumption) |

**No mandate is un-recapped or silently dropped.** Everything addressed-in-code is KEPT;
everything unaddressed-in-code is FOLDED into M.W1–M.W9 (`audit/fold-ledger.md`); nothing is
re-deferred without an E5 trigger.
