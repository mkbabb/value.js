# E.W1 Lane E — Type-tidy + ch<T> consolidation + CLAUDE.md drift

**Branch**: `tranche-e` at HEAD `2413d616f7636e1bd24437e7b369655494ce2abb`
**Date**: 2026-05-20
**Mode**: WRITE to `src/units/normalize.ts`, `src/units/utils.ts`, `src/units/color/{index,utils,contrast}.ts`, and 5 CLAUDE.md files.
**Authority**: E.W1.md Lane E (lines 115-130) + E-AUDIT-5 §9 items 10, 12, 13.

---

## §1 — Pre-state survey

### §1.1 — `as any` sites in `src/units/normalize.ts` (per `audit/E-AUDIT-5 §5.3.1`)

Two fixable `as any` sites, both narrowing the loose `options.colorSpace?: string` field onto `ColorSpace`-typed positions:

```ts
// line 363 — inside normalizeColorUnits call
const [leftCollapsed, rightCollapsed] = normalizeColorUnits(
    asColorValueUnit(left),
    asColorValueUnit(right),
    colorSpace as any,   // ← #1
    ...
);

// line 376 — assignment to out.colorSpace: ColorSpace | undefined
out.colorSpace = colorSpace as any;  // ← #2
```

Root cause: `NormalizeValueUnitsOptions.colorSpace` was typed as `string`. The local `colorSpace` variable inherited that wider type, so both writes against `ColorSpace`-typed positions had to be widened.

### §1.2 — `getUnitGroup` chain in `src/units/utils.ts:397–401`

```ts
function getUnitGroup(unit: (typeof UNITS)[number]): [any, string] | null {
    if (LENGTH_UNITS.includes(unit as any)) return [LENGTH_UNITS, "length"];
    if (TIME_UNITS.includes(unit as any)) return [TIME_UNITS, "time"];
    if (ANGLE_UNITS.includes(unit as any)) return [ANGLE_UNITS, "angle"];
    if (FREQUENCY_UNITS.includes(unit as any)) return [FREQUENCY_UNITS, "frequency"];
    if (RESOLUTION_UNITS.includes(unit as any)) return [RESOLUTION_UNITS, "resolution"];
    return null;
}
```

5 `as any` casts on `.includes(unit as any)` + an `any` in the return type. Root cause: the `LENGTH_UNITS` etc. tuples are `readonly ["px", "em", ...]` (declared `as const`), so `.includes(x)` rejects any `x` whose narrowed type isn't a member of the tuple's union. The previous code silenced TS by suppressing the typecheck. The `unit` parameter type `(typeof UNITS)[number]` includes the sentinel `undefined` (UNITS has `undefined` as its last element).

### §1.3 — `ch<T>` brand-eraser declaration sites surveyed

Pre-state:

- `/Users/mkbabb/Programming/value.js/src/units/color/utils.ts:31` — `const ch = <T>(v: T): ColorChannel<T> => v as ColorChannel<T>;` (file-private, with JSDoc).
- `/Users/mkbabb/Programming/value.js/src/units/color/contrast.ts:6` — `const ch = <T>(v: T): ColorChannel<T> => v as ColorChannel<T>;` (file-private, no JSDoc).

Two byte-identical helpers; the brand declaration itself (`ColorChannel<T>`) lives at `src/units/color/index.ts:23`.

The other `const ch = …` occurrences in `src/units/color/index.ts:181, 189` are **unrelated** — they're local shadows binding `this.channels` (an array of channel-key strings) for tight-loop iteration in `values()` and `entries()`. Stay as-is; they don't conflict with the lifted brand-eraser because they're function-scope locals.

### §1.4 — CLAUDE.md files surveyed

