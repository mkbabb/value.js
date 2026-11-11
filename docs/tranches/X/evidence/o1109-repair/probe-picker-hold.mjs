// o1109 repair — adversary defect 5: "the picker's contents blank out on every
// hop" (frames scrubbed from document.getAnimations()). This reads the hop in
// REAL time, per rAF, with nothing paused or scrubbed: the stage picker's
// field (.spectrum-picker) and slider rows (.stagger-children > *) opacity on
// every frame of Home -> Palettes -> Home -> Browse -> Home, when the picker
// card stays the same element. Also counted: finished one-shot entrance
// animations still retained in effect by `fill: both` (what a scrub of
// getAnimations() rewinds to their 0 % keyframe).
// H1: on a hop where the picker card is the same element, its field and rows
//     never read below 0.95 opacity (no content blank on a real frame clock).
// H2 (hygiene): no finished entrance animation (field-paint-in,
//     stagger-child-in) is retained on the picker at rest, after boot or
//     after the hops.
// usage: node probe-picker-hold.mjs <base-url> <outdir>
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const [base, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const CELLS = [[360, 780], [390, 844], [430, 932], [820, 1180], [1440, 900]];
const hop = (page, hash) => page.evaluate(async (hash) => {
    const frame = () => new Promise((r) => requestAnimationFrame(r));
    const picker = () => document.querySelector(".pane-wrapper--stage .spectrum-picker")?.closest(".pane-shell") ?? null;
    const p0 = picker();
    const read = () => {
        const p = picker();
        if (!p) return { same: false };
        const field = p.querySelector(".spectrum-picker");
        const rows = [...p.querySelectorAll(".stagger-children > *")];
        const ops = rows.map((r) => Number(getComputedStyle(r).opacity));
        return { same: p === p0, field: field ? Number(getComputedStyle(field).opacity) : null, rows: ops.length ? Math.min(...ops) : null };
    };
    const outS = [];
    location.hash = hash;
    const t0 = performance.now();
    while (performance.now() - t0 < 1200) { await frame(); outS.push({ t: Math.round(performance.now() - t0), ...read() }); }
    return outS;
}, hash);
const retained = (page) => page.evaluate(() => document.getAnimations().filter((a) => a.playState === "finished" && /field-paint-in|stagger-child-in/.test(a.animationName ?? "")).length);
const rows = [];
const browser = await chromium.launch({ headless: true });
try {
    for (const [w, h] of CELLS) for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
        try {
            const page = await ctx.newPage();
            await page.goto(`${base}/#/`, { waitUntil: "load", timeout: 60000 });
            await page.waitForSelector(".pane-wrapper--stage .spectrum-picker", { timeout: 45000 });
            await page.waitForTimeout(3000);
            const r = { w, scheme, faults: [], minField: 1, minRows: 1, retainedAtRest: await retained(page) };
            for (const hash of ["#/palettes", "#/", "#/browse", "#/"]) {
                const s = await hop(page, hash);
                for (const x of s.filter((x) => x.same)) {
                    if (x.field != null) r.minField = Math.min(r.minField, x.field);
                    if (x.rows != null) r.minRows = Math.min(r.minRows, x.rows);
                    if ((x.field ?? 1) < 0.95 || (x.rows ?? 1) < 0.95) r.faults.push(`${hash} t=${x.t} field ${x.field} rows ${x.rows}`);
                }
                await page.waitForTimeout(600);
            }
            r.retainedAfter = await retained(page);
            r.faults = r.faults.slice(0, 4);
            r.H1 = !r.faults.length;
            r.H2 = r.retainedAtRest === 0 && r.retainedAfter === 0;
            rows.push(r);
            console.log(JSON.stringify(r));
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
writeFileSync(`${out}/rows.json`, JSON.stringify(rows, null, 1));
const h1 = rows.every((r) => r.H1), h2 = rows.every((r) => r.H2);
console.log(`VERDICT H1 ${h1 ? "GREEN" : "RED"} · H2 ${h2 ? "GREEN" : "RED"}`);
process.exitCode = h1 && h2 ? 0 : 1;
