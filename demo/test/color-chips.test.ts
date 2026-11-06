// SERVED MODEL: claude-opus-5-5
/**
 * V-D3 (X realization, value-DESIGN) — the chip family: one module, one
 * serializer home. Falsifiers for BC-R-14/15/16/18/19/26:
 *   - a non-finite k samples the default count, finite and bounded (R-15);
 *   - one unpaintable stop among three leaves a 2-stop gradient, never a
 *     null background (R-26);
 *   - `stopsToGradient` is the one serializer: every ramp site reads it, and
 *     its output is byte-equal for the same stops (R-18/R-19);
 *   - `serializeStop` needs no alpha-1 strip: the colour serializer already
 *     omits alpha 1 (R-14).
 */
import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as chips from "../shared/ui/color-chips";
import { serializeIntervalRamp, serializeRailRamp } from "../workbenches/gradient/composables/useGradientCSS";
import { parseGradientCSS } from "../workbenches/gradient/composables/gradientParse";
import { colorToCss, parseColorIn } from "../color-session/color-utils";

const ROOT = join(import.meta.dirname, "..", "..");

describe("color-chips · the one serializer home", () => {
    it("R-15: NaN / Infinity k → the default count, finite and bounded", () => {
        const ops = ["oklch(0.6 0.15 30)", "oklch(0.7 0.12 250)"];
        for (const k of [Number.NaN, Number.POSITIVE_INFINITY, -3]) {
            const run = () => chips.sampleInterpolationRamp(ops, "oklch", "shorter", k);
            const out = run();
            expect(out, `k=${k}`).not.toBeNull();
            expect(out!.length, `k=${k}`).toBeGreaterThanOrEqual(2);
            expect(out!.length, `k=${k}`).toBeLessThanOrEqual(chips.RAMP_SAMPLE_COUNT + 2);
        }
    }, 2000);

    it("R-26: one unpaintable stop among three paints the other two", () => {
        const g = chips.stopsToGradient(["oklch(0.6 0.1 30)", "not-a-colour", "oklch(0.7 0.1 250)"]);
        expect(g).toBe("linear-gradient(90deg, oklch(0.6 0.1 30), oklch(0.7 0.1 250))");
        expect(chips.stopsToGradient(["oklch(0.6 0.1 30)", "nope"])).toBeNull();
    });

    it("R-18/R-19: one serializer, one direction idiom, byte-stable", () => {
        const stops = ["red 0% 50%", "blue 50% 100%"];
        expect(chips.stopsToGradient(stops)).toBe("linear-gradient(90deg, red 0% 50%, blue 50% 100%)");
        expect(chips.stopsToGradient(stops)).toBe(chips.stopsToGradient([...stops]));
    });

    it("R-18: no demo site mints `linear-gradient(to right` (the one idiom is 90deg)", () => {
        const sites = [
            "demo/color-session/palette-rail.ts",
            "demo/picker/controls/ComponentSliders/ComponentSliders.vue",
            "demo/workbenches/mix/MixResultDisplay.vue",
            "demo/shared/ui/color-chips/PreviewRamp.vue",
            "demo/palettes/browser/search/MiniColorPicker.vue",
            "demo/picker/controls/SpectrumCanvas/composables/useSpectrumPlateStyle.ts",
        ];
        for (const f of sites) {
            expect(readFileSync(join(ROOT, f), "utf8"), f).not.toContain("linear-gradient(to right");
        }
    });

    it("R-18/R-19 (adversarial finding 2): no demo script composes its own `linear-gradient` head", () => {
        // The literal-only grep above cannot see a COMPOSED head
        // (`linear-gradient(${dir}, …)` with `dir = "to right"`) or a second
        // `90deg` head. This law reads every tracked demo `.ts` and every
        // `.vue` <script> block, comments stripped, and refuses any
        // `linear-gradient(` whose first argument is an angle, a `to <side>`
        // keyword or an interpolation: the one place that writes a strip head
        // is `stopsToGradient`.
        const HOME = "demo/shared/ui/color-chips/sample.ts";
        // The SV plate is not a strip of stops: two crossed layers (white →
        // hue under a black `to top` veil), the spectrum's own paint.
        const PLATE = "demo/picker/controls/SpectrumCanvas/composables/useSpectrumPlateStyle.ts";
        const files = execFileSync("git", ["-C", ROOT, "ls-files", "demo/*.ts", "demo/*.vue"], { encoding: "utf8" })
            .split("\n")
            .filter((f) => f && !f.startsWith("demo/test/") && f !== HOME && f !== PLATE);
        const HEAD = /linear-gradient\(\s*(?:\$\{|-?[\d.]+(?:deg|turn|rad|grad)|to\s|in\s)/;
        const minted: string[] = [];
        for (const f of files) {
            let text = readFileSync(join(ROOT, f), "utf8");
            if (f.endsWith(".vue")) text = [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
            text = text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
            if (HEAD.test(text)) minted.push(f);
        }
        expect(minted).toEqual([]);
    });

    it("R-18/R-19: the gradient workbench's ramps ride the one serializer, with the model's space clause", () => {
        const parsed = parseGradientCSS("linear-gradient(90deg in oklab, red 0%, blue 100%)");
        if (!parsed.ok) throw new Error(parsed.reason);
        const model = { ...parsed.model, interpolationSpace: "oklab" as const, hueMethod: "shorter" as const };
        const rail = serializeRailRamp(model);
        expect(rail.startsWith("linear-gradient(90deg in oklab, ")).toBe(true);
        expect(rail).toContain("calc(var(--rail-inset) + var(--rail-track) * ");
        // Every rail stop survives the totality filter (a `calc()` position is
        // a position, not part of the colour).
        expect(rail.split("calc(").length - 1).toBeGreaterThanOrEqual(2);
        expect(serializeIntervalRamp(model, 0)!.startsWith("linear-gradient(90deg in oklab, ")).toBe(true);
        expect(serializeRailRamp({ ...model, stops: [] })).toBe("none");
    });

    it("R-14: the colour serializer already omits alpha 1", () => {
        const opaque = parseColorIn("oklch(0.6 0.1 30)", "oklch");
        expect(colorToCss(opaque, "oklch")).not.toMatch(/ \/ 1\)$/);
        expect(chips.serializeStop(opaque)).toBe(colorToCss(opaque, "oklch"));
    });
});
