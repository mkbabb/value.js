// SERVED MODEL: claude-opus-5[1m]
//
// X.P.W4.h — THE TWO-CELL CENSUS, RE-EMITTED (COHESION §0ab bullet 2; W4.md FIFTH addendum).
//
// A NEW dated file BESIDE W3's evidence (E-3): nothing under `evidence/W3/**` is touched. The two
// cells are `ADJUDICATION-W4.md`'s `#40` and `#41` — the pair F-w4f-2 held as candidate
// mirror-defects. The census reads each cell, and its controls, from 4.0.0 (the pinned oracle) and
// from BOTH candidate lowerings, and prints `identical` exactly when all three answer the same
// verdict AND the same value.
//
//   node docs/tranches/X/parse-that/evidence/W4/two-cell-census-2026-09-19-w4h.mjs
//
// The controls are the variables the ruling turns on, each held against its own cell: the SPACED
// form (which was already ACCEPT and must stay so), the one-line minimal form, the two forms 4.0.0
// itself refuses (`red ! important`, `red! important` — the gap SH-3 closed), the case fold
// §5.4.7 asks for, and F-w4f-1's own subject (a non-ident declaration NAME, which must now REJECT).
import { pathToFileURL } from "node:url";

import { PUBLISHED_400_JS } from "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/test/css-totality/lib/pin.mjs";
//  `ruledValue` is the SAME resolver the differential compares through (`lib/differential.mjs`:
//  "the ruling's arithmetic, not the raw incumbent value"). `identical` below therefore means what
//  the seam means by it, and the RAW column is printed beside it so nothing is smoothed: `#41`'s
//  raw delta is GROUND-C's clamp (`hsl(… -338 -290)` → `0`), ruled at COHESION §0v, candidate
//  correct, and it is NOT part of F-w4f-2.
import { ruledValue } from "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/test/css-totality/lib/adjudications.mjs";
import { loadPublicSurfaces } from "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/src/css/entry.mjs";

const oracle = await import(pathToFileURL(PUBLISHED_400_JS).href);
const { js, wasm } = await loadPublicSurfaces();

const canon = (v) =>
    JSON.stringify(v, (k, x) =>
        x && typeof x === "object" && !Array.isArray(x)
            ? Object.fromEntries(Object.keys(x).sort().map((key) => [key, x[key]]))
            : x,
    );
const read = (f, src, rule = false) => {
    try {
        const r = f(src);
        if (!r.ok) return "REJECT";
        return `ACCEPT ${canon(rule ? ruledValue(src, r.value).value : r.value)}`;
    } catch (e) {
        return `THROW ${e.message}`;
    }
};

/** cell id · what it is · the input. `#40` / `#41` are ADJUDICATION-W4.md's own abridged rows. */
const ROWS = [
    ["#40", "cell", "b { background-color: var(--brand) -!important }"],
    ["#41", "cell", "#d { background-color: hsl(73.416 -338 -290)!important } .c { color: red }"],
    ["ctl-spaced", "control (was ACCEPT, must stay)", "b { color: red !important }"],
    ["ctl-minimal", "control (F-w4f-2 in one line)", "b { color: red!important }"],
    ["ctl-40-spaced", "control (#40 with the space)", "b { background-color: var(--brand) - !important }"],
    ["ctl-gap", "control (4.0.0 REFUSES the gap)", "b { color: red ! important }"],
    ["ctl-gap2", "control (4.0.0 REFUSES the gap)", "b { color: red! important }"],
    ["ctl-fold", "control (§5.4.7 is case-insensitive)", "b { color: red!IMPORTANT }"],
    ["ctl-tail-ws", "control (trailing ws after the pair)", "b { color: red!important   }"],
    ["ctl-semi", "control (the pair before a `;`)", "b { color: red!important; background: blue }"],
    ["ctl-twice", "control (a second pair is not a tail)", "b { color: red!important!important }"],
    ["f1-col!r", "F-w4f-1 (a non-ident NAME)", "a { col!r: red }"],
    ["f1-lead", "F-w4f-1 (a non-ident NAME)", "a { !color: red }"],
    ["f1-trail", "F-w4f-1 (a non-ident NAME)", "a { color!: red }"],
    ["f1-digit", "F-w4f-1 (§4.3.9: no leading digit)", "a { 1color: red }"],
    ["f1-ok", "F-w4f-1 control (an ident NAME)", "a { color: red }"],
    ["f1-custom", "F-w4f-1 control (a custom property)", "a { --brand: red }"],
    ["f1-ws", "F-w4f-1 control (§5.4.4's optional ws)", "a { color : red }"],
    ["neq-spaced", "incumbent splitter control", "a { color: red != blue }"],
    ["neq-abut", "incumbent splitter control (ONE token there)", "a { color: red!= blue }"],
];

const out = [];
for (const [id, kind, src] of ROWS) {
    const oRaw = read(oracle.parseStylesheet, src);
    const o = read(oracle.parseStylesheet, src, true);
    const j = read(js.parseStylesheet, src);
    const w = read(wasm.parseStylesheet, src);
    const disposition = o === j && j === w ? "identical" : j === w ? "declared-divergence" : "LOWERINGS DISAGREE";
    const rawSame = oRaw === j;
    out.push({ id, kind, src, disposition, rawSame, oracleRaw: oRaw.slice(0, 400), oracleRuled: o.slice(0, 400), js: j.slice(0, 400), wasm: w.slice(0, 400) });
    console.log(`${id.padEnd(14)} ${disposition.padEnd(20)} raw-identical ${rawSame ? "yes" : "no "} ${JSON.stringify(src)}`);
    console.log(`  4.0.0 ruled ${o.slice(0, 150)}`);
    console.log(`  js          ${j.slice(0, 150)}`);
    console.log(`  wasm        ${w.slice(0, 150)}`);
    if (!rawSame) console.log(`  4.0.0 raw   ${oRaw.slice(0, 150)}`);
}

const cells = out.filter((r) => r.kind === "cell");
console.log(
    `\ncells #40/#41: ${cells.map((c) => `${c.id} ${c.disposition}`).join(" · ")} · ` +
        `rows ${out.length} · identical ${out.filter((r) => r.disposition === "identical").length} · ` +
        `declared-divergence ${out.filter((r) => r.disposition === "declared-divergence").length} · ` +
        `lowerings disagree ${out.filter((r) => r.disposition === "LOWERINGS DISAGREE").length}`,
);
if (process.argv.includes("--json")) console.log(JSON.stringify({ schema: "x-p-w4.h.two-cell-census/1", rows: out }, null, 1));
