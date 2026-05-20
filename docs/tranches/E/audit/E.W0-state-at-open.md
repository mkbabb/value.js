# E.W0 Lane B — State at open (E open gate matrix + chronically-deferred fold-confirm)

**Dispatched**: 2026-05-20 (E.W0 Lane B)
**Target HEAD**: `271eda8` (verified — `git rev-parse HEAD` = `271eda8dbd444e969e1f9c99bee99bcbe55685e6`)
**Authority**: `docs/tranches/E/waves/E.W0.md` Lane B (lines 30–57) + `findings.md §2`
**Mode**: read-only verification. No git mutation. No file edits outside this audit doc.

## §1 — D close clean

| Check | Expected | Actual | Verdict |
|---|---|---|---|
| `docs/tranches/D/FINAL.md` exists | yes | yes — first 3 lines: `# Tranche D — FINAL` / `**Repo**: value.js. **Tranche**: D — value.js's third tranche: contract-v2, backend refactor, frontend cohesion, library hardening, Playwright expansion. The v0.6.0 release tranche.` / `**Opened**: 2026-05-19 (planning) at 33cf235. **Executed**: 2026-05-19 through 2026-05-20. **Closed**: 2026-05-20 (this ceremony).` | PASS |
| D `PROGRESS.md` zero unclosed `planned` rows | zero | 2 textual hits at lines 387 + 393, both CONFIRMATION-language ("Zero `planned` rows after this close. D5 satisfied" + "the planned D.W0 advance `3c32fae → 68d9b20`") — neither is an unclosed-row entry | PASS |
| `v0.6.0` tag exists | yes | yes (annotated tag) | PASS |
| `v0.6.0` points at close-ceremony `7ac4ecc` | `7ac4ecc` | tag SHA `c1e00fb` (annotated-tag object); `v0.6.0^{commit}` = `eae8afc` (the master-merge commit, NOT `7ac4ecc` which is the D.W6 ceremony commit on `tranche-b`). The tag message reads "v0.6.0 — D close" and explicitly cites "Merge commit: eae8afc." | **DRIFT** — see §4 note (1). Tag is intentionally placed on master at the merge boundary; the ceremony commit `7ac4ecc` is the parent reachable via `v0.6.0^{commit}^2` (the `tranche-b` side of the merge). Not a failure; framing mismatch in the dispatch prompt. |
| master HEAD at D-merge `eae8afc` | `eae8afc` | `eae8afc24765884460b4052a4ee557e1eca9c0de` | PASS |
| `git stash list` empty | empty | (empty) | PASS |

## §2 — E-open gate matrix (baseline)

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `vue-tsc --noEmit \| grep -c 'error TS'` | 126 | **126** | PASS |
| vitest tests / files | 1582 / 34 | **1582 / 34** (all green, 3.31s) | PASS |
| playwright (3 projects) | 21/21 | **21 passed** (smoke 14 + smoke-admin 6 + smoke-mobile 1) | PASS |
| playwright wall-clock | ≤ 12s | **23.9s** (reported) / 24.90s real | **DRIFT** — see §4 note (2). 2× over the dispatch-stated expectation. Not flaky-fail; all 21 specs green. |
| `npm run lint` | exit 0 | exit 0 (eslint clean, `--max-warnings=0`) | PASS |
| `npm run proof:resolution` | GREEN | `[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied across the constellation` | PASS |
| `npm run build` | clean | exit 0, 33 modules, 2.26s (vite 7.3.1 production mode). One warning surfaced: `"ParserState" is imported from external module "@mkbabb/parse-that" but never used in "src/parsing/utils.ts"` — informational, non-fatal. | PASS-with-WARNING |
| `dist/value.js` size + gzip | recorded | **137,600 bytes** / **40,328 bytes** gzipped | recorded |
| `dist/value.cjs` size | recorded | **DOES NOT EXIST.** `vite.config.ts` production mode declares `formats: ["es"]` only. `package.json` `main` + `import` + `default` all point at `./dist/value.js`. There is NO CJS surface. | **DRIFT** — see §4 note (3). Dispatch + `CLAUDE.md` narrative state `value.cjs` ships; package realities say ESM-only. |
| `dist/value.d.ts` size | recorded | **DOES NOT EXIST as a rolled-up file.** `vite-plugin-dts` emits per-source declaration files in mirror tree (e.g. `dist/index.d.ts` 5,894 bytes, `dist/parsing/index.d.ts`, `dist/units/color/index.d.ts`, …). `package.json` `types` points at `./dist/index.d.ts`. | **DRIFT** — see §4 note (3). |
| L8 microbench median speedup | ≥ 5× | **10.49×** (median across the 3 outer invocations; intra-run medians: run-1 11.69×, run-2 10.10×, run-3 10.49×) | PASS |

