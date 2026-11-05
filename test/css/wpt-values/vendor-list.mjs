// SERVED MODEL: claude-opus-5-5
//
// X.P.W10 `.c10` — vendors a NAMED list of WPT files at the pinned commit (the owner-ruled W10 corpora,
// W10.md `.c10`), byte-for-byte, appending their sha256 pins to `pins.json` (E-3: an existing pin is
// never rewritten; a drifted byte HALTs):
//   node test/css/wpt-values/vendor-list.mjs <wpt-checkout-of-WPT_COMMIT> <list.json>
// <list.json> = { "files": ["css/…/x.html", …] } (committed beside this script).
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

if (import.meta.url === `file://${process.argv[1]}`) {
    const [root, list] = process.argv.slice(2);
    if (!root || !list) throw new Error("usage: node vendor-list.mjs <wpt-checkout> <list.json>");
    const pinsPath = path.join(HERE, "pins.json");
    const pins = JSON.parse(readFileSync(pinsPath, "utf8"));
    const { files } = JSON.parse(readFileSync(list, "utf8"));
    let added = 0;
    for (const rel of files) {
        const bytes = readFileSync(path.join(root, rel));
        const sha = sha256(bytes);
        if (pins.files[rel] !== undefined) {
            if (pins.files[rel] !== sha) throw new Error(`HALT: ${rel} drifted from its pin`);
            continue;
        }
        const dest = path.join(HERE, "wpt", rel);
        mkdirSync(path.dirname(dest), { recursive: true });
        copyFileSync(path.join(root, rel), dest);
        pins.files[rel] = sha;
        added++;
    }
    writeFileSync(pinsPath, `${JSON.stringify(pins, null, 2)}\n`);
    console.log(`vendored ${added} of ${files.length} listed files at WPT ${pins.commit}`);
}
