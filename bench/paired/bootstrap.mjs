// SERVED MODEL: claude-opus-5-5
//
// X.P.W8.lg1 — THE BOOTSTRAP READER of the L-G1 gate under COHESION §0ev.1. It reads the RAW per-round samples a
// paired cell banks (bench.mjs's node cell `raw`, or browser.mjs's record `cells[].raw`) and recomputes, per cell:
//   ratio    the per-round paired ratio arm/retired, round i against round i (the instrument interleaves the arms and
//            rotates their order every round, so host load is common-mode across a pair)
//   median   the median of those per-round ratios (must equal the instrument's own `ratio.paired`; checked)
//   bound    the 95 % percentile-bootstrap interval of that median: B ≥ 10,000 resamples with replacement of the
//            rounds, a seeded PRNG (mulberry32; seed = SEED ^ fnv1a(cell key), so every read is reproducible);
//            `ub` = the 97.5th percentile (the upper end of the two-sided 95 % interval — the stricter reading),
//            `ub95` = the 95th percentile (the one-sided bound) beside it
// Verdict per cell: GREEN  median < 1.0 AND ub < 1.0
//                   STRADDLE  lb < 1.0 ≤ ub  (re-read at more rounds, ≤ 101; a straddle at 101 is RED)
//                   RED  otherwise (the whole interval at or above 1.0, or median ≥ 1.0)
// The reader never times anything; it only reads banked bytes.
//   node bench/paired/bootstrap.mjs [--arm product] [--B 10000] [--seed 20261009] [--out summary.json] <record.json>...
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const fnv1a = (str) => { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; };
const mulberry32 = (a) => () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const quantile = (sorted, q) => { const i = (sorted.length - 1) * q, lo = Math.floor(i), hi = Math.ceil(i); return sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo); };

/** The per-round ratios' median and its percentile-bootstrap bounds. */
export function bootstrapMedian(ratios, { B = 10000, seed = 20261009 } = {}) {
    if (B < 10000) throw new Error("B ≥ 10,000 resamples (§0ev.1 brief)");
    const n = ratios.length, rnd = mulberry32(seed), meds = new Float64Array(B), buf = new Array(n);
    for (let b = 0; b < B; b++) { for (let i = 0; i < n; i++) buf[i] = ratios[(rnd() * n) | 0]; meds[b] = median(buf); }
    const s = Array.from(meds).sort((a, b) => a - b);
    return { n, median: median(ratios), lb: quantile(s, 0.025), ub: quantile(s, 0.975), ub95: quantile(s, 0.95), B, seed };
}

export const verdictOf = (r) => (r.median < 1 && r.ub < 1 ? "GREEN" : r.lb < 1 && r.ub >= 1 ? "STRADDLE" : "RED");

/** Every cell of a banked record (a node cell JSON, or a browser record), with its raw samples. */
export function cellsOf(file) {
    const j = JSON.parse(readFileSync(file, "utf8"));
    const base = path.basename(file);
    if (Array.isArray(j.cells)) return j.cells.map((c, i) => ({ file: base, idx: i, engine: c.engine, entry: c.entry, class: c.class, rep: c.rep, attempt: c.attempt,
        rounds: j.rounds, k: c.k, spread: c.spread, instrumentPaired: c.ratio, raw: c.raw, load: [c.uptimeBefore, c.uptimeAfter] }));
    return [{ file: base, idx: 0, engine: "node", entry: j.entry, class: j.class, rep: j.rev ? 1 : 0, attempt: 0, rounds: j.rounds, k: j.k, spread: j.retiredSpread,
        instrumentPaired: j.ratio, raw: j.raw, load: [j.uptimeBefore, j.uptimeAfter] }];
}

