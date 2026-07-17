import { describe, expect, it } from "vitest";
import * as color from "../src/subpaths/color";
import * as css from "../src/subpaths/css";
import * as easing from "../src/subpaths/easing";
import * as math from "../src/subpaths/math";
import * as quantize from "../src/subpaths/quantize";
import * as transform from "../src/subpaths/transform";
import * as value from "../src/subpaths/value";
import { serializeKeyframeSelector } from "../src/v4/css/grammar";

const { dominantColor, quantizePixels } = quantize;
const { isLayoutTrackingUnit } = value;

const ORACLE = {
    rgb: [[51, 102, 153], [0.118655305792428, 0.125059256092527, 0.319266107173931], 5e-10],
    hsl: [[210, 0.5, 0.4], [0.118655305792428, 0.125059256092527, 0.319266107173931], 5e-10],
    hsv: [[210, 2 / 3, 0.6], [0.118655305792428, 0.125059256092527, 0.319266107173931], 5e-10],
    hwb: [[210, 0.2, 0.4], [0.118655305792428, 0.125059256092527, 0.319266107173931], 5e-10],
    lab: [[41.520823927408273, -4.573089932636027, -33.494194592438951], [0.118655305792428, 0.125059256092527, 0.319266107173931], 5e-10],
    lch: [[41.520823927408273, 33.804943764605554, 262.225262078801393], [0.118655305792428, 0.125059256092527, 0.319266107173931], 5e-10],
    oklab: [[0.499314455845208, -0.033043487605947, -0.092966592064777], [0.118655305792428, 0.125059256092527, 0.319266107173931], 5e-10],
    oklch: [[0.499314455845208, 0.098664377124183, 250.433057420175430], [0.118655305792428, 0.125059256092527, 0.319266107173931], 5e-10],
    xyz: [[0.118655305792428, 0.125059256092527, 0.319266107173931], [0.118655305792428, 0.125059256092527, 0.319266107173931], 1e-14],
    kelvin: [[6500], [0.939743393712359, 0.991183300791134, 1.046611106615018], 5e-10],
    linearSrgb: [[0.25, 0.5, 0.75], [0.417250460809805, 0.464888327372306, 0.777329208763456], 5e-10],
    displayP3: [[0.25, 0.5, 0.75], [0.185191446424396, 0.201138953801658, 0.555139553598780], 5e-10],
    a98Rgb: [[0.25, 0.5, 0.75], [0.167731664285196, 0.190703689213077, 0.543242011509365], 5e-10],
    prophotoRgb: [[0.25, 0.5, 0.75], [0.143626568507974, 0.237359627237413, 0.650856733596718], 5e-10],
    rec2020: [[0.25, 0.5, 0.75], [0.134934199419380, 0.167618043984836, 0.537251004042137], 5e-10],
    ictcp: [[0.4278802843622844, -0.11570435976969046, 0.27872894737532694], [0.41239079926595934, 0.21263900587151027, 0.01933081871559182], 5e-9],
    jzazbz: [[0.13438473104350065, 0.1178852626079724, 0.11187810901317233], [0.41239079926595934, 0.21263900587151027, 0.01933081871559182], 5e-9],
} as const;

const FACTORY_SPACE = {
    rgb: "rgb", hsl: "hsl", hsv: "hsv", hwb: "hwb", lab: "lab", lch: "lch",
    oklab: "oklab", oklch: "oklch", xyz: "xyz", kelvin: "kelvin",
    linearSrgb: "srgb-linear", displayP3: "display-p3", a98Rgb: "a98-rgb",
    prophotoRgb: "prophoto-rgb", rec2020: "rec2020", ictcp: "ictcp", jzazbz: "jzazbz",
} as const;

