// CHALLENGE-C pass 4 — probe E. READ-ONLY.
// Retention arithmetic for the PRM leave-never-completes defect: expand and
// collapse every card in turn, then count the swatch subtrees still in the DOM.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL("./probe-C4e-pass4-results.json", import.meta.url).pathname;
const cols = (arr) => arr.map((css, position) => ({ css, position }));
const iso = (ms) => new Date(Date.now() - ms).toISOString();
const FIXTURE = {
    version: 1,
    palettes: Array.from({ length: 6 }, (_, k) => ({
        id: `p-${k}`, name: `Palette ${k}`, slug: `palette-${k}`,
        createdAt: iso(k * 1000), updatedAt: iso(k * 1000), isLocal: true,
        colors: cols(Array.from({ length: 24 }, (_, i) => `hsl(${(i * 15 + k * 7) % 360} 70% 55%)`)),
    })),
};

const count = (page) => page.evaluate(() => ({
    cards: document.querySelectorAll('[role="article"]').length,
    swatchPanels: [...document.querySelectorAll('[role="article"] .overflow-hidden')].filter((d) => d.querySelector(".flex-wrap")).length,
    swatchNodes: document.querySelectorAll(".watercolor-swatch").length,
    zeroHeightPanels: [...document.querySelectorAll('[role="article"] .overflow-hidden')]
        .filter((d) => d.querySelector(".flex-wrap") && d.clientHeight === 0).length,
    totalDomNodes: document.getElementsByTagName("*").length,
}));

const main = async () => {
    const browser = await chromium.launch();
    const out = {};
    for (const mode of ["no-prm", "prm"]) {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 1000 },
            ...(mode === "prm" ? { reducedMotion: "reduce" } : {}),
        });
        const page = await ctx.newPage();
        page.setDefaultTimeout(90000);
        page.setDefaultNavigationTimeout(90000);
        await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
        await page.evaluate((f) => localStorage.setItem("color-palettes", JSON.stringify(f)), FIXTURE);
        await page.reload({ waitUntil: "domcontentloaded" });
        await page.waitForTimeout(2400);

        const baseline = await count(page);
        const cards = page.locator('[role="article"]');
        const n = await cards.count();
        for (let i = 0; i < n; i++) {
            await cards.nth(i).click({ position: { x: 300, y: 60 } });   // expand
            await page.waitForTimeout(700);
            await cards.nth(i).click({ position: { x: 300, y: 60 } });   // collapse
            await page.waitForTimeout(700);
        }
        await page.waitForTimeout(1500);
        out[mode] = { baseline, afterWalk: await count(page) };
        await ctx.close();
    }
    await browser.close();
    writeFileSync(OUT, JSON.stringify(out, null, 2));
    console.log(JSON.stringify(out, null, 2));
};

main().catch((e) => { console.error("FATAL", e); process.exit(1); });