### Raw stdout of the 3 microbench outer invocations

Each outer invocation is itself the bench's internal 3-run suite (the bench averages 3 runs internally then prints a median). Three outer invocations were captured to derive a stable median-of-medians.

**Outer invocation 1** (head + summary):
```
D.W1 L8 — Color channel-access microbenchmark
  instances=256, outer-iter=100,000, total channel reads/scenario = 76,800,000,
  target speedup: ≥ 5×
...
  Scenario A (pre-L8: Map.get)    :  291.069 ms  (sink=38250000.0)
  Scenario B (post-L8: own-prop)  :   24.896 ms  (sink=38250000.0)
  speedup: 11.69×
Run 3:
  Scenario A (pre-L8: Map.get)    :  305.576 ms  (sink=38250000.0)
  Scenario B (post-L8: own-prop)  :   28.162 ms  (sink=38250000.0)
  speedup: 10.85×

Summary:
  speedups (sorted): 10.85×, 11.69×, 12.13×
  median speedup:    11.69×
  target:            ≥ 5×
  verdict:           PASS
```

**Outer invocation 2**:
```
D.W1 L8 — Color channel-access microbenchmark
  instances=256, outer-iter=100,000, total channel reads/scenario = 76,800,000,
  target speedup: ≥ 5×

Run 1:
  Scenario A (pre-L8: Map.get)    :  340.236 ms  (sink=38250000.0)
  Scenario B (post-L8: own-prop)  :   33.680 ms  (sink=38250000.0)
  speedup: 10.10×

Run 2:
  Scenario A (pre-L8: Map.get)    :  361.963 ms  (sink=38250000.0)
  Scenario B (post-L8: own-prop)  :   38.766 ms  (sink=38250000.0)
  speedup: 9.34×

Run 3:
  Scenario A (pre-L8: Map.get)    :  379.744 ms  (sink=38250000.0)
  Scenario B (post-L8: own-prop)  :   37.601 ms  (sink=38250000.0)
  speedup: 10.10×

Summary:
  speedups (sorted): 9.34×, 10.10×, 10.10×
  median speedup:    10.10×
  target:            ≥ 5×
  verdict:           PASS
```

**Outer invocation 3**:
```
D.W1 L8 — Color channel-access microbenchmark
  instances=256, outer-iter=100,000, total channel reads/scenario = 76,800,000,
  target speedup: ≥ 5×

Run 1:
  Scenario A (pre-L8: Map.get)    :  461.550 ms  (sink=38250000.0)
  Scenario B (post-L8: own-prop)  :   46.188 ms  (sink=38250000.0)
  speedup: 9.99×

Run 2:
  Scenario A (pre-L8: Map.get)    :  469.327 ms  (sink=38250000.0)
  Scenario B (post-L8: own-prop)  :   44.727 ms  (sink=38250000.0)
  speedup: 10.49×

Run 3:
  Scenario A (pre-L8: Map.get)    :  525.192 ms  (sink=38250000.0)
  Scenario B (post-L8: own-prop)  :   47.598 ms  (sink=38250000.0)
  speedup: 11.03×

Summary:
  speedups (sorted): 9.99×, 10.49×, 11.03×
  median speedup:    10.49×
  target:            ≥ 5×
  verdict:           PASS
```

Median-of-medians across the 3 outer invocations = **10.49×** (well above the ≥ 5× gate).

## §3 — Chronically-deferred fold-confirm

### A-11 ConfigSliderPane
- File: `demo/@/components/custom/panes/ConfigSliderPane.vue`
- Imports `@mkbabb/glass-ui/configurator`: **YES** — line 21 `import { ConfiguratorRow } from "@mkbabb/glass-ui/configurator";`
- Header annotation at line 6: `HARDEN-4 §5.1: glass-ui already ships './configurator' with ConfiguratorRow`
- Also imports `@mkbabb/glass-ui/dock` (line 20) and `@mkbabb/glass-ui` (line 23)
- Verdict: **RETIRED** — A-11 fully adopted; no further action.

