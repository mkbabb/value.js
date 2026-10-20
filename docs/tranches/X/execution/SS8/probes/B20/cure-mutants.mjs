// SS-8 · B20 cure seat — RED/GREEN apparatus for demo/test/gradient/ss8-b20-cures.test.ts.
// Each mutant re-introduces the defect its row names (the cure reverted), runs ONLY
// that row's falsifier, and restores the source byte-exact in `finally`. A final
// GREEN pass runs the whole file on the untouched tree.
// Run: ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/X/execution/SS8/probes/B20/cure-mutants.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const SUITE = "demo/test/gradient/ss8-b20-cures.test.ts";
const ED = "demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue";
const MUTANTS = [
    ["SS8-0563", ED, "font-mono text-mono-small text-destructive", "font-mono text-mono-caption text-destructive"],
    ["SS8-0566", ED, "whitespace-pre-wrap wrap-break-word", "whitespace-pre-wrap break-all"],
    ["SS8-0564", "demo/styles/hljs.css", "oklch(from var(--accent-live) 0.913 min(c, 0.03) h)", "oklch(from var(--accent-live) 0.8 min(c, 0.03) h)"],
    ["SS8-0572", ED, ".code-editor {\n    background: var(--code-ground);", ".code-editor {\n    background: transparent;"],
    ["SS8-0574", "demo/app/ErrorBoundary.vue", '<Card\n        v-if="caught"\n        tier="resting"', '<Card\n        v-if="caught"\n        tier="floating"'],
    ["SS8-0575", "demo/workbenches/gradient/composables/gradientParse.ts", "return parseCssColor(token).ok;", 'if (/\\(\\s*\\)$/.test(token)) throw new Error("pre-A-1 empty-call throw"); return parseCssColor(token).ok;'],
    ["R-14", "demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue", '<AccordionContent class="easing-row-body', '<AccordionContent force-mount class="easing-row-body'],
];

function vitest(filter) {
    const args = ["vitest", "run", SUITE, "--maxWorkers=2", ...(filter ? ["-t", filter] : [])];
    const r = spawnSync("npx", args, { encoding: "utf8" });
    const out = (r.stdout ?? "") + (r.stderr ?? "");
    const tests = out.match(/Tests\s+(.*)/)?.[1]?.trim() ?? "?";
    return { code: r.status, tests };
}

const only = process.argv[2];
const results = [];
for (const [row, file, from, to] of MUTANTS) {
    if (only && only !== row) continue;
    const original = readFileSync(file, "utf8");
    if (original.split(from).length !== 2) {
        results.push({ row, error: `anchor not unique/absent in ${file}` });
        continue;
    }
    try {
        writeFileSync(file, original.replace(from, to));
        const r = vitest(row);
        results.push({ row, mutant: r.code === 0 ? "SURVIVED (GREEN)" : "KILLED (RED)", tests: r.tests });
    } finally {
        writeFileSync(file, original);
    }
}
const g = vitest(null);
results.push({ row: "ALL (unmutated)", verdict: g.code === 0 ? "GREEN" : "RED", tests: g.tests });
console.log(JSON.stringify({ at: new Date().toISOString(), results }, null, 1));
