// SERVED MODEL: claude-opus-5-5 — r4cube diagnostic: the visible controls' accessible names on /#/cube.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:5493/#/", { timeout: 120000 }); await p.waitForSelector(".cube-pose", { timeout: 90000 }); await p.goto("http://localhost:5493/#/cube"); await p.reload(); await p.waitForSelector(".cube-pose", { timeout: 90000 }); await new Promise((r) => setTimeout(r, 3000));
console.log(await p.locator(`[aria-label="Channel to edit"]`).count(), await p.locator(`[aria-label="Channel to edit"]:visible`).count(), JSON.stringify(await p.evaluate(() => [...document.querySelectorAll("button,[role=combobox]")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => e.getAttribute("aria-label") || e.textContent.trim().slice(0, 30)))));
await p.screenshot({ path: "frames/diag.png" }); await b.close();
