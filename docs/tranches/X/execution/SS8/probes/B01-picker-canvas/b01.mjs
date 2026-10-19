// SS-8 B01-picker-canvas — live witness cells. One browser per run, one context per cell.
// ENGINE=chromium|webkit  BASE=http://localhost:9000  CELLS=a,b,...  OUT=<json name>
import { chromium, webkit } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { decodePng, ratio, save, EVID } from "./lib.mjs";

const ENGINE = process.env.ENGINE ?? "chromium";
const BASE = process.env.BASE ?? "http://localhost:9000";
const CELLS = (process.env.CELLS ?? "").split(",").filter(Boolean);
const OUT = process.env.OUT ?? `b01-${ENGINE}.json`;
const KEEP_PNG = new Set((process.env.PNG ?? "").split(",").filter(Boolean));
const enc = (s) => encodeURIComponent(s);
const url = (space, color) => `${BASE}/#/?space=${space}&color=${enc(color)}`;

async function boot(page, space = "rgb", color = "rgb(200 50 50)") {
    await page.goto(url(space, color), { waitUntil: "load" });
    await page.waitForSelector(".spectrum-picker", { timeout: 30000 });
    await page.waitForSelector(".readout-fig", { timeout: 30000 });
    await page.waitForTimeout(1200);
}
const figs = (page) =>
    page.evaluate(() =>
        [...document.querySelectorAll(".readout-fig")].map((e) => ({
            label: e.getAttribute("aria-label"),
            text: e.textContent,
            html: e.innerHTML.replace(/ data-v-[0-9a-f]+=""/g, "").slice(0, 160),
        })),
    );
async function shot(page, name, clip) {
    const buf = await page.screenshot({ clip });
    if (KEEP_PNG.has(name)) fs.writeFileSync(path.join(EVID, name + ".png"), buf);
    return decodePng(buf);
}
const rectOf = (page, sel) =>
    page.evaluate((s) => document.querySelector(s).getBoundingClientRect().toJSON(), sel);

