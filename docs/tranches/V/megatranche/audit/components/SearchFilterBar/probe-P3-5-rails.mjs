// CHALLENGE-D pass-3 · probe 5 — THE LEFT RAILS + THE TWO-GROUND POPOVER.
// (a) every left rail inside the 240px popover, measured as ink x, not box x
// (b) the divider's inset vs those rails
// (c) the popover's OWN painted ground sampled at its top and at its bottom — the surface
//     overhangs the Browse card, so the menu sits on two different grounds within itself.
import { webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const OUT = resolve(HERE, "evidence-p3");
mkdirSync(OUT, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9000";

const browser = await webkit.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 4 });
const page = await context.newPage();
await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle" });
await page.waitForTimeout(2800);
await page.click('button[aria-label="Filters"]');
await page.waitForTimeout(800);
await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"][data-state="open"]');
    [...dlg.querySelectorAll("label")].find((l) => l.textContent.trim() === "Featured")?.click();
});
await page.waitForTimeout(400);

const rails = await page.evaluate(() => {
    const r = (n) => +Number(n).toFixed(2);
    const dlg = document.querySelector('[role="dialog"][data-state="open"]');
    const inkX = (el) => { const rg = document.createRange(); rg.selectNodeContents(el); const b = rg.getBoundingClientRect(); return b.width ? r(b.x) : null; };
    const labels = [...dlg.querySelectorAll(".section-label")];
    const options = [...dlg.querySelectorAll(".filter-option")];
    const sections = [...dlg.querySelectorAll(".filter-section")];
    const d = dlg.getBoundingClientRect();
    const input = dlg.querySelector('input[aria-label="Search by CSS color"]');
    const swatch = dlg.querySelector('button[aria-label^="Open color picker"]');
    const clearBtn = [...dlg.querySelectorAll("button")].find((b) => b.textContent.includes("Clear all"));
    return {
        dialogLeft: r(d.x), dialogRight: r(d.right), dialogWidth: r(d.width),
        producerPadInline: getComputedStyle(dlg).paddingLeft,
        sectionBoxLeft: sections.map((s) => r(s.getBoundingClientRect().x)),
        dividerLeft: r(sections[0].getBoundingClientRect().x),
        dividerRight: r(sections[0].getBoundingClientRect().right),
        sectionLabelInk: labels.map((l) => ({ t: l.textContent.trim(), x: inkX(l) })),
        optionMarkerBox: options.map((o) => { const m = o.querySelector('button[role="radio"],button[role="checkbox"]'); return m ? r(m.getBoundingClientRect().x) : null; }),
        optionMarkerInk: options.map((o) => { const m = o.querySelector('button[role="radio"],button[role="checkbox"]'); const k = m?.firstElementChild; return k ? r(k.getBoundingClientRect().x) : null; }),
        optionTextInk: options.map((o) => { const s = [...o.querySelectorAll("span")].pop(); return { t: o.textContent.trim(), x: s ? inkX(s) : null }; }),
        swatchLeft: swatch ? r(swatch.getBoundingClientRect().x) : null,
        inputLeft: input ? r(input.getBoundingClientRect().x) : null,
        clearLeft: clearBtn ? r(clearBtn.getBoundingClientRect().x) : null,
        clearInk: clearBtn ? inkX(clearBtn) : null,
        // heights
        swatchH: swatch ? r(swatch.getBoundingClientRect().height) : null,
        inputH: input ? r(input.getBoundingClientRect().height) : null,
        clearH: clearBtn ? r(clearBtn.getBoundingClientRect().height) : null,
        rowH: options[0] ? r(options[0].getBoundingClientRect().height) : null,
        rowGap: options.length > 1 ? r(options[1].getBoundingClientRect().y - options[0].getBoundingClientRect().bottom) : null,
        labelToFirstOptionGap: labels[0] && options[0] ? r(options[0].getBoundingClientRect().y - labels[0].getBoundingClientRect().bottom) : null,
        radioGroupGap: (() => { const g = dlg.querySelector('[role="radiogroup"]'); return g ? getComputedStyle(g).gap : null; })(),
        radioGroupClass: dlg.querySelector('[role="radiogroup"]')?.className ?? null,
        // the ground question
        popoverTopY: r(d.y), popoverBottomY: r(d.bottom),
        browseCardRect: (() => { const c = document.querySelector('[data-slot="card"]'); if (!c) return null; const b = c.getBoundingClientRect(); return { x: r(b.x), y: r(b.y), w: r(b.width), h: r(b.height), bottom: r(b.bottom) }; })(),
        popoverBackdrop: getComputedStyle(dlg).backdropFilter,
        popoverBg: getComputedStyle(dlg).backgroundColor,
    };
});

// pixel ground at the popover's top vs bottom
const shot = (await page.screenshot({ clip: { x: rails.dialogLeft + 4, y: rails.popoverTopY + 4, width: rails.dialogWidth - 8, height: Math.min(rails.popoverBottomY - rails.popoverTopY - 8, 900 - rails.popoverTopY - 8) } })).toString("base64");
const ctx2 = await browser.newContext();
const p2 = await ctx2.newPage();
await p2.setContent("<canvas id=c></canvas>");
const grounds = await p2.evaluate(async (b64) => {
    const img = new Image();
    await new Promise((res) => { img.onload = res; img.src = "data:image/png;base64," + b64; });
    const c = document.getElementById("c"); c.width = img.width; c.height = img.height;
    const g = c.getContext("2d", { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const band = (y0, y1) => {
        const d = g.getImageData(0, y0, c.width, y1 - y0).data;
        const hist = new Map();
        for (let i = 0; i < d.length; i += 4) { const k = `${d[i]},${d[i + 1]},${d[i + 2]}`; hist.set(k, (hist.get(k) ?? 0) + 1); }
        return [...hist.entries()].sort((a, b) => b[1] - a[1])[0][0].split(",").map(Number);
    };
    const h = c.height;
    return { w: c.width, h, topBand: band(0, Math.floor(h * 0.08)), midBand: band(Math.floor(h * 0.45), Math.floor(h * 0.55)), bottomBand: band(Math.floor(h * 0.9), h) };
}, shot);
await ctx2.close();
await context.close();
await browser.close();

const dE = (a, b) => { // quick sRGB->OKLab-ish delta via simple Lab on sRGB luminance + rgb distance
    return +Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2).toFixed(2);
};
const res = { rails, grounds, groundDeltaTopVsBottom: dE(grounds.topBand, grounds.bottomBand), groundDeltaTopVsMid: dE(grounds.topBand, grounds.midBand) };
writeFileSync(resolve(OUT, "P3-5-rails.json"), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