describe("Value 4 final color graph", () => {
    for (const [factoryName, [channels, xyz, tolerance]] of Object.entries(ORACLE)) {
        it(`${factoryName} traverses the literal XYZ anchor`, () => {
            const factory = color[factoryName as keyof typeof color] as (...args: number[]) => color.Result<color.AnyColor, color.ColorIssue>;
            const source = factory(...channels);
            expect(source.ok).toBe(true);
            if (!source.ok) return;
            const converted = color.convertColor(source.value, "xyz");
            expect(converted.ok).toBe(true);
            if (!converted.ok) return;
            converted.value.channels.forEach((value, index) => expect(Math.abs((value as number) - xyz[index]!)).toBeLessThan(tolerance));

            const hub = color.xyz(...xyz);
            expect(hub.ok).toBe(true);
            if (!hub.ok) return;
            const inverse = color.convertColor(hub.value, FACTORY_SPACE[factoryName as keyof typeof FACTORY_SPACE]);
            expect(inverse.ok).toBe(true);
            if (!inverse.ok) return;
            inverse.value.channels.forEach((value, index) => {
                const allowance = factoryName === "kelvin" ? 1 : Math.max(tolerance * 20, 1e-8);
                expect(Math.abs((value as number) - channels[index]!)).toBeLessThanOrEqual(allowance);
            });
        });
    }

    it("defines every ordered conversion through the anchor graph", () => {
        const samples = Object.entries(ORACLE).map(([factoryName, [channels]]) => {
            const factory = color[factoryName as keyof typeof color] as (...args: number[]) => color.Result<color.AnyColor, color.ColorIssue>;
            const result = factory(...channels);
            if (!result.ok) throw new Error(factoryName);
            return result.value;
        });
        for (const sample of samples) {
            for (const space of Object.values(FACTORY_SPACE)) {
                const converted = color.convertColor(sample, space);
                expect(converted.ok, `${sample.space}→${space}`).toBe(true);
            }
        }
    });

    it("preserves a powerless hue and rejects an unresolved chromatic hue", () => {
        const gray = color.hsl("none", 0, 0.5);
        expect(gray.ok && color.convertColor(gray.value, "rgb").ok).toBe(true);
        const chromatic = color.hsl("none", 0.5, 0.5);
        expect(chromatic.ok && color.convertColor(chromatic.value, "rgb")).toEqual({ ok: false, error: { code: "color_missing_channel" } });
    });

    it("uses degree-domain hue and ties-to-even RGBA projection", () => {
        expect(color.interpolateHue(350, 10, 0.5)).toEqual({ ok: true, value: 0 });
        const source = color.rgb(0.5, 1.5, 2.5, 0.5);
        expect(source.ok && color.toRgba8(source.value, { gamut: "clip" })).toEqual({ ok: true, value: [0, 2, 2, 128] });
    });

    it("maps vivid colors by chroma without bending hue and can certify them", () => {
        const vivid = color.oklch(0.62, 0.4, 32, 1);
        expect(vivid.ok).toBe(true);
        if (!vivid.ok) return;
        const mapped = color.mapColorToGamut(vivid.value, "srgb");
        expect(mapped.ok).toBe(true);
        if (!mapped.ok) return;
        expect(mapped.value.channels[2]).toBeCloseTo(32, 9);
        expect(mapped.value.channels[1]).toBeLessThan(0.4);

        const surface = color.oklch(0.62, 0, 0, 1);
        if (!surface.ok) throw new Error("surface fixture");
        const safe = color.safeAccentColor(vivid.value, surface.value, {
            minimumRatio: 5.75,
            gamut: "srgb",
        });
        expect(safe.ok).toBe(true);
        if (safe.ok) expect(safe.value.channels[2]).toBeCloseTo(32, 9);
    });
});

