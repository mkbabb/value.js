import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
await ctx.addInitScript(() => {
    window.__wk = { made: 0, terminated: 0, live: [] };
    const T = Worker.prototype.terminate;
    Worker.prototype.terminate = function () { window.__wk.terminated++; return T.apply(this); };
    const OW = window.Worker;
    window.Worker = class extends OW {
        constructor(...a) { super(...a); window.__wk.made++; window.__wk.live.push(this); }
    };
    window.__kd = 0;
    const AEL = window.addEventListener.bind(window);
    const REL = window.removeEventListener.bind(window);
    window.addEventListener = (t, f, o) => { if (t === "keydown") window.__kd++; return AEL(t, f, o); };
    window.removeEventListener = (t, f, o) => { if (t === "keydown") window.__kd--; return REL(t, f, o); };
});
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

const png = await page.evaluate(() => {
    const c = document.createElement("canvas"); c.width = 64; c.height = 64;
    const g = c.getContext("2d");
    g.fillStyle = "#c0392b"; g.fillRect(0, 0, 64, 24);
    g.fillStyle = "#2980b9"; g.fillRect(0, 24, 64, 24);
    g.fillStyle = "#27ae60"; g.fillRect(0, 48, 64, 16);
    return c.toDataURL("image/png").split(",")[1];
});
const snap = () => page.evaluate(() => ({ ...window.__wk, live: window.__wk.live.length, kd: window.__kd, hash: location.hash, files: document.querySelectorAll('input[type="file"]').length }));

console.log("boot        :", JSON.stringify(await snap()));
await page.setInputFiles('main input[type="file"]', { name: "b.png", mimeType: "image/png", buffer: Buffer.from(png, "base64") });
await page.waitForTimeout(2000);
console.log("after upload:", JSON.stringify(await snap()));

// open the eyedropper (click the preview), note the keydown listener count
const kdBefore = (await snap()).kd;
await page.locator('main [role="button"][aria-label*="sample" i]').click({ force: true });
await page.waitForTimeout(1200);
const afterOpen = await snap();
console.log("eyedrop open:", JSON.stringify(afterOpen), " (kd delta", afterOpen.kd - kdBefore, ")");

// switch views while the eyedropper is open
await page.evaluate(() => { location.hash = "#/mix"; });
await page.waitForTimeout(2000);
console.log("at #/mix    :", JSON.stringify(await snap()));
await page.evaluate(() => { location.hash = "#/gradient"; });
await page.waitForTimeout(1500);
console.log("at #/gradient:", JSON.stringify(await snap()));
await b.close();
