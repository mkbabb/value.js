// SERVED MODEL: claude-fable-5-1
//
// X.P.W3.h — THE VALUE GRAMMAR'S BOUNDS, measured read-only (sitting 2026-09-19; wall 2026-09-18 EDT).
// Banked BESIDE the sealed evidence (E-3): nothing here moves a committed artefact, and no byte of
// `<p2>` is written — the one registry this probe touches in-process (`R_ctor`, section A.4) is
// restored before the section ends and the process exits.
//
//   node docs/tranches/X/parse-that/evidence/W3/value-grammar-bounds-2026-09-19.mjs <out.json>
//
// Six sections, each a measurement the unit's escalation cites by letter:
//   A. the constructor closure — every `CTOR` row the grammar names needs THREE files outside the
//      unit's writable set, and the first of them HALTS at module load on an unknown row;
//   B. the frozen product shapes the unit's five entries must construct vs. the shapes the twenty
//      existing rows construct (intersection ∅), and the colour spaces the oracle emits vs. the
//      three `emitCtors` builds;
//   C. the oracle's accept census for the unit's entries over `.a`'s union corpus, with the three
//      classes no spec-correct grammar in this substrate can mirror, COUNTED;
//   D. every `parseCssColor` miss in the G-1 matrix, classified (kind × head × cause), so the
//      unrealized band is separated from the adjudication-class band by number;
//   E. Θ per entry as derived today (INFO-g1: reported, not narrowed);
//   F. the shield ledger before and after every call this probe made.
import { readFileSync } from "node:fs";
import path from "node:path";

const P2 = "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript";
const CSS = path.join(P2, "src/css");
const TOT = path.join(P2, "test/css-totality/lib");

const { SHIELD, loadPublicSurfaces, PUBLIC_ENTRIES, UNREALIZED_ENTRIES } = await import(path.join(CSS, "entry.mjs"));
const { L, R_ctor, R_kw, R_disp, R_cls } = await import(path.join(CSS, "algebra/tables.mjs"));
const { PRODUCTION_LABELS } = await import(path.join(CSS, "diagnostics.mjs"));
const { CLASS3_CEILINGS, CLASS3_PROOF, THETA, walkCeilings } = await import(path.join(CSS, "bounds.mjs"));
const { reifiedGrammar, reifiedDispatchTerms } = await import(path.join(CSS, "reify/term-alg.mjs"));
const { jsAlgebra } = await import(path.join(CSS, "lowering-js/js-alg.mjs"));
const { readPin } = await import(path.join(TOT, "pin.mjs"));
const { buildUnion } = await import(path.join(TOT, "corpus.mjs"));
const { adjudicationIndex } = await import(path.join(TOT, "adjudications.mjs"));
const { partition, parseResultShape, deepEqual, frozenCodes } = await import(path.join(TOT, "matrix.mjs"));

const out = { servedModel: "claude-fable-5-1", unit: "X.P.W3.h", sitting: "2026-09-19", probe: path.basename(process.argv[1]) };
const say = (...a) => console.log(...a);
const read = (rel) => readFileSync(path.join(CSS, rel), "utf8");
const lineOf = (text, needle) => {
    const at = text.indexOf(needle);
    return at < 0 ? -1 : text.slice(0, at).split("\n").length;
};
const tally = (items) => {
    const m = new Map();
    for (const k of items) m.set(k, (m.get(k) ?? 0) + 1);
    return Object.fromEntries([...m.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]))));
};
const sample = (arr, n = 8) => arr.slice(0, n);

say("SERVED MODEL: claude-fable-5-1 · X.P.W3.h value-grammar-bounds probe · sitting 2026-09-19");
say(`SHIELD.caught at open = ${SHIELD.caught}`);
out.shieldAtOpen = SHIELD.caught;

