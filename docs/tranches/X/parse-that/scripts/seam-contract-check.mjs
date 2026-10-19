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

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PARSE_THAT = resolve(HERE, "..");

const [contractPath, universePath, ledgerPath] = [
    process.argv[2] ?? resolve(PARSE_THAT, "SEAM-CONTRACT.md"),
    process.argv[3] ?? resolve(PARSE_THAT, "evidence/W3/universe-52.json"),
    process.argv[4] ?? resolve(PARSE_THAT, "DIVERGENCE-LEDGER.md"),
];

// X.P.W4.g — the FOURTH path, optional, so `W4.md` §6 G-1's three-argument command is unchanged:
// the adjudication lives beside the contract it rules, and is found there unless named explicitly.
// A fixture (a negative control) names its own, which is the only reason this is an argument at all.
const adjudicationPath = process.argv[5] ?? resolve(dirname(contractPath), "ADJUDICATION-W4.md");

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

/**
 * X.P.W4.g — THE POST-ADJUDICATION VOCABULARY, limb 1: `DIVERGENCE-LEDGER.md` §10's RETIREMENTS.
 *
 * COHESION §0ab (E-w4f-1): *"a ledger row RETIRED in `DIVERGENCE-LEDGER.md` §10 does not bind its
 * `subjects`"*. A retirement is a measured ruling that the row's PREMISE is false at the producer
 * (F-w4a-1) — `CN-2`'s ten "absent" exports are exported, `CN-3`'s twenty-eight "undeclared" types
 * are declared. A row whose premise is false states nothing about its subjects, so an `identical`
 * disposition beside it is not a contradiction; it is the ruling.
 *
 * Read at the bytes, never from a status word: inside the `## §10` section, a table row whose FIRST
 * cell is a backticked id the ledger itself defines and whose remaining cells contain the standalone
 * word `RETIRED`. Rows outside §10 do not retire anything — §0–§9 are the emitter's own bytes.
 */
