// SS-8 · B13 probe B — pixel contrast/ring, press, hover-open cost, PRM, touch classes,
// forced-colors/print, generate/mix/extract census. One browser; one context per cell.
import { launch, cell, routeWall, gotoBrowse, save, palette, WALL, EVID, BASE } from "./lib.mjs";

const card = (n) => `[role="article"][aria-label="Palette: ${n}"]`;
const wall = [palette("Probe Zero", 0), ...WALL];

async function expand(page, name) {
    await page.$eval(card(name), (e) => e.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(300);
    await page.click(card(name), { position: { x: 30, y: 20 } });
    await page.waitForTimeout(1200);
}
const px = (buf) => buf; // placeholder (pixel reads done in-page from a canvas of the screenshot)

/** Decode a PNG screenshot in-page and return pixels at given points. */
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
const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); };

async function pixelCell(page, scheme) {
    await routeWall(page, wall);
    await gotoBrowse(page);
    await expand(page, "Probe Five");
    const g = await page.$eval(card("Probe Five"), (c) => {
        const r = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height]; };
        const name = c.querySelector("[data-palette-name]");
        const sw = c.querySelector("[data-palette-swatches]");
        const slug = sw.querySelector(".font-mono");
        const seamRow = sw.firstElementChild;
        const cv = document.createElement("canvas").getContext("2d");
        const rgb = (css) => { cv.fillStyle = "#000"; cv.fillStyle = css; cv.fillRect(0, 0, 1, 1); return [...cv.getImageData(0, 0, 1, 1).data.slice(0, 3)]; };
        return { card: r(c), name: r(name), nameInk: rgb(getComputedStyle(name).color), slug: r(slug), slugInk: rgb(getComputedStyle(slug.parentElement).color), seam: r(seamRow) };
    });
    const shot = await page.screenshot();
    // fill sampled 6px right of the name's box at its vertical centre; seam: its 1px top row, 30px in
    const [nx, ny, nw, nh] = g.name, [sx, sy, sw, sh] = g.slug, [qx, qy, qw] = g.seam;
    const pts = [[Math.round(nx + nw + 40), Math.round(ny + nh / 2)], [Math.round(sx + sw + 60), Math.round(sy + sh / 2)], [Math.round(qx + 200), Math.round(qy)], [Math.round(qx + 200), Math.round(qy + 3)]];
    const [fillName, fillSlug, seamPx, belowSeam] = await pixels(page, shot, pts);
    const out = { scheme, fillName, fillSlug, nameInk: g.nameInk, nameCR: cr(g.nameInk, fillName), slugInk: g.slugInk, slugCR: cr(g.slugInk, fillSlug), seamPx, belowSeam, seamCR: cr(seamPx, belowSeam) };
    // ring on keyboard-focused Copy slug (4th tab stop from the card) and on a swatch (5th)
    out.rings = [];
    for (const n of [4, 5]) {
        await page.focus(card("Probe Five"));
        for (let i = 0; i < n; i++) await page.keyboard.press("Tab");
        const f = await page.evaluate(() => { const a = document.activeElement, cs = getComputedStyle(a), r = a.getBoundingClientRect(); return { label: a.getAttribute("aria-label"), boxShadow: cs.boxShadow.replace(/rgba\(0, 0, 0, 0\) 0px 0px 0px 0px, /g, "").slice(0, 140), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, rect: [r.x, r.y, r.width, r.height] }; });
        const s2 = await page.screenshot();
        const [x, y, w, h] = f.rect;
        const ringPx = await pixels(page, s2, [[Math.round(x + w / 2), Math.round(y - 1)], [Math.round(x - 1), Math.round(y + h / 2)], [Math.round(x + w / 2), Math.round(y + h)]]);
        await page.screenshot({ path: `${EVID}/ring-${n === 4 ? "copyslug" : "swatch"}-${scheme}.png`, clip: { x: x - 10, y: y - 10, width: w + 20, height: h + 20 } });
        out.rings.push({ ...f, ringPx });
        // close any focus-opened popover
        await page.keyboard.press("Escape");
    }
    return out;
}

