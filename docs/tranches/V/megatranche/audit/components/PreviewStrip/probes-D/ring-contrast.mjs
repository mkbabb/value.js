import { webkit } from "playwright";

const probe = () => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
    const ctx = cv.getContext("2d");
    const resolve = (css) => {
        const draw = (g) => { ctx.fillStyle = g; ctx.fillRect(0, 0, 1, 1); ctx.fillStyle = "#000"; ctx.fillStyle = css; ctx.fillRect(0, 0, 1, 1); return ctx.getImageData(0, 0, 1, 1).data; };
        const b = draw("#000"), w = draw("#fff");
        const a = 1 - (w[0] - b[0]) / 255;
        if (a <= 0) return [0, 0, 0, 0];
        return [b[0] / a, b[1] / a, b[2] / a, a];
    };
    const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const cr = (a, b) => { const L1 = lum(a), L2 = lum(b); return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); };
    const chip = document.querySelector(".preview-strip");
    const shadow = getComputedStyle(chip).boxShadow;
    const ringCss = shadow.slice(0, shadow.indexOf(")") + 1);
    const ring = resolve(ringCss);
    // ground behind the chip
    const layers = [];
    for (let n = chip.parentElement; n && n !== document.documentElement; n = n.parentElement) {
        const c = resolve(getComputedStyle(n).backgroundColor);
        if (c[3] > 0) layers.push(c);
    }
    const page = resolve(getComputedStyle(document.documentElement).backgroundColor || "#fff");
    let g = [page[0] || 255, page[1] || 255, page[2] || 255];
    for (const [r, gg, b, a] of layers.reverse()) g = [a * r + (1 - a) * g[0], a * gg + (1 - a) * g[1], a * b + (1 - a) * g[2]];
    // composite the ring over that ground at its own alpha
    const comp = [ring[3] * ring[0] + (1 - ring[3]) * g[0], ring[3] * ring[1] + (1 - ring[3]) * g[1], ring[3] * ring[2] + (1 - ring[3]) * g[2]];
    // also: the ring against the FIRST segment it bounds
    const seg0 = resolve(getComputedStyle(chip.querySelector(".preview-strip-segment")).backgroundColor);
    const compOverSeg = [ring[3] * ring[0] + (1 - ring[3]) * seg0[0], ring[3] * ring[1] + (1 - ring[3]) * seg0[1], ring[3] * ring[2] + (1 - ring[3]) * seg0[2]];
    return {
        ringCss, ringAlpha: +ring[3].toFixed(3),
        ground: g.map(Math.round), ringComposited: comp.map(Math.round),
        ringVsGroundCR: +cr(comp, g).toFixed(3),
        ringVsSeg0CR: +cr(compOverSeg, [seg0[0], seg0[1], seg0[2]]).toFixed(3),
    };
};

for (const [name, scheme] of [["light", "light"], ["dark", "dark"]]) {
    const b = await webkit.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    await page.getByLabel("Generation preset").click();
    await page.waitForTimeout(700);
    console.log(`\n=== RING ${name} ===`, JSON.stringify(await page.evaluate(probe), null, 1));
    await b.close();
}
