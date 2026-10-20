// SS-8 · B13 cure witness — L-1 (swatch wrapper baseline reservation) and L-3 (attribution
// ink contrast on the painted card fill), light + dark. One browser; one context per cell.
// Usage: guarded --timeout 10 -- node cure.mjs <tag>   (writes cure-<tag>.json)
import { launch, cell, routeWall, gotoBrowse, save, palette, WALL } from "./lib.mjs";

const card = (n) => `[role="article"][aria-label="Palette: ${n}"]`;
const wall = [palette("Probe Zero", 0), ...WALL];
const tag = process.argv[2] ?? "run";

const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); };

async function pixels(page, png, pts) {
    return page.evaluate(async ({ b64, pts }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        return pts.map(([a, b]) => [...x.getImageData(a, b, 1, 1).data.slice(0, 3)]);
    }, { b64: png.toString("base64"), pts });
}

async function witness(page, scheme) {
    await routeWall(page, wall);
    await gotoBrowse(page);
    await page.$eval(card("Probe Five"), (e) => e.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(300);
    await page.click(card("Probe Five"), { position: { x: 30, y: 20 } });
    await page.waitForTimeout(1200);
    const g = await page.$eval(card("Probe Five"), (c) => {
        const sw = c.querySelector("[data-palette-swatches]");
        const slug = sw.querySelector(".font-mono");
        const ink = slug.parentElement;
        const cv = document.createElement("canvas").getContext("2d");
        const rgb = (css) => { cv.fillStyle = "#000"; cv.fillStyle = css; cv.fillRect(0, 0, 1, 1); return [...cv.getImageData(0, 0, 1, 1).data.slice(0, 3)]; };
        const b = slug.getBoundingClientRect();
        const wrappers = [...sw.querySelectorAll('[aria-label^="Color swatch"]')].map((btn) => {
            const w = btn.parentElement.closest("div.relative") ?? btn.parentElement;
            const br = btn.getBoundingClientRect(), wr = w.getBoundingClientRect();
            return { swatch: [br.width, br.height], wrapper: [+wr.width.toFixed(2), +wr.height.toFixed(2)], display: getComputedStyle(w).display, reserve: +(wr.height - br.height).toFixed(2) };
        });
        return { slugRect: [b.x, b.y, b.width, b.height], inkCss: getComputedStyle(ink).color, ink: rgb(getComputedStyle(ink).color), cls: ink.className, wrappers };
    });
    const shot = await page.screenshot();
    const [sx, sy, sw, sh] = g.slugRect;
    const [fill] = await pixels(page, shot, [[Math.round(sx + sw + 60), Math.round(sy + sh / 2)]]);
    return { scheme, ...g, fill, slugCR: cr(g.ink, fill) };
}

const browser = await launch();
try {
    const res = {};
    res.light = await cell(browser, { colorScheme: "light" }, (p) => witness(p, "light"));
    res.dark = await cell(browser, { colorScheme: "dark" }, (p) => witness(p, "dark"));
    console.log(save(`cure-${tag}.json`, res));
    for (const s of ["light", "dark"]) {
        const r = res[s];
        console.log(s, "slugCR", r?.slugCR, "ink", r?.inkCss, "fill", r?.fill, "reserve", r?.wrappers?.map((w) => w.reserve).join(","), r?.wrappers?.[0]?.display);
    }
} finally {
    await browser.close();
}
