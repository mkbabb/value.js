// B03 · A — #/atmosphere cells (AuroraPane U-1, U-2, U-3, U-6(chromium arm), U-7, U-8, U-9, U-10).
// One chromium browser; one context per cell; everything closed in finally.
import { chromium } from "playwright";
import { BASE, EV, sha, save, decoder, meanRGB, meanAbsDelta, contrast, parseRGB, oklab } from "./lib.mjs";

const out = {};
const browser = await chromium.launch();

async function open(ctx, route = "#/atmosphere") {
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    return page;
}
const rect = (page, sel) => page.$$eval(sel, (es) => es.map((e) => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height, t: e.textContent.trim().slice(0, 24) }; }));

async function pick(page, triggerText, optionName) {
    await page.getByRole("combobox", { name: triggerText }).click();
    await page.waitForTimeout(400);
    await page.getByRole("option", { name: optionName, exact: true }).click();
    await page.waitForTimeout(300);
}

async function desktopCell(scheme) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    try {
        const page = await open(ctx);
        const dec = await decoder(ctx);
        const r = { scheme, darkClass: await page.evaluate(() => document.documentElement.classList.contains("dark")) };
        // --- U-10 card / main geometry
        r.main = (await rect(page, "main"))[0];
        r.card = (await rect(page, ".pane-shell__card"))[0];
        r.cardOverMainW = +(r.card.w / r.main.w).toFixed(4);
        r.cardOverMainArea = +((r.card.w * r.card.h) / (r.main.w * r.main.h)).toFixed(4);
        // --- U-7 trigger left-edge spread (the 4 enum triggers inside the card)
        const trig = (await rect(page, ".pane-shell__card [role=combobox]"));
        r.triggers = trig.map((t) => [t.t, Math.round(t.x * 10) / 10, Math.round(t.w * 10) / 10, Math.round(t.h * 10) / 10]);
        r.triggerLeftSpread = +(Math.max(...trig.map((t) => t.x)) - Math.min(...trig.map((t) => t.x))).toFixed(2);
        // --- U-1 label contrast: computed ink vs the sampled ground (label ink made transparent for the ground shot)
        const labels = await page.$$eval(".aurora-form label", (ls) => ls.map((l) => { const b = l.getBoundingClientRect(); const cv = document.createElement("canvas"); cv.width = cv.height = 1; const g = cv.getContext("2d"); g.fillStyle = getComputedStyle(l).color; g.fillRect(0, 0, 1, 1); const d = g.getImageData(0, 0, 1, 1).data; return { t: l.textContent.trim(), x: b.x, y: b.y, w: b.width, h: b.height, css: getComputedStyle(l).color, color: `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${(d[3] / 255).toFixed(3)})`, fw: getComputedStyle(l).fontWeight, fs: getComputedStyle(l).fontSize }; }));
        await page.addStyleTag({ content: ".aurora-form label{color:transparent!important}" });
        await page.waitForTimeout(200);
        r.labels = [];
        for (const l of labels) {
            const ground = meanRGB(await dec(await page.screenshot({ clip: { x: l.x, y: l.y, width: l.w, height: l.h } })));
            const ink = parseRGB(l.color);
            const inkOver = ink.rgb.map((c, i) => c * ink.a + ground[i] * (1 - ink.a));
            r.labels.push({ t: l.t, css: l.css, color: l.color, fs: l.fs, fw: l.fw, ground: ground.map((v) => +v.toFixed(1)), ratio: contrast(inkOver, ground) });
        }
        await page.evaluate(() => document.querySelectorAll("style").forEach((s) => { if (s.textContent.includes(".aurora-form label{color:transparent")) s.remove(); }));
        // --- U-9 dual aria-label on the Slider (root + thumb)
        r.sliderAria = await page.$$eval(".pane-shell__card [data-slot=slider]", (ss) => ss.map((s) => ({ root: s.getAttribute("aria-label"), thumb: s.querySelector("[role=slider]")?.getAttribute("aria-label"), rootRole: s.getAttribute("role") })));
        // --- U-2 / U-8 open the Harmony menu
        await page.getByRole("combobox", { name: "Harmony" }).click();
        await page.waitForTimeout(600);
        r.menu = await page.evaluate(() => {
            const lb = document.querySelector("[role=listbox]");
            let el = lb, chain = [];
            while (el && el !== document.body) { const cs = getComputedStyle(el); const b = el.getBoundingClientRect(); chain.push({ tag: el.tagName.toLowerCase(), slot: el.dataset.slot || null, cls: el.className.toString().slice(0, 60), bg: cs.backgroundColor, bf: cs.backdropFilter, op: cs.opacity, w: +b.width.toFixed(1), h: +b.height.toFixed(1) }); el = el.parentElement; if (chain.length > 4) break; }
            const strips = [...document.querySelectorAll("[role=option]")].map((o) => { const s = o.querySelector(".preview-strip"); const b = s?.getBoundingClientRect(); return { opt: o.textContent.trim().slice(0, 22), stops: s?.dataset.stops, w: b ? +b.width.toFixed(2) : null, fs: s ? getComputedStyle(s).fontSize : null }; });
            const c = lb.closest("[data-slot=select-content]") ?? lb.parentElement; const cb = c.getBoundingClientRect();
            const opt = document.querySelector("[role=option]"); const optBg = opt ? getComputedStyle(opt).backgroundColor : null;
            const optSel = document.querySelector("[role=option][data-highlighted],[role=option][aria-selected=true]"); const optSelBg = optSel ? getComputedStyle(optSel).backgroundColor : null;
            const under = [...document.querySelectorAll(".pane-shell__card label, .pane-shell__card [role=combobox], .pane-shell__card [data-slot=slider]")].filter((e) => !c.contains(e)).map((e) => { const b = e.getBoundingClientRect(); const w = Math.max(0, Math.min(b.right, cb.right) - Math.max(b.left, cb.left)), h = Math.max(0, Math.min(b.bottom, cb.bottom) - Math.max(b.top, cb.top)); return { t: (e.getAttribute("aria-label") || e.textContent).trim().slice(0, 16), px2: Math.round(w * h) }; }).filter((x) => x.px2 > 0);
            return { chain, strips, optBg, optSelBg, overlap: { contentArea: Math.round(cb.width * cb.height), under, total: under.reduce((a, b) => a + b.px2, 0) } };
        });
        if (scheme === "light") await page.screenshot({ path: EV + "A-menu-harmony-1440-light.png" });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(400);
        // --- U-3 css-tier knob nulls (light only): left-of-card ground region
        if (scheme === "light") {
            r.tier = await page.evaluate(() => { const c = document.querySelector(".atmosphere-canvas"); return { canvasW: c?.width, canvasH: c?.height, bodyBgImage: getComputedStyle(document.body).backgroundImage.slice(0, 80), rootBgImage: getComputedStyle(document.documentElement).backgroundImage.slice(0, 80) }; });
            const clip = { x: 0, y: 120, width: 440, height: 700 };
            const shot = async () => { const b = await page.screenshot({ clip }); return { h: sha(b), px: await dec(b) }; };
            const seq = [];
            let prev = await shot();
            await page.waitForTimeout(2000);
            const again = await shot();
            seq.push({ step: "baseline-repeat(2s)", hash: again.h, sameAsPrev: again.h === prev.h, delta: meanAbsDelta(prev.px, again.px) });
            prev = again;
            const thumb = (name) => page.locator(`.pane-shell__card [role=slider][aria-label="${name}"]`);
            const steps = [
                ["noise→End", async () => { await thumb("Noise").focus(); await page.keyboard.press("End"); }],
                ["zones→End", async () => { await thumb("Zones").focus(); await page.keyboard.press("End"); }],
                ["arrangement→Centred", () => pick(page, "Arrangement", "Centred")],
                ["medium→Oil", () => pick(page, "Medium", "Oil")],
                ["motion→Still", () => pick(page, "Motion", "Still")],
                ["CONTROL colorEnergy→Home", async () => { await thumb("Color energy").focus(); await page.keyboard.press("Home"); }],
                ["CONTROL harmony→Triad", () => pick(page, "Harmony", "Triad")],
            ];
            for (const [name, act] of steps) {
                await act();
                await page.mouse.move(1430, 890);
                await page.waitForTimeout(1500);
                const s = await shot();
                seq.push({ step: name, hash: s.h, sameAsPrev: s.h === prev.h, delta: meanAbsDelta(prev.px, s.px) });
                prev = s;
            }
            r.knobs = seq;
            r.atomsAfter = await page.evaluate(() => [...document.querySelectorAll(".pane-shell__card [role=combobox]")].map((t) => t.textContent.trim()));
        }
        return r;
    } finally { await ctx.close(); }
}

