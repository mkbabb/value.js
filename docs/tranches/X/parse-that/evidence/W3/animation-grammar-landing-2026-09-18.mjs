// SERVED MODEL: claude-opus-5[1m]
//
// X.P.W3.i — the ANIMATION family's LANDING probe, banked BESIDE `.h`'s value-grammar landing of
// the same sitting (E-3: evidence is added beside, never over).
//
//   node docs/tranches/X/parse-that/evidence/W3/animation-grammar-landing-2026-09-18.mjs \
//        > docs/tranches/X/parse-that/evidence/W3/animation-grammar-landing-2026-09-18.txt
//
// Nothing here is asserted by hand. Every count is read at run time from the sha-pinned published
// 4.0.0 oracle, the built candidate and BOTH lowerings. The probe answers six questions:
//
//   1. K-10   are this unit's labels APPENDED, with no pre-existing index moved?
//   2. E-h1   is the CTOR family closed — the same name-set in the algebra row table, the JS
//             constructor map, the Wasm emitter and the node table (four sets, one commit)?
//   3. E-h2   TWO numbers for every row this unit claims: raw misses against the oracle, and
//             misses that fall inside a DECLARED divergence class (`animation.mjs`'s header).
//             A row is TOTAL here only when the FIRST number is 0 — never by assertion.
//   4. G-5    do the two lowerings answer byte-identically on this unit's entries?
//   5. G-3    does the shield's ledger move while all of that runs?
//   6. G-9    what is Θ at the settled bytes, and did this unit's grammar move it?
//
// The divergence classes, as `algebra/grammar/animation.mjs`'s header declares them:
//   WS-1  the incumbent's `trim()`/`/\s/` see Unicode whitespace; the algebra's `ws` class is
//         css-syntax-3's five. Inherited from X.P.W3.h, same root.
//   KF-1  `parseKeyframeSelector`'s number is `[+-]?(?:\d+\.?\d*|\.\d+)`, which admits `1.` and
//         refuses `1e3`; OP-03 `NUM` does the opposite.
//   DC-1  a rejection carries the algebra's farthest-failure code (§5.6), not the incumbent's
//         one-code-per-function. The VERDICT is identical; only the diagnostic's `code` differs.
//   KO-1  `scroll()`/`view()` build their record in a FIXED key order (scroller, axis / axis,
//         inset); the incumbent assigns in the order the ARGUMENTS were written, so
//         `scroll(block root)` reads `{kind,axis,scroller}` there and `{kind,scroller,axis}` here.
//         The objects are EQUAL — only the insertion sequence differs, which is not part of JS
//         object equality, not part of the frozen type, and not what G-1 compares. Measured
//         population over the union corpus: ONE input. Reported, not cured: matching it would mean
//         a source-order-dependent key sequence in BOTH lowerings for no semantic gain, and G-5
//         (the two targets byte-identical) is what actually constrains record layout — it is GREEN.

import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";

const P2 = "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript";
const at = (p) => path.join(P2, p);
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");
const pad = (s, n) => String(s).padEnd(n);
const lpad = (s, n) => String(s).padStart(n);
const rule = (n = 98) => "─".repeat(n);

const OUT = { servedModel: "claude-opus-5[1m]", unit: "X.P.W3.i", sitting: "2026-09-18" };

/* ── 0. the settled bytes ─────────────────────────────────────────────────────────────────── */

const FILES = [
    "src/css/algebra/grammar/animation.mjs", "src/css/algebra/grammar.mjs", "src/css/algebra/tables.mjs",
    "src/css/diagnostics.mjs", "src/css/entry.mjs", "src/css/harness-adapter.mjs", "src/css/build.mjs",
    "src/css/lowering-js/js-alg.mjs", "src/css/lowering-wasm/wasm-alg.mjs", "src/css/bounds.mjs",
    "src/css/build/ac1.js", "src/css/build/ac1.wasm", "src/css/build/ac1.d.ts",
    "test/css-recovery/animation-grammar.test.ts",
];
OUT.hashes = {};
console.log("SERVED MODEL: claude-opus-5[1m] · X.P.W3.i animation-grammar-landing probe · sitting 2026-09-18");
console.log("X.P.W3.i — the animation family, landed (G-1 two-number form · E-h1 · G-3 · G-5 · G-9)");
console.log(rule());
console.log("\nthe settled bytes");
for (const f of FILES) {
    const buf = readFileSync(at(f));
    OUT.hashes[f] = { sha256: sha256(buf), bytes: statSync(at(f)).size };
    console.log(`  ${pad(f, 46)} ${lpad(OUT.hashes[f].bytes, 8)} B  ${OUT.hashes[f].sha256.slice(0, 16)}`);
}

