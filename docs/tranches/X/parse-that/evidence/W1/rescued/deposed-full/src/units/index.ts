// O.W1 S1 — re-export the color-name registry from the parse-that-FREE
// `units/color/color-names.ts` (formerly from `../parsing/color`, which dragged
// the entire @keyframes grammar + parse-that into the units subgraph). The
// observable surface is unchanged; the import graph is now grammar-clean.
export {
    registerColorNames,
    clearCustomColorNames,
    getCustomColorNames,
} from "./color/color-names";
import { clone } from "../utils";
import { BLACKLISTED_COALESCE_UNITS, UNITS } from "./constants";
import type { ColorSpace } from "./color/constants";
import type { HueInterpolationMethod } from "./color/mix";
import type { ColorInterpPlan } from "./interpolate";

export class ValueUnit<
    T = any,
    // The default is `string` (the unit is a string; `ValueUnit.unit` is already
    // optional, `unit?`). It was once `Exclude<(typeof UNITS)[number], undefined>
    // | string` — functionally identical to `string` (the literal union is
    // subsumed) but a cross-package `typeof UNITS` VALUE-query that the O subpath-
    // split .d.ts emission could not resolve in a consumer, collapsing `ValueUnit`
    // (and `instanceof` narrowing of it) to `any` downstream. KISS: just `string`.
    U extends string = string,
> {
    constructor(
        public value: T,
        public unit?: U,
        public superType?: string[],
        public subProperty?: string,
        public property?: string,
        public targets?: HTMLElement[],
        // VJ-Q4 (1.2.0) — the enclosing CSS-function NAME for a flattened leaf
        // (the `scale` of `scale(2)`). `flattenObject` stamps it from the
        // enclosing `FunctionValue.name`; `clone()` preserves it. This is the
        // `clone()`-stable provenance carrier that retires the keyframes.js S8
        // WeakMap `FN_NAME_MAP` + clone-restamp ceremony (the leaf survives
        // `clone()` WITH its function name, so the consumer reads `u.fnName`
        // directly). `subProperty` cannot double as the carrier — it is clobbered
        // by `parseCSSValues` with the child key.
        public fnName?: string,
    ) {}

    /**
     * Fully unwrap a (possibly nested) `ValueUnit`, returning the innermost
     * non-`ValueUnit` value.
     *
     * **G.W2 Lane D (G-OPP-5)** — codifies the Mar 2026 iOS Safari
     * stack-overflow fix as a first-class `ValueUnit` primitive. The
     * `while (raw instanceof ValueUnit) raw = raw.value` idiom was inlined
     * across the color pipeline + the parser; each inline copy was a place the
     * `VU<VU<…>>` accumulation guard could silently drift. This static is the
     * single source of truth — see `test/recursion-guard.test.ts`.
     *
     * The conditional return type peels exactly one `ValueUnit` layer at the
     * type level (`ValueUnit` payloads can themselves be `ValueUnit` only via
     * the bug class this guards against, so one peel is the honest static
     * type); at runtime the `while` loop peels every layer.
     */
    static unwrapDeep<T>(x: T): T extends ValueUnit<infer V> ? V : T {
        let raw: unknown = x;
        while (raw instanceof ValueUnit) raw = raw.value;
        return raw as T extends ValueUnit<infer V> ? V : T;
    }

    setSubProperty(subProperty: string) {
        this.subProperty = subProperty;
    }

    setProperty(property: string) {
        this.property = property;
    }

    setTargets(targets: HTMLElement[]) {
        this.targets = targets;
    }

    valueOf() {
        return this.value;
    }

    setValue(value: T) {
        this.value = value;
    }

    toString() {
        if (this.value == null) {
            return "";
        }

        if (this.unit == null || this.unit === "string") {
            return `${this.value}`;
        }

        if (
            this.unit === "color" ||
            this.unit === "color-keyword" ||
            this.unit === "system-color"
        ) {
            // `color-keyword` is the VJ-3 deferred-resolution sentinel
            // (`currentColor` / `light-dark(...)`): serialize the wrapped value
            // verbatim so the sentinel survives a parse → serialize round-trip
            // un-baked, exactly like a resolved `color`.
            //
            // `system-color` (O.W4 S12) is the analogous deferred sentinel for
            // UA system color keywords (`Canvas`, `ButtonText`, …): the value is
            // the keyword name itself (canonical CamelCase), emitted VERBATIM so
            // `ValueUnit("Canvas", "system-color").toString()` === `"Canvas"`.
            // value.js never resolves it to an RGB triple (rendering concern).
            return `${this.value}`;
        } else if (this.unit === "var") {
            return `var(${this.value})`;
        } else if (this.unit === "calc") {
            return `calc(${this.value})`;
        } else {
            return `${this.value}${this.unit}`;
        }
    }

    toJSON(): T {
        return this.valueOf();
    }

    toFixed(fractionDigits: number = 2) {
        // Trim trailing zeros CONSISTENTLY. The prior `/\.0+$/` stripped a
        // fraction only when it was ALL zeros (`15.00`→`15`) but kept a partial
        // trailing zero (`15.50` stayed `15.50`) — a surprising split
        // (lib-core-value-audit P2-6). Strip trailing zeros in the fractional
        // part, then a bare dangling `.`, guarding the integer part (`fractionDigits=0`
        // yields no dot, so trailing integer zeros are never touched).
        let value = Number(this.value).toFixed(fractionDigits);
        if (value.includes(".")) {
            value = value.replace(/0+$/, "").replace(/\.$/, "");
        }
        return new ValueUnit(value).coalesce(this, true).toString();
    }

    clone(): ValueUnit<T, U> {
        const value = new ValueUnit<T, U>(
            clone(this.value),
            this.unit,
            clone(this.superType),
            this.subProperty,
            this.property,
            // `targets` is intentionally NOT cloned (DOM nodes are not deep-
            // copyable; the historical clone omitted them).
            undefined,
            // VJ-Q4 (1.2.0) — preserve the function-name provenance across the
            // clone so a flattened leaf survives `clone()` WITH its `fnName`.
            this.fnName,
        );

        return value;
    }

    coalesce(right?: ValueUnit, inplace: boolean = false): ValueUnit<any, any> {
        if (right == null) {
            return this;
        }
        const blacklisted: readonly string[] = BLACKLISTED_COALESCE_UNITS;
        if (this.unit != null && blacklisted.includes(this.unit)) {
            return this;
        }

        if (inplace) {
            this.unit ??= right.unit as U;
            this.superType ??= right.superType;
            this.subProperty ??= right.subProperty;
            this.property ??= right.property;
            this.targets ??= right.targets;
            // VJ-Q4 — inherit the function-name provenance from `right` when
            // unset (the flatten/restamp coalesce path keeps `fnName`).
            this.fnName ??= right.fnName;

            return this;
        } else {
            const value = new ValueUnit(
                clone(this.value),
                this.unit ?? right.unit,
                clone(this.superType ?? right.superType),
                this.subProperty ?? right.subProperty,
                this.property ?? right.property,
                this.targets ?? right.targets,
                this.fnName ?? right.fnName,
            );

            return value;
        }
    }
}

