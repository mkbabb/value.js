# L2-kf1-reverify — lane report (Tranche R, pass-2 burn-down)

**Lane**: L2-kf1-reverify · **Date**: 2026-07-02 · **Discharges**: PASS2-VERDICT §3 rows **M3** (full) + **M2** (kf1 half) + **M1** (kf1 half) + §1-note item **W0-14** (hoist).
**Head under test**: `tranche-q` @ `e80b359` (v1.2.0). **Worktrees**: `wf_d9a4e4d9-899-{1,2,3}` (`git worktree list` confirms -1 @ `15b0382`, -2 @ `e80b359`, -3 @ `15b0382` at lane start).
**Writable-surface note**: all edits confined to `docs/tranches/R/audit/pass2/` in the main tree + the disposable worktree-3 checkout. No `src/`/`demo/`/`api/`/`package.json` write.

---

## 1. Step 1 — the 4-file worktree diff (captured, byte-identity re-confirmed)

Worktree-3 (`wf_d9a4e4d9-899-3`), at lane start `git rev-parse HEAD` = `15b0382…` with 4 modified tracked files. Captured `git diff` → `scratchpad/kf1.patch` (253 lines). Enumerated — **4 files, +141/−30** (matches the expected shape; the "one more" file beyond the 3 named in the task is `test/round-trip.test.ts`):

| file | Δ |
|---|---|
| `src/parsing/serialize.ts` | +… / 6 lines touched (param emit `:132-140`) |
| `src/parsing/stylesheet.ts` | 77 lines (type `:44-48`; `topLevelColonIndex` + rewritten `parseFunctionParameters` `:637-706`) |
| `test/grammar-2026-atrules.test.ts` | 84 lines (O.W4-S7 block rewritten + 6 vectors) |
| `test/round-trip.test.ts` | 4 lines (comparison helper re-keyed `:124-126`) |

**Byte-identity across `15b0382..e80b359`** for all 4 files: `git -C <main> diff --stat 15b0382 e80b359 -- <4 files>` → **empty** (PASS2-VERDICT §5 verified the 3 named files; I confirmed the 4th, `round-trip.test.ts`, is also in the empty set). So the patch applies at head with a guaranteed-clean apply.

## 2. Step 1 — re-apply at head + full suite (the sole M3 mechanical run)

- `git restore` the 4 files → `git checkout e80b359` (detached) → `ln -s <main>/node_modules` → `git apply scratchpad/kf1.patch`. `git apply --check` passed; applied clean; `git diff --stat` reproduced **4 files, +141/−30**.
- **Targeted**: `npx vitest run test/grammar-2026-atrules.test.ts test/round-trip.test.ts` → **69 passed** (`grammar-2026-atrules.test.ts` **37** + `round-trip.test.ts` **32**).
- **Base count at head** (unpatched `grammar-2026-atrules.test.ts` from `e80b359`, run against the patched source): **31 tests** (29 passed / 2 failed — the two buggy-canon assertions the fix rewrites). So **31 at head base → 37 patched — the fix adds 6**, exactly per M3.
- **Clean head baseline** (`git stash` the patch): `npx vitest run` → **1934 passed / 51 files**.
- **Patched head**: `npx vitest run` → **1939 passed / 1 FAILED / 1940 total, 51 files**.
- `npx tsc --noEmit -p tsconfig.lib.json` → **exit 0** (`tsconfig.lib` `"include": ["src/"]` only).

### The 1 head failure — a NEW finding (rename-sweep gap the stale worktree could not see)

`test/parsing-extract-functions.test.ts:36` fails: it asserts `desc!.parameters![0]!.type === "<number>"` on input `@function --double(--x: <number>)`. Two independent reasons it breaks under the fix, both correct behaviour:
1. the rename `type→syntax` removes `.type`;
2. under the corrected grammar the colon-after-name `--x: <number>` now parses to `{name:"--x", default:"<number>"}` (top-level colon introduces the default), so the value is on `.default`, not `.syntax`.

**Provenance pin** (`git cat-file -e` / `git log --diff-filter=A`): this test file was **added in `23d1a91` (tranche P, 1.1.0)** and is **absent at `15b0382`** (the stale worktree base) — which is exactly why the prototype's suite showed "zero stray consumers." It is the only residual; parser+serializer are correct on all 8 §4 vectors. The complete R.W1 fix adds this one-line test sweep (a 5th file); the assertion becomes `.default === "<number>"`, or the input is corrected to spec form `--x <number>` asserting `.syntax`.

