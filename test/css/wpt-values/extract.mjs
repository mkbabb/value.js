// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.c` — extracts every `test_valid_value` / `test_invalid_value` case from the vendored WPT
// files (`wpt/`, pinned in `pins.json`) into a dated JSON (E-3: immutable once committed; a re-pin
// writes a NEW dated file):
//   node test/css/wpt-values/extract.mjs [YYYY-MM-DD]
// The wpt-cases.ts idiom: each file's inline <script> is executed with the harness's two recorders
// in scope, so every loop and template literal yields exactly the cases a browser runs. Any other
// free identifier the script touches (DOM, other harness helpers) resolves to an inert stub, so no
// case is chosen by this repository's author. A drifted byte or a throwing script HALTs.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

const inert = new Proxy(function () {}, {
    get: (_t, key) => (key === Symbol.iterator ? function* () {} : key === Symbol.toPrimitive ? () => "" : inert),
    apply: () => inert,
    construct: () => inert,
});

export function loadPins() {
    return JSON.parse(readFileSync(path.join(HERE, "pins.json"), "utf8"));
}

/** Every recorded case of one vendored file (`rel` = its WPT path, e.g. `css/css-grid/parsing/x.html`). */
export function casesOf(rel, pins = loadPins()) {
    const bytes = readFileSync(path.join(HERE, "wpt", rel));
    const sha = sha256(bytes);
    if (sha !== pins.files[rel]) throw new Error(`HALT: wpt/${rel} drifted from its pin (${sha})`);
    const module = rel.split("/")[1];
    const cases = [];
    const recorders = {
        test_valid_value: (property, value, serialized) => cases.push({
            module, file: rel, kind: "valid", property, input: value,
            expected: serialized === undefined ? [value] : Array.isArray(serialized) ? serialized : [serialized],
        }),
        test_invalid_value: (property, value) => cases.push({ module, file: rel, kind: "invalid", property, input: value }),
    };
    const scope = new Proxy(recorders, {
        has: (target, key) => key in target || !(key in globalThis),
        get: (target, key) => (key === Symbol.unscopables ? undefined : key in target ? target[key] : inert),
    });
    const scripts = [...bytes.toString("utf8").matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1] ?? "");
    for (const body of scripts) new Function("__scope", `with (__scope) {\n${body}\n}`)(scope);
    return cases;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const date = process.argv[2] ?? new Date().toISOString().slice(0, 10);
    const pins = loadPins();
    const cases = Object.keys(pins.files).sort().flatMap((rel) => casesOf(rel, pins));
    const out = { wptCommit: pins.commit, extracted: date, count: cases.length, cases };
    const file = path.join(HERE, `cases-${date}.json`);
    writeFileSync(file, `${JSON.stringify(out, null, 1)}\n`);
    console.log(`${cases.length} cases from ${Object.keys(pins.files).length} files → ${path.basename(file)}`);
}
