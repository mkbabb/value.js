import { chromium } from "playwright";

const out = (...a) => console.log(...a);
const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("pageerror", (e) => out("PAGEERROR:", e.message));
page.on("console", (m) => { if (m.type() === "error") out("CONSOLE-ERR:", m.text()); });

await page.goto("http://localhost:9000/", { waitUntil: "load" });
await page.waitForTimeout(4000);

// ---- P1: is there ANY CSS rule for .floating-panel anywhere in the document?
const cssProbe = await page.evaluate(() => {
    const hits = [];
    let scanned = 0, blocked = 0;
    const walk = (rules, href) => {
        for (const r of rules) {
            if (r.cssRules) { walk(r.cssRules, href); continue; }
            scanned++;
            const sel = r.selectorText;
            if (sel && /\.floating-panel\b/.test(sel)) hits.push({ href, sel, css: r.cssText.slice(0, 200) });
        }
    };
    for (const sheet of document.styleSheets) {
        try { walk(sheet.cssRules, sheet.href ?? "(inline)"); } catch { blocked++; }
    }
    return { hits, rulesScanned: scanned, sheetsBlocked: blocked, sheets: document.styleSheets.length };
});
out("P1 .floating-panel CSS rules:", JSON.stringify(cssProbe, null, 1));

// ---- reach Palettes pane the real-user way
await page.getByRole("combobox", { name: "Select view" }).click();
await page.getByRole("option", { name: "Palettes", exact: true }).click();
await page.waitForTimeout(2500);

const main = page.getByRole("main");
const addBtn = main.getByRole("button", { name: /Add current color .* to palette/ }).filter({ visible: true });
const addName = await addBtn.getAttribute("aria-label");
out("P2 add-button aria-label:", JSON.stringify(addName));
await addBtn.click();
await page.waitForTimeout(600);

// ---- P3: swatch aria-label vs cssColorOpaque format (dedupe is string ===)
const swatchNames = await page.evaluate(() =>
    [...document.querySelectorAll('[aria-label^="Color swatch"]')].map((e) => e.getAttribute("aria-label")),
);
out("P3 swatch labels after 1 add:", JSON.stringify(swatchNames));

// ---- P4: nameless buttons now that the editor's save row exists
const nameless = await page.evaluate(() => {
    const res = [];
    for (const b of document.querySelectorAll("button")) {
        const r = b.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const name = (b.getAttribute("aria-label") || b.getAttribute("title") || b.innerText || "").trim();
        if (!name) res.push({ w: Math.round(r.width), h: Math.round(r.height), cls: String(b.className).slice(0, 90), html: b.innerHTML.replace(/\s+/g, " ").slice(0, 90) });
    }
    return res;
});
out("P4 nameless visible buttons:", JSON.stringify(nameless, null, 1));

// ---- P5: hover a swatch -> where does the teleported panel land?
const sw = page.locator('[aria-label^="Color swatch"]').first();
const swBox = await sw.boundingBox();
await sw.hover();
await page.waitForTimeout(500);
const panel = await page.evaluate(() => {
    const el = document.querySelector(".floating-panel");
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
        parentTag: el.parentElement?.tagName,
        parentIsBody: el.parentElement === document.body,
        inlineStyle: el.getAttribute("style"),
        position: cs.position, top: cs.top, left: cs.left, zIndex: cs.zIndex,
        background: cs.backgroundColor, boxShadow: cs.boxShadow, backdropFilter: cs.backdropFilter,
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        ariaHidden: el.getAttribute("aria-hidden"),
        focusables: el.querySelectorAll("button,a,[tabindex]").length,
        docScrollH: document.documentElement.scrollHeight,
        winH: window.innerHeight,
        bodyOverflow: getComputedStyle(document.body).overflow,
    };
});
out("P5 swatch rect:", JSON.stringify(swBox));
out("P5 .floating-panel on hover:", JSON.stringify(panel, null, 1));

await page.screenshot({ path: `${SP}/cpe-hover.png` });

// ---- P6: hover-panel buttons + aria-hidden ancestry
const kb = await page.evaluate(() => {
    const el = document.querySelector(".floating-panel");
    if (!el) return "no panel";
    return [...el.querySelectorAll("button")].map((b) => ({
        label: b.getAttribute("aria-label"),
        tabIndex: b.tabIndex,
        hiddenAncestor: (() => { let n = b; while (n) { if (n.getAttribute && n.getAttribute("aria-hidden") === "true") return String(n.className || n.tagName); n = n.parentElement; } return null; })(),
    }));
});
out("P6 hover-panel buttons:", JSON.stringify(kb, null, 1));

// ---- P7: can a keyboard user reach those buttons? tab order after the swatch
const tabProbe = await page.evaluate(() => {
    const sw = document.querySelector('[aria-label^="Color swatch"]');
    sw.focus();
    return { focused: document.activeElement === sw, active: document.activeElement?.getAttribute("aria-label") };
});
out("P7 focus swatch:", JSON.stringify(tabProbe));
await page.keyboard.press("Enter");
await page.waitForTimeout(400);
const afterEnter = await page.evaluate(() => ({
    panelPresent: !!document.querySelector(".floating-panel"),
    active: document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.tagName,
}));
out("P7 after Enter on swatch:", JSON.stringify(afterEnter));

await browser.close();
