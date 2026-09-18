/**
 * CHALLENGE-C pass-5 probe #12 — is the pane's ONLY "add the current colour"
 * affordance operable at all?
 *
 * Source asks for (CurrentPaletteEditor.vue:95-105, rendered by
 * PalettesPane.vue:41-54):
 *     <WatercolorDot variant="ghost" tag="button"
 *                    :aria-label="`Add current color ${cssColorOpaque} to palette`"
 *                    @click="addCurrentColor">
 *
 * Measured: what the DOM actually is, whether a real mouse click reaches it,
 * whether the keyboard can reach it, and whether the palette grows.
 */
import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await page.addInitScript(() =>
    localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [] })),
);
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);

const dom = await page.evaluate(() => {
    const el = document.querySelector(".add-slot-ghost");
    if (!el) return { found: false };
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
        found: true,
        tagName: el.tagName,
        role: el.getAttribute("role"),
        ariaHidden: el.getAttribute("aria-hidden"),
        ariaLabel: el.getAttribute("aria-label"),
        title: el.getAttribute("title"),
        tabIndex: el.tabIndex,
        dataVariant: el.getAttribute("data-variant"),
        computedPointerEvents: cs.pointerEvents,
        inlinePointerEvents: el.style.pointerEvents,
        box: { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) },
        // what the browser says is actually at that point
        elementAtCentre: (() => {
            const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
            return hit ? `${hit.tagName}.${(hit.className || "").toString().split(" ")[0]}` : null;
        })(),
    };
});
console.log("DOM of the add-slot        :", JSON.stringify(dom, null, 2));

// Accessible-name / role via the real Chrome accessibility tree (CDP).
const cdp = await ctx.newCDPSession(page);
await cdp.send("Accessibility.enable");
const { nodes } = await cdp.send("Accessibility.getFullAXTree");
const named = nodes
    .filter((n) => (n.name?.value ?? "").toLowerCase().includes("add current color"))
    .map((n) => ({ role: n.role?.value, name: n.name?.value, ignored: n.ignored }));
console.log("AX nodes named 'Add current color':", JSON.stringify(named));

// Real mouse click at the element's centre (what a user does).
const before = await page.locator(".swatch-row [aria-label^='Edit color']").count();
if (dom.found) {
    await page.mouse.click(dom.box.x + dom.box.w / 2, dom.box.y + dom.box.h / 2);
    await page.waitForTimeout(700);
}
const afterMouse = await page.locator(".swatch-row [aria-label^='Edit color']").count();

// Keyboard reachability: tab through the pane and see if it is ever focused.
const focusables = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return null;
    const sel = 'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])';
    return [...well.querySelectorAll(sel)].map(
        (e) => `${e.tagName}${e.getAttribute("aria-label") ? `[${e.getAttribute("aria-label")}]` : ""}`,
    );
});

// Forced dispatch — proves the handler itself is fine and only the surface is dead.
const afterForced = await page.evaluate(() => {
    const el = document.querySelector(".add-slot-ghost");
    el?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    return new Promise((r) =>
        setTimeout(
            () => r(document.querySelectorAll(".swatch-row [aria-label^='Edit color']").length),
            600,
        ),
    );
});

console.log("swatches before click      :", before);
console.log("swatches after REAL mouse  :", afterMouse);
console.log("focusables inside the well :", JSON.stringify(focusables));
console.log("swatches after FORCED click:", afterForced);

await browser.close();