describe("Value 4 CSS and easing contracts", () => {
    it("distinguishes a bare named keyframe selector from explicit zero", () => {
        expect(css.parseKeyframeSelector("from")).toEqual({ ok: true, value: { kind: "percent", value: 0 }, diagnostics: [] });
        expect(css.parseKeyframeSelector("TO")).toEqual({ ok: true, value: { kind: "percent", value: 1 }, diagnostics: [] });
        expect(css.parseKeyframeSelector("entry")).toEqual({ ok: true, value: { kind: "named", name: "entry" }, diagnostics: [] });
        expect(css.parseKeyframeSelector("entry 0%")).toEqual({ ok: true, value: { kind: "named", name: "entry", offset: 0 }, diagnostics: [] });
        expect(css.parseKeyframeSelector("entry 50%")).toEqual({ ok: true, value: { kind: "named", name: "entry", offset: 0.5 }, diagnostics: [] });
        expect(css.parseKeyframeSelector("exit 101%").ok).toBe(false);
    });

    it("canonically serializes and round-trips every keyframe-selector arm", () => {
        for (const [source, canonical] of [
            ["from", "0%"],
            ["to", "100%"],
            ["0%", "0%"],
            ["100%", "100%"],
            ["25.5%", "25.5%"],
            ["entry", "entry"],
            ["entry 0%", "entry 0%"],
            ["exit 100%", "exit 100%"],
        ] as const) {
            const parsed = css.parseKeyframeSelector(source);
            expect(parsed.ok, source).toBe(true);
            if (!parsed.ok) continue;
            const serialized = serializeKeyframeSelector(parsed.value);
            expect(serialized).toBe(canonical);
            expect(css.parseKeyframeSelector(serialized)).toEqual(parsed);
        }
    });

    it("rejects malformed keyword and percentage selectors with located diagnostics", () => {
        for (const source of ["from 10%", "to 90%", "-1%", "101%", "wat"]) {
            expect(css.parseKeyframeSelector(source)).toEqual({
                ok: false,
                diagnostics: [{
                    code: "keyframe_selector_invalid",
                    start: 0,
                    end: source.length,
                    expected: source === "-1%" || source === "101%"
                        ? ["0%..100%"]
                        : ["keyframe selector"],
                    actual: source,
                }],
            });
        }
    });

    it("routes stylesheet from/to through the same selector production", () => {
        const sheet = css.parseStylesheet("@keyframes pulse { from { opacity: 0; } to { opacity: 1; } }");
        expect(sheet.ok).toBe(true);
        if (!sheet.ok) return;
        const rules = css.collectKeyframes(sheet.value)[0]?.rule.rules;
        expect(rules?.map((rule) => rule.selectors[0])).toEqual([
            { kind: "percent", value: 0 },
            { kind: "percent", value: 1 },
        ]);
    });

    it("round-trips CSS-native color and rejects library-only/contextual spelling", () => {
        const parsed = css.parseCssColor("oklch(50% 0.1 250deg / 80%)");
        expect(parsed.ok).toBe(true);
        if (!parsed.ok) return;
        const serialized = css.serializeCssColor(parsed.value);
        expect(serialized.ok).toBe(true);
        if (serialized.ok) expect(css.parseCssColor(serialized.value).ok).toBe(true);
        expect(css.parseCssColor("kelvin(6500)").ok).toBe(false);
        const contextual = css.parseCssColor("var(--accent)");
        expect(contextual.ok).toBe(false);
        if (!contextual.ok) expect(contextual.diagnostics[0].code).toBe("color_context_required");
    });

    it("serializes powerless hue as the CSS none keyword", () => {
        const black = color.oklch(0, 0, "none", 1);
        if (!black.ok) throw new Error("black fixture");
        const serialized = css.serializeCssColor(black.value);
        expect(serialized).toEqual({ ok: true, value: "oklch(0% 0 none)" });
        expect(serialized.ok && css.parseCssColor(serialized.value).ok).toBe(true);
    });

    it("parses the standard color vocabulary and explicit CSS profile spellings", () => {
        expect(css.parseCssColor("aliceblue").ok).toBe(true);
        const srgb = css.parseCssColor("color(srgb 0.2 0.4 0.6)");
        expect(srgb.ok && srgb.value).toMatchObject({ space: "rgb", channels: [51, 102, 153] });
        const d50 = css.parseCssColor("color(xyz-d50 0.2 0.3 0.4)");
        expect(d50.ok && d50.value.space).toBe("xyz");
        expect(css.parseCssColor("SelectedItem")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "color_context_required" }],
        });
    });

    it("freezes both parse branches and every successful AST", () => {
        const parsed = css.parseTimingFunction("linear(0, 1 100%)");
        expect(parsed.ok).toBe(true);
        expect(Object.isFrozen(parsed)).toBe(true);
        expect(Object.isFrozen(parsed.diagnostics)).toBe(true);
        if (parsed.ok) {
            expect(Object.isFrozen(parsed.value)).toBe(true);
            expect(parsed.value.kind === "linear-function" && Object.isFrozen(parsed.value.stops)).toBe(true);
        }
        const failed = css.parseCssColor("not-a-color");
        expect(Object.isFrozen(failed)).toBe(true);
        if (!failed.ok) {
            expect(Object.isFrozen(failed.diagnostics)).toBe(true);
            expect(Object.isFrozen(failed.diagnostics[0])).toBe(true);
            expect(Object.isFrozen(failed.diagnostics[0].expected)).toBe(true);
        }
    });

    it("keeps parser-free easing failure explicit", () => {
        expect(easing.CubicBezier(-1, 0, 1, 1)).toEqual({ ok: false, error: { code: "bezier_x_out_of_range" } });
        expect(easing.steppedEase(1, "jump-none")).toEqual({ ok: false, error: { code: "step_count_invalid" } });
        expect(easing.easing("does-not-exist")).toEqual({ ok: false, error: { code: "easing_name_unknown" } });
        expect(easing.easeOutExpo(1)).toBe(1);
        expect(easing.smoothStep3(0.5)).toBe(0.5);
        expect(Number.isFinite(easing.easeInBounce(0.5))).toBe(true);
        for (const name of ["easeOutExpo", "ease-out-expo", "smoothStep3", "smooth-step-3", "easeInBounce", "ease-in-bounce"]) {
            const resolved = easing.easing(name);
            expect(resolved.ok && Number.isFinite(resolved.value(0.35)), name).toBe(true);
        }
        expect(easing.steppedEase(2, "bogus" as easing.JumpPosition)).toEqual({
            ok: false,
            error: { code: "jump_position_invalid" },
        });
        const discontinuous = easing.linearEasing([
            { input: 0, output: 0 },
            { input: 0.5, output: 0.25 },
            { input: 0.5, output: 0.75 },
            { input: 1, output: 1 },
        ]);
        expect(discontinuous.ok && discontinuous.value(0.5)).toBe(0.75);
    });

    it("applies important-aware declaration cascade and retains located paths", () => {
        const one = css.parseCssValue("1");
        const two = css.parseCssValue("2");
        if (!one.ok || !two.ok) throw new Error("fixture parse");
        const selected = css.collectDeclarations([
            { name: "opacity", value: one.value, important: true },
            { name: "opacity", value: two.value, important: false },
        ]);
        expect(selected.get("opacity")?.value).toEqual(one.value);
        const sheet = css.parseStylesheet("@scope { @keyframes fade { entry 50% { opacity: 0; } } }");
        expect(sheet.ok).toBe(true);
        if (sheet.ok) expect(css.collectKeyframes(sheet.value)[0]?.path).toEqual([0, 0]);
    });

    it("preserves nested conditional ancestry, scope selectors, and style children", () => {
        const sheet = css.parseStylesheet(`
            @media (width > 30rem) {
                @scope (.bench, .lab) to (.limit) {
                    .sample {
                        color: red;
                        &:hover { opacity: .5 }
                    }
                }
            }
        `);
        expect(sheet.ok).toBe(true);
        if (!sheet.ok) return;
        expect(css.collectStyleRules(sheet.value).map((row) => row.path)).toEqual([
            [0, 0, 0],
            [0, 0, 0, 0],
        ]);
        const scope = (sheet.value[0] as { children?: readonly css.StylesheetItem[] }).children?.[0];
        expect(scope).toMatchObject({ kind: "scope", root: [".bench", ".lab"], limit: [".limit"] });
    });

    it("projects and serializes the complete selected timeline option tuple", () => {
        const sheet = css.parseStylesheet(`.sample {
            animation-timeline: scroll(root block), --hero;
            animation-range-start: entry 0%;
            animation-range-end: cover 100%;
            timeline-scope: --hero, --aside;
            animation-trigger: repeat scroll(root block) entry exit;
        }`);
        expect(sheet.ok).toBe(true);
        if (!sheet.ok) return;
        const rule = css.collectStyleRules(sheet.value)[0]!.rule;
        const options = css.collectTimelineOptions(rule.declarations);
        expect(options).toMatchObject({
            timeline: { kind: "scroll", scroller: "root", axis: "block" },
            timelines: [{ kind: "scroll" }, { kind: "name", name: "--hero" }],
            range: { start: { phase: "entry", offset: "0%" }, end: { phase: "cover", offset: "100%" } },
            timelineScope: { kind: "names", names: ["--hero", "--aside"] },
            trigger: { type: "repeat", timeline: { kind: "scroll" } },
        });
        expect(css.serializeTimelineOptions(options)).toEqual({
            "animation-timeline": "scroll(root block), --hero",
            "animation-range": "entry 0% cover 100%",
            "timeline-scope": "--hero, --aside",
            "animation-trigger": "repeat scroll(root block) entry exit",
        });
    });
});

