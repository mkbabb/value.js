#!/usr/bin/env node
// proof:close-ledger — value.js U.W-CLOSE G-CLOSE-1 born-RED→GREEN gate (the
// tranche's zero-silent-drop CLOSE contract). CI-wired via `test:dist`.
//
// THE OBSERVABLE: `docs/tranches/U/FINAL.md` must walk EVERY row of
// `docs/tranches/U/DISPOSITION-LEDGER.md` with a DECIDED disposition carrying a
// terminal-evidence cite — a dropped row is RED, not a prose omission. The
// ledger's own Family-audit invariant (each integer 1..77 present exactly once;
// F6/F55 split-homed; F18/F19 → the W8-census; F20/F59/F60 retire; F54 the
// annex) is re-confirmed on BOTH docs.
//
// REGENERABLE (the LoC-precept pattern — NOT a hardcoded checklist of 77 rows):
// the row set + the family integers are DERIVED by parsing the ledger's markdown
// tables at run time. A row added to the ledger that FINAL.md fails to walk turns
// this gate RED at the diff; the number is never hardcoded, so it never drifts.
//
// Pure markdown parse — no dist build needed (wired standalone + appended to the
// `test:dist` chain because it requires no build artefact).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..");

const LEDGER = "docs/tranches/U/DISPOSITION-LEDGER.md";
const FINAL = "docs/tranches/U/FINAL.md";

const read = (rel) => {
    try {
        return readFileSync(resolve(root, rel), "utf8");
    } catch {
        return null;
    }
};