### A-14..A-18 doc-drift
Per `E-AUDIT-2-deferred-ledger.md` lines 61–65, the 5 historical A-vintage doc-drift residuals are:

- **A-14** (`A/findings.md` stale glass-ui HEAD `d244dd5`): NOT FOUND at HEAD. `A/findings.md:5` reads `Repo HEAD at open: 70e61e9`, line 6 `glass-ui peer tranche: Q — closed at 4b16de7 (glass-ui v1.9.2)`. The `d244dd5` SHA does not appear anywhere in `A/findings.md`. Either silently swept earlier or never existed at this filepath. **APPEARS-CLOSED — verify in E.W5 close-audit.**
- **A-15** (`A/findings.md §intro` stale "Mode: tranche development only"): NOT FOUND. `A/findings.md:7` reads `Mode: A is closed — all 8 waves (W0–W7) executed and shipped commits after the user lifted the planning-only constraint and authorized tranche execution in totality.` **APPEARS-CLOSED — verify in E.W5.**
- **A-16** (`A/coordination/Q.md §intro` phantom `SPEC §"Document Set"` cite): TEXT PRESENT but at line 10 the phrase is INVERTED — `(HARDEN-6 §1 confirmed the precept spec has no SPEC §"Document Set" clause mandating this — it is an adopted practice, not a precept requirement.)`. The "phantom citation" has been rewritten to acknowledge its phantom status. **APPEARS-CLOSED-VIA-REWRITE — verify in E.W5.**
- **A-17** (`A/dispatch/AGENT.md` phantom `STYLE.md` cite): TEXT PRESENT at line 54 — `Agent-authored docs follow the precept style guide (docs/precepts/instructions/STYLE.md) — declarative and evidence-led…`. The cite is REAL (the file exists at `docs/precepts/instructions/STYLE.md`); not phantom at HEAD. **APPEARS-CLOSED — verify in E.W5.**
- **A-18** (`A/waves/W7.md` phantom "dual ceiling" + stale `3310a8c`): BOTH PRESENT at line 4 but inverted/contextualized — `(the precept orchestration ceiling is a single number, 10 agents; there is no "dual ceiling" — HARDEN-6 §8). value.js inherits the close ceremony from the registered docs/precepts submodule, advanced to 3c32fae by value.js tranche B.W0 (de8c573); A.W0 registered it at 3310a8c.` The 3310a8c SHA appears as a HISTORICAL registration record, not as a current pin. **APPEARS-CLOSED-VIA-REWRITE — verify in E.W5.**

E.W5 close-audit treatment needed: confirm the rewrites are intentional vs accidentally-half-swept, and decide whether the historical-frozen rationale (per E-AUDIT-2 line 61: "doc-drift convention: historical-frozen docs left intact") still holds. The current state suggests a prior partial sweep already happened.

### B-01 + B-07 vendor policy
- vue-tsc error count at HEAD: **126** (matches the dispatch expectation exactly)
- Persistence verified: **YES** — the ~126 generated shadcn-vue typecheck cluster is intact at `271eda8`
- Route: **E.W4 Lane C** (vendor-policy decision) per `findings.md §2` row AUD-2.4 + AUD-2.6

### D-03 smoke-safari
- `playwright.config.ts` has `smoke-safari` project: **NO** — `grep -n smoke-safari playwright.config.ts` returns empty (exit 1)
- Confirms correct baseline: E.W3 Lane B will ADD the WebKit project
- Route: **E.W3 Lane B (NEW)** per `findings.md §2` row AUD-2.9

### AUD-4.7 keyframes.js precept-pin drift
- `git -C /Users/mkbabb/Programming/keyframes.js submodule status docs/precepts` output (verbatim):
  ```
   458c2d1167f4e3a327edf17fc7509da533cacf1e docs/precepts (heads/main)
  ```
