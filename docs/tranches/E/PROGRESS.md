# E — Progress

Execution log for tranche E. Updated at wave boundaries. **Planning-only at E open** per the user directive ("This is NOT an implementation phase. Tranche development only.").

## 2026-05-20 — E open

### Trigger

The user issued the E-opening directive the turn immediately after D's close-ceremony + the v0.6.0 merge to master + the push to origin. Verbatim in `E-PROMPTS.md §1`. Eleven decomposed clauses; the headline ones are:
- "DEEPLY audit with 6 agents in parallel"
- "Architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable"
- "NO legacy code"
- "Delineate any chronically deferred items and fold them into this new tranche" (and "any deferred items")
- "Recap ALL of our prompts and requests hitherto and ensure they've been addressed"
- "This is NOT an implementation phase. Tranche development only."
- "In particular, analyze the recent speedtest and glass-ui and fourier analysis work"

The full prompt + the 9 standing mandates (cross-tranche bindings) + the inherited prompt corpus across pre-A + A + B + D are catalogued in `E-PROMPTS.md`.

### Audit round — 6 parallel research lanes

Six read-only research lanes dispatched as parallel `general-purpose` agents. Each authored a deliverable under `audit/`.

| Lane | Angle | Deliverable | Headline finding |
|---|---|---|---|
| E-AUDIT-1 | Prompts + precepts recap | `audit/E-AUDIT-1-prompts-precepts.md` (311 LoC) | 84 clauses across pre-A + A + B + D + E-open; 68 ADDRESSED + 6 ROUTED + 0 DEFERRED + 10 NEW. The "DEEPLY audit + recapitulate + idiomatic-gestalt + no-legacy + planning-only + fold-deferred" directive issued 3 times → codified as standing mandate. |
| E-AUDIT-2 | Deferred-items ledger | `audit/E-AUDIT-2-deferred-ledger.md` (354 LoC) | 38 items across 4 tranches (A→B→D→E-open). FOLD-INTO-E count: 10. RETIRE: 3. ROUTE-FORWARD: 14 (each with explicit rationale, not silent). |
| E-AUDIT-3 | D execution review | `audit/E-AUDIT-3-d-execution-review.md` (383 LoC) | D is structurally STRONG. 24 deviations, 0 silent drops. 6 SOLID + 2 ACCEPTABLE + 0 FRAGILE substrates. Headline gaps for E: two-speed backend (`routes/sessions.ts` + `routes/colors.ts` bypass D.W2 pipeline); `client.withTransaction` never wired; `lerpLegacy` + `siblingFsAllowTransient` survive. |
| E-AUDIT-4 | Cross-repo state | `audit/E-AUDIT-4-cross-repo-state.md` (441 LoC) | **Glass-ui shipped `9275584` `./styles.css → dist/glass-ui.css`** — closes D-FINAL-named contract-v2 §2.1 keystone gap (highest E.W0 win). **CW seed** at speedtest = monorepo workspace transposition; value.js is CONSUMER not author. Glass-ui has NO own `AH` tranche (the AH.* commits are speedtest XR work). |
| E-AUDIT-5 | Library + demo architecture | `audit/E-AUDIT-5-library-demo-architecture.md` (742 LoC) | 15 transposition opportunities, ~8 wave-slots total. KEY FINDINGS: `lerpLegacy` zero consumers → DELETE; `WhitePointColor<T>` intermediate class asymmetric → LIFT; 152-branch `nameParser` → replace; `DIRECT_PATHS` table for `color2` hot paths; 51 conversion functions over-exposed in barrel; `vue-router` mis-placed runtime dep; 5 CLAUDE.md files stale. |
| E-AUDIT-6 | api/ + e2e/ + cross-cutting | `audit/E-AUDIT-6-api-e2e-cross-cutting.md` (433 LoC) | api/ 87% conformant; 2 routers bypass pipeline; `requireOwnership` authored-but-unwired; 14 e2e interactive flows uncovered; reactivity-instant flake under parallel load; zero backend tests; CI missing vue-tsc + library build + Node 22 matrix + browser cache + bench gate. |

### Plan synthesis

`E.md` synthesized from the 6 audit deliverables. Six waves:
- **E.W0** — open + glass-ui `./styles.css` adoption + state-at-open + chronically-deferred fold-confirm + coord refresh.
- **E.W1** — library architectural transposition + legacy retirement + barrel cleanup (v0.7.0 candidate — breaking).
- **E.W2** — api/ pipeline parity + middleware split + transactional wiring + first backend tests.
- **E.W3** — e2e/ coverage expansion + smoke-safari + flake fix + env-noise shared fixture.
- **E.W4** — vendor policy + CI hardening + benchmark gate + CW preparation + tooling refresh.
- **E.W5 HEADLINE close** — FINAL.md, doc drift, coord state, merge to master, v0.7.0 tag.