| Path | Lines | Pre-state LoC drift |
|---|---|---|
| `/Users/mkbabb/Programming/value.js/CLAUDE.md` (root) | 109 | "1582 tests, 34 files" (actual: 1584/34), "21 specs" (actual: 21 — accurate today, drifts next wave), "STYLE_NAMES (630+ CSS properties)", "~200 symbols", missing `contrast.ts` + `mix.ts` in color subtree |
| `src/units/CLAUDE.md` | 56 | `index.ts # 216 loc` (actual 240), `constants.ts # 736 loc` (actual 736 — matches), `utils.ts # 373 loc` (actual 430), `normalize.ts # 196 loc` (actual 398), `STYLE_NAMES — 735+` |
| `src/units/color/CLAUDE.md` | 71 | `index.ts # 475 loc` (actual **604**, drift +129 after Lane B + Lane C), `constants.ts # 481 loc` (actual 483, close), `matrix.ts # 75 loc` (matches), `utils.ts # 1160 loc` (actual **1439**, drift +279 after Lane C DIRECT_PATHS), `normalize.ts # 122 loc` (actual 128), `gamut.ts # 321 loc` (actual 347), `colorFilter.ts # 305 loc` (matches), missing `contrast.ts` + `mix.ts` entries |
| `src/parsing/CLAUDE.md` | 75 | `index.ts # 279 loc` (actual 291), `units.ts # 108 loc` (actual 140), `color.ts # 549 loc` (actual 615, drift +66), `math.ts # 500 loc` (actual 504), `utils.ts # 50 loc` (actual 62), `css-values.bbnf # 99 loc` (matches), `css-color.bbnf # 136 loc` (matches), missing `animation-shorthand.ts` + `extract.ts` + `serialize.ts` + `stylesheet.ts` entries |
| `demo/CLAUDE.md` | 191 | "133-line authoritative catalog" (actual 133, no drift, but inlined → footgun), "13-file colocated dir … PaletteDialog.vue (340 LoC shell)" (actual 367), "237→79 LoC" (actual current 82 — close but drift-prone), "419→257" (actual 314), "230 → 201 lines net", "32 SFCs", "8 migrations across 7 SFCs", "126-typecheck cluster" |

No `src/CLAUDE.md` exists at the src root (verified by `ls`).

---

## §2 — Type-tidy diffs

### §2.1 — `src/units/normalize.ts`

Three changes, all narrowing-driven:

1. Imported `ColorSpace` type from `./color/constants` (was unimported; the file references `ColorSpace` indirectly through `NormalizeValueUnitsOptions` only).
2. Tightened `NormalizeValueUnitsOptions.colorSpace` from `string` → `ColorSpace`.
3. Annotated the local `colorSpace` variable as `ColorSpace`; removed both `as any` casts.

```diff
 import type { InterpolatedVar } from ".";
 import { parseCSSValueUnit } from "../parsing/units";
 import { memoize } from "../utils";
+import type { ColorSpace } from "./color/constants";
 import type { HueInterpolationMethod } from "./color/utils";
 import { normalizeColorUnits } from "./color/normalize";
@@
 export type NormalizeValueUnitsOptions = {
-    /** Color space for color interpolation. Default: `"oklab"`. */
-    colorSpace?: string;
+    /** Color space for color interpolation. Default: `"oklab"`. */
+    colorSpace?: ColorSpace;
     /** Hue interpolation method for cylindrical color spaces. */
     hueMethod?: HueInterpolationMethod;
 };
@@
 ): InterpolatedVar<unknown> {
-    const colorSpace = options.colorSpace ?? "oklab";
+    const colorSpace: ColorSpace = options.colorSpace ?? "oklab";
     const hueMethod = options.hueMethod;
@@
         const [leftCollapsed, rightCollapsed] = normalizeColorUnits(
             asColorValueUnit(left),
             asColorValueUnit(right),
-            colorSpace as any,
+            colorSpace,
             false,
             true,
             false,
             hueMethod,
         );
@@
-        out.colorSpace = colorSpace as any;
+        out.colorSpace = colorSpace;
         if (hueMethod) out.hueMethod = hueMethod;
```

Counts: `grep -c 'as any' src/units/normalize.ts` **2 → 0**.

Surface impact: the `colorSpace?: string` → `colorSpace?: ColorSpace` tightening is a *narrowing* change. Any external caller that was passing an invalid string would have already failed at runtime via the downstream `COLOR_SPACE_RANGES[colorSpace]` lookup — TS now flags it at compile time instead. Public API gate: `npm run build` clean; vue-tsc rose from 126 to 127 *only* in the transient state before the `getUnitGroup` chain fix, then settled back at 126.

### §2.2 — `src/units/utils.ts` (`getUnitGroup` chain)

