// SERVED MODEL: claude-opus-5-5 · SS-8 Z2 (2026-10-20 seat) — residual deciders:
// CSS G4/G5 (caption fit + declared specimen form), CSP D-1/G4 (forced-colors focus on a config slider vs an action button),
// CSP D-2 (390: what one tap reaches on #/blob).
// Usage: node probe-final.mjs [cell ...]. One browser per run, one context per cell, closed in finally.
import { launch, cell, boot, save, EVID } from "./lib.mjs";

const want = new Set(process.argv.slice(2));
const on = (n) => want.size === 0 || want.has(n);
const browser = await launch();
const out = [];
try {
    if (on("forms")) out.push(await cell(browser, "css-forms", {}, async (page) => {
        await boot(page, "/", { settle: 4000 });
        await page.locator('.pane-shell [role="combobox"][aria-label="Select color space"]').first().click();
        await page.waitForTimeout(1000);
        return page.evaluate(() => [...document.querySelectorAll('[role="option"][data-space]')].map((r) => {
            const c = r.querySelector(".specimen-caption");
            return { space: r.getAttribute("data-space"), form: c?.getAttribute("data-specimen-form") ?? null, oog: c?.getAttribute("data-out-of-gamut") ?? null,
                text: c?.textContent.trim().slice(0, 48), scrollW: c?.scrollWidth, clientW: c?.clientWidth, overflows: c ? c.scrollWidth > c.clientWidth + 0.5 : null };
        }));
    }));

    if (on("forced")) out.push(await cell(browser, "csp-forced", { forcedColors: "active" }, async (page) => {
        await boot(page, "/blob", { settle: 4500 });
        const r = { forcedMatches: await page.evaluate(() => matchMedia("(forced-colors: active)").matches) };
        const read = () => page.evaluate(() => { const a = document.activeElement; const c = getComputedStyle(a); return { tag: a.tagName, role: a.getAttribute("role"), label: a.getAttribute("aria-label") ?? a.textContent.trim().slice(0, 20), fv: a.matches(":focus-visible"), outline: `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor}`, boxShadow: c.boxShadow.slice(0, 50) }; });
        const s = page.locator(".config-console [role=slider]").first();
        await s.focus(); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(400);
        r.slider = await read();
        const b = page.locator(".config-action-bar button").first();
        await b.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(400);
        r.actionButton = await read();
        await page.screenshot({ path: `${EVID}/csp-forced-1440.png`, clip: { x: 700, y: 80, width: 740, height: 400 } });
        return r;
    }));

    if (on("reach")) out.push(await cell(browser, "csp-390-reach", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, async (page) => {
        await boot(page, "/blob", { settle: 4500 });
        const rendered = () => page.evaluate(() => [...document.querySelectorAll(".config-console [role=slider]")].filter((s) => { const b = s.getBoundingClientRect(); return b.width > 0 && b.height > 0 && b.top < innerHeight && b.bottom > 0; }).length);
        const vis = await page.evaluate(() => [...document.querySelectorAll("button, [role=tab], [role=button]")].filter((b) => { const r = b.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0; }).map((b) => (b.getAttribute("aria-label") ?? b.textContent.trim()).slice(0, 30)));
        const r = { atRest: await rendered(), visibleControls: vis, tries: [] };
        await page.screenshot({ path: `${EVID}/csp-390-rest.png` });
        for (const name of vis.filter((n) => n && !/^(Menu|Login|Tools)$/.test(n)).slice(0, 8)) {
            const b = page.locator(`[aria-label="${name}"]`).first();
            if (!(await b.count())) continue;
            await b.tap().catch(() => {}); await page.waitForTimeout(1500);
            const n = await rendered();
            r.tries.push({ name, renderedAfter: n, href: await page.evaluate(() => location.hash) });
            if (n > 0) { await page.screenshot({ path: `${EVID}/csp-390-after-tap.png` }); break; }
            await page.keyboard.press("Escape"); await page.waitForTimeout(400);
        }
        // the page may simply scroll to it: one-column stack
        await page.evaluate(() => document.querySelector(".config-console")?.scrollIntoView({ block: "center" }));
        await page.waitForTimeout(800);
        r.afterScrollIntoView = await rendered();
        return r;
    }));
    save(`run-final-${[...want].join("+") || "all"}.json`, out);
    console.log(JSON.stringify(out, null, 1).slice(0, 5000));
} finally {
    await browser.close();
}
