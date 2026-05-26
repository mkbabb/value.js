# H.W3 Lane C — `colorSpaceInfo` data lift

**Wave**: H.W3  **Lane**: C  **Source**: `docs/tranches/H/audit/H-AUDIT-5-architecture.md` §demo (color-picker `index.ts` carries a ~277-line pure-data table inline alongside the type + helper surface — data should live in its own file).

**Scope (file bounds)**:

- `demo/@/components/custom/color-picker/colorSpaceInfo.ts` (NEW — pure-data module)
- `demo/@/components/custom/color-picker/index.ts` (edited — data removed, barrel re-export added)
- `docs/tranches/H/audit/H.W3-lane-c-colorSpaceInfo-lift.md` (NEW — this doc)

**Sister-lane coordination**: Lane A (`scripts/proof-deferred-ledger-shape.mjs`), Lane B (`docs/tranches/H/H-DEFERRED-LEDGER.md` row), Lane D (`scripts/proof-no-ts-ignore.mjs` + `demo/color-picker/vite.d.ts` + `useMarkdownHighlighting.ts`), Lane E (`scripts/proof-no-bare-builtins.mjs` + `plugins/vite-source-export.ts`) — all touch disjoint paths. Zero overlap.

---

## Mission recap

Per H.W3 Lane C: the `colorSpaceInfo` object in `demo/@/components/custom/color-picker/index.ts` was a 277-line pure-data table (per-space metadata for the demo's color-space tooltip + nutrition-label rendering). The lift relocates the data to its own colocated module, leaving `index.ts` as the type + helper + barrel-only surface it was originally intended to be.

The data is consumed by exactly two SFCs (`controls/ComponentSliders.vue` + `display/ColorNutritionLabel.vue`), both of which import via the barrel (`from "../index"` / `from ".."`). A barrel re-export from the new module preserves the public surface — zero consumer-path changes required.

---

## Pre-state vs post-state

| Metric | Pre (3b0d933) | Post | Δ |
|---|---|---|---|
| `index.ts` LoC | 376 | **99** | -277 |
| `colorSpaceInfo.ts` LoC | n/a | **291** | +291 (NEW) |
| `index.ts` exports | 9 (incl. inline `colorSpaceInfo`) | 9 (incl. re-exported `colorSpaceInfo`) | unchanged |
| Consumers of `colorSpaceInfo` | 2 SFCs (both via barrel) | 2 SFCs (both via barrel, unchanged) | unchanged |
| Consumer-path edits | n/a | **0** | barrel re-export absorbs the move |

The data-file LoC (291) is +14 vs the lifted block (277) because the new module carries a 14-line module-level JSDoc explaining its role + the H.W3 Lane C provenance.

---

## What `index.ts` retains

After the lift, `index.ts` is now a 99-line barrel + type + helper surface comprising:

1. Type re-exports + Vue-component re-exports (`ColorPicker`, `ColorNutritionLabel`, `ActionBarContext`, **`colorSpaceInfo`** via re-export).
2. `EditTarget` interface.
3. `DisplayColorSpace` type + `resolveColorSpace` helper.
4. `ColorModel` type + `createDefaultColorModel` + `defaultColorModel` constant.
5. `CSS_NATIVE_SPACES` set.
6. `colorToHexString` + `toCSSColorString` helpers.
7. `DISPLAY_COLOR_SPACE_NAMES` record.

All of these are code or active type/helper machinery — none are static data tables. The lift achieves a clean data-vs-code split.

---

## What `colorSpaceInfo.ts` is

Pure data — a single `as const` typed object literal with no runtime dependencies, no imports (other than nothing — it imports nothing), and no executable code beyond the data declaration. The 14-line module-level JSDoc names its consumers (`ComponentSliders.vue`, `ColorNutritionLabel.vue`) and cross-references the `DisplayColorSpace` union it indexes against (defined in `index.ts`).

The `as const` literal type is preserved verbatim, so consumer narrowing (e.g. `colorSpaceInfo[space as keyof typeof colorSpaceInfo]` in `ColorNutritionLabel.vue:196`) continues to resolve identically.

---

## Re-export chain

```ts
// demo/@/components/custom/color-picker/index.ts:11
export { colorSpaceInfo } from "./colorSpaceInfo";
```

Both consumers continue to resolve through the barrel:

- `demo/@/components/custom/color-picker/controls/ComponentSliders.vue:121` —
  `import { colorSpaceInfo } from "../index";` — resolves through the re-export.
- `demo/@/components/custom/color-picker/display/ColorNutritionLabel.vue:170` —
  `import { colorSpaceInfo, resolveColorSpace } from "..";` — resolves through the re-export (still grouped with the sibling `resolveColorSpace` helper which remains in `index.ts`).

No consumer was edited. The re-export is a pure transparent passthrough.

---

## Consumer impact

**Zero.** Both `colorSpaceInfo` consumers import via the barrel (`from "../index"` / `from ".."`), and the barrel re-exports the symbol from its new home. No deep imports existed pre-lift, and none were introduced. `grep -rn "colorSpaceInfo" demo/` post-lift yields the same 2 consumer files with the same 2 import statements as pre-lift, plus the new declaration site (`colorSpaceInfo.ts:15`) and the barrel re-export (`index.ts:11`).

---

## Sub-gate evidence

| Gate | Pre-Lane-C | Post-Lane-C | Status |
|---|---|---|---|
| `colorSpaceInfo.ts` exists at new path | no | **yes** (291 LoC) | done |
| `index.ts` shorter than pre-state (376) | 376 | **99** | done (-277, well below the sub-376 bar) |
| `npm run gh-pages` exit code | 0 | **0** | clean (built in 1.07s) |
| `npx vue-tsc --noEmit` exit code | 0 | **0** | clean |
| `npm run lint` exit code (max-warnings 0) | 0 | **0** | clean |
| Consumer-break count | n/a | **0** | both consumers route through the barrel re-export, no path edits |

---

## Cross-references

- Source opportunity: `docs/tranches/H/audit/H-AUDIT-5-architecture.md` §demo (color-picker barrel data-vs-code split).
- Wave plan: `docs/tranches/H/waves/H.W3.md` §Lane C.
- Sister lanes: A (deferred-ledger shape proof), B (deferred-ledger row), D (`proof:no-ts-ignore` extension + `*.css?inline` decl), E (`proof:no-bare-builtins` extension + `plugins/` outlier).
- Precedent: G.W1 Lane B split `src/units/color/conversions/` from a single 1000-LoC file into 8 focused `{from}2{to}` modules — same data-vs-code / discoverability rationale, scaled larger.
