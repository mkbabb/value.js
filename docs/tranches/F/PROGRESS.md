# F — Progress

Execution log for tranche F. Updated at wave boundaries. **Planning-only at F open** per the user directive ("This is NOT an implementation phase. Tranche development only.").

## 2026-05-20 — F seed (the thesis directive)

User issued: "No deferrals. New tranche for developing the above." Immediately after the v0.7.0 push notification. "The above" refers to E's `FINAL.md §6` standing route-forward items.

## 2026-05-21 — F open (the 6-agent audit directive)

### Trigger

User issued the canonical 6-agent-audit invocation (verbatim in `F-PROMPTS.md §2`). Eight decomposed clauses; the F-distinguishing one is **"No deferrals"** sharpened to TIME-BOUND (c) re-check triggers per F1.

### Audit round — 6 parallel research lanes

Six read-only research lanes dispatched as parallel `general-purpose` agents. Each authored a deliverable under `audit/`.

| Lane | Angle | Deliverable | Headline finding |
|---|---|---|---|
| F-AUDIT-1 | Prompts + precepts recap | `audit/F-AUDIT-1-prompts-precepts.md` | 20 distinct user prompts cataloged across pre-A → A → B → D → E → E-FOLD → E execution → post-E-window → F-seed → F-open. Zero-deferral verdict HONORED. **W8-W12 origin solved**: consumer LOCKSTEP of speedtest's tranche AI § 11 (authority lives at `speedtest/docs/tranches/AI/{AI,FINAL}.md`); value.js participated as consumer without authoring its own tranche envelope. |
| F-AUDIT-2 | Deferred-items ledger | `audit/F-AUDIT-2-deferred-ledger.md` | 18 entity-level inherited items. Per-disposition: 4 FOLD-INTO-F + 5 RETIRE-MOOT + 3 PEER-AUTHORSHIP-REQUIRED + 3 CARRY-FORWARD-WITH-SHARPER-TRIGGER. ZERO silent under "No deferrals". |
| F-AUDIT-3 | W8-W12 master drift | `audit/F-AUDIT-3-w8-w12-drift.md` | 11/12 gates PASS or improved at HEAD `e1549e0` (vue-tsc 126→120, bundle 141→125 KB raw, −11.7%). ONE NEW REGRESSION: `build:gh-pages` blocked by missing `Github` lucide icon (W9-C alias-hygiene punt). Tranche-discipline PARTIAL — exemplary commit shape, irregular structure (no value.js-side substrate). |
| F-AUDIT-4 | Cross-repo state | `audit/F-AUDIT-4-cross-repo-state.md` | Glass-ui +14 commits but ZERO primitive asks shipped + in **contraction posture** (DockGroup/ProgressiveSidebar archived). Keyframes.js +5 commits but lerp NOT migrated despite maintainer activity. Speedtest AI CLOSED + AJ in-flight. Precepts ZERO drift. |
| F-AUDIT-5 | Library + demo architecture | `audit/F-AUDIT-5-library-demo-architecture.md` | 14/15 E transpositions still LANDED post-W12; 1 DEFERRED (lerpLegacy, F2 target). NO LEGACY CODE re-verify clean (zero drift across 5 markers). 3 NEW transpositions: Github icon migration, @ts-ignore strengthening at `parsing/utils.ts:146`, Rolldown declarative codeSplitting. |
| F-AUDIT-6 | api/ + e2e/ + CI state | `audit/F-AUDIT-6-api-e2e-ci.md` | api/ + e2e/ + CI substrate INTACT post-W12 (zero src/api/e2e/workflow diff). 8 F-plan tightenings surfaced (CHANGELOG-gate broadening, vue-tsc baseline 126→120, dts-shape invariant, bundle-size gate, `--erasableSyntaxOnly`, etc.). |

### Plan synthesis

