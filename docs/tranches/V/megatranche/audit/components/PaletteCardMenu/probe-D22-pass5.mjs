// CHALLENGE-D pass 5 — probe D22
//   I. At 400% zoom the panel clips 2 of its 4 rows. Is the truncation SIGNALLED?
//      (scrollbar gutter reserved? overlay-only? fade/chevron? does a wheel reveal?)
//   J. identity legibility: the CARD's own name span vs THIS MENU's dedicated
//      header, same palette, same instant — at 100% and at 200% text resize.
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

const results = {};
async function boot(ctx) {
    const page = await ctx.newPage();
    await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
    await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2600);
    return page;
}

const browser = await chromium.launch();

// ── ARM I — is the 400% clip signalled? ──────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 360, height: 225 }, deviceScaleFactor: 4 });
    const page = await boot(ctx);
    const t = page.locator('button[aria-label="Palette menu"]').first();
    await t.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await t.click();
    await page.waitForTimeout(700);

    const signal = await page.evaluate(() => {
        const m = document.querySelector('[role="menu"]');
        const cs = getComputedStyle(m);
        const rowsBefore = [...m.querySelectorAll('[role="menuitem"]')].map((el) => {
            const r = el.getBoundingClientRect(), mr = m.getBoundingClientRect();
            return { text: el.textContent.trim(), insidePanel: r.y >= mr.y - 0.5 && r.bottom <= mr.bottom + 0.5 };
        });
        return {
            offsetWidth: m.offsetWidth, clientWidth: m.clientWidth,
            scrollbarGutterPx: m.offsetWidth - m.clientWidth,
            offsetHeight: m.offsetHeight, clientHeight: m.clientHeight, scrollHeight: m.scrollHeight,
            scrollTop: m.scrollTop,
            overflowY: cs.overflowY, scrollbarWidth: cs.scrollbarWidth, scrollbarColor: cs.scrollbarColor,
            maskImage: cs.maskImage, webkitMaskImage: cs.webkitMaskImage,
            // any explicit "more" affordance inside the panel?
            hasScrollButtons: m.querySelectorAll('[class*="scroll"],[data-scroll]').length,
            classList: m.className.toString(),
            ariaHints: { hasAriaSetsize: !!m.querySelector('[aria-setsize]'), role: m.getAttribute("role") },
            rowsBefore,
        };
    });

    // does a real wheel over the panel reveal Delete?
    const mb = await page.locator('[role="menu"]').first().boundingBox();
    await page.mouse.move(mb.x + mb.width / 2, mb.y + mb.height / 2);
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);
    const afterWheel = await page.evaluate(() => {
        const m = document.querySelector('[role="menu"]');
        const mr = m.getBoundingClientRect();
        return {
            scrollTop: m.scrollTop,
            rows: [...m.querySelectorAll('[role="menuitem"]')].map((el) => {
                const r = el.getBoundingClientRect();
                return { text: el.textContent.trim(), insidePanel: r.y >= mr.y - 0.5 && r.bottom <= mr.bottom + 0.5 };
            }),
        };
    });
    await page.screenshot({ path: `${OUT}evidence/pass5-zoom400-afterwheel.png` }).catch(()=>{});

    // and does keyboard ArrowDown reach Delete?
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(400);
    const afterKeys = await page.evaluate(() => {
        const m = document.querySelector('[role="menu"]');
        const a = document.activeElement;
        const mr = m.getBoundingClientRect();
        const ar = a ? a.getBoundingClientRect() : null;
        return {
            focusedText: a ? a.textContent.trim().replace(/\s+/g," ") : null,
            scrollTop: m.scrollTop,
            focusedInsidePanel: ar ? ar.y >= mr.y - 0.5 && ar.bottom <= mr.bottom + 0.5 : null,
        };
    });

    results.I_clipSignal = { signal, afterWheel, afterKeys };
    await ctx.close();
}

// ── ARM J — card identity span vs menu header, same palette, same instant ────
results.J_identity = {};
for (const [tag, rootPx] of [["100", null], ["200", "32px"]]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await boot(ctx);
    if (rootPx) {
        await page.evaluate((v) => { document.documentElement.style.fontSize = v; }, rootPx);
        await page.waitForTimeout(400);
    }
    const t = page.locator('button[aria-label="Palette menu"]').first();
    await t.click({ force: true });
    await page.waitForTimeout(600);
    results.J_identity[tag] = await page.evaluate(() => {
        const owner = document.querySelector('[role="article"]');
        const nameEl = [...owner.querySelectorAll("span,div,h3,h4,p")]
            .filter((e) => e.children.length === 0 && /Muted/.test(e.textContent))
            .sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width)[0];
        const m = document.querySelector('[role="menu"]');
        const hdr = [...m.children].find((el) => el.className.toString().includes("truncate"));
        const q = (el) => {
            if (!el) return null;
            const cs = getComputedStyle(el), r = el.getBoundingClientRect();
            return {
                full: el.textContent.trim(),
                fontFamily: cs.fontFamily.split(",")[0].replace(/["']/g, ""),
                fontSize: cs.fontSize, fontWeight: cs.fontWeight,
                renderedW: +r.width.toFixed(1), scrollW: el.scrollWidth, clientW: el.clientWidth,
                maxWidth: cs.maxWidth,
                shownPct: +((el.clientWidth / el.scrollWidth) * 100).toFixed(1),
                clippedPx: Math.max(0, el.scrollWidth - el.clientWidth),
            };
        };
        return { rootFontSize: getComputedStyle(document.documentElement).fontSize,
                 panelW: +m.getBoundingClientRect().width.toFixed(1),
                 cardName: q(nameEl), menuHeader: q(hdr) };
    });
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}probe-D22-pass5-results.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
