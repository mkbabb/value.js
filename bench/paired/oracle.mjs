// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.o` (a) — THE GOLDEN ORACLE: the current BBNF path frozen, hash-pinned, before anything moves.
// Sections (one NDJSON row each: [section, key, canonical result]):
//   entry:<E>        the 7 entries × the 29,944 sources of record (key = source index into INPUTS)
//   reader:<label>   the 19 reader calls (15 `sheet.ts` readers, `timelineArgs` × scroll|view, `splitTopLevel` × , ; space)
//                    over INPUTS (key = index) AND over the reader-shaped corpus (key = the argument list)
//   harvest          the reader-shaped corpus itself: every distinct argument list a reader received while
//                    `parseStylesheet` (+ the collect* walks) ran over the real corpus, keyframes.js's frozen
//                    sheets and the G-large sheets, and `parseAnimation{Timeline,Range}` over the real corpus (recorder arm)
//   public:*         `coerceToSyntax` (INPUTS × the syntax set; an answer equal to `parseCssValue`'s is written
//                    `{ $same: "entry:parseCssValue" }`), `parseAnimationRange`, `parseAnimationTimeline`
//   collect:*        `collect{Keyframes,PropertyDescriptors,CustomFunctions,StyleRules}` on every accepted sheet;
//                    `collect{Declarations,AnimationOptions,TimelineOptions}` on every declaration list in it
// The canonical form is isDeepStrictEqual's relation written out: own enumerable string keys sorted, the
// prototype named ($c), undefined / NaN / ±Infinity / -0 tagged, Map/Set entries in order, a throw as its message.
//   node bench/paired/oracle.mjs freeze   → writes oracle/golden.ndjson.gz + oracle/golden.sha256
//   node bench/paired/oracle.mjs check    → regenerates from the product and compares sha256 (O-1)
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";
import { ENTRIES, HERE, INPUTS, KEYFRAMES_SHEETS, REAL, largeSheets } from "./common.mjs";

export const DIR = path.join(HERE, "oracle");
export const GOLDEN = path.join(DIR, "golden.ndjson.gz");
export const PIN = path.join(DIR, "golden.sha256");

/** isDeepStrictEqual's relation as a canonical value (JSON-safe). */
export function canon(v, seen = new Set()) {
    if (v === undefined) return { $u: 1 };
    if (typeof v === "number") return Number.isFinite(v) && !Object.is(v, -0) ? v : { $n: Object.is(v, -0) ? "-0" : String(v) };
    if (typeof v === "bigint") return { $b: String(v) };
    if (typeof v === "symbol") return { $s: String(v) };
    if (typeof v === "function") return { $f: v.name };
    if (v === null || typeof v !== "object") return v;
    if (seen.has(v)) return { $cycle: 1 };
    seen.add(v);
    let out;
    if (Array.isArray(v)) out = v.map((x) => canon(x, seen));
    else if (v instanceof Map) out = { $map: [...v].map(([k, x]) => [canon(k, seen), canon(x, seen)]) };
    else if (v instanceof Set) out = { $set: [...v].map((x) => canon(x, seen)) };
    else {
        out = {};
        const proto = Object.getPrototypeOf(v);
        if (proto !== Object.prototype) out.$c = proto === null ? null : proto.constructor?.name ?? "?";
        for (const k of Object.keys(v).sort()) out[k] = canon(v[k], seen);
    }
    seen.delete(v);
    return out;
}
const call = (fn, ...a) => { try { return canon(fn(...a)); } catch (e) { return { $throw: String(e?.message ?? e) }; } };

/** The 19 reader calls, bound to an arm module: [label, (m) => fn(...args)]. */
export function readerCalls(m) {
    const out = [];
    for (const r of Object.keys(m.sheet).filter((k) => typeof m.sheet[k] === "function")) {
        if (r === "timelineArgs") { for (const kind of ["scroll", "view"]) out.push([`timelineArgs(${kind})`, (s) => m.sheet[r](kind, s)]); continue; }
        out.push([r, (s) => m.sheet[r](s)]);
    }
    for (const sep of [",", ";", "space"]) out.push([`splitTopLevel(${sep})`, (s) => m.splitTopLevel(s, sep)]);
    return out;
}
/** A harvested log row → [reader label, the single source argument]. */
const labelOf = ([name, ...args]) => name === "timelineArgs" ? [`timelineArgs(${args[0]})`, args[1]]
    : name === "splitTopLevel" ? [`splitTopLevel(${args[1]})`, args[0]] : [name, args[0]];

/** Every `declarations` array inside a parsed sheet. */
function declarationLists(v, out = []) {
    if (v && typeof v === "object") {
        if (Array.isArray(v.declarations)) out.push(v.declarations);
        for (const x of Array.isArray(v) ? v : Object.values(v)) declarationLists(x, out);
    }
    return out;
}
export const SYNTAXES = ["*", "<length>", "<number>", "<percentage>", "<length-percentage>", "<color>", "<angle>", "<time>",
    "<integer>", "<custom-ident>", "<length>+", "<number>#", "<length> | auto", "<color> | none", "<resolution>", "<flex>"];
export const SHEETS = () => [...new Set([...REAL, ...KEYFRAMES_SHEETS, ...largeSheets().map((s) => s.text)])];

