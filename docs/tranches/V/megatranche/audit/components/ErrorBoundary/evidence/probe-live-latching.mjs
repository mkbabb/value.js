import { chromium } from "playwright";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const probe = () => ({
    hash: location.hash,
    alertPresent: !!document.querySelector('[role="alert"]'),
    alertText: (document.querySelector('[role="alert"]')?.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 140),
    activeEl: document.activeElement
        ? document.activeElement.tagName +
          "[" + (document.activeElement.getAttribute("role") || "") + "]"
        : null,
    focusInsideAlert: (() => {
        const a = document.querySelector('[role="alert"]');
        return a ? a === document.activeElement || a.contains(document.activeElement) : null;
    })(),
    paneContainer: !!document.querySelector(".pane-container"),
    mainText: (document.querySelector("main.pane-main")?.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 140),
    liveRegions: document.querySelectorAll("[aria-live]").length,
});

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const log = [];
page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") log.push(m.type() + ": " + m.text().slice(0, 180));
});
page.on("pageerror", (e) => log.push("PAGEERROR: " + String(e).slice(0, 180)));

// Baseline: no live region exists before any error.
await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
await page.waitForTimeout(3000);
const state0 = await page.evaluate(probe);

await page.route("**/BrowsePane.vue**", (route) =>
    route.fulfill({
        status: 200,
        contentType: "text/javascript",
        body:
            'export default { name: "InducedThrow", setup() { return () => { throw new Error("INDUCED-AUDIT-THROW"); }; } };',
    }),
);

await page.goto("http://localhost:9000/#/browse", { waitUntil: "load" });
await page.waitForTimeout(4000);
const state1 = await page.evaluate(probe);
await page.screenshot({ path: OUT + "/eb-1-caught.png" });

// Navigate AWAY to a healthy view.
await page.evaluate(() => { location.hash = "#/"; });
await page.waitForTimeout(2500);
const state2 = await page.evaluate(probe);
await page.screenshot({ path: OUT + "/eb-2-after-nav.png" });

await page.evaluate(() => { location.hash = "#/mix"; });
await page.waitForTimeout(2000);
const state3 = await page.evaluate(probe);

// Recovery pressed while parked on a HEALTHY route.
let clicked = false;
try {
    await page.locator('[role="alert"] button').first().click({ timeout: 4000 });
    clicked = true;
} catch (e) {
    log.push("CLICK-FAIL: " + String(e).slice(0, 120));
}
await page.waitForTimeout(2500);
const state4 = await page.evaluate(probe);
await page.screenshot({ path: OUT + "/eb-3-after-retry.png" });

console.log(JSON.stringify({ state0, state1, state2, state3, clicked, state4, log: log.slice(0, 30) }, null, 2));
await browser.close();
