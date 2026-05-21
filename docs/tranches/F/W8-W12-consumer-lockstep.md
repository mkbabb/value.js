# value.js — W8-W12 consumer LOCKSTEP of speedtest tranche AI § 11

**Authority**: `/Users/mkbabb/Programming/speedtest/docs/tranches/AI/{AI,FINAL}.md`.
**Window**: 2026-05-20 20:16:02 EDT — 2026-05-20 21:29:09 EDT (1h 13m 7s, straight-line authoring; AuthorDate == CommitDate on all 8 commits).
**Range**: `47399c2..e1549e0` (8 commits direct to master).
**value.js role**: CONSUMER, not author.
**Posture (per F4 invariant)**: value.js-side back-reference doc, no full tranche envelope.

---

## §1 — Why no tranche envelope?

The constellation lockstep was AUTHORED at speedtest under its tranche AI § 11 (constellation expansion: W8 per-repo SAFE-MINOR sweep; W9 cross-cutting LOCKSTEPS A-H; W10 Vite 7→8 + Rolldown; W12 TypeScript 5→6). Value.js participated as a downstream CONSUMER applying the same SAFE-PATCH/MINOR + breaking-bundler bumps in sequence, mirroring glass-ui's canary lead. Authoring a full value.js-side tranche envelope after-the-fact would be retroactive theatre — the substantive authority lives in speedtest's `docs/tranches/AI/AI.md` (publisher) + `FINAL.md` (close report). This back-reference doc is the gestalt-appropriate posture: it pins the 8 SHAs, points at the publisher's authority, captures the gate-impact verdict from F-AUDIT-3 §3, and surfaces the carried chronics — without simulating a tranche shape that was not used at the time.

F4 codifies this going forward: future cross-repo lockstep work either gets its own value.js-side tranche envelope AT THE TIME of the work (with planning-only at open + close-merge ceremony per the precepts-codified tranche development model), OR records its gates + close-honesty checklist in a back-reference doc AT THE TIME of the work — not retroactively. F.W0 Lane B is the singular retroactive exception that closes the W8-W12 gap; future windows respect F4.

Per F-AUDIT-3 §2.3, `git -C /Users/mkbabb/Programming/value.js log --all --oneline 47399c2..e1549e0 -- docs/tranches/` returns ZERO output — none of the 8 commits touched any tranche directory, confirming the absence of value.js-side self-documentation and the need for this back-reference.

---

## §2 — Commit inventory (8 commits, master 47399c2..e1549e0)

Verified live via `git log -1 --format='%H | %ai | %s'` on `tranche-f` HEAD `188bd6b`:

