// SS8 · B10-browse · R-1 in WebKit (seat 2). Headless WebKit with macOS Full Keyboard Access OFF
// (AppleKeyboardUIMode unset) skips buttons on plain Tab, so the walk uses Alt+Tab (WebKit's
// "all controls" traversal) and records plain-Tab reachability too. Real keyboard, ≥450 ms settle.
import { webkit } from "playwright";
import path from "node:path";
import { APP, EVID, save, routeStub, sleep } from "./lib.mjs";
const out = { engine: "webkit" };
const SW = 'button[aria-label^="Open color picker"]';
const browser = await webkit.launch();
try {
    for (const key of ["Tab", "Alt+Tab"]) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
        try {
            await routeStub(ctx, { first: 12 });
            const page = await ctx.newPage();
            await page.goto(`${APP}/#/browse`, { waitUntil: "domcontentloaded", timeout: 90000 });
            await page.waitForFunction(() => document.querySelectorAll(".palette-card").length >= 12, null, { timeout: 60000 });
            await sleep(1200);
            await page.click('button[aria-label^="Filters"]');
            await page.waitForSelector(SW, { timeout: 10000 });
            await sleep(600);
            const baseline = await page.evaluate((s) => { const e = document.querySelector(s); const c = getComputedStyle(e); return { boxShadow: c.boxShadow, outline: `${c.outlineStyle} ${c.outlineWidth}` }; }, SW);
            let presses = 0, hit = false; const walk = [];
            for (; presses < 25; presses++) {
                hit = await page.evaluate((s) => document.activeElement === document.querySelector(s), SW);
                if (hit) break;
                walk.push(await page.evaluate(() => { const a = document.activeElement; return a.tagName + ":" + (a.getAttribute("aria-label") ?? a.innerText ?? "").trim().slice(0, 16); }));
                await page.keyboard.press(key); await sleep(70);
            }
            await sleep(450);
            const settled = hit ? await page.evaluate((s) => { const e = document.querySelector(s); const c = getComputedStyle(e); return { focusVisible: e.matches(":focus-visible"), boxShadow: c.boxShadow, outline: `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor}` }; }, SW) : null;
            if (hit) { const r = await page.evaluate((s) => { const b = document.querySelector(s).getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; }, SW); await page.screenshot({ path: path.join(EVID, `r1-swatch-focus-webkit.png`), clip: { x: r[0] - 14, y: r[1] - 14, width: r[2] + 28, height: r[3] + 28 } }); }
            out[key] = { reached: hit, presses, walk: walk.slice(0, 25), baseline, settled };
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
save("r1-webkit.json", out);
console.log(JSON.stringify(out, null, 1).slice(0, 4000));
