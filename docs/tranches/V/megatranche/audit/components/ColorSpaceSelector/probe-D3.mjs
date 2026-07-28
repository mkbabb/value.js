// CHALLENGE-D probe 3 — forced-colors state-delta proof (rest vs focus vs hover)
// and the rest-state text-decoration truth on the cloned SelectValue span.
import { chromium } from "playwright";
const ORIGIN = "http://127.0.0.1:9000";
const DIR = "docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/";

const SPAN = () => {
    const t = document.querySelector(".space-trigger");
    const s = t.querySelector(":scope > span");
    const cs = getComputedStyle(s);
    const tc = getComputedStyle(t);
    return {
        spanDecorationColor: cs.textDecorationColor,
        spanDecorationLine: cs.textDecorationLine,
        spanDecorationThickness: cs.textDecorationThickness,
        triggerColor: tc.color,
        triggerBoxShadow: tc.boxShadow,
        triggerOutlineStyle: tc.outlineStyle,
        triggerDataState: t.getAttribute("data-state"),
    };
};

const b = await chromium.launch();
for (const forced of [true, false]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark", deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    if (forced) await page.emulateMedia({ forcedColors: "active" });
    await page.goto(ORIGIN + "/#/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);
    const tag = forced ? "fc" : "nc";
    const clip = { x: 200, y: 145, width: 200, height: 120 };
    const rest = await page.evaluate(SPAN);
    await page.screenshot({ path: DIR + `D-state-${tag}-rest.png`, clip });
    // hover
    await page.locator(".space-trigger").first().hover();
    await page.waitForTimeout(400);
    const hover = await page.evaluate(SPAN);
    await page.screenshot({ path: DIR + `D-state-${tag}-hover.png`, clip });
    // move away, then keyboard-focus
    await page.mouse.move(1300, 800);
    await page.waitForTimeout(300);
    await page.evaluate(() => document.querySelector(".space-trigger").setAttribute("data-probe", "1"));
    for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Tab");
        if (await page.evaluate(() => document.activeElement?.hasAttribute("data-probe"))) break;
    }
    await page.waitForTimeout(400);
    const focus = await page.evaluate(SPAN);
    await page.screenshot({ path: DIR + `D-state-${tag}-focus.png`, clip });
    console.log(JSON.stringify({ forced, rest, hover, focus }, null, 1));
    await ctx.close();
}
await b.close();
