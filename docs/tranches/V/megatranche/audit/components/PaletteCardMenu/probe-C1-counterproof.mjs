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
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.evaluate((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);

const trigger = page.getByRole("button", { name: "Palette menu" }).first();
await trigger.waitFor({ state: "visible", timeout: 15000 });

// --- a11y of the trigger + content ---
await trigger.evaluate((el) => el.click());
await page.waitForTimeout(400);
const a11y = await page.evaluate(() => {
    const t = document.querySelector('button[aria-label="Palette menu"]');
    const c = document.querySelector('[data-slot="dropdown-menu-content"]');
    return {
        trigger: {
            ariaExpanded: t?.getAttribute("aria-expanded"),
            ariaHaspopup: t?.getAttribute("aria-haspopup"),
            ariaControls: t?.getAttribute("aria-controls"),
        },
        content: c && {
            role: c.getAttribute("role"),
            ariaLabelledby: c.getAttribute("aria-labelledby"),
            ariaLabel: c.getAttribute("aria-label"),
            ariaOrientation: c.getAttribute("aria-orientation"),
        },
        activeElement: document.activeElement?.getAttribute("data-slot") || document.activeElement?.tagName,
        labelSlotText: document.querySelector('[data-slot="dropdown-menu-label"]')?.textContent?.trim(),
        labelId: document.querySelector('[data-slot="dropdown-menu-label"]')?.id || null,
    };
});
console.log("A11Y:", JSON.stringify(a11y, null, 1));

// --- COUNTER-PROOF: force defaultPrevented=false on the click; submenu must open ---
const counter = await page.evaluate(async () => {
    const sub = document.querySelector('[data-slot="dropdown-menu-sub-trigger"]');
    const snap = () => ({
        ariaExpanded: sub.getAttribute("aria-expanded"),
        subContentInDom: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
    });
    const before = snap();
    const evt = new MouseEvent("click", { bubbles: true, cancelable: true, composed: true });
    // Neutralise ONLY the consumer's `.prevent` effect; every listener still runs.
    Object.defineProperty(evt, "defaultPrevented", { get: () => false, configurable: true });
    sub.dispatchEvent(evt);
    await new Promise((r) => setTimeout(r, 500));
    return { before, after: snap() };
});
console.log("COUNTER-PROOF (defaultPrevented forced false):", JSON.stringify(counter, null, 1));

// --- focus restoration on Escape ---
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
const afterEsc = await page.evaluate(() => ({
    menuOpen: !!document.querySelector('[data-slot="dropdown-menu-content"]'),
    activeElementLabel: document.activeElement?.getAttribute("aria-label"),
    activeTag: document.activeElement?.tagName,
}));
console.log("AFTER ESCAPE:", JSON.stringify(afterEsc));

// --- keyboard: Enter on the sub-trigger (control that keyboard still works) ---
await trigger.evaluate((el) => el.click());
await page.waitForTimeout(400);
await page.keyboard.press("ArrowDown");
await page.keyboard.press("ArrowDown");
await page.keyboard.press("ArrowDown");
const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
console.log("FOCUSED after 3x ArrowDown:", JSON.stringify(focused));
await page.keyboard.press("Enter");
await page.waitForTimeout(500);
const kbd = await page.evaluate(() => ({
    subContentInDom: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
    subExpanded: document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')?.getAttribute("aria-expanded"),
}));
console.log("KEYBOARD Enter on Export:", JSON.stringify(kbd));

await browser.close();
