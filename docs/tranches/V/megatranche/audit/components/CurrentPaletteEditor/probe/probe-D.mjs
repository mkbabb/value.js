// CHALLENGE-C probe D — CSS-rule existence for the two hand-named classes the
// component leans on (`btn-interactive`, `floating-panel`) + a full-page shot of
// the teleported hover panel. Read-only.
import { chromium } from "playwright";

const out = {};
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => {
    localStorage.setItem(
        "color-picker",
        JSON.stringify({ inputColor: "#ff0000", savedColors: ["#ff0000", "#00ff00", "#0000ff"] }),
    );
});
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4500);

out.rulesFor = await page.evaluate(() => {
    const wanted = ["btn-interactive", "floating-panel", "add-slot-ghost", "edit-overlay", "swatch-row", "dashed-well"];
    const found = Object.fromEntries(wanted.map((w) => [w, []]));
    for (const sheet of Array.from(document.styleSheets)) {
        let rules;
        try { rules = sheet.cssRules; } catch { continue; }
        const walk = (rl) => {
            for (const r of Array.from(rl || [])) {
                if (r.selectorText) for (const w of wanted) if (r.selectorText.includes(w)) found[w].push(r.selectorText);
                if (r.cssRules) walk(r.cssRules);
            }
        };
        walk(rules);
    }
    return Object.fromEntries(Object.entries(found).map(([k, v]) => [k, { count: v.length, sample: v.slice(0, 3) }]));
});

// Does the add-slot actually animate on press, as its `btn-interactive` claims?
out.addSlotComputed = await page.evaluate(() => {
    const el = document.querySelector(".add-slot-ghost");
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { transitionProperty: cs.transitionProperty, transitionDuration: cs.transitionDuration, transform: cs.transform, cursor: cs.cursor };
});

// Hover the first swatch, then full-page screenshot to show WHERE the panel lands.
await page.locator(".dashed-well .swatch-row > div").first().hover();
await page.waitForTimeout(600);
out.panel = await page.evaluate(() => {
    const p = document.querySelector(".floating-panel");
    if (!p) return null;
    const r = p.getBoundingClientRect();
    const cs = getComputedStyle(p);
    return {
        position: cs.position, display: cs.display,
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        docHeight: document.documentElement.scrollHeight,
        viewportH: window.innerHeight,
        inViewport: r.top < window.innerHeight && r.bottom > 0,
    };
});
await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor/probe/hover-panel-fullpage.png", fullPage: true });

console.log(JSON.stringify(out, null, 1));
await browser.close();