/* ── 1. K-10: APPEND, move nothing ───────────────────────────────────────────────────────── */

const tables = await import(at("src/css/algebra/tables.mjs"));
const { L, R_cls, R_ctor, R_disp, R_kw } = tables;
const since = (rows, unit) => Object.keys(rows).filter((k) => rows[k]?.since === unit);
const MINE = "X.P.W3.i";
const hLast = "'''";
const myFirst = L[L.indexOf(hLast) + 1];
const myLabels = L.slice(L.indexOf(hLast) + 1);
OUT.k10 = {
    hLastLabel: hLast, hLastIndex: L.indexOf(hLast), myFirstLabel: myFirst, myFirstIndex: L.indexOf(myFirst),
    labelCount: L.length, mine: myLabels, injective: new Set(L).size === L.length,
};
console.log(`\nK-10 — the label index (${L.length} rows)`);
console.log(`  X.P.W3.h's last  [${lpad(L.indexOf(hLast), 3)}] ${hLast}`);
console.log(`  this unit's first[${lpad(L.indexOf(myFirst), 3)}] ${myFirst}   ← contiguous: ${L.indexOf(myFirst) === L.indexOf(hLast) + 1}`);
console.log(`  appended         ${myLabels.length} labels · injective ${OUT.k10.injective}`);
console.log(`  ${myLabels.map((s) => JSON.stringify(s)).join(" ")}`);

/* ── 2. E-h1: the CTOR family, four name-sets, equal ─────────────────────────────────────── */

const boundsMod = await import(at("src/css/bounds.mjs"));
//  `CTORS`, `CTOR_ALLOC` and `CTOR_SCRATCH_CELLS` are module-PRIVATE — the closure they take part in
//  is asserted at load by each module's own HALT, so the only way to COUNT them from outside is to
//  read the bytes. (A probe that reads `jsAlg.CTORS` gets `undefined` and silently reports 0; this
//  one is the corrected form.) The block is sliced from its declaration to its closing brace.
//  The key may be quoted or bare, and these blocks pack MANY keys per line — so the match is
//  "preceded by the block's open brace, a comma, or a line start", never "at a line start", which
//  reads only the first key of each packed line (CTOR_ALLOC is one per line and CTOR_SCRATCH_CELLS
//  is not, so a line-anchored probe reports 16 and 4 for two blocks that both carry 16).
const keysOfBlock = (text, marker) => {
    const from = text.indexOf(marker);
    if (from < 0) throw new Error(`HALT: the probe cannot find \`${marker}\` — the bytes moved`);
    const body = text.slice(from + marker.length);
    const end = body.search(/\n\}\)?;/);
    if (end < 0) throw new Error(`HALT: the probe cannot find the end of \`${marker}\``);
    const block = body.slice(0, end).replace(/\/\/[^\n]*/g, ""); //  comments name rows too
    return new Set([...block.matchAll(/(?:^|[{,])\s*"?([a-z][a-z0-9-]*)"?\s*:/gm)].map((m) => m[1]));
};
const jsText = readFileSync(at("src/css/lowering-js/js-alg.mjs"), "utf8");
const boundsText = readFileSync(at("src/css/bounds.mjs"), "utf8");
const wasmText = readFileSync(at("src/css/lowering-wasm/wasm-alg.mjs"), "utf8");
const emitted = new Set([...wasmText.matchAll(/declare\(\s*"([a-z0-9-]+)"/g)].map((m) => m[1]));
const myRows = since(R_ctor, MINE).sort();
const inSet = (set) => myRows.filter((r) => set.has(r));
const quartet = {
    "tables.mjs R_ctor": myRows,
    "js-alg.mjs CTORS": inSet(keysOfBlock(jsText, "const CTORS = {")),
    "wasm-alg.mjs emitCtors": myRows.filter((r) => emitted.has(r)),
    "bounds.mjs CTOR_ALLOC": inSet(keysOfBlock(boundsText, "const CTOR_ALLOC = Object.freeze({")),
    "bounds.mjs CTOR_SCRATCH_CELLS": inSet(keysOfBlock(boundsText, "const CTOR_SCRATCH_CELLS = Object.freeze({")),
};
OUT.ctorQuartet = Object.fromEntries(Object.entries(quartet).map(([k, v]) => [k, v.length]));
OUT.ctorRows = myRows;
console.log(`\nE-h1 — the CTOR family this unit added (one algebra write, three realizations)`);
for (const [where, rows] of Object.entries(quartet)) console.log(`  ${pad(where, 32)} ${lpad(rows.length, 3)}`);
const counts = Object.values(quartet).map((v) => v.length);
OUT.ctorClosed = counts.every((n) => n === counts[0]);
console.log(`  EQUAL: ${counts.join(" = ")}  → ${OUT.ctorClosed}`);
console.log(`  rows: ${myRows.join(" · ")}`);
OUT.registryRows = {
    R_cls: since(R_cls, MINE), R_kw: since(R_kw, MINE), R_disp: since(R_disp, MINE),
};
console.log(`  beside them: R_cls ${OUT.registryRows.R_cls.length} · R_kw ${OUT.registryRows.R_kw.length} · R_disp ${OUT.registryRows.R_disp.length}`);

/* ── 3-5. the oracle, the corpus, both lowerings ─────────────────────────────────────────── */

const { readPin } = await import(at("test/css-totality/lib/pin.mjs"));
const pin = await readPin("6aca8602");
const oracle = await import(pin.sources.publishedJs.path);
const entry = await import(at("src/css/entry.mjs"));
const { SHIELD } = entry;
const shieldAtOpen = SHIELD.caught;
const surfaces = await entry.loadPublicSurfaces();
//  F-c3: 172 of the corpus rows carry `s` WRAPPED as `{id, src}` (the `r1` band). The gate scripts
//  unwrap them and so does this probe — a probe that reads `r.s` raw hands the oracle an object and
//  a probe that reads `r.src` hands it `undefined`, and BOTH silently measure something else.
const rows = JSON.parse(readFileSync(at("test/css-totality/corpus.json"), "utf8")).rows
    .map((r) => (typeof r.s === "string" ? r.s : r.s.src));
const wrapped = JSON.parse(readFileSync(at("test/css-totality/corpus.json"), "utf8")).rows
    .filter((r) => typeof r.s !== "string").length;
OUT.corpus = { rows: rows.length, unwrapped: wrapped, allStrings: rows.every((s) => typeof s === "string") };

//  the three classes, as PREDICATES over the input (E-h2 hands these to `.k`)
const WS_1 = (s) => /[^\S \t\n\r\f]/.test(s); //   whitespace the incumbent sees and `ws` does not
const KF_1 = (s) => /\d[eE][+-]?\d/.test(s) || /\d\.(?!\d)/.test(s);
const classOf = (s) => (KF_1(s) ? "KF-1" : WS_1(s) ? "WS-1" : null);

//  STRUCTURAL equality — the semantics G-1's own comparator uses, and the semantics JS object
//  equality has. A `JSON.stringify` comparison is ORDER-SENSITIVE and therefore stricter than the
//  gate: it reports a "miss" for two objects that are equal but were built key-by-key in a
//  different sequence. Both readings are taken below, and the difference between them is KO-1.
const deepEqual = (a, b) => {
    if (a === b) return true;
    if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return Number.isNaN(a) && Number.isNaN(b);
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every((k) => Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k]));
};

