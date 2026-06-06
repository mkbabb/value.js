import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";
import { enableDiagnostics, disableDiagnostics } from "@mkbabb/parse-that";
import {
    CSSValueUnit,
    parseCSSColor,
    registerColorNames,
    clearCustomColorNames,
} from "../src/parsing/units";
import { parseResult } from "../src/parsing/utils";
import { RELATIVE_LENGTH_UNITS } from "../src/units/constants";
import { convertToPixels } from "../src/units/utils";
import { OKLABColor, RGBColor } from "../src/units/color";
import { normalizeValueUnits } from "../src/units/normalize";
import { prepareInterpVar, lerpColorValue } from "../src/units/interpolate";

/**
 * Tranche-F cross-repo handoff — falsifiable gates locking each landed wave.
 * See docs/tranches/F/valuejs-sota-handoff-v2.md.
 */

describe("Wave A2 — maximal-munch unit classification (latent boundary correctness)", () => {
    // The bug: `istring` compiles a non-anchored RegExp; parse-that re-flags it
    // sticky `y`, anchoring the START but not the END. So a unit matches as a
    // PREFIX of the continuation — `100vhx` tokenized `vh` + dropped `x`.
    // Maximal-munch + Set classification removes the order-dependence AND the
    // loose boundary: a unit run not in the family Set must NOT mis-tokenize.

    const lengthDim = (input: string) => parseResult(CSSValueUnit.Length, input);

    it("rejects a dimension whose unit token has trailing junk (the boundary bug)", () => {
        // Before the fix these all PARSED as `<n>vh`/`<n>vmin`/`<n>dvh`,
        // silently dropping the trailing letters.
        for (const bad of ["100vhx", "100vming", "100dvhz", "100remx", "100emy"]) {
            const r = lengthDim(bad);
            assert.isFalse(
                r.status && r.value != null,
                `"${bad}" must NOT parse as a clean length dimension`,
            );
        }
    });

    it("rejects trailing junk on non-length dimension families", () => {
        for (const [parser, bad] of [
            [CSSValueUnit.Time, "100sx"],
            [CSSValueUnit.Angle, "100degx"],
            [CSSValueUnit.Time, "100msz"],
        ] as const) {
            const r = parseResult(parser, bad);
            assert.isFalse(
                r.status && r.value != null,
                `"${bad}" must NOT parse as a clean dimension`,
            );
        }
    });

    it("longest-match: vmin/vmax/vb/vi/svw are each their full unit", () => {
        for (const u of ["vmin", "vmax", "vb", "vi", "svw", "svmin", "dvh", "lvmax"]) {
            const r = lengthDim(`100${u}`);
            assert.isTrue(r.status, `"100${u}" must parse`);
            assert.equal(r.value.unit, u, `"100${u}" must classify as "${u}"`);
        }
    });

    it("still parses every valid relative length unit (isomorphism)", () => {
        for (const u of RELATIVE_LENGTH_UNITS) {
            const r = lengthDim(`1${u}`);
            assert.isTrue(r.status, `"1${u}" must parse`);
            assert.equal(r.value.unit, u);
        }
    });
});

describe("Wave C5 — convertToPixels length-unit coverage (silent wrong-pixel bug)", () => {
    // Of 38 declared relative length units, 24 fell through to
    // convertAbsoluteUnitToPixels, which returns the raw number unchanged:
    // `50dvh` -> `50px`. jsdom (no layout) cannot catch it; we stub the window
    // geometry so a non-identity resolution is observable.

    const VIEWPORT_W = 1000;
    const VIEWPORT_H = 800;

    let saved: Record<string, PropertyDescriptor | undefined> = {};

    function stubViewport() {
        saved = {
            innerWidth: Object.getOwnPropertyDescriptor(window, "innerWidth"),
            innerHeight: Object.getOwnPropertyDescriptor(window, "innerHeight"),
            visualViewport: Object.getOwnPropertyDescriptor(window, "visualViewport"),
        };
        Object.defineProperty(window, "innerWidth", { value: VIEWPORT_W, configurable: true });
        Object.defineProperty(window, "innerHeight", { value: VIEWPORT_H, configurable: true });
        Object.defineProperty(window, "visualViewport", {
            value: { width: VIEWPORT_W, height: VIEWPORT_H },
            configurable: true,
        });
    }
    function restoreViewport() {
        for (const [k, d] of Object.entries(saved)) {
            if (d) Object.defineProperty(window, k, d);
        }
    }

    it("no relative VIEWPORT unit silently returns the raw number unchanged", () => {
        stubViewport();
        try {
            // The formerly-no-op viewport family: vi/vb + the 18 sv*/lv*/dv*.
            // 100<unit> against a 1000x800 viewport must NOT equal 100.
            const viewportUnits = ["vi", "vb"].concat(
                ["sv", "lv", "dv"].flatMap((p) =>
                    ["w", "h", "i", "b", "min", "max"].map((s) => p + s),
                ),
            );
            for (const u of viewportUnits) {
                const px = convertToPixels(100, u as never);
                assert.notEqual(
                    px, 100,
                    `"100${u}" must resolve against the viewport, got identity ${px}px`,
                );
            }
        } finally {
            restoreViewport();
        }
    });

    it("dvh/svh/lvh resolve to the viewport height (spec resolution)", () => {
        stubViewport();
        try {
            // 50<vh-family> against an 800px viewport height = 400px.
            for (const u of ["dvh", "svh", "lvh", "vb"]) {
                assert.equal(convertToPixels(50, u), 0.5 * VIEWPORT_H, `50${u}`);
            }
            // width-family against 1000px width.
            for (const u of ["dvw", "svw", "lvw", "vi"]) {
                assert.equal(convertToPixels(50, u), 0.5 * VIEWPORT_W, `50${u}`);
            }
        } finally {
            restoreViewport();
        }
    });
});

