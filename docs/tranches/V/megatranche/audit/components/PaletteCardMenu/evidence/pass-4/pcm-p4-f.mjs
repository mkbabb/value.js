// PaletteCardMenu — CHALLENGE-C pass 4, probe F
// The OTHER collision: trigger n+1 lands on `Publish`. What fires?
//  F1  open card0's menu; click exactly at card1's trigger centre
//  F2  read card0's ActionFeedback + any network attempt
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };
const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: Array.from({ length: 6 }, (_, i) => ({
        id: `seed${i}`, name: `Probe Palette ${i}`, slug: `probe-${i}`, isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }],
    })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
const reqs = [];
page.on("request", (r) => { if (!/localhost:9000\/(src|node_modules|@|demo|assets)/.test(r.url())) reqs.push(`${r.method()} ${r.url().slice(0, 110)}`); });
const cons = [];
page.on("console", (m) => cons.push(`${m.type()}: ${m.text().slice(0, 160)}`));
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
reqs.length = 0; cons.length = 0;

await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(520);

const t1 = await page.locator('[aria-label="Palette menu"]').nth(1).boundingBox();
const cx = t1.x + t1.width / 2, cy = t1.y + t1.height / 2;
log("F1_clickPoint", { cx: +cx.toFixed(1), cy: +cy.toFixed(1),
    itemAtPoint: await page.evaluate(({ x, y }) => {
        const e = document.elementFromPoint(x, y);
        const it = e && e.closest ? e.closest('[role="menuitem"]') : null;
        return it ? it.textContent.trim().replace(/\s+/g, " ") : null;
    }, { x: cx, y: cy }) });

await page.mouse.click(cx, cy);
await page.waitForTimeout(1400);

log("F2_afterStrayClick", await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[role="article"]'));
    return cards.slice(0, 3).map((c, i) => ({
        i, name: c.getAttribute("aria-label"),
        h: +c.getBoundingClientRect().height.toFixed(0),
        text: c.innerText.replace(/\s+/g, " ").trim().slice(0, 120),
    }));
}));
log("F3_network", reqs.slice(0, 12));
log("F4_console", cons.slice(0, 12));
await page.screenshot({ path: new URL("./pass4-stray-publish.png", import.meta.url).pathname });

writeFileSync(new URL("./pcm-p4-f-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
