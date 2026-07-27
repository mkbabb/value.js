import { chromium } from "playwright";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const URL = "http://localhost:9000/#/gradient";

async function shot(page, name, opts = {}) {
    await page.waitForTimeout(1200);
    const el = page.locator(".specimen-strip").first();
    const box = await el.boundingBox();
    if (!box) { console.log(name, "NO STRIP"); return; }
    await page.screenshot({
        path: `${OUT}/p-${name}.png`,
        clip: { x: Math.max(0, box.x - 12), y: Math.max(0, box.y - 12), width: box.width + 24, height: box.height + 24 },
        scale: "device",
    });
    console.log(name, JSON.stringify(box));
}

const browser = await chromium.launch();

// 1. default + focus ring
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    await page.evaluate(() => {
        const s = document.querySelector(".specimen-strip");
        const t = [...s.querySelectorAll(".specimen-tile")][1];
        t.focus();
    });
    await shot(page, "focus-ring");
    // scroll to back family
    await page.evaluate(() => {
        const s = document.querySelector(".specimen-strip");
        s.scrollLeft = s.scrollWidth;
    });
    await shot(page, "back-family-end");
    await ctx.close();
}

// 2. forced colors
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, forcedColors: "active" });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    const data = await page.evaluate(() => {
        const s = document.querySelector(".specimen-strip");
        if (!s) return { err: "no strip" };
        const tiles = [...s.querySelectorAll(".specimen-tile")];
        const sel = tiles.find((t) => t.getAttribute("data-state") === "on");
        const rest = tiles.find((t) => t.getAttribute("data-state") !== "on");
        const cs = (e) => getComputedStyle(e);
        return {
            forced: matchMedia("(forced-colors: active)").matches,
            selStroke: cs(sel.querySelector(".tile-glyph path")).stroke,
            restStroke: cs(rest.querySelector(".tile-glyph path")).stroke,
            selLabel: cs(sel.querySelector(".tile-label")).color,
            restLabel: cs(rest.querySelector(".tile-label")).color,
            selBg: cs(sel).backgroundColor,
            restBg: cs(rest).backgroundColor,
            selBorder: cs(sel).borderColor + " " + cs(sel).borderWidth,
            restBorder: cs(rest).borderColor + " " + cs(rest).borderWidth,
            eyebrow: cs(s.querySelector(".family-eyebrow")).color + " op=" + cs(s.querySelector(".family-eyebrow")).opacity,
            divider: cs(s.querySelectorAll(".strip-family")[1]).borderLeftColor,
        };
    });
    console.log("FORCED-COLORS", JSON.stringify(data, null, 1));
    await shot(page, "forced-colors");
    await ctx.close();
}

// 3. RTL
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    await page.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); });
    await page.waitForTimeout(600);
    const rtl = await page.evaluate(() => {
        const s = document.querySelector(".specimen-strip");
        const fams = [...s.querySelectorAll(".strip-family")];
        const cs = (e) => getComputedStyle(e);
        return {
            dir: cs(s).direction,
            scrollLeft: s.scrollLeft,
            fam2BorderLeft: cs(fams[1]).borderLeftWidth + " " + cs(fams[1]).borderLeftColor,
            fam2BorderRight: cs(fams[1]).borderRightWidth,
            fam2PadLeft: cs(fams[1]).paddingLeft,
            fam2PadRight: cs(fams[1]).paddingRight,
            firstFamRect: fams[0].getBoundingClientRect().x,
            lastFamRect: fams[fams.length - 1].getBoundingClientRect().x,
            maskImage: cs(s).maskImage.slice(0, 100),
        };
    });
    console.log("RTL", JSON.stringify(rtl, null, 1));
    await shot(page, "rtl");
    await ctx.close();
}

// 4. reduced motion
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    const prm = await page.evaluate(() => ({
        prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
        scrollBehavior: getComputedStyle(document.querySelector(".specimen-strip")).scrollBehavior,
    }));
    console.log("PRM", JSON.stringify(prm));
    await ctx.close();
}

// 5. 200% zoom (deviceScaleFactor emulation via CSS zoom is unreliable; use halved viewport)
{
    const ctx = await browser.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    const z = await page.evaluate(() => {
        const s = document.querySelector(".specimen-strip");
        if (!s) return { err: "no strip at 720px" };
        return { scrollWidth: s.scrollWidth, clientWidth: s.clientWidth, hidden: s.scrollWidth - s.clientWidth, pct: +((1 - s.clientWidth / s.scrollWidth) * 100).toFixed(1) };
    });
    console.log("ZOOM200-equivalent(720px)", JSON.stringify(z));
    await shot(page, "narrow720");
    await ctx.close();
}

// 6. mobile 390
{
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    const m = await page.evaluate(() => {
        const s = document.querySelector(".specimen-strip");
        if (!s) return { err: "no strip at 390" };
        return {
            scrollWidth: s.scrollWidth, clientWidth: s.clientWidth,
            hiddenPct: +((1 - s.clientWidth / s.scrollWidth) * 100).toFixed(1),
            hoverMedia: matchMedia("(hover: hover)").matches,
            anyPointerCoarse: matchMedia("(pointer: coarse)").matches,
            tileH: s.querySelector(".specimen-tile").getBoundingClientRect().height,
        };
    });
    console.log("MOBILE390", JSON.stringify(m));
    await shot(page, "mobile390");
    await ctx.close();
}

await browser.close();
