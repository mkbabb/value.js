import { chromium } from "playwright";
const URL = "http://localhost:9000/#/atmosphere";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const clipProbe = () => {
    const out = [];
    document.querySelectorAll(".aurora-row").forEach((row) => {
        const lab = row.querySelector(".aurora-row-label")?.textContent.trim();
        const trig = row.querySelector("[role='combobox']");
        // every descendant of the trigger that carries the value text
        const spans = Array.from(trig.querySelectorAll("*")).filter((e) => e.children.length === 0 && e.textContent.trim());
        out.push({
            lab,
            trigW: +trig.getBoundingClientRect().width.toFixed(2),
            parts: spans.map((s) => ({
                text: s.textContent.trim().slice(0, 24),
                cw: s.clientWidth,
                sw: s.scrollWidth,
                overflow: getComputedStyle(s).overflow,
                textOverflow: getComputedStyle(s).textOverflow,
                fontStyle: getComputedStyle(s).fontStyle,
                rect: (() => { const r = s.getBoundingClientRect(); return { x: +r.x.toFixed(1), w: +r.width.toFixed(2) }; })(),
            })),
        });
    });
    return out;
};

const run = async () => {
    const browser = await chromium.launch();
    const res = {};
    for (const [name, opts] of [
        ["w1440", { viewport: { width: 1440, height: 900 } }],
        ["w720dpr2", { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 }],
    ]) {
        const ctx = await browser.newContext(opts);
        const page = await ctx.newPage();
        await page.goto(URL, { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        res[name] = await page.evaluate(clipProbe);
        await ctx.close();
    }
    // focus vs selection inside the open menu
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        await page.goto(URL, { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        // keyboard focus on the trigger itself
        await page.keyboard.press("Tab");
        for (let i = 0; i < 24; i++) {
            const a = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") || "");
            if (a === "Palette harmony") break;
            await page.keyboard.press("Tab");
        }
        res.triggerFocus = await page.evaluate(() => {
            const e = document.activeElement;
            const c = getComputedStyle(e);
            return { aria: e.getAttribute("aria-label"), outline: c.outline, outlineOffset: c.outlineOffset, boxShadow: c.boxShadow.slice(0, 120) };
        });
        await page.screenshot({ path: `${OUT}/D-probe-focus-trigger.png`, clip: { x: 199, y: 240, width: 1042, height: 220 } });
        await page.keyboard.press("Enter");
        await page.waitForTimeout(600);
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("ArrowDown");
        await page.waitForTimeout(400);
        res.menuFocus = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll("[role='option']"));
            return items.map((i) => {
                const c = getComputedStyle(i);
                return { t: i.textContent.trim().slice(0, 22), sel: i.getAttribute("aria-selected"), hl: i.getAttribute("data-highlighted"), outline: c.outline, bg: c.backgroundColor, bs: c.boxShadow.slice(0, 60) };
            });
        });
        await page.screenshot({ path: `${OUT}/D-probe-menu-keyboard.png` });
        await ctx.close();
    }
    console.log(JSON.stringify(res, null, 1));
    await browser.close();
};
run();