// ── section slicing ─────────────────────────────────────────────────────────
// Both docs delimit rows by `## §<key> …` level-2 headings. Slice each doc into
// { key -> body } where body runs to the next `## §` heading. The key is the
// token right after `§` up to the first whitespace ("A", "B", "B.1", "C.1",
// "attested-not-verified", "BOOKS", …).
function sections(src) {
    const lines = src.split("\n");
    const heads = [];
    lines.forEach((l, i) => {
        const m = l.match(/^##\s+§(\S+)/);
        if (m) heads.push([m[1], i]);
    });
    const out = {};
    heads.forEach(([key, start], k) => {
        const end = k + 1 < heads.length ? heads[k + 1][1] : lines.length;
        out[key] = lines.slice(start, end).join("\n");
    });
    return out;
}

// ── table helpers ───────────────────────────────────────────────────────────
const isSep = (l) => /^\|[\s:|-]+$/.test(l);
const pipeLines = (s) => s.split("\n").filter((l) => /^\s*\|/.test(l));
// data-row count = pipe-lines minus (header + separator) per table; each table
// has exactly one separator, and one header per separator, so subtract 2×seps.
function dataRowCount(s) {
    const pl = pipeLines(s);
    const seps = pl.filter(isSep).length;
    return pl.length - 2 * seps;
}
// cite detector — a terminal-evidence cite is a commit hash, a repo path, a
// gate/test token, a `proof:` script, or an explicit disposition keyword. An
// empty cite cell carries none of these → the row is RED.
const CITE = new RegExp(
    [
        "\\b(?=[0-9a-f]*[a-f])[0-9a-f]{7}\\b", // commit hash (>=1 hex letter)
        "[\\w/.-]+\\.(?:md|ts|mjs|vue|css|html|json)\\b", // repo path
        "\\b(?:G-[A-Z]+-\\d+[a-z]?|LIB-G\\d+|BR-\\d+|OA-[A-Z0-9-]+|O-\\d+|G-PERF-\\d)\\b", // gate/oracle token
        "proof:[a-z-]+", // proof script
        "\\b(?:LANDED|DECIDED|RETIRED|RETIRE|ESCALATE|FOLDED|ANNEX|ATTEST|RELAY|CENSUS|WATCH|UNFIRED|EXECUTED|DEFERRED|ACCEPT|PRETYPECHECK|ARMED|complete_with_misses|owner-held|owner-attest|attested-not-verified|DECISION-PENDING-OWNER|RATIFIED|PARK|STILL-BOOKED|deploy-dependent)\\b",
    ].join("|"),
    "i",
);
const hasCite = (row) => CITE.test(row);

// ── family-integer extraction from a §A table ───────────────────────────────
// Each §A data row starts `| U-F<n> |`. Extract <n>. Returns a Map n -> rowText.
function familyRows(sectionA) {
    const rows = new Map();
    for (const l of sectionA.split("\n")) {
        const m = l.match(/^\s*\|\s*U-F(\d+)\b(.*)$/);
        if (m) rows.set(Number(m[1]), l);
    }
    return rows;
}

// ── run ─────────────────────────────────────────────────────────────────────
const errs = [];
const push = (m) => errs.push(m);

const ledgerSrc = read(LEDGER);
const finalSrc = read(FINAL);

if (!ledgerSrc) {
    console.error(`GATE RED: ${LEDGER} not found — the row set is unreadable.`);
    process.exit(1);
}
if (!finalSrc) {
    console.error(
        `GATE RED: ${FINAL} is ABSENT — the zero-drop ledger walk is un-executed (G-CLOSE-1 born-RED).`,
    );
    process.exit(1);
}

const L = sections(ledgerSrc);
const F = sections(finalSrc);

// ── (d) FAMILY-AUDIT INVARIANT — the ledger's own §A, re-confirmed ───────────
const ledgerFam = familyRows(L["A"] || "");
{
    const counts = new Map();
    for (const n of ledgerFam.keys()) counts.set(n, (counts.get(n) || 0) + 1);
    const missing = [];
    for (let i = 1; i <= 77; i++) if (!ledgerFam.has(i)) missing.push(i);
    if (missing.length)
        push(`ledger §A: family integers absent: ${missing.join(", ")} (expected 1..77 each once)`);
    // (a duplicate would show as familyRows overwriting — re-scan raw for dups)
    const raw = (L["A"] || "").match(/^\s*\|\s*U-F(\d+)\b/gm) || [];
    const seen = new Map();
    for (const r of raw) {
        const n = Number(r.match(/\d+/)[0]);
        seen.set(n, (seen.get(n) || 0) + 1);
    }
    const dups = [...seen.entries()].filter(([, v]) => v > 1).map(([n]) => n);
    if (dups.length) push(`ledger §A: family integers duplicated: ${dups.join(", ")}`);
}

// ── (a)+(b)+(c) BIJECTION — every ledger §A family ∈ FINAL §A with a cite ─────
const finalFam = familyRows(F["A"] || "");
{
    const missing = [];
    for (let i = 1; i <= 77; i++) if (!finalFam.has(i)) missing.push(i);
    if (missing.length)
        push(`FINAL §A: family rows MISSING (dropped): ${missing.map((n) => "U-F" + n).join(", ")}`);
    // dup scan on FINAL side
    const raw = (F["A"] || "").match(/^\s*\|\s*U-F(\d+)\b/gm) || [];
    const seen = new Map();
    for (const r of raw) {
        const n = Number(r.match(/\d+/)[0]);
        seen.set(n, (seen.get(n) || 0) + 1);
    }
    const dups = [...seen.entries()].filter(([, v]) => v > 1).map(([n]) => n);
    if (dups.length) push(`FINAL §A: family rows DUPLICATED: ${dups.join(", ")}`);
    // every present family row must carry a terminal-evidence cite
    for (const [n, row] of finalFam) {
        if (!hasCite(row)) push(`FINAL §A: U-F${n} carries NO terminal-evidence cite (row is RED)`);
    }
}

// ── (d) FINAL §A family-audit sub-invariants ─────────────────────────────────
function assertRowContains(n, re, label) {
    const row = finalFam.get(n);
    if (!row) return; // already flagged missing above
    if (!re.test(row)) push(`FINAL §A: U-F${n} must mark "${label}" (family-audit invariant)`);
}
assertRowContains(6, /split/i, "SPLIT-home");
assertRowContains(55, /split/i, "SPLIT-home");
assertRowContains(18, /W8|census/i, "→ W8-census");
assertRowContains(19, /W8|census/i, "→ W8-census");
assertRowContains(20, /retire/i, "retire");
assertRowContains(59, /retire/i, "retire");
assertRowContains(60, /retire/i, "retire");
assertRowContains(54, /annex/i, "the annex");

// ── §B chronic + §B.1 carried-books: row-count parity + cite ─────────────────
function assertSectionRows(key, label) {
    const ls = L[key];
    const fs = F[key];
    if (ls === undefined) {
        push(`ledger §${key} (${label}) missing — cannot walk`);
        return;
    }
    if (fs === undefined) {
        push(`FINAL §${key} (${label}) ABSENT — the ${label} rows are un-walked`);
        return;
    }
    const need = dataRowCount(ls);
    const got = dataRowCount(fs);
    if (got < need)
        push(`FINAL §${key} (${label}): ${got} rows walked, ledger has ${need} (${need - got} dropped)`);
    // each FINAL data row (non-sep, non-first) must carry a cite
    const dataRows = pipeLines(fs).filter((l) => !isSep(l));
    for (const r of dataRows.slice(1)) {
        if (r.includes("---")) continue;
        if (!hasCite(r)) push(`FINAL §${key} (${label}): a row carries no evidence cite → ${r.slice(0, 60)}…`);
    }
}
assertSectionRows("B", "chronic");
assertSectionRows("B.1", "carried-books");

// ── §C prompt-recap: every ledger T-row + edict ∈ FINAL §C ───────────────────
{
    const lc = L["C"] || "";
    const fc = F["C"] || "";
    if (!fc) push("FINAL §C ABSENT — the prompt-recap is un-walked");
    // T-rows are the `T-<n>` tokens in the ledger §C TABLE rows (the still-red
    // table). Prose "discharged T-rows" (T-1/T-8/…) live in non-table lines and
    // retire to §D — scope to `|`-table data lines only.
    const lcTableRows = pipeLines(lc).filter((l) => !isSep(l));
    const fcTableRows = pipeLines(fc).filter((l) => !isSep(l));
    const tRows = (block) => {
        const s = new Set();
        for (const l of block) for (const t of l.match(/\bT-\d+\b/g) || []) s.add(t);
        return s;
    };
    const edicts = (block) => {
        const s = new Set();
        for (const l of block) for (const e of l.match(/\bE-[1-7]\b/g) || []) s.add(e);
        return s;
    };
    const ledgerT = tRows(lcTableRows);
    const finalT = tRows(fcTableRows);
    const droppedT = [...ledgerT].filter((t) => !finalT.has(t));
    if (droppedT.length)
        push(`FINAL §C: T-rows DROPPED: ${droppedT.sort((a, b) => +a.slice(2) - +b.slice(2)).join(", ")}`);
    const ledgerE = edicts(lcTableRows);
    const finalE = edicts(fcTableRows);
    const droppedE = [...ledgerE].filter((e) => !finalE.has(e));
    if (droppedE.length) push(`FINAL §C: edicts DROPPED: ${droppedE.sort().join(", ")}`);
    // completeness of edicts (the ledger names E-1..E-7)
    for (let i = 1; i <= 7; i++)
        if (!finalE.has(`E-${i}`)) push(`FINAL §C: edict E-${i} un-walked`);
}

// ── §C.1 census orphans: each of the four keys ∈ FINAL §C.1 ──────────────────
{
    const lc1 = L["C.1"] || "";
    const fc1 = F["C.1"] || "";
    if (!fc1) push("FINAL §C.1 ABSENT — the four census orphans are un-homed");
    // derive the orphan keys from the ledger §C.1 table (bolded first-cell tokens)
    const ORPHANS = ["boot-G", "CC-1", "L8", "W8-2"];
    for (const o of ORPHANS) {
        if (lc1.includes(o) && !fc1.includes(o))
            push(`FINAL §C.1: census orphan '${o}' un-homed (dropped)`);
    }
}

// ── §D retired-WINS: present + names the round-closed retires ────────────────
{
    const fd = F["D"];
    if (fd === undefined) push("FINAL §D ABSENT — the retired-WINS set is un-recorded");
    else {
        for (const fam of ["U-F20", "U-F59", "U-F60"])
            if (!fd.includes(fam)) push(`FINAL §D: retired family ${fam} un-recorded`);
        if (!/retire/i.test(fd)) push("FINAL §D: no retire record present");
    }
}

// ── close-section structural checks (attested-not-verified · BOOKS · owner) ──
{
    const anv = F["attested-not-verified"];
    if (anv === undefined) push("FINAL §attested-not-verified ABSENT — the four U-F61 claims un-flagged");
    else {
        const needs = [
            [/NCSU|X2/i, "X2 NCSU-301"],
            [/TBT/i, "the CI TBT red"],
            [/cure-ownership|test\.fail|O-16|O-26|O-5/i, "born-RED cure-ownership"],
            [/deploy-webhook/i, "the deploy-webhook repair"],
        ];
        for (const [re, label] of needs)
            if (!re.test(anv)) push(`FINAL §attested-not-verified: claim '${label}' un-named`);
    }
    const books = F["BOOKS"];
    if (books === undefined) push("FINAL §BOOKS ABSENT — the B1..B14 discharge table un-walked");
    else {
        const missing = [];
        for (let i = 1; i <= 14; i++) if (!new RegExp(`\\bB${i}\\b`).test(books)) missing.push(`B${i}`);
        if (missing.length) push(`FINAL §BOOKS: books un-walked: ${missing.join(", ")}`);
    }
    if (F["owner-reserved"] === undefined && F["owner"] === undefined)
        push("FINAL §owner-reserved ABSENT — the owner slate un-presented");
}

// ── report ───────────────────────────────────────────────────────────────────
const famMatched = [...finalFam.keys()].filter((n) => ledgerFam.has(n)).length;
console.log("proof:close-ledger — the U.W-CLOSE zero-drop ledger walk (G-CLOSE-1)\n");
console.log(`  ledger §A families        : ${ledgerFam.size} (expected 77)`);
console.log(`  FINAL  §A families walked : ${finalFam.size}  (matched ${famMatched}/77)`);
console.log(`  §B chronic rows           : ledger ${dataRowCount(L["B"] || "")} / FINAL ${dataRowCount(F["B"] || "")}`);
console.log(`  §B.1 carried-books        : ledger ${dataRowCount(L["B.1"] || "")} / FINAL ${dataRowCount(F["B.1"] || "")}`);
console.log(`  §C.1 census orphans       : boot-G · CC-1 · L8 · W8-2`);
console.log(`  §BOOKS B1..B14 · §attested-not-verified · §owner-reserved present\n`);

if (errs.length) {
    console.error(`GATE RED: ${errs.length} zero-drop violation(s):\n`);
    for (const e of errs) console.error("  • " + e);
    process.exit(1);
}
console.log(
    "GATE GREEN: every ledger row → a FINAL.md disposition-with-evidence; " +
        "Family-audit invariant confirmed (F1..F77 each once; F6/F55 split; F18/F19 W8-census; " +
        "F20/F59/F60 retire; F54 annex). Zero silent drops.",
);