export class FunctionValue<T = any, N extends string = string> {
    constructor(
        public name: N,
        public values: Array<ValueUnit<T> | FunctionValue<T>>,
    ) {
        // VJ-P.W0 O(N²) fix: call setSubProperty on each child value, not on
        // `this` (which would walk all N values N times). Each child gets the
        // function name as its subProperty in O(N). The previous
        // `values.forEach((v) => { this.setSubProperty(name); })` called the
        // container-level propagator N times, yielding O(N²) writes.
        values.forEach((v) => {
            v.setSubProperty(name);
        });
    }

    setSubProperty(subProperty: string) {
        this.values.forEach((v) => v.setSubProperty(subProperty));
    }

    setProperty(property: string) {
        this.values.forEach((v) => v.setProperty(property));
    }

    setTargets(targets: HTMLElement[]) {
        this.values.forEach((v) => v.setTargets(targets));
    }

    setValue(value: T, index?: number) {
        if (index != null) {
            this.values[index]!.setValue(value);
        } else {
            this.values.forEach((v) => v.setValue(value));
        }
    }

    valueOf(): any[] {
        return this.values.map((v) => v.valueOf());
    }

    toString(): string {
        // Calc AST operators are infix: "left + right", not "+(left, right)"
        if (
            (this.name === "+" || this.name === "-" || this.name === "*" || this.name === "/") &&
            this.values.length === 2
        ) {
            return `${this.values[0]!.toString()} ${this.name} ${this.values[1]!.toString()}`;
        }
        // CSS Easing L2: linear() position-hints are SPACE-separated from their
        // stop value (`0.5 50%`), not comma-separated. The parser flattens stops
        // and their percentage hints into a single value list; re-group here so a
        // hint (`unit === "%"`) attaches to the preceding stop with a space, and
        // distinct stops join with ", ".
        // CSS Values L5 `if()` (O.W4 S6 + VJ-Q7 1.2.0 multibranch): the inline
        // conditional is NOT a comma-separated arg list — it is
        // `if(<cond>: <value>; <cond>: <value>; …; else: <value>)`. The parser
        // captures the FULL ordered clause list as a flat
        // `[condition, value, condition, value, …, elseValue]` pair list (VJ-Q7);
        // re-emit it in the spec's `:`/`;` syntax so the serialized form
        // re-parses to the SAME FunctionValue (C17 round-trip). An ODD trailing
        // slot is the `else` value (it has no condition). The generic comma-join
        // would drop the `:`/`;` structure and fail to re-parse.
        if (this.name === "if" && this.values.length >= 3) {
            const clauses: string[] = [];
            const vals = this.values;
            let i = 0;
            // Each [condition, value] pair → `<cond>: <value>`. The list has an
            // even count of paired entries followed by an optional lone `else`
            // value (odd total). Walk pairs until at most one slot remains.
            for (; i + 1 < vals.length; i += 2) {
                clauses.push(`${vals[i]!.toString()}: ${vals[i + 1]!.toString()}`);
            }
            // A lone trailing slot is the `else` value.
            if (i < vals.length) {
                clauses.push(`else: ${vals[i]!.toString()}`);
            }
            return `if(${clauses.join("; ")})`;
        }
        if (this.name === "linear") {
            const stops: string[] = [];
            for (const v of this.values) {
                const isHint =
                    v instanceof ValueUnit && (v as ValueUnit).unit === "%";
                if (isHint && stops.length > 0) {
                    stops[stops.length - 1] += ` ${v.toString()}`;
                } else {
                    stops.push(v.toString());
                }
            }
            return `${this.name}(${stops.join(", ")})`;
        }
        // CSS Color 4 `color()` function notation (O.W5 S5): the colorspace and
        // its components are SPACE-separated, not comma-separated —
        // `color(in oklch 0.5 0.1 200)` / `color(srgb 1 0 0 / 0.5)`. The generic
        // comma-join corrupts this into `color(in, oklch, …)` which, while
        // self-idempotent, is non-canonical and fails the C5 round-trip intent.
        // The `oklch()`/`lch()`/`lab()` colours are parsed by the Color parser
        // (already space-separated); only the `color(...)` wrapper reaches here.
        if (this.name === "color") {
            return `${this.name}(${this.values.map((v) => v.toString()).join(" ")})`;
        }
        // CSS Images 3 <gradient> stop serialization (U-F33): a color stop's
        // position (a <length-percentage>) is SPACE-separated from its color
        // (`red 20%`) and distinct stops comma-join. The parser flattens each
        // stop's color and its position(s) into one flat value list, so the
        // generic comma-join emits `…red), 20%, …` — reads as extra stops,
        // invalid CSS. Re-group here, generalizing the linear() hint-spacing
        // idiom above to the gradient family (linear-/radial-/conic-gradient +
        // their repeating-* forms, all `*-gradient`): a position ValueUnit
        // (length/percentage superType) attaches to the PRECEDING stop with a
        // space; distinct stops join with ", ". The leading direction (an angle /
        // side-or-corner deg — neither length nor percentage) starts its own
        // entry and never attaches.
        if (this.name.endsWith("-gradient")) {
            const stops: string[] = [];
            for (const v of this.values) {
                const isPosition =
                    v instanceof ValueUnit &&
                    (v.superType?.includes("length") === true ||
                        v.superType?.includes("percentage") === true);
                if (isPosition && stops.length > 0) {
                    stops[stops.length - 1] += ` ${v.toString()}`;
                } else {
                    stops.push(v.toString());
                }
            }
            return `${this.name}(${stops.join(", ")})`;
        }
        // CSS named-function serialization audit (O.W5 S5) — CONFIRMED-CORRECT
        // under the default comma-join:
        //   cubic-bezier(0.42, 0, 0.58, 1)   — four comma-separated args
        //   steps(4, end)                    — count + keyword, comma-separated
        //   spring(1, 100, 10, 0)            — four plain-number args (O.W5 S3)
        // Special-cased above: calc infix, if() `:`/`;`, linear() hint-spacing,
        // color() colorspace-spacing, *-gradient() positioned stops. (The O.W5
        // "linear-gradient — direction + stops, comma-separated" audit line was
        // FALSIFIED by U-F33: a stop's position must SPACE-join its color, not
        // comma-join away from it.)
        return `${this.name}(${this.values.map((v) => v.toString()).join(", ")})`;
    }

