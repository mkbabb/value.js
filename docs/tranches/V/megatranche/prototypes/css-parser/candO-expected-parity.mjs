// cand-O (adjudicated winner) vs published 4.0.0 on the FAILURE-path field `expected`.
// The adjudication's G6 asserts {space, channels, alpha} — the SUCCESS shape only.
import { parseCssColor } from "@mkbabb/value.js/css";
const { parseColor } = await import("./cand-o/index.ts").catch(() => ({}));
const INPUTS = ["notacolor", "var(--x)", "light-dark(red, blue)", "#gg", "hsl(1 2)", "", "oklch()"];
let mismatch = 0;
for (const t of INPUTS) {
  let pub;
  try { const r = parseCssColor(t); pub = r.ok ? "ACCEPT" : JSON.stringify(r.diagnostics[0].expected); }
  catch (e) { pub = "THROWS " + e.constructor.name; }
  const r2 = parseColor(t);
  const cand = r2.ok ? "ACCEPT" : JSON.stringify(r2.issue.expected);
  const bad = pub !== "ACCEPT" && !pub.startsWith("THROWS") && cand === "[]";
  if (bad) mismatch++;
  console.log(`${bad ? "RED " : "    "} ${JSON.stringify(t).padEnd(24)} published.expected=${pub.padEnd(26)} cand-O.issue.expected=${cand}`);
}
console.log(`\n${mismatch} inputs where the incumbent names an expectation and cand-O emits []`);
process.exit(mismatch ? 1 : 0);
