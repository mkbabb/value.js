import { webkit } from "playwright";

const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const p = await ctx.newPage();
const errs = [];
p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text()); });
p.on("pageerror", (e) => errs.push("pageerror: " + e.message));

await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);

// 1) Does ANY loaded stylesheet define a `.focus-ring` rule?
const cssAudit = await p.evaluate(() => {
    let focusRingRules = 0, scrollbarThinRules = 0, total = 0, unreadable = 0;
    const walk = (rules) => {
        for (const r of rules) {
            total++;
            if (r.cssRules) { walk(r.cssRules); continue; }
            const sel = r.selectorText || "";
            if (/\.focus-ring(?![-\w])/.test(sel)) focusRingRules++;
            if (/\.scrollbar-thin(?![-\w])/.test(sel)) scrollbarThinRules++;
        }
    };
    for (const s of document.styleSheets) {
        try { walk(s.cssRules); } catch { unreadable++; }
    }
    return { focusRingRules, scrollbarThinRules, total, unreadable,
             tokenInner: getComputedStyle(document.documentElement).getPropertyValue("--focus-ring-inner").trim() };
});
console.log("CSS AUDIT:", JSON.stringify(cssAudit));

// 2) Open the SearchFilterBar popover (kebab, aria-label="Filters")
const trigger = p.locator('button[aria-label="Filters"]').first();
console.log("filters trigger count:", await p.locator('button[aria-label="Filters"]').count());
await trigger.click();
await p.waitForTimeout(600);
await p.screenshot({ path: `${OUT}/SFB-L-popover-open.png` });

// 3) Focus the swatch trigger and measure its focus affordance
const swatch = p.locator('button[aria-label^="Open color picker"]').first();
console.log("swatch count:", await swatch.count());
const swatchBox = await swatch.boundingBox();
console.log("swatch box:", JSON.stringify(swatchBox));
const focusStyle = await swatch.evaluate((el) => {
    el.focus();
    const cs = getComputedStyle(el);
    return {
        classList: [...el.classList],
        boxShadow: cs.boxShadow,
        outlineStyle: cs.outlineStyle,
        outlineWidth: cs.outlineWidth,
        matchesFocusVisible: el.matches(":focus-visible"),
    };
});
console.log("SWATCH FOCUS:", JSON.stringify(focusStyle, null, 1));

// 4) Tap-target sizes inside the popover
const taps = await p.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('[data-reka-popper-content-wrapper] button, [role="dialog"] button, [data-radix-popper-content-wrapper] button')) {
        const r = el.getBoundingClientRect();
        if (r.width && r.height && (r.width < 44 || r.height < 44)) {
            out.push({ w: Math.round(r.width), h: Math.round(r.height), label: el.getAttribute("aria-label") || el.textContent.trim().slice(0, 24) });
        }
    }
    return out;
});
console.log("POPOVER SMALL TAP TARGETS:", JSON.stringify(taps));

// 5) Prove the hsl() silent-fallback in the LIVE component: type hsl(), press the search button,
//    and read back what the field/swatch state became.
const input = p.locator('input[aria-label="Search by CSS color"]').first();
await input.fill("hsl(120, 80%, 40%)");
await p.locator('button:has-text("Search")').first().click();
await p.waitForTimeout(400);
const after = await p.evaluate(() => {
    const i = document.querySelector('input[aria-label="Search by CSS color"]');
    const sw = document.querySelector('button[aria-label^="Open color picker"]');
    return { fieldValue: i && i.value, swatchLabel: sw && sw.getAttribute("aria-label"),
             swatchBg: sw && getComputedStyle(sw).backgroundColor,
             badge: document.querySelector('button[aria-label="Filters"] span')?.textContent?.trim() ?? null };
});
console.log("AFTER hsl() SEARCH:", JSON.stringify(after));
await p.screenshot({ path: `${OUT}/SFB-L-after-hsl.png` });

console.log("CONSOLE:", JSON.stringify(errs.slice(0, 10), null, 1));
await b.close();
