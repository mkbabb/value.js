import { chromium } from "playwright";
const D = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/idz-seatD";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/extract");
await page.waitForTimeout(3500);

const R = {};

// focus register on the EMPTY zone
R.focus = await page.evaluate(() => {
    const el = document.querySelector('[role="button"][aria-label]');
    const idle = getComputedStyle(el);
    const before = { outline: idle.outlineStyle + " " + idle.outlineWidth + " " + idle.outlineColor, boxShadow: idle.boxShadow, border: idle.borderTopColor };
    el.focus();
    const f = getComputedStyle(el);
    return {
        before,
        afterFocus: { outline: f.outlineStyle + " " + f.outlineWidth + " " + f.outlineColor, boxShadow: f.boxShadow, border: f.borderTopColor },
        matchesFocusVisible: el.matches(":focus-visible"),
        isActiveElement: document.activeElement === el,
    };
});

// keyboard focus-visible (real Tab)
await page.evaluate(() => document.body.focus());
let found = null;
for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    const hit = await page.evaluate(() => {
        const a = document.activeElement;
        if (!a || !a.matches || !a.matches('[role="button"][aria-label*="Upload"]')) return null;
        const c = getComputedStyle(a);
        return { outline: c.outlineStyle + " " + c.outlineWidth + " " + c.outlineColor, boxShadow: c.boxShadow, focusVisible: a.matches(":focus-visible"), border: c.borderTopColor, cornerTagOpacity: (() => { const t = a.querySelector("span[aria-hidden]"); return t ? getComputedStyle(t).opacity : "no-tag"; })() };
    });
    if (hit) { found = { tabIndex: i + 1, ...hit }; break; }
}
R.keyboardFocus = found;
if (found) await page.locator('[role="button"][aria-label]').screenshot({ path: `${D}/H-focus-ring.png` });

// type rungs available
R.typeRungs = await page.evaluate(() => {
    const probe = (cls) => { const d = document.createElement("div"); d.className = cls; d.textContent = "x"; document.body.appendChild(d); const c = getComputedStyle(d); const o = { fs: c.fontSize, lh: c.lineHeight, ff: c.fontFamily.split(",")[0] }; d.remove(); return o; };
    return { textProse: probe("text-prose"), textSmall: probe("text-small"), monoSmall: probe("text-mono-small"), monoCaption: probe("text-mono-caption"), body: probe("text-body") };
});

// keyboard activation on empty state: does Enter open the picker?
R.enterOpensPicker = await page.evaluate(() => {
    const el = document.querySelector('[role="button"][aria-label]');
    const inp = el.querySelector('input[type=file]');
    let clicked = 0;
    inp.addEventListener("click", (e) => { clicked++; e.preventDefault(); }, { once: false });
    el.focus();
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    el.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true }));
    return { fileInputClicks: clicked };
});

// after a preview exists: click activates eyedropper? keyboard?
await page.setInputFiles("input[type=file]", `${D}/four3.png`);
await page.waitForTimeout(2500);
R.populated = await page.evaluate(() => {
    const el = document.querySelector('[role="button"][aria-label]');
    const inp = el.querySelector('input[type=file]');
    let clicked = 0;
    inp.addEventListener("click", (e) => { clicked++; e.preventDefault(); });
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    const cs = getComputedStyle(el);
    return { tabIndex: el.tabIndex, role: el.getAttribute("role"), ariaLabel: el.getAttribute("aria-label"), cursor: cs.cursor, fileInputClicksOnEnter: clicked, canFocus: (() => { el.focus(); return document.activeElement === el; })() };
});

console.log(JSON.stringify(R, null, 1));
await b.close();
