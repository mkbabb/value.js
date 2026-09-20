/**
 * Packed-surface verification — the PACKED TARBALL is the oracle, never the
 * worktree `dist/` (W9.md §Format And Lint Cadence, PT-08).
 *
 * Three halves, in order:
 *
 *   1. SHAPE      — the installed `exports` map is exactly the seven subpaths.
 *   2. TYPES      — a strict consumer compiles against the installed `.d.ts`.
 *   3. BEHAVIOUR  — every runtime export of every subpath is INVOKED once with
 *                   representative valid arguments and must produce a usable
 *                   value (X.W9.e · G20).
 *
 * Before X.W9.e this script checked key PRESENCE only and then printed a
 * hardcoded `strictTypes: 62` that no check produced. A runtime export that
 * imported but threw on invocation passed it. Half 3 is the cure: `SMOKE`
 * carries one case per published name, the driver refuses to run if the two
 * sets disagree in either direction, and every number this script prints is
 * read from a check that just ran.
 *
 * ADDING A RUNTIME EXPORT therefore costs two edits here — its name in
 * `expected`, and its case in `SMOKE`. That is the ratchet, not an oversight:
 * an unexercised public entry is exactly what this file exists to refuse.
 */
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repository = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const tarball = resolve(process.argv[2] ?? "");
if (!process.argv[2]) throw new Error("usage: verify-packed-surface.mjs <tarball>");

const workspace = await mkdtemp(join(tmpdir(), "value-v4-consumer-"));
const expected = {
    // The 4.1.0 cut added five runtime names here (SCI-1's `sampleColorRamp`,
    // `mixColorsInto`, `toRgba8Into`, plus `toHex` and the `isAnyColor` guard)
    // and did not pay this file's two-edit ratchet, so the shipped tarball
    // failed its own check at the runtime export-list assertion (G20).
    color: [
        "a98Rgb", "convertColor", "displayP3", "hsl", "hsv", "hwb",
        "ictcp", "interpolateHue", "isAnyColor", "jzazbz", "kelvin", "lab", "lch",
        "linearSrgb", "mapColorToGamut", "mixColors", "mixColorsInto", "oklab", "oklch",
        "prophotoRgb", "rec2020", "rgb", "safeAccentColor", "sampleColorRamp",
        "toHex", "toRgba8", "toRgba8Into", "xyz",
    ],
    value: ["isLayoutTrackingUnit"],
    css: [
        "coerceToSyntax", "collectAnimationOptions", "collectCustomFunctions",
        "collectDeclarations", "collectKeyframes", "collectPropertyDescriptors",
        "collectStyleRules", "collectTimelineOptions", "parseAnimationRange",
        "parseAnimationTimeline", "parseCssColor", "parseCssScalar", "parseCssValue",
        "parseCssValues", "parseKeyframeSelector", "parseStylesheet",
        "parseTimingFunction", "serializeCssColor", "serializeCssValue",
        "serializeTimelineOptions",
    ],
    easing: [
        "CubicBezier", "bezierPresets", "easeInBounce", "easeInOutCirc",
        "easeInOutCubic", "easeInOutExpo", "easeInOutQuad", "easeInOutSine",
        "easeOutCubic", "easeOutExpo", "easing", "easingNames", "jumpTerms",
        "linear", "linearEasing", "smoothStep3", "steppedEase",
    ],
    math: [
        "clamp", "cubicBezier", "cubicBezierToString", "deCasteljau",
        "interpBezier", "lerp", "lerpArray", "logerp", "scale",
    ],
    // X.W9.b retired the matrix family (CC-094 · G27) with its module: no shim,
    // no forwarding export. `PathGeometry` and the two free functions are the
    // measured keyframes MorphSVG seam and stay.
    transform: ["PathGeometry", "getPointAtLength", "getTotalLength"],
    quantize: ["dominantColor", "quantizePixels"],
};

/**
 * The behavioural half, as source. It runs INSIDE the consumer workspace, where
 * `@mkbabb/value.js/*` resolves to the INSTALLED TARBALL — so every case below
 * exercises the artifact a consumer would receive, not this repository's tree.
 *
 * Each case is `() => value`: it must not throw and must not return `undefined`
 * or `null`. Arguments are representative and valid, so a throw here is a real
 * totality defect and not an argument error. Cases that can cheaply assert a
 * measured, non-vacuous result do so inline.
 */
