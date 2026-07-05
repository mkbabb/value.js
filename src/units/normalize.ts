import { parseCSSValue } from "../parsing";
import { ValueUnit } from ".";
import type { InterpolatedVar } from ".";
import { parseCSSValueUnit } from "../parsing/units";
import { memoize } from "../utils";
import type { ColorSpace } from "./color/constants";
import type { HueInterpolationMethod } from "./color/mix";
import { normalizeColorUnits } from "./color/normalize";
import {
    ANGLE_UNITS,
    COMPUTED_UNITS,
    LENGTH_UNITS,
    RESOLUTION_UNITS,
    TIME_UNITS,
} from "./constants";
import {
    convertToDegrees,
    convertToDPI,
    convertToMs,
    convertToPixels,
    isColorUnit,
    unpackMatrixValues,
} from "./utils";

// ─── Type narrowing helpers ───────────────────────────────────────────────

const isLengthUnit = (unit: unknown): unit is (typeof LENGTH_UNITS)[number] =>
    typeof unit === "string" &&
    (LENGTH_UNITS as readonly string[]).includes(unit);

const isAngleUnit = (unit: unknown): unit is (typeof ANGLE_UNITS)[number] =>
    typeof unit === "string" &&
    (ANGLE_UNITS as readonly string[]).includes(unit);

const isTimeUnit = (unit: unknown): unit is (typeof TIME_UNITS)[number] =>
    typeof unit === "string" &&
    (TIME_UNITS as readonly string[]).includes(unit);

const isResolutionUnit = (
    unit: unknown,
): unit is (typeof RESOLUTION_UNITS)[number] =>
    typeof unit === "string" &&
    (RESOLUTION_UNITS as readonly string[]).includes(unit);

const isComputedUnit = (
    unit: unknown,
): unit is (typeof COMPUTED_UNITS)[number] =>
    typeof unit === "string" &&
    (COMPUTED_UNITS as readonly string[]).includes(unit);

const toNumericValue = (value: unknown, context: string): number => {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new TypeError(
            `Expected numeric ${context}, got ${String(value)}.`,
        );
    }
    return value;
};

// ─── Matrix sub-property handling for getComputedValue ────────────────────
//
// When a `calc()` value is set on a transform sub-property
// (`translateX`, `scaleY`, etc.), reading back `transform` yields
// a matrix() / matrix3d() that we decompose to recover the resolved
// numeric value for that axis.

const MATRIX_SUB_PROPERTIES = new Set([
    "scaleX",
    "scaleY",
    "scaleZ",
    "skewX",
    "skewY",
    "skewZ",
    "translateX",
    "translateY",
    "translateZ",
    "rotateX",
    "rotateY",
    "rotateZ",
    "perspectiveX",
    "perspectiveY",
    "perspectiveZ",
    "perspectiveW",
] as const);

type MatrixSubProperty =
    typeof MATRIX_SUB_PROPERTIES extends Set<infer T> ? T : never;

const isMatrixSubProperty = (value: string): value is MatrixSubProperty =>
    MATRIX_SUB_PROPERTIES.has(value as MatrixSubProperty);

// ─── Element identity for memoization ────────────────────────────────────
//
// Live HTMLElements aren't safely JSON-stringifiable; use a WeakMap
// to assign stable string ids without retaining references that
// would prevent GC.

const elementIdMap = new WeakMap<HTMLElement, number>();
let nextElementId = 0;
const getElementId = (el: HTMLElement): number => {
    let id = elementIdMap.get(el);
    if (id === undefined) {
        id = nextElementId++;
        elementIdMap.set(el, id);
    }
    return id;
};

// ─── Stable ValueUnit identity for memoization (C2) ───────────────────────
//
// The `getComputedValue` memo previously keyed on `value.toString()`, which
// re-SERIALISES the ValueUnit on *every* hit (two full `calc(…)`/`var(…)`
// concats per leaf per frame) to retrieve an O(1)-invariant pair. The
// endpoint ValueUnits (`start`/`stop`) are FIXED for an InterpolatedVar's
// life — only `value` is mutated per frame — so a per-instance monotonic id
// is a stable, content-equivalent key that pays zero string work on a hit.
// WeakMap-keyed so a retired ValueUnit doesn't pin GC (mirrors getElementId).
const valueUnitIdMap = new WeakMap<ValueUnit, number>();
let nextValueUnitId = 0;
const getValueUnitId = (value: ValueUnit): number => {
    let id = valueUnitIdMap.get(value);
    if (id === undefined) {
        id = nextValueUnitId++;
        valueUnitIdMap.set(value, id);
    }
    return id;
};

