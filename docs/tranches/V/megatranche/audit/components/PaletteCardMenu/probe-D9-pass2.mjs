// CHALLENGE-D pass 2 · probe 9 — the 390px metadata-row allocation: what the
// fixed-width menu trigger costs the palette identity. Read-only.
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:9000";
const OUT = new URL("./probe-D9-pass2-results.json", import.meta.url).pathname;
const SAVED = {
    id: "pal-longname-1", name: "Muted Terracotta and Deep Sea Foam Study",
    slug: "muted-terracotta-and-deep-sea-foam-study", isLocal: true, tier: "featured", versionCount: 4,
    colors: [{ css: "#c1663f" }, { css: "#8ec9b0" }, { css: "#24444d" }, { css: "#e8dcc0" }, { css: "#7a4a32" }],
};
const R = {};

const browser = await chromium.launch();
for (const [name, w, h] of [["mobile-390", 390, 844], ["desktop-1440", 1440, 1000]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: w < 500, isMobile: w < 500 });
    const page = await ctx.newPage();
    await page.addInitScript((s) => localStorage.setItem("color-palettes", s), JSON.stringify({ version: 1, palettes: [SAVED] }));
    await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    R[name] = await page.evaluate(() => {
        const trig = document.querySelector('button[aria-label="Palette menu"]');
        if (!trig) return { found: false };
        const row = trig.closest("div.flex.items-center.justify-between");
        const nameSpan = row?.querySelector("span[title]");
        const rr = row.getBoundingClientRect();
        const tr = trig.getBoundingClientRect();
        const parts = [...row.querySelectorAll(":scope > div > *")].map((e) => {
            const r = e.getBoundingClientRect();
            return { tag: e.tagName, cls: (e.className || "").toString().split(" ")[0], w: +r.width.toFixed(1), text: e.textContent.trim().slice(0, 18) };
        });
        const nr = nameSpan?.getBoundingClientRect();
        return {
            found: true,
            rowWidth: +rr.width.toFixed(1),
            triggerWidth: +tr.width.toFixed(1),
            triggerHeight: +tr.height.toFixed(1),
            triggerShareOfRow: +((tr.width / rr.width) * 100).toFixed(1),
            nameRenderedWidth: nr ? +nr.width.toFixed(1) : null,
            nameScrollWidth: nameSpan?.scrollWidth ?? null,
            nameText: nameSpan?.textContent.trim() ?? null,
            nameVisibleFraction: nr && nameSpan.scrollWidth ? +((nr.width / nameSpan.scrollWidth) * 100).toFixed(1) : null,
            rowChildren: parts,
        };
    });
    await page.screenshot({ path: new URL(`./evidence/pass2-${name}-row.png`, import.meta.url).pathname, fullPage: false });
    await ctx.close();
}
await browser.close();
fs.writeFileSync(OUT, JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1));
