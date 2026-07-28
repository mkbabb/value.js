// CHALLENGE-C probe A — CurrentPaletteEditor add-slot / swatch DOM truth.
// Read-only: navigates, inspects the DOM, clicks the add-slot, reports.
import { chromium } from "playwright";

const out = {};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + String(e)));

await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// 1) Is `.floating-panel` defined by any stylesheet?
out.floatingPanelRule = await page.evaluate(() => {
    const hits = [];
    for (const sheet of Array.from(document.styleSheets)) {
        let rules;
        try { rules = sheet.cssRules; } catch { continue; }
        const walk = (rl) => {
            for (const r of Array.from(rl || [])) {
                if (r.selectorText && r.selectorText.includes("floating-panel")) hits.push(r.cssText.slice(0, 200));
                if (r.cssRules) walk(r.cssRules);
            }
        };
        walk(rules);
    }
    return hits;
});

// 2) The add-slot: find the watercolor swatch in the "Start a new palette" well.
out.addSlot = await page.evaluate(() => {
    const el = document.querySelector(".add-slot-ghost");
    if (!el) return { found: false };
    const cs = getComputedStyle(el);
    return {
        found: true,
        tagName: el.tagName,
        outerHTML: el.outerHTML.slice(0, 900),
        ariaLabel: el.getAttribute("aria-label"),
        ariaHidden: el.getAttribute("aria-hidden"),
        role: el.getAttribute("role"),
        tabIndex: el.tabIndex,
        pointerEvents: cs.pointerEvents,
        childCount: el.childElementCount,
        hasPlusSvg: !!el.querySelector("svg.lucide-plus, svg.w-5"),
        innerSvgClasses: Array.from(el.querySelectorAll("svg")).map((s) => s.getAttribute("class")),
        rect: el.getBoundingClientRect().toJSON(),
    };
});

// 3) Accessibility tree: is there ANY button whose name matches "Add current color"?
out.addButtonByRole = await page.getByRole("button", { name: /Add current color/i }).count();
out.anyElementWithAddLabel = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[aria-label]"))
        .filter((e) => /Add current color/i.test(e.getAttribute("aria-label") || ""))
        .map((e) => ({ tag: e.tagName, cls: e.className && String(e.className).slice(0, 80) })),
);

// 4) Click the add-slot; did the palette gain a swatch?
const before = await page.evaluate(() => document.querySelectorAll('[data-testid="watercolor-swatch"]').length);
try {
    await page.locator(".add-slot-ghost").first().click({ timeout: 4000, force: true });
} catch (e) {
    out.clickError = String(e).split("\n")[0];
}
await page.waitForTimeout(900);
const after = await page.evaluate(() => document.querySelectorAll('[data-testid="watercolor-swatch"]').length);
out.swatchCount = { before, after };
out.bodyTextAfterClick = await page.evaluate(() => document.body.innerText.slice(0, 400));

// 5) Nameless buttons on the route
out.namelessButtons = await page.evaluate(() => {
    const names = [];
    for (const b of Array.from(document.querySelectorAll("button"))) {
        const cs = getComputedStyle(b);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        const name = (b.getAttribute("aria-label") || b.textContent || "").trim();
        if (!name) names.push({ html: b.outerHTML.slice(0, 260), rect: b.getBoundingClientRect().toJSON() });
    }
    return names;
});

out.consoleErrors = consoleErrors;
console.log(JSON.stringify(out, null, 1));
await browser.close();
