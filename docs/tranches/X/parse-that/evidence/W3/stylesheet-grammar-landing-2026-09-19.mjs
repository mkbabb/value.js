// SERVED MODEL: claude-opus-5[1m]
//
// X.P.W3.j — the landing probe. It derives every figure the unit's receipt publishes from the
// settled bytes: the sha-pinned 4.0.0 ORACLE, the built candidate, and BOTH lowerings. Nothing
// below is asserted by hand; each section prints what it measured.
//
//   node landing.mjs [--json <path>]
//
// §A  the CTOR family's four name-sets (COHESION §0s E-h1) — N = N = N = N
// §B  G-1's rows for this unit's exports, in the TWO-NUMBER form (§0s E-h2): raw misses, and
//     misses that reduce to a declaration value the value grammar's own declared classes cover
// §C  G-3 — SHIELD.caught over every public entry × both lowerings × the real corpus sources
// §D  G-5 — the JS/Wasm identity of `parseStylesheet` over the union corpus
// §E  G-9 — Θ, re-derived and reported, with the class-3 proof
// §F  the label surface — K-10's append, measured at its own offset

import { readFileSync, writeFileSync } from "node:fs";

const ROOT = "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript";
const ORACLE = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/prototypes/css-parser/cand-o/vendor/value-js-4.0.0/dist/subpaths/css.js";

const oracle = await import(ORACLE);
const entry = await import(`${ROOT}/src/css/entry.mjs`);
const tables = await import(`${ROOT}/src/css/algebra/tables.mjs`);
const bounds = await import(`${ROOT}/src/css/bounds.mjs`);
const surfaces = await entry.loadPublicSurfaces();
const corpus = JSON.parse(readFileSync(`${ROOT}/test/css-totality/corpus.json`, "utf8"));

//  F-c3: 172 `r1`-band rows carry `s` wrapped as `{id, src}`; the source is `src` there.
const rows = corpus.rows.map((r) => (typeof r.s === "string" ? r.s : r.s.src));
const out = { servedModel: "claude-opus-5[1m]", unit: "X.P.W3.j", takenAt: new Date().toISOString() };
const line = (s) => console.log(s);

const call = (fn, ...a) => {
    try {
        return { threw: false, v: fn(...a) };
    } catch (e) {
        return { threw: true, why: `${e?.constructor?.name}: ${String(e?.message).slice(0, 80)}` };
    }
};
const J = (v) => JSON.stringify(v);

/* ── §A the CTOR family, four name-sets ─────────────────────────────────────────────────────── */

