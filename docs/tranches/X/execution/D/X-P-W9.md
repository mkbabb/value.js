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

## `.bl` (XP-4, BL-1, BL-2) — emitter cure in bbnf-lang (closes bbnf-lang#2)

- Branch `x-p-w9-emitter-size` from `origin/master` `2fe18f9cf` in `~/Programming/bbnf-lang-x-p-w7-typescript`; commit **`3a2e03671`** (typescript/ only; `--no-verify` because the shared pre-commit hook runs a Rust target `w3_replay_public_contract` that exists only on local sk-v master). PR https://github.com/mkbabb/bbnf-lang/pull/3 → `gh pr merge 3 --merge` → master **`7bd8e7a14`**; package version **0.3.0**. (The commit subject's `!` over-states it: the API is unchanged; the PR body records that 0.3.0 is the honest 0.x minor.)
- **What changed in the emitted module (`src/emit.ts`):**
  - (i) Shared decoders: 0/1 first-unit tables are hex nibbles (`KB`); Int16 dispatch tables with entries in [-1, 90] are one char each (`KI`). Both decode once at `createParser` into the same typed arrays, so every lookup is unchanged.
  - (ii) Action names are interned: `const [A0..An] = [idx…].map((j) => A[AK[j]].fn)` over `Object.keys(ACTION_KINDS)`. Instrument builds keep the named form.
  - (iii) A text rule's value function calls its recognize twin when the grammar also needs that twin, so the scan is no longer duplicated.
  - (iv) `test/size.test.ts` pins the value.js fixture module. At base `2fe18f9c` the fixture is 132,645 raw / 23,985 gz (the table/name falsifier is RED at base). On the branch it is 112,516 / 23,638 (GREEN). The pin is raw 112,516 / gz 23,650.
  - **Not done:** combinators are still inlined per rule. A call per combinator is a hot-path cost that L-G1 would read, and speed outranks size.
- bbnf-lang suite ⟨`guarded -- npx vitest run --maxWorkers=2`⟩ → 22 files / 302 tests passed ×2; `tsc --noEmit` 0. PR CI: Extension pass. Rust shards 1–3 fail on the sccache setup step (`could not execute process sccache …`), the same failure as master run 39305730651 — pre-existing.
- **Falsifiers on value.js** (re-emitted with the branch through a temporary `scripts/.gen-grammar-probe.mjs`, then restored with `git checkout src/css/bbnf/generated`; `--check` current again `fbcf5c8d…`/`0872a62d…`; probe script deleted):
  - (a) The module is self-contained: ⟨`grep -c 'from "@mkbabb'`⟩ = 0 and ⟨`grep -cE '^\s*import '`⟩ = 0 in both files.
  - (b) Behaviour is unchanged:
    - `--check` with the branch is current (`fae4895b…`/`ccc7b70b…`).
    - V-C ×2 output is **byte-identical** to the `.vc9` reading (`bench/records/W9bl/vc-{1,2}.txt`).
    - css-equivalence: 19/19, MIRROR-DEFECTS 0 on every assay.
    - test/css ×2: 22 files / 311 tests.
    - L-G2: ⟨`node bench/paired/equiv.mjs product`⟩ ×2 is **byte-identical** (`cmp`) to the same read on the 0.2.0 emission (3347 classed mismatches; prefix `sheets 4 · rows 528 · declarations 1405 · refused 0 · mismatches 0`), so there are 0 new delta rows.
    - paired audit: `rules 182 · checks 1427387827 · violations 0 · modeDiffs 0`.
    - L-G3: 0.
  - (c) E-6, read through esbuild --minify then gzip:

    | file | before (min / gz) | after (min / gz) | gz change |
    |---|---|---|---|
    | grammar.js | 112,616 / 15,619 | **83,651 / 15,042** | **−577** |
    | color.js | 39,446 / 6,147 | **29,586 / 6,028** | **−119** |

    Both fall strictly. **GREEN.**

## `.rel` (PT-4, BL-5) — OWNER ACT, OPEN

