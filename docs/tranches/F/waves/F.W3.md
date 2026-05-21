# F.W3 — `lerpLegacy` delete + CI substrate hygiene (v0.8.0 candidate)

**Opens after**: F.W2 close (keyframes.js codemod applied + tests PASS).
**Lanes**: 5-6 — A (lerpLegacy delete — F2 invariant — v0.8.0 BREAKING), B (CHANGELOG-changed gate broadening), C (vue-tsc baseline lowering 126 → 120 or post-F.W0/F.W1 actual), D (dts-shape invariant guard), E (bundle-size gate), F (proof:resolution types-key probe — optional).
**Status**: planned.

## Scope

F.W3 lands the LONE BREAKING change for v0.8.0 (`lerpLegacy` delete — the F2 sharpening) + the 5 CI substrate-hygiene gates surfaced by F-AUDIT-6 §6/§7.

### Lane A — `lerpLegacy` delete (F2 invariant — v0.8.0 BREAKING)

Per F.md §1 + F2 invariant: with F.W2's keyframes.js verification GREEN, `lerpLegacy`'s (a)(b)(c) trigger is satisfied. Delete:

1. `src/math.ts`: delete the `lerpLegacy` const + its JSDoc.
2. `src/index.ts`: delete the `lerpLegacy` barrel export entry.
3. **Update CHANGELOG.md** with the v0.8.0 entry — `lerpLegacy` removed is the SOLE BREAKING change in v0.8.0.

Verify:
- `grep -rn '@deprecated' src/` returns ZERO (per F2).
- `grep -rn 'lerpLegacy' src/ test/` returns ZERO.
- vitest 1584/34 still GREEN (no test for `lerpLegacy` since its tests rode on the `lerp` test suite at E close per E.W1 Lane A audit).
- `npm run build` clean; record `dist/value.js` size delta (expect small reduction).
- `npm run proof:resolution` GREEN.
- `dist/value.d.ts` (or `dist/math.d.ts` post-W12-unblocker flat layout) no longer carries `lerpLegacy` type signature.

**Sub-gate A**:
- `grep '@deprecated' src/` = ZERO.
- `grep 'lerpLegacy' src/ test/ dist/` = ZERO.
- CHANGELOG v0.8.0 BREAKING entry authored.
- Gates GREEN.

### Lane B — CHANGELOG-changed gate broadening

Per F-AUDIT-6 §5 + §7: the W8-W12 dep-only commits slipped through E.W4 Lane B's CHANGELOG-changed gate because the gate's `^src/` filter doesn't fire on `package.json`/`package-lock.json` only commits.

Broaden the gate in `.github/workflows/node.js.yml`:

```yaml
- name: Assert CHANGELOG touched when src/, package.json, vite/ts config, or api/ is touched
  if: github.event_name == 'pull_request'
  run: |
    git diff --name-only origin/main...HEAD > diff-files.txt
    if grep -qE "^(src/|package\\.json$|vite\\.config\\.ts$|tsconfig\\.json$|api/(src/|package\\.json$))" diff-files.txt; then
      grep -q "^CHANGELOG\\.md$" diff-files.txt || (echo "CHANGELOG.md must be updated when src/, package.json, vite.config.ts, tsconfig.json, or api/ source/manifest is touched" && exit 1)
    fi
```

Lockfile-only (`package-lock.json` only) changes still excluded — pure version-resolution updates don't need CHANGELOG entries.

**Sub-gate B**: Gate broadened + verified locally via dry-diff (the W8-W12 commits would have failed the broader gate; F-W0/F-W1 commits all touch CHANGELOG so they pass).

### Lane C — vue-tsc baseline lowering

Per F-AUDIT-3 §3 + F-AUDIT-6 §6: vue-tsc count drifted from 126 (E close) → 120 (post-W12) and may drop further after F.W0 Lane A (-2 from Github fix) + F.W1 Lane C (-X from dead-code sweep). Update the CI gate:

```yaml
- name: Assert vue-tsc count
  run: |
    COUNT=$(npx vue-tsc --noEmit 2>&1 | grep -c 'error TS')
    if [ "$COUNT" -gt <BASELINE> ]; then
      echo "vue-tsc count rose: $COUNT (gate ≤ <BASELINE>)"
      exit 1
    fi
```

Replace `<BASELINE>` with the post-F.W0/F.W1 count (TBD at lane dispatch — likely ~112-118).

Update `VENDOR-POLICY.md` to reflect the new baseline.

**Sub-gate C**: CI gate baseline lowered to actual post-F.W1 count. VENDOR-POLICY.md updated.

### Lane D — dts-shape invariant guard

Per F-AUDIT-3 §6 + F-AUDIT-6 §6: the W12-unblocker fix (`e1549e0`) introduced the flat-`dist/` dts emission. Add a guard so any future regression to `dist/src/*.d.ts` layout fails CI.

Author `scripts/proof-dts-layout.mjs`:

