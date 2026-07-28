// challenge-C · PreviewRamp — WHY does the only operand path not fire?
import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const out = {};
page.on("pageerror", (e) => (out.pageErrors ??= []).push(String(e)));
await page.goto("http://localhost:9000/#/mix");
await page.waitForSelector(".glass-dock", { timeout: 30000 });
await page.waitForTimeout(2500);

out.ghost = await page.evaluate(() => {
    const el = document.querySelector(".add-slot-ghost");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return {
        tag: el.tagName,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        pointerEvents: cs.pointerEvents,
        visibility: cs.visibility,
        display: cs.display,
        ariaHidden: el.getAttribute("aria-hidden"),
        tabIndex: el.tabIndex,
        hitTag: hit ? hit.tagName + "." + (hit.className || "").toString().slice(0, 60) : null,
        hitIsSelfOrChild: hit ? el.contains(hit) || hit === el : null,
        parentChain: (() => {
            const chain = [];
            for (let n = el; n && chain.length < 5; n = n.parentElement)
                chain.push(n.tagName + "." + (n.className || "").toString().slice(0, 40));
            return chain;
        })(),
    };
});

const swatchCount = () =>
    page.evaluate(() => document.querySelectorAll("[data-mix-source]").length);
out.swatchesBefore = await swatchCount();

// real user click at the ghost's centre
const r = out.ghost.rect;
await page.mouse.click(r.x + r.w / 2, r.y + r.h / 2);
await page.waitForTimeout(800);
out.swatchesAfterMouse = await swatchCount();

// synthetic DOM click, bypassing hit-testing entirely
await page.evaluate(() => document.querySelector(".add-slot-ghost").click());
await page.waitForTimeout(800);
out.swatchesAfterSynthetic = await swatchCount();

// keyboard reachability of the ghost
out.tabReachable = await page.evaluate(() => {
    const el = document.querySelector(".add-slot-ghost");
    return { tabIndex: el.tabIndex, isFocusable: el.tabIndex >= 0 };
});

// Is cssColorOpaque present? proxy: the dock colour input's value + the mix
// pane's own selected list.
out.mixButtonDisabled = await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) =>
        x.textContent.trim().startsWith("Mix"),
    );
    return b ? { disabled: b.disabled, text: b.textContent.trim() } : null;
});

await browser.close();
console.log(JSON.stringify(out, null, 1));
