import { chromium } from "playwright";

const SEED = {
    version: 1,
    palettes: [
        {
            id: "11111111-2222-3333-4444-555555555555",
            name: "Probe Saved Palette",
            slug: "probe-saved-palette-abcd1234",
            colors: [{ css: "#ff0000", position: 0 }],
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
await trigger.evaluate((el) => el.click());
await page.waitForTimeout(400);

// Focus the Export sub-trigger directly, then press Enter (SUB_OPEN_KEYS path).
await page.evaluate(() => document.querySelector('[data-slot="dropdown-menu-sub-trigger"]').focus());
await page.keyboard.press("Enter");
await page.waitForTimeout(600);
console.log(
    "KEYBOARD Enter on Export sub-trigger:",
    JSON.stringify(
        await page.evaluate(() => ({
            subExpanded: document
                .querySelector('[data-slot="dropdown-menu-sub-trigger"]')
                ?.getAttribute("aria-expanded"),
            subContentInDom: !!document.querySelector('[data-slot="dropdown-menu-sub-content"]'),
            subItems: [...document.querySelectorAll('[data-slot="dropdown-menu-sub-content"] [role="menuitem"]')].map(
                (e) => e.textContent.trim(),
            ),
        })),
    ),
);

// Menu-item tap targets in the SUBMENU.
console.log(
    "SUBITEM boxes:",
    JSON.stringify(
        await page.evaluate(() =>
            [...document.querySelectorAll('[data-slot="dropdown-menu-sub-content"] [role="menuitem"]')].map((e) => {
                const r = e.getBoundingClientRect();
                return { t: e.textContent.trim(), w: Math.round(r.width), h: Math.round(r.height) };
            }),
        ),
    ),
);

await browser.close();