- Not done by this seat. Seeding a token, or registering npm trusted publishing for `@mkbabb/parse-that` and `@mkbabb/bbnf-lang`, is the owner's act. No agent touches a token.
- bbnf-lang `release.yml` exists, but it only builds the LSP and extension binaries, with no npm job. parse-that has only `ci.yml`.
- Owed ruling: **arm A** (a tag-triggered `release-npm.yml` with `npm 11.12.1`, `npm publish --provenance --access public`, `permissions: id-token: write`, plus NPM_TOKEN or a trusted-publisher registration) or **arm B** (a local OTP publish).
- Until the owner rules, bbnf-lang 0.3.0 stays merged and unpublished.

## `.pin` — WAITS on `.rel`
- `npm install --save-dev --save-exact @mkbabb/bbnf-lang@0.3.0` cannot run, because 0.3.0 is not on npm. value.js 4.2.1 is therefore not cut.
- Measured in `.bl` for when it can run: the new E-6 ceilings would be grammar.js **15,050 gz** and color.js **6,050 gz** (each measured value rounded up to 50 B).

## `.rd` (XP-1, XP-2) — WAITS on a quiet window
- L-G1 needs a 1-minute load below 8 on every rep. This seat read loads of 17.6–29.6 between 19:48 and 20:15 (`uptime`), with seven peer sessions busy.
- The plan says `.rd` runs on 0.2.0 bytes when `.rel` is unruled. It still needs the owner's quiet window, so **no cell was read and none is claimed**.

## `.n` (XP-7) — DONE: `33a1f99d3` (`l-g1-r1/NOTE-2026-11-04.md`).

## Escalations
- **ESC-W9-1:** the W9 close gate "V-C ×2 exit 0" is RED from `.vc9`'s 42 misses (W10 `.s10`/`.v10`) and from W10 `.c10`'s born-RED corpus (6,220 total). This is by design: misses are never ruled to make the gate pass.
- **ESC-W9-2:** `.rel` is open, so `.pin` and the 4.2.1 release wait.
- **ESC-W9-3:** `.rd` has no quiet window available.

## Addendum §0ht.1 (2026-11-04) — adversarial re-check of the first sitting; one masking defect repaired at root

Seat: Opus 5.5, fresh. Every receipt below was re-run here.

