// CHALLENGE-C r4 · probe 4 — the field's own overflow contract + a mobile
// re-confirmation at the repo's certified matrix. NO fixture.
import { chromium, devices } from "playwright";
import fs from "node:fs";
const OUT = new URL("../evidence-r4/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
const log = { engine: "chromium", steps: {} };

const browser = await chromium.launch();

// ---------------- A. desktop: the field cannot show what you type ----------
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    await page.locator('button[aria-label="Filters"]').first().click();
    await page.waitForTimeout(450);
    const panel = page.locator('[role="dialog"]').filter({ hasText: "Find by Color" }).first();
    const field = panel.locator('input[type="text"]');

    const long = "oklch(0.7043 0.1889 25.331 / 0.85)";
    await field.click();
    await field.fill(long);
    await page.keyboard.press("End");
    await page.waitForTimeout(250);
    log.steps.fieldOverflow = await field.evaluate((i) => {
        const cs = getComputedStyle(i);
        return {
            value: i.value,
            valueLen: i.value.length,
            clientWidth: i.clientWidth,
            scrollWidth: i.scrollWidth,
            scrollLeft: i.scrollLeft,
            selectionStart: i.selectionStart,
            contentBoxWidth: i.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
            overflow: cs.overflow,
            textOverflow: cs.textOverflow,
            paddingRight: cs.paddingRight,
            caretCanReachEnd: i.scrollLeft > 0 || i.scrollWidth <= i.clientWidth,
        };
    });
    await page.screenshot({ path: OUT + "C-r4-field-overflow-desktop.png", clip: await panel.boundingBox() });

    // Home key: can the user see the start again?
    await page.keyboard.press("Home");
    await page.waitForTimeout(200);
    log.steps.fieldOverflowHome = await field.evaluate((i) => ({ scrollLeft: i.scrollLeft }));
    await ctx.close();
}

// ---------------- B. mobile: independent re-confirmation of the trap -------
{
    const ctx = await browser.newContext({ ...devices["iPhone 14"] });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
    await page.waitForTimeout(2600);
    const trig = page.locator('button[aria-label="Filters"]').first();
    log.steps.mobileTriggerVisible = await trig.count();
    if (await trig.count()) {
        await trig.click();
        await page.waitForTimeout(600);
        log.steps.mobile = await page.evaluate(() => {
            const p = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent.includes("Find by Color"));
            if (!p) return { present: false, dialogs: document.querySelectorAll('[role="dialog"]').length };
            const r = p.getBoundingClientRect();
            const cs = getComputedStyle(p);
            const field = p.querySelector('input[type="text"]')?.getBoundingClientRect();
            const searchBtn = [...p.querySelectorAll("button")].find((b) => b.textContent.trim() === "Search")?.getBoundingClientRect();
            const wrapper = p.closest("[data-reka-popper-content-wrapper]") ?? p.parentElement;
            return {
                present: true,
                viewport: { w: window.innerWidth, h: window.innerHeight },
                panel: { top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1), h: +r.height.toFixed(1), w: +r.width.toFixed(1) },
                maxHeight: cs.maxHeight,
                overflowY: cs.overflowY,
                availableHeight: wrapper ? getComputedStyle(wrapper).getPropertyValue("--reka-popper-available-height") : null,
                fieldBottom: field ? +field.bottom.toFixed(1) : null,
                fieldBelowFold: field ? field.bottom > window.innerHeight : null,
                searchBtnBottom: searchBtn ? +searchBtn.bottom.toFixed(1) : null,
                searchBelowFold: searchBtn ? searchBtn.top > window.innerHeight : null,
                pxBelowFold: +(r.bottom - window.innerHeight).toFixed(1),
            };
        });
        await page.screenshot({ path: OUT + "C-r4-mobile-390.png" });
        // can the Search button actually be clicked?
        try {
            await page.locator('[role="dialog"] button', { hasText: /^Search$/ }).first().click({ timeout: 4000 });
            log.steps.mobileSearchClickable = true;
        } catch (e) {
            log.steps.mobileSearchClickable = false;
            log.steps.mobileSearchClickError = String(e).split("\n")[0].slice(0, 160);
        }
    }
    await ctx.close();
}

fs.writeFileSync(OUT + "probeC-r4-4.json", JSON.stringify(log, null, 2));
console.log(JSON.stringify(log, null, 2));
await browser.close();
