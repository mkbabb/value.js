// PaletteCardMenu — CHALLENGE-C pass 3, probe D
// Decides: the typographic split between the menu (`text-small`, :7) and its own
// submenu (`text-caption`, :112). glass-ui defines `text-caption` with
// `font-style: italic`, so the five Export items render in a different voice
// from every other item in the same menu. Measured on desktop.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: [{
        id: "seed0", name: "Probe Palette 0", slug: "probe-0", isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }],
    }],
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(450);
// open the submenu by keyboard (the only working path — pass-2 C2-2)
await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('[role="menuitem"]')).find((e) => /Export/.test(e.textContent || ""));
    el.focus();
});
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(600);

log("D1_typographySplit", await page.evaluate(() => {
    const menus = Array.from(document.querySelectorAll('[role="menu"]'));
    const read = (el) => {
        const cs = getComputedStyle(el);
        return {
            text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 26),
            fontFamily: cs.fontFamily.split(",")[0],
            fontStyle: cs.fontStyle,
            fontSize: cs.fontSize,
            lineHeight: cs.lineHeight,
            fontWeight: cs.fontWeight,
        };
    };
    const surface = (m) => {
        const cs = getComputedStyle(m);
        return { id: m.id, cls: (m.className || "").toString().slice(0, 90),
                 backgroundColor: cs.backgroundColor, backdropFilter: cs.backdropFilter,
                 fontFamily: cs.fontFamily.split(",")[0], fontStyle: cs.fontStyle, fontSize: cs.fontSize };
    };
    return menus.map((m) => ({
        surface: surface(m),
        items: Array.from(m.querySelectorAll('[role="menuitem"]')).map(read),
    }));
}));

log("D2_utilityDefinitions", await page.evaluate(() => {
    const probe = (cls) => {
        const el = document.createElement("span");
        el.className = cls; el.textContent = "Xy";
        document.body.appendChild(el);
        const cs = getComputedStyle(el);
        const o = { cls, fontFamily: cs.fontFamily.split(",")[0], fontStyle: cs.fontStyle,
                    fontSize: cs.fontSize, lineHeight: cs.lineHeight };
        el.remove();
        return o;
    };
    return [probe("text-small"), probe("text-caption")];
}));

writeFileSync(new URL("./pcm-p3-d-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
