// SERVED MODEL: claude-opus-5-5
// X.W12U.g2d — the eager-graph audit table: every eager source (eager-files.mjs output, per source file,
// gz pro rata) classed by WHY it is eager, by ordered rules (first match wins). Deterministic: same input,
// same bytes. Usage: node audit-classify.mjs <files.txt>
//
// Classes:
//   P   needed before first paint (boot shell, picker, colour session, dock face, atmosphere/ground, Vue runtime)
//   R1  lib `./css` share — pinned by the six demo/color-session importers AND glass value-*.js (ESC-W12U-g2s-1)
//   R2  glass families pinned by ROOT-BARREL REACHABILITY (an eager importer of Skeleton/Avatar, which glass
//       exports from no subpath, makes `glass-ui.js` eager; every family a lazy chunk uses then rides it)
//   R3  interaction-only, rooted in Dock.vue (an X-DS dirty path, clean-window §0ev.3: not touchable here)
//   R4  route-only admin/migration state, held by the synchronous port contract (usePalettePorts provides refs
//       at boot; a lazy import needs a port redesign, not a root-import move)
//   R5  vue-router's devtools chunk (bundler define; vite.config.ts is outside this unit's bounds)
import { readFileSync } from "node:fs";
const rows = readFileSync(process.argv[2], "utf8").split("\n").filter((l) => /^\s*\d+ gz/.test(l))
    .map((l) => { const m = l.trim().split(/\s+/); return { gz: +m[0], raw: +m[2], src: m[4] }; });
const RULES = [
    ["R1", /^subpaths\/css\.js$/],
    ["R5", /vue-router\/dist\/devtools/],
    ["R4", /^demo\/palettes\/(admin\/|api\/admin|useColorNameQueue|useSlugMigration|useVersionHistory|useTagEdit)/],
    ["R3", /^demo\/shell\/dock\/(layers\/SlugEditLayer|menus\/)/],
    ["R2", /reka-ui\/dist\/(Dialog|NumberField|Collapsible|Accordion|RadioGroup|Radio|Switch|Avatar|Toggle|ToggleGroup|Label|Separator|HoverCard|Combobox|Listbox|Checkbox)\/|@internationalized\/number|glass-ui\/dist\/(sheet|DialogContent|dialog|collapsible|number-field|radio-group|switch|toggle-group|configurator|badge|separator|data-table|label|status-dot|expandable-container|useSpringMount|glass-ui)[-.]/],
];
const cls = (s) => (RULES.find(([, re]) => re.test(s)) ?? ["P"])[0];
const sums = {}; const lists = {};
for (const r of rows) { const c = cls(r.src); sums[c] = (sums[c] ?? 0) + r.gz; (lists[c] ??= []).push(r); }
const total = rows.reduce((a, r) => a + r.gz, 0);
console.log(`sources=${rows.length} attributed gz=${total}`);
for (const c of ["P", "R1", "R2", "R3", "R4", "R5"]) console.log(`${c.padEnd(3)} ${String(sums[c] ?? 0).padStart(7)} gz  ${(lists[c] ?? []).length} sources`);
for (const c of ["R1", "R2", "R3", "R4", "R5"]) {
    console.log(`-- ${c}`);
    for (const r of (lists[c] ?? []).sort((a, b) => b.gz - a.gz).slice(0, 14)) console.log(`   ${String(r.gz).padStart(6)}  ${r.src.replace(/^npm:/, "")}`);
}