describe("Value 4 exact runtime surfaces", () => {
    it("contains no extra, default, root-facade, or retired runtime name", () => {
        expect(Object.keys(color).sort()).toEqual([
            "a98Rgb", "convertColor", "displayP3", "hsl", "hsv", "hwb", "ictcp",
            "interpolateHue", "jzazbz", "kelvin", "lab", "lch", "linearSrgb",
            "mapColorToGamut", "mixColors", "oklab", "oklch", "prophotoRgb",
            "rec2020", "rgb", "safeAccentColor", "toRgba8", "xyz",
        ]);
        expect(Object.keys(css).sort()).toEqual([
            "coerceToSyntax", "collectAnimationOptions", "collectCustomFunctions",
            "collectDeclarations", "collectKeyframes", "collectPropertyDescriptors",
            "collectStyleRules", "collectTimelineOptions", "parseAnimationRange",
            "parseAnimationTimeline", "parseCssColor", "parseCssScalar", "parseCssValue",
            "parseCssValues", "parseKeyframeSelector", "parseStylesheet", "parseTimingFunction",
            "serializeCssColor", "serializeTimelineOptions",
        ]);
        expect(Object.keys(easing).sort()).toEqual([
            "CubicBezier", "bezierPresets", "easeInBounce", "easeInOutCirc",
            "easeInOutCubic", "easeInOutExpo", "easeInOutQuad", "easeInOutSine",
            "easeOutCubic", "easeOutExpo", "easing", "jumpTerms", "linear",
            "linearEasing", "smoothStep3", "steppedEase",
        ]);
        expect(Object.keys(math).sort()).toEqual([
            "clamp", "cubicBezier", "cubicBezierToString", "deCasteljau", "interpBezier",
            "lerp", "lerpArray", "logerp", "scale",
        ]);
        expect(Object.keys(transform).sort()).toEqual([
            "PathGeometry", "decomposeMatrix2D", "decomposeMatrix3D", "getPointAtLength",
            "getTotalLength", "interpolateDecomposed", "recomposeMatrix2D",
            "recomposeMatrix3D", "slerp",
        ]);
        expect(Object.keys(quantize).sort()).toEqual(["dominantColor", "quantizePixels"]);
        expect(Object.keys(value)).toEqual(["isLayoutTrackingUnit"]);
    });
});

