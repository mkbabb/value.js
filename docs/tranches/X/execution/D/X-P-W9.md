# X.P.W9 — execution record (born 2026-11-04 at the first unit; plan `parse-that/waves/W9.md`, COHESION §0ht)

Seat: Opus 5.5. Every receipt below is a command this seat ran; a cell not read is not claimed.

## `.e6` (XP-3) — E-6 binds both emitted files

- **Ruling applied (the plan's mechanical rule: each file's measured gz rounded up to 50 B):** E-6 binds `src/css/bbnf/generated/grammar.js` **and** `color.js` (the `.g2s2` split). Ceilings in force from here: **grammar.js ≤ 125,646 raw-min / 15,650 gz** (unchanged) · **color.js ≤ 39,446 raw-min / 6,150 gz** (new).
- **E-6 ×2** ⟨`npx esbuild --minify --loader=js < src/css/bbnf/generated/<f>.js | wc -c` / `| gzip | wc -c`⟩ on HEAD `a83da3bd2` → grammar.js `112616 / 15619` ×2 (31 B gz headroom) · color.js `39446 / 6147` ×2 (3 B gz headroom). Banked `bench/records/W9e6/e6.txt`. **GREEN.**
- `--check` ⟨`node scripts/gen-grammar.mjs --check`⟩ → grammar.js current (sha256 `fbcf5c8d…`), color.js current (sha256 `0872a62d…`).

## `.o104` (XP-5) — live delivery

- ⟨`ListAgents`, 2026-11-04 19:5x⟩ → live peers: glass-ui-c7, sci-report-01, sci-report-36, sci-report-ef, csc411-hw2-…, hassio-config-4a, gaggle-24. **No parse-that, bbnf-lang (SK-V26) or latex-paper session is live.** The three are rowed `UNREACHABLE 2026-11-04` in INBOX (not faked); retried at W9 close.

## `.pt` (PT-1..3) — parse-that master made true

- Worktree `~/Programming/parse-that-x-p-w7` (clean; `HEAD` = `origin/x-p-w7` = `v2.0.0` = `96e68e9`); `~/Programming/parse-that` untouched.
- **typescript job triage against base `cb9c0d4`** (master run 35937387131, 2026-09-24): `json.test.ts`, `csv.test.ts`, `validate-parsers.test.ts`, `verify-parse-output.test.ts` fail with `ENOENT ../data/{json,csv}/…`. `data/` is in `.gitignore` (local benchmark fixtures, 93 MB), so CI never has them. **Not the 2.x silent-failure contract (F-b-2), and not a library defect.** Cure `3989967` (tests only): each fixture case/suite skips when its fixture is absent. Local with fixtures ⟨`guarded --light -- npx vitest run --maxWorkers=2`⟩ → 15 files / 143 tests passed; a fixture-less copy → the four cases skip; `tsc --noEmit` 0.
- **rust job:** fails at base `cb9c0d4` and on the PR identically (`error: no matching package named egraph-derive found`) — **pre-existing**, rowed to parse-that's owner, not blocking.
- **PR** https://github.com/mkbabb/parse-that/pull/1 (CI run 41944303438: typescript **pass**, rust fail as at base) → `gh pr merge 1 --merge` → master **`7098c86`** (ordinary merge). Master CI run 41944501862: typescript **success**, rust failure (pre-existing).
- After merge ⟨`git diff v2.0.0 origin/master -- typescript/src | wc -l`⟩ → `0`. ⟨`git show origin/master:typescript/CHANGELOG.md | grep -ci "not published"`⟩ → `0`. **No release owed** (npm 2.0.0 = the tag; no published-surface defect found). **GREEN.**

## `.vc9` (XP-9) — the css-variables-1 / css-syntax-3 instrument

- **Census:** the pinned tree ⟨`gh api repos/web-platform-tests/wpt/git/trees/<css-variables|css-syntax sha>?recursive=1`⟩ at `5a5b2b59` → 317 test-shaped blobs (`.html/.htm/.xht/.xhtml/.svg/.js`), fetched to the durable cache `~/.cache/wpt/raw` (list `~/.cache/wpt/census/files-5a5b2b59.txt`). New instrument `test/css/wpt-values/census.mjs` records each file's harness calls → `census-2026-11-04.json` (317 rows, sha256 each).
  - **Extracted (5):** `css-variables/var-parsing.html` (parsing-testcommon, 18 cases — its basename lacks `valid`, which is why the W8 selection missed it); and by the new CSSOM round-trip recorder `roundtrip.mjs` (setProperty(fallback) → setProperty(input) → getPropertyValue → assert_equals; expected = fallback ⇒ invalid): `css-syntax/urange-parsing.html` (94), `css-syntax/decimal-points-in-numbers.html` (4), `css-syntax/url-whitespace-consumption.html` (3), `css-variables/url-token-serialization.html` (6). Pins appended to `pins.json` (existing 159 entries untouched, E-3).
  - **Ruled at file level (312)** in new `bench/wpt-conformance/ruled-files.json`: W9vc-REFTEST 183 · W9vc-COMPUTED 72 (getComputedStyle; incl. the 4 UTF-16 charset pages, read as UTF-16) · W9vc-CSSOM-STRUCTURE 27 · W9vc-NOT-A-TEST 22 · W9vc-CRASHTEST 7 · W9vc-PROPERTY-NAME 1 (`CSS.supports("--", …)`).
- **Extract** ⟨`node test/css/wpt-values/extract.mjs 2026-11-04`⟩ → `6392 cases from 164 files → cases-2026-11-04.json`; the 6267 cases of the 159 W8 files are **identical** to `cases-2026-10-07.json` (same order, same bytes per case), +125 new (css-syntax 51 valid / 50 invalid, css-variables 17 / 7).
- **Instrument:** `conformance.ts` reads the new dated file, folds case-folded round-trip cases (urange's `toUpperCase()`), and fails on an **UNRULED FILE** (census file neither extracted nor ruled) or a **STALE FILE**.
- **V-C BEFORE** (`bench/records/W9vc9/vc-before.txt`) → exit 0, 6267 = 2369 + 3898, 0 MISS. **V-C AFTER ×2** ⟨`guarded --light -- npx vite-node bench/wpt-conformance/conformance.ts --misses all`⟩ → exit 1 both, outputs identical bar the pid line (`vc-after-{1,2}.txt`): 6392 cases · 2452 pass · 3898 ruled · census 317 (5 extracted, 312 ruled) · 0 unruled files · 0 stale · **42 unruled misses: css-syntax 32 (all `urange-parsing`: 4 refused, 24 serialization, 4 accepted), css-variables 10 (all `var-parsing`: 6 refused, 4 serialization)**. Every other module unchanged.
- The gate as planned holds (css-variables and css-syntax are now V-C modules, 0 unruled files). The 42 misses are **W10 rows, not W9 cures** (no grammar byte changed in this unit): **W10 `.s10`** — `<urange>` specified serialization per css-syntax-3 §7.1 / css-fonts-4 (upper-case hex, leading zeros stripped, `?` expanded to a range; comments between the `u` `+` tokens), and `u + abc` / `U + a b c` / `u-0-1` refused; **W10 `.v10`** — `var()` keeps an empty fallback (`var(--x,)`, `var(--x, )`), the name argument is `<declaration-value>` (`var(--x ())`) and may be `{}`-wrapped (css-values-5 §component-function-commas). Not ruled: ruling them would hide owed cures. **Consequence for the W9 close gate "V-C ×2 exit 0": RED (42) until W10 `.s10`/`.v10` land — escalated (ESC-W9-1).**
