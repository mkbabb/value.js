// CHALLENGE-D probe 2 — Chromium forced-colors + focus-visible telemetry.
import { chromium } from "playwright";
const ORIGIN = "http://127.0.0.1:9000";
const DIR = "docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/";

const READ = () => {
    const t = document.querySelector(".space-trigger");
    if (!t) return { missing: true };
    const cs = getComputedStyle(t);
    const r = t.getBoundingClientRect();
    return {
        active: document.activeElement === t,
        activeEl: document.activeElement && document.activeElement.className.toString().slice(0, 70),
        color: cs.color,
        boxShadow: cs.boxShadow,
        outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
        forcedColorAdjust: cs.forcedColorAdjust,
        textDecorationColor: cs.textDecorationColor,
        rect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
        focusRingToken: getComputedStyle(document.documentElement)
            .getPropertyValue("--focus-ring-shadow")
            .trim(),
        mqForced: matchMedia("(forced-colors: active)").matches,
        mqMono: matchMedia("(monochrome)").matches,
    };
};

const b = await chromium.launch();
for (const forced of [false, true]) {
    const ctx = await b.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "dark",
        deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    if (forced) await page.emulateMedia({ forcedColors: "active" });
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);
    const rest = await page.evaluate(READ);
    // focus the trigger via keyboard so :focus-visible engages
    await page.evaluate(() => {
        const t = document.querySelector(".space-trigger");
        t.setAttribute("data-probe", "1");
    });
    let hops = 0;
    for (; hops < 40; hops++) {
        await page.keyboard.press("Tab");
        const on = await page.evaluate(() => document.activeElement?.hasAttribute("data-probe"));
        if (on) break;
    }
    const focused = await page.evaluate(READ);
    await page.screenshot({ path: DIR + `D-focus-${forced ? "forcedcolors" : "normal"}.png` });
    console.log(JSON.stringify({ forced, tabHops: hops, rest, focused }, null, 1));
    await ctx.close();
}
await b.close();
