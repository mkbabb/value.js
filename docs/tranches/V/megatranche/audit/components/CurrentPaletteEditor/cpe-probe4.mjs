import { chromium } from "playwright";
const out = (...a) => console.log(...a);
const SP = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const SEED = {
    inputColor: "lab(50% 20 -30)",
    savedColors: ["lab(50% 20 -30)", "lab(70% -40 10)", "lab(30% 5 60)"],
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((s) => {
    localStorage.setItem("color-picker", JSON.stringify(s));
}, SEED);
const page = await ctx.newPage();
page.on("pageerror", (e) => out("PAGEERROR:", e.message));
await page.goto("http://localhost:9000/", { waitUntil: "load" });
await page.waitForTimeout(4000);
await page.getByRole("combobox", { name: "Select view" }).click();
await page.waitForTimeout(300);
await page.getByRole("option", { name: "Palettes", exact: true }).click();
await page.waitForTimeout(3000);

// A: does the swatch row render 3 swatches, and what are they?
const row = await page.evaluate(() => {
    const well = document.querySelector(".dashed-well");
    if (!well) return null;
    const rowEl = well.querySelector(".swatch-row");
    const dots = [...rowEl.querySelectorAll(".watercolor-swatch")];
    return {
        headerText: well.querySelector("span")?.textContent,
        countText: well.querySelectorAll(".text-mono-small")[0]?.textContent,
        dots: dots.map((d) => {
            const cs = getComputedStyle(d);
            return {
                tag: d.tagName,
                variant: d.getAttribute("data-variant"),
                ariaHidden: d.getAttribute("aria-hidden"),
                ariaLabel: d.getAttribute("aria-label"),
                pointerEvents: cs.pointerEvents,
                childElems: d.children.length,
                hasSvgOnly: [...d.children].every((c) => c.tagName === "svg" || c.className?.baseVal !== undefined || String(c.className).includes("ghost-stroke")),
                inner: d.innerHTML.replace(/\s+/g, " ").slice(0, 120),
            };
        }),
    };
});
out("A swatch row:", JSON.stringify(row, null, 1));

// B: nameless visible buttons (now that the save row exists)
const nameless = await page.evaluate(() => {
    const res = [];
    for (const b of document.querySelectorAll("button")) {
        const r = b.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const name = (b.getAttribute("aria-label") || b.getAttribute("title") || b.innerText || "").trim();
        if (!name) res.push({ w: Math.round(r.width), h: Math.round(r.height), cls: String(b.className).slice(0, 80), inWell: !!b.closest(".dashed-well"), html: b.innerHTML.replace(/\s+/g, " ").slice(0, 100) });
    }
    return res;
});
out("B nameless visible buttons:", JSON.stringify(nameless, null, 1));

// C: hover the first swatch wrapper -> teleported panel
const wrapper = page.locator(".swatch-row > div.relative").first();
const wBox = await wrapper.boundingBox();
await wrapper.hover();
await page.waitForTimeout(500);
const panel = await page.evaluate(() => {
    const el = document.querySelector(".floating-panel");
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
        parentIsBody: el.parentElement === document.body,
        inlineStyle: el.getAttribute("style"),
        position: cs.position, top: cs.top, left: cs.left, zIndex: cs.zIndex,
        background: cs.backgroundColor, boxShadow: cs.boxShadow,
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        ariaHidden: el.getAttribute("aria-hidden"),
        buttons: [...el.querySelectorAll("button")].map((b) => b.getAttribute("aria-label")),
        docScrollH: document.documentElement.scrollHeight,
        winH: window.innerHeight,
    };
});
out("C swatch wrapper rect:", JSON.stringify(wBox));
out("C .floating-panel:", JSON.stringify(panel, null, 1));
await page.screenshot({ path: `${SP}/cpe-hover.png` });

// D: TransitionGroup key stability — tag the 3rd swatch node, remove the 1st, check identity
await page.evaluate(() => {
    const wrappers = [...document.querySelectorAll(".swatch-row > div.relative")];
    wrappers.forEach((w, i) => { w.dataset.probeTag = "n" + i; });
});
// click Remove in the open panel (panel belongs to swatch 0)
const removeBtn = page.locator('.floating-panel button[aria-label^="Remove color"]');
const removeCount = await removeBtn.count();
out("D remove button count:", removeCount);
if (removeCount) {
    await removeBtn.first().click();
    await page.waitForTimeout(900);
}
const after = await page.evaluate(() => {
    const wrappers = [...document.querySelectorAll(".swatch-row > div.relative")];
    return wrappers.map((w) => ({ probeTag: w.dataset.probeTag ?? "(NEW NODE)", label: w.querySelector(".watercolor-swatch")?.style.getPropertyValue("--watercolor-color") }));
});
out("D wrappers after removing index 0:", JSON.stringify(after, null, 1));

// E: scroll while the hover panel is open -> does it follow?
await page.evaluate(() => { document.querySelector(".pane-scroll-fade")?.scrollTo(0, 0); });
const wrapper2 = page.locator(".swatch-row > div.relative").first();
await wrapper2.hover();
await page.waitForTimeout(400);
const before = await page.evaluate(() => {
    const el = document.querySelector(".floating-panel");
    const sw = document.querySelector(".swatch-row > div.relative");
    return el ? { panel: el.getBoundingClientRect().top, swatch: sw.getBoundingClientRect().top, inline: el.getAttribute("style") } : null;
});
await page.evaluate(() => window.scrollBy(0, 200));
await page.evaluate(() => { const s = document.querySelector(".pane-scroll-fade"); if (s) s.scrollTop += 150; });
await page.waitForTimeout(400);
const afterScroll = await page.evaluate(() => {
    const el = document.querySelector(".floating-panel");
    const sw = document.querySelector(".swatch-row > div.relative");
    return el ? { panel: el.getBoundingClientRect().top, swatch: sw.getBoundingClientRect().top, inline: el.getAttribute("style") } : "panel gone";
});
out("E before scroll:", JSON.stringify(before));
out("E after scroll:", JSON.stringify(afterScroll));

await browser.close();
