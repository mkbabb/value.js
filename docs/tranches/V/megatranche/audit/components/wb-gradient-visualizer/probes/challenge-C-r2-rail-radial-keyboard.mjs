import { chromium } from "playwright";
const log = (...a) => console.log(...a);
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const main = page.getByRole("main", { name: "Color tool panes" });
await main.getByRole("heading", { name: "Interpolation" }).last().waitFor();
const bar = main.getByTestId("gradient-stop-bar").last();
await bar.scrollIntoViewIfNeeded();
const barBox = await bar.boundingBox();

// baseline screenshot of the rail region
await page.screenshot({ path: `${OUT}/rail-before.png`, clip: { x: barBox.x - 8, y: barBox.y - 24, width: barBox.width + 16, height: barBox.height + 60 } });

// two adds then a crossing drag
await bar.click({ position: { x: barBox.width * 0.33, y: barBox.height / 2 } });
await page.waitForTimeout(200);
await bar.click({ position: { x: barBox.width * 0.66, y: barBox.height / 2 } });
await page.waitForTimeout(300);
const h1 = main.locator("[data-stop-id]").nth(1);
const b1 = await h1.boundingBox();
await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2);
await page.mouse.down();
for (let i = 1; i <= 12; i++) await page.mouse.move(barBox.x + barBox.width * (0.33 + 0.044 * i), b1.y + b1.height / 2);
await page.mouse.up();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/rail-crossed.png`, clip: { x: barBox.x - 8, y: barBox.y - 24, width: barBox.width + 16, height: barBox.height + 60 } });

const railVar = await bar.evaluate((el) => el.style.getPropertyValue("--rail-ramp"));
// positions only: a `%` that follows a `)` + whitespace
const pos = [...railVar.matchAll(/\)\s+([\d.]+)%/g)].map((m) => Number(m[1]));
let desc = 0, maxDrop = 0;
for (let i = 1; i < pos.length; i++) if (pos[i] < pos[i - 1]) { desc++; maxDrop = Math.max(maxDrop, pos[i - 1] - pos[i]); }
log("RAIL sub-stop POSITIONS:", pos.length, "| descending transitions:", desc, "| max backward jump:", maxDrop.toFixed(2) + "%");
log("RAIL positions head:", pos.slice(0, 6).join(","), "… around the crossing:", pos.slice(9, 25).join(","));
const editorText = await main.getByRole("textbox", { name: "Gradient CSS" }).last().textContent();
console.log("EDITOR_TEXT_BEGIN" + editorText + "EDITOR_TEXT_END");
const tileVar = await main.getByTestId("gradient-render-tile").last().evaluate((el) => el.style.getPropertyValue("--tile-render"));
const tpos = [...tileVar.matchAll(/\)\s+([\d.]+)%/g)].map((m) => Number(m[1]));
let tdesc = 0; for (let i = 1; i < tpos.length; i++) if (tpos[i] < tpos[i - 1]) tdesc++;
log("TILE sub-stop positions:", tpos.length, "descending:", tdesc);

// ── keyboard: can a stop be ADDED without a pointer? ──
const kb = await page.evaluate(() => {
    const barEl = document.querySelector('[data-testid="gradient-stop-bar"]');
    return {
        barTag: barEl.tagName, barRole: barEl.getAttribute("role"),
        barTabindex: barEl.getAttribute("tabindex"),
        barAriaLabel: barEl.getAttribute("aria-label"),
        focusableInBar: [...barEl.querySelectorAll('button,[tabindex]:not([tabindex="-1"])')].map(e => e.getAttribute("aria-label")),
    };
});
log("BAR keyboard surface:", JSON.stringify(kb));

// ── radial + Direction slider: dead control? ──
await page.evaluate(() => window.scrollTo(0, 0));
await main.getByRole("combobox").first().click();
await page.waitForTimeout(400);
await page.getByRole("option", { name: /Radial/ }).click();
await page.waitForTimeout(500);
const dirSlider = page.locator('[role="slider"][aria-label="Gradient direction"]').last();
const beforeVal = await dirSlider.getAttribute("aria-valuenow");
const tileA = await main.getByTestId("gradient-render-tile").last().evaluate((el) => el.style.getPropertyValue("--tile-render"));
await dirSlider.focus();
for (let i = 0; i < 45; i++) await page.keyboard.press("ArrowRight");
await page.waitForTimeout(500);
const afterVal = await dirSlider.getAttribute("aria-valuenow");
const tileB = await main.getByTestId("gradient-render-tile").last().evaluate((el) => el.style.getPropertyValue("--tile-render"));
const railA = await bar.evaluate((el) => el.style.getPropertyValue("--rail-ramp"));
log("RADIAL direction:", beforeVal, "→", afterVal, "| tile changed?", tileA !== tileB, "| tile head:", tileB.slice(0, 40));
log("RADIAL rail head:", railA.slice(0, 40));
const dirBox = await dirSlider.boundingBox();
log("direction slider thumb box:", JSON.stringify(dirBox));

// screenshot the controls band under radial
const band = await main.getByTestId("gradient-render-tile").last().boundingBox();
await page.screenshot({ path: `${OUT}/radial-band.png`, clip: { x: band.x - 460, y: band.y - 30, width: 560, height: 190 } });

// ── the conic direction wording: for conic the slider says "Direction" but it is `from` ──
await main.getByRole("combobox").first().click();
await page.waitForTimeout(400);
await page.getByRole("option", { name: /Conic/ }).click();
await page.waitForTimeout(400);
const tileC = await main.getByTestId("gradient-render-tile").last().evaluate((el) => el.style.getPropertyValue("--tile-render"));
log("CONIC tile head:", tileC.slice(0, 40));

await browser.close();
