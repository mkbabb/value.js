#!/usr/bin/env node
// V-D8 falsifier (realization PLAN §2): the records legs. Exit 0 only when every leg holds.
//   L1  every Track A honest-RED label (LEDGER Track A table) has a crosswalk row
//   L2  every regenerated Annex A id matches /[A-Za-z0-9-]$/ and carries a disposition
//   L3  INBOX outbound ids are unique (each id names one subject, or its collision is resolved)
//   L4  every PRE-X MT-REGISTER record has an X row
//   L5  every CARRY-LEDGER §B–§F row has a crosswalk row
//   K1..K5 — the keyframes records (K-D9, keyframes-DESIGN §1):
//   K1  LEDGER carries the kf `9bd5b335` event with its CI and deploy run ids
//   K2  each G-TAX registry record carries one dated SUPERSEDED addendum
//   K3  KF-W5-ADDENDUM-GID.md exists and names `:386` and `:412`
//   K4  INBOX carries the erratum for each doubled value-side id O-63/65/66/67/68
//   K5  the kf-m-checker evidence is tracked (5 files)
// `--labels` prints the L1 label set (the crosswalk's row keys).
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const X = join(dirname(fileURLToPath(import.meta.url)), "..");
const T = join(X, "..");
const rd = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
const fails = [];
const XW = rd(join(X, "realization/RECORDS-CROSSWALK.md"));
const section = (n) => {
    const i = XW.indexOf(`## §${n} `);
    if (i < 0) return "";
    const j = XW.indexOf("\n## §", i + 1);
    return XW.slice(i, j < 0 ? undefined : j);
};
const keys = (sec) => new Set([...sec.matchAll(/^\| `([^`]+)` \|/gm)].map((m) => m[1]));

// L1 — Track A honest-RED labels.
const ledger = rd(join(X, "execution/LEDGER.md"));
const trackA = ledger.slice(ledger.indexOf("## Track A"), ledger.indexOf("## Track B"));
const labels = [];
for (const line of trackA.split("\n")) {
    const c = line.split("|");
    if (c.length < 5 || !/^\s*X-W/.test(c[1])) continue;
    const m = c[3].match(/\(honest-RED[^:]*:\s*/);
    if (!m) continue;
    let s = c[3].slice(m.index + m[0].length), depth = 1, out = "";
    for (const ch of s) { if (ch === "(") depth++; if (ch === ")" && --depth === 0) break; out += ch; }
    const parts = [];
    let cur = "", d = 0;
    for (let i = 0; i < out.length; i++) {
        const ch = out[i];
        if (ch === "(") d++;
        if (ch === ")") d--;
        if (d === 0 && (out.startsWith(" · ", i) || out.startsWith(", ", i))) {
            parts.push(cur); cur = ""; i += out.startsWith(" · ", i) ? 2 : 1; continue;
        }
        cur += ch;
    }
    parts.push(cur);
    for (let part of parts) {
        part = part.replace(/\([^()]*(\([^()]*\)[^()]*)*\)?/g, "").replace(/`/g, "").replace(/\s*→.*$/, "").replace(/\*/g, "").trim();
        part = part.replace(/\s+/g, " ").trim();
        if (part) labels.push(`${c[1].trim()} ${part}`);
    }
}
if (process.argv.includes("--labels")) { console.log(labels.join("\n")); process.exit(0); }
const k1 = keys(section(1));
const miss1 = labels.filter((l) => !k1.has(l));
if (!labels.length) fails.push("L1 no labels parsed");
if (miss1.length) fails.push(`L1 ${miss1.length}/${labels.length} labels without a crosswalk row: ${miss1.slice(0, 5).join(" | ")}`);

