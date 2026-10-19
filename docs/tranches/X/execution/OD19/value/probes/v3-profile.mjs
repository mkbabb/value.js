// OD19-V3 — CPU profile of a picker channel-slider drag (CDP Profiler), self
// and inclusive time by function@file:line. Headless shell; one browser, one
// context, closed in finally.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = process.env.OUT;
const browser = await chromium.launch({ headless: true });
const res = {};
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
    try {
        const page = await ctx.newPage();
        await page.goto(BASE + "/#/", { waitUntil: "load", timeout: 180000 });
        const sl = page.locator(".channel-slider").first();
        await sl.waitFor({ timeout: 120000 });
        await page.waitForTimeout(3000);
        const cdp = await ctx.newCDPSession(page);
        await cdp.send("Profiler.enable");
        await cdp.send("Profiler.setSamplingInterval", { interval: 200 });
        await cdp.send("Profiler.start");
        const box = await sl.boundingBox();
        const y = box.y + box.height / 2;
        await page.mouse.move(box.x + box.width * 0.2, y);
        await page.mouse.down();
        for (let i = 0; i <= 40; i++) await page.mouse.move(box.x + box.width * (0.2 + 0.6 * (i / 40)), y);
        await page.mouse.up();
        await page.waitForTimeout(300);
        const { profile } = await cdp.send("Profiler.stop");
        const byId = new Map(profile.nodes.map((n) => [n.id, n]));
        const parent = new Map();
        for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
        const dt = profile.timeDeltas;
        const selfT = new Map(), inclT = new Map();
        const key = (n) => { const f = n.callFrame; return `${f.functionName || "(anon)"} @ ${f.url.replace(/^https?:\/\/[^/]+/, "").replace(/\?.*$/, "")}:${f.lineNumber + 1}`; };
        profile.samples.forEach((id, i) => {
            const d = (dt[i] ?? 0) / 1000;
            const n = byId.get(id);
            selfT.set(key(n), (selfT.get(key(n)) ?? 0) + d);
            const seen = new Set();
            for (let cur = id; cur !== undefined; cur = parent.get(cur)) { const k = key(byId.get(cur)); if (seen.has(k)) continue; seen.add(k); inclT.set(k, (inclT.get(k) ?? 0) + d); }
        });
        const top = (m, f) => [...m.entries()].filter(([k]) => f(k)).sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => `${v.toFixed(0)}ms ${k}`);
        res.self = top(selfT, (k) => !/^\(idle\)|\(program\)/.test(k));
        res.inclDemo = top(inclT, (k) => /\/demo\/|value\.js\/src\//.test(k));
        res.inclGlass = top(inclT, (k) => /glass-ui/.test(k)).slice(0, 12);
    } finally { await ctx.close(); }
} finally { await browser.close(); }
writeFileSync(`${OUT}/v3-profile.json`, JSON.stringify(res, null, 1));
console.log("ok");