export function read(files, { arm = "product", B = 10000, seed = 20261009 } = {}) {
    const out = [];
    for (const f of files) for (const c of cellsOf(f)) {
        if (!c.raw) throw new Error(`${c.file}#${c.idx}: no raw per-round samples`);
        const a = c.raw[arm], r = c.raw.retired;
        if (!a || a.length !== r.length || a.length !== c.rounds) throw new Error(`${c.file}#${c.idx}: raw rounds mismatch`);
        const ratios = a.map((x, i) => x / r[i]);
        const key = `${c.engine}|${c.class}|${c.entry}|${c.file}|${c.idx}`;
        const bs = bootstrapMedian(ratios, { B, seed: (seed ^ fnv1a(key)) >>> 0 });
        const instr = c.instrumentPaired?.[arm]?.paired;
        const fix = (x) => +x.toFixed(4);
        out.push({ key, engine: c.engine, entry: c.entry, class: c.class, file: c.file, idx: c.idx, rep: c.rep, attempt: c.attempt, rounds: c.rounds, k: c.k,
            spread: c.spread, load: c.load, median: fix(bs.median), lb: fix(bs.lb), ub: fix(bs.ub), ub95: fix(bs.ub95), B, seed: bs.seed,
            instrumentPaired: instr, instrumentAgrees: instr === undefined ? null : Math.abs(+bs.median.toFixed(3) - instr) < 0.0015,
            below1: ratios.filter((x) => x < 1).length, verdict: verdictOf(bs) });
    }
    return out;
}

/** The gate, per engine × class × entry, read, per rep, at that rep's LARGEST banked round count (a straddling read's re-read
 *  supersedes its 31-round read). Per rep (= read ×2): `ofRecord` = attempt 0, the instrument's first, unselected read
 *  at that position (browser.mjs re-runs a position whose retired spread is ≥ 1.6×; those attempts are reported, never
 *  chosen among); `strict` = every banked attempt GREEN. A cell is GREEN when both reps' ofRecord reads are GREEN. */
export function gate(rows) {
    const by = new Map();
    for (const r of rows) { const k = `${r.engine}|${r.class}|${r.entry}`; (by.get(k) ?? by.set(k, []).get(k)).push(r); }
    const out = [];
    for (const [k, rs] of by) {
        const n = Math.max(...rs.map((r) => r.rounds));
        const reps = [0, 1].map((rep) => { const mine = rs.filter((r) => r.rep === rep), m = Math.max(...mine.map((r) => r.rounds));
            const a = mine.filter((r) => r.rounds === m), rec = a.find((r) => r.attempt === 0);
            return { rep, rounds: m, ofRecord: rec ? { median: rec.median, ub: rec.ub, verdict: rec.verdict, file: rec.file } : null,
                attempts: a.length, strict: a.length > 0 && a.every((r) => r.verdict === "GREEN") }; });
        const ok = reps.every((r) => r.ofRecord?.verdict === "GREEN");
        out.push({ cell: k, rounds: n, reps, verdict: ok ? "GREEN" : reps.some((r) => r.ofRecord?.verdict !== "GREEN" && r.rounds >= 101) ? "RED" : "RE-READ", strictAllAttempts: reps.every((r) => r.strict) });
    }
    return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2), opt = { arm: "product", B: 10000, seed: 20261009 }, files = [];
    let OUT = null;
    for (let i = 0; i < args.length; i++) {
        if (args[i] === "--arm") opt.arm = args[++i];
        else if (args[i] === "--B") opt.B = Number(args[++i]);
        else if (args[i] === "--seed") opt.seed = Number(args[++i]);
        else if (args[i] === "--out") OUT = args[++i];
        else files.push(args[i]);
    }
    const rows = read(files, opt);
    for (const r of rows) console.log(`${r.engine.padEnd(8)} ${r.class.padEnd(8)} ${r.entry.padEnd(22)} rep${r.rep}a${r.attempt} n=${r.rounds} ` +
        `median ${r.median.toFixed(3)} [${r.lb.toFixed(3)}, ${r.ub.toFixed(3)}] ub95 ${r.ub95.toFixed(3)} ${r.verdict}` +
        `${r.instrumentAgrees === false ? " INSTRUMENT-DISAGREES" : ""} | ${r.file}`);
    const g = gate(rows);
    console.log("\nGATE (largest banked rounds per cell; ofRecord = attempt 0 per rep; strict = every attempt GREEN)");
    for (const c of g) console.log(`${c.cell.padEnd(42)} ` + c.reps.map((r) => r.ofRecord
        ? `rep${r.rep} n=${r.rounds} ${r.ofRecord.median.toFixed(3)} ub ${r.ofRecord.ub.toFixed(3)} ${r.ofRecord.verdict}` : `rep${r.rep} UNREAD`).join(" · ") +
        ` → ${c.verdict}${c.strictAllAttempts ? "" : " (strict: not every attempt GREEN)"}`);
    if (OUT) writeFileSync(OUT, JSON.stringify({ reader: "bench/paired/bootstrap.mjs (X.P.W8.lg1)", ...opt, rows, gate: g }, null, 1) + "\n");
}
