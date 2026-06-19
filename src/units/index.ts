export { registerColorNames, clearCustomColorNames, getCustomColorNames } from "../parsing/color";
import { clone } from "../utils";
import { BLACKLISTED_COALESCE_UNITS, UNITS } from "./constants";
import type { ColorSpace } from "./color/constants";
import type { HueInterpolationMethod } from "./color/dispatch";
import type { ColorChannelPlan } from "./interpolate";

export class ValueUnit<
    T = any,
    // `UNITS` carries an `undefined` sentinel (the "no unit" slot); the unit
    // *string* type excludes it — `ValueUnit.unit` is already optional (`unit?`).
    U extends string = Exclude<(typeof UNITS)[number], undefined> | string,
> {
    constructor(
        public value: T,
        public unit?: U,
        public superType?: string[],
        public subProperty?: string,
        public property?: string,
        public targets?: HTMLElement[],
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

    setSubProperty(subProperty: any) {
        this.subProperty = subProperty;
    }

    setProperty(property: any) {
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

        if (this.unit === "color" || this.unit === "color-keyword") {
            // `color-keyword` is the VJ-3 deferred-resolution sentinel
            // (`currentColor` / `light-dark(...)`): serialize the wrapped value
            // verbatim so the sentinel survives a parse → serialize round-trip
            // un-baked, exactly like a resolved `color`.
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
        const value = Number(this.value).toFixed(fractionDigits).replace(/\.0+$/, "");
        return new ValueUnit(value).coalesce(this, true).toString();
    }

    clone(): ValueUnit<T, U> {
        const value = new ValueUnit<T, U>(
            clone(this.value),
            this.unit,
            clone(this.superType),
            this.subProperty,
            this.property,
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

            return this;
        } else {
            const value = new ValueUnit(
                clone(this.value),
                this.unit ?? right.unit,
                clone(this.superType ?? right.superType),
                this.subProperty ?? right.subProperty,
                this.property ?? right.property,
                this.targets ?? right.targets,
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
        values.forEach((v) => {
            this.setSubProperty(name);
        });
    }

    setSubProperty(subProperty: any) {
        this.values.forEach((v) => v.setSubProperty(subProperty));
    }

    setProperty(property: any) {
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

    setSubProperty(subProperty: any) {
        this.forEach((v) => v.setSubProperty(subProperty));
    }

    setProperty(property: any) {
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
    _colorPlan?: ColorChannelPlan;

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