`F.md` synthesized from the 6 audit deliverables. Five waves:
- **F.W0** — open + state-at-open + W8-W12 back-reference + gh-pages unblock + coord refresh.
- **F.W1** — post-W12 transpositions + dead-code sweep.
- **F.W2** — keyframes.js codemod cross-repo apply (F3 boundary exception).
- **F.W3** — `lerpLegacy` value.js-side delete (F2 satisfied) + CI substrate hygiene (v0.8.0 candidate).
- **F.W4 HEADLINE close** — FINAL.md, doc drift, coord state, merge to master, v0.8.0 tag.

Plus 4 F-specific invariants (F1-F4): F1 "No deferrals" as binding; F2 lerpLegacy retires; F3 cross-repo write authorization (explicit + bounded); F4 W8-W12 back-reference + tranche-discipline sharpening.

Per F.md §2: F inherits E1-E5 + D1-D7 + precept invariants 30-33 verbatim.

Wave specs `waves/F.W0..F.W4.md`. Cross-repo coordination `coordination/Q.md` (refreshes E's with the post-E peer activity).

The dispatch contract `dispatch/AGENT.md` inherits E's contract verbatim + adds 4 F-specific deltas (F1-F4 binding + the F.W2 cross-repo-write protocol).

### State at F open (planning-only)

Plan substrate: `F.md`, `F-PROMPTS.md`, `findings.md`, `audit/F-AUDIT-1..6` (6 audit docs), `coordination/Q.md`, `dispatch/AGENT.md`, `waves/F.W0..F.W4.md`, this file. **No implementation has run — planning-only.**

### Repo state at F open

- Branch: `tranche-f` (F opens off master HEAD `e1549e0` post-W8-W12 consumer-lockstep — see `F.md §0`).
- `docs/precepts`: `68d9b20` (unchanged).
- vue-tsc: 120 (was 126 at E close; -6 silently from TS 6 + vue-tsc 3.3).
- vitest: 1584 / 34 (unchanged).
- e2e: 36 specs across 5 projects (unchanged).
- glass-ui: `5b81866` (+14 commits since E close; in contraction posture).
- keyframes.js: `d312517` (+5 commits since E close; lerp NOT migrated).
- speedtest: `30f7f555` (+25+ commits since E open; AI tranche CLOSED).
- fourier-analysis: `926ca6a` (ZERO drift).
- v0.7.0 tagged at `47399c2`; v0.8.0 will tag the F-merge.
- ONE chronic carried in: `build:gh-pages` blocked (`Github` lucide icon missing) — F.W0 Lane A closes.

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| F.W0 HEADLINE — open + state-at-open + W8-W12 back-reference + gh-pages unblock + coord refresh | planned | — | — | — |
| F.W1 — post-W12 transpositions + dead-code sweep | planned | — | — | — |
| F.W2 — keyframes.js codemod cross-repo apply (F3 boundary exception) | planned | — | — | — |
| F.W3 — lerpLegacy delete + CI substrate hygiene (v0.8.0 candidate) | planned | — | — | — |
| F.W4 HEADLINE close — FINAL.md, merge, v0.8.0 tag | planned | — | — | — |

## Open dependencies

- **None on the critical path** — F's value.js-only scope is fully unblocked.
- F.W2 cross-repo write depends on F3 boundary authorization (explicit per F.md §2) + keyframes.js working tree being clean at F.W2 dispatch.
- F.W3 lerpLegacy delete depends on F.W2's keyframes.js test verification GREEN.
- The 7 standing glass-ui primitive/blob asks remain blocked on glass-ui's successor tranche (contraction posture noted).
- The keyframes.js precept-pin reconciliation remains keyframes.js maintainer authority.
- The CW Phase-2 activation remains speedtest authority + user-gated.
- The precept submodule SHA at `68d9b20` — no upstream movement at F open; verify at F.W4 close.

## Authority

Per `F.md §10` + `F-PROMPTS.md §5`: F's substrate flows from the 6 audit deliverables (`audit/F-AUDIT-1..6`); the synthesis in `findings.md`; the wave specs in `waves/F.W0..F.W4.md`. The 9 binding standing mandates per `F-PROMPTS.md §3` bind every wave + F1-F4 sharpen them.
