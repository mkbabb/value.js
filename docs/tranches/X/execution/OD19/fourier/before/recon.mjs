// OD19 fourier BEFORE recon: dock inventory + layer geometry on the served app.
// Run: guarded --timeout 10 -- node recon.mjs  (from fourier web/ so playwright resolves)
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:3100";
const route = process.argv[2] ?? "/";
const browser = await chromium.launch({ headless: true });
const out = {};
try {
    for (const scheme of ["light", "dark"]) {
        for (const w of [1440, 390]) {
            const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
            const page = await ctx.newPage();
            try {
                const t0 = Date.now();
                await page.goto(BASE + route, { waitUntil: "load" });
                await page.waitForTimeout(2500);
                const loadMs = Date.now() - t0;
                const docks = await page.evaluate(() =>
                    [...document.querySelectorAll(".glass-dock")].map((d) => {
                        const r = d.getBoundingClientRect();
                        const kids = [...d.querySelectorAll("*")].filter((e) => {
                            const cs = getComputedStyle(e);
                            return (cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.backgroundImage !== "none" || cs.backdropFilter !== "none") && e.getBoundingClientRect().width > 40;
                        }).slice(0, 12).map((e) => {
                            const cs = getComputedStyle(e); const b = e.getBoundingClientRect();
                            return { cls: String(e.className?.baseVal ?? e.className).slice(0, 80), w: Math.round(b.width), h: Math.round(b.height), x: Math.round(b.x), y: Math.round(b.y), radius: cs.borderRadius, bg: cs.backgroundColor, bf: cs.backdropFilter, transform: cs.transform };
                        });
                        const cs = getComputedStyle(d);
                        return { cls: d.className.slice(0, 140), w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), radius: cs.borderRadius, kids };
                    }),
                );
                out[`${scheme}-${w}`] = { loadMs, docks };
                await page.screenshot({ path: `${OUT}recon${route.replace(/\W/g, "_")}-${scheme}-${w}.png` });
            } finally { await ctx.close(); }
        }
    }
} finally { await browser.close(); }
writeFileSync(`${OUT}recon${route.replace(/\W/g, "_")}.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, { loadMs: v.loadMs, docks: v.docks.map((d) => `${d.cls.slice(0, 60)} ${d.w}x${d.h}@${d.x},${d.y} r=${d.radius}`) }])), null, 1));