| # | SHA | Lockstep wave | Commit subject (verbatim) | Brief impact |
|---|-----|---------------|---------------------------|--------------|
| 1 | `1fafd5d` | W8-β | `chore(library/W8-β): npm install re-baseline — lockfile self-version 0.6.0 → 0.7.0` | Lockfile re-baseline against `0.7.0` manifest; transitive sibling-glass-ui devDep range refresh via the `file:` symlink. 1 file, +11/−11. DEPENDENCY BUMP. |
| 2 | `4cd8d15` | W8-β | `chore(library/W8-β): SAFE-PATCH + SAFE-MINOR sweep — 23 devDep bumps (C2 Group B.1 + B.2)` | 8 SAFE-PATCH + 15 SAFE-MINOR within-major lifts (devDep-grade; `src/` untouched). Headlines: katex 0.16.22→0.16.47; vue 3.5.18→3.5.34; vite 7.0.6→7.3.3; @vueuse 14.2.1→14.3.0; prettier 3.6.2→3.8.3; eslint 10.3.0→10.4.0. 2 files, +405/−395 net. DEPENDENCY BUMP. |
| 3 | `442aba1` | W9-A | `chore(library/W9-A): lift vue-tsc ^2.2.0 -> ^3.3.1 (consumer LOCKSTEP)` | Consumer mirror of glass-ui canary `5ad99959`. Net delta against vue-tsc 2.2.12 baseline: **−8 errors** (126 → 118). Lockfile SHRINKS by 52 lines (slimmer transitive footprint). CONSUMER LOCKSTEP. |
| 4 | `02ed508` | W9-C | `chore(library/W9-C): rename lucide-vue-next ^0.525.0 -> @lucide/vue ^1.16.0 (consumer LOCKSTEP)` | 80 files (+90/−90): 77 `demo/` Vue components single-line import rewrites + `vite.config.ts` optimizeDeps + `package.json` devDep swap + lockfile. **ZERO `src/` files**. Alias-hygiene + brand-icon removal (`Github`) explicitly out-of-scope. Typecheck 118 → 120 (+2 regression from removed `Github` brand icon). CONSUMER LOCKSTEP. |
| 5 | `209584c` | W9-F+W9-H | `chore(library/W9-F+W9-H): lift @types/node ^24.12.3 + vaul-vue ^0.4.0 (consumer LOCKSTEPs)` | Two cross-cutting peer-shim lifts. Node 24 LTS targeting preserved (NOT ^25). vaul-vue manifest-floor coordination only — zero `vaul-vue|VaulDrawer` hits in `src/`+`demo/`. Lockfile shrinks 142 lines. CONSUMER LOCKSTEP. |
| 6 | `08a7f96` | W10-β | `feat(library/W10-β)!: Vite 7 → 8 + Rolldown` | **BREAKING** bundler swap (conventional `!`). Two `rollupOptions` → `rolldownOptions` renames + `sideEffects` scope-fix in `vite.config.ts` (Rolldown 1.0.1 aggressive dead-strip exempted via `["./demo/**", "**/*.css"]`). `dist/value.js` **141,472 B → 124,988 B (−11.7%)** Oxc-minify shrink. Library build 1.12s → 956ms (−14.6%). 3 files, +634/−69. Introduces `--legacy-peer-deps` carry (unplugin-vue-markdown@29 declares vite≤7). MAJOR BUMP REQUIRING CODE MIGRATION. |
| 7 | `9f56813` | W12-β | `chore(library/W12-β): TypeScript 5 → 6` | TS ^5.8.3 → ^6.0.3 (resolved 5.9.3 → 6.0.3). Mechanical one-line manifest bump; lockfile flips. **Zero new narrowing regressions** under strict-mode posture (verbatimModuleSyntax + noUncheckedIndexedAccess + exactOptionalPropertyTypes). vue-tsc FLAT at 120 (identical error-set sorted-diff). 2 files, +7/−19. MAJOR BUMP (plays as DEPENDENCY BUMP-grade). |
| 8 | `e1549e0` | W12-unblocker | `fix(library/W12-unblocker): emit dts at flat dist/ layout via entryRoot: src` | Surgical 1-file fix (`vite.config.ts` +20/−1). `vite-plugin-dts` was emitting `dist/src/index.d.ts` (mirroring source root) instead of `dist/index.d.ts` (flat shape claimed by `package.json` `types` + `exports["."].types`). Fix PAIRS `entryRoot` with `compilerOptions.rootDir` override to decouple `publicRoot` from program-source-set inference. Prior shape caused **TS7016 in every typed consumer** (keyframes.js, words/frontend) — critical regression-and-recovery cycle within the window. DTS / BUILD CONFIG. |

**Authoring posture**: All 8 commits direct-to-master on a single straight-line session (1h 13m). Per `git reflog` (transcribed in F-AUDIT-3 §2.2), HEAD@{1}..HEAD@{11} traces the sequence atop `47399c2` E-close merge. NO tranche branch + merge ceremony was used.

---

## §3 — Gate impact verdict (per F-AUDIT-3 §3)

All "At F open" values are LIVE measurements taken on `tranche-f` HEAD `e1549e0`, 2026-05-20 23:40-23:45 EDT. **11 of 12 E-pre-merge gates PASS or improved.** ONE NEW REGRESSION: `build:gh-pages` blocked by missing `Github` lucide icon (W9-C punt) — **closed at F.W0 Lane A**.

