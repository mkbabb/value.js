import { chromium } from "@playwright/test";
import { writeFileSync } from "fs";

// 8x8 solid PNG
const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAHElEQVQoU2NkYGD4z0AEYBxVSFxIjYbSaMIAAOxhBP0K7WYAAAAASUVORK5CYII=",
  "base64");
const imgPath = process.argv[2] + "/tiny.png";
writeFileSync(imgPath, png);

const txtPath = process.argv[2] + "/not-an-image.txt";
writeFileSync(txtPath, "definitely not an image\n");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const zoneSel = "ZONE";

const before = await page.evaluate((s) => {
  const z = document.querySelector('input[type="file"]').closest('[role="button"]');
  return { tabindex: z.getAttribute("tabindex"), aria: z.getAttribute("aria-label") };
}, zoneSel);

// PATH A: the file PICKER path with a NON-IMAGE file (no type guard on this path)
await page.setInputFiles('input[type="file"]', txtPath);
await page.waitForTimeout(2500);
const afterTxt = await page.evaluate((s) => {
  const z = document.querySelector('input[type="file"]').closest('[role="button"]');
  const img = z.querySelector("img");
  return {
    tabindex: z.getAttribute("tabindex"),
    aria: z.getAttribute("aria-label"),
    cornerTag: z.querySelector("span[aria-hidden]")?.textContent?.trim() ?? null,
    imgSrcPrefix: img ? img.getAttribute("src").slice(0, 40) : null,
    imgNaturalWidth: img ? img.naturalWidth : null,
    destructiveText: [...document.querySelectorAll(".text-destructive")].map(e => e.textContent.trim()),
  };
}, zoneSel);

// PATH B: a real image, then the keyboard reachability of the SAMPLE affordance
await page.setInputFiles('input[type="file"]', imgPath);
await page.waitForTimeout(2500);
const afterPng = await page.evaluate((s) => {
  const z = document.querySelector('input[type="file"]').closest('[role="button"]');
  return {
    tabindex: z.getAttribute("tabindex"),
    aria: z.getAttribute("aria-label"),
    cornerTag: z.querySelector("span[aria-hidden]")?.textContent?.trim() ?? null,
    imgNaturalWidth: z.querySelector("img")?.naturalWidth ?? null,
  };
}, zoneSel);

// Try to focus the zone by keyboard: can it receive focus at all?
const focusProbe = await page.evaluate((s) => {
  const z = document.querySelector('input[type="file"]').closest('[role="button"]');
  z.focus();
  return { activeIsZone: document.activeElement === z, activeTag: document.activeElement.tagName, activeLabel: document.activeElement.getAttribute?.("aria-label") };
}, zoneSel);

// Press Enter on the zone (after programmatic focus) — does the eyedropper open?
await page.keyboard.press("Enter");
await page.waitForTimeout(800);
const afterEnter = await page.evaluate(() => ({
  dialogCount: document.querySelectorAll('[role="dialog"]').length,
  eyedropperCanvas: !!document.querySelector(".eyedropper-canvas"),
}));

// Now click it — does the eyedropper open on pointer?
await page.locator('input[type="file"]').evaluate(i => i.closest('[role=button]').click());
await page.waitForTimeout(900);
const afterClick = await page.evaluate(() => ({
  dialogCount: document.querySelectorAll('[role="dialog"]').length,
  eyedropperCanvas: !!document.querySelector(".eyedropper-canvas"),
}));

console.log(JSON.stringify({ before, afterTxt, afterPng, focusProbe, afterEnter, afterClick, pageErrors }, null, 2));
await browser.close();
