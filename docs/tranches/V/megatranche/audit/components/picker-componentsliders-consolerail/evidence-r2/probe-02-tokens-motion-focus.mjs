// CHALLENGE-D r2 · probe 02 — token resolution, the press-scale time series,
// the focus register, and pixel-sampled contrast. Read-only.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2500);

const out = {};

// --- 1. Every custom property the rail's CSS names, resolved ON THE ITEM ---
out.tokens = await page.evaluate(() => {
    const el = document.querySelector(".channel-rail-item");
    const rail = document.querySelector(".channel-rail");
    const names = [
        "--focus-ring-shadow", "--spring-press", "--spring-press-duration",
        "--dock-control-hover-bg", "--dock-control-press-bg", "--dock-touch-target",
        "--duration-normal", "--ease-standard", "--radius-pill", "--accent-view",
        "--font-mono", "--console-rest-ink", "--foreground", "--muted-foreground",
        "--type-subheading", "--duration-fast",
    ];
    const read = (node) => Object.fromEntries(names.map((n) => [n, getComputedStyle(node).getPropertyValue(n).trim()]));
    return { onItem: read(el), onRail: read(rail), onRoot: read(document.documentElement) };
});

// --- 2. Grep the live CSSOM for --focus-ring-shadow definitions ------------
out.focusRingDefinedIn = await page.evaluate(() => {
    const hits = [];
    for (const sheet of document.styleSheets) {
        let rules;
        try { rules = sheet.cssRules; } catch { continue; }
        const walk = (rs, path) => {
            for (const r of rs) {
                if (r.cssRules) { walk(r.cssRules, `${path}>${r.conditionText ?? r.selectorText ?? r.type}`); continue; }
                if (r.style && r.cssText.includes("--focus-ring-shadow")) {
                    hits.push({ href: sheet.href?.slice(-60) ?? "inline", sel: r.selectorText, text: r.cssText.slice(0, 200) });
                }
            }
        };
        walk(rules, "");
    }
    return hits;
});

// --- 3. The PRESS register: transform sampled through the hold ------------
await page.click(".channel-rail-item >> nth=0");
await page.waitForTimeout(700);
const item = await page.$(".channel-rail-item >> nth=2");
const bb = await item.boundingBox();
await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
await page.mouse.down();
const series = [];
for (const t of [0, 30, 60, 100, 160, 220, 400]) {
    await page.waitForTimeout(t === 0 ? 0 : 30);
    series.push(await page.evaluate((i) => {
        const el = document.querySelectorAll(".channel-rail-item")[i];
        const s = getComputedStyle(el);
        return { t: performance.now() | 0, transform: s.transform, bg: s.backgroundColor, transition: s.transitionProperty + " / " + s.transitionDuration + " / " + s.transitionTimingFunction, matches: el.matches(":active") };
    }, 2));
}
await page.mouse.up();
out.pressSeries = series;

// --- 4. The FOCUS register: keyboard focus, everything that could paint ----
await page.mouse.move(5, 5);
await page.evaluate(() => document.querySelectorAll(".channel-rail-item")[0].focus());
await page.keyboard.press("ArrowDown");
await page.waitForTimeout(500);
out.focus = await page.evaluate(() => {
    const el = document.activeElement;
    const s = getComputedStyle(el);
    return {
        isRailItem: el.classList.contains("channel-rail-item"),
        text: el.textContent.trim(),
        matchesFocusVisible: el.matches(":focus-visible"),
        boxShadow: s.boxShadow,
        outline: `${s.outlineWidth} ${s.outlineStyle} ${s.outlineColor} off=${s.outlineOffset}`,
        color: s.color, bg: s.backgroundColor,
        // what a working focus ring would look like elsewhere in the app:
        siblingWithFocusRing: (() => {
            const probe = document.querySelector("button, [role=button]");
            return getComputedStyle(probe).getPropertyValue("--focus-ring-shadow").trim();
        })(),
    };
});

// --- 5. Focus a NON-selected item is impossible (selection follows focus) --
//     but Tab INTO the rail: what receives focus, and is it visible?
out.tabIn = await page.evaluate(() => {
    const items = [...document.querySelectorAll(".channel-rail-item")];
    return items.map((el) => ({ text: el.textContent.trim(), tabindex: el.tabIndex, selected: el.getAttribute("aria-selected") }));
});

// --- 6. PIXEL contrast: sample the glyph ink vs the ground beside it -------
out.pixels = await (async () => {
    const boxes = await page.evaluate(() => {
        const rail = document.querySelector(".channel-rail");
        const rb = rail.getBoundingClientRect();
        return [...rail.querySelectorAll(".channel-rail-item")].map((el) => {
            const b = el.getBoundingClientRect();
            return { text: el.textContent.trim(), selected: el.getAttribute("aria-selected") === "true", x: b.x, y: b.y, w: b.width, h: b.height, railX: rb.x, railW: rb.width };
        });
    });
    return boxes;
})();

writeFileSync(join(HERE, "probe-02-tokens-motion-focus.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2).slice(0, 6000));
await browser.close();
