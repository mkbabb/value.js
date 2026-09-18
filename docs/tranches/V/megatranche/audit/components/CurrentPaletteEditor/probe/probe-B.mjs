// CHALLENGE-C probe B — CurrentPaletteEditor with a POPULATED current palette.
// Seeds localStorage (`color-picker`.savedColors + `color-palettes`) so the
// swatch row, save row and duplicate row all render, then interrogates them.
// Read-only against the running dev server.
import { chromium } from "playwright";

const out = {};
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => {
    localStorage.setItem(
        "color-picker",
        JSON.stringify({
            inputColor: "#ff0000",
            savedColors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00"],
        }),
    );
    const now = new Date().toISOString();
    localStorage.setItem(
        "color-palettes",
        JSON.stringify({
            version: 1,
            palettes: [
                {
                    id: "seed-dup-id",
                    name: "Dup",
                    slug: "dup",
                    colors: [{ css: "#123456", position: 0 }],
                    createdAt: now,
                    updatedAt: now,
                    isLocal: true,
                },
            ],
        }),
    );
});
const page = await ctx.newPage();
const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 160)); });
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + String(e).slice(0, 200)));

await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const EDITOR = ".dashed-well";
out.editorPresent = await page.locator(EDITOR).count();
out.editorText = await page.locator(EDITOR).first().innerText().catch(() => null);

// --- 1. The current-palette swatches: are they buttons? ---
out.swatches = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return null;
    return Array.from(well.querySelectorAll('[data-testid="watercolor-swatch"]')).map((el) => {
        const cs = getComputedStyle(el);
        return {
            tag: el.tagName,
            variant: el.getAttribute("data-variant"),
            ariaHidden: el.getAttribute("aria-hidden"),
            ariaLabel: el.getAttribute("aria-label"),
            tabIndex: el.tabIndex,
            pointerEvents: cs.pointerEvents,
            hasChildSlotContent: el.childElementCount,
        };
    });
});

// --- 2. Accessible names: buttons in the editor ---
out.editorButtons = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return null;
    return Array.from(well.querySelectorAll("button")).map((b) => ({
        name: (b.getAttribute("aria-label") || b.textContent || "").trim(),
        title: b.getAttribute("title"),
        rect: (({ width, height }) => ({ width: Math.round(width), height: Math.round(height) }))(b.getBoundingClientRect()),
        html: b.outerHTML.slice(0, 120),
    }));
});

// --- 3. aria-live / status regions inside the editor ---
out.liveRegions = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return null;
    return Array.from(well.querySelectorAll("[aria-live],[role=status],[role=alert]")).map((e) => e.outerHTML.slice(0, 140));
});

// --- 4. Hover the first swatch: does the teleported .floating-panel appear, and is it styled? ---
const firstSwatchWrap = page.locator(`${EDITOR} .swatch-row > div`).first();
await firstSwatchWrap.hover().catch((e) => (out.hoverError = String(e).split("\n")[0]));
await page.waitForTimeout(600);
out.floatingPanel = await page.evaluate(() => {
    const p = document.querySelector(".floating-panel");
    if (!p) return { found: false };
    const cs = getComputedStyle(p);
    const r = p.getBoundingClientRect();
    return {
        found: true,
        parentTag: p.parentElement?.tagName,
        position: cs.position,
        top: cs.top,
        left: cs.left,
        zIndex: cs.zIndex,
        background: cs.backgroundColor,
        boxShadow: cs.boxShadow.slice(0, 40),
        inlineStyle: p.getAttribute("style"),
        ariaHidden: p.getAttribute("aria-hidden"),
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        buttonsInside: p.querySelectorAll("button").length,
        focusableInsideAriaHidden: Array.from(p.querySelectorAll("button,a,input,[tabindex]")).length,
    };
});
// Where is the swatch it is supposed to anchor to?
out.firstSwatchRect = await page.evaluate(() => {
    const w = document.querySelector(".dashed-well .swatch-row > div");
    if (!w) return null;
    const r = w.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
});

await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor/probe/hover-panel.png" });

// --- 5. Scroll drift while the panel is open ---
await page.evaluate(() => {
    const sc = document.querySelector(".pane-scroll-fade") || document.scrollingElement;
    sc.scrollTop = 200;
});
await page.waitForTimeout(300);
out.afterScroll = await page.evaluate(() => {
    const p = document.querySelector(".floating-panel");
    const w = document.querySelector(".dashed-well .swatch-row > div");
    return {
        panel: p ? (({ x, y }) => ({ x: Math.round(x), y: Math.round(y) }))(p.getBoundingClientRect()) : null,
        swatch: w ? (({ x, y }) => ({ x: Math.round(x), y: Math.round(y) }))(w.getBoundingClientRect()) : null,
    };
});

// --- 6. TransitionGroup key stability: mark DOM nodes, remove one color, see reuse ---
await page.evaluate(() => {
    const sc = document.querySelector(".pane-scroll-fade") || document.scrollingElement;
    sc.scrollTop = 0;
});
await page.evaluate(() => {
    document.querySelectorAll(".dashed-well .swatch-row > div").forEach((el, i) => {
        el.dataset.probeMark = "m" + i;
    });
});
out.marksBefore = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".dashed-well .swatch-row > div")).map((e) => e.dataset.probeMark ?? null),
);
// Remove the FIRST color by driving the app's own store (same effect as the
// Trash action's `apply` emit — the parent writes savedColors).
await page.evaluate(() => {
    const raw = JSON.parse(localStorage.getItem("color-picker"));
    raw.savedColors = raw.savedColors.slice(1);
    localStorage.setItem("color-picker", JSON.stringify(raw));
    window.dispatchEvent(new StorageEvent("storage", { key: "color-picker", newValue: JSON.stringify(raw) }));
});
await page.waitForTimeout(900);
out.marksAfterRemoveFirst = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".dashed-well .swatch-row > div")).map((e) => e.dataset.probeMark ?? null),
);

out.consoleErrors = consoleErrors;
console.log(JSON.stringify(out, null, 1));
await browser.close();