// L2 — Annex A ids.
const annex = rd(join(X, process.env.ANNEX ?? "close/ANNEX-A-2026-11-04.md"));
const arows = [...annex.matchAll(/^\| `([^`]+)`\s*\| (.*)$/gm)];
if (!arows.length) fails.push("L2 no regenerated annex (close/ANNEX-A-2026-11-04.md)");
const bad = arows.filter(([, id, rest]) => !/[A-Za-z0-9-]$/.test(id) || /\?/.test(rest));
if (bad.length) fails.push(`L2 ${bad.length} annex ids malformed or undisposed: ${bad.map((r) => r[1]).join(" ")}`);

// L3 — outbound id uniqueness. An id may name only one subject; a collision is lawful
// only when §3 of the crosswalk resolves it (the id kept, the subject moved).
const inbox = rd(join(T, "V/coordination/INBOX.md"));
const subj = new Map();
const add = (id, who) => { if (!subj.has(id)) subj.set(id, new Set()); subj.get(id).add(who); };
for (const m of inbox.matchAll(/OUTBOUND (O-\d+)\s*→\s*([a-z][a-z0-9.-]*)/g)) add(m[1], m[2].replace(/-[0-9a-f]{2}$/, "").replace(/[.:]$/, ""));
for (const m of inbox.matchAll(/["“]?(O-\d+) → (fourier-analysis|fourier|keyframes|glass-ui)/g)) add(m[1], m[2].replace(/-analysis$/, ""));
const resolved = keys(section(3));
const coll = [...subj].filter(([id, s]) => new Set([...s].map((w) => w.replace(/-analysis$/, ""))).size > 1 && !resolved.has(id));
if (coll.length) fails.push(`L3 ${coll.length} unresolved outbound collisions: ${coll.map(([i, s]) => `${i}{${[...s]}}`).join(" ")}`);

// L4 — MT-REGISTER cohort (X-W0-FOLD W0.24: the 15 zero-X-token records).
const MT = ["AdminPane", "AdminUsersPanel", "App", "ColorInput", "ColorPicker", "ColorSpaceSelector", "ConfigSliderPane", "Dock", "GenerateControls", "GradientStopEditor", "Markdown", "chassis-fitness", "layout-gestalt", "library-band", "parser-band"];
const k4 = keys(section(2));
const miss4 = MT.filter((r) => !k4.has(r));
if (miss4.length) fails.push(`L4 ${miss4.length}/15 MT records without an X row`);

// L5 — CARRY-LEDGER §B–§F rows (the committed bytes; the working-tree hunk is OA-14's).
const carry = execSync("git show HEAD:docs/tranches/V/reformation/CARRY-LEDGER.md", { cwd: X, encoding: "utf8" });
const body = carry.slice(carry.indexOf("## §B"));
const crows = [
    ...[...body.matchAll(/^\| \*\*(W\d+)\*\*/gm)].map((m) => m[1]),
    ...[...body.matchAll(/^- \*\*([^*]+?):?\*\*/gm)].map((m) => m[1].replace(/:$/, "").replace(/`/g, "")),
];
const k5 = keys(section(4));
const miss5 = crows.filter((r) => !k5.has(r));
if (!crows.length) fails.push("L5 no CARRY rows parsed");
if (miss5.length) fails.push(`L5 ${miss5.length}/${crows.length} CARRY rows without a crosswalk row: ${miss5.slice(0, 4).join(" | ")}`);

// K1..K5 — the keyframes records (K-D9).
if (!/9bd5b335[^\n]*41804538410[^\n]*41805222686|9bd5b335[^\n]*41805222686[^\n]*41804538410/.test(ledger))
    fails.push("K1 LEDGER has no kf 9bd5b335 event naming ci 41804538410 and deploy 41805222686");
const REG = join(T, "V/megatranche/registry/adjudicated");
const tax = ["kf-AnimationControlsGroup", "kf-ControlsPaneWrapper", "kf-DemoGlobalChrome"].map(
    (r) => (rd(join(REG, `${r}.md`)).match(/KF\.W5-PARTIALS \(S-5\/6\/7\) is SUPERSEDED/g) ?? []).length,
);
if (tax.join("·") !== "1·1·1") fails.push(`K2 G-TAX SUPERSEDED addenda ${tax.join("·")} (want 1·1·1)`);
const gid = rd(join(X, "keyframes/waves/KF-W5-ADDENDUM-GID.md"));
if (!gid.includes(":386") || !gid.includes(":412")) fails.push("K3 KF-W5-ADDENDUM-GID.md absent or does not name :386 and :412");
const errata = ["O-63", "O-65", "O-66", "O-67", "O-68"].filter(
    (id) => !new RegExp(`ERRATUM \\(K-D9[^\\n]*\\b${id}\\b`).test(inbox),
);
if (errata.length) fails.push(`K4 INBOX erratum missing for ${errata.join(" ")}`);
const kfm = execSync("git ls-files docs/tranches/X/evidence/0hm/kf-m-checker", { cwd: join(T, "../.."), encoding: "utf8" })
    .split("\n").filter(Boolean).length;
if (kfm !== 5) fails.push(`K5 kf-m-checker tracked files ${kfm} (want 5)`);

for (const f of fails) console.error("RED", f);
console.log(fails.length ? `RED ${fails.length} legs` : `GREEN 10/10 legs (L1 ${labels.length} labels · L2 ${arows.length} ids · L3 ${subj.size} ids · L4 15 · L5 ${crows.length} · K1..K5)`);
process.exit(fails.length ? 1 : 0);
