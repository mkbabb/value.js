// r3 part 6c — WHY the boundary's message is not painted.
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
    const p = document.querySelector('[role="alert"] p');
    const btn = document.querySelector('[role="alert"] button');
    const chain = [];
    for (let el = p; el && el !== document.documentElement; el = el.parentElement) {
        const cs = getComputedStyle(el);
        chain.push({
            node: `${el.tagName}.${(el.className || "").toString().split(" ").slice(0, 3).join(".")}`,
            fill: cs.webkitTextFillColor,
            color: cs.color,
            bgClip: cs.backgroundClip || cs.webkitBackgroundClip,
            mask: cs.maskImage,
            filter: cs.filter,
            mixBlend: cs.mixBlendMode,
            isolation: cs.isolation,
            opacity: cs.opacity,
            zIndex: cs.zIndex,
            contentVisibility: cs.contentVisibility,
        });
    }
    return {
        pFill: getComputedStyle(p).webkitTextFillColor,
        btnFill: getComputedStyle(btn).webkitTextFillColor,
        chain,
    };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
