// Probe 3 — the featured badge gold-shimmer resolution + cropped card frames.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL("./shots/", import.meta.url).pathname;
const now = "2026-07-24T00:00:00.000Z";
const mk = (name, slug, colors, extra = {}) => ({
    id: slug, name, slug, colors: colors.map((css, i) => ({ css, position: i })),
    createdAt: now, updatedAt: now, isLocal: true, ...extra,
});
const STORE = { version: 1, palettes: [
    mk("Featured One", "featured-one",
       ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03"],
       { tier: "featured", tags: ["warm", "earthy", "autumn", "fourth"], forkCount: 3, versionCount: 4, forkOf: "x" }),
    mk("Empty", "empty", []),
] };

const R = {};
for (const scheme of ["light", "dark"]) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 900, height: 900 }, colorScheme: scheme, deviceScaleFactor: 3 });
    const page = await ctx.newPage();
    await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), STORE);
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "load" });
    await page.waitForTimeout(3500);
    R[scheme] = await page.evaluate(() => {
        const b = document.querySelector(".featured-badge");
        const c = getComputedStyle(b);
        // which declarations win for `color`?
        const winners = [];
        for (const sheet of document.styleSheets) {
            let rules; try { rules = sheet.cssRules; } catch { continue; }
            const walk = (rs, layer) => {
                for (const r of rs) {
                    if (r.type === 4 || r.constructor.name === "CSSLayerBlockRule" || r.cssRules) {
                        walk(r.cssRules ?? [], r.name ?? layer);
                        continue;
                    }
                    if (!r.selectorText) continue;
                    if (!/gold-shimmer|badge/.test(r.selectorText)) continue;
                    const col = r.style?.getPropertyValue("color");
                    if (col) winners.push({ sel: r.selectorText.slice(0, 60), color: col, layer });
                }
            };
            walk(rules, null);
        }
        const strip = document.querySelector('[class*="rounded-t-card"]');
        const emptyCard = [...document.querySelectorAll('[role="article"]')][1];
        const eStrip = emptyCard.querySelector('[class*="rounded-t-card"]');
        return {
            badgeColor: c.color, textFill: c.webkitTextFillColor,
            bgClip: c.webkitBackgroundClip, anim: c.animationName + " " + c.animationDuration + " " + c.animationIterationCount,
            colorDecls: winners,
            emptyStripH: eStrip ? eStrip.getBoundingClientRect().height : null,
            emptyStripChildren: eStrip ? eStrip.children.length : null,
            emptyBadgeText: emptyCard.querySelector('[class*="text-mono-small"]')?.innerText,
            emptyCardH: emptyCard.getBoundingClientRect().height,
        };
    });
    const card = page.locator('[role="article"]').first();
    await card.screenshot({ path: OUT + "card-featured-" + scheme + ".png" });
    const empty = page.locator('[role="article"]').nth(1);
    await empty.screenshot({ path: OUT + "card-empty-" + scheme + ".png" });
    await browser.close();
}
writeFileSync(new URL("./probe3-results.json", import.meta.url).pathname, JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1));
