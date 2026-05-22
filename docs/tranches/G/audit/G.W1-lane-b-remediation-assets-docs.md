# G.W1 Lane B remediation — `assets/docs/` stale `color/utils` imports

**Wave**: G.W1, Lane B remediation.
**Branch**: `tranche-g` @ `195b834` (pre-flight verified).
**Finding origin**: `audit/G.W1-state-at-open.md §5.1` (gate 6 FAIL).
**Parent lane**: `audit/G.W1-lane-b-color-utils-decomposition.md`.
**Status**: COMPLETE — gate 6 (`npm run gh-pages`) restored to PASS.

---

## §1 — The regression

### Root cause — grep scope miss

G.W1 Lane B (commit `413b47e`) decomposed the 1,430-LoC god-module
`src/units/color/utils.ts` into 9 modules — `conversions/{hex,kelvin,
cylindrical,lab,oklab,transfer,xyz-extended,direct}.ts` + `dispatch.ts`
(+ a `conversions/index.ts` aggregate barrel) — and **deleted** `utils.ts`
with no compatibility shim (per "NO legacy code").

Lane B's importer-repointing grep scoped `src/ demo/ test/` only. It did
**not** cover `assets/docs/` — the 10 color-space reference pages that the
`gh-pages` demo build compiles. Those 10 `.md` pages still imported from the
now-deleted `@src/units/color/utils`, two ways each:

- `import { … } from "@src/units/color/utils?source";` — source-text
  extraction, served by the `vite-source-export` plugin (`?source` query).
- `import { getFormattedColorSpaceRange } from "@src/units/color/utils";`
  — a plain runtime value import.

`npm run build` (library, `--mode production`) bundles only `src/` from the
`src/index.ts` barrel and never processes `assets/docs/`, so it stayed
green. `npm run gh-pages` (`--mode gh-pages`) transforms `assets/docs/*.md`
into the KaTeX reference pages, so it is the only build mode that exercises
those imports — it failed with:

```
[UNLOADABLE_DEPENDENCY] Could not load src/units/color/utils
   ╭─[ assets/docs/rgb.md:8:45 ]
 8 │ import { getFormattedColorSpaceRange } from "@src/units/color/utils";
[plugin source-export]
Error: ENOENT: no such file or directory, open
  '.../src/units/color/utils'
```

Lane B's gate matrix verified `npm run build` but not `npm run gh-pages`,
so the regression slipped past its sub-gate. This remediation lane completes
the decomposition by repointing the missed consumers.

---

## §2 — Full residual-importer enumeration

Full-repo grep (`color/utils`, all source extensions, excluding
`node_modules`, `dist/`, and the unrelated `demo/@/lib/color-utils.ts`):

### Real residual importers — 10 files, ALL in `assets/docs/`

| File | `?source` import | value import |
|---|---|---|
| `assets/docs/rgb.md` | `rgb2xyz, xyz2rgb` | `getFormattedColorSpaceRange` |
| `assets/docs/hsl.md` | `rgb2hsl, hsl2rgb` | `getFormattedColorSpaceRange` |
| `assets/docs/hsv.md` | `hsv2hsl, hsl2hsv, hsl2rgb, rgb2hsl` | `getFormattedColorSpaceRange` |
| `assets/docs/hwb.md` | `hsl2hwb, hwb2hsl` | `getFormattedColorSpaceRange` |
| `assets/docs/lab.md` | `xyz2lab, lab2xyz` | `getFormattedColorSpaceRange` |
| `assets/docs/lch.md` | `lab2lch, lch2lab` | `getFormattedColorSpaceRange` |
| `assets/docs/xyz.md` | `rgb2xyz, xyz2rgb, xyz2lab, lab2xyz` | `getFormattedColorSpaceRange` |
| `assets/docs/oklab.md` | `xyz2oklab, oklab2xyz` | `getFormattedColorSpaceRange` |
| `assets/docs/oklch.md` | `oklch2oklab, oklab2oklch, oklab2xyz, xyz2oklab` | `getFormattedColorSpaceRange` |
| `assets/docs/kelvin.md` | `kelvin2rgb, rgb2kelvin` | `getFormattedColorSpaceRange` |

No residual importers outside `assets/docs/` — `bench/`, `scripts/`, `e2e/`,
and the rest of `assets/` are clean.

### Non-importer hits (NOT modified — not module imports)

| Location | Why not an importer |
|---|---|
| `bench/color2-direct-paths.mjs:66,70,77,84,111` | Code **comments** ("Constants inlined verbatim from `src/units/color/utils.ts`…"); the bench imports `color2` from `dist/value.js`, not from the deleted module. |
| `plugins/vite-source-export.ts:19` | A JSDoc `@example` line: `import { rgb2hsl, hsl2rgb } from "@src/units/color/utils?source";`. Documentation only — no plugin **logic** references the path. **Flagged, not changed** (see §5). |
| `CHANGELOG.md`, `docs/tranches/**` (G/D/E audit + wave docs) | Historical prose/audit text quoting the old path as a record. Altering them would falsify the historical record; out of remediation scope. |

