// SERVED MODEL: claude-opus-5-5
// X.P.W7 research · judge — EQUIVALENCE, re-checked by the arbiter for every route's candidate arm:
//   (1) entry level: 7 entries × every corpus source, candidate vs stock (isDeepStrictEqual on the whole
//       ParseResult; a throw compares by message); each mismatch is classed by whether its source holds a
//       code unit ≥ 128 (the F-b-4 class), and agreement with the retired parser is counted as context;
//   (2) reader level: every exported reader of src/css/bbnf/sheet.ts + splitTopLevel ×3, candidate vs stock.
//   node judge/harness/equiv.mjs arm[,arm…]
import { isDeepStrictEqual } from "node:util";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, INPUTS, RESULTS, arm, uptime } from "./common.mjs";

const ARMS = (process.argv[2] ?? "tsc-proto-pos,tsc-emit-pos,aot-text,fx-final").split(",");
const call = (fn, ...a) => { try { return fn(...a); } catch (e) { return { threw: String(e?.message ?? e) }; } };
const nonAscii = (s) => /[^\x00-\x7f]/.test(s);
const t0 = uptime();
const S = await arm("stock"), R = await arm("retired");
const stockOut = {}, retOut = {};
for (const e of ENTRIES) { stockOut[e] = INPUTS.map((s) => call(S.fns[e], s)); retOut[e] = INPUTS.map((s) => call(R.fns[e], s)); }
const readers = Object.keys(S.m.sheet).filter((k) => typeof S.m.sheet[k] === "function");
const readerCalls = [];
for (const r of readers) {
    if (r === "timelineArgs") { for (const kind of ["scroll", "view"]) readerCalls.push([`timelineArgs(${kind})`, (M) => (s) => M.sheet[r](kind, s)]); continue; }
    readerCalls.push([r, (M) => M.sheet[r]]);
}
for (const sep of [",", ";", "space"]) readerCalls.push([`splitTopLevel(${sep})`, (M) => (s) => M.splitTopLevel(s, sep)]);
const stockReader = Object.fromEntries(readerCalls.map(([label, f]) => { const fn = f(S.m); return [label, INPUTS.map((s) => call(fn, s))]; }));
const report = { corpus: INPUTS.length, uptimeStart: t0, readers: readerCalls.map(([l]) => l), arms: {} };
for (const name of ARMS) {
    const C = await arm(name);
    const row = { entries: {}, readers: {}, totalEntryMismatches: 0, entryMismatchesAsciiOnly: 0, totalReaderMismatches: 0, readerMismatchesAsciiOnly: 0 };
    for (const e of ENTRIES) {
        let m = 0, ascii = 0, candRet = 0, stockRet = 0, candThrows = 0; const samples = [];
        INPUTS.forEach((s, i) => {
            const b = call(C.fns[e], s);
            if (b && b.threw) candThrows++;
            if (isDeepStrictEqual(stockOut[e][i], retOut[e][i])) stockRet++;
            if (isDeepStrictEqual(b, retOut[e][i])) candRet++;
            if (!isDeepStrictEqual(stockOut[e][i], b)) {
                m++; if (!nonAscii(s)) ascii++;
                if (samples.length < 6) samples.push({ s, stock: stockOut[e][i], cand: b, retired: retOut[e][i] });
            }
        });
        row.entries[e] = { mismatches: m, mismatchesAsciiOnlySources: ascii, candThrows, agreeRetired: { stock: stockRet, cand: candRet }, samples };
        row.totalEntryMismatches += m; row.entryMismatchesAsciiOnly += ascii;
    }
    for (const [label, f] of readerCalls) {
        const fn = f(C.m); let m = 0, ascii = 0; const samples = [];
        INPUTS.forEach((s, i) => { const b = call(fn, s); if (!isDeepStrictEqual(stockReader[label][i], b)) { m++; if (!nonAscii(s)) ascii++; if (samples.length < 3) samples.push({ s, stock: stockReader[label][i], cand: b }); } });
        row.readers[label] = { mismatches: m, mismatchesAsciiOnlySources: ascii, samples };
        row.totalReaderMismatches += m; row.readerMismatchesAsciiOnly += ascii;
    }
    report.arms[name] = row;
    console.log(`${name.padEnd(16)} entry mismatches ${row.totalEntryMismatches} (ASCII-only sources ${row.entryMismatchesAsciiOnly}) · reader mismatches ${row.totalReaderMismatches} (ASCII-only ${row.readerMismatchesAsciiOnly}) · ` +
        ENTRIES.map((e) => `${e.replace(/^parse/, "")} ${row.entries[e].mismatches}`).join(" "));
}
report.uptimeEnd = uptime();
const file = path.join(RESULTS, `equiv-${ARMS.join("+")}.json`);
writeFileSync(file, JSON.stringify(report, null, 1));
console.log(report.uptimeStart, "\n", report.uptimeEnd, "→", file);
