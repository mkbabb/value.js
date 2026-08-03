// CHALLENGE-D r2 · probe 01 — the FOUR interaction registers + the selected
// register, measured live. Read-only.
//   rest · hover · press (:active) · focus-visible · selected(dot)
// Also: rail↔row alignment drift, dot/seat geometry vs the ring, contrast.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";

// sRGB relative luminance + WCAG ratio, from *rendered pixels* (no compositing model).
function srgbLum([r, g, b]) {
    const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(a, b) {
    const [x, y] = [srgbLum(a), srgbLum(b)].sort((p, q) => q - p);
    return +(((x + 0.05) / (y + 0.05))).toFixed(3);
}

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2000);

const snap = () => page.evaluate(() => {
    const rail = document.querySelector(".channel-rail");
    const rcs = getComputedStyle(rail);
    const rb = rail.getBoundingClientRect();
    const items = [...rail.querySelectorAll(".channel-rail-item")].map((el) => {
        const b = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        const seat = el.querySelector(".rail-dot-seat");
        const dot = el.querySelector(".rail-dot");
        const sb = seat?.getBoundingClientRect();
        const db = dot?.getBoundingClientRect();
        const g = el.querySelector(".rail-glyph");
        const gb = g?.getBoundingClientRect();
        return {
            text: el.textContent.trim(),
            selected: el.getAttribute("aria-selected") === "true",
            tabindex: el.getAttribute("tabindex"),
            focused: document.activeElement === el,
            box: { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), cy: +(b.y + b.height / 2).toFixed(2) },
            color: s.color, bg: s.backgroundColor, boxShadow: s.boxShadow, transform: s.transform,
            outline: `${s.outlineWidth} ${s.outlineStyle} ${s.outlineColor}`,
            inlineStyleColor: el.style.color || null,
            glyphBox: gb ? { w: +gb.width.toFixed(2), h: +gb.height.toFixed(2), y: +gb.y.toFixed(2) } : null,
            seat: sb ? { x: +sb.x.toFixed(2), y: +sb.y.toFixed(2), w: +sb.width.toFixed(2), h: +sb.height.toFixed(2) } : null,
            dot: db ? { x: +db.x.toFixed(2), y: +db.y.toFixed(2), w: +db.width.toFixed(2), h: +db.height.toFixed(2), bg: getComputedStyle(dot).backgroundColor, filter: getComputedStyle(dot).filter, radius: getComputedStyle(dot).borderRadius } : null,
        };
    });
    const rows = [...document.querySelectorAll(".channel-strip")].map((el) => {
        const b = el.getBoundingClientRect();
        return { y: +b.y.toFixed(2), h: +b.height.toFixed(2), cy: +(b.y + b.height / 2).toFixed(2) };
    });
    const rowsBox = document.querySelector(".channel-rows");
    const rcs2 = rowsBox ? getComputedStyle(rowsBox) : null;
    return {
        rail: {
            box: { x: +rb.x.toFixed(2), y: +rb.y.toFixed(2), w: +rb.width.toFixed(2), h: +rb.height.toFixed(2) },
            innerW: +(rb.width - 2 * parseFloat(rcs.borderTopWidth) - 2 * parseFloat(rcs.paddingLeft)).toFixed(2),
            border: rcs.borderTopWidth, padding: rcs.paddingTop, radius: rcs.borderRadius,
            borderColor: rcs.borderColor, restInk: rcs.getPropertyValue("--console-rest-ink").trim(),
            accentView: getComputedStyle(document.documentElement).getPropertyValue("--accent-view").trim(),
        },
        lettersBox: (() => { const l = document.querySelector(".rail-letters"); const b = l.getBoundingClientRect(); const s = getComputedStyle(l); return { y: +b.y.toFixed(2), h: +b.height.toFixed(2), justify: s.justifyContent, rowGap: s.rowGap }; })(),
        rowsMeta: rcs2 ? { rowGap: rcs2.rowGap, justify: rcs2.justifyContent, h: +rowsBox.getBoundingClientRect().height.toFixed(2) } : null,
        items, rows,
    };
});

const px = async (x, y) => {
    const buf = await page.screenshot({ clip: { x, y, width: 1, height: 1 } });
    const { createCanvas, loadImage } = await import("node:util").then(() => ({}));
    return buf; // handled below via sharp-free path
};

const results = {};
results.URL = URL;
results.headNote = "read-only probe; no source edits";

// ---- A. DEFAULT (boot) register -----------------------------------------
results.A_default = await snap();

// ---- B. select the first channel, then measure rest/selected -------------
await page.click(".channel-rail-item >> nth=0");
await page.waitForTimeout(600);
results.B_afterSelectFirst = await snap();

// ---- C. hover a NON-selected item ---------------------------------------
await page.hover(".channel-rail-item >> nth=1");
await page.waitForTimeout(500);
results.C_hoverNonSelected = await snap();

// ---- D. hover the SELECTED item (does hover survive selection?) ---------
await page.hover(".channel-rail-item >> nth=0");
await page.waitForTimeout(500);
results.D_hoverSelected = await snap();

// ---- E. press (:active) on a non-selected item ---------------------------
const el2 = await page.$(".channel-rail-item >> nth=2");
const bb = await el2.boundingBox();
await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
await page.mouse.down();
await page.waitForTimeout(250);
results.E_press = await snap();
await page.mouse.up();
await page.waitForTimeout(600);

// ---- F. focus-visible via keyboard --------------------------------------
await page.mouse.move(10, 10);
await page.evaluate(() => document.querySelectorAll(".channel-rail-item")[0].blur());
// Reach the rail by keyboard from the console card: focus the tab, then arrow.
await page.evaluate(() => {
    const el = document.querySelectorAll(".channel-rail-item")[0];
    el.focus({ focusVisible: true });
});
await page.keyboard.press("ArrowDown");
await page.waitForTimeout(600);
results.F_keyboardArrowDown = await snap();

// ---- G. focus-visible + non-selected (is focus ring visible on -1 items?)
await page.keyboard.press("ArrowDown");
await page.waitForTimeout(500);
results.G_keyboardArrowDown2 = await snap();

// ---- H. does the ring/dot survive a mouse-only focus (focus-visible)? ----
await page.mouse.move(10, 10);
await page.click(".channel-rail-item >> nth=3");
await page.waitForTimeout(600);
results.H_mouseClickAlpha = await snap();

writeFileSync(join(HERE, "probe-01-registers.json"), JSON.stringify(results, null, 2));
console.log("wrote probe-01-registers.json");

// Alignment drift summary
for (const [k, v] of Object.entries(results)) {
    if (!v || typeof v !== "object" || !v.items) continue;
    const drift = v.items.map((it, i) => (v.rows[i] ? +(it.box.cy - v.rows[i].cy).toFixed(2) : null));
    console.log(k.padEnd(22), "sel=", v.items.findIndex((i) => i.selected), "drift(px)=", JSON.stringify(drift), "rowGap=", v.rowsMeta?.rowGap, "letterGap=", v.lettersBox?.rowGap);
}
await browser.close();
