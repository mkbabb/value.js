# Tranche H — FINAL

**Tranche letter**: H (value.js repo; seventh tranche).
**Theme**: Cascade-correctness completion + type-system completion II + demo decomposition + invariant codification II.
**Successor to**: G (value.js's type-system completion + architectural decomposition + invariant codification tranche; closed at `docs/tranches/G/FINAL.md`; merged at `e166d37`; tagged `v0.9.0`).
**Branch**: `tranche-h` — opened off master HEAD `e166d37`; closed 2026-05-26.
**Tag**: `v0.10.0`.
**Precepts at close**: `68d9b20` (unchanged through the entire H window).

---

## §1 — Thesis verdict

The H-opening directive (the canonical 6-agent-audit invocation, verbatim in `H-PROMPTS.md §1`) re-asserts every previous binding clause and **doubles** the "delineate any chronically deferred items" clause. H honored every clause. H.W0 ran the 6-agent audit + cross-repo state audit, decomposed every carry-forward item into a sharpened disposition, and relayed all 5 ratification blocks to the user — who ratified them via an `AskUserQuestion` exchange before any execution-phase wave dispatched. The four axes of the thesis each landed:

- **Axis 1 — cascade-correctness closure**: `withTransaction` coverage expanded **9 → 16** sites (H1). H-AUDIT-6 §3 defect (`createPalette` + `patchPalette` orphan-version exposure) repaired; the standing reference `audit/api-withTransaction-coverage.md` enumerates every cross-collection write site (the H1 invariant codifier).
- **Axis 2 — type-system completion II**: `as unknown as` corpus retired **4 → 2** in `src/` (H2; budget tightened from plan's 3 to actual residue of 2 — strict no-headroom convention).
- **Axis 3 — demo decomposition**: every `demo/` file ≤ 400 LoC (H3; `palette/api.ts` 484 → 9 modules, `PointerDebugOverlay.vue` 449 → 286+136, `PaletteCard.vue` 435 → 388+96; `colorSpaceInfo` data lift 376 → 99+291).
- **Axis 4 — cross-tree invariant codification**: all 9 proof scripts now run at full applicability (H4; `proof:no-ts-ignore` extended to `demo/`, `proof:no-bare-builtins` extended to `plugins/+scripts/+bench/`, NEW `proof:as-unknown-as-budget`, `api/tsconfig.json` lifted to root strictness).

**H-thesis verdict**: SATISFIED.

---

## §2 — H1-H4 invariants — final verdict

| Invariant | Verdict | Evidence |
|---|---|---|
| **H1** — Cascade-correctness completion | SATISFIED | `grep -rn 'services.withTransaction' api/src/services/ \| wc -l` = **16** (was 7 at G close). 3 documented carve-outs (D1 batchUsers(delete) per-row already-transactional; D2 emitAuditEvent befitting-graceful; D3 impersonate via D2). Standing reference `audit/api-withTransaction-coverage.md` enumerates every cross-collection write site + classification. H.W1 Lane A.2 in-wave extension (per F1) wrapped 7 admin-tree sites beyond H-AUDIT-6 §3 scope. 9 new rollback tests (api vitest 106 → 115). |
| **H2** — `as unknown as` corpus retires (≤ 2 in src/) | SATISFIED — **exceeded** | `grep -rn 'as unknown as' src/ \| wc -l` = **2** (was 4 at H open). `proof:as-unknown-as-budget` codifies + enforces it with **budget = 2** (no-headroom; tightened from plan's 3 per the cleaner-than-anticipated outcome). The 2 residues are policy-documented irreducibles (`normalize.ts:117` DOM `CSSStyleDeclaration`; `parsing/color.ts:59` clone-reinterpret). Zero cast-laundering. |
| **H3** — Demo decomposition (no god module; ≤ 400 LoC each) | SATISFIED | `find demo -name '*.vue' -o -name '*.ts' \| grep -v 'demo/@/components/ui/' \| xargs wc -l \| awk '$1 > 400'` = **0 files** (was 3 at H open: `palette/api.ts` 484, `PointerDebugOverlay.vue` 449, `PaletteCard.vue` 435). Lane A: 9-module decomp (max 110 LoC). Lane B: 2 sub-component lifts (zero "cohesion-tight, leave + document" cases). Lane C: pure-data lift. |
| **H4** — Cross-tree invariant codification | SATISFIED | All 9 proof scripts run at full applicability: `proof:no-ts-ignore` extended to `src/ + demo/` (H.W3 Lane D); `proof:no-bare-builtins` extended to `api/src/ + plugins/ + scripts/ + bench/` (H.W3 Lane E); NEW `proof:as-unknown-as-budget` (H.W2 Lane B). `api/tsconfig.json` lifted to root strictness with 4 new flags (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `isolatedModules`); 36 surfaced errors repaired genuinely (zero escape-hatches added). |

---

## §3 — Inherited invariant inheritance

| Inherited | Verdict | Notes |
|---|---|---|
| G1 — Relay before ratification | HONORED — EXTENDED as H.W0 | All 5 ratification blocks (A: 9 chronic 6-tranche carries; B+C: 16 FOLD-INTO-H lanes; D: PEER-AUTHORSHIP carry-forwards; E: release version) relayed at H.W0; user ratified all via `AskUserQuestion` exchange before H.W1 dispatch. |
| G2 — `as any` ≤ 5 in src/ | HOLD | `proof:as-any-budget` PASS, count = **0** (unchanged from G close). |
| G3 — No god module in src/ (≤ 350 LoC) | HOLD | `dispatch.ts` max 312 (post-G.W4); unchanged in H. Sharpened by H3 to `demo/` (≤ 400 LoC). |
| G4 — Invariant codification | HOLD — EXTENDED by H4 | G's 8 proof scripts all PASS. H added 1 (`proof:as-unknown-as-budget`) + extended 2 (`proof:no-ts-ignore`, `proof:no-bare-builtins`). 9 total. |
| F1 — "No deferrals" as binding | HONORED | The doubled "delineate deferred items" clause re-asserted F1 as the H thesis. H.W1 Lane A.2 in-wave extension (7 admin-tree withTransaction wraps surfaced by Lane C; not deferred to a follow-up wave). H.W4 Lane C symmetric :95 flake site fold-in (not deferred to a follow-up Lane C extension). Precedent: G.W1 Lane B assets/docs (`27f2183`); G.W4 dispatch.ts (`9902036`). |
| F2 — `lerpLegacy` retired / NO LEGACY CODE | HOLD | `proof:no-deprecated` PASS (count = 0). `demo/@/lib/palette/api.ts` DELETED at H.W3 Lane A (not shimmed — directory-as-module resolution; "no legacy code"). |
| F3 — Cross-repo write boundary | HONORED | **ZERO cross-repo writes in the H window** (H.W5 close audit Lane 7). Every commit in `master..tranche-h` is authored by Mike Babb; zero agent-attributed commits; sibling repos (`glass-ui`, `keyframes.js`, `speedtest`, `fourier-analysis`) had only Mike-authored work unrelated to H. |
| F4 — W8-W12 back-reference + tranche-discipline | HOLD | H followed the same posture: `H.md` + 6 audit deliverables + wave specs at open; PROGRESS.md tracked at every wave boundary. |
| E1-E5, D1-D7 | HOLD | H.W5 close audit Lane 4 spot-check: type-safety contract-v2 satisfied; flat dts emission; demo ≤ 400 LoC; cascade-correctness codified. |
| Precept invariants 30-33 | HOLD | `proof:resolution` GREEN; precept submodule pinned at `68d9b20` (one upstream-drift `f27627e` reset at H execution start; verified intact at close). |

---

## §4 — Commit inventory

Per `master..tranche-h`:

| # | SHA | Type | Wave / Lane | Summary |
|---|---|---|---|---|
| 1 | `cacdb14` | docs | H open | Tranche H opened — 6-agent audit + planning-only substrate (2943 insertions) |
| 2 | `a12a71d` | docs | H.W0 close | user ratification received — H.W0 closed, H.W1 unblocked |
| 3 | `ef39ad9` | fix | H.W1 Lanes A + A.2 + B | close H1 cascade-correctness (16 wrapped sites; +7 in-wave extension D4-D10) + lift api/tsconfig to root strictness (4 flags; 36 errors repaired genuinely) |
| 4 | `9c32e7a` | docs | H.W1 Lane C + close | api withTransaction coverage audit-list — the standing H1 reference |
| 5 | `62fe15d` | refactor | H.W2 Lanes A + C | retire 2 of 4 as-unknown-as casts (typed XYZ_FUNCTIONS mapped-type + type-predicate normalize.ts) |
| 6 | `3b0d933` | feat | H.W2 Lane B + close | proof:as-unknown-as-budget — codify H2 invariant (budget ≤ 2 — tightened from plan's 3) |
| 7 | `f4ba240` | refactor | H.W3 Lanes A + B + C | demo decomposition — palette/api 484→9, PointerDebugOverlay + PaletteCard sub-component lifts, colorSpaceInfo data lift |
| 8 | `da8b68d` | feat | H.W3 Lanes D + E | H4 invariant codification — proof:no-ts-ignore +demo/, proof:no-bare-builtins +plugins/+scripts/+bench/ |
| 9 | `d5d570b` | docs | H.W3 close | H.W3 close — H3 + H4 fully closed (PROGRESS.md) |
| 10 | `d8bc2b7` | chore | H.W4 Lanes A + B + C + D + E | micro-polish + flake mitigation + close docs (Rolldown strip −1291 B; bench provenance; reactivity flake; docs/RELEASE.md; CONTRIBUTING +6) |
| 11 | `afeda68` | docs | H.W4 close | H.W4 close — polish-grade transpositions all landed (PROGRESS.md) |
| 12 | (this) | audit | H.W5 close | 7 read-only close-audit lanes + integrity sweep |
| 13 | (this) | docs | H.W5 close | FINAL.md + I-SEED + close-ceremony docs (CLAUDE.md ×3 drift items + CHANGELOG v0.10.0) |
| 14 | (this) | chore | H.W5 release | v0.10.0 — version bump (0.9.0 → 0.10.0) |
| 15 | (this) | merge | H.W5 close | Merge tranche-h into master — Tranche H close (v0.10.0) |

---

## §5 — Pre-merge gate matrix (22 items — G's 21 + 1 H-NEW)

| # | Gate | Result |
|---|---|---|
| 1 | `npm run lint` exits 0 | PASS |
| 2 | `npx vue-tsc --noEmit` exits 0 (strict-zero) | PASS |
| 3 | `npm run build` exits 0 | PASS |
| 4 | `npm run proof:dts-layout` PASS | PASS |
| 5 | `stat dist/value.js ≤ 148,480 B` | PASS — **124,130 B** (−1,366 B from G close) |
| 6 | `npx vitest run` PASS | PASS — 1584 / 34 |
| 7 | `cd api && npx vitest run` PASS | PASS — **115 / 22** (was 106 / 21 at G close; +9 H.W1 rollback tests) |
| 8 | `npm run proof:resolution` PASS | PASS |
| 9 | `npm run proof:no-deprecated` PASS | PASS |
| 10 | `npm run proof:no-ts-ignore` PASS (extended to demo/) | PASS — count = 0 in `src/ + demo/` |
| 11 | `npm run proof:as-any-budget` PASS | PASS — count = 0 |
| 12 | `npm run proof:no-deep` PASS | PASS |
| 13 | `npm run proof:no-bare-builtins` PASS (extended to plugins/+scripts/+bench/) | PASS — 86 files scanned |
| 14 | `npm pack --dry-run --legacy-peer-deps` clean | PASS |
| 15 | `npm run proof:codemod-publication` PASS | PASS |
| 16 | bench gates: L8 ≥ 5×, DIRECT_PATHS HSL→RGB ≥ 2×, nameParser ≥ 5× | PASS — 10.75× / 4.19× / 40.21× |
| 17 | Playwright 5 projects PASS | PASS (CI-deterministic; host-environmental flake noted in audit Lane 6) |
| 18 | `cd api && npx tsc --noEmit` exits 0 (with H.W1 Lane B 4 new strictness flags) | PASS |
| 19 | CHANGELOG `[0.10.0]` entry present + date 2026-05-26 | PASS |
| 20 | `docs/precepts` pinned at `68d9b20` | PASS |
| 21 | F3 invariant — ZERO cross-repo writes in H window | PASS (Lane 7 audit verified across 4 sibling repos) |
| 22 | **H-NEW**: `npm run proof:as-unknown-as-budget` PASS (budget ≤ 2) | PASS — count = 2 |

**22 / 22 gates PASS.**

---

## §6 — Bench medians (close evidence)

Bench run 2026-05-26 at HEAD (post-H.W4 Lane A Rolldown strip):

| Bench | Median | Gate | Status |
|---|---|---|---|
| L8 own-property channel access | 10.75× | ≥ 5× | PASS |
| DIRECT_PATHS HSL→RGB | 4.19× | ≥ 2× | PASS |
| nameParser (broad-regex + Set.has) | 40.21× | ≥ 5× | PASS |

H ships a **smaller bundle than G** (`dist/value.js` 124,130 B vs G close 125,496 B; −1,366 B; 1.09% reduction). Performance + size both improved — the polish-grade thesis vindicated.

---

## §7 — Carry-forward to I

See `docs/tranches/H/I-SEED.md` for the predecessor-authored forward-carry ledger. Briefly:

- **9 chronic 6-tranche-carry asks** at H close (Block A ratified Option C+A+D): Metaballs API shapes drafted; 7 other glass-ui asks carry with sharpened (c) triggers; review at I open. PEER-AUTHORSHIP for shipment.
- **No I-mandatory FOLD items at H close** — H thesis fully closed; I scope is open for the next theme cycle.
- **AL coordination**: speedtest AL planning-only at H close; brief drafted with value.js's sole-identified-consumer stake in `glass-ui/MetaballCanvas`. AL ratifies publisher-retirement on its own cadence.
- **R11**: keyframes.js peer commit `470814e` LEAVE LOCAL (status unchanged from G ratification; re-check at next keyframes.js work-window).

---

## §8 — Authority

This document is the H-close ceremony deliverable. It synthesizes:
- Every wave-close PROGRESS.md section (2026-05-26 entries).
- Every per-lane audit document under `docs/tranches/H/audit/`.
- The 7 H.W5 close-audit lane reports (read-only; PASS verdicts).
- The 22-item pre-merge gate matrix.
- The H1-H4 invariant verification.

Authoring HEAD prior to merge: `afeda68` (H.W4 close). The merge commit + tag follow this document.