// `CSSStyleDeclaration` is a DOM interface with typed property accessors
// (`style.color`, `style.transform`, …) but **no** string index signature.
// `getComputedValue` indexes it with a runtime `prop` string — the only
// shape that admits that read is `Record<string, string>`. The cast is the
// policy-documented irreducible-by-DOM-structural-impossibility class
// (H.md §2 H2; H-AUDIT-5 table row #2 — verdict KEEP). Centralised here so
// the boundary lives at a single named site rather than at each indexed read.
const styleRecord = (style: CSSStyleDeclaration): Record<string, string> =>
    style as unknown as Record<string, string>;

// ─── Layout epoch (C7) ────────────────────────────────────────────────────
//
// A computed-unit resolution (`vh`, `cqw`, `calc(100cqw - 100%)`, …) is
// invariant *while the layout is stable* — the only event that changes the
// resolved pixel value is a viewport/container resize. So the endpoint cache
// (C1) and the `getComputedValue` memo can serve a cached pair for the whole
// life of a steady animation; a resize bumps a monotonic generation counter
// and stamps every later cache entry with the new epoch, so a stale entry is
// re-resolved on next use.
//
// The counter is process-global and read on the hot path; bumping it is the
// O(1) invalidation that makes the C1 cache safe. Consumers wire a resize
// signal to `bumpLayoutEpoch()` (auto-installed on `window.resize` below when
// a DOM is present; also callable manually, e.g. from a ResizeObserver).

let layoutEpoch = 0;

/** The current layout-epoch generation. Bumped on resize. */
export const getLayoutEpoch = (): number => layoutEpoch;

/**
 * Invalidate every layout-epoch-stamped cache (the C1 endpoint cache and the
 * `getComputedValue` memo) by advancing the generation counter, AND clear the
 * memo wholesale. This is the single invalidation primitive for **both** classes
 * of computed-unit staleness (N.W7.B-B3.F1):
 *
 *   1. **Layout change** — a viewport `resize` (auto-installed below), a
 *      *container* `ResizeObserver` callback (NOT auto-wired — value.js has no
 *      element handle; the consumer wires its own observer to this), a
 *      writing-mode flip, a font load, etc. These change `vh`/`cqw`/`em`/… px.
 *   2. **`var()` mutation** — a custom-property reassignment mid-animation (a
 *      theme switch, a JS-driven design token). This is NOT a layout event and
 *      does NOT bump the epoch on its own, so a consumer driving custom
 *      properties imperatively MUST call this after the write or the cache
 *      serves the pre-mutation value for the rest of the epoch.
 *
 * Cheap (one integer increment + one memo clear); the next computed frame
 * re-resolves both endpoints against the live box.
 */
export const bumpLayoutEpoch = (): number => {
    layoutEpoch++;
    // Bust the memo too: its entries are stamped only implicitly (by content
    // identity), so a resize must clear them or they'd serve pre-resize px for
    // the page's life (the C7 staleness the audit names). The C1 endpoint cache
    // self-invalidates via the epoch stamp; the memo is shared/unstamped, so we
    // clear it wholesale here.
    getComputedValue.cache.clear();
    return layoutEpoch;
};

// Auto-install the resize signal once, when a live `window` is present. Guarded
// so SSR / node / repeated module eval don't double-bind or throw. Consumers
// in non-DOM hosts (or with their own ResizeObserver) can ignore this and call
// `bumpLayoutEpoch()` directly.
let resizeInstalled = false;
const installResizeEpoch = (): void => {
    if (resizeInstalled) return;
    if (typeof window === "undefined" || typeof window.addEventListener !== "function")
        return;
    resizeInstalled = true;
    window.addEventListener("resize", () => bumpLayoutEpoch(), { passive: true });
};
installResizeEpoch();

// ─── getComputedValue ─────────────────────────────────────────────────────