    toJSON(): Record<string, any[]> {
        return {
            [this.name]: this.values.map((v: any) => v.toJSON()),
        };
    }

    clone(): FunctionValue<T> {
        return new FunctionValue(
            this.name,
            this.values.map((v) => v.clone()),
        );
    }
}

export class ValueArray<T = any> extends Array<ValueUnit<T> | FunctionValue<T>> {
    constructor(...args: Array<ValueUnit<T> | FunctionValue<T>>) {
        super(...args);
    }

    setSubProperty(subProperty: string) {
        this.forEach((v) => v.setSubProperty(subProperty));
    }

    setProperty(property: string) {
        this.forEach((v) => v.setProperty(property));
    }

    setTargets(targets: HTMLElement[]) {
        this.forEach((v) => v.setTargets(targets));
    }

    setValue(value: T, index?: number) {
        if (index != null) {
            this[index]!.setValue(value);
        } else {
            this.forEach((v) => v.setValue(value));
        }
    }

    valueOf() {
        return this.map((v) => v.valueOf());
    }

    toString() {
        return this.map((v) => v.toString()).join(" ");
    }

    toJSON() {
        return this.map((v) => v.toJSON());
    }

    clone() {
        return new ValueArray(...this.map((v) => v.clone()));
    }
}

export type InterpolatedVar<T> = {
    start: ValueUnit<T>;
    stop: ValueUnit<T>;

    value: ValueUnit<T>;

    computed: boolean;

    /**
     * For color interpolation in cylindrical spaces (hsl/hsv/hwb/lch/oklch):
     * which hue-direction method to use. Defaults to `"shorter"` per CSS
     * Color 4 §12.4 when omitted.
     */
    hueMethod?: HueInterpolationMethod;

    /**
     * For color interpolation: the color space the start/stop endpoints have
     * been normalised into. Drives the choice of which component is the hue
     * channel in `lerpColorValue`.
     */
    colorSpace?: ColorSpace;

    /**
     * Pre-resolved dispatch function set by `prepareInterpVar`. Avoids three
     * sequential type checks per `lerpValue` call in hot paths. Optional —
     * external callers can construct an `InterpolatedVar` without it and the
     * runtime dispatch in `lerpValue` will resolve at call time.
     */
    _lerp?: (t: number, iv: InterpolatedVar<any>) => ValueUnit<any>;

    /**
     * Frozen color-channel plan set by `prepareInterpVar` for color ivs (B3).
     * Drives the closure-free per-frame loop in `lerpColorValue`; absent for
     * non-color ivs and externally constructed colors (which take the fallback
     * walk). Typed loosely here to avoid a cycle with `interpolate.ts`.
     */
    _colorPlan?: ColorInterpPlan;

    /**
     * Resolved computed-endpoint cache set by `lerpComputedValue` for computed
     * ivs (C1, tranche-F Wave C). A computed leaf (`var`/`calc`) re-resolves
     * BOTH endpoints against the live box every frame — but the resolved pair
     * is invariant while the layout epoch is stable, so the first frame after a
     * (re)resolve stamps `(startN, stopN, unit, target, epoch)` here and every
     * later frame collapses to a bare `lerp(startN, stopN, t)`. Invalidated
     * when the target changes or the layout epoch advances (resize). Absent for
     * non-computed ivs. Typed loosely to avoid a cycle with `interpolate.ts`.
     */
    _computedCache?: ComputedEndpointCache;
};

/**
 * The resolved-endpoint cache stamped on a computed `InterpolatedVar` (C1).
 * `target` and `epoch` are the invalidation keys: a steady frame whose live
 * target and layout epoch both match the stamp serves `startN`/`stopN`/`unit`
 * directly; any mismatch re-resolves both endpoints and re-stamps.
 */
export type ComputedEndpointCache = {
    startN: number;
    stopN: number;
    unit: string | undefined;
    target: HTMLElement;
    epoch: number;
};