async function pressAndHover(page) {
    await routeWall(page, wall);
    await gotoBrowse(page);
    await page.$eval(card("Probe Twentyfour"), (e) => e.scrollIntoView({ block: "start" }));
    await page.click(card("Probe Twentyfour"), { position: { x: 30, y: 20 } });
    await page.waitForTimeout(1200);
    const boxes = await page.$$eval(`${card("Probe Twentyfour")} [aria-label^="Color swatch"]`, (bs) => bs.map((b) => { const r = b.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }));
    // V-4 press: sample --press-t + height + transform under a swatch and on the card body
    const sample = async (x, y) => {
        await page.mouse.move(5, 5); await page.waitForTimeout(400);
        await page.mouse.move(x, y); await page.waitForTimeout(50);
        await page.evaluate(() => { window.__p = []; const c = document.querySelector('[role="article"][aria-label="Palette: Probe Twentyfour"]'); const t0 = performance.now(); const s = () => { const cs = getComputedStyle(c); window.__p.push([parseFloat(c.style.getPropertyValue("--press-t")) || 0, +c.getBoundingClientRect().height.toFixed(2), cs.transform === "none" ? "none" : cs.transform.slice(0, 50), cs.scale]); if (performance.now() - t0 < 900) requestAnimationFrame(s); }; requestAnimationFrame(s); });
        await page.mouse.down(); await page.waitForTimeout(450); await page.mouse.up(); await page.waitForTimeout(500);
        return page.evaluate(() => ({ n: window.__p.length, peakPressT: Math.max(...window.__p.map((x) => x[0])), h: [Math.min(...window.__p.map((x) => x[1])), Math.max(...window.__p.map((x) => x[1]))], transforms: [...new Set(window.__p.map((x) => x[2] + "|" + x[3]))].slice(0, 5) }));
    };
    const cardRect = await page.$eval(card("Probe Twentyfour"), (c) => { const r = c.querySelector("[data-palette-name]").getBoundingClientRect(); return [r.right + 60, r.y + r.height / 2]; });
    const v4 = { underSwatch: await sample(...boxes[0]), cardBody: await sample(...cardRect) };
    await page.keyboard.press("Escape");
    // V-7 hover-open sweep: 400ms dwell so every popover opens
    await page.mouse.move(5, 5); await page.waitForTimeout(600);
    await page.$eval(card("Probe Twentyfour"), (c) => {
        const hosts = [...c.querySelectorAll("[data-palette-swatches] div.relative")];
        window.__m = {};
        new MutationObserver((ms) => ms.forEach((m) => { const h = hosts.findIndex((x) => x.contains(m.target)); if (h >= 0) window.__m[h] = (window.__m[h] ?? 0) + 1; })).observe(c, { subtree: true, attributes: true, childList: true, characterData: true });
        window.__f = []; let last = performance.now(); window.__lt = [];
        try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ type: "longtask", buffered: false }); } catch {}
        const tick = (t) => { window.__f.push(t - last); last = t; if (window.__f.length < 1200) requestAnimationFrame(tick); }; requestAnimationFrame(tick);
    });
    let opened = 0;
    for (const [x, y] of boxes.slice(0, 12)) { await page.mouse.move(x, y, { steps: 3 }); await page.waitForTimeout(450); if (await page.locator('[aria-label^="Actions for"]').count()) opened++; }
    const v7 = await page.evaluate(() => { const f = window.__f.slice(2).sort((a, b) => a - b); const q = (p) => +f[Math.floor((f.length - 1) * p)].toFixed(2); return { frames: f.length, p50: q(0.5), p95: q(0.95), max: q(1), over16_7: f.filter((x) => x > 16.8).length, longTasks: window.__lt, mutationsPerHost: window.__m }; });
    return { v4, v7: { ...v7, swatchesSwept: 12, popoversOpenedOnDwell: opened } };
}

async function prm(page) {
    await routeWall(page, wall);
    await gotoBrowse(page);
    const zeroFocusables = () => page.evaluate(() => [...document.querySelectorAll('button[aria-label^="Copy slug"]')].map((b) => { const r = b.getBoundingClientRect(); return { w: r.width, h: r.height, tab: b.tabIndex, inert: !!b.closest("[inert],[hidden]"), vis: getComputedStyle(b).visibility }; }));
    const seq = [];
    for (const n of ["Probe Five", "Probe Two", "Probe Six"]) {
        await expand(page, n);
        seq.push({ after: `expand ${n}`, copySlug: await zeroFocusables(), cardH: await page.$eval(card(n), (c) => c.getBoundingClientRect().height) });
    }
    await page.click(card("Probe Six"), { position: { x: 30, y: 20 } });
    await page.waitForTimeout(1200);
    seq.push({ after: "collapse Six", copySlug: await zeroFocusables() });
    // tab walk across the wall: count zero-size focus stops
    await page.focus(card("Probe Zero"));
    const stops = [];
    for (let i = 0; i < 30; i++) { await page.keyboard.press("Tab"); stops.push(await page.evaluate(() => { const a = document.activeElement, r = a.getBoundingClientRect(); return `${a.getAttribute("aria-label")?.slice(0, 28)}|${Math.round(r.width)}x${Math.round(r.height)}`; })); }
    // stale-height re-wrap across the sm: rung: expand Twentyfour at 1440, then narrow to 600
    await expand(page, "Probe Twentyfour");
    const before = await page.$eval(`${card("Probe Twentyfour")} [data-palette-swatches]`, (s) => ({ h: s.getBoundingClientRect().height, sh: s.scrollHeight, parentStyle: s.parentElement.getAttribute("style") }));
    await page.setViewportSize({ width: 600, height: 900 });
    await page.waitForTimeout(1200);
    const after = await page.$eval(`${card("Probe Twentyfour")} [data-palette-swatches]`, (s) => { const p = s.parentElement; return { h: s.getBoundingClientRect().height, sh: s.scrollHeight, parentH: p.getBoundingClientRect().height, parentStyle: p.getAttribute("style"), clipped: s.scrollHeight > p.getBoundingClientRect().height + 1, swatch: s.querySelector('[aria-label^="Color swatch"]').getBoundingClientRect().width }; });
    await page.screenshot({ path: `${EVID}/prm-rewrap-600.png` });
    const prmMatch = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
    return { prmMatch, seq, stops, rewrap: { before, after } };
}

