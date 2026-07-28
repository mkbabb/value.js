import { webkit } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });

const HEAD = () => {
    const out = [];
    for (const h of document.querySelectorAll(".interval-head")) {
        const spans = [...h.querySelectorAll("span")];
        const label = spans[0], dots = h.querySelector(".specimen-dots"),
            glyph = h.querySelector(".head-glyph"), name = spans[spans.length - 1],
            chev = h.querySelector("svg:not(.head-glyph)");
        const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [+b.x.toFixed(1), +b.width.toFixed(1)]; };
        out.push({
            headW: +h.getBoundingClientRect().width.toFixed(1),
            headH: +h.getBoundingClientRect().height.toFixed(1),
            label: label ? { t: label.textContent, r: r(label) } : null,
            dots: r(dots), glyph: r(glyph),
            name: name ? { t: name.textContent, r: r(name), clientW: name.clientWidth, scrollW: name.scrollWidth, trunc: name.scrollWidth > name.clientWidth } : null,
            chevron: r(chev),
            fontSize: getComputedStyle(name || h).fontSize,
        });
    }
    const code = document.querySelector(".readout-rail code");
    const strip = document.querySelector(".fading-scroll");
    return {
        heads: out,
        code: code ? { t: code.textContent, clientW: code.clientWidth, scrollW: code.scrollWidth, trunc: code.scrollWidth > code.clientWidth, fs: getComputedStyle(code).fontSize } : null,
        strip: strip ? { clientW: strip.clientWidth, scrollW: strip.scrollWidth, hiddenPct: +(100 * (1 - strip.clientWidth / strip.scrollWidth)).toFixed(1) } : null,
        docOverflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        railBtn: (() => { const b = document.querySelector(".rail-btn"); if (!b) return null; const r = b.getBoundingClientRect(); return [+r.width.toFixed(1), +r.height.toFixed(1)]; })(),
        tile: (() => { const b = document.querySelector(".specimen-tile"); if (!b) return null; const r = b.getBoundingClientRect(); return [+r.width.toFixed(1), +r.height.toFixed(1)]; })(),
        rootFontPx: getComputedStyle(document.documentElement).fontSize,
    };
};

const arms = [
    { name: "desktop-1440", vp: { width: 1440, height: 900 }, dsf: 2, mobile: false, addStops: true },
    { name: "mobile-390", vp: { width: 390, height: 844 }, dsf: 3, mobile: true, addStops: true },
    { name: "zoom200-720", vp: { width: 720, height: 450 }, dsf: 2, mobile: false, addStops: true },
    { name: "reflow-320", vp: { width: 320, height: 640 }, dsf: 2, mobile: true, addStops: false },
];

const run = async () => {
    const browser = await webkit.launch();
    const R = {};
    for (const a of arms) {
        const ctx = await browser.newContext({ viewport: a.vp, deviceScaleFactor: a.dsf, hasTouch: a.mobile, isMobile: a.mobile });
        const page = await ctx.newPage();
        await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
        await page.waitForSelector(".interval-head", { timeout: 25000 });
        await page.waitForTimeout(1100);
        if (a.addStops) {
            const rail = await page.$(".gradient-rail"); const rb = await rail.boundingBox();
            for (const f of [0.25, 0.5, 0.75]) {
                await page.mouse.move(rb.x + rb.width * f, rb.y + rb.height / 2);
                await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(300);
            }
        }
        R[a.name] = await page.evaluate(HEAD);
        try {
            await page.evaluate(() => { const h3 = [...document.querySelectorAll("h3")].find(x => x.textContent.trim() === "Easing"); h3.scrollIntoView({ block: "start", behavior: "instant" }); });
            await page.waitForTimeout(350);
            const box = await page.evaluate(() => {
                const h3 = [...document.querySelectorAll("h3")].find(x => x.textContent.trim() === "Easing");
                const w = h3.nextElementSibling.getBoundingClientRect(), t = h3.getBoundingClientRect();
                return { x: Math.max(0, t.x - 10), y: Math.max(0, t.y - 8), width: Math.min(w.width + 20, window.innerWidth), height: Math.min(w.bottom - t.y + 16, window.innerHeight - 4) };
            });
            await page.screenshot({ path: `${OUT}/${a.name}.png`, clip: box });
        } catch (e) { R[a.name].shotError = String(e).slice(0, 120); }
        await ctx.close();
    }
    fs.writeFileSync(`${OUT}/R.json`, JSON.stringify(R, null, 2));
    console.log(JSON.stringify(R, null, 2));
    await browser.close();
};
run();