Restructured 5-branch chain → table-driven dispatch with typed return + sentinel narrowing:

```diff
-function getUnitGroup(unit: (typeof UNITS)[number]): [any, string] | null {
-    if (LENGTH_UNITS.includes(unit as any)) return [LENGTH_UNITS, "length"];
-    if (TIME_UNITS.includes(unit as any)) return [TIME_UNITS, "time"];
-    if (ANGLE_UNITS.includes(unit as any)) return [ANGLE_UNITS, "angle"];
-    if (FREQUENCY_UNITS.includes(unit as any)) return [FREQUENCY_UNITS, "frequency"];
-    if (RESOLUTION_UNITS.includes(unit as any)) return [RESOLUTION_UNITS, "resolution"];
-    return null;
-}
+type UnitGroupName = "length" | "time" | "angle" | "frequency" | "resolution";
+
+// Widen the readonly tuple types once at the table — the runtime check is
+// `.includes(string)`, which TS would otherwise reject because the tuples are
+// declared `as const`. Widening at the table site preserves type safety at
+// every other use of the unit-tuple constants.
+const UNIT_GROUPS: ReadonlyArray<readonly [readonly string[], UnitGroupName]> = [
+    [LENGTH_UNITS, "length"],
+    [TIME_UNITS, "time"],
+    [ANGLE_UNITS, "angle"],
+    [FREQUENCY_UNITS, "frequency"],
+    [RESOLUTION_UNITS, "resolution"],
+];
+
+function getUnitGroup(
+    unit: (typeof UNITS)[number],
+): readonly [readonly string[], UnitGroupName] | null {
+    // UNITS includes `undefined` + `""` as sentinels; the unit-group tables
+    // contain only non-empty strings, so an early bail-out narrows the type
+    // for `.includes()` and dodges 5 redundant lookups for the sentinels.
+    if (typeof unit !== "string" || unit === "") return null;
+    for (const group of UNIT_GROUPS) {
+        if (group[0].includes(unit)) return group;
+    }
+    return null;
+}
```

Counts: 5 `as any` removed from this chain; the return type tightened from `[any, string]` → `readonly [readonly string[], UnitGroupName]`. The function is internal-only (file-scope; not exported), so this is non-breaking. The downstream call site `convert2()` reads `fromGroup[1] !== toGroup[1]` and destructures `const [, conversionType] = fromGroup` — both compile against the tightened return without further change.

Remaining `as any` in `src/units/utils.ts`: **1** — `const result = {} as any` in `unflattenObject` (line 82), outside this lane's prescribed scope. Documented as deferred — removing it requires a typed accumulator union for the recursive `for (const [flatKey, values] of Object.entries(flatObj))` walk, which is a separate refactor.

---

## §3 — `ch<T>` consolidation

### §3.1 — Canonical home chosen

`src/units/color/index.ts` — alongside the `ColorChannel<T>` brand declaration at line 23. Per `E-AUDIT-5 §5.1` recommendation ("Lift to `color/index.ts` … the brand declaration's home file").

### §3.2 — Lift diff

```diff
 declare const __ColorChannel: unique symbol;
 export type ColorChannel<T = number> = T & { readonly [__ColorChannel]: true };
+
+/**
+ * Brand-erasing identity helper. Casts a plain `T` value to `ColorChannel<T>`
+ * at write sites that compute channels from arithmetic / interpolation. The
+ * `ColorChannel<T>` brand on declared fields requires an explicit cast on
+ * assignment — this helper makes the intent clear and keeps the line short.
+ *
+ * Zero runtime cost (identity function; inlined by V8).
+ *
+ * E.W1 Lane E — lifted from per-file duplicates in `utils.ts` + `contrast.ts`
+ * to live alongside the `ColorChannel<T>` brand declaration. Internal-only:
+ * NOT re-exported from `src/index.ts`.
+ */
+export const ch = <T>(v: T): ColorChannel<T> => v as ColorChannel<T>;
```

### §3.3 — Duplicate deletions