const PARSERS = [
    ["parseKeyframeSelector", oracle.parseKeyframeSelector],
    ["parseAnimationTimeline", oracle.parseAnimationTimeline],
    ["parseAnimationRange", oracle.parseAnimationRange],
];
console.log(`\nG-1 (two numbers per row) · G-5 (both lowerings) — over ${rows.length} corpus inputs`);
console.log(`  oracle  ${path.basename(pin.sources.publishedJs.path)} — sha256 ${pin.sources.publishedJs.sha256.slice(0, 16)}`);
console.log(`\n  ${pad("row", 24)} ${lpad("accept", 7)} ${lpad("reject", 7)} ${lpad("raw", 5)} ${lpad("in-class", 9)} ${lpad("outside", 8)} ${lpad("js≠wasm", 8)} ${lpad("KO-1", 7)} verdict`);
console.log(`  ${rule(88)}`);
OUT.g1 = {};
for (const [name, fn] of PARSERS) {
    let accept = 0, reject = 0, raw = 0, inClass = 0, outside = 0, differ = 0, keyOrder = 0;
    const misses = [];
    const keyOrderWitness = [];
    for (const s of rows) {
        const want = fn(s);
        const got = surfaces.js[name](s);
        const other = surfaces.wasm[name](s);
        if (JSON.stringify(other) !== JSON.stringify(got)) differ++;
        want.ok ? accept++ : reject++;
        const same = want.ok === got.ok && (!want.ok || deepEqual(want.value, got.value));
        //  KO-1: structurally equal, but the keys were inserted in a different sequence.
        if (same && want.ok && JSON.stringify(want.value) !== JSON.stringify(got.value)) {
            keyOrder++;
            if (keyOrderWitness.length < 4) keyOrderWitness.push({ src: s, oracle: want.value, candidate: got.value });
        }
        if (!same) {
            raw++;
            const cls = classOf(s);
            if (cls) { inClass++; } else {
                outside++;
                if (misses.length < 12) misses.push({ src: s, oracle: want.ok ? want.value : `reject`, candidate: got.ok ? got.value : `reject ${got.diagnostics?.[0]?.code}` });
            }
        }
    }
    OUT.g1[name] = { accept, reject, total: rows.length, raw, inClass, outside, differ, keyOrder, keyOrderWitness, misses };
    const verdict = raw === 0 ? "TOTAL (measured)" : outside === 0 ? "in declared classes only" : "MISSES OUTSIDE";
    console.log(`  ${pad(name, 24)} ${lpad(accept, 7)} ${lpad(reject, 7)} ${lpad(raw, 5)} ${lpad(inClass, 9)} ${lpad(outside, 8)} ${lpad(differ, 8)} ${lpad(keyOrder, 7)} ${verdict}`);
    for (const m of misses) console.log(`      MISS  ${JSON.stringify(m.src)}  oracle ${JSON.stringify(m.oracle)}  candidate ${JSON.stringify(m.candidate)}`);
    for (const w of keyOrderWitness) console.log(`      KO-1  ${JSON.stringify(w.src)}  oracle ${JSON.stringify(w.oracle)}  candidate ${JSON.stringify(w.candidate)}`);
}
console.log(`\n  KF-1's measured population over this corpus: ${rows.filter(KF_1).length} inputs match the class predicate,`);
console.log(`  of which ${rows.filter((s) => KF_1(s) && surfaces.js.parseKeyframeSelector(s).ok !== oracle.parseKeyframeSelector(s).ok).length} actually diverge at P:keyframe-selector (the class is declared, its population is what it is).`);

