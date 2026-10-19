// B03 · W — AuroraPane U-6 Safari cells: --control-h-md under --ui-scale on coarse pointers (WebKit, headless).
// Launch ONLY via: guarded --exclusive webkit -- node W-webkit.mjs . One browser, one context per cell.
import { webkit } from "playwright";
import { BASE, save } from "./lib.mjs";

const out = [];
const browser = await webkit.launch();
try {
    for (const cell of [
        { name: "webkit-390-touch", opts: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 } },
        { name: "webkit-1024-touch", opts: { viewport: { width: 1024, height: 1366 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
        { name: "webkit-1440-fine", opts: { viewport: { width: 1440, height: 900 } } },
    ]) {
        const ctx = await browser.newContext(cell.opts);
        try {
            const page = await ctx.newPage();
            await page.goto(BASE + "#/atmosphere", { waitUntil: "load", timeout: 90000 });
            await page.waitForTimeout(2500);
            out.push({ cell: cell.name, ...(await page.evaluate(() => {
                const probe = (v) => { const d = document.createElement("div"); d.style.cssText = `position:absolute;height:${v};width:1px`; document.body.append(d); const h = d.getBoundingClientRect().height; d.remove(); return h; };
                const cs = getComputedStyle(document.documentElement);
                const trig = [...document.querySelectorAll(".pane-shell__card [role=combobox]")].map((t) => +t.getBoundingClientRect().height.toFixed(1));
                return { ua: navigator.userAgent.slice(0, 60), coarse: matchMedia("(pointer: coarse)").matches, anyCoarse: matchMedia("(any-pointer: coarse)").matches, uiScale: cs.getPropertyValue("--ui-scale").trim(), controlHmd: cs.getPropertyValue("--control-h-md").trim(), controlHmdPx: probe("var(--control-h-md)"), controlHsmPx: probe("var(--control-h-sm)"), triggerH: trig };
            })) });
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
save("W-webkit.json", out);
console.log(JSON.stringify(out));