function readRetirements(path, ledgerIds) {
    const lines = read(path).split(/\r?\n/);
    const retired = new Map(); // id -> the ruling text that retires it
    let inTen = false;
    for (const line of lines) {
        if (/^## /.test(line)) inTen = /^## §10\b/.test(line);
        if (!inTen) continue;
        if (!/^\|/.test(line)) continue;
        const cells = line
            .split(/(?<!\\)\|/)
            .slice(1, -1)
            .map((c) => c.trim());
        if (cells.length < 2) continue;
        const id = (backticked(cells[0])[0] ?? "").trim();
        if (!id || !ledgerIds.has(id)) continue;
        const rest = cells.slice(1).join(" | ");
        if (!/(^|[^A-Za-z])RETIRED([^A-Za-z]|$)/.test(rest)) continue;
        if (!retired.has(id)) retired.set(id, rest);
    }
    return retired;
}

/**
 * X.P.W4.g — THE POST-ADJUDICATION VOCABULARY, limb 2: `ADJUDICATION-W4.md`.
 *
 * COHESION §0ab (E-w4f-1): *"a carried cell whose ruling is recorded in `ADJUDICATION-W4.md` is
 * terminal — G reads the adjudication, not §0v's pre-adjudication rider"*. §0v's rider — *"the seam
 * contract publishes the carried cells as PENDING-ADJUDICATION dispositions"* — is a rule for a
 * contract that has no adjudication yet. Where one exists and rules an entry, the entry's
 * disposition is TERMINAL and publishing it as still-pending contradicts the ruling.
 *
 * Read at the bytes: the `### §2.x` subsections of `## §2` are the per-cell rulings, and an entry is
 * ruled by a subsection when that subsection NAMES it in backticks — heading OR body. The body is
 * load-bearing and was measured before this was written: `### §2.1`'s heading reads *"`GROUND-C` on
 * the four colour-family entries — 4 cells (`#1`–`#4`)"* and names no export at all; the four
 * entries it rules (`parseCssColor` · `parseCssScalar` · `parseCssValue` · `parseCssValues`) appear
 * in its first body sentence. A heading-only reader would have left 4 of the 6 carried entries
 * unruled and reported a RED that the adjudication refutes.
 *
 * Absent file ⇒ nothing is ruled, every carried cell fails check G, and the run says so in its
 * output: a close gate cannot read a ruling out of a file that does not exist.
 */
function readAdjudication(path, names) {
    if (!existsSync(path)) return { present: false, ruled: new Map(), sections: 0 };
    const lines = read(path).split(/\r?\n/);
    const ruled = new Map(); // export name -> [§2.x subsections that rule it]
    let inTwo = false;
    let cur = null;
    let sections = 0;
    for (const line of lines) {
        if (/^## /.test(line)) {
            inTwo = /^## §2\b/.test(line);
            cur = null;
        }
        if (!inTwo) continue;
        const head = line.match(/^### (§2\.\d+)\s+(.*)$/);
        if (head) {
            cur = head[1];
            sections++;
        }
        if (!cur) continue;
        for (const tok of backticked(head ? head[2] : line)) {
            if (!names.includes(tok)) continue;
            if (!ruled.has(tok)) ruled.set(tok, []);
            if (!ruled.get(tok).includes(cur)) ruled.get(tok).push(cur);
        }
    }
    return { present: true, ruled, sections };
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

// X.P.W4.g — the post-adjudication vocabulary, read from the two files that now hold it.
const retired = readRetirements(ledgerPath, new Set(ledger.keys()));
const adjudication = readAdjudication(adjudicationPath, names);

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

/* E — THE CONTRADICTION. `identical` while the ledger holds a LIVE row naming that export.
 *
 * X.P.W4.g (COHESION §0ab, E-w4f-1): *"a ledger row RETIRED in `DIVERGENCE-LEDGER.md` §10 does not
 * bind its `subjects`"*. A retirement is a ruling that the row's PREMISE is false at the producer —
 * `CN-2` claimed ten exports are absent from the candidate and they are exported; `CN-3` claimed
 * twenty-eight types are undeclared and they are declared. A row that states nothing true about its
 * subjects cannot contradict a disposition. The BINDING is what dies, not the row: §1–§9 stand
 * unedited (E-3), and the retirement is read off §10 at the bytes on every run.
 *
 * The teeth are unchanged for every LIVE row — an unretired subject binding against an `identical`
 * row is still fatal, and that is this check's negative control. */
const contradictions = [];
const retiredBindings = [];
for (const r of contract.rows) {
    if (r.head !== "identical") continue;
    const bound = tier1.get(r.name) ?? [];
    const live = bound.filter((id) => !retired.has(id));
    const dead = bound.filter((id) => retired.has(id));
    if (dead.length)
        retiredBindings.push(`${r.name}: ${dead.join(", ")} (§10, RETIRED)`);
    if (live.length)
        contradictions.push(
            `${r.name}: disposition "identical" vs DIVERGENCE-LEDGER rows ${live.join(", ")}`,
        );
}
if (contradictions.length)
    fail(
        "E",
        "a row whose disposition contradicts a LIVE DIVERGENCE-LEDGER.md row",
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

/* G — THE CARRIED CELLS, READ AGAINST THE ADJUDICATION.
 *
 * X.P.W4.g (COHESION §0ab, E-w4f-1): *"a carried cell whose ruling is recorded in
 * `ADJUDICATION-W4.md` is terminal — G reads the adjudication, not §0v's pre-adjudication rider"*.
 *
 * §0v's rider — *"the seam contract publishes the carried cells as PENDING-ADJUDICATION
 * dispositions"* — is the rule for a contract whose cells have not been ruled yet. It was never a
 * statement that a carried cell must stay pending forever; it was the honest publication of an
 * unfinished adjudication. Once `ADJUDICATION-W4.md` rules an entry, the entry's disposition is
 * TERMINAL, and republishing it as PENDING contradicts the ruling exactly as an `identical`
 * disposition beside a live ledger row contradicts that row.
 *
 * So the check becomes a biconditional with teeth on BOTH sides, and the §0v rider survives as the
 * unruled arm of it:
 *   G1  a carried cell that is still PENDING is RED — the wave cannot close on an unruled cell, and
 *       the report names whether the adjudication rules it (a ruling ignored) or does not (a cell
 *       nobody ruled). This is the negative control the ruling demands: *"a PENDING head with no
 *       adjudication row"*.
 *   G2  a carried cell published TERMINAL with no §2.x ruling is RED — a terminal disposition is
 *       the consequence of a ruling, never a substitute for one.
 *   G3  a carried id absent from the disposition cell is RED — unchanged from the rider, and the
 *       leg that stops a ruling from silently dropping one of the ids it was handed. */
const riderMisses = [];
for (const [name, u] of universe.rows) {
    if (!u.remainder) continue;
    const r = contract.rows.find((x) => x.name === name);
    if (!r) continue; // already reported by B
    const carried = Object.entries(u.remainder)
        .map(([k, v]) => `${k}×${v}`)
        .join(" ");
    const rules = adjudication.ruled.get(name) ?? [];
    if (r.head === "PENDING-ADJUDICATION") {
        riderMisses.push(
            rules.length
                ? `${name}: carries ${carried} and is RULED at ADJUDICATION-W4.md ${rules.join(", ")}, but still publishes PENDING-ADJUDICATION`
                : `${name}: carries ${carried}, publishes PENDING-ADJUDICATION, and NO ADJUDICATION-W4.md §2.x rules it${adjudication.present ? "" : " (ADJUDICATION-W4.md is absent)"}`,
        );
        continue;
    }
    if (!rules.length) {
        riderMisses.push(
            `${name}: carries ${carried} and publishes terminal "${r.head}", but NO ADJUDICATION-W4.md §2.x rules it${adjudication.present ? "" : " (ADJUDICATION-W4.md is absent)"}`,
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
        "a carried cell that is not TERMINALLY RULED in ADJUDICATION-W4.md (COHESION §0ab)",
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
out.push(
    `adjudic.   ${adjudicationPath}${adjudication.present ? "" : "   (ABSENT — nothing is ruled)"}`,
);
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

/* X.P.W4.g — the post-adjudication vocabulary, printed so the two rulings this checker now reads
   are auditable from its own output rather than from this file's source. */
out.push("POST-ADJUDICATION VOCABULARY (COHESION §0ab, E-w4f-1)");
out.push(
    `  DIVERGENCE-LEDGER §10 RETIRED rows: ${retired.size ? [...retired.keys()].join(", ") : "(none)"}`,
);
out.push(
    `  bindings those retirements release: ${retiredBindings.length ? retiredBindings.length : 0}`,
);
for (const b of retiredBindings) out.push(`        ${b}`);
out.push(
    `  ADJUDICATION-W4.md §2 subsections: ${adjudication.present ? adjudication.sections : "(file absent)"}`,
);
for (const u of carriedRows) {
    const rules = adjudication.ruled.get(u.name) ?? [];
    const r = contract.rows.find((x) => x.name === u.name);
    out.push(
        `        ${u.name.padEnd(22)} ${(rules.length ? rules.join(" ") : "UNRULED").padEnd(18)} publishes "${r ? r.head : "(no row)"}"`,
    );
}
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
        "VERDICT: GREEN — both set-differences ∅, no disposition contradicts a LIVE ledger row,",
    );
    out.push(
        "         every carried cell is terminally ruled in ADJUDICATION-W4.md, no field is blank.",
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
