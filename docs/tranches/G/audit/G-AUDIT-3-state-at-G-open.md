# G-AUDIT-3 — State at G open

> Read-only audit. Captures the FULL state of value.js at the moment of G
> open (post-F merge). Analogue of F-AUDIT-3 (W8-W12 drift audit) for the
> post-F window. Verifies that every F gate held post-merge, no regressions
> were introduced by the F merge, and no inadvertent drift slipped in
> between F close and master HEAD `6b3a41b`.

**Repo**: `/Users/mkbabb/Programming/value.js`
**Branch**: `tranche-g` (just branched off `master`)
**HEAD**: `6b3a41b` (= origin/master = `v0.8.0`)
**F close artefact**: `docs/tranches/F/FINAL.md` (especially §5 gate matrix
+ §8 performance + §9 visual-runtime).
**F close-audit lanes**: `docs/tranches/F/audit/F.W4-lane-1..7-*.md`.

---

## §1 — HEAD + branch + tag verification

| Probe                                         | Expectation     | Captured                                     |
| --------------------------------------------- | --------------- | -------------------------------------------- |
| `git branch --show-current`                   | `tranche-g`     | `tranche-g`                                  |
| `git log -1 --oneline`                        | `6b3a41b` merge | `6b3a41b Merge tranche-f into master — …`    |
| `git log --oneline master..tranche-g`         | (empty)         | (empty)                                      |
| `git tag -l v0.8.0`                           | exists          | `v0.8.0`                                     |
| `git rev-list -n 1 v0.8.0`                    | `6b3a41b…`      | `6b3a41bb5784df7491b6dc24851a64d20723946d`   |
| `git ls-remote --tags origin \| grep v0.8.0`  | present         | `6b3a41b…  refs/tags/v0.8.0^{}` (annotated)  |
| `git fetch origin` + `git log master..origin/master --oneline` | empty | empty (nothing new on origin since our push) |
| `git status --short`                          | only `C/` untracked | `?? docs/tranches/C/`                    |
| `cat package.json \| jq -r .version`          | `0.8.0`         | `0.8.0`                                      |

**Verdict**: PASS — HEAD, tag, remote, and branch state all match the F
close ceremony exactly. `tranche-g` is a zero-commit branch off `master`
at the merge commit.

---

## §2 — Gate matrix re-verification (16 items)

The 14-item F.W4 pre-merge gate matrix, expanded to 16 by including
api-vitest (gate 16) and the spec-count probe baked into F.W4 Lane 6.

| #  | Probe                                                                 | F close expectation         | Captured at HEAD `6b3a41b`             | Verdict |
|----|-----------------------------------------------------------------------|-----------------------------|----------------------------------------|---------|
| 1  | `npm run lint`                                                        | exit 0                      | exit 0 (eslint, `--max-warnings=0`)    | PASS    |
| 2  | `npx vue-tsc --noEmit 2>&1 \| grep -c 'error TS'`                     | 0                           | 0                                      | PASS    |
| 3  | `npx vitest run` (Test Files / Tests)                                 | 34 files / 1584 tests       | **34 files / 1584 tests** passing      | PASS    |
| 4  | `npm run build`                                                       | clean                       | `✓ built in 735ms`, no errors          | PASS    |
| 5  | `stat -f%z dist/value.js`                                             | 124,936 bytes               | **124,936 bytes** (byte-identical)     | PASS    |
| 6  | `npm run gh-pages`                                                    | clean                       | `✓ built in 996ms`, no errors          | PASS    |
| 7  | `npm run proof:resolution`                                            | GREEN                       | `[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied` | PASS |
| 8  | `npm run proof:dts-layout`                                            | PASS                        | `[proof:dts-layout] PASS — flat dist/ dts emission` | PASS |
| 9  | `grep -rn '@deprecated' src/ \| wc -l`                                | 0                           | 0                                      | PASS    |
| 10 | `grep -rn '@ts-ignore' src/ \| wc -l`                                 | 0                           | 0                                      | PASS    |
| 11 | `grep -rn 'lerpLegacy' src/ test/ dist/ \| wc -l`                     | 0                           | 0                                      | PASS    |
| 12 | `git submodule status docs/precepts`                                  | `68d9b20`                   | `68d9b20b56e420b0336733a82a10a909b4c6a69c docs/precepts (remotes/origin/HEAD)` | PASS |
| 13 | `node bench/color-channel-access.mjs` (L8) median                     | ≥ 5× (F close: 10.66×)      | **10.38×**                             | PASS    |
| 14 | `node bench/color2-direct-paths.mjs` HSL→RGB median (gating)          | ≥ 2× (F close: 7.51×)       | **4.56×**                              | PASS    |
| 15 | `node bench/parser-namelookup.mjs` median                             | ≥ 5× (F close: 38.23×)      | **41.68×**                             | PASS    |
| 16 | `cd api && npx vitest run` (Test Files / Tests)                       | 20 files / 104 tests        | **20 files / 104 tests** passing       | PASS    |

