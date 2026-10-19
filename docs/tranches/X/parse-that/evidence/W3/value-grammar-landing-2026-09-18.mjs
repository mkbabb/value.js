// SERVED MODEL: claude-fable-5-1
//
// X.P.W3.h — the value grammar's LANDING probe (banked BESIDE the `.h` bounds probe of 09-19; E-3).
// Two numbers per G-1 row for the unit's entries (raw misses AND misses inside the declared
// divergence classes), Θ per entry beside the MEASURED arena high-water per code unit, the mark
// journal's per-item cost per family (the value grammar's real item ceiling under `marks <= 32768`),
// module sizes, and the hashes of the settled bytes. Nothing here is asserted by hand: every count
// is read from the pinned oracle, the built candidate and the two lowerings at run time.
//
//   node docs/tranches/X/parse-that/evidence/W3/value-grammar-landing-2026-09-18.mjs \
//        > docs/tranches/X/parse-that/evidence/W3/value-grammar-landing-2026-09-18.txt
//
// The declared divergence classes (each declared in `algebra/grammar/value.mjs`'s header, none an
// adjudication yet — E-h2 sends them to `.k` as class predicates):
//   COLOR     the input carries a colour token: inherited from `P:color`'s own W3 divergence rows
//             (hex/named/functional heads inside a value answer as `P:color` answers them)
//   PB-12     `\d\.(?!\d)` — the incumbent's `\d+\.?\d*` accepts a trailing dot; NUM does not
//   UNICODE   a non-ASCII code unit (the incumbent's `\s` splitter and `\w` classes see Unicode)
//   BACKSLASH a backslash immediately before the closing quote of a string (the incumbent's regex
//             backtracks it; the grammar's escape is exact-width)
//   WINDOW    the input exceeds Θ.input (the derived window this unit re-set)

import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const VALUE_JS = path.resolve(HERE, "../../../../../..");
const P2 = path.resolve(VALUE_JS, "../parse-that-css-totality-p2/typescript");
const ORACLE = path.join(VALUE_JS, "docs/tranches/V/megatranche/prototypes/css-parser/cand-o/vendor/value-js-4.0.0/dist/subpaths/css.js");

const sha = (p) => createHash("sha256").update(readFileSync(p)).digest("hex");
const out = [];
const say = (...a) => { const line = a.join(" "); out.push(line); console.log(line); };

say("SERVED MODEL: claude-fable-5-1 · X.P.W3.h value-grammar-landing probe · sitting 2026-09-18");

const oracle = await import(ORACLE);
const E = await import(path.join(P2, "src/css/entry.mjs"));
const S = await E.loadPublicSurfaces();
const cand = await import(path.join(P2, "src/css/build/ac1.js"));
const bounds = await import(path.join(P2, "src/css/bounds.mjs"));
const { lowerings } = await import(path.join(P2, "src/css/harness-adapter.mjs"));
say(`SHIELD.caught at open = ${E.SHIELD.caught}`);

/* ── A. the settled bytes ─────────────────────────────────────────────────────────────────── */
say("\n── A. the settled bytes");
const files = [
    "src/css/algebra/grammar/value.mjs", "src/css/algebra/grammar.mjs", "src/css/algebra/tables.mjs", "src/css/diagnostics.mjs",
    "src/css/lowering-js/js-alg.mjs", "src/css/lowering-wasm/wasm-alg.mjs", "src/css/bounds.mjs", "src/css/entry.mjs", "src/css/build.mjs",
    "src/css/harness-adapter.mjs", "test/css-recovery/value-grammar.test.ts", "src/css/build/ac1.js", "src/css/build/ac1.wasm", "src/css/build/ac1.d.ts",
];
const hashes = {};
for (const f of files) { const p = path.join(P2, f); hashes[f] = { sha256: sha(p), bytes: statSync(p).size }; say(`  ${f.padEnd(46)} ${hashes[f].bytes.toString().padStart(8)} B  sha256 ${hashes[f].sha256.slice(0, 16)}`); }
say(`  oracle ${path.relative(VALUE_JS, ORACLE)} sha256 ${sha(ORACLE).slice(0, 16)}`);

