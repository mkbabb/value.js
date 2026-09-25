// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.o` — THE PAIRED INSTRUMENT (bench of record, R-3), shared loaders. Promoted from the W7
// judge's harness (`docs/tranches/X/parse-that/evidence/W7-research/judge/harness/common.mjs`).
// Arms are esbuild bundles that `build.mjs` writes into `bench/paired/_build/` (git-ignored by `_*`):
//   retired   src/css/{grammar,stylesheet}.ts at RETIRED_AT (git archive, blob-pinned) — THE BASELINE
//   product   value.js HEAD's public `/css` surface (src/css/index.ts) + the stylesheet readers
//   recorder  `product` with every reader call site wrapped to log its arguments (the harvest)
//   banked:<name>   a W7-research arm read from `judge/banked-tmp/` (MANIFEST-verified), never $TMPDIR
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

export const REPO = path.resolve(import.meta.dirname, "..", "..");
export const HERE = import.meta.dirname;
export const BUILD = path.join(HERE, "_build");
export const RECORDS = path.join(REPO, "bench", "records");
export const BANKED = path.join(REPO, "docs/tranches/X/parse-that/evidence/W7-research/judge/banked-tmp");
export const RETIRED_AT = "2155142bad8b7ac8292ad2263f232a47a656f36e";
export const RETIRED_BLOB = "320b47af067c9817c253221fd819bd2c84e53f2a";
export const ENTRIES = ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues", "parseKeyframeSelector", "parseTimingFunction", "parseStylesheet"];

const corpus = (file) => JSON.parse(readFileSync(path.join(REPO, "bench/css-equivalence", file), "utf8")).rows
    .map((r) => (typeof r.s === "string" ? r.s : r.s.src));
/** The bench of record's population: the distinct sources of assay ∪ real (29,944). */
export const INPUTS = [...new Set([...corpus("assay-corpus.json"), ...corpus("real-corpus.json")])];
/** The real corpus alone (the reader harvest's population), plus keyframes.js's frozen sheets. */
export const REAL = [...new Set(corpus("real-corpus.json"))];
export const KEYFRAMES_SHEETS = JSON.parse(readFileSync(path.join(REPO, "bench/css-equivalence/keyframes-sheets.json"), "utf8")).sheets;

/** The G-large sheets (`sheets/MANIFEST.json`, sha256-pinned; `sheets.mjs` freezes them). */
export function largeSheets() {
    const m = JSON.parse(readFileSync(path.join(HERE, "sheets", "MANIFEST.json"), "utf8"));
    return m.sheets.map((s) => ({ ...s, text: readFileSync(path.join(HERE, "sheets", s.file), "utf8") }));
}

/** The equal-work large cell's corpus (X.P.W7 `.eq`, ADDENDUM (g)): each G-large sheet cut at the common accepted
 *  prefix of both arms, derived by `prefix.mjs` (the manifest's sha256 is checked on every load). */
export const PREFIX_CORPUS = path.join(REPO, "bench", "corpus", "large-prefix-2026-09-25");
export function largePrefixSheets() {
    const m = JSON.parse(readFileSync(path.join(PREFIX_CORPUS, "MANIFEST.json"), "utf8"));
    return m.sheets.map((s) => {
        const text = readFileSync(path.join(PREFIX_CORPUS, s.file), "utf8");
        if (createHash("sha256").update(text).digest("hex") !== s.sha256) throw new Error(`${s.file}: prefix corpus sha256 drift`);
        return { ...s, text };
    });
}

export const uptime = () => execSync("uptime", { encoding: "utf8" }).trim();
export const load1 = (u) => Number(u.split("averages:")[1].trim().split(/[\s,]+/)[0]);
export const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

/** arm name → { m, fns: { entry → fn(source) } }. Bundles are loaded (and the grammar compiled) outside any timing. */
export async function arm(name) {
    const file = name.startsWith("banked:") ? path.join(BANKED, `${name.slice(7)}.mjs`) : path.join(BUILD, `${name}.mjs`);
    const m = await import(file);
    if (name === "retired") return { m, fns: Object.fromEntries(ENTRIES.map((e) => [e, e === "parseStylesheet" ? m.parseStylesheet : m.hand[e]])) };
    if (name.startsWith("banked:")) { m.bbnf.parseCssColor("red"); return { m, fns: Object.fromEntries(ENTRIES.map((e) => [e, e === "parseStylesheet" ? m.parseStylesheet : m.bbnf[e]])) }; }
    m.css.parseCssColor("red");
    return { m, fns: Object.fromEntries(ENTRIES.map((e) => [e, m.css[e]])) };
}
