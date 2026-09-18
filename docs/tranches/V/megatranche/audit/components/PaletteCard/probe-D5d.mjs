// CHALLENGE-D pass 3 — probe D. Two decisions:
//  1. do the expanded card's colour swatches carry an accessible name?
//  2. what does the drag state (`ghostClass: "opacity-30"`) do to the specimen?
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
const OUT = new URL("./evidence/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const R = {};
const NOW = new Date().toISOString();
const mk = (css, i) => ({ css, position: i });
const FIXTURE = { version: 1, palettes: [
    { id: "p-sunset", slug: "sunset-ridge", name: "Sunset Ridge", createdAt: NOW, updatedAt: NOW, isLocal: true, colors: ["#f4a261", "#e76f51", "#2a9d8f"].map(mk) },
    { id: "p-ocean", slug: "deep-ocean", name: "Deep Ocean", createdAt: NOW, updatedAt: NOW, isLocal: true, colors: ["#03045e", "#0077b6"].map(mk) },
]};

async function main() {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.evaluate((f) => localStorage.setItem("color-palettes", JSON.stringify(f)), FIXTURE);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2400);
    await page.click('[role="article"]');
    await page.waitForTimeout(900);

    R.swatchNames = await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        const btns = [...c.querySelectorAll("button")];
        return btns.map((b) => ({
            cls: String(b.getAttribute("class") || "").slice(0, 60),
            ariaLabel: b.getAttribute("aria-label"),
            title: b.getAttribute("title"),
            text: (b.textContent || "").trim().slice(0, 24),
            html: b.outerHTML.slice(0, 220),
        }));
    });

    // AX names via Playwright's own resolver
    R.axButtons = [];
    {
        const loc = page.locator('[role="article"]').first().locator("button");
        const n = await loc.count();
        for (let i = 0; i < n; i++) {
            const el = loc.nth(i);
            R.axButtons.push({ i, name: await el.getAttribute("aria-label"), text: (await el.innerText().catch(() => "")).trim().slice(0, 20) });
        }
    }

    // drag ghost: apply the declared ghostClass and measure the specimen
    R.dragGhost = await page.evaluate(() => {
        const c = document.querySelector('[role="article"]');
        const seg = c.querySelector('[role="presentation"] > div');
        const before = getComputedStyle(c).opacity;
        c.classList.add("opacity-30");
        const after = getComputedStyle(c).opacity;
        const segBg = getComputedStyle(seg).backgroundColor;
        c.classList.remove("opacity-30");
        return { declaredGhostClass: "opacity-30 (PalettesPane.vue:186)", opacityBefore: before, opacityAfter: after, segDeclaredBg: segBg };
    });
    await page.evaluate(() => document.querySelector('[role="article"]').classList.add("opacity-30"));
    await page.waitForTimeout(200);
    const g = await page.evaluate(() => { const r = document.querySelector('[role="article"]').getBoundingClientRect(); return { x: Math.round(r.x - 10), y: Math.round(r.y - 10), width: Math.round(r.width + 20), height: Math.round(r.height + 20) }; });
    await page.screenshot({ path: OUT + "p3-drag-ghost.png", clip: g });

    writeFileSync(OUT + "../probe-D5d-results.json", JSON.stringify(R, null, 2));
    console.log(JSON.stringify(R, null, 2));
    await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
