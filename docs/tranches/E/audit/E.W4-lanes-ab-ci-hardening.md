# E.W4 Lanes A + B — Benchmark CI gate + CI hardening (combined)

**HEAD**: `f1d2005214465d34aa05d5457ac63c4df805c563` (branch `tranche-e`)
**Date**: 2026-05-20
**Lanes**: E.W4 Lane A (benchmark CI gate) + E.W4 Lane B (CI hardening) — **combined** because both lanes edit `.github/workflows/node.js.yml` + `package.json`.
**Per**:
- `docs/tranches/E/waves/E.W4.md` Lane A (lines 13-38) + Lane B (lines 41-62).
- `docs/tranches/E/audit/E-AUDIT-6-api-e2e-cross-cutting.md §7` (CI review) + `§10 Tier-1 #5` (bench gate) + `§10 Tier-2 #7-8` (Playwright cache + Node 22 matrix + WebKit project).

## §1 — Pre-state CI

`.github/workflows/node.js.yml` pre-state (50 LoC, 2 jobs):

- **`test` job** (Node 24, ubuntu-latest, 10-min timeout):
    - `actions/checkout@v4`
    - `actions/setup-node@v5` (node 24, npm cache)
    - `npm ci`
    - `npm run lint`
    - `npx vitest run`
    - `npx playwright install --with-deps chromium`
    - `npx playwright test --project=smoke --project=smoke-admin --project=smoke-mobile`
- **`deploy` job** (gh-pages on master push): unchanged; checkout main + sibling glass-ui → setup-node 24 → `npm ci` → `npm run gh-pages` → copy CNAME → `peaceiris/actions-gh-pages@v4`.

**Missing items per E-AUDIT-6 §7** (now closed by Lanes A + B):

| Audit finding | Pre-state | Post-state |
|---|---|---|
| §7.2 — no `vue-tsc --noEmit` typecheck step | missing | added (count assertion <= 126) |
| §7.2 — no library build verification | missing | `npm run build` + log dist sizes |
| §7.2 — no CHANGELOG-changed gate | missing | PR-only gate |
| §7.2 — no benchmark gate | missing | three-bench gate (Lane A) |
| §7.2 — no api/ backend test step | missing | `cd api && npm install && npm test` |
| §7.2 — no `proof:resolution` step | missing | PASS-required (informational at fleet level) |
| §7.3 — no Playwright browser cache | re-downloads ~150 MB per run | `actions/cache@v4` keyed on package-lock.json |
| §7.4 — Node 24 only | single Node 24 | matrix Node 22 + 24 |
| §7.4 — no WebKit | chromium only | chromium + webkit; smoke-safari project wired |
| `playwright.config.ts §smoke-reactivity` (E.W3) | not wired | runs as part of `npx playwright test` (no `--project=` flags now) |

**npm scripts pre/post**:

| Script | Pre-state | Post-state |
|---|---|---|
| `bench` | (none) | `node bench/color-channel-access.mjs && node bench/color2-direct-paths.mjs && node bench/parser-namelookup.mjs` |

No other script churn — pre-state already had `proof:resolution`, `typecheck`, `lint`, `test`, `test:e2e`, `build`, `gh-pages`, `codemod:keyframes-lerp`.

## §2 — Lane A: Bench gate

### §2.1 — `npm run bench` script (verbatim from `package.json:scripts`)

```jsonc
"bench": "node bench/color-channel-access.mjs && node bench/color2-direct-paths.mjs && node bench/parser-namelookup.mjs"
```

Sequential — each bench self-asserts its target (exit non-zero on regression) so the `&&` chain short-circuits on the first regression. The CI assertion step provides redundant + visible named CI assertions for each gate.

### §2.2 — CI bench-gate step shape

Two CI steps:

