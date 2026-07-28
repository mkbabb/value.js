import { chromium } from "playwright";
const out = (...a) => console.log(...a);
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

const store = () => page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes") || "{}").palettes?.map((p) => ({ name: p.name, colors: p.colors.length })));
const well = page.locator(".dashed-well").first();
const input = well.locator("input");
const wrappers = () => page.locator(".dashed-well .swatch-row > div.relative");

// 1. save a 3-colour palette named "Keeper"
await input.fill("Keeper");
await input.press("Enter");
await page.waitForTimeout(900);
out("1 store after save:", JSON.stringify(await store()), "| swatches now:", await wrappers().count());

// 2. rebuild the buffer, then trigger the duplicate banner with the SAME name
await page.reload({ waitUntil: "load" });
await page.waitForTimeout(4000);
await page.getByRole("combobox", { name: "Select view" }).click();
await page.waitForTimeout(300);
await page.getByRole("option", { name: "Palettes", exact: true }).click();
await page.waitForTimeout(2500);
const well2 = page.locator(".dashed-well").first();
const input2 = well2.locator("input");
out("2 swatches restored:", await wrappers().count());
await input2.fill("Keeper");
await input2.press("Enter");
await page.waitForTimeout(700);
out("2 banner:", JSON.stringify((await well2.innerText()).replace(/\s+/g, " ")));

// 3. now empty the current palette (remove all swatches) WITHOUT dismissing the banner
for (let i = 0; i < 3; i++) {
    const n = await wrappers().count();
    if (!n) break;
    await wrappers().nth(0).hover();
    await page.waitForTimeout(450);
    const rm = page.locator('.floating-panel button[aria-label^="Remove color"]');
    if (!(await rm.count())) break;
    await rm.first().click();
    await page.waitForTimeout(700);
}
out("3 swatches after emptying:", await wrappers().count());
out("3 banner still present?", JSON.stringify((await well2.innerText()).replace(/\s+/g, " ")));

// 4. click Update with an EMPTY current palette
const upd = page.getByRole("button", { name: "Update" }).filter({ visible: true });
out("4 Update visible:", await upd.count());
if (await upd.count()) {
    await upd.first().click();
    await page.waitForTimeout(900);
    out("4 store AFTER Update with an empty buffer:", JSON.stringify(await store()));
}
await browser.close();