/* ── A. the constructor closure ─────────────────────────────────────────────────────────────── */
say("\n── A. the constructor closure: what a new CTOR row needs, at the bytes");
const jsAlg = read("lowering-js/js-alg.mjs");
const wasmAlg = read("lowering-wasm/wasm-alg.mjs");
const boundsSrc = read("bounds.mjs");
const wasmIdx = read("lowering-wasm/index.mjs");
const anchors = {
    "lowering-js/js-alg.mjs": {
        "const CTORS = {": lineOf(jsAlg, "const CTORS = {"),
        "const build = CTORS[rowName];": lineOf(jsAlg, "const build = CTORS[rowName];"),
        exportsCTORS: /export\s+(const|\{[^}]*\bCTORS\b)/.test(jsAlg) && /export[^\n]*CTORS/.test(jsAlg),
    },
    "lowering-wasm/wasm-alg.mjs": {
        "export function emitCtors(env)": lineOf(wasmAlg, "export function emitCtors(env)"),
        'for (const rowName of ["rgb", "hsl", "oklch"])': lineOf(wasmAlg, 'for (const rowName of ["rgb", "hsl", "oklch"])'),
        "const build = env.ctorFn(rowName);": lineOf(wasmAlg, "const build = env.ctorFn(rowName);"),
    },
    "lowering-wasm/index.mjs": {
        "env.ctors = emitCtors(env);": lineOf(wasmIdx, "env.ctors = emitCtors(env);"),
        "ctorFn: (row) => env.ctors[row],": lineOf(wasmIdx, "ctorFn: (row) => env.ctors[row],"),
    },
    "bounds.mjs": {
        "const CTOR_ALLOC = Object.freeze({": lineOf(boundsSrc, "const CTOR_ALLOC = Object.freeze({"),
        "const CTOR_SCRATCH_CELLS = Object.freeze({": lineOf(boundsSrc, "const CTOR_SCRATCH_CELLS = Object.freeze({"),
        "HALT: the node table has no row for constructor": lineOf(boundsSrc, "HALT: the node table has no row for constructor"),
        "export const CLASS3_CEILINGS = deriveClass3Ceilings();": lineOf(boundsSrc, "export const CLASS3_CEILINGS = deriveClass3Ceilings();"),
    },
};
for (const [file, rows] of Object.entries(anchors)) for (const [k, v] of Object.entries(rows)) say(`  ${file}:${v}  ${k}`);
out.A = { anchors };

