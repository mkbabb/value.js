import { launch, cell, routeWall, gotoBrowse, save } from "./lib.mjs";
const browser = await launch();
try {
    const r = await cell(browser, {}, async (page) => {
        const reqs = [];
        page.on("request", (q) => { if (/palettes/.test(q.url()) && !/\.\w+($|\?)/.test(new URL(q.url()).pathname)) reqs.push(q.method() + " " + q.url()); });
        await routeWall(page);
        await gotoBrowse(page);
        const cards = await page.$$eval('[role="article"]', (els) => els.map((e) => ({ label: e.getAttribute("aria-label"), r: e.getBoundingClientRect().toJSON() })).slice(0, 8));
        const sw0 = await page.$$eval("[data-palette-swatches]", (e) => e.length);
        await page.click('[aria-label="Palette: Probe Five"]');
        await page.waitForTimeout(1200);
        const sw1 = await page.$$eval("[data-palette-swatches]", (els) => els.map((e) => ({ r: e.getBoundingClientRect().toJSON(), btns: [...e.querySelectorAll("button")].map((b) => [b.getAttribute("aria-label"), Math.round(b.getBoundingClientRect().width), Math.round(b.getBoundingClientRect().height)]) })));
        await page.screenshot({ path: "/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/SS8/evidence/B13-card-swatches/recon-1440.png" });
        return { reqs: reqs.slice(0, 6), cards, sw0, sw1, hash: await page.evaluate(() => location.hash) };
    });
    console.log(save("recon.json", r));
    console.log(JSON.stringify(r).slice(0, 3000));
} finally { await browser.close(); }
