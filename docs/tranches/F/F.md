# F — "No deferrals" + post-W12 substrate hygiene + lerpLegacy retirement

**Tranche letter**: F (value.js repo; fifth tranche).
**Successor to**: E — value.js's architectural transposition + api/ pipeline parity + e2e expansion + vendor policy + CI hardening tranche. Closed at `docs/tranches/E/FINAL.md`; merged to master at `47399c2`; tagged `v0.7.0`.
**Branch**: `tranche-f` (off master HEAD `e1549e0` post-W8-W12 consumer lockstep).
**Open**: 2026-05-20.
**Precepts at open**: `68d9b20` (unchanged since D).
**Mode**: planning-only at open per the F-opening directive ("This is NOT an implementation phase. Tranche development only.").

## §0 — Master HEAD provenance

F opens **off `e1549e0`, NOT off `v0.7.0`**. The 8 commits between v0.7.0 and `e1549e0` (`47399c2..e1549e0`) constitute value.js's **CONSUMER LOCKSTEP of speedtest's tranche AI § 11 constellation expansion** — a sibling-repo authorial decision that value.js participated in as a consumer without authoring its own tranche envelope. Authority lives at `/Users/mkbabb/Programming/speedtest/docs/tranches/AI/{AI,FINAL}.md`. The lockstep landed:

- `1fafd5d` W8-β npm install re-baseline (lockfile self-version 0.6.0 → 0.7.0 catch-up).
- `4cd8d15` W8-β 23 SAFE-PATCH + SAFE-MINOR devDep bumps.
- `442aba1` W9-A vue-tsc 2.2 → 3.3.1.
- `02ed508` W9-C lucide-vue-next → @lucide/vue.
- `209584c` W9-F+H @types/node ^24.12.3 + vaul-vue ^0.4.0.
- `08a7f96` W10-β Vite 7 → 8 + Rolldown.
- `9f56813` W12-β TypeScript 5 → 6.
- `e1549e0` W12-unblocker dts flat-dist/ emission via entryRoot: src.

Per F-AUDIT-3: 11 of 12 E-pre-merge gates PASS or improved at HEAD. ONE carried chronic: `build:gh-pages` blocked by missing `Github` lucide icon (W9-C alias-hygiene punt); 2 demo files in `demo/@/components/custom/dock/menus/`. Net: healthy execution; tranche-discipline PARTIAL (commit shape exemplary; structure irregular — no value.js-side substrate). F folds the back-reference doc + the gh-pages unblock per "no deferrals".

## §1 — Thesis

The F-opening directive (verbatim in `F-PROMPTS.md §2`) sets the thesis: **"No deferrals"**. Every E5 deferral either lands in F or escalates to a documented (a)(b)(c) trigger with sharpened terms.

Per the 6-lane audit (`audit/F-AUDIT-1..6`):

