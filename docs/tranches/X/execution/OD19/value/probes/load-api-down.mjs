#!/usr/bin/env node
// OD19 · load — what a cold deep link's regions hold over time when the API refuses the origin (CORS).
// usage: node load-api-down.mjs <origin> <route...>
import { chromium } from "playwright";
const [ORIGIN, ...ROUTES] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
    for (const route of ROUTES) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
        try {
            const page = await ctx.newPage();
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
            const fails = [];
            page.on("requestfailed", (r) => fails.push([Math.round(Date.now()), r.url().replace(/^https?:\/\/[^/]+/, ""), r.failure()?.errorText]));
            const t0 = Date.now();
            await page.goto(`${ORIGIN}/#/${route}`, { waitUntil: "commit" });
            console.log("== ", route);
            for (let i = 0; i < 14; i++) {
                const s = await page.evaluate(() => ({
                    t: Math.round(performance.now()),
                    h1: document.querySelector("main h1")?.textContent?.trim() ?? null,
                    regions: [...document.querySelectorAll("main .pane-wrapper")].map((w) => {
                        const c = w.firstElementChild;
                        return (c ? c.tagName.toLowerCase() + "." + [...c.classList].slice(0, 2).join(".") + ":" + Math.round(c.getBoundingClientRect().height) : "empty") + (w.querySelector(".pane-plate") ? "+PLATE" : "");
                    }),
                }));
                console.log(JSON.stringify(s));
                await page.waitForTimeout(500);
            }
            for (const f of fails.slice(0, 6)) console.log("failed", f[0] - t0, f[1], f[2]);
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
