# T.W1 — WAVE-CLOSE GATE RECORD (the §Verification artefacts, integrated tree)

Recorded at integration close on `tranche-t` after the three-lane merge
(`src → api → demo`, one `--no-ff` each) + the MOVE-MAP-first consolidation + the two
§Recovery cures (the round-trip corpus keep-at-root; the api `__tests__` gitignore/re-home).
Referenced from `PROGRESS.md`. Every §Hard gate row (T.W1.md §Hard gate) mapped to its evidence.

## §Suites (the composite gate, row 2 + row 10)

| Gate | Command | Result |
|---|---|---|
| lint | `npm run lint` | **0** (eslint `--max-warnings=0`) |
| typecheck (lib+demo) | `npm run typecheck` | **0** (vue-tsc lib + demo) |
| vitest (library+demo unit) | `npm test -- --run` | **2171 passed / 69 files** |
| test:dist (5 behavioral gates) | `npm run test:dist` | **5/5 GREEN** — css-parity · round-trip-idempotent · perf-target · serialize-fidelity · subpath-budget (11/11 clauses; the `./color` parse-that-free bundle trace) |
| api tsc | `cd api && npx tsc --noEmit` | **0** |
| api suite | `cd api && npm test` | **205 passed / 35 files** (restored — see §api recovery) |
| playwright (ALL 6 projects) | `npx playwright test` | **exit 0** · 61 passed · 3 skipped · o5-boot-pacing is `test.fail()` BORN-RED (expected-fail=pass; cure at W2-3) |
| build | `npm run build` + `npm run gh-pages` | clean |

## §PP-8 caps recomputed post-move (row 4)

| Cap | Rule | Result |
|---|---|---|
| demo LoC | no `demo/` file > 400 (excl. `components/ui/` vendored + `styles/`) | **PASS** — zero files > 400 |
| api/src LoC | no `api/src` file > 350 | **PASS** — zero files > 350 |
| `as unknown as` (src) | regenerable, not hardcoded (`grep -rn 'as unknown as' src/ \| wc -l`) | **8** (unchanged vs tranche S — the documented irreducible erasure class) |
| `as unknown as` (api/src) | inv-L-2 | **1** (`main.ts`, the `server.close()` handle) |
| `as any` (src) | must be 0 | **0** |

## §PR-7 keyframe/animation census (row 9b — the OWNER grievance gate)

`grep -rhn '@keyframes' demo/` → 18 identities (minus the `redefinition` prose hit).
**18/18 SURVIVE** at their post-codemod homes (zero deletions, zero renames): the census set
(`w1-pr7-keyframes-census.md`) re-grepped identical. The only 3 relocated owners
(`SpectrumCanvas.vue` batch 9; `ApiOfflineChip.vue` + `DevMisconfigBanner.vue` batch 6) carry
their scoped `@keyframes` inside the SFC `<style>` (travel with `git mv`). PR-7 GREEN.

## §Barrel discipline (row 9) + shim discipline (row 5)

- **Zero `export *`** in any barrel — `grep -rnE '^\s*export \*' src/ demo/ api/src/` → 0 real
  statements (only 4 comment mentions "never `export *`"). Named re-exports only (PI-6).
- **Zero re-export shims at old paths** — every moved-away old path VERIFIED ABSENT (no
  forwarding stub): `api/src/index.ts`, `src/parsing/{color,stylesheet,easing}.ts`,
  `src/units/color/{gamut,boundary}.ts`, `demo/@/components/custom/{color-picker,panes}/keys.ts`,
  `palette-browser/{PaletteCard,EmptyState}.vue`, `api/src/{models.ts,lib/crud/atomdiff.ts}`,
  etc. Consumers migrated at root (PP-3). The one heuristic flag (`src/subpaths/quantize.ts`) is
  the build-FROZEN public `@mkbabb/value.js/quantize` barrel (in `package.json` exports), not a
  shim.

