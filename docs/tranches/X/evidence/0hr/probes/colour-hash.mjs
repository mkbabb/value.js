// X·§0hr B — colour.babb.dev/#/palettes lands on color.babb.dev/#/palettes and renders.
// One headless Chromium, one context, closed in finally. Run under guarded (browser pool).
import fs from "node:fs";
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const TAG = process.argv[2] || "r1";
const OUT = `${process.env.HOME}/.dev-logs/x-0hr/colour/${TAG}`;
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ headless: true });
const rows = [];
try {
    for (const [w, h] of [[1440, 900], [390, 844]]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            const errors = [], chain = [];
            page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 160)); });
            page.on("pageerror", (e) => errors.push("PE " + String(e).slice(0, 160)));
            page.on("response", (r) => { if (r.request().isNavigationRequest()) chain.push(`${r.status()} ${r.url()}`); });
            await page.goto("https://colour.babb.dev/#/palettes", { waitUntil: "load", timeout: 60000 });
            await page.waitForSelector(".palettes-companion-grid", { timeout: 30000 }).catch(() => {});
            await page.waitForTimeout(3000);
            const r = await page.evaluate(() => ({
                href: location.href, view: document.querySelector(".app-layout")?.dataset.view ?? null,
                grid: !!document.querySelector(".palettes-companion-grid"),
                heading: [...document.querySelectorAll("h1,h2")].map((e) => e.textContent.trim()).filter(Boolean).slice(0, 3),
            }));
            await page.screenshot({ path: `${OUT}/colour-palettes-${w}.png` });
            rows.push({ w, chain, ...r, ok: r.href === "https://color.babb.dev/#/palettes" && r.grid, errors });
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
fs.writeFileSync(`${OUT}/colour.json`, JSON.stringify(rows, null, 1));
for (const r of rows) console.log(JSON.stringify(r));
