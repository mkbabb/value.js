// SERVED MODEL: claude-opus-5-5
// judge — one fresh-process first-use reading for one arm: import, first parse (compiles the grammar
// in every runtime-compiled arm), second parse, and the first parseStylesheet.
import path from "node:path";
import { OUT } from "./common.mjs";
const name = process.argv[2];
const t0 = performance.now();
const m = await import(path.join(OUT, `${name}.mjs`));
const t1 = performance.now();
const color = name === "retired" ? m.hand.parseCssColor : m.bbnf.parseCssColor;
color("rgb(10 20 30 / 50%)");
const t2 = performance.now();
color("oklch(0.5 0.1 200)");
const t3 = performance.now();
m.parseStylesheet(".a { color: red; animation: x 1s ease-in; } @keyframes x { from { opacity: 0 } to { opacity: 1 } }");
const t4 = performance.now();
console.log(JSON.stringify({ importMs: t1 - t0, firstParseMs: t2 - t1, secondParseMs: t3 - t2, firstSheetMs: t4 - t3 }));
