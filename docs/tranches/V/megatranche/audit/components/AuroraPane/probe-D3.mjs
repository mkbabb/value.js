// CHALLENGE-D · probe 3 — quantify the open-menu occlusion failure and the
// PreviewStrip specimen size, and sample real pixels through the menu surface.
import { webkit, devices } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const ROUTE = "http://localhost:9000/#/atmosphere";
const out = {};
const browser = await webkit.launch();

const MEASURE = () => {
    const n = (v) => Math.round(v * 100) / 100;
    const content = document.querySelector("[role=listbox]");
    const cs = getComputedStyle(content);
    const opt = content.querySelector("[role=option]");
    const optCs = getComputedStyle(opt);
    // PreviewStrip chips = the leaf elements inside the option that paint a colour
    const chips = [...opt.querySelectorAll("*")]
        .filter((e) => !e.children.length && getComputedStyle(e).backgroundColor !== "rgba(0, 0, 0, 0)")
        .map((e) => { const b = e.getBoundingClientRect(); return { w: n(b.width), h: n(b.height), bg: getComputedStyle(e).backgroundColor }; });
    const strip = chips.length ? chips[0].w * chips.length : 0;
    const label = [...opt.childNodes].map((x) => x.textContent).join("").trim();
    return {
        contentBg: cs.backgroundColor,
        contentBackdrop: cs.backdropFilter || cs.webkitBackdropFilter,
        contentOpacity: cs.opacity,
        optionBg: optCs.backgroundColor,
        optionRect: (() => { const b = opt.getBoundingClientRect(); return { w: n(b.width), h: n(b.height) }; })(),
        optionTextWidthShare: n((label.length * parseFloat(optCs.fontSize) * 0.5) / opt.getBoundingClientRect().width * 100),
        chips, stripTotalW: n(strip),
        // What sits UNDER the menu that the menu fails to hide?
        occludedBehind: (() => {
            const cb = content.getBoundingClientRect();
            const hits = [];
            for (const el of document.querySelectorAll(".aurora-row-label, .config-section-title, .configurator-row, .aurora-row [role=combobox]")) {
                const b = el.getBoundingClientRect();
                const overlap = Math.max(0, Math.min(b.bottom, cb.bottom) - Math.max(b.top, cb.top)) *
                    Math.max(0, Math.min(b.right, cb.right) - Math.max(b.left, cb.left));
                if (overlap > 0) hits.push({ el: el.className.split(" ")[0] || el.tagName, text: el.textContent.trim().slice(0, 28), overlapPx2: Math.round(overlap) });
            }
            return hits;
        })(),
    };
};

for (const [tag, ctxOpts] of [
    ["desktop", { viewport: { width: 1440, height: 900 }, colorScheme: "light" }],
    ["mobile", { ...devices["iPhone 14"] }],
]) {
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    await page.goto(ROUTE, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2500);
    await page.locator('[aria-label="Palette harmony"]').click();
    await page.waitForTimeout(900);
    out[tag] = await page.evaluate(MEASURE);
    await ctx.close();
}
await browser.close();
writeFileSync(resolve(HERE, "probe-D3.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
