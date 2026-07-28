import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.route("**/BrowsePane.vue**", (r) =>
    r.fulfill({
        status: 200,
        contentType: "text/javascript",
        body: 'export default { setup(){ return () => { throw new Error("PARSE-FAILURE-EXAMPLE"); }; } };',
    }),
);
await page.goto("http://localhost:9000/#/browse", { waitUntil: "load" });
await page.waitForTimeout(4500);

const rects = await page.evaluate(() => {
    const eb = document.querySelector(".vj-error-boundary");
    const ps = [...eb.querySelectorAll("p")];
    const r = (el) => { const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; };
    return { head: r(ps[0]), detail: r(ps[1]) };
});

async function analyse(tag) {
    const buf = await page.screenshot();
    const b64 = buf.toString("base64");
    return page.evaluate(
        async ({ b64, rects, tag }) => {
            const blob = await (await fetch("data:image/png;base64," + b64)).blob();
            const bmp = await createImageBitmap(blob);
            const c = new OffscreenCanvas(bmp.width, bmp.height);
            const g = c.getContext("2d");
            g.drawImage(bmp, 0, 0);
            const dpr = bmp.width / window.innerWidth;

            const lum = (r, gg, b) => {
                const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
                return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(b);
            };
            const cr = (a, b) => { const [hi, lo] = a > b ? [a, b] : [b, a]; return (hi + 0.05) / (lo + 0.05); };

            const sample = (rect) => {
                const x0 = Math.round(rect.x * dpr), y0 = Math.round(rect.y * dpr);
                const w = Math.round(rect.w * dpr), h = Math.round(rect.h * dpr);
                const d = g.getImageData(x0, y0, w, h).data;
                let minY = 1, minPx = null, maxY = 0, maxPx = null;
                const uniq = new Set();
                for (let i = 0; i < d.length; i += 4) {
                    const L = lum(d[i], d[i + 1], d[i + 2]);
                    uniq.add(d[i] + "," + d[i + 1] + "," + d[i + 2]);
                    if (L < minY) { minY = L; minPx = [d[i], d[i + 1], d[i + 2]]; }
                    if (L > maxY) { maxY = L; maxPx = [d[i], d[i + 1], d[i + 2]]; }
                }
                // Background estimate: pixel band 6px above the text box.
                const bd = g.getImageData(x0, Math.max(0, y0 - Math.round(8 * dpr)), w, Math.round(4 * dpr)).data;
                let bs = [0, 0, 0], n = 0;
                for (let i = 0; i < bd.length; i += 4) { bs[0] += bd[i]; bs[1] += bd[i + 1]; bs[2] += bd[i + 2]; n++; }
                const bg = bs.map((v) => Math.round(v / n));
                const bgY = lum(bg[0], bg[1], bg[2]);
                return {
                    distinctColours: uniq.size,
                    darkestPixel: minPx, darkestLum: +minY.toFixed(4),
                    lightestPixel: maxPx,
                    bgEstimate: bg, bgLum: +bgY.toFixed(4),
                    contrastDarkestVsBg: +cr(minY, bgY).toFixed(2),
                };
            };
            return { tag, dpr, head: sample(rects.head), detail: sample(rects.detail) };
        },
        { b64, rects, tag },
    );
}

console.log("SHIPPED (position:static):", JSON.stringify(await analyse("shipped"), null, 2));

await page.evaluate(() => { document.querySelector(".vj-error-boundary").style.position = "relative"; });
await page.waitForTimeout(400);
console.log("RUNTIME-LIFTED (position:relative):", JSON.stringify(await analyse("lifted"), null, 2));

await browser.close();
