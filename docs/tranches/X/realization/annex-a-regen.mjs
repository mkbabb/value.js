#!/usr/bin/env node
// V-D8.2: regenerate FINAL Annex A with the census tokenizer fixed (trailing
// sentence punctuation stripped from ids). E-3: FINAL.md is never patched; this
// writes close/ANNEX-A-2026-11-04.md and execution/A/census/esc-nohome-2026-11-04-v2.txt.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const X = join(dirname(fileURLToPath(import.meta.url)), "..");
const strip = (id) => id.replace(/[.,;:]+$/, "");

// The census, re-tokenized.
const census = readFileSync(join(X, "execution/A/census/esc-nohome-2026-10-19.txt"), "utf8")
    .split("\n").filter(Boolean);
const ids = [...new Set(census.map(strip))];
writeFileSync(join(X, "execution/A/census/esc-nohome-2026-11-04-v2.txt"), ids.join("\n") + "\n");

// The annex rows, re-keyed by the stripped id.
const final = readFileSync(join(X, "close/FINAL.md"), "utf8");
const annex = final.slice(final.indexOf("## Annex A"), final.indexOf("## Addendum 2026-10-31"));
const rows = new Map();
for (const line of annex.split("\n")) {
    const m = line.match(/^\| `([^`]+)`\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|$/);
    if (!m) continue;
    const [, raw, wave, rec, disp] = m;
    const id = strip(raw);
    if (raw !== id && rows.has(id)) continue; // the full-stop twin of a row already present
    if (raw !== id && /same id/.test(disp) && !rows.has(id)) {
        rows.set(id, { wave, rec, disp }); // placeholder; overwritten by the bare row below
        continue;
    }
    rows.set(id, { wave, rec, disp });
}
// ESC-R1-XP-REST had no bare row: its only census token carried the full stop.
rows.set("ESC-R1-XP-REST", {
    wave: "X-W7",
    rec: "A/X-W7.md",
    disp: "superseded-by X-W7 CLOSED 2026-09-17 (escalated in the X-W7 REPAIR 1 list beside its siblings, `X/execution/LEDGER.md:628`); its X·P remainder rides X·P (P layer CONFORMANT p10; residuals at parse-that W9, `parse-that/waves/W9.md`)",
});
const missing = ids.filter((id) => !rows.has(id));
if (missing.length) { console.error("no row for", missing); process.exit(1); }

const pad = (s, n) => s + " ".repeat(Math.max(0, n - s.length));
const out = [
    "# Annex A, regenerated — the ESC census with the tokenizer fixed (2026-11-04, V-D8.2)",
    "",
    "Addendum beside `close/FINAL.md` Annex A (E-3: FINAL's bytes are unchanged). The 2026-10-19 census tokenizer took sentence-final punctuation into three ids (`ESC-F14h-1.`, `ESC-R1-XP-REST.`, `ESC-n1.`). Re-tokenized census: `execution/A/census/esc-nohome-2026-11-04-v2.txt`. Generator: `realization/annex-a-regen.mjs`. Two tokens collapse into their bare ids; `ESC-R1-XP-REST` had no bare row and now carries its disposition.",
    "",
    `Ids: ${ids.length} (109 tokens − 3 punctuated + 1 bare id not previously present).`,
    "",
    "| id | owning wave | records | disposition |",
    "| --- | --- | --- | --- |",
    ...ids.map((id) => { const r = rows.get(id); return `| \`${id}\` | ${r.wave} | ${r.rec} | ${r.disp} |`; }),
    "",
];
writeFileSync(join(X, "close/ANNEX-A-2026-11-04.md"), out.join("\n"));
console.log("ids", ids.length);
