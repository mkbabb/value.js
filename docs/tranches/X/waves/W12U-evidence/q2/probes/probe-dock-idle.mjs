// SERVED MODEL: claude-opus-5-5
// X.W12U.q2 — the C-DOCK-IDLE class (X-W7L): sample the desktop dock's state
// over the first seconds after boot, with no input (headless, closes).
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    // argv[4] = "noapi": refuse the api origin, as the e2e server (no backend) does.
    if (process.argv[4] === "noapi") await page.route(/:3000\//, (r) => r.abort("connectionrefused"));
    await page.goto(base + (process.argv[3] ?? "/"));
    await page.waitForSelector(".glass-dock");
    const t0 = Date.now();
    for (let i = 0; i < 14; i++) {
        const s = await page.evaluate(() => {
            const d = document.querySelector(".glass-dock");
            const v = document.querySelector('[aria-label="Select view"]');
            const r = v?.getBoundingClientRect();
            return `cls=${[...d.classList].join(".")} morph=${d.hasAttribute("data-morphing")} attrs=${[...d.attributes].map((a) => a.name).filter((n) => n.startsWith("data-")).join(",")} view=${r ? `${Math.round(r.width)}x${Math.round(r.height)} vis=${getComputedStyle(v).visibility}` : "none"}`;
        });
        console.log(`${Date.now() - t0}ms ${s}`);
        await page.waitForTimeout(500);
    }
} finally {
    await browser.close();
}
