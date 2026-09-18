// Smoke probe: load all three engines + the jsonParser normaliser, parse a few
// representative inputs, print ok/fail per engine per item. No timing here.
import { jsonParser } from "@mkbabb/parse-that";

// (a) LIVE regex parser — the retiring engine (repo src/css, read-only).
import {
    parseCssValue as liveValue,
    parseStylesheet as liveSheet,
} from "/Users/mkbabb/Programming/value.js/src/css/index.ts";

// (b) C14 assay — published @mkbabb/parse-that combinator prototype.
import {
    parseStylesheet as c14Sheet,
    parseColor as c14Color,
    parseEasing as c14Easing,
} from "../c14-css/src/css/api.ts";

// (c) deposed tree — pre-v4 parse-that combinator parser.
import { CSSValues as depValues } from "../deposed-full/src/parsing/index.ts";
import { parseCSSStylesheet as depSheet } from "../deposed-full/src/parsing/stylesheet/index.ts";

const values = [
    "oklch(0.7 0.15 30)",
    "cubic-bezier(0.42, 0, 0.58, 1)",
    "linear-gradient(to right, red, blue)",
    "calc(100% - 2rem)",
    "42px",
];
const sheets = [
    ".a { color: oklch(62.8% .257 29.23 / 85%); }",
    ".card { padding: 1rem; background: oklch(0.7 0.15 30); }",
    "@media (min-width: 600px) { .grid { display: grid; } }",
];

const okLive = (r: unknown) =>
    typeof r === "object" && r !== null && (r as { ok?: unknown }).ok === true;
const okC14 = okLive;
const okDep = (fn: () => unknown) => {
    try { fn(); return true; } catch { return false; }
};

console.log("=== jsonParser normaliser ===");
const jr = jsonParser.parse(JSON.stringify({ a: 1, b: [1, 2, 3] }));
console.log("  jsonParser.parse ->", jr !== undefined && jr !== null ? "OK" : "FAIL");

console.log("\n=== VALUES ===");
for (const v of values) {
    const L = okLive(liveValue(v));
    // C14: color vs easing dispatch by content
    let C: boolean | "n/a";
    if (v.startsWith("oklch")) C = okC14(c14Color(v));
    else if (v.startsWith("cubic-bezier")) C = okC14(c14Easing(v));
    else C = "n/a";
    const D = okDep(() => depValues.Value.parse(v));
    console.log(`  ${v.padEnd(40)} live=${L} c14=${C} deposed=${D}`);
}

console.log("\n=== SHEETS ===");
for (const s of sheets) {
    const L = okLive(liveSheet(s));
    const C = okC14(c14Sheet(s));
    const D = okDep(() => depSheet(s));
    console.log(`  live=${L} c14=${C} deposed=${D}  | ${s.slice(0, 50)}`);
}
