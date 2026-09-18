import { chromium } from "playwright";
const out = (...a) => console.log(...a);
const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const SEED = {
    inputColor: "lab(50% 20 -30)",
    savedColors: ["lab(50% 20 -30)", "lab(70% -40 10)", "lab(30% 5 60)"],
};

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

const wrappers = () => page.locator(".dashed-well .swatch-row > div.relative");
out("start swatches:", await wrappers().count());

// 1. start an edit on swatch index 2
await wrappers().nth(2).hover();
await page.waitForTimeout(450);
const editBtn = page.locator('.floating-panel button[aria-label^="Edit color"]');
out("edit btn for idx2:", await editBtn.count(), await editBtn.first().getAttribute("aria-label"));
await editBtn.first().click();
await page.waitForTimeout(600);
out("edit overlays after startEdit(2):", await page.locator(".edit-overlay").count());

// 2. remove swatch index 0 while the edit on index 2 is live
await wrappers().nth(0).hover();
await page.waitForTimeout(450);
const rmBtn = page.locator('.floating-panel button[aria-label^="Remove color"]');
out("remove btn:", await rmBtn.count(), await rmBtn.first().getAttribute("aria-label"));
await rmBtn.first().click();
await page.waitForTimeout(900);
out("swatches after removing idx0:", await wrappers().count());
out("edit overlays now (stale index 2 of a 2-length list):", await page.locator(".edit-overlay").count());
const anySaveEdit = await page.evaluate(() =>
    [...document.querySelectorAll("button")].filter((b) => /Save edit|Cancel edit/.test(b.getAttribute("aria-label") || "")).map((b) => ({ label: b.getAttribute("aria-label"), vis: b.getBoundingClientRect().width > 0 })),
);
out("Save/Cancel edit affordances on DESKTOP after the row shrank:", JSON.stringify(anySaveEdit));

// 3. shrink below lg -> the dock mobile-edit layer should expose Save edit
await page.setViewportSize({ width: 800, height: 900 });
await page.waitForTimeout(1200);
const dockSave = await page.evaluate(() =>
    [...document.querySelectorAll("button,[role=button]")].filter((b) => /Save edit/.test(b.getAttribute("aria-label") || "")).map((b) => ({ label: b.getAttribute("aria-label"), w: Math.round(b.getBoundingClientRect().width) })),
);
out("Save edit affordances at 800px:", JSON.stringify(dockSave));
const before = await page.evaluate(() => [...document.querySelectorAll(".dashed-well .swatch-row .watercolor-swatch")].map((d) => d.style.getPropertyValue("--watercolor-color")));
out("colors BEFORE commit:", JSON.stringify(before));
const saveEdit = page.getByRole("button", { name: "Save edit" }).filter({ visible: true });
if (await saveEdit.count()) {
    await saveEdit.first().click();
    await page.waitForTimeout(900);
    const after = await page.evaluate(() => [...document.querySelectorAll(".dashed-well .swatch-row .watercolor-swatch")].map((d) => d.style.getPropertyValue("--watercolor-color")));
    out("colors AFTER commit with stale index:", JSON.stringify(after));
    out("count text:", await page.locator(".dashed-well .text-mono-small").first().innerText());
}
await page.screenshot({ path: `${SP}/cpe-stale.png` });

// 4. per-tick churn: mutations on the swatch row while dragging the L slider
await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForTimeout(800);
await page.evaluate(() => {
    window.__mut = { row: 0, addSlot: 0 };
    const row = document.querySelector(".dashed-well .swatch-row");
    if (!row) return;
    new MutationObserver((recs) => { window.__mut.row += recs.length; }).observe(row, { attributes: true, childList: true, subtree: true, attributeFilter: ["style", "class"] });
});
const slider = page.locator('[role="slider"]').first();
const sb = await slider.boundingBox();
if (sb) {
    await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2);
    await page.mouse.down();
    for (let i = 0; i < 40; i++) {
        await page.mouse.move(sb.x + sb.width / 2 + i * 3, sb.y + sb.height / 2);
        await page.waitForTimeout(16);
    }
    await page.mouse.up();
}
await page.waitForTimeout(400);
const mut = await page.evaluate(() => window.__mut);
out("4 swatch-row DOM mutations during a 40-step slider drag:", JSON.stringify(mut));

await browser.close();
