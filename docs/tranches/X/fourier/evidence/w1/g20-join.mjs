// SERVED MODEL: claude-fable-5-1 — F.W1 unit f, the G20 instrument as run (see G20-CLOSURE.md for the receipts).
// G20 — both legs, run by unit f (a seat that authored neither F-W1.md nor unit a's bytes).
// Leg (b): the (record, id) PAIR join over the canonical F.W1 roster (CENSUS-CANONICAL.md §2,
//          digest f44362757458) against the spec MINUS its own §6·R4 paste (lines 550–614), so the
//          paste cannot green itself (§6·R4a's own exclusion). Three tiers are published:
//          RECORD-QUALIFIED (record name and id on one spec line) · TOKEN-UNIQUE (the id token is
//          present and is homed by exactly ONE record in the whole canonical, so the bare token IS
//          the pair) · HOMONYM-TAIL (present, but the token is carried by ≥2 canonical records, so
//          the pair is decided by reading the cell) · ESCAPE (absent by bytes).
// Leg (a): the carry's 105 row ids ⟷ the spec (same operand file). Fabrication check: every
//          (record, id) the spec BOOKS at §6·R5 / §2·R4a / §2·R4b is homed F.W1 by the canonical.
// The detector is RETAINED as the canonical's derivation; this script re-cuts no denominator.
import fs from "node:fs";

const S = process.argv[2];       // scratchpad dir (spec-nopaste.md · roster.txt)
const X = process.argv[3];       // docs/tranches/X/fourier
const spec = fs.readFileSync(`${S}/spec-nopaste.md`, "utf8");
const specLines = spec.split("\n");
const roster = fs.readFileSync(`${S}/roster.txt`, "utf8").split("\n").filter(Boolean);
const canon = fs.readFileSync(`${X}/conformance/CENSUS-CANONICAL.md`, "utf8").split("\n");
const carryRaw = fs.readFileSync(`${X}/carry/F-W1-CARRY.md`, "utf8");

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function idRegex(id) { return new RegExp(`(^|[^A-Za-z0-9_\\-])${esc(id)}(?![A-Za-z0-9_\\-]|\\.[0-9])`); }
function recordRegex(rec) {
    const bare = rec.replace(/^fr-/, "");
    return new RegExp(`(^|[^A-Za-z0-9_])(${esc(rec)}|${esc(bare)})(?![A-Za-z0-9_])`);
}

// ---- canonical §1: token → [{record, home}] ----
const tokHome = new Map(); let curRec = null; let inS1 = false;
for (const l of canon) {
    if (/^## §1 /.test(l)) inS1 = true; else if (/^## §2 /.test(l)) inS1 = false;
    if (!inS1) continue;
    const h = l.match(/^### (fr-[A-Za-z0-9]+)/); if (h) { curRec = h[1]; continue; }
    const r = l.match(/^\| `([^`]+)` \|[^|]*\|[^|]*\| \*\*([^*]+)\*\*/);
    if (r && curRec) { const t = r[1]; if (!tokHome.has(t)) tokHome.set(t, []); tokHome.get(t).push({ rec: curRec, home: r[2].trim() }); }
}
const homeOf = (rec, id) => (tokHome.get(id) || []).find((x) => x.rec === rec)?.home;

// ---- leg (b) ----
const pairs = [];
for (const line of roster) {
    const m = line.match(/^- \*\*(fr-[A-Za-z0-9]+)\*\* \((\d+)\): (.*)$/);
    if (!m) { console.error("UNPARSED ROSTER LINE:", line); process.exit(2); }
    const rec = m[1], n = +m[2];
    const ids = [...m[3].matchAll(/`([^`]+)`/g)].map((x) => x[1]);
    if (ids.length !== n) console.error(`COUNT MISMATCH ${rec}: paren ${n} vs backticked ${ids.length}`);
    for (const id of ids) pairs.push({ rec, id });
}
const tiers = { QUAL: [], UNIQ: [], HOMONYM: [], ESCAPE: [] };
for (const p of pairs) {
    const ir = idRegex(p.id), rr = recordRegex(p.rec);
    let qual = false, pres = false;
    for (const l of specLines) { if (ir.test(l)) { pres = true; if (rr.test(l)) { qual = true; break; } } }
    const carriers = (tokHome.get(p.id) || []).map((x) => `${x.rec}→${x.home}`);
    if (qual) tiers.QUAL.push(p);
    else if (!pres) tiers.ESCAPE.push({ ...p, carriers });
    else if (carriers.length <= 1) tiers.UNIQ.push(p);
    else tiers.HOMONYM.push({ ...p, carriers });
}
console.log(`LEG (b) — pairs ${pairs.length} · records ${new Set(pairs.map((p) => p.rec)).size} · canonical §1 tokens indexed ${tokHome.size}`);
console.log(`  RECORD-QUALIFIED: ${tiers.QUAL.length}`);
console.log(`  TOKEN-UNIQUE (present; the token is homed by exactly one canonical record): ${tiers.UNIQ.length}`);
console.log(`  HOMONYM-TAIL (present; token carried by ≥2 canonical records — read the cell): ${tiers.HOMONYM.length}`);
for (const p of tiers.HOMONYM) console.log(`    HOMONYM ${p.rec} ${p.id}  [${p.carriers.join(" · ")}]`);
console.log(`  ESCAPES (absent by bytes outside the paste): ${tiers.ESCAPE.length}`);
for (const p of tiers.ESCAPE) console.log(`    ESCAPE ${p.rec} ${p.id}  [${p.carriers.join(" · ")}]`);

// ---- fabrication check: rows the spec BOOKS at §6·R5 and §2·R4a/b ----
const booked = new Set();
for (const m of spec.matchAll(/\| `(fr-[A-Za-z0-9]+)` \*\*`([^`]+)`\*\*/g)) booked.add(`${m[1]} ${m[2]}`);        // §6·R5
for (const m of spec.matchAll(/\| \*\*`(fr-[A-Za-z0-9]+) ([^` (]+)[^`]*`\*\*/g)) booked.add(`${m[1]} ${m[2]}`);   // §2·R4a/b
let fab = [];
for (const k of booked) { const [rec, id] = k.split(" "); const h = homeOf(rec, id); if (h !== "F.W1") fab.push(`${k} → canonical home ${h ?? "∅ (no row)"}`); }
console.log(`FABRICATION CHECK — spec-booked (record,id) claims at §6·R5 + §2·R4a/b: ${booked.size}; not homed F.W1 by the canonical: ${fab.length}`);
for (const f of fab) console.log(`    NOT-F.W1 ${f}`);

// ---- leg (a) ----
const rowsBlock = carryRaw.split("## §Rows")[1].split("## §Gates")[0];
const carry = rowsBlock.split("\n").filter((l) => l.startsWith("- **")).map((l) => l.match(/^- \*\*(.+?)\*\*(?=\s)/)?.[1] ?? `UNPARSED:${l.slice(0, 60)}`);
let aHit = 0; const aMiss = [];
for (const raw of carry) {
    const head = raw.replace(/\s*\(.*$/, "").trim();
    const toks = head.split(/\s+[·/+]\s+|\s+\+\s+/).map((t) => t.trim()).filter(Boolean);
    const ok = toks.some((t) => idRegex(t).test(spec)) || idRegex(head).test(spec);
    if (ok) aHit++; else aMiss.push(raw);
}
console.log(`LEG (a) — carry ids ${carry.length} · found in spec ${aHit} · missing ${aMiss.length}`);
for (const m of aMiss) console.log(`    CARRY-MISS ${m}`);
