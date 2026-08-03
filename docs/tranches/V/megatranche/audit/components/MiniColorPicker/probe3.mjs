// CHALLENGE-D probe 3 — which rules paint the readout + the padding override; pixel sampling.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";
const browser = await webkit.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await context.newPage();
await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);
await page.click('button[aria-label="Filters"]');
await page.waitForTimeout(600);
await page.click('button[aria-label^="Open color picker"]');
await page.waitForTimeout(700);

const out = await page.evaluate(() => {
    const canvas = document.querySelector(".sv-canvas");
    const dlg = canvas.closest('[role="dialog"]');
    const ro = dlg.querySelector("span.fira-code");
    const matching = (el, prop) => {
        const hits = [];
        for (const sheet of document.styleSheets) {
            let rules;
            try { rules = sheet.cssRules; } catch { continue; }
            const walk = (rs) => {
                for (const r of rs) {
                    if (r.cssRules) { walk(r.cssRules); continue; }
                    if (!r.selectorText) continue;
                    let m = false;
                    try { m = el.matches(r.selectorText); } catch { continue; }
                    if (m && r.style && r.style.getPropertyValue(prop))
                        hits.push({ sel: r.selectorText.slice(0, 90), val: r.style.getPropertyValue(prop) });
                }
            };
            walk(rules);
        }
        return hits;
    };
    return {
        readoutFontStyleRules: matching(ro, "font-style"),
        readoutClass: ro.className,
        dialogPaddingRules: matching(dlg, "padding").concat(matching(dlg, "padding-inline"), matching(dlg, "padding-block")),
        dialogPaddingComputed: getComputedStyle(dlg).padding,
        railHeightRules: matching(canvas.nextElementSibling, "height"),
    };
});
console.log(JSON.stringify(out, null, 2));
writeFileSync(resolve(HERE, "probe3.json"), JSON.stringify(out, null, 2));
await browser.close();
