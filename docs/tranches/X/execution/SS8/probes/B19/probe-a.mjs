// SS-8 · B19 probe A — geometry / forced-colors / pixels / RTL / mix door.
// usage: node probe-a.mjs <cell...>   (one browser per run; one context per cell)
import { launch, cell, save, go, openSelect, measureChips, EVID, BASE } from "./lib.mjs";

const want = new Set(process.argv.slice(2));
process.on("unhandledRejection", (e) => console.error("unhandled", String(e).slice(0, 200)));
const on = (k) => want.size === 0 || want.has(k);
const out = {};

async function waitLabel(page, label) {
    await page.waitForFunction(
        (label) => [...document.querySelectorAll("[role=combobox]")].some((c) => {
            const id = c.getAttribute("aria-labelledby");
            return id && document.getElementById(id)?.textContent?.trim() === label;
        }),
        label,
        { timeout: 20000 },
    );
}
async function openOn(page, route, label) {
    await go(page, route);
    await waitLabel(page, label);
    await page.waitForTimeout(600);
    await openSelect(page, label);
}
/** Set the generate count through the slider keyboard (Home=1, End=12). */
async function setCount(page, key) {
    const s = page.getByRole("slider", { name: "Number of colors" });
    await s.focus();
    await page.keyboard.press(key);
    await page.waitForTimeout(400);
}
async function shotChips(page, name, rows) {
    await page.screenshot({ path: `${EVID}/${name}.png` });
    return { png: `${name}.png`, rows: rows.map((r) => ({ label: r.label, chip: r.chip, segments: r.segments.map((s) => ({ x: s.x, w: s.w })), selected: r.selected })) };
}
const OLD_RE = /oklch\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*\/\s*[\d.%]+)?\)/g;
const countOld = (s) => [...(s ?? "").matchAll(OLD_RE)].length;