```diff
--- a/src/units/color/utils.ts
+++ b/src/units/color/utils.ts
@@ -1,32 +1,22 @@
 import type { Vec3, Mat3 } from "./matrix";
 import { transformMat3, invertMat3 } from "./matrix";
 import {
     AdobeRGBColor,
+    ch,
     Color,
     DisplayP3Color,
     HSLColor,
     HSVColor,
     HWBColor,
     KelvinColor,
     LABColor,
     LCHColor,
     LinearSRGBColor,
     OKLABColor,
     OKLCHColor,
     ProPhotoRGBColor,
     RGBColor,
     Rec2020Color,
     XYZColor,
 } from ".";
-import type { ColorChannel, ColorSpaceMap } from ".";
-
-/**
- * Brand-erasing identity helper. Casts a plain `T` value to `ColorChannel<T>`
- * at write sites that compute channels from arithmetic / interpolation. The
- * `ColorChannel<T>` brand on declared fields requires an explicit cast on
- * assignment — this helper makes the intent clear and keeps the line short.
- *
- * Zero runtime cost (identity function; inlined by V8).
- */
-const ch = <T>(v: T): ColorChannel<T> => v as ColorChannel<T>;
+import type { ColorSpaceMap } from ".";
```

```diff
--- a/src/units/color/contrast.ts
+++ b/src/units/color/contrast.ts
@@ -1,9 +1,6 @@
 import { clamp } from "../../math";
-import { OKLCHColor } from ".";
-import type { Color, ColorChannel } from ".";
+import { ch, OKLCHColor } from ".";
+import type { Color } from ".";
 import { color2 } from "./utils";
-
-const ch = <T>(v: T): ColorChannel<T> => v as ColorChannel<T>;
```

### §3.4 — Verification

```
$ grep -rn 'const ch = \|const ch=' src/units/color/
src/units/color/index.ts:37:export const ch = <T>(v: T): ColorChannel<T> => v as ColorChannel<T>;
src/units/color/index.ts:195:        const ch = this.channels;
src/units/color/index.ts:203:        const ch = this.channels;
```

Exactly **one** brand-eraser source (line 37). Lines 195 + 203 are unrelated function-scope locals binding `this.channels` for tight-loop iteration in `Color.values()` and `Color.entries()` — they don't conflict with the lifted helper because they're shadowed inside their containing method body and never touch the brand type.

`ch` is internal-only — not re-exported from `src/index.ts` (verified by `grep -n '\\bch\\b' src/index.ts` returning empty).

---

## §4 — CLAUDE.md drift fixes

