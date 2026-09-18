SERVED MODEL: claude-opus-5[1m]

# X.P.W2 — evidence fold, SECOND SITTING's close (2026-09-17)

`W2.md` §8: *"The printed tables and JSONs — bijection maps (G-2), equality results (G-3),
recovery-law runs (G-4), R1 runs (G-5), the coverage report (G-6), both bench runs (G-7),
alloc/latch prints (G-8), Wasm audits (G-9), idiom/no-CST walks (G-10), depth/scan prints (G-11) —
copied under `docs/tranches/X/parse-that/evidence/W2/` at close, sha256 each."*

These are the **VERIFY-ONLY close seat's own readings**, taken at its own clock from the settled
bytes after `.i`'s graduation commit (`<p2>` `130f72db`) and after the §9 / COHESION §0n.2 merge
(`<p2>` `cdf7975`). Every capture is **run 1 of a double-run whose two outputs were byte-identical**
(⟨`diff -q run1 run2`⟩ silent), with two stated exceptions:

- `G-8-alloc-latch-at-graduated.txt` — a timing and heap probe; drawn, never diffed. Its verdict
  line is what reproduces.
- `G-10-idiom-nocst-at-graduated-p2-RED.txt` — the two runs differ **only** in the mkdtemp fixture
  path printed inside the one error line; the reading is identical.

`SHA256SUMS` covers the seventeen `.txt` captures. ⟨`shasum -a 256 -c SHA256SUMS`⟩ → 17 of 17 `OK`.
This README is not in the sums (it is prose, not a reading).

| file | command, verbatim | run from |
|---|---|---|
| `G-1-structural-p2-postmerge.txt` | `node harness/w2/op-bijection.mjs --structural` | `<p2>` (branch `w2/harness`, post-merge) |
| `G-1-structural-ac1-worktree.txt` | same | `<p2>/.worktrees/ac1` (branch `w2/ac1`) |
| `G-2-op-bijection-at-graduated.txt` | `node harness/w2/op-bijection.mjs --candidate ac1 --at typescript/src/css` | `<p2>` |
| `G-3-eq-six-at-graduated.txt` | `node harness/w2/eq-six.mjs --candidate ac1 --at typescript/src/css --corpus experiments/w2/corpus/slice.json --fuzz-seed experiments/w2/corpus/fuzz-seed.json` | `<p2>` |
| `G-4-recovery-laws-ac1.txt` | `node harness/w2/recovery-laws.mjs --candidate ac1` | `<p2>/.worktrees/ac1` |
| `G-5-r1-candidates-at-graduated.txt` | `node harness/w2/r1-candidates.mjs --candidate ac1 --at typescript/src/css` | `<p2>` |
| `G-5-published-baseline-MEASURE-AT-CLOSE.txt` | `node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs` (R-E, unmodified) | value.js at HEAD `aedb07b5` |
| `G-6-coverage-52-literal-command.txt` | `node harness/w2/coverage-52-report.mjs` (§6's literal command) | `<p2>` |
| `G-6-coverage-52-with-candidate-THROWS-D-i2.txt` | `node harness/w2/coverage-52-report.mjs --candidate ac1` | `<p2>/.worktrees/ac1` — **the D-i2 throw, captured** |
| `G-7-substrate-receipt.txt` | `node harness/w2/substrate-receipt.mjs` | `<p2>/.worktrees/ac1` |
| `G-8-alloc-latch-at-graduated.txt` | `node --expose-gc harness/w2/alloc-latch.mjs --candidate ac1 --at typescript/src/css` | `<p2>/.worktrees/ac1` |
| `G-9-wasm-audit-at-graduated.txt` | `node harness/w2/wasm-audit.mjs --candidate ac1 --at typescript/src/css` | `<p2>` |
| `G-10-idiom-nocst-at-graduated-p2-RED.txt` | `node harness/w2/idiom-nocst.mjs --candidate ac1 --at typescript/src/css` | `<p2>` — **RED; the D-c1 finding** |
| `G-10-idiom-nocst-at-graduated-worktree-GREEN.txt` | same | `<p2>/.worktrees/ac1` — **GREEN; the same bytes at the other address** |
| `G-11-depth-scan-at-graduated.txt` | `node harness/w2/depth-scan.mjs --candidate ac1 --at typescript/src/css` | `<p2>/.worktrees/ac1` |
| `ESC-i2-tsc-noEmit.txt` | `npx tsc --noEmit -p typescript/tsconfig.json` (§0n.2's subject) | `<p2>/.worktrees/ac1` — **0 bytes: exit 0, zero diagnostics** |
| `ESC-i2-tsc-listFiles.txt` | same `--listFiles` | `<p2>/.worktrees/ac1` — 403 program files, 1 under `typescript/src/css` (R-i2) |

**No bar is set, implied, or printed anywhere in this fold**; `OWNER-GATED-PENDING-RATIFICATION`
stands (OP-4). Nothing here was post-edited — M-22 ¶5: dated packets append-never-rewrite.

The FIRST sitting's fold is `../h/**` (27 captures + `SHA256SUMS`), untouched and immutable (E-3).
