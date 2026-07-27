import { webkit } from "playwright";
const DIR = new URL(".", import.meta.url).pathname;
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForTimeout(2500);
await page.locator("input[type=file]").first().setInputFiles(DIR + "probe-1200.png");
await page.waitForSelector('img[alt="Uploaded image"]');
await page.waitForTimeout(1000);
const bx = await page.locator('div[aria-label="Image preview area, tap to sample colors"]').boundingBox();
await page.mouse.click(bx.x + bx.width / 2, bx.y + bx.height / 2);
await page.waitForSelector("canvas.eyedropper-canvas");
await page.waitForTimeout(800);
const T = () => { const m = new DOMMatrixReadOnly(getComputedStyle(document.querySelector("canvas.eyedropper-canvas")).transform); return { zoom: +m.a.toFixed(4), panX: +m.e.toFixed(1), panY: +m.f.toFixed(1) }; };
const st = await page.evaluate(() => { const r = document.querySelector("canvas.eyedropper-canvas").parentElement.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
// ctrl+wheel zoom in at a point
await page.mouse.move(st.x + st.w * 0.3, st.y + st.h * 0.5);
for (let i = 0; i < 25; i++) { await page.mouse.wheel(0, -120, { }); }
await page.keyboard.down("Control");
for (let i = 0; i < 30; i++) await page.mouse.wheel(0, -100);
await page.keyboard.up("Control");
await page.waitForTimeout(500);
const zoomed = await page.evaluate(T);
await page.setViewportSize({ width: 1439, height: 900 });   // a 1px resize
await page.waitForTimeout(700);
const afterResize = await page.evaluate(T);
// swatch pulse: click "+" and time how long the pulse class survives
await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForTimeout(500);
await page.mouse.click(st.x + st.w * 0.5, st.y + st.h * 0.5);   // pin
await page.waitForTimeout(300);
const plus = page.locator('button[title="Add to palette"]');
const t0 = Date.now();
await plus.click();
let ms = null;
for (let i = 0; i < 80; i++) {
    const has = await page.evaluate(() => !!document.querySelector(".swatch-pulse"));
    if (!has) { ms = Date.now() - t0; break; }
    await page.waitForTimeout(25);
}
const afterAdd = await page.evaluate(() => {
    const cv = document.querySelector("canvas.eyedropper-canvas"); const ov = cv.parentElement.parentElement;
    return { liveRegions: document.querySelectorAll("[aria-live]").length, overlayLive: ov.querySelectorAll("[aria-live],[role=status],[role=alert]").length, readout: ov.querySelector("span.text-mono-small").textContent.trim() };
});
console.log(JSON.stringify({ zoomed, afterResize, refitDestroysZoom: zoomed.zoom !== afterResize.zoom, swatchPulseMs: ms, afterAdd }, null, 2));
await b.close();