Plus 5 E-specific invariants (E1-E5) + 9 inherited standing mandates + D1-D7 + precept invariants 30-33. Per `E.md §2`, the architectural-transposition bar (E1) is HIGHER than D5's "zero deferral" — every E wave asks "could this be elegantly transposed?" before "should this be patched?"

Wave specs `waves/E.W0..E.W5.md`. Cross-repo coordination `coordination/Q.md` (refreshes D's §3 with the post-D peer activity: glass-ui's 5 post-Q-close commits, speedtest's AI tranche + CW seed, keyframes.js unchanged, fourier-analysis dirty Phase-0 blocker for CW).

The dispatch contract `dispatch/AGENT.md` inherits D's contract verbatim + adds 5 E-specific deltas (E1-E5 binding, worktree-base pinning lesson, library transposition micro-audits, v0.7.0 release-blocker matrix, CW coordination).

### State at E open (planning-only)

Plan substrate: `E.md`, `E-PROMPTS.md`, `findings.md`, `audit/E-AUDIT-1..6` (6 audit docs), `coordination/Q.md`, `dispatch/AGENT.md`, `waves/E.W0..E.W5.md`, this file. **No implementation has run — planning-only.**

### Repo state at E open

- Branch: `tranche-e` (E opens off master post-D-merge `eae8afc`, tagged `v0.6.0` at `7ac4ecc`).
- `docs/precepts`: `68d9b20` (the contract-v2 codification SHA; no upstream movement since D close).
- vue-tsc: 126 (the residual generated shadcn-vue cluster).
- vitest: 1582 / 34 files.
- e2e: 21 specs across 3 projects (smoke / smoke-admin / smoke-mobile).
- glass-ui: `66e9b8f` (post-Q-close + 5 commits including `9275584` `./styles.css` ship).
- keyframes.js: `0909177` (no commits since D open).
- speedtest: `9d22bcdf` (tranche AI W6 + CW seed planning-only).
- fourier-analysis: `926ca6a` (109-file dirty working tree — Phase-0 CW blocker).
- v0.6.0 tagged at `7ac4ecc`; merge commit at `eae8afc`.

## 2026-05-20 — E-FOLD round (4-agent parallel + orchestrator synthesis)

### Trigger

User directive: "All route forward should be folded herein — assay the speedtest tranche that's actively executing to ensure no duplication. Deploy 4 agents in parallel."

### Dispatch + outcomes

Four parallel research lanes dispatched. Three hit transient API rate-limits before authoring; the orchestrator executed those directly.

| Lane | Status | Deliverable |
|---|---|---|
| E-FOLD-1 (speedtest assay) | LANDED | `audit/E-FOLD-1-speedtest-assay.md` (461 LoC) |
| E-FOLD-2 (glass-ui ask reclassification) | rate-limited; **executed by orchestrator** | folded into `audit/E-FOLD-2-3-4-synthesis.md` |
| E-FOLD-3 (keyframes.js ask reclassification) | rate-limited; **executed by orchestrator** | folded into `audit/E-FOLD-2-3-4-synthesis.md` |
| E-FOLD-4 (comprehensive folding synthesis) | rate-limited; **executed by orchestrator** | the plan-amendment work below |

### Critical finding (E-FOLD §1)

**Value.js's v0.6.0 SILENTLY BROKE keyframes.js's `file:`-linked consumer.** Single site: `keyframes.js/src/animation/numeric.ts:159` — `lerp(eased, startVals, stopVals)` under the v0.6.0 `(a, b, t)` order produces garbage. D's v0.6.0 release plan acknowledged the keyframes.js consumption-update as a post-merge filing; it did NOT measure that the file:-linked consumer breaks silently. E2 ("NO LEGACY CODE") gets a sharpened E5 reframing: `lerpLegacy` is NOT dead code — it has ONE active consumer pattern. The retirement triggers AT THE EARLIEST UNBLOCK MOMENT (keyframes.js's migration confirmation), not in the next tranche unconditionally.

### Folding outcomes

Per the E-FOLD-2-3-4 synthesis (`audit/E-FOLD-2-3-4-synthesis.md §5`):

| Disposition | Count | Examples |
|---|---|---|
| FOLDED into E (new) | 2 | NEW E.W4 Lane F (keyframes.js coordination); E.W0 Lane A (`./styles.css` consumption, was already at open) |
| ALREADY FOLDED at E open | 5 | A-11, A-14..A-18, D-04 nameParser, motion canon, CW prep |
| RETIRED (ask moot) | 3 | keyframes.js AnimationOptions rename, Color.L migration, pin bump — keyframes.js doesn't import these |
| ROUTE-FORWARD-VERIFIED with E5 3-part escalation | 7 | 7 standing glass-ui asks + Contract-v2 §2.1 residual + keyframes.js precept-pin drift |
| SKIPPED (speedtest pre-emption) | 0 | per E-FOLD-1 §7 |

