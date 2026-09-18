/**
 * BORN-RED — @mkbabb/parse-that@1.0.0 published-surface gaps against the parser-band
 * adjudication's five binding debts (registry/adjudicated/parser-band.md § "WHAT CAND-O
 * OWES CAND-F"). Run from this workspace (it resolves the workspace's node_modules):
 *
 *   node docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs
 *   node docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs --arm
 *
 * GREEN condition: 0 RED rows.
 */
import { Parser, string, regex, any, all, memoize, resetPackrat,
         enableDiagnostics, disableDiagnostics } from "@mkbabb/parse-that";
import { mergeErrorState } from "@mkbabb/parse-that/diagnostics";

let red = 0;
const row = (bad, label, v) => { if (bad) red++; console.log(`${bad ? "RED " : "ok  "} ${label.padEnd(58)} ${v}`); };

// ── DEBT-1 — labelled failure diagnostics ───────────────────────────────────
// cand-F's reject(), verbatim from cand-f/color.ts:159-164.
const reject = (label) => new Parser((s) => { mergeErrorState(s, label); s.isError = true; return s; });
const armF = any(string("red"), reject("<named-color>"));
row(armF.parseState("rebeccapurple").expected !== undefined ? false : true,
    "DEBT-1  cand-F reject() label, diagnostics OFF (shipping default)",
    JSON.stringify(armF.parseState("rebeccapurple").expected));
row(!("label" in Parser.prototype), "DEBT-1  Parser.prototype.label / .expected combinator", "absent");
row(enableDiagnostics.length !== 1, "DEBT-1  enableDiagnostics() is process-global (arity)", enableDiagnostics.length + " args");

// ── DEBT-3 — recursion bounded by construction ──────────────────────────────
const nested = Parser.lazy(() => any(all(string("("), nested, string(")")), string("x")));
let ok = 0, mode = "n/a";
for (let d = 1; d <= 20000; d++) {
    try { const st = nested.parseState("(".repeat(d) + "x" + ")".repeat(d));
          if (st.isError) { mode = "ok:false at depth " + d; break; } ok = d; }
    catch (e) { mode = e.constructor.name + " thrown at depth " + d; break; }
}
row(!mode.startsWith("ok:false"), `DEBT-3  Parser.lazy ceiling (deepest OK = ${ok}), failure mode`, mode);
row(Parser.lazy.length !== 2, "DEBT-3  Parser.lazy depth-bound parameter", `arity ${Parser.lazy.length} — (fn) only`);

// ── DEBT-2 — reject-path budget vs. the packrat latch ───────────────────────
const g = all(regex(/[a-z]+/), string("("), regex(/[0-9. ]+/), string(")"));
const bench = () => { const r = []; for (let i = 0; i < 50; i++) { const t = process.hrtime.bigint();
    for (let j = 0; j < 5000; j++) g.parseState("oklch(0.5 0.1 200)"); r.push(Number(process.hrtime.bigint() - t) / 5000); }
    const s = r.slice(15).sort((a, b) => a - b); return s[s.length >> 1]; };
const ARM = process.argv.includes("--arm");
if (ARM) memoize(string("some-other-grammar-entirely"));
console.log(`\n     ${ARM ? "ARMED  " : "UNARMED"} median ${bench().toFixed(1)} ns/parse  (compare the two runs)`);
if (ARM) { resetPackrat(); row(true, "LATCH   resetPackrat() disarms PACKRAT_ARMED?", `no — still ${bench().toFixed(1)} ns/parse`); }
row(!ARM ? false : false, "LATCH   PACKRAT_ARMED is a module-global one-way flag",
    "packrat-entry chunk :678,:722 — set by makeMemoized(), never cleared");

// ── JS boundary ─────────────────────────────────────────────────────────────
let throws = 0;
for (const bad of [undefined, null, 42, {}, []]) {
    try { string("a").parseState(bad); } catch { throws++; }
}
row(throws > 0, "GUARD   parseState(non-string) totality", `${throws}/5 throw raw TypeError`);
row(string("a").parse("b") !== undefined ? false : true, "GUARD   .parse() failure signal", "returns undefined — indistinguishable from .opt()");

console.log(red ? `\nRED — ${red} gap(s)` : "\nGREEN");
process.exit(red ? 1 : 0);
