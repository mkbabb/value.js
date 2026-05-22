# G — Progress

Execution log for tranche G. Updated at wave boundaries. **Planning-only at G open** per the user directive ("This is NOT an implementation phase. Tranche development only. Relay all carry-forward items to me for ratification.").

## 2026-05-21 — G open (the 6-agent audit directive)

### Trigger

User issued the canonical 6-agent-audit invocation immediately following the F merge + v0.8.0 tag. Decomposed into 12 clauses; the G-distinguishing one is **"Relay all carry-forward items to me for ratification"** (G1 binding).

### Audit round — 6 parallel research lanes (DONE)

| Lane | Angle | Deliverable | Headline finding |
|---|---|---|---|
| G-AUDIT-1 | Prompts + precepts recap | `audit/G-AUDIT-1-prompts-precepts.md` | 22 prompts cataloged; 5 silent gaps surfaced; precept 30/30+/33 HOLD; `as any` count 36 surfaced as silent gap |
| G-AUDIT-2 | Deferred-items ledger | `audit/G-AUDIT-2-deferred-ledger.md` | 17 entries: 2 FOLD + 1 RETIRE + 10 PEER-AUTH + 4 CARRY; 14 chronic-deferred (8 glass-ui asks @ 5-tranche carry); 1 F1-marginal (api/CLAUDE.md drift) folded |
| G-AUDIT-3 | State-at-G-open | `audit/G-AUDIT-3-state-at-G-open.md` | 16/16 gates PASS at HEAD `6b3a41b`; zero drift since F merge; bench medians L8 10.38× / DIRECT_PATHS 4.56× / nameParser 41.68× |
| G-AUDIT-4 | Cross-repo state | `audit/G-AUDIT-4-cross-repo-state.md` | glass-ui ZERO drift (0-of-7 asks shipped; Metaballs PARTIAL renegotiation candidate); keyframes.js 14 unpushed commits; speedtest NEW TRANCHE AK + value.js NON-CONSUMER finding; fourier-analysis chronic |
| G-AUDIT-5 | Library + demo arch | `audit/G-AUDIT-5-library-demo-architecture.md` | `as any`=36 / `as unknown as`=11; 5 G-target transpositions (G-OPP-1: color/utils.ts 1430→7; G-OPP-2/3/4/5: -29 sites); 1 god-module identified |
| G-AUDIT-6 | api/ + e2e/ + CI | `audit/G-AUDIT-6-api-e2e-ci.md` | **CRITICAL CI-1 defect** (`origin/main` typo; CHANGELOG-gate INERT); 7 other improvements (API-1/2, E2E-1, SCRIPTS-1/2/3, CI-2, DOCS-1) |

### Plan synthesis (DONE)

`G.md` synthesized from the 6 audit deliverables. Five waves:
- **G.W0** — open + 6 audit lanes + plan substrate + **ratification ask** (planning-only).
- **G.W1** — substrate hygiene (CI defect + api/CLAUDE.md) + architectural decomposition (color/utils.ts 1430 → 7).
- **G.W2** — typed strengthening (as-any 36 → ≤ 5).
- **G.W3** — invariant codification (4 proof scripts) + CI/api/e2e hygiene.
- **G.W4 HEADLINE close** — FINAL.md, doc drift, coord state, merge to master, v0.9.0 tag.

Plus 4 G-specific invariants (G1-G4): G1 "Relay before ratification"; G2 `as any` ≤ 5; G3 color/utils decomposition; G4 4-proof-script codification.

Per G.md §2: G inherits F1-F4 + E1-E5 + D1-D7 + precept invariants 30-33 verbatim.

Wave specs `waves/G.W0..G.W4.md`. Cross-repo coordination `coordination/Q.md` (refreshed at G open with the post-F peer activity + the speedtest non-consumer correction).

The dispatch contract `dispatch/AGENT.md` inherits F's contract verbatim + adds 4 G-specific deltas (G1-G4 binding + the zero-default-cross-repo-write posture).

### State at G open (planning-only)