---

## §3 — Per-file repointing table

The decomposition's function→module mapping
(`audit/G.W1-lane-b-color-utils-decomposition.md §2`) was verified against
the actual exports of each new module before repointing. Each `?source`
import is repointed to the **specific** new module that now holds the
conversion code that page displays.

### `?source` source-extraction imports

| File | Old `?source` import | New `?source` import | Color-space → module rationale |
|---|---|---|---|
| `rgb.md` | `@src/units/color/utils?source` | `@src/units/color/conversions/xyz-extended?source` | `rgb2xyz`/`xyz2rgb` (sRGB↔XYZ matrix conversions) live in `xyz-extended.ts`. |
| `hsl.md` | `@src/units/color/utils?source` | `@src/units/color/conversions/cylindrical?source` | `rgb2hsl`/`hsl2rgb` are cylindrical-family conversions → `cylindrical.ts`. |
| `hsv.md` | `@src/units/color/utils?source` | `@src/units/color/conversions/cylindrical?source` | `hsv2hsl`/`hsl2hsv`/`hsl2rgb`/`rgb2hsl` all cylindrical → `cylindrical.ts`. |
| `hwb.md` | `@src/units/color/utils?source` | `@src/units/color/conversions/cylindrical?source` | `hsl2hwb`/`hwb2hsl` cylindrical → `cylindrical.ts`. |
| `lab.md` | `@src/units/color/utils?source` | `@src/units/color/conversions/lab?source` | `xyz2lab`/`lab2xyz` (CIE Lab) → `lab.ts`. |
| `lch.md` | `@src/units/color/utils?source` | `@src/units/color/conversions/lab?source` | `lab2lch`/`lch2lab` — LCh lives with Lab in `lab.ts`. |
| `xyz.md` | `@src/units/color/utils?source` (4 symbols) | **two imports**: `rgb2xyz, xyz2rgb` → `conversions/xyz-extended?source`; `xyz2lab, lab2xyz` → `conversions/lab?source` | The XYZ hub page displays both RGB↔XYZ and XYZ↔Lab source; those four functions split across two new modules, so the single import becomes two faithful imports. |
| `oklab.md` | `@src/units/color/utils?source` | `@src/units/color/conversions/oklab?source` | `xyz2oklab`/`oklab2xyz` (Ottosson OKLab) → `oklab.ts`. |
| `oklch.md` | `@src/units/color/utils?source` | `@src/units/color/conversions/oklab?source` | `oklch2oklab`/`oklab2oklch`/`oklab2xyz`/`xyz2oklab` — OKLch lives with OKLab in `oklab.ts`. |
| `kelvin.md` | `@src/units/color/utils?source` | `@src/units/color/conversions/kelvin?source` | `kelvin2rgb`/`rgb2kelvin` (Tanner Helland) → `kelvin.ts`. |

Every page's displayed source maps cleanly onto exactly one module (only
`xyz.md` legitimately spans two, because it documents two conversion
families — handled by two `?source` imports, preserving exactly what the
page rendered before).

### `getFormattedColorSpaceRange` value import (all 10 pages)

| Old import | New import |
|---|---|
| `import { getFormattedColorSpaceRange } from "@src/units/color/utils";` | `import { getFormattedColorSpaceRange } from "@src/units/color/dispatch";` |

`getFormattedColorSpaceRange` now lives in `dispatch.ts`
(`audit/G.W1-lane-b-color-utils-decomposition.md §2`). It is re-exported by
the `@src/units/color` barrel, but the demo's established convention
(`demo/@/components/custom/color-picker/display/ColorNutritionLabel.vue:157`
already imports it from `@src/units/color/dispatch`) is the direct
`dispatch` path — all 10 doc pages repointed to match that convention for
consistency.

---

## §4 — Sub-gate evidence (5 probes)