// N.W7.B-B3.F2 — the LRU bound for the `getComputedValue` memo. A computed
// animation's concurrent working set is its live computed leaves (one entry per
// (endpoint ValueUnit, element) pair); a complex page animating hundreds of
// computed properties across dozens of elements stays well under this. The cap
// only bites the pathological long-lived-SPA accumulation the C2 per-instance
// key opened (retired-iv leaves that never re-resolve), evicting the
// least-recently-used. Exported so a consumer can reason about (or in tests,
// assert against) the ceiling.
export const COMPUTED_MEMO_MAX_ENTRIES = 4096;

/**
 * Resolve a computed CSS value (`var()`, `calc()`, or other
 * deferred-evaluation unit) against a target element by writing it
 * into the target's inline style and reading back the computed
 * style.
 *
 * Memoised by `(value-unit-instance-id, element-id)` (C2 / N.W7.B-B3.F7) —
 * NOT `value.toString()`. The endpoint `ValueUnit`s are fixed for an
 * `InterpolatedVar`'s life, so a per-instance monotonic id (WeakMap-assigned,
 * GC-safe) is a content-equivalent key that pays one `WeakMap` probe per hit
 * instead of a full `calc(…)`/`var(…)` re-serialisation.
 *
 * The memo is **bounded** (`maxCacheSize`, LRU eviction — N.W7.B-B3.F2). The
 * C2 per-instance key means N short-lived computed `ValueUnit`s would otherwise
 * leave N permanent entries (a long-lived SPA re-creating interpolation vars
 * per cycle leaks one entry per leaf per cycle), since the string-keyed `Map`
 * entry outlives the GC'd `ValueUnit`. The bound caps that at
 * `COMPUTED_MEMO_MAX_ENTRIES`, evicting the least-recently-used leaf — far
 * above any realistic concurrent computed-leaf working set, so a steady
 * animation never evicts a live endpoint.
 *
 * For `calc()` values whose `subProperty` names a transform axis
 * (`translateX`, `scaleY`, etc.), the round-trip yields a `matrix()`
 * or `matrix3d()`; this function decomposes the matrix to recover
 * the resolved numeric value for that single axis.
 *
 * Caching is suppressed when the target is disconnected — layout
 * units (`vh`, `cqw`, etc.) resolve to 0 outside the live tree, so
 * caching that value would poison later reads.
 *
 * STALENESS CONTRACT (N.W7.B-B3.F1): this memo (and the C1 endpoint cache it
 * feeds) is keyed on `(instance, element, layoutEpoch)`. A computed-unit
 * resolution changes ONLY on (i) a viewport/container resize or (ii) a
 * `var()` custom-property reassignment (theme switch, JS-driven token). Neither
 * fires automatically except the auto-installed `window.resize`. A consumer
 * that mutates a custom property mid-animation, or resizes a *container* under
 * a `ResizeObserver`, MUST call `bumpLayoutEpoch()` to invalidate — see its
 * doc. Without that, a stale endpoint is served for the rest of the epoch.
 */
