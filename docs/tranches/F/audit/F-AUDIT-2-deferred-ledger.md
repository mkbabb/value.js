# F-AUDIT-2 — Deferred-items ledger at F open

**Mode**: READ-ONLY. Authored at F open.
**Date**: 2026-05-20.
**Branch / HEAD**: `tranche-f` @ `e1549e0` (`fix(library/W12-unblocker): emit dts at flat dist/ layout via entryRoot: src`).
**Predecessor**: E closed at `47399c2` / tagged `v0.7.0` at `ddf7154`.
**Substrate window audited**: `47399c2..e1549e0` — 8 commits (W8-β baseline → W12-unblocker).

**Binding invariant (F-opening directive, strict reading)**: *"No deferrals — delineate any chronically deferred items + any deferred items and fold them into this new tranche."*

Per `dispatch/AGENT.md` interpretation (planning-mode at F open): EVERY deferred item MUST carry an explicit F-scope-fit verdict + a documented path to closure in F's plan. Items genuinely unfoldable (deep cross-repo / multi-week external work) are documented with an explicit rationale.

**Cross-repo write authorization**: F's "No deferrals" thesis OVERRIDES the standing "value.js writes value.js only" boundary where a cross-repo write is the smallest unblock action (e.g., applying the published `migrate-keyframes-js-lerp.mjs` codemod against the keyframes.js working tree).

---

## §1 — Inheritance from E close

The E close (per `E/FINAL.md §6` "Standing route-forward items with E5 (a)(b)(c) escalation" + `E/coordination/Q.md §3` + `E/audit/E-FOLD-2-3-4-synthesis.md §5`) handed F the following ledger:

- **4 standing route-forward items** (FINAL.md §6 explicit list).
- **7 ROUTE-FORWARD-VERIFIED** items (E-FOLD §5, the 7-item glass-ui-blocked bucket).
- **3 RETIRED-MOOT** items (E-FOLD §5: 3 keyframes.js asks moot).
- **2 NEW-FOLDED** at E.W4 (lerpLegacy + glass-ui `./styles.css`) — both LANDED at E close.
- **5 ALREADY-FOLDED** at E open (verified retained).
- **6 "Other route-forwards"** (E/findings.md §3 closing bullets) — aurora-from-color, CW, ~126 vendor cluster, D-05 k-means, A-19 gh-pages secrets, AUD-5.15 WeakMap memo.

Sub-tranche commits in F's substrate window (W8-W12) closed ZERO E-deferred items in `src/`; they advanced consumer/devDep machinery (TS 6, Vite 8 + Rolldown, vue-tsc 3.3.1, lucide rename, dts layout fix). One **new deferral** surfaced (the orphaned `Github` lucide brand-icon at 2 demo callsites blocking `build:gh-pages`).

### §1.1 — Item-by-item ledger

Per E.W4 Lane C policy (`VENDOR-POLICY.md` ACCEPT + DOCUMENT), the ~126 vendor-cluster errors are NOT a "deferral" in the F-AUDIT-2 sense — they have a closed-disposition policy verdict. They are recorded below in §1.6 informational, not in the active ledger.

