import { webkit } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1, colorScheme: "light" });
const page = await ctx.newPage();
const msgs = [];
page.on("console", (m) => { const t = m.text(); if (!/MISCONFIGURED|ResizeObserver/.test(t)) msgs.push(m.type() + ": " + t.slice(0, 400)); });
page.on("pageerror", (e) => { if (!/ResizeObserver/.test(e.message)) msgs.push("PAGEERROR: " + e.message + " :: " + String(e.stack || "").split("\n").slice(0, 5).join(" | ")); });
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForTimeout(3500);
await page.click('button[aria-label="Author a custom curve"]');
await page.waitForTimeout(700);

const snap = () => {
    const root = document.querySelector(".easing-authoring");
    const out = {
        rows: document.querySelectorAll('[id^="easing-interval-"]').length,
        stage: !!root,
        tryAgain: !!([...document.querySelectorAll("button")].find((b) => /try again/i.test(b.textContent))),
        rowCss: (document.querySelector("#easing-interval-0 code") || {}).textContent,
    };
    if (root) {
        const svg = root.querySelector("svg");
        const r = svg.getBoundingClientRect();
        const vb = svg.viewBox.baseVal;
        const scale = Math.min(r.width / vb.width, r.height / vb.height);
        out.vb = [+vb.x.toFixed(3), +vb.y.toFixed(3), +vb.width.toFixed(3), +vb.height.toFixed(3)];
        out.rect = { w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
        out.drawnW = +(vb.width * scale).toFixed(1);
        out.inkFill = +((vb.width * scale) / r.width).toFixed(4);
        out.vbRatioVar = getComputedStyle(root).getPropertyValue("--vb-ratio").trim();
        out.handleDia = +(0.08 * scale).toFixed(2);
    }
    return out;
};

// handle 2 (the second control point) -> Shift+ArrowUp raises y2 above 1 (overshoot)
await page.evaluate(() => {
    const hs = [...document.querySelectorAll(".easing-authoring circle[role='slider']")];
    hs[1] && hs[1].focus();
});
console.log("t0:", JSON.stringify(await page.evaluate(snap)));
for (let i = 1; i <= 6; i++) {
    await page.keyboard.press("Shift+ArrowUp");
    await page.waitForTimeout(220);
    const s = await page.evaluate(snap);
    console.log(`shift+up x${i}:`, JSON.stringify(s));
    if (!s.stage) break;
}
console.log("msgs:", JSON.stringify(msgs.slice(0, 5), null, 1));
await page.screenshot({ path: `${OUT}/EASD-overshoot-final.png` });
const el = await page.$("#easing-interval-0");
if (el) await el.screenshot({ path: `${OUT}/EASD-overshoot-row2.png` });
await browser.close();