export const getComputedValue = memoize(
    (value: ValueUnit, target?: HTMLElement) => {
        const get = (): ValueUnit => {
            if (!target) return value;

            if (value.unit === "var") {
                const computed = getComputedStyle(target).getPropertyValue(
                    value.value,
                );
                return parseCSSValueUnit(computed);
            }

            if (
                value.unit === "calc" &&
                value.property &&
                value.subProperty &&
                value.value
            ) {
                const prop = value.property;
                const style = styleRecord(target.style);
                const originalValue = style[prop] ?? "";

                const newValue = value.subProperty
                    ? `${value.subProperty}(${value.toString()})`
                    : value.toString();

                style[prop] = newValue;

                const computed = getComputedStyle(target).getPropertyValue(
                    prop,
                );

                style[prop] = originalValue;

                const p = parseCSSValue(computed);

                if (p instanceof ValueUnit) return p;

                if (p.name.startsWith("matrix")) {
                    const matrixValues = unpackMatrixValues(p);

                    if (isMatrixSubProperty(value.subProperty)) {
                        const matrixSubValue = matrixValues[value.subProperty];
                        if (matrixSubValue != null) {
                            return new ValueUnit(matrixSubValue, "px", [
                                "length",
                                "absolute",
                            ]);
                        }
                    }
                }
            }

            return value;
        };

        return get().coalesce(value);
    },
    {
        // N.W7.B-B3.F2 — bound the memo with the W7.A LRU. The C2 per-instance
        // key means distinct-but-content-equal ValueUnits no longer dedup, so an
        // unbounded memo grew one permanent string-keyed entry per leaf per
        // animation cycle (the WeakMap lets the ValueUnit GC, but the Map entry
        // — keyed on the string id, not the object — persists). The LRU caps the
        // entry count and evicts the least-recently-used leaf; the cap is far
        // above any realistic concurrent computed-leaf working set, so a steady
        // animation re-touches (and thus LRU-promotes) its live endpoints every
        // frame and never evicts them — only retired leaves age out.
        maxCacheSize: COMPUTED_MEMO_MAX_ENTRIES,
        // C2 (tranche-F Wave C) — key on a per-instance stable id, NOT
        // `value.toString()`. The endpoint ValueUnits are fixed for an iv's
        // life, so the id is a content-equivalent key that costs one WeakMap
        // probe instead of a full `calc(…)`/`var(…)` re-serialisation per hit.
        keyFn: (value: ValueUnit, target?: HTMLElement) =>
            `${getValueUnitId(value)}-${target ? getElementId(target) : "null"}`,
        // Layout-dependent units (`vh`, `cqw`, etc.) resolve to 0
        // when the element is outside the live tree (e.g. inside a
        // detached DocumentFragment). Don't cache those reads.
        shouldCache: (
            _result: ValueUnit,
            _value: ValueUnit,
            target?: HTMLElement,
        ) => !target || target.isConnected,
    },
);

// ─── normalizeNumericUnits ────────────────────────────────────────────────

/**
 * Convert two `ValueUnit`s of the same superType to a common base
 * unit: length → px, angle → deg, time → ms, resolution → dpi.
 *
 * Throws if either input has a unit that isn't recognised for its
 * superType — silent passthrough hides bugs upstream.
 */
export const normalizeNumericUnits = (
    a: ValueUnit,
    b: ValueUnit,
    inplace: boolean = false,
): [ValueUnit, ValueUnit] => {
    if (a?.superType?.[0] !== b?.superType?.[0]) {
        if (inplace) return [a, b];
        return [a.clone(), b.clone()];
    }

    const convertToNormalizedUnit = (
        value: ValueUnit,
    ): { value: number; unit: string } => {
        const superType = value?.superType?.[0];
        const numericValue = toNumericValue(value.value, "ValueUnit");

        switch (superType) {
            case "length":
                if (!isLengthUnit(value.unit)) {
                    throw new TypeError(
                        `Unsupported length unit: ${String(value.unit)}`,
                    );
                }
                return {
                    value: convertToPixels(
                        numericValue,
                        value.unit,
                        value.targets?.[0],
                    ),
                    unit: "px",
                };
            case "angle":
                if (!isAngleUnit(value.unit)) {
                    throw new TypeError(
                        `Unsupported angle unit: ${String(value.unit)}`,
                    );
                }
                return {
                    value: convertToDegrees(numericValue, value.unit),
                    unit: "deg",
                };
            case "time":
                if (!isTimeUnit(value.unit)) {
                    throw new TypeError(
                        `Unsupported time unit: ${String(value.unit)}`,
                    );
                }
                return {
                    value: convertToMs(numericValue, value.unit),
                    unit: "ms",
                };
            case "resolution":
                if (!isResolutionUnit(value.unit)) {
                    throw new TypeError(
                        `Unsupported resolution unit: ${String(value.unit)}`,
                    );
                }
                return {
                    value: convertToDPI(numericValue, value.unit),
                    unit: "dpi",
                };
            default:
                return {
                    value: numericValue,
                    unit: typeof value.unit === "string" ? value.unit : "",
                };
        }
    };

    const [newA, newB] = [
        convertToNormalizedUnit(a),
        convertToNormalizedUnit(b),
    ];

    if (inplace) {
        a.value = newA.value;
        a.unit = newA.unit;

        b.value = newB.value;
        b.unit = newB.unit;

        return [a, b];
    }
    return [
        new ValueUnit(
            newA.value,
            newA.unit,
            a.superType,
            a.subProperty,
            a.property,
            a.targets,
        ),
        new ValueUnit(
            newB.value,
            newB.unit,
            b.superType,
            b.subProperty,
            b.property,
            b.targets,
        ),
    ];
};

