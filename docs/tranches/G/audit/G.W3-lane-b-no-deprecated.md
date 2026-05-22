# G.W3 Lane B — `proof:no-deprecated` (SCRIPTS-2, codifies F2)

**Branch**: `tranche-g` @ `c57ec01` (G.W3 execution).
**Scope**: author `scripts/proof-no-deprecated.mjs` — zero `@deprecated`
annotations in `src/` — and wire it into `package.json scripts` + the CI
workflow, per `G.W3.md §"Lane B"`.

---

## The finding

F.W3 Lane A retired the library's last deprecated surface (`lerpLegacy`) at
v0.8.0. **F2** is the standing thesis that the library carries no deprecation
debt — every consumer migrates to the canonical API at the root; no compat
shims (see `feedback_no_backwards_compat.md`). That thesis had no runtime
guard: a future `@deprecated` JSDoc tag in `src/` would land silently.

## The fix

`scripts/proof-no-deprecated.mjs` — `execSync('grep -rn "@deprecated" src/')`,
with `cwd` pinned to the repo root (`ROOT` derived from `import.meta.url`) so
the `src/` path resolves regardless of the caller's working directory. `|| true`
swallows grep's exit-1 on the clean (no-match) case so `execSync` does not
throw. Non-zero match count → print each site + the F2 remediation → exit 1.

Wired: `package.json scripts` entry `proof:no-deprecated`; CI workflow step
"Proof — no @deprecated in src/" in the new G.W3 invariant block, post-build.

## Verification

`npm run proof:no-deprecated` → `PASS — zero @deprecated in src/`, exit 0 at
HEAD.

## Sub-gate B — status

- [x] Script authored + executable (`chmod +x`).
- [x] `npm run proof:no-deprecated` exits 0 at HEAD.
- [x] CI step wired.

## Files

- `scripts/proof-no-deprecated.mjs` — new.
- `package.json` — `scripts` entry.
- `.github/workflows/node.js.yml` — CI step.
