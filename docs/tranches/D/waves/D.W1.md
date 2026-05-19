# D.W1 — Contract-v2 alignment

**Opens after**: D.W0 close.
**Lanes**: 5 sequential lanes (L1–L5) per `research/Dh-contract-v2.md §2`. Single wave, single commit. Orchestrator-owned (the changes are surgical and cross-config: `package.json`, `vite.config.ts`, a new script, a precept submodule was already bumped at W0).
**Status**: planned.

## Scope

glass-ui shipped contract-v2 at `ce5aad8` / v1.9.3 (abrogates the `development` dev-resolution condition; mandates `build:watch`; inverts `proof-resolution-contract.mjs` to forbid-what-it-once-required). The fleet precept SHA `68d9b20` codifies it (advanced at D.W0). D.W1 ships value.js's compliance.

### L1 — `package.json` `exports` + `build:watch`

`package.json:23-27` currently carries the 4-key `{development, types, import, default}` shape. Contract-v2 forbids `development` in the map.

1. Edit `package.json` `exports["."]`: delete the `development` key. Final shape: `{types, import, default}`. The `default` key still resolves dev consumers because Vite + the dev demo consume via the published surface, not via the `development` condition.
2. Add `"build:watch": "vite build --mode production --watch"` to `scripts`.
3. Verify all subpath exports follow the 3-key shape (value.js's `.` is the only export today; if others exist they must conform).

### L2 — `vite.config.ts` strip `demoConditions` + `demoServerFsAllow`

`research/Dh-contract-v2.md §2 L2` cites `vite.config.ts:45` (`demoConditions`, 3 callsites) and line 50 (`demoServerFsAllow`, 2 callsites). Contract-v2 strikes both.

1. Delete the `demoConditions` constant + every callsite (the demo modes — dev / gh-pages / hero-lab — no longer need `resolve.conditions: ["development", ...]`).
2. Delete the `demoServerFsAllow` constant + every callsite (the sibling-`src/` `fs.allow` widening is gone; value.js no longer reaches into glass-ui's source via the dev condition).
3. Verify the demo dev server still boots and resolves `@mkbabb/glass-ui` correctly via the published `default` (or `import`) condition.
4. Rewrite the surrounding comment to reflect contract-v2 (no `development`, no sibling widening — the fleet resolves via the bundler/runtime condition).

### L3 — port `scripts/proof-resolution-contract.mjs`

`research/Dh-contract-v2.md §2 L3` says port verbatim from glass-ui. The script must check value.js's compliance:

1. Read `/Users/mkbabb/Programming/glass-ui/scripts/proof-resolution-contract.mjs` (or the contract-v2 version at `ce5aad8`).
2. Port to `scripts/proof-resolution-contract.mjs` in value.js, adapting paths.
3. The script asserts: zero `development` keys in `package.json` `exports`; `build:watch` script exists; consumer `resolve.conditions` carries no `development`; zero hard `dist/` aliases.
4. Add `"proof:resolution": "node scripts/proof-resolution-contract.mjs"` to `scripts`.
5. Run it: expect green.

### L4 — precepts submodule advance

Already done at D.W0 Lane 0 (`3c32fae → 68d9b20`). This lane verifies the precept content (`docs/precepts/cross-repo-dev-resolution.md` or equivalent) describes contract-v2.

### L5 — refresh `coordination/Q.md §9` keyframes.js convergence

D.W0 Lane B already authored the refreshed §9 framing. This lane re-verifies post-W1: with value.js now contract-v2 compliant, the fleet status is glass-ui ✓ / value.js ✓ / keyframes.js code-side ✓ (precept-pin off-target). Update the §9 status table.

## File bounds

| Lane | Files |
|---|---|
| L1 | `package.json` |
| L2 | `vite.config.ts` |
| L3 | `scripts/proof-resolution-contract.mjs` (new), `package.json` (add `proof:resolution` script — touches L1's package.json again; orchestrator sequences L1 then L3) |
| L4 | (no edits — verification only; the bump landed at D.W0) |
| L5 | `docs/tranches/D/coordination/Q.md` |

## Gate

**Sub-gate D.W1** (single, since the 5 lanes are surgical): `npm run proof:resolution` green; `npm run build` clean; `npm run dev` boots and resolves `@mkbabb/glass-ui` via the published surface (verified by a 1280×800 light Playwright probe — zero console errors, the demo renders the picker view); `vue-tsc` unchanged; `vitest` 1409; smoke 3/3; `package.json exports["."]` has exactly `{types, import, default}`; `vite.config.ts` carries no `development` condition or sibling-`fs.allow`.

## Verification artefacts

`audit/D.W1-contract-v2.md` — the before/after diffs (`package.json`, `vite.config.ts`), the new `proof-resolution-contract.mjs` output, the boot probe captures, the updated `coordination/Q.md §9` status.

## Commit plan

One commit: `feat(library/w1): align to contract-v2 — drop development condition, add build:watch + proof-resolution-contract.mjs`. Body cites `research/Dh-contract-v2.md` and the proof-script output.

## Dependencies

- Depends on: D.W0 (precept advance).
- Blocks: every subsequent D wave (the contract-v2 resolution must be stable before backend / frontend work).
