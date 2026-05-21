# F-AUDIT-3 — W8-W12 master drift audit

**Mode**: READ-ONLY. Authored at F open.
**Date**: 2026-05-20.
**Branch / HEAD**: `tranche-f` @ `e1549e0d309c31b4e977765d7c7a02fc67987078`.
**Audit window**: `47399c2` (E close / v0.7.0 merge) → `e1549e0` (F-open HEAD). 8 commits.
**Authority**: Lane 3 of the F-opening audit triad (alongside F-AUDIT-1 prompts/precepts + F-AUDIT-2 deferred ledger).
**Verification posture**: Per gate command output captured 2026-05-20 23:40-23:45 EDT, executed live on `tranche-f` HEAD `e1549e0` — NOT presumed.

---

## §1 — Per-commit forensics

### §1.1 `1fafd5d` — chore(library/W8-β): npm install re-baseline

- **Author / committer**: Mike Babb <mike7400@gmail.com> (single author, no co-authors).
- **AuthorDate / CommitDate**: 2026-05-20 20:16:02 -0400 (both equal — straight-line commit, no rebase).
- **Parent**: `47399c2` (the E-close merge — this commit is the first post-E-close commit on `master`).
- **File count / LoC delta**: 1 file (`package-lock.json` only); +11 / −11 LoC.
- **Semantic change**: The lockfile's recorded package self-version had drifted to `0.6.0` (D-era release) while `package.json` already declared `0.7.0` (lifted by `ddf7154` during E close). A clean `npm install` re-baselines the lockfile against the manifest; gate is "empty `git diff package.json` post-install". Transitively picks up sibling glass-ui devDep range updates (reka-ui 2.9.7, tailwindcss 4.3.0, vite 7.3.3, vitest 4.1.5, vueuse 14.3.0, plugin-vue 6.0.7) via the `file:` symlink.
- **Classification**: **DEPENDENCY BUMP** (lockfile-only refresh / re-baseline).
- **Gate impact** (per commit body claim, not re-verified at this checkpoint): vue-tsc 126 unchanged; vitest 34/1584 unchanged; build 141.47 kB / 41.64 kB gzip unchanged.

### §1.2 `4cd8d15` — chore(library/W8-β): SAFE-PATCH + SAFE-MINOR sweep — 23 devDep bumps

- **Author / committer**: Mike Babb <mike7400@gmail.com>.
- **AuthorDate / CommitDate**: 2026-05-20 20:17:10 -0400 (68 seconds after `1fafd5d` — sequential authoring session).
- **Parent**: `1fafd5d`.
- **File count / LoC delta**: 2 files (`package-lock.json` +382 / −372; `package.json` +23 / −23). Net 0 LoC on `package.json` (range bumps only).
- **Semantic change**: 8 SAFE-PATCH + 15 SAFE-MINOR within-major lifts (devDep-grade only; `src/` runtime contract untouched). Headline upgrades: `katex` 0.16.22 → 0.16.47 (25-patches-behind), `vue` 3.5.18 → 3.5.34 (16-patches-behind), `@playwright/test` 1.58.2 → 1.60.0, `@tailwindcss/{cli,postcss,...}` 4.1.11 → 4.3.0, `vite` 7.0.6 → 7.3.3 (the constellation parity floor per AI tranche RD-8), `@vueuse/{core,integrations}` 14.2.1 → 14.3.0, `prettier` 3.6.2 → 3.8.3, `eslint` 10.3.0 → 10.4.0. **Explicit deferrals** to W9/W10/W12: `vue-router` 4→5 (W13), `@iconify/vue` 4→5, `@types/node` 24→25 (W9-F deferred to ^24-floor), `jsdom` 26→29, `lucide-vue-next` 0→1 (W9-C), `typescript` 5→6 (W12), `unplugin-vue-markdown` 29→30, `vaul-vue` 0.2→0.4 (W9-H), `vite-plugin-dts` 4→5, `vitest` 3→4, `vue-tsc` 2→3 (W9-A), `zod` 3→4. Also explicit hold: `reka-ui` 2.0→2.9 deferred to "B.3" (not in W8-β scope).
- **Classification**: **DEPENDENCY BUMP** (bulk devDep lift, all within-major).
- **Gate impact** (per commit body claim): vue-tsc 126 flat; vitest 1584/1584; build `dist/value.js` 141.47 kB / 41.64 kB gzip — 0% delta vs pre-sweep, within ±5% gate.

### §1.3 `442aba1` — chore(library/W9-A): lift vue-tsc ^2.2.0 → ^3.3.1 (consumer LOCKSTEP)

- **Author / committer**: Mike Babb <mike7400@gmail.com>.
- **AuthorDate / CommitDate**: 2026-05-20 20:36:49 -0400 (19m38s after `4cd8d15`).
- **Parent**: `4cd8d15`.
- **File count / LoC delta**: 2 files (`package-lock.json` +59 / −111 = net −52; `package.json` +1 / −1). Lockfile SHRINKS — vue-tsc 3 has a slimmer transitive footprint than 2.x.
- **Semantic change**: Constellation LOCKSTEP — glass-ui already landed the canon at `5ad99959`; this is value.js's mirror. Net delta against vue-tsc 2.2.12 baseline: **−8 errors** (126 → 118 against vue-tsc 3.3.1). vue-tsc 3 is NOT the regression source; the residual demo-grade errors live in `demo/@/components/ui/{calendar,resizable,v-calendar,...}/*.vue` under `exactOptionalPropertyTypes` and are pre-existing.
- **Classification**: **CONSUMER LOCKSTEP** (cross-repo coordination; constellation-canon-following).
- **Gate impact** (per commit body claim): vue-tsc 126 → 118 (−8 *improvement*); no other change.

