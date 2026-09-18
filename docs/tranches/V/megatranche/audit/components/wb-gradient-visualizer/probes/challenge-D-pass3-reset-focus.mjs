// CHALLENGE-D pass 3 — Dock Reset (D-5) + the Direction focus register (read-only).
import { chromium } from "playwright";
import path from "node:path";
const OUT = path.resolve(new URL("../evidence", import.meta.url).pathname);
const log = (t, o) => console.log(`\n### ${t}\n` + JSON.stringify(o, null, 2));
const URL_ = "http://localhost:9000/#/gradient";

const snap = () => ({
    easing: [...document.querySelectorAll("main *")]
        .map((e) => e.childNodes.length === 1 && e.textContent.trim())
        .filter((t) => typeof t === "string" && t.startsWith("cubic-bezier"))[0] ?? null,
    type: document.querySelector('[aria-label="Gradient type"]')?.textContent.trim(),
    dir: document.querySelector("main [role='slider']")?.getAttribute("aria-valuenow"),
    stops: document.querySelectorAll('button[aria-label^="Gradient stop"]').length,
    editor: document.querySelector('[role="textbox"][aria-label="Gradient CSS"]')?.textContent.trim().slice(0, 90),
    tile: getComputedStyle(document.querySelector('[data-testid="gradient-render-tile"]')).backgroundImage.slice(0, 90),
});

const run = async () => {
    const browser = await chromium.launch();
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    await page.goto(URL_, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);

    // ── focus register on the Direction axis ──
    await page.locator("main [role='slider']").first().focus();
    await page.waitForTimeout(200);
    log("focus register — Direction axis", await page.evaluate(() => {
        const th = document.querySelector("main [role='slider']");
        const root = th.closest(".glass-slider") ?? th.parentElement.parentElement;
        const track = root.querySelector("[class*='track']");
        const g = (e) => { const c = getComputedStyle(e); return { cls: String(e.className).slice(0, 50), outline: c.outline, boxShadow: c.boxShadow.slice(0, 110), border: c.border, w: +e.getBoundingClientRect().width.toFixed(1), h: +e.getBoundingClientRect().height.toFixed(1) }; };
        return {
            variantAttr: root.getAttribute("data-variant"),
            thumb: { ...g(th), active: document.activeElement === th },
            track: track ? g(track) : null,
            root: g(root),
            selectTriggerForComparison: g(document.querySelector('[aria-label="Gradient type"]')),
        };
    }));

    // ── keyboard stop removal, real events, at 2 and at 3 stops ──
    await page.locator('button[aria-label^="Gradient stop"]').first().focus();
    await page.keyboard.press("Delete");
    await page.waitForTimeout(300);
    const at2 = await page.evaluate(() => document.querySelectorAll('button[aria-label^="Gradient stop"]').length);
    // add a third then delete
    const rail = await page.evaluate(() => { const s = document.querySelector('button[aria-label^="Gradient stop"]'); const b = s.parentElement.parentElement.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; });
    await page.mouse.click(rail.x + rail.w / 2, rail.y + rail.h / 2);
    await page.waitForTimeout(300);
    const at3 = await page.evaluate(() => document.querySelectorAll('button[aria-label^="Gradient stop"]').length);
    await page.locator('button[aria-label^="Gradient stop"]').nth(1).focus();
    await page.keyboard.press("Delete");
    await page.waitForTimeout(300);
    log("stop removal by keyboard", { afterDeleteWith2: at2, afterRailClick: at3, afterDeleteWith3: await page.evaluate(() => document.querySelectorAll('button[aria-label^="Gradient stop"]').length) });

    // ── D-5: Dock Reset with a non-linear easing pending ──
    await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(800);
    await page.locator("button[aria-label='ease-in-out']").first().click();
    await page.waitForTimeout(400);
    // also move direction + type so we can see what reset does reach
    await page.evaluate(() => { const t = document.querySelector('[aria-label="Gradient type"]'); t.click(); });
    await page.waitForTimeout(300);
    await page.locator("[role='option']", { hasText: "Radial" }).first().click().catch(() => {});
    await page.waitForTimeout(400);
    const before = await page.evaluate(snap);

    let how = "none";
    const resetBtn = page.locator("button[aria-label='Reset'], button:has-text('Reset')").first();
    if (await resetBtn.count()) {
        try { await resetBtn.click({ timeout: 4000 }); how = "direct click"; }
        catch { await page.evaluate(() => [...document.querySelectorAll("button")].find((b) => (b.getAttribute("aria-label") || b.textContent.trim()) === "Reset")?.click()); how = "js click"; }
    }
    await page.waitForTimeout(700);
    log("D-5 · Dock Reset", { how, before, after: await page.evaluate(snap) });
    await page.screenshot({ path: path.join(OUT, "challenge-D-p3-after-reset.png"), clip: { x: 200, y: 180, width: 520, height: 620 } });

    await browser.close();
};
run().catch((e) => { console.error("PROBE FAILED", e); process.exit(1); });
