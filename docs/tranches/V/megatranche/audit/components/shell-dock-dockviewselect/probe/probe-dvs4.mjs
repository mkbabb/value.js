import { chromium } from "@playwright/test";

const BASE = "http://localhost:9000";
const out = {};

const run = async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/`);
    await page.waitForTimeout(3500);

    // keyboard-focus the view-select trigger the way a keyboard user does
    await page.evaluate(() => document.querySelector(".view-select-trigger").focus());
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await page.waitForTimeout(300);

    out["H1 focus ring on the VIEW SELECT trigger"] = await page.evaluate(() => {
        const t = document.querySelector(".view-select-trigger");
        t.focus();
        const cs = getComputedStyle(t);
        return {
            focused: document.activeElement === t,
            matchesFocusVisible: t.matches(":focus-visible"),
            dockRingToken: cs.getPropertyValue("--dock-ring").trim(),
            focusRingShadowToken: cs.getPropertyValue("--focus-ring-shadow").trim().slice(0, 120),
            boxShadow: cs.boxShadow,
            outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
        };
    });

    // the SIBLING dock control that does NOT override --dock-ring
    out["H2 focus ring on the sibling 'Toggle action bar' control"] = await page.evaluate(() => {
        const b = [...document.querySelectorAll(".glass-dock button")].find(
            (x) => x.getAttribute("aria-label") === "Toggle action bar",
        );
        if (!b) return null;
        b.focus();
        const cs = getComputedStyle(b);
        return {
            matchesFocusVisible: b.matches(":focus-visible"),
            dockRingToken: cs.getPropertyValue("--dock-ring").trim().slice(0, 160),
            boxShadow: cs.boxShadow,
            outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
        };
    });

    // real keyboard traversal (:focus-visible truly armed), screenshot for proof
    await page.keyboard.press("Escape");
    await page.evaluate(() => document.body.focus());
    for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Tab");
        const hit = await page.evaluate(
            () => document.activeElement?.classList.contains("view-select-trigger"),
        );
        if (hit) break;
    }
    out["H3 tabbed-to state"] = await page.evaluate(() => {
        const t = document.activeElement;
        const cs = getComputedStyle(t);
        return {
            isViewSelect: t.classList.contains("view-select-trigger"),
            ariaLabel: t.getAttribute("aria-label"),
            focusVisible: t.matches(":focus-visible"),
            boxShadow: cs.boxShadow,
            outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
        };
    });
    await page.locator(".glass-dock").screenshot({
        path: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/dock-focus.png",
    });

    // the SelectValue span: is the [&>span]:line-clamp-none cancelling anything?
    out["H4 trigger label span"] = await page.evaluate(() => {
        const t = document.querySelector(".view-select-trigger");
        const spans = [...t.children].filter((c) => c.tagName === "SPAN");
        return spans.map((s) => {
            const cs = getComputedStyle(s);
            return {
                text: s.innerText.trim().slice(0, 20),
                display: cs.display,
                webkitLineClamp: cs.webkitLineClamp,
                overflow: cs.overflow,
                boxOrient: cs.webkitBoxOrient,
            };
        });
    });

    await browser.close();
    console.log(JSON.stringify(out, null, 2));
};

run().catch((e) => {
    console.error(e);
    console.log(JSON.stringify(out, null, 2));
    process.exit(1);
});
