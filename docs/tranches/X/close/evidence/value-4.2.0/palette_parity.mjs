/**
 * value.js 4.2.0 — the checkCategoricalPalette parity reference (SPEC §7 H).
 *
 * Feeds the same hexes to the dataviz skill's borrowed `validate_palette.js` (the
 * script Gregg validated with) and freezes ITS per-colour and per-pair figures in
 * `test/fixtures/cvd/palette-parity.json`; `test/palette-check.test.ts` holds value.js
 * to them. The validator exports only its verdicts, so this appends an export of its
 * own internal `oklch`/`contrast`/`deltaE` to a copy of its text and imports that copy:
 * the numbers are the validator's code, not a re-implementation. Not run in CI:
 *
 *     node test/support/palette_parity.mjs <path/to/validate_palette.js> \
 *         test/fixtures/cvd/palette-parity.json
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [validatorPath, outPath] = process.argv.slice(2);
if (!validatorPath || !outPath) throw new Error("usage: palette_parity.mjs <validate_palette.js> <out.json>");

const source = readFileSync(validatorPath, "utf8");
const work = join(homedir(), ".dev-logs", "value-4.2.0");
mkdirSync(work, { recursive: true });
const copy = join(work, "validate_palette.parity.mjs");
writeFileSync(copy, `${source}\nexport { oklch as __oklch, deltaE as __deltaE };\n`);
const validator = await import(pathToFileURL(copy).href);

const PALETTES = {
    // gregg/src/style.css :root and .dark `--src-*`, stacking order (8 per scheme).
    "gregg-light": {
        ground: "#fcfcfb", scheme: "light",
        colors: ["#982A6B", "#338C00", "#1A5FA0", "#BC0007", "#008E84", "#A88F42", "#7C4D00", "#D65A04"],
    },
    "gregg-dark": {
        ground: "#1a1a19", scheme: "dark",
        colors: ["#C0327A", "#50A95C", "#5796DB", "#EB3C3A", "#069892", "#A79541", "#A45448", "#E47000"],
    },
    // ECharts 5 default `color` option, on white.
    "echarts-light": {
        ground: "#ffffff", scheme: "light",
        colors: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
    },
};

const out = {
    header: {
        generator: "test/support/palette_parity.mjs",
        command: "node test/support/palette_parity.mjs <dataviz skill>/scripts/validate_palette.js test/fixtures/cvd/palette-parity.json",
        validatorSha256: createHash("sha256").update(source).digest("hex"),
        node: process.version,
        units: "deltaE values are the validator's x100 OKLab figures; contrast is its WCAG ratio",
    },
    palettes: {},
};
for (const [name, { ground, scheme, colors }] of Object.entries(PALETTES)) {
    const perColor = colors.map((hex) => {
        const [L, C] = validator.__oklch(hex);
        return { hex, L, C, contrast: validator.contrast(hex, ground) };
    });
    const pairs = [];
    for (let i = 0; i < colors.length; i++) {
        for (let j = i + 1; j < colors.length; j++) {
            pairs.push({
                pair: [i, j],
                normal: validator.__deltaE(colors[i], colors[j]),
                protan: validator.__deltaE(colors[i], colors[j], "protan"),
                deutan: validator.__deltaE(colors[i], colors[j], "deutan"),
                tritan: validator.__deltaE(colors[i], colors[j], "tritan"),
            });
        }
    }
    const adjacent = validator.validate(colors, { mode: scheme, surface: ground, pairs: "adjacent" });
    const all = validator.validate(colors, { mode: scheme, surface: ground, pairs: "all" });
    out.palettes[name] = {
        ground, scheme, colors, perColor, pairs,
        validator: { adjacent: { ok: adjacent.ok, report: adjacent.report }, all: { ok: all.ok, report: all.report } },
    };
}
writeFileSync(outPath, `${JSON.stringify(out, null, 1)}\n`);
for (const [name, p] of Object.entries(out.palettes)) {
    console.log(name, "adjacent ok", p.validator.adjacent.ok, "all ok", p.validator.all.ok);
    for (const row of p.validator.adjacent.report) console.log("  ", JSON.stringify(row));
}
