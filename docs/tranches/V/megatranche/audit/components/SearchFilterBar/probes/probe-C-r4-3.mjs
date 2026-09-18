// CHALLENGE-C r4 · probe 3 — CSSOM cascade truth, per-pointermove aria-label
// churn, hover affordance, and the trigger's inert height. NO fixture.
import { chromium } from "playwright";
import fs from "node:fs";
const OUT = new URL("../evidence-r4/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
const log = { engine: "chromium", steps: {} };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

// ---- A. CSSOM: does any rule with a :hover + shadow-cartoon-md exist? ----
log.steps.cssom = await page.evaluate(() => {
    const hits = { cartoonRules: [], hoverCartoon: [], p0Rules: [], pxOverlay: [], h8: [] };
    for (const sheet of [...document.styleSheets]) {
        let rules;
        try { rules = sheet.cssRules; } catch { continue; }
        const walk = (list) => {
            for (const r of list) {
                if (r.cssRules) { walk(r.cssRules); continue; }
                const sel = r.selectorText || "";
                if (/shadow-cartoon-md/.test(sel)) {
                    hits.cartoonRules.push(sel.slice(0, 120));
                    if (/:hover/.test(sel)) hits.hoverCartoon.push(sel.slice(0, 120));
                }
                if (/^\.p-0\b/.test(sel)) hits.p0Rules.push({ sel: sel.slice(0, 80), css: r.style.cssText.slice(0, 120) });
                if (/overlay-pad-(inline|block)/.test(r.style?.cssText || "")) hits.pxOverlay.push({ sel: sel.slice(0, 90), css: r.style.cssText.slice(0, 140) });
                if (/^\.h-8\b/.test(sel)) hits.h8.push({ sel: sel.slice(0, 60), css: r.style.cssText.slice(0, 100) });
            }
        };
        walk(rules);
    }
    return hits;
});

// ---- B. trigger: h-8 vs glass-ui min-height ----
log.steps.trigger = await page.evaluate(() => {
    const b = document.querySelector('button[aria-label="Filters"]');
    const cs = getComputedStyle(b);
    const r = b.getBoundingClientRect();
    return {
        classAttr: b.className,
        rect: { w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
        height: cs.height, minHeight: cs.minHeight, blockSize: cs.blockSize,
        paddingBlock: cs.paddingBlock, paddingInline: cs.paddingInline,
    };
});

await page.locator('button[aria-label="Filters"]').first().click();
await page.waitForTimeout(450);

// ---- C. swatch hover affordance ----
const swatch = page.locator('button[aria-label^="Open color picker"]').first();
const restShadow = await swatch.evaluate((el) => ({ shadow: getComputedStyle(el).boxShadow, transition: getComputedStyle(el).transitionProperty }));
await swatch.hover();
await page.waitForTimeout(400);
const hoverShadow = await swatch.evaluate((el) => getComputedStyle(el).boxShadow);
log.steps.swatchHover = { restShadow, hoverShadow, identical: restShadow.shadow === hoverShadow };

// ---- D. input: truncate on an <input> ----
log.steps.input = await page.evaluate(() => {
    const p = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent.includes("Find by Color"));
    const i = p.querySelector('input[type="text"]');
    const cs = getComputedStyle(i);
    return { textOverflow: cs.textOverflow, whiteSpace: cs.whiteSpace, overflow: cs.overflow, fontFamily: cs.fontFamily.slice(0, 60), paddingRight: cs.paddingRight, width: +i.getBoundingClientRect().width.toFixed(1) };
});

// ---- E. panel padding cascade ----
log.steps.panelPad = await page.evaluate(() => {
    const p = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent.includes("Find by Color"));
    const cs = getComputedStyle(p);
    return { className: p.className.slice(0, 200), padding: cs.padding, width: cs.width, maxHeight: cs.maxHeight, overflowY: cs.overflowY };
});

// ---- F. aria-label churn per pointermove during an SV drag ----
await swatch.click();
await page.waitForTimeout(450);
await page.evaluate(() => {
    window.__churn = { ariaLabel: 0, values: new Set(), inputValue: 0 };
    const b = document.querySelector('button[aria-label^="Open color picker"]');
    new MutationObserver((muts) => {
        for (const m of muts) {
            if (m.attributeName === "aria-label") {
                window.__churn.ariaLabel++;
                window.__churn.values.add(b.getAttribute("aria-label"));
            }
        }
    }).observe(b, { attributes: true, attributeFilter: ["aria-label", "style"] });
    const p = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent.includes("Find by Color"));
    const i = p.querySelector('input[type="text"]');
    i.addEventListener("input", () => window.__churn.inputValue++);
});
const mini = page.locator('[role="dialog"]').filter({ has: page.locator(".sv-canvas") }).first();
const svBox = await mini.locator(".sv-canvas").first().boundingBox();
let moves = 0;
if (svBox) {
    await page.mouse.move(svBox.x + 6, svBox.y + 6);
    await page.mouse.down();
    for (let i = 0; i <= 40; i++) {
        await page.mouse.move(svBox.x + 6 + (svBox.width - 12) * (i / 40), svBox.y + 6 + (svBox.height - 12) * (i / 40));
        moves++;
    }
    await page.mouse.up();
    await page.waitForTimeout(400);
}
log.steps.churn = await page.evaluate(() => ({ ariaLabelMutations: window.__churn.ariaLabel, distinctNames: window.__churn.values.size, sample: [...window.__churn.values].slice(-3) }));
log.steps.churn.pointerMovesIssued = moves;

// ---- G. does the mini picker overlay the field it feeds? ----
log.steps.overlap = await page.evaluate(() => {
    const dialogs = [...document.querySelectorAll('[role="dialog"]')];
    const outer = dialogs.find((d) => d.textContent.includes("Find by Color"));
    const m = dialogs.find((d) => d.querySelector(".sv-canvas"));
    if (!outer || !m) return null;
    const a = outer.getBoundingClientRect(), b = m.getBoundingClientRect();
    const ix = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
    const iy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    const field = outer.querySelector('input[type="text"]').getBoundingClientRect();
    const fieldCovered = !(b.right < field.left || b.left > field.right || b.bottom < field.top || b.top > field.bottom);
    return { outer: { t: +a.top.toFixed(1), b: +a.bottom.toFixed(1) }, mini: { t: +b.top.toFixed(1), b: +b.bottom.toFixed(1) }, overlapArea: +(ix * iy).toFixed(0), fieldCovered };
});

fs.writeFileSync(OUT + "probeC-r4-3.json", JSON.stringify(log, null, 2));
console.log(JSON.stringify(log, null, 2));
await browser.close();
