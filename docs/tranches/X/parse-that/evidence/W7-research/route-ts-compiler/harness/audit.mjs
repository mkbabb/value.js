// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — SOUNDNESS AUDIT of the compile-time routing: on the audit build, every routed
// choice is re-run as the plain ordered choice and every first-unit guard that rejects is re-run
// unguarded, at every position the corpus visits, over all seven entries + every sheet.ts reader.
//   node harness/audit.mjs
import path from "node:path";
import { writeFileSync } from "node:fs";
import { ENTRIES, INPUTS, OUT } from "./common.mjs";
const m = await import(path.join(OUT, "proto-audit.mjs"));
for (const e of ENTRIES) { const fn = e === "parseStylesheet" ? m.parseStylesheet : m.bbnf[e]; for (const s of INPUTS) fn(s); }
for (const [k, fn] of Object.entries(m.sheet)) {
    if (typeof fn !== "function") continue;
    for (const s of INPUTS) { if (k === "timelineArgs") { fn("scroll", s); fn("view", s); } else fn(s); }
}
for (const sep of [",", ";", "space"]) for (const s of INPUTS) m.splitTopLevel(s, sep);
console.log("audit checks", m.AUDIT.checks, "violations", m.AUDIT.violations, m.AUDIT.samples);
writeFileSync(path.join(import.meta.dirname, "..", "results", "audit.json"), JSON.stringify({ corpus: INPUTS.length, ...m.AUDIT }, null, 1));
