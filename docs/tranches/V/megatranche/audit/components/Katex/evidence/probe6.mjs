import { webkit } from "@playwright/test";
import fs from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/Katex/frames";
fs.mkdirSync(OUT, { recursive: true });

const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
await page.waitForTimeout(4500);

const r = await page.evaluate(() => {
    const h = document.querySelector(".markdown-body > h2");
    const d = document.querySelector(".katex-display");
    const cs = (el) => (el ? getComputedStyle(el).scrollMarginTop : null);
    const wrap = d ? d.parentElement : null;
    if (wrap) wrap.scrollIntoView({ block: "start" });
    const header = document.querySelector(".pane-header");
    return {
        headingScrollMarginTop: cs(h),
        mathScrollMarginTop: cs(wrap),
        headerH: header ? +header.getBoundingClientRect().height.toFixed(2) : null,
        headerBottom: header ? +header.getBoundingClientRect().bottom.toFixed(2) : null,
        mathTopAfterScroll: null,
    };
});
await page.waitForTimeout(900);
const r2 = await page.evaluate(() => {
    const d = document.querySelector(".katex-display");
    const header = document.querySelector(".pane-header");
    const hr = header.getBoundingClientRect();
    const dr = d.getBoundingClientRect();
    // ink of the formula
    const kh = d.querySelector(".katex-html").getBoundingClientRect();
    return {
        headerBottom: +hr.bottom.toFixed(2),
        formulaTop: +dr.top.toFixed(2),
        inkTop: +kh.top.toFixed(2),
        inkBottom: +kh.bottom.toFixed(2),
        occludedPx: +(hr.bottom - kh.top).toFixed(2),
        inkH: +kh.height.toFixed(2),
        occludedPct: +(((hr.bottom - kh.top) / kh.height) * 100).toFixed(1),
    };
});
console.log(JSON.stringify({ ...r, ...r2 }, null, 2));
await page.screenshot({ path: `${OUT}/D-header-occlusion-light-1440.png`, scale: "css" });
await browser.close();
