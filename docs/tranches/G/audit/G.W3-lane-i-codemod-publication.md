# G.W3 Lane I — Codemod publication invariant (G-PUB-1)

**Branch**: `tranche-g` @ `c57ec01` (G.W3 execution).
**Scope**: add `scripts/migrate-*.mjs` to `package.json files:`; author
`scripts/proof-codemod-publication.mjs`; wire `proof:codemod-publication` into
`package.json scripts` + the CI workflow. Per `G.W3.md §"Lane I"` and
`G-PEER-KEYFRAMES-JS §4.1` (user-ratified 2026-05-21).

---

## The finding

F.W2 shipped `scripts/migrate-keyframes-js-lerp.mjs` as a **consumer-facing**
codemod — the `codemod:keyframes-lerp` npm script invokes it, and the F.W2 docs
present it as a migration path for downstream consumers. But `package.json
files:` carried only `["dist"]`. `scripts/` was never published, so the
codemod was **invisible to every npm consumer** — `npm pack --dry-run`
confirmed a tarball with zero codemod content.

## The fix

1. **`package.json files:`** — added `"scripts/migrate-*.mjs"`. The glob
   publishes the migrate codemods specifically, NOT all of `scripts/` (the
   `proof-*.mjs` gates are CI tooling, not consumer artifacts — they stay
   unpublished).

2. **`scripts/proof-codemod-publication.mjs`** — invariant guard. Runs
   `npm pack --dry-run --json --legacy-peer-deps`, parses the result array,
   and filters `files[].path` against `/^scripts\/migrate-[^/]+\.mjs$/`. Zero
   matches → exit 1 with the `files:` remediation; ≥ 1 match → exit 0 listing
   the published codemods. A future `files:` regression that de-publishes the
   codemods fails this gate.

3. **Wiring** — `package.json scripts` entry `proof:codemod-publication`;
   CI workflow step "Proof — codemods published in tarball (G-PUB-1)" in the
   G.W3 invariant block, post-build.

## Verification

- `npm pack --dry-run --legacy-peer-deps` now lists
  `scripts/migrate-keyframes-js-lerp.mjs` in the tarball (9.5 kB).
- `npm run proof:codemod-publication` →
  `PASS — 1 codemod(s) published in the tarball: scripts/migrate-keyframes-js-lerp.mjs`,
  exit 0.

## Sub-gate I — status

- [x] `package.json files:` includes `scripts/migrate-*.mjs`.
- [x] `npm pack --dry-run --json` tarball lists the codemod file.
- [x] `npm run proof:codemod-publication` exits 0.
- [x] CI step wired.

## Files

- `package.json` — `files:` entry + `scripts` entry.
- `scripts/proof-codemod-publication.mjs` — new.
- `.github/workflows/node.js.yml` — CI step.
