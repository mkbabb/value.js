import { chromium } from "playwright";
import { writeFile, readFile } from "node:fs/promises";
const D = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/idz-seatD";
const b = await chromium.launch();

// build a 4:3 test image (1200x900) with a distinct border ring so cropping is obvious
{
    const p = await (await b.newContext()).newPage();
    await p.setContent(`<canvas id=c width=1200 height=900></canvas><script>
    const x=document.getElementById('c').getContext('2d');
    x.fillStyle='#f0e6d2';x.fillRect(0,0,1200,900);
    x.fillStyle='#123f8c';x.fillRect(0,0,1200,90);
    x.fillStyle='#b8352c';x.fillRect(0,810,1200,90);
    x.fillStyle='#2f7d5a';x.fillRect(0,400,1200,100);
  </script>`);
    await p.waitForTimeout(250);
    const d = await p.evaluate(() => document.getElementById("c").toDataURL("image/png").split(",")[1]);
    await writeFile(`${D}/four3.png`, Buffer.from(d, "base64"));
    await p.context().close();
}

// pixel sampler: load a png file into a page and read its pixels
const sampler = await (await b.newContext()).newPage();
async function samplePng(path) {
    const b64 = (await readFile(path)).toString("base64");
    return sampler.evaluate(async (b64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        c.getContext("2d").drawImage(img, 0, 0);
        const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
        const targets = [[18, 63, 140], [224, 168, 58], [184, 53, 44], [47, 125, 90], [240, 230, 210], [91, 42, 134]];
        let hit = 0, total = 0;
        const grid = [];
        for (let y = 4; y < c.height - 4; y += Math.max(1, (c.height / 24) | 0)) {
            for (let x = 4; x < c.width - 4; x += Math.max(1, (c.width / 24) | 0)) {
                const i = (y * c.width + x) * 4;
                const px = [d[i], d[i + 1], d[i + 2]];
                total++;
                if (targets.some((t) => Math.abs(t[0] - px[0]) < 26 && Math.abs(t[1] - px[1]) < 26 && Math.abs(t[2] - px[2]) < 26)) hit++;
                if (grid.length < 6) grid.push(px.join(","));
            }
        }
        return { size: `${c.width}x${c.height}`, sampled: total, matchingImageColors: hit, pct: +(hit / total * 100).toFixed(1), firstPixels: grid };
    }, b64);
}

const cases = [
    { n: "mobile-dark-tall", img: "tall.png", ctx: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: "dark", isMobile: true, hasTouch: true } },
    { n: "mobile-light-tall", img: "tall.png", ctx: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: "light", isMobile: true, hasTouch: true } },
    { n: "desktop-light-tall", img: "tall.png", ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" } },
    { n: "desktop-light-4x3", img: "four3.png", ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" } },
];

const R = {};
for (const c of cases) {
    const ctx = await b.newContext(c.ctx);
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3500);
    await page.setInputFiles("input[type=file]", `${D}/${c.img}`);
    await page.waitForTimeout(3000);
    const geo = await page.evaluate(() => {
        const el = document.querySelector('[role="button"][aria-label]');
        const im = el.querySelector("img");
        const zr = el.getBoundingClientRect();
        const ir = im ? im.getBoundingClientRect() : null;
        const mid = document.elementFromPoint(zr.x + zr.width / 2, zr.y + zr.height / 2);
        return {
            zone: { w: +zr.width.toFixed(1), h: +zr.height.toFixed(1) },
            img: ir ? { w: +ir.width.toFixed(1), h: +ir.height.toFixed(1), natural: `${im.naturalWidth}x${im.naturalHeight}`, complete: im.complete } : null,
            visibleFraction: ir ? +(Math.max(0, Math.min(zr.bottom, ir.bottom) - Math.max(zr.top, ir.top)) / ir.height).toFixed(3) : null,
            elementAtZoneCentre: mid ? mid.tagName + "." + String(mid.className).slice(0, 40) : null,
            paletteRendered: !!document.querySelector("main")?.innerText.match(/% of the image/),
            stillGhostCaption: /undeveloped plate/i.test(document.querySelector("main")?.innerText || ""),
        };
    });
    const f = `${D}/P4-${c.n}.png`;
    await page.locator('[role="button"][aria-label]').screenshot({ path: f });
    R[c.n] = { geo, pixels: await samplePng(f) };
    await ctx.close();
}

// forced-colors drag state
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active", colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3000);
    const idle = await page.evaluate(() => { const el = document.querySelector('[role="button"][aria-label]'); const c = getComputedStyle(el); return { border: c.borderTopColor, bg: c.backgroundColor, scale: c.scale }; });
    await page.evaluate(() => document.querySelector('[role="button"][aria-label]').dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true })));
    await page.waitForTimeout(500);
    const lit = await page.evaluate(() => { const el = document.querySelector('[role="button"][aria-label]'); const c = getComputedStyle(el); return { border: c.borderTopColor, bg: c.backgroundColor, scale: c.scale }; });
    R.forcedColorsDrag = { idle, lit, identical: idle.border === lit.border && idle.bg === lit.bg };
    await ctx.close();
}

console.log(JSON.stringify(R, null, 1));
await b.close();