| # | Probe | Result | Evidence |
|---|---|---|---|
| 1 | Zero residual importers of the deleted module | ✅ PASS | `grep -rn 'color/utils"' …` (excl. `node_modules`/`dist`/`color-utils`) returns only historical prose in `docs/**` audit/wave files + the `vite-source-export.ts` JSDoc `@example` — **zero real `.ts`/`.vue`/`.md` module imports**. |
| 2 | `npm run gh-pages` — clean build | ✅ PASS | `✓ built in 872ms`; chunks emitted (`vendor-katex`, `vendor-highlight`, `glass-ui`, …); zero errors. This is the gate this remediation exists to restore. |
| 3 | `npm run build` — clean (library) | ✅ PASS | `✓ built in 685ms`; `dist/value.js 125.24 kB`. No regression. |
| 4 | `npx vitest run` — 1584 / 34 | ✅ PASS | `Test Files  34 passed (34)` / `Tests  1584 passed (1584)`. |
| 5 | Each doc page displays correct conversion source | ✅ PASS | Spot-check: `dist/gh-pages/assets/kelvin-*.js` contains the highlighted `kelvin2rgb` source ("Tanner Helland"); `oklab-*.js` contains `xyz2oklab`/`oklab2xyz` highlighted source; `lab-*.js` contains `xyz2lab`/`lab2xyz` highlighted source. `?source` imports resolve to source genuinely covering each space's conversion. |

### Captured output

**Probe 2 — `npm run gh-pages 2>&1 | tail -8`:**

```
dist/gh-pages/assets/color-V5EA1-Uf.js                          27.13 kB │ gzip:  10.65 kB
dist/gh-pages/assets/vendor-highlight-BfByMFox.js               34.24 kB │ gzip:  12.65 kB
dist/gh-pages/assets/PalettesPane-DMj2Kl0v.js                   50.19 kB │ gzip:  17.34 kB
dist/gh-pages/assets/vendor-katex-k7BK6QKS.js                  258.87 kB │ gzip:  77.46 kB
dist/gh-pages/assets/index-Cbe8pG4-.js                         320.93 kB │ gzip: 104.87 kB
dist/gh-pages/assets/glass-ui-CDLFmTqr.js                      390.96 kB │ gzip: 111.30 kB

✓ built in 872ms
```

**Probe 3 — `npm run build 2>&1 | tail -5`:**

```
dist/standalone-CSWytAYg.js  113.61 kB │ gzip: 36.19 kB
dist/value.js                125.24 kB │ gzip: 38.33 kB
dist/postcss-Crs0wH0W.js     197.35 kB │ gzip: 47.16 kB

✓ built in 685ms
```

**Probe 4 — `npx vitest run 2>&1 | tail -6`:**

```
 ✓ test/color-hue-interpolation.test.ts (13 tests) 2ms
 ✓ test/colorFilter-spsa.test.ts (23 tests) 752ms

 Test Files  34 passed (34)
      Tests  1584 passed (1584)
   Duration  1.33s
```

**Probe 5 — `?source` resolution spot-check (built `dist/gh-pages/assets/`):**

```
kelvin-*.js   : grep -c "hljs typescript" → 1 ; "Tanner Helland" present
oklab-*.js    : grep -c "hljs typescript" → 2 ; xyz2oklab + oklab2xyz present
lab-*.js      : grep -c "hljs typescript" → 4 ; xyz2lab + lab2xyz present
xyz-extended-*.js : rgb2xyz + xyz2rgb present
```

---

## §5 — `plugins/vite-source-export.ts` — flagged, not changed

`plugins/vite-source-export.ts:19` contains the old path inside a JSDoc
`@example` block:

```ts
 * @example
 * ```ts
 * import { rgb2hsl, hsl2rgb } from "@src/units/color/utils?source";
```

This is **documentation only** — the plugin's `resolveId`/`load` logic
resolves whatever path the importer supplies; it has no hardcoded reference
to `color/utils`. The build is unaffected by this stale example. Per the
remediation brief ("do NOT change plugin logic without flagging it first"),
this is **flagged for orchestrator disposition**, not modified. Recommended
disposition: a one-line JSDoc-comment refresh
(`@src/units/color/utils?source` → `@src/units/color/conversions/cylindrical?source`)
folded into a plugin-owning lane — cosmetic, zero functional impact.

---

## §6 — Files modified

### Repointed (10) — `assets/docs/`

`rgb.md`, `hsl.md`, `hsv.md`, `hwb.md`, `lab.md`, `lch.md`, `xyz.md`,
`oklab.md`, `oklch.md`, `kelvin.md` — import-path updates only, zero content
change.

### Audit docs (2) — `docs/tranches/G/audit/`

- `G.W1-lane-b-remediation-assets-docs.md` — this doc (NEW).
- `G.W1-state-at-open.md` — gate-6 row + §5.1 root-cause note updated to
  record: gate 6 initially FAILED at `195b834` due to the Lane B
  `assets/docs/` grep-scope miss, remediated by this lane, now PASS. No
  other row altered.

---

**Remediation complete.** All 5 sub-gate probes PASS. Gate 6
(`npm run gh-pages`) is restored to green; `npm run build` (library) and
`npx vitest run` (1584/34) remain green. The G.W1 Lane B
`color/utils.ts` decomposition is now fully consumer-complete.
