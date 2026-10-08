// SERVED MODEL: claude-opus-5-5
// KF.W13X.esc3 served falsifier T1 — ESC-W13X-tl-1 steps 1-2 (A2-KE-L1-9 consumer half · UIA-KF-099).
// Headless real Chrome (§0ei), fresh context per cell. The Timeline pane in BOTH modes renders the ONE
// lane-track primitive: keyframe mode (#/cube) and sequence mode (#/sequence), at 1440x900 light/dark and
// 390x844 light. Per cell: exactly one `.lane-track` in the pane; its scrub slider (by the mode's name)
// IS the primitive's host (`.lane-track-scrub`); one `[data-lane-track-playhead]` in it; the ruler has
// labelled graduations; and in sequence mode every lane track starts and ends on the one time column
// (±1 px) and the playhead runs through every row (its box spans the column's block extent ±1 px).
// Usage: node t1.mjs <base> <tag> [framesDir]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, tag, outDir] = process.argv;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = [];
const MODES = [
    ["cube", "Playhead — scrub the animation"],
    ["sequence", "Scrub the sequence master clock"],
];
for (const [w, h, scheme] of [[1440, 900, "light"], [1440, 900, "dark"], [390, 844, "light"]]) {
    for (const [route, scrubName] of MODES) {
        const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
        const p = await ctx.newPage();
        await p.goto(`${base}#/${route}`, { waitUntil: "load" });
        await p.waitForSelector('[data-dock-tether="top"] .glass-dock', { timeout: 30000 });
        await sleep(3000);
        const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first();
        if (await bt.count()) { await bt.click().catch(() => {}); await sleep(700); }
        const item = p.locator('[data-dock-tether=top] [data-dock-surface-item][aria-label="Timeline"]').first();
        if ((await item.count()) && (await item.getAttribute("aria-pressed")) !== "true") await item.click({ force: true }).catch(() => {});
        await sleep(1500);
        const m = await p.evaluate((scrubName) => {
            const scrub = document.querySelector(`[role="slider"][aria-label="${scrubName}"]`);
            if (!scrub) return { scrub: false };
            scrub.scrollIntoView({ block: "center" });
            const tracks = document.querySelectorAll(".lane-track").length;
            const isHost = scrub.classList.contains("lane-track-scrub");
            const heads = scrub.querySelectorAll("[data-lane-track-playhead]");
            const labels = [...scrub.querySelectorAll(".lane-track-tick-label")].map((e) => e.textContent.trim());
            const col = scrub.querySelector(".lane-track-column")?.getBoundingClientRect();
            const lanes = [...scrub.querySelectorAll(".seq-lane-track")].map((e) => e.getBoundingClientRect());
            const head = heads[0]?.getBoundingClientRect();
            const r = (v) => Math.round(v * 10) / 10;
            return {
                scrub: true, tracks, isHost, heads: heads.length, labels,
                lanesOnColumn: col ? lanes.every((l) => Math.abs(l.left - col.left) <= 1 && Math.abs(l.right - col.right) <= 1) : false,
                lanes: lanes.length,
                headSpans: col && head ? Math.abs(head.top - col.top) <= 1 && Math.abs(head.bottom - col.bottom) <= 1 : false,
                col: col ? [r(col.left), r(col.top), r(col.width), r(col.height)] : null,
            };
        }, scrubName);
        await sleep(300);
        if (outDir) await p.screenshot({ path: `${outDir}/${tag}-t1-${route}-${w}-${scheme}.png` });
        const ok = {
            oneTrack: m.tracks === 1,
            scrubIsHost: !!m.isHost,
            onePlayhead: m.heads === 1,
            ruler: (m.labels?.length ?? 0) > 0,
            ...(route === "sequence" ? { lanesOnColumn: !!m.lanesOnColumn && m.lanes > 0, headSpans: !!m.headSpans } : {}),
        };
        res.push({ cell: `${route}-${w}x${h}-${scheme}`, ok: m.scrub && Object.values(ok).every(Boolean), preds: ok, m });
        await ctx.close();
    }
}
await b.close();
console.log(JSON.stringify({ tag, base, pass: res.filter((r) => r.ok).length, of: res.length, res }));
