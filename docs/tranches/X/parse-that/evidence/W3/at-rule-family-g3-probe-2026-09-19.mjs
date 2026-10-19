// SERVED MODEL: claude-fable-5-1
// X.P.W3.l — G-3 probe: every public entry of BOTH surfaces over the whole union corpus and the
// declared non-string boundary cases; counts throws (must be 0), SHIELD.caught at open and exit
// (must be 0 both), faults() (must be []), and the boundary cells' shapes.
import { readFileSync } from "node:fs";
import { loadPublicSurfaces, SHIELD } from "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/src/css/entry.mjs";
const corpus = JSON.parse(readFileSync("/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/test/css-totality/corpus.json", "utf8"));
const r1 = JSON.parse(readFileSync("/Users/mkbabb/Programming/parse-that-css-totality-p2/experiments/w2/corpus/r1.json", "utf8"));
const boundary = r1.boundary.map((b) => (typeof b === "object" && b !== null && "value" in b ? b.value : b));
console.log("SHIELD.caught at open", SHIELD.caught);
const { js, wasm } = await loadPublicSurfaces();
const entries = js.entries();
let calls = 0, throws = 0;
const shapes = new Set();
let boundaryCells = 0;
for (const [name, surface] of [["js", js], ["wasm", wasm]]) {
    for (const entry of entries) {
        for (const row of corpus.rows) {
            calls++;
            try { surface[entry](row.s); } catch (e) { throws++; if (throws < 5) console.log("THROW", name, entry, JSON.stringify(row.s).slice(0, 80), e.message); }
        }
        for (const b of boundary) {
            calls++; boundaryCells++;
            let r;
            try { r = surface[entry](b); } catch (e) { throws++; console.log("THROW(boundary)", name, entry, String(b), e.message); continue; }
            shapes.add(JSON.stringify(r));
        }
    }
}
console.log(`rows ${corpus.rows.length} · entries ${entries.length} · boundary cases ${boundary.length}`);
console.log(`calls ${calls} · throws ${throws} · boundary cells ${boundaryCells} · distinct boundary shapes ${shapes.size}`);
console.log("boundary shape:", [...shapes][0]);
console.log("SHIELD.caught at exit", SHIELD.caught, "faults", JSON.stringify(SHIELD.faults()));
