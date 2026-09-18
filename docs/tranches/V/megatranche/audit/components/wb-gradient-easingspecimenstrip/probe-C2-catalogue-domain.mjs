import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// ── 1. depth register of the tile ──
const depth = await page.evaluate(() => {
    const t = document.querySelector(".specimen-tile");
    const cs = getComputedStyle(t);
    const card = document.querySelector(".specimen-strip").closest("[class*='rounded-card']");
    return {
        tileBoxShadow: cs.boxShadow,
        tileBackdrop: cs.backdropFilter || cs.webkitBackdropFilter,
        tileScale: cs.scale,
        cardBoxShadow: getComputedStyle(card).boxShadow,
        railBtnShadow: getComputedStyle(document.querySelector(".rail-btn")).boxShadow,
        rampShadow: getComputedStyle(document.querySelector(".h-5.rounded-md")).boxShadow,
    };
});
console.log("=== DEPTH REGISTER ===", JSON.stringify(depth, null, 1));

// ── 2. import the catalogue module through vite /@fs ──
const cat = await page.evaluate(async () => {
    const url = "/@fs/Users/mkbabb/Programming/value.js/demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue.ts";
    try {
        const m = await import(/* @vite-ignore */ url);
        const ids = m.SPECIMEN_TILES.map((t) => t.id);
        return {
            ok: true,
            count: ids.length,
            hasQuart: ids.some((i) => i.includes("quart")),
            hasQuint: ids.some((i) => i.includes("quint")),
            families: m.SPECIMEN_FAMILIES.map((f) => f.family + ":" + f.tiles.length),
            // departed steps interval → which tile presses?
            departedSteps: m.tileIdFor({ mode: "steps", css: "steps(7, jump-both)" }),
            departedStepsName: m.specimenNameFor({ mode: "steps", css: "steps(7, jump-both)" }),
            stepsTileCss: m.SPECIMEN_TILES.find((t) => t.id === "steps").css,
            quartLiteral: m.bezierLiteral([0.895, 0.03, 0.685, 0.22]),
            quartTile: m.tileIdFor({ mode: "bezier", css: "cubic-bezier(0.895, 0.03, 0.685, 0.22)" }),
            quartName: m.specimenNameFor({ mode: "bezier", css: "cubic-bezier(0.895, 0.03, 0.685, 0.22)" }),
            // domain of every tile through its own payload fn
            outOfRange: m.SPECIMEN_TILES.map((t) => {
                const fn = t.payload().fn;
                let lo = Infinity, hi = -Infinity;
                for (let i = 0; i <= 64; i++) { const y = fn(i / 64); lo = Math.min(lo, y); hi = Math.max(hi, y); }
                return { id: t.id, lo: +lo.toFixed(4), hi: +hi.toFixed(4) };
            }).filter((r) => r.lo < 0 || r.hi > 1),
            // arity / domain holes
            shortQuad: m.bezierLiteral([0.1, 0.2]),
            negSteps: m.stepsLiteral(-3, "jump-end"),
            zeroSamples: m.glyphPath((t) => t, 0),
        };
    } catch (e) { return { ok: false, err: String(e) }; }
});
console.log("=== CATALOGUE (module-level truth) ===", JSON.stringify(cat, null, 1));

// ── 3. keep-in-view: three trials of the SELECTION arm ──
const trials = [];
for (let i = 0; i < 3; i++) {
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    const r = await page.evaluate(async () => {
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        const strip = document.querySelector(".specimen-strip");
        const before = strip.scrollLeft;
        const target = strip.querySelector('[data-specimen="step-end"]');
        target.click();
        await wait(1400);
        const pr = strip.getBoundingClientRect();
        const er = strip.querySelector('[data-specimen="step-end"]').getBoundingClientRect();
        return {
            before, after: +strip.scrollLeft.toFixed(0),
            visible: er.left >= pr.left - 1 && er.right <= pr.right + 1,
            readout: document.querySelector(".readout-rail code")?.textContent,
        };
    });
    trials.push(r);
}
console.log("=== KEEP-IN-VIEW (selection arm) x3 ===", JSON.stringify(trials, null, 1));

// ── 4. reveal arm ──
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(2200);
const reveal = await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const strip = document.querySelector(".specimen-strip");
    strip.querySelector('[data-specimen="step-end"]').click();
    await wait(900);
    const head = document.querySelector("button[aria-controls='easing-interval-0']");
    head.click(); await wait(500);      // collapse
    head.click(); await wait(1200);     // reopen
    const s2 = document.querySelector(".specimen-strip");
    const pr = s2.getBoundingClientRect();
    const er = s2.querySelector('[data-specimen="step-end"]').getBoundingClientRect();
    return { scrollLeft: +s2.scrollLeft.toFixed(0), visible: er.left >= pr.left - 1 && er.right <= pr.right + 1 };
});
console.log("=== REVEAL ARM ===", JSON.stringify(reveal, null, 1));

await browser.close();
