# H.W3 — Demo decomposition + invariant extension

**Opens after**: H.W2 close.
**Lanes**: 5 — A (H-OPP-3 `demo/@/lib/palette/api.ts` split), B (Gap #5 — demo/ god-module audit + remediation), C (colorSpaceInfo data lift), D (`proof:no-ts-ignore` → demo/ + close 2 hits), E (`proof:no-bare-builtins` → plugins/+scripts/+bench/ + fix outlier).
**Status**: planned.

## Scope

Close G3's `src/`-only scope to `demo/` (H3 invariant) + extend the proof-script suite to its full applicability (H4 invariant).

### Lane A — H-OPP-3: `demo/@/lib/palette/api.ts` 484 LoC → 8 modules

Per `audit/H-AUDIT-5 §demo`: `demo/@/lib/palette/api.ts` (484 LoC, 13 sections) — clear decomposition candidate mirroring G.W1 Lane B's `color/utils.ts` split. Read the file; identify the 8 cohesion-honest sub-domains (likely: palette CRUD, palette versions, palette votes, palette flags, palette forks, palette tags, user/session palette ops, admin palette ops — verify against the actual sections).

Strategy:
1. Decompose into `demo/@/lib/palette/api/{<sub-domain>}.ts` (8 files) + an `api/index.ts` barrel re-exporting all public names.
2. The original `demo/@/lib/palette/api.ts` either becomes the barrel OR is DELETED + replaced by `api/index.ts` per "NO legacy code".
3. Repoint every importer (full-repo grep — include `demo/`, `e2e/`, etc.).
4. Each new module ≤ 350 LoC (the tighter src/-discipline target; H3 wave-level allowance is ≤ 400 LoC).

**Sub-gate A**: `wc -l demo/@/lib/palette/api/*.ts` — each ≤ 350; the 484-LoC file gone (or empty barrel); zero residual importers of the old path; vitest 1584/34 GREEN; `npm run gh-pages` clean; `dist/value.js` unchanged (demo-only).

### Lane B — Gap #5: `demo/` god-module audit + remediation

Per `audit/H-AUDIT-1 Gap #5` + `audit/H-AUDIT-5`: G3 was `src/`-only — `demo/` is unaudited against ≤ 400 LoC. Run `find demo/ -name '*.ts' -o -name '*.vue' | xargs wc -l | sort -rn | head -30` and audit every file ≥ 400 LoC. For each:
- Classify (cohesion-loose → decompose; cohesion-tight → leave + document why).
- Remediate or escalate per-case.

**Sub-gate B**: zero `demo/` files > 400 LoC; OR every file > 400 LoC is documented in a per-case rationale (cohesion-tight + structurally-bounded); `npm run gh-pages` clean.

### Lane C — `colorSpaceInfo` data lift

Per `audit/H-AUDIT-5 §demo`: the large `colorSpaceInfo` object in `demo/@/components/custom/color-picker/index.ts` is pure data; lift to its own data file (`demo/@/components/custom/color-picker/colorSpaceInfo.ts` or similar). Reduces `index.ts` size + makes the data discoverable.

**Sub-gate C**: data file extracted; `index.ts` re-imports; no consumer change; `npm run gh-pages` clean.

### Lane D — `proof:no-ts-ignore` extension to `demo/`

Per `audit/H-AUDIT-6`: 2 `@ts-ignore` hits in `demo/@/components/custom/markdown/composables/useMarkdownHighlighting.ts` related to `*.css?inline` imports lacking a module declaration.

Strategy:
1. Add `declare module "*.css?inline"` to `demo/color-picker/vite.d.ts` (or the appropriate vite-env declaration file — verify).
2. Remove the 2 `@ts-ignore` annotations from `useMarkdownHighlighting.ts`.
3. Extend `scripts/proof-no-ts-ignore.mjs` to grep `src/` + `demo/` instead of just `src/`.
4. Verify `npm run proof:no-ts-ignore` exits 0 with the broader scope.

**Sub-gate D**: 2 `@ts-ignore` retired; `*.css?inline` declaration in place; `proof:no-ts-ignore` extended + exits 0; vue-tsc 0.

### Lane E — `proof:no-bare-builtins` scope extension + outlier fix

Per `audit/H-AUDIT-5 + H-AUDIT-6`: `proof:no-bare-builtins` is `api/src/`-scoped; one outlier in `plugins/vite-source-export.ts:2` (`import { readFileSync } from "fs"` — should be `node:fs`).

Strategy:
1. Fix the outlier: `plugins/vite-source-export.ts:2` → `import { readFileSync } from "node:fs"`.
2. Extend `scripts/proof-no-bare-builtins.mjs` to scan `api/src/` + `plugins/` + `scripts/` + `bench/`.
3. Verify the broader scope exits 0 at HEAD (zero other bare built-ins surfaced; if any surface, fix them too).

**Sub-gate E**: outlier fixed; proof extended; `npm run proof:no-bare-builtins` exits 0 with the broader scope.

## File bounds

| Lane | Files |
|---|---|
| A | `demo/@/lib/palette/api.ts` (DELETED), `demo/@/lib/palette/api/{<sub-domain>}.ts` (8 NEW), `demo/@/lib/palette/api/index.ts` (NEW barrel), every demo/ consumer (import-path updates), `docs/tranches/H/audit/H.W3-lane-a-palette-api-decomposition.md` (new) |
| B | per-case demo/ files (TBD by the audit); `docs/tranches/H/audit/H.W3-lane-b-demo-godmodule-audit.md` (new) |
| C | `demo/@/components/custom/color-picker/index.ts`, `demo/@/components/custom/color-picker/colorSpaceInfo.ts` (NEW), `docs/tranches/H/audit/H.W3-lane-c-colorSpaceInfo-lift.md` (new) |
| D | `demo/color-picker/vite.d.ts`, `demo/@/components/custom/markdown/composables/useMarkdownHighlighting.ts`, `scripts/proof-no-ts-ignore.mjs`, `docs/tranches/H/audit/H.W3-lane-d-no-ts-ignore-demo-ext.md` (new) |
| E | `plugins/vite-source-export.ts`, `scripts/proof-no-bare-builtins.mjs`, `docs/tranches/H/audit/H.W3-lane-e-no-bare-builtins-scope-ext.md` (new) |

## Gate

Conjunction of A + B + C + D + E. Wave-level (H3 + H4 invariants):
- Every `demo/` file ≤ 400 LoC.
- `proof:no-ts-ignore` runs over `src/` + `demo/` and exits 0.
- `proof:no-bare-builtins` runs over `api/src/` + `plugins/` + `scripts/` + `bench/` and exits 0.
- vitest 1584/34; vue-tsc 0; gh-pages clean.

## Commit plan

- `refactor(demo/w3): decompose demo/@/lib/palette/api.ts 484 LoC → 8 focused modules (H3; H.W3 Lane A)`
- `refactor(demo/w3): demo/ god-module audit + remediation (Gap #5; H.W3 Lane B)` — only if remediation happens.
- `refactor(demo/w3): lift colorSpaceInfo data to its own module (H.W3 Lane C)`
- `feat(scripts/w3): proof:no-ts-ignore extended to demo/ + close 2 demo @ts-ignore via *.css?inline module declaration (H4; H.W3 Lane D)`
- `feat(scripts/w3): proof:no-bare-builtins extended to plugins/+scripts/+bench/ + node: prefix on plugins/vite-source-export.ts (H4; H.W3 Lane E)`

## Dependencies

- Depends on: H.W2 close.
- Blocks: H.W4 (some H.W4 lanes consume the post-H.W3 demo/ state).
