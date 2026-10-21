#!/usr/bin/env node
// OD19 · repair 1 (C1-V-05) — what the incoming Gradient pane's first mount costs, per component (dev server only:
// Vue's `app.config.performance` writes `<Name> mount` / `<Name> render` / `<Name> patch` measures in dev builds).
// usage: node r1-mount-measure.mjs <origin> <width> <scheme> [reps]
import { chromium } from "playwright";
const [ORIGIN, W = "1440", SCHEME = "light", REPS = "2"] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true });
try {
    for (let i = 0; i < +REPS; i++) {
        const ctx = await browser.newContext({ viewport: { width: +W, height: +W >= 1000 ? 900 : 844 }, colorScheme: SCHEME });
        try {
            const page = await ctx.newPage();
            await page.goto(`${ORIGIN}/#/`, { waitUntil: "load", timeout: 90000 });
            await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
            await page.waitForTimeout(5000);
            const r = await page.evaluate(async () => {
                const app = document.querySelector("#app")?.__vue_app__;
                if (!app) return { error: "no __vue_app__" };
                app.config.performance = true;
                performance.clearMeasures();
                const t0 = performance.now();
                location.hash = "#/gradient";
                await new Promise((res) => setTimeout(res, 2500));
                app.config.performance = false;
                const all = performance.getEntriesByType("measure");
                const ms = all.filter((m) => m.startTime >= t0 && / mount$/.test(m.name));
                const top = ms.map((m) => [m.name, Math.round(m.duration), Math.round(m.startTime - t0)]).sort((a, b) => b[1] - a[1]);
                return { mounts: ms.length, measures: all.length, names: all.slice(0, 5).map((m) => m.name), h1: document.querySelector("main h1")?.textContent?.trim(), top: top.slice(0, 16) };
            });
            console.log(JSON.stringify({ rep: i, W, SCHEME, ...r }));
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
