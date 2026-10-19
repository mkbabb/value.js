// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.eq` (W7.md ADDENDUM (g) 1; COHESION §0ed, R-l4-2) — THE EQUAL-WORK LARGE-SHEET CORPUS, derived and dated.
// A speed cell compares the same work. The banked G-large sheets (`sheets/`, `.o`'s frozen input, E-3: never
// modified) are refused by both arms, and not always at the same point (`wpt-bulma-0.7.5.css`: the retired parser
// refuses declaration 32, the legacy-comma `rgba()` css-color-4 admits; the product reads to 946). This script cuts
// each banked sheet at its COMMON ACCEPTED PREFIX — the longest prefix of whole top-level rules that both arms
// accept, each rule to the same result — and freezes the prefixes into `bench/corpus/large-prefix-2026-09-25/`
// with a MANIFEST: per sheet, the cut (whole rules kept, UTF-16 offset, bytes, sha256, declarations kept) and both
// arms' refusal indices.
//   Rule boundaries: the product's `ruleList` reader (the grammar decides every boundary); each block is aligned to
//     its source span (trimmed prelude, then the raw body between its braces, or the `;`) and the alignment is
//     verified: the prefix's own `ruleList` returns exactly the kept blocks, with no fault.
//   A rule is kept while BOTH arms accept it read alone as a sheet AND the two results are equal under the
//     oracle's canonical relation (`oracle.mjs` `canon`, isDeepStrictEqual's). The first rule that fails either
//     test ends the prefix; the prefix read whole must then be accepted by both arms, equal.
//   Refusal index (the ruling's unit, `.l4`'s count): the 0-based index of the declaration an arm refuses, in the
//     document order of the declarations the product's `declaration` reader receives (harvested rule by rule by
//     the recorder arm, so the count continues past the product's own refusal) = the number of declarations
//     before it. The refused declaration is the first in the arm's first refused rule whose value that arm's
//     `parseCssValue` refuses, and the arm's `parseStylesheet` diagnostic on that rule must equal its
//     `parseCssValue` diagnostic on the value (else the script throws). The whole-sheet `parseStylesheet`
//     diagnostic is recorded beside it (a structural fault, e.g. value-js-index's unclosed block, precedes every
//     rule-level refusal when the arms read the whole sheet).
// Needs `build.mjs`'s arms (retired, product, recorder).
//   node bench/paired/prefix.mjs freeze   → writes the corpus + MANIFEST.json (refuses to overwrite a different one)
//   node bench/paired/prefix.mjs check    → regenerates from the banked sheets and compares with the MANIFEST
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BUILD, PREFIX_CORPUS, REPO, RETIRED_AT, arm, largePrefixSheets, largeSheets } from "./common.mjs";
import { canon } from "./oracle.mjs";

const sha256 = (s) => createHash("sha256").update(s).digest("hex");
const J = (v) => JSON.stringify(canon(v));
/** A whole-sheet diagnostic as the manifest keeps it: `actual` cut to 120 code units (value-js-index's runs to the end). */
const brief = (d) => d && d.map((x) => ({ ...x, actual: x.actual.slice(0, 120), actualLength: x.actual.length }));
const diag = (r) => (r.ok ? null : r.diagnostics.map(({ code, start, end, expected, actual }) => ({ code, start, end, expected, actual })));

/** The kept blocks' source spans [start, end) — the product's `ruleList` aligned to the text. */
function spans(text, blocks) {
    const out = [];
    let cursor = 0;
    for (const [i, b] of blocks.entries()) {
        const start = text.indexOf(b.prelude, cursor);
        if (start < 0) throw new Error(`block ${i}: prelude not found`);
        let end = start + b.prelude.length;
        if (b.body === null) {
            end = text.indexOf(";", end);
            if (end < 0) throw new Error(`block ${i}: no ';'`);
        } else {
            end = text.indexOf("{", end);
            if (!text.startsWith(b.body, end + 1) || text[end + 1 + b.body.length] !== "}") throw new Error(`block ${i}: body misaligned`);
            end += 1 + b.body.length;
        }
        out.push([start, end + 1]);
        cursor = end + 1;
    }
    return out;
}