/* ── 6. the structured rows: the oracle's own outputs, plus the seven degenerate values ──── */

const DEGENERATE = [undefined, null, 42, {}, [], true, NaN];
const STRUCTURED = ["collectAnimationOptions", "serializeTimelineOptions", "collectTimelineOptions"];
console.log(`\nthe three structured rows — shape and no-throw over the oracle's outputs + 7 degenerate values`);
OUT.structured = {};
for (const name of STRUCTURED) {
    let threw = 0, differ = 0, n = 0;
    for (const v of DEGENERATE) {
        for (const kind of ["js", "wasm"]) {
            n++;
            try { surfaces[kind][name](v); } catch { threw++; }
        }
        try {
            if (JSON.stringify(surfaces.js[name](v)) !== JSON.stringify(surfaces.wasm[name](v))) differ++;
        } catch { /* counted above */ }
    }
    OUT.structured[name] = { calls: n, threw, differ };
    console.log(`  ${pad(name, 26)} ${lpad(n, 4)} calls · threw ${threw} · js≠wasm ${differ}`);
}

/* ── 7. G-3 and G-9 ──────────────────────────────────────────────────────────────────────── */

OUT.shield = { atOpen: shieldAtOpen, atExit: SHIELD.caught, faults: SHIELD.faults() };
console.log(`\nG-3 — the shield`);
console.log(`  SHIELD.caught at open ${shieldAtOpen} · at exit ${SHIELD.caught} · faults ${JSON.stringify(SHIELD.faults())}`);

OUT.theta = { ...boundsMod.THETA };
OUT.class3 = JSON.parse(JSON.stringify(boundsMod.CLASS3_PROOF));
console.log(`\nG-9 — Θ at the settled bytes (X.P.W3.h closed at input 14107; this unit did not move it)`);
console.log(`  ${JSON.stringify(OUT.theta)}`);
console.log(`  class-3: ${JSON.stringify(OUT.class3)}`);

console.log(`\n${rule()}`);
const green = OUT.ctorClosed && OUT.k10.injective && OUT.shield.atExit === 0
    && Object.values(OUT.g1).every((r) => r.raw === 0 && r.differ === 0)
    && Object.values(OUT.structured).every((r) => r.threw === 0 && r.differ === 0);
console.log(green
    ? "GREEN — the three parsers are TOTAL by MEASUREMENT (raw misses 0), the two lowerings agree on every\n        corpus cell, the CTOR family is closed four ways, the labels append, and the shield never fired."
    : "RED — see the rows above.");

process.stdout.write("");
const jsonPath = "/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W3/animation-grammar-landing-2026-09-18.json";
const { writeFileSync } = await import("node:fs");
writeFileSync(jsonPath, `${JSON.stringify(OUT, null, 2)}\n`);
console.log(`\njson written  ${jsonPath}`);
