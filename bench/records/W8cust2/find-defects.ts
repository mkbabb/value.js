// SERVED MODEL: claude-opus-5-5
// X.P.W8.cust2: locate the css-equivalence sheets whose parse changed — `.semi`'s product (an archive of 2f590daa8, argv[2]) vs HEAD's working tree.
import { readFileSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";
import { parseStylesheet } from "../../../src/css/index";
const old = (await import(`${process.argv[2]}/src/css/index.ts`)) as { parseStylesheet: typeof parseStylesheet };
const prefix = process.argv[3] ?? "";
const dir = "bench/css-equivalence/";
const assay = JSON.parse(readFileSync(dir + "assay-corpus.json", "utf8")).rows.map((r: { s: string | { src: string } }) => (typeof r.s === "string" ? r.s : r.s.src));
const real = JSON.parse(readFileSync(dir + "real-corpus.json", "utf8")).rows.map((r: { s: string }) => r.s);
const frozen = JSON.parse(readFileSync(dir + "keyframes-sheets.json", "utf8")).sheets as string[];
const cut = (s: string) => Array.from({ length: 16 }, (_, i) => s.slice(0, Math.floor((s.length * (i + 1)) / 17)));
const all = [...new Set([...frozen, ...frozen.flatMap(cut), ...assay, ...real])];
let n = 0;
for (const s of all) {
    if (!s.startsWith(prefix)) continue;
    const a = old.parseStylesheet(s), b = parseStylesheet(s);
    if (isDeepStrictEqual(a, b)) continue;
    n++;
    const ja = JSON.stringify(a), jb = JSON.stringify(b);
    let i = 0;
    while (i < ja.length && ja[i] === jb[i]) i++;
    if (n <= 6) console.log(JSON.stringify(s), "\n  old …", ja.slice(Math.max(0, i - 200), i + 200), "\n  new …", jb.slice(Math.max(0, i - 200), i + 200));
}
console.log(`changed ${n} of ${all.length}`);
