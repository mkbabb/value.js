// r3 arbiter decider — D2-17 fork: does playwright honor forcedColors:'active'
// in BOTH engines, and is .rail-handle's border actually forced?
// worker-F: "WebKit ignores the emulation" (→ UNVERIFIABLE-HERE).
// worker-O: "both engines report matches===true; border stays authored" (→ REFUTED).
import { chromium, webkit } from "playwright";

for (const [name, engine] of [["chromium", chromium], ["webkit", webkit]]) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ forcedColors: "active", viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    let navErr = null;
    await page.goto("http://localhost:9000/#/gradient", { waitUntil: "domcontentloaded", timeout: 15000 }).catch((e) => { navErr = e.message; });
    await page.waitForTimeout(1200);
    const res = await page.evaluate(() => {
        const h = document.querySelector(".rail-handle");
        const cs = h ? getComputedStyle(h) : null;
        return {
            forcedActiveMatches: matchMedia("(forced-colors: active)").matches,
            handleFound: !!h,
            borderTopColor: cs ? cs.borderTopColor : null,
            forcedColorAdjust: cs ? (cs.forcedColorAdjust || cs.getPropertyValue("forced-color-adjust")) : null,
        };
    }).catch((e) => ({ evalErr: e.message }));
    console.log(name, navErr ? `NAV-ERR ${navErr}` : "", JSON.stringify(res));
    await browser.close();
}
