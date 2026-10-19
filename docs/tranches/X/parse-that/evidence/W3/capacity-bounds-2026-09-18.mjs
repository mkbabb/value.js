// SERVED MODEL: claude-fable-5-1
//
// X.P.W3.f — THE CAPACITY BOUNDS, measured AFTER the cure (2026-09-18, round 4). Banked BESIDE the
// sealed evidence and beside this unit's own round-3 census (E-3): nothing here moves a committed
// artefact.
//
//   node docs/tranches/X/parse-that/evidence/W3/capacity-bounds-2026-09-18.mjs <out.json>
//
// Reads Θ and the class-3 proof off `bounds.mjs`, then drives every witness family of the capacity
// suite through BOTH public surfaces — the class-1 at/past pairs, ESC-e1's pair, §0q's ruled 1 MB
// window witness, the three families that TRAPPED the module before the cure, and the banked
// census's families regenerated at the window — recording G-5's canonical six-tuple per lowering,
// the class-2 peaks, the Wasm's class-3 readings, and the shield ledger before and after.
import path from "node:path";
import { writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const P2 = "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/src/css";
const { SHIELD, loadPublicSurfaces } = await import(path.join(P2, "entry.mjs"));
const { lowerings } = await import(path.join(P2, "harness-adapter.mjs"));
const b = await import(path.join(P2, "bounds.mjs"));
const lay = await import(path.join(P2, "lowering-wasm/layout.mjs"));
const { RESULT } = await import(path.join(P2, "lowering-wasm/runtime.mjs"));
const { L } = await import(path.join(P2, "algebra/tables.mjs"));
const { promoteLabel, PRODUCTION_LABELS } = await import(path.join(P2, "diagnostics.mjs"));

const surfaces = await loadPublicSurfaces();
const say = (...a) => console.log(...a);
say("SERVED MODEL: claude-fable-5-1 · X.P.W3.f capacity-bounds probe (post-cure) · 2026-09-18");
const shieldBefore = SHIELD.caught;

say("── A. Θ, the nine capacities, the class-3 proof");
say("  THETA", JSON.stringify(b.THETA));
say("  CLASS3_PROOF", JSON.stringify(b.CLASS3_PROOF));
for (const [k, r] of Object.entries(b.CLASS3_CEILINGS.perEntry)) say(`  ceiling ${k}: rate ${r.rate.toFixed(2)} B/code unit · fixed ${r.fixed} · mw ${r.mw} · cells ${r.cells} · expects ${r.exp}`);
say(`  layout CAPs: ${JSON.stringify({ INPUT_CAP: lay.INPUT_CAP, MARK_CAP: lay.MARK_CAP, REC_CAP: lay.REC_CAP, D_CAP: lay.D_CAP, C_CAP: lay.C_CAP, P_CAP: lay.P_CAP, VSTACK_CAP: lay.VSTACK_CAP, ARENA_CAP: lay.ARENA_CAP, EXPSNAP_CAP: lay.EXPSNAP_CAP })}`);

say("\n── B. the label surface, asked mechanically");
const labels = {};
for (const row of b.CAPACITY_REGIONS) {
    const label = b.CAPACITY_LABELS[row.region];
    labels[row.region] = { label, index: L.indexOf(label), production: promoteLabel(label) };
    say(`  ${row.region.padEnd(11)} cls ${row.cls} · L[${L.indexOf(label)}] = ${JSON.stringify(label)} → ${JSON.stringify(promoteLabel(label))}`);
}
say(`  L.length = ${L.length} · PRODUCTION_LABELS rows = ${Object.keys(PRODUCTION_LABELS).length} · "<string>" at L[${L.indexOf("<string>")}]`);

say("\n── C. the witnesses, both lowerings, G-5's canonical six-tuple");
const KEYS = ["ok", "code", "start", "end", "expected", "actual"];
const canonical = (r) => {
    const i = r && r.ok === false ? r.diagnostics?.[0] ?? null : null;
    return JSON.stringify({ ok: r?.ok ?? null, code: i ? i.code ?? null : null, start: i ? i.start ?? null : null, end: i ? i.end ?? null : null, expected: i ? [...i.expected] : null, actual: i ? (i.actual === undefined ? null : i.actual) : null }, KEYS);
};
const canonicalAll = (r) => (r && r.ok === false ? JSON.stringify(r.diagnostics.map((i) => ({ ok: false, code: i.code, start: i.start, end: i.end, expected: [...i.expected], actual: i.actual ?? null }))) : canonical(r));
const ENTRY = { "P:color": "parseCssColor", "P:timing-function": "parseTimingFunction", "P:stylesheet": "parseStylesheet" };
const wl = lowerings.wasm;
const ex = wl.internals.instance.exports;
const mem = wl.memory();
const W = (f) => new Int32Array(mem.buffer)[RESULT[f] >> 2];
const zero = () => {
    const u8 = new Uint8Array(mem.buffer);
    u8.fill(0, lay.VSTACK_BASE, lay.VSTACK_BASE + lay.VSTACK_CAP * 4);
    u8.fill(0, lay.EXPSNAP_BASE, lay.EXPSNAP_BASE + lay.EXPSNAP_CAP * lay.EXPSNAP_STRIDE);
};
const peak = (base, cap, stride) => {
    const u32 = new Uint32Array(mem.buffer);
    for (let j = cap - 1; j >= 0; j--) {
        const p = (base + j * stride) >> 2;
        for (let w = 0; w < stride / 4; w++) if (u32[p + w] !== 0) return j + 1;
    }
    return 0;
};
const I = b.INPUT_BOUND;
const fit = (overhead, unit) => Math.max(1, Math.floor((I - overhead) / unit));
const rows = [
    ["input AT", "P:stylesheet", b.witnessAtCapacity("input", I)],
    ["input PAST", "P:stylesheet", b.witnessAtCapacity("input", I + 1)],
    ["marks AT (a{}×16381)", "P:stylesheet", b.witnessAtCapacity("marks", 16381)],
    ["marks PAST (a{}×16382)", "P:stylesheet", b.witnessAtCapacity("marks", 16382)],
    ["recoveries+D AT (a{c}×4096)", "P:stylesheet", b.witnessAtCapacity("recoveries", 4096)],
    ["recoveries+D PAST (a{c}×4097)", "P:stylesheet", b.witnessAtCapacity("recoveries", 4097)],
    ["ESC-e1 a{color:red}×8190", "P:stylesheet", "a{color:red}".repeat(8190)],
    ["ESC-e1 a{color:red}×8191", "P:stylesheet", "a{color:red}".repeat(8191)],
    ["§0q ruled witness a×(INPUT_CAP−1)+{}", "P:stylesheet", b.witnessAtCapacity("input", lay.INPUT_CAP + 1)],
    ["trap family a{}×40000", "P:stylesheet", "a{}".repeat(40000)],
    ["trap family linear(0, )×70000", "P:timing-function", `linear(${"0, ".repeat(70000)}1)`],
    ["trap family ;×70000", "P:stylesheet", ";".repeat(70000)],
    ["census a{color:red}×n @window", "P:stylesheet", "a{color:red}".repeat(fit(0, 12))],
    ["census a{}×n @window", "P:stylesheet", "a{}".repeat(fit(0, 3))],
    ["census a{c:r;×n} @window", "P:stylesheet", `a{${"c:r;".repeat(fit(3, 4))}}`],
    ["census a{c}×n @window", "P:stylesheet", "a{c}".repeat(fit(0, 4))],
    ["census linear(0, ×n) @window", "P:timing-function", `linear(${"0, ".repeat(fit(9, 3))}1)`],
    ["census linear(0 1% 2%, ×n) @window", "P:timing-function", `linear(${"0 1% 2%, ".repeat(fit(9, 9))}1)`],
    ["census a { color : red ; } ×n @window", "P:stylesheet", "a { color : red ; } ".repeat(fit(0, 20))],
    ["census ;×n @window (1 cell per code unit)", "P:stylesheet", b.witnessAtCapacity("vstack", I)],
    ["census a,×n{} @window", "P:stylesheet", `a${",".repeat(fit(3, 1))}{}`],
    ["census var nested at depth 64", "P:color", b.witnessAtDepth(64)],
];
const out = [];
let identical = 0;
for (const [name, prod, src] of rows) {
    const before = SHIELD.caught;
    const js = surfaces.js[ENTRY[prod]](src);
    zero();
    ex.reset();
    const wasm = surfaces.wasm[ENTRY[prod]](src);
    // The canonical strings carry `actual` = the whole source (up to 1 MB); the record banks their
    // sha256 + length + head, the identity having been decided over the FULL strings in-process.
    const digest = (s) => ({ sha256: createHash("sha256").update(s).digest("hex"), length: s.length, head: s.slice(0, 240) });
    const rec = {
        name, prod, len: src.length,
        js: digest(canonical(js)), wasm: digest(canonical(wasm)), jsAll: digest(canonicalAll(js)), wasmAll: digest(canonicalAll(wasm)),
        sixTupleIdentical: canonical(js) === canonical(wasm), allIssuesIdentical: canonicalAll(js) === canonicalAll(wasm),
        diagnostics: js.ok ? 0 : js.diagnostics.length,
        shieldDelta: SHIELD.caught - before,
        wasmReadings: { ovf: W("ovf"), markn: W("markn"), recn: W("recn"), dlen: W("dlen"), arenaHigh: ex.highWater(), cHigh: ex.cHighWater(), pHigh: ex.pHighWater(), vstackPeak: peak(lay.VSTACK_BASE, lay.VSTACK_CAP, 4), expsnapPeak: peak(lay.EXPSNAP_BASE, lay.EXPSNAP_CAP, lay.EXPSNAP_STRIDE) },
    };
    if (rec.sixTupleIdentical && rec.allIssuesIdentical) identical++;
    const short = (r) => {
        if (r.ok) return "ok:true";
        const labels = r.diagnostics.map((d) => d.expected[0]);
        const shown = labels.slice(0, 3).join(" | ") + (labels.length > 3 ? ` | …(+${labels.length - 3})` : "");
        return `ok:false ${r.diagnostics[0].code} ×${r.diagnostics.length} [${shown}]`;
    };
    say(`  ${name.padEnd(42)} len=${String(src.length).padStart(7)} js=${short(js)} | wasm=${short(wasm)} | identical=${rec.sixTupleIdentical && rec.allIssuesIdentical} SHIELD+${rec.shieldDelta} · wasm vstack ${rec.wasmReadings.vstackPeak} arena ${rec.wasmReadings.arenaHigh} expsnap ${rec.wasmReadings.expsnapPeak} C^ ${rec.wasmReadings.cHigh} P^ ${rec.wasmReadings.pHigh}`);
    out.push(rec);
}
say(`\n  rows ${rows.length} · identical across both lowerings ${identical} · SHIELD.caught ${shieldBefore} → ${SHIELD.caught} (delta ${SHIELD.caught - shieldBefore})`);
say("  faults:", JSON.stringify(SHIELD.faults().map((f) => f.message)));

writeFileSync(process.argv[2] ?? "/dev/null", JSON.stringify({
    servedModel: "claude-fable-5-1", schema: "x-p-w3.f.capacity-bounds/1",
    generatedBy: "docs/tranches/X/parse-that/evidence/W3/capacity-bounds-2026-09-18.mjs",
    subject: "<p2> typescript/src/css after the X.P.W3.f cure (round 4), rebuilt with `node src/css/build.mjs`",
    theta: b.THETA, class3Proof: b.CLASS3_PROOF, ceilings: b.CLASS3_CEILINGS, labels,
    labelSurface: { L: L.length, rows: Object.keys(PRODUCTION_LABELS).length, stringAt: L.indexOf("<string>") },
    witnesses: out, identical, shield: { before: shieldBefore, after: SHIELD.caught, faults: SHIELD.faults() },
}, null, 2) + "\n");
