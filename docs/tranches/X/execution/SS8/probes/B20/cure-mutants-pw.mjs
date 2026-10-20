// SS-8 · B20 cure seat — RED apparatus for e2e/smoke/ss8-b20-gradient.spec.ts.
// Each mutant re-introduces its row's defect in GradientVisualizer.vue, runs ONLY that
// row's cells (one browser, --workers=1, a private vite on VJS_E2E_PORT), and restores
// the source byte-exact in `finally`.
// Run: VJS_E2E_PORT=8120 ~/.claude/guard/guarded --timeout 30 -- node docs/tranches/X/execution/SS8/probes/B20/cure-mutants-pw.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const SPEC = "e2e/smoke/ss8-b20-gradient.spec.ts";
const GV = "demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue";
const MUTANTS = [
    // R-1: the heading ink loses its certified opacity (the 4.31/3.57 class of reading).
    ["R-1", "R-1", '<h3 class="font-display text-subheading">\n            Interpolation', '<h3 class="font-display text-subheading text-foreground/40">\n            Interpolation'],
    // R-6: the pre-UIA-V-44 band — three fields across at every width.
    ["R-6", "R-6", "col-span-2 sm:col-span-1 grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0", "col-span-1 grid grid-cols-3 gap-3 min-w-0"],
    // R-15 (phone limb): the pre-V7C-01 tile — spans both rows of the right track at every width.
    ["R-15", "R-6 \\+ R-15", "order-last sm:order-none col-start-2 w-12 min-h-10 sm:w-24 sm:row-span-2", "col-start-2 w-24 row-span-2"],
];

const only = process.argv[2];
const results = [];
for (const [row, grep, from, to] of MUTANTS) {
    if (only && only !== row) continue;
    const original = readFileSync(GV, "utf8");
    if (original.split(from).length !== 2) {
        results.push({ row, error: "anchor not unique/absent" });
        continue;
    }
    try {
        writeFileSync(GV, original.replace(from, to));
        const r = spawnSync("npx", ["playwright", "test", SPEC, "--project=smoke", "--workers=1", "--reporter=line", "-g", grep], { encoding: "utf8" });
        const out = (r.stdout ?? "") + (r.stderr ?? "");
        const tally = [...out.matchAll(/^\s*(\d+) (passed|failed|flaky|skipped)/gm)].map((m) => `${m[1]} ${m[2]}`).join(", ");
        const why = [...out.matchAll(/(Expected[^\n]*|Received[^\n]*|toBeGreaterThan[^\n]*|toMatchObject[^\n]*)/g)].slice(0, 4).map((m) => m[1].replace(/\x1b\[[0-9;]*m/g, "").slice(0, 200));
        results.push({ row, mutant: r.status === 0 ? "SURVIVED (GREEN)" : "KILLED (RED)", tally, why });
    } finally {
        writeFileSync(GV, original);
    }
}
console.log(JSON.stringify({ at: new Date().toISOString(), results }, null, 1));