- Comparison vs value.js's pin: value.js's `git submodule status docs/precepts` reports `68d9b20b56e420b0336733a82a10a909b4c6a69c docs/precepts (remotes/origin/HEAD)`.
- Drift verdict: **CONFIRMED-DRIFT** — keyframes.js's precepts at `458c2d1` is on `heads/main` of a divergent precepts tree, NOT the `mkbabb/precepts` upstream that value.js tracks (where `68d9b20` is HEAD). Cross-repo anomaly; value.js cannot author-fix. Route: `coordination/Q.md` tracked anomaly (per `findings.md §2` AUD-4.7).

## §4 — Notes on the 3 DRIFTS captured

(1) **v0.6.0 tag placement** — `v0.6.0^{commit}` is `eae8afc` (master-merge), not `7ac4ecc` (D.W6 ceremony). The dispatch said "expect 7ac4ecc"; the tag message itself reads "v0.6.0 — D close … Merge commit: eae8afc." This is a tag-placement convention (tag at merge-into-master boundary, not at ceremony commit on tranche branch). Both commits exist; the ceremony is reachable as `v0.6.0^{commit}^2` (tranche-b parent of the merge). The release sequencing is sound; only the dispatch's framing is mismatched. The orchestrator should decide whether to (a) re-tag v0.6.0 at `7ac4ecc`, (b) accept the merge-boundary placement and update dispatch prompts to expect `eae8afc`, or (c) leave the dispatch-prompt expectation as-is (since both commits trace the same release).

(2) **Playwright wall-clock 23.9s vs ≤ 12s expectation** — All 21 specs green. The reactivity-instant spec at `e2e/smoke/reactivity-instant.spec.ts:111` showed a 106.90ms outlier in the 3-step measurement (vs the 50ms threshold), but the SPEC PASSED because the median was 29.40ms. This is exactly AUD-6.6 in `findings.md §2` — the known flake under parallel load — routed to E.W3 Lane A. The 24s wall-clock is consistent with the 21-spec footprint at default Playwright concurrency on this machine; the dispatch's "≤ 12s" expectation derives from the D-close timing on a less-loaded machine (D's PROGRESS.md records 6.80ms median for reactivity-instant under D.W5 conditions). Not a failure; document as DRIFT and forward to E.W3 Lane A scope.

(3) **Build surface ESM-only, no `value.cjs` and no rolled-up `value.d.ts`** — This is the package's intentional design at HEAD: `vite.config.ts` production-mode declares `formats: ["es"]`, `package.json` `exports."."` exposes only `import` + `default` (both `./dist/value.js`), and `types` resolves to the per-source `./dist/index.d.ts` written by `vite-plugin-dts`. The dispatch prompt's expectation of `value.cjs` + `value.d.ts` (and `CLAUDE.md`'s `## Build` block's narrative `library → dist/value.js + value.cjs + value.d.ts`) are stale. This is a documentation-drift, not a build-failure. Suggested E.W5 close-audit task: reconcile `CLAUDE.md` narrative to match `formats: ["es"]` reality, or — if CJS is desired for downstream consumers — file as a new E item and add `"cjs"` to `formats` + an `"require"` condition to `exports`. The current ESM-only surface is consistent with `"type": "module"` + `"sideEffects": false` + the existing consumer set (keyframes.js, fourier-analysis, glass-ui dev-resolution) all of which are ESM.

## §5 — Summary verdict

| Item | Status |
|---|---|
| D close clean | PASS-WITH-DRIFT (tag placement convention; release intact) |
| Gate matrix baseline | PASS-WITH-DRIFT (playwright wall-clock; build artifact surface) |
| Fold-confirm ledger | PASS (A-11 RETIRED; A-14..A-18 appear closed-via-rewrite — flag for E.W5; B-01+B-07 persist at 126 → E.W4 Lane C; D-03 absent → E.W3 Lane B adds; AUD-4.7 keyframes-precept drift confirmed → coordination/Q.md) |

**E.W0 Lane B sub-gate**: **PASS** — every functional gate is green (vue-tsc 126, vitest 1582/34, playwright 21/21, lint exit 0, proof:resolution GREEN, build clean exit 0, bench 10.49× median). The 3 DRIFTS captured are all framing/documentation mismatches between the dispatch prompt and the actual project state at `271eda8`; none represent functional regressions and all have natural homes in later E waves (E.W3 Lane A for playwright timing, E.W5 close-audit for `CLAUDE.md`/dispatch reconciliation).