/* ── B. Θ per entry, the walk's rate vs the measured arena ───────────────────────────────── */
say("\n── B. Θ per entry (bounds.mjs's ceiling walk) beside the MEASURED arena high-water");
say(`  INPUT_BOUND ${bounds.INPUT_BOUND} · arena ${JSON.stringify(bounds.CLASS3_CEILINGS.arena)} · vstack ${JSON.stringify(bounds.CLASS3_CEILINGS.vstack)} · THETA ${JSON.stringify(bounds.THETA)}`);
const theta = {};
for (const [k, r] of Object.entries(bounds.CLASS3_CEILINGS.perEntry)) { theta[k] = { rate: r.rate, cells: r.cells, fixed: r.fixed, exp: r.exp }; say(`  ${k.padEnd(20)} walked rate ${String(r.rate).padStart(4)} B/code unit · cells ${r.cells} · fixed ${r.fixed} · exp ${r.exp}`); }
const W = lowerings.wasm;
const families = {
    "space list (idents)": (n) => "a ".repeat(n),
    "comma list": (n) => "a,".repeat(n) + "a",
    "slash list": (n) => "a/".repeat(n) + "a",
    "space list (calls)": (n) => "f(1) ".repeat(n),
    "space list (numbers)": (n) => "1px ".repeat(n),
    "space list (colours)": (n) => "red ".repeat(n),
    "one token": () => "1px",
};
const measured = {};
say("  measured on the Wasm lowering, P:value, 400 items per family (arena = arenaHighWater() after the parse):");
for (const [name, mk] of Object.entries(families)) {
    const s = mk(400);
    W.reset();
    const r = W.parse("P:value", s);
    const arena = W.arenaHighWater();
    const marksPerItem = r.marks.length / 400;
    measured[name] = { length: s.length, ok: r.ok, arenaBytes: arena, arenaPerCodeUnit: +(arena / s.length).toFixed(2), marksPerItem: +marksPerItem.toFixed(2), itemsAtMarkCap: marksPerItem > 0 ? Math.floor(bounds.THETA.marks / marksPerItem) : null };
    say(`    ${name.padEnd(22)} len ${String(s.length).padStart(5)} ok ${r.ok} · arena ${String(arena).padStart(6)} B = ${measured[name].arenaPerCodeUnit} B/code unit · marks/item ${measured[name].marksPerItem} → items before \`marks <= ${bounds.THETA.marks}\` ≈ ${measured[name].itemsAtMarkCap ?? "—"}`);
}
const worstMeasured = Math.max(...Object.values(measured).map((m) => m.arenaPerCodeUnit));
say(`  the walk's P:values rate ${theta["P:values"].rate} B/code unit vs the worst measured ${worstMeasured} B/code unit → the model over-reads by ×${(theta["P:values"].rate / worstMeasured).toFixed(1)} (E-h5)`);

