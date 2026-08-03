import { webkit } from "playwright";
const ORIGIN = "http://localhost:9000";
const browser = await webkit.launch();
const out = {};

// ---- reduced-motion cascade ----
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    out.reducedMotion = await page.evaluate(() => {
        const icon = document.querySelector('button[title="Upload image"] svg');
        const s = getComputedStyle(icon);
        // find every rule that sets transition-duration on this element
        const hits = [];
        for (const sheet of document.styleSheets) {
            let rules;
            try { rules = sheet.cssRules; } catch { continue; }
            const walk = (rs, media) => {
                for (const r of rs) {
                    if (r.cssRules) { walk(r.cssRules, r.conditionText || r.media?.mediaText || media); continue; }
                    if (!r.selectorText || !r.style) continue;
                    const td = r.style.getPropertyValue("transition-duration");
                    const tp = r.style.getPropertyValue("transition-property");
                    if (!td && !tp) continue;
                    let m = false;
                    try { m = icon.matches(r.selectorText); } catch { }
                    if (m) hits.push({ sel: r.selectorText.slice(0, 90), media, td, tdImp: r.style.getPropertyPriority("transition-duration"), tp: tp.slice(0, 60), href: (sheet.href || "inline").split("/").pop() });
                }
            };
            walk(rules, null);
        }
        return {
            computedDuration: s.transitionDuration,
            computedProperty: s.transitionProperty,
            matchingRules: hits,
        };
    });
    await ctx.close();
}

// ---- focus visibility ----
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/extract`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    const read = async (sel, name) => {
        await page.evaluate((s) => document.querySelector(s)?.focus(), sel);
        await page.waitForTimeout(200);
        return await page.evaluate((s) => {
            const e = document.querySelector(s);
            if (!e) return null;
            const c = getComputedStyle(e);
            return {
                focused: document.activeElement === e,
                outlineWidth: c.outlineWidth, outlineStyle: c.outlineStyle, outlineColor: c.outlineColor,
                outlineOffset: c.outlineOffset, boxShadow: c.boxShadow.slice(0, 120),
                matchesFocusVisible: (() => { try { return e.matches(":focus-visible"); } catch { return "n/a"; } })(),
            };
        }, sel);
    };
    out.focus = {
        kThumb: await read('[role="slider"][aria-label="Number of colors"]'),
        kcThumb: await read('[role="slider"][aria-label="Chroma weight"]'),
        upload: await read('button[title="Upload image"]'),
    };
    // keyboard-driven focus (real Tab) for :focus-visible truth
    await page.evaluate(() => document.querySelector('button[title="Upload image"]')?.blur());
    await page.keyboard.press("Tab");
    out.tabOrderFirst = await page.evaluate(() => {
        const a = document.activeElement;
        return { tag: a.tagName, label: a.getAttribute("aria-label") || a.getAttribute("title") || a.textContent.trim().slice(0, 40) };
    });
    await ctx.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