| # | Gate | At E close (47399c2) | At F open (e1549e0) | Verdict |
|---|------|---------------------|---------------------|---------|
| 1 | `npm run lint` | exit 0 | exit 0 | **PASS** |
| 2 | `vue-tsc --noEmit` error count | 126 | **120** | **IMPROVE (−6)** — W9-A vue-tsc 2→3 contributed −8; W9-C `Github` gap added +2. |
| 3 | `vitest run` | 1584 / 34 files | 1584 / 34 files | **PASS (flat)** |
| 4 | `vite build` (library) — size | clean / 141,472 B (gzip 41.64 kB) | clean / **124,988 B** (gzip 38.36 kB) | **IMPROVE (−11.7%)** — Rolldown Oxc-minify. |
| 5 | dts shape | `dist/index.d.ts` | `dist/index.d.ts` (5,201 B; flat) | **PASS** (post-e1549e0 fix) |
| 6 | `proof:resolution` | GREEN | **PASS** ("contract-v2 dev-resolution contract satisfied across the constellation") | **PASS** |
| 7 | L8 bench median | 14.34× (gate ≥ 5×) | **13.37×** (gate ≥ 5×) | **PASS** — 2.67× above floor; within run-to-run variance. Re-verify at F.W0 Lane C. |
| 8 | DIRECT_PATHS bench (HSL→RGB) | 4.28× (gate ≥ 2×) | **4.32×** (gate ≥ 2×) | **PASS** |
| 9 | nameParser bench median | 47.33× (gate ≥ 5×) | **37.34×** (gate ≥ 5×) | **PASS** — 7.47× above floor. |
| 10 | api `tsc --noEmit` | clean | clean (exit 0) | **PASS** |
| 11 | api `vitest run` | 104 / 20 files | 104 / 20 files | **PASS (flat)** |
| 12 | `build:gh-pages` | green (D close) | **BROKEN** (`[MISSING_EXPORT] "Github"` from `@lucide/vue`) | **REGRESS** — **closed at F.W0 Lane A** (Github icon migration). |
| 13 | Playwright (3 projects) | 36/36 | SKIPPED at F-open audit (long-running ~60s+; CI gates post-merge) | SKIP |

**Notable drifts**:

- **Gate 2 (vue-tsc)**: −6 net errors. The W9-A vue-tsc 2→3 lift contributed −8; W9-C lucide rename added +2 (Github gap). Residual demo-grade errors live in `demo/@/components/ui/{calendar,resizable,v-calendar,...}/*.vue` under `exactOptionalPropertyTypes` and are pre-existing per VENDOR-POLICY.md.
- **Gate 4 (bundle size)**: −16,484 bytes sourced entirely from W10-β Vite 8 + Rolldown swap. Tree-shake parity confirmed via the W10-β commit body's esbuild-bundle probe (`import { Color }` produces 147 kB with zero `postcss-*` / `standalone-*` references — identical shape, smaller minified surface).
- **Gate 12 (`build:gh-pages`)**: NEW REGRESSION at F open. Two demo sites still import `Github` from `@lucide/vue`: `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue:4` and `demo/@/components/custom/dock/menus/ProfileSection.vue:4`. The W9-C commit body explicitly out-of-scoped this ("alias-hygiene pass + brand-icon removal explicitly out-of-scope for this LOCKSTEP — they fold into a follow-up wave"). The W10-β commit body confirms "the failure reproduces identically on Vite 7 master HEAD (verified via stash-test); NOT a W10 regression". **The library build (gate 4) succeeds because it does not consume `demo/`**; the demo / gh-pages build fails. Published v0.7.0 npm tarball is unaffected (ships from `dist/value.js`, not `dist/index.html`). **Closed at F.W0 Lane A.**

---

## §4 — Carried chronics

Per F-AUDIT-3 §4 (drift findings) + F-AUDIT-1 §6.3 (post-E-window items):

