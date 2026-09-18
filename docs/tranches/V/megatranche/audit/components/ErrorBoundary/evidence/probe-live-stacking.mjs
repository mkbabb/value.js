import { chromium } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.route("**/BrowsePane.vue**", (r) =>
    r.fulfill({
        status: 200,
        contentType: "text/javascript",
        body: 'export default { setup(){ return () => { throw new Error("INDUCED-AUDIT-THROW"); }; } };',
    }),
);
await page.goto("http://localhost:9000/#/browse", { waitUntil: "load" });
await page.waitForTimeout(4500);

const stack = await page.evaluate(() => {
    const canvas = document.querySelector(".atmosphere-canvas");
    const eb = document.querySelector(".vj-error-boundary");
    const head = eb.querySelector("p");
    const btn = eb.querySelector("button");
    const g = (el) => {
        const c = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
            position: c.position, zIndex: c.zIndex, transform: c.transform,
            backdropFilter: c.backdropFilter, isolation: c.isolation, willChange: c.willChange,
            rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        };
    };
    // A healthy pane card, for comparison (mount one by going home later).
    return {
        canvas: g(canvas),
        errorBoundary: g(eb),
        headline: g(head),
        button: g(btn),
        canvasCoversHeadline: (() => {
            const cr = canvas.getBoundingClientRect(), hr = head.getBoundingClientRect();
            return cr.left <= hr.left && cr.top <= hr.top && cr.right >= hr.right && cr.bottom >= hr.bottom;
        })(),
        domOrder: [...document.querySelector(".app-layout").children].map((c) => c.tagName + "." + (typeof c.className === "string" ? c.className.split(/\s+/)[0] : "")),
    };
});
console.log("STACKING:", JSON.stringify(stack, null, 2));

// MECHANISM PROOF: give the boundary a stacking context at RUNTIME ONLY
// (no source edit) and re-shoot the same crop.
await page.evaluate(() => {
    document.querySelector(".vj-error-boundary").style.position = "relative";
});
await page.waitForTimeout(400);
await page.screenshot({ path: OUT + "/eb-6-cured-runtime.png", clip: { x: 400, y: 380, width: 640, height: 260 } });

// Revert and confirm it disappears again.
await page.evaluate(() => {
    document.querySelector(".vj-error-boundary").style.position = "";
});
await page.waitForTimeout(400);
await page.screenshot({ path: OUT + "/eb-7-reverted.png", clip: { x: 400, y: 380, width: 640, height: 260 } });

// For comparison: what does a HEALTHY pane wrapper look like stacking-wise?
await page.evaluate(() => { location.hash = "#/"; });
await page.waitForTimeout(300);
await page.evaluate(() => {
    const b = document.querySelector(".vj-error-boundary button");
    if (b) b.click();
});
await page.waitForTimeout(3000);
const healthy = await page.evaluate(() => {
    const w = document.querySelector(".pane-wrapper");
    if (!w) return null;
    const c = getComputedStyle(w);
    const inner = w.querySelector("*");
    const ic = inner ? getComputedStyle(inner) : null;
    return {
        paneWrapper: { position: c.position, zIndex: c.zIndex, transform: c.transform, isolation: c.isolation, backdropFilter: c.backdropFilter },
        firstInner: ic ? { cls: inner.className.toString().slice(0, 80), position: ic.position, zIndex: ic.zIndex, transform: ic.transform, backdropFilter: ic.backdropFilter } : null,
    };
});
console.log("HEALTHY PANE STACKING:", JSON.stringify(healthy, null, 2));
await browser.close();