### §1.4 `02ed508` — chore(library/W9-C): rename lucide-vue-next → @lucide/vue (consumer LOCKSTEP)

- **Author / committer**: Mike Babb <mike7400@gmail.com>.
- **AuthorDate / CommitDate**: 2026-05-20 20:38:41 -0400 (1m52s after `442aba1`).
- **Parent**: `442aba1`.
- **File count / LoC delta**: 80 files (+90 / −90). Surface composition: 77 `demo/` Vue components (single-line import rewrite each: `from "lucide-vue-next"` → `from "@lucide/vue"`), `vite.config.ts` (`optimizeDeps.include` rewrite), `package.json` (devDep key swap), `package-lock.json` refresh. **Zero `src/` files** — value.js's library surface does not import lucide.
- **Semantic change**: Per the W9-C-spec §1.3, the alias-hygiene pass (`AlertCircle`→`CircleAlert`, etc.) and brand-icon removal (`Github` no longer exported from `@lucide/vue@1.x`) are **explicitly out-of-scope** for this LOCKSTEP — they fold into a follow-up wave. The commit body discloses: typecheck baseline 118 → 120 errors (+2 net-new from the removed `Github` brand icon).
- **Classification**: **CONSUMER LOCKSTEP** (cross-repo coordination; introduces +2 demo-grade typecheck errors and the standing `Github` icon gap surfaced in §4 below).
- **Gate impact** (per commit body claim): vue-tsc 118 → 120 (+2 *regression*); vitest 1584/1584; build green at 1.15s.

### §1.5 `209584c` — chore(library/W9-F+W9-H): lift @types/node ^24.12.3 + vaul-vue ^0.4.0 (consumer LOCKSTEPs)

- **Author / committer**: Mike Babb <mike7400@gmail.com>.
- **AuthorDate / CommitDate**: 2026-05-20 20:39:27 -0400 (46s after `02ed508`).
- **Parent**: `02ed508`.
- **File count / LoC delta**: 2 files (`package-lock.json` +12 / −154 = net −142; `package.json` +2 / −2). Lockfile shrinks significantly — vaul-vue 0.4 has a slimmer transitive footprint than 0.2.
- **Semantic change**: Two cross-cutting peer-shim lifts. W9-F `@types/node` ^24.1 → ^24.12.3 (minor-within-major; constellation canon is Node 24 LTS — NOT ^25, which would diverge from LTS targeting). W9-H `vaul-vue` ^0.2 → ^0.4 (declared as peer-shim parity for glass-ui; `grep` returns zero `vaul-vue|VaulDrawer` hits in `src/` + `demo/` — manifest-floor coordination only, no API consumption).
- **Classification**: **CONSUMER LOCKSTEP** (manifest parity for cross-repo shim alignment).
- **Gate impact** (per commit body claim): vue-tsc 120 flat; vitest 1584/1584; build green at 1.19s.

### §1.6 `08a7f96` — feat(library/W10-β)!: Vite 7 → 8 + Rolldown

- **Author / committer**: Mike Babb <mike7400@gmail.com>.
- **AuthorDate / CommitDate**: 2026-05-20 21:04:49 -0400 (25m22s after `209584c` — distinct authoring session).
- **Parent**: `209584c`.
- **File count / LoC delta**: 3 files (`package-lock.json` +627 / −65; `package.json` +5 / −2; `vite.config.ts` +2 / −2). The conventional-commit `!` marks a BREAKING change.
- **Semantic change**: The LARGEST commit of the window. Two `rollupOptions` → `rolldownOptions` rename sites (production library mode + gh-pages mode). One **non-obvious gestalt fix**: Rolldown 1.0.1 applies `"sideEffects": false` more aggressively than Rollup did, dead-stripping the hero-lab demo entry to a modulepreload polyfill. The fix scopes `sideEffects` to a file pattern (`["./demo/**", "**/*.css"]`), exempting demo entries while preserving consumer tree-shake of `dist/`. Bound dependencies held back: `vite-plugin-dts` stays at ^4.5.4 (vue-tsc 3.3.1 peer-range conflict prevents 5.x); `@vitejs/plugin-vue` stays at ^6.0.7 (Vite-8-compat via peer range `^5||^6||^7||^8`); function-form `manualChunks` retained (Rolldown 1.0.2 still exposes `ManualChunksFunction` — declarative form is the future, not yet enforced).
- **Classification**: **MAJOR BUMP REQUIRING CODE MIGRATION** (Vite 7→8 ecosystem shift; introduces Rolldown bundler; manifest-key rename + sideEffects scope-fix in source).
- **Gate impact** (per commit body claim): vue-tsc 120 flat; vitest 1584/1584; build (library) 956ms (was 1.12s; −14.6%); `dist/value.js` **141.47 → 124.98 kB (−11.7%)** Oxc minify shrink — a *positive* size regression per Phase 1 inheritance #4; build:hero-lab 283 kB JS + 282 kB CSS emitted cleanly after the sideEffects scope fix; proof:resolution PASS. **build:gh-pages BLOCKED** by the pre-existing W9-C `Github` icon gap — explicitly documented in the commit body as a follow-on. Dev: color-picker 326ms; hero-lab 359ms.
- **Carry**: Pre-existing npm-install peer conflict (`unplugin-vue-markdown@29.2.0` declares `vite ≤7`; project on vite@8) requires `--legacy-peer-deps`. Disclosed in `9f56813` commit body as a "chronic carry" from W10-β.

