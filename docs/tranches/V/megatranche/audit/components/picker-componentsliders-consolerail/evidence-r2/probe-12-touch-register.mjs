// CHALLENGE-D r2 · probe 12 — the TOUCH register: is the anatomy tooltip (the
// rail's only channel explanation, and the retirement home of the static
// ranges) reachable without a hover device? Read-only.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";

const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 120000 });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2600);

const visibleTooltip = () => page.evaluate(() => {
    const cands = [...document.querySelectorAll("[role=tooltip],[data-reka-popper-content-wrapper],[data-radix-popper-content-wrapper]")];
    const vis = cands.filter((t) => { const b = t.getBoundingClientRect(); return b.width > 20 && b.height > 12; });
    return vis.map((t) => ({ text: t.textContent.trim().slice(0, 60), w: +t.getBoundingClientRect().width.toFixed(1), h: +t.getBoundingClientRect().height.toFixed(1) }));
});

const out = { arms: {} };
const item = page.locator(".channel-rail-item").nth(1);
const bb = await item.boundingBox();
out.itemBox = bb;

// arm 1: a plain tap
await page.touchscreen.tap(bb.x + bb.width / 2, bb.y + bb.height / 2);
await page.waitForTimeout(1200);
out.arms.tap = { tooltips: await visibleTooltip(), selected: await page.evaluate(() => [...document.querySelectorAll(".channel-rail-item")].map((e) => e.getAttribute("aria-selected"))) };

// arm 2: a long press (600ms hold)
await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); // no-op on touch ctx, kept for parity
await page.dispatchEvent(".channel-rail-item >> nth=1", "touchstart");
await page.waitForTimeout(900);
out.arms.longPress = { tooltips: await visibleTooltip() };
await page.dispatchEvent(".channel-rail-item >> nth=1", "touchend");
await page.waitForTimeout(600);

// arm 3: does the rail item even have a pointer:coarse hover register?
out.coarseHoverSupport = await page.evaluate(() => ({
    anyHover: matchMedia("(any-hover: hover)").matches,
    hoverNone: matchMedia("(hover: none)").matches,
    pointerCoarse: matchMedia("(pointer: coarse)").matches,
    lgViewport: matchMedia("(min-width: 1024px)").matches,
}));

// arm 4: what a tap actually changes in the slider column
const clipRows = await page.evaluate(() => { const b = document.querySelector(".channel-rows").getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height }; });
const shot1 = await page.screenshot({ clip: clipRows });
await page.touchscreen.tap(bb.x + bb.width / 2, bb.y + bb.height / 2 + 47);
await page.waitForTimeout(1000);
const shot2 = await page.screenshot({ clip: clipRows });
out.tapChangesSliderColumn = { identicalBytes: Buffer.compare(shot1, shot2) === 0, bytes1: shot1.length, bytes2: shot2.length };

await page.screenshot({ path: join(HERE, "shot-TCH-touch-tap-no-tooltip.png"), clip: await page.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: Math.max(0, b.x - 8), y: Math.max(0, b.y - 10), width: Math.min(370, b.width + 250), height: b.height + 20 }; }) });

writeFileSync(join(HERE, "probe-12-touch-register.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
