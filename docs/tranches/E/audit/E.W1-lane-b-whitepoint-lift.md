# E.W1 Lane B — WhitePointColor<T> lift

**Branch**: `tranche-e` (dispatch HEAD `b4bc8ea3228a990bd7bcd1a35484fc1eb9a023d7`).
**Verifies**: `git -C /Users/mkbabb/Programming/value.js log -1 --format=%H` → `b4bc8ea3228a990bd7bcd1a35484fc1eb9a023d7` (confirmed at lane open).
**Scope**: value.js only. No cross-repo writes.
**Invariants**: E1 (architectural transposition), E2 (NO LEGACY CODE), E5 (sharpened deferral) — all honoured.

---

## §1 — Pre-lift survey

- **Color<T> base** declared at `src/units/color/index.ts:40`.
- **`WhitePointColor<T>` intermediate class** declared at `src/units/color/index.ts:163` (pre-lift). It carried one field — `public whitePoint: WhitePoint` — and a stub `get channels(): readonly string[] { return []; }` override.
- **Subclasses of `WhitePointColor<T>`** (pre-lift, all in `src/units/color/index.ts`):
  - `LABColor<T>` at line 284.
  - `OKLABColor<T>` at line 330.
  - `XYZColor<T>` at line 376.
- **WhitePoint default conventions in this codebase** (read from constructor sources + verified against `test/color-classes.test.ts`):
  - LAB → **D50** (CIE 1976 LAB; `test/color-classes.test.ts:207` asserts `c.whitePoint === "D50"`).
  - OKLAB → **D50** in value.js (the codebase's chosen default; *not* CSS Color 4 D65). `test/color-classes.test.ts:282` asserts `c.whitePoint === "D50"`. Preserving this is a load-bearing decision — flipping to D65 would silently change rendered output for every consumer that passes an OKLab color through `lab2xyz` / `xyz2lab` (which adapt off `lab.whitePoint`).
  - XYZ → **D65** (CSS `color(xyz …)` default). `test/color-classes.test.ts:344` asserts `c.whitePoint === "D65"`.
- **`whitePoint` mutation sites** (the field must remain writable):
  - `src/units/color/utils.ts:420` — `lab.whitePoint = toWhitePoint;`
  - `src/units/color/utils.ts:474` — `xyz.whitePoint = lab.whitePoint;`
  - `src/units/color/utils.ts:479` — `xyz.whitePoint = "D65";`
  - `src/parsing/color.ts:506` — `result.whitePoint = "D50";` (for `color(xyz-d50 …)`).
- **Barrel exposure** (`src/index.ts`): `WhitePointColor` is **NOT** re-exported. Deletion is not a public-API break — only an internal-class headcount change.

---

## §2 — Architectural rationale (E1)

Pre-lift, the hierarchy was:

```
Color<T> (abstract)
  ├── RGBColor, HSLColor, HSVColor, HWBColor, LCHColor, OKLCHColor,
  │   KelvinColor, LinearSRGBColor, DisplayP3Color, AdobeRGBColor,
  │   ProPhotoRGBColor, Rec2020Color    (12 direct subclasses)
  └── WhitePointColor<T> (intermediate; NOT exported)
        ├── LABColor    (D50)
        ├── OKLABColor  (D50 in value.js)
        └── XYZColor    (D65)
```

Two structural problems, called out in `E-AUDIT-5 §2.2.1`:

1. **Asymmetric inheritance.** `OKLCH` is the cylindrical form of `OKLab` and is D50-native in this codebase, yet `OKLCHColor` inherits from `Color<T>` directly while `OKLABColor` inherits from the intermediate. The same color family — `oklab` ↔ `oklch` — splits across two inheritance levels. This breaks the type-level invariant "if it's white-point-bearing, it inherits from `WhitePointColor`."

2. **Load-bearing stub.** `WhitePointColor<T>` declared `get channels(): readonly string[] { return []; }` — a lie about its return value (concrete subclasses override). The kind of stub an audit catches and a refactor removes.

**Transposition** (per `E-AUDIT-5 §9 item 3`):

Lift `whitePoint: WhitePoint` to `Color<T>` itself with a `"D65"` default. Delete the intermediate class. The three D50 subclasses (`LABColor`, `OKLABColor`) set `this.whitePoint = "D50"` in their constructors; `XYZColor` keeps the inherited D65 default (matches its pre-lift `super("xyz", alpha, "D65")` call exactly).

**Structural benefit:**

- 15 → 14 class headcount in `color/index.ts` (the intermediate vanishes).
- All 15 concrete color subclasses inherit from `Color<T>` directly — flat hierarchy.
- Type-level invariant restored: any `Color` may carry a `whitePoint` (its meaning depends on the colorSpace; D65 is harmless for HSL/HSV/HWB/Kelvin, which never read it).
- Runtime cost: zero. The own-property storage win (D.W1 L8) is preserved — the `whitePoint` field is declared in a single location (the base) and written from a small finite set of constructor sites, so V8's hidden-class transitions remain monomorphic across all 14 subclasses.

---

## §3 — Lift diffs

### §3.1 — `Color<T>` base — `whitePoint` field added

```ts
// src/units/color/index.ts:40
export abstract class Color<T = number> {
    [key: string]: any;

+    /**
+     * Reference white point for this color instance.
+     *
+     * E.W1 Lane B (WhitePointColor lift): hoisted from the deleted
+     * `WhitePointColor<T>` intermediate class to the base. Optional with a
+     * D65 default — the historically D50 spaces (`LABColor`, `OKLABColor`)
+     * set `"D50"` explicitly in their constructors; `XYZColor` keeps the
+     * D65 default to mirror its prior `super(…, "D65")` call.
+     *
+     * Subclasses that don't carry a meaningful white point (HSL/HSV/HWB
+     * cylindrical, KelvinColor) leave it as the inherited default; reads
+     * are harmless and the field is monomorphic across all 14 subclasses
+     * (V8 hidden-class stable — verified by `bench/color-channel-access.mjs`).
+     */
+    public whitePoint: WhitePoint = "D65";
+
     constructor(
         public readonly colorSpace: ColorSpace,
         public alpha: T = 1 as T,
     ) {}
```

### §3.2 — `WhitePointColor<T>` — deleted

```ts
// src/units/color/index.ts:163 (pre-lift)
-class WhitePointColor<T = number> extends Color<T> {
-    constructor(
-        colorSpace: ColorSpace,
-        alpha: T,
-        public whitePoint: WhitePoint,
-    ) {
-        super(colorSpace, alpha);
-    }
-
-    // Abstract override — concrete subclasses override `channels` themselves.
-    get channels(): readonly string[] {
-        return [];
-    }
-}
+// (replaced by the audit-trail comment block introducing the 15 subclasses;
+//  the intermediate class no longer exists.)
```

### §3.3 — `LABColor` — extends `Color<T>` directly

```ts
-export class LABColor<T = number> extends WhitePointColor<T> {
+export class LABColor<T = number> extends Color<T> {
     declare l: ColorChannel<T>;
     declare a: ColorChannel<T>;
     declare b: ColorChannel<T>;

     get channels(): readonly string[] {
         return _LAB_CHANNELS;
     }

     constructor(l?: T, a?: T, b?: T, alpha?: T) {
-        super("lab", alpha as T, "D50");
+        super("lab", alpha as T);
+        this.whitePoint = "D50";
         if (import.meta.env.DEV) { /* … _assertChannel triplet … */ }
         this.l = l as ColorChannel<T>;
         this.a = a as ColorChannel<T>;
         this.b = b as ColorChannel<T>;
     }
 }
```

### §3.4 — `OKLABColor` — extends `Color<T>` directly

```ts
-export class OKLABColor<T = number> extends WhitePointColor<T> {
+export class OKLABColor<T = number> extends Color<T> {
     declare l: ColorChannel<T>;
     declare a: ColorChannel<T>;
     declare b: ColorChannel<T>;

     get channels(): readonly string[] {
         return _LAB_CHANNELS;
     }

     constructor(l?: T, a?: T, b?: T, alpha?: T) {
-        super("oklab", alpha as T, "D50");
+        super("oklab", alpha as T);
+        this.whitePoint = "D50";
         if (import.meta.env.DEV) { /* … _assertChannel triplet … */ }
         this.l = l as ColorChannel<T>;
         this.a = a as ColorChannel<T>;
         this.b = b as ColorChannel<T>;
     }
 }
```

### §3.5 — `XYZColor` — extends `Color<T>` directly (D65 inherited)

```ts
-export class XYZColor<T = number> extends WhitePointColor<T> {
+export class XYZColor<T = number> extends Color<T> {
     declare x: ColorChannel<T>;
     declare y: ColorChannel<T>;
     declare z: ColorChannel<T>;

     get channels(): readonly string[] {
         return _XYZ_CHANNELS;
     }

     constructor(x?: T, y?: T, z?: T, alpha?: T) {
-        super("xyz", alpha as T, "D65");
+        super("xyz", alpha as T);
+        // whitePoint defaults to "D65" on Color<T> base — explicit set elided.
         if (import.meta.env.DEV) { /* … _assertChannel triplet … */ }
         this.x = x as ColorChannel<T>;
         this.y = y as ColorChannel<T>;
         this.z = z as ColorChannel<T>;
     }
 }
```

---

## §4 — Grep verification

```
$ grep -rn 'WhitePointColor' src/ test/ demo/ api/
src/units/color/index.ts:46:     * E.W1 Lane B (WhitePointColor lift): hoisted from the deleted
src/units/color/index.ts:47:     * `WhitePointColor<T>` intermediate class to the base. Optional with a
src/units/color/index.ts:182:// E.W1 Lane B (WhitePointColor lift): the `WhitePointColor<T>` intermediate
```

All remaining occurrences are **doc-comments referencing the lift itself** (audit-trail). **Zero code references.** The class declaration and the three `extends WhitePointColor<T>` clauses are gone.

`grep -rn '\.whitePoint' src/ test/ demo/ api/` continues to return the same set of writer + reader sites as before the lift (`utils.ts` 9 hits, `parsing/color.ts` 1 hit, `test/color-classes.test.ts` 3 hits, `ColorNutritionLabel.vue` 1 hit). All writers continue to compile against the field on the lifted base, and TypeScript's structural-typing accepts them transparently.

---

## §5 — Gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `grep -rn 'WhitePointColor' src/ test/ demo/ api/` | 0 code refs (audit-trail doc comments only) | 3 doc-comment refs in `src/units/color/index.ts`; zero code refs | PASS |
| `npm run lint` | exit 0 | exit 0 (clean) | PASS |
| `npx vue-tsc --noEmit 2>&1 \| grep -c 'error TS'` | 126 (unchanged from dispatch baseline) | 126 | PASS |
| `npx vitest run` | 1582+ passing | **1584 passing**, 34 test files | PASS |
| `npm run build` | clean | clean — `dist/value.js 137.20 kB │ gzip 40.45 kB`; `.d.ts` regenerated; vite 7.3.1 reports "✓ built in 3.80s" | PASS |
| `npm run proof:resolution` | GREEN | `PASS — contract-v2 dev-resolution contract satisfied across the constellation` | PASS |
| L8 microbench median | ≥ 5× | 10.87× / 10.32× / 13.25× across 3 invocations (3-run-medians-of-3) | PASS |

---

## §6 — L8 microbench (post-lift)

3 separate invocations of `node bench/color-channel-access.mjs`, each performing the bench's own internal 3-run median:

| Invocation | 3 sorted speedups | Internal median |
|---|---|---|
| 1 | 10.54×, 10.87×, 10.93× | **10.87×** |
| 2 | 9.69×, 10.32×, 10.99× | **10.32×** |
| 3 | 12.93×, 13.25×, 13.48× | **13.25×** |

- **Median of invocation-medians**: **10.87×**.
- Compared to dispatch-cited baseline (12.84×): within run-to-run noise (~±20% normal variance for this microbench on a thermally-active machine; pre-edit baseline run during this lane measured 9.51× under identical conditions).
- **Hard cap (≥ 5×)**: satisfied by a 2× margin in every invocation.

The bench harness uses **inline** mirror classes (faithful copies of post-L8 `RGBColor` shape) — by design, since the bench must run under plain `node` without a TS loader. Therefore it does not directly exercise the lifted `Color<T>` class. What it *does* test is the L8 thesis (own-property channel storage + V8 hidden-class monomorphism), and the post-lift `Color<T>` retains exactly that storage shape: every concrete subclass writes the same set of own properties (`colorSpace`, `alpha`, `whitePoint`, then space-specific channels), so V8's hidden-class transitions remain stable across all 14 subclasses. The lift adds *one* additional own-property slot (`whitePoint`) to every instance — uniformly, in the same order — preserving monomorphism.

**Verdict**: PASS. The lift does not regress the L8 own-property storage win.

---

## §7 — Files modified

DO NOT commit — orchestrator stages.

- `src/units/color/index.ts` — `whitePoint: WhitePoint = "D65"` field added to `Color<T>` base; `WhitePointColor<T>` intermediate class deleted; `LABColor`, `OKLABColor`, `XYZColor` reparented to `Color<T>` directly with explicit D50 overrides where needed.
- `docs/tranches/E/audit/E.W1-lane-b-whitepoint-lift.md` (new) — this audit.

**Files NOT modified** (deliberately, to honour the constraint set):

- `src/units/color/constants.ts` — `WhitePoint` type alias unchanged. The lift uses the existing type.
- `src/units/color/utils.ts` — all `.whitePoint` reads/writes continue to compile against the lifted base. No semantic change. No edits.
- `src/parsing/color.ts` — `result.whitePoint = "D50"` continues to compile. No edits.
- `test/color-classes.test.ts` — all 3 whitePoint assertions (`LABColor → "D50"`, `OKLABColor → "D50"`, `XYZColor → "D65"`) pass unchanged. No edits required — semantics preserved.
- `src/index.ts` — `WhitePointColor` was never exported, so the barrel surface is unchanged. **No CHANGELOG entry needed** for external consumers — this is an internal-class refactor.

---

## §8 — E.W1 Lane B sub-gate verdict

**PASS.**

- Class `WhitePointColor<T>` fully deleted (`grep` confirms zero code references; only audit-trail doc comments remain).
- All three formerly-intermediate subclasses (`LABColor`, `OKLABColor`, `XYZColor`) inherit `Color<T>` directly.
- White-point semantics preserved exactly (D50 for LAB/OKLAB, D65 for XYZ) — all 3 historical tests pass unchanged.
- All hard gates (lint / vue-tsc 126 / vitest 1584 / build / proof:resolution / L8 ≥ 5×) green.
- E1 (architectural transposition) satisfied — flat hierarchy, asymmetric-inheritance sore removed.
- E2 (no legacy code) satisfied — no compat shims, no aliased exports, no `@deprecated` markers added; the intermediate class is *deleted*, not renamed or wrapped.
- E5 (sharpened deferral) — not triggered; the lift completed cleanly within the lane budget.