**Auxiliary**: `find e2e/smoke -name '*.spec.ts' \| wc -l` → **35** files
(matches F close expectation; full Playwright run skipped per F.W4 Lane 6
environmental-flake finding — local env lacks WebKit binary + api backend).

**Tally**: **16/16 PASS**. Every F gate holds post-merge at master HEAD.

---

## §3 — Repo drift

| Probe                                                | Result                                     |
| ---------------------------------------------------- | ------------------------------------------ |
| `git log --oneline master..tranche-g`                | (empty) — tranche-g is a 0-commit branch   |
| `git log master..origin/master --oneline` (post-fetch) | (empty) — origin/master = local master   |
| `git log --oneline -5`                               | `6b3a41b` merge, `08c8c22` release, `58acb0c` FINAL.md, `56ebb3e` close audits, `cf42c6c` CI substrate |
| `git status --short`                                 | `?? docs/tranches/C/` (only)               |

The only working-tree untracked artefact is `docs/tranches/C/` — historical
Tranche-C planning material never added to the repo. This is consistent
with the state captured throughout F (F-AUDIT-3 §3, F.W4 Lane 7 §3).
**No drift since F merge.**

---

## §4 — Bench medians

`node bench/<name>.mjs`. Each script runs 3 trials, sorts speedups, and
emits its own `median` + `verdict` line. No tuning of iteration counts;
defaults preserved from D.W1 L8 / E.W1 Lane D dispatch.

### 4.1 — `bench/color-channel-access.mjs` (D.W1 L8 gate)

```
instances=256, outer-iter=100,000, total channel reads/scenario = 76,800,000,
target speedup: ≥ 5×

Run 1:  Map.get 202.815 ms │ own-prop  19.766 ms │ speedup 10.26×
Run 2:  Map.get 205.586 ms │ own-prop  19.205 ms │ speedup 10.70×
Run 3:  Map.get 200.586 ms │ own-prop  19.329 ms │ speedup 10.38×
  speedups (sorted): 10.26×, 10.38×, 10.70×
  median speedup:    10.38×
  verdict:           PASS
```

### 4.2 — `bench/color2-direct-paths.mjs` (E.W1 DIRECT_PATHS gate)

Gating series = `hsl→rgb`. `oklab→rgb` and `oklch→rgb` reported for
observability but not gating.

```
Run 1: hsl→rgb 4.83× │ oklab→rgb 0.99× │ oklch→rgb 1.10×
Run 2: hsl→rgb 4.14× │ oklab→rgb 0.99× │ oklch→rgb 1.29×
Run 3: hsl→rgb 4.56× │ oklab→rgb 0.93× │ oklch→rgb 1.09×
  hsl→rgb   speedups (sorted): 4.14×, 4.56×, 4.83× │ median 4.56×  [GATING]
  oklab→rgb speedups (sorted): 0.93×, 0.99×, 0.99× │ median 0.99×
  oklch→rgb speedups (sorted): 1.09×, 1.10×, 1.29× │ median 1.10×
  target:    ≥ 2× (HSL→RGB hot path)
  verdict:   PASS
```

### 4.3 — `bench/parser-namelookup.mjs` (E.W1 Lane D gate)

```
pool=40 distinct inputs, outer-iter=100,000, total name lookups/scenario = 4,000,000,
branches collapsed: 157 → 1 regex + 1 Set.has,
target speedup: ≥ 5×

Run 1: 155-branch 5131.785 ms │ broad-regex 122.168 ms │ speedup 42.01×
Run 2: 155-branch 5058.280 ms │ broad-regex 125.619 ms │ speedup 40.27×
Run 3: 155-branch 5674.307 ms │ broad-regex 136.153 ms │ speedup 41.68×
  speedups (sorted): 40.27×, 41.68×, 42.01×
  median speedup:    41.68×
  verdict:           PASS
```

