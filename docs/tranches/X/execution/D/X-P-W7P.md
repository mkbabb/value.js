SERVED MODEL: claude-opus-5-5

# X.P.W7P — the release chain (record)

Spec `parse-that/waves/W7P.md`. Opened by COHESION §0ge.5 (owner, 2026-10-19: *"publish, push, and pull whatever items you need"*; *"npm login is done--ratify the rest with your best judgement"*). **CLOSED 2026-10-19.** The COHESION row is the ADDENDUM 2026-10-19 X.P.W7P `.z` at the file end.

## Steps 1–3 (orchestrator)
- `@mkbabb/parse-that@2.0.0` published; tag `v2.0.0` at parse-that-x-p-w7 `96e68e9`.
- bbnf-lang lockfile regenerated at `5c7411f2c` (vitest 299/299, tsc 0, build).
- `@mkbabb/bbnf-lang@0.2.0` published; tag `v0.2.0`. No one-time password was written to any file.

## Step 4 (release-chain seat, value.js `tranche-u`)
- `npm uninstall @mkbabb/parse-that @mkbabb/bbnf-lang && npm install --save-dev --save-exact --prefer-online @mkbabb/bbnf-lang@0.2.0`. Both were already devDependencies (R-p-1).
- The package.json diff: `bbnf-lang 0.1.4 → 0.2.0`, and the `parse-that 0.8.2` line is removed.
- value.js imports no `@mkbabb/parse-that`: the only hits in `src`, `test`, `scripts`, `demo` and `bench` are comments, plus the gitignored `bench/paired/_build`. parse-that therefore resolves transitively: `npm ls` shows one copy of each package, and the lock integrity equals the registry `dist.integrity` for both.
- `node scripts/gen-grammar.mjs --check` reports both tables current (grammar `fbcf5c8d…`, color `0872a62d…`), exit 0. The check is added to `.github/workflows/ci.yml` after `npm run test:css-equivalence`.
- Test reads: `vitest run --maxWorkers=2` 98 files / 1,266 tests GREEN; `test:css-equivalence` 19/19, DEFECTS 0.
- Commit `4038dce5a` (pathspec: package.json, package-lock.json, ci.yml).

## Step 5 `.z`
- **Z-1/Z-2:** `bench/records/W7Pz/` (drivers re-pointed from `.lg1c3`; `product-hash.txt`; `MANIFEST.sha256`).
  - **103/103 GREEN by §0ev.1:** node 15, Chromium 29, WebKit 29, Firefox 30. Highest upper bound per engine: 0.816, 0.843, 0.900, 0.998 (Firefox rej-eq `parseKeyframeSelector`).
  - Load is recorded at 11–46. It is not quiet, so the quiet-host re-read stays owed at X.P.W8's close (§0eq).
  - Both bundles carry 0 parse-that bytes, and the retired bundle is byte-identical (`a65bcc4c…`).
  - WebKit waited about 3 h 50 min for the machine-wide `--exclusive webkit` lock and for headroom (load reached 151).
- **Z-3:** relay letter `V/coordination/valuejs-outbound-2026-10-19-x-p-w7p-release-chain.md`, INBOX O-104. It is file-only and the acknowledgements are owed. The COHESION addendum is written.
- **Z-4:** bbnf-lang PR #1 verified, then merged with `gh pr merge 1 --merge --match-head-commit 5c7411f2c` → `2fe18f9c`.
  - The PR's CI reds are the same Rust steps that fail on base master `d2b32f6e` (sccache absent). The PR is TypeScript-only, and its Extension job is GREEN.
  - Local bbnf-lang master is untouched (`af15f63e`).
