import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
await page.waitForTimeout(2500);
const btns = await page.$$(".pane-segmented-control button, .pane-segmented-control [role=tab]");
if (btns.length > 1) await btns[1].click();
await page.waitForTimeout(3000);
await page.waitForSelector(".markdown-body", { timeout: 20000 }).catch(() => {});
await page.waitForTimeout(2000);

const out = await page.evaluate(() => {
    const roots = [...document.querySelectorAll("div.inline-block")].filter((d) =>
        d.querySelector(":scope > .katex-display"),
    );
    return roots.map((root, i) => {
        const disp = root.querySelector(":scope > .katex-display");
        const kx = disp.querySelector(":scope > .katex");
        const base = kx.querySelector(".katex-html");
        const rr = root.getBoundingClientRect();
        const dr = disp.getBoundingClientRect();
        const kr = kx.getBoundingClientRect();
        const br = base ? base.getBoundingClientRect() : null;
        // try to scroll
        root.scrollLeft = 99999;
        const maxScroll = root.scrollLeft;
        root.scrollLeft = 0;
        return {
            i,
            expr: (root.querySelector("annotation") || {}).textContent?.slice(0, 46) ?? null,
            rootRect: { l: Math.round(rr.left), r: Math.round(rr.right), w: Math.round(rr.width) },
            dispRect: { l: Math.round(dr.left), r: Math.round(dr.right), w: Math.round(dr.width) },
            katexRect: { l: Math.round(kr.left), r: Math.round(kr.right), w: Math.round(kr.width) },
            htmlLayerRect: br
                ? { l: Math.round(br.left), r: Math.round(br.right), w: Math.round(br.width) }
                : null,
            rootScrollW: root.scrollWidth,
            rootClientW: root.clientWidth,
            maxScrollLeft: maxScroll,
            overflowsLeft: br ? br.left < rr.left - 0.5 : null,
            overflowsRight: br ? br.right > rr.right + 0.5 : null,
            katexWhiteSpace: getComputedStyle(kx).whiteSpace,
            katexTextAlign: getComputedStyle(kx).textAlign,
        };
    });
});
console.log(JSON.stringify(out, null, 2));

// scroll to first display formula and shoot it
await page.evaluate(() => {
    const d = document.querySelector(".katex-display");
    if (d) d.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(600);
await page.screenshot({
    path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/KTX-mobile-math.png",
});

await page.evaluate(() => {
    const ds = document.querySelectorAll(".katex-display");
    if (ds[1]) ds[1].scrollIntoView({ block: "center" });
});
await page.waitForTimeout(600);
await page.screenshot({
    path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/KTX-mobile-math2.png",
});
await browser.close();