1. **`Github` lucide alias-hygiene punt** (W9-C `02ed508` explicit out-of-scope) — broken `build:gh-pages`. Two demo files in `demo/@/components/custom/dock/menus/` (`MobileMenuDropdown.vue:4`, `ProfileSection.vue:4`) still import a removed brand icon. **Closed at F.W0 Lane A.**

2. **`--legacy-peer-deps` install carry** (W10-β `08a7f96` chronic; disclosed in `9f56813` commit body) — `unplugin-vue-markdown@29.2.0` declares `vite ≤7` peer-range; project on `vite@8`. Every `npm install` / `npm ci` requires `--legacy-peer-deps` until `unplugin-vue-markdown` ships a `^30.x` with `vite ^8` in peer-range. Resolution criterion: re-probe periodically; lift when upstream ships. NOT closed at F.W0; tracked as a small task in F's deps-housekeeping framing (per F-AUDIT-3 §4.4).

3. **Sub-tranche naming convention drift** (F-AUDIT-3 §4.6) — the W-numbered scheme (`W{n}-β` / `W{n}-{Letter}` / `W{n}-unblocker`) is distinct from value.js's own `F.W{n}-lane-{x}` pattern. F4 invariant codifies the convention going forward: cross-repo consumer-lockstep waves may use the AI-style W-numbered scheme; value.js-internal waves use `F.W{n}-lane-{x}`. Documented in F.md §2 + this back-reference.

4. **Structural-discipline gap** (F-AUDIT-3 §4.5, §5.1) — the 8 commits were authored direct-to-master with no tranche branch + no value.js-side tranche document + no PROGRESS.md / FINAL.md trail. The authority lives entirely in the speedtest sibling. F4 codifies the going-forward posture (back-reference doc OR full tranche envelope, at the time of the work, not retroactively). This doc is the retroactive closure of the gap.

---

## §5 — Tranche-discipline verdict (per F-AUDIT-3 §5.1)

**PARTIAL — YES on contract, NO on structure.**

