// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — w12-dock :358 diagnosis: the dock's tab order around the view
// trigger and the Tools seat (headless, closes).
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "dark", deviceScaleFactor: 2 });
    await page.goto(base + "/");
    await page.waitForSelector(".glass-dock");
    await page.waitForTimeout(2000);
    const who = () => page.evaluate(() => { const a = document.activeElement; return a ? `${a.tagName.toLowerCase()} ${(a.getAttribute("aria-label") ?? a.textContent ?? "").trim().slice(0, 30)} .${[...a.classList].slice(0, 3).join(".")} tabindex=${a.getAttribute("tabindex")} fv=${a.matches(":focus-visible")}` : "none"; });
    const seats = await page.evaluate(() => [...document.querySelectorAll(".glass-dock button, .glass-dock [role=combobox]")].map((e) => `${(e.getAttribute("aria-label") ?? e.textContent ?? "").trim().slice(0, 24)} ti=${e.getAttribute("tabindex")}`));
    console.log("seats:", seats.join(" | "));
    const trigger = page.locator(".glass-dock .view-select-trigger");
    if (process.argv[3] === "w12") {
        // w12-dock :358's own sequence before its focus-visible frame.
        await page.mouse.move(2, 2); await page.waitForTimeout(500);
        await trigger.hover(); await page.waitForTimeout(600);
        await page.mouse.move(2, 2);
        await trigger.click(); await page.waitForTimeout(600);
        console.log("after open:", await who());
        await page.keyboard.press("Escape"); await page.waitForTimeout(400);
        console.log("after escape:", await who());
    }
    await page.locator(".glass-dock button[aria-label='Toggle action bar']").focus();
    console.log("focus tools:", await who());
    await page.keyboard.press("Shift+Tab");
    await page.waitForTimeout(300);
    console.log("shift+tab:", await who());
    await page.keyboard.press("Shift+Tab");
    console.log("shift+tab 2:", await who());
} finally {
    await browser.close();
}
