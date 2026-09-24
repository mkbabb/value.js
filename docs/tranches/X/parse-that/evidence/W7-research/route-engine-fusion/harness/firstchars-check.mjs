// SERVED MODEL: claude-opus-5-5 — soundness check of fusion.ts firstChars() against brute force over all 110 grammar regexes (paths are this run's scratchpad).
// sanity: firstChars against brute force on value.js's grammar regexes
import { build } from "esbuild";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/fc.mjs";
import { readFileSync, writeFileSync } from "node:fs";
let s = readFileSync("/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W7-research/route-engine-fusion/src/fusion.ts", "utf8");
s = s.replace("function firstChars(", "export function firstChars(");
writeFileSync("/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/fusion-fc.ts", s);
await build({ bundle: true, platform: "node", format: "esm", entryPoints: ["/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/fusion-fc.ts"], outfile: OUT, nodePaths: ["/Users/mkbabb/Programming/value.js/node_modules"], logLevel: "error" });
const { firstChars } = await import(OUT);
const { BBNFToAST } = await import("/Users/mkbabb/Programming/value.js/node_modules/@mkbabb/bbnf-lang/dist/bbnf.js");
const G = "/Users/mkbabb/Programming/value.js/src/css/grammar/";
const src = ["tokens", "math", "color", "value", "stylesheet"].map((m) => readFileSync(G + m + ".bbnf", "utf8")).join("\n");
const [, ast] = BBNFToAST(src);
const regs = [];
const walk = (e) => { if (!e || typeof e !== "object") return; if (e.type === "regex") regs.push(e.value); const v = e.value; if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === "object" && v.type) walk(v); };
for (const [, r] of ast) walk(r.expression);
let bad = 0;
const probes = [];
for (let c = 0; c < 128; c++) probes.push(String.fromCharCode(c));
probes.push("é", "—", " ");
for (const re of regs) {
  const f = firstChars(re.source, re.flags.includes("i"));
  const sticky = new RegExp(re.source, re.flags + "y");
  // brute force: does the regex match at position 0 of (ch + tail) for many tails?
  const tails = ["", "a", "(", "0", "-", " x", "abc(", "1px", "%", ")", "e", "x;", ":", "{", "}", "\"a\"", "*/"];
  for (const p of probes) for (const t of tails) {
    sticky.lastIndex = 0; const inp = p + t + "rgba(1) none from to 50%)";
    if (sticky.test(inp) && sticky.lastIndex > 0) {
      const code = p.charCodeAt(0); const ok = f === null || (code < 128 ? f[code] : f[128]);
      if (!ok) { bad++; if (bad < 10) console.log("MISS", re, JSON.stringify(inp.slice(0, 12))); }
    }
  }
}
console.log("regexes", regs.length, "misses", bad, "null(all)", regs.filter((r) => firstChars(r.source, r.flags.includes("i")) === null).length);
