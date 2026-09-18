// pass-5 probe B — SCALE. The component is instantiated once per row of a list
// that has no cap. Measure what N copies cost, and whether opening ONE menu
// costs O(N) because the root is left at reka's `modal: true` default.
//
// Attribution is exact, not inferred: Vite dev serves the Vue *dev* build, so
// `app.config.performance = true` makes Vue emit a `performance.measure` for
// every component's render/patch, named after the component. We read the
// `PaletteCardMenu` entries directly.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;
const R = {};
const log = (k, v) => { R[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const seed = (n) => ({
    version: 1,
    palettes: Array.from({ length: n }, (_, i) => ({
        id: `p-${i}`,
        name: `Probe Palette ${i}`,
        slug: `probe-palette-${i}`,
        isLocal: true,
        colors: [{ css: "#ff0000" }, { css: "#00ff00" }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    })),
});

async function run(browser, n) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e)));
    await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), seed(n));

    const t0 = Date.now();
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForSelector("[role='article']");
    const tFirstCard = Date.now() - t0;
    await page.waitForTimeout(700);

    // Turn on Vue's per-component performance measures.
    const perfOn = await page.evaluate(() => {
        const app = document.querySelector("#app")?.__vue_app__
            || document.body.__vue_app__
            || [...document.querySelectorAll("*")].map((e) => e.__vue_app__).find(Boolean);
        if (!app) return false;
        app.config.performance = true;
        return true;
    });

    const census = await page.evaluate(() => ({
        cards: document.querySelectorAll("[role='article']").length,
        triggers: document.querySelectorAll("button[aria-label='Palette menu']").length,
        nodes: document.querySelectorAll("*").length,
        heapMB: performance.memory ? +(performance.memory.usedJSHeapSize / 1048576).toFixed(1) : null,
    }));

    // ── one reactive tick that touches the whole list: type one char in search.
    await page.evaluate(() => performance.clearMeasures());
    const tick = await page.evaluate(async () => {
        const input = [...document.querySelectorAll("input")]
            .find((i) => /search your palettes/i.test(i.placeholder || ""));
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
        const t = performance.now();
        setter.call(input, "Probe");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        return +(performance.now() - t).toFixed(2);
    });
    const measures = await page.evaluate(() => {
        const ms = performance.getEntriesByType("measure");
        const agg = {};
        for (const m of ms) {
            const key = m.name.replace(/ \d+$/, "");
            agg[key] = agg[key] || { count: 0, total: 0 };
            agg[key].count++;
            agg[key].total += m.duration;
        }
        for (const k in agg) agg[k].total = +agg[k].total.toFixed(2);
        const pcm = Object.entries(agg).filter(([k]) => /PaletteCardMenu/i.test(k));
        const card = Object.entries(agg).filter(([k]) => /^<PaletteCard>/i.test(k));
        return { totalMeasures: ms.length, pcm, card, top: Object.entries(agg).sort((a, b) => b[1].total - a[1].total).slice(0, 8) };
    });

    // ── open ONE menu; time it, and count what reka's modal layer touches.
    await page.evaluate(() => performance.clearMeasures());
    const openTimings = [];
    for (let k = 0; k < 5; k++) {
        const t = await page.evaluate(async () => {
            const btn = document.querySelector("button[aria-label='Palette menu']");
            const t0 = performance.now();
            btn.click();
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            let waited = 0;
            while (!document.querySelector("[role='menu']") && waited < 2000) {
                await new Promise((r) => setTimeout(r, 4)); waited += 4;
            }
            const dt = performance.now() - t0;
            return {
                openMs: +dt.toFixed(2),
                ariaHidden: document.querySelectorAll("[aria-hidden='true'][data-aria-hidden]").length,
                ariaHiddenAny: document.querySelectorAll("[aria-hidden='true']").length,
                bodyPE: getComputedStyle(document.body).pointerEvents,
            };
        });
        openTimings.push(t);
        await page.keyboard.press("Escape");
        await page.waitForTimeout(180);
    }

    const openMeasures = await page.evaluate(() => {
        const ms = performance.getEntriesByType("measure");
        const agg = {};
        for (const m of ms) {
            const key = m.name.replace(/ \d+$/, "");
            agg[key] = agg[key] || { count: 0, total: 0 };
            agg[key].count++; agg[key].total += m.duration;
        }
        for (const k in agg) agg[k].total = +agg[k].total.toFixed(2);
        return Object.entries(agg).sort((a, b) => b[1].total - a[1].total).slice(0, 6);
    });

    await page.screenshot({ path: OUT + `pass5-scale-${n}.png` });
    await ctx.close();
    return { n, tFirstCard, perfOn, census, tickMs: tick, measures, openTimings, openMeasures, errs };
}

(async () => {
    const browser = await chromium.launch();
    for (const n of [8, 60, 200]) {
        log(`N${n}`, await run(browser, n));
    }
    await browser.close();
    writeFileSync(OUT + "pcm-p5-b-results.json", JSON.stringify(R, null, 2));
})();