### 4.4 — Comparison vs F.W4 Lane 5 (post-F close audit)

| Bench                                | F.W4 Lane 5 median | G-open median | Δ            | Gate  | Verdict |
| ------------------------------------ | ------------------ | ------------- | ------------ | ----- | ------- |
| `color-channel-access` (L8)          | 10.66×             | **10.38×**    | −0.28× (noise) | ≥ 5×  | PASS    |
| `color2-direct-paths` (HSL→RGB)      | 7.51×              | **4.56×**     | −2.95× (variance) | ≥ 2× | PASS  |
| `parser-namelookup`                  | 38.23×             | **41.68×**    | +3.45× (noise) | ≥ 5×  | PASS    |

All three benches remain comfortably above their dispatch gates. The
HSL→RGB drop (7.51× → 4.56×) is within historical variance for this
microbench — F.W4 Lane 5 itself recorded a per-run range of `4.73× …
10.86×` for the same probe. The G-open run sits well inside that band
and remains > 2× the gate target. See §5 for variance discussion.

---

## §5 — Drift findings

### 5.1 — `dist/value.js` byte-identical

`stat -f%z dist/value.js` = **124,936 bytes**, byte-identical to the
F-close capture (F.W3 Lane E ceiling: ≤ 148,480 bytes; F-close actual:
124,936 bytes). No bundle-size drift.

### 5.2 — Test counts byte-identical

- **vitest**: 34 files / 1584 tests — matches F.W4 Lane 1 + Q.md §6.
- **api vitest**: 20 files / 104 tests — matches F.W4 Lane 5 §3.
- **e2e specs**: 35 files — matches F.W4 Lane 6 §2.

### 5.3 — Bench medians within noise band

The HSL→RGB DIRECT_PATHS bench dropped from 7.51× (F.W4 Lane 5 median)
to 4.56× (G-open median). This is a **noise / variance observation, not
a regression**:

- Source code paths unchanged (no commits since F close — see §3).
- F.W4 Lane 5 itself recorded per-run spread `4.73× … 10.86×` for the
  same probe; G-open per-run spread is `4.14× … 4.83×`, a tighter and
  lower band.
- All bench gates (≥ 5× / ≥ 2× / ≥ 5×) continue to PASS by a
  comfortable margin.
- L8 and nameParser medians effectively unchanged (within ±10%).

The HSL→RGB jitter likely reflects host CPU scheduling / V8 IC state
between runs. **Flagged as a noise observation; not a code-state drift.**
G.W0 plan should consider re-baselining `color2-direct-paths.mjs`
medians across N≥5 trials for a tighter expectation envelope, but this
is not blocking.

### 5.4 — No new artefacts since F merge

- Working tree contains only `docs/tranches/C/` (historical, predates F).
- No new commits on `origin/master` since F push.
- No `@deprecated`, `@ts-ignore`, or `lerpLegacy` references in `src/`,
  `test/`, or `dist/`.
- `docs/precepts` submodule pinned at `68d9b20` (matches F close).

### 5.5 — Spec count probe (informational)

`find e2e/smoke -name '*.spec.ts' \| wc -l` = **35** files. F close
expected 35 (per F.W4 Lane 6 §2). Confirmed.

---

## §6 — Sub-gate verdict (G-AUDIT-3)

**PASS** — All 16 gate-matrix items hold at master HEAD `6b3a41b`.
Working tree contains only the long-standing `docs/tranches/C/`
untracked artefact. `tranche-g` is a zero-commit branch off `master`.
`origin/master` has not advanced since our F push. The `v0.8.0`
annotated tag is present on both local and origin and points to the
correct merge commit.

The one drift observation is bench variance on `color2-direct-paths`
HSL→RGB (7.51× → 4.56×), which is consistent with documented per-run
spread for that microbench and remains > 2× above its gate target.
Code state is byte-identical to F close.

**G is cleared to open from `6b3a41b` with the full F close gate matrix
intact and no carry-forward regressions.**