**Total**: 14 → resolved (7 folded + 3 retired + 7 sharpened-escalation + 0 skipped) = 17 disposed (some items decomposed into multiple sub-items).

### Plan amendments

- `E.md §7` — refreshed with the post-FOLD state (FOLDED / RETIRED / ROUTE-FORWARD-VERIFIED buckets).
- `E.md §8` — points at the FOLD synthesis doc's full disposition.
- `waves/E.W1.md` Lane A — DEFERS `lerpLegacy` retirement; updates the JSDoc per E5 trigger.
- `waves/E.W4.md` — adds NEW Lane F (keyframes.js consumption-update coordination + the codemod scaffolding).
- `coordination/Q.md §5` — adds §5.1 (the v0.6.0 silent breakage finding), §5.2 (the migration diff), §5.3 (the E5 3-part `lerpLegacy` retirement trigger), §5.4 (the verification protocol).
- This file (PROGRESS.md) — adds this entry.

### Net effect

E's scope sharpens: every route-forward item now carries an EXPLICIT disposition. The cross-repo silent-breakage is surfaced + filed with the smallest unblock action documented. The "NO LEGACY CODE" invariant gets a more nuanced reading via E5 — `lerpLegacy` stays JUST long enough for the consumer migration, then dies AT THE EARLIEST POSSIBLE TRIGGER, not arbitrarily.

No new wave; no scope dropped; the architectural posture (E1 transposition over patching) is preserved.

## 2026-05-20 — E.W0 HEADLINE close (open + `./styles.css` adoption + state-at-open + coord refresh)

### Dispatch + outcomes

Three parallel research+implementation lanes dispatched as `general-purpose` agents under worktree-disjoint file ownership; orchestrator consolidated coordination/Q.md edits.

| Lane | Status | Deliverable |
|---|---|---|
| E.W0 Lane A (`./styles.css` adoption) | LANDED | `audit/E.W0-lane-a-styles-adoption.md` + `demo/@/styles/style.css` + `vite.config.ts` |
| E.W0 Lane B (state-at-open probe) | LANDED | `audit/E.W0-state-at-open.md` |
| E.W0 Lane C (coord refresh) | LANDED | `audit/E.W0-lane-c-coord-refresh.md` |

### Lane A outcome — glass-ui `./styles.css` adoption + `siblingFsAllowTransient` NARROW decision

- `demo/@/styles/style.css` now imports BOTH `@mkbabb/glass-ui/styles` (Tailwind-source) AND `@mkbabb/glass-ui/styles.css` (SFC-scoped compiled).
- Verification: post-adoption `dist/gh-pages/assets/index-*.css` carries 196 `data-v-*` SFC-scoped selectors (proves compiled surface bundled); `@font-face` + font-asset URLs unchanged (Tailwind-source surface still active).
- **`siblingFsAllowTransient`: NARROWED, not retired.** The compiled `dist/glass-ui.css` ships zero `@font-face` and zero `url()` refs (verified: 110 `data-v-*` SFC selectors only). The Tailwind-source `./styles` surface still needs symlink reach for `url("../fonts/fira-code/...woff2")` walking OUT of `node_modules/@mkbabb/glass-ui/src/styles/`. The widening narrows from "consumer-side reciprocal of an unaddressed publisher gap" to "consumer-side reciprocal of a NARROWED publisher gap — font-asset half only."
- Retirement requires either (a) glass-ui inlining font binaries as base64 in `dist/glass-ui.css`, OR (b) demo dropping `./styles` entirely (forfeits design tokens + `@source` class-scanning). Neither is tranche-E scope; filed as glass-ui-side successor concern.
- `vite.config.ts` inline comment block replaced to reflect the NARROW posture.
- `coordination/Q.md §3` updated: `./styles.css` row marked **ADOPTED at E.W0 Lane A**; contract-v2 §2.1 row updated to **NARROWED at E.W0 Lane A** with full rationale.

### Lane B outcome — state-at-open gate matrix + chronically-deferred fold-confirm

E-open gate matrix (post-Lane-A re-verification):

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `npm run lint` | exit 0 | 0 | PASS |
| `npx vue-tsc --noEmit` | 126 errors | 126 | PASS |
| `npx vitest run` | 1582 / 34 | 1582 / 34 | PASS |
| `npx playwright test` (3 projects) | 21/21 | 21/21 in 18.9s | PASS |
| `npm run proof:resolution` | GREEN | GREEN | PASS |
| `npm run build` | clean | clean (dist/value.js 137.60 kB / 40.44 kB gzip) | PASS |
| L8 microbench median | ≥ 5× | 12.84× | PASS |

