import { assert, describe, expect, it } from "vitest";
import { CSSValueUnit } from "../src/parsing/units";
import { parseResult } from "../src/parsing/utils";
import { RELATIVE_LENGTH_UNITS } from "../src/units/constants";
import { convertToPixels } from "../src/units/utils";

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
