// SERVED MODEL: claude-opus-5[1m]
//
// X.W6.f · X:CSS-1 gate **f5** — ONE GRAMMAR PER ROW; CSS ROWS ROUND-TRIP THE
// SHIPPED PARSER.
//
//   node docs/tranches/X/gates/gate-specimen-grammar.mjs
//
// RED at open (W6.md:258): `data-specimen-form` greps to **0** — nothing in the
// tree declared which grammar a row spoke — while four rows (`hsv`, `kelvin`,
// `ictcp`, `jzazbz`) emitted a `space · a · b · c` pseudo-syntax that returns
// `ok:false` from `parseCssColor`, sitting in the SAME slot as thirteen rows of
// real CSS with nothing telling a reader, or a copy-paste, the two apart.
//
// WHAT IT CHECKS:
//
//   1 · THE FORM IS DECLARED AND TOTAL. `formatSpecimen` answers for all 18
//       members of `DisplayColorSpace` with a `form` of `css` or `channels`, and
//       a space's form is STABLE across the whole colour domain — the grammar is
//       a property of the space, not of the value.
//   2 · THE DECLARATION IS TRUE, BOTH WAYS. Every `css` row parses with the
//       shipped `parseCssColor`; every `channels` row does NOT. A row that
//       claims CSS and is not, and a row that claims non-CSS and would have
//       parsed, both red — which is what stops the discriminant from becoming
//       decoration.
//   3 · THE DIGIT POLICY IS BOUNDED, AND THE BOX IS SIZED FROM IT. No specimen
//       over the picker's declared colour domain exceeds `SPECIMEN_CHAR_BUDGET`,
//       the same constant `ColorSpaceSelector.vue` sizes the caption box with.
//       The sweep is the bound's derivation, re-run, not a figure carried.
//   4 · THE POLICY IS VISIBLE IN THE OUTPUT. No printed numeral carries more
//       significant digits than the policy states — the leg that catches a float
//       artefact reaching the caption (the measured `-16537.899999999998%`
//       class) rather than trusting the rounding call alone.
//   5 · NOTHING PROJECTS. `mapColorToGamut` appears nowhere in the specimen
//       path's own source: the static half of the f6(ii) anti-projection lock,
//       so a fold-in is caught at the bytes as well as in the browser.
//   6 · THE ROW CARRIES ITS DECLARATION TO THE DOM. `ColorSpaceSelector.vue`
//       binds `data-specimen-form` and `data-out-of-gamut` from the specimen,
//       and holds no second formatter (no `toFixed` of its own).
//
// HOW IT LOADS TYPESCRIPT: see the header of `gate-catalog-totality.mjs` — the
// module is bundled with the toolchain's esbuild and aliased to this repo's own
// `dist/`, so the gate measures the module the app runs.

import * as esbuild from "esbuild";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const SUBPATHS = ["color", "css", "math", "value", "easing", "transform", "quantize"];
const ALIAS = Object.fromEntries(
    SUBPATHS.map((name) => [
        `@mkbabb/value.js/${name}`,
        path.join(ROOT, "dist/subpaths", `${name}.js`),
    ]),
);

