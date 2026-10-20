// SS-8 · B19 probe E (2026-10-20) — PS-24 honest minimum width of the /generate chip menus
// (does `min-w-menu` = 11rem seat chip + longest description?) and the C-13 timing re-run with
// the slider's aria-valuenow read back (the count is witnessed, not assumed).
// usage: node probe-e.mjs [widths] [timing]
import { launch, cell, save, go, openSelect } from "./lib.mjs";

const want = new Set(process.argv.slice(2));
const on = (k) => want.size === 0 || want.has(k);
const out = {};
async function waitLabel(page, label) {
    await page.waitForFunction((label) => [...document.querySelectorAll("[role=combobox]")].some((c) => {
        const id = c.getAttribute("aria-labelledby");
        return id && document.getElementById(id)?.textContent?.trim() === label;
    }), label, { timeout: 60000 });
    await page.waitForTimeout(800);
}
const LT = () => { window.__lt = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push({ t: +e.startTime.toFixed(1), d: +e.duration.toFixed(1) }); }).observe({ type: "longtask", buffered: false }); };
const drain = (page) => page.evaluate(() => { const a = window.__lt; window.__lt = []; return a; });

const browser = await launch();
try {
    if (on("widths")) {
        out.widths = await cell(browser, {}, async (page) => {
            await go(page, "generate");
            await waitLabel(page, "Preset");
            const res = {};
            const slider = page.getByRole("slider", { name: "Number of colors" });
            await slider.focus(); await page.keyboard.press("End"); await page.waitForTimeout(600);
            for (const label of ["Preset", "Harmony"]) {
                await openSelect(page, label);
                res[label] = await page.evaluate(() => {
                    const lb = document.querySelector("[role=listbox]");
                    const content = lb.closest("[data-reka-popper-content-wrapper]")?.firstElementChild ?? lb.parentElement;
                    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
                    const menuMinW = getComputedStyle(document.documentElement).getPropertyValue("--menu-min-w").trim();
                    const shipped = { minW: getComputedStyle(content).minWidth, w: content.getBoundingClientRect().width };
                    // the honest minimum: the widest option at max-content (no min-width floor)
                    const opts = [...lb.querySelectorAll("[role=option]")];
                    const prev = content.style.cssText;
                    content.style.minWidth = "0px"; content.style.width = "max-content";
                    const maxContent = content.getBoundingClientRect().width;
                    // seat test at 11rem: does any option wrap its description or clip a child?
                    content.style.width = menuMinW.endsWith("rem") ? `${parseFloat(menuMinW) * rem}px` : menuMinW;
                    const at11 = opts.map((o) => {
                        const desc = o.querySelector(".text-micro");
                        const lh = desc ? parseFloat(getComputedStyle(desc).lineHeight) : 0;
                        const chip = o.querySelector(".preview-chip");
                        const ob = o.getBoundingClientRect();
                        return { label: o.textContent.trim().slice(0, 28), descLines: desc ? Math.round(desc.getBoundingClientRect().height / lh) : null, descClipped: desc ? desc.scrollWidth > desc.clientWidth + 0.5 : null, chipInside: chip ? chip.getBoundingClientRect().right <= ob.right + 0.5 : null, chipW: chip ? +chip.getBoundingClientRect().width.toFixed(3) : null };
                    });
                    const w11 = content.getBoundingClientRect().width;
                    content.style.cssText = prev;
                    return { rem, menuMinW, elevenRemPx: 11 * rem, shipped, maxContentPx: +maxContent.toFixed(3), maxContentRem: +(maxContent / rem).toFixed(3), w11, wrapsAt11: at11.filter((r) => r.descLines > 1).length, clippedAt11: at11.filter((r) => r.descClipped).length, chipOutAt11: at11.filter((r) => r.chipInside === false).length, at11 };
                });
                await page.keyboard.press("Escape");
                await page.waitForTimeout(400);
            }
            return res;
        });
    }
    if (on("timing")) {
        out.timing = await cell(browser, {}, async (page) => {
            await page.addInitScript(LT);
            await go(page, "generate");
            await waitLabel(page, "Preset");
            await page.waitForTimeout(2500);
            const slider = page.getByRole("slider", { name: "Number of colors" });
            const res = {};
            for (const [k, key] of [["count12", "End"], ["count1", "Home"]]) {
                await slider.focus(); await page.keyboard.press(key); await page.waitForTimeout(800);
                res[k] = { valuenow: await slider.getAttribute("aria-valuenow"), opens: [] };
                for (let rep = 0; rep < 5; rep++) {
                    await drain(page);
                    await openSelect(page, "Preset");
                    await page.waitForTimeout(700);
                    const tasks = await drain(page);
                    const stamped = await page.evaluate(() => document.querySelector("[role=listbox] [data-stops]")?.getAttribute("data-stops")?.split("|").length ?? null);
                    res[k].opens.push({ tasks, stampedFirstRow: stamped });
                    await page.keyboard.press("Escape");
                    await page.waitForTimeout(700);
                }
            }
            await slider.focus(); await page.keyboard.press("Home"); await page.waitForTimeout(800);
            await drain(page);
            for (let i = 0; i < 11; i++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(250); }
            await page.waitForTimeout(500);
            res.steps = { tasks: await drain(page), valuenow: await slider.getAttribute("aria-valuenow") };
            res.cpus = await page.evaluate(() => navigator.hardwareConcurrency);
            return res;
        });
    }
} finally {
    await browser.close();
}
const tag = [...want].join("_") || "all";
save(`probe-e-${tag}.json`, out);
console.log(JSON.stringify(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.error ?? "ok"]))));
