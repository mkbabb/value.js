// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — F-b-3 root-cure witness: how many first-letter workarounds proto-fb3 stripped,
// and upper-case spellings the flag alone must admit (the equivalence run is equiv.mjs proto-fb3).
import path from "node:path";
import { OUT } from "./common.mjs";
const m = await import(path.join(OUT, "proto-fb3.mjs"));
const s = await import(path.join(OUT, "stock.mjs"));
m.bbnf.parseCssColor("red");
console.log("first-letter workarounds stripped:", m.__load.STRIPPED.count);
for (const src of ["RGB(1 2 3 / NONE)", "OKLCH(50% 0.1 20DEG)", "COLOR-MIX(IN OKLCH, red, blue)", "CALC(1PX + 2PX)"]) {
    const a = JSON.stringify(m.bbnf.parseCssValue(src)), b = JSON.stringify(s.bbnf.parseCssValue(src));
    console.log(src.padEnd(34), a === b ? "same as stock" : "DIFFERS", a.slice(0, 90));
}
