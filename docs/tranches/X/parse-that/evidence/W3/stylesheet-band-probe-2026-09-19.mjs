// SERVED MODEL: claude-fable-5-1
import { pathToFileURL } from "node:url";
import { generateStylesheetBand, SHAPES } from "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/test/css-totality/lib/stylesheet-band.mjs";
import { PUBLISHED_400_JS } from "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/test/css-totality/lib/pin.mjs";
import { loadPublicSurfaces, SHIELD } from "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/src/css/entry.mjs";
const oracle = await import(pathToFileURL(PUBLISHED_400_JS).href);
const { js, wasm } = await loadPublicSurfaces();
const canon = (v) => JSON.stringify(v, (k, x) => (x && typeof x === "object" && !Array.isArray(x) ? Object.fromEntries(Object.keys(x).sort().map((key) => [key, x[key]])) : x));
const verdict = (r) => (r.ok ? "ACCEPT " + canon(r.value) : "REJECT");
const band = generateStylesheetBand();
const tally = {};
const samples = [];
let dual = 0;
for (const kind of ["witnesses", "mutations"]) for (const row of band[kind]) {
    let o; try { o = verdict(oracle.parseStylesheet(row.src)); } catch (e) { o = "THROW"; }
    const j = verdict(js.parseStylesheet(row.src)); const w = verdict(wasm.parseStylesheet(row.src));
    if (j !== w) dual++;
    const key = `${kind}/${row.shape}`; tally[key] ??= { n: 0, agree: 0, oAccept: 0 };
    tally[key].n++; if (o.startsWith("ACCEPT")) tally[key].oAccept++;
    if (o === j && j === w) tally[key].agree++; else if (samples.length < 14) samples.push({ kind, shape: row.shape, src: row.src, o: o.slice(0, 160), j: j.slice(0, 160), w: w === j ? undefined : w.slice(0, 160) });
}
for (const [k, v] of Object.entries(tally)) console.log(k.padEnd(30), `n ${v.n}  oracleAccept ${v.oAccept}  agree ${v.agree}`);
console.log("dual-target differing", dual, "SHIELD.caught", SHIELD.caught);
for (const s of samples) { console.log("\n" + s.kind, s.shape, JSON.stringify(s.src)); console.log("  o:", s.o); console.log("  j:", s.j); if (s.w) console.log("  w:", s.w); }
