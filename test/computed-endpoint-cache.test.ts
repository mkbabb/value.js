import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ValueUnit } from "../src/units";
import type { InterpolatedVar } from "../src/units";
import { lerpComputedValue, prepareInterpVar } from "../src/units/interpolate";
import * as normalize from "../src/units/normalize";

const { bumpLayoutEpoch, getComputedValue, getLayoutEpoch } = normalize;

/**
 * Tranche-F Wave C — the computed-unit endpoint cache (C1) + its stable-id
 * memo key (C2), `ttl===Infinity` fast path (C4), and layout-epoch eviction
 * (C7). The falsifiable analogue of `proof:computed-frame`: a resolve
 * call-counter over a steady N-frame window asserting O(1) resolves (paid
 * once), not O(frames); + the cache-bust tests (setTargets / resize epoch);
 * + a pixel-identical lock (cached path == per-frame-resolve path while
 * layout is stable).
 *
 * BITES (verified by hand): revert the `_computedCache` fast path in
 * `lerpComputedValue` → `getComputedStyle` is called per frame → the O(1)
 * call-count assertion climbs to O(frames) → red.
 */

// A `var()` computed leaf is the deterministic jsdom-resolvable shape: the
// resolve path calls `getComputedStyle(target).getPropertyValue("--x")`, which
// we spy to count resolves. (`calc()` needs real layout jsdom lacks.)
const makeVarIv = (
    el: HTMLElement,
    a: number,
    b: number,
): InterpolatedVar<unknown> => {
    el.style.setProperty("--start", `${a}px`);
    el.style.setProperty("--stop", `${b}px`);
    const start = new ValueUnit("--start", "var");
    const stop = new ValueUnit("--stop", "var");
    start.setTargets([el]);
    stop.setTargets([el]);
    const iv: InterpolatedVar<unknown> = {
        start,
        stop,
        value: start.clone(),
        computed: true,
    };
    return prepareInterpVar(iv);
};

describe("Wave C1/C2/C4/C7 — computed-unit endpoint cache", () => {
    let el: HTMLElement;
    // The C1-biting counter: calls into the resolve fn `getComputedValue`. With
    // C1, a steady computed leaf calls it twice (frame 0: start+stop) and never
    // again; revert C1 → it climbs to 2×frames (re-resolve every tick) → red.
    let resolveSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        // A fresh global epoch + memo for each test so counts are isolated.
        bumpLayoutEpoch();
        getComputedValue.cache.clear();
        el = document.createElement("div");
        document.body.appendChild(el);
        resolveSpy = vi.spyOn(normalize, "getComputedValue");
    });

    afterEach(() => {
        resolveSpy.mockRestore();
        el.remove();
    });

    // ── Gate 1: O(1) resolves over a steady N-frame window ─────────────────
    it("steady-state computed resolves are served from the cache, not re-derived", () => {
        const iv = makeVarIv(el, 0, 100);

        const FRAMES = 600;
        resolveSpy.mockClear();
        for (let i = 0; i < FRAMES; i++) {
            lerpComputedValue(i / FRAMES, iv);
        }

        // Two endpoints resolved exactly once (frame 0), then the cache serves
        // every later frame. The endpoint cache holds the resolve count at
        // O(1) (== 2: start + stop), NOT O(frames) (== 1200).
        expect(resolveSpy).toHaveBeenCalledTimes(2);
    });

    // ── Gate 4: pixel-identical while the epoch is stable ──────────────────
    it("cached output is byte-identical to a per-frame-resolve baseline", () => {
        const iv = makeVarIv(el, 0, 100);

        // Baseline: resolve both endpoints directly every frame and lerp.
        const startN = getComputedValue(iv.start, el).value as number;
        const stopN = getComputedValue(iv.stop, el).value as number;

        for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const cached = lerpComputedValue(t, iv).value as number;
            const baseline = startN + (stopN - startN) * t;
            expect(cached).toBe(baseline);
        }
    });

    // ── Gate 3a: the cache busts on a target change (setTargets) ───────────
    it("re-resolves when the target changes (setTargets bust)", () => {
        const iv = makeVarIv(el, 0, 100);
        lerpComputedValue(0.5, iv); // warm: start+stop resolved once
        const firstMid = lerpComputedValue(0.5, iv).value as number;
        expect(firstMid).toBe(50);

        // A second element with different custom-property values — the new
        // resolution context. Re-point the endpoints' targets.
        const el2 = document.createElement("div");
        document.body.appendChild(el2);
        el2.style.setProperty("--start", "0px");
        el2.style.setProperty("--stop", "200px");
        iv.start.setTargets([el2]);
        iv.stop.setTargets([el2]);

        resolveSpy.mockClear();
        const secondMid = lerpComputedValue(0.5, iv).value as number;
        // The cached target !== the new target → both endpoints re-resolve.
        expect(resolveSpy).toHaveBeenCalledTimes(2);
        // …and the resolved value reflects el2's larger --stop (100 vs 50).
        expect(secondMid).toBe(100);
        el2.remove();
    });

    // ── Gate 3b: the cache busts on a layout-epoch bump (resize) ───────────
    it("re-resolves when the layout epoch advances (resize bust)", () => {
        const iv = makeVarIv(el, 0, 100);
        lerpComputedValue(0.5, iv); // warm
        resolveSpy.mockClear();

        // Steady frames within the same epoch: zero re-resolves.
        for (let i = 0; i < 10; i++) lerpComputedValue(i / 10, iv);
        expect(resolveSpy).toHaveBeenCalledTimes(0);

        // A resize changes the resolution: mutate the source vars + bump epoch.
        el.style.setProperty("--start", "0px");
        el.style.setProperty("--stop", "300px");
        const before = getLayoutEpoch();
        bumpLayoutEpoch();
        expect(getLayoutEpoch()).toBe(before + 1);

        resolveSpy.mockClear();
        const mid = lerpComputedValue(0.5, iv).value as number;
        // The epoch stamp mismatched → both endpoints re-resolve through the
        // now-cleared memo, picking up the post-resize values.
        expect(resolveSpy).toHaveBeenCalledTimes(2);
        expect(mid).toBe(150); // lerp(0, 300, 0.5)
    });

    // ── Gate 2 (C2): the memo HIT key pays no toString() re-serialise ──────
    it("getComputedValue memo keys on stable identity, not value.toString()", () => {
        el.style.setProperty("--x", "10px");
        const v = new ValueUnit("--x", "var");
        const tsSpy = vi.spyOn(v, "toString");

        getComputedValue(v, el); // miss → resolve + store
        getComputedValue(v, el); // hit
        getComputedValue(v, el); // hit

        // The C2 key is the per-instance WeakMap id; a HIT must not serialise.
        // (Pre-C2 the keyFn called value.toString() on every call, hit or miss.)
        expect(tsSpy).not.toHaveBeenCalled();
        tsSpy.mockRestore();
    });

    // ── C4: ttl===Infinity memo doesn't read the dead clock per hit ────────
    it("memoize ttl===Infinity hit path skips Date.now()", () => {
        el.style.setProperty("--y", "7px");
        const v = new ValueUnit("--y", "var");
        getComputedValue(v, el); // miss → store (timestamp 0 under the fast path)
        const dateSpy = vi.spyOn(Date, "now");
        getComputedValue(v, el); // hit
        getComputedValue(v, el); // hit
        // No TTL was set on getComputedValue's memo, so the hit path must not
        // read the clock at all.
        expect(dateSpy).not.toHaveBeenCalled();
        dateSpy.mockRestore();
    });
});