const cells = {
    // SS8-0001 — what `ch` resolves against on the readout's font.
    async ch(ctx) {
        const page = await ctx.newPage();
        await boot(page);
        return page.evaluate(() => {
            const host = document.querySelector(".readout");
            const mk = (style, text = "") => {
                const s = document.createElement("span");
                s.style.cssText = "display:inline-block;white-space:pre;" + style;
                s.textContent = text;
                host.appendChild(s);
                const w = s.getBoundingClientRect().width;
                s.remove();
                return w;
            };
            const cs = getComputedStyle(host);
            const fs_ = parseFloat(cs.fontSize);
            const r = {
                fontFamily: cs.fontFamily, fontSize: fs_, fontWeight: cs.fontWeight,
                fontVariantNumeric: cs.fontVariantNumeric,
                fontsReady: document.fonts.status,
                ch1: mk("width:1ch"),
                zeroTnumW400: mk("") || 0,
            };
            r.zeroTnumW400 = mk("", "0000000000") / 10;
            r.zeroTnumW600 = mk("font-weight:600", "0000000000") / 10;
            r.zeroPropW400 = mk("font-variant-numeric:normal", "0000000000") / 10;
            r.oneTnumW400 = mk("", "1111111111") / 10;
            r.oneDigitPropW400 = mk("font-variant-numeric:normal", "1111111111") / 10;
            r.chOverEm = +(r.ch1 / fs_).toFixed(4);
            r.tnumOverEm = +(r.zeroTnumW400 / fs_).toFixed(4);
            r.propOverEm = +(r.zeroPropW400 / fs_).toFixed(4);
            r.gapPx = parseFloat(cs.columnGap);
            return r;
        });
    },

    // SS8-0003 — C-1 crash arm: select-all-replace then an integer->decimal space switch.
    async c1(ctx) {
        const out = {};
        for (const blurFirst of [false, true]) {
            const page = await ctx.newPage();
            const errs = [];
            page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
            page.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text().slice(0, 300)));
            await boot(page, "rgb", "rgb(200 50 50)");
            const r = page.locator('.readout-fig[aria-label="r component value"]');
            await r.click();
            await page.keyboard.press("ControlOrMeta+a");
            await page.keyboard.type("120");
            await page.waitForTimeout(500);
            const afterType = await figs(page);
            if (blurFirst) await page.evaluate(() => document.activeElement?.blur());
            await page.evaluate((u) => (location.hash = u), "#/?space=srgb-linear&color=" + enc("rgb(120 50 50)"));
            await page.waitForTimeout(900);
            const afterSwitch = await figs(page);
            await page.evaluate((u) => (location.hash = u), "#/?space=srgb-linear&color=" + enc("rgb(30 200 90)"));
            await page.waitForTimeout(900);
            const afterSecondWrite = await figs(page);
            const model = await page.evaluate(() => location.hash);
            out[blurFirst ? "blurred" : "focused"] = { afterType, afterSwitch, afterSecondWrite, hash: model, errs };
            await page.close();
        }
        return out;
    },

    // SS8-0003 (refined) — select-all-replace in a DECIMAL (two-span) cell, then external
    // writes in-space, decimal->integer (srgb-linear->rgb) and integer->decimal (rgb->srgb-linear),
    // all preserving the r/g/b :key. Space switch by URL query (useColorUrl's watcher).
    async c1b(ctx) {
        const page = await ctx.newPage();
        const errs = [];
        page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
        page.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text().slice(0, 300)));
        await boot(page, "display-p3", "rgb(200 50 50)");
        const steps = [];
        const rec = async (why) => steps.push({ why, hash: decodeURIComponent(await page.evaluate(() => location.hash)), figs: (await figs(page)).map((f) => `${f.label[0]}: ${f.html}`), errs: errs.length });
        await rec("boot display-p3");
        const g = page.locator('.readout-fig[aria-label="g component value"]');
        await g.click();
        await page.keyboard.press("ControlOrMeta+a");
        await page.keyboard.type("0.3");
        await page.waitForTimeout(700);
        await rec("after select-all + type 0.3 in g");
        await page.evaluate(() => document.activeElement?.blur());
        const go = async (sp, col, why) => {
            await page.evaluate((h) => (location.hash = h), `#/?space=${sp}&color=${encodeURIComponent(col)}`);
            await page.waitForTimeout(1000);
            await rec(why);
        };
        await go("display-p3", "rgb(30 200 90)", "external write, same space");
        await go("rgb", "rgb(30 200 90)", "decimal->integer (display-p3->rgb)");
        await go("rgb", "rgb(90 10 220)", "external write in rgb");
        await go("display-p3", "rgb(90 10 220)", "integer->decimal (rgb->display-p3)");
        await go("display-p3", "rgb(250 250 0)", "external write after return");
        return { steps, errs };
    },

    // SS8-0004 — caret after Vue's patch of the focused host.
    async caret(ctx) {
        const page = await ctx.newPage();
        const errs = [];
        page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
        await boot(page, "srgb-linear", "rgb(200 50 50)");
        const g = page.locator('.readout-fig[aria-label="g component value"]');
        const sel = () =>
            page.evaluate(() => {
                const s = getSelection();
                const host = document.activeElement;
                const inHost = !!(s.anchorNode && host && host.contains(s.anchorNode));
                // caret offset in host text coordinates
                let off = null;
                if (inHost) {
                    const rg = document.createRange();
                    rg.selectNodeContents(host);
                    rg.setEnd(s.anchorNode, s.anchorOffset);
                    off = rg.toString().length;
                }
                return { active: host?.getAttribute("aria-label"), text: host?.textContent, inHost, off, collapsed: s.isCollapsed };
            });
        await g.click();
        await page.keyboard.press("ControlOrMeta+a");
        const seq = [];
        for (const ch of ["0", ".", "5", "5"]) {
            await page.keyboard.type(ch);
            await page.waitForTimeout(250);
            seq.push({ typed: ch, ...(await sel()) });
        }
        await page.waitForTimeout(600);
        seq.push({ typed: "(settle 600ms)", ...(await sel()) });
        return { seq, figs: await figs(page), errs };
    },

    // SS8-0005 — IME composition (Chromium CDP only).
    async ime(ctx) {
        if (ENGINE !== "chromium") return { skipped: "CDP IME is Chromium-only" };
        const page = await ctx.newPage();
        await boot(page, "rgb", "rgb(200 50 50)");
        await page.evaluate(() => {
            window.__ev = [];
            for (const t of ["compositionstart", "compositionupdate", "compositionend", "input", "beforeinput"])
                document.addEventListener(t, (e) => window.__ev.push({ t, data: e.data ?? null, isComposing: e.isComposing ?? null, txt: e.target.textContent }), true);
        });
        const r = page.locator('.readout-fig[aria-label="r component value"]');
        await r.click();
        await page.keyboard.press("ControlOrMeta+a");
        const cdp = await ctx.newCDPSession(page);
        const dot0 = await page.evaluate(() => document.querySelector(".spectrum-dot").style.backgroundColor);
        const dots = [dot0];
        for (const t of ["1", "12", "123"]) {
            await cdp.send("Input.imeSetComposition", { text: t, selectionStart: t.length, selectionEnd: t.length });
            await page.waitForTimeout(250);
            dots.push(await page.evaluate(() => document.querySelector(".spectrum-dot").style.backgroundColor));
        }
        await cdp.send("Input.insertText", { text: "123" });
        await page.waitForTimeout(400);
        dots.push(await page.evaluate(() => document.querySelector(".spectrum-dot").style.backgroundColor));
        return { events: await page.evaluate(() => window.__ev), dotColors: dots, figs: await figs(page) };
    },

    // SS8-0006 / 0007 — focus ring contrast (pixel diff) + UA outline (normal + forced colors).
    async focus(ctx, opts) {
        const res = [];
        for (const color of ["rgb(200 50 50)", "rgb(240 220 120)", "rgb(40 60 160)"]) {
            const page = await ctx.newPage();
            await boot(page, "rgb", color);
            if (opts.forced) await page.emulateMedia({ forcedColors: "active" });
            await page.waitForTimeout(300);
            const sel = '.readout-fig[aria-label="g component value"]';
            const r = await rectOf(page, sel);
            const pad = 8;
            const clip = { x: Math.floor(r.x - pad), y: Math.floor(r.y - pad), width: Math.ceil(r.width + 2 * pad), height: Math.ceil(r.height + 2 * pad) };
            await page.evaluate(() => document.activeElement?.blur());
            await page.mouse.move(5, 5);
            const before = await shot(page, `focus-before-${opts.tag}-${res.length}`, clip);
            // keyboard focus: focus previous cell, then Tab into g
            await page.locator('.readout-fig[aria-label="r component value"]').focus();
            await page.keyboard.press("Tab");
            const st = await page.evaluate((s) => {
                const e = document.querySelector(s);
                const cs = getComputedStyle(e);
                return {
                    active: document.activeElement === e, focusVisible: e.matches(":focus-visible"),
                    outline: [cs.outlineStyle, cs.outlineWidth, cs.outlineColor].join(" "),
                    boxShadow: cs.boxShadow,
                    ringToken: getComputedStyle(document.documentElement).getPropertyValue("--focus-ring-shadow").trim(),
                };
            }, sel);
            await page.waitForTimeout(250);
            const after = await shot(page, `focus-after-${opts.tag}-${res.length}`, clip);
            const ratios = [];
            for (let y = 0; y < after.h; y++)
                for (let x = 0; x < after.w; x++) {
                    const inside = x >= pad - 1 && x < after.w - pad + 1 && y >= pad - 1 && y < after.h - pad + 1;
                    if (inside) continue;
                    const a = after.px(x, y), b = before.px(x, y);
                    const d = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
                    if (d > 6) ratios.push(ratio(a, b));
                }
            ratios.sort((p, q) => p - q);
            const q = (f) => ratios.length ? ratios[Math.min(ratios.length - 1, Math.floor(f * ratios.length))] : null;
            res.push({ color, ...st, ringPx: ratios.length, ratioMin: q(0), ratioMedian: q(0.5), ratioP90: q(0.9), ratioMax: q(1), shareGE3: ratios.length ? +(ratios.filter((v) => v >= 3).length / ratios.length).toFixed(3) : null });
            await page.close();
        }
        return res;
    },

    // SS8-0009 — torn key sets across rapid external (URL) writes.
    async torn(ctx) {
        const page = await ctx.newPage();
        const errs = [];
        page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
        await boot(page, "rgb", "rgb(200 50 50)");
        await page.evaluate(() => {
            window.__snaps = [];
            const snap = (why) => {
                const f = [...document.querySelectorAll(".readout-fig")];
                window.__snaps.push({ why, labels: f.map((e) => e.getAttribute("aria-label").split(" ")[0]).join(","), bad: f.filter((e) => !e.textContent.trim() || /NaN|undefined|null/.test(e.textContent)).map((e) => e.getAttribute("aria-label") + "=" + JSON.stringify(e.textContent)) });
            };
            new MutationObserver(() => snap("mut")).observe(document.querySelector(".readout").parentElement, { subtree: true, childList: true, characterData: true });
            const tick = () => { snap("raf"); window.__raf = requestAnimationFrame(tick); };
            tick();
        });
        const spaces = ["lab", "kelvin", "hsl", "oklch", "rgb", "xyz", "hwb", "srgb-linear", "kelvin", "lch", "hex", "oklab"];
        const colors = ["rgb(200 50 50)", "rgb(20 160 90)", "rgb(250 240 10)", "rgb(10 10 200)"];
        for (const gap of [0, 8, 40]) {
            for (let i = 0; i < spaces.length; i++) {
                await page.evaluate(([h, g]) => new Promise((res) => { location.hash = h; setTimeout(res, g); }), ["#/?space=" + spaces[i] + "&color=" + enc(colors[i % 4]), gap]);
            }
            await page.waitForTimeout(700);
        }
        const legalSets = await page.evaluate(async () => {
            const pc = await import("/@fs/Users/mkbabb/Programming/value.js/demo/color-session/picker-color.ts");
            return Object.entries(pc.PICKER_CHANNELS).map(([k, v]) => v.map((m) => m.key).join(","));
        });
        const snaps = await page.evaluate(() => { cancelAnimationFrame(window.__raf); return window.__snaps; });
        const legal = new Set([...legalSets, "hex"]);
        const torn = snaps.filter((s) => !legal.has(s.labels) || s.bad.length);
        const observed = {};
        for (const s of snaps) observed[s.labels] = (observed[s.labels] ?? 0) + 1;
        return { snapshots: snaps.length, legalSets: [...legal], observedLabelSets: observed, tornCount: torn.length, tornSample: torn.slice(0, 8), errs };
    },

    // SS8-0010 — reserved readout air at 32rem and 390.
    async air(ctx) {
        const out = [];
        for (const [w, h] of [[512, 900], [390, 844]]) {
            const page = await ctx.newPage();
            await page.setViewportSize({ width: w, height: h });
            for (const [sp, col] of [["oklch", "oklch(0.6 0.15 30)"], ["lab", "lab(40 -100 -100)"], ["rgb", "rgb(200 50 50)"]]) {
                await boot(page, sp, col);
                const m = await page.evaluate(() => {
                    const ro = document.querySelector(".readout");
                    const rr = ro.getBoundingClientRect();
                    const cells = [...ro.querySelectorAll(".readout-cell")].map((c) => c.getBoundingClientRect());
                    const top = Math.min(...cells.map((c) => c.top)), bot = Math.max(...cells.map((c) => c.bottom));
                    const lines = new Set(cells.map((c) => Math.round(c.top))).size;
                    const cs = getComputedStyle(ro);
                    return { readoutH: +rr.height.toFixed(2), inkH: +(bot - top).toFixed(2), airAbove: +(top - rr.top).toFixed(2), airBelow: +(rr.bottom - bot).toFixed(2), lines, minHeight: cs.minHeight, fontSize: cs.fontSize, linesVar: cs.getPropertyValue("--readout-lines") };
                });
                out.push({ viewport: `${w}x${h}`, space: sp, ...m });
                if (KEEP_PNG.has(`air-${w}-${sp}`)) {
                    const r = await rectOf(page, ".readout");
                    await shot(page, `air-${w}-${sp}`, { x: 0, y: Math.max(0, r.y - 80), width: w, height: Math.min(260, h) });
                }
            }
            await page.close();
        }
        return out;
    },

    // SS8-0013 — C-3 dot jump after the 300ms URL echo, per space.
    async c3(ctx) {
        const out = [];
        for (const sp of ["rgb", "hex", "hsl", "hwb", "lab", "lch", "oklab", "oklch", "xyz", "kelvin"]) {
            const page = await ctx.newPage();
            await boot(page, sp, "rgb(200 50 50)");
            const spaceAtBoot = decodeURIComponent(await page.evaluate(() => location.hash));
            const labelsAtBoot = (await figs(page)).map((f) => f.label.split(" ")[0]).join(",");
            const r = await rectOf(page, ".spectrum-picker");
            await page.mouse.click(r.x + r.width * 0.37, r.y + r.height * 0.43);
            const pos = () => page.evaluate(() => { const b = document.querySelector(".spectrum-dot").getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; });
            await page.waitForTimeout(80);
            const p0 = await pos();
            await page.waitForTimeout(1000);
            const p1 = await pos();
            out.push({ space: sp, t80: p0.map((v) => +v.toFixed(1)), t1080: p1.map((v) => +v.toFixed(1)), jumpPx: +Math.hypot(p1[0] - p0[0], p1[1] - p0[1]).toFixed(2), spaceAtBoot, labelsAtBoot, hash: decodeURIComponent(await page.evaluate(() => location.hash)) });
            await page.close();
        }
        return out;
    },

    // SS8-0014 — C-4 Kelvin: three picks.
    async kelvin(ctx) {
        const page = await ctx.newPage();
        await boot(page, "kelvin", "rgb(255 180 120)");
        const r = await rectOf(page, ".spectrum-picker");
        const picks = [];
        for (const [fx, fy] of [[0.2, 0.15], [0.6, 0.5], [0.95, 0.85]]) {
            await page.mouse.click(r.x + r.width * fx, r.y + r.height * fy);
            await page.waitForTimeout(1000);
            picks.push({ pick: [fx, fy], readout: (await figs(page)).map((f) => f.text).join(" | "), hash: decodeURIComponent(await page.evaluate(() => location.hash)), aria: await page.getAttribute(".spectrum-picker", "aria-label") });
        }
        return picks;
    },

    // SS8-0015 / R13 (0023) — touch gate: touch-action owners + outline contrast (needs hasTouch ctx).
    async gate(ctx, opts) {
        const page = await ctx.newPage();
        await boot(page, "rgb", "rgb(200 50 50)");
        const state = (why) => page.evaluate((why) => {
            const e = document.querySelector(".spectrum-picker");
            const cs = getComputedStyle(e);
            return { why, active: e.classList.contains("touch-gate-active"), inlineTA: e.style.touchAction, computedTA: cs.touchAction, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, outlineOffset: cs.outlineOffset };
        }, why);
        const r = await rectOf(page, ".spectrum-picker");
        const pad = 10;
        const clip = { x: Math.max(0, Math.floor(r.x - pad)), y: Math.floor(r.y - pad), width: Math.ceil(r.width * 0.5), height: Math.ceil(r.height * 0.5) };
        const seq = [await state("rest")];
        const before = await shot(page, `gate-before-${opts.tag}`, clip);
        await page.touchscreen.tap(r.x + r.width * 0.5, r.y + r.height * 0.5);
        await page.waitForTimeout(600);
        seq.push(await state("after tap (+600ms, past the outline-color transition)"));
        const after = await shot(page, `gate-after-${opts.tag}`, clip);
        await page.waitForTimeout(2900);
        seq.push(await state("after tap +3.5s"));
        await page.touchscreen.tap(r.x + r.width * 0.5, r.y + r.height * 0.5);
        await page.waitForTimeout(120);
        seq.push(await state("after 2nd tap"));
        // ring pixels: changed pixels OUTSIDE the plate rect (top/left edges only, clear of the stamp)
        const ox = r.x - clip.x, oy = r.y - clip.y;
        const ratios = [];
        for (let y = 0; y < after.h; y++)
            for (let x = 0; x < after.w; x++) {
                if (x >= ox && y >= oy) continue;
                const a = after.px(x, y), b = before.px(x, y);
                const d = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
                if (d > 6) ratios.push(ratio(a, b));
            }
        ratios.sort((p, q) => p - q);
        const q = (f) => ratios.length ? ratios[Math.min(ratios.length - 1, Math.floor(f * ratios.length))] : null;
        return { seq, ringPx: ratios.length, ratioMin: q(0), ratioMedian: q(0.5), ratioMax: q(1) };
    },

    // SS8-0016 — D-05 plate boundary contrast at the corners/edges.
    async d05(ctx, opts) {
        const page = await ctx.newPage();
        await boot(page, "rgb", "rgb(200 50 50)");
        if (opts.forced) await page.emulateMedia({ forcedColors: "active" });
        await page.waitForTimeout(400);
        const r = await rectOf(page, ".spectrum-picker");
        const pad = 20;
        const clip = { x: Math.floor(r.x - pad), y: Math.floor(r.y - pad), width: Math.ceil(r.width + 2 * pad), height: Math.ceil(r.height + 2 * pad) };
        const img = await shot(page, `d05-${opts.tag}`, clip);
        const ox = r.x - clip.x, oy = r.y - clip.y, W = r.width, H = r.height;
        const pt = (x, y) => img.px(Math.round(x), Math.round(y));
        const pairs = {
            "top@10% (white side)": [pt(ox + W * 0.1, oy + 3), pt(ox + W * 0.1, oy - 7)],
            "left@10% (white side)": [pt(ox + 3, oy + H * 0.1), pt(ox - 7, oy + H * 0.1)],
            "top@90% (hue side)": [pt(ox + W * 0.9, oy + 3), pt(ox + W * 0.9, oy - 7)],
            "left@90% (black side)": [pt(ox + 3, oy + H * 0.9), pt(ox - 7, oy + H * 0.9)],
            "TL corner diag": [pt(ox + 6, oy + 6), pt(ox - 5, oy - 5)],
        };
        const res = {};
        for (const [k, [inn, outp]] of Object.entries(pairs)) res[k] = { inside: inn.slice(0, 3), outside: outp.slice(0, 3), ratio: ratio(inn, outp) };
        return res;
    },

    // SS8-0017 — M-1: frame inside the entry window, see-s vs get-s.
    async m1(ctx) {
        const out = [];
        for (const t of [0, 250, 330, 420, 520, 2000]) {
            const page = await ctx.newPage();
            await page.goto(url("rgb", "rgb(255 0 0)"), { waitUntil: "load" });
            await page.waitForSelector(".spectrum-picker", { timeout: 30000 });
            // freeze the plate's entry animation at currentTime t (delay 180 + dur 420)
            const info = await page.evaluate(async (tt) => {
                const el = document.querySelector(".spectrum-picker");
                const a = el.getAnimations().find((x) => /field-paint-in/.test(x.animationName ?? ""));
                if (!a) return { anim: false };
                a.pause();
                a.currentTime = tt;
                await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                const cs = getComputedStyle(el);
                return { anim: true, name: a.animationName, t: a.currentTime, opacity: cs.opacity, bgSize: cs.backgroundSize, arrival: document.querySelector(".pane-shell")?.getAttribute("data-arrival") };
            }, t);
            await page.waitForTimeout(300);
            const r = await rectOf(page, ".spectrum-picker");
            const pad = 0;
            // frame
            const img = await shot(page, `m1-t${t}`, { x: r.x, y: r.y, width: r.width, height: r.height });
            // ground frame: same box, plate made transparent via opacity of the paused anim? compute from t=0 frame instead (opacity 0)
            out.push({ t, ...info, rect: [r.width, r.height], _img: img });
            // get-s: click at x=0.5w while frozen
            await page.mouse.click(r.x + r.width * 0.5, r.y + r.height * 0.2);
            await page.waitForTimeout(150);
            out[out.length - 1].ariaAfterClick = await page.getAttribute(".spectrum-picker", "aria-label");
            await page.close();
        }
        // ground = t=0 frame (opacity 0 → pure ground); invert the opacity blend at x=.5w, y=.2h
        const g = out[0]._img;
        for (const o of out) {
            const img = o._img;
            const x = Math.round(img.w * 0.5), y = Math.round(img.h * 0.2);
            const P = img.px(x, y), G = g.px(x, y);
            const al = parseFloat(o.opacity ?? "1");
            const C = al > 0.02 ? P.slice(0, 3).map((p, i) => (p - (1 - al) * G[i]) / al) : null;
            o.pixel = P.slice(0, 3); o.ground = G.slice(0, 3);
            o.seeS = C ? +(1 - Math.min(...C) / Math.max(...C)).toFixed(3) : null;
            delete o._img;
        }
        return out;
    },

    // SS8-0022 — D-18 census: share of plate pixels with max(r,g,b) < 32.
    async d18(ctx) {
        const page = await ctx.newPage();
        await boot(page, "rgb", "rgb(200 50 50)");
        await page.addStyleTag({ content: ".spectrum-dot{visibility:hidden!important}" });
        await page.waitForTimeout(300);
        const r = await rectOf(page, ".spectrum-picker");
        const x0 = Math.ceil(r.x), y0 = Math.ceil(r.y), x1 = Math.floor(r.x + r.width), y1 = Math.floor(r.y + r.height);
        const img = await shot(page, "d18-plate", { x: x0, y: y0, width: x1 - x0, height: y1 - y0 });
        const census = (inset) => {
            let n = 0, k = 0;
            for (let y = 0; y < img.h; y++) for (let x = inset; x < img.w - inset; x++) { n++; const p = img.px(x, y); if (Math.max(p[0], p[1], p[2]) < 32) k++; }
            return { pixels: n, dark: k, pct: +((100 * k) / n).toFixed(3) };
        };
        return { plate: [img.w, img.h], full: census(0), inset12: census(12), rowsDerivedPct: +(100 * 32 / 255).toFixed(3) };
    },

    // SS8-0019 / 0025 — L-1 sweep: library (picker path, dist) vs the mini's closed form.
    async l1(ctx) {
        const page = await ctx.newPage();
        await boot(page);
        return page.evaluate(async () => {
            const root = "/@fs" + "/Users/mkbabb/Programming/value.js/demo/color-session/picker-color.ts";
            const pc = await import(root);
            const mini = (H, s, v) => {
                const h = H / 360, i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
                let r = 0, g = 0, b = 0;
                switch (i % 6) { case 0: r = v; g = t; b = p; break; case 1: r = q; g = v; b = p; break; case 2: r = p; g = v; b = t; break; case 3: r = p; g = q; b = v; break; case 4: r = t; g = p; b = v; break; case 5: r = v; g = p; b = q; break; }
                const x = (c) => Math.round(c * 255).toString(16).padStart(2, "0");
                return "#" + x(r) + x(g) + x(b);
            };
            const base = pc.convertPickerColor(pc.parsePickerColor("red"), "hsv");
            const lib = (H, s, v) => pc.pickerColorToHex(pc.withChannel(pc.withChannel(pc.withChannel(base, "h", H), "s", s), "v", v));
            const grids = {
                "h:0..348/12 x s,v:0..1/18": [Array.from({ length: 30 }, (_, i) => i * 12), Array.from({ length: 19 }, (_, i) => i / 18)],
                "h:0..348/12 x s,v:.05..0.95/.05": [Array.from({ length: 30 }, (_, i) => i * 12), Array.from({ length: 19 }, (_, i) => +(0.05 + i * 0.05).toFixed(2))],
                "h:0..360/19 x s,v:0..1/18 (19x19x30?)": [Array.from({ length: 30 }, (_, i) => (i * 360) / 29), Array.from({ length: 19 }, (_, i) => i / 18)],
            };
            const out = {};
            for (const [k, [hs, ss]] of Object.entries(grids)) {
                let n = 0, d = 0, maxDelta = 0; const ex = [];
                for (const H of hs) for (const s of ss) for (const v of ss) {
                    n++;
                    const a = lib(H, s, v), b = mini(H, s, v);
                    if (a.slice(0, 7) !== b) {
                        d++;
                        const da = [1, 3, 5].map((o) => Math.abs(parseInt(a.slice(o, o + 2), 16) - parseInt(b.slice(o, o + 2), 16)));
                        maxDelta = Math.max(maxDelta, ...da);
                        if (ex.length < 4) ex.push({ H, s, v, lib: a, mini: b });
                    }
                }
                out[k] = { n, disagree: d, pct: +((100 * d) / n).toFixed(3), maxChannelDelta: maxDelta, examples: ex };
            }
            return out;
        });
    },

    // SS8-0027 (R17) — C-9 decider: one trace, single drag; any Layout inside a rAF callback?
    async trace(ctx) {
        if (ENGINE !== "chromium") return { skipped: "chromium tracing only" };
        const page = await ctx.newPage();
        await boot(page);
        await page.waitForTimeout(1500);
        const r = await rectOf(page, ".spectrum-picker");
        await browser.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "blink"] });
        await page.mouse.move(r.x + r.width * 0.2, r.y + r.height * 0.3);
        await page.mouse.down();
        for (let i = 0; i <= 40; i++) {
            await page.mouse.move(r.x + r.width * (0.2 + 0.6 * i / 40), r.y + r.height * (0.3 + 0.4 * i / 40));
            await page.waitForTimeout(16);
        }
        await page.mouse.up();
        await page.waitForTimeout(300);
        const buf = await browser.stopTracing();
        const ev = JSON.parse(buf.toString()).traceEvents ?? JSON.parse(buf.toString());
        // renderer main thread = the thread carrying FireAnimationFrame
        const fafs = ev.filter((e) => e.name === "FireAnimationFrame" && e.ph === "X");
        const tid = fafs.length ? fafs[0].tid : null, pid = fafs.length ? fafs[0].pid : null;
        const onMain = ev.filter((e) => e.tid === tid && e.pid === pid && e.ph === "X");
        const within = (e, f) => e.ts >= f.ts && e.ts + (e.dur ?? 0) <= f.ts + f.dur;
        const layouts = onMain.filter((e) => e.name === "Layout");
        const styles = onMain.filter((e) => e.name === "UpdateLayoutTree" || e.name === "RecalculateStyles");
        const inRaf = layouts.filter((l) => fafs.some((f) => within(l, f)));
        const styleInRaf = styles.filter((l) => fafs.some((f) => within(l, f)));
        const durs = fafs.map((f) => f.dur / 1000).sort((a, b) => a - b);
        return {
            fireAnimationFrame: fafs.length, layoutsTotal: layouts.length, layoutsInsideRaf: inRaf.length,
            styleRecalcsTotal: styles.length, styleRecalcsInsideRaf: styleInRaf.length,
            rafMsP50: durs[Math.floor(durs.length / 2)] ?? null, rafMsMax: durs[durs.length - 1] ?? null,
            inRafSample: inRaf.slice(0, 3).map((e) => ({ dur: e.dur, args: JSON.stringify(e.args).slice(0, 200) })),
        };
    },

    // SS8-0012 — live computed position of the dot (run on dev AND built bundle).
    async pos(ctx) {
        const page = await ctx.newPage();
        await boot(page);
        return page.evaluate(() => {
            const d = document.querySelector(".spectrum-dot");
            const sheets = [...document.styleSheets].map((s) => s.href ?? "(inline)").slice(0, 12);
            return { position: getComputedStyle(d).position, classes: d.className, sheets };
        });
    },

    // SS8-0020 — C-16 precondition: does a `none`-channel deep link still crash?
    async none(ctx) {
        const page = await ctx.newPage();
        const errs = [];
        page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
        page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errs.push(m.type() + ": " + m.text().slice(0, 200)));
        await page.goto(url("oklch", "oklch(0.6 none 30)"), { waitUntil: "load" });
        await page.waitForTimeout(3000);
        const st = await page.evaluate(() => ({ spectrum: !!document.querySelector(".spectrum-picker"), aria: document.querySelector(".spectrum-picker")?.getAttribute("aria-label"), dot: document.querySelector(".spectrum-dot")?.getAttribute("style"), readout: [...document.querySelectorAll(".readout-fig")].map((e) => e.textContent).join("|"), hash: decodeURIComponent(location.hash) }));
        return { ...st, errs: errs.slice(0, 8) };
    },

    // SS8-0021 — D-01 byte identity: plate style string across spaces for one colour.
    async d01(ctx) {
        const out = {}, labels = {};
        for (const sp of ["rgb", "hsl", "lab", "oklch", "xyz", "display-p3"]) {
            const page = await ctx.newPage();
            await boot(page, sp, "rgb(200 50 50)");
            out[sp] = await page.evaluate(() => document.querySelector(".spectrum-picker").style.background.replace(/\s+/g, " ").trim());
            labels[sp] = (await figs(page)).map((f) => f.label.split(" ")[0] + "=" + f.text).join(",");
            await page.close();
        }
        const vals = Object.values(out);
        return { identical: vals.every((v) => v === vals[0]), distinct: [...new Set(vals)].length, sample: vals[0], perSpace: out, readoutPerSpace: labels };
    },
};

const launcher = ENGINE === "webkit" ? webkit : chromium;
const browser = await launcher.launch();
const results = { engine: ENGINE, version: browser.version(), base: BASE, at: new Date().toISOString() };
try {
    for (const spec of CELLS) {
        const [name, ...flags] = spec.split(":");
        const o = { tag: spec.replace(/:/g, "-"), forced: flags.includes("forced") };
        const ctxOpts = { viewport: { width: 1440, height: 900 }, colorScheme: flags.includes("dark") ? "dark" : "light" };
        if (flags.includes("touch")) Object.assign(ctxOpts, { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: ENGINE === "chromium", deviceScaleFactor: 1 });
        if (flags.includes("prm")) ctxOpts.reducedMotion = "reduce";
        const ctx = await browser.newContext(ctxOpts);
        const t0 = Date.now();
        try {
            results[spec] = await cells[name](ctx, o);
        } catch (e) {
            results[spec] = { error: String(e).slice(0, 400) };
        } finally {
            await ctx.close();
        }
        console.log(`[${ENGINE}] ${spec} done in ${Date.now() - t0}ms`);
    }
} finally {
    await browser.close();
}
console.log("wrote", save(OUT, results));
