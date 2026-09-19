// SERVED MODEL: claude-opus-5[1m]
//
// X.P.W4.a — G-1's mechanical cross-check.
//
// `W4.md` §6 G-1: "prints both set-differences and every row whose disposition contradicts the
// ledger; exits non-zero on any. The checker is owned by `.a` and lives beside the contract it
// checks, so `.a` needs neither the fresh root nor `.c`'s evaluator to close its own gate."
//
// It reads three files and NEVER writes one. Every number it prints is derived from the bytes it
// was handed at the moment it ran; nothing is cached, inherited, or read from a status word.
//
//   node docs/tranches/X/parse-that/scripts/seam-contract-check.mjs \
//        docs/tranches/X/parse-that/SEAM-CONTRACT.md \
//        docs/tranches/X/parse-that/evidence/W3/universe-52.json \
//        docs/tranches/X/parse-that/DIVERGENCE-LEDGER.md
//
// Exit 0 only when every one of checks A..K is clean. Exit 1 otherwise, with each failing check
// named and its offending rows printed by name — never a bare count.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PARSE_THAT = resolve(HERE, "..");

const [contractPath, universePath, ledgerPath] = [
    process.argv[2] ?? resolve(PARSE_THAT, "SEAM-CONTRACT.md"),
    process.argv[3] ?? resolve(PARSE_THAT, "evidence/W3/universe-52.json"),
    process.argv[4] ?? resolve(PARSE_THAT, "DIVERGENCE-LEDGER.md"),
];

/* ── §0v / §0w — the ruling ids, which are classes in COHESION.md and not rows in the ledger ──── */

// COHESION §0w, verbatim: "{GROUND-C · ID-1/ID-1b · ID-2 · ID-3 · ID-4 · ID-5 · PB-11 · R-f1 ·
// E-k2} — every member a ruled class with a predicate and a printed census; a tag with no ruling
// (BND-1, SH-1, F-k2, F-m1, E-j1) is never a member."
const RULING_IDS = new Set([
    "GROUND-C",
    "ID-1",
    "ID-1b",
    "ID-2",
    "ID-3",
    "ID-4",
    "ID-5",
    "PB-11",
    "R-f1",
    "E-k2",
]);

// The four admissible disposition heads. `PENDING-ADJUDICATION` is COHESION §0v's: "the seam
// contract publishes the carried cells as PENDING-ADJUDICATION dispositions, not as dispositions
// the producer cannot honour". The other three are `W4.md` §3.1's.
const HEADS = new Set([
    "identical",
    "declared-divergence",
    "not-provided",
    "PENDING-ADJUDICATION",
]);

// The ledger's own DECLARED SUBJECT fields — the fields by which a row states which export it
// concerns. A frozen-52 name in one of these is a TIER-1 binding and is fatal against `identical`.
const SUBJECT_FIELDS = new Set([
    "parser",
    "entry",
    "entries",
    "subject",
    "subjects",
    "witness family",
]);

/* ── readers ──────────────────────────────────────────────────────────────────────────────────── */

const read = (p) => readFileSync(p, "utf8");
const backticked = (s) => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1].trim());

/** The universe: 52 names, their kinds, and each row's carried (non-TOTAL) remainder. */
function readUniverse(path) {
    const j = JSON.parse(read(path));
    const rows = new Map();
    for (const r of j.rows) {
        rows.set(r.name, {
            name: r.name,
            kind: r.kind,
            verdict: r.verdict,
            remainder:
                r.remainder && Object.keys(r.remainder).length ? r.remainder : null,
        });
    }
    return { rows, tally: j.tally, counts: j.pin?.counts ?? null };
}

/**
 * The ledger: every `### <id> — …` row, the exports it names in a DECLARED SUBJECT field (tier 1)
 * and the exports it merely mentions in any other field (tier 2). Field-table rows are `| **key** |
 * value |`; a row's fields end at the next `###` or `##`.
 */
