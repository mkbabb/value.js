// Does the MT-F001 crash destroy authored gradient work? Author first, then crash.
import { chromium } from "playwright";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.reload({ waitUntil: "load" });
await page.waitForSelector(EDITOR, { timeout: 20000 });
await sleep(2500);

// author: add two stops on the rail + move the direction slider
const bar = page.getByTestId("gradient-stop-bar").last();
await bar.scrollIntoViewIfNeeded();
const box = await bar.boundingBox();
await bar.click({ position: { x: box.width * 0.35, y: box.height / 2 } });
await sleep(300);
await bar.click({ position: { x: box.width * 0.7, y: box.height / 2 } });
await sleep(300);

const authored = await page.evaluate(() => ({
    stops: document.querySelectorAll("[data-stop-id]").length,
    css: document.querySelector('[role="textbox"][aria-label="Gradient CSS"]')?.textContent ?? null,
}));

// crash
const editor = page.locator(EDITOR).last();
await editor.scrollIntoViewIfNeeded();
await editor.click();
await page.keyboard.press("ControlOrMeta+a");
await page.keyboard.type("linear-gradient(90deg, oklch(), blue)", { delay: 4 });
await sleep(1800);
const crashed = await page.evaluate(() => ({
    boundary: !!document.querySelector(".vj-error-boundary"),
    stops: document.querySelectorAll("[data-stop-id]").length,
}));

await page.getByRole("button", { name: "Try again" }).click();
await sleep(2200);
const afterRetry = await page.evaluate(() => ({
    stops: document.querySelectorAll("[data-stop-id]").length,
    css: document.querySelector('[role="textbox"][aria-label="Gradient CSS"]')?.textContent ?? null,
}));

console.log(JSON.stringify({ authored, crashed, afterRetry }, null, 1));
await browser.close();