## 3. Step 2 — kf1-grammar.md amendments (M1+M2+M3)

Applied to the hoisted copy at `docs/tranches/R/audit/pass2/kf1-grammar.md`:
- **Header/status baseline corrected (M2)**: worktree baseline stated as `15b0382`/v1.0.2 (3 commits stale, did NOT self-correct); the fix carries because the 4 files are byte-identical `15b0382..e80b359`; head numbers restated (clean 1934/51-files; patched 1939/1-fail/1940; `grammar-2026-atrules` 31→37; old "1877/1877" flagged as the 1.0.2/46-file base).
- **§6 STRUCK (M1)**: the "`extractFunctions` is dist-only, absent from source" side-finding is FALSE — in source since 1.1.0 (`23d1a91`): `src/parsing/extract.ts:124` (`export const extractFunctions = (`, header `:99`), re-exported `src/index.ts:291` **and** `src/subpaths/parsing.ts:47`; `test/parsing-extract-functions.test.ts:16-19` asserts `extractFunctionsRoot === extractFunctions`. All verified at `e80b359` via `git grep`. A fresh build keeps it.
- **§8 point 3 STRUCK (M1)**: "restore `extractFunctions` to source" — nothing to restore.
- **Rename-sweep note extended (M3)**: added `src/subpaths/parsing.ts:40` (the second `CustomFunctionParameter` re-export barrel, alongside root `src/index.ts`) AND `test/parsing-extract-functions.test.ts:36` to the sweep (§8 item 1). §4 + §9 counts restated at head.

## 4. Step 3 — hoist (W0-14)

Three reports hoisted into `docs/tranches/R/audit/pass2/` (main tree), each with a one-line provenance header:
- `gamut-bound.md` ← worktree-1 — **byte-faithful** (base `15b0382` stale but measurement-equivalent per M2: `gamut.ts` delta is one appended P-era function, `GAMUT_ALPHA` core untouched).
- `boot-blast-radius.md` ← worktree-2 — **byte-faithful** (self-corrected to `e80b359` during its own run, per its §0).
- `kf1-grammar.md` ← worktree-3 — **amended** (the M1/M2/M3 edits above).

`ls docs/tranches/R/audit/pass2/` confirms all three present (sizes: gamut-bound 20 KB, boot-blast 17 KB, kf1 15 KB).

---

## 5. Verified facts (file:line)

- `git worktree list` — -1 `15b0382`, -2 `e80b359`, -3 `15b0382`.
- diff shape: `git diff --stat` in wt-3 = 4 files, +141/−30; 4th file = `test/round-trip.test.ts`.
- byte-identity: `git diff --stat 15b0382 e80b359 -- src/parsing/{serialize,stylesheet}.ts test/{grammar-2026-atrules,round-trip}.test.ts` → empty.
- counts: clean head `1934/51`; patched head `1939 passed / 1 failed / 1940`; `grammar-2026-atrules` base `31` → patched `37`; targeted `69`.
- 1 failure: `test/parsing-extract-functions.test.ts:36` (`.type` read); file added `23d1a91`, absent at `15b0382`.
- `extractFunctions` in source: `src/parsing/extract.ts:124`, `src/index.ts:291`, `src/subpaths/parsing.ts:47`; test `test/parsing-extract-functions.test.ts:16-19`.
- `CustomFunctionParameter` second barrel: `src/subpaths/parsing.ts:40`.
- `tsc -p tsconfig.lib.json` exit 0; `tsconfig.lib.json` `"include": ["src/"]`.

## 6. One material deviation from the M3 expectation

M3 anticipated a clean re-run and "restate the counts." The re-run is **not clean at head**: **1 failure** (`parsing-extract-functions.test.ts:36`), a head-only P-era test the stale worktree could not observe. It is a rename-sweep completeness gap, not a parser-fix defect — but it means the R.W1 fix must sweep a **5th file** (one test-assertion line), and the honest head number is **1939/1940 with 1 residual**, not a clean pass. Recorded in the amended kf1 report §4/§8/§9 and surfaced here so SPEC-v3 (seed 1) can carry it.
