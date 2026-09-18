import { webkit } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForTimeout(3500);
await page.evaluate(() => document.querySelector('button[aria-label="Author a custom curve"]').focus());
await page.evaluate(() => document.querySelector('button[aria-label="Author a custom curve"]').click());
await page.waitForTimeout(700);

const desc = () => {
    const a = document.activeElement;
    if (!a) return "none";
    const inStage = !!a.closest?.(".easing-authoring");
    return `${a.tagName}${a.getAttribute("role") ? "[" + a.getAttribute("role") + "]" : ""} label="${a.getAttribute("aria-label") || (a.textContent || "").trim().slice(0, 28)}" inStage=${inStage}`;
};
console.log("start:", await page.evaluate(desc));
for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(120);
    console.log(`Tab ${i + 1}:`, await page.evaluate(desc));
}
// now try to reach a handle explicitly
const info = await page.evaluate(() => {
    const hs = [...document.querySelectorAll(".easing-authoring circle[role='slider']")];
    if (!hs.length) return { handles: 0 };
    hs[0].focus();
    const a = document.activeElement;
    return {
        handles: hs.length,
        tabindex: hs[0].getAttribute("tabindex"),
        focusedIsHandle: a === hs[0],
        activeTag: a ? a.tagName : null,
        handleRect: (() => { const b = hs[0].getBoundingClientRect(); return { w: +b.width.toFixed(2), h: +b.height.toFixed(2), x: +b.x.toFixed(1), y: +b.y.toFixed(1) }; })(),
    };
});
console.log("handle focus:", JSON.stringify(info));
if (info.focusedIsHandle) {
    const st = await page.$(".easing-authoring");
    await st.screenshot({ path: `${OUT}/EASD-handle-focus.png` });
    // check whether focus-visible styling applied (it requires :focus-visible)
    const fv = await page.evaluate(() => {
        const h = document.querySelector(".easing-authoring circle[role='slider']");
        const cs = getComputedStyle(h);
        return { stroke: cs.stroke, strokeWidth: cs.strokeWidth, matchesFV: h.matches(":focus-visible") };
    });
    console.log("focus-visible:", JSON.stringify(fv));
    // keyboard drag overshoot -> viewBox change, does layout jump?
    const before = await page.evaluate(() => {
        const svg = document.querySelector(".easing-authoring svg");
        const r = svg.getBoundingClientRect();
        const vb = svg.viewBox.baseVal;
        const below = document.querySelector(".easing-authoring [aria-label='Easing preset']");
        return { h: +r.height.toFixed(2), vb: [vb.x, +vb.y.toFixed(3), vb.width, +vb.height.toFixed(3)], belowY: below ? +below.getBoundingClientRect().y.toFixed(1) : null };
    });
    for (let i = 0; i < 40; i++) await page.keyboard.press("ArrowUp");
    await page.waitForTimeout(600);
    const after = await page.evaluate(() => {
        const svg = document.querySelector(".easing-authoring svg");
        const r = svg.getBoundingClientRect();
        const vb = svg.viewBox.baseVal;
        const root = document.querySelector(".easing-authoring");
        const below = document.querySelector(".easing-authoring [aria-label='Easing preset']");
        const scale = Math.min(r.width / vb.width, r.height / vb.height);
        return {
            h: +r.height.toFixed(2), vb: [vb.x, +vb.y.toFixed(3), vb.width, +vb.height.toFixed(3)],
            belowY: below ? +below.getBoundingClientRect().y.toFixed(1) : null,
            vbRatioVar: getComputedStyle(root).getPropertyValue("--vb-ratio").trim(),
            drawnW: +(vb.width * scale).toFixed(2), rectW: +r.width.toFixed(2),
            inkFill: +((vb.width * scale) / r.width).toFixed(4),
        };
    });
    console.log("before overshoot:", JSON.stringify(before));
    console.log("after 40 ArrowUp:", JSON.stringify(after));
    const st2 = await page.$(".easing-authoring");
    await st2.screenshot({ path: `${OUT}/EASD-overshoot2-stage.png` });
}
await browser.close();