1. **lerpLegacy retirement** (E.W1 Lane A's lone deferral) — folds into F via the published codemod + cross-repo apply + value.js-side delete. Authorized boundary exception: F applies the published `scripts/migrate-keyframes-js-lerp.mjs` against `/Users/mkbabb/Programming/keyframes.js` (the codemod IS the unblock; it is parity-asserting + idempotent + dry-run-safe).

2. **Post-W12 substrate hygiene** — the W8-W12 consumer lockstep introduced a chronic (`Github` lucide alias gap blocking gh-pages) + opened new transposition opportunities (Rolldown's declarative `codeSplitting`; TS 6's `@ts-ignore` strengthening site; vue-tsc baseline 126 → 120). All fold into F's substrate-hygiene wave.

3. **Standing peer-authorship asks** — the 7 glass-ui primitives, glass-ui font-inlining (contract-v2 §2.1 residual), keyframes.js precept-pin reconciliation. F refines their (c) triggers + records glass-ui's **contraction posture** finding (DockGroup/ProgressiveSidebar archive — glass-ui is structurally further from the asks, not closer). F does NOT author these directly per the design-authority boundary; refined triggers replace inert "filed" states.

4. **CI substrate refinements** — broaden CHANGELOG-changed gate (catch dep-only commits); lower vue-tsc baseline 126 → 120; add dts-shape invariant guard (regression guard for the W12-unblocker fix); add bundle-size gate. All fold into F's CI lane.

5. **Back-reference doc for W8-W12** — value.js's `docs/tranches/` lacks an entry for the consumer-lockstep work. F authors a 1-page reference (`docs/tranches/W8-W12-consumer-lockstep.md`) pointing at speedtest's AI authority + recording the gate-impact verdict per F-AUDIT-3.

The full audit-to-wave mapping lives in `findings.md`.

## §2 — Invariants F1-F4 + inheritance

F inherits A + B + D + E invariants verbatim. F1-F4 are the F-specific deltas:

1. **F1 — "No deferrals" as binding.** Every E5 deferral inherited at F open EITHER lands in F's plan OR carries an explicit `coordination/Q.md` (a)(b)(c) entry with a TIME-BOUND re-check trigger (not "next tranche" alone). Silent omission is rejected at the wave sub-gate.

2. **F2 — `lerpLegacy` retires.** E2's "NO LEGACY CODE" sharpens for F: the lone `@deprecated` in `src/` GOES AWAY in F. This requires the cross-repo write at F.W2 (codemod application) + the value.js-side delete at F.W3. Pre-condition for the value.js delete: `cd /Users/mkbabb/Programming/keyframes.js && npm test` passes against master `value.js`.

3. **F3 — Cross-repo write authorization (explicit + bounded).** F authorizes ONE class of cross-repo write: applying the published `scripts/migrate-keyframes-js-lerp.mjs` codemod against `keyframes.js`. The codemod's parity-assertion + idempotency + dry-run mode make this safe. F does NOT authorize ANY other cross-repo write (no glass-ui authorship, no keyframes.js precept-pin reconciliation, no fourier-analysis cleanup, no speedtest CW activation). Boundary stays narrow.

4. **F4 — W8-W12 back-reference + tranche-discipline sharpening.** F authors the W8-W12 back-reference doc at the value.js side (per F-AUDIT-3 §6 recommendation). F's `dispatch/AGENT.md` codifies the cross-repo consumer-lockstep posture: future consumer-lockstep work either gets its own value.js-side tranche envelope OR records its gates + close-honesty checklist in a back-reference doc at the time of the work, not retroactively.

### Inherited from E (E1-E5)

| # | Invariant | F-inheritance |
|---|---|---|
| E1 | Architectural transposition over patching | HONORED; F.W1 adds 3 new transpositions surfaced by F-AUDIT-5. |
| E2 | NO LEGACY CODE | SHARPENED as F2 — `lerpLegacy` retires. |
| E3 | Pipeline parity (api/) | HONORED; api/ substrate intact post-W12. |
| E4 | Standing audit cadence | HONORED; F-AUDIT-1..6 at open; close-audit at F.W4. |
| E5 | Sharpened deferral (a)(b)(c) | HONORED + EXTENDED as F1 — every deferral carries a TIME-BOUND (c) re-check. |

### Inherited from D (D1-D7)

All D1-D7 hold at F open per F-AUDIT-3 §5 gate verification. D7 (no nested Color/ValueUnit) verified by the smoke-safari sustained spec at E close.

### Precept invariants (30-33)

All GREEN at F open per F-AUDIT-1 §4. `proof:resolution` PASS at HEAD `e1549e0`.

## §3 — Wave schedule (5 waves)

| Wave | Opens after | Headline | Closes on |
|---|---|---|---|
| **F.W0 HEADLINE** | open | open + state-at-open + post-W12 back-reference + gate baseline + gh-pages unblock | gate matrix matches expectations; `docs/tranches/W8-W12-consumer-lockstep.md` authored; `build:gh-pages` GREEN |
| **F.W1** | W0 close | post-W12 transpositions + dead-code sweep (legacy-clean continuation) | §5.3 `@ts-ignore` strengthened via typed memoize return; §5.2 Rolldown `codeSplitting` declarative; zero-consumer shadcn-vue subdir audit + delete-or-justify; the `as any` count drops |
| **F.W2** | W1 close | keyframes.js codemod cross-repo apply + verification (F3 boundary exception) | `scripts/migrate-keyframes-js-lerp.mjs` applied against `/Users/mkbabb/Programming/keyframes.js`; both call sites migrated; `cd keyframes.js && npm test` PASS; keyframes.js maintainer signal received OR documented unblock |
| **F.W3** | W2 close | `lerpLegacy` delete (value.js side; v0.8.0 BREAKING candidate) + CI substrate hygiene | `lerpLegacy` deleted from `src/math.ts` + `src/index.ts`; `grep '@deprecated' src/` returns ZERO; CI vue-tsc baseline lowered 126 → 120; CHANGELOG-changed gate broadened (catches dep-only commits); dts-shape invariant guard added; bundle-size gate added |
| **F.W4 HEADLINE close** | W3 close | strengthened close — `FINAL.md`, doc drift, `coordination/Q.md` final state, merge to master, **v0.8.0 tag** | 7 read-only close-audit lanes + close-honesty checklist + `FINAL.md`; merge ceremony; v0.8.0 annotated tag |

**Critical path: 5 wave-slots** — W0 → W1 → W2 → W3 → W4. F.W2 is the cross-repo write; F.W3 depends on F.W2's keyframes.js verification GREEN.

**Parallelism**: F.W0 + F.W1 are file-disjoint (F.W0 is back-reference + gh-pages unblock; F.W1 is library + demo). The orchestrator MAY parallelize under worktree isolation. Default is sequential for gate-isolation discipline.

## §4 — Per-wave anchors

Each wave spec under `waves/F.W0..F.W4.md` carries per-lane sub-gates, verification artefacts, and a commit plan.

- `waves/F.W0.md` — open + state-at-open + post-W12 back-reference + gh-pages unblock.
- `waves/F.W1.md` — post-W12 transpositions + dead-code sweep.
- `waves/F.W2.md` — keyframes.js codemod cross-repo apply (F3 authorized).
- `waves/F.W3.md` — `lerpLegacy` value.js-side delete + CI substrate hygiene (v0.8.0 candidate).
- `waves/F.W4.md` — close.

## §5 — File ownership

Each wave spec's "File bounds" section is the single source of truth. `F.md` does not duplicate the cross-walk.

Out of F's bounds:
- `glass-ui/` — read-only (peer; F refines (c) triggers + records contraction posture).
- `keyframes.js/` — narrow read+write: F applies the published codemod (F3) + commits in that repo's tree. NO other writes to keyframes.js.
- `speedtest/`, `fourier-analysis/` — read-only.
- `docs/tranches/C/` — the long-standing untracked C scaffold; not F's to write.
- CW Phase-2 activation — speedtest's authority; user-gated.

## §6 — Gate model (3 tiers — inherited from E's hardened §6)

1. **Tier 1 — invariants.** F1-F4 + inherited E1-E5 + D1-D7 + precept 30-33 + 9 standing mandates.
2. **Tier 2 — per-lane sub-gates.** Every wave lane carries one explicit sub-gate stated in the wave spec.
3. **Tier 3 — the wave gate.** Conjunction of sub-gates + the wave-qualified Playwright + bench probe. F.W4 close additionally runs the 7-lane close ceremony + the 12-item pre-merge gate matrix (D's 10 + 2 E-NEW + maybe 1-2 F-NEW dts-shape + bundle-size).

No gate closes on grep or claim alone — every sub-gate names an artefact.

## §7 — Cross-tranche debt at F open (per F-AUDIT-2)

**Total entity-level inherited items**: 18.

| Disposition | Count | Examples |
|---|---|---|
| **FOLD-INTO-F** | 4 | (1) lerpLegacy retirement via cross-repo codemod + value.js delete (F.W2 + F.W3); (2) optional dead-code sweep of zero-consumer shadcn-vue subdirs (F.W1); (3) `gh-pages` unblock incl. `Github` lucide fix (F.W0); (4) `proof:resolution` types-key probe extension (F.W3). |
| **RETIRE-MOOT** | 5 | D-05 k-means; AUD-5.15 WeakMap; 5 ALR-LANDED items; 3 RET-AT-E items; vendor-cluster policy-resolved at E.W4 Lane C. |
| **PEER-AUTHORSHIP-REQUIRED** | 3 | 8 glass-ui primitive asks; contract-v2 §2.1 font-asset residual; keyframes.js precept-pin drift. F refines (c) triggers; records glass-ui's contraction posture. |
| **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | 3 | aurora-from-color derivative; CW Phase-2 user-gate; Vite/Rolldown manualChunks declarative form. |

Total: 4 + 5 + 3 + 3 = 15 entity-level items (some inherited items decomposed into multiple sub-items; 18 total per F-AUDIT-2 §3). Every item has an explicit F-scope-fit; NONE remain silent under "No deferrals".

### Per "No deferrals" F1 invariant verification

For each PEER-AUTHORSHIP-REQUIRED item, F's `coordination/Q.md` records the (a)(b)(c) escalation with a TIME-BOUND (c) re-check:
- (c) triggers MUST name either a deterministic peer-side event (e.g., "keyframes.js maintainer applies the codemod, verified by `cd keyframes.js && npm test` PASS") or a calendar checkpoint (e.g., "re-check at F.W4 close + at next-tranche-open"), not vague "later".

## §8 — v0.8.0 release surface (preview — finalized at F.W3/F.W4)

**BREAKING (lone — the F thesis)**:
- `lerpLegacy` removed from `src/math.ts` + `src/index.ts` barrel. Migration: `lerp(a, b, t)` (canonical order since v0.7.0).

**INTERNAL**:
- Post-W12 transpositions (per F-AUDIT-5 §5).
- gh-pages unblock (Github lucide fix).
- Dead-code sweep of zero-consumer shadcn-vue subdirs (if dispatch ratifies; otherwise routed forward).
- Rolldown declarative `codeSplitting`.
- @ts-ignore site strengthened via typed memoize.
- CI substrate hygiene (CHANGELOG-gate broadening; vue-tsc baseline 120; dts-shape invariant; bundle-size gate).
- W8-W12 back-reference doc.

**DEFERRED → ZERO (per F1)**:
- All E5 inherited deferrals either land in F or carry sharpened (c) triggers in `coordination/Q.md`.

## §9 — Mode

Planning-only at open. F-AUDIT-1..6 executed (read-only); the synthesis is this substrate. The first execution session opens at F.W0 only after explicit user authorization.

## §10 — Authority

Plan substrate: this file + `F-PROMPTS.md` + `findings.md` + `audit/F-AUDIT-1..6` (six audit lanes — 22,000+ LoC of read-only forensic work) + `coordination/Q.md` (cross-repo manifest, refreshed per F-AUDIT-4) + `dispatch/AGENT.md` (F agent contract, with explicit F3 cross-repo-write authorization) + `waves/F.W0..F.W4.md` (five wave specs) + `PROGRESS.md`.
