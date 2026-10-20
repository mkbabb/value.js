// SS-8 · B19 probe B — timing / atmosphere rhythm + seeds / fuzz / groupings / bleed.
// usage: node probe-b.mjs <cell...>
import { launch, cell, save, go, openSelect, measureChips, EVID } from "./lib.mjs";

const want = new Set(process.argv.slice(2));
const on = (k) => want.size === 0 || want.has(k);
const out = {};
const FS = "/@fs/Users/mkbabb/Programming/value.js/demo";

async function waitLabel(page, label) {
    await page.waitForFunction((label) => [...document.querySelectorAll("[role=combobox]")].some((c) => {
        const id = c.getAttribute("aria-labelledby");
        return id && document.getElementById(id)?.textContent?.trim() === label;
    }), label, { timeout: 30000 });
    await page.waitForTimeout(600);
}
const LT = () => { window.__lt = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push({ t: +e.startTime.toFixed(1), d: +e.duration.toFixed(1) }); }).observe({ type: "longtask", buffered: false }); };
const drain = (page) => page.evaluate(() => { const a = window.__lt; window.__lt = []; return a; });

const browser = await launch();
try {
    // ── C-13: long tasks on Preset open at count 12 vs 1; 11 closed-menu slider steps
    if (on("timing")) {
        out.timing = await cell(browser, {}, async (page) => {
            await page.addInitScript(LT);
            await go(page, "generate");
            await waitLabel(page, "Preset");
            await page.waitForTimeout(2500);
            const slider = page.getByRole("slider", { name: "Number of colors" });
            const res = { open12: [], open1: [], steps: null };
            for (const [k, key] of [["open12", "End"], ["open1", "Home"]]) {
                await slider.focus(); await page.keyboard.press(key); await page.waitForTimeout(800);
                for (let rep = 0; rep < 3; rep++) {
                    await drain(page);
                    await openSelect(page, "Preset");
                    await page.waitForTimeout(700);
                    res[k].push(await drain(page));
                    await page.keyboard.press("Escape");
                    await page.waitForTimeout(700);
                }
            }
            await slider.focus(); await page.keyboard.press("Home"); await page.waitForTimeout(800);
            await drain(page);
            for (let i = 0; i < 11; i++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(250); }
            await page.waitForTimeout(500);
            res.steps = { tasks: await drain(page), count: await page.evaluate(() => document.querySelector("[data-generate-plate]")?.textContent?.match(/\d+/g)?.slice(-1)) };
            return res;
        });
    }
    // ── D-6 row rhythm on /atmosphere + 3 seeds (pink-family limb); PS-24 width
    if (on("atmos")) {
        out.atmos = {};
        for (const seed of ["oklch(70% 0.15 350)", "oklch(70% 0.15 160)", "oklch(80% 0.15 90)"]) {
            out.atmos[seed] = await cell(browser, {}, async (page) => {
                await page.addInitScript((s) => localStorage.setItem("color-picker", JSON.stringify({ inputColor: s, savedColors: [] })), seed);
                await go(page, "atmosphere");
                await waitLabel(page, "Harmony");
                await openSelect(page, "Harmony");
                const h = await measureChips(page);
                const tag = seed.match(/\d+\)$/)[0].slice(0, -1);
                await page.screenshot({ path: `${EVID}/atmos-harmony-h${tag}.png` });
                const widths = await page.evaluate(() => {
                    const lb = document.querySelector("[role=listbox]");
                    const opt = lb.querySelector("[role=option]");
                    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
                    return { lbW: lb.getBoundingClientRect().width, contentMinW: getComputedStyle(lb.closest("[data-reka-select-content], [role=listbox]").parentElement).minWidth, rem, elevenRem: 11 * rem, optScroll: [opt.scrollWidth, opt.clientWidth], anyOverflow: [...lb.querySelectorAll("[role=option] *")].some((e) => e.scrollWidth > e.clientWidth + 0.5 && getComputedStyle(e).overflow !== "visible") };
                });
                await page.keyboard.press("Escape");
                await page.waitForTimeout(400);
                await openSelect(page, "Arrangement");
                const a = await measureChips(page);
                return {
                    harmonyRows: h.rows.map((r) => ({ label: r.label, h: r.row.h, chip: r.chip, stops: r.stops })),
                    arrangementRowH: a.rows.map((r) => r.row.h),
                    widths,
                    frame: `atmos-harmony-h${tag}.png`,
                };
            });
        }
    }
    // ── module-level witnesses through the dev server: C-9 fuzz, R-3 groupings, R-15 NaN
    if (on("modules")) {
        out.modules = await cell(browser, {}, async (page) => {
            await go(page, "atmosphere");
            await waitLabel(page, "Harmony");
            return page.evaluate(async (FS) => {
                const A = await import(`${FS}/scenes/atmosphere/aurora-harmony-stops.ts`);
                const S = await import(`${FS}/shared/ui/color-chips/sample.ts`);
                const H = ["analogous", "complementary", "split-complementary", "triad", "tetradic", "monochrome"];
                // C-9 fuzz over the atoms domain
                let calls = 0, bad = [], threw = 0;
                const seeds = ["#808080", "#ffffff", "#000000", "oklch(0.63 0 0)", "oklch(0.63 0 none)"];
                for (let i = 0; i < 400; i++) seeds.push(`oklch(${(Math.random()).toFixed(3)} ${(Math.random() * 0.4).toFixed(3)} ${(Math.random() * 360).toFixed(1)})`);
                for (const seed of seeds) for (const h of H) for (const colorEnergy of [0, 0.5, 1]) for (const scheme of ["light", "dark"]) {
                    calls++;
                    try {
                        const st = A.auroraHarmonyStops({ seed, colorEnergy, scheme }, h);
                        const nan = st.filter((s) => /NaN|Infinity|undefined/.test(s));
                        const unpaint = st.filter((s) => !CSS.supports("color", s));
                        if (nan.length || unpaint.length || st.length === 0) bad.push({ seed, h, colorEnergy, scheme, nan, unpaint, n: st.length });
                    } catch (e) { threw++; if (bad.length < 20) bad.push({ seed, h, err: String(e).slice(0, 120) }); }
                }
                // R-3 per-pair groupings: distinct ramps across the 4 hue arcs per space
                const spaces = ["rgb", "hsl", "hsv", "hwb", "lab", "lch", "oklab", "oklch", "xyz"];
                const pairs = { chromatic: ["oklch(62% 0.2 30deg)", "oklch(70% 0.15 250deg)"], achromatic: ["#808080", "#ffffff"], near: ["oklch(60% 0.15 10deg)", "oklch(60% 0.15 40deg)"] };
                const groupings = {};
                for (const [name, pair] of Object.entries(pairs)) groupings[name] = spaces.map((sp) => { try { return new Set(["shorter", "longer", "increasing", "decreasing"].map((m) => JSON.stringify(S.sampleInterpolationRamp(pair, sp, m)))).size; } catch (e) { return "ERR:" + String(e).slice(0, 60); } });
                // R-15 NaN arm (Infinity arm runs in its own probe: it does not return)
                const nanK = S.sampleInterpolationRamp(pairs.chromatic, "oklch", "shorter", NaN);
                return { fuzz: { calls, threw, bad: bad.slice(0, 20), badN: bad.length }, groupings, nanK };
            }, FS);
        });
    }
    // ── bleed-through behind the chip rows (E-2): menu over the live page vs over a hidden page
    if (on("bleed")) {
        out.bleed = await cell(browser, {}, async (page) => {
            await go(page, "generate");
            await waitLabel(page, "Preset");
            await openSelect(page, "Preset");
            const m = await measureChips(page);
            await page.screenshot({ path: `${EVID}/bleed-live.png` });
            const hid = await page.evaluate(() => { const lb = document.querySelector("[role=listbox]"); const portal = lb.closest("[data-reka-popper-content-wrapper]") ?? lb.parentElement; let n = 0; for (const el of document.body.children) if (!el.contains(portal)) { el.style.visibility = "hidden"; n++; } const app = document.getElementById("app"); if (app && !app.contains(portal)) app.style.visibility = "hidden"; document.documentElement.style.background = "#00ff00"; document.body.style.background = "#00ff00"; return n; });
            await page.waitForTimeout(500);
            await page.screenshot({ path: `${EVID}/bleed-green.png` });
            return { hid, listbox: m.listbox, rows: m.rows.slice(0, 3).map((r) => ({ chip: r.chip, row: r.row })) };
        });
    }
} finally {
    await browser.close();
}
const tag = [...want].join("_") || "all";
save(`probe-b-${tag}.json`, out);
console.log("saved", `probe-b-${tag}.json`, JSON.stringify(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.error ?? "ok"]))));
