import { webkit } from "playwright";
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push("pageerror:" + String(e).slice(0, 80)));
page.on("console", (m) => { if (m.type() === "error" && !/MISCONFIGURED/.test(m.text())) errs.push("console:" + m.text().slice(0, 80)); });
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForTimeout(3500);
await page.evaluate(() => document.querySelector('button[aria-label="Author a custom curve"]')?.click());
await page.waitForTimeout(700);

const snap = (step) =>
    page.evaluate((step) => {
        const main = document.querySelector("main");
        const h = document.querySelectorAll(".easing-authoring circle[role='slider']")[1];
        return {
            step,
            handleAlive: !!h,
            valuetext: h?.getAttribute("aria-valuetext") ?? null,
            literal: document.querySelector("#easing-interval-0 code")?.textContent?.trim() ?? "(gone)",
            mainLen: (main?.innerText || "").length,
            tiles: document.querySelectorAll("[data-specimen]").length,
            boundary: /unexpected error/i.test(main?.innerText || ""),
            activeEl: document.activeElement ? document.activeElement.tagName + "." + (document.activeElement.getAttribute("class") || "").slice(0, 30) : null,
            liveRegions: [...document.querySelectorAll("[aria-live],[role='alert'],[role='status']")].map((n) => (n.textContent || "").trim().slice(0, 50)).filter(Boolean),
        };
    }, step);

const out = [await snap("start")];
for (let i = 1; i <= 2; i++) {
    await page.evaluate(() => {
        const h = document.querySelectorAll(".easing-authoring circle[role='slider']")[1];
        h?.focus();
        h?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", shiftKey: true, bubbles: true, cancelable: true }));
    });
    await page.waitForTimeout(500);
    out.push(await snap(`shift+ArrowUp #${i}`));
}
await page.screenshot({ path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/s4-crash.png" });
console.log(JSON.stringify({ steps: out, errs }, null, 2));
await browser.close();
