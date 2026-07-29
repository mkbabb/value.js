import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
const r = await page.evaluate(() => {
    const c = document.querySelector('main canvas[aria-hidden="true"][class*="absolute"]');
    const cs = c ? getComputedStyle(c) : null;
    const other = document.querySelector("main .pane-scroll-fade [style*='z-index'], main [class*='z-popover']");
    return {
        canvasClass: c?.className,
        zIndex: cs?.zIndex,
        position: cs?.position,
        pointerEvents: cs?.pointerEvents,
        width: c?.width, height: c?.height,
        clientW: c?.clientWidth, clientH: c?.clientHeight,
        tokenZControls: getComputedStyle(document.documentElement).getPropertyValue("--z-controls"),
        tokenZIndexControls: getComputedStyle(document.documentElement).getPropertyValue("--z-index-controls"),
    };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
