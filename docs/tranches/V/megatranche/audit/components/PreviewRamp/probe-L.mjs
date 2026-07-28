// challenge-L · PreviewRamp — live structural probe (read-only).
// Measures the chip's REAL box against the φ² "golden plate" law the SFC
// comment asserts (`inline-size: 2.618rem` vs `block-size: 1em`), counts the
// painted vs stamped stops, and records the geometry spread across all rows.
//
//   node docs/tranches/V/megatranche/audit/components/PreviewRamp/probe-L.mjs
import { chromium } from "playwright";

const out = {};
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => ((out.pageErrors ??= []).push(String(e))));

await page.goto("http://localhost:9000/#/mix");
await page.waitForSelector(".glass-dock", { timeout: 30000 });
await page.waitForTimeout(1500);

const addSlot = page.getByRole("button", { name: "Add current color to the mix" });
out.addSlotCount = await addSlot.count();
out.buttonNames = await page.evaluate(() =>
    [...document.querySelectorAll('button,[role="button"]')].map(
        (b) => (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 60),
    ),
);

// ── State A: ZERO operands — the honest-absence arm.
await page.getByRole("combobox", { name: "Color space", exact: true }).click();
await page.waitForTimeout(500);
out.chipsWithZeroOperands = await page.getByRole("listbox").locator("[data-stops]").count();
out.optionsWithZeroOperands = await page.getByRole("listbox").getByRole("option").count();
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

// ── State B: TWO operands — the chip arm.
try {
    await addSlot.first().click({ timeout: 5000 });
    await page.waitForTimeout(400);
    await addSlot.first().click({ timeout: 5000 });
    await page.waitForTimeout(600);
} catch (e) {
    out.addSlotClickError = String(e).slice(0, 200);
}

for (const menu of ["Color space", "Hue method"]) {
    await page.getByRole("combobox", { name: menu, exact: true }).click();
    await page.waitForTimeout(600);
    const chips = page.getByRole("listbox").locator("[data-stops]");
    const n = await chips.count();
    const rows = await chips.evaluateAll((els) =>
        els.map((el) => {
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            const p = el.parentElement ? getComputedStyle(el.parentElement) : null;
            const paint = cs.backgroundImage;
            return {
                w: +r.width.toFixed(3),
                h: +r.height.toFixed(3),
                ratio: +(r.width / r.height).toFixed(4),
                fontSize: cs.fontSize,
                parentFontSize: p ? p.fontSize : null,
                stamped: (el.getAttribute("data-stops") ?? "").split("|").length,
                painted: [...paint.matchAll(/oklch\(/g)].length,
                display: cs.display,
                radius: cs.borderRadius,
                shadow: cs.boxShadow,
                ariaHidden: el.getAttribute("aria-hidden"),
                cls: el.className,
                paintHead: paint.slice(0, 120),
            };
        }),
    );
    out[menu] = { chipCount: n, rows };
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
}

out.rootFontSize = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
out.radiusSm = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--radius-sm").trim(),
);

console.log(JSON.stringify(out, null, 1));
await browser.close();
