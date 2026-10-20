// Recon: open every chip-bearing Select on its route; measure chips; frame it.
import { launch, cell, save, go, openSelect, measureChips, EVID } from "./lib.mjs";

const TARGETS = [
    ["generate", "Preset"],
    ["generate", "Harmony"],
    ["mix", "Color space"],
    ["mix", "Hue method"],
    ["gradient", "Color space"],
    ["atmosphere", "Harmony"],
];
const browser = await launch();
const out = {};
try {
    for (const [route, label] of TARGETS) {
        out[`${route}:${label}`] = await cell(browser, {}, async (page) => {
            await go(page, route);
            const labels = await page.evaluate(() =>
                [...document.querySelectorAll("[role=combobox]")].map((c) => {
                    const id = c.getAttribute("aria-labelledby");
                    return id ? document.getElementById(id)?.textContent?.trim() : c.textContent.trim();
                }),
            );
            try {
                await openSelect(page, label);
            } catch (e) {
                return { labels, openError: String(e).slice(0, 200) };
            }
            const m = await measureChips(page);
            await page.screenshot({ path: `${EVID}/recon-${route}-${label.replace(/\s/g, "")}.png` });
            return { labels, ...m };
        });
    }
} finally {
    await browser.close();
}
save("recon.json", out);
for (const [k, v] of Object.entries(out)) {
    console.log(k, v.error ?? v.openError ?? "", "labels=", JSON.stringify(v.labels ?? []).slice(0, 200));
    for (const r of v.rows ?? []) console.log("  ", r.label.slice(0, 30), r.chip && `${r.chip.w}x${r.chip.h}`, r.aspect, r.descFont, r.segments.length);
}