describe("Value 4 value and quantize leaves", () => {
    it("classifies only layout-tracking units", () => {
        const tracking = [
            "%", "var", "calc",
            "vh", "vw", "vmin", "vmax", "vi", "vb",
            "svh", "svw", "svmin", "svmax", "svi", "svb",
            "lvh", "lvw", "lvmin", "lvmax", "lvi", "lvb",
            "dvh", "dvw", "dvmin", "dvmax", "dvi", "dvb",
            "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax",
        ];
        expect(tracking.every(isLayoutTrackingUnit)).toBe(true);
        expect(tracking.every((unit) => isLayoutTrackingUnit(unit.toUpperCase())))
            .toBe(true);
        expect(["", "px", "em", "rem", "deg", "turn", "ms", "s", "fr", "number"]
            .some(isLayoutTrackingUnit)).toBe(false);
    });

    it("returns typed quantize failures and final OKLCH objects", () => {
        expect(quantizePixels(new Uint8ClampedArray(), 0, 0)).toEqual({ ok: false, error: { code: "quantize_invalid_dimensions" } });
        const pixels = new Uint8ClampedArray([255, 0, 0, 255, 255, 0, 0, 255]);
        const palette = quantizePixels(pixels, 2, 1, { k: 1 });
        expect(palette.ok && palette.value[0]?.color.space).toBe("oklch");
        const dominant = dominantColor(pixels, 2, 1);
        expect(dominant.ok && dominant.value?.population).toBeGreaterThan(0);
    });
});
