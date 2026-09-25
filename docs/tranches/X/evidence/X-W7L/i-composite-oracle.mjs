// X.W7L.i — the browser's own composite of glass 10.1.0's plate tokens over
// solid grey grounds (served :9000, 1440, no backdrop so the pixel is the
// pure source-over). Usage: node i-composite-oracle.mjs <light|dark> <out.json>
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const [scheme = "light", out = "/dev/stdout"] = process.argv.slice(2);
const browser = await chromium.launch({ headless: false });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme })).newPage();
await page.goto("http://localhost:9000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const GREYS = [60, 100, 128, 160, 186, 220];
const RUNGS = ["--glass-plate-quiet", "--glass-plate-resting", "--glass-plate-floating"];
const rows = [];
for (const g of GREYS) for (const token of RUNGS) {
    await page.evaluate(({ g, token }) => {
        document.getElementById("__oracle")?.remove();
        const host = document.createElement("div");
        host.id = "__oracle";
        host.style.cssText = `position:fixed;inset:0;z-index:2147483647;background:rgb(${g},${g},${g})`;
        const plate = document.createElement("div");
        plate.style.cssText = `position:absolute;left:100px;top:100px;width:200px;height:200px;background:var(${token})`;
        host.appendChild(plate); document.body.appendChild(host);
    }, { g, token });
    const shot = await page.screenshot({ clip: { x: 150, y: 150, width: 1, height: 1 } });
    const px = await page.evaluate(async (b64) => { const i = new Image(); i.src = "data:image/png;base64," + b64; await i.decode(); const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d"); x.drawImage(i, 0, 0); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3); }, shot.toString("base64"));
    const css = await page.evaluate((t) => { const p = document.querySelector("#__oracle > div"); return getComputedStyle(p).backgroundColor; }, token);
    rows.push({ ground: g, token, css, pixel: px });
}
writeFileSync(out, JSON.stringify({ scheme, at: new Date().toISOString(), rows }, null, 1));
await browser.close();