const SMOKE_SOURCE = `
const color = await import("@mkbabb/value.js/color");
const value = await import("@mkbabb/value.js/value");
const css = await import("@mkbabb/value.js/css");
const easing = await import("@mkbabb/value.js/easing");
const math = await import("@mkbabb/value.js/math");
const transform = await import("@mkbabb/value.js/transform");
const quantize = await import("@mkbabb/value.js/quantize");

export const MODULES = { color, value, css, easing, math, transform, quantize };

/** Unwraps the library's own Result / ParseResult; a failure is a smoke failure. */
const unwrap = (result) => {
    if (!result.ok) throw new Error("returned a failure: " + JSON.stringify(result));
    return result.value;
};
const expect = (condition, message) => {
    if (!condition) throw new Error(message);
    return condition;
};

const RGB = unwrap(color.rgb(12, 34, 56));
const RGB_WARM = unwrap(color.rgb(200, 100, 50));
const WHITE = unwrap(color.rgb(255, 255, 255));
const VIVID = unwrap(color.oklch(0.65, 0.45, 310));
const ACCENT = unwrap(color.oklch(0.94, 0.22, 80));

const SHEET_SOURCE = "@function --double(--x){result: calc(var(--x) * 2)}"
    + "@keyframes spin{from{opacity:0}to{opacity:1}}"
    + "@property --p{syntax:'<length>';inherits:false;initial-value:0px}"
    + ".b{color:red;animation:spin 1s linear;animation-timeline:scroll(root block);"
    + "animation-range:entry 0% exit 100%}";
const SHEET = unwrap(css.parseStylesheet(SHEET_SOURCE));
const DECLARATIONS = css.collectStyleRules(SHEET)[0].rule.declarations;
const PIXELS = new Uint8ClampedArray(4 * 4 * 4);
for (let i = 0; i < PIXELS.length; i += 4) {
    PIXELS[i] = 200 - i;
    PIXELS[i + 1] = 30 + i;
    PIXELS[i + 2] = 60;
    PIXELS[i + 3] = 255;
}
const PATH = "M 0 0 L 10 0";

export const SMOKE = {
    color: {
        a98Rgb: () => unwrap(color.a98Rgb(0.1, 0.2, 0.3)).channels,
        convertColor: () => unwrap(color.convertColor(RGB, "oklch")).channels,
        displayP3: () => unwrap(color.displayP3(0.1, 0.2, 0.3)).channels,
        hsl: () => unwrap(color.hsl(210, 0.5, 0.4)).channels,
        hsv: () => unwrap(color.hsv(210, 0.5, 0.4)).channels,
        hwb: () => unwrap(color.hwb(210, 0.2, 0.3)).channels,
        ictcp: () => unwrap(color.ictcp(0.4, 0, 0)).channels,
        interpolateHue: () => expect(unwrap(color.interpolateHue(350, 10, 0.5, "shorter")) === 0, "shorter hue route missed 0"),
        isAnyColor: () => expect(color.isAnyColor(RGB) && !color.isAnyColor("rgb(12 34 56)"), "isAnyColor does not discriminate a Color from a string"),
        jzazbz: () => unwrap(color.jzazbz(0.1, 0, 0)).channels,
        kelvin: () => unwrap(color.kelvin(6500)).channels,
        lab: () => unwrap(color.lab(50, 20, -30)).channels,
        lch: () => unwrap(color.lch(50, 30, 120)).channels,
        linearSrgb: () => unwrap(color.linearSrgb(0.1, 0.2, 0.3)).channels,
        mapColorToGamut: () => unwrap(color.mapColorToGamut(VIVID, "srgb")).channels,
        mixColors: () => unwrap(color.mixColors(RGB, RGB_WARM, 0.5, { space: "rgb" })).channels,
        // SCI-1's two out-param writers return a void Result, so the smoke case
        // reads the BUFFER they wrote, never the unwrapped void value.
        mixColorsInto: () => {
            const out = new Float64Array(4);
            unwrap(color.mixColorsInto(RGB, RGB_WARM, 0.5, { space: "rgb" }, out));
            return expect(out[0] === 106 && out[3] === 1, "mixColorsInto did not write the rgb midpoint + alpha");
        },
        oklab: () => unwrap(color.oklab(0.6, 0.05, 0.02)).channels,
        oklch: () => unwrap(color.oklch(0.6, 0.05, 40)).channels,
        prophotoRgb: () => unwrap(color.prophotoRgb(0.1, 0.2, 0.3)).channels,
        rec2020: () => unwrap(color.rec2020(0.1, 0.2, 0.3)).channels,
        rgb: () => unwrap(color.rgb(12, 34, 56)).channels,
        safeAccentColor: () => unwrap(color.safeAccentColor(ACCENT, WHITE, { minimumRatio: 4.5, gamut: "srgb" })).channels,
        sampleColorRamp: () => expect(unwrap(color.sampleColorRamp(RGB, RGB_WARM, 5, { space: "oklab" })).length === 5, "sampleColorRamp returned the wrong stop count"),
        toHex: () => expect(unwrap(color.toHex(RGB, { gamut: "clip" })) === "#0c2238", "toHex changed its spelling"),
        toRgba8: () => expect(unwrap(color.toRgba8(RGB, { gamut: "clip" })).length === 4, "toRgba8 did not return four bytes"),
        toRgba8Into: () => {
            const out = new Uint8ClampedArray(4);
            unwrap(color.toRgba8Into(RGB, out, 0, { gamut: "clip" }));
            return expect(out[0] === 12 && out[1] === 34 && out[2] === 56 && out[3] === 255, "toRgba8Into did not write the ImageData quad");
        },
        xyz: () => unwrap(color.xyz(0.2, 0.3, 0.4)).channels,
    },
    value: {
        isLayoutTrackingUnit: () => expect(value.isLayoutTrackingUnit("%") !== value.isLayoutTrackingUnit("px"), "isLayoutTrackingUnit does not discriminate % from px"),
    },
    css: {
        coerceToSyntax: () => unwrap(css.coerceToSyntax("10px", "<length>")),
        collectAnimationOptions: () => expect(css.collectAnimationOptions(DECLARATIONS).length === 1, "collectAnimationOptions lost the animation shorthand"),
        collectCustomFunctions: () => expect(css.collectCustomFunctions(SHEET).length === 1, "collectCustomFunctions lost @function"),
        collectDeclarations: () => expect(css.collectDeclarations(DECLARATIONS).size === 4, "collectDeclarations lost a declaration"),
        collectKeyframes: () => expect(css.collectKeyframes(SHEET).length === 1, "collectKeyframes lost @keyframes"),
        collectPropertyDescriptors: () => expect(css.collectPropertyDescriptors(SHEET).length === 1, "collectPropertyDescriptors lost @property"),
        collectStyleRules: () => expect(css.collectStyleRules(SHEET).length === 1, "collectStyleRules lost the style rule"),
        collectTimelineOptions: () => css.collectTimelineOptions(DECLARATIONS).timeline,
        parseAnimationRange: () => unwrap(css.parseAnimationRange("entry 0% exit 100%")),
        parseAnimationTimeline: () => unwrap(css.parseAnimationTimeline("scroll(root block)")),
        parseCssColor: () => unwrap(css.parseCssColor("red")),
        parseCssScalar: () => unwrap(css.parseCssScalar("1px")),
        parseCssValue: () => unwrap(css.parseCssValue("1px")),
        parseCssValues: () => unwrap(css.parseCssValues("1px 2px")),
        parseKeyframeSelector: () => unwrap(css.parseKeyframeSelector("from")),
        parseStylesheet: () => expect(SHEET.length === 4, "parseStylesheet lost a top-level rule"),
        parseTimingFunction: () => unwrap(css.parseTimingFunction("ease")),
        serializeCssColor: () => expect(unwrap(css.serializeCssColor(unwrap(css.parseCssColor("red")))) === "rgb(255 0 0)", "serializeCssColor round text changed"),
        serializeCssValue: () => expect(unwrap(css.serializeCssValue(unwrap(css.parseCssValue("1px")))) === "1px", "serializeCssValue round text changed"),
        serializeTimelineOptions: () => css.serializeTimelineOptions(css.collectTimelineOptions(DECLARATIONS))["animation-timeline"],
    },
    easing: {
        CubicBezier: () => unwrap(easing.CubicBezier(0.25, 0.1, 0.25, 1))(0.5),
        bezierPresets: () => expect(easing.bezierPresets.ease.length === 4, "bezierPresets.ease is not a four-tuple"),
        easeInBounce: () => easing.easeInBounce(0.5),
        easeInOutCirc: () => easing.easeInOutCirc(0.5),
        easeInOutCubic: () => easing.easeInOutCubic(0.5),
        easeInOutExpo: () => easing.easeInOutExpo(0.5),
        easeInOutQuad: () => easing.easeInOutQuad(0.5),
        easeInOutSine: () => easing.easeInOutSine(0.5),
        easeOutCubic: () => easing.easeOutCubic(0.5),
        easeOutExpo: () => easing.easeOutExpo(0.5),
        easing: () => unwrap(easing.easing("ease"))(0.5),
        easingNames: () => expect(easing.easingNames().length === 40, "easingNames no longer publishes the 40-name catalog"),
        jumpTerms: () => expect(easing.jumpTerms.includes("jump-end"), "jumpTerms lost jump-end"),
        linear: () => expect(easing.linear(0.5) === 0.5, "linear is not the identity"),
        linearEasing: () => unwrap(easing.linearEasing([{ output: 0, input: 0 }, { output: 1, input: 1 }]))(0.5),
        smoothStep3: () => easing.smoothStep3(0.5),
        steppedEase: () => unwrap(easing.steppedEase(4, "jump-end"))(0.5),
    },
    math: {
        clamp: () => expect(math.clamp(5, 0, 3) === 3, "clamp did not clamp"),
        cubicBezier: () => math.cubicBezier(0.5, 0.25, 0.1, 0.25, 1),
        cubicBezierToString: () => expect(math.cubicBezierToString(0.25, 0.1, 0.25, 1).startsWith("cubic-bezier"), "cubicBezierToString lost its function name"),
        deCasteljau: () => expect(Number.isFinite(math.deCasteljau(0.5, [0, 1, 2, 3])), "deCasteljau is not finite"),
        interpBezier: () => math.interpBezier(0.5, [[0, 0], [1, 1]]),
        lerp: () => expect(math.lerp(0, 10, 0.5) === 5, "lerp missed the midpoint"),
        lerpArray: () => math.lerpArray(new Float64Array([0, 0, 0]), new Float64Array([1, 2, 3]), 0.5, new Float64Array(3)),
        logerp: () => expect(Number.isFinite(math.logerp(1, 100, 0.5)), "logerp is not finite"),
        scale: () => expect(math.scale(5, 0, 10, 0, 100) === 50, "scale missed the midpoint"),
    },
    transform: {
        PathGeometry: () => expect(new transform.PathGeometry(PATH).getTotalLength() === 10, "PathGeometry mismeasured a 10-unit line"),
        getPointAtLength: () => transform.getPointAtLength(PATH, 5),
        getTotalLength: () => expect(transform.getTotalLength(PATH) === 10, "getTotalLength mismeasured a 10-unit line"),
    },
    quantize: {
        dominantColor: () => unwrap(quantize.dominantColor(PIXELS, 4, 4)).color.channels,
        quantizePixels: () => expect(unwrap(quantize.quantizePixels(PIXELS, 4, 4, { maxColors: 4 })).length > 0, "quantizePixels returned no colors"),
    },
};
`;

