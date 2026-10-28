#!/usr/bin/env node
// OD19 · repair 1 (C1-V-06) — the hero bead's parked repaint during a picker drag.
// Counts getBoundingClientRect reads on the hero bead's subtree (the measure glass's resume() makes) and
// where they run: inside an animation-frame callback (the frame's own style/layout pass) or outside one
// (a forced synchronous layout in the input / post-flush path). Also sums the inclusive time of those reads.
// Falsifier: outsideRaf === 0 and perFrameMax <= 1 (the repaint is coalesced to one per frame, in the frame).
// usage: node r1-hero-gbcr.mjs <origin> <cell e.g. dark-1440> [reps]
import { chromium } from "playwright";
const [ORIGIN, CELL = "dark-1440", REPS = "2"] = process.argv.slice(2);
const [scheme, w] = CELL.split("-");
const ARM = () => {
    const S = (window.__hb = { on: false, inRaf: 0, frame: 0, reads: [] });
    const raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) => raf((t) => { S.inRaf++; try { cb(t); } finally { S.inRaf--; } });
    const tick = () => { S.frame++; raf(tick); };
    raf(tick);
    const g = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function () {
        if (!S.on || !this.closest?.(".hero-blob-anchor")) return g.call(this);
        const t = performance.now();
        const r = g.call(this);
        S.reads.push({ frame: S.frame, inRaf: S.inRaf > 0, ms: performance.now() - t });
        return r;
    };
};
const browser = await chromium.launch({ headless: true });
try {
    for (let i = 0; i < +REPS; i++) {
        const ctx = await browser.newContext({ viewport: { width: +w, height: +w === 390 ? 844 : 900 }, colorScheme: scheme });
        try {
            await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
            await ctx.addInitScript(ARM);
            const page = await ctx.newPage();
            await page.goto(`${ORIGIN}/#/`, { waitUntil: "load", timeout: 120000 });
            await page.locator(".channel-slider").first().waitFor({ timeout: 120000 });
            await page.waitForTimeout(4000);
            const sl = page.locator(".channel-slider").first();
            await sl.scrollIntoViewIfNeeded();
            const box = await sl.boundingBox();
            const y = box.y + box.height / 2;
            await page.evaluate(() => { window.__hb.reads = []; window.__hb.on = true; });
            await page.mouse.move(box.x + box.width * 0.2, y);
            await page.mouse.down();
            for (let k = 0; k <= 40; k++) await page.mouse.move(box.x + box.width * (0.2 + 0.6 * (k / 40)), y);
            await page.mouse.up();
            await page.waitForTimeout(400);
            const r = await page.evaluate(() => {
                const S = window.__hb; S.on = false;
                const per = new Map();
                for (const x of S.reads) per.set(x.frame, (per.get(x.frame) ?? 0) + 1);
                return {
                    software: !!document.querySelector(".hero-blob-anchor"),
                    reads: S.reads.length,
                    outsideRaf: S.reads.filter((x) => !x.inRaf).length,
                    perFrameMax: Math.max(0, ...per.values()),
                    framesWithReads: per.size,
                    outsideMs: Math.round(S.reads.filter((x) => !x.inRaf).reduce((a, x) => a + x.ms, 0)),
                    totalMs: Math.round(S.reads.reduce((a, x) => a + x.ms, 0)),
                };
            });
            const pass = r.reads > 0 && r.outsideRaf === 0 && r.perFrameMax <= 1;
            console.log(JSON.stringify({ rep: i, CELL, ...r, verdict: r.reads === 0 ? "NO-READS" : pass ? "GREEN" : "RED" }));
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