```yaml
- name: Run benchmarks (npm run bench)
  run: npm run bench | tee bench-output.txt

- name: Assert bench gates (L8 >= 5x, HSL->RGB >= 2x, nameParser >= 5x)
  run: |
      set -euo pipefail
      L8_MEDIAN=$(grep -E 'median speedup:[[:space:]]+[0-9.]+' bench-output.txt \
          | head -1 \
          | grep -oE '[0-9]+\.[0-9]+')
      DIRECT_MEDIAN=$(grep -E 'hsl.*median:.*\[GATING\]' bench-output.txt \
          | head -1 \
          | grep -oE '[0-9]+\.[0-9]+' \
          | head -1)
      PARSER_MEDIAN=$(grep -E 'median speedup:[[:space:]]+[0-9.]+' bench-output.txt \
          | sed -n '2p' \
          | grep -oE '[0-9]+\.[0-9]+')
      # ...assertions with awk floating-point compare...
```

### §2.3 — Output-format reconnaissance (driver of the parsing strategy)

The three bench scripts use **different** label vocabularies for their median lines (a real concern called out in the dispatch contract). Empirically captured from running each locally on Node 24:

- **bench/color-channel-access.mjs** (L8): `  median speedup:    NN.NN×`
- **bench/color2-direct-paths.mjs** (DIRECT_PATHS, three pairs; HSL→RGB is the GATING one):
    - `  hsl→rgb   median:            NN.NN×    [GATING]`
    - `  oklab→rgb median:            NN.NN×`
    - `  oklch→rgb median:            NN.NN×`
- **bench/parser-namelookup.mjs**: `  median speedup:    NN.NN×`

**Disambiguation strategy**:

1. `L8_MEDIAN`: first occurrence of `median speedup:` — bench order in `npm run bench` runs L8 first.
2. `DIRECT_MEDIAN`: line containing `[GATING]` — only the canonical hot-path proxy is gated.
3. `PARSER_MEDIAN`: second occurrence of `median speedup:` — parser-namelookup runs third in the chain.

Local dry-run against `/tmp/bench-output.txt`:

| Median | Extracted | Gate | Verdict |
|---|---|---|---|
| L8 | 12.24× | ≥ 5× | PASS |
| HSL→RGB DIRECT | 4.28× | ≥ 2× | PASS |
| nameParser | 37.92× | ≥ 5× | PASS |

### §2.4 — Assertion logic (pseudocode)

```
for (name, value, gate) in [(L8, L8_MEDIAN, 5), (DIRECT, DIRECT_MEDIAN, 2), (PARSER, PARSER_MEDIAN, 5)]:
    if value is empty:
        ::error:: extraction failed
        fail = 1
    elif awk '(value < gate)':
        ::error:: {name} regressed: {value}x (gate >= {gate}x)
        fail = 1
if fail: exit 1
```

`awk -v m=… 'BEGIN{exit !(m < gate)}'` is the portable float-compare; `bc -l` requires the `bc` package and is less universal across Actions runner images.

## §3 — Lane B: CI hardening

| Item | Disposition | Notes |
|---|---|---|
| vue-tsc step | **added** | Captures error count; asserts `count <= 126`. Rise FAILS the build; drop emits a `::notice::` (informational). Baseline per `VENDOR-POLICY.md` (E.W4 Lane C). |
| Library build (`npm run build`) | **added** | Plus `ls -la dist/ | head -20` for size visibility. |
| Backend tests (api/) | **added** | `cd api && npm install && npm test`. mongodb-memory-server runs ephemerally — no external service required. |
| `proof:resolution` step | **added** | PASS-required (GREEN at HEAD). The D.W1 disposition framed it as fleet-coordination, but for a single-repo CI on this branch it passes cleanly + provides visibility. |
| CHANGELOG-changed gate | **added; PR-only** | `if: github.event_name == 'pull_request'`. Diffs against `origin/${{ github.base_ref }}`; if any `^src/` path is touched, asserts `^CHANGELOG.md$` is also touched. Skipped on master push. |
| Playwright browser cache | **added** | `actions/cache@v4`, key `playwright-<os>-<package-lock hash>`. Bumps to `@playwright/test` bust the cache automatically. |
| WebKit installed | **added** | `npx playwright install --with-deps chromium webkit` on cache miss; `npx playwright install-deps` on cache hit (system deps refresh). |
| Node 22 + 24 matrix | **added** | `strategy.matrix.node: [22, 24]`, `fail-fast: false`. Covers the `engines.node: >=22` floor + current LTS. |
| `smoke-safari` project | **added** | `npx playwright test` with no `--project=` flag runs all 5 projects (smoke + smoke-admin + smoke-mobile + smoke-reactivity + smoke-safari) per `playwright.config.ts`. |
| Playwright report artifact | **added** | `actions/upload-artifact@v4`, retention 7 days, named per Node version. |
| Deploy gating | **tightened** | `deploy` job now `needs: build-and-test`, so a failing matrix blocks gh-pages deploy (pre-state ran them independently). |

