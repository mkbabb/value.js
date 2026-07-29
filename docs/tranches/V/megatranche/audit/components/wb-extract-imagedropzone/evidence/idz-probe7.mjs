// IDZ probe 7 — the drop highlight during a real travelling drag.
import { chromium } from "playwright";
import { makePng } from "./idz-probe1.mjs";
import fs from "node:fs";
fs.writeFileSync("/tmp/idz-red.png", makePng(64, 64, [220, 40, 40]));

const ZONE = '[role="button"][aria-label*="image" i]';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const cdp = await page.context().newCDPSession(page);
await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForTimeout(2400);
await page.evaluate((s) => (window.__z = document.querySelector(s)), ZONE);

const box = await page.locator(ZONE).boundingBox();
const pt = { P1: [box.x + 4, box.y + 4],
             P2: [box.x + box.width / 2, box.y + box.height / 2 + 14],
             P3: [box.x + box.width / 2, box.y + box.height / 2 - 18] };
const D = { items: [], files: ["/tmp/idz-red.png"], dragOperationsMask: 1 };
const read = () => page.evaluate(() => {
    const z = window.__z, cs = getComputedStyle(z);
    return {
        draggingClass: z.className.includes("scale-[1.01]"),
        transform: cs.transform,
        border: cs.borderTopColor,
        bg: cs.backgroundColor,
    };
});
await cdp.send("Input.setInterceptDrags", { enabled: true });
const trace = [{ step: "idle", ...(await read()) }];
for (const [type, name] of [["dragEnter","P1"],["dragOver","P1"],["dragOver","P2"],["dragOver","P3"],["dragOver","P2"],["dragOver","P2"]]) {
    await cdp.send("Input.dispatchDragEvent", { type, x: pt[name][0], y: pt[name][1], data: D });
    await page.waitForTimeout(450); // > --duration-normal, so the transition settles
    trace.push({ step: `${type}@${name}`, ...(await read()) });
}
console.log(JSON.stringify(trace, null, 2));
await browser.close();
