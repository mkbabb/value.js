import { chromium } from "playwright";
const log = (...a) => console.log(...a);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: true });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const main = page.getByRole("main", { name: "Color tool panes" });
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const bar = main.getByTestId("gradient-stop-bar").last();
await bar.scrollIntoViewIfNeeded();

log("A) handles at rest:", await main.locator("[data-stop-id]").count());

// A cancelled pointer gesture on the bar: pointerdown then pointercancel
const r = await bar.evaluate(async (el) => {
    const box = el.getBoundingClientRect();
    const x = box.left + box.width * 0.4, y = box.top + box.height / 2;
    const opts = { bubbles: true, cancelable: true, clientX: x, clientY: y, pointerId: 7, pointerType: "touch", isPrimary: true };
    el.dispatchEvent(new PointerEvent("pointerdown", opts));
    await new Promise((res) => setTimeout(res, 30));
    el.dispatchEvent(new PointerEvent("pointercancel", opts));
    await new Promise((res) => setTimeout(res, 200));
    return document.querySelectorAll("[data-stop-id]").length;
});
log("B) handles after pointerdown → POINTERCANCEL on the bar:", r);
await page.waitForTimeout(300);
log("B) labels:", JSON.stringify(await main.locator("[data-stop-id]").evaluateAll(e => e.map(x => x.getAttribute("aria-label")))));

// C) a stuck drag: pointerdown on a handle, then remove that handle's pointerup
//    by dispatching lostpointercapture with no pointerup (simulates capture loss)
const stuck = await bar.evaluate(async (el) => {
    const h = el.querySelector("[data-stop-id]");
    const hb = h.getBoundingClientRect();
    const x = hb.left + hb.width / 2, y = hb.top + hb.height / 2;
    const base = { bubbles: true, cancelable: true, pointerId: 9, pointerType: "mouse", isPrimary: true };
    h.dispatchEvent(new PointerEvent("pointerdown", { ...base, clientX: x, clientY: y }));
    await new Promise((res) => setTimeout(res, 30));
    // capture is silently lost — no pointerup, no pointercancel
    h.dispatchEvent(new PointerEvent("lostpointercapture", { ...base, clientX: x, clientY: y }));
    await new Promise((res) => setTimeout(res, 30));
    // now a plain hover across the bar with NO button pressed
    const box = el.getBoundingClientRect();
    for (const f of [0.2, 0.4, 0.6, 0.8]) {
        el.dispatchEvent(new PointerEvent("pointermove", { ...base, clientX: box.left + box.width * f, clientY: y, buttons: 0 }));
        await new Promise((res) => setTimeout(res, 20));
    }
    await new Promise((res) => setTimeout(res, 200));
    return [...document.querySelectorAll("[data-stop-id]")].map((e) => e.getAttribute("aria-label"));
});
log("C) labels after capture-loss then a BUTTONLESS hover across the bar:", JSON.stringify(stuck));

await browser.close();
