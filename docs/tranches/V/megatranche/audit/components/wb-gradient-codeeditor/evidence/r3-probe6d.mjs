// r3 part 6d — stacking forensics for the invisible boundary text.
import { webkit } from "playwright";
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
const out = await page.evaluate(() => {
    const p = [...document.querySelectorAll('[role="alert"] p')][0];
    const r = p.getBoundingClientRect();
    const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
    const stack = document.elementsFromPoint(cx, cy).map((el) => {
        const cs = getComputedStyle(el);
        return `${el.tagName}.${(el.className||"").toString().split(" ").slice(0,2).join(".")} [pos=${cs.position} z=${cs.zIndex} bg=${cs.backgroundColor} bf=${cs.backdropFilter||cs.webkitBackdropFilter}]`;
    });
    const auroraish = [...document.querySelectorAll("body > *, .app-layout > *")].map((el) => {
        const cs = getComputedStyle(el);
        const b = el.getBoundingClientRect();
        return { node: `${el.tagName}.${(el.className||"").toString().split(" ").slice(0,2).join(".")}`, pos: cs.position, z: cs.zIndex, rect: [Math.round(b.x),Math.round(b.y),Math.round(b.width),Math.round(b.height)], op: cs.opacity };
    });
    return { pointStack: stack, topLevel: auroraish };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
