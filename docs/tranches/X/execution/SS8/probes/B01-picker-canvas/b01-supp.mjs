// SS-8 B01 supplementary cells (re-deployed seat, 2026-10-19). One browser per run, one context per cell.
// ENGINE=chromium|webkit  BASE=http://localhost:9000  CELLS=a,b  OUT=<json>
import { chromium, webkit } from "playwright";
import { save } from "./lib.mjs";

const ENGINE = process.env.ENGINE ?? "chromium";
const BASE = process.env.BASE ?? "http://localhost:9000";
const CELLS = (process.env.CELLS ?? "").split(",").filter(Boolean);
const OUT = process.env.OUT ?? `supp-${ENGINE}.json`;
const url = (space, color) => `${BASE}/#/?space=${space}&color=${encodeURIComponent(color)}`;

async function boot(page, space = "rgb", color = "rgb(200 50 50)") {
    await page.goto(url(space, color), { waitUntil: "load" });
    await page.waitForSelector(".spectrum-picker", { timeout: 30000 });
    await page.waitForSelector(".readout-fig", { timeout: 30000 });
    await page.waitForTimeout(1200);
}
const labels = (page) =>
    page.evaluate(() => [...document.querySelectorAll(".readout-fig")].map((e) => e.getAttribute("aria-label").split(" ")[0] + "=" + e.textContent).join(","));

