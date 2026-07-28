import { webkit } from "playwright";
const URL_ = "http://localhost:9000/#/gradient";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const res = {};

const browser = await webkit.launch();

// ── A: clean desktop census (no style tampering) ──────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(URL_, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    res.desktop = await page.evaluate(() => {
        const card = document.querySelector(".readout-rail").closest(".rounded-card");
        const port = card.querySelector(".fading-scroll");
        const pr = port.getBoundingClientRect();
        const tiles = [...card.querySelectorAll(".specimen-tile")];
        const fams = [...card.querySelectorAll(".strip-family")];
        const inPort = (el, whole) => {
            const r = el.getBoundingClientRect();
            return whole ? (r.left >= pr.left - 0.5 && r.right <= pr.right + 0.5)
                         : (r.left < pr.right && r.right > pr.left);
        };
        return {
            portW: +pr.width.toFixed(1), contentW: port.scrollWidth,
            ratio: +(port.scrollWidth / pr.width).toFixed(2),
            totalTiles: tiles.length,
            tilesFullyVisible: tiles.filter((t) => inPort(t, true)).length,
            tilesPartlyVisible: tiles.filter((t) => inPort(t, false)).length,
            totalFamilies: fams.length,
            famsFullyVisible: fams.filter((f) => inPort(f, true)).length,
            famsAnyVisible: fams.filter((f) => inPort(f, false)).length,
            portAttrs: { tabIndex: port.tabIndex, role: port.getAttribute("role"), ariaLabel: port.getAttribute("aria-label"), cls: port.className },
            headHeight: +card.querySelector(".interval-head").getBoundingClientRect().height.toFixed(1),
            stripHeight: +pr.height.toFixed(1),
            rampHeight: +card.querySelector('[role="img"]').getBoundingClientRect().height.toFixed(1),
            railHeight: +card.querySelector(".readout-rail").getBoundingClientRect().height.toFixed(1),
            cardHeight: +card.getBoundingClientRect().height.toFixed(1),
        };
    });
    res.semanticsFull = await page.evaluate(() => {
        const card = document.querySelector(".readout-rail").closest(".rounded-card");
        const port = card.querySelector(".fading-scroll");
        return {
            port: { tag: port.tagName, tabIndex: port.tabIndex, role: port.getAttribute("role"), ariaLabel: port.getAttribute("aria-label") },
            labelInName: [...card.querySelectorAll(".specimen-tile")].map((t) => {
                const acc = t.getAttribute("aria-label") ?? "";
                const vis = t.querySelector(".tile-label")?.textContent?.trim() ?? "";
                return { acc, vis, contains: acc.toLowerCase().includes(vis.toLowerCase()) };
            }).filter((x) => !x.contains),
        };
    });
    // scroll-to-end screenshot, clean
    const h = await page.evaluateHandle(() => document.querySelector(".readout-rail").closest(".rounded-card"));
    await page.evaluate(() => { const p = document.querySelector(".fading-scroll"); p.scrollLeft = p.scrollWidth; });
    await page.waitForTimeout(500);
    await h.asElement().screenshot({ path: `${OUT}/p3-scroll-end.png` });
    await page.evaluate(() => { const p = document.querySelector(".fading-scroll"); p.scrollLeft = 0; });
    await page.waitForTimeout(300);
    // shadow-off comparison using a dedicated stylesheet element we can identify
    await page.evaluate(() => {
        const s = document.createElement("style");
        s.id = "__probe_shadow_off__";
        s.textContent = ".specimen-tile{box-shadow:none !important;}";
        document.head.appendChild(s);
    });
    await page.waitForTimeout(250);
    await h.asElement().screenshot({ path: `${OUT}/p3-no-shadow.png` });
    await page.evaluate(() => document.getElementById("__probe_shadow_off__")?.remove());
    await page.waitForTimeout(250);
    await h.asElement().screenshot({ path: `${OUT}/p3-with-shadow.png` });
    await ctx.close();
}

// ── B: mobile census ──────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light", isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
    const page = await ctx.newPage();
    await page.goto(URL_, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    res.mobile = await page.evaluate(() => {
        const card = document.querySelector(".readout-rail").closest(".rounded-card");
        const port = card.querySelector(".fading-scroll");
        const pr = port.getBoundingClientRect();
        const tiles = [...card.querySelectorAll(".specimen-tile")];
        const fams = [...card.querySelectorAll(".strip-family")];
        const whole = (el) => { const r = el.getBoundingClientRect(); return r.left >= pr.left - 0.5 && r.right <= pr.right + 0.5; };
        const t0 = tiles[0].getBoundingClientRect();
        return {
            portW: +pr.width.toFixed(1), contentW: port.scrollWidth, ratio: +(port.scrollWidth / pr.width).toFixed(2),
            tilesFullyVisible: tiles.filter(whole).length, totalTiles: tiles.length,
            famsFullyVisible: fams.filter(whole).length, totalFamilies: fams.length,
            tileBox: { w: +t0.width.toFixed(2), h: +t0.height.toFixed(2) },
            coarsePointer: matchMedia("(pointer: coarse)").matches,
            touchFloorMet: t0.width >= 44 && t0.height >= 44,
        };
    });
    await ctx.close();
}

// ── C: zoom 200% (desktop CSS width halved) ───────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 720, height: 450 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(URL_, { waitUntil: "load" });
    await page.waitForTimeout(3500);
    res.zoom200 = await page.evaluate(() => {
        const rail = document.querySelector(".readout-rail");
        if (!rail) return { note: "no easing card at this width" };
        const card = rail.closest(".rounded-card");
        const port = card.querySelector(".fading-scroll");
        const pr = port.getBoundingClientRect();
        const tiles = [...card.querySelectorAll(".specimen-tile")];
        const whole = (el) => { const r = el.getBoundingClientRect(); return r.left >= pr.left - 0.5 && r.right <= pr.right + 0.5; };
        return { portW: +pr.width.toFixed(1), contentW: port.scrollWidth, ratio: +(port.scrollWidth / pr.width).toFixed(2), tilesFullyVisible: tiles.filter(whole).length, totalTiles: tiles.length };
    });
    const h = await page.evaluateHandle(() => document.querySelector(".readout-rail")?.closest(".rounded-card"));
    if (h.asElement()) await h.asElement().screenshot({ path: `${OUT}/p3-zoom200.png` });
    await ctx.close();
}

console.log(JSON.stringify(res, null, 1));
await browser.close();
