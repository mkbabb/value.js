// SERVED MODEL: claude-fable-5-1
//
// X.P.W3.f — CAPACITY REACHABILITY, measured read-only (2026-09-18). Banked BESIDE the sealed
// evidence (E-3): nothing here moves a committed artefact.
//
//   node docs/tranches/X/parse-that/evidence/W3/capacity-reachability-2026-09-18.mjs <out.json>
//
// Reads every fixed region of `lowering-wasm/layout.mjs`, re-takes the ESC-e1 baseline, asks the
// label surface mechanically whether a capacity label can surface, and — per valid-input family —
// binary-searches the smallest repetition at which the Wasm lowering's overflow flag (or its input
// window) fires, recording every region's counter at the last clean input and at the firing one.
// Peaks of the RESTORED journals (C, P, D, vstack, expsnap) are read by zero-filling the region
// before the run and scanning for the highest written entry afterwards; they are LOWER BOUNDS (an
// all-zero entry is invisible to the scan). Monotone counters (markn, recn) and the arena high-water
// are read off the result block and `highWater()` exactly.
import path from "node:path";
const P2 = "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/src/css";
const { SHIELD, loadPublicSurfaces } = await import(path.join(P2, "entry.mjs"));
const { lowerings } = await import(path.join(P2, "harness-adapter.mjs"));
const { THETA } = await import(path.join(P2, "bounds.mjs"));
const { L } = await import(path.join(P2, "algebra/tables.mjs"));
const { promoteLabel, PRODUCTION_LABELS, isNamedProduction } = await import(path.join(P2, "diagnostics.mjs"));
const lay = await import(path.join(P2, "lowering-wasm/layout.mjs"));
const { RESULT } = await import(path.join(P2, "lowering-wasm/runtime.mjs"));

const surfaces = await loadPublicSurfaces();
const say = (...a) => console.log(...a);
say("SERVED MODEL: claude-fable-5-1 · X.P.W3.f capacity-reachability probe · 2026-09-18");
const fmt = (r) => (r.ok ? "ok:true" : `ok:false ${r.diagnostics[0].code} [${r.diagnostics[0].expected[0]}]`);

say("── A. ESC-e1 baseline, re-taken (SHIELD.caught before =", SHIELD.caught, ")");
for (const n of [8190, 8191]) {
    const s = "a{color:red}".repeat(n);
    const js = surfaces.js.parseStylesheet(s), wasm = surfaces.wasm.parseStylesheet(s);
    say(`  rules=${n} bytes=${s.length} js=${fmt(js)} wasm=${fmt(wasm)} SHIELD.caught=${SHIELD.caught}`);
}
{
    const s = "a".repeat(lay.INPUT_CAP + 1);
    const js = surfaces.js.parseStylesheet(s), wasm = surfaces.wasm.parseStylesheet(s);
    say(`  len=${s.length} js=${fmt(js)} wasm=${fmt(wasm)} SHIELD.caught=${SHIELD.caught}`);
}
say("  faults:", SHIELD.faults().map((f) => f.message));

say("\n── B. THETA today and the fixed regions of layout.mjs");
say("  THETA", JSON.stringify(THETA));
const REGIONS = {
    input: lay.INPUT_CAP, marks: lay.MARK_CAP, vstack: lay.VSTACK_CAP, arena: lay.ARENA_CAP,
    C: lay.C_CAP, P: lay.P_CAP, D: lay.D_CAP, recoveries: lay.REC_CAP, expsnap: lay.EXPSNAP_CAP,
};
say("  regions guarded (ovf or throw):", JSON.stringify(REGIONS));

say("\n── C. the label surface, asked mechanically for a capacity label");
const cand = `marks <= ${lay.MARK_CAP}`;
say(`  L.includes(${JSON.stringify(cand)}) =`, L.includes(cand));
say(`  promoteLabel(${JSON.stringify(cand)}) =`, promoteLabel(cand));
say(`  Object.isFrozen(PRODUCTION_LABELS) =`, Object.isFrozen(PRODUCTION_LABELS), "· Object.isFrozen(L) =", Object.isFrozen(L));
say(`  isNamedProduction("<mark-journal> (at most 32768 marks)") =`, isNamedProduction("<mark-journal> (at most 32768 marks)"));
say(`  L.length = ${L.length} · PRODUCTION_LABELS rows = ${Object.keys(PRODUCTION_LABELS).length}`);

