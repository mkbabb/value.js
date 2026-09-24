// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.o` (d) / G-large — freezes the real full stylesheets of the large-sheet cell into `sheets/`, with a
// sha256 MANIFEST. Sources (§0ck G-large: "value.js's and keyframes' built CSS plus a WPT sheet"):
//   value.js gh-pages build (dist/gh-pages/assets/index-*.css), keyframes.js gh-pages build (index-*.css and
//   vendor-monaco-*.css), and WPT `tools/wave/www/css/bulma-0.7.5/bulma.css` at a pinned WPT commit.
// The fonts-only sheet (glass-fonts-*.css: 4 @font-face rules of base64) is not a stylesheet workload and is
// left out. Run once to freeze; the frozen bytes are the cell's input thereafter (MANIFEST sha256 checked).
//   node bench/paired/sheets.mjs
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { HERE, REPO } from "./common.mjs";

const OUT = path.join(HERE, "sheets");
mkdirSync(OUT, { recursive: true });
const KF = path.resolve(REPO, "..", "keyframes.js");
const WPT_AT = "84daed4ae966d9624bed22f43587c79283ad1fea";
const pick = (dir, re) => path.join(dir, readdirSync(dir).find((f) => re.test(f)));
const gitHead = (repo) => execFileSync("git", ["-C", repo, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const sources = [
    { file: "value-js-index.css", from: pick(path.join(REPO, "dist/gh-pages/assets"), /^index-.*\.css$/), repo: "value.js", at: gitHead(REPO) },
    { file: "keyframes-js-index.css", from: pick(path.join(KF, "dist/gh-pages/assets"), /^index-.*\.css$/), repo: "keyframes.js", at: gitHead(KF) },
    { file: "keyframes-js-vendor-monaco.css", from: pick(path.join(KF, "dist/gh-pages/assets"), /^vendor-monaco-.*\.css$/), repo: "keyframes.js", at: gitHead(KF) },
    { file: "wpt-bulma-0.7.5.css", url: `https://raw.githubusercontent.com/web-platform-tests/wpt/${WPT_AT}/tools/wave/www/css/bulma-0.7.5/bulma.css`, repo: "web-platform-tests/wpt", at: WPT_AT },
];
const sheets = [];
for (const s of sources) {
    const text = s.url ? await (await fetch(s.url)).text() : readFileSync(s.from, "utf8");
    writeFileSync(path.join(OUT, s.file), text);
    sheets.push({ file: s.file, bytes: Buffer.byteLength(text), sha256: createHash("sha256").update(text).digest("hex"),
        source: s.url ?? path.relative(path.resolve(REPO, ".."), s.from), repo: s.repo, at: s.at });
}
writeFileSync(path.join(OUT, "MANIFEST.json"), JSON.stringify({ note: "G-large sheets, frozen by bench/paired/sheets.mjs", sheets }, null, 1) + "\n");
console.log(sheets.map((s) => `${s.bytes} ${s.sha256.slice(0, 12)} ${s.file}`).join("\n"));
