import { chromium } from "playwright";
const out = (...a) => console.log(...a);
const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const SEED = { inputColor: "lab(50% 20 -30)", savedColors: ["lab(50% 20 -30)", "lab(70% -40 10)", "lab(30% 5 60)"] };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((s) => localStorage.setItem("color-picker", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
page.on("pageerror", (e) => out("PAGEERROR:", e.message));
await page.goto("http://localhost:9000/", { waitUntil: "load" });
await page.waitForTimeout(4000);
await page.getByRole("combobox", { name: "Select view" }).click();
await page.waitForTimeout(300);
await page.getByRole("option", { name: "Palettes", exact: true }).click();
await page.waitForTimeout(2500);

const saved = () => page.evaluate(() => JSON.parse(localStorage.getItem("color-picker") || "{}").savedColors);
const wrappers = () => page.locator(".dashed-well .swatch-row > div.relative");
out("0 savedColors:", JSON.stringify(await saved()), "swatches:", await wrappers().count());

await wrappers().nth(2).hover();
await page.waitForTimeout(450);
await page.locator('.floating-panel button[aria-label^="Edit color"]').first().click();
await page.waitForTimeout(900);
out("1 after startEdit(2) — overlays:", await page.locator(".edit-overlay").count(), "savedColors:", JSON.stringify(await saved()));

await wrappers().nth(0).hover();
await page.waitForTimeout(500);
const rm = page.locator('.floating-panel button[aria-label^="Remove color"]');
out("2 remove label:", await rm.first().getAttribute("aria-label"));
await rm.first().click();
await page.waitForTimeout(900);
out("3 after remove(0) — swatches:", await wrappers().count(), "savedColors:", JSON.stringify(await saved()), "overlays:", await page.locator(".edit-overlay").count());

// commit the still-live edit via the global Enter shortcut (ColorPicker.vue:377)
await page.evaluate(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })));
await page.waitForTimeout(1200);
out("4 after Enter-commit — swatches:", await wrappers().count(), "savedColors:", JSON.stringify(await saved()));
out("4 count label:", await page.locator(".dashed-well .text-mono-small").first().innerText());
await page.screenshot({ path: `${SP}/cpe-stale2.png` });
await browser.close();