const run = (command, args) => {
    const result = spawnSync(command, args, {
        cwd: workspace,
        encoding: "utf8",
        env: {
            ...process.env,
            NPM_CONFIG_CACHE: join(workspace, ".npm-cache"),
        },
        stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.status !== 0) {
        throw new Error([
            `${command} ${args.join(" ")} failed`,
            result.stdout,
            result.stderr,
        ].filter(Boolean).join("\n"));
    }
    return result.stdout.trim();
};

try {
    await writeFile(join(workspace, "package.json"), '{"type":"module"}\n');
    run("npm", [
        "install",
        "--ignore-scripts",
        "--no-audit",
        "--no-fund",
        "--package-lock=false",
        tarball,
    ]);
    const installedPackage = JSON.parse(await readFile(join(
        workspace,
        "node_modules/@mkbabb/value.js/package.json",
    )));
    const expectedExportMap = Object.fromEntries(Object.keys(expected).map((entry) => [
        `./${entry}`,
        {
            types: `./dist/subpaths/${entry}.d.ts`,
            import: `./dist/subpaths/${entry}.js`,
        },
    ]));
    if (JSON.stringify(installedPackage.exports) !== JSON.stringify(expectedExportMap)) {
        throw new Error(`unexpected export map: ${JSON.stringify(installedPackage.exports)}`);
    }
    await writeFile(
        join(workspace, "consumer.ts"),
        await readFile(join(repository, "fixtures/public-types/value-v4.ts")),
    );
    await writeFile(join(workspace, "tsconfig.json"), JSON.stringify({
        compilerOptions: {
            module: "NodeNext",
            moduleResolution: "NodeNext",
            noEmit: true,
            skipLibCheck: false,
            strict: true,
            target: "ES2022",
        },
        files: ["consumer.ts"],
    }, null, 4));
    run(process.execPath, [
        join(repository, "node_modules/typescript/bin/tsc"),
        "-p",
        join(workspace, "tsconfig.json"),
    ]);

    await writeFile(join(workspace, "smoke.mjs"), SMOKE_SOURCE);
    await writeFile(join(workspace, "runtime.mjs"), `
import { MODULES, SMOKE } from "./smoke.mjs";

const entries = ${JSON.stringify(expected)};
const runtime = {};
const smoke = {};
for (const [entry, expectedNames] of Object.entries(entries)) {
    const names = Object.keys(MODULES[entry]).sort();
    if (JSON.stringify(names) !== JSON.stringify(expectedNames)) {
        throw new Error(\`/\${entry} exports \${JSON.stringify(names)}\`);
    }
    runtime[entry] = names.length;

    // The behavioural half. The two sets must agree in BOTH directions, so a
    // new export cannot arrive unexercised and a stale case cannot linger.
    const cases = SMOKE[entry] ?? {};
    const missing = names.filter((name) => !(name in cases));
    if (missing.length > 0) {
        throw new Error(\`/\${entry} has no smoke case for: \${missing.join(", ")}\`);
    }
    const stale = Object.keys(cases).filter((name) => !names.includes(name));
    if (stale.length > 0) {
        throw new Error(\`/\${entry} smoke names absent exports: \${stale.join(", ")}\`);
    }
    for (const name of names) {
        let produced;
        try {
            produced = cases[name]();
        } catch (error) {
            throw new Error(\`/\${entry} \${name} threw on a valid invocation: \${error?.message ?? error}\`);
        }
        if (produced === undefined || produced === null) {
            throw new Error(\`/\${entry} \${name} produced \${String(produced)} on a valid invocation\`);
        }
    }
    smoke[entry] = names.length;
}
for (const forbidden of [
    "@mkbabb/value.js",
    "@mkbabb/value.js/parsing",
    "@mkbabb/value.js/units",
]) {
    try {
        await import(forbidden);
        throw new Error(\`\${forbidden} unexpectedly resolves\`);
    } catch (error) {
        if (error?.code !== "ERR_PACKAGE_PATH_NOT_EXPORTED") {
            throw error;
        }
    }
}
process.stdout.write(JSON.stringify({ runtime, smoke }) + "\\n");
`);
    const { runtime, smoke } = JSON.parse(run(process.execPath, [join(workspace, "runtime.mjs")]));
    const total = (counts) => Object.values(counts).reduce((sum, count) => sum + count, 0);
    process.stdout.write(`${JSON.stringify({
        runtime,
        smoke,
        runtimeExports: total(runtime),
        smokeInvocations: total(smoke),
    })}\n`);
} finally {
    await rm(workspace, { recursive: true, force: true });
}
