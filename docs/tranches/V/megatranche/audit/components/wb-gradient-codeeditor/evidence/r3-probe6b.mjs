// r3 part 6b — element-clipped capture of the crash surface (is the text painted?)
import { webkit } from "playwright";
const DIR = "docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/evidence";
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await webkit.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.reload({ waitUntil: "load" });
await page.waitForSelector(EDITOR, { timeout: 20000 });
await sleep(2200);
await page.locator(EDITOR).last().click();
await page.keyboard.press("Meta+a");
await page.keyboard.insertText("linear-gradient(90deg, oklch(), blue)");
await sleep(1800);
await page.locator('[role="alert"]').first().screenshot({ path: `${DIR}/r3-boundary-element.png` });
await page.screenshot({ path: `${DIR}/r3-boundary-clip.png`, clip: { x: 420, y: 420, width: 600, height: 240 } });
console.log("captured");
await browser.close();
