import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";

const openCost = async (page) => {
    await page.evaluate(() => {
        window.__lt = [];
        if (window.__obs) window.__obs.disconnect();
        window.__obs = new PerformanceObserver((l) => {
            for (const e of l.getEntries()) window.__lt.push(+e.duration.toFixed(1));
        });
        window.__obs.observe({ entryTypes: ["longtask"] });
        window.__t0 = performance.now();
    });
    await page.getByRole("combobox", { name: "Generation preset" }).click();
    await page.waitForSelector('[role="listbox"] .preview-strip');
    const t = await page.evaluate(() => ({
        clickToStrip: +(performance.now() - window.__t0).toFixed(1),
        longtasks: window.__lt.slice(),
    }));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(350);
    return t;
};

const run = async () => {
    const b = await chromium.launch();
    const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".glass-dock", { timeout: 30000 });
    await page.waitForTimeout(2500);

    const slider = page.getByRole("slider", { name: "Color count" }).first();
    await slider.focus();
    await page.keyboard.press("Home");
    await page.waitForTimeout(300);
    const c1 = [];
    for (let i = 0; i < 4; i++) c1.push(await openCost(page));

    await slider.focus();
    await page.keyboard.press("End");
    await page.waitForTimeout(300);
    const c12 = [];
    for (let i = 0; i < 4; i++) c12.push(await openCost(page));

    // Raw cost of the 10 truth-function calls one open performs, timed in-page
    // via the plate's own re-render: step the count slider 1..12 and back and
    // measure the main-thread longtasks (menu CLOSED, so no chip work).
    await slider.focus();
    await page.evaluate(() => {
        window.__lt2 = [];
        new PerformanceObserver((l) => {
            for (const e of l.getEntries()) window.__lt2.push(+e.duration.toFixed(1));
        }).observe({ entryTypes: ["longtask"] });
        window.__t1 = performance.now();
    });
    for (let i = 0; i < 11; i++) await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(500);
    const sliderClosed = await page.evaluate(() => ({
        elapsed: +(performance.now() - window.__t1).toFixed(1),
        longtasks: window.__lt2.slice(),
    }));

    console.log(
        JSON.stringify({ count1: c1, count12: c12, sliderStepMenuClosed: sliderClosed }, null, 1),
    );
    await b.close();
};
run().catch((e) => { console.error("FAIL", e.message); process.exit(1); });
