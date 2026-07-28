import { webkit } from "playwright";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD-previewstrip";

const measure = () => {
    const chips = [...document.querySelectorAll(".preview-strip")];
    return chips.map((c) => {
        const r = c.getBoundingClientRect();
        const cs = getComputedStyle(c);
        const segs = [...c.querySelectorAll(".preview-strip-segment")].map((s) => {
            const sr = s.getBoundingClientRect();
            const scs = getComputedStyle(s);
            return {
                x: +sr.x.toFixed(2), w: +sr.width.toFixed(3),
                bg: scs.backgroundColor, mask: scs.maskImage,
            };
        });
        return {
            stopCount: (c.getAttribute("data-stops") || "").split("|").filter(Boolean).length,
            rect: { w: +r.width.toFixed(3), h: +r.height.toFixed(3) },
            ratio: +(r.width / r.height).toFixed(4),
            fontSize: cs.fontSize,
            bgOfChip: cs.backgroundColor,
            boxShadow: cs.boxShadow,
            truncated: c.classList.contains("preview-strip--truncated"),
            segCount: segs.length,
            segs,
            dir: cs.direction,
        };
    });
};

async function scenario(name, opts, fn) {
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ deviceScaleFactor: 2, ...opts });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e)));
    try { await fn(page); } catch (e) { console.log(`[${name}] FAILED`, String(e).slice(0, 300)); }
    console.log(`[${name}] pageErrors:`, errs);
    await browser.close();
}

await scenario("truncate-12", { viewport: { width: 1440, height: 900 } }, async (page) => {
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    const slider = page.getByRole("slider", { name: "Color count" });
    await slider.click();
    await page.keyboard.press("End");
    await page.waitForTimeout(400);
    const cnt = await slider.getAttribute("aria-valuenow");
    console.log("\n===== TRUNCATION (count =", cnt, ") =====");
    await page.getByLabel("Generation preset").click();
    await page.waitForTimeout(700);
    const d = await page.evaluate(measure);
    console.log(JSON.stringify(d.slice(0, 2), null, 1));
    console.log("all [stopCount,segCount,truncated]:", JSON.stringify(d.map((x) => [x.stopCount, x.segCount, x.truncated])));
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/truncate12-crop.png` });
});

await scenario("rtl", { viewport: { width: 1440, height: 900 } }, async (page) => {
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    await page.waitForTimeout(1000);
    const slider = page.getByRole("slider", { name: "Color count" });
    await slider.click();
    await page.keyboard.press("End");
    await page.waitForTimeout(400);
    await page.getByLabel("Generation preset").click();
    await page.waitForTimeout(700);
    const d = await page.evaluate(measure);
    console.log("\n===== RTL truncated =====");
    console.log(JSON.stringify(d.slice(0, 1), null, 1));
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/rtl-crop.png` });
});

await scenario("forced-colors", { viewport: { width: 1440, height: 900 }, forcedColors: "active" }, async (page) => {
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    await page.getByLabel("Generation preset").click();
    await page.waitForTimeout(700);
    const d = await page.evaluate(measure);
    console.log("\n===== FORCED COLORS (strip, /generate) =====");
    console.log(JSON.stringify(d.slice(0, 2), null, 1));
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/forced-strip-crop.png` });
    await page.keyboard.press("Escape");
    await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    const addSlot = page.getByRole("button", { name: "Add current color to the mix" });
    await addSlot.click(); await addSlot.click();
    await page.getByRole("combobox", { name: "Color space", exact: true }).click();
    await page.waitForTimeout(700);
    const ramps = await page.evaluate(() => [...document.querySelectorAll(".preview-chip")].map((c) => ({
        cls: c.className,
        bgImage: getComputedStyle(c).backgroundImage.slice(0, 100),
        rect: +c.getBoundingClientRect().width.toFixed(2) + "x" + +c.getBoundingClientRect().height.toFixed(2),
        font: getComputedStyle(c).fontSize,
    })));
    console.log("\n===== FORCED COLORS (ramp, /mix) =====");
    console.log(JSON.stringify(ramps.slice(0, 2), null, 1));
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/forced-ramp-crop.png` });
});

await scenario("atmosphere", { viewport: { width: 1440, height: 900 } }, async (page) => {
    await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "load" });
    await page.waitForTimeout(3000);
    await page.getByLabel("Palette harmony").click();
    await page.waitForTimeout(800);
    const d = await page.evaluate(measure);
    console.log("\n===== ATMOSPHERE harmony strips =====");
    console.log(JSON.stringify(d.slice(0, 2), null, 1));
    console.log("all [stopCount,segCount,trunc,h,ratio]:", JSON.stringify(d.map((x) => [x.stopCount, x.segCount, x.truncated, x.rect.h, x.ratio])));
    const a11y = await page.evaluate(() => {
        const it = document.querySelector('[role="listbox"] [role="option"]');
        return it ? { text: it.textContent, html: it.outerHTML.slice(0, 800) } : null;
    });
    console.log("first option:", JSON.stringify(a11y, null, 1));
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/atmosphere-crop.png` });
});

await scenario("narrow320", { viewport: { width: 320, height: 800 } }, async (page) => {
    await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "load" });
    await page.waitForTimeout(3000);
    await page.getByLabel("Palette harmony").click();
    await page.waitForTimeout(800);
    const d = await page.evaluate(measure);
    console.log("\n===== 320px atmosphere =====");
    console.log(JSON.stringify(d.slice(0, 1), null, 1));
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/atmo320-crop.png` });
});

await scenario("wide2200", { viewport: { width: 2200, height: 900 } }, async (page) => {
    await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "load" });
    await page.waitForTimeout(3000);
    await page.getByLabel("Palette harmony").click();
    await page.waitForTimeout(800);
    const d = await page.evaluate(measure);
    console.log("\n===== 2200px atmosphere =====");
    console.log(JSON.stringify(d.slice(0, 1), null, 1));
});
