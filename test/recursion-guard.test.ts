/**
 * D.W1 Lane L8 — recursion-prevention regression tests.
 *
 * Codifies the 4 hardening primitives from D-REACTIVITY-A §5 against the
 * Mar 2026 iOS Safari stack-overflow class:
 *
 *  (b) DEV-only `assertNotNested` runtime guard in subclass constructors.
 *  (c) The 3 named regression tests below (294-frame replay, clone-no-amplify,
 *      depth-3 nest) + the isReactive shape regression.
 *  (d) `Color.clone()` depth-16 ceiling.
 *
 * Per the wave spec (D.W1.md §L8): the 294-frame replay simulates the iOS
 * Safari spectrum-drag pattern (~294 frames before clone() hit the stack
 * limit). The other two assert that legitimate uses never grow depth.
 */
import { describe, expect, it } from "vitest";
import {
    OKLABColor,
    OKLCHColor,
    RGBColor,
    ValueUnit,
} from "../src/index";
import { colorUnit2, normalizeColorUnit } from "../src/units/color/normalize";

describe("recursion-guard — L8 hardening primitive (c)", () => {
    /**
     * The canonical bug: after ~294 frames on iOS Safari the spectrum-drag's
     * per-frame `colorUnit2()` invocation accumulated ValueUnit<ValueUnit<…>>
     * layers; `clone()` recursion eventually overflowed the stack. Post-L8 +
     * the canonical unwrap loop at `normalize.ts:102`, layers cannot grow.
     */
    it("294-frame-replay: colorUnit2 does not amplify depth across 294 invocations", () => {
        // Construct a wrapped color (mimics what the parser returns to the
        // demo's spectrum-drag handler).
        let unit: ValueUnit<any, "color"> = new ValueUnit(
            new OKLABColor<ValueUnit<number>>(
                new ValueUnit(0.5),
                new ValueUnit(0.05),
                new ValueUnit(-0.05),
                new ValueUnit(1),
            ),
            "color",
            ["color", "oklab"],
        ) as ValueUnit<any, "color">;

        // Hammer through 294 iterations — clone() must not stack-overflow,
        // and the resulting structure must stay shallow (single VU<scalar>).
        for (let i = 0; i < 294; i++) {
            unit = colorUnit2(unit, "oklab", false, false, false);
        }

        // Probe one channel's nesting depth: must be exactly 1
        // (one ValueUnit wrap; the inner .value is a plain number).
        const inner = unit.value as OKLABColor<ValueUnit<number>>;
        const lChannel = inner.l as unknown;
        let depth = 0;
        let cursor: any = lChannel;
        while (cursor instanceof ValueUnit) {
            depth++;
            cursor = cursor.value;
        }
        expect(depth).toBeLessThanOrEqual(1);
        expect(typeof cursor).toBe("number");
    });

    /**
     * Cloning a Color repeatedly must not amplify nesting depth. The Mar 2026
     * bug class manifested as depth-N+1 after N clone calls — this test
     * forecloses regression.
     */
    it("clone-no-amplify: 3 successive clones preserve channel depth", () => {
        const original = new OKLABColor<ValueUnit<number>>(
            new ValueUnit(0.7),
            new ValueUnit(0.1),
            new ValueUnit(-0.1),
            new ValueUnit(1),
        );

        const c1 = original.clone();
        const c2 = c1.clone();
        const c3 = c2.clone();

        for (const clone of [c1, c2, c3]) {
            // Each clone's `.l` must be exactly ValueUnit<number> (depth 1).
            expect(clone.l).toBeInstanceOf(ValueUnit);
            const lValue = (clone.l as ValueUnit<number>).value;
            expect(lValue).not.toBeInstanceOf(ValueUnit);
            expect(typeof lValue).toBe("number");
        }
    });

    /**
     * Build an intentionally malicious depth-3 nest and pass through
     * `colorUnit2`/`normalizeColorUnit`. The unwrap loop must collapse it to
     * depth 1 (one ValueUnit, scalar inside). The DEV assertion in
     * subclass constructors should also reject double-wrap on the wrapped
     * input path — but since the construct happens before assertion (the
     * outer ValueUnit holds the bad inner), we verify the OUTPUT shape only.
     */
    it("depth-3-nest: colorUnit2 collapses VU<VU<VU<…>>> to depth-1", () => {
        // Construct a depth-3 ValueUnit<ValueUnit<ValueUnit<number>>>.
        // Channels start nested 3-deep.
        const wrapL = new ValueUnit(new ValueUnit(new ValueUnit(0.4)));
        const wrapA = new ValueUnit(new ValueUnit(new ValueUnit(0.0)));
        const wrapB = new ValueUnit(new ValueUnit(new ValueUnit(0.0)));

        // The DEV assertion in OKLABColor's constructor catches double-wrap
        // (VU<VU<…>>) by design — verify that behavior, then proceed via
        // unbranded write (bypass the constructor) to set up the nest test.
        expect(() => {
            new OKLABColor<any>(wrapL, wrapA, wrapB, new ValueUnit(1));
        }).toThrow(/double-wrap/i);

        // Set up the bad state directly (mimicking what a broken upstream
        // could produce in production where assertions are stripped).
        const oklab = new OKLABColor<any>();
        // Bypass the brand on writes by going through the `any` index sig.
        (oklab as any).l = wrapL;
        (oklab as any).a = wrapA;
        (oklab as any).b = wrapB;
        (oklab as any).alpha = new ValueUnit(1);

        const wrapped = new ValueUnit(oklab, "color", [
            "color",
            "oklab",
        ]) as ValueUnit<any, "color">;

        // Push through colorUnit2 — the unwrap loop at normalize.ts:102
        // must collapse depth back to 1.
        const out = colorUnit2(wrapped, "oklab", false, false, false);

        const channels = (out.value as OKLABColor<any>);
        for (const k of ["l", "a", "b", "alpha"] as const) {
            const v = (channels as any)[k];
            expect(v).toBeInstanceOf(ValueUnit);
            // Inner must be a plain primitive (the unwrap stripped 2 layers).
            expect((v as ValueUnit).value).not.toBeInstanceOf(ValueUnit);
        }
    });

    /**
     * Regression for D-REACTIVITY-B §3: a Color instance must not carry the
     * Vue reactive marker. value.js is provider-agnostic — no Color/ValueUnit
     * may end up wrapped in `reactive()` from the library side. We probe the
     * Vue marker structurally (without taking a Vue runtime dep on the lib).
     */
    it("isReactive-shape: Color instance carries no Vue reactive marker", () => {
        const c = new OKLABColor<number>(0.5, 0.1, -0.05, 1);
        // Vue marks reactive proxies with `__v_isReactive: true`. A bare
        // instance must not carry it (and the prototype chain must not
        // expose it either — the index-signature returns undefined for
        // un-set keys).
        expect((c as any).__v_isReactive).toBeUndefined();
        expect((c as any).__v_isRef).toBeUndefined();
        expect((c as any).__v_isShallow).toBeUndefined();
        // Sanity: own-property storage is mutable, not frozen.
        expect(Object.isFrozen(c)).toBe(false);
    });

    /**
     * Primitive (d): the depth-16 ceiling. Build a fake structure beyond
     * the ceiling and verify clone() throws. We construct a Color whose
     * channel is a Color which is also self-referencing through the
     * channel — clone() walks into the structure repeatedly via the
     * `clone()` from utils and hits the depth ceiling.
     *
     * In practice this would only trigger if assertNotNested were bypassed.
     */
    it("clone-depth-ceiling: clone() throws beyond depth 16", () => {
        // Build a self-referential chain by bypassing the brand. Color.clone
        // bumps Color._cloneDepth on entry; nested Color.clone() recursion
        // (through utils.clone, which recursively walks Color instances via
        // the .clone() method) trips the ceiling.
        const root = new OKLCHColor<any>(0.5, 0.5, 180, 1);
        let cur: any = root;
        for (let i = 0; i < 20; i++) {
            const next = new OKLCHColor<any>(0.5, 0.5, 180, 1);
            // Cast to any to bypass the brand at the test site.
            (cur as any).l = next;
            cur = next;
        }

        // Now clone() should throw because the chain is deeper than 16.
        expect(() => root.clone()).toThrow(/depth/i);
    });
});
