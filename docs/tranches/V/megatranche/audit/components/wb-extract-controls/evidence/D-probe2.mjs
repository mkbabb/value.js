import { chromium } from "playwright";

const DIR = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const MEASURE = () => {
    const r = (el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
    };
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    if (!rail) return { error: "no rail" };
    const cs = getComputedStyle(rail);
    const kc = document.querySelector('[data-o18="extract-kc"]');
    const kcTrack = kc && kc.querySelector(".slider-track");
    const thumbs = [...document.querySelectorAll('[role="slider"]')].map((t) => ({
        label: t.getAttribute("aria-label"),
        rect: r(t),
        cs: (() => { const c = getComputedStyle(t); return { bg: c.backgroundColor, bc: c.borderTopColor, bw: c.borderTopWidth, bs: c.boxShadow.slice(0, 70), fca: c.forcedColorAdjust }; })(),
    }));
    const svgs = [...document.querySelectorAll(".dock-icon-button svg")].map((s) => {
        const c = getComputedStyle(s);
        return { tp: c.transitionProperty, td: c.transitionDuration, ttf: c.transitionTimingFunction, color: c.color };
    });
    const seps = [...document.querySelectorAll(".dock-separator")].map((s) => ({ rect: r(s), bg: getComputedStyle(s).backgroundColor, role: s.getAttribute("role"), do: s.getAttribute("data-orientation"), ao: s.getAttribute("aria-orientation") }));
    return {
        railCS: { bg: cs.backgroundColor, bgImg: cs.backgroundImage.slice(0, 320), boxShadow: cs.boxShadow, fca: cs.forcedColorAdjust },
        railRect: r(rail),
        railInline: rail.getAttribute("style"),
        kcTrack: kcTrack && { rect: r(kcTrack), bg: getComputedStyle(kcTrack).backgroundColor, bgImg: getComputedStyle(kcTrack).backgroundImage.slice(0, 120) },
        thumbs,
        svgs,
        seps,
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
    };
};

const BANDS = () => {
    const c = document.createElement("canvas");
    c.width = 128; c.height = 128;
    const g = c.getContext("2d");
    const cols = ["#1b3a6b", "#c94f2e", "#e8c547", "#2f7a4f", "#7b3fa0", "#f2ece1"];
    cols.forEach((col, i) => { g.fillStyle = col; g.fillRect(0, (i * 128) / 6, 128, 128 / 6); });
    return c.toDataURL("image/png");
};

async function session(label, opts, fn) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
    await page.waitForTimeout(4000);
    let res;
    try { res = await fn(page); } catch (e) { res = { THREW: String(e).slice(0, 300) }; }
    console.log("##### " + label + " #####");
    console.log(JSON.stringify(res, null, 1));
    await browser.close();
}

await session("forced-colors-active-1440-light", { viewport: { width: 1440, height: 900 }, forcedColors: "active", colorScheme: "light" }, async (p) => {
    const m = await p.evaluate(MEASURE);
    await p.screenshot({ path: DIR + "/WBEC-forced-colors.png" });
    return m;
});

await session("reduced-motion-1440-light", { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce", colorScheme: "light" }, (p) => p.evaluate(MEASURE));

await session("developed-1440-light", { viewport: { width: 1440, height: 1100 }, colorScheme: "light" }, async (p) => {
    const dataUrl = await p.evaluate(BANDS);
    await p.setInputFiles('input[type="file"]', { name: "bands.png", mimeType: "image/png", buffer: Buffer.from(dataUrl.split(",")[1], "base64") });
    await p.waitForTimeout(4000);
    const m = await p.evaluate(MEASURE);
    await p.screenshot({ path: DIR + "/WBEC-developed-light.png" });
    await p.evaluate(() => document.querySelector('[role="slider"][aria-label="Number of colors"]').focus());
    for (let i = 0; i < 11; i++) { await p.keyboard.press("ArrowRight"); await p.waitForTimeout(70); }
    await p.waitForTimeout(3000);
    const k16 = await p.evaluate(() => {
        const rail = document.querySelector('[data-o18="extract-k-rail"]');
        const lbl = rail.parentElement.parentElement.querySelector("label");
        return {
            labelText: lbl.textContent.trim(), scrollW: lbl.scrollWidth, clientW: lbl.clientWidth,
            rectW: +lbl.getBoundingClientRect().width.toFixed(1),
            overflows: lbl.scrollWidth > lbl.clientWidth,
            fontSize: getComputedStyle(lbl).fontSize,
            bgImg: getComputedStyle(rail).backgroundImage.slice(0, 500),
        };
    });
    await p.screenshot({ path: DIR + "/WBEC-developed-k16-light.png" });
    return { measured: m, k16 };
});

await session("developed-1440-dark", { viewport: { width: 1440, height: 1100 }, colorScheme: "dark" }, async (p) => {
    const dataUrl = await p.evaluate(BANDS);
    await p.setInputFiles('input[type="file"]', { name: "bands.png", mimeType: "image/png", buffer: Buffer.from(dataUrl.split(",")[1], "base64") });
    await p.waitForTimeout(4000);
    const m = await p.evaluate(MEASURE);
    await p.screenshot({ path: DIR + "/WBEC-developed-dark.png" });
    return m;
});

await session("narrow320", { viewport: { width: 320, height: 900 }, colorScheme: "light" }, async (p) => {
    const m = await p.evaluate(MEASURE);
    await p.screenshot({ path: DIR + "/WBEC-narrow320.png" });
    return m;
});

await session("rtl-1440", { viewport: { width: 1440, height: 900 }, colorScheme: "light" }, async (p) => {
    await p.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); });
    await p.waitForTimeout(900);
    const m = await p.evaluate(() => {
        const rail = document.querySelector('[data-o18="extract-k-rail"]');
        const lbl = rail.parentElement.parentElement.querySelector("label");
        const c = getComputedStyle(lbl);
        const b = lbl.getBoundingClientRect();
        return { textAlign: c.textAlign, direction: c.direction, labelRect: { x: +b.x.toFixed(1), w: +b.width.toFixed(1) }, railX: +rail.getBoundingClientRect().x.toFixed(1), scrollW: document.documentElement.scrollWidth };
    });
    await p.screenshot({ path: DIR + "/WBEC-rtl.png" });
    return m;
});