## §dts additive-only (row 8 — the FORBIDS ledger, absolute)

Fresh library build at the integrated HEAD vs a fresh build at the wave head `879ea36`; exported-
symbol set extracted from every `dist/**/*.d.ts` and diffed:

| | count |
|---|---|
| wave-head public symbols | 476 |
| integrated public symbols | 479 |
| **REMOVED (FORBIDS breach)** | **0** |
| **ADDED** | **3** — `sampleOKLChHueSweepBoundary`, `sampleOKLChHueSweepBoundaryInto`, `OKLChHueSweepBoundary` (the A5 T-21 hue-sweep sampler, semver-MINOR additive) |

**ADDITIVE-ONLY confirmed** — no removal/rename of any existing exported symbol. (Q15's 8
primitive promotions were already on the wave head.) The `src/subpaths/` filenames + `src/index.ts`
build-frozen chunk names are unchanged.

## §O-23 bundle (row 3)

**SATISFIED — no blast** (full table: `w1-o23-diff.md`). Stable-level gate: demo total −0.13%
(vs post-keystone), eager JS −0.09% (no lazy→eager promotion), CSS-total flat, library +0.98%
(sanctioned Q15 + A5 additive). Every >±2% per-name move classified as the already-on-head keystone
source→dist rechunk, the C6 barrel auto-chunk regroup, or the sanctioned library additive growth.

## §api boundary-law re-verification (row 7)

L boundary VERBATIM in the new `modules/`+`platform/` shape: typed `ApiError` (0 ad-hoc
`c.json({error})`), routes never touch `repositories.*` (0), DI seam (`platform/http/inject-services`)
sole raw-`db` reach, `as any`=0 / `as unknown as`=1. H1 cascade-correctness re-walked
(`docs/tranches/H/audit/api-withTransaction-coverage.md`). Q8 depth: `PaletteVersion.atomDiff` GONE
from the schema (TA-4). Q17 colocation landed (the `modules/<domain>/__tests__/` + named
`test/conformance/` exception). inv-L-7 cap held.

## §api recovery (the discovered defect + the idiomatic cure)

Commit `446be8e` ("colocate per-domain suites") recorded **only 27 deletions** — the claimed
relocation created zero committed files because `.gitignore:9` `_*` silently swallows every
`__tests__` dir. The merged tree shipped a gutted 66-test suite (§Hard-gate-7 RED). Cured at
integration (`cf65472`): the surgical `.gitignore` negation (`!**/__tests__/` + `!**/__tests__/**`
— node_modules/·dist/ parent-excluded, so untouched) + re-home of the 27 suites from the
transposition commit `919cc69` into `src/modules/<domain>/__tests__/` with resolve-and-recomputed
relative imports. Suite restored to **205/35 green** (matches `919cc69`'s claim).

## §MOB-1 — the ONE open §Hard-gate item (row 6, half)

MOB-2 landed (route-derived pane index; `mobile/walk` playwright PASS). The dup-`useDark` fold +
the PI-DRIFT-1 `out-in` audit landed. **MOB-1 (the stamped `data-layout` witness) is DEFERRED to
Fable/frontend-design** — a discovered ratified-vs-ratified conflict (T's MOB-1 replaces the
D8-1 producer-owned `lg:*` width witnesses that `App.vue:50` documents as "never demo-cured here").
Per the recovery-brief clause (E-6 taste-judged → Fable), routed with the D8-1 conflict named;
nothing half-applied; the current width+aspect mechanism is intact + green (smoke-mobile passes).
This is the sole reason the integration status is **PARTIAL**, not LANDED.

## §PI-1 Lighthouse delta (row 10)

Recorded as the W1 row in `pi1-delta-ledger.md` (the restructure is chunk-graph-neutral → expected
~flat vs the W0 baseline; the noise rule applies). The CI run (`gh workflow run ci.yml --ref
tranche-t`) URL + LCP/TBT 3-sample spread are appended there.
