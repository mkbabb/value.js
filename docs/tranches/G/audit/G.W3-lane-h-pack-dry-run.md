# G.W3 Lane H — CI `npm pack --dry-run` publish-shape regression catch (CI-2)

**Branch**: `tranche-g` @ `c57ec01` (G.W3 execution).
**Scope**: add a CI step that runs `npm pack --dry-run` and surfaces the
published file list, catching regressions in the `files:` declaration +
`exports` map + `dist/` shape, per `G.W3.md §"Lane H"` and
`G-AUDIT-6 §3`.

---

## The finding

The package's published shape is governed by three coupled surfaces —
`package.json files:`, the `exports` map, and the `dist/` build output. None of
them had a CI assertion. A regression in any one (a dropped `files:` entry, a
repointed `exports` target, a build that emits the wrong layout) would ship a
broken tarball with no signal until a consumer reported it. G-PUB-1 (Lane I) is
a concrete instance of exactly this class — `scripts/` was missing from
`files:` for an entire release window.

## The fix

A CI workflow step **"Inspect publish shape (npm pack --dry-run; G.W3 Lane H)"**
running `npm pack --dry-run --legacy-peer-deps`, placed post-build in the new
G.W3 invariant block. The step prints `npm`'s tarball-contents notice (file list
+ sizes + total count) into the CI log — a durable, diffable record of the
publish shape on every run. `--dry-run` emits no tarball; `--legacy-peer-deps`
mirrors the flag the constellation uses elsewhere for the `file:` sibling deps.

This step is the human-readable companion to Lane I's
`proof:codemod-publication` (which makes one specific assertion — codemods
present — machine-checkable and fail-closed).

## Verification

`npm pack --dry-run --legacy-peer-deps` locally emits the expected library
file set: `dist/**`, `scripts/migrate-keyframes-js-lerp.mjs`, `LICENSE`,
`README.md`, `package.json` — 47 files, package size ~157 kB.

## Sub-gate H — status

- [x] CI step added post-build.
- [x] Locally `npm pack --dry-run` shows the expected file set.

## Files

- `.github/workflows/node.js.yml` — CI step.
