// SERVED MODEL: claude-opus-5-5
//
// X.P.W9 `.vc9` — the harness census of the two V-C modules the 2026-10-07 selection left empty
// (css-variables-1, css-syntax-3; W8 §Scope 1). For EVERY file under `css/css-variables/` and
// `css/css-syntax/` at the pinned WPT commit it records the harness the file calls, then:
//   - a `parsing-testcommon` file (test_valid_value / test_invalid_value) is vendored + extracted;
//   - a CSSOM round-trip file (setProperty → getPropertyValue → assert_equals; `roundtrip.mjs`)
//     that records ≥ 1 case is vendored + extracted;
//   - every other file gets a ruled-file row (file, harness, class, reason, spec).
// Run once per pin move (the checkout is the durable fetch cache, §0eo; never /tmp):
//   node test/css/wpt-values/census.mjs <wpt-checkout-of-WPT_COMMIT> <file-list> [YYYY-MM-DD]
// <file-list> is the pinned tree's blob paths under the two modules (git tree API at WPT_COMMIT).
// E-3: existing pins.json entries are never rewritten; new entries are appended.
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { WPT_COMMIT } from "./vendor.mjs";
import { roundTripCases } from "./roundtrip.mjs";

export const CENSUS_MODULES = ["css-variables", "css-syntax"];
const HERE = path.dirname(new URL(import.meta.url).pathname);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const SPEC = {
    "css-variables": "https://drafts.csswg.org/css-variables-1/",
    "css-syntax": "https://drafts.csswg.org/css-syntax-3/",
};

export function harnessOf(text) {
    const calls = [];
    if (/\btest_(in)?valid_value\(/.test(text)) calls.push("test_valid_value");
    if (/\btest_computed_value\(/.test(text)) calls.push("test_computed_value");
    if (/\bCSS\.supports\(/.test(text)) calls.push("CSS.supports");
    if (/\b(setProperty|getPropertyValue)\(/.test(text)) calls.push("setProperty/getPropertyValue");
    if (/\bgetComputedStyle\(/.test(text)) calls.push("getComputedStyle");
    if (/<link[^>]+rel=["']?match/.test(text)) calls.push("reftest");
    if (/testharness\.js/.test(text)) calls.push("testharness");
    return calls;
}

function ruling(rel, calls) {
    if (/\.js$/.test(rel) || /-ref\.|(^|\/)(reference|support|resources)\//.test(rel)) {
        return ["W9vc-NOT-A-TEST", "a reference, support or resource file: it asserts nothing"];
    }
    if (/(^|\/)crashtests\/|-crash\./.test(rel)) {
        return ["W9vc-CRASHTEST", "a crashtest: it asserts only that the engine does not crash, so it carries no parse outcome"];
    }
    if (calls.includes("reftest")) {
        return ["W9vc-REFTEST", "a reftest: it compares rendering against a reference page, so it asserts no value V-C can read"];
    }
    if (calls.includes("getComputedStyle")) {
        return ["W9vc-COMPUTED", "asserts a computed or cascaded value (substitution, inheritance, animation, registration) on an element tree; V-C judges specified values, property-agnostically (DR-a, R-c-2)"];
    }
    if (calls.includes("CSS.supports")) {
        return ["W9vc-PROPERTY-NAME", "asserts property-name validity through CSS.supports(name, value); V-C judges value grammar, not property names"];
    }
    if (calls.length === 0) {
        return ["W9vc-NO-HARNESS", "no testharness assertion (a manual or visual page)"];
    }
    return ["W9vc-CSSOM-STRUCTURE", "asserts stylesheet structure through the CSSOM (rule counts, selectorText, cssText, An+B, tokenization of rule preludes or selectors); the round-trip recorder reads no setProperty → getPropertyValue value case from it"];
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const [root, list, dateArg] = process.argv.slice(2);
    if (!root || !list) throw new Error("usage: node census.mjs <wpt-checkout> <file-list> [YYYY-MM-DD]");
    const date = dateArg ?? new Date().toISOString().slice(0, 10);
    const rels = readFileSync(list, "utf8").split("\n").map((l) => l.trim()).filter(Boolean).sort();
    const pinsPath = path.join(HERE, "pins.json");
    const pins = JSON.parse(readFileSync(pinsPath, "utf8"));
    const census = [];
    const ruledFiles = [];
    for (const rel of rels) {
        const module = rel.split("/")[1];
        if (!CENSUS_MODULES.includes(module)) throw new Error(`HALT: ${rel} is outside the census modules`);
        const bytes = readFileSync(path.join(root, rel));
        // A UTF-16 page (css-syntax charset tests) is read as UTF-16 so its harness is seen.
        const utf16 = bytes.length > 1 && ((bytes[0] === 0xff && bytes[1] === 0xfe) || (bytes[0] === 0xfe && bytes[1] === 0xff) || bytes.includes(0));
        const text = utf16 ? new TextDecoder(bytes[0] === 0xfe ? "utf-16be" : "utf-16le").decode(bytes) : bytes.toString("utf8");
        const calls = harnessOf(text);
        let extract = null;
        if (calls.includes("test_valid_value")) extract = "parsing-testcommon";
        else if (calls.includes("setProperty/getPropertyValue") && !calls.includes("getComputedStyle")
            && roundTripCases(text, module, rel).length > 0) extract = "roundtrip";
        census.push({ file: rel, sha256: sha256(bytes), harness: calls, extract });
        if (extract) {
            const dest = path.join(HERE, "wpt", rel);
            mkdirSync(path.dirname(dest), { recursive: true });
            copyFileSync(path.join(root, rel), dest);
            if (pins.files[rel] !== undefined && pins.files[rel] !== sha256(bytes)) throw new Error(`HALT: pin drift ${rel}`);
            pins.files[rel] = sha256(bytes);
        } else {
            const [cls, reason] = ruling(rel, calls);
            ruledFiles.push({ file: rel, harness: calls, class: cls, reason, spec: SPEC[module] });
        }
    }
    writeFileSync(pinsPath, `${JSON.stringify(pins, null, 2)}\n`);
    writeFileSync(path.join(HERE, `census-${date}.json`), `${JSON.stringify({ wptCommit: WPT_COMMIT, modules: CENSUS_MODULES, count: census.length, files: census }, null, 1)}\n`);
    writeFileSync(path.join(HERE, "../../../bench/wpt-conformance/ruled-files.json"), `${JSON.stringify({
        about: `X.P.W9 .vc9 — the file-level rulings of the ${date} census (census-${date}.json): every css-variables-1 / css-syntax-3 file at the pin that V-C does not extract, with the harness it calls and why it carries no specified-value case. A census file that is neither extracted nor ruled fails V-C (UNRULED FILE); a ruled file that is extracted fails it too (STALE FILE).`,
        rows: ruledFiles,
    }, null, 2)}\n`);
    const n = census.filter((c) => c.extract).length;
    console.log(`census ${census.length} files: ${n} extracted (${census.filter((c) => c.extract === "parsing-testcommon").length} parsing-testcommon, ${census.filter((c) => c.extract === "roundtrip").length} roundtrip), ${ruledFiles.length} ruled`);
}
