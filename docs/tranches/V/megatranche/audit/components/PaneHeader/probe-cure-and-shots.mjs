// CHALLENGE-D · PaneHeader — (a) isolate the tan(atan2()) fault, (b) prove the
// proposed cure resolves identically cross-engine, (c) capture the terminal stuck
// header on both engines at both bands. READ-ONLY against the live dev server.
import { webkit, chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT =
    "docs/tranches/V/megatranche/audit/components/PaneHeader/shots";
mkdirSync(OUT, { recursive: true });

const arith = (page) =>
    page.evaluate(() => {
        const h = document.querySelector(".pane-header");
        const m = (expr) => {
            const d = document.createElement("div");
            d.style.cssText = `position:absolute;left:-9999px;top:0;height:1px;width:calc(${expr})`;
            h.appendChild(d);
            const w = getComputedStyle(d).width;
            d.remove();
            return w;
        };
        return {
            "SHIPPED  tan(atan2(heading,disp1))*1000px": m(
                "tan(atan2(var(--type-heading), var(--type-display-1))) * 1000px",
            ),
            "CURE     (heading / disp1)*1000px": m(
                "(var(--type-heading) / var(--type-display-1)) * 1000px",
            ),
            "CURE-alt 1000px*heading/disp1": m(
                "1000px * var(--type-heading) / var(--type-display-1)",
            ),
            "ISOLATE  tan(45deg)*1000px": m("tan(45deg) * 1000px"),
            "ISOLATE  tan(atan2(1px,1px))*1000px": m("tan(atan2(1px, 1px)) * 1000px"),
            "ISOLATE  atan2(1px,1px)/1deg*1px": m("atan2(1px, 1px) / 1deg * 1000px"),
        };
    });

for (const [engName, eng] of [
    ["webkit", webkit],
    ["chromium", chromium],
]) {
    const b = await eng.launch();
    for (const [band, vp] of [
        ["desktop1440", { width: 1440, height: 900 }],
        ["phone390", { width: 390, height: 844 }],
    ]) {
        for (const scheme of ["light", "dark"]) {
            const ctx = await b.newContext({ viewport: vp, colorScheme: scheme });
            const page = await ctx.newPage();
            await page.goto("http://localhost:9000/#/gradient", {
                waitUntil: "domcontentloaded",
                timeout: 45000,
            });
            await page.waitForTimeout(2600);
            if (scheme === "light" && band === "desktop1440")
                console.log(engName, band, JSON.stringify(await arith(page), null, 1));
            const pane = page.locator(".pane-scroll-fade").first();
            await pane.screenshot({
                path: `${OUT}/${engName}-${band}-${scheme}-REST.png`,
            });
            await page.evaluate(() => {
                const el = document.querySelector(".pane-scroll-fade");
                const s = document.createElement("div");
                s.style.height = "1200px";
                el.appendChild(s);
                el.scrollTop = 400;
            });
            await page.waitForTimeout(900);
            await pane.screenshot({
                path: `${OUT}/${engName}-${band}-${scheme}-STUCK.png`,
            });
            await ctx.close();
        }
    }
    // RTL stuck, desktop only
    const ctx = await b.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/gradient", {
        waitUntil: "domcontentloaded",
        timeout: 45000,
    });
    await page.waitForTimeout(2600);
    await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    await page.waitForTimeout(500);
    const pane = page.locator(".pane-scroll-fade").first();
    await pane.screenshot({ path: `${OUT}/${engName}-rtl-REST.png` });
    await page.evaluate(() => {
        const el = document.querySelector(".pane-scroll-fade");
        const s = document.createElement("div");
        s.style.height = "1200px";
        el.appendChild(s);
        el.scrollTop = 400;
    });
    await page.waitForTimeout(900);
    await pane.screenshot({ path: `${OUT}/${engName}-rtl-STUCK.png` });
    await ctx.close();
    await b.close();
}
console.log("shots ->", OUT);
