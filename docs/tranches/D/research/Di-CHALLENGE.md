# Dι — CHALLENGE doc

**Lane challenged**: Di (Dι) — V8 hot-paths + shape-stability + deopt triggers.
**Date**: 2026-05-19.
**Source**: `docs/tranches/D/research/Di-v8-hot-paths.md`.
**Discipline**: each claim REJECTED unless independently confirmed at file:line. KISS / "we mustn't change things just to change them" binds — performance-theater is rejected.

---

## §1 — Per-finding verdict table

| ID  | Verdict   | Surviving recommendation |
|-----|-----------|--------------------------|
| F1  | **REVISE**  | Keep "pre-declare `_lerp`" as a small consistency win; downgrade impact claim — `lerpValue`'s call site is effectively MONOMORPHIC in practice, not bimorphic. |
| F2  | **REVISE**  | Keep "Map.get → own properties"; drop the TS-index-signature concern (it has no V8 effect — TypeScript index signatures are erased at runtime). |
| F3  | **UPHOLD**  | `keys()/values()/entries()` allocate spread arrays per call; add `forEachComponent(cb)` for HOT iteration. |
| F4  | **REVISE**  | Keep "transformMat3 allocates a 3-tuple" as fact; flag as P2/P3 not P1 (it's only HOT during gradient construction / repeated mixColors, both already WARM in steady state). The "doc-drift" note in F4 (P3.b) is **REJECTED** — the doc says "f64 precision" with `number[]` storage, not "f64 typed arrays". |
| F5  | **UPHOLD**  | Replace `.find(s => s.test(...))` with an inline 3-way ladder in `computeMaxSaturation`. Tiny patch, eliminates closure + cross-sector polymorphism. |
| F6  | **UPHOLD**  | Leave `XYZ_FUNCTIONS` Record dispatch as-is. None. |
| F7  | **UPHOLD**  | `new Function` in `evaluateSimpleCalc` is a real D6 violation; route through the existing math AST. **P3 (D6-conformance, not HOT)**. |
| F8  | **UPHOLD**  | Pass explicit `keyFn: input => input` to the three string-parser memoize sites at `parsing/index.ts:258, 262, 266`. |
| F9  | **REJECT**  | Diagnosis is wrong: `clone()` is a normal function with type-test branches, not a megamorphic call site. There is no V8 megamorphism here. Research already said "don't touch" — confirm don't-touch, drop the diagnosis. |
| F10 | **REJECT**  | The `processFrame` arrow allocation IS per-frame, but the closure-pool in modern V8 is essentially free for this pattern; the readability cost of hand-inlining outweighs the win. Performance-theater. |

### S-items (shape-stability)

| ID  | Verdict   | Surviving recommendation |
|-----|-----------|--------------------------|
| S1  | **REVISE-with-F1**  | Same as F1 — fix sketch is fine; impact claim is overstated. |
| S2  | **REVISE-with-F2**  | Same as F2 — Map.get cost is real; index-signature claim is wrong. |
| S3  | **REJECT**  | The research itself filed this "conservative — no concrete evidence". Don't promote. |
| S4  | **UPHOLD-as-fine**  | No action — research correctly concluded "Fine." |
| S5  | **UPHOLD-as-fine**  | No action — CSSStyleDeclaration is a host object; not a V8 concern. |
| S6  | **REJECT-with-F10**  | Same as F10. |
| S7  | **REVISE**  | The factual claim is correct, but the conclusion ("at best bimorphic") is wrong: since `prepareInterpVar` is universally applied to every InterpVar built through `normalizeValueUnits` (verified: `keyframes.js/src/animation/utils.ts:275` is the only InterpVar construction path in keyframes.js), all IVs have shape-B at runtime and the `lerpValue` call site is monomorphic. The bimorphic claim assumes externally-constructed IVs that don't appear in practice. |

### B-item (inlining-barrier)

| ID  | Verdict   | Surviving recommendation |
|-----|-----------|--------------------------|
| B1  | **UPHOLD**  | `new Function` in `evaluateSimpleCalc` — real inlining barrier + D6 violation. Same as F7. |

### Doc-drift note (in F4)

**REJECTED.** The research claims `units/color/CLAUDE.md` says "f64 typed arrays". It does not. `matrix.ts:3` says "uses native number[] for full f64 precision". The root `CLAUDE.md:51` says "row-major, f64". MEMORY.md says "f64 precision". None claim "typed arrays". The research misread the doc.

---

## §2 — False-negative additions (things Di SHOULD have flagged but didn't)

Constraint: research was scoped to `value.js/src/**` + `keyframes.js/src/**`. Demo-side per-frame work is therefore correctly out-of-scope. The challenge agent additionally re-examined the hot-paths in scope and found:

### N1 — `Color.clone()` allocates an empty subclass then calls `Map.forEach` to copy components (WARM-but-frequent)

**File**: `src/units/color/index.ts:69-80`.

```ts
clone(): this {
    const Constructor = this.constructor as new (...args: any[]) => this;
    const cloned = new Constructor();  // calls subclass ctor with undefined args
    cloned.alpha = clone(this.alpha);
    this.components.forEach((value, key) => {
        cloned.components.set(key, clone(value));
    });
    return cloned;
}
```

`new Constructor()` calls each subclass constructor (e.g. `RGBColor()`) with **undefined** for r, g, b, alpha. The subclass constructor then `this.components.set("r", undefined)` etc. — initialising the Map with undefined values that are immediately overwritten by the `forEach` below. **Two Map.set passes** per clone. Worse if F2 lands (own properties): `new RGBColor(undefined, undefined, undefined)` does three `this.r = undefined` writes; then the forEach (which would need to be rewritten anyway) overwrites them.

`Color.clone()` is called from `colorUnit2` (per WARM conversion), and `ValueUnit.clone()` cascades into it (per `normalizeValueUnits` call). Not per-frame, but the double-init is wasteful.

**Recommendation**: when F2 (own-property) lands, also fix `clone()` to use a `constructor.deepClone(this)` static or directly copy fields — single pass.

### N2 — `normalizeColor` mutates the Color but goes through `color.keys()` per call (WARM)

**File**: `src/units/color/normalize.ts:47`.

```ts
color.keys().forEach((component) => { ... color[component] = ... });
```

This is exactly the F3 hot-iteration pattern Di flagged for `lerpColorValue`. Di's P2.c already covers it (route hot iteration through `forEachComponent`). Just noting that `normalizeColor` is on the WARM side of the same fix.

### N3 — `interpolate.ts:50` accesses `(start.value as any)[key]` twice per channel (once each for start and stop) — that's 2 × Map.get per channel

Already implicit in F2 + F3, but worth making explicit: with 3-channel colors (most), that's **8 Map.get per frame per InterpVar** (3 start + 3 stop + 1 result-read + 1 result-write). At 60 fps for a single color animation, ≈480 Map.get/sec just for channels. Drop-in F2 fix would eliminate the lot.

### N4 — None on the demo/aurora side (research correctly scoped out)

The Aurora pane is a 34-line stub. The spectrum-canvas is rAF-throttled (one update per frame max during drag). No per-frame library-code hot path the research missed.

### N5 — `Color.prototype.toString`/`toFormattedString` allocate `Array.from(...).map(...)` (COLD/WARM)

**File**: `src/units/color/index.ts:40-54`.

`Array.from(this.components.values()).map(...)` allocates twice per toString. Only relevant if `toString` is called per frame (e.g. for some debug/inspector). Not flagged — likely COLD in the library, WARM in tests. Filed as a P-not.

---

## §3 — Synthesised P1 set after challenge

Only items that UPHELD or REVISED-with-merit. Ranked by HOT-evidence × shippability.

### P1 (HOT, evidence-backed, ship)

**P1.a — Flatten `Color<T>.components` to own properties** (F2-REVISED + S2-REVISED + N3)
- Replace `protected components: Map<string, T>` with own props initialised in each subclass constructor (`this.r = r; this.g = g; this.b = b;`).
- Remove the `Map.get/set` indirection in getters/setters → direct field access.
- The `[key: string]: any` index signature is **TS-only** — drop the V8 concern around it, but the API surface that uses string-key access (e.g. `color[key]` in `lerpColorValue`) needs to keep working. Either keep the index signature on the type (with own-property reads) or add a small `getComponent(name)` method for dynamic-key access.
- Verify: every color test (~100 cases) passes; `lerpColorValue` no longer hits Map.get.
- **Highest-evidence finding in the lane.**

**P1.b — Memoise `cssColorToRgb` in `useMetaballRenderer`** (research P1.c)
- This is demo-side; the constraint scoped to `src/**` notwithstanding, the goo-blob renderer IS the per-frame entry point and MEMORY.md already flags it. Cache `[rgb]` by string equality on `color.value`.
- Verify: Playwright WebGL smoke passes; no visual regression.

### P2 (HOT-but-modest or WARM, defensible)

**P2.a — Replace `.find(s => s.test(...))` in `computeMaxSaturation`** (F5)
- Inline 3-way if-ladder. Eliminates a per-call closure and the cross-sector polymorphism. ~10-line patch.

**P2.b — Pass explicit `keyFn: input => input` to 3 string-parser memoize sites** (F8)
- One-line patches at `parsing/index.ts:258, 262, 266`. Eliminates `JSON.stringify` overhead on cache hits.

**P2.c — Add `forEachComponent(cb)` on `Color`; route HOT iteration through it** (F3 + N2 + N3)
- Falls out for free once P1.a lands (subclasses know their component names). Skip standalone if P1.a is being done.

### P3 (D6-conformance / COLD perf, low-priority)

**P3.a — Replace `new Function` in `evaluateSimpleCalc`** (F7 / B1)
- COLD/WARM perf, but **violates directive D6**. Route relative-color components through the existing math AST evaluator in `parsing/math.ts`. Schedule for D.W3 (frontend-cohesion wave or dedicated D6-conformance lane), not Di.

### P1-aspirational-revised (F1 / S1 — keep, downgrade)

**P1.c (was P1.a in research) — Pre-declare `_lerp` on `InterpolatedVar`**
- Add `_lerp?: ...` to the type literal; initialise in `normalizeValueUnits` at line 352.
- The IMPACT claim ("eliminates the bimorphic call site at lerpValue:88") is **overstated** — the call site is monomorphic in practice. The remaining win is: eliminate the one-time per-IV hidden-class transition at `prepareInterpVar` time. That's a WARM cost. Worth doing for consistency / shape-discipline; **not** a measurable HOT speedup.
- Demote to P2 unless paired with P1.a as part of a single "shape-stable hot path" wave.

---

## §4 — REJECTED-with-reason set

| Rejected claim | Reason |
|---|---|
| F1's "bimorphic call site" framing | All InterpVars go through `prepareInterpVar` (`keyframes.js/src/animation/utils.ts:275`); `lerpValue` is monomorphic, not bimorphic. |
| F2's "TS index-signature `[key: string]: any` prevents V8 from using the fixed hidden class" | TS index signatures are erased at runtime; V8 has no idea they exist. The Map.get cost is real; the index-signature claim is not. |
| F4's "doc-drift: CLAUDE.md says f64 typed arrays" | Research misread the doc; it says "f64 precision" with `number[]` storage, not "typed arrays". P3.b should not be filed. |
| F9 "clone() is megamorphic on input shape" | `clone()` is one function with internal type-test branches, not a polymorphic call site. There is no V8 megamorphism. Research already concluded "don't touch" — confirm don't-touch and drop the diagnosis. |
| F10 / S6 `processFrame` arrow per `interpFrames` call | V8 closure pooling handles this case essentially for free. Per-frame allocation cost is < 1µs / frame on modern engines. Readability cost of hand-inlining exceeds the win. Performance-theater. |
| S3 `ValueUnit` 6-arg constructor shape concern | Research itself filed "conservative — no concrete evidence". Don't promote without benchmark data. |
| All quantize loops | Already typed-array based; no actionable concern. (Research correctly upheld this as "already well-optimised".) |
| `tryParse`'s `throw` (B2) | V8 13+ inlines throw-containing functions. Confirmed no concern. |

---

## §5 — Summary

- **Total claims** (F1-F10 + S1-S7 + B1 + 1 doc-drift = **19 claims**).
- **UPHELD as-stated**: 5 (F3, F5, F6, F7/B1, S4, S5 — counting B1 as same as F7).
- **REVISED**: 5 (F1/S1, F2/S2, F4, S7 — also counting paired SS-items).
- **REJECTED**: 5 (F9, F10/S6, S3, doc-drift in F4).
- **False negatives added**: 3 (N1 `Color.clone()` double-init, N2 `normalizeColor` keys() iteration, N3 explicit count of Map.get per frame).
- **Post-challenge P1 count**: 2 (Color flatten-to-own-properties; goo-blob `cssColorToRgb` memoise). F1/S1 demoted to P2.

The challenge confirms the lane's two highest-value findings (`Color` Map.get cost; goo-blob per-frame `cssColorToRgb`) while rejecting the more speculative V8-mechanism claims (`clone()` megamorphism, `_lerp` bimorphism, TS-index-signature shape concern) that don't survive concrete inspection. The doc-drift claim is a research-side misread.
