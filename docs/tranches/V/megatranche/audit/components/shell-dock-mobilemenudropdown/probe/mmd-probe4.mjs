// mmd-probe4 — the breakpoint orphan, in pictures + focus truth; plus the
// startSlugEdit hand-off and the dock keep-open hold.
import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

await page.locator('[aria-label="Menu"]').tap();
await page.waitForTimeout(400);
await page.screenshot({ path: new URL("./orphan-1-mobile-open.png", import.meta.url).pathname });

await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForTimeout(800);
await page.screenshot({ path: new URL("./orphan-2-after-resize-1440.png", import.meta.url).pathname });

const state = await page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    const r = menu?.getBoundingClientRect();
    return {
        menuRect: r ? [Math.round(r.width), Math.round(r.height), Math.round(r.x), Math.round(r.y)] : null,
        menuDataState: menu?.getAttribute("data-state"),
        desktopProfileTriggerVisible: !!document.querySelector('[data-o18="profile-trigger"]')
            && getComputedStyle(document.querySelector('[data-o18="profile-trigger"]').parentElement).display !== "none",
        hiddenTriggerWrapper: getComputedStyle(document.querySelector('[aria-label="Menu"]').parentElement).display,
    };
});
console.log("ORPHAN STATE =", JSON.stringify(state));

await page.keyboard.press("Escape");
for (const t of [50, 200, 600, 1200]) {
    await page.waitForTimeout(t === 50 ? 50 : t - (t === 200 ? 50 : t === 600 ? 200 : 600));
    const s = await page.evaluate(() => {
        const a = document.activeElement;
        return {
            menuPresent: !!document.querySelector('[role="menu"]'),
            active: a ? `${a.tagName}.${(a.className || "").toString().slice(0, 36)}` : null,
            isBody: a === document.body,
            connected: a ? a.isConnected : null,
        };
    });
    console.log(`  t+${t}ms:`, JSON.stringify(s));
}

// ── the slug-edit hand-off, at mobile ───────────────────────────────────────
await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.locator('[aria-label="Menu"]').tap();
await page.waitForTimeout(400);
await page.locator('[role="menuitem"]', { hasText: "Login" }).first().click();
for (const t of [100, 400, 900]) {
    await page.waitForTimeout(t === 100 ? 100 : 300 * (t === 400 ? 1 : 5 / 3));
    const s = await page.evaluate(() => {
        const a = document.activeElement;
        return {
            active: a ? `${a.tagName}${a.getAttribute("aria-label") ? `[${a.getAttribute("aria-label")}]` : ""}.${(a.className || "").toString().slice(0, 30)}` : null,
            slugInput: !!document.querySelector('input[placeholder*="slug" i], input[aria-label*="slug" i]'),
            layerActive: document.querySelector('[data-active-layer]')?.getAttribute("data-active-layer") ?? null,
            visibleInputs: [...document.querySelectorAll("input")].filter((i) => i.offsetParent !== null).map((i) => i.getAttribute("aria-label") || i.placeholder || i.type),
        };
    });
    console.log(`  slugEdit t+${t}ms:`, JSON.stringify(s));
}

await browser.close();