async function coarseCell() {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
    try {
        const page = await open(ctx);
        const r = await page.evaluate(() => {
            const probe = (v) => { const d = document.createElement("div"); d.style.cssText = `position:absolute;height:${v};width:1px`; document.body.append(d); const h = d.getBoundingClientRect().height; d.remove(); return h; };
            const cs = getComputedStyle(document.documentElement);
            return { coarse: matchMedia("(pointer: coarse)").matches, uiScale: cs.getPropertyValue("--ui-scale").trim(), controlHmd: cs.getPropertyValue("--control-h-md").trim(), controlHmdPx: probe("var(--control-h-md)"), controlHsmPx: probe("var(--control-h-sm)"), controlFloor: cs.getPropertyValue("--control-floor").trim() };
        });
        const trig = await rect(page, ".pane-shell__card [role=combobox]");
        r.triggers = trig.map((t) => [t.t, Math.round(t.x * 10) / 10, Math.round(t.w * 10) / 10, Math.round(t.h * 10) / 10]);
        r.triggerLeftSpread = trig.length ? +(Math.max(...trig.map((t) => t.x)) - Math.min(...trig.map((t) => t.x))).toFixed(2) : null;
        return r;
    } finally { await ctx.close(); }
}

async function narrowCell() {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 700 } });
    try {
        const page = await open(ctx);
        const r = { menus: [] };
        for (const name of ["Harmony", "Arrangement", "Medium", "Motion"]) {
            const t = page.getByRole("combobox", { name });
            await t.scrollIntoViewIfNeeded();
            const tb = await t.boundingBox();
            await t.click();
            await page.waitForTimeout(500);
            const w = await page.evaluate(() => { const lb = document.querySelector("[role=listbox]"); const c = lb?.closest("[data-slot=select-content]") ?? lb?.parentElement; const b = c?.getBoundingClientRect(); return b ? { w: +b.width.toFixed(2), x: +b.x.toFixed(1), minW: getComputedStyle(c).minWidth, maxW: getComputedStyle(c).maxWidth } : null; });
            r.menus.push({ name, triggerW: +tb.width.toFixed(2), content: w });
            await page.keyboard.press("Escape");
            await page.waitForTimeout(400);
        }
        return r;
    } finally { await ctx.close(); }
}

try {
    out.light = await desktopCell("light");
    out.dark = await desktopCell("dark");
    out.coarse390 = await coarseCell();
    out.narrow320 = await narrowCell();
    out.cardSweep = [];
    for (const [w, h] of [[1024, 768], [1280, 800], [1920, 1080]]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h } });
        try { const page = await open(ctx); const m = (await rect(page, "main"))[0], c = (await rect(page, ".pane-shell__card"))[0]; out.cardSweep.push({ vp: `${w}x${h}`, main: m, card: c, wRatio: +(c.w / m.w).toFixed(4), hRatio: +(c.h / m.h).toFixed(4), areaRatio: +((c.w * c.h) / (m.w * m.h)).toFixed(4) }); } finally { await ctx.close(); }
    }
    // U-8: perceptual delta Analogous vs Monochrome strips (light cell), via the browser's own oklch→sRGB paint is
    // done in C-compute; here record ΔEok on the stamped stops parsed as css colours by a canvas.
} finally {
    await browser.close();
}
save("A-atmosphere.json", out);
const brief = JSON.stringify(out, (k, v) => (k === "chain" ? v.slice(0, 3) : v));
console.log(brief.slice(0, 6000));