function readLedger(path, names) {
    const lines = read(path).split(/\r?\n/);
    const named = (v) =>
        names.filter((n) =>
            new RegExp(`(^|[^A-Za-z0-9_])${n}([^A-Za-z0-9_]|$)`).test(v),
        );
    const ids = new Map();
    let cur = null;
    for (const line of lines) {
        const head = line.match(/^### (.+?) — /);
        if (head) {
            cur = head[1].trim();
            if (!ids.has(cur))
                ids.set(cur, { id: cur, tier1: new Set(), tier2: new Set() });
            continue;
        }
        if (/^## /.test(line)) cur = null;
        if (!cur) continue;
        const field = line.match(/^\| \*\*([^*]+)\*\* \| ([\s\S]*)\|\s*$/);
        if (!field) continue;
        const key = field[1].replace(/`/g, "").trim().toLowerCase();
        const row = ids.get(cur);
        for (const n of named(field[2])) {
            row.tier2.add(n);
            if (SUBJECT_FIELDS.has(key)) row.tier1.add(n);
        }
    }
    return ids;
}

/** The contract's 52 rows, read from between the two anchors so no prose table can be mistaken for it. */
function readContract(path) {
    const text = read(path);
    const begin = text.indexOf("<!-- SEAM-ROWS:BEGIN -->");
    const end = text.indexOf("<!-- SEAM-ROWS:END -->");
    if (begin < 0 || end < 0 || end < begin) {
        throw new Error(
            `${path}: the SEAM-ROWS:BEGIN / SEAM-ROWS:END anchors are not both present, in order`,
        );
    }
    const rows = [];
    for (const line of text.slice(begin, end).split(/\r?\n/)) {
        if (!/^\|/.test(line)) continue;
        // Split on UNESCAPED pipes only: a signature such as `type TimelineAxis = "block" \| "x"`
        // carries `\|` inside a cell, and a naive split would silently drop the row.
        const cells = line
            .split(/(?<!\\)\|/)
            .slice(1, -1)
            .map((c) => c.trim().replace(/\\\|/g, "|"));
        if (cells.length !== 7) continue;
        if (/^-+$/.test(cells[0]) || cells[0].toLowerCase() === "#") continue;
        const [num, exportCell, kind, signature, provider, disposition, direction] =
            cells;
        const name = (backticked(exportCell)[0] ?? exportCell).trim();
        const headWord = disposition.split(/[\s([]/)[0];
        rows.push({
            num,
            name,
            kind,
            signature,
            provider,
            disposition,
            head: headWord,
            ids: backticked(disposition),
            direction,
        });
    }
    return { text, rows };
}

/* ── the run ──────────────────────────────────────────────────────────────────────────────────── */

const universe = readUniverse(universePath);
const names = [...universe.rows.keys()];
const ledger = readLedger(ledgerPath, names);
const contract = readContract(contractPath);

// export -> ledger ids, both tiers
const tier1 = new Map();
const tier2 = new Map();
for (const row of ledger.values()) {
    for (const n of row.tier1) (tier1.get(n) ?? tier1.set(n, []).get(n)).push(row.id);
    for (const n of row.tier2) (tier2.get(n) ?? tier2.set(n, []).get(n)).push(row.id);
}

const failures = [];
const fail = (code, title, items) => {
    failures.push({ code, title, items });
};

const contractNames = contract.rows.map((r) => r.name);
const contractSet = new Set(contractNames);
const universeSet = new Set(names);

/* A / B — both set-differences, printed whether or not they are empty (G-1 asks for both). */
const extra = contractNames.filter((n) => !universeSet.has(n));
const missing = names.filter((n) => !contractSet.has(n));
if (extra.length)
    fail("A", "contract ∖ universe-52 (a 53rd row with no index.ts origin)", extra);
if (missing.length)
    fail("B", "universe-52 ∖ contract (a frozen export with no row)", missing);

/* B2 — duplicate rows would let a set-difference read ∅ over a wrong table. */
const dupes = contractNames.filter((n, i) => contractNames.indexOf(n) !== i);
if (dupes.length)
    fail("B2", "duplicate export rows in the contract", [...new Set(dupes)]);

/* C — every row carries all five required fields, non-empty. */
const blanks = [];
for (const r of contract.rows) {
    for (const [field, v] of [
        ["signature", r.signature],
        ["candidate provider", r.provider],
        ["disposition", r.disposition],
        ["consumer direction", r.direction],
        ["kind", r.kind],
    ]) {
        if (!v || /^[-—–]$/.test(v)) blanks.push(`${r.name}: empty ${field}`);
    }
}
if (blanks.length) fail("C", "a row with an empty required field", blanks);

/* D — the disposition vocabulary. */
const badHeads = contract.rows
    .filter((r) => !HEADS.has(r.head))
    .map((r) => `${r.name}: "${r.disposition}"`);
if (badHeads.length)
    fail(
        "D",
        "a disposition outside {identical, declared-divergence, not-provided, PENDING-ADJUDICATION}",
        badHeads,
    );

/* E — THE CONTRADICTION. `identical` while the ledger holds a row naming that export. */
const contradictions = [];
for (const r of contract.rows) {
    if (r.head !== "identical") continue;
    const bound = tier1.get(r.name);
    if (bound?.length)
        contradictions.push(
            `${r.name}: disposition "identical" vs DIVERGENCE-LEDGER rows ${bound.join(", ")}`,
        );
}
if (contradictions.length)
    fail(
        "E",
        "a row whose disposition contradicts DIVERGENCE-LEDGER.md",
        contradictions,
    );

/* F — every id a row names must be a ledger row id or a §0v/§0w ruling id. */
const unknownIds = [];
for (const r of contract.rows) {
    for (const id of r.ids) {
        const bare = id.replace(/×\d+$/, "").trim();
        if (!ledger.has(bare) && !RULING_IDS.has(bare))
            unknownIds.push(`${r.name}: unknown id \`${bare}\``);
    }
}
if (unknownIds.length)
    fail(
        "F",
        "a disposition naming an id that is neither a ledger row nor a ruled class",
        unknownIds,
    );

/* G — COHESION §0v's rider: every carried (non-TOTAL) universe row publishes PENDING-ADJUDICATION,
       and its carried ids appear in the cell. */
const riderMisses = [];
for (const [name, u] of universe.rows) {
    if (!u.remainder) continue;
    const r = contract.rows.find((x) => x.name === name);
    if (!r) continue; // already reported by B
    if (r.head !== "PENDING-ADJUDICATION") {
        riderMisses.push(
            `${name}: carries ${Object.entries(u.remainder)
                .map(([k, v]) => `${k}×${v}`)
                .join(" ")} but publishes "${r.head}"`,
        );
        continue;
    }
    for (const id of Object.keys(u.remainder)) {
        if (!r.ids.some((x) => x.replace(/×\d+$/, "").trim() === id)) {
            riderMisses.push(
                `${name}: carried id ${id} is not named in its disposition`,
            );
        }
    }
}
if (riderMisses.length)
    fail(
        "G",
        "COHESION §0v rider — a carried cell not published as PENDING-ADJUDICATION",
        riderMisses,
    );

/* H — the G-1 falsifier, reported by its own name: an empty consumer-direction on a divergent row. */
const blankDirection = contract.rows
    .filter(
        (r) => r.head !== "identical" && (!r.direction || /^[-—–]$/.test(r.direction)),
    )
    .map((r) => r.name);
if (blankDirection.length)
    fail(
        "H",
        "an empty consumer-direction field on a non-identical row (G-1 falsifier)",
        blankDirection,
    );

/* I — no ledger row bound to an export may be dropped: the export's disposition must name it. */
const droppedRows = [];
for (const [name, boundIds] of tier1) {
    const r = contract.rows.find((x) => x.name === name);
    if (!r) continue;
    const held = new Set(r.ids.map((x) => x.replace(/×\d+$/, "").trim()));
    for (const id of boundIds)
        if (!held.has(id))
            droppedRows.push(
                `${name}: ledger row ${id} is not named in its disposition`,
            );
}
if (droppedRows.length)
    fail(
        "I",
        "a ledger row bound to an export that the contract's row does not name",
        droppedRows,
    );

/* J — a ledger row that names no export must be declared in the contract's surface-wide section. */
const surfaceWide = [...ledger.values()]
    .filter((r) => r.tier2.size === 0)
    .map((r) => r.id);
const swBegin = contract.text.indexOf("<!-- SURFACE-WIDE:BEGIN -->");
const swEnd = contract.text.indexOf("<!-- SURFACE-WIDE:END -->");
const swText =
    swBegin >= 0 && swEnd > swBegin ? contract.text.slice(swBegin, swEnd) : "";
const swMissing = surfaceWide.filter((id) => !swText.includes(`\`${id}\``));
if (!swText)
    fail("J", "the SURFACE-WIDE:BEGIN / SURFACE-WIDE:END anchors are absent", [
        "(section missing)",
    ]);
else if (swMissing.length)
    fail("J", "a ledger row naming no export is not declared surface-wide", swMissing);

/* K — the NON-GOALS SECTION ITSELF (not the file at large) must name both explicitly. */
const ngStart = contract.text.search(/^#+ [^\n]*Non-goals/im);
const ngText = ngStart < 0 ? "" : contract.text.slice(ngStart).split(/\n#{2} /)[0];
const nonGoals = [
    ["relative colour", /relative[ -]colou?r/i],
    ["color-mix()", /color-mix\(\)/],
]
    .filter(([, re]) => !re.test(ngText))
    .map(([label]) => label);
if (!ngText) fail("K", "no Non-goals section heading was found", ["(section missing)"]);
else if (nonGoals.length)
    fail("K", "the Non-goals section does not name these explicitly", nonGoals);

/* ── output ───────────────────────────────────────────────────────────────────────────────────── */

const out = [];
out.push("X.P.W4.a — SEAM-CONTRACT cross-check (G-1)");
out.push("=".repeat(78));
out.push(`contract   ${contractPath}`);
out.push(`universe   ${universePath}`);
out.push(`ledger     ${ledgerPath}`);
out.push("");
out.push(
    `rows: contract ${contract.rows.length} · universe ${names.length} · ledger rows ${ledger.size}`,
);
out.push(`universe tally: ${JSON.stringify(universe.tally?.all ?? universe.tally)}`);
out.push("");
out.push("SET DIFFERENCES (G-1: both must be empty)");
out.push(`  contract ∖ universe-52 : ${extra.length ? extra.join(", ") : "∅"}`);
out.push(`  universe-52 ∖ contract : ${missing.length ? missing.join(", ") : "∅"}`);
out.push("");

const census = {};
for (const r of contract.rows) census[r.head] = (census[r.head] ?? 0) + 1;
out.push("DISPOSITION CENSUS");
for (const [k, v] of Object.entries(census).sort()) out.push(`  ${k.padEnd(22)} ${v}`);
const carriedRows = [...universe.rows.values()].filter((u) => u.remainder);
const carriedCells = carriedRows.reduce(
    (a, u) => a + Object.values(u.remainder).reduce((x, y) => x + y, 0),
    0,
);
out.push(
    `  (COHESION §0v carried: ${carriedCells} cells over ${carriedRows.length} rows)`,
);
out.push("");

out.push(
    "ADVISORY — `identical` rows a ledger row MENTIONS outside a subject field (tier 2, not fatal)",
);
const advisory = contract.rows
    .filter((r) => r.head === "identical")
    .map((r) => [
        r.name,
        (tier2.get(r.name) ?? []).filter(
            (id) => !(tier1.get(r.name) ?? []).includes(id),
        ),
    ])
    .filter(([, ids]) => ids.length);
if (!advisory.length) out.push("  (none)");
for (const [n, ids] of advisory)
    out.push(`  ${n.padEnd(24)} mentioned by ${ids.join(", ")}`);
out.push("");

out.push(
    `SURFACE-WIDE ledger rows (no export named in any field): ${surfaceWide.length ? surfaceWide.join(", ") : "(none)"}`,
);
out.push("");

if (!failures.length) {
    out.push(
        "VERDICT: GREEN — both set-differences ∅, no disposition contradicts the ledger,",
    );
    out.push(
        "         every carried cell publishes PENDING-ADJUDICATION, no field is blank.",
    );
    console.log(out.join("\n"));
    process.exit(0);
}

out.push(`VERDICT: RED — ${failures.length} check(s) failed.`);
for (const f of failures) {
    out.push("");
    out.push(`  [${f.code}] ${f.title} — ${f.items.length}`);
    for (const i of f.items) out.push(`        ${i}`);
}
console.log(out.join("\n"));
process.exit(1);