### §1.7 `9f56813` — chore(library/W12-β): TypeScript 5 → 6

- **Author / committer**: Mike Babb <mike7400@gmail.com>.
- **AuthorDate / CommitDate**: 2026-05-20 21:17:21 -0400 (12m32s after `08a7f96`).
- **Parent**: `08a7f96`.
- **File count / LoC delta**: 2 files (`package-lock.json` +6 / −18 = net −12; `package.json` +1 / −1). Mechanical one-line bump.
- **Semantic change**: `typescript` ^5.8.3 → ^6.0.3 (resolved 5.9.3 → 6.0.3). The lockfile flips the typescript record + an incidental `@popperjs/core` prune. Break-catalogue audit (per the project's strict-mode posture: `moduleResolution: bundler`, target ES2022, lib ES2023+DOM+DOM.Iterable, `verbatimModuleSyntax + noUncheckedIndexedAccess + exactOptionalPropertyTypes`): **zero new narrowing regressions**, vue-tsc error count FLAT at 120 (sorted-diff against pre-W12 baseline is empty — identical error set).
- **Classification**: **MAJOR BUMP** (TypeScript 5→6 is a major semver event but in this codebase plays as DEPENDENCY BUMP-grade because of the strict-mode posture having already absorbed the TS6 expectations).
- **Gate impact** (per commit body claim): vue-tsc 120 flat; vitest 1584/1584; build (library) 124.98 kB byte-flat vs W10-β; hero-lab byte-flat; lint exit 0; proof:resolution PASS; bench gates PASS (L8 ≥ 5×, HSL→RGB ≥ 2×, nameParser ≥ 5× — median nameParser 39.81× per commit body).

### §1.8 `e1549e0` — fix(library/W12-unblocker): emit dts at flat dist/ layout via entryRoot: src

- **Author / committer**: Mike Babb <mike7400@gmail.com>.
- **AuthorDate / CommitDate**: 2026-05-20 21:29:09 -0400 (11m48s after `9f56813`).
- **Parent**: `9f56813`.
- **File count / LoC delta**: 1 file (`vite.config.ts` +20 / −1). Surgical.
- **Semantic change**: The `vite-plugin-dts` plugin was emitting `dist/src/index.d.ts` instead of `dist/index.d.ts` — i.e., the layout was *mirroring source root* rather than collapsing to the flat shape that `package.json`'s `"types": "./dist/index.d.ts"` + `exports["."].types` claim. The plugin's `publicRoot` is inferred from the common ancestor of program source files; setting `entryRoot` alone was insufficient because that ancestor IS `<repo>/src`. The fix PAIRS `entryRoot` with a `compilerOptions.rootDir` override to decouple `publicRoot` from program-source-set inference. Prior shape caused **TS7016 in every typed consumer** (keyframes.js, words/frontend, etc.) trying to import `@mkbabb/value.js` — a critical regression-and-recovery cycle within the window.
- **Classification**: **DTS / BUILD CONFIG** (idiomatic gestalt fix; not a dep bump).
- **Gate impact** (per commit body claim): `dist/index.d.ts` exists with full exports (not an `export {}` stub); no `dist/src/` directory remains; vitest 1584/1584; vite build clean; typecheck delta 0.

---

## §2 — Tranche-origin investigation

### §2.1 W-numbered scheme provenance

The W8-W12 commits use a scheme **distinct from E's `E.W{n}-lane-{x}` pattern**. The suffixes are:

- `W8-β` (2 commits) — "β" = "consumer-β" (CR-β); the cross-repo CONSUMER role in a constellation-wide wave.
- `W9-A` / `W9-C` / `W9-F+W9-H` (3 commits) — sub-lane letters A/C/F/H of a single wave (W9), with explicit "(consumer LOCKSTEP)" marker.
- `W10-β` (1 commit) — same consumer-β tag at the major-wave level.
- `W12-β` (1 commit) + `W12-unblocker` (1 commit) — the major-wave tag plus a derived bugfix tag for the post-bump regression-and-recovery.

This vocabulary does NOT come from value.js's own tranche scheme. Commit bodies reference:
- `"AI W8-β spec §2.2.1"` (in `1fafd5d`)
- `"C2 §7.1"` and `"C2 Group B.1 + B.2"` (in `4cd8d15`)
- `"AI W9-A constellation LOCKSTEP"` (in `442aba1`)
- `"AI W9-C constellation LOCKSTEP"` and `"W9-C-spec §1.3"` (in `02ed508`)
- `"AI W9-F and W9-H"` and `"W9-BDEFGH-spec §2.4"` (in `209584c`)
- `"Phase 1 (glass-ui W10-α)"` (in `08a7f96`)
- `"AI W11-W12-W13-spec §3.5"` (in `9f56813`)

These all reference an **"AI" tranche** — confirmed by cross-reference to `docs/tranches/E/audit/E-AUDIT-4-cross-repo-state.md` line 85 + `docs/tranches/E/E.md` line 8 + `docs/tranches/E/PROGRESS.md` line 62: **the AI tranche lives in `speedtest/docs/tranches/AI/AI.md`**. Speedtest is the publisher; value.js is one of the 7 constellation-wide consumer repos.

Per `E-AUDIT-4` §3.1, the AI tranche structure (at E-close visibility) was:
- **W0 cohort**: 10-lane planning (6 audit + 4 frontend-design).
- **W1-W5**: 5 substantive design / animation / glass-ui / mobile-desktop / occlusion waves.
- **W6**: Vite-7.3.3 catch-up.
- **W7**: speedtest dep-lift.
- **W8 NEW**: per-repo SAFE-MINOR sweep — 6 parallel sub-lanes; one per peer. `W8-CR-β` = value.js SAFE-MINOR sweep.
- **W9 NEW**: constellation cross-cutting LOCKSTEPS — 8 sub-lanes (A=vue-tsc, B=reka-ui, C=lucide-rename, D=vitest, E=pinia, F=@types-node, G=tailwind-merge, H=vaul-vue).
- **W10 NEW**: Vite 7 → 8 + Rolldown constellation-wide (7 sub-lanes; glass-ui canary-first).
- **W12 NEW**: TypeScript 5 → 6 constellation-wide (depends on W9-A vue-tsc 3).

This matches the 8 value.js commits **exactly** (W8-β x2, W9-A, W9-C, W9-F+W9-H, W10-β, W12-β + the derived W12-unblocker).

### §2.2 Working branches identified

Per `git for-each-ref refs/heads/`, 7 local branches exist; only 4 are relevant:
- `master` @ `e1549e0` (Wed May 20 21:29 -0400).
- `tranche-f` @ `e1549e0` (same HEAD — F branched directly from master).
- `tranche-e` (no longer in branch list — merged + tag retired post v0.7.0).
- `w.w2.1-value-js-prebuild` @ `70e61e9` (Sat May 16 — predates the audit window; unrelated worktree branch).

Per `git reflog`, the 8 W8-W12 commits were authored DIRECTLY on `master`:
```
e1549e0 HEAD@{1}: commit: fix(library/W12-unblocker): ...
9f56813 HEAD@{4}: commit: chore(library/W12-β): TypeScript 5 → 6
08a7f96 HEAD@{5}: commit: feat(library/W10-β)!: ...
209584c HEAD@{6}: commit: chore(library/W9-F+W9-H): ...
02ed508 HEAD@{7}: commit: chore(library/W9-C): ...
442aba1 HEAD@{8}: commit: chore(library/W9-A): ...
4cd8d15 HEAD@{10}: commit: chore(library/W8-β): SAFE-PATCH + SAFE-MINOR sweep
1fafd5d HEAD@{11}: commit: chore(library/W8-β): npm install re-baseline
47399c2 HEAD@{12}: reset: moving to HEAD (E-close merge)
```

`tranche-f` was checked out from master at HEAD@{0} **after** all 8 W-numbered commits had landed. **No feature branch + merge ceremony was used.** This is irregular against the precepts-codified tranche discipline (one branch per tranche; planning-only at open; substantive waves on the tranche branch; close-merge to master).

### §2.3 `docs/tranches/` entry for the W-numbered scheme

**NONE**. `docs/tranches/` contains only A, B, C, D, E, F directories. No `AI/` directory. The W-numbered scheme's authority resides in the **speedtest sibling repo**, not in value.js.

Run: `git -C /Users/mkbabb/Programming/value.js log --all --oneline 47399c2..e1549e0 -- docs/tranches/` returns ZERO output — **NONE of the 8 commits touched any tranche directory**, including E's. This confirms:
- The commits did NOT intrude on `docs/tranches/E/`.
- The commits did NOT author any `docs/tranches/W8-W12.md` or equivalent self-documentation in value.js.

The only self-documentation surface in value.js is the commit-message bodies themselves (each is detailed, structured, and references the AI-tranche specs by section). The F-open audit triad (F-AUDIT-1/2/3) is the first time these commits get a value.js-side documentary record.

### §2.4 Intrusion on docs/tranches/E/

**NO**. Per §2.3 the W8-W12 commits did not touch any `docs/tranches/E/` file. E's substrate (FINAL.md, audits, waves, etc.) is preserved verbatim at HEAD `e1549e0`. The E-close artefacts dated 2026-05-20 19:21 are 1-2 hours before the W8-W12 authoring session (20:16-21:29) — chronologically distinct + textually undisturbed.

### §2.5 Tranche-discipline conformance verdict

**PARTIAL CONFORMANCE**:

PROS (discipline observed):
- Each commit body is structured, references its origin spec, lists files-touched + gates-impact + carries.
- The constellation-LOCKSTEP framing is honored — each commit notes its publisher (glass-ui canary) and consumer-role positioning.
- No `src/` runtime code was touched in any of the 7 dep-bump commits — only `package.json` / `package-lock.json` / `vite.config.ts` / `demo/` import-rewrites. The library contract is preserved.
- The `e1549e0` W12-unblocker is an idiomatic gestalt fix (per the F-AUDIT-3-prompt's preference framing) — addresses publicRoot inference at the plugin-config layer rather than working-around via post-build file moves.
- E's bench gate is preserved; commit bodies cite the gate verdicts.
- No legacy-compat shims introduced.

CONS (discipline violations):
- **No tranche branch**: the 8 commits were authored directly on `master`, not on a `tranche-{x}` branch with planning-only at open + close-merge ceremony. The precept "Substrate and consumer land together" was honored in the per-commit body, but the "tranche development model" was not.
- **No value.js-side tranche document**: there is no `docs/tranches/W8-W12.md` or `docs/tranches/AI-consumer/` describing the wave plan, the gate criteria, the rollback posture, or the close evidence. The authority lives entirely in the speedtest sibling — making the value.js-side commits read as "drive-by lockstep" rather than "tranche execution".
- **One regression-and-recovery cycle within the window** (`08a7f96` → `e1549e0`): the Vite 7→8 commit silently broke the dts emission layout (consumers like keyframes.js + words/frontend would have hit TS7016 if they had been re-tested between `08a7f96` and `e1549e0`). The 25-minute gap (21:04 → 21:29) suggests this was caught by manual probing rather than by an automated gate — the bench / typecheck / build gates all passed in `08a7f96` because the regression was in the **consumed shape**, not in the value.js side.
- **Standing regression NOT closed in-window**: the `Github` icon gap from W9-C (`02ed508`) was deliberately punted ("explicitly out-of-scope for this LOCKSTEP — they fold into a follow-up wave"), and `build:gh-pages` remains broken at F open (verified live in §4 below).

---

## §3 — Gate-impact matrix at F open (HEAD `e1549e0`)

All values in the "At F open" column are LIVE measurements, taken 2026-05-20 23:40-23:45 EDT on HEAD `e1549e0`.

| # | Gate                          | At E close          | At F open                                   | Verdict          |
|---|-------------------------------|---------------------|---------------------------------------------|------------------|
| 1 | `npm run lint`                | exit 0              | **exit 0**                                  | **PASS**         |
| 2 | `vue-tsc --noEmit` (error TS) | 126                 | **120**                                     | **IMPROVE (−6)** |
| 3 | `vitest run`                  | 1584 / 34 files     | **1584 / 34 files**                         | **PASS (flat)**  |
| 4 | `vite build` (clean? size?)   | clean / 141,472 B   | **clean / 124,988 B** (−11.7%)              | **IMPROVE**      |
| 5 | dts shape                     | `dist/index.d.ts`   | **`dist/index.d.ts`** (5,201 B; flat layout) | **PASS**        |
| 6 | `proof:resolution`            | GREEN               | **PASS** ("contract-v2 dev-resolution contract satisfied across the constellation") | **PASS** |
| 7 | L8 bench median               | 14.34× (≥ 5× gate)  | **13.37×** (≥ 5× gate)                      | **PASS**         |
| 8 | DIRECT_PATHS bench median     | 4.28× (≥ 2× gate)   | **4.32×** (HSL→RGB; ≥ 2× gate)              | **PASS**         |
| 9 | nameParser bench median       | 47.33× (≥ 5× gate)  | **37.34×** (≥ 5× gate)                      | **PASS**         |
| 10| api `tsc --noEmit`            | clean               | **clean (exit 0)**                          | **PASS**         |
| 11| api `vitest run`              | 104 / 20 files      | **104 / 20 files**                          | **PASS (flat)**  |
| 12| `build:gh-pages`              | green (D close)     | **BROKEN** (Github icon missing from @lucide/vue) | **REGRESS** |
| 13| Playwright (3 projects)       | 36/36 (E close)     | SKIPPED — long-running (~60s+); CI gates post-merge; not re-verified live | SKIP |

**Notable drifts**:

- Gate 2 (vue-tsc): **−6 net errors** (126 → 120). The W9-A vue-tsc 2→3 lift contributed −8; the W9-C lucide rename added +2 (Github icon gap). Net improvement.
- Gate 4 (build size): **−16,484 bytes** (141,472 → 124,988). Sourced entirely from W10-β's Vite 8 + Rolldown bundler swap, which uses Oxc-minify (more aggressive than terser). gzip ratio improved correspondingly.
- Gate 7 (L8 bench): minor drift 14.34× → 13.37×. Still 2.67× above the gate floor. No regression risk; well within run-to-run variance for a microbench.
- Gate 9 (nameParser bench): drift 47.33× → 37.34×. Still 7.47× above the gate floor. Same caveat as L8.
- Gate 12 (`build:gh-pages`): **NEW REGRESSION at F open**. The W9-C commit body discloses this as "out-of-scope, fold into a follow-up wave". The W10-β commit body confirms "the failure reproduces identically on Vite 7 master HEAD (verified via stash-test); NOT a W10 regression". I re-verified at F open: `npm run build:gh-pages` fails with `[MISSING_EXPORT] "Github" is not exported by "node_modules/@lucide/vue/dist/esm/lucide-vue.mjs"` at `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue:12:25` (and at `demo/@/components/custom/dock/menus/ProfileSection.vue:4:25`). **The library build (gate 4) succeeds because it does not consume `demo/`**; the demo / gh-pages build fails.

---

## §4 — Drift findings

### §4.1 NEW REGRESSION — `build:gh-pages` blocked by missing `Github` icon

- **Finding**: At HEAD `e1549e0`, `npm run build -- --mode gh-pages` fails with `[MISSING_EXPORT] "Github" is not exported by "node_modules/@lucide/vue/dist/esm/lucide-vue.mjs"`. Two demo sites still import `Github`: `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue:4` and `demo/@/components/custom/dock/menus/ProfileSection.vue:4`. Each renders a `<Github class="w-3.5 h-3.5" />` element in a "Visit GitHub" / "View on GitHub" dock entry.
- **Origin**: `02ed508` (W9-C lucide rename) explicitly out-of-scoped this in the commit body: "alias-hygiene pass + brand-icon removal explicitly out-of-scope for this LOCKSTEP — they fold into a follow-up wave".
- **Impact**: The demo (gh-pages) build is broken at F open. Downstream consumers consuming `dist/value.js` are unaffected (library build succeeds). The published v0.7.0 npm tarball ships from `dist/value.js`, NOT `dist/index.html`, so the package is unaffected; the broken artifact is the **demo deployment** at `mbabb.fi.ncsu.edu/colors/` (or wherever the gh-pages target deploys).
- **F-scope-fit**: **FOLD-INTO-F**. This is the headline standing regression at F open. F-AUDIT-2 (deferred ledger) will surface this in its own framing per its lane; F-AUDIT-3 surfaces it here as a gate-drift finding. Resolution options: (a) replace `Github` with a generic icon (e.g., `Box`, `Code`, `Star`) — minimal-effort; (b) inline an SVG `<github>` glyph as a vendored asset — preserves brand semantics; (c) substitute via `@iconify-json/radix-icons` (already a devDep) — slightly larger churn. F.W{n} should pick one.

### §4.2 IMPROVEMENT — Library bundle size −11.7%

- **Finding**: `dist/value.js` shrunk from 141,472 B to 124,988 B (−16,484 B / −11.7%). Sourced entirely from W10-β's Vite 8 + Rolldown bundler swap, which uses Oxc-minify (more aggressive than Rollup's terser).
- **Impact**: Consumer download size improves; tree-shake parity confirmed via the W10-β commit body's esbuild-bundle probe (`import { Color }` produces 147 kB with zero `postcss-*` / `standalone-*` references — identical shape, smaller minified surface).
- **F-scope-fit**: **NEUTRAL**. This is an inherited improvement; F does not need to act on it. F may want to publish a `v0.7.1` patch release that ships the smaller bundle, OR fold the W10-β bundle into the v0.8.0 cut. F-AUDIT-2 / the F plan should choose.

### §4.3 IMPROVEMENT — vue-tsc error count −6 (126 → 120)

- **Finding**: Per gate 2 of §3, vue-tsc on 3.3.1 reports 120 errors vs vue-tsc 2.2.12's 126. Net delta: −8 from the vue-tsc 2→3 lift, +2 from the W9-C `Github` icon gap.
- **Impact**: The pre-existing demo-grade typecheck baseline (`@/components/ui/{calendar,resizable,v-calendar,...}/*.vue` exactOptionalPropertyTypes violations) is now lower. The errors that remain are still the chronic shadcn-style vendored-cluster errors per the VENDOR-POLICY.md gating from E.W4 Lane C.
- **F-scope-fit**: **NEUTRAL**. The vendor-policy gates these as informational; F does not need to act. If F decides to take a swing at the vendor-policy chronic, this is the cleaner baseline to land it against.

### §4.4 CARRY — `--legacy-peer-deps` required for `npm install`

- **Finding**: Per the `9f56813` commit body, "pre-existing W10-β npm-install peer conflict (`unplugin-vue-markdown@29.2.0` declares vite ≤7; project on vite@8) requires `--legacy-peer-deps`". Not caused by W12-β; unchanged from W10-β HEAD.
- **Impact**: Every `npm install` / `npm ci` must use `--legacy-peer-deps` until `unplugin-vue-markdown` ships a 30.x with vite-8 peer-range. CI workflows must include the flag.
- **F-scope-fit**: **FOLD-INTO-F** (as a small task) OR **NEW-OPPORTUNITY** (as part of a deps-housekeeping mini-wave). The clean resolution is to wait for unplugin-vue-markdown@30 and lift; the immediate workaround is to document the flag in CONTRIBUTING / README + verify CI uses it.

### §4.5 IRREGULARITY — no tranche branch + no value.js-side tranche document

- **Finding**: Per §2.5, the 8 commits were authored directly on `master` without a tranche branch, and there is no `docs/tranches/W8-W12.md` describing the wave. The authority lives entirely in `speedtest/docs/tranches/AI/AI.md` (the publisher repo).
- **Impact**: Value.js has no self-documentary record of what these 8 commits did, why they landed, what gates were checked, or what carries they introduced. The F-open audit triad (F-AUDIT-1/2/3) is the first such record. Future tranches with cross-repo consumer-lockstep waves risk repeating this gap.
- **F-scope-fit**: **NEW-OPPORTUNITY**. F's plan should (a) acknowledge the W8-W12 work in F.md or in a back-reference doc, AND (b) codify the cross-repo consumer-lockstep posture in the precepts (or in `docs/tranches/README.md`) — what counts as "needing a tranche document" vs "drive-by LOCKSTEP", and how value.js cross-references the publisher's authority. The cleanest expression: a one-page `docs/tranches/W8-W12-consumer-summary.md` back-referencing `speedtest/docs/tranches/AI/AI.md` + the 8 SHAs + the gate matrix in §3 above.

### §4.6 SEMANTIC SHIFT — sub-tranche naming convention

- **Finding**: The W-numbered scheme uses `W{n}-β` / `W{n}-{Letter}` / `W{n}-unblocker` suffixes. This is **distinct from E's `E.W{n}-lane-{x}` pattern**. The "β" = consumer-β (the secondary role in a publisher/consumer LOCKSTEP); the lane-letter (A/C/F/H) maps to AI's 8 W9 sub-lanes (A=vue-tsc, B=reka-ui, C=lucide-rename, D=vitest, E=pinia, F=@types-node, G=tailwind-merge, H=vaul-vue); the "-unblocker" is a derived-fix suffix.
- **Impact**: F's plan must decide: (a) adopt the W-numbered + sub-letter scheme for cross-repo consumer waves only, retain `F.W{n}-lane-{x}` for value.js-internal waves; OR (b) re-converge on a single naming scheme. Without an explicit decision, future tranches will mix-and-match unstably.
- **F-scope-fit**: **NEW-OPPORTUNITY**. F.md should codify the convention (or explicitly defer to a tranche-level decision).

---

## §5 — Net assessment

### §5.1 Was W8-W12 tranche-disciplined?

**PARTIAL — YES on contract, NO on structure.**

- The **contract** (per-commit body shape, gate evidence, no-legacy-shim posture, idiomatic gestalt fix in `e1549e0`) is exemplary. Each commit body is the level of detail a tranche-execution doc would carry.
- The **structure** (tranche branch + planning-at-open + close-merge ceremony + self-documentary record) is absent. The work proceeded as a drive-by lockstep against the speedtest publisher's authority.

### §5.2 Did it preserve E's invariants?

| Invariant | Verdict | Evidence |
|-----------|---------|----------|
| **E1** (architectural-transposition bar — "could this be elegantly transposed?") | **HOLDS** | `e1549e0` (dts unblocker) is the gestalt fix, not a workaround. Other commits are LOCKSTEP-grade and do not engage E1's lens. |
| **E2** ("NO legacy code") | **HOLDS** | No legacy-compat shims introduced. The `Github` icon gap is an EXPLICIT punt, not a silent shim. |
| **E3** (substrate-consumer-land-together) | **HOLDS for dep bumps** | Each LOCKSTEP commit body identifies its publisher (glass-ui canary commit SHAs cited). **PARTIAL HOLD** for the gh-pages Github gap — the W9-C consumer landed without the alias-hygiene substrate. |
| **E4** (no overfitting — public surface needs current consumer + evidence) | **HOLDS** | No new public surface added. |
| **E5** (chronic retirement triggers) | **HOLDS** | The `Github` gap is a NEW chronic carried-forward, but it is explicitly documented in commit bodies. F-AUDIT-2 will pick it up. |
| **D1-D7** (D-tranche invariants — pipeline / ownership / barrel-retirement / etc.) | **HOLDS** | No `api/` or `src/` work in the window. |
| **Precept 30** (KISS / DRY) | **HOLDS** | The `e1549e0` fix is 20 LoC of config; no abstractions. |
| **Precept 31** (Execute the plan; no stubs / shadow APIs / temporary compat layers) | **HOLDS** | No temporary compat. |
| **Precept 32** (Substrate + consumer land together) | **PARTIAL** | See E3 caveat. |
| **Precept 33** (No overfitting) | **HOLDS** | N/A — no new abstractions. |

### §5.3 Did it introduce new deferrals?

**YES — 2 new chronics**:

1. **`Github` icon gap** (W9-C explicit out-of-scope; broken `build:gh-pages`). F-AUDIT-2 picks up.
2. **`--legacy-peer-deps` install carry** (W10-β chronic; resolves when unplugin-vue-markdown@30 ships). F-AUDIT-2 picks up.

Both are documented in commit bodies; neither is silent.

### §5.4 Net impact

The W8-W12 window is a **healthy, well-executed cross-repo consumer-lockstep**. The library contract is preserved (zero `src/` runtime touches; all gates pass), the bench-gate hardening from E.W4 holds (3/3 benches above floor), the library bundle is now 11.7% smaller, vue-tsc has 6 fewer errors. The single in-window regression (`08a7f96` Vite 8 → dts layout TS7016) was caught + fixed (`e1549e0`) before F open. The single carried-forward regression (`build:gh-pages` `Github` gap) is documented and contained to demo / gh-pages — the published library is unaffected.

The headline gap is **STRUCTURAL discipline**, not contractual. F should (a) close the `Github` gap, (b) document the W8-W12 work in a back-reference page, (c) codify the cross-repo consumer-lockstep convention for future tranches.

---

## §6 — Recommendations for F's plan

1. **F.W{n} must close the standing `build:gh-pages` regression** by resolving the `Github` icon gap. Two demo files (`MobileMenuDropdown.vue:4` + `ProfileSection.vue:4`) import a removed brand icon. Preferred resolution: substitute with a non-brand alternative (`Code`, `ExternalLink`) and remove the `<Github />` glyph; or vendor an SVG. Smallest change-surface wins.
2. **F should author `docs/tranches/W8-W12-consumer-summary.md`** (or a similarly-named back-reference page) that pins the 8 SHAs, points to `speedtest/docs/tranches/AI/AI.md` for authority, captures the gate-matrix from §3 above, and documents the carries (Github gap + legacy-peer-deps). This is the value.js-side documentary record that does not currently exist.
3. **F should codify the cross-repo consumer-lockstep posture** in F.md or in `docs/precepts/instructions/tranche/SPEC.md`. Specifically: when does a constellation-wide wave warrant a tranche-branch + tranche-document, vs. when is direct-to-master with a strong commit-body sufficient? The 8 W8-W12 commits illustrate the second pattern; the precepts should sanction it (or reject it) explicitly.
4. **F should verify the Vite 8 + Rolldown dts-layout fix is consumed downstream**. The W12-unblocker (`e1549e0`) targets keyframes.js + words/frontend + bbnf-buddy as the typed-consumer set. F.W{n} should run a probe across each peer: `npm install @mkbabb/value.js@latest` + `tsc --noEmit` against an import-site, confirming TS7016 does not surface.
5. **F should decide the sub-tranche naming convention**: adopt the AI-style `W{n}-β` / `W{n}-{letter}` for cross-repo consumer waves; retain `F.W{n}-lane-{x}` for value.js-internal waves; OR re-converge on a single scheme. Document the decision in F.md §1.
6. **F may opt to publish v0.7.1** that ships the W10-β bundle-size improvement (124,988 B vs 141,472 B) as a patch release. Alternative: fold into the v0.8.0 cut alongside F's substantive work. Either is sound; the choice is a F-plan decision.
7. **F should resolve the `--legacy-peer-deps` carry** when `unplugin-vue-markdown` ships a `^30.x` with `vite ^8` in peer-range. F.W{n} can re-probe periodically; this is a small task with a clear resolution criterion.

---

## §7 — Authority

Commit SHAs pinned:

- **E close**: `47399c2` (Merge tranche-e into master — Tranche E close (v0.7.0)).
- **F open HEAD**: `e1549e0` (fix(library/W12-unblocker): emit dts at flat dist/ layout via entryRoot: src).
- **W8-W12 commit set** (newest-first):
  - `e1549e0` fix(library/W12-unblocker): emit dts at flat dist/ layout
  - `9f56813` chore(library/W12-β): TypeScript 5 → 6
  - `08a7f96` feat(library/W10-β)!: Vite 7 → 8 + Rolldown
  - `209584c` chore(library/W9-F+W9-H): lift @types/node + vaul-vue
  - `02ed508` chore(library/W9-C): rename lucide-vue-next → @lucide/vue
  - `442aba1` chore(library/W9-A): lift vue-tsc 2 → 3
  - `4cd8d15` chore(library/W8-β): 23-devDep SAFE-PATCH + SAFE-MINOR sweep
  - `1fafd5d` chore(library/W8-β): npm install re-baseline

Audit deliverables consulted:

- `docs/tranches/E/FINAL.md` — E close report; pin §1, §2, "AI tranche §11 constellation expansion" framing.
- `docs/tranches/E/E.md` — E open document; line 8 (speedtest peer + AI tranche posture).
- `docs/tranches/E/PROGRESS.md` — E wave-by-wave log; line 45 + 62 (cross-repo coordination at AI tranche state).
- `docs/tranches/E/audit/E-AUDIT-4-cross-repo-state.md` — full AI tranche structure recap; lines 80-140 (AI scope + recent ships + RD-cohort).
- `docs/tranches/E/audit/E-FOLD-1-speedtest-assay.md` — the most thorough pre-W8-W12 forensic on the AI tranche (W8-CR-β / W9-A / W9-B / W9-D / W9-F naming attestation; the source of the "consumer-β" framing).
- `docs/tranches/F/audit/F-AUDIT-1-prompts-precepts.md` — F-AUDIT-1's already-completed take on the W8-β..W12-β window; line 36 (cross-repo origin attestation) + line 193 (window net-assessment).

Gate commands executed live (HEAD `e1549e0`, 2026-05-20 23:40-23:45 EDT):

- `git log -1 --format=%H` → `e1549e0d309c31b4e977765d7c7a02fc67987078` (HEAD verified).
- `npm run lint` → exit 0.
- `npx vue-tsc --noEmit | grep -c 'error TS'` → 120.
- `npx vitest run` → 1584 / 34 files PASS.
- `npm run build` → clean; `dist/value.js` 124,988 B / 38.36 kB gzip; dts emit at `dist/index.d.ts` (5,201 B, flat layout).
- `npm run proof:resolution` → PASS.
- `node bench/color-channel-access.mjs` → L8 median 13.37× (gate ≥ 5×) PASS.
- `node bench/color2-direct-paths.mjs` → HSL→RGB median 4.32× (gate ≥ 2×) PASS.
- `node bench/parser-namelookup.mjs` → median 37.34× (gate ≥ 5×) PASS.
- `(cd api && npx tsc --noEmit)` → exit 0.
- `(cd api && npx vitest run)` → 104 / 20 files PASS.
- `npm run build -- --mode gh-pages` → **FAIL** with `[MISSING_EXPORT] "Github" is not exported by "node_modules/@lucide/vue/dist/esm/lucide-vue.mjs"`.
- Playwright (gate #13): SKIPPED — long-running; verified-at-E-close + CI gates post-merge.

Branch reflog inspected:

- `git reflog` HEAD@{0}..HEAD@{12} confirms direct-to-master authoring of all 8 W8-W12 commits (no tranche branch + merge ceremony).