async function loadModule(relative) {
    const built = await esbuild.build({
        entryPoints: [path.join(ROOT, relative)],
        bundle: true,
        format: "esm",
        write: false,
        platform: "node",
        alias: ALIAS,
        absWorkingDir: ROOT,
        loader: { ".md": "text" },
    });
    const code = built.outputFiles[0].text;
    return import(
        `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
    );
}

const failures = [];
const fail = (message) => failures.push(message);

const specimen = await loadModule("demo/color-session/specimen-format.ts");
const catalog = await loadModule("demo/color-session/space-catalog.ts");
const color = await import(path.join(ROOT, "dist/subpaths/color.js"));
const css = await import(path.join(ROOT, "dist/subpaths/css.js"));

const { formatSpecimen, SPECIMEN_CHAR_BUDGET, SPECIMEN_SIGNIFICANT_DIGITS } = specimen;
const spaces = Object.keys(catalog.SPACE_CATALOG);

// The picker's own declared colour domain — Lab's channel extents, the alpha
// unit interval — swept at the corners, the midpoints and a few odd values so a
// bound derived here is a bound over what the product can hold.
const axis = (lo, hi, count) =>
    Array.from({ length: count }, (_, index) => lo + ((hi - lo) * index) / (count - 1));
const ALPHAS = [0, 0.127, 0.5, 0.827, 1];

const forms = new Map();
const longest = new Map();
let worst = { length: 0 };
let samples = 0;

const significantDigitsOf = (numeral) => {
    const digits = numeral.replace("-", "").replace(".", "").replace(/^0+/, "");
    return digits.replace(/0+$/, "").length || (digits.length ? 1 : 0);
};

for (const lightness of axis(0, 100, 9)) {
    for (const a of axis(-125, 125, 9)) {
        for (const b of axis(-125, 125, 9)) {
            for (const alpha of ALPHAS) {
                const built = color.lab(lightness, a, b, alpha);
                if (!built.ok) continue;
                for (const space of spaces) {
                    let result;
                    try {
                        result = formatSpecimen(built.value, space);
                    } catch (error) {
                        fail(
                            `${space} threw on lab(${lightness} ${a} ${b} / ${alpha}): ${error.message}`,
                        );
                        continue;
                    }
                    samples += 1;

                    if (typeof result.text !== "string" || result.text.trim() === "") {
                        fail(`${space}: empty specimen`);
                        continue;
                    }
                    if (typeof result.outOfGamut !== "boolean") {
                        fail(`${space}: outOfGamut is not a decision`);
                    }

                    // 1 · one form per space, stable over the domain
                    if (!["css", "channels"].includes(result.form)) {
                        fail(
                            `${space}: form "${result.form}" is outside the declared grammar`,
                        );
                    }
                    const known = forms.get(space);
                    if (known === undefined) forms.set(space, result.form);
                    else if (known !== result.form) {
                        fail(
                            `${space}: form flips between "${known}" and "${result.form}"`,
                        );
                    }

                    // 2 · the declaration is true, both ways
                    const parsed = css.parseCssColor(result.text);
                    if (result.form === "css" && !parsed.ok) {
                        fail(
                            `${space} declares CSS but does not parse: ${result.text}`,
                        );
                    }
                    if (result.form === "channels" && parsed.ok) {
                        fail(
                            `${space} declares non-CSS but parses as CSS: ${result.text}`,
                        );
                    }

                    // 3 · the budget
                    if (result.text.length > (longest.get(space)?.length ?? 0)) {
                        longest.set(space, result.text);
                    }
                    if (result.text.length > worst.length) {
                        worst = {
                            length: result.text.length,
                            space,
                            text: result.text,
                        };
                    }
                    if (result.text.length > SPECIMEN_CHAR_BUDGET) {
                        fail(
                            `${space}: ${result.text.length} characters over a budget of ` +
                                `${SPECIMEN_CHAR_BUDGET} — ${result.text}`,
                        );
                    }

                    // 4 · the policy is visible in the output. Hex is exempt by
                    //     construction: `#rrggbbaa` is a fixed-width 8-bit
                    //     encoding, not a numeral the digit policy rounds.
                    const numerals = result.text.startsWith("#")
                        ? []
                        : (result.text.match(/-?\d+\.?\d*/g) ?? []);
                    for (const numeral of numerals) {
                        if (
                            significantDigitsOf(numeral) >
                            SPECIMEN_SIGNIFICANT_DIGITS + 1
                        ) {
                            fail(
                                `${space}: "${numeral}" carries more digits than the policy ` +
                                    `states (${SPECIMEN_SIGNIFICANT_DIGITS}) — ${result.text}`,
                            );
                        }
                    }
                }
            }
        }
    }
}

const missingForms = spaces.filter((space) => !forms.has(space));
if (missingForms.length) fail(`no specimen produced for: ${missingForms.join(", ")}`);

// 5 · nothing projects — the static half of the anti-projection lock
const specimenSource = readFileSync(
    path.join(ROOT, "demo/color-session/specimen-format.ts"),
    "utf8",
);
if (/\bmapColorToGamut\b/.test(specimenSource.replace(/`mapColorToGamut`/g, ""))) {
    fail("mapColorToGamut is reachable from the specimen formatter — f6(ii) is RED");
}

// 6 · the declaration reaches the DOM, and no second formatter survives
const componentSource = readFileSync(
    path.join(ROOT, "demo/color-session/ColorSpaceSelector.vue"),
    "utf8",
);
for (const attribute of ["data-specimen-form", "data-out-of-gamut"]) {
    if (!componentSource.includes(attribute))
        fail(`ColorSpaceSelector does not bind ${attribute}`);
}
if (!componentSource.includes("formatSpecimen")) {
    fail("ColorSpaceSelector does not call the one formatter");
}
if (/\.toFixed\(/.test(componentSource)) {
    fail("ColorSpaceSelector carries a second digit policy (.toFixed)");
}

const green = failures.length === 0;
console.log(
    [
        "GATE f5 (specimen grammar) — " + (green ? "GREEN" : "RED"),
        `  ${samples} specimens over ${spaces.length} spaces; ` +
            `css=${[...forms.values()].filter((form) => form === "css").length} ` +
            `channels=${[...forms.values()].filter((form) => form === "channels").length}`,
        `  longest ${worst.length}/${SPECIMEN_CHAR_BUDGET} chars — ${worst.space}: ${worst.text}`,
        ...spaces.map(
            (space) =>
                `  ${space.padEnd(13)} ${String(forms.get(space)).padEnd(9)} ` +
                `${String(longest.get(space)?.length ?? 0).padStart(2)}ch  ` +
                `${longest.get(space) ?? ""}`,
        ),
        ...failures.map((message) => `  FAIL ${message}`),
    ].join("\n"),
);

process.exit(green ? 0 : 1);
