// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.d — tallies a census tag: per config, docks read, collapsed reached, spill count (the
// law: 0 collapsed-face seats outside the plate), max spill px, consumer clip cut (> 0 = a clip),
// vertical/side docks found. Usage: node summarize.mjs <tag>
import { readFileSync, readdirSync } from "node:fs";
const tag = process.argv[2];
for (const f of readdirSync(".").filter((f) => f.startsWith(tag + "-") && f.endsWith(".json")).sort()) {
  const o = JSON.parse(readFileSync(f));
  let docks = 0, collapsed = 0, spillDocks = 0, maxSpill = 0, clipped = 0, vertical = 0; const rows = [];
  for (const [s, ds] of Object.entries(o.scenes)) for (const d of ds) {
    docks++; if (/\bcollapsed\b/.test(d.cls)) collapsed++; if (/\bvertical\b/.test(d.cls)) vertical++;
    if (d.spill.length) { spillDocks++; maxSpill = Math.max(maxSpill, ...d.spill.map((x) => x.over)); rows.push(`${s}/${d.tether}:${d.plate.w}px[${d.faceChildren.map((c) => c.label).join("|")}]`); }
    if (d.clips.some((c) => c.cut > 0.5)) clipped++;
  }
  console.log(`${f}: docks ${docks} · collapsed ${collapsed} · vertical ${vertical} · spill ${spillDocks} (max ${maxSpill} px) · clipped ${clipped}${rows.length ? " · " + rows.join(" ") : ""}`);
}