- **Re-reads that hold:** E-6 ×2 on HEAD `ea610c4e8` → grammar.js `112616 / 15619`, color.js `39446 / 6147` (both ×2, unchanged; `gen-grammar --check` current `fbcf5c8d…`/`0872a62d…`). V-C ×2 on the `.c10` corpus → exit 1 both, identical, 17,307 cases, 3,898 ruled rows (unchanged since W8: no ruled row was added), **6,220 MISS**. MIRROR (css-equivalence) 19/19, MIRROR-DEFECTS 0 on all six assays. test/css 22 files / 311 tests. bbnf-lang `test/size.test.ts` 3/3 on `3a2e03671` (pin raw 112,516 / gz 23,650 against measured 23,638; not loosened). parse-that `3989967` skips only when the gitignored `../data` fixture is absent (`skipIf(!existsSync(…))`), so nothing skips where the fixture exists.
- **npm (registry read, 2026-11-04):** `@mkbabb/value.js` latest 4.2.0, SLSA provenance attestation present. `@mkbabb/bbnf-lang` latest **0.2.0** and `@mkbabb/parse-that` latest **2.0.0** carry **no** attestation (`dist.attestations` empty); no 0.3.0 on npm. That matches `.rel` (no npm publish workflow in either repo) and is part of what arm A would cure.
- **DEFECT (masking, `.vc9`):** the round-trip recorder ran only bare `<script>` tags (`/<script>([\s\S]*?)<\/script>/`). 34 census files use `<script type="text/javascript">`, so their inline tests were never run. Three of them carry specified-value round-trip cases and were ruled at file level for a reason that is false for them: `variable-reference-cssom.html` and `variable-reference-shorthands-cssom.html` (ruled W9vc-CSSOM-STRUCTURE, "asserts stylesheet structure…": they assert `background-color` / `margin` `var(--prop)` → `var(--prop)`), and `variable-invalidation.html` (ruled W9vc-COMPUTED; the census also refused round-trip extraction for any file that calls `getComputedStyle`, though the recorder reads `element.style` only and a computed read is inert). Nine cases were hidden.
- **Repair (root):** `roundtrip.mjs` exports `inlineScripts(text)` (every inline `<script>` with or without attributes, `src=` excluded), used by both the recorder and `extract.mjs`; `census.mjs` drops the `getComputedStyle` exclusion. The census was re-run on the same pin as `census-2026-11-04-r1.json` (the committed `census-2026-11-04.json` is untouched, E-3); the readers accept a suffixed date and V-C counts the union once. Result: 317 files, **8 extracted, 309 ruled**; `ruled-files.json` loses exactly those three rows; `pins.json` appends three entries (none rewritten). Extract → `cases-2026-11-04-r1.json`, **17,316 cases**; with the three files filtered out it is identical, case for case in order, to `cases-2026-11-04-c10.json`. Every previously extracted file has no attributed inline script (checked over all 179 pins), so no earlier corpus was affected.
- **V-C ×2 after repair** (`bench/records/W9vc9r1/vc-{1,2}.txt`): exit 1 both, identical bar the pid, 17,316 cases · 7,192 pass · 3,898 ruled · census 317 (8 extracted, 309 ruled) · 0 unruled files · 0 stale · **6,226 MISS**. The miss list is the earlier 6,220 verbatim plus 6 new misses: `variable-invalidation.html` `--var*: blue|pink` serialize as `rgb(…)`. A custom property's specified value is its token sequence (css-variables-1 §2), so this is an owed cure. It is routed to W10 `.v10` beside the 10 `var()` misses and is not ruled. The 3 `var(--prop)` cases pass.
- **Noted, not repaired (routed):** (i) `progress-computed.html`'s 34 `test_math_used` cases are judged as specified serialization (W10.md table row "used values"). Several depend on `em`/`rem`, which V-C cannot resolve without layout, so they cannot pass as judged. That inflates the count; it does not mask anything. Whether they get a used-value judge or a DR-a file ruling belongs to `.k10`/XP-13. (ii) `bench/records/W9e6/e6.txt` names HEAD `f1c8390e7`, while the `.e6` line above names `a83da3bd2`. The bytes are identical: the re-read on `ea610c4e8` matches.

