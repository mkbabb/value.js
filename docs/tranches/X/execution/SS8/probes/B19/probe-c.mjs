// SS-8 · B19 probe C (2026-10-20) — R-1 real (non-forced) click on the mix door,
// then the R-17 narrow-menu overflow read with chips mounted (390 / 320).
// usage: node probe-c.mjs   (one browser per run; one context per cell)
import { launch, cell, save, go, openSelect, measureChips, EVID } from "./lib.mjs";

const out = {};
async function waitLabel(page, label) {
    await page.waitForFunction((label) => [...document.querySelectorAll("[role=combobox]")].some((c) => {
        const id = c.getAttribute("aria-labelledby");
        return id && document.getElementById(id)?.textContent?.trim() === label;
    }), label, { timeout: 60000 });
    await page.waitForTimeout(600);
}
const chipsInMenu = (page) => page.locator("[role=listbox] .preview-chip").count();

const browser = await launch();
try {
    for (const [name, viewport] of [["1440", { width: 1440, height: 900 }], ["390", { width: 390, height: 844 }], ["320", { width: 320, height: 700 }]]) {
        out[name] = await cell(browser, { viewport }, async (page) => {
            await go(page, "mix");
            await waitLabel(page, "Color space");
            const res = {};
            await openSelect(page, "Color space");
            res.chipsBefore = await chipsInMenu(page);
            await page.keyboard.press("Escape");
            await page.waitForTimeout(400);
            const door = page.getByRole("button", { name: "Add current color to the mix" });
            res.doorCount = await door.count();
            // a REAL click: actionability checks on (no force) — hit-testing must reach the button
            await door.first().click({ timeout: 10000 });
            await page.waitForTimeout(500);
            await openSelect(page, "Color space");
            res.chipsAfter1 = await chipsInMenu(page);
            await page.keyboard.press("Escape");
            await page.waitForTimeout(400);
            await door.first().click({ timeout: 10000 });
            await page.waitForTimeout(600);
            for (const label of ["Color space", "Hue method"]) {
                await openSelect(page, label);
                const m = await measureChips(page);
                const ov = await page.evaluate(() => {
                    const lb = document.querySelector("[role=listbox]");
                    const vp = window.innerWidth;
                    return [...lb.querySelectorAll("[role=option]")].map((o) => {
                        const b = o.getBoundingClientRect();
                        const kids = [...o.querySelectorAll("*")];
                        const maxRight = Math.max(...kids.map((k) => k.getBoundingClientRect().right));
                        return { label: o.textContent.trim().slice(0, 24), optRight: +b.right.toFixed(2), maxChildRight: +maxRight.toFixed(2), childOverflow: +(maxRight - b.right).toFixed(2), scroll: [o.scrollWidth, o.clientWidth], offViewport: maxRight > vp };
                    });
                });
                res[label] = { n: m.rows.length, chips: m.rows.filter((r) => r.chip).length, aspect: m.rows[0]?.aspect, listbox: m.listbox, overflow: ov, worstChildOverflow: Math.max(...ov.map((o) => o.childOverflow)), anyOffViewport: ov.some((o) => o.offViewport) };
                await page.screenshot({ path: `${EVID}/c-mix-${name}-${label.replace(/\s/g, "")}.png` });
                await page.keyboard.press("Escape");
                await page.waitForTimeout(400);
            }
            return res;
        });
    }
} finally {
    await browser.close();
}
save("probe-c.json", out);
console.log(JSON.stringify(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.error ?? { before: v.chipsBefore, after1: v.chipsAfter1, cs: v["Color space"]?.worstChildOverflow, hue: v["Hue method"]?.worstChildOverflow, off: v["Color space"]?.anyOffViewport }]))));