Plan substrate: `G.md`, `G-PROMPTS.md`, `findings.md`, `audit/G-AUDIT-1..6` (6 audit docs), `coordination/Q.md`, `dispatch/AGENT.md`, `waves/G.W0..G.W4.md`, this file. **No implementation has run — planning-only + ratification ask outstanding.**

### Repo state at G open

- Branch: `tranche-g` (G opens off master HEAD `6b3a41b` post-F-merge — see `G.md §0`).
- `docs/precepts`: `68d9b20` (unchanged).
- vue-tsc: 0 errors (post-F.W3 Lane C strict-zero gate).
- vitest: 1584 / 34 (unchanged).
- e2e: 35 specs / 36 test-blocks across 5 projects (unchanged).
- glass-ui: `e150e2f` (ZERO drift since F close).
- keyframes.js: `470814e` (ZERO drift since F.W2 close; 14 unpushed).
- speedtest: `a15857d0` (+2 vs F close; NEW TRANCHE AK opened/ratified).
- fourier-analysis: `926ca6a` (ZERO drift; chronic 109-dirty).
- v0.8.0 tagged at `6b3a41b`; v0.9.0 will tag the G-merge.
- `as any` corpus in src/: 36 sites (untracked pre-G; G2 target ≤ 5).
- `as unknown as` corpus in src/: 11 sites (G.W2 target ≤ 4).

## 2026-05-21 — G.W0 close + user ratification received

User ratification (via AskUserQuestion 4-question response):
- **Block D (9 FOLD-INTO-G items)**: RATIFIED ALL — proceed to G.W1.
- **R11 (keyframes.js push)**: LEAVE LOCAL until next keyframes.js work-window.
- **R1 (glass-ui Metaballs renegotiation)**: RATIFY RENEGOTIATION — AJ's positioning + duration ACCEPTED as fulfilling the relevant sub-clauses; remaining 4-5 sub-asks carry forward at the original ask's (c) trigger. Q.md §2.1 added.
- **Block E (Playwright env flake class)**: RETIRED — documented-environmental, not actionable.

Implicit acceptance (no objections raised):
- Block A items 2-8 (glass-ui asks): CARRY-FORWARD with sharpened triggers.
- Block B items 9-10 (font-inlining + precept-pin): CARRY-FORWARD.
- Block C (CW Phase-2 informational reframing): ACCEPTED.

G.W0 CLOSED on this ratification. G.W1 dispatches next.

## 2026-05-21 — Peer-audit scope expansion (post-ratification)

User issued: "Audit the glass-ui, keyframes.js, and speedtest repo state-what items might we fold therein, or address, too, from hereof."

3 parallel deep-audit agents dispatched (READ-ONLY against peer repos):
- `audit/G-PEER-GLASS-UI.md` — 14 items surfaced (5 FOLD + 3 CARRY + 3 RAISE-NEW + 3 RETIRE-MOOT).
- `audit/G-PEER-KEYFRAMES-JS.md` — 12 items (4 FOLD + 3 CARRY + 2 RAISE-NEW + 3 RETIRE-MOOT).
- `audit/G-PEER-SPEEDTEST.md` — 9 items (3 FOLD + 2 CARRY + 0 RAISE-NEW + 4 INFORMATIONAL).

Total: **35 items**. Critical findings:
1. **G-AUDIT-5 §6 STALE**: `MetaballCanvas` IS exported via `@mkbabb/glass-ui/metaballs` subpath. WatercolorDot extirpation framing was wrong-successor. Q.md §2.1.2 corrects.
2. **value.js is sole-identified-consumer of `glass-ui/MetaballCanvas`** — speedtest's AK-W5 retired its consumer sites + AL-SEED raises publisher-retirement as a consideration. Q.md §2.1 row 1 sharpened with AL trigger.
3. **F's codemod is invisible to npm consumers**: `scripts/` not in `package.json files:` — G-PUB-1 routes to G.W3 Lane I.

