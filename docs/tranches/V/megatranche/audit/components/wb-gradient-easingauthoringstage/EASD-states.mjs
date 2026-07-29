import { webkit } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const M = () => {
    const root = document.querySelector(".easing-authoring");
    if (!root) return { error: "absent" };
    const svg = root.querySelector("svg");
    const cs = getComputedStyle(svg);
    const r = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const scale = Math.min(r.width / vb.width, r.height / vb.height);
    const drawnW = vb.width * scale, drawnH = vb.height * scale;
    return {
        rect: { w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
        viewBox: { x: +vb.x.toFixed(4), y: +vb.y.toFixed(4), w: +vb.width.toFixed(4), h: +vb.height.toFixed(4) },
        blockSize: cs.blockSize, aspectRatio: cs.aspectRatio,
        scale: +scale.toFixed(2),
        drawn: { w: +drawnW.toFixed(2), h: +drawnH.toFixed(2) },
        letterboxEachSide: +((r.width - drawnW) / 2).toFixed(2),
        inkFillRatio: +(drawnW / r.width).toFixed(4),
        axisLabelPx: +(0.05 * scale).toFixed(2),
        handleDiaPx: +(0.04 * 2 * scale).toFixed(2),
        vbRatioVar: getComputedStyle(root).getPropertyValue("--vb-ratio").trim(),
        activeEl: document.activeElement ? (document.activeElement.getAttribute("aria-label") || document.activeElement.tagName) : null,
    };
};

const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForTimeout(3500);
await page.evaluate(() => document.querySelector('button[aria-label="Author a custom curve"]').click());
await page.waitForTimeout(700);
console.log("STATE bezier/linear:", JSON.stringify(await page.evaluate(M)));

// select a STEPS tile from the specimen strip
const stepTile = await page.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    const t = btns.find((b) => /steps/i.test(b.getAttribute("aria-label") || "") || /step/i.test(b.textContent || ""));
    return t ? (t.getAttribute("aria-label") || t.textContent.trim()) : null;
});
console.log("steps tile found:", stepTile);
if (stepTile) {
    await page.evaluate((lbl) => {
        const btns = [...document.querySelectorAll("button")];
        const t = btns.find((b) => (b.getAttribute("aria-label") || b.textContent.trim()) === lbl);
        t && t.click();
    }, stepTile);
    await page.waitForTimeout(900);
    console.log("STATE steps:", JSON.stringify(await page.evaluate(M)));
    const el = await page.$("#easing-interval-0");
    if (el) await el.screenshot({ path: `${OUT}/EASD-steps-row.png` });
}

// focus a bezier handle
await page.evaluate(() => {
    const h = document.querySelector(".easing-authoring circle[role='slider']");
    if (h) h.focus();
});
await page.waitForTimeout(300);
console.log("focused:", JSON.stringify(await page.evaluate(M)));
const st = await page.$(".easing-authoring");
if (st) await st.screenshot({ path: `${OUT}/EASD-focus-stage.png` });

// arrow-key drag -> does the wrapper aspect ever move?
await page.evaluate(() => {
    const h = document.querySelector(".easing-authoring circle[role='slider']");
    h && h.focus();
});
for (let i = 0; i < 25; i++) await page.keyboard.press("ArrowUp");
await page.waitForTimeout(700);
console.log("after 25 ArrowUp (overshoot):", JSON.stringify(await page.evaluate(M)));
if (st) await st.screenshot({ path: `${OUT}/EASD-overshoot-stage.png` });

// RTL
await page.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); });
await page.waitForTimeout(500);
console.log("RTL:", JSON.stringify(await page.evaluate(M)));
if (st) await st.screenshot({ path: `${OUT}/EASD-rtl-stage.png` });
await browser.close();

// forced colors
const b2 = await webkit.launch();
const c2 = await b2.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light", forcedColors: "active" });
const p2 = await c2.newPage();
await p2.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await p2.waitForTimeout(3500);
await p2.evaluate(() => { const b = document.querySelector('button[aria-label="Author a custom curve"]'); b && b.click(); });
await p2.waitForTimeout(800);
console.log("forced-colors:", JSON.stringify(await p2.evaluate(M)));
const e2 = await p2.$("#easing-interval-0");
if (e2) await e2.screenshot({ path: `${OUT}/EASD-forced-row.png` });
await b2.close();

// reduced motion
const b3 = await webkit.launch();
const c3 = await b3.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light", reducedMotion: "reduce" });
const p3 = await c3.newPage();
await p3.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await p3.waitForTimeout(3500);
await p3.evaluate(() => { const b = document.querySelector('button[aria-label="Author a custom curve"]'); b && b.click(); });
await p3.waitForTimeout(800);
console.log("PRM:", JSON.stringify(await p3.evaluate(() => {
    const root = document.querySelector(".easing-authoring");
    const svg = root.querySelector("svg");
    const cs = getComputedStyle(svg);
    return { prm: matchMedia("(prefers-reduced-motion: reduce)").matches, transitionProperty: cs.transitionProperty, transitionDuration: cs.transitionDuration };
})));
await b3.close();
