// SS-8 · B13 probe C — focus-ring pixel diff, hover-open sweep cost (N=24),
// (hover: hover) touchscreen tap via CDP touch events, corner concentricity scan.
import { launch, cell, routeWall, gotoBrowse, save, palette, WALL, EVID } from "./lib.mjs";

const card = (n) => `[role="article"][aria-label="Palette: ${n}"]`;
const wall = [palette("Probe Zero", 0), ...WALL];
async function expand(page, name, block = "center") {
    await page.$eval(card(name), (e, b) => e.scrollIntoView({ block: b }), block);
    await page.waitForTimeout(300);
    await page.click(card(name), { position: { x: 30, y: 20 } });
    await page.waitForTimeout(1200);
}
async function decode(page, png) {
    await page.evaluate(async (b64) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        const x = c.getContext("2d", { willReadFrequently: true }); x.drawImage(img, 0, 0);
        (window.__imgs ??= []).push(x);
    }, png.toString("base64"));
}

async function ring(page, scheme) {
    await routeWall(page, wall);
    await gotoBrowse(page);
    await expand(page, "Probe Five");
    const out = [];
    for (const n of [4, 5]) {
        await page.mouse.move(5, 5);
        await page.evaluate(() => document.activeElement?.blur());
        await page.waitForTimeout(300);
        await page.evaluate(() => (window.__imgs = []));
        await decode(page, await page.screenshot()); // before focus
        await page.focus(card("Probe Five"));
        for (let i = 0; i < n; i++) await page.keyboard.press("Tab");
        await page.waitForTimeout(400);
        const f = await page.evaluate(() => { const a = document.activeElement, r = a.getBoundingClientRect(), cs = getComputedStyle(a); return { label: a.getAttribute("aria-label"), fv: a.matches(":focus-visible"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} offset ${cs.outlineOffset}`, rect: [r.x, r.y, r.width, r.height] }; });
        const png = await page.screenshot();
        await decode(page, png);
        const [x, y, w, h] = f.rect;
        await page.screenshot({ path: `${EVID}/ring2-${n === 4 ? "copyslug" : "swatch"}-${scheme}.png`, clip: { x: x - 12, y: y - 12, width: w + 24, height: h + 24 } });
        // scan the column above the top-centre from y-10 .. y+4 (DPR 2): before vs after
        f.scan = await page.evaluate(({ x, y, w }) => {
            const [b, a] = window.__imgs; const D = 2; const cx = Math.round((x + w / 2) * D);
            const rows = [];
            for (let yy = Math.round((y - 10) * D); yy <= Math.round((y + 3) * D); yy++) {
                const p = [...b.getImageData(cx, yy, 1, 1).data.slice(0, 3)], q = [...a.getImageData(cx, yy, 1, 1).data.slice(0, 3)];
                const d = Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2]);
                if (d > 12) rows.push({ cssY: +(yy / D - y).toFixed(1), before: p, after: q, d });
            }
            return rows;
        }, { x, y, w });
        out.push(f);
        await page.keyboard.press("Escape");
    }
    return { scheme, rings: out };
}

async function sweep(page) {
    await routeWall(page, wall);
    await gotoBrowse(page);
    await expand(page, "Probe Twentyfour", "start");
    const boxes = await page.$$eval(`${card("Probe Twentyfour")} [aria-label^="Color swatch"]`, (bs) => bs.map((b) => { const r = b.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }));
    await page.$eval(card("Probe Twentyfour"), (c) => {
        const hosts = [...c.querySelectorAll("[data-palette-swatches] div.relative")];
        window.__hosts = hosts.length;
        window.__m = {};
        new MutationObserver((ms) => ms.forEach((m) => { const h = hosts.findIndex((x) => x.contains(m.target)); window.__m[h] = (window.__m[h] ?? 0) + 1; })).observe(c, { subtree: true, attributes: true, childList: true, characterData: true });
        window.__f = []; let last = performance.now(); window.__lt = [];
        try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ type: "longtask" }); } catch {}
        const tick = (t) => { window.__f.push(t - last); last = t; if (window.__f.length < 2000) requestAnimationFrame(tick); }; requestAnimationFrame(tick);
    });
    let opened = 0;
    for (const [x, y] of boxes.slice(0, 12)) {
        await page.mouse.move(x, y, { steps: 3 });
        await page.waitForTimeout(700);
        opened += (await page.locator('[aria-label^="Actions for"]').count()) > 0 ? 1 : 0;
    }
    const expandedStill = await page.$eval(card("Probe Twentyfour"), (c) => c.hasAttribute("data-selected"));
    return { expandedStill, opened, ...(await page.evaluate(() => { const f = window.__f.slice(2).sort((a, b) => a - b); const q = (p) => +f[Math.floor((f.length - 1) * p)].toFixed(2); return { hosts: window.__hosts, frames: f.length, p50: q(0.5), p95: q(0.95), p99: q(0.99), max: q(1), over16_7: f.filter((x) => x > 16.8).length, longTasks: window.__lt, mutationsByHostIndex: window.__m }; })) };
}

async function hoverTouch(page) {
    await routeWall(page, wall);
    await gotoBrowse(page);
    const mq = await page.evaluate(() => ({ hover: matchMedia("(hover: hover)").matches, fine: matchMedia("(pointer: fine)").matches }));
    await expand(page, "Probe Five");
    const [x, y] = await page.$eval(`${card("Probe Five")} [aria-label^="Color swatch"]:nth-of-type(1)`, (b) => { const r = b.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }).catch(async () => page.$$eval(`${card("Probe Five")} [aria-label^="Color swatch"]`, (bs) => { const r = bs[1].getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }));
    await page.evaluate(() => { window.__pt = []; for (const t of ["pointerdown", "pointerup", "click"]) document.addEventListener(t, (e) => window.__pt.push(`${t}:${e.pointerType ?? ""}`), true); });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    await page.waitForTimeout(60);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await page.waitForTimeout(1200);
    const r = await page.evaluate(() => ({ events: window.__pt, open: !!document.querySelector('[aria-label^="Actions for"]') }));
    await page.screenshot({ path: `${EVID}/tap-hover-hover-touch.png` });
    return { mq, at: [x, y], ...r };
}

async function corner(page) {
    await routeWall(page, wall);
    await gotoBrowse(page);
    await page.$eval(card("Probe Six"), (c) => c.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(400);
    const b = await page.$eval(card("Probe Six"), (c) => { const x = c.getBoundingClientRect(); return [x.x, x.y, x.width]; });
    await page.evaluate(() => (window.__imgs = []));
    await decode(page, await page.screenshot());
    // D = 4. Walk inward along the 45° diagonal from the card's corner and along the top edge (x = mid);
    // record each pixel so the band between the outside and the strip's red can be counted.
    return page.evaluate(({ x, y, w }) => {
        const c = window.__imgs[0], D = 4;
        const px = (X, Y) => [...c.getImageData(Math.round(X * D), Math.round(Y * D), 1, 1).data.slice(0, 3)];
        const isStrip = (p) => p[0] > 200 && p[1] < 60 && p[2] < 100; // the first band #e11d48
        const diag = [], edge = [];
        for (let i = 0; i < 40; i++) { const t = i / D; diag.push(px(x + t, y + t)); edge.push(px(x + w / 8, y - 2 + i / D)); }
        const firstStrip = (a) => a.findIndex(isStrip);
        // perpendicular gap: along the diagonal, convert the step count to a distance from the outer arc
        return { diagFirstStripStep: firstStrip(diag), edgeFirstStripStep: firstStrip(edge), diag: diag.slice(0, 24), edge: edge.slice(0, 16) };
    }, { x: b[0], y: b[1], w: b[2] });
}

const browser = await launch();
try {
    const res = {};
    res.ringLight = await cell(browser, { colorScheme: "light", deviceScaleFactor: 2 }, (p) => ring(p, "light"));
    res.ringDark = await cell(browser, { colorScheme: "dark", deviceScaleFactor: 2 }, (p) => ring(p, "dark"));
    res.sweep = await cell(browser, {}, sweep);
    res.hoverTouch = await cell(browser, {}, hoverTouch);
    res.corner = await cell(browser, { deviceScaleFactor: 4 }, corner);
    console.log(save("probe-c.json", res));
} finally {
    await browser.close();
}
