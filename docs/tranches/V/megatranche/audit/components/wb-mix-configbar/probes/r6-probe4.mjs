// round 6 probe 4 — the ENABLED verb (DOM-only un-disable, no source edit) and the
// coarse-pointer vocabulary fit.
import { chromium } from "playwright";
import fs from "node:fs";
const ORIGIN = "http://localhost:9000/#/mix";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/img";

async function enabledCell(scheme) {
    const b = await chromium.launch();
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(ORIGIN, { waitUntil: "load" });
    await page.waitForTimeout(2500);
    const info = await page.evaluate(() => {
        const v = [...document.querySelectorAll("button")].find(
            (b) => (b.textContent || "").trim() === "Mix" && b.closest("main"),
        );
        v.removeAttribute("disabled");
        v.disabled = false;
        const c = getComputedStyle(v);
        const r = v.getBoundingClientRect();
        return {
            opacity: c.opacity,
            bg: c.backgroundColor,
            bw: c.borderWidth,
            shadow: c.boxShadow.slice(0, 90),
            rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        };
    });
    const file = `${OUT}/verb-enabled-${scheme}.png`;
    await page.screenshot({
        path: file,
        clip: { x: info.rect.x - 8, y: info.rect.y - 16, width: info.rect.w + 16, height: info.rect.h + 24 },
    });
    // hover + focus states on the now-enabled verb
    await page.hover("main button:has-text('Mix')").catch(() => {});
    await page.waitForTimeout(350);
    const hov = await page.evaluate(() => {
        const v = [...document.querySelectorAll("button")].find(
            (b) => (b.textContent || "").trim() === "Mix" && b.closest("main"),
        );
        const c = getComputedStyle(v);
        return { bg: c.backgroundColor, scale: c.scale, transform: c.transform, shadow: c.boxShadow.slice(0, 90) };
    });
    const fileH = `${OUT}/verb-enabled-hover-${scheme}.png`;
    await page.screenshot({
        path: fileH,
        clip: { x: info.rect.x - 8, y: info.rect.y - 16, width: info.rect.w + 16, height: info.rect.h + 24 },
    });
    await b.close();
    return { info, file, hov, fileH };
}

async function coarseFit() {
    const b = await chromium.launch();
    const ctx = await b.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.goto(ORIGIN, { waitUntil: "load" });
    await page.waitForTimeout(2800);
    const r = await page.evaluate(() => {
        const t = [...document.querySelectorAll('button[role="combobox"]')].find(
            (b) => b.getAttribute("aria-label") === "Hue method",
        );
        const span = t.querySelector("span");
        const c = getComputedStyle(span);
        const ctx2 = document.createElement("canvas").getContext("2d");
        ctx2.font = `${c.fontStyle} ${c.fontWeight} ${c.fontSize} ${c.fontFamily}`;
        const words = ["Shorter", "Longer", "Increasing", "Decreasing", "Linear sRGB", "Display P3", "Discard extras"];
        const tr = t.getBoundingClientRect();
        const sv = t.querySelector("svg");
        return {
            font: ctx2.font,
            fieldW: tr.width,
            pad: getComputedStyle(t).paddingLeft + "/" + getComputedStyle(t).paddingRight,
            chevron: sv ? sv.getBoundingClientRect().width : null,
            spanW: span.getBoundingClientRect().width,
            spanMaxAvail: tr.width - 24 - (sv ? sv.getBoundingClientRect().width : 0) - 8,
            widths: words.map((w) => ({ w, px: Math.round(ctx2.measureText(w).width * 10) / 10 })),
            spanStyles: {
                overflow: c.overflow,
                textOverflow: c.textOverflow,
                whiteSpace: c.whiteSpace,
                display: c.display,
                webkitLineClamp: c.webkitLineClamp,
            },
        };
    });
    // tap-target rects on the bar
    const taps = await page.evaluate(() => {
        const names = ["Color space", "Hue method"];
        const out = names.map((n) => {
            const t = [...document.querySelectorAll('button[role="combobox"]')].find(
                (b) => b.getAttribute("aria-label") === n,
            );
            const r = t.getBoundingClientRect();
            return { n, w: Math.round(r.width), h: Math.round(r.height) };
        });
        const v = [...document.querySelectorAll("button")].find(
            (b) => (b.textContent || "").trim() === "Mix" && b.closest("main"),
        );
        const vr = v.getBoundingClientRect();
        out.push({ n: "Mix verb", w: Math.round(vr.width), h: Math.round(vr.height) });
        return out;
    });
    await page.screenshot({ path: `${OUT}/mix-390-live.png`, fullPage: false });
    await b.close();
    return { fit: r, taps };
}

const out = { light: await enabledCell("light"), dark: await enabledCell("dark"), coarse: await coarseFit() };
fs.writeFileSync(
    "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/r6-out4.json",
    JSON.stringify(out, null, 1),
);
console.log(JSON.stringify(out, null, 1));
