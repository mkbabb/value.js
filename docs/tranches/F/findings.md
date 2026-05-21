# F — Findings (audit-to-wave mapping)

Per F's "No deferrals" thesis: every finding from F-AUDIT-1..6 routes to a wave OR carries an explicit (a)(b)(c) escalation in `coordination/Q.md`. No silent omission.

## §1 — Source-of-record

| Audit | Deliverable | Headline |
|---|---|---|
| F-AUDIT-1 | `audit/F-AUDIT-1-prompts-precepts.md` | 20 distinct user prompts cataloged; zero-deferral verdict HONORED at F open. W8-W12 origin solved: consumer LOCKSTEP of speedtest's tranche AI. |
| F-AUDIT-2 | `audit/F-AUDIT-2-deferred-ledger.md` | 18 entity-level inherited items; per-disposition: 4 FOLD-INTO-F + 5 RETIRE-MOOT + 3 PEER-AUTHORSHIP + 3 CARRY-FORWARD-WITH-SHARPER-(c); zero silent. |
| F-AUDIT-3 | `audit/F-AUDIT-3-w8-w12-drift.md` | 11/12 gates PASS or improved; ONE chronic (Github lucide alias-hygiene punt blocks gh-pages); tranche-discipline PARTIAL. |
| F-AUDIT-4 | `audit/F-AUDIT-4-cross-repo-state.md` | glass-ui +14 commits but ZERO primitive asks shipped + in contraction posture; keyframes.js +5 commits but lerp NOT migrated; speedtest AI CLOSED; precepts ZERO drift. |
| F-AUDIT-5 | `audit/F-AUDIT-5-library-demo-architecture.md` | 14/15 E transpositions still LANDED at HEAD; NO LEGACY CODE re-verify clean (zero drift across 5 markers); 3 NEW transpositions surfaced (Github icon migration, @ts-ignore strengthening, Rolldown codeSplitting). |
| F-AUDIT-6 | `audit/F-AUDIT-6-api-e2e-ci.md` | api/+e2e/+CI substrate INTACT post-W12 (zero src/api/e2e/workflow diff); benches all PASS; 8 F-plan tightenings surfaced. |

## §2 — Per-finding wave routing

### A — Findings routed to F.W0 (open + state-at-open + post-W12 back-reference + gh-pages unblock)

| Finding | Source | Wave / Lane | Disposition |
|---|---|---|---|
| W8-W12 lacks a value.js-side back-reference doc | F-AUDIT-1 §6 + F-AUDIT-3 §6 | F.W0 Lane B | Author `docs/tranches/W8-W12-consumer-lockstep.md` (1-page reference pointing at speedtest AI authority + recording gate-impact verdict). |
| `build:gh-pages` blocked by missing `Github` lucide icon (W9-C alias-hygiene punt) | F-AUDIT-3 §3 + §6 + F-AUDIT-5 §5.1 | F.W0 Lane A | Migrate the 2 demo files in `demo/@/components/custom/dock/menus/` off the renamed icon (use the rename mapping from W9-C commit body OR substitute an equivalent lucide icon). |
| State-at-open gate matrix needs re-baseline post-W12 | F-AUDIT-3 §3 + F-AUDIT-6 | F.W0 Lane C | Run full gate matrix (lint, vue-tsc, vitest, build, proof:resolution, bench, api vitest, playwright). Record baseline + drift verdicts in `audit/F.W0-state-at-open.md`. |
| Cross-repo peer-state needs re-verification at F open | F-AUDIT-4 | F.W0 Lane D | Re-verify peer HEADs (glass-ui, keyframes.js, speedtest, fourier-analysis, precepts) + record drift. Consolidate into Q.md §2. |

### B — Findings routed to F.W1 (post-W12 transpositions + dead-code sweep)