// ─── normalizeValueUnits ──────────────────────────────────────────────────

/**
 * Type-predicate narrowing a generic `ValueUnit` to the exact input shape
 * expected by `normalizeColorUnits` (`ValueUnit<Color<ValueUnit<number>>,
 * "color">`). The runtime check is the `unit === "color"` discriminant —
 * the same check the prior `asColorValueUnit` helper bridged, lifted into
 * the type system so the narrowing flows without a double-cast.
 *
 * The inner `Color<ValueUnit<number>>` shape is a producer-side contract:
 * the parsing pipeline only mints `unit === "color"` `ValueUnit`s with
 * `Color<ValueUnit<number>>`-typed payloads. The discriminant alone is
 * the structurally honest narrowing.
 *
 * H.W2 Lane C (H-OPP-9): retires the boundary cast at the former line
 * 319 — see `docs/tranches/H/audit/H.W2-lane-c-type-predicate.md`.
 */
const isColorValueUnit = (
    value: ValueUnit,
): value is Parameters<typeof normalizeColorUnits>[0] => value.unit === "color";

export type NormalizeValueUnitsOptions = {
    /** Color space for color interpolation. Default: `"oklab"`. */
    colorSpace?: ColorSpace;
    /** Hue interpolation method for cylindrical color spaces. */
    hueMethod?: HueInterpolationMethod;
};

/**
 * Compute an `InterpolatedVar` from two endpoint `ValueUnit`s,
 * preparing them for later `lerpValue` calls.
 *
 * - Colors: collapsed to a common space via `normalizeColorUnits`.
 *   `colorSpace` defaults to `oklab` (perceptually uniform); `hueMethod`
 *   selects the cylindrical hue interpolation strategy.
 * - Mixed units (e.g. `10px` ↔ `1em`): collapsed via
 *   `normalizeNumericUnits` to a common base unit.
 * - Computed units (`var`, `calc` — `COMPUTED_UNITS` is these two ONLY):
 *   left as-is and marked `computed: true`; the numeric resolution is
 *   deferred to `lerpComputedValue` against a live target. Viewport /
 *   container units (`vh`, `vw`, `cqw`, …) are NOT deferred: a same-unit
 *   `vh→vh` pair lerps symbolically (resize-safe), while a mixed `vh→px`
 *   pair resolves `vh` eagerly to px here and does NOT track resize. (The
 *   docstring claimed these were `computed`/deferred — corrected at S.W1
 *   per lib-core-value-audit P2-1; wiring them through the computed path
 *   is a deferred behavior decision, not taken here.)
 */
export function normalizeValueUnits(
    left: ValueUnit,
    right: ValueUnit,
    options: NormalizeValueUnitsOptions = {},
): InterpolatedVar<unknown> {
    const colorSpace: ColorSpace = options.colorSpace ?? "oklab";
    const hueMethod = options.hueMethod;

    left = left.coalesce(right);
    right = right.coalesce(left);

    const out: InterpolatedVar<unknown> = {
        start: left,
        stop: right,
        value: left.clone(),
        computed: false,
    };

    if (isColorValueUnit(left) && isColorValueUnit(right)) {
        const [leftCollapsed, rightCollapsed] = normalizeColorUnits(
            left,
            right,
            colorSpace,
            false,
            true,
            false,
            hueMethod,
        );

        out.start = leftCollapsed;
        out.stop = rightCollapsed;
        out.value = leftCollapsed.clone();
        // Producer side: carry hueMethod + colorSpace through to the
        // InterpolatedVar so `lerpColorValue` can dispatch `interpolateHue`
        // for the hue channel of cylindrical spaces.
        out.colorSpace = colorSpace;
        if (hueMethod) out.hueMethod = hueMethod;
    }

    if (left.unit !== right.unit) {
        const [leftCollapsed, rightCollapsed] = normalizeNumericUnits(
            left,
            right,
            true,
        );

        out.start = leftCollapsed;
        out.stop = rightCollapsed;
        out.value = leftCollapsed.clone();
    }

    out.computed = isComputedUnit(left.unit) || isComputedUnit(right.unit);

    return out;
}

// Re-export for consumers that want to query computed-unit-ness.
export { isColorUnit };