/** The reader-shaped corpus: the recorder arm's log over the real sheets, as sorted distinct [label, source] rows. */
export async function harvest() {
    const R = await import(path.join(HERE, "_build", "recorder.mjs"));
    globalThis.__readerLog = globalThis.__readerLog ?? [];
    globalThis.__readerLog.length = 0;
    globalThis.__recording = true;
    for (const s of SHEETS()) {
        const r = R.css.parseStylesheet(s);
        if (!r.ok) continue;
        R.css.collectKeyframes(r.value); R.css.collectPropertyDescriptors(r.value); R.css.collectCustomFunctions(r.value); R.css.collectStyleRules(r.value);
        for (const d of declarationLists(r.value)) { R.css.collectDeclarations(d); R.css.collectAnimationOptions(d); R.css.collectTimelineOptions(d); }
    }
    // The timeline readers (timelineArgs, opensTimeline, isDashedIdent, isTimelineLength) are reached from the
    // public timeline entries, not from a sheet: their reader-shaped inputs come from those entries over the real corpus.
    for (const s of REAL) { R.css.parseAnimationTimeline(s); R.css.parseAnimationRange(s); }
    globalThis.__recording = false;
    const rows = new Map();
    for (const row of globalThis.__readerLog) { const [label, s] = labelOf(row); rows.set(JSON.stringify([label, s]), [label, s]); }
    return [...rows.keys()].sort().map((k) => rows.get(k));
}

/** Generates every oracle row for one arm module (the product's shape: { css, sheet, splitTopLevel }). */
export function generate(m, reader, { entryAndReaderOnly = false } = {}) {
    const lines = [];
    const put = (section, key, val) => lines.push(JSON.stringify([section, key, val]));
    for (const e of ENTRIES) INPUTS.forEach((s, i) => put(`entry:${e}`, i, call(m.css[e], s)));
    const calls = readerCalls(m);
    for (const [label, fn] of calls) INPUTS.forEach((s, i) => put(`reader:${label}`, i, call(fn, s)));
    for (const [label, s] of reader) put("harvest", label, s);
    const byLabel = new Map(calls);
    for (const [label, s] of reader) put(`reader:${label}`, [s], call(byLabel.get(label), s));
    if (entryAndReaderOnly) return lines.join("\n") + "\n";
    const syntaxes = [...new Set([...SYNTAXES, ...reader.filter(([l]) => l === "syntaxComponents").map(([, s]) => s)])];
    // A coerceToSyntax answer identical to `parseCssValue`'s on the same source (the passthrough: a refusal, or a
    // match) is written as a reference to that row, losslessly: only the syntax-specific answers carry bytes.
    const valueRow = INPUTS.map((s) => JSON.stringify(call(m.css.parseCssValue, s)));
    for (const syn of syntaxes) INPUTS.forEach((s, i) => {
        const r = call(m.css.coerceToSyntax, s, syn);
        put(`public:coerceToSyntax(${syn})`, i, JSON.stringify(r) === valueRow[i] ? { $same: "entry:parseCssValue" } : r);
    });
    for (const f of ["parseAnimationRange", "parseAnimationTimeline"]) INPUTS.forEach((s, i) => put(`public:${f}`, i, call(m.css[f], s)));
    const sheets = SHEETS();
    sheets.forEach((s, i) => {
        const r = m.css.parseStylesheet(s);
        put("collect:parseStylesheet(sheet)", i, canon(r));
        if (!r.ok) return;
        for (const f of ["collectKeyframes", "collectPropertyDescriptors", "collectCustomFunctions", "collectStyleRules"]) put(`collect:${f}`, i, call(m.css[f], r.value));
        declarationLists(r.value).forEach((d, j) => {
            for (const f of ["collectDeclarations", "collectAnimationOptions", "collectTimelineOptions"]) put(`collect:${f}`, [i, j], call(m.css[f], d));
        });
    });
    return lines.join("\n") + "\n";
}

export const sha256 = (s) => createHash("sha256").update(s).digest("hex");
export const readGolden = () => gunzipSync(readFileSync(GOLDEN)).toString("utf8");

if (import.meta.url === `file://${process.argv[1]}`) {
    const mode = process.argv[2] ?? "check";
    const reader = await harvest();
    const m = await import(path.join(HERE, "_build", "product.mjs"));
    m.css.parseCssColor("red");
    const text = generate(m, reader);
    const digest = sha256(text);
    const stats = `${text.split("\n").length - 1} rows · ${Buffer.byteLength(text)} B · harvest ${reader.length} · sha256 ${digest}`;
    if (mode === "freeze") {
        mkdirSync(DIR, { recursive: true });
        writeFileSync(GOLDEN, gzipSync(text, { level: 9 }));
        writeFileSync(PIN, `${digest}  golden.ndjson (gunzipped golden.ndjson.gz)\n`);
        console.log("FROZEN", stats);
    } else {
        const pinned = readFileSync(PIN, "utf8").split(/\s+/)[0];
        const stored = sha256(readGolden());
        const ok = digest === pinned && stored === pinned;
        console.log(ok ? "O-1 GREEN" : "O-1 RED", `regenerated ${digest} · stored ${stored} · pinned ${pinned} ·`, stats);
        process.exitCode = ok ? 0 : 1;
    }
}