User ratification (via second AskUserQuestion 4-question response):
- **G-PUB cluster (4 items)**: Ratify ALL — G.W3 Lane I (codemod-publication invariant) + G.W4 close ceremony (README upgrade + CHANGELOG path fix + CONTRIBUTING.md devDep rationale).
- **Glass-ui adoption (4 items)**: Ratify ALL — FOLD-1 useBreakpoint at 4 demo sites (G.W2 Lane E NEW); FOLD-2 PaletteSlugBar shim (G.W2 Lane F NEW); FOLD-3 G-AUDIT-5 stale-finding correction (Q.md §2.1.2 DONE); FOLD-5 publish Metaballs API surfaces (Q.md §2.1.1 DONE).
- **Speedtest adoption (3 items)**: Ratify ALL — FOLD-S1 proof:no-deep (G.W3 Lane J NEW); FOLD-S2 proof:no-bare-builtins for api/src/ (G.W3 Lane K NEW); FOLD-S3 H-SEED.md predecessor-authored ledger (G.W4 close ceremony NEW).
- **Q4 (MetaballCanvas sole-consumer posture)**: User clarified ("Hasn't Q already been executing?") — interpreted as confirming the gestalt default of Option 1 (sharpen R1 trigger, await AL decision; Q.md §2.1 row 1 + §2.1.2 DONE).

Scope expansion:
- G.W0: +2 substrate items (Q.md §2.1.1 + §2.1.2 + §6.A) — DONE.
- G.W2: +2 lanes (E + F).
- G.W3: +3 lanes (I + J + K). Now 11 lanes total.
- G.W4: +4 close-ceremony items (G-PUB-2 README + G-PUB-3 CHANGELOG path + G-PUB-4 CONTRIBUTING + FOLD-S3 H-SEED.md).
- Pre-merge matrix: 18 → **21 items** (3 new proof gates).

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| G.W0 HEADLINE — open + 6 audits + plan substrate + ratification ask | **closed** | 2026-05-21 | 2026-05-21 | `b745c0e` open + `<ratification-commit>` |
| G.W1 — substrate hygiene + color/utils decomposition | planned | — | — | — |
| G.W2 — typed strengthening (as-any ≤ 5) | planned | — | — | — |
| G.W3 — invariant codification + CI/api/e2e hygiene | planned | — | — | — |
| G.W4 HEADLINE close — FINAL.md, merge, v0.9.0 tag | planned | — | — | — |

## Open dependencies — G OPEN (awaiting ratification)

Per G1 binding ("Relay all carry-forward items to me for ratification"), the following items are presented to the user for explicit ratification before G.W1+ dispatch. Full detail at `G.md §7`.

**Ratification block A** (8 glass-ui asks — proposed CARRY-FORWARD with sharpened TIME-BOUND triggers):
- 1. Metaballs API additions (RENEGOTIATION CANDIDATE — AJ overlap)
- 2. Aurora derive helpers
- 3. BlobDot primitive
- 4. SelectTrigger size prop
- 5. DockSelectTrigger clampLabel
- 6. TooltipContent variant="mono"
- 7. Button size="icon-sm"
- 8. Tabs variant="underline"

**Ratification block B** (3 PEER-AUTHORSHIP residuals):
- 9. Contract-v2 §2.1 glass-ui font-inlining (CARRY)
- 10. keyframes.js precept-pin drift (CARRY)
- 11. **keyframes.js peer commit `470814e` push status (USER DECISION REQUIRED)**

**Ratification block C** (1 INFORMATIONAL):
- 12. CW Phase-2 activation (RETIRED as value.js participation per G-AUDIT-4 §4.3; INFORMATIONAL only)

**Ratification block D** (9 FOLD-INTO-G):
- 13-21. G-OPP-1..5 + SCRIPTS-1..4 + API-1/2 + E2E-1 + CI-1/2 + DOCS-1.

**Ratification block E** (1 RETIRE):
- 22. Playwright environmental flake class.

## Authority

Per `G.md §10` + `G-PROMPTS.md §5`: G's substrate flows from the 6 audit deliverables (`audit/G-AUDIT-1..6`); the synthesis in `findings.md`; the wave specs in `waves/G.W0..G.W4.md`. The 9 binding standing mandates per `G-PROMPTS.md §4` bind every wave + G1-G4 sharpen them.
