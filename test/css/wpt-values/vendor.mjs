// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.c` — vendors the WPT value-module parsing files byte-for-byte at ONE pinned WPT commit
// and writes their sha256 pins (`pins.json`). Run once per pin move:
//   node test/css/wpt-values/vendor.mjs <wpt-checkout-of-WPT_COMMIT>
// The checkout is a durable fetch cache (§0eo: under $HOME, never /tmp), holding the files at their
// WPT paths. Selection is mechanical, never chosen case by case: every `*.html` under the nine
// modules' trees whose basename carries `valid` or `invalid`, that is not a crashtest or a
// `.tentative.` / `tentative/` file (not yet spec), and whose inline script calls the harness's
// `test_valid_value(` or `test_invalid_value(` — the `parsing-testcommon.js` cases V-C reads.
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

export const WPT_COMMIT = "5a5b2b591b39c59d5bca77819db305474dcfd18a";
export const MODULES = [
    "css-values", "css-grid", "css-images", "css-fonts", "css-transforms",
    "css-easing", "css-color", "css-variables", "css-syntax",
];

const HERE = path.dirname(new URL(import.meta.url).pathname);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

function* walk(dir) {
    for (const name of readdirSync(dir).sort()) {
        const full = path.join(dir, name);
        if (statSync(full).isDirectory()) yield* walk(full);
        else yield full;
    }
}

export function selected(rel, text) {
    const base = path.basename(rel);
    return /\.html?$/.test(base)
        && /(^|-)(in)?valid([-.])/.test(base)
        && !/(^|\/)crashtests\//.test(rel)
        && !/\.tentative\./.test(base) && !/(^|\/)tentative\//.test(rel)
        && /\btest_(in)?valid_value\(/.test(text);
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const root = process.argv[2];
    if (!root) throw new Error("usage: node vendor.mjs <wpt-checkout>");
    const files = {};
    for (const mod of MODULES) {
        for (const full of walk(path.join(root, "css", mod))) {
            const rel = path.relative(root, full).split(path.sep).join("/");
            const bytes = readFileSync(full);
            if (!selected(rel, bytes.toString("utf8"))) continue;
            const dest = path.join(HERE, "wpt", rel);
            mkdirSync(path.dirname(dest), { recursive: true });
            copyFileSync(full, dest);
            files[rel] = sha256(bytes);
        }
    }
    copyFileSync(path.join(root, "LICENSE.md"), path.join(HERE, "wpt", "LICENSE.md"));
    const pins = { commit: WPT_COMMIT, license: sha256(readFileSync(path.join(root, "LICENSE.md"))), files };
    writeFileSync(path.join(HERE, "pins.json"), `${JSON.stringify(pins, null, 2)}\n`);
    console.log(`vendored ${Object.keys(files).length} files at WPT ${WPT_COMMIT}`);
}