| Finding | Source | Wave / Lane | Disposition |
|---|---|---|---|
| `src/parsing/utils.ts:146` carries a `@ts-ignore` (sole one in src/) — strengthen via typed memoize return | F-AUDIT-5 §5.3 | F.W1 Lane A | Replace `@ts-ignore` with a properly typed `memoize` return-shape; verify grep returns ZERO `@ts-ignore` in src/; document the type-strengthening. |
| Rolldown `codeSplitting` declarative form (Vite 9 future-proofing) | F-AUDIT-5 §5.2 | F.W1 Lane B | Adopt the declarative form per Rolldown docs; verify build output is byte-equivalent or documented-different; tracks gate verdict. |
| Zero-consumer shadcn-vue subdir audit (auto-form/, chart/*, v-calendar/, etc.) | F-AUDIT-5 §1 (carry-forward from VENDOR-POLICY follow-on) | F.W1 Lane C | Survey which shadcn subdirs have ZERO grep'd consumer in demo/; delete-or-justify-each. Update VENDOR-POLICY.md with the post-sweep error count. |

### C — Findings routed to F.W2 (keyframes.js codemod cross-repo apply)

| Finding | Source | Wave / Lane | Disposition |
|---|---|---|---|
| keyframes.js lerp call sites at `numeric.ts:159` + `group.ts:251` STILL UNMIGRATED despite W8-W12 maintainer activity | F-AUDIT-2 §1 + F-AUDIT-4 §3 | F.W2 Lane A | Apply `scripts/migrate-keyframes-js-lerp.mjs` against `/Users/mkbabb/Programming/keyframes.js` (F3 authorized boundary exception). Verify both sites migrated. Run `cd keyframes.js && npm test` — expect PASS. Commit in keyframes.js's tree with a clear message + cross-reference to value.js's `coordination/Q.md §5`. |
| Need maintainer signal post-migration | F-AUDIT-4 §3 | F.W2 Lane B | After Lane A succeeds, file the migration outcome in `coordination/Q.md §5.5` with the keyframes.js commit SHA + test verdict. (c) trigger becomes "satisfied" — F.W3's `lerpLegacy` delete is unblocked. |

### D — Findings routed to F.W3 (lerpLegacy delete + CI substrate hygiene)

| Finding | Source | Wave / Lane | Disposition |
|---|---|---|---|
| `lerpLegacy` retire (F2 invariant — sharpened from E2) | F-AUDIT-2 §1 (lerpLegacy retirement) + F.W2 closure | F.W3 Lane A | Delete `lerpLegacy` from `src/math.ts` (the const + the JSDoc); delete from `src/index.ts` barrel. Verify `grep '@deprecated' src/` returns ZERO; verify `grep 'lerpLegacy' src/ test/` returns ZERO; verify vitest 1584/34 still GREEN. CHANGELOG v0.8.0 BREAKING entry. |
| CHANGELOG-changed gate too narrow (W8-W12 dep-only commits slipped through) | F-AUDIT-6 §5 + §7 | F.W3 Lane B | Broaden the gate: assert CHANGELOG.md is touched when ANY of `src/`, `package.json`, `vite.config.ts`, `tsconfig.json`, `api/src/`, `api/package.json` is touched. (Lockfile-only changes still excluded.) |
| vue-tsc baseline drifted 126 → 120 at HEAD | F-AUDIT-3 §3 + F-AUDIT-6 §6 | F.W3 Lane C | Lower the CI gate's vue-tsc baseline from 126 → 120. Any future rise above 120 fails CI. Update VENDOR-POLICY.md to reflect the new baseline. |
| W12-unblocker dts-shape invariant needs a regression guard | F-AUDIT-3 §6 + F-AUDIT-6 §6 | F.W3 Lane D | Add a small CI step or script asserting `dist/*.d.ts` exists at the flat layout (no `dist/src/*.d.ts`). Document in `scripts/proof-resolution-contract.mjs` extension OR a new tiny `scripts/proof-dts-layout.mjs`. |
| Bundle-size gate (per F-AUDIT-6 §6) | F-AUDIT-6 §6 | F.W3 Lane E | Add a CI gate asserting `dist/value.js` size stays within budget (e.g., ≤ 145 KB raw; lockfile-of-current 125 KB + 20 KB headroom). Adjust if Lane A's lerpLegacy delete drops the floor. |
| `proof:resolution` types-key probe extension | F-AUDIT-2 §1 carry-forward | F.W3 Lane F (optional) | Extend `scripts/proof-resolution-contract.mjs` to probe the `types` key resolves to a valid emitted file. Currently only `import` + `default` are probed. Bounded scope; defers to F.W4 if budget tight. |

### E — Findings routed to F.W4 (close)

| Finding | Source | Wave / Lane | Disposition |
|---|---|---|---|
| 7 read-only close-audit lanes per E.W5 pattern | F-AUDIT-1 §3 standing mandate #6 | F.W4 close | plan-vs-actual + substrate-without-consumer + doc-drift + idiomatic-gestalt + performance + visual-runtime + integrity sweep. |
| v0.8.0 release ceremony | F.W3 lerpLegacy delete = lone BREAKING | F.W4 release | bump package.json 0.7.0 → 0.8.0; date CHANGELOG entry; merge tranche-f into master --no-ff; v0.8.0 annotated tag; push. |

## §3 — Standing peer-authorship items (CARRY-FORWARD with sharpened (c) per F1)

Per F1 — every standing item carries a (a)(b)(c) escalation in `coordination/Q.md` with a TIME-BOUND (c) re-check.

| Item | (a) blocker | (b) smallest unblock | (c) re-check trigger (TIME-BOUND) | F-action |
|---|---|---|---|---|
| 7 glass-ui primitive/blob asks | glass-ui authorship — currently in CONTRACTION posture (DockGroup/ProgressiveSidebar archived). Glass-ui structurally further from the asks, not closer. | glass-ui maintainer schedules a primitive-expansion tranche OR the asks fold into a successor cross-repo planning round. | At each F wave-close, F orchestrator re-reads `glass-ui/docs/tranches/*` for any new primitive-related tranche-open signal. If glass-ui ships a primitive-expansion tranche during F.W2-W4, the (c) trigger fires + F.W4 close-audit re-baselines. | Record in `coordination/Q.md §3` with the contraction-posture finding. |
| Contract-v2 §2.1 font-asset residual (glass-ui font-inlining) | glass-ui's `dist/glass-ui.css` ships zero @font-face; the Tailwind-source `./styles` subpath ships @font-face with `url("../fonts/...")`. Inlining requires glass-ui authorship. | glass-ui ships base64-inlined font binaries in `dist/glass-ui.css` AND exports @font-face through the compiled surface. | At F.W4 close, re-verify glass-ui's `dist/glass-ui.css` — if @font-face is now present, the residual closes + value.js can RETIRE `siblingFsAllowTransient`. | Record in `coordination/Q.md §3` (re-using E's NARROWED row + sharpening (c) to F.W4 close). |
| keyframes.js precept-pin drift (`458c2d1` divergent tree) | keyframes.js maintainer authority — value.js cannot rebase a peer's submodule pin. | keyframes.js maintainer rebases their `docs/precepts` onto mkbabb/precepts upstream `68d9b20` (or later upstream). | At F.W2 close (after the codemod-application cross-repo write completes), re-check `git -C /Users/mkbabb/Programming/keyframes.js submodule status docs/precepts`. If converged, the residual closes. | Record in `coordination/Q.md §5.6` with F.W2 close as the (c) checkpoint. |

## §4 — Per "No deferrals" mandate

Every audit finding routes EITHER to a wave (with an explicit Lane + sub-gate) OR to `coordination/Q.md` (with a TIME-BOUND (c) re-check). ZERO findings remain silent or "filed without trigger".

## §5 — Authority

Pinned: every F-AUDIT-1..6 deliverable + E's `FINAL.md` + every E wave's audit deliverable + `coordination/Q.md` (this tranche's + E's carry-forward).
