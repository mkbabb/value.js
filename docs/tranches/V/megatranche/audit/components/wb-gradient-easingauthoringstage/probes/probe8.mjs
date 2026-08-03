import { chromium } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.emulateMedia({ colorScheme: "light" });
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.waitForTimeout(2500);
await page.locator('button[aria-label="Author a custom curve"]').first().click();
await page.waitForTimeout(600);
const out = {};

// scroll the stage into view, then take a plain VIEWPORT screenshot clipped to the card
await page.locator(".easing-authoring").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const cardBox = await page.locator(".easing-authoring .glass-card").first().boundingBox();
out.cardBox = cardBox;
await page.screenshot({ path: `${OUT}/card-viewport-clip.png`, clip: cardBox });

// preset select desync
const read = async () => await page.evaluate(() => ({
  literal: document.querySelector('[id^="easing-interval-"] code')?.textContent?.trim(),
  headName: document.querySelectorAll(".interval-head span")[3]?.textContent?.trim(),
  presetTrigger: document.querySelector('.easing-authoring [aria-label="Easing preset"]')?.textContent?.trim(),
  pressedTile: document.querySelector('.easing-authoring, [id^="easing-interval-"]') && [...document.querySelectorAll('[data-specimen][data-state="on"]')].map((e) => e.getAttribute("data-specimen")),
}));
out.t0_initial = await read();

// choose a preset from the producer dropdown
await page.locator('.easing-authoring [aria-label="Easing preset"]').click();
await page.waitForTimeout(500);
const opts = await page.evaluate(() => [...document.querySelectorAll('[role="option"]')].map((e) => e.textContent.trim()));
out.presetOptions = opts;
const pick = opts.find((o) => o === "ease-in-out-quad") || opts[3];
await page.getByRole("option", { name: pick, exact: true }).click();
await page.waitForTimeout(700);
out.t1_afterPresetPick = { pick, ...(await read()) };
await page.locator(".easing-authoring").first().screenshot({ path: `${OUT}/after-preset.png` }).catch(() => {});

// now press a DIFFERENT tile in the strip — does the producer's preset trigger follow?
await page.locator('[data-specimen="ease-out-sine"]').first().scrollIntoViewIfNeeded().catch(() => {});
await page.locator('[data-specimen="ease-out-sine"]').first().click();
await page.waitForTimeout(800);
out.t2_afterStripTile = await read();
await page.locator(".easing-authoring").first().screenshot({ path: `${OUT}/after-strip-tile.png` }).catch(() => {});

await browser.close();
fs.writeFileSync(`${OUT}/probe8.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