// A.1 the twenty rows, three tables, one name set — measured, not assumed
const rows = Object.keys(R_ctor);
const jsCtorNames = [...jsAlg.slice(jsAlg.indexOf("const CTORS = {"), jsAlg.indexOf("/* ── the instantiation")).matchAll(/^\s{4}"?([a-z0-9-]+)"?:\s/gm)].map((m) => m[1]);
const wasmDeclared = [...wasmAlg.matchAll(/declare\("([a-z0-9-]+)"/g)].map((m) => m[1]);
const wasmLoop = [...wasmAlg.matchAll(/for \(const rowName of \[([^\]]+)\]\)/g)].flatMap((m) => m[1].split(",").map((s) => s.trim().replace(/"/g, "")));
const wasmCtorNames = [...new Set([...wasmLoop, ...wasmDeclared])];
const allocNames = [...boundsSrc.slice(boundsSrc.indexOf("const CTOR_ALLOC = Object.freeze({"), boundsSrc.indexOf("const CTOR_SCRATCH_CELLS")).matchAll(/^\s{4}"?([a-z0-9-]+)"?:\s\{/gm)].map((m) => m[1]);
const same = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
say(`  R_ctor rows ${rows.length} · js CTORS ${jsCtorNames.length} · wasm emitCtors ${wasmCtorNames.length} · bounds CTOR_ALLOC ${allocNames.length} · all four name-sets equal: ${same(rows, jsCtorNames) && same(rows, wasmCtorNames) && same(rows, allocNames)}`);
out.A.rows = { R_ctor: rows, jsCTORS: jsCtorNames, wasmEmitCtors: wasmCtorNames, boundsCtorAlloc: allocNames };

// A.2 the load-time HALT, demonstrated in-process: one grammar with ONE unknown row
const g = reifiedGrammar();
const probeGrammar = {
    entries: { ...g.entries, "P:probe": "probe" },
    terms: { ...g.terms, probe: { op: "CTOR", args: [{ reg: "R_ctor.value-number" }, { op: "NUM", args: [] }, { op: "TEXT", args: [{ reg: "R_cls.ident" }, { lit: 0 }, { lit: Infinity }] }] } },
};
let halt = null;
try {
    walkCeilings(probeGrammar, reifiedDispatchTerms(), THETA.depthBound);
} catch (e) {
    halt = String(e.message);
}
say(`  A.2 walkCeilings over a grammar naming R_ctor.value-number → ${halt === null ? "NO HALT (unexpected)" : JSON.stringify(halt)}`);
say(`      (bounds.mjs runs deriveClass3Ceilings() at MODULE LOAD, so this halt fires before entry.mjs, harness-adapter.mjs or either lowering exists)`);
out.A.loadTimeHalt = halt;

// A.3 the JS lowering's CTOR over a row tables.mjs does not carry
let jsMissingRow = null;
try {
    const A = jsAlgebra({ terms: {}, dispatch: {} });
    A.CTOR("value-number", A.NUM());
} catch (e) {
    jsMissingRow = `${e.constructor.name}: ${e.message}`;
}
say(`  A.3 jsAlgebra().CTOR("value-number", NUM) with no R_ctor row → ${JSON.stringify(jsMissingRow)}`);
out.A.jsMissingRow = jsMissingRow;

// A.4 the JS lowering's CTOR over a row tables.mjs DOES carry but CTORS does not — in-process only, restored
let jsMissingCtor = null;
R_ctor["x-p-w3-h-probe"] = { label: "probe", code: "css_syntax", labels: ["<number>"], arity: 1, leafMap: ["v"] };
try {
    const A = jsAlgebra({ terms: {}, dispatch: {} });
    const term = A.CTOR("x-p-w3-h-probe", A.NUM());
    const { Parser } = await import(path.join(CSS, "lowering-js/js-alg.mjs"));
    const { newSigma } = await import(path.join(CSS, "lowering-js/js-alg.mjs"));
    const root = new Parser((state) => {
        state.w2 = newSigma(state.src, THETA);
        term.parser(state);
        return state;
    }, { name: "probe", args: [] });
    root.parseState("1");
    jsMissingCtor = "NO THROW (unexpected)";
} catch (e) {
    jsMissingCtor = `${e.constructor.name}: ${e.message}`;
} finally {
    delete R_ctor["x-p-w3-h-probe"];
}
say(`  A.4 a row present in R_ctor but absent from js-alg.mjs CTORS, parsed → ${JSON.stringify(jsMissingCtor)} · R_ctor restored: ${!("x-p-w3-h-probe" in R_ctor)} (${Object.keys(R_ctor).length} rows)`);
out.A.jsMissingCtor = jsMissingCtor;

/* ── B. the frozen shapes vs. the constructible shapes ──────────────────────────────────────── */
say("\n── B. frozen product shapes the unit's entries must construct vs. the shapes the twenty rows construct");
const frozenDts = readFileSync(path.join(P2, "test/css-totality/generated/frozen-4.0.0.d.ts"), "utf8");
const cssColorSpaces = [...frozenDts.match(/export declare type CssColorSpace = ([^;]+);/)[1].matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
const payloadTypes = [...frozenDts.slice(frozenDts.indexOf("declare type CssScalar"), frozenDts.indexOf("}>;", frozenDts.indexOf("declare type CssScalar")) + 3).matchAll(/type: "([a-z]+)"/g)].map((m) => m[1]);
const listSeparators = [...frozenDts.match(/separator: ([^;]+);/)[1].matchAll(/"([a-z]+)"/g)].map((m) => m[1]);
const required = {
    "CssScalar payload.type": payloadTypes,
    "CssCall kind": ["call"],
    "CssList separator": listSeparators,
    "CssColor space (CssColorSpace)": cssColorSpaces,
};
const wasmSpaces = wasmLoop.filter((n) => ["rgb", "hsl", "oklch"].includes(n));
const built = {
    "scalar payload.type": ["color"], //                 value-color is the ONE scalar row
    "call kind": [],
    "list separator": [],
    "colour spaces (emitCtors colorOf rows)": [...new Set(Object.values(R_ctor).map((r) => r.space).filter(Boolean))],
};
say(`  frozen: ${JSON.stringify(required)}`);
say(`  built by the twenty rows: ${JSON.stringify(built)}`);
say(`  emitCtors colorOf loop spaces: [${wasmSpaces.join(", ")}] · colour spaces the frozen type names and NO row builds: [${cssColorSpaces.filter((s) => !built["colour spaces (emitCtors colorOf rows)"].includes(s)).join(", ")}]`);
say(`  scalar payload types with no row: [${payloadTypes.filter((t) => t !== "color").join(", ")}] · CssCall rows: 0 · CssList rows: 0`);
out.B = { required, built, missingSpaces: cssColorSpaces.filter((s) => !built["colour spaces (emitCtors colorOf rows)"].includes(s)), missingScalarPayloads: payloadTypes.filter((t) => t !== "color") };

/* ── C. the oracle's accept census over the union corpus ────────────────────────────────────── */
say("\n── C. the oracle's accept census for the unit's entries (`.a`'s union corpus, the sha-pinned 4.0.0 oracle)");
const pin = await readPin("6aca8602");
const corpus = buildUnion();
const index = adjudicationIndex();
say(`  pin ${pin.commit.slice(0, 8)} · corpus union ${corpus.rows.length} rows · boundary ${corpus.boundary.length} · adjudicated inputs ${index.size}`);
const cp = (...cs) => cs.map((c) => String.fromCharCode(c)).join("");
const NON_ASCII_WS = new RegExp(`[${cp(0xa0, 0x1680, 0x2000)}-${cp(0x200a, 0x2028, 0x2029, 0x202f, 0x205f, 0x3000, 0xfeff)}]`);
const NON_CSS_WS = new RegExp(`[${cp(0x0b)}${NON_ASCII_WS.source.slice(1)}`);
const TRAILING_DOT = /\d\.(?!\d)/;
const ESCAPED_BACKSLASH_QUOTE = /\\\\["']/;
const kindOf = (v) => {
    if (!v || typeof v !== "object") return "?";
    if (v.kind === "scalar") return `scalar/${v.payload.type}${v.payload.type === "color" ? `/${v.payload.value.space}` : ""}`;
    if (v.kind === "list") return `list/${v.separator}`;
    if (v.kind === "call") return "call";
    return v.kind ?? "?";
};
out.C = {};
for (const name of ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues"]) {
    const sets = partition(pin.published[name], corpus.rows, index);
    const acc = sets.accept;
    const kinds = tally(acc.map((c) => (name === "parseCssColor" ? `color/${c.value?.space}` : kindOf(c.value))));
    const trailingDot = acc.filter((c) => TRAILING_DOT.test(c.s));
    const nonCssWs = acc.filter((c) => NON_CSS_WS.test(c.s));
    const nonAsciiWs = acc.filter((c) => NON_ASCII_WS.test(c.s));
    const vtab = acc.filter((c) => c.s.includes(cp(0x0b)));
    const bsq = acc.filter((c) => ESCAPED_BACKSLASH_QUOTE.test(c.s));
    say(`  ${name}: accept ${acc.length} · reject ${sets.reject.length} (r1 throws ${sets.reject.filter((c) => c.r1).length}) · declared ${acc.filter((c) => c.declared).length + sets.reject.filter((c) => c.declared).length}`);
    say(`    accepted value kinds: ${JSON.stringify(kinds)}`);
    say(`    accepted inputs with a trailing-dot number (\\d\\.(?!\\d)): ${trailingDot.length}  e.g. ${JSON.stringify(sample(trailingDot.map((c) => c.s), 6))}`);
    say(`    accepted inputs with whitespace outside css-syntax's five (JS /\\s/ ∖ {sp,tab,lf,cr,ff}): ${nonCssWs.length} (\\v ${vtab.length} · non-ASCII ${nonAsciiWs.length})  e.g. ${JSON.stringify(sample(nonCssWs.map((c) => c.s), 4))}`);
    say(`    accepted inputs with a backslash-backslash-quote run: ${bsq.length}`);
    out.C[name] = { accept: acc.length, reject: sets.reject.length, r1: sets.reject.filter((c) => c.r1).length, kinds, trailingDot: trailingDot.length, trailingDotSample: sample(trailingDot.map((c) => c.s), 12), nonCssWs: nonCssWs.length, vtab: vtab.length, nonAsciiWs: nonAsciiWs.length, nonCssWsSample: sample(nonCssWs.map((c) => c.s), 12), backslashQuote: bsq.length };
}

/* ── D. every parseCssColor miss, classified ────────────────────────────────────────────────── */
say("\n── D. parseCssColor — every G-1 miss at this seat, classified (kind × head × cause), BOTH lowerings");
const surfaces = await loadPublicSurfaces();
const codes = frozenCodes(pin.typesText);
const sets = partition(pin.published.parseCssColor, corpus.rows, index);
const headOf = (s) => {
    const m = /^\s*([a-z][\w-]*)\s*\(/i.exec(s);
    if (m) return m[1].toLowerCase();
    if (/^\s*#/.test(s)) return "#hex";
    return "(bare)";
};
const REALIZED_HEADS = new Set([...Object.keys(R_disp["color-head"].rows), "#hex", "(bare)"]);
const clamp = (v, lo, hi) => (typeof v === "number" ? Math.min(Math.max(v, lo), hi) : v);
const clampToCandidate = (o) => {
    const ch = o.channels;
    const a = clamp(o.alpha, 0, 1);
    if (o.space === "rgb") return { space: "rgb", channels: ch.map((c) => clamp(c, 0, 255)), alpha: a };
    if (o.space === "hsl") return { space: "hsl", channels: [ch[0], clamp(ch[1], 0, 1), clamp(ch[2], 0, 1)], alpha: a };
    if (o.space === "oklch") return { space: "oklch", channels: [clamp(ch[0], 0, 1), clamp(ch[1], 0, Infinity), ch[2]], alpha: a };
    return o;
};
const hsl100 = (o) => (o.space === "hsl" ? { space: "hsl", channels: [o.channels[0], clamp(typeof o.channels[1] === "number" ? o.channels[1] / 100 : o.channels[1], 0, 1), clamp(typeof o.channels[2] === "number" ? o.channels[2] / 100 : o.channels[2], 0, 1)], alpha: clamp(o.alpha, 0, 1) } : null);
const COMMA_REWRITE = /\(\s*,|,\s*,|,\s*\)|,\s*\/|\/\s*,|,\s*$/;
const misses = { js: [], wasm: [] };
for (const kind of ["js", "wasm"]) {
    const fn = surfaces[kind].parseCssColor;
    for (const cell of sets.accept) {
        const got = fn(cell.s);
        const shape = parseResultShape(got, codes);
        if (shape) { misses[kind].push({ kind: "SHAPE", s: cell.s, why: shape }); continue; }
        if (got.ok !== true) { misses[kind].push({ kind: "FALSE_REJECT_IN_SHAPE", s: cell.s, label: got.diagnostics[0].expected[0], oracleSpace: cell.value?.space }); continue; }
        if (cell.value !== undefined && !cell.valueDiffers && !deepEqual(got.value, cell.value)) {
            const o = cell.value;
            const cause = deepEqual(got.value, clampToCandidate(o)) ? "clamp-class (PB-04/PB-05)" : hsl100(o) && deepEqual(got.value, hsl100(o)) ? "hsl-100x-class (PB-03)" : "other";
            misses[kind].push({ kind: "DIVERGENT_VALUE", s: cell.s, cause, oracle: o, candidate: got.value });
        }
    }
    for (const cell of sets.reject) {
        const got = fn(cell.s);
        const shape = parseResultShape(got, codes);
        if (shape) { misses[kind].push({ kind: "SHAPE", s: cell.s, why: shape }); continue; }
        if (got.ok !== false) {
            let oracleLabel = "(threw)";
            try { const o = pin.published.parseCssColor(cell.s); oracleLabel = o.ok ? "(oracle ok?)" : `${o.diagnostics[0].code}:${o.diagnostics[0].expected[0] ?? ""}`; } catch { /* R1 class */ }
            misses[kind].push({ kind: "MIS_ACCEPT", s: cell.s, oracleLabel, candidate: got.value });
        }
    }
}
const identical = misses.js.length === misses.wasm.length && misses.js.every((m, i) => m.kind === misses.wasm[i].kind && m.s === misses.wasm[i].s);
say(`  cells ${sets.accept.length + sets.reject.length} (accept ${sets.accept.length} · reject ${sets.reject.length}) · misses js ${misses.js.length} · wasm ${misses.wasm.length} · miss lists identical across lowerings: ${identical}`);
const M = misses.js;
const byKind = tally(M.map((m) => m.kind));
say(`  by kind: ${JSON.stringify(byKind)}`);
const byHead = tally(M.map((m) => `${m.kind}:${headOf(m.s)}`));
say(`  by kind × head: ${JSON.stringify(byHead)}`);
const unrealized = M.filter((m) => !REALIZED_HEADS.has(headOf(m.s)));
const realized = M.filter((m) => REALIZED_HEADS.has(headOf(m.s)));
say(`  UNREALIZED-HEAD band (hwb · lab · lch · oklab · color · …; a grammar cure reaches these): ${unrealized.length} = ${JSON.stringify(tally(unrealized.map((m) => `${m.kind}:${headOf(m.s)}`)))}`);
say(`  REALIZED-HEAD band (rgb · rgba · hsl · hsla · oklch · var · #hex · bare): ${realized.length}`);
const fr = realized.filter((m) => m.kind === "FALSE_REJECT_IN_SHAPE");
say(`    FALSE_REJECT ${fr.length} — candidate's rejecting production: ${JSON.stringify(tally(fr.map((m) => m.label)))}`);
say(`      of which the input carries a comma-rewrite shape (\\(\\s*, · ,\\s*, · ,\\s*\\) · ,/ · /, · trailing ,): ${fr.filter((m) => COMMA_REWRITE.test(m.s)).length} · a trailing-dot number: ${fr.filter((m) => TRAILING_DOT.test(m.s)).length} · both/neither: ${fr.filter((m) => !COMMA_REWRITE.test(m.s) && !TRAILING_DOT.test(m.s)).length}`);
say(`      samples (neither class): ${JSON.stringify(sample(fr.filter((m) => !COMMA_REWRITE.test(m.s) && !TRAILING_DOT.test(m.s)).map((m) => m.s), 12))}`);
const dv = realized.filter((m) => m.kind === "DIVERGENT_VALUE");
say(`    DIVERGENT_VALUE ${dv.length} — cause: ${JSON.stringify(tally(dv.map((m) => m.cause)))}`);
say(`      samples (other): ${JSON.stringify(sample(dv.filter((m) => m.cause === "other").map((m) => ({ s: m.s, o: m.oracle, c: m.candidate })), 6))}`);
const ma = realized.filter((m) => m.kind === "MIS_ACCEPT");
say(`    MIS_ACCEPT ${ma.length} — the oracle's own rejection label: ${JSON.stringify(tally(ma.map((m) => m.oracleLabel)))}`);
say(`      samples: ${JSON.stringify(sample(ma.map((m) => m.s), 12))}`);
out.D = {
    cells: sets.accept.length + sets.reject.length, accept: sets.accept.length, reject: sets.reject.length,
    misses: M.length, identicalAcrossLowerings: identical, byKind, byHead,
    unrealizedHeadBand: { count: unrealized.length, byKindHead: tally(unrealized.map((m) => `${m.kind}:${headOf(m.s)}`)), sample: sample(unrealized.map((m) => m.s), 16) },
    realizedHeadBand: {
        count: realized.length,
        falseReject: { count: fr.length, byLabel: tally(fr.map((m) => m.label)), commaRewrite: fr.filter((m) => COMMA_REWRITE.test(m.s)).length, trailingDot: fr.filter((m) => TRAILING_DOT.test(m.s)).length, neither: sample(fr.filter((m) => !COMMA_REWRITE.test(m.s) && !TRAILING_DOT.test(m.s)).map((m) => m.s), 24) },
        divergentValue: { count: dv.length, byCause: tally(dv.map((m) => m.cause)), otherSample: sample(dv.filter((m) => m.cause === "other").map((m) => ({ s: m.s, o: m.oracle, c: m.candidate })), 12) },
        misAccept: { count: ma.length, byOracleLabel: tally(ma.map((m) => m.oracleLabel)), sample: sample(ma.map((m) => m.s), 24) },
    },
};

/* ── E. Θ per entry today (INFO-g1) ─────────────────────────────────────────────────────────── */
say("\n── E. Θ per entry, as derived at this seat (unchanged: no grammar byte landed)");
const perEntry = Object.fromEntries(Object.entries(CLASS3_CEILINGS.perEntry).map(([k, r]) => [k, { rate: r.rate, fixed: r.fixed, cells: r.cells, exp: r.exp, mw: r.mw }]));
say(`  THETA ${JSON.stringify(THETA)}`);
say(`  per entry ${JSON.stringify(perEntry)}`);
say(`  CLASS3_PROOF ${JSON.stringify({ input: CLASS3_PROOF.input, vstack: CLASS3_PROOF.vstack, arena: CLASS3_PROOF.arena, expsnap: CLASS3_PROOF.expsnap })}`);
say(`  L.length ${L.length} · L.indexOf("<string>") ${L.indexOf("<string>")} · PRODUCTION_LABELS rows ${Object.keys(PRODUCTION_LABELS).length} · R_cls ${Object.keys(R_cls).length} · R_kw ${Object.keys(R_kw).length} · R_disp ${Object.keys(R_disp).length} · R_ctor ${Object.keys(R_ctor).length}`);
say(`  public entries [${PUBLIC_ENTRIES.map((r) => r.name).join(" · ")}] · unrealized [${UNREALIZED_ENTRIES.join(" · ")}]`);
out.E = { THETA, perEntry, CLASS3_PROOF: { input: CLASS3_PROOF.input, vstack: CLASS3_PROOF.vstack, arena: CLASS3_PROOF.arena, expsnap: CLASS3_PROOF.expsnap }, L: L.length, stringIndex: L.indexOf("<string>"), productionLabels: Object.keys(PRODUCTION_LABELS).length, registries: { R_cls: Object.keys(R_cls).length, R_kw: Object.keys(R_kw).length, R_disp: Object.keys(R_disp).length, R_ctor: Object.keys(R_ctor).length }, publicEntries: PUBLIC_ENTRIES.map((r) => r.name), unrealized: [...UNREALIZED_ENTRIES] };

/* ── F. the shield ──────────────────────────────────────────────────────────────────────────── */
say("\n── F. the shield, after every call above");
say(`  SHIELD.caught = ${SHIELD.caught} · faults ${JSON.stringify(SHIELD.faults())}`);
out.F = { shieldAtExit: SHIELD.caught, faults: SHIELD.faults() };

if (process.argv[2]) {
    const { writeFileSync } = await import("node:fs");
    writeFileSync(process.argv[2], `${JSON.stringify(out, null, 2)}\n`);
    say(`\nwrote ${process.argv[2]}`);
}
