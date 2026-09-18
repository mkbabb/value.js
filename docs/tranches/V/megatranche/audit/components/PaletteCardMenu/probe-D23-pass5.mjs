// CHALLENGE-D pass 5 — probe D23
// The 400%-arm clip signal, decided by PIXELS rather than by computed style:
// clip the panel at rest and after a wheel (the VISUAL-CONSTITUTION §9 frame pair
// with a named delta), and sample the right-edge column for a painted thumb.
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const ROUTE = `${ORIGIN}/#/palettes`;
const OUT = new URL(".", import.meta.url).pathname;
mkdirSync(`${OUT}evidence`, { recursive: true });

const mk = (i, name) => ({
    id: `p-${i}`, slug: `pal-${i}-aaaaaaa`, name, isLocal: true, versionCount: 1,
    colors: Array.from({ length: 5 }, (_, k) => ({ css: `hsl(${(i * 47 + k * 31) % 360} 60% 55%)` })),
});
const SEED = { version: 1, palettes: [
    mk(1, "Muted Terracotta and Deep Sea Foam Study"), mk(2, "Second Palette"),
    mk(3, "Third Palette"), mk(4, "Fourth Palette"), mk(5, "Fifth Palette"), mk(6, "Sixth Palette"),
]};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 225 }, deviceScaleFactor: 4 });
const page = await ctx.newPage();
await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2600);

const t = page.locator('button[aria-label="Palette menu"]').first();
await t.scrollIntoViewIfNeeded();
await page.waitForTimeout(350);
await t.click();
await page.waitForTimeout(900);

const box = await page.locator('[role="menu"]').first().boundingBox();
await page.screenshot({ path: `${OUT}evidence/pass5-clip-400-atrest.png`, clip: box });

await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.mouse.wheel(0, 300);
await page.waitForTimeout(120); // sample DURING the scroll, when overlay thumbs paint
await page.screenshot({ path: `${OUT}evidence/pass5-clip-400-scrolling.png`, clip: box });
await page.waitForTimeout(1400); // and after they fade
await page.screenshot({ path: `${OUT}evidence/pass5-clip-400-scrolled.png`, clip: box });

const state = await page.evaluate(() => {
    const m = document.querySelector('[role="menu"]');
    const mr = m.getBoundingClientRect();
    return {
        scrollTop: m.scrollTop, scrollHeight: m.scrollHeight, clientHeight: m.clientHeight,
        gutterPx: m.offsetWidth - m.clientWidth,
        gutterPctOfPanelWidth: +(((m.offsetWidth - m.clientWidth) / m.offsetWidth) * 100).toFixed(2),
        rows: [...m.querySelectorAll('[role="menuitem"]')].map((el) => {
            const r = el.getBoundingClientRect();
            return { text: el.textContent.trim(), insidePanel: r.y >= mr.y - 0.5 && r.bottom <= mr.bottom + 0.5 };
        }),
    };
});
writeFileSync(`${OUT}probe-D23-pass5-results.json`, JSON.stringify({ box, state }, null, 2));
console.log(JSON.stringify({ box, state }, null, 2));
await browser.close();
