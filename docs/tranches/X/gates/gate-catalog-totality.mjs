// SERVED MODEL: claude-opus-5[1m]
//
// X.W6.f · X:CSS-1 gate **f1** — CATALOG TOTALITY.
//
//   node docs/tranches/X/gates/gate-catalog-totality.mjs
//
// RED at open (W6.md:254, adjudicated ColorSpaceSelector.md L-1): **offered=18,
// info=13, docs=11**, and the failing input is the string `display-p3` — a space
// the product offered, documented nowhere, and answered for with the RGB row.
//
// WHAT IT CHECKS, and why each leg exists:
//
//   1 · OFFERED ≡ CATALOGUED. The offered set is read from the picker's own
//       space-name table (the library-facing list) plus `hex`; the catalogued set
//       is `SPACE_CATALOG`'s keys. The defect WAS this inequality, so the gate
//       recomputes both sides rather than counting one.
//   2 · EVERY ENTRY IS KEY-TRUE. `entry.id` equals its key, so the key-preserving
//       array a consumer iterates cannot hand out a mislabelled row.
//   3 · TOTALITY BY CONTENT, NOT BY STUB. The adjudication's own words: "a
//       catalog that compiles because five entries were stubbed is the masking
//       fallback wearing a type's clothes." Every info field must be present and
//       non-empty, every list non-empty — `satisfies` cannot check that.
//   4 · NO ROW BORROWS ANOTHER'S CARD. Definitions, formal names and info
//       objects must all be pairwise distinct. This is the leg that reds if
//       anyone re-introduces a fallback of any shape: a fallback makes two rows
//       identical.
//   5 · THE DOCS ARE DECIDED, NOT MISSING. Every entry must CARRY a `doc`
//       property whose value is a loader or an explicit `null`. An absent
//       property — the silent gap — reds.
//   6 · THE NAMED FAILING INPUT. `display-p3` does not say 1931 and does not
//       speak RGB's definition.
//
// HOW IT LOADS TYPESCRIPT: the catalog is a `.ts` module inside the demo graph,
// so the gate bundles it with the esbuild already present in the toolchain and
// imports the result, aliasing `@mkbabb/value.js/*` to this repo's own `dist/`
// exactly as `vite.config.ts` does. The gate therefore measures the SAME module
// the app runs, not a transcription of it.

import * as esbuild from "esbuild";
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

const INFO_FIELDS = [
    "name",
    "definition",
    "created",
    "deviceDependency",
    "whitePoint",
    "gamut",
    "perceptualUniformity",
    "hueLinearity",
    "lightnessSeparation",
    "notes",
];
const INFO_LISTS = ["components", "applications", "industries", "conversions"];

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

const catalog = await loadModule("demo/color-session/space-catalog.ts");
const picker = await loadModule("demo/color-session/picker-color.ts");

const { SPACE_CATALOG, SPACE_CATALOG_ENTRIES } = catalog;
const offered = [...Object.keys(picker.PICKER_SPACE_NAMES), "hex"];
const catalogued = Object.keys(SPACE_CATALOG);

// 1 · offered ≡ catalogued
const missing = offered.filter((space) => !catalogued.includes(space));
const extra = catalogued.filter((space) => !offered.includes(space));
if (missing.length) fail(`offered but not catalogued: ${missing.join(", ")}`);
if (extra.length) fail(`catalogued but not offered: ${extra.join(", ")}`);

// The key-preserving array must carry the whole catalog, in order.
if (SPACE_CATALOG_ENTRIES.length !== catalogued.length) {
    fail(
        `SPACE_CATALOG_ENTRIES has ${SPACE_CATALOG_ENTRIES.length} rows for ` +
            `${catalogued.length} catalog keys`,
    );
}
SPACE_CATALOG_ENTRIES.forEach((entry, index) => {
    if (entry.id !== catalogued[index]) {
        fail(
            `entry ${index} is "${entry.id}" where the catalog key is "${catalogued[index]}"`,
        );
    }
});

let authoredDocs = 0;
let decidedNone = 0;

for (const [key, entry] of Object.entries(SPACE_CATALOG)) {
    // 2 · key-true
    if (entry.id !== key) fail(`${key}: entry.id is "${entry.id}"`);
    if (typeof entry.label !== "string" || entry.label.trim() === "") {
        fail(`${key}: empty label`);
    }
    if (!Array.isArray(entry.channels) || entry.channels.length === 0) {
        fail(`${key}: no channel metadata`);
    }
    if (typeof entry.interpolatable !== "boolean") {
        fail(
            `${key}: interpolatable is not a decision (${typeof entry.interpolatable})`,
        );
    }

    // 3 · totality by content
    const info = entry.info;
    if (!info) {
        fail(`${key}: no info row`);
        continue;
    }
    for (const field of INFO_FIELDS) {
        if (typeof info[field] !== "string" || info[field].trim() === "") {
            fail(`${key}.info.${field} is empty`);
        }
    }
    for (const field of INFO_LISTS) {
        if (!Array.isArray(info[field]) || info[field].length === 0) {
            fail(`${key}.info.${field} is empty`);
        }
    }
    if (info.components.length !== entry.channels.length) {
        fail(
            `${key}: ${info.components.length} documented components for ` +
                `${entry.channels.length} channels`,
        );
    }

    // 5 · the doc is DECIDED
    if (!("doc" in entry)) {
        fail(`${key}: no doc decision (the property itself is absent)`);
    } else if (entry.doc === null) {
        decidedNone += 1;
    } else if (typeof entry.doc === "function") {
        authoredDocs += 1;
    } else {
        fail(`${key}: doc is neither a loader nor an explicit null`);
    }
}

// 4 · no row borrows another's card
for (const [field, read] of [
    ["definition", (entry) => entry.info?.definition],
    ["info.name", (entry) => entry.info?.name],
]) {
    const seen = new Map();
    for (const entry of SPACE_CATALOG_ENTRIES) {
        const value = read(entry);
        if (seen.has(value))
            fail(`${entry.id} shares its ${field} with ${seen.get(value)}`);
        else seen.set(value, entry.id);
    }
}
const identities = new Set(SPACE_CATALOG_ENTRIES.map((entry) => entry.info));
if (identities.size !== SPACE_CATALOG_ENTRIES.length) {
    fail(
        `${SPACE_CATALOG_ENTRIES.length - identities.size} entries share one info OBJECT ` +
            `— a row is aliasing another row's card`,
    );
}

// 6 · the named failing input
const p3 = SPACE_CATALOG["display-p3"];
const rgb = SPACE_CATALOG.rgb;
if (!p3) fail("display-p3 has no catalog row at all");
else {
    if (p3.info?.created === rgb?.info?.created) {
        fail(`display-p3 states RGB's creation date (${p3.info.created})`);
    }
    if (p3.info?.definition === rgb?.info?.definition) {
        fail("display-p3 states RGB's definition");
    }
}

const green = failures.length === 0;
console.log(
    [
        "GATE f1 (catalog totality) — " + (green ? "GREEN" : "RED"),
        `  offered=${offered.length}  catalogued=${catalogued.length}  ` +
            `info=${SPACE_CATALOG_ENTRIES.filter((entry) => entry.info).length}  ` +
            `docs=${authoredDocs} authored + ${decidedNone} decided-none = ` +
            `${authoredDocs + decidedNone} decided`,
        `  failing input "display-p3": created=${p3?.info?.created ?? "—"} ` +
            `(RGB's is ${rgb?.info?.created ?? "—"})`,
        ...failures.map((message) => `  FAIL ${message}`),
    ].join("\n"),
);

process.exit(green ? 0 : 1);