const browser = await launch();
try {
    // ── PreviewRamp geometry at the four widths (R-4, R-17, R-2, R-13 inputs)
    const widths = { "1440": { viewport: { width: 1440, height: 900 } }, "390": { viewport: { width: 390, height: 844 } }, "320": { viewport: { width: 320, height: 700 } }, zoom200: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 } };
    for (const [w, opts] of Object.entries(widths)) {
        if (!on(`ramp-${w}`)) continue;
        out[`ramp-${w}`] = await cell(browser, opts, async (page) => {
            const res = {};
            for (const label of ["Color space", "Hue method"]) {
                await openOn(page, "gradient", label);
                const m = await measureChips(page);
                const extra = await page.evaluate(() => {
                    const fg = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim();
                    const toRgb = (css) => { const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d"); x.fillStyle = "#000"; x.fillRect(0, 0, 1, 1); x.fillStyle = css; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data]; };
                    const mix = (base) => { const d = document.createElement("div"); d.style.color = `color-mix(in oklab, var(--foreground) 12%, ${base})`; document.body.appendChild(d); const v = getComputedStyle(d).color; d.remove(); return { css: v, rgb: toRgb(v) }; };
                    return { fg, fgRgb: toRgb(fg), ringOverWhite: mix("white"), ringOverBlack: mix("black"), rootFont: getComputedStyle(document.documentElement).fontSize };
                });
                res[label] = { ...m, ...extra, frame: await shotChips(page, `ramp-${w}-${label.replace(/\s/g, "")}`, m.rows) };
                await page.keyboard.press("Escape");
                await page.waitForTimeout(400);
            }
            return res;
        });
    }
    // ── mix: the chip-less baseline (row heights without a chip) + the R-1 door
    if (on("mix")) {
        out.mix = await cell(browser, {}, async (page) => {
            await openOn(page, "mix", "Color space");
            const m = await measureChips(page);
            const vif = await page.evaluate(() => [...document.querySelectorAll("[role=option]")].map((o) => { const w = document.createTreeWalker(o, NodeFilter.SHOW_COMMENT); let n = 0; while (w.nextNode()) if (w.currentNode.data === "v-if") n++; return n; }));
            await page.keyboard.press("Escape");
            await page.waitForTimeout(400);
            const slot = page.locator(".add-slot-ghost").first();
            const door = { count: await page.locator(".add-slot-ghost").count() };
            if (door.count) {
                door.attrs = await slot.evaluate((el) => ({ tag: el.tagName, ariaHidden: el.getAttribute("aria-hidden"), ariaLabel: el.getAttribute("aria-label"), role: el.getAttribute("role"), pe: getComputedStyle(el).pointerEvents, inlinePE: el.style.pointerEvents, outer: el.outerHTML.slice(0, 300) }));
                const before = await page.locator("[data-mix-source], .mix-source-dot, [aria-label^='Remove']").count();
                await slot.click({ force: true });
                await slot.click({ force: true });
                await page.waitForTimeout(600);
                door.sourcesBefore = before;
                door.sourcesAfter = await page.locator("[data-mix-source], .mix-source-dot, [aria-label^='Remove']").count();
                await openSelect(page, "Color space");
                door.chipsAfterClick = await page.locator("[role=listbox] [data-stops]").count();
                await page.keyboard.press("Escape");
            }
            return { listbox: m.listbox, contentScroll: m.contentScroll, rowHeights: m.rows.map((r) => r.row.h), textRects: m.rows.map((r) => r.textRect), vifPerRow: vif, door };
        });
    }
    // ── forced colors (R-6, PS-3)
    if (on("forced")) {
        out.forced = await cell(browser, { forcedColors: "active" }, async (page) => {
            const res = {};
            await openOn(page, "gradient", "Color space");
            let m = await measureChips(page);
            res.ramp = { rows: m.rows.slice(0, 3).map((r) => ({ chip: r.chip, cs: r.chipCS })), frame: await shotChips(page, "forced-ramp", m.rows) };
            await page.keyboard.press("Escape");
            await openOn(page, "generate", "Preset");
            m = await measureChips(page);
            res.strip = { rows: m.rows.slice(0, 3).map((r) => ({ chip: r.chip, cs: r.chipCS, segs: r.segments.map((s) => s.bg) })), frame: await shotChips(page, "forced-strip", m.rows) };
            return res;
        });
    }
    // ── DSF 4 pixel frames: strip (light+dark, count 5 and 12) and ramp (D-1, seam, D-11)
    for (const scheme of ["light", "dark"]) {
        if (!on(`dsf4-${scheme}`)) continue;
        out[`dsf4-${scheme}`] = await cell(browser, { deviceScaleFactor: 4, colorScheme: scheme }, async (page) => {
            const res = {};
            await openOn(page, "generate", "Preset");
            let m = await measureChips(page);
            res.strip5 = await shotChips(page, `dsf4-${scheme}-strip5`, m.rows);
            await page.keyboard.press("Escape");
            await page.waitForTimeout(300);
            await setCount(page, "End");
            await openSelect(page, "Preset");
            m = await measureChips(page);
            res.strip12 = await shotChips(page, `dsf4-${scheme}-strip12`, m.rows);
            res.strip12.masks = m.rows[0]?.segments.map((s) => s.mask);
            res.strip12.stampedN = m.rows[0]?.stops?.split("|").length;
            await page.keyboard.press("Escape");
            // D-11: Vibrant row while selected (default) vs. after selecting Pastel
            await setCount(page, "Home");
            await setCount(page, "PageUp");
            await openSelect(page, "Preset");
            m = await measureChips(page);
            res.selA = await shotChips(page, `dsf4-${scheme}-selA`, m.rows);
            await page.getByRole("option").nth(1).click();
            await page.waitForTimeout(500);
            await openSelect(page, "Preset");
            await page.mouse.move(5, 5);
            await page.waitForTimeout(300);
            m = await measureChips(page);
            res.selB = await shotChips(page, `dsf4-${scheme}-selB`, m.rows);
            await page.keyboard.press("Escape");
            await openOn(page, "gradient", "Color space");
            m = await measureChips(page);
            res.ramp = await shotChips(page, `dsf4-${scheme}-ramp`, m.rows);
            return res;
        });
    }
    // ── RTL flipped at SOURCE (index.html dir) — R-24, D-8
    if (on("rtl")) {
        out.rtl = await cell(browser, {}, async (page, ctx) => {
            let rewrote = 0, routeErr = null;
            await ctx.route((u) => u.origin === BASE && (u.pathname === "/" || u.pathname === "/index.html"), async (route) => {
                try {
                    const r = await route.fetch({ timeout: 120000 });
                    let body = await r.text();
                    const b = body;
                    body = body.replace(/(<html[^>]*?)\bdir="ltr"/, '$1dir="rtl"');
                    if (body !== b) rewrote++;
                    await route.fulfill({ response: r, body });
                } catch (e) { routeErr = String(e).slice(0, 120); await route.continue().catch(() => {}); }
            });
            const res = {};
            await go(page, "generate");
            await waitLabel(page, "Preset");
            await page.waitForTimeout(600);
            await setCount(page, "End");
            await openSelect(page, "Preset");
            const read = () => page.evaluate(() => {
                const lb = document.querySelector("[role=listbox]");
                const wrap = lb.closest("[dir]");
                return { htmlDir: document.documentElement.dir, docDirection: getComputedStyle(document.body).direction, contentDirAttr: wrap?.getAttribute("dir"), contentDirection: getComputedStyle(lb).direction };
            });
            res.strip = { ...(await read()), frame: await shotChips(page, "rtl-strip12", (await measureChips(page)).rows) };
            await page.keyboard.press("Escape");
            await openOn(page, "gradient", "Color space");
            res.ramp = { ...(await read()), frame: await shotChips(page, "rtl-ramp", (await measureChips(page)).rows) };
            return { rewrote, routeErr, ...res };
        });
    }
} finally {
    await browser.close();
}
const tag = [...want].join("_") || "all";
save(`probe-a-${tag}.json`, out);
console.log("saved", `probe-a-${tag}.json`, Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.error ?? "ok"])));
