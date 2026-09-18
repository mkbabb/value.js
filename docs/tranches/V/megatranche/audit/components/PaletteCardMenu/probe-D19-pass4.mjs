// CHALLENGE-D pass 4 — probe D19
// The RTL mechanism, nailed: is the portalled panel a forced-LTR island, and
// what does that do to a right-to-left palette identity in the menu header?
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const ROUTE = "http://localhost:9000/#/palettes";
const OUT = new URL(".", import.meta.url).pathname;

const AR = "لوحة ألوان الغروب الدافئ فوق البحر الأبيض المتوسط";
const SEED = {
    version: 1,
    palettes: [
        { id: "p-1", slug: "ar-1-aaaaaaa", name: AR, isLocal: true, versionCount: 1,
          colors: [{ css: "#c1654f" }, { css: "#e0a17f" }, { css: "#7fb0a3" }] },
        { id: "p-2", slug: "ar-2-bbbbbbb", name: "Second Palette", isLocal: true, versionCount: 1,
          colors: [{ css: "#334455" }, { css: "#aabbcc" }] },
    ],
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2600);
await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
await page.waitForTimeout(500);

await page.locator('button[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(600);

const out = await page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    const chain = [];
    let n = menu;
    while (n && n !== document.documentElement) {
        chain.push({
            tag: n.tagName,
            cls: (n.className || "").toString().slice(0, 48),
            dirAttr: n.getAttribute ? n.getAttribute("dir") : null,
            computedDir: getComputedStyle(n).direction,
        });
        n = n.parentElement;
    }
    chain.push({ tag: "HTML", dirAttr: document.documentElement.getAttribute("dir"),
                 computedDir: getComputedStyle(document.documentElement).direction });

    // the header (DropdownMenuLabel) that carries the palette identity
    const header = [...menu.children].find((c) => !c.getAttribute("role") && c.textContent.trim().length > 3);
    const hcs = header ? getComputedStyle(header) : null;
    const hr = header ? header.getBoundingClientRect() : null;
    const mr = menu.getBoundingClientRect();

    // where is the leading glyph gutter of an ordinary row?
    const row = menu.querySelector('[role="menuitem"]');
    const svg = row ? row.querySelector("svg") : null;
    const rr = row ? row.getBoundingClientRect() : null;
    const sr = svg ? svg.getBoundingClientRect() : null;

    return {
        chain,
        header: header && {
            text: header.textContent.trim().slice(0, 60),
            direction: hcs.direction,
            textAlign: hcs.textAlign,
            unicodeBidi: hcs.unicodeBidi,
            overflow: hcs.overflow,
            textOverflow: hcs.textOverflow,
            rect: { x: +hr.x.toFixed(1), right: +hr.right.toFixed(1), w: +hr.width.toFixed(1) },
            scrollW: header.scrollWidth,
            clientW: header.clientWidth,
            clippedPx: header.scrollWidth - header.clientWidth,
        },
        menuRect: { x: +mr.x.toFixed(1), right: +mr.right.toFixed(1), w: +mr.width.toFixed(1) },
        glyphGutter: sr && rr && {
            rowX: +rr.x.toFixed(1), rowRight: +rr.right.toFixed(1),
            svgX: +sr.x.toFixed(1), svgRight: +sr.right.toFixed(1),
            sits: sr.x - rr.x < rr.right - sr.right ? "physical LEFT of the row" : "physical RIGHT of the row",
        },
        // the card's own identity span, for comparison (it is NOT portalled)
        cardName: (() => {
            const s = document.querySelector('[role="article"] span[title]');
            if (!s) return null;
            const cs = getComputedStyle(s);
            const r = s.getBoundingClientRect();
            return { direction: cs.direction, textAlign: cs.textAlign, x: +r.x.toFixed(1), right: +r.right.toFixed(1) };
        })(),
    };
});

await page.screenshot({ path: `${OUT}evidence/pass4-C-rtl-arabic.png`, clip: { x: 180, y: 380, width: 700, height: 420 } }).catch(() => {});
writeFileSync(`${OUT}probe-D19-pass4-results.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
