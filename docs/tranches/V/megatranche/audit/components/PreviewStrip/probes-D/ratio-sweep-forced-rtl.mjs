import { webkit, chromium } from "playwright";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD-previewstrip";

const measure = () => {
    const chips = [...document.querySelectorAll(".preview-strip")];
    return chips.map((c) => {
        const r = c.getBoundingClientRect();
        const cs = getComputedStyle(c);
        const segs = [...c.querySelectorAll(".preview-strip-segment")].map((s) => {
            const sr = s.getBoundingClientRect();
            const scs = getComputedStyle(s);
            return { x: +sr.x.toFixed(2), w: +sr.width.toFixed(3), bg: scs.backgroundColor, mask: scs.maskImage };
        });
        return {
            stopCount: (c.getAttribute("data-stops") || "").split("|").filter(Boolean).length,
            rect: { w: +r.width.toFixed(3), h: +r.height.toFixed(3) },
            ratio: +(r.width / r.height).toFixed(4),
            fontSize: cs.fontSize, truncated: c.classList.contains("preview-strip--truncated"),
            segCount: segs.length, seg0: segs[0], segLast: segs[segs.length - 1],
            dir: cs.direction, boxShadow: cs.boxShadow,
            forcedAdjust: cs.forcedColorAdjust,
        };
    });
};

async function go(engine, name, opts, fn) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ deviceScaleFactor: 2, ...opts });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(String(e)));
    try { await fn(page); } catch (e) { console.log(`[${name}] FAILED`, String(e).slice(0, 300)); }
    if (errs.length) console.log(`[${name}] pageErrors:`, errs);
    await browser.close();
}

// 1. RTL — the direction chain
await go(webkit, "rtl-chain", { viewport: { width: 1440, height: 900 } }, async (page) => {
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    await page.waitForTimeout(1000);
    await page.getByLabel("Generation preset").click();
    await page.waitForTimeout(700);
    const chain = await page.evaluate(() => {
        const c = document.querySelector(".preview-strip");
        const out = [];
        for (let n = c; n; n = n.parentElement) {
            out.push({ tag: n.tagName, dirAttr: n.getAttribute("dir"), dirComputed: getComputedStyle(n).direction, cls: (n.className || "").toString().slice(0, 60) });
            if (n === document.documentElement) break;
        }
        return { htmlDir: document.documentElement.getAttribute("dir"), bodyDir: getComputedStyle(document.body).direction, chain: out };
    });
    console.log("\n===== RTL DIRECTION CHAIN =====");
    console.log(JSON.stringify(chain, null, 1));
});

// 2. forced-colors on CHROMIUM (webkit does not implement forced-colors)
await go(chromium, "forced-chromium", { viewport: { width: 1440, height: 900 }, forcedColors: "active" }, async (page) => {
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    const supports = await page.evaluate(() => matchMedia("(forced-colors: active)").matches);
    console.log("\n===== CHROMIUM forced-colors active? ", supports);
    await page.getByLabel("Generation preset").click();
    await page.waitForTimeout(700);
    const d = await page.evaluate(measure);
    console.log(JSON.stringify(d.slice(0, 1), null, 1));
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/chromium-forced-strip.png` });
    await page.keyboard.press("Escape");
    await page.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    const addSlot = page.getByRole("button", { name: "Add current color to the mix" });
    await addSlot.click(); await addSlot.click();
    await page.getByRole("combobox", { name: "Color space", exact: true }).click();
    await page.waitForTimeout(700);
    const ramps = await page.evaluate(() => [...document.querySelectorAll(".preview-chip")].map((c) => ({
        cls: (c.className || "").toString(),
        bgImage: getComputedStyle(c).backgroundImage.slice(0, 120),
        bgColor: getComputedStyle(c).backgroundColor,
        rect: +c.getBoundingClientRect().width.toFixed(2) + "x" + +c.getBoundingClientRect().height.toFixed(2),
    })));
    console.log("\n===== CHROMIUM forced-colors RAMP (/mix) =====");
    console.log(JSON.stringify(ramps.slice(0, 2), null, 1));
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/chromium-forced-ramp.png` });
});

// 3. atmosphere
await go(webkit, "atmosphere", { viewport: { width: 1440, height: 900 } }, async (page) => {
    await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "load" });
    await page.waitForTimeout(3000);
    await page.getByLabel("Palette harmony").click();
    await page.waitForTimeout(900);
    const d = await page.evaluate(measure);
    console.log("\n===== ATMOSPHERE harmony strips (1440) =====");
    console.log(JSON.stringify(d.slice(0, 2), null, 1));
    console.log("all [stopCount,segCount,trunc,h,ratio]:", JSON.stringify(d.map((x) => [x.stopCount, x.segCount, x.truncated, x.rect.h, x.ratio])));
    const a11y = await page.evaluate(() => {
        const its = [...document.querySelectorAll('[role="listbox"] [role="option"]')];
        return its.slice(0, 2).map((it) => ({ text: it.textContent, html: it.outerHTML.slice(0, 600) }));
    });
    console.log("options:", JSON.stringify(a11y, null, 1));
    await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/atmosphere-crop.png` });
});

// 4. narrow + wide ratio sweep on atmosphere
for (const w of [320, 390, 768, 1440, 2200]) {
    await go(webkit, `sweep-${w}`, { viewport: { width: w, height: 900 } }, async (page) => {
        await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "load" });
        await page.waitForTimeout(3000);
        await page.getByLabel("Palette harmony").click();
        await page.waitForTimeout(900);
        const d = await page.evaluate(measure);
        const c = d[0];
        console.log(`SWEEP atmosphere w=${w}: font=${c.fontSize} h=${c.rect.h} w=${c.rect.w} ratio=${c.ratio} (phi^2=2.6180, delta=${(100 * (c.ratio - 2.618) / 2.618).toFixed(2)}%)`);
        if (w === 320) await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/atmo320-crop.png` });
    });
}
for (const w of [320, 390, 1440]) {
    await go(webkit, `gsweep-${w}`, { viewport: { width: w, height: 900 } }, async (page) => {
        await page.goto("http://localhost:9000/#/generate", { waitUntil: "load" });
        await page.waitForTimeout(2500);
        await page.getByLabel("Generation preset").click();
        await page.waitForTimeout(700);
        const d = await page.evaluate(measure);
        const c = d[0];
        console.log(`SWEEP generate w=${w}: font=${c.fontSize} h=${c.rect.h} w=${c.rect.w} ratio=${c.ratio} (delta=${(100 * (c.ratio - 2.618) / 2.618).toFixed(2)}%)`);
        if (w === 320) await page.locator('[role="listbox"]').first().screenshot({ path: `${OUT}/gen320-crop.png` });
    });
}