Strategy per E.W1.md Lane E.4: **strip the LoC counts entirely** to prevent re-drift. The file-tree listings remain (the cohesive picture of the directory's role) but per-file LoC counts are gone. Test/spec count drift in root CLAUDE.md downgraded to a `~ranged` form with a note pointing to `docs/tranches/E/FINAL.md` for exact numbers.

### §4.1 — `src/units/CLAUDE.md`

Pre-state counts: `index.ts # 216 loc` (drift +24), `constants.ts # 736 loc` (match), `utils.ts # 373 loc` (drift +57), `normalize.ts # 196 loc` (drift +202!).

Post-state: stripped 4 inline LoC counts; added a footer note pointing at `wc -l` as source of truth.

```diff
-├── index.ts        # 216 loc — core classes
+├── index.ts        # core classes
@@
-├── constants.ts    # 736 loc — unit definitions
+├── constants.ts    # unit definitions
@@
-│                     STYLE_NAMES — 735+ CSS property names (camelCase)
+│                     STYLE_NAMES — CSS property names (camelCase)
@@
-├── utils.ts        # 373 loc — unit conversion + CSS utilities
+├── utils.ts        # unit conversion + CSS utilities
@@
-├── normalize.ts    # 196 loc — value normalization for interpolation
+├── normalize.ts    # value normalization for interpolation
 ...
+
+> LoC counts intentionally omitted — `wc -l` is the source of truth.
+> Inline numbers drifted across 6 D-wave commits; E.W1 Lane E stripped them.
```

### §4.2 — `src/units/color/CLAUDE.md`

Pre-state counts (verified against `wc -l`):

- `index.ts # 475 loc` → actual **604** (drift +129 after L8 + Lane B + Lane C; the `declare` field expansions + `channelKeysWithAlpha` static-per-subclass caches + `whitePoint` lift).
- `constants.ts # 481 loc` → actual 483 (+2).
- `matrix.ts # 75 loc` → match.
- `utils.ts # 1160 loc` → actual **1439** (drift +279 after Lane C `DIRECT_PATHS` + `rgbFamily2xyz` helpers).
- `normalize.ts # 122 loc` → actual 128 (+6).
- `gamut.ts # 321 loc` → actual 347 (+26).
- `colorFilter.ts # 305 loc` → match.
- Missing entries: `contrast.ts` (112 LoC) + `mix.ts` (81 LoC).

Post-state: stripped 7 inline LoC counts; added `contrast.ts` + `mix.ts` file-tree entries; called out the `ch<T>` lift on the `index.ts` entry; added a footer note.

Key diff additions:

```diff
-├── index.ts        # 475 loc — Color<T> base class + 15 space classes
+├── index.ts        # Color<T> base class + 15 space classes
@@
 │                     ColorSpaceMap<T> discriminated union type
+│                     ColorChannel<T> phantom brand + `ch<T>` brand-eraser (E.W1 Lane E lift)
@@
-└── colorFilter.ts  # 305 loc — CSS filter solver
-                      rgb2ColorFilter() — SPSA optimization
-                      Solves: invert → sepia → saturate → hue-rotate → brightness → contrast
-                      cssFiltersToString() — format filter array to CSS
+├── colorFilter.ts  # CSS filter solver
+│                     rgb2ColorFilter() — SPSA optimization
+│                     Solves: invert → sepia → saturate → hue-rotate → brightness → contrast
+│                     cssFiltersToString() — format filter array to CSS
+├── contrast.ts     # OKLab contrast helpers
+│                     computeSafeAccent() — lightness-shift away from background
+│                     safeAccentColor() — Color → contrast-safe OKLCHColor
+│                     needsContrastAdjustment(), getOklchLightness()
+└── mix.ts          # N-color mix() helpers (CSS color-mix() with arbitrary stop counts)
```

### §4.3 — `src/parsing/CLAUDE.md`

Pre-state counts:

- `index.ts # 279 loc` → actual 291 (+12).
- `units.ts # 108 loc` → actual 140 (+32).
- `color.ts # 549 loc` → actual 615 (+66).
- `math.ts # 500 loc` → actual 504 (+4).
- `utils.ts # 50 loc` → actual 62 (+12).
- `css-values.bbnf # 99 loc` → match.
- `css-color.bbnf # 136 loc` → match.
- Missing entries: `animation-shorthand.ts`, `extract.ts`, `serialize.ts`, `stylesheet.ts`.

Post-state: stripped 7 inline LoC counts; added 4 missing entries; added footer note.

### §4.4 — `CLAUDE.md` (root)

Pre-state drift:

- "1582 tests, 34 files" → actual 1584/34.
- "21 specs" → accurate this wave, drifts the next.
- "STYLE_NAMES (630+ CSS properties)" → actual 735+ per `src/units/CLAUDE.md` claim, but inline-numbered = footgun.
- "~200 symbols" → unverified; brittle to barrel changes.
- Missing `contrast.ts` + `mix.ts` in color subtree.

Post-state: replaced exact test/spec counts with `~1580+` / `~20+` ranges + a note pointing at `docs/tranches/E/FINAL.md` for exact wave-specific numbers; stripped the "630+" inline; stripped the "~200 symbols" inline; added `contrast.ts` + `mix.ts` to the color file tree.

### §4.5 — `demo/CLAUDE.md`

Pre-state drift:

- "133-line authoritative catalog" inlined twice (DESIGN.md is currently 133, but the count is a footgun).
- "PaletteDialog.vue (340 LoC shell)" → actual 367 (drift +27).
- "237→79 LoC" → actual 82 (drift +3 on the "79" side; the historical 237 is a tranche artifact and fine).
- "419→257" memory hint vs actual 314 (the memory file already flagged this drift).
- "230 → 201 lines net" → stale historical claim about style.css; the file evolves.
- "32 SFCs" / "8 migrations across 7 SFCs" / "126-typecheck cluster" → all drift-prone.

Post-state: stripped the per-file LoC inlines (DESIGN.md "133-line" → "authoritative"; "340 LoC shell" → "shell"; "237→79 LoC" → "slimmed at D.W3 Lane D"; "230 → 201 lines net" paragraph removed); historical tranche prose paragraphs untouched (they describe the *change*, not the *current state*, so they're not drift footguns).

---

## §5 — Gates

All verification gates from the dispatch contract:

| # | Gate | Expected | Actual | Verdict |
|---|---|---|---|---|
| 1 | `npm run lint` | exit 0 | exit 0 | PASS |
| 2 | `npx vue-tsc --noEmit \| grep -c 'error TS'` | 126 | 126 | PASS |
| 3 | `npx vitest run` | 1584+ green | 1584/34 green | PASS |
| 4 | `npm run build` | clean | clean (`✓ built in 5.00s`) | PASS |
| 5 | `npm run proof:resolution` | GREEN | GREEN | PASS |
| 6 | `node bench/color-channel-access.mjs` | L8 ≥ 5× | median **10.09×** | PASS |
| 7 | `grep -rn 'as any' src/units/normalize.ts` | ≤ 1 | **0** | PASS |
| 8 | `grep -rn 'export.*ch<\|const ch\b' src/units/color/` | exactly ONE source | 1 (`index.ts:37`) + 2 local shadows in method bodies (unrelated; bind `this.channels` array) | PASS |

L8 bench (3-run median): **10.09×** vs ≥5× target. No regression from the `ch<T>` lift — the helper is import-resolved at module-init, identity function, V8-inlined. The brand erasure pattern is byte-identical to the pre-state.

---

## §6 — Files modified

- `src/units/normalize.ts` — `ColorSpace` import + `NormalizeValueUnitsOptions.colorSpace` tightened + 2 `as any` removed.
- `src/units/utils.ts` — `getUnitGroup` chain refactored to table-driven dispatch + sentinel narrowing; 5 `as any` removed + return type tightened.
- `src/units/color/index.ts` — exported `ch<T>` brand-eraser alongside `ColorChannel<T>` declaration.
- `src/units/color/utils.ts` — deleted local `ch` duplicate; now imports `ch` from `.`.
- `src/units/color/contrast.ts` — deleted local `ch` duplicate; now imports `ch` from `.`.
- `CLAUDE.md` (root) — stripped test/spec count footguns; added `contrast.ts` + `mix.ts` to color tree; stripped `STYLE_NAMES (630+)` + `~200 symbols`.
- `src/units/CLAUDE.md` — stripped 4 inline LoC counts; footer note.
- `src/units/color/CLAUDE.md` — stripped 7 inline LoC counts; added `contrast.ts` + `mix.ts` entries; noted `ch<T>` lift on `index.ts` entry; footer note.
- `src/parsing/CLAUDE.md` — stripped 7 inline LoC counts; added `animation-shorthand.ts` + `extract.ts` + `serialize.ts` + `stylesheet.ts` entries; footer note.
- `demo/CLAUDE.md` — stripped per-file LoC inlines + tranche-history exact-counts; tranche-history prose paragraphs preserved.
- `docs/tranches/E/audit/E.W1-lane-e-type-tidy.md` — this audit doc (NEW).

---

## §7 — E.W1 Lane E sub-gate verdict

**PASS.**

E.1 (`as any` cleanup): normalize.ts 2 → 0; utils.ts getUnitGroup chain 5 → 0 (with type-tightened return + sentinel narrowing). Net `as any` delta across the prescribed scope: **7 removed, 0 introduced**.

E.2 (`ch<T>` consolidation): single canonical source at `src/units/color/index.ts:37`; 2 duplicates (`utils.ts`, `contrast.ts`) deleted; 2 consumers updated to import from `.`. L8 microbench unchanged at 10.09× median.

E.3 + E.4 (CLAUDE.md drift): 5 files updated; per-file LoC inline counts stripped from all 5; missing file entries (`contrast.ts`, `mix.ts`, `animation-shorthand.ts`, `extract.ts`, `serialize.ts`, `stylesheet.ts`) added where they were absent; test/spec count footguns in root downgraded to `~ranged` with a pointer to the per-tranche FINAL.md.

All wave-level gates pass: lint clean, vue-tsc 126, vitest 1584/34, build clean, proof:resolution GREEN, L8 bench 10.09× median.
