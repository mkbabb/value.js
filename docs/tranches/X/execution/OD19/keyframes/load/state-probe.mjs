// Ad-hoc state read: per route, after load + idle, count monaco editors and pane state.
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "http://localhost:4181/";
const browser = await chromium.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    try {
        for (const r of ["cube", "square", "easing", "spring"]) {
            await page.goto(BASE + "#/" + r, { waitUntil: "load" });
            await page.waitForTimeout(2500);
            console.log(r, JSON.stringify(await page.evaluate(() => ({
                monaco: document.querySelectorAll(".monaco-editor").length,
                monacoVisible: [...document.querySelectorAll(".monaco-editor")].map((e) => Math.round(e.getBoundingClientRect().height)),
                pane: !!document.querySelector(".controls-layout--open"),
                aurora: performance.getEntriesByType("resource").some((e) => /HeroAurora/.test(e.name)),
            }))));
        }
    } finally { await ctx.close(); }
} finally { await browser.close(); }
