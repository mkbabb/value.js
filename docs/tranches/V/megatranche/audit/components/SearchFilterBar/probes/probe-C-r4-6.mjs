// CHALLENGE-C r4 · probe 6 — (a) who holds focus during a picker drag,
// (b) the pointercancel stuck-drag hazard in MiniColorPicker, driven with REAL
//     CDP touch events (Input.dispatchTouchEvent ... type:"touchCancel").
import { chromium, devices } from "playwright";
import fs from "node:fs";
const OUT = new URL("../evidence-r4/", import.meta.url).pathname;
const log = { engine: "chromium", steps: {} };
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: true });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

const openMini = async () => {
    if (!(await page.locator('[role="dialog"]').filter({ hasText: "Find by Color" }).count())) {
        await page.locator('button[aria-label="Filters"]').first().click({ force: true });
        await page.waitForTimeout(450);
    }
    if (!(await page.locator(".sv-canvas").count())) {
        await page.locator('button[aria-label^="Open color picker"]').first().click({ force: true });
        await page.waitForTimeout(500);
    }
    return (await page.locator(".sv-canvas").count()) > 0;
};
const hexAt = async () => await page.evaluate(() => document.querySelector('button[aria-label^="Open color picker"]')?.getAttribute("aria-label"));

log.steps.opened = await openMini();
let sv = await page.locator(".sv-canvas").first().boundingBox();

// ---- (a) focus owner during a real mouse drag ----
await page.mouse.move(sv.x + 10, sv.y + 10);
await page.mouse.down();
await page.mouse.move(sv.x + 40, sv.y + 40);
log.steps.focusDuringDrag = await page.evaluate(() => {
    const a = document.activeElement;
    return { tag: a?.tagName, aria: a?.getAttribute("aria-label"), role: a?.getAttribute("role"), cls: (a?.className || "").toString().slice(0, 80) };
});
await page.mouse.up();
await page.waitForTimeout(250);

// ---- (b) REAL touch drag, then touchCancel, then plain mouse hover ----
log.steps.reopened = await openMini();
sv = await page.locator(".sv-canvas").first().boundingBox();
const pt = (x, y) => ({ x, y, radiusX: 1, radiusY: 1, force: 1, id: 1 });

const beforeTouch = await hexAt();
await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [pt(sv.x + 12, sv.y + 12)] });
await page.waitForTimeout(60);
await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [pt(sv.x + 30, sv.y + 30)] });
await page.waitForTimeout(60);
const midTouch = await hexAt();
// the platform takes the gesture away (iOS scroll takeover / system gesture)
await cdp.send("Input.dispatchTouchEvent", { type: "touchCancel", touchPoints: [] });
await page.waitForTimeout(200);
const afterCancel = await hexAt();
log.steps.canvasStillPresent = await page.locator(".sv-canvas").count();

// now: plain mouse movement across the canvas, NO button held
if (await page.locator(".sv-canvas").count()) {
    sv = await page.locator(".sv-canvas").first().boundingBox();
    for (let i = 0; i <= 10; i++) {
        await page.mouse.move(sv.x + 4 + (sv.width - 8) * (i / 10), sv.y + 4 + (sv.height - 8) * (i / 10));
        await page.waitForTimeout(20);
    }
}
await page.waitForTimeout(250);
const afterHoverOnly = await hexAt();
log.steps.stuckDrag = {
    beforeTouch, midTouch, afterCancel, afterHoverOnly,
    dragStuckAfterCancel: afterCancel !== afterHoverOnly,
};

// ---- control: after a CLEAN pointerup, hover must not change the colour ----
if (await page.locator(".sv-canvas").count()) {
    sv = await page.locator(".sv-canvas").first().boundingBox();
    await page.mouse.move(sv.x + 8, sv.y + 8);
    await page.mouse.down();
    await page.mouse.move(sv.x + 26, sv.y + 26);
    await page.mouse.up();
    await page.waitForTimeout(200);
    const base = await hexAt();
    for (let i = 0; i <= 10; i++) {
        await page.mouse.move(sv.x + 4 + (sv.width - 8) * (i / 10), sv.y + 4 + (sv.height - 8) * (i / 10));
        await page.waitForTimeout(20);
    }
    await page.waitForTimeout(200);
    log.steps.control = { base, after: await hexAt(), changed: base !== (await hexAt()) };
}

fs.writeFileSync(OUT + "probeC-r4-6.json", JSON.stringify(log, null, 2));
console.log(JSON.stringify(log, null, 2));
await browser.close();
