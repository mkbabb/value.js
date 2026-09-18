import { chromium } from "@playwright/test";

const BASE = "http://localhost:9000";
const out = {};

const dump = () =>
    [...document.querySelectorAll('[role="option"]')].map((o) => {
        const cs = getComputedStyle(o);
        return {
            text: o.innerText.trim().replace(/\n+/g, " | "),
            sel: o.getAttribute("aria-selected"),
            hl: o.getAttribute("data-highlighted"),
            bg: cs.backgroundColor,
            shadow: cs.boxShadow === "none" ? "none" : "RING",
            fw: cs.fontWeight,
        };
    });

const run = async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const warns = [];
    page.on("console", (m) => {
        if (m.type() === "warning" || m.type() === "error") warns.push(`${m.type()}: ${m.text()}`);
    });

    await page.goto(`${BASE}/#/browse`);
    await page.waitForTimeout(3500);
    await page.locator("button.view-select-trigger").focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(600);
    out["E1 open (Browse is current)"] = await page.evaluate(dump);
    // arrow AWAY from the current row twice
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(300);
    out["E2 after 2x ArrowDown — is the CURRENT row still marked?"] =
        await page.evaluate(dump);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // ── F · popup-mutex contention: profile menu open, then view select ──
    out["F0 dock buttons"] = await page.evaluate(() =>
        [...document.querySelectorAll(".glass-dock button")].map(
            (b) => `${b.getAttribute("aria-label") ?? b.innerText.trim().slice(0, 24)}`,
        ),
    );

    out["G console (errors+warnings) during the run"] = warns.slice(0, 12);

    await browser.close();
    console.log(JSON.stringify(out, null, 2));
};

run().catch((e) => {
    console.error(e);
    console.log(JSON.stringify(out, null, 2));
    process.exit(1);
});
