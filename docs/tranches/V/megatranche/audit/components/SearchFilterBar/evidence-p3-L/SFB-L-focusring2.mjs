import { webkit } from "playwright";
const b = await webkit.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await p.waitForTimeout(3000);

const r = await p.evaluate(() => {
    // RAW TEXT search across every stylesheet, not selectorText walking.
    let allText = "";
    let sheets = 0, unreadable = 0;
    const dump = (rules) => { for (const x of rules) { allText += x.cssText + "\n"; } };
    for (const s of document.styleSheets) {
        sheets++;
        try { dump(s.cssRules); } catch { unreadable++; }
    }
    const count = (needle) => (allText.match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
    return {
        sheets, unreadable, bytes: allText.length,
        focusRingFocusVisible: count(".focus-ring:focus-visible"),
        focusRingAny: count(".focus-ring"),
        scrollbarThin: count(".scrollbar-thin"),
        tapSquish: count(".tap-squish"),
        interactiveItem: count(".interactive-item"),
        focusRingShadowToken: getComputedStyle(document.documentElement).getPropertyValue("--focus-ring-shadow").trim(),
    };
});
console.log("RAW CSS TEXT AUDIT:", JSON.stringify(r, null, 1));

// Now really focus the swatch via keyboard so :focus-visible engages.
await p.locator('button[aria-label="Filters"]').first().click();
await p.waitForTimeout(500);
const sw = p.locator('button[aria-label^="Open color picker"]').first();
// keyboard-focus it: click into the popover then Tab until the swatch is active
await p.keyboard.press("Tab");
const viaKeyboard = await sw.evaluate((el) => {
    el.focus();
    return { focusVisible: el.matches(":focus-visible"), boxShadow: getComputedStyle(el).boxShadow };
});
console.log("swatch el.focus():", JSON.stringify(viaKeyboard));

// A glass-ui control that ships .focus-ring in its own class list, for comparison
const cmp = await p.evaluate(() => {
    const el = document.querySelector('.focus-ring');
    if (!el) return "no element carries .focus-ring";
    el.focus?.();
    return { tag: el.tagName, cls: el.className, focusVisible: el.matches(":focus-visible"), boxShadow: getComputedStyle(el).boxShadow.slice(0, 120) };
});
console.log("first .focus-ring element:", JSON.stringify(cmp));
await b.close();