## Addendum §0hv.1 (2026-11-04/05) — `.rel` arm A and `.pin` executed (E-3: the `.rel`/`.pin` sections above stand as written)
Seat `claude-opus-5-5`, under the §0hv rulings.
- **`.rel` bbnf-lang.**
  - `.github/workflows/release-npm.yml` (8feeabf4d, PR #4 → `dbe3c815f`) is tag-triggered on **`typescript-v*.*.*`**. A bare `v*` tag already triggers `release.yml` (the VSIX build; the `v0.2.0` tag fired it as run 39303416246 and it failed). It uses npm 11.12.1 on Node 24 with `id-token: write`, gates on tag == version, tsc, vitest, build and a CHANGELOG entry, then runs `npm publish --provenance --access public` with `secrets.NPM_TOKEN`. The job runs only in `typescript/`, so the Rust CI (whose shards fail because the `sccache` rustc-wrapper is absent on hosted runners) cannot block it. actionlint is clean.
  - `typescript/CHANGELOG.md` 0.3.0 records the correction to the `!` in `3a2e03671`'s subject: no public API changed, only the emitted text, so it is a 0.x minor. History is not rewritten.
  - Three defects were found on the way, each cured at root:
    - (i) `typescript/test/fixtures/data/json/data.json` was never tracked. The root `data/` ignore rule caught it, so a clean checkout failed `bbnf.test.ts` and the conformance suite with ENOENT (174 tests ran, 1 failed, 1 suite failed). A `.gitignore` negation now tracks it, and the suite passes 302/302.
    - (ii) `test/size.test.ts`'s gz pin of 23,650 fails on ubuntu Node 24 zlib (23,704) for the same 112,516 raw bytes that macOS gives 23,638 for. raw stays the exact pin; gz is now 23,750 (`391afb1c9`, PR #5).
    - (iii) npm refused the provenance bundle with E422, because `repository.url` was empty. `repository` (directory `typescript`) was added (`84391d9ca`, PR #6, CHANGELOG line PR #7 → `c9b93adb4`).
  - Release runs 41952150093 (failed on ii) and 41952370629 (refused on iii) published nothing, and npm still listed 0.2.0 as the latest version. The never-released tag `typescript-v0.3.0` was deleted and re-made twice, without force. It now sits at `c9b93adb4`.
  - **Publish run 41952612465: success.** npm `latest` = **0.3.0** (gitHead `c9b93adb4`, integrity `sha512-dMtZajlZ…qAw==`), with predicateType `https://slsa.dev/provenance/v1` and sigstore logIndex 3692355659. `npm audit signatures` reports "1 package has a verified attestation".
  - The `--no-verify` flags in bbnf-lang are explained in each commit body: the shared hook runs the Rust target `w3_replay_public_contract`, which does not exist on master.
- **`.rel` parse-that.** `release-npm.yml` on `v*.*.*`: the same idiom, plus `proof:manifest` and `proof:subpath`, and the `repository` field (`31145fb`, `d8c7f65`; PR #2 → `47e928a`). Local gates: tsc 0, vitest 131 passed / 10 skipped, build, and both proofs GREEN. The PR's typescript job passed; the rust job fails as it did before (`egraph-derive`). **No release was cut** (`.pt`: nothing is owed at 2.0.0).
- **`.pin`** (`dd7a52156`). `@mkbabb/bbnf-lang` is pinned at exactly `0.3.0` and the grammar was re-emitted. `--check` is current: grammar.js `fae4895b…` and color.js `ccc7b70b…`, the same sha256 as `.bl`'s branch emission. Gates ×2 (`bench/records/W9pin/`):
  - E-6: grammar.js **83,651 / 15,042 gz** and color.js **29,586 / 6,028 gz**, both ×2. **E-6 ceilings are lowered as of this addendum to grammar.js ≤ 15,050 gz and color.js ≤ 6,050 gz** (measured, rounded up to 50 B). The raw ceilings stay where they were.
  - Self-contained: 0 `from "@mkbabb` and 0 `import` lines in both files.
  - test/css: 22 files / 311 tests. MIRROR: 19/19, with MIRROR-DEFECTS 0 on all 26 assay lines.
  - V-C: byte-identical, bar the pid line, to the pre-pin `W9vc9r1` reading (6,226 MISS, the known W10 rows, none ruled).
  - L-G2: `equiv product` is byte-identical (`cmp`) to the 0.2.0-emission base and to `.bl`'s read. The paired audit shows 0 violations and 0 modeDiffs. L-G3: 0. The full unit suite passes 142 files / 1,673 tests.
- **Unblock, tranche-u visual RED.** tranche-u ci 41965758715 @ `46c3a7153` read visual 12 failed / 204 passed, all at 3440: routes picker/palettes/mix/blob and palette-card rest/hover, each × light/dark. The cause was §0hr OD-19 `7904869ce` (the spectrum block size), not `.pin`.
  - Counterfactual: in a clean worktree with `SpectrumCanvas.vue` set back to `7904869ce^`, the 3440 cells read 34/34 passed against the committed goldens.
  - Mint: `regenerate-goldens.mjs --accept -g 3440` (34 passed) changed exactly 12 PNGs and the MANIFEST. Committed as `efbfd4f16`, merged as `39e2216ab` (commit-tree, ordinary). §0hw.12 later superseded these 13 paths at the V-D1 tree (`d49670d27`).
  - **ci 41975708133 @ `39e2216ab`: 8/8 success.**
- **value.js 4.2.1** (`2872d088a`: CHANGELOG and version).
  - §0ga merge **`594f423b5`**, parents `0a2c35d74` and `39e2216ab`. merge-tree was clean, and the merge was pushed to master as a fast-forward, not forced.
  - Tag `v4.2.1` → release run **41992815582: success**. npm `latest` = **4.2.1**, gitHead `594f423b5`, integrity `sha512-SNGjPbjQ…JsFdSg==`, with predicateType `https://slsa.dev/provenance/v1`. `npm audit signatures`: verified attestations.
  - master ci 41992804627 was started on `594f423b5`.
- Still open: `.rd` (it waits for a real quiet window). The W10 units now have their headroom: grammar.js 8 B and color.js 22 B under the new ceilings.