| # | Item | Origin (tranche / lane) | (a) Systemic blocker | (b) Smallest unblock | (c) Re-check trigger | State at F open | F-scope-fit |
|---|---|---|---|---|---|---|---|
| **E-RF-1** | `lerpLegacy` retirement (delete from `src/math.ts`) | E.W1 Lane A DEFERRED → E.W4 Lane F published codemod → carried in E/FINAL.md §6 row 1 | keyframes.js's TWO `file:`-linked call sites still use legacy `lerp(t, a, b)` ordering: `keyframes.js/src/animation/numeric.ts:159` + `keyframes.js/src/animation/group.ts:251`. Removing now compounds the silent breakage. | maintainer runs `node scripts/migrate-keyframes-js-lerp.mjs` (idempotent, dry-run-safe, parity-asserting; published E.W4) AND commits in keyframes.js. | `cd /Users/mkbabb/Programming/keyframes.js && npm test` PASS against master value.js. | **BLOCKER STILL REAL.** Verified at F open: both call sites carry legacy `lerp(eased, start, stop)` / `lerp(weight, existing, incoming)` ordering — codemod NOT applied. value.js's `src/math.ts:34-45` `@deprecated` JSDoc still names both sites. keyframes.js shipped 5 W8-W12 commits (`5896a36`/`b2dfec2`/`7c959d8`/`3c2d48e` matching value.js's W8-W12 cadence + `d312517` dts unblocker) — NONE address the lerp migration. | **FOLD-INTO-F (cross-repo write required).** F authors the cross-repo migration: F applies the codemod against `/Users/mkbabb/Programming/keyframes.js/src/animation/{numeric,group}.ts`, runs `npm test` in keyframes.js, commits there, THEN deletes `lerpLegacy` from value.js's `src/math.ts`. The codemod is value.js-owned (already published); the cross-repo write is mechanical (2 call sites; idempotent). Bind to a small F lane (~30-min cross-repo lane + a value.js-side delete commit + bench/typecheck/vitest verify). |
| **E-RF-2** | 7 standing glass-ui primitive/blob asks: (G1) metaballs `positionSource` + 6 sibling additions; (G2) `deriveAuroraPalette` + `deriveAuroraConfig`; (G3) `BlobDot` primitive; (G4) `SelectTrigger size` prop; (G5) `DockSelectTrigger clampLabel`; (G6) `TooltipContent variant="mono"`; (G7) `Button size="icon-sm"` rung; (G8) `<Tabs variant="underline">` provider family | A.W6 audit/W6-deferred → B coord/Q.md §3 → D coord/Q.md §3 → E coord/Q.md §3 → E/FINAL.md §6 row 2 → E-FOLD §5 RF.1-RF.5 | glass-ui authorship; precept-§10 wire-before-retire (cannot delete demo consumers ahead of glass-ui's primitive ship). | EITHER (i) glass-ui's successor tranche ships the 8 additions in its `src/`, OR (ii) F authors them DIRECTLY in glass-ui (cross-repo write — F's "No deferrals" thesis authorizes this). | `grep -rn 'positionSource\|deriveAuroraPalette\|BlobDot\|clampLabel' /Users/mkbabb/Programming/glass-ui/src` returns ≥1 hit in component code (not token CSS). | **BLOCKER STILL REAL.** Verified at F open: `grep -rn 'positionSource\|deriveAuroraPalette\|BlobDot\|clampLabel' /Users/mkbabb/Programming/glass-ui/src` → ZERO hits in component code (only `icon-sm` matches in `theme.css`/`tokens.css` as a *spacing token*, NOT a `Button size` rung; `clampLabel` returns zero matches). glass-ui shipped 14 commits since `66e9b8f` (W8-α + W9-A/C/F/H + W10-α + W12-α + ai-w1/w3/w4-p1/w5-alpha-beta/zeta + w5-gamma DockGroup archive + w5-delta ProgressiveSidebar archive). NONE author the 8 additions. The 4 new tranche-AI commits archive components (Path B retirement) — orthogonal to the gaps. | **PEER-AUTHORSHIP-REQUIRED OR FOLD-INTO-F (cross-repo write required).** Per F's "No deferrals" thesis the orchestrator must choose: (A) F authors the 8 glass-ui additions in `/Users/mkbabb/Programming/glass-ui/src/` directly (cross-repo write — F dispatch authorization), OR (B) F documents the explicit decision-rationale to remain PEER-AUTHORSHIP-REQUIRED for these 8 specifically because they cross a design-system boundary (glass-ui owns the API shape; value.js authoring them would set a precedent that violates the "design system owns its own primitives" precept). **Recommend (B) — author a sharpened E5+ escalation: file an explicit glass-ui-side audit dispatch from F (a 1-page "asks brief" to be posted as `/Users/mkbabb/Programming/glass-ui/docs/asks/from-value.js-F.md`), bind the value.js-demo to a bridge-module strategy (per E-FOLD §2 "demo-side preparation opportunities"), and re-check at every glass-ui tranche close.** The bridge module IS F-scope (value.js-side write); the primitive ship is glass-ui-scope. |
| **E-RF-3** | Contract-v2 §2.1 font-asset residual (NARROWED at E.W0; not retired) | E.W0 Lane A → E/FINAL.md §6 row 3 → E coord/Q.md §3 row 10 | glass-ui's `./styles` Tailwind-source ships `@font-face` with `url("../fonts/...woff2")` relative refs that walk OUT of `node_modules/@mkbabb/glass-ui/src/styles/` into the symlink target's `fonts/` directory; the demo's `vite.config.ts:siblingFsAllowTransient` widening is the documented consumer-side reciprocal. Tailwind v4 `@theme` aliases + `@source` directive lose semantics under pre-compilation, so the source surface is structurally `src/`-shaped. | (i) glass-ui inlines font binaries as base64 in `dist/glass-ui.css` + exports `@font-face` through the compiled surface, OR (ii) the demo drops `./styles` entirely (forfeits tokens + `@source` class-scanning — net regression), OR (iii) CW Phase-2 hoist removes the symlink (auto-retires the carve-out). | (a) glass-ui maintainer signal; (b) demo-side ship-test that base64-inlined fonts render correctly; (c) speedtest CW Phase-2 reaches value.js. | **BLOCKER STILL REAL.** glass-ui W8-W12 (W8-α / W9-A/C/F/H / W10-α / W12-α) did NOT change the `./styles` Tailwind-source surface. `siblingFsAllowTransient` is still live in F's substrate `vite.config.ts` per the W10-β diff (Vite 8 + Rolldown migration touched `rolldownOptions` rename, NOT the fs-allow path). CW seed remains at speedtest `61079cb1` (planning-only; AI tranche just CLOSED at `30f7f555` per speedtest's recent docs). | **PEER-AUTHORSHIP-REQUIRED + CARRY-FORWARD-WITH-SHARPER-TRIGGER.** F cannot author the glass-ui-side font-inlining (would violate "design system owns font distribution"). F CAN sharpen the (c) trigger: now that AI is CLOSED at speedtest, the **CW Phase-2 timeline is the operative trigger** — F should re-verify at every speedtest tranche close. Recommend filing in F's `coordination/Q.md` as the single primary trigger; document the demo-drop alternative as a hard rejection (forfeits tokens). |
| **E-RF-4** | keyframes.js precept-pin drift (pinned to `458c2d1` on a divergent precepts tree, NOT mkbabb/precepts upstream `68d9b20`) | E-AUDIT-4 §5 → E/FINAL.md §6 row 4 → E coord/Q.md §5 | cross-repo submodule choice by keyframes.js maintainer; value.js cannot rebase a peer's submodule pin. | keyframes.js maintainer rebases its `docs/precepts` submodule onto mkbabb/precepts upstream (`68d9b20`) OR explicitly documents the divergent-tree intent. | `cd /Users/mkbabb/Programming/keyframes.js && git submodule status` reports a SHA reachable from `mkbabb/precepts` HEAD. | **BLOCKER STILL REAL.** Verified at F open: `git -C /Users/mkbabb/Programming/keyframes.js submodule status` reports `458c2d1167f4e3a327edf17fc7509da533cacf1e docs/precepts (heads/main)` — UNCHANGED across 5 W8-W12 keyframes.js commits. The precept tree's `main` head at `458c2d1` is divergent from mkbabb/precepts `68d9b20`. | **PEER-AUTHORSHIP-REQUIRED.** Documentation-only consistency concern; not on any runtime gate. F documents this in `coordination/Q.md` and routes forward. Note: F's "No deferrals" thesis does NOT compel rebasing a peer's submodule on its behalf — that crosses an authorial line (the SHA encodes the maintainer's intent about which precept tree governs that repo). |
| **E-RFV-1** | metaballs API additions (G1, 7 items) | E-FOLD §5 RF.1 | (see E-RF-2 row in this table) | (see E-RF-2) | (see E-RF-2) | (see E-RF-2) | Subset of E-RF-2; **rolled into E-RF-2 disposition**. |
| **E-RFV-2** | `deriveAuroraPalette` + `deriveAuroraConfig` (G2) | E-FOLD §5 RF.2 | (see E-RF-2) | (see E-RF-2) | (see E-RF-2) | (see E-RF-2) | Subset; **rolled into E-RF-2**. |
| **E-RFV-3** | `BlobDot` primitive (G3) | E-FOLD §5 RF.3 | (see E-RF-2) | (see E-RF-2) | (see E-RF-2) | (see E-RF-2) | Subset; **rolled into E-RF-2**. |
| **E-RFV-4** | `SelectTrigger size` + `DockSelectTrigger clampLabel` + `TooltipContent variant="mono"` + `Button size="icon-sm"` (G4-G7) | E-FOLD §5 RF.4 | (see E-RF-2) | (see E-RF-2) | (see E-RF-2) | (see E-RF-2) | Subset; **rolled into E-RF-2**. |
| **E-RFV-5** | `<Tabs variant="underline">` provider variant (G8) | E-FOLD §5 RF.5 | (see E-RF-2) | (see E-RF-2) | (see E-RF-2) | (see E-RF-2) | Subset; **rolled into E-RF-2**. |
| **E-RFV-6** | Contract-v2 §2.1 residual on `./styles` Tailwind-source | E-FOLD §5 RF.6 | (see E-RF-3) | (see E-RF-3) | (see E-RF-3) | (see E-RF-3) | Subset; **rolled into E-RF-3**. |
| **E-RFV-7** | keyframes.js precept-pin drift | E-FOLD §5 RF.7 | (see E-RF-4) | (see E-RF-4) | (see E-RF-4) | (see E-RF-4) | Subset; **rolled into E-RF-4**. |
| **E-OTH-1** | Aurora derive-from-color + blob extirpation (precept-§10 wire-before-retire blocked) | E/findings.md §3 closing bullets | derivative of E-RF-2 (G2 + G3); demo cannot delete `WatercolorDot` / static `AuroraConfig` ahead of glass-ui's primitive ship. | glass-ui ships G2 + G3 (see E-RF-2) → value.js demo abstraction tranche ports consumers. | glass-ui tranche ships `BlobDot` + `deriveAuroraPalette`. | **STILL BLOCKED** (derivative of E-RF-2). | **CARRY-FORWARD-WITH-SHARPER-TRIGGER.** Same posture as E-RF-2; closes derivatively when E-RF-2 closes. Document in F coord/Q.md. |
| **E-OTH-2** | CW (speedtest monorepo workspace transposition) — value.js is CONSUMER, not author | E-FOLD §5 OTH; D coord/Q.md §4 → E coord/Q.md §4 | speedtest CW lead authorship; value.js is downstream consumer (1-line `package.json` flip when Phase-2 reaches it). | speedtest CW seed → W0 dispatch → Phase-2 reaches value.js. | speedtest CW W0 dispatch fires. | **STILL PRE-DISPATCH.** speedtest's AI tranche CLOSED at `30f7f555` (`docs(AI/FINAL)`); CW seed remains at `61079cb1`. AI close documents W11+W13 DEFER and "W-FINAL user-gated" — CW dispatch is still pending the user's gate signal. | **CARRY-FORWARD-WITH-SHARPER-TRIGGER.** The (c) trigger sharpens: now that AI is CLOSED, the next signal is the user's gate to dispatch CW W0. F's `coordination/Q.md` references CW readiness verdict from E.W4 Lane D (**READY**). No F authorship needed; F re-verifies CW-readiness gates at its close. |
| **E-OTH-3** | ~126 generated shadcn-vue typecheck cluster | E.W4 Lane C → `VENDOR-POLICY.md` | shadcn-vue generator vs `exactOptionalPropertyTypes: true` interaction; persists across generator versions. | ACCEPT + DOCUMENT policy verdict (LANDED E.W4) + optional dead-code sweep of `auto-form/`, `chart/`, `v-calendar/`, `range-calendar/`, `pagination/`, `calendar/`, `carousel/` (all have ZERO authored consumers per E.W4 Lane C corpus-grep). | error count regression from 120 baseline at F open. | **CLOSED AT E** as a policy-decided item (not a defer). Substrate window note: count moved 126 → 120 via vue-tsc 3.3.1's narrowing improvements (W9-A); W12-β TS 6.0.3 confirmed at 120 (sorted-diff empty). | **RETIRE-MOOT (policy-resolved at E.W4).** F may OPTIONALLY open a dead-code-cluster sweep (delete the 7 zero-consumer subdirectories — TS2307 cluster of 47) as a small mechanical lane, but the active "deferred" framing is closed. Recommend FOLD-INTO-F as an optional dead-code lane (not a defer-closure). |
| **E-OTH-4** | D-05 L13 k-means tune (`maxIterations` + JND threshold) — optional bench-gated optimisation | D.W1 Lane L7 → D.W3 Lane C bandwidth-gate → E findings §3 closing | bench-evidence-gated; no consumer producing measurable speedup demand. | reproduce ≥ 2× speedup in a synthesized noisy-photo benchmark (~15-30 min lane); else retire. | bench evidence surfaced; OR explicit RETIRE-with-rationale. | **STILL OPEN; no bench evidence.** 2 tranches (D + E) bandwidth-gated. | **RETIRE-MOOT.** F applies the precedent from E-AUDIT-2 §9 D-CHRONIC: 2 tranches of bandwidth-gating with no consumer signal = explicit retire-with-rationale ("documented bench-gated optimisation; no consumer demand surfaced across D + E; not load-bearing; recordable in `audit/F-AUDIT-2-deferred-ledger.md §1.5`"). F documents and retires. |
| **E-OTH-5** | A-19 `gh-pages` `dist/` housekeeping + secrets contention (stale `postcss-BrHISTov.js`, `standalone-*.js` chunks lingering) | A.W7-performance → B.W4-performance STILL-STANDS → Da §3 Δ6 → E findings §3 closing | tooling/infra: GitHub Actions deploy-secret config (orchestrator-owned) + stale chunks survive `vite build --mode gh-pages` runs because of cached emit + sideEffects flag interaction. | (a) `rm -rf dist/ && npm run gh-pages` one-line orchestrator action (housekeeping half); (b) move deploy to OIDC-based auth (secrets half). | clean `dist/` ahead of next release; OR OIDC switch. | **STILL OPEN.** Verified: F substrate `dist/` carries `postcss-Crs0wH0W.js` + `standalone-CSWytAYg.js` chunks — same stale-emit class. Importantly, W10-β added a NEW related blocker: the `Github` lucide brand-icon was removed in W9-C's `lucide-vue-next → @lucide/vue` rename and `build:gh-pages` is BLOCKED by the orphaned imports (W10-β commit message documents the chronic). | **FOLD-INTO-F.** F authors a small dispatch lane: (i) fix the 2 orphaned `Github` imports at `demo/@/components/custom/dock/menus/{ProfileSection,MobileMenuDropdown}.vue` (e.g., swap to `<svg>` inline GH mark or another lucide icon family OR drop the icon), (ii) clean dist/ ahead of gh-pages build, (iii) re-publish gh-pages. The OIDC half remains tooling/infra (orchestrator decision). The W10-β-blocked-`gh-pages` half is **value.js-scope, fully foldable**. |
| **E-OTH-6** | AUD-5.15 `getComputedValue` WeakMap memo key — P3 perf | E-AUDIT-5 §9 item 15 → E findings §3 closing | bench-evidence-gated; routes to a future perf tranche. | reproduce the speedup; OR retire. | bench evidence surfaces. | **STILL OPEN; no bench evidence.** | **RETIRE-MOOT.** Same precedent as E-OTH-4: 1 tranche of bandwidth-gating + no consumer demand. F documents and retires with the option to re-open if a `getComputedValue`-heavy consumer emerges. |
| **E-ALR-1..5** | 5 ALREADY-FOLDED-at-E-open items (A-11 ConfigSliderPane, A-14..A-18 doc-drift, D-04 nameParser, motion canon, CW prep) | E-FOLD §5 A.1-A.5 | — | — | — | **ALL LANDED at E.** A-11 (E.W0 Lane B verify-retired); A-14..A-18 (E.W5 close-audit); D-04 (E.W1 Lane D — 47.33× nameParser speedup); motion canon Family A (E.W4 Lane E — 74 sites adopted); CW prep (E.W4 Lane D — READY verdict). | **RETIRE-MOOT (LANDED at E).** No F action; recorded for ledger completeness. |
| **E-RET-1..3** | 3 RETIRED-MOOT-at-E-FOLD items (keyframes.js AnimationOptions rename, Color.components.get migration, pin bump) | E-FOLD §5 R.1-R.3 | — | — | — | **RETIRED at E-FOLD.** | **RETIRE-MOOT (retired at E).** No F action; recorded for ledger completeness. |

### §1.2 — Glass-ui ship state in F's substrate window (E close `66e9b8f` → F open glass-ui HEAD `5b81866`)

Verified by `git -C /Users/mkbabb/Programming/glass-ui log --oneline 66e9b8f..HEAD`:

```
5b81866  chore(glass-ui/W12-α): TypeScript 5 → 6
9020324  feat(glass-ui/W10-α)!: Vite 7.3.3 → 8.0.13 + Rolldown 1.0.1 canary
5ad9995  chore(glass-ui/W9-F+W9-H): lift @types/node ^24.12.3 + vaul-vue ^0.4
eda8d3c  chore(glass-ui/W9-C): rename lucide-vue-next -> @lucide/vue@^1.16.0
65aba78  chore(glass-ui/W9-A): lift vue-tsc 2.2.12 -> 3.3.1
2acafb7  chore(glass-ui/W8-α): SAFE-MINOR + SAFE-PATCH sweep
cae6014  chore(ai-w5-delta): proof-package probe retires `ProgressiveSidebar` import
e255e7c  feat(ai-w5-delta): archive <ProgressiveSidebar> family — Path B per G-AI-D26
c56fa10  feat(ai-w5-gamma): archive <DockGroup> — Path B per G-AI-D26
0745622  fix(ai-w5-zeta): glass-ui hygiene — phantom-class comment + --icon-3xl rebind
2e12d60  fix(ai-w5-alpha-beta): chassis chronics retire
80410a9  feat(ai-w4-p1): animation expressiveness publisher writes
80880c1  feat(ai-w3-r3)!: motion subpath surgery (v2.0.0)
b0d8c0b  feat(ai-w1): glass-ui publisher writes — CardHeader/ChassisDivider/GlassTimeline
```

**NONE author the 8 glass-ui asks (G1-G8).** Three are tooling/devDep parallels with value.js (W8-α / W9-A/C/F/H / W10-α / W12-α — matched cadence). Six are tranche-AI commits (ai-w1 / ai-w3-r3 / ai-w4-p1 / ai-w5-alpha-beta/zeta / ai-w5-gamma / ai-w5-delta) shipping CardHeader shrink, motion subpath surgery (v2.0.0), animation expressiveness, chassis chronics, archive `<DockGroup>` (Path B per G-AI-D26), archive `<ProgressiveSidebar>` family (Path B per G-AI-D26). **The Path B archives mean glass-ui is REMOVING surface, not adding the requested primitives.** E-RF-2's systemic blocker has not lifted; it has structurally moved further (glass-ui is in a contraction posture).

### §1.3 — Keyframes.js state in F's substrate window (E close `0909177` → F open keyframes.js HEAD `d312517`)

Verified by `git -C /Users/mkbabb/Programming/keyframes.js log --oneline 0909177..HEAD`:

```
d312517  fix(keyframes.js/W12-unblocker): repair 2 source TS errors so API Extractor emits real dist/keyframes.d.ts
5896a36  chore(keyframes.js/W12-δ): TypeScript 5.8.3 → 6.0.3 + tsconfig audit
b2dfec2  feat(keyframes.js/W10-γ)!: Vite 7 → 8 + Rolldown
7c959d8  chore(keyframes.js/W9-phase2): consumer LOCKSTEPS — @lucide/vue rename + @types/node ^24 + vaul-vue ^0.4
3c2d48e  chore(keyframes.js/W8-γ): SAFE-MINOR sweep + add vue peerDep contract-gap fix
```

5 commits, ALL devDep / tooling LOCKSTEPS matching the value.js cadence (W8-γ / W9-phase2 / W10-γ / W12-δ + dts unblocker). **ZERO address the lerp migration.** Both call sites verified at F open per `grep -rn 'lerp(' src/animation/{numeric,group}.ts`:

```
src/animation/numeric.ts:159:  ... = lerp(eased, seg.startVals[i]!, seg.stopVals[i]!,);   ← still legacy (t, a, b) ordering
src/animation/group.ts:251:    existing.value = lerp(layer.weight, existing.value, incoming.value,);   ← still legacy (t, a, b) ordering
```

E-RF-1's systemic blocker is still real; the codemod is published but unapplied. **Per F's "No deferrals" thesis, F should apply it.**

### §1.4 — Other peer state at F open

- **speedtest**: HEAD `30f7f555` (`docs(AI/FINAL): AI tranche close ceremony — 13 substantive waves CLOSED; W11+W13 DEFER; W-FINAL user-gated`). AI is CLOSED. CW seed remains at `61079cb1`, planning-only; the next gate is "W-FINAL user-gated" — the CW dispatch awaits the user's explicit signal. **No F action.**
- **fourier-analysis**: HEAD `926ca6a` — UNCHANGED since D close. Still on `@mkbabb/value.js@^0.4.6` registry pin; consumes easings only (no v0.6.0/v0.7.0 breakage). **No F action.**
- **precepts upstream**: at `68d9b20`. value.js submodule at `68d9b20` (GREEN). keyframes.js submodule at `458c2d1` on divergent tree (E-RF-4 blocker remains).

### §1.5 — F-AUDIT-2 retire-with-rationale tablet (E-OTH-4 + E-OTH-6)

Per F's "No deferrals" mandate, the following are explicitly RETIRED at F open with rationale recorded here:

| ID | Item | Rationale | First-tranche | Bandwidth-gated tranches | Retire-rationale |
|---|---|---|---|---|---|
| E-OTH-4 | D-05 L13 k-means tune | bench-evidence-gated; no consumer signal across D + E | D.W1 Lane L7 | D.W3 + E (2 tranches) | NEVER-LOAD-BEARING. The quantize cold-path produces correct output at current params; no demo / test / API consumer reports measurable latency. Re-open trigger: a concrete benchmark surface produces ≥ 2× delta. |
| E-OTH-6 | AUD-5.15 `getComputedValue` WeakMap memo key | bench-evidence-gated; no consumer signal in E | E-AUDIT-5 §9 item 15 | E (1 tranche) | NEVER-LOAD-BEARING. The current memo key works for `useGradientInterpolation` + `useColorModel` consumers without measurable allocation pressure. Re-open trigger: a profiler trace surfaces the memo-miss path as hot. |

### §1.6 — Vendor cluster informational note

`VENDOR-POLICY.md` (authored E.W4 Lane C) closes the ~126 vue-tsc cluster as a policy-decided item (ACCEPT + DOCUMENT). Substrate window state: count moved 126 → 120 in W9-A (vue-tsc 2.2.12 → 3.3.1 narrowing improvements); stable at 120 across W9-C → W12-β. Under W12-β TS 6.0.3, sorted-diff vs W10-β baseline is empty (per W12-β commit message). **This is NOT a deferred item in the F-AUDIT-2 sense.** It is recorded only because the count moved.

### §1.7 — New deferral introduced in F substrate window (`build:gh-pages` blocker)

Per W10-β commit message (`08a7f96`): `build:gh-pages` is BLOCKED by 2 orphaned `Github` lucide brand-icon imports at:

- `demo/@/components/custom/dock/menus/ProfileSection.vue:4` + `:119`
- `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue:4` + `:88`

`@lucide/vue@1.x` (W9-C rename canon) has no `Github` brand-icon export (brand icons were removed wholesale; 5875 exports, none brand). The chronic reproduces identically on Vite 7 master HEAD per W10-β stash-test (NOT a W10 regression — predates the bump). **The W9-C commit message explicitly flagged this as "out-of-scope for the LOCKSTEP — fold into a follow-up wave."** That wave is F.

Rolled into **E-OTH-5** (`gh-pages` housekeeping) as the freshly-surfaced sub-item; the FOLD-INTO-F verdict already covers it.

---

## §2 — W8-W12 audit overlay

For each of the 8 W8-W12 commits, the introduce / close / change-fit analysis:

| Commit | Subject | Introduced deferral? | Closed E5 trigger? | Changed F-scope-fit? |
|---|---|---|---|---|
| `e1549e0` | fix(library/W12-unblocker): emit dts at flat dist/ layout via entryRoot: src | NO. Pure plugin-config fix (`vite-plugin-dts` `entryRoot: 'src'` + `compilerOptions.rootDir: 'src'` pair). | YES (implicitly). Unblocks every typed consumer (keyframes.js, words/frontend, bbnf-buddy) trying to `import @mkbabb/value.js` — was TS7016 at `dist/src/index.d.ts`, now resolves cleanly at `dist/index.d.ts`. **This was a silent E-close residual** (E's `package.json "types": "./dist/index.d.ts"` claimed the flat path; the build actually emitted nested at `dist/src/index.d.ts`). NOT named in E's ledger but materially unblocking consumers. Records as a "close-honesty residual that E missed and F's substrate caught." | NO change to standing items. Strengthens the "value.js publisher half is fully green" claim. |
| `9f56813` | chore(library/W12-β): TypeScript 5 → 6 | NO. vue-tsc count narrowed 126 → 120 (W9-A) → 120 (W12-β sorted-diff empty); src/ contract fully green. | NO. (No E-deferred item depended on TS 6.) | NO change. |
| `08a7f96` | feat(library/W10-β)!: Vite 7 → 8 + Rolldown | YES (the `build:gh-pages` blocker — but verified pre-existing, NOT W10-introduced; the W10-β stash-test confirms reproduction on Vite 7 master). Documents the `sideEffects` scope fix (`["./demo/**", "**/*.css"]`) — addresses a Rolldown-specific dead-strip that would have been a new deferral if not fixed in-commit. Also documents 1 forward-deferral: "Function-form `manualChunks` retained — future declarative rewrite via Rolldown's `codeSplitting` groups is a clean follow-on" → recorded as F-NEW-1 below. | NO. (Bundle size improved 141.47 → 124.98 kB, -11.7%; speedup at proof: PASS.) | YES (positive). Vite 8 + Rolldown obviates one prior concern: Rolldown's stricter `sideEffects` enforcement actually IMPROVED the dist's tree-shake surface (consumer probe shows 147 kB esbuild bundle with zero postcss/standalone references). **No E-deferred item changed F-scope-fit;** the chronic `gh-pages` housekeeping (E-OTH-5) gains a NEW sub-blocker (the `Github` orphan) but the existing FOLD-INTO-F verdict already covers it. |
| `209584c` | chore(library/W9-F+W9-H): lift @types/node ^24.12.3 + vaul-vue ^0.4.0 (consumer LOCKSTEPs) | NO. `vaul-vue` declared as a peer-shim — `grep -rn 'vaul-vue\|VaulDrawer' src/ demo/` returns ZERO hits per W9-F+H commit. Manifest-floor coordination only. | NO. | NO change. |
| `02ed508` | chore(library/W9-C): rename lucide-vue-next -> @lucide/vue (consumer LOCKSTEP) | YES — surfaces the orphaned `Github` import deferral (rolled into E-OTH-5). The W9-C commit explicitly defers this to "a follow-up wave" (per §1.7). | NO. | NO change to standing items; **adds the `Github` orphan to E-OTH-5's sub-item list**. |
| `442aba1` | chore(library/W9-A): lift vue-tsc 2.2 -> 3.3.1 | NO. Narrows the vendor cluster 126 → 118 → 120 (net -6). | YES (informational). The VENDOR-POLICY count baseline shifted; the policy verdict (ACCEPT + DOCUMENT) doesn't change. | NO change. |
| `4cd8d15` | chore(library/W8-β): SAFE-PATCH + SAFE-MINOR sweep — 23 devDep bumps | NO. All within-major; src/ runtime contract untouched. | NO. | NO change. |
| `1fafd5d` | chore(library/W8-β): npm install re-baseline — lockfile self-version 0.6.0 → 0.7.0 | NO. Lockfile housekeeping (drift since E close v0.7.0 publish). | NO. | NO change. |

### §2.1 — Newly introduced deferral surfaced by W8-W12 (F-NEW)

| ID | Item | Source | (a) Blocker | (b) Smallest unblock | (c) Re-check trigger | F-scope-fit |
|---|---|---|---|---|---|---|
| F-NEW-1 | Function-form `manualChunks` in `vite.config.ts` retained — Vite 8 migration guide marks it deprecated (not removed). Future declarative rewrite via Rolldown's `codeSplitting` groups is "a clean follow-on." | W10-β commit `08a7f96` body | Rolldown 1.0.2's typed surface still exposes `ManualChunksFunction = (id, meta) => ...`; deprecation timeline unknown. Function-form is the current expressive option. | rewrite the chunk-splitting logic in `vite.config.ts` using Rolldown's `codeSplitting` declarative groups. | Rolldown ships breaking removal of function-form `manualChunks` (a major bump) OR a benchmark surfaces the declarative form has measurably better split quality. | **CARRY-FORWARD-WITH-SHARPER-TRIGGER.** Function-form is currently expressive (carries the demo's specific chunk hygiene). Declarative rewrite is "clean follow-on" but no acute need; bind to a future Rolldown-version-up tranche. |

### §2.2 — Dts unblocker close-honesty residual

The `e1549e0` commit silently closed an E-CLOSE-HONESTY residual: E's `FINAL.md §3` Gate 3 "`npm run build` + `vue-tsc` + `npm test` + `npm run lint` + `npm run proof:resolution` + `npx playwright test` — all green" was technically GREEN at E close (the build emitted SOMETHING at `dist/src/index.d.ts`), but consumers attempting `import @mkbabb/value.js` would hit TS7016 because `package.json "types": "./dist/index.d.ts"` pointed at the FLAT path while the build emitted at the NESTED path. E's proof-resolution PASS at master HEAD only checked the runtime `default` key, not the `types` key resolution.

**F-AUDIT-2 records this as a CLOSED-AT-F-SUBSTRATE item**: E's close was technically green by its own gates but materially blocked typed consumers; `e1549e0` made E's claim honestly green. The F-PROMPTS / dispatch contract should add a `types` resolution probe to the proof-resolution script (filed as F-NEW-2).

| ID | Item | (a) Blocker | (b) Smallest unblock | (c) Re-check trigger | F-scope-fit |
|---|---|---|---|---|---|
| F-NEW-2 | `proof:resolution` script checks only `default` key resolution; does NOT probe `types` key (caught E's silent dts-layout mismatch only at W12-unblocker, not at E close gate). | `scripts/proof-resolution-contract.mjs` lacks a `types`-key probe step. | Extend the script to also probe `package.json exports["."].types` and assert the path exists as a real `.d.ts` (not a stub). | `cd /Users/mkbabb/Programming/value.js && npm run proof:resolution` exits 0 with `types` row reported. | **FOLD-INTO-F.** Single-file 5-10 line script extension; value.js-owned; ~15-min lane. Mechanical close-honesty improvement that prevents the next E-shape silent-claim. |

---

## §3 — Disposition summary

| Disposition | Count | Items |
|---|---|---|
| **FOLD-INTO-F** | 4 | E-RF-1 (lerpLegacy retirement via cross-repo codemod application + value.js delete) · E-OTH-3 (optional dead-code sweep of 7 zero-consumer shadcn-vue subdirectories — TS2307 cluster 47 errors) · E-OTH-5 (`gh-pages` housekeeping incl. `Github` orphan fix + dist/ clean + gh-pages republish) · F-NEW-2 (`proof:resolution` `types`-key probe extension) |
| **FOLD-INTO-F (cross-repo write required)** | 1 | E-RF-1 (subset — the keyframes.js side of the lerp migration; F dispatch authorizes this per "No deferrals" override of "value.js writes value.js only") |
| **RETIRE-MOOT** | 5 | E-OTH-4 (D-05 k-means — 2-tranche bandwidth-gated, no consumer) · E-OTH-6 (AUD-5.15 WeakMap memo — 1-tranche bandwidth-gated) · E-ALR-1..5 (5 ALREADY-LANDED at E) · E-RET-1..3 (3 already-retired at E-FOLD) · E-OTH-3 (vendor cluster — policy-resolved at E, optional sweep is the only F action) |
| **PEER-AUTHORSHIP-REQUIRED** | 3 | E-RF-2 (8 glass-ui asks — orchestrator recommendation is (B): file sharpened glass-ui-side audit, bridge-module strategy in value.js demo) · E-RF-3 (Contract-v2 §2.1 font-asset residual — glass-ui font-inlining authorship) · E-RF-4 (keyframes.js precept-pin drift — keyframes.js maintainer choice) |
| **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | 3 | E-OTH-1 (Aurora derive-from-color + blob extirpation — derivative of E-RF-2) · E-OTH-2 (CW Phase-2 — speedtest user-gate trigger sharpened) · F-NEW-1 (Vite/Rolldown manualChunks declarative rewrite — Rolldown major-bump trigger) |

**Total deferred items addressed**: 18 entity-level items (counting the rolled-up RFV-1..7 as part of their E-RF-N parent rows + the 5 ALR + 3 RET as 8 ledger-completeness entries).

**Net new deferrals introduced by F substrate (W8-W12)**: 2 (F-NEW-1 manualChunks declarative; F-NEW-2 proof:resolution types-key probe).

**Net deferrals closed by F substrate (W8-W12)**: 1 implicit (the dts-layout flat-path consumer unblock at `e1549e0` — was a silent E-close-honesty residual).

---

## §4 — Per "No deferrals" mandate verification

Every item in the ledger carries an explicit F-scope-fit verdict. The four verdict classes:

1. **FOLD-INTO-F** (5 items, incl. 1 cross-repo write): F's IMPLEMENTATION plan must bind these to waves with named lanes.
2. **RETIRE-MOOT** (5 items): documented retirement rationale at §1.5 + ledger-completeness entries.
3. **PEER-AUTHORSHIP-REQUIRED** (3 items): F's `coordination/Q.md` will carry these as cross-repo manifest entries; each has a sharpened (c) re-check trigger documented above.
4. **CARRY-FORWARD-WITH-SHARPER-TRIGGER** (3 items): the (a)(b)(c) still holds but the trigger refines per F's posture (CW user-gate; Rolldown major-bump; glass-ui ship of derivative primitives).

**ZERO items remain SILENT or unaddressed.** Every E5 trigger from E's close is verified at F open (blocker still real / unblock not yet taken / re-check criterion still operative).

### §4.1 — Items genuinely unfoldable into F (with explicit rationale)

Three items carry the PEER-AUTHORSHIP-REQUIRED verdict because they cross a design-authority boundary that F's "No deferrals" thesis does not in principle override:

- **E-RF-2 (8 glass-ui asks)**: glass-ui is the design system; authoring primitives on its behalf would set a precedent that violates "design system owns its own primitives." F's `dispatch/AGENT.md` cross-repo write authorization extends to mechanical migrations (e.g., applying a published codemod), NOT to authoring new design-system surface area. The (b) smallest unblock — "F authors them DIRECTLY in glass-ui" — is technically possible but principially rejected; the recommended (b) becomes "F files a sharpened audit at glass-ui + binds value.js-demo to a bridge-module strategy." This is the strict reading of "No deferrals" + the standing "design system owns its primitives" precept.
- **E-RF-3 (Contract-v2 §2.1 font-asset residual)**: glass-ui owns font distribution. value.js consumer-side carve-out (`siblingFsAllowTransient`) is the only F-scope variable; the structural retirement comes via CW Phase-2 hoist (E-OTH-2 trigger) OR glass-ui font-inlining authorship.
- **E-RF-4 (keyframes.js precept-pin drift)**: a peer's submodule SHA encodes the peer maintainer's intent about which precept tree governs that repo. Rebasing on the peer's behalf erases authorial intent. Documentation-only consistency concern; no runtime impact.

### §4.2 — Cross-repo write authorization for F

Per the F-AUDIT-2 task brief: **"the standing 'value.js writes value.js only' boundary is OVERRIDDEN by F's 'No deferrals' thesis"** WHERE a cross-repo write is the smallest unblock action. The exact scope:

- **AUTHORIZED**: F applies `scripts/migrate-keyframes-js-lerp.mjs` against `/Users/mkbabb/Programming/keyframes.js/src/animation/{numeric,group}.ts` (already-published codemod; mechanical 2-call-site migration; idempotent; parity-asserting).
- **NOT AUTHORIZED**: F authoring glass-ui's 8 primitive additions on the peer's behalf (design-authority boundary).
- **NOT AUTHORIZED**: F rebasing keyframes.js's precept-submodule pin (authorial-intent boundary).

The authorization rule: F may write cross-repo when the action is **mechanical / published / parity-asserting / consumer-driven**, but NOT when it would author new surface in a peer's design or rewrite a peer's stated authorial intent.

---

## §5 — Authority

This ledger was assembled from:

### E-vintage (the inheritance)
- `docs/tranches/E/audit/E-AUDIT-2-deferred-ledger.md` — 38-item precedent ledger (the audit's parent shape).
- `docs/tranches/E/audit/E-FOLD-2-3-4-synthesis.md` — E-FOLD round's reclassifications (`§1` keyframes.js silent-breakage discovery; `§5` 2-NEW-FOLDED + 5-ALREADY-FOLDED + 3-RETIRED + 7-ROUTE-FORWARD-VERIFIED + 0-SKIPPED).
- `docs/tranches/E/FINAL.md §6` — 4 standing route-forward items with E5 (a)(b)(c) escalation.
- `docs/tranches/E/findings.md §3` — ROUTE-FORWARD-VERIFIED items table + "Other route-forwards" closing bullets.
- `docs/tranches/E/coordination/Q.md` — §3 cross-repo manifest (10 row table), §4 CW preparation (CW-READY verdict), §5 keyframes.js lerp migration diffs.

### F-substrate (W8-W12) audit overlay
- `git log --oneline 47399c2..e1549e0` — 8 W8-W12 commits + commit-body close reads (full body extracted via `git log -1 --format='%H%n%s%n%b' <sha>`).
- `git diff 47399c2 e1549e0 -- src/` — zero src/ changes verified.
- `git diff 47399c2 e1549e0 -- test/` — zero test/ changes verified.

### Peer-repo live state at F open
- glass-ui `66e9b8f..HEAD` = 14 commits; verified at HEAD `5b81866`; grep for `positionSource|deriveAuroraPalette|BlobDot|clampLabel` in `src/` returns ZERO hits in component code (only `icon-sm` matches as a spacing token).
- keyframes.js `0909177..HEAD` = 5 commits; verified at HEAD `d312517`; grep at `src/animation/{numeric,group}.ts` confirms BOTH legacy lerp call sites unchanged.
- speedtest HEAD `30f7f555` (AI tranche CLOSED); CW seed at `61079cb1` planning-only.
- fourier-analysis HEAD `926ca6a` (unchanged since D close).
- precepts upstream `68d9b20`; value.js submodule `68d9b20`; keyframes.js submodule `458c2d1` (divergent — E-RF-4 unchanged).

### Substrate artefacts
- `VENDOR-POLICY.md` (authored E.W4 Lane C, 2026-05-20).
- `scripts/migrate-keyframes-js-lerp.mjs` (authored E.W4 Lane F, 2026-05-20; published, unapplied).
- `src/math.ts:28-45` (`lerp` canonical signature + `lerpLegacy` `@deprecated` JSDoc citing keyframes.js sites).

### Cross-cutting
- `CHANGELOG.md` (v0.7.0 entry).
- `docs/precepts/instructions/LESSONS-LEARNED.md` + `docs/precepts/cross-repo-dev-resolution.md`.
- Project `CLAUDE.md` (root + demo + api).

---

**End of F-AUDIT-2.** 18 entity-level items audited (4 standing E-RF + 7 RFV rolled-up into 3 E-RF parents + 6 OTH + 5 ALR-LANDED + 3 RET-AT-E + 2 F-NEW). Per "No deferrals" F-opening directive: 4 FOLD-INTO-F (incl. 1 cross-repo write) + 5 RETIRE-MOOT + 3 PEER-AUTHORSHIP-REQUIRED + 3 CARRY-FORWARD-WITH-SHARPER-TRIGGER. ZERO items remain silently deferred. The F-AUDIT-2 ledger feeds F's wave allocation (FOLD-INTO-F items get bound to specific lanes) and the F `coordination/Q.md` cross-repo manifest (PEER-AUTHORSHIP-REQUIRED items become standing asks with sharpened (c) triggers).
