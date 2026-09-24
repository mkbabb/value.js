// SERVED MODEL: claude-opus-5-5
// W7-research · survey:profile — the body a CPU profile samples: one entry of the BBNF path (or the
// retired one, for contrast), looped over the whole corpus for `seconds` after a warm-up.
//   node --cpu-prof --cpu-prof-dir=<d> --cpu-prof-interval=200 <dir>/profile-run.mjs <entry> [seconds] [candidate|retired|variant-*] [pollute]
// `pollute` = 1 first runs parseCssValue over the corpus twice (the mixed-workload IC state).
import { ENTRIES, INPUTS, arms, load } from "./common.mjs";
const [entry = "parseCssValue", seconds = "4", which = "candidate", pollute = "0"] = process.argv.slice(2);
const mods = which === "retired" ? { ret: await load("retired") } : { cand: await load(which) };
const fn = arms(mods)[which === "retired" ? "retired" : "bbnf"][entry];
if (!fn) throw new Error(`no entry ${entry}; one of ${ENTRIES} parseStylesheet`);
if (pollute === "1" && which !== "retired") for (let i = 0; i < 2; i++) for (const s of INPUTS) arms(mods).bbnf.parseCssValue(s);
for (let w = 0; w < 2; w++) for (const s of INPUTS) fn(s);
const end = performance.now() + Number(seconds) * 1000;
let passes = 0;
while (performance.now() < end) { for (const s of INPUTS) fn(s); passes++; }
console.log(JSON.stringify({ entry, which, passes, msPerPass: +((Number(seconds) * 1000) / passes).toFixed(2) }));