describe("Wave B1b — formatColor omits `/ alpha` at alpha=1 (CSS Color 4 canonical)", () => {
    // formatColor unconditionally emitted ` / ${alpha}` — an opaque oklab(...)
    // serialized as `oklab(... / 1)`, ~4 wasted chars the browser re-parses and
    // a divergence from the canonical opaque form.

    it("opaque colors serialize without the `/ 1` clause", () => {
        expect(new OKLABColor(0.54, 0.096, -0.093, 1).toString()).toBe(
            "oklab(0.54 0.096 -0.093)",
        );
        expect(new RGBColor(255, 128, 0, 1).toString()).toBe("rgb(255 128 0)");
        // toFormattedString routes through the same choke point.
        expect(new RGBColor(1, 2, 3, 1).toFormattedString(2)).toBe("rgb(1 2 3)");
    });

    it("non-opaque colors still emit the `/ alpha` clause", () => {
        expect(new RGBColor(255, 128, 0, 0.5).toString()).toBe(
            "rgb(255 128 0 / 0.5)",
        );
        expect(new OKLABColor(0.5, 0, 0, 0).toString()).toBe("oklab(0.5 0 0 / 0)");
    });

    it("opaque emission round-trips back to alpha=1", () => {
        const emitted = new OKLABColor(0.54, 0.096, -0.093, 1).toString();
        const parsed = parseCSSColor(emitted);
        const color = parsed.value as OKLABColor;
        assert.equal(Number(color.alpha), 1, "round-tripped opaque alpha must be 1");
    });
});

describe("Wave F7 — no console.error on the custom-color-name path", () => {
    // parseCSSColor ran the rich parser FIRST, so a registered custom name
    // always failed the rich parse, and parse-that's top-level parseState fires
    // console.error(state.toString()) on that expected failure (when diagnostics
    // are on). Reordering to try the name map first elides the leak.

    let errorSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        clearCustomColorNames();
        parseCSSColor.cache.clear();
        enableDiagnostics();
        errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    });
    afterEach(() => {
        errorSpy.mockRestore();
        disableDiagnostics();
        clearCustomColorNames();
        parseCSSColor.cache.clear();
    });

    it("resolves a registered custom name with zero console.error", () => {
        registerColorNames({ mybrandcolor: "#abcdef" });
        parseCSSColor.cache.clear();
        const v = parseCSSColor("mybrandcolor");
        assert.equal(v.unit, "color", "custom name must resolve to a color");
        assert.equal(
            errorSpy.mock.calls.length,
            0,
            "the custom-name path must not emit console.error",
        );
    });

    it("built-in named colors still resolve via the rich parser (iso)", () => {
        registerColorNames({ mybrandcolor: "#abcdef" });
        parseCSSColor.cache.clear();
        // `red` is a built-in — the empty-collision custom map must not shadow it.
        const v = parseCSSColor("red");
        assert.equal(v.unit, "color");
    });
});

describe("Wave B3 — frozen color-channel plan is byte-identical to the walk", () => {
    // prepareInterpVar builds a frozen channel plan so the per-frame
    // lerpColorValue loop is closure-/keys()-/unwrapDeep-free. The fast (plan)
    // path must produce output deep-equal to the fallback (unplanned) walk.

    const cases: Array<[string, string, string]> = [
        ["oklch(0.7 0.15 30)", "oklch(0.4 0.2 280)", "oklch"],
        ["oklab(0.5 0.1 -0.1)", "oklab(0.8 -0.05 0.12)", "oklab"],
        ["hsl(20 80% 40%)", "hsl(300 50% 70%)", "hsl"],
    ];

    for (const [a, b, space] of cases) {
        it(`plan == fallback for ${space}`, () => {
            const A = parseCSSColor(a);
            const B = parseCSSColor(b);
            const ivPlan = normalizeValueUnits(A, B, {
                colorSpace: space,
            } as never);
            prepareInterpVar(ivPlan);
            assert.isDefined(
                (ivPlan as { _colorPlan?: unknown })._colorPlan,
                "a prepared color iv must carry a _colorPlan",
            );

            const ivFallback = normalizeValueUnits(A, B, {
                colorSpace: space,
            } as never) as { _colorPlan?: unknown; _lerp?: unknown };
            delete ivFallback._colorPlan; // force the fallback walk
            delete ivFallback._lerp;

            for (let k = 0; k <= 50; k++) {
                const t = k / 50;
                const planned = (
                    lerpColorValue(t, ivPlan as never).value as { valueOf(): unknown[] }
                ).valueOf();
                const walked = (
                    lerpColorValue(t, ivFallback as never).value as {
                        valueOf(): unknown[];
                    }
                ).valueOf();
                for (let i = 0; i < planned.length; i++) {
                    assert.closeTo(
                        Number(planned[i]),
                        Number(walked[i]),
                        1e-12,
                        `${space} t=${t} channel=${i}`,
                    );
                }
            }
        });
    }
});