say("\n── D. reachability — per valid-input family, the FIRST region whose counter meets its cap");
const wl = lowerings.wasm;
const ex = wl.internals.instance.exports;
const mem = wl.memory();
const W = (f) => new Int32Array(mem.buffer)[RESULT[f] >> 2];
const zero = () => {
    const u8 = new Uint8Array(mem.buffer);
    u8.fill(0, lay.C_BASE, lay.C_BASE + lay.C_CAP * lay.C_STRIDE);
    u8.fill(0, lay.P_BASE, lay.P_BASE + lay.P_CAP * lay.P_STRIDE);
    u8.fill(0, lay.D_BASE, lay.D_BASE + lay.D_CAP * lay.D_STRIDE);
    u8.fill(0, lay.VSTACK_BASE, lay.VSTACK_BASE + lay.VSTACK_CAP * 4);
    u8.fill(0, lay.EXPSNAP_BASE, lay.EXPSNAP_BASE + lay.EXPSNAP_CAP * lay.EXPSNAP_STRIDE);
};
const peak = (base, cap, stride) => {
    const u32 = new Uint32Array(mem.buffer);
    for (let j = cap - 1; j >= 0; j--) {
        const b = (base + j * stride) >> 2;
        for (let w = 0; w < stride / 4; w++) if (u32[b + w] !== 0) return j + 1;
    }
    return 0;
};
const measure = (prod, s) => {
    zero();
    ex.reset();
    let threw = null;
    try { wl.parse(prod, s); } catch (e) { threw = e.message; }
    const r = {
        len: s.length, ovf: W("ovf"), markn: W("markn"), recn: W("recn"), dlenFinal: W("dlen"),
        clenFinal: W("clen"), plenFinal: W("plen"), arenaFinal: W("arena"),
        arenaHigh: ex.highWater(), ok: W("ok"),
        Cpeak: peak(lay.C_BASE, lay.C_CAP, lay.C_STRIDE), Ppeak: peak(lay.P_BASE, lay.P_CAP, lay.P_STRIDE),
        Dpeak: peak(lay.D_BASE, lay.D_CAP, lay.D_STRIDE), vstackPeak: peak(lay.VSTACK_BASE, lay.VSTACK_CAP, 4),
        expsnapPeak: peak(lay.EXPSNAP_BASE, lay.EXPSNAP_CAP, lay.EXPSNAP_STRIDE), threw,
    };
    return r;
};
const FAMILIES = {
    "stylesheet rules a{color:red}×n": ["P:stylesheet", (n) => "a{color:red}".repeat(n)],
    "stylesheet empty rules a{}×n": ["P:stylesheet", (n) => "a{}".repeat(n)],
    "one rule, n declarations": ["P:stylesheet", (n) => "a{" + "c:r;".repeat(n) + "}"],
    "one declaration, n numbers": ["P:stylesheet", (n) => "a{c:" + "1 ".repeat(n) + "}"],
    "one declaration, n idents": ["P:stylesheet", (n) => "a{c:" + "x ".repeat(n) + "}"],
    "one declaration, n nested parens": ["P:stylesheet", (n) => "a{c:" + "(".repeat(n) + ")".repeat(n) + "}"],
    "long ident selector": ["P:stylesheet", (n) => "a".repeat(n) + "{}"],
    "leading whitespace": ["P:stylesheet", (n) => " ".repeat(n) + "a{}"],
    "n malformed rules a{c}": ["P:stylesheet", (n) => "a{c}".repeat(n)],
    "n malformed decls a{c;c;…}": ["P:stylesheet", (n) => "a{" + "c;".repeat(n) + "}"],
    "linear() n stops": ["P:timing-function", (n) => "linear(" + "0, ".repeat(n) + "1)"],
    "linear() n stops with one %": ["P:timing-function", (n) => "linear(" + "0 1%, ".repeat(n) + "1)"],
    "linear() n stops with two %": ["P:timing-function", (n) => "linear(" + "0 1% 2%, ".repeat(n) + "1)"],
    "linear() n stops, ws before comma": ["P:timing-function", (n) => "linear(" + "0 , ".repeat(n) + "1)"],
    "linear() n stops, comment per stop": ["P:timing-function", (n) => "linear(" + "0/**/, ".repeat(n) + "1)"],
    "stylesheet rules with ws": ["P:stylesheet", (n) => "a { color : red ; } ".repeat(n)],
    "steps/cubic one-shot": ["P:timing-function", () => "cubic-bezier(0.1, 0.2, 0.3, 0.4)"],
    "color one-shot": ["P:color", () => "rgb(1 2 3 / 0.5)"],
    "color n-arg juxtaposition rgb(1 1 1 …)": ["P:color", (n) => "rgb(" + "1 ".repeat(n) + ")"],
    "var nested at depth 64 (one-shot)": ["P:color", () => "var(" + "(".repeat(63) + ")".repeat(63) + ")"],
};
const firstRegion = (r) => {
    const hits = [];
    if (r.len > lay.INPUT_CAP) hits.push("input");
    if (r.markn >= lay.MARK_CAP) hits.push("marks");
    if (r.Cpeak >= lay.C_CAP) hits.push("C");
    if (r.Ppeak >= lay.P_CAP) hits.push("P");
    if (r.Dpeak >= lay.D_CAP) hits.push("D");
    if (r.recn >= lay.REC_CAP) hits.push("recoveries");
    if (r.vstackPeak >= lay.VSTACK_CAP) hits.push("vstack");
    if (r.expsnapPeak >= lay.EXPSNAP_CAP) hits.push("expsnap");
    if (r.arenaHigh >= lay.ARENA_CAP) hits.push("arena");
    return hits;
};
const summary = {};
for (const [name, [prod, gen]] of Object.entries(FAMILIES)) {
    if (gen.length === 0) {
        const r = measure(prod, gen());
        say(`  ${name}: ${JSON.stringify(r)}`);
        summary[name] = { oneShot: r };
        continue;
    }
    // binary search the smallest n at which ovf fires or the input cap is exceeded
    let lo = 1, hi = 1;
    const fires = (n) => { const r = measure(prod, gen(n)); return { r, f: r.ovf === 1 || r.threw !== null }; };
    while (hi < 4_000_000 && !fires(hi).f) { lo = hi; hi *= 2; }
    if (!fires(hi).f) { say(`  ${name}: never fires up to n=${hi}`); continue; }
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (fires(mid).f) hi = mid; else lo = mid; }
    const before = measure(prod, gen(lo)), at = measure(prod, gen(hi));
    say(`  ${name}:`);
    say(`     n=${lo} (last clean) ${JSON.stringify(before)}`);
    say(`     n=${hi} (FIRES)      ${JSON.stringify(at)} → regions at cap: [${firstRegion(at).join(", ")}]`);
    summary[name] = { lastClean: { n: lo, ...before }, fires: { n: hi, ...at }, regionsAtCap: firstRegion(at) };
}
say("\n── E. JS-side counters on the ESC-e1 witness (same quantity?)");
{
    const jl = lowerings.js;
    for (const n of [8190, 8191]) {
        const s = "a{color:red}".repeat(n);
        const p = jl.parse("P:stylesheet", s);
        const w = measure("P:stylesheet", s);
        say(`  n=${n} js marks=${p.marks.length} recoveries=${p.recoveries.length} C=${p.C.length} P=${p.P.length} D=${p.D.length} | wasm markn=${w.markn} recn=${w.recn} Cfinal=${W("clen")} Pfinal=${W("plen")} ovf=${w.ovf}`);
    }
}
import { writeFileSync } from "node:fs";
writeFileSync(process.argv[2] ?? "/dev/null", JSON.stringify({ servedModel: "claude-fable-5-1", schema: "x-p-w3.f.capacity-reachability/1", generatedBy: "docs/tranches/X/parse-that/evidence/W3/capacity-reachability-2026-09-18.mjs", subject: "<p2> ab6d694 · typescript/src/css at HEAD, unmodified", peakNote: "C/P/D/vstack/expsnap peaks are memory-scan LOWER BOUNDS; markn/recn/arenaHigh/*Final are exact", regions: REGIONS, families: summary }, null, 2) + "\n");