## §4 — Local verification

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| YAML parse (`python3 yaml.safe_load`) | parses | parses (2 jobs, 18+7 steps) | PASS |
| `npm run bench` exit | 0 | 0 | PASS |
| L8 median (color-channel-access) | ≥ 5× | **12.24×** | PASS |
| DIRECT_PATHS HSL→RGB median | ≥ 2× | **4.28×** | PASS |
| nameParser median | ≥ 5× | **37.92×** | PASS |
| `npx vue-tsc --noEmit` error count | 126 | **126** | PASS (baseline match) |
| `npm run build` | clean | clean (3.05s) | PASS |
| `npm run lint` | exit 0 | exit 0 | PASS |
| `npx vitest run` | 1584+ green | **1584/1584** in 3.90s | PASS |
| `cd api && npm test` | 104 green | **104/104** in 9.91s | PASS |
| `npm run proof:resolution` | PASS | PASS | PASS |

Bench-assertion-step dry-run against `/tmp/bench-output.txt`:

```
L8=12.24      gate>=5    PASS
DIRECT=4.28   gate>=2    PASS
PARSER=37.92  gate>=5    PASS
```

Playwright run was not exercised locally in this lane (the 5-project run is a CI/long-running fixture; smoke is documented GREEN at HEAD per E.W4 Lane C §5 — 36/36).

`act` was unavailable locally; YAML structural validation done with `python3 -c "import yaml; yaml.safe_load(...)"` confirming 2 top-level jobs (`build-and-test`, `deploy`) + 18 + 7 steps respectively. Full CI validation lands on first push.

## §5 — Files modified

- `/Users/mkbabb/Programming/value.js/.github/workflows/node.js.yml` — full rewrite (pre 50 LoC → post 232 LoC, structured into matrix `build-and-test` job + `deploy` job gated on its success).
- `/Users/mkbabb/Programming/value.js/package.json` — one new script line: `"bench"` between `codemod:keyframes-lerp` and `typecheck`.
- `/Users/mkbabb/Programming/value.js/docs/tranches/E/audit/E.W4-lanes-ab-ci-hardening.md` — this file (new).

## §6 — E.W4 Lanes A + B sub-gate verdict

**PASS**.

Sub-gate A (per `E.W4.md` lines 36-38):
- `npm run bench` exits 0; outputs medians for all 3 benchmarks: **PASS**.
- CI step asserts ≥ 5× for L8, ≥ 2× for DIRECT_PATHS (HSL→RGB), ≥ 5× for nameParser: **PASS**.

Sub-gate B (per `E.W4.md` lines 56-61):
- `.github/workflows/node.js.yml` runs `npm run lint`, `vue-tsc --noEmit`, `npm run build`, `vitest run`, `cd api && npm test`, `npm run proof:resolution`, `npm run bench`, `playwright test` (5 projects): **PASS**.
- Node 22 + Node 24 matrix: **PASS**.
- Playwright browser cache key includes the package-lock.json hash: **PASS**.
- CHANGELOG-changed gate added (PR-only): **PASS**.

Local verification across all five primary gates (lint, vue-tsc=126, build, vitest=1584/1584, api=104/104, proof:resolution, bench triple-PASS) is GREEN. Full CI validation lands on first push to `tranche-e`.
