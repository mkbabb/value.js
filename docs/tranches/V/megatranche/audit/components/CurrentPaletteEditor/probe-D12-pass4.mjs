// CHALLENGE-D pass 4 — probe D12.
// P6: material weight, draft well vs the saved palette Card it feeds — is the
//     scratch surface more strongly bounded than the durable artifact?
// P7: identify every rendering of the same five colours in one frame.
// Read-only.
import { chromium } from "playwright";
import { writeFileSync } from "fs";

const HERE = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor";
const BASE = "http://localhost:9000/";
const lab = (i, n) =>
    `lab(${(30 + (55 * i) / n).toFixed(1)}% ${(-70 + (150 * i) / n).toFixed(1)} ${(80 - (150 * i) / n).toFixed(1)})`;
const cols = Array.from({ length: 5 }, (_, i) => lab(i, 5));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.addInitScript(
    (s) => {
        localStorage.setItem("color-picker", JSON.stringify({ inputColor: s[0], savedColors: s }));
        localStorage.setItem(
            "color-palettes",
            JSON.stringify({
                version: 1,
                palettes: [
                    {
                        id: "seed-1",
                        slug: "same-five",
                        name: "Same Five",
                        colors: s.map((css, i) => ({ css, position: i })),
                        createdAt: Date.now(),
                        isLocal: true,
                    },
                ],
            }),
        );
    },
    cols,
);
await page.goto(BASE + "#/palettes", { waitUntil: "load" });
await page.waitForTimeout(2800);

const out = await page.evaluate(() => {
    const mat = (e) => {
        if (!e) return null;
        const c = getComputedStyle(e);
        const r = e.getBoundingClientRect();
        return {
            rect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1), y: +r.y.toFixed(1) },
            background: c.backgroundColor,
            backgroundImage: c.backgroundImage.slice(0, 60),
            border: `${c.borderTopWidth} ${c.borderTopStyle} ${c.borderTopColor}`,
            borderRadius: c.borderRadius,
            boxShadow: c.boxShadow.slice(0, 200),
            backdropFilter: c.backdropFilter,
            padding: c.padding,
        };
    };
    const well = document.querySelector(".dashed-well");
    // the saved-palette entity root: the nearest ancestor of the strip that is a card/article
    const strip = document.querySelector('[role="presentation"][aria-hidden="true"]');
    const cardRoot = strip?.closest('[role="article"], article, [class*="card"]') ?? strip?.parentElement;
    const gap = well && cardRoot ? +(cardRoot.getBoundingClientRect().top - well.getBoundingClientRect().bottom).toFixed(1) : null;

    // every rendering of the palette in this frame
    const renderings = [];
    const wellDots = [...(well?.querySelectorAll(".watercolor-swatch") ?? [])];
    if (wellDots.length)
        renderings.push({
            where: "draft well",
            n: wellDots.length,
            box: { w: +wellDots[0].getBoundingClientRect().width.toFixed(1), h: +wellDots[0].getBoundingClientRect().height.toFixed(1) },
            radius: getComputedStyle(wellDots[0]).borderRadius.slice(0, 90),
            filter: getComputedStyle(wellDots[0]).filter,
        });
    if (strip)
        renderings.push({
            where: "saved card strip",
            n: strip.children.length,
            box: { w: +strip.getBoundingClientRect().width.toFixed(1), h: +strip.getBoundingClientRect().height.toFixed(1) },
            radius: getComputedStyle(strip.firstElementChild).borderRadius,
            filter: getComputedStyle(strip.firstElementChild).filter,
        });

    return {
        well: mat(well),
        wellClassList: well?.className ?? null,
        cardRoot: mat(cardRoot),
        cardRootTag: cardRoot?.tagName + "." + (cardRoot?.className ?? "").slice(0, 120),
        gapWellToCard: gap,
        renderings,
        allDotSizes: [...document.querySelectorAll(".watercolor-swatch")].map((d) => {
            const r = d.getBoundingClientRect();
            return { w: +r.width.toFixed(0), h: +r.height.toFixed(0), cls: d.className.slice(0, 70) };
        }),
    };
});

await page.screenshot({ path: `${HERE}/frames-D10/p6-material-comparison.png`, fullPage: true });
await browser.close();
writeFileSync(`${HERE}/probe-D12-pass4.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
