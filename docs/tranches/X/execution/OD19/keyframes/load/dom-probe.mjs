// Ad-hoc: per scene, DOM element counts by region (scene host, controls pane, docks, rest).
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "http://localhost:4182/";
const browser = await chromium.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    try {
        await page.goto(BASE + "#/cube", { waitUntil: "load" });
        await page.waitForTimeout(2500);
        for (const r of ["cube", "square", "easing", "spring", "sequence", "amiga"]) {
            await page.evaluate((h) => { location.hash = h; }, "#/" + r);
            await page.waitForTimeout(2000);
            console.log(r, JSON.stringify(await page.evaluate(() => {
                const n = (sel) => { const e = document.querySelector(sel); return e ? e.querySelectorAll("*").length : -1; };
                const pane = document.querySelector(".controls-layout");
                const kids = pane ? [...pane.querySelectorAll("[data-surface], [role=tabpanel], .panel-content")].slice(0, 8).map((e) => [e.getAttribute("data-surface") || e.className.toString().slice(0, 30), e.querySelectorAll("*").length, e.checkVisibility?.() ?? null]) : [];
                return { all: document.querySelectorAll("*").length, sceneHost: n(".scene-host"), pane: n(".controls-layout"), topDock: n('[data-dock-tether="top"]'), bottomDock: n('[data-dock-tether="bottom"]'), kids };
            })));
        }
    } finally { await ctx.close(); }
} finally { await browser.close(); }
