# D-REACTIVITY-A — recursion + infinite nesting class

**Lane**: REACTIVITY-A (heaviest hardening lane — D-fold)
**Audit-date**: 2026-05-19 (HEAD `56feb87`, branch `tranche-b`)
**Mode**: READ-ONLY — no code edits, no git mutations.
**Scope**: `Color<T>` / `ValueUnit<T>` infinite-nesting bug class. Verify the Mar-2026 fix is still in place; audit the D.W1-L8 own-property flatten plan for re-introduction risk; propose hardening primitives.

---

## §1 Commit-history excavation

### Bug introduction

Commit **`35cd9d5`** — "Initial move to new repo 🎉" (Wed Jul 17 2024).
File: `src/units/color/normalize.ts` created with `colorUnit2()` containing:

```ts
convertedColor.entries().forEach(([key, value]) => {
    convertedColor[key] = new ValueUnit(value);     // <-- bug: no unwrap before re-wrap
});
```

The bug shipped on day one of the new-repo move. It survived four refactors that touched the same function without changing the wrap line:

| Commit | Title | Touched `colorUnit2` line |
|---|---|---|
| `2446320` | initial optimization refactor (Apr 10 2025) | added blank lines, kept the wrap |
| `ec41420` | Clean up source modules | unrelated edits |
| `d480c31` | Fix TypeScript type errors in ColorPicker and normalize | type-only |
| `3789166` | refactor: enable TypeScript strict mode | type-only |
| `4898ab1` | xyz-d50 adaptation, Q unit, ex/ch measurement (Feb 26 2026) | changed default to `oklab`, did not touch the wrap |

For ~19 months the bug was latent. It only surfaced under iOS Safari's smaller stack + the spectrum-drag's per-frame `colorUnit2` invocation.

### Bug fix

Commit **`80cdd59`** — "fix: prevent ValueUnit nesting stack overflow on iOS Safari spectrum drag" (Sun Mar 1 23:12:20 2026).
Diff at `src/units/color/normalize.ts:94`:

```diff
 convertedColor.entries().forEach(([key, value]) => {
-    convertedColor[key] = new ValueUnit(value);
+    // Fully unwrap nested ValueUnits to prevent progressive nesting.
+    // Conversion functions pass alpha through as-is, so if the input had
+    // ValueUnit<number> components, alpha arrives still wrapped. Without
+    // unwrapping, each frame adds a layer: VU<VU<VU<...>>> → stack overflow.
+    let raw: any = value;
+    while (raw instanceof ValueUnit) raw = raw.value;
+    convertedColor[key] = new ValueUnit(raw);
 });
```

The commit body cites the exact failure mode: "After ~294 frames on iOS Safari (smaller stack), `clone()` recursion hit the stack limit."

### "Only accumulation site" claim — verification

Memory note claims `colorUnit2()` was the **only** accumulation site. The `git log -S 'instanceof ValueUnit'` history shows zero further unwrap-loops added since `80cdd59`. The current tree's unwrap-loop count is **1** (verified §2). Combined with §7's sweep across the new B.W3 files, the claim **holds** as of `56feb87`.

---

## §2 Fix-site verification

### Current unwrap-loop count

```bash
grep -rn "while.*instanceof" src/
# src/units/color/normalize.ts:102:        while (raw instanceof ValueUnit) raw = raw.value;
```

**Exactly 1 unwrap loop** in the entire `src/`. It is the original fix, intact at `src/units/color/normalize.ts:102` (line offset stable from `80cdd59`).

### Other `instanceof ValueUnit` checks (defensive reads, not unwraps)

| File:line | Purpose | Risk? |
|---|---|---|
| `src/units/color/normalize.ts:49` | `normalizeColor()` — reads `.value` if wrapped, else uses scalar | **safe** (single-level peel for read) |
| `src/units/color/normalize.ts:102` | **the fix** — full unwrap loop before re-wrap | **safe** (the canonical guard) |
| `src/parsing/math.ts:239,265,340,483` | `resolveToNumber`/`resolveToRadians`/`inferResultUnit` — type guards, never re-wraps | **safe** |
| `src/units/interpolate.ts:53,54,58` | `lerpColorValue` — reads `.value` from wrapped components, mutates in place | **safe** (no `new ValueUnit` call in this function) |
| `src/units/normalize.ts:164` | `getComputedValue` — returns existing VU if matrix-parse returns one | **safe** |
| `src/parsing/color.ts:47` | `resolveToPlainColor` — single-level peel, returns plain number | **safe** |

