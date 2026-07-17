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
    color: [
        "a98Rgb", "convertColor", "displayP3", "hsl", "hsv", "hwb",
        "ictcp", "interpolateHue", "jzazbz", "kelvin", "lab", "lch",
        "linearSrgb", "mapColorToGamut", "mixColors", "oklab", "oklch",
        "prophotoRgb", "rec2020", "rgb", "safeAccentColor", "toRgba8", "xyz",
    ],
    value: ["isLayoutTrackingUnit"],
    css: [
        "coerceToSyntax", "collectAnimationOptions", "collectCustomFunctions",
        "collectDeclarations", "collectKeyframes", "collectPropertyDescriptors",
        "collectStyleRules", "collectTimelineOptions", "parseAnimationRange",
        "parseAnimationTimeline", "parseCssColor", "parseCssScalar", "parseCssValue",
        "parseCssValues", "parseKeyframeSelector", "parseStylesheet",
        "parseTimingFunction", "serializeCssColor", "serializeTimelineOptions",
    ],
    easing: [
        "CubicBezier", "bezierPresets", "easeInBounce", "easeInOutCirc",
        "easeInOutCubic", "easeInOutExpo", "easeInOutQuad", "easeInOutSine",
        "easeOutCubic", "easeOutExpo", "easing", "jumpTerms", "linear",
        "linearEasing", "smoothStep3", "steppedEase",
    ],
    math: [
        "clamp", "cubicBezier", "cubicBezierToString", "deCasteljau",
        "interpBezier", "lerp", "lerpArray", "logerp", "scale",
    ],
    transform: [
        "PathGeometry", "decomposeMatrix2D", "decomposeMatrix3D",
        "getPointAtLength", "getTotalLength", "interpolateDecomposed",
        "recomposeMatrix2D", "recomposeMatrix3D", "slerp",
    ],
    quantize: ["dominantColor", "quantizePixels"],
};
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

    await writeFile(join(workspace, "runtime.mjs"), `
const entries = ${JSON.stringify(expected)};
const runtime = {};
for (const [entry, expectedNames] of Object.entries(entries)) {
    const names = Object.keys(await import(\`@mkbabb/value.js/\${entry}\`)).sort();
    if (JSON.stringify(names) !== JSON.stringify(expectedNames)) {
        throw new Error(\`/\${entry} exports \${JSON.stringify(names)}\`);
    }
    runtime[entry] = names.length;
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
process.stdout.write(JSON.stringify({ runtime }) + "\\n");
`);
    const { runtime } = JSON.parse(run(process.execPath, [join(workspace, "runtime.mjs")]));
    process.stdout.write(`${JSON.stringify({ runtime, strictTypes: 62 })}\n`);
} finally {
    await rm(workspace, { recursive: true, force: true });
}
