# G.W3 Lane C — `proof:no-ts-ignore` (SCRIPTS-3, codifies F.W1 Lane A)

**Branch**: `tranche-g` @ `c57ec01` (G.W3 execution).
**Scope**: author `scripts/proof-no-ts-ignore.mjs` — zero `@ts-ignore`
directives in `src/` — and wire it into `package.json scripts` + the CI
workflow, per `G.W3.md §"Lane C"`.

---

## The finding

F.W1 Lane A swept the library's type-suppression debt. `@ts-ignore` silences
the compiler at a callsite without recording *why* — it rots into a latent type
hole that no later type fix can re-surface. The disciplined alternatives are
`@ts-expect-error` (which itself fails CI once the underlying error is fixed)
or, better, an honest type fix. The post-F.W1-Lane-A absence of `@ts-ignore`
had no runtime guard.

## The fix

`scripts/proof-no-ts-ignore.mjs` — identical shape to Lane B
(`proof-no-deprecated.mjs`): `execSync` grep with `cwd` pinned to `ROOT`,
`|| true` to absorb grep's no-match exit-1, count > 0 → print sites + the
F.W1 Lane A remediation → exit 1.

Wired: `package.json scripts` entry `proof:no-ts-ignore`; CI workflow step
"Proof — no @ts-ignore in src/" in the G.W3 invariant block, post-build.

## Verification

`npm run proof:no-ts-ignore` → `PASS — zero @ts-ignore in src/`, exit 0 at HEAD.

## Sub-gate C — status

- [x] Script authored + executable.
- [x] `npm run proof:no-ts-ignore` exits 0 at HEAD.
- [x] CI step wired.

## Files

- `scripts/proof-no-ts-ignore.mjs` — new.
- `package.json` — `scripts` entry.
- `.github/workflows/node.js.yml` — CI step.