**`instanceof Color` count: 0.** No code path peels-then-re-wraps a Color, so Color-nesting (`Color<Color<…>>`) is not a runtime structure today. The risk that L8 introduces is precisely the one §4 covers.

### `new ValueUnit(...)` audit — sites where input might be already-wrapped

Two hot-loop sites that could re-wrap:

1. **`src/units/color/normalize.ts:103`** — the fix site. Guarded by the unwrap loop. ✅
2. **`src/units/color/normalize.ts:38`** — `normalizeColorUnitComponent`. Input is a plain `number` (parameter typed `v: number`). The only caller, `normalizeColor()` at line 50, peels via `instanceof ValueUnit`. ✅
3. **`src/units/color/normalize.ts:77`** — `normalizeColorUnit()` constructs `new ValueUnit(normalizedColor)` where `normalizedColor` is a Color (return type of `normalizeColor`). Color is never wrapped, so no nesting. ✅

All other `new ValueUnit(…)` sites (~40 across `src/parsing/`) receive parser-produced primitives (numbers, strings, parsed sub-trees from `parse-that`), not already-wrapped ValueUnits.

### `clone()` recursion topology — the amplifier

`src/utils.ts:7-22` global `clone()`:

```ts
export function clone(obj: any): any {
    if (isObject(obj)) { /* recurse Object.entries */ }
    else if (obj != null && typeof obj.clone === "function") {
        return obj.clone();     // <-- delegates to class .clone()
    } else if (Array.isArray(obj)) { return obj.map(clone); }
    else { return obj; }
}
```

`src/units/index.ts:65-75` `ValueUnit.clone()`:

```ts
clone(): ValueUnit<T, U> {
    const value = new ValueUnit<T, U>(
        clone(this.value),       // <-- recurses back into utils.clone(), which calls value.clone() if it has one
        this.unit, ...);
    return value;
}
```

`src/units/color/index.ts:69-80` `Color.clone()`:

```ts
clone(): this {
    const Constructor = this.constructor as new (...args: any[]) => this;
    const cloned = new Constructor();
    cloned.alpha = clone(this.alpha);
    this.components.forEach((value, key) => {
        cloned.components.set(key, clone(value));     // <-- recurse per component
    });
    return cloned;
}
```

**Amplification math**: a depth-`N` nested `ValueUnit<…<ValueUnit<x>>>` triggers `N+1` recursive `clone()` calls. Each frame of the iOS Safari drag added one layer → after ~294 frames the stack depth equalled iOS Safari's limit. The fix prevents new layers from being added but does **not** depth-limit `clone()` itself — see §5(d).

---

## §3 `colorUnit2 / normalizeColorUnit / denormalizeColorUnit` dataflow map

### Dataflow

```
Input: ValueUnit<Color<ValueUnit<number>>, "color">
        │
        ▼
[normalizeColorUnit]  (if !normalized)
        │     clones outer VU + walks Color.keys()
        │     each component: ValueUnit | number → ValueUnit<scaled_number, "">
        │     uses normalizeColorUnitComponent → new ValueUnit(value, "")
        ▼
ValueUnit<Color<ValueUnit<number, "">>, "color">     (normalized, [0,1])
        │
        ▼
normalizedColorUnit.toJSON() — returns this.value (the inner Color)   ← see §3.1
        │
        ▼
color2(Color<ValueUnit<number>>, to)  — XYZ-hub conversion
        │     conversion fns destructure: const {l, a, b, alpha} = color
        │     numeric math triggers ValueUnit.valueOf() via operator coercion
        │     r/g/b/etc come out as PLAIN NUMBERS
        │     alpha: passed through as-is — STILL WRAPPED if input was wrapped
        ▼
convertedColor (a new Color instance)
   components: Map { l: number, a: number, b: number }
   alpha:     ValueUnit<number>           ← the loaded gun
        │
        ▼
[the fix at line 102] for each [key, value]:
   raw = value
   while (raw instanceof ValueUnit) raw = raw.value
   convertedColor[key] = new ValueUnit(raw)        ← always depth-1
        │
        ▼
Output: ValueUnit<Color<ValueUnit<number>>, "color">     (in target space)
```

