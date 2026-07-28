import { chromium } from "playwright";
const b = await chromium.launch({
    args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--autoplay-policy=no-user-gesture-required"],
});
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, permissions: ["camera"] });
await ctx.addInitScript(() => {
    window.__streams = [];
    const gum = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = async (c) => { const s = await gum(c); window.__streams.push(s); return s; };
});
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

const dom = () => page.evaluate(() => ({
    hash: location.hash,
    fileInputs: document.querySelectorAll('input[type="file"]').length,
    videos: document.querySelectorAll("video").length,
    videoHasSrcObject: [...document.querySelectorAll("video")].map((v) => !!v.srcObject),
    streams: window.__streams.length,
    states: window.__streams.map((s) => s.getTracks().map((t) => t.readyState)),
}));

console.log("before open :", JSON.stringify(await dom()));
await page.locator('main button[title="Open camera"]').click();
await page.waitForTimeout(1500);
console.log("after open  :", JSON.stringify(await dom()));
await page.evaluate(() => { location.hash = "#/mix"; });
await page.waitForTimeout(2000);
console.log("at #/mix    :", JSON.stringify(await dom()));
await page.evaluate(() => { location.hash = "#/gradient"; });
await page.waitForTimeout(2000);
console.log("at #/gradient:", JSON.stringify(await dom()));
// full reload is the only cure
await page.waitForTimeout(4000);
console.log("6s later    :", JSON.stringify(await dom()));
await b.close();
