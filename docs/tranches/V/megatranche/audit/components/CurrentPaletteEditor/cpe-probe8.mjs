import { chromium } from "playwright";
const out = (...a) => console.log(...a);
const SEED = { inputColor: "lab(50% 20 -30)", savedColors: ["lab(50% 20 -30)", "lab(70% -40 10)", "lab(30% 5 60)"] };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((s) => localStorage.setItem("color-picker", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
await page.goto("http://localhost:9000/", { waitUntil: "load" });
await page.waitForTimeout(4000);
await page.getByRole("combobox", { name: "Select view" }).click();
await page.waitForTimeout(300);
await page.getByRole("option", { name: "Palettes", exact: true }).click();
await page.waitForTimeout(2500);

// 1. accessibility tree of the editor well
const well = page.locator(".dashed-well").first();
const snap = await well.ariaSnapshot();
out("1 aria snapshot of .dashed-well:\n" + snap);

// 2. focusable elements inside the well, in DOM order
const focusables = await page.evaluate(() => {
    const w = document.querySelector(".dashed-well");
    return [...w.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')]
        .map((e) => ({ tag: e.tagName, name: (e.getAttribute("aria-label") || e.getAttribute("placeholder") || e.innerText || "").replace(/\s+/g, " ").trim().slice(0, 40) }));
});
out("2 focusables inside .dashed-well:", JSON.stringify(focusables));

// 3. hover the add-slot ghost -> does the Tooltip open?
const addSlot = page.locator(".add-slot-ghost");
out("3 add-slot count:", await addSlot.count());
const box = await addSlot.first().boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.waitForTimeout(900);
const tip = await page.evaluate(() => ({
    tooltips: document.querySelectorAll('[role="tooltip"]').length,
    tooltipText: [...document.querySelectorAll('[role="tooltip"]')].map((t) => t.textContent.trim()),
}));
out("3 tooltip after hovering add slot:", JSON.stringify(tip));

// 4. click the add slot -> does anything happen?
const beforeN = await page.evaluate(() => JSON.parse(localStorage.getItem("color-picker") || "{}").savedColors.length);
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
await page.waitForTimeout(800);
const afterN = await page.evaluate(() => JSON.parse(localStorage.getItem("color-picker") || "{}").savedColors.length);
out("4 savedColors length before/after clicking the add slot:", beforeN, afterN);

// 5. what element is actually under the add-slot centre point?
const hit = await page.evaluate(([x, y]) => {
    const el = document.elementFromPoint(x, y);
    return { tag: el?.tagName, cls: String(el?.className).slice(0, 80) };
}, [box.x + box.width / 2, box.y + box.height / 2]);
out("5 elementFromPoint at the add slot centre:", JSON.stringify(hit));

await browser.close();