### §3.1 The latent-foot-gun: `Color.toJSON()` semantics

`src/units/color/index.ts:60-67`:

```ts
toJSON(): Record<string, T> {
    const obj: Record<string, T> = {};
    for (const [key, value] of this.entries()) {
        obj[key] = value;       // <-- pass-through; values are STILL T (i.e. ValueUnit<number>)
    }
    obj["alpha"] = this.alpha;
    return obj;
}
```

Note: `Color.toJSON()` is misleadingly named — it does **not** unwrap. It just snapshots the entries into a plain record. The wrapping is preserved. The fact that `color2()`'s downstream destructuring still works is an accident of `ValueUnit.valueOf()` returning the inner value, so JS coercion of `vu * 2.0` produces a number — but only inside arithmetic. Pass-through paths (like `alpha → alpha`) preserve the wrapping.

### §3.2 Where nesting *could* form pre-fix

The pre-fix code re-wrapped the alpha entry in `new ValueUnit(value)` where `value` was already `ValueUnit<number>`. After K frames of `oklab → oklab` round-trip via the spectrum drag, depth grew linearly. The fix's `while`-loop normalizes any pre-existing depth back to 1 every call.

### §3.3 The `denormalize` half (inverse=true)

`colorUnit2(..., inverse=true)` recurses through `normalizeColorUnit(normalizedColorUnit, true, true)`. The inverse path also goes through `normalizeColor()` line 47-60, which peels-once via `instanceof ValueUnit`. **Safe**, but only one-level — if a depth-2 nest somehow forms (it shouldn't post-fix), the inverse path silently keeps depth-1 instead of crashing.

---

## §4 D.W1-L8 Color-flatten re-introduction risk

### The plan (from `docs/tranches/D/waves/D.W1.md:83-109`)

Flatten `Color<T>` storage from `Map<string, T>` to own properties:

```ts
class OKLab<T = number> extends Color<T> {
    declare L: T;
    declare a: T;
    declare b: T;
    declare alpha?: T;
}
```

`color.components.get("L")` becomes `color.L`. Plan's expected ripple: ~20 consumer files; expected risk: type-narrowing.

### Risk catalogue under L8

The Map storage was an **implicit guard** in one specific sense: `Map.set(key, value)` accepts any `value`, so type-broadening was the norm rather than a bug. With own-property storage, the *same* type-broadening is still possible at runtime (JS has no type-checked setters) — but the API surface is now larger because every consumer writes `color.L = expr` directly, whereas pre-L8 only `setComponent()` and `components.set()` were write sites.

Each `.L = X` or `.a = X` assignment in the post-L8 tree is a potential nesting site if `X` is itself a `Color` or a `ValueUnit<Color>`. **The Map-keyed setter was a chokepoint; flattening removes the chokepoint.**

#### Per-site risk audit (post-L8)

Files that **will** write to component props after L8 (extrapolated from current grep of `setComponent`, `components.set`, and the L8 plan's named consumers):

| Site | Pattern (post-L8) | Risk | Source of incoming value |
|---|---|---|---|
| `src/units/color/normalize.ts:53` (`normalizeColor` write) | `color[component] = normalizeColorUnitComponent(...)` | 🟢 low | Output of `normalizeColorUnitComponent`: always `new ValueUnit(scalar, "")` — depth-1 by construction |
| `src/units/color/normalize.ts:103` (`colorUnit2` write) | `convertedColor[key] = new ValueUnit(raw)` | 🟢 low | Guarded by unwrap loop |
| `src/units/color/utils.ts:391-407` (`xyz2lab`) | `new LABColor(L, a, b, xyz.alpha)` via constructor | 🟡 **medium** | `xyz.alpha` is `T` and passes through — if `xyz` was `XYZColor<ValueUnit<number>>` and a caller assigned a `ValueUnit<ValueUnit<…>>` to `xyz.alpha`, the wrapping survives. Today the constructor calls `this.components.set("alpha", alpha)` indirectly (well, sets the alpha field via `super(colorSpace, alpha)`). Post-L8: `this.alpha = alpha` — same shape. **No regression**. |
| All 30+ `new XColor(...)` constructors in `src/units/color/utils.ts` | constructor params bypass any setter logic | 🟡 medium | Same as above — TS type `T` is the only guard. With `T = ValueUnit<number>`, `new ValueUnit(some_already_wrapped)` would slip past. |
| `src/parsing/color.ts:262,267,273,280,...` (color parsers) | `new RGBColor(r, g, b, alpha)` etc. | 🟢 low | Inputs are parsed `ValueUnit` from `colorValue`/`colorOptionalAlpha` — always depth-1 from parse-that primitives |
| **Demo-side iterators** (the ~15 consumer files L8 mentions) | `color.L = newVal` | 🔴 **high** | Demo composables (`useColorModel`, `useGradientInterpolation`, etc.) iterate over channels in animation loops. If any path computes `newVal` from a previously-read `color.L` *plus a wrap step*, this is exactly the iOS Safari pattern. The Map chokepoint hid this. **Audit the ~15 consumer files at L8 commit time** — not pre-emptively, but with a dedicated sub-gate. |

#### Per-site guards proposed

For each `Color` subclass after L8, the field-write site is the setter (auto-generated by `declare`-with-class-fields) or the constructor. Recommended runtime guards:

- **(A) Class-field initialiser** — add a `protected _set<K extends keyof this>(key: K, value: this[K])` method in `Color` base. All sub-class constructors and internal writers go through it. Guard inside `_set`: `if (process.env.NODE_ENV !== "production") assertNotNested(value)`. (Sketch in §5(b).)
- **(B) Constructor invariant** — each `new XColor(a, b, c, alpha)` runs `assertNotNested(a); assertNotNested(b); …` in dev only.
- **(C) Compile-time brand** — see §5(a). The brand is the cheapest defence; it costs zero runtime and zero bytes, but only works for code that respects the type.

---

## §5 Hardening primitives — sketches

### (a) TypeScript brand for component channels

```ts
// src/units/color/brand.ts (new)
declare const __ColorChannel: unique symbol;

/** A channel value — branded T to prevent assigning Color/ValueUnit<Color> by accident. */
export type ColorChannel<T = number> = T & { readonly [__ColorChannel]: true };

/** Brand a value (no-op at runtime, narrows the type). Use only at construction or after assert. */
export const channel = <T>(v: T): ColorChannel<T> => v as ColorChannel<T>;

// In src/units/color/index.ts:
abstract class Color<T = number> {
    abstract readonly colorSpace: ColorSpace;
    abstract alpha: ColorChannel<T>;
    // … each concrete subclass uses ColorChannel<T> for its declared fields
}

class OKLab<T = number> extends Color<T> {
    declare L: ColorChannel<T>;
    declare a: ColorChannel<T>;
    declare b: ColorChannel<T>;
    declare alpha: ColorChannel<T>;
}
```

**Effect**: a consumer writing `instance.L = otherColor` fails to compile because `otherColor` is not a `ColorChannel<T>`. The brand can be stripped via `channel()` (which functions as an assertion), so escape hatches are explicit.

**Cost**: zero runtime bytes. Zero behavioural change. The brand is purely a phantom type.

**Limit**: doesn't protect ad-hoc `(color as any).L = otherColor`. That's an accepted trade-off — the brand catches the *naïve* form, which is the one that historically caused the bug.

### (b) Runtime invariant (dev-only assertion)

```ts
// src/units/color/brand.ts (additions)
import { ValueUnit } from "../index";
import { Color } from "./index";

const IS_DEV = process.env.NODE_ENV !== "production";

/** Assert a channel value is not a Color/ValueUnit (would nest). Free in production. */
export function assertNotNested(value: unknown): void {
    if (!IS_DEV) return;
    if (value instanceof Color) {
        throw new Error(
            `Color channel nesting detected: tried to assign a Color into a channel slot. ` +
            `This is the iOS Safari stack-overflow pattern. Unwrap before assigning.`,
        );
    }
    if (value instanceof ValueUnit && value.value instanceof ValueUnit) {
        throw new Error(
            `ValueUnit double-wrap detected: tried to assign ValueUnit<ValueUnit<…>>. ` +
            `Unwrap before assigning. Stack:\n${new Error().stack}`,
        );
    }
}
```

Wire `assertNotNested` into:
- `Color` base class's hypothetical `_set()` method, or per-setter in each subclass.
- Each `new XColor(...)` constructor (one call per channel arg).
- `ValueUnit` constructor (one call on `value` if `value instanceof ValueUnit`).
- The `convertedColor[key] = new ValueUnit(raw)` site at `normalize.ts:103` (belt-and-suspenders).

**Cost**: zero in production (the `if (!IS_DEV) return;` is dead-code-eliminated by Vite's `define` of `process.env.NODE_ENV`). ~5 instructions per channel write in dev — negligible.

**Build verification**: ensure Vite's library mode replaces `process.env.NODE_ENV`. Today the lib build is `vite build` and the config does NOT explicitly define it — should verify after this lane lands. Fall-back: `import.meta.env.DEV` for Vite, or a build-time `__DEV__` flag.

### (c) Vitest regression test

```ts
// test/units-recursion-regression.test.ts (new)
import { describe, expect, it } from "vitest";
import { OKLABColor, ValueUnit } from "@src/index";
import { colorUnit2 } from "@src/units/color/normalize";

describe("ValueUnit nesting prevention (iOS Safari regression)", () => {
    it("colorUnit2 unwraps malicious depth-3 nest", () => {
        // Construct a depth-3 ValueUnit<ValueUnit<ValueUnit<number>>>.
        const tripleNested = new ValueUnit(new ValueUnit(new ValueUnit(0.5)));

        // Build an OKLab color whose alpha is the malicious value.
        const okl = new OKLABColor<any>(
            new ValueUnit(0.5),     // L
            new ValueUnit(0),       // a
            new ValueUnit(0),       // b
            tripleNested,           // alpha
        );
        const vu = new ValueUnit(okl, "color", ["color", "oklab"]);

        // Run a no-op same-space conversion 10x. Pre-fix this grew by 1/frame.
        let cur: any = vu;
        for (let i = 0; i < 10; i++) {
            cur = colorUnit2(cur, "oklab");
        }

        // Walk alpha and verify it is depth-1 (or 0 — fully unwrapped).
        let depth = 0;
        let probe: any = cur.value.alpha;
        while (probe instanceof ValueUnit) {
            probe = probe.value;
            depth++;
        }
        expect(depth).toBeLessThanOrEqual(1);
        expect(typeof probe).toBe("number");
    });

    it("clone() does not amplify nesting", () => {
        const nested = new ValueUnit(new ValueUnit(new ValueUnit(5)));
        const cloned = nested.clone();
        // Pre-fix: clone would recurse into nested.value.clone() etc.
        // The post-fix invariant is: depth in == depth out.
        let depthIn = 0; let p: any = nested;
        while (p instanceof ValueUnit) { p = p.value; depthIn++; }
        let depthOut = 0; let q: any = cloned;
        while (q instanceof ValueUnit) { q = q.value; depthOut++; }
        expect(depthOut).toBe(depthIn);
    });

    it("294-frame iOS Safari budget — clone stack remains bounded", () => {
        // Simulate the iOS Safari spectrum drag: 300 same-space conversions.
        // Pre-fix: stack overflow at ~294 frames. Post-fix: depth stays at 1.
        const okl = new OKLABColor<any>(
            new ValueUnit(0.5), new ValueUnit(0), new ValueUnit(0), new ValueUnit(1),
        );
        let cur: any = new ValueUnit(okl, "color", ["color", "oklab"]);
        for (let i = 0; i < 300; i++) {
            cur = colorUnit2(cur, "oklab");
        }
        // No throw == passes. As an additional check, the clone shouldn't recurse.
        expect(() => cur.clone()).not.toThrow();
    });
});
```

**Coverage**: one test per primitive — the unwrap-loop fixed-point, the clone-no-amplification invariant, the original 294-frame regression. 30-second runtime budget.

### (d) `clone()` depth-guard

```ts
// src/utils.ts (additions, drop-in for the global clone)
const CLONE_DEPTH_LIMIT = 16;   // 4 would be sufficient; 16 leaves headroom.

export function clone(obj: any, _depth: number = 0): any {
    if (_depth > CLONE_DEPTH_LIMIT) {
        throw new Error(
            `clone() exceeded depth ${CLONE_DEPTH_LIMIT}. ` +
            `This is the iOS Safari stack-overflow precursor. ` +
            `Inspect the object for ValueUnit/Color self-nesting.\n` +
            `Stack:\n${new Error().stack}`,
        );
    }
    if (isObject(obj)) {
        return Object.entries(obj)
            .map(([k, v]) => [k, clone(v, _depth + 1)])
            .reduce((acc: Record<string, any>, [k, v]) => { acc[k] = v; return acc; }, {});
    } else if (obj != null && typeof obj.clone === "function") {
        return obj.clone();    // class clone() — opaque to the depth counter
    } else if (Array.isArray(obj)) {
        return obj.map((x) => clone(x, _depth + 1));
    } else {
        return obj;
    }
}
```

**Caveat**: the depth counter only catches plain-object recursion. To catch `ValueUnit.clone()` and `Color.clone()` recursion, both class clones would need a depth parameter. Cheaper alternative: catch the `RangeError: Maximum call stack size exceeded` in a top-level `try/catch` in dev, then dump the structure shape — but this only fires on the bug, so it's diagnostic, not preventive.

**Verdict on (d)**: useful as a *belt-and-suspenders*; the brand (a) + dev-assert (b) are stronger primary defences. (a)+(b)+(c) ≥ 90% confidence; (d) raises confidence into the >99% band at minor maintenance cost.

---

## §6 Clone-strategy audit under L8

### Current `Color.clone()`

`src/units/color/index.ts:69-80`:

```ts
clone(): this {
    const Constructor = this.constructor as new (...args: any[]) => this;
    const cloned = new Constructor();         // <-- ⚠ no args
    cloned.alpha = clone(this.alpha);
    this.components.forEach((value, key) => {
        cloned.components.set(key, clone(value));
    });
    return cloned;
}
```

The `new Constructor()` is **already broken** for non-Color subclasses — `RGBColor`'s constructor requires `(r, g, b, alpha)`. The current Map-keyed `components` gets re-populated by the forEach, so it works for components but the Constructor invocation passes `undefined` for r/g/b/alpha — and they get overwritten by the forEach. This is fragile.

### L8 post-flatten `clone()` — three options

Option **(I)**: Same shape as today, but with `cloned.L = clone(this.L)` per own-property:

```ts
clone(): this {
    const Constructor = this.constructor as new (...args: any[]) => this;
    const cloned = new Constructor();          // still constructs with undefined
    for (const key of Object.keys(this)) {
        (cloned as any)[key] = clone((this as any)[key]);
    }
    return cloned;
}
```

⚠ Risk: `clone(this.L)` calls global `clone()` → if `this.L` is a `ValueUnit<Color>` (nested!), recurses through `ValueUnit.clone() → Color.clone() → ValueUnit.clone() → …`. Exactly the pre-fix iOS Safari pattern, but moved sites.

Option **(II)**: `structuredClone(this)`:

⚠ Risk: `structuredClone` does not preserve class identity. The result is a plain object, not an `OKLab`. Unusable.

Option **(III)**: Explicit per-channel construction:

```ts
clone(): this {
    const cloned = new (this.constructor as any)(this.L, this.a, this.b, this.alpha);
    // No deep clone — channels are T (typically number). For T=ValueUnit, channel-level clone needed.
    return cloned;
}
```

✅ Best — if `T = number`, this is a memcpy. If `T = ValueUnit<number>`, the ValueUnit is shared by reference (no deep clone). **For interpolation, the consumer already calls `.clone()` on the wrapping `ValueUnit<Color>`, which does its own deep clone via the global `clone()`. So shallow-copying the channels is correct in the lerp hot path.**

**Recommendation for L8**: use Option (III). Combined with §5(b) `assertNotNested` in the channel setter, the clone path is provably non-amplifying. Add a regression test (§5(c)).

### `ValueUnit.clone()` under L8

Unchanged — `ValueUnit.clone()` calls global `clone()` on `this.value`. If `this.value` is a `Color`, the global `clone()` calls `obj.clone()` (line `utils.ts:16`) → `Color.clone()` (Option III above). So the recursion chain is `ValueUnit.clone → utils.clone → Color.clone → memcpy`. Depth bounded by `1 + 1 + 1 = 3`. No amplification.

---

## §7 New-accumulation-site sweep (B.W3 committed files)

### Files in scope

The `gitStatus` header listed five new/modified files at commit `8d6dfac` (B.W3):
- `src/parsing/animation-shorthand.ts`
- `src/parsing/extract.ts`
- `src/parsing/serialize.ts`
- `src/parsing/stylesheet.ts`
- `src/units/interpolate.ts`

### Per-file `new ValueUnit(...)` audit

```bash
grep -nE "new ValueUnit|new (RGB|HSL|HSV|HWB|LAB|LCH|OKL|XYZ|Kelvin|LinearSRG|DisplayP|AdobeRGB|ProPhoto|Rec2020)Color" \
    src/parsing/animation-shorthand.ts src/parsing/extract.ts \
    src/parsing/serialize.ts src/parsing/stylesheet.ts src/units/interpolate.ts
```

Result: **1 site total**.

| File:line | Code | Risk |
|---|---|---|
| `src/parsing/stylesheet.ts:234` | `new ValueArray(new ValueUnit(trimmed, "string"))` | 🟢 **none** — `trimmed` is a primitive string from `value.trim()`; can't be a `ValueUnit` |

### `src/units/interpolate.ts` — the new interpolation entry point

This file is the highest-leverage hot path post-B.W3 (it replaces ad-hoc per-frame logic with `lerpColorValue`/`lerpComputedValue`/`lerpNumericValue`).

`lerpColorValue` (lines 46-65) **does not wrap**. It mutates `value.value[key]` in-place via `current.value = result` if wrapped or `value.value[key] = result` if not. **No new `ValueUnit` constructions in the hot path.** ✅

`lerpNumericValue` (lines 68-74) writes `value.value = lerp(...)` — pure numeric overwrite. ✅

`lerpComputedValue` (lines 15-37) reads via `getComputedValue` and writes `value.value = lerp(...)`, `value.unit = newUnit`. **No wrapping.** ✅

**Conclusion**: B.W3's interpolation refactor is **safe**. The previous claim (memory) that `colorUnit2` is the only accumulation site is **still true at HEAD `56feb87`**. The B.W3 author followed the in-place mutation discipline.

### Hot-path frame budget

Per-animation-frame, the interpolation pipeline now:
1. Resolves dispatch via `prepareInterpVar` (one-time, cached on `_lerp`).
2. Calls `lerpColorValue` — zero allocations, in-place numeric write per channel.
3. The interpolated `ValueUnit` is `out.value`, which is the result of `leftCollapsed.clone()` from `normalizeValueUnits`. That clone happens once at setup, not per frame.

Net: post-B.W3, the per-frame allocation count for color interpolation is **zero new `ValueUnit`s**. This is a regression-resistance win, not a risk.

---

## §8 Prioritized D-fold recommendations

| # | Lane | Effort | Risk if skipped | Recommendation |
|---|---|---|---|---|
| **D-RX-1** | §5(c) regression test | 30 min | high — the original bug took 19 months to surface; no test guards re-emergence | **Land immediately.** Add `test/units-recursion-regression.test.ts` with the three cases. One-time cost; permanent guard. |
| **D-RX-2** | §5(d) `clone()` depth-guard | 15 min | medium — diagnostic-only, fires post-bug | Land alongside D-RX-1. The threshold of 16 has negligible false-positive rate. |
| **D-RX-3** | §5(b) `assertNotNested` dev-only | 1 hour | medium — only triggers in dev, but catches misuse during L8 migration | Land **before** D.W1-L8 commits. Wire into `ValueUnit` constructor and (after L8) each Color subclass setter. |
| **D-RX-4** | §5(a) `ColorChannel<T>` brand | 2 hours | low (compile-time only) — but the highest-leverage long-term defence | Land **with** D.W1-L8 commit (same wave). The brand is the durable architectural defence; without it, the Map-chokepoint removal regresses safety. |
| **D-RX-5** | §6 clone-strategy Option (III) | 30 min | high — current `new Constructor()` is fragile, and Option (I) would re-amplify | Land as **part of** D.W1-L8. The L8 sub-gate should verify Option (III) is used, not (I). |
| **D-RX-6** | L8 demo-consumer audit | 1 hour | medium — the ~15 demo consumers are listed in L8 file bounds but not individually audited for nesting risk | Add a sub-gate: each demo consumer's channel-write paths reviewed for nested-input risk before L8 closes. |
| **D-RX-7** | `process.env.NODE_ENV` build replacement | 15 min | low (gates D-RX-3's free-in-prod claim) | Verify Vite library build inlines `NODE_ENV`. If not, switch the assertion gate to `import.meta.env.DEV` or `__DEV__`. |

### Sub-gate sketch for D-RX (combined sub-gate of an eventual lane)

- `D-RX-G1`: `grep -rn "while.*instanceof ValueUnit" src/` returns exactly 1 hit (the fix).
- `D-RX-G2`: `test/units-recursion-regression.test.ts` exists and passes.
- `D-RX-G3`: `assertNotNested` exists in `src/units/color/brand.ts` (or wherever it lands), gated by `import.meta.env.DEV` or `__DEV__`.
- `D-RX-G4`: `ColorChannel<T>` declared as a branded type; subclass `declare` fields use it.
- `D-RX-G5`: post-L8, `Color.clone()` uses Option (III); a grep for `new (this.constructor as any)()` (empty-args clone) returns zero.
- `D-RX-G6`: library bundle delta from the brand+assertion ≤ +2KB raw, ≤ +500B gzipped (the brand is zero, the assertion is dev-only).

---

## Appendices

### A. Key file:line references

- **Fix site**: `src/units/color/normalize.ts:102`
- **Defensive single-peel**: `src/units/color/normalize.ts:49`
- **Global `clone()`**: `src/utils.ts:7-22`
- **`ValueUnit.clone()`**: `src/units/index.ts:65-75`
- **`Color.clone()`**: `src/units/color/index.ts:69-80`
- **`Color.toJSON()` (misleadingly named — no unwrap)**: `src/units/color/index.ts:60-67`
- **Conversion pass-through example (xyz2lab alpha)**: `src/units/color/utils.ts:407`
- **L8 plan**: `docs/tranches/D/waves/D.W1.md:83-122`

### B. Commit hash table

| Hash | Role | Date |
|---|---|---|
| `35cd9d5` | Bug introduced — initial repo move | 2024-07-17 |
| `2446320` | Refactored, kept the wrap | 2025-04-10 |
| `4898ab1` | Changed default space, kept the wrap | 2026-02-26 |
| `80cdd59` | **The fix** — unwrap loop added | 2026-03-01 |
| `8d6dfac` | B.W3 — interpolation refactor (no regression) | (recent) |
| `56feb87` | HEAD at audit time | 2026-05-19 |
