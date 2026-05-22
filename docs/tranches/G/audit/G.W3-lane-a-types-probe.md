# G.W3 Lane A — `proof:resolution` types-key existence probe (SCRIPTS-1)

**Branch**: `tranche-g` @ `c57ec01` (G.W3 execution).
**Scope**: extend `scripts/proof-resolution-contract.mjs` with a probe that
`package.json` `exports["."].types` resolves to an actually-emitted file in
`dist/`. F.W3 Lane F successor (deferred per its OPTIONAL framing), per
`G.W3.md §"Lane A"`.

---

## The finding

The contract-v2 publisher-shape check (Check 1) asserts that `exports["."]`
carries a `types` key and that its value is a **string**. It does NOT assert
that string resolves to anything real. A stale `types` value — a renamed dts
target, a build that never ran, a flat-vs-nested dts-layout regression — passes
Check 1 unchanged but ships broken typings to every consumer of the package.

`proof:dts-layout` already guards the *flat-layout* invariant (`dist/index.d.ts`
present, `dist/src/` absent). The new probe is complementary: it binds the guard
to the actual `exports["."].types` *declared path*, so a future edit that
repoints the key — or omits the build — fails closed.

## The fix

Added **Check 4 — `checkLocalTypesTarget()`** to
`scripts/proof-resolution-contract.mjs`:

- Reads the local repo's `package.json` (`ROOT/package.json` — the script
  derives `ROOT` from its own location, so this is value.js itself).
- Resolves `exports["."].types` relative to `ROOT`.
- `existsSync()` on the resolved path; on miss, emits a `[types-key]` violation
  with the declared path, the resolved absolute path, and the remediation
  (`npm run build`).

Scoped to the **local repo only**: `dist/` is a build artifact, and sibling
`@mkbabb/*` repos' `dist/` directories are not guaranteed populated when this
gate runs in value.js's CI. The check would false-fault on a sibling whose
`dist/` simply hasn't been built in the current checkout.

Violations are threaded into the existing failure-print path under a new
`[types-key]` label, and the `Summary:` line now reports the third count.

## Verification

| State | Script exit |
|---|---|
| `dist/index.d.ts` present (HEAD, post-`npm run build`) | **0** — PASS |
| `dist/index.d.ts` temporarily renamed away | **1** — FAIL, `1 types-key violation(s)` |
| file restored | **0** — PASS |

The negative test (temporary `mv` of `dist/index.d.ts`, then restore) confirms
the probe fails closed exactly as Sub-gate A requires.

## Sub-gate A — status

- [x] Script probes the types-key.
- [x] `npm run proof:resolution` exits 0 at HEAD.
- [x] New gate exits 1 if the types-key target is missing (verified by
      temporary `mv`).

## Files

- `scripts/proof-resolution-contract.mjs` — extended (Check 4 + header +
  failure-print wiring).
