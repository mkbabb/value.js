import { parseCSSValue } from "../parsing";
import { ValueUnit } from ".";
import { parseCSSValueUnit } from "../parsing/units";
import { memoize } from "../utils";
import { unpackMatrixValues } from "./utils";

// ─── Layout-epoch computed-value cache (S.W1 W1-8 cohesion split) ──────────
//
// Lifted verbatim from `units/normalize.ts`: the `getComputedValue` resolver +
// its whole layout-epoch memoization apparatus (element/ValueUnit stable-id
// maps, the `styleRecord` DOM boundary, the layout-epoch generation counter +
// its auto-installed `window.resize` signal, the LRU ceiling, and the matrix
// sub-property decode getComputedValue rides). This is the DOM-round-trip
// computed-unit machinery; `normalize.ts` keeps the pure numeric/color
// endpoint normalization. The documented irreducible DOM cast (the
// CSSStyleDeclaration no-string-index class — CLAUDE.md ledger) travels here
// too (the `styleRecord` boundary below).
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
