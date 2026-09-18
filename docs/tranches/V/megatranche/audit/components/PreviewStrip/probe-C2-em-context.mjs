import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const run = async () => {
    const b = await chromium.launch();
    const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".glass-dock", { timeout: 30000 });
    await page.waitForTimeout(2500);
    await page.getByRole("combobox", { name: "Generation preset" }).click();
    await page.waitForSelector('[role="listbox"] .preview-strip');
    await page.waitForTimeout(300);
    const m = await page.locator('[role="listbox"] .preview-strip').first().evaluate((el) => {
        const p = el.parentElement;
        const micro = p.querySelector(".text-micro");
        const r = el.getBoundingClientRect();
        const mr = micro ? micro.getBoundingClientRect() : null;
        return {
            chipFontSize: getComputedStyle(el).fontSize,
            chipH: +r.height.toFixed(2),
            chipW: +r.width.toFixed(2),
            wrapperFontSize: getComputedStyle(p).fontSize,
            microFontSize: micro ? getComputedStyle(micro).fontSize : null,
            microH: mr ? +mr.height.toFixed(2) : null,
            microLineHeight: micro ? getComputedStyle(micro).lineHeight : null,
            nameFontSize: (() => {
                const opt = el.closest('[role="option"]');
                const n = opt && opt.querySelector(".font-display");
                return n ? getComputedStyle(n).fontSize : null;
            })(),
            rootFontSize: getComputedStyle(document.documentElement).fontSize,
        };
    });
    console.log(JSON.stringify(m, null, 1));
    await b.close();
};
run().catch((e) => { console.error("FAIL", e.message); process.exit(1); });
