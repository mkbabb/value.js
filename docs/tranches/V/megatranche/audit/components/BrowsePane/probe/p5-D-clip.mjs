// CHALLENGE-D pass 5 · BrowsePane — is the card's cartoon caster actually
// clipped by `contain: content` on .palette-card-grid?
//
// Method: screenshot the wall, decode the PNG back into a canvas inside a blank
// page, and sample pixels in the band where the -3/-5/-7px cartoon caster MUST
// paint if it is not clipped. A control sample is taken in the 12px `gap-3`
// gutter BELOW a card, where the same caster's +Y leg has room inside the
// grid's padding box — so the two samples isolate the clip axis.
// READ-ONLY (non-GET aborted).

import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const API = "http://localhost:3000";
const OUT = new URL("../evidence/", import.meta.url).pathname;

const mk = (slug, name, cssList) => ({
    slug, name, userSlug: "user-1",
    colors: cssList.map((css) => ({ css })),
    oklabColors: cssList.map(() => ({ L: 0.6, a: 0.05, b: 0.09 })),
    tags: ["warm"], voteCount: 14, forkCount: 1, visibility: "public",
    tier: "published", currentHash: "abc",
});
const WALL = [
    mk("a", "Sunset Commons", ["#e5533d", "#f2a65a", "#f7d6a0", "#8c5f4d", "#3b2c2a"]),
    mk("b", "Cold Open", ["#22333b", "#5e7d7e"]),
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await ctx.route(`${API}/**`, async (r) => {
    const u = r.request().url();
    if (r.request().method() !== "GET") return r.abort();
    if (u.includes("/tags")) return r.fulfill({ json: [] });
    if (u.includes("/palettes")) return r.fulfill({ json: { data: WALL, nextCursor: null, hasMore: false } });
    return r.fulfill({ status: 200, json: {} });
});
const page = await ctx.newPage();
await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "load" });
await page.waitForSelector('[role="article"]', { timeout: 15000 });
await page.waitForTimeout(2200);

const geo = await page.evaluate(() => {
    const grid = document.querySelector(".palette-card-grid");
    const cards = [...document.querySelectorAll('[role="article"]')];
    const gr = grid.getBoundingClientRect();
    const c0 = cards[0].getBoundingClientRect();
    const c1 = cards[1]?.getBoundingClientRect();
    return {
        contain: getComputedStyle(grid).contain,
        shadow: getComputedStyle(cards[0]).boxShadow,
        grid: { x: gr.x, y: gr.y, w: gr.width, h: gr.height },
        c0: { x: c0.x, y: c0.y, w: c0.width, h: c0.height },
        c1: c1 ? { x: c1.x, y: c1.y, w: c1.width, h: c1.height } : null,
    };
});

const shot = await page.screenshot({ path: `${OUT}D-p5-clip-wall.png` });
const b64 = shot.toString("base64");
await page.close();

// decode the PNG in a blank page and sample
const probe = await ctx.newPage();
await probe.setContent("<canvas id=c></canvas>");
const samples = await probe.evaluate(async ({ b64, geo }) => {
    const img = new Image();
    img.src = "data:image/png;base64," + b64;
    await img.decode();
    const cv = document.getElementById("c");
    cv.width = img.width; cv.height = img.height;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    cx.drawImage(img, 0, 0);
    const px = (x, y) => {
        const d = cx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
        return `rgb(${d[0]},${d[1]},${d[2]})`;
    };
    const lum = (s) => { const [r, g, b] = s.match(/\d+/g).map(Number); return +(0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(1); };

    const { c0, c1, grid } = geo;
    const yMid = c0.y + c0.h * 0.6;          // inside the card's vertical span
    const yGap = c0.y + c0.h + 6;            // inside the 12px gap-3 gutter
    const out = {};
    // LEFT axis — where the -3/-5/-7px caster must paint. slack to clip box = 0.
    out.leftAxis = [-1, -2, -4, -6, -8, -12].map((dx) => ({
        dx, at: +(c0.x + dx).toFixed(0), rgb: px(c0.x + dx, yMid),
    }));
    out.insideCardLeftEdge = { rgb: px(c0.x + 3, yMid) };
    // CONTROL — the +Y leg inside the gutter between card0 and card1 (room inside
    // the grid padding box, so it must NOT be clipped).
    out.gutterBelowCard0 = [1, 3, 5, 7, 10].map((dy) => ({
        dy, rgb: px(c0.x + c0.w * 0.5, c0.y + c0.h + dy),
    }));
    // the pane ground far left of the grid, for the "no shadow here" baseline
    out.paneGround = { rgb: px(grid.x - 14, yMid) };
    out.lums = {
        paneGround: lum(out.paneGround.rgb),
        leftAxis: out.leftAxis.map((s) => lum(s.rgb)),
        gutter: out.gutterBelowCard0.map((s) => lum(s.rgb)),
    };
    return out;
}, { b64, geo });

await browser.close();
const res = { geo, samples };
writeFileSync(`${OUT}D-p5-clip.json`, JSON.stringify(res, null, 2));
console.log(JSON.stringify(res, null, 2));