DRIFTS (informational, all resolved):
- `v0.6.0` annotated tag dereferences to `eae8afc` (master-merge commit), not `7ac4ecc` (D.W6 ceremony commit). This is correct — annotated tags placed at merge point; release is intact.
- `dist/` carries ESM-only (`value.js`); no `value.cjs` (vite.config.ts declares `formats: ["es"]`). Stale framing in CLAUDE.md to reconcile at E.W5 close.
- `reactivity-instant` 47.60ms slider-keyboard median PASSED ≤ 50ms gate (Lane B initial probe showed 54.30ms outlier; re-run was clean — E.W3 Lane A still addresses the parallel-load methodology).

Chronically-deferred ledger:
- **A-11 ConfigSliderPane** — RETIRED (verified: imports `@mkbabb/glass-ui/configurator`).
- **A-14..A-18** — appear closed-via-prior-rewrite; E.W5 close-audit re-verification scheduled.
- **B-01/B-07 vendor policy** — 126 vue-tsc errors confirmed persistent; routed to E.W4 Lane C.
- **D-03 smoke-safari** — `playwright.config.ts` has no `smoke-safari` (correct — E.W3 Lane B adds).
- **AUD-4.7 keyframes.js precept-pin drift** — confirmed at `458c2d1` on divergent tree (cross-repo; tracked).

### Lane C outcome — peer-HEAD reconciliation

Drift detection across all 5 peers:

| Peer | Recorded | Actual | Drift | Severity |
|---|---|---|---|---|
| glass-ui | `66e9b8f` | `66e9b8f` | ZERO | — |
| keyframes.js | `0909177` | `0909177` | ZERO | — |
| speedtest | `9d22bcdf` | `7d9211fd` | 2 commits | INFORMATIONAL (planning-only, no source) |
| fourier-analysis | `926ca6a` | `926ca6a` | ZERO | — |
| precepts (value.js pin) | `68d9b20` | `68d9b20` | ZERO | — |
| precepts (glass-ui co-pin) | `68d9b20` | `68d9b20` | ZERO | — |

Speedtest drift: `9f3ffca6` §10 dep-lift coordination + `7d9211fd` §11 constellation-wide scope expansion — both `docs(AI):` planning amendments, no source touched. value.js de-coupling at `bab2a6de` (May 8) holds. CW seed at `61079cb1` invariant. `coordination/Q.md §1` (peer-line bump) applied.

All ancillary re-verifications PASS: glass-ui `./styles.css` ship at `9275584` PRESENT; keyframes.js `numeric.ts:159` lerp silent-breakage call site CONFIRMED bit-identical; speedtest value.js-runtime-dep drop at `bab2a6de` STILL HOLDS; fourier-analysis 109-file dirty tree CONFIRMED; precepts upstream no advance.

### E.W0 sub-gate verdict

**PASS** — all 3 lanes closed sub-gates; conjunction holds. The wave gate (`vue-tsc` ≤ 126, `vitest` 1582+, smoke 21/21 across 3 projects, lint exit 0, proof:resolution GREEN, build clean, bench ≥ 5×) all GREEN.

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| E.W0 HEADLINE — open + `./styles.css` adoption + state-at-open + coord refresh | closed | 2026-05-20 | 2026-05-20 | <E.W0-A> + <E.W0-BC> |
| E.W1 — library architectural transposition (v0.7.0 candidate) | planned | — | — | — |
| E.W2 — api/ pipeline parity + middleware split + first backend tests | planned | — | — | — |
| E.W3 — e2e/ coverage expansion + smoke-safari + flake fix | planned | — | — | — |
| E.W4 — vendor policy + CI hardening + bench gate + CW preparation | planned | — | — | — |
| E.W5 HEADLINE close — FINAL.md, merge, v0.7.0 tag | planned | — | — | — |

## Open dependencies

- **None on the critical path** — E's value.js-only scope is fully unblocked.
- E.W0 Lane A consumes glass-ui's `9275584` ship (verified upstream at E open).
- E.W4 Lane D reads-only from speedtest's CW seed (`61079cb1`); value.js does not author CW.
- The 7 standing glass-ui primitive/blob asks remain blocked on glass-ui's successor tranche.
- The keyframes.js post-v0.6.0 consumption update routes to keyframes.js's own schedule.
- The precept submodule SHA at `68d9b20` — no upstream movement at E open; verify at E.W5 close.

## Authority

Per `E.md §10` + `E-PROMPTS.md §5`: E's substrate flows from the 6 audit deliverables (`audit/E-AUDIT-1..6`); the synthesis in `findings.md`; the wave specs in `waves/E.W0..E.W5.md`. The 9 binding standing mandates per `E-PROMPTS.md §3` bind every wave.