PROS (discipline observed):
- Each commit body is structured, references its origin spec section (`AI W8-β spec §2.2.1`, `C2 §7.1`, `AI W9-A constellation LOCKSTEP`, `AI W9-C constellation LOCKSTEP`, `W9-C-spec §1.3`, `AI W9-F and W9-H`, `W9-BDEFGH-spec §2.4`, `Phase 1 (glass-ui W10-α)`, `AI W11-W12-W13-spec §3.5`), lists files-touched + gates-impact + carries.
- Constellation-LOCKSTEP framing honored — each commit notes its publisher (glass-ui canary SHAs cited) and consumer-role positioning.
- No `src/` runtime code touched in any of the 7 dep-bump commits — only `package.json` / `package-lock.json` / `vite.config.ts` / `demo/` import-rewrites. Library contract preserved.
- The `e1549e0` W12-unblocker is an idiomatic gestalt fix (per F-AUDIT-3-prompt's preference framing) — addresses `publicRoot` inference at the plugin-config layer, not via post-build file moves.
- E's bench gate preserved; commit bodies cite gate verdicts.
- No legacy-compat shims introduced.

CONS (discipline violations):
- **No tranche branch**: 8 commits authored directly on `master`, not on a `tranche-{x}` branch with planning-only at open + close-merge ceremony. The precept "Substrate and consumer land together" honored per-commit; the "tranche development model" was not.
- **No value.js-side tranche document**: no `docs/tranches/W8-W12.md` or `docs/tranches/AI-consumer/` describing the wave plan, gate criteria, rollback posture, or close evidence. Authority lives entirely in the speedtest sibling. **This doc is the retroactive closure.**
- **One regression-and-recovery cycle within the window** (`08a7f96` → `e1549e0`): Vite 7→8 silently broke dts emission layout (typed consumers like keyframes.js + words/frontend would have hit TS7016 if re-tested between `08a7f96` and `e1549e0`). The 25-minute gap suggests manual probing caught it rather than an automated gate.
- **Standing regression NOT closed in-window**: the `Github` icon gap from W9-C deliberately punted. Closed at F.W0 Lane A.

**F closes the structural-discipline gap retroactively per F4** — this doc is the artefact.

---

## §6 — F1 ("No deferrals") verdict

Per F-AUDIT-3 §5.3 + F-AUDIT-1 §6.3:

W8-W12 introduced **ONE chronic** (`Github`-icon gh-pages blocker — closed at F.W0 Lane A) + **opened transposition opportunities** folded into F.W1:
- Rolldown declarative `codeSplitting` (replace function-form `manualChunks`).
- `@ts-ignore` strengthening site (TS 6's tighter narrowing exposes a typed-memoize return that can replace an existing `@ts-ignore`).
- Zero-consumer shadcn-vue subdir audit + delete-or-justify (vendor-policy continuation; the 120-error baseline is the cleaner landing pad).

**ZERO silent deferrals.** Both carried chronics (`Github` gap + `--legacy-peer-deps`) are documented in commit bodies AND in this back-reference. The structural-discipline gap is the LAST silent deferral and is closed by this doc per F4.

---

## §7 — Authority

**Pinned**:
- **Publisher authority**: `/Users/mkbabb/Programming/speedtest/docs/tranches/AI/AI.md` (open + plan) + `/Users/mkbabb/Programming/speedtest/docs/tranches/AI/FINAL.md` (close report).
- **value.js audit deliverable**: `docs/tranches/F/audit/F-AUDIT-3-w8-w12-drift.md` (forensic; §1 per-commit, §3 gate matrix, §4 drift findings, §5 net assessment, §7 commit SHA + gate-command pinning).
- **Cross-reference (E-side)**: `docs/tranches/E/audit/E-AUDIT-4-cross-repo-state.md` §3.1 (AI tranche structure at E-close visibility); `docs/tranches/E/audit/E-FOLD-1-speedtest-assay.md` (most thorough pre-W8-W12 forensic on AI; source of the "consumer-β" framing).
- **Cross-reference (F-side)**: `docs/tranches/F/audit/F-AUDIT-1-prompts-precepts.md` §6.3 (post-E-window items framing + the F-AUDIT-3 specific asks); `docs/tranches/F/F.md` §0 (master HEAD provenance + W8-W12 lockstep summary) + §2 (F1-F4 invariants codifying the going-forward posture).
- **Wave-spec authority**: `docs/tranches/F/waves/F.W0.md` Lane B (this doc's authoring brief).

**Commit SHAs pinned** (newest-first, all verified live via `git log -1`):
- `e1549e0` — fix(library/W12-unblocker): emit dts at flat dist/ layout via entryRoot: src
- `9f56813` — chore(library/W12-β): TypeScript 5 → 6
- `08a7f96` — feat(library/W10-β)!: Vite 7 → 8 + Rolldown
- `209584c` — chore(library/W9-F+W9-H): lift @types/node ^24.12.3 + vaul-vue ^0.4.0 (consumer LOCKSTEPs)
- `02ed508` — chore(library/W9-C): rename lucide-vue-next ^0.525.0 -> @lucide/vue ^1.16.0 (consumer LOCKSTEP)
- `442aba1` — chore(library/W9-A): lift vue-tsc ^2.2.0 -> ^3.3.1 (consumer LOCKSTEP)
- `4cd8d15` — chore(library/W8-β): SAFE-PATCH + SAFE-MINOR sweep — 23 devDep bumps (C2 Group B.1 + B.2)
- `1fafd5d` — chore(library/W8-β): npm install re-baseline — lockfile self-version 0.6.0 → 0.7.0

**Boundary SHAs**:
- E-close merge: `47399c2` (Merge tranche-e into master — Tranche E close (v0.7.0)).
- F-open HEAD: `e1549e0` (audit + open baseline).
- F.W0 dispatch HEAD: `188bd6b` (post-F-open docs commit; pre-W0 execution).