async function touchTap(page, label) {
    await routeWall(page, wall);
    await gotoBrowse(page);
    const mq = await page.evaluate(() => ({ hover: matchMedia("(hover: hover)").matches, coarse: matchMedia("(pointer: coarse)").matches, anyCoarse: matchMedia("(any-pointer: coarse)").matches }));
    await page.$eval(card("Probe Five"), (e) => e.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(300);
    await page.tap(card("Probe Five"), { position: { x: 30, y: 20 } });
    await page.waitForTimeout(1200);
    const sw = page.locator(`${card("Probe Five")} [aria-label^="Color swatch"]`).nth(1);
    await sw.tap();
    await page.waitForTimeout(900);
    const r = await page.evaluate(() => {
        const p = document.querySelector('[aria-label^="Actions for"]');
        if (!p) return { open: false };
        const b = p.getBoundingClientRect(), cs = getComputedStyle(p);
        return { open: true, rect: [b.x, b.y, b.width, b.height].map((v) => +v.toFixed(1)), padding: cs.padding, paddingInline: cs.paddingInline, paddingBlock: cs.paddingBlock, width: cs.width, className: p.className.slice(0, 300), buttons: [...p.querySelectorAll("button")].map((x) => [Math.round(x.getBoundingClientRect().width), Math.round(x.getBoundingClientRect().height)]) };
    });
    await page.screenshot({ path: `${EVID}/tap-${label}.png` });
    return { mq, ...r };
}

async function forced(page, mode) {
    await routeWall(page, wall);
    if (mode === "forced") await page.emulateMedia({ forcedColors: "active" });
    await gotoBrowse(page);
    if (mode === "print") await page.emulateMedia({ media: "print" });
    await page.waitForTimeout(500);
    const el = page.locator(card("Probe Six"));
    await el.scrollIntoViewIfNeeded();
    const r = await page.$eval(card("Probe Six"), (c) => { const s = c.querySelector("[data-color-strip]"); const b = s.getBoundingClientRect(); return { strip: [b.x, b.y, b.width, b.height], bands: [...s.querySelectorAll("[data-band]")].map((x) => getComputedStyle(x).backgroundColor), fca: getComputedStyle(s).forcedColorAdjust, printAdj: getComputedStyle(s).printColorAdjust }; });
    const shot = await page.screenshot({ path: `${EVID}/card-${mode}.png`, clip: { x: r.strip[0] - 4, y: r.strip[1] - 4, width: r.strip[2] + 8, height: 90 } });
    const [x, y, w, h] = r.strip;
    const pts = [0, 1, 2, 3, 4, 5].map((i) => [Math.round(4 + (w / 6) * (i + 0.5)), Math.round(4 + h / 2)]);
    r.painted = await pixels(page, shot, pts);
    return r;
}

async function routes(page) {
    await page.addInitScript(() => {
        window.__empty = [];
        new MutationObserver(() => {
            document.querySelectorAll("[data-color-strip]").forEach((s) => { if (!s.dataset.summary && s.querySelectorAll("[data-band]").length === 0 && !window.__empty.includes(location.hash)) window.__empty.push(location.hash); });
        }).observe(document, { subtree: true, childList: true });
    });
    await routeWall(page, wall);
    const res = {};
    for (const h of ["#/generate", "#/mix", "#/extract", "#/palettes", "#/browse"]) {
        await page.goto(`${BASE}/${h}`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(3500);
        res[h] = await page.evaluate(() => ({
            strips: [...document.querySelectorAll("[data-color-strip]")].map((s) => { const b = s.getBoundingClientRect(); const host = s.closest('[role="article"], .palette-card, section, [data-plate], .plate') ?? s.parentElement; const hb = host.getBoundingClientRect(); return { o: s.dataset.orientation, bands: s.querySelectorAll("[data-band]").length, w: Math.round(b.width), h: Math.round(b.height), hostH: Math.round(hb.height), share: hb.height ? +((b.height / hb.height) * 100).toFixed(1) : null }; }),
            vertical: document.querySelectorAll('[data-color-strip][data-orientation="vertical"]').length,
            addSlot: [...document.querySelectorAll(".add-slot-ghost")].map((a) => ({ tag: a.tagName, label: a.getAttribute("aria-label"), role: a.getAttribute("role"), ariaHidden: a.getAttribute("aria-hidden"), svg: a.querySelectorAll("svg").length, w: Math.round(a.getBoundingClientRect().width) })),
            apiChip: [...document.querySelectorAll("[data-variant]")].filter((e) => /api|offline|misconf/i.test(e.textContent + e.dataset.variant)).map((e) => e.dataset.variant + ":" + e.textContent.trim().slice(0, 40)).slice(0, 3),
        }));
        if (h === "#/mix") res[h].roleLocator = await page.getByRole("button", { name: "Add current color to the mix" }).count();
        if (h === "#/palettes") res[h].roleLocatorPal = await page.getByRole("button", { name: /Add current color .* to palette/ }).count();
        if (h === "#/generate") {
            const slider = page.locator('[role="slider"]').first();
            if (await slider.count()) { await slider.focus(); for (let i = 0; i < 20; i++) await page.keyboard.press("ArrowLeft"); await page.keyboard.press("Home"); await page.waitForTimeout(800); }
            res[h].afterMin = await page.evaluate(() => [...document.querySelectorAll("[data-color-strip]")].map((s) => s.querySelectorAll("[data-band]").length));
        }
        await page.screenshot({ path: `${EVID}/route-${h.slice(2)}.png` });
    }
    res.emptyStripSeenOn = await page.evaluate(() => window.__empty);
    return res;
}

async function liveApi(page) {
    // NO route: the real dev API on :3000 — does the loopback page latch `misconfigured`?
    await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(4000);
    return page.evaluate(() => ({ cards: document.querySelectorAll('[role="article"]').length, chips: [...document.querySelectorAll("[data-variant]")].map((e) => e.dataset.variant + ":" + e.textContent.trim().slice(0, 50)).filter((s) => /api|offline|misconf|unavail|online/i.test(s)).slice(0, 4), text: document.querySelector("main")?.innerText.slice(0, 200) }));
}

const browser = await launch();
try {
    const res = {};
    res.pixelLight = await cell(browser, { colorScheme: "light" }, (p) => pixelCell(p, "light"));
    res.pixelDark = await cell(browser, { colorScheme: "dark" }, (p) => pixelCell(p, "dark"));
    res.pressHover = await cell(browser, {}, pressAndHover);
    res.prm = await cell(browser, { reducedMotion: "reduce" }, prm);
    res.hoverTouch = await cell(browser, { hasTouch: true }, (p) => touchTap(p, "hover-touch-1440"));
    res.mobile = await cell(browser, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 }, (p) => touchTap(p, "mobile-390"));
    res.forced = await cell(browser, {}, (p) => forced(p, "forced"));
    res.print = await cell(browser, {}, (p) => forced(p, "print"));
    res.corner = await cell(browser, { deviceScaleFactor: 4 }, async (page) => {
        await routeWall(page, wall); await gotoBrowse(page);
        const r = await page.$eval(card("Probe Six"), (c) => { c.scrollIntoView({ block: "center" }); const b = c.getBoundingClientRect(); const s = c.querySelector("[data-color-strip]"); return { card: [b.x, b.y], radius: getComputedStyle(c).borderTopLeftRadius, stripRadius: getComputedStyle(s).borderTopLeftRadius, stripClip: getComputedStyle(s.parentElement).overflow }; });
        await page.waitForTimeout(300);
        const b = await page.$eval(card("Probe Six"), (c) => { const x = c.getBoundingClientRect(); return [x.x, x.y]; });
        await page.screenshot({ path: `${EVID}/corner-x4.png`, clip: { x: b[0] - 2, y: b[1] - 2, width: 24, height: 24 } });
        return { ...r, at: b };
    });
    res.routes = await cell(browser, {}, routes);
    res.liveApi = await cell(browser, {}, liveApi);
    console.log(save("probe-b.json", res));
} finally {
    await browser.close();
}
