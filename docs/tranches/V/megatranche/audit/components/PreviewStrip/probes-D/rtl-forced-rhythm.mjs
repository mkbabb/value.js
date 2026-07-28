import { webkit, chromium } from "playwright";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD-previewstrip";

async function go(engine, name, opts, fn) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ deviceScaleFactor: 2, ...opts });
    const page = await ctx.newPage();
    try { await fn(page); } catch (e) { console.log(`[${name}] FAILED`, String(e).slice(0, 300)); }
    await browser.close();
}

// A. RTL — force the popover to honour document direction, then re-measure the mask
await go(webkit, "rtl-forced", { viewport: { width: 1440, height: 900 } }, async (page) => {
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    await page.waitForTimeout(800);
    const slider = page.getByRole("slider", { name: "Color count" });
    await slider.click(); await page.keyboard.press("End"); await page.waitForTimeout(400);
    await page.getByLabel("Generation preset").click();
    await page.waitForTimeout(700);
    // remove the producer's hard dir="ltr" on the popover content
    await page.evaluate(() => {
        document.querySelectorAll('[dir="ltr"]').forEach((n) => n.setAttribute("dir", "rtl"));
    });
    await page.waitForTimeout(400);
    const d = await page.evaluate(() => {
        const c = document.querySelector(".preview-strip");
        const cr = c.getBoundingClientRect();
        const segs = [...c.querySelectorAll(".preview-strip-segment")].map((s, i) => ({
            i, x: +s.getBoundingClientRect().x.toFixed(2),
            mask: getComputedStyle(s).maskImage.slice(0, 60),
        }));
        return { dir: getComputedStyle(c).direction, chipLeft: +cr.x.toFixed(2), chipRight: +(cr.x + cr.width).toFixed(2), segs };
    });
    console.log("\n===== RTL, popover dir honoured =====");
    console.log(JSON.stringify(d, null, 1));
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/rtl-forced-crop.png` });
});

// B. atmosphere row rhythm: Harmony (has chip) vs Arrangement (no chip)
await go(webkit, "atmo-rhythm", { viewport: { width: 1440, height: 900 } }, async (page) => {
    await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "load" });
    await page.waitForTimeout(3000);
    const rowH = async (label) => {
        await page.getByLabel(label).click();
        await page.waitForTimeout(700);
        const h = await page.evaluate(() => {
            const its = [...document.querySelectorAll('[role="listbox"] [role="option"]')];
            return its.slice(0, 3).map((i) => +i.getBoundingClientRect().height.toFixed(2));
        });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
        return h;
    };
    console.log("\n===== ATMOSPHERE option-row heights =====");
    console.log("Palette harmony (chip):", JSON.stringify(await rowH("Palette harmony")));
    console.log("Zone arrangement (no chip):", JSON.stringify(await rowH("Zone arrangement")));
    console.log("Painterly medium (no chip):", JSON.stringify(await rowH("Painterly medium")));
    await page.getByLabel("Palette harmony").click();
    await page.waitForTimeout(700);
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/atmosphere-crop.png` });
});

// C. /mix ramp under forced colors (chromium)
await go(chromium, "forced-ramp", { viewport: { width: 1440, height: 900 }, forcedColors: "active" }, async (page) => {
    await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
    await page.waitForTimeout(3000);
    const btns = await page.evaluate(() => [...document.querySelectorAll("button")].map((b) => b.getAttribute("aria-label") || b.textContent.trim().slice(0, 40)).filter(Boolean).slice(0, 40));
    console.log("\n/mix buttons:", JSON.stringify(btns));
    const combos = await page.evaluate(() => [...document.querySelectorAll('[role="combobox"]')].map((b) => b.getAttribute("aria-label")));
    console.log("/mix comboboxes:", JSON.stringify(combos));
});

// D. 320px screenshots
await go(webkit, "shots320", { viewport: { width: 320, height: 800 } }, async (page) => {
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    await page.getByLabel("Generation preset").click();
    await page.waitForTimeout(700);
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/gen320-crop.png` });
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log("\n320 generate overflowX:", ov);
});

// E. dark-mode desktop crop
await go(webkit, "dark", { viewport: { width: 1440, height: 900 }, colorScheme: "dark" }, async (page) => {
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    await page.getByLabel("Generation preset").click();
    await page.waitForTimeout(700);
    const ring = await page.evaluate(() => {
        const c = document.querySelector(".preview-strip");
        return { boxShadow: getComputedStyle(c).boxShadow, fg: getComputedStyle(document.documentElement).getPropertyValue("--foreground") };
    });
    console.log("\nDARK ring:", JSON.stringify(ring));
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/gen-dark-crop.png` });
});
