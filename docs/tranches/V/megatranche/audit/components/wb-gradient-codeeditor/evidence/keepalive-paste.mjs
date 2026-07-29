// R8: does `focused` survive a KeepAlive deactivate, permanently freezing the
// editor against the model?  R9: does a rich-HTML paste land as markup?
import { chromium } from "playwright";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
await page.reload({ waitUntil: "load" });
await page.waitForSelector(EDITOR, { timeout: 20000 });
await sleep(2500);

const read = () => page.evaluate(() => ({
    text: document.querySelector('[role="textbox"][aria-label="Gradient CSS"]')?.textContent ?? null,
    active: document.activeElement?.getAttribute?.("aria-label") ?? document.activeElement?.tagName,
    stops: document.querySelectorAll("[data-stop-id]").length,
}));

// ── R8: focus the editor, leave the view (KeepAlive), come back, then change
//        the model from the rail and see whether the editor follows.
await page.locator(EDITOR).last().click();
const focusedBefore = await read();
await page.evaluate(() => { window.location.hash = "#/mix"; });
await sleep(1200);
await page.evaluate(() => { window.location.hash = "#/gradient"; });
await sleep(1800);
const backOn = await read();
// move a stop by clicking the rail (adds a stop → model changes)
const bar = page.getByTestId("gradient-stop-bar").last();
await bar.scrollIntoViewIfNeeded();
const box = await bar.boundingBox();
await bar.click({ position: { x: box.width * 0.5, y: box.height / 2 } });
await sleep(800);
const afterModelChange = await read();

// ── R9: rich-HTML paste into contenteditable=true
await page.reload({ waitUntil: "load" });
await page.waitForSelector(EDITOR, { timeout: 20000 });
await sleep(2500);
const editor = page.locator(EDITOR).last();
await editor.click();
await page.keyboard.press("ControlOrMeta+a");
const pasted = await editor.evaluate((el) => {
    const dt = new DataTransfer();
    dt.setData("text/html", '<b style="color:red">linear-gradient</b>(90deg, <i>red</i>, blue)');
    dt.setData("text/plain", "linear-gradient(90deg, red, blue)");
    el.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true }));
    return null;
});
await sleep(1500);
const afterPaste = await page.evaluate(() => {
    const el = document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
    return {
        innerHTML: el?.innerHTML.slice(0, 260) ?? null,
        textContent: el?.textContent ?? null,
        foreignTags: [...(el?.querySelectorAll("b,i,u,font,span[style]") ?? [])].map((n) => n.tagName),
    };
});

console.log(JSON.stringify({ focusedBefore, backOn, afterModelChange, afterPaste }, null, 1));
await browser.close();
