// CHALLENGE-C r3 · probe C8 — THE TRAP, reproduced with NO fixture at all.
// Production state today has zero tags, so r2's C-3 needed a tag fixture. This
// probe uses none: a bare mobile viewport, one Search activation on the EMPTY
// field, and then asks whether the user can reach the only control that undoes it.
import { chromium, devices } from "playwright";
import { writeFileSync } from "node:fs";

const EV = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence";
const ORIGIN = "http://localhost:9000";
const out = {};

const browser = await chromium.launch();
for (const vp of [
    { name: "mobile-390x664", width: 390, height: 664 },
    { name: "mobile-390x844", width: 390, height: 844 },
    { name: "laptop-1440x800", width: 1440, height: 800 },
]) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto(ORIGIN + "/#/browse", { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2200);
    await page.locator('button[aria-label="Filters"]').click();
    await page.waitForTimeout(800);

    const before = await page.evaluate(() => {
        const c = document.querySelector("[data-reka-popper-content-wrapper]")?.firstElementChild;
        const r = c?.getBoundingClientRect();
        return { h: r ? +r.height.toFixed(1) : null, bottom: r ? +r.bottom.toFixed(1) : null, vh: innerHeight };
    });

    // ONE activation of Search on the EMPTY field — the boundary input.
    const searchBtn = page.locator("button", { hasText: /^Search$/ }).first();
    let searchClicked = true;
    try {
        await searchBtn.click({ timeout: 4000 });
    } catch (e) {
        searchClicked = false;
        out[`${vp.name}_searchClickError`] = String(e).split("\n").slice(0, 3).join(" | ");
    }
    await page.waitForTimeout(700);

    const state = await page.evaluate(() => {
        const wrap = document.querySelector("[data-reka-popper-content-wrapper]");
        const c = wrap?.firstElementChild;
        const trig = document.querySelector('button[aria-label="Filters"]');
        const clear = c ? [...c.querySelectorAll("button")].find((b) => /Clear all/i.test(b.textContent)) : null;
        const cr = clear?.getBoundingClientRect();
        const r = c?.getBoundingClientRect();
        const cs = c ? getComputedStyle(c) : null;
        return {
            badge: trig?.querySelector("span")?.textContent.trim() ?? "",
            panel: r ? { top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1), h: +r.height.toFixed(1) } : null,
            maxHeight: cs?.maxHeight,
            overflowY: cs?.overflowY,
            scrollable: c ? c.scrollHeight > c.clientHeight + 1 : null,
            availableHeight: wrap ? getComputedStyle(wrap).getPropertyValue("--reka-popper-available-height").trim() : "",
            clearPresent: !!clear,
            clearRect: cr ? { top: +cr.top.toFixed(1), bottom: +cr.bottom.toFixed(1), h: +cr.height.toFixed(1) } : null,
            clearFullyOffscreen: cr ? cr.top >= innerHeight : null,
            viewport: { w: innerWidth, h: innerHeight },
            // is any part of the "Find by Color" section on screen?
            findByColorVisible: (() => {
                const lbl = [...(c?.querySelectorAll("div") ?? [])].find((d) => d.textContent.trim() === "Find by Color");
                if (!lbl) return null;
                const lr = lbl.getBoundingClientRect();
                return lr.bottom <= innerHeight && lr.top >= 0;
            })(),
        };
    });

    // can a REAL pointer reach "Clear all filters"?
    let clearClick = "n/a";
    if (state.clearPresent) {
        try {
            await page.locator("button", { hasText: /Clear all filters/ }).first().click({ timeout: 6000 });
            clearClick = "clicked";
        } catch (e) {
            clearClick = String(e).split("\n").find((l) => /outside of the viewport|Timeout|intercepts/.test(l)) ?? "failed";
        }
    }

    out[vp.name] = { before, searchClicked, ...state, clearClick };
    await page.screenshot({ path: `${EV}/C-r3-trap-${vp.name}.png` });
    await context.close();
}

writeFileSync(`${EV}/probeC8-r3.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