/* ── C. G-1 in the two-number form over the union corpus ─────────────────────────────────── */
say("\n── C. G-1 two-number form: raw misses / misses inside the declared classes, per entry, over the union corpus");
const corpus = JSON.parse(readFileSync(path.join(P2, "test/css-totality/corpus.json"), "utf8"));
const rows = [...new Map(corpus.rows.map((r) => [r.s, r])).values()];
say(`  corpus ${corpus.rows.length} rows → ${rows.length} distinct · rowsSha256 ${corpus.rowsSha256?.slice?.(0, 16) ?? "—"}`);
const NAMED = /\b(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\s*\(/i;
const HEX = /#[0-9a-f]{3,8}\b/i;
/** The pinned oracle THROWS on some inputs (the incumbent's live crash class, G-5's "F-c3 unwrapped"); a throw is recorded as its own kind, never hidden. */
const ask = (fn, s) => { try { return fn(s); } catch (e) { return { ok: false, threw: String(e?.message ?? e).slice(0, 60) }; } };
const colourMiss = new Set();
for (const r of rows) { const o = ask(oracle.parseCssColor, r.s), c = cand.parseCssColor(r.s); if (o.ok !== c.ok || (o.ok && JSON.stringify(o.value) !== JSON.stringify(c.value))) colourMiss.add(r.s); }
const isColourWord = (s) => ask(oracle.parseCssColor, s.trim()).ok;
const classes = {
    COLOR: (s) => colourMiss.has(s) || NAMED.test(s) || HEX.test(s) || s.split(/[\s,\/()]+/).some((w) => w && isColourWord(w) && colourMiss.has(w)),
    "PB-12": (s) => /\d\.(?!\d)/.test(s),
    UNICODE: (s) => /[^\x00-\x7f]/.test(s),
    BACKSLASH: (s) => /\\(["'])/.test(s) || /\\$/.test(s),
    WINDOW: (s) => s.length > bounds.INPUT_BOUND,
};
const classify = (s) => Object.keys(classes).filter((k) => classes[k](s));
const g1 = {};
for (const entry of ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues"]) {
    const miss = { FALSE_REJECT: 0, MIS_ACCEPT: 0, DIVERGENT_VALUE: 0, ORACLE_THREW: 0 };
    const inClass = {};
    const outside = [];
    let raw = 0;
    for (const r of rows) {
        const o = ask(oracle[entry], r.s);
        const c = cand[entry](r.s);
        let kind = null;
        if (o.threw) kind = c.ok ? "ORACLE_THREW" : null; //  the oracle crashed: a cell the candidate answers is counted as its own kind, a shared rejection is agreement
        else if (o.ok && !c.ok) kind = "FALSE_REJECT";
        else if (!o.ok && c.ok) kind = "MIS_ACCEPT";
        else if (o.ok && c.ok && JSON.stringify(o.value) !== JSON.stringify(c.value)) kind = "DIVERGENT_VALUE";
        if (!kind) continue;
        raw++;
        miss[kind]++;
        const cls = classify(r.s);
        if (cls.length === 0) outside.push({ s: r.s.length > 60 ? r.s.slice(0, 60) + "…" : r.s, kind });
        for (const k of cls.length ? [cls[0]] : []) inClass[k] = (inClass[k] ?? 0) + 1;
    }
    const inside = raw - outside.length;
    g1[entry] = { cells: rows.length, raw, byKind: miss, insideClasses: inside, byClass: inClass, outsideClasses: outside.length, outsideSample: outside.slice(0, 12) };
    say(`  ${entry.padEnd(16)} cells ${rows.length} · RAW misses ${raw} (${Object.entries(miss).map(([k, v]) => `${k} ${v}`).join(" · ")}) · IN declared classes ${inside} (${Object.entries(inClass).map(([k, v]) => `${k} ${v}`).join(" · ")}) · OUTSIDE ${outside.length}`);
    for (const o of outside.slice(0, 8)) say(`      outside: ${o.kind.padEnd(15)} ${JSON.stringify(o.s)}`);
}
say("  (coerceToSyntax composes parseCssValue on the surface and adds no parse of its own: its G-1 misses are parseCssValue's over the coercer's pairs — read raw from the G-1 report, not re-derived here)");

/* ── D. the constructor family, four realizations, one count ─────────────────────────────── */
say("\n── D. the CTOR family at the bytes: N = N = N = N");
const tables = await import(path.join(P2, "src/css/algebra/tables.mjs"));
const src = (f) => readFileSync(path.join(P2, f), "utf8");
const rctor = Object.keys(tables.R_ctor);
const jsAlg = src("src/css/lowering-js/js-alg.mjs");
const jsCtors = [...jsAlg.slice(jsAlg.indexOf("const CTORS = {")).matchAll(/^\s{4}"?([\w-]+)"?:\s*\(?a?\)?\s*=>|^\s{4}"?([\w-]+)"?\(a\)\s*\{/gm)].map((m) => m[1] ?? m[2]);
const wasmAlg = src("src/css/lowering-wasm/wasm-alg.mjs");
const wasmDeclared = [...wasmAlg.matchAll(/declare\("([\w-]+)"/g)].map((m) => m[1]);
const wasmLoop = /for \(const rowName of \[([^\]]+)\]\)/.exec(wasmAlg)?.[1].match(/"([\w-]+)"/g)?.map((s) => s.replaceAll('"', "")) ?? [];
const boundsSrc = src("src/css/bounds.mjs");
const allocBlock = boundsSrc.slice(boundsSrc.indexOf("const CTOR_ALLOC = Object.freeze({"), boundsSrc.indexOf("const CTOR_SCRATCH_CELLS"));
const allocRows = [...allocBlock.matchAll(/^\s{4}"?([\w-]+)"?:\s*\{/gm)].map((m) => m[1]);
const scratchBlock = boundsSrc.slice(boundsSrc.indexOf("const CTOR_SCRATCH_CELLS = Object.freeze({"));
const scratchRows = [...scratchBlock.slice(0, scratchBlock.indexOf("});")).replace(/\/\/.*$/gm, "").matchAll(/"?([\w-]+)"?:\s*\d+/g)].map((m) => m[1]);
const wasmRows = [...new Set([...wasmDeclared, ...wasmLoop])];
const eq = (a, b) => a.length === b.length && [...a].sort().every((x, i) => x === [...b].sort()[i]);
say(`  R_ctor ${rctor.length} · js CTORS ${jsCtors.length} · wasm emitCtors ${wasmRows.length} · bounds CTOR_ALLOC ${allocRows.length} · CTOR_SCRATCH_CELLS ${scratchRows.length}`);
say(`  R_ctor ≡ js ${eq(rctor, jsCtors)} · R_ctor ≡ wasm ${eq(rctor, wasmRows)} · R_ctor ≡ alloc ${eq(rctor, allocRows)} · R_ctor ≡ scratch ${eq(rctor, scratchRows)}`);
say(`  rows since X.P.W3.h: ${rctor.filter((k) => tables.R_ctor[k].since === "X.P.W3.h").length} of ${rctor.length}`);
say(`  L.length ${tables.L.length} · labels after "expsnap <= 32": ${JSON.stringify(tables.L.slice(tables.L.indexOf("expsnap <= 32") + 1))}`);

say(`\nSHIELD.caught at exit = ${E.SHIELD.caught}`);

const json = { servedModel: "claude-fable-5-1", unit: "X.P.W3.h", sitting: "2026-09-18", hashes, theta: { INPUT_BOUND: bounds.INPUT_BOUND, THETA: bounds.THETA, perEntry: theta, class3: bounds.CLASS3_CEILINGS }, measured, g1, ctorFamily: { R_ctor: rctor, js: jsCtors, wasm: wasmRows, alloc: allocRows, scratch: scratchRows }, labels: tables.L, shield: { open: 0, exit: E.SHIELD.caught } };
const jsonPath = path.join(HERE, "value-grammar-landing-2026-09-18.json");
const { writeFileSync } = await import("node:fs");
writeFileSync(jsonPath, `${JSON.stringify(json, null, 2)}\n`);
say(`\nemitted ${path.relative(VALUE_JS, jsonPath)}`);