const setsOf = () => {
    const rctor = Object.keys(tables.R_ctor);
    const src = (p) => readFileSync(`${ROOT}/src/css/${p}`, "utf8");
    //  the keys of one frozen table, quoted or bare, packed or one per line. A key anchored at
    //  line start alone reads only the FIRST key of a packed line — the defect X.P.W3.i recorded
    //  in its own probe; the separator class `[{,]` is what makes the packed rows countable.
    const keys = (text, start) => {
        const a = text.indexOf(start);
        const b = text.indexOf("\n});", a);
        return [...text.slice(a + start.length, b).matchAll(/(?:^\s*|[{,]\s*)(?:"([a-z0-9-]+)"|([a-z0-9-]+))\s*:/gim)].map((m) => m[1] ?? m[2]);
    };
    const jsText = src("lowering-js/js-alg.mjs");
    const jsBody = jsText.slice(jsText.indexOf("const CTORS = {"), jsText.indexOf("\n};", jsText.indexOf("const CTORS = {")));
    const js = [...jsBody.matchAll(/^\s{4}(?:"([a-z0-9-]+)"|([a-z0-9-]+)):/gim)].map((m) => m[1] ?? m[2]);
    const wasmText = src("lowering-wasm/wasm-alg.mjs");
    const wasm = [...wasmText.matchAll(/declare\("([a-z0-9-]+)"/g)].map((m) => m[1]);
    for (const m of wasmText.matchAll(/for \(const rowName of \[([^\]]+)\]\)/g)) {
        for (const q of m[1].matchAll(/"([a-z0-9-]+)"/g)) wasm.push(q[1]);
    }
    const bText = src("bounds.mjs");
    //  CTOR_ALLOC is one row per line (`    name: { fixed, rate },`) — a `[{,]`-separated scan
    //  would also count its OWN `fixed:` and `rate:` keys, so this table is read line-anchored.
    const allocBody = bText.slice(bText.indexOf("const CTOR_ALLOC = Object.freeze({"), bText.indexOf("\n});", bText.indexOf("const CTOR_ALLOC = Object.freeze({")));
    const alloc = [...allocBody.matchAll(/^\s{4}(?:"([a-z0-9-]+)"|([a-z0-9-]+)):\s*\{/gim)].map((m) => m[1] ?? m[2]);
    const scratch = keys(bText, "const CTOR_SCRATCH_CELLS = Object.freeze({");
    const uniq = (a) => [...new Set(a)];
    return { rctor: uniq(rctor), js: uniq(js), wasm: uniq(wasm.filter((n) => rctor.includes(n))), alloc: uniq(alloc), scratch: uniq(scratch) };
};
const S = setsOf();
const eqSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
line("§A  the CTOR family (COHESION §0s E-h1) — one algebra write, three realizations");
line(`    R_ctor ${S.rctor.length} · js CTORS ${S.js.length} · wasm emitCtors ${S.wasm.length} · CTOR_ALLOC ${S.alloc.length} · CTOR_SCRATCH_CELLS ${S.scratch.length}`);
const ctorClosed = eqSet(S.rctor, S.js) && eqSet(S.rctor, S.wasm) && eqSet(S.rctor, S.alloc) && eqSet(S.rctor, S.scratch);
line(`    R_ctor ≡ js ≡ wasm ≡ alloc ≡ scratch  ${ctorClosed}`);
line(`    this unit's rows (since X.P.W3.j): ${Object.entries(tables.R_ctor).filter(([, r]) => r.since === "X.P.W3.j").map(([n]) => n).join(" · ") || "(none)"}`);
out.ctorFamily = { rctor: S.rctor.length, js: S.js.length, wasm: S.wasm.length, alloc: S.alloc.length, scratch: S.scratch.length, closed: ctorClosed };

/* ── §B G-1's rows, two numbers each ────────────────────────────────────────────────────────── */

/**
 * The declaration-value texts an input carries, by `stylesheet.ts`'s OWN algorithm, transcribed
 * here (this probe's tokenizer, stated rather than implied): `blocks()`'s prelude/body scan, then
 * `splitTopLevel(body, ";")`, then the first colon, then `!important` stripped.
 */
const splitTop = (source, sep) => {
    const parts = [];
    let depth = 0;
    let quote = "";
    let start = 0;
    for (let i = 0; i < source.length; i++) {
        const c = source.charAt(i);
        if (quote) {
            if (c === quote && source[i - 1] !== "\\") quote = "";
            continue;
        }
        if (c === '"' || c === "'") quote = c;
        else if (c === "(") depth++;
        else if (c === ")") depth--;
        else if (depth === 0 && c === sep) {
            const p = source.slice(start, i).trim();
            if (p) parts.push(p);
            start = i + 1;
        }
    }
    const tail = source.slice(start).trim();
    if (tail) parts.push(tail);
    return parts;
};
const valueTexts = (source) => {
    const texts = [];
    let cursor = 0;
    let guard = 0;
    while (cursor < source.length && guard++ < 4000) {
        while (cursor < source.length && /\s|;/.test(source[cursor])) cursor++;
        if (source.startsWith("/*", cursor)) {
            const e = source.indexOf("*/", cursor + 2);
            if (e < 0) break;
            cursor = e + 2;
            continue;
        }
        if (cursor >= source.length) break;
        let quote = "";
        let parens = 0;
        let boundary = -1;
        for (let i = cursor; i < source.length; i++) {
            const c = source[i];
            if (quote) {
                if (c === quote && source[i - 1] !== "\\") quote = "";
                continue;
            }
            if (c === '"' || c === "'") quote = c;
            else if (c === "(") parens++;
            else if (c === ")") parens--;
            else if (parens === 0 && (c === "{" || c === ";")) {
                boundary = i;
                break;
            }
        }
        if (boundary < 0) break;
        if (source[boundary] === ";") {
            cursor = boundary + 1;
            continue;
        }
        let depth = 1;
        quote = "";
        let end = boundary + 1;
        for (; end < source.length && depth > 0; end++) {
            const c = source[end];
            if (quote) {
                if (c === quote && source[end - 1] !== "\\") quote = "";
                continue;
            }
            if (c === '"' || c === "'") quote = c;
            else if (c === "{") depth++;
            else if (c === "}") depth--;
        }
        if (depth !== 0) break;
        for (const part of splitTop(source.slice(boundary + 1, end - 1), ";")) {
            const colon = part.indexOf(":");
            if (colon <= 0) continue;
            let text = part.slice(colon + 1).trim();
            if (/!important\s*$/i.test(text)) text = text.replace(/!important\s*$/i, "").trim();
            if (text) texts.push(text);
        }
        cursor = end;
    }
    return texts;
};

const valueDisagrees = (text) => {
    const o = call(oracle.parseCssValue, text);
    const c = call(entry.parseCssValue, text);
    if (o.threw || c.threw) return true;
    if ((o.v?.ok === true) !== (c.v?.ok === true)) return true;
    return o.v?.ok === true && J(o.v.value) !== J(c.v.value);
};

const rowCensus = (name) => {
    let raw = 0;
    let inClass = 0;
    let outside = 0;
    const outsideBy = {};
    const outsideSample = {};
    for (const s of rows) {
        const o = call(oracle[name], s);
        const c = call(entry[name], s);
        const oOk = !o.threw && o.v?.ok === true;
        const cOk = !c.threw && c.v?.ok === true;
        let miss = false;
        if (c.threw) miss = true;
        else if (oOk !== cOk) miss = true;
        else if (oOk && J(o.v.value) !== J(c.v.value)) miss = true;
        if (!miss) continue;
        raw += 1;
        if (valueTexts(s).some(valueDisagrees)) inClass += 1;
        else {
            outside += 1;
            //  sub-class the residue by the ONE feature that separates it (measured, not judged):
            //  SEL-EMPTY — a prelude whose top-level comma split has an EMPTY part, which the
            //  incumbent's `splitTopLevel` DROPS and the lowering's `splitSelectors` keeps;
            //  SH-1 — a prelude carrying an unbalanced paren or a quote, where `blocks()`'s signed
            //  paren counter and quote state read a boundary this byte class cannot.
            const prelude = s.slice(0, s.indexOf("{") < 0 ? s.length : s.indexOf("{"));
            const key = splitTop(prelude, ",").length !== prelude.split(",").length
                ? "SEL-EMPTY"
                : /[()"']/.test(prelude) ? "SH-1" : "other";
            outsideBy[key] = (outsideBy[key] ?? 0) + 1;
            if ((outsideSample[key] ??= []).length < 4) outsideSample[key].push(s.slice(0, 96));
        }
    }
    return { raw, inClass, outside, outsideBy, outsideSample };
};

line("");
line("§B  G-1 — this unit's rows, TWO NUMBERS each (COHESION §0s E-h2: raw misses · misses that");
line("    reduce to a declaration value the value grammar's own declared classes already carry)");
const sheetRow = rowCensus("parseStylesheet");
line(`    parseStylesheet   raw ${sheetRow.raw} · in-class ${sheetRow.inClass} · outside ${sheetRow.outside}  (of ${rows.length} corpus rows)`);
for (const [k, n] of Object.entries(sheetRow.outsideBy)) {
    line(`        outside, by the probe.s OWN first-prelude test (a sample split, not a ruling) — ${k}: ${n}`);
    for (const s of sheetRow.outsideSample[k]) line(`            ${J(s)}`);
}
out.g1 = { parseStylesheet: sheetRow };

//  the five collectors: the structured family's own criterion — no throw, declared shape — over
//  the ORACLE's own outputs, plus the seven declared degenerate values.
const sheets = [];
const declLists = [];
for (const s of rows) {
    if (sheets.length >= 400) break;
    const o = call(oracle.parseStylesheet, s);
    if (!o.threw && o.v?.ok === true) {
        sheets.push(o.v.value);
        for (const r of oracle.collectStyleRules(o.v.value)) {
            if (declLists.length < 400 && r.rule.declarations.length > 0) declLists.push(r.rule.declarations);
        }
    }
}
const DEGENERATE = [undefined, null, 42, {}, [], true, NaN];
const structured = {};
for (const [name, shape, inputs] of [
    ["collectStyleRules", "array", sheets], ["collectKeyframes", "array", sheets],
    ["collectPropertyDescriptors", "array", sheets], ["collectCustomFunctions", "array", sheets],
    ["collectDeclarations", "map", declLists],
]) {
    let cells = 0;
    let threw = 0;
    let badShape = 0;
    let equalsOracle = 0;
    for (const input of [...inputs, ...DEGENERATE]) {
        cells += 1;
        const c = call(entry[name], input);
        if (c.threw) { threw += 1; continue; }
        const okShape = shape === "array" ? Array.isArray(c.v) : c.v instanceof Map;
        if (!okShape) badShape += 1;
        const o = call(oracle[name], input);
        if (!o.threw) {
            const norm = (v) => (v instanceof Map ? J([...v.entries()]) : J(v));
            if (norm(o.v) === norm(c.v)) equalsOracle += 1;
        }
    }
    structured[name] = { cells, threw, badShape, equalsOracle };
    line(`    ${name.padEnd(28)} cells ${cells} · threw ${threw} · wrong shape ${badShape} · equal to the oracle ${equalsOracle}`);
}
out.structured = structured;

/* ── §C G-3 — the shield, over the real corpus sources ──────────────────────────────────────── */

line("");
line("§C  G-3 — SHIELD.caught, over every public member × both lowerings × the corpus");
const before = entry.SHIELD.caught;
let calls = 0;
let threw = 0;
const members = ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues", "parseTimingFunction",
    "parseStylesheet", "parseKeyframeSelector", "parseAnimationTimeline", "parseAnimationRange"];
for (const kind of ["js", "wasm"]) {
    for (const m of members) {
        for (const s of rows) {
            calls += 1;
            try { surfaces[kind][m](s); } catch { threw += 1; }
        }
        for (const d of DEGENERATE) {
            calls += 1;
            try { surfaces[kind][m](d); } catch { threw += 1; }
        }
    }
}
line(`    calls ${calls} · threw ${threw} · SHIELD.caught before ${before} after ${entry.SHIELD.caught} · faults ${J(entry.SHIELD.faults())}`);
out.g3 = { calls, threw, before, after: entry.SHIELD.caught, faults: entry.SHIELD.faults().length };

/* ── §D G-5 — `parseStylesheet`'s identity band ─────────────────────────────────────────────── */

line("");
line("§D  G-5 — `parseStylesheet`, JS vs Wasm, over the union corpus");
let cells = 0;
let differing = 0;
const unique = [...new Set(rows)];
for (const s of unique) {
    cells += 1;
    if (J(surfaces.js.parseStylesheet(s)) !== J(surfaces.wasm.parseStylesheet(s))) differing += 1;
}
for (const d of DEGENERATE) {
    cells += 1;
    if (J(surfaces.js.parseStylesheet(d)) !== J(surfaces.wasm.parseStylesheet(d))) differing += 1;
}
line(`    cells ${cells} (distinct sources ${unique.length} + ${DEGENERATE.length} declared non-string) · differing ${differing}`);
out.g5 = { cells, differing };

/* ── §E G-9 — Θ, re-derived and REPORTED ────────────────────────────────────────────────────── */

line("");
line("§E  G-9 — Θ, re-derived at the settled bytes (never narrowed silently; INFO-g1)");
line(`    THETA        ${J(bounds.THETA)}`);
line(`    CLASS3_PROOF ${J(bounds.CLASS3_PROOF)}`);
line(`    capacity labels carried: ${J(Object.values(bounds.CAPACITY_LABELS ?? {}))}`);
out.g9 = { theta: bounds.THETA, class3: bounds.CLASS3_PROOF };

/* ── §F K-10 — the label surface ────────────────────────────────────────────────────────────── */

line("");
line("§F  K-10 — the label append, at its own offset");
const mine = ["<whitespace-or-semicolon>", "rule-prelude", "declaration-name", "comment-text", "<comment>", "'/*'", "'*'", "'*/'"];
const at = tables.L.indexOf(mine[0]);
line(`    L.length ${tables.L.length} · this unit's block [${at}..${at + mine.length - 1}] · contiguous ${J(tables.L.slice(at, at + mine.length)) === J(mine)}`);
line(`    anchors: "<string>" @${tables.L.indexOf("<string>")} · "input <= 14107" @${tables.L.indexOf("input <= 14107")} · injective ${new Set(tables.L).size === tables.L.length}`);
out.labels = { length: tables.L.length, at, contiguous: J(tables.L.slice(at, at + mine.length)) === J(mine), injective: new Set(tables.L).size === tables.L.length };

const jsonAt = process.argv.indexOf("--json");
if (jsonAt > 0) writeFileSync(process.argv[jsonAt + 1], `${JSON.stringify(out, null, 2)}\n`);
