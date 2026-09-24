// SERVED MODEL: claude-opus-5-5
//
// X.P.W6R Repair 1 (D-1) — keyframes.js's stylesheets, FROZEN at the commit `real-corpus.json` pins
// (`provenance.keyframesJs`), so `stylesheet.measure.test.ts` reads a tracked file instead of a sibling
// checkout the CI producer job never has. Generated (never hand-edited) from the sibling at authoring
// time only — every `.css` file and every SFC `<style>` block tracked at that commit, in `git ls-tree`
// order, read by `git show <sha>:<file>` (never the working tree). Usage (from the repo root):
//   node bench/css-equivalence/freeze-keyframes-sheets.mjs [--check]
// `--check` re-derives the sheets and exits 1 if `keyframes-sheets.json` differs.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.join(process.cwd(), "bench/css-equivalence");
const KEYFRAMES = path.resolve(process.cwd(), "..", "keyframes.js");
const OUT = path.join(HERE, "keyframes-sheets.json");
const STYLE = /<style\b[^>]*>([\s\S]*?)<\/style>/g;

const sha = JSON.parse(readFileSync(path.join(HERE, "real-corpus.json"), "utf8")).provenance.keyframesJs;
const git = (...args) => execFileSync("git", ["-C", KEYFRAMES, ...args], { encoding: "utf8", maxBuffer: 1 << 28 });
const sheets = git("ls-tree", "-r", "--name-only", sha, "--", ".")
    .split("\n")
    .filter((f) => f.endsWith(".css") || f.endsWith(".vue"))
    .flatMap((f) => {
        const text = git("show", `${sha}:${f}`);
        return f.endsWith(".css") ? [text] : [...text.matchAll(STYLE)].map((m) => m[1] ?? "");
    })
    .filter((t) => t.trim());

const out = `${JSON.stringify({
    note: "keyframes.js stylesheets at provenance.keyframesJs, frozen for stylesheet.measure.test.ts; regenerate with freeze-keyframes-sheets.mjs",
    provenance: { keyframesJs: sha },
    sheetsSha256: createHash("sha256").update(JSON.stringify(sheets)).digest("hex"),
    sheets,
}, null, 1)}\n`;

if (process.argv.includes("--check")) {
    const same = readFileSync(OUT, "utf8") === out;
    console.log(same ? `keyframes-sheets.json matches (${sheets.length} sheets @ ${sha})` : "keyframes-sheets.json DIFFERS");
    process.exit(same ? 0 : 1);
}
writeFileSync(OUT, out);
console.log(`wrote ${sheets.length} sheets @ ${sha}`);