```mjs
#!/usr/bin/env node
/**
 * Verifies dist/ dts emission is at the flat layout (post-W12-unblocker e1549e0).
 * - dist/value.d.ts present (the public barrel typings).
 * - dist/units/, dist/parsing/, etc. dirs may exist with per-subdir dts.
 * - dist/src/ MUST NOT exist (regression to per-source emission).
 *
 * Exit 0 on PASS; exit 1 with diagnostic on FAIL.
 */
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(import.meta.dirname, "../dist");
const errors = [];

if (!fs.existsSync(path.join(dist, "value.d.ts"))) {
  errors.push("dist/value.d.ts MISSING (W12-unblocker regression)");
}
if (fs.existsSync(path.join(dist, "src"))) {
  errors.push("dist/src/ PRESENT (W12-unblocker regression — should be flat)");
}

if (errors.length > 0) {
  console.error("[proof:dts-layout] FAIL");
  errors.forEach(e => console.error("  - " + e));
  process.exit(1);
}
console.log("[proof:dts-layout] PASS — flat dist/ dts emission");
```

Add `proof:dts-layout` to `package.json:scripts` + as a CI step after `npm run build`.

**Sub-gate D**: Script authored + executable; CI step wired; passes at HEAD.

### Lane E — Bundle-size gate

Per F-AUDIT-6 §6: add a CI gate asserting `dist/value.js` size stays within budget. Post-W12 raw is ~125 KB; post-Lane-A delete likely ~123-124 KB. Budget: ≤ 145 KB raw (current + ~20 KB headroom — allows future feature work without immediate gate failure).

```yaml
- name: Assert dist/value.js size budget
  run: |
    SIZE=$(stat -c %s dist/value.js)
    if [ "$SIZE" -gt 148480 ]; then  # 145 KB
      echo "dist/value.js size budget exceeded: $SIZE bytes (gate ≤ 148480)"
      exit 1
    fi
    echo "dist/value.js size: $SIZE bytes (gate ≤ 148480)"
```

The size check follows `npm run build`.

**Sub-gate E**: Gate added; passes at HEAD.

### Lane F — proof:resolution types-key probe extension (OPTIONAL)

Per F-AUDIT-2 carry-forward: `scripts/proof-resolution-contract.mjs` currently probes `import` + `default` keys. Extend to probe `types` key resolves to a valid emitted file.

If F.W3 is on a tight critical path, defer this lane to F.W4 close-prep OR a successor tranche. If included:

1. Read `scripts/proof-resolution-contract.mjs`.
2. Add a probe: load `package.json`, read `exports["."].types`, verify the resolved file exists in `dist/`.
3. Verify the script still exits 0 at HEAD.

**Sub-gate F**: Optional — if included, script extended + GREEN.

## File bounds

| Lane | Files |
|---|---|
| A | `src/math.ts` (delete lerpLegacy + JSDoc), `src/index.ts` (delete barrel export), `CHANGELOG.md` (v0.8.0 BREAKING entry), `audit/F.W3-lane-a-lerplegacy-delete.md` (new) |
| B | `.github/workflows/node.js.yml` (CHANGELOG-gate broadening), `audit/F.W3-lane-b-changelog-gate.md` (new) |
| C | `.github/workflows/node.js.yml` (vue-tsc baseline), `VENDOR-POLICY.md` (baseline update), `audit/F.W3-lane-c-vuetsc-baseline.md` (new) |
| D | `scripts/proof-dts-layout.mjs` (new), `package.json` (add `proof:dts-layout` script), `.github/workflows/node.js.yml` (CI step), `audit/F.W3-lane-d-dts-invariant.md` (new) |
| E | `.github/workflows/node.js.yml` (bundle-size step), `audit/F.W3-lane-e-bundle-gate.md` (new) |
| F (optional) | `scripts/proof-resolution-contract.mjs` (types-key probe), `audit/F.W3-lane-f-types-probe.md` (new) |

## Gate

Conjunction of sub-gates A + B + C + D + E (+ F if included). Wave-level:
- `grep '@deprecated' src/` = ZERO (F2 invariant satisfaction).
- `grep 'lerpLegacy' src/ test/` = ZERO.
- vue-tsc baseline lowered per Lane C.
- CHANGELOG-gate broadened per Lane B.
- dts-shape invariant + bundle-size gates GREEN per Lanes D + E.
- All E gates remain GREEN (lint, vitest, build, gh-pages, proof:resolution, smoke 36/36, bench medians).

## Verification artefacts

5-6 per-lane audit docs.

## Commit plan

- `feat(library/w3)!: delete lerpLegacy — F2 invariant satisfied + v0.8.0 BREAKING (F.W3 Lane A)`
- `feat(ci/w3): broaden CHANGELOG-changed gate to catch dep-only commits (F.W3 Lane B)`
- `chore(ci/w3): lower vue-tsc baseline to post-F.W1 actual (F.W3 Lane C)`
- `feat(ci/w3): add dts-shape invariant guard (W12-unblocker regression guard; F.W3 Lane D)`
- `feat(ci/w3): add bundle-size gate (dist/value.js ≤ 145 KB; F.W3 Lane E)`
- (optional) `feat(scripts/w3): extend proof:resolution to probe types key (F.W3 Lane F)`

## Dependencies

- Depends on: F.W2 close (keyframes.js codemod applied + tests PASS).
- Blocks: F.W4 close (v0.8.0 release blocked on this wave's gates).