const cells = {
    // SS8-0010 — reserved air, a FRESH page per space (hash-only goto does not re-boot the session).
    async air2(ctx) {
        const out = [];
        for (const [w, h] of [[512, 900], [390, 844]]) {
            for (const [sp, col] of [["oklch", "oklch(0.6 0.15 30)"], ["oklch", "oklch(0.623 0.2 45.1)"], ["lab", "lab(40 -100 -100)"], ["oklab", "oklab(0.6 -0.3 -0.3)"], ["rgb", "rgb(200 50 50)"]]) {
                const page = await ctx.newPage();
                await page.setViewportSize({ width: w, height: h });
                await boot(page, sp, col);
                const m = await page.evaluate(() => {
                    const ro = document.querySelector(".readout");
                    const rr = ro.getBoundingClientRect();
                    const cells = [...ro.querySelectorAll(".readout-cell")].map((c) => c.getBoundingClientRect());
                    const top = Math.min(...cells.map((c) => c.top)), bot = Math.max(...cells.map((c) => c.bottom));
                    const cs = getComputedStyle(ro);
                    return { readoutH: +rr.height.toFixed(2), airAbove: +(top - rr.top).toFixed(2), airBelow: +(rr.bottom - bot).toFixed(2), paintedLines: new Set(cells.map((c) => Math.round(c.top))).size, minHeight: cs.minHeight, fontSize: cs.fontSize, linesVar: cs.getPropertyValue("--readout-lines").trim() };
                });
                out.push({ viewport: `${w}x${h}`, space: sp, color: col, readout: await labels(page), ...m });
                await page.close();
            }
        }
        return out;
    },

    // SS8-0009 — torn key sets: external writes through the router (useColorUrl's route watcher),
    // snapshotted on every mutation and every frame.
    async torn2(ctx) {
        const page = await ctx.newPage();
        const errs = [];
        page.on("pageerror", (e) => errs.push(String(e).slice(0, 300)));
        await boot(page, "rgb", "rgb(200 50 50)");
        const hasRouter = await page.evaluate(() => {
            const app = document.querySelector("#app")?.__vue_app__;
            window.__router = app?.config?.globalProperties?.$router;
            return !!window.__router;
        });
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
        const spaces = ["lab", "kelvin", "hsl", "oklch", "rgb", "xyz", "hwb", "display-p3", "kelvin", "lch", "hex", "oklab"];
        const colors = ["rgb(200 50 50)", "rgb(20 160 90)", "rgb(250 240 10)", "rgb(10 10 200)"];
        for (const gap of [0, 8, 40]) {
            for (let i = 0; i < spaces.length; i++) {
                await page.evaluate(([sp, col, g]) => new Promise((res) => {
                    const q = { space: sp, color: col };
                    if (window.__router) window.__router.replace({ path: "/", query: q });
                    else location.hash = "#/?space=" + sp + "&color=" + encodeURIComponent(col);
                    setTimeout(res, g);
                }), [spaces[i], colors[i % 4], gap]);
            }
            await page.waitForTimeout(700);
        }
        const legalSets = await page.evaluate(async () => {
            const pc = await import("/@fs/Users/mkbabb/Programming/value.js/demo/color-session/picker-color.ts");
            return Object.values(pc.PICKER_CHANNELS).map((v) => v.map((m) => m.key).join(","));
        });
        const snaps = await page.evaluate(() => { cancelAnimationFrame(window.__raf); return window.__snaps; });
        const legal = new Set([...legalSets, "hex"]);
        const torn = snaps.filter((s) => !legal.has(s.labels) || s.bad.length);
        const observed = {};
        for (const s of snaps) observed[s.labels] = (observed[s.labels] ?? 0) + 1;
        return { hasRouter, snapshots: snaps.length, observedLabelSets: observed, tornCount: torn.length, tornSample: torn.slice(0, 8), finalHash: decodeURIComponent(await page.evaluate(() => location.hash)), errs };
    },

    // SS8-0005 — does a typed/composed keystroke reach the model per keystroke? (hash + dot timeline)
    async emit(ctx) {
        const page = await ctx.newPage();
        await boot(page, "rgb", "rgb(200 50 50)");
        const probe = () => page.evaluate(() => ({ hash: decodeURIComponent(location.hash), dot: document.querySelector(".spectrum-dot").getAttribute("style")?.match(/background[^;]*/)?.[0] ?? null, aria: document.querySelector(".spectrum-picker").getAttribute("aria-label") }));
        const r = page.locator('.readout-fig[aria-label="r component value"]');
        await r.click();
        await page.keyboard.press("ControlOrMeta+a");
        const seq = [{ step: "selected", ...(await probe()) }];
        for (const ch of ["1", "2", "3"]) {
            await page.keyboard.type(ch);
            await page.waitForTimeout(150);
            seq.push({ step: "typed " + ch + " +150ms", ...(await probe()) });
        }
        await page.waitForTimeout(800);
        seq.push({ step: "settle +800ms", ...(await probe()) });
        let ime = { skipped: "IME composition via CDP is Chromium-only" };
        if (ENGINE === "chromium") {
            const g = page.locator('.readout-fig[aria-label="g component value"]');
            await g.click();
            await page.keyboard.press("ControlOrMeta+a");
            const cdp = await ctx.newCDPSession(page);
            const s = [{ step: "g selected", ...(await probe()) }];
            for (const t of ["9", "90"]) {
                await cdp.send("Input.imeSetComposition", { text: t, selectionStart: t.length, selectionEnd: t.length });
                await page.waitForTimeout(400);
                s.push({ step: "composing " + t + " +400ms", ...(await probe()) });
            }
            await cdp.send("Input.insertText", { text: "90" });
            await page.waitForTimeout(800);
            s.push({ step: "committed 90 +800ms", ...(await probe()) });
            // a composition that PAUSES past the 500ms debounce (useColorPipeline.ts:208) mid-composition
            await page.locator('.readout-fig[aria-label="b component value"]').click();
            await page.keyboard.press("ControlOrMeta+a");
            await cdp.send("Input.imeSetComposition", { text: "2", selectionStart: 1, selectionEnd: 1 });
            await page.waitForTimeout(900);
            s.push({ step: "b composing '2' (uncommitted) +900ms", ...(await probe()) });
            await cdp.send("Input.imeSetComposition", { text: "25", selectionStart: 2, selectionEnd: 2 });
            await page.waitForTimeout(900);
            s.push({ step: "b composing '25' (uncommitted) +900ms", ...(await probe()) });
            await cdp.send("Input.insertText", { text: "250" });
            await page.waitForTimeout(900);
            s.push({ step: "b committed 250 +900ms", ...(await probe()) });
            ime = s;
        }
        return { typed: seq, ime };
    },

    // SS8-0027 (R17) + SS8-0011 — one trace: an idle window then a single drag of equal length;
    // Layout events nested inside FireAnimationFrame per window, with the forced-layout stack top.
    async trace2(ctx) {
        if (ENGINE !== "chromium") return { skipped: "chromium tracing only" };
        const page = await ctx.newPage();
        await boot(page);
        await page.waitForTimeout(1500);
        const r = await page.evaluate(() => document.querySelector(".spectrum-picker").getBoundingClientRect().toJSON());
        await browser.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.stack", "blink.user_timing"] });
        await page.evaluate(() => performance.mark("idle-start"));
        await page.waitForTimeout(41 * 16 + 300);
        await page.evaluate(() => performance.mark("drag-start"));
        await page.mouse.move(r.x + r.width * 0.2, r.y + r.height * 0.3);
        await page.mouse.down();
        for (let i = 0; i <= 40; i++) {
            await page.mouse.move(r.x + r.width * (0.2 + 0.6 * i / 40), r.y + r.height * (0.3 + 0.4 * i / 40));
            await page.waitForTimeout(16);
        }
        await page.mouse.up();
        await page.waitForTimeout(300);
        await page.evaluate(() => performance.mark("drag-end"));
        const buf = await browser.stopTracing();
        const parsed = JSON.parse(buf.toString());
        const ev = parsed.traceEvents ?? parsed;
        const mark = (n) => ev.find((e) => e.name === n)?.ts;
        const [t0, t1, t2] = [mark("idle-start"), mark("drag-start"), mark("drag-end")];
        const fafs = ev.filter((e) => e.name === "FireAnimationFrame" && e.ph === "X");
        const tid = fafs[0]?.tid, pid = fafs[0]?.pid;
        const main = ev.filter((e) => e.tid === tid && e.pid === pid && e.ph === "X");
        const within = (e, f) => e.ts >= f.ts && e.ts + (e.dur ?? 0) <= f.ts + f.dur;
        const win = (a, b) => {
            const F = fafs.filter((f) => f.ts >= a && f.ts < b);
            const L = main.filter((e) => e.name === "Layout" && e.ts >= a && e.ts < b);
            const S = main.filter((e) => (e.name === "UpdateLayoutTree" || e.name === "RecalculateStyles") && e.ts >= a && e.ts < b);
            const Lin = L.filter((l) => F.some((f) => within(l, f)));
            const stacks = {};
            for (const l of Lin) {
                const st = l.args?.beginData?.stackTrace ?? l.args?.data?.stackTrace;
                const k = st?.length ? st.slice(0, 2).map((s) => `${s.functionName || "(anon)"}@${(s.url || "").split("/").pop()}:${s.lineNumber}`).join(" < ") : "(no stack: not forced)";
                stacks[k] = (stacks[k] ?? 0) + 1;
            }
            const d = F.map((f) => f.dur / 1000).sort((x, y) => x - y);
            const sum = (A) => +(A.reduce((s, e) => s + e.dur, 0) / 1000).toFixed(1);
            return { ms: +((b - a) / 1000).toFixed(0), rafs: F.length, rafMsP50: d[Math.floor(d.length / 2)] ?? null, rafMsMax: d[d.length - 1] ?? null, layouts: L.length, layoutsInsideRaf: Lin.length, layoutMsTotal: sum(L), styleRecalcs: S.length, styleMsTotal: sum(S), insideRafStacks: stacks };
        };
        return { marks: !!(t0 && t1 && t2), idle: win(t0, t1), drag: win(t1, t2), loadavg: (await import("node:os")).loadavg().map((x) => +x.toFixed(1)) };
    },

    // SS8-0012 — the dot's computed position on whatever BASE serves.
    async pos2(ctx) {
        const page = await ctx.newPage();
        await boot(page);
        return page.evaluate(() => {
            const d = document.querySelector(".spectrum-dot");
            const p = document.querySelector(".spectrum-picker").getBoundingClientRect();
            const b = d.getBoundingClientRect();
            return { position: getComputedStyle(d).position, sheets: [...document.styleSheets].map((s) => (s.href ?? "(inline)").split("/").pop()).slice(0, 6), dotCenterFrac: [+((b.x + b.width / 2 - p.x) / p.width).toFixed(3), +((b.y + b.height / 2 - p.y) / p.height).toFixed(3)] };
        });
    },

    // SS8-0002 / SS8-0018 — what the engine's accessibility tree exposes (not what an AT says).
    async ax(ctx) {
        const page = await ctx.newPage();
        await boot(page, "rgb", "rgb(200 50 50)");
        const readout = await page.locator(".readout").ariaSnapshot();
        const plate = await page.locator(".spectrum-picker").evaluate((e) => {
            const fig = e.closest("figure");
            return { role: e.getAttribute("role"), label: e.getAttribute("aria-label"), figure: !!fig, figureLabel: fig?.getAttribute("aria-label") ?? fig?.querySelector("figcaption")?.textContent ?? null };
        });
        const plateSnap = await page.locator(".spectrum-picker").ariaSnapshot().catch((e) => String(e).slice(0, 120));
        return { readout, plate, plateSnap };
    },
};

const launcher = ENGINE === "webkit" ? webkit : chromium;
const browser = await launcher.launch();
const results = { engine: ENGINE, version: browser.version(), base: BASE, at: new Date().toISOString() };
try {
    for (const name of CELLS) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const t0 = Date.now();
        try {
            results[name] = await cells[name](ctx);
        } catch (e) {
            results[name] = { error: String(e).slice(0, 400) };
        } finally {
            await ctx.close();
        }
        console.log(`[${ENGINE}] ${name} done in ${Date.now() - t0}ms`);
    }
} finally {
    await browser.close();
}
console.log("wrote", save(OUT, results));
