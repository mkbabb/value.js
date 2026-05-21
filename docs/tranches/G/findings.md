# G — findings (audit-to-wave mapping)

Synthesis of `audit/G-AUDIT-1..6` into the G wave plan.

## §1 — Audit summary table

| Audit | Headline finding | Target wave |
|---|---|---|
| G-AUDIT-1 (prompts + precepts) | 22 prompts cataloged; 5 silent gaps surfaced; precept 30/30+/33 HOLD; `as any` count 36 (untracked — surfaced as silent gap #1) | gaps fold into G.W2 + G.W3 |
| G-AUDIT-2 (deferred ledger) | 17 entries: 2 FOLD-INTO-G + 1 RETIRE-MOOT + 10 PEER-AUTHORSHIP + 4 CARRY-FORWARD. 14 chronic-deferred (8 glass-ui asks at 5-tranche carry). 1 F1-marginal item (api/CLAUDE.md drift) folded into G.W1 Lane C. | per-disposition routing to G.W1/G.W2/G.W3 |
| G-AUDIT-3 (state-at-G-open) | 16/16 gates PASS at HEAD `6b3a41b`. Bench medians: L8 10.38× / DIRECT_PATHS 4.56× / nameParser 41.68×. Zero drift since F merge. | G.W1 Lane D state-at-open captures the baseline |
| G-AUDIT-4 (cross-repo state) | glass-ui ZERO drift; 0-of-7 asks shipped (Metaballs PARTIAL via AJ — renegotiation candidate). keyframes.js has **14 unpushed commits** to origin (entire Q.W1..F.W2 chain). Speedtest NEW TRANCHE AK opened + ratified same day as F close — but speedtest does NOT consume value.js. Fourier-analysis 109-dirty unchanged. | G ratification block A + B + C presents to user |
| G-AUDIT-5 (library + demo arch) | `as any`=36 / `as unknown as`=11 across `src/`. 5 G-target transpositions: G-OPP-1 (color/utils.ts 1430 LoC → 7 modules); G-OPP-2/3/4/5 (-29 cast sites). WatercolorDot 10 instances (was "16" — F drift); peer-gated. | G.W1 Lane B + G.W2 |
| G-AUDIT-6 (api + e2e + CI) | **CRITICAL CI-1 defect**: `origin/main` typo in workflow:224 — CHANGELOG-gate INERT. 7 other improvements: API-1/2, E2E-1, SCRIPTS-1/2/3, CI-2, DOCS-1. | G.W1 Lane A + G.W3 |

## §2 — Disposition routing (audit-to-wave cross-walk)

### Items addressed in G

| # | Item | Origin audit | G wave/lane |
|---|---|---|---|
| F1 | CI-1: workflow `origin/main` → `master` 1-line fix | G-AUDIT-6 §3 | G.W1 Lane A |
| F2 | G-OPP-1: color/utils.ts decomposition (1,430 → 7 modules) | G-AUDIT-5 §2 | G.W1 Lane B |
| F3 | DOCS-1: api/CLAUDE.md services drift (color/, session/) | G-AUDIT-6 §6 | G.W1 Lane C |
| F4 | State-at-G-open gate-baseline capture | G-AUDIT-3 | G.W1 Lane D |
| F5 | G-OPP-2: typed `getColorSpaceBound<C,K>` helper (-5 `as any`) | G-AUDIT-5 §9 | G.W2 Lane A |
| F6 | G-OPP-3: typed `DIRECT_PATHS` mapped-type (-7 `as unknown as`) | G-AUDIT-5 §9 | G.W2 Lane B |
| F7 | G-OPP-4: typed `Color<T>` channel accessor (-12 `as any`; potential BREAKING) | G-AUDIT-5 §9 | G.W2 Lane C |
| F8 | G-OPP-5: `ValueUnit.unwrapDeep()` static — codifies Mar 2026 nesting fix | G-AUDIT-5 §9 | G.W2 Lane D |
| F9 | SCRIPTS-1: `proof:resolution` types-key probe extension | G-AUDIT-2 NS-1 + G-AUDIT-6 §5 | G.W3 Lane A |
| F10 | SCRIPTS-2: `proof:no-deprecated` invariant guard (codifies F2) | G-AUDIT-6 §5 | G.W3 Lane B |
| F11 | SCRIPTS-3: `proof:no-ts-ignore` invariant guard (codifies F.W1 Lane A) | G-AUDIT-6 §5 | G.W3 Lane C |
| F12 | SCRIPTS-4: `proof:as-any-budget` invariant guard (codifies G2) | new (G-AUDIT-5 derivative) | G.W3 Lane D |
| F13 | API-1: `withTransaction` 4-site expansion | G-AUDIT-6 §1 | G.W3 Lane E |
| F14 | API-2: `engines.node` declaration in api/package.json | G-AUDIT-6 §1 | G.W3 Lane F |
| F15 | E2E-1: mobile-walk spec | G-AUDIT-6 §2 | G.W3 Lane G |
| F16 | CI-2: `npm pack --dry-run` step | G-AUDIT-6 §3 | G.W3 Lane H |

### Items relayed for ratification (PEER-AUTHORSHIP — carry-forward with TIME-BOUND triggers)

| # | Item | Origin audit | Action |
|---|---|---|---|
| R1-R8 | 8 glass-ui primitive asks (Metaballs/Aurora/BlobDot/SelectTrigger/DockSelectTrigger/Tooltip/Button/Tabs) | G-AUDIT-4 §2.2 | Re-check at glass-ui's next non-AK tranche-open; Metaballs is renegotiation candidate (AJ-W1-β shipped overlapping names) |
| R9 | Contract-v2 §2.1 font-asset residual | G-AUDIT-4 §2.3 | Re-check at glass-ui's `dist/glass-ui.css` next-publish |
| R10 | keyframes.js precept-pin drift | G-AUDIT-4 §3.4 | Re-check at keyframes.js maintainer's next submodule-rebase signal |
| R11 | keyframes.js peer commit `470814e` push status | G-AUDIT-4 §3.2 | **USER DECISION REQUIRED**: push / leave-local / coordinate |
| R12 | CW Phase-2 activation | G-AUDIT-4 §4 | Re-check on user signal OR speedtest CW Phase-2 ship |

### Items retired

| # | Item | Origin audit | Rationale |
|---|---|---|---|
| RM-1 | Playwright environmental flake class (11/36 specs) | G-AUDIT-6 §2 | 0 code regressions; CI environment installs WebKit + smoke-admin uses addInitScript fixture. Documented-environmental, not actionable. |

## §3 — Wave file-bounds cross-reference

| Wave | Files touched (mutating) |
|---|---|
| G.W0 | (planning-only) all `docs/tranches/G/*` artefacts |
| G.W1 | `.github/workflows/node.js.yml` (Lane A); `src/units/color/{utils.ts, conversions/, dispatch.ts}` (Lane B — file move/split); `api/CLAUDE.md` (Lane C); `docs/tranches/G/audit/G.W1-state-at-open.md` (Lane D) |
| G.W2 | `src/units/color/{index.ts, normalize.ts, interpolate.ts, dispatch.ts}` + `src/units/{index.ts, normalize.ts, interpolate.ts}` (typed strengthening) |
| G.W3 | `scripts/proof-*.mjs` (4 new); `package.json` (scripts); `.github/workflows/node.js.yml` (CI steps); `api/src/services/*` (withTransaction expansion); `api/package.json` (engines); `e2e/smoke-mobile/*.spec.ts` (new spec) |
| G.W4 | `docs/tranches/G/FINAL.md`; `docs/tranches/G/PROGRESS.md`; `CLAUDE.md` + `demo/CLAUDE.md` + `api/CLAUDE.md` (drift fixes); `CHANGELOG.md` (v0.9.0 entry); `package.json` (version bump) |

## §4 — Authority

This file pins the 6 audit deliverables + their per-finding routing decisions.
