import { chromium } from "playwright";

const SEED = {
    version: 1,
    palettes: [
        {
            id: "11111111-2222-3333-4444-555555555555",
            name: "Probe Saved Palette",
            slug: "probe-saved-palette-abcd1234",
            colors: [
                { css: "#ff0000", position: 0 },
                { css: "#00ff00", position: 1 },
                { css: "#0000ff", position: 2 },
            ],
            createdAt: "2026-07-01T00:00:00.000Z",
            updatedAt: "2026-07-01T00:00:00.000Z",
            isLocal: true,
        },
    ],
};

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ hasTouch: true, viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR " + e.message));

await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.evaluate((seed) => {
    localStorage.setItem("color-palettes", JSON.stringify(seed));
}, SEED);
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);

const trigger = page.getByRole("button", { name: "Palette menu" }).first();
await trigger.waitFor({ state: "visible", timeout: 15000 });
console.log("TRIGGER box:", JSON.stringify(await trigger.boundingBox()));

// Open the menu with a JS click (no hover), like a touch tap.
await trigger.evaluate((el) => el.click());
await page.waitForTimeout(500);

const items = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('[data-slot="dropdown-menu-item"],[data-slot="dropdown-menu-sub-trigger"]').forEach((el) => {
        const r = el.getBoundingClientRect();
        out.push({
            slot: el.getAttribute("data-slot"),
            text: (el.textContent || "").trim().replace(/\s+/g, " "),
            w: Math.round(r.width),
            h: Math.round(r.height),
            role: el.getAttribute("role"),
            ariaDisabled: el.getAttribute("aria-disabled"),
            dataDisabled: el.getAttribute("data-disabled"),
            pointerEvents: getComputedStyle(el).pointerEvents,
        });
    });
    return out;
});
console.log("ITEMS:", JSON.stringify(items, null, 1));

// ---- decisive probe: open the Export submenu with a pure click (no mouse hover) ----
const subState = await page.evaluate(async () => {
    const sub = document.querySelector('[data-slot="dropdown-menu-sub-trigger"]');
    if (!sub) return { error: "no sub-trigger" };
    const snap = () => ({
        ariaExpanded: sub.getAttribute("aria-expanded"),
        dataState: sub.getAttribute("data-state"),
        subContentInDom: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
    });
    const before = snap();
    const opts = { bubbles: true, cancelable: true, composed: true, pointerType: "touch", isPrimary: true };
    sub.dispatchEvent(new PointerEvent("pointerdown", opts));
    sub.dispatchEvent(new PointerEvent("pointerup", opts));
    const clickEvt = new MouseEvent("click", { bubbles: true, cancelable: true, composed: true });
    sub.dispatchEvent(clickEvt);
    await new Promise((r) => setTimeout(r, 600));
    return { before, after: snap(), clickDefaultPrevented: clickEvt.defaultPrevented };
});
console.log("SUBMENU touch-click:", JSON.stringify(subState, null, 1));

// Control: real touchscreen tap through the CDP input pipeline.
try {
    const box = await page.locator('[data-slot="dropdown-menu-sub-trigger"]').boundingBox();
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(700);
    const afterTap = await page.evaluate(() => ({
        ariaExpanded: document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')?.getAttribute("aria-expanded"),
        subContentInDom: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
        menuStillOpen: !!document.querySelector('[data-slot="dropdown-menu-content"]'),
    }));
    console.log("SUBMENU real-touch-tap:", JSON.stringify(afterTap));
} catch (e) {
    console.log("tap failed:", e.message);
}

// Control: does a real mouse hover open it?
try {
    await page.locator('[data-slot="dropdown-menu-sub-trigger"]').hover();
    await page.waitForTimeout(700);
    const afterHover = await page.evaluate(() => ({
        ariaExpanded: document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')?.getAttribute("aria-expanded"),
        subContentInDom: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
    }));
    console.log("SUBMENU mouse-hover:", JSON.stringify(afterHover));
} catch (e) {
    console.log("hover failed:", e.message);
}

console.log("CONSOLE ERRORS:", JSON.stringify(consoleErrors, null, 1));
await browser.close();