/** One banked sheet → its manifest row and prefix text. */
function derive(sheet, R, P, REC) {
    const text = sheet.text;
    if (sha256(text) !== sheet.sha256) throw new Error(`${sheet.file}: banked sha256 drift (E-3)`);
    const { blocks, fault } = P.m.sheet.ruleList(text);
    const at = spans(text, blocks);
    globalThis.__readerLog ??= [];
    const rules = at.map(([s, e]) => {
        const src = text.slice(s, e);
        globalThis.__readerLog.length = 0;
        globalThis.__recording = true;
        try { REC.css.parseStylesheet(src); } finally { globalThis.__recording = false; }
        const declarations = globalThis.__readerLog.filter((row) => row[0] === "declaration").map((row) => P.m.sheet.declaration(row[1]));
        return { src, declarations, r: R.fns.parseStylesheet(src), p: P.fns.parseStylesheet(src) };
    });
    const before = (i) => rules.slice(0, i).reduce((n, x) => n + x.declarations.length, 0);
    let cut = rules.findIndex((x) => !x.r.ok || !x.p.ok || J(x.r) !== J(x.p));
    if (cut < 0) cut = rules.length;
    const refusal = (who, fns) => {
        const rule = rules.findIndex((x) => !x[who].ok);
        if (rule < 0) return null;
        const x = rules[rule];
        const k = x.declarations.findIndex((d) => d && !fns.parseCssValue(d.value).ok);
        if (k < 0 || J(diag(fns.parseCssValue(x.declarations[k].value))) !== J(diag(x[who])))
            throw new Error(`${sheet.file}: ${who}'s refusal of rule ${rule} is not a declaration value refusal`);
        const d = x.declarations[k];
        return { rule, declaration: before(rule) + k, name: d.name, value: d.value, diagnostic: diag(x[who]) };
    };
    const prefix = cut === 0 ? "" : text.slice(0, at[cut - 1][1]);
    const re = P.m.sheet.ruleList(prefix);
    if (re.fault !== undefined || J(re.blocks) !== J(blocks.slice(0, cut))) throw new Error(`${sheet.file}: the prefix's rule list is not the kept blocks`);
    const r = R.fns.parseStylesheet(prefix), p = P.fns.parseStylesheet(prefix);
    if (!r.ok || !p.ok || J(r) !== J(p)) throw new Error(`${sheet.file}: the prefix is not accepted equal by both arms`);
    const whole = { retired: brief(diag(R.fns.parseStylesheet(text))), product: brief(diag(P.fns.parseStylesheet(text))) };
    return { text: prefix, row: {
        file: sheet.file, from: `bench/paired/sheets/${sheet.file}`, fromSha256: sheet.sha256, fromBytes: sheet.bytes,
        rules: blocks.length, ruleListFault: fault ?? null, declarationsReadable: before(rules.length),
        cut: { rules: cut, offset: prefix.length, bytes: Buffer.byteLength(prefix), declarations: before(cut),
            endsBefore: cut < rules.length ? rules[cut].src.slice(0, 120) : null },
        sha256: sha256(prefix), bytes: Buffer.byteLength(prefix),
        refusal: { retired: refusal("r", R.fns), product: refusal("p", P.fns) },
        wholeSheet: whole,
    } };
}

export async function generate() {
    const R = await arm("retired"), P = await arm("product");
    const REC = await import(path.join(BUILD, "recorder.mjs"));
    const provenance = JSON.parse(readFileSync(path.join(BUILD, "provenance.json"), "utf8"));
    const out = largeSheets().map((s) => derive(s, R, P, REC));
    const manifest = {
        note: "X.P.W7 .eq (W7.md ADDENDUM (g) 1, COHESION §0ed): the equal-work large-sheet corpus — each banked G-large sheet cut at its common accepted prefix. Generated by bench/paired/prefix.mjs from bench/paired/sheets/ (unchanged, E-3). Refusal indices: 0-based declaration index in the product readers' document order (= declarations before the refused one).",
        dated: "2026-09-25", retiredAt: RETIRED_AT, productAt: provenance.valuejsHead, productSrcDirty: provenance.srcDirty,
        sheets: out.map((x) => x.row),
    };
    return { manifest, texts: out.map((x) => [x.row.file, x.text]) };
}

/** The equal-work equivalence rows: each prefix, and each of its rules read alone, on the retired arm and `name`. */
export async function prefixEquivalence(name = "product") {
    const R = await arm("retired"), A = await arm(name);
    const report = { arm: name, sheets: 0, rows: 0, mismatches: 0, refused: 0, declarations: 0, bySheet: {} };
    for (const s of largePrefixSheets()) {
        report.sheets++;
        const r = R.fns.parseStylesheet(s.text), a = A.fns.parseStylesheet(s.text);
        const blocks = A.m.sheet.ruleList(s.text).blocks;
        const rows = [[r, a], ...spans(s.text, blocks).map(([b, e]) => [R.fns.parseStylesheet(s.text.slice(b, e)), A.fns.parseStylesheet(s.text.slice(b, e))])];
        const bad = rows.filter(([x, y]) => J(x) !== J(y)).length;
        const refused = rows.filter(([x, y]) => !x.ok || !y.ok).length;
        report.rows += rows.length; report.mismatches += bad; report.refused += refused; report.declarations += s.cut.declarations;
        report.bySheet[s.file] = { rules: blocks.length, rows: rows.length, mismatches: bad, refused, declarations: s.cut.declarations,
            manifestRules: s.cut.rules };
        if (blocks.length !== s.cut.rules) report.mismatches++;
    }
    return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const mode = process.argv[2] ?? "check";
    const { manifest, texts } = await generate();
    const file = path.join(PREFIX_CORPUS, "MANIFEST.json");
    const body = JSON.stringify(manifest, null, 1) + "\n";
    const summary = manifest.sheets.map((s) => `${s.file.padEnd(32)} cut ${s.cut.rules}/${s.rules} rules · ${s.cut.offset} of ${s.fromBytes} B · ` +
        `${s.cut.declarations} decls · refusal retired ${s.refusal.retired?.declaration ?? "-"} product ${s.refusal.product?.declaration ?? "-"}`).join("\n");
    if (mode === "freeze") {
        if (existsSync(file) && readFileSync(file, "utf8") !== body) throw new Error("a different MANIFEST is frozen: a dated corpus is never rewritten; mint a new date");
        mkdirSync(PREFIX_CORPUS, { recursive: true });
        for (const [name, text] of texts) writeFileSync(path.join(PREFIX_CORPUS, name), text);
        writeFileSync(file, body);
        console.log("FROZEN", path.relative(REPO, PREFIX_CORPUS), `\n${summary}`);
    } else {
        const frozen = readFileSync(file, "utf8");
        // The product's commit moves; the cut must not.
        const strip = (s) => JSON.stringify({ ...JSON.parse(s), productAt: undefined, productSrcDirty: undefined });
        const onDisk = texts.every(([name, text]) => readFileSync(path.join(PREFIX_CORPUS, name), "utf8") === text);
        const ok = strip(frozen) === strip(body) && onDisk;
        console.log(ok ? "PREFIX CORPUS GREEN" : "PREFIX CORPUS RED (regenerated cut ≠ frozen)", `\n${summary}`);
        process.exitCode = ok ? 0 : 1;
    }
}
