// scene-swap-transition — frame-by-frame capture (headed Chromium, real GPU).
// Method 1 (WAAPI seek over the native View Transition pseudo-tree animations)
// + Method 3 (CDP screencast, real time) for the post-VT Suspense/skeleton tail
// and for direct-hash navigation. READ-ONLY on the app: only observes.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const OUT = path.dirname(new URL(import.meta.url).pathname);
const URL0 = "http://localhost:5173/#/cube";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const kfState = () => ({
    head: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(),
    dirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim(),
});
const log = { started: new Date().toISOString(), kfAtStart: kfState(), runs: [] };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Hook startViewTransition: log every call + keep the live handle.
const INIT = (cf) => {
    window.__vtLog = [];
    window.__vtThrows = [];
    window.__domLog = [];
    const orig = Document.prototype.startViewTransition;
    if (orig) {
        Document.prototype.startViewTransition = function (arg) {
            // Native semantics preserved unless `cf` (the counterfactual run):
            // an unbound call throws "Illegal invocation" exactly as the platform.
            const self = this instanceof Document ? this : cf ? document : null;
            if (!self) { window.__vtThrows.push({ t: performance.now(), argKind: typeof arg }); throw new TypeError("Illegal invocation"); }
            const vt = orig.call(self, arg);
            const rec = { t0: performance.now(), types: arg && arg.types ? [...arg.types] : null };
            window.__vtLog.push(rec);
            window.__vt = vt;
            vt.ready.then(() => (rec.ready = performance.now()), (e) => (rec.readyErr = String(e)));
            vt.finished.then(() => (rec.finished = performance.now()));
            return vt;
        };
    }
    // Scene-host child log: when skeleton / scene root appears.
    const arm = () => {
        const host = document.querySelector(".scene-host");
        if (!host) return requestAnimationFrame(arm);
        const snap = () => {
            const c = host.firstElementChild;
            window.__domLog.push({
                t: performance.now(),
                child: c ? (c.className && c.className.baseVal !== undefined ? c.className.baseVal : c.className) || c.tagName : null,
                skeleton: !!host.querySelector(".scene-skeleton"),
                hostOpacity: getComputedStyle(host).opacity,
                hostTransform: getComputedStyle(host).transform,
            });
        };
        new MutationObserver(snap).observe(host, { childList: true, subtree: false });
        snap();
    };
    arm();
};

async function newPage(browser, cf = false) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.addInitScript(INIT, cf);
    return { ctx, page };
}

async function pickScene(page, label) {
    // The ChromeDock rests collapsed (a glyph pill); hover expands it, then the
    // expanded scene <Select> trigger (role=combobox, name "Scene") opens.
    const combo = page.getByRole("combobox", { name: "Scene" });
    if (!(await combo.isVisible().catch(() => false))) {
        await page.locator('[aria-label="Scene"]:visible').first().hover();
        await combo.waitFor({ state: "visible", timeout: 5000 });
        await sleep(450);
    }
    await combo.click();
    const opt = page.getByRole("option", { name: label, exact: true });
    await opt.waitFor({ state: "visible", timeout: 5000 });
    await opt.click();
}

// Method 3 — screencast every frame for `ms` while `action` runs.
async function screencast(page, dir, ms, action) {
    fs.mkdirSync(dir, { recursive: true });
    const cdp = await page.context().newCDPSession(page);
    const frames = [];
    cdp.on("Page.screencastFrame", async (f) => {
        const i = frames.length;
        const file = path.join(dir, `f${String(i).padStart(3, "0")}.jpg`);
        fs.writeFileSync(file, Buffer.from(f.data, "base64"));
        frames.push({ i, ts: f.metadata.timestamp, file: path.basename(file) });
        try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {}
    });
    // rAF delta probe over the same window
    await page.evaluate(() => {
        window.__raf = [];
        let last = performance.now();
        const t0 = last;
        const tick = (t) => {
            window.__raf.push(t - last);
            last = t;
            if (t - t0 < 3000) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        window.__actT = null;
    });
    await cdp.send("Page.startScreencast", { format: "jpeg", quality: 85, everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
    await sleep(250);
    const tAct = Date.now() / 1000;
    await page.evaluate(() => (window.__actT = performance.now()));
    await action();
    await sleep(ms);
    await cdp.send("Page.stopScreencast");
    await sleep(100);
    const probe = await page.evaluate(() => ({
        actT: window.__actT,
        vtLog: window.__vtLog.slice(-3),
        domLog: window.__domLog.filter((d) => d.t >= window.__actT - 5),
        raf: window.__raf,
    }));
    const deltas = probe.raf.slice(1);
    const rafStats = {
        n: deltas.length,
        over20: deltas.filter((d) => d > 20).length,
        max: Math.max(...deltas).toFixed(1),
        bigOnes: deltas.map((d, i) => [i, +d.toFixed(1)]).filter(([, d]) => d > 20),
    };
    frames.forEach((f) => (f.dtAct = +(f.ts - tAct).toFixed(3)));
    fs.writeFileSync(path.join(dir, "frames.json"), JSON.stringify({ frames, probe: { ...probe, raf: undefined }, rafStats }, null, 1));
    await cdp.detach();
    return { frames: frames.length, rafStats, vtLog: probe.vtLog, domLog: probe.domLog };
}

// Method 1 — pause the native VT pseudo animations after `ready`, seek N times.
async function seekVT(page, dir, N, action) {
    fs.mkdirSync(dir, { recursive: true });
    await page.evaluate(() => { window.__vt = null; });
    await action();
    const got = await page.waitForFunction(() => window.__vt, null, { timeout: 3000 }).then(() => true, () => false);
    if (!got) {
        await sleep(1500);
        await page.screenshot({ path: path.join(dir, "no-vt-after.png") });
        const r = await page.evaluate(() => ({ vtThrows: window.__vtThrows.slice(-2), vtAnims: document.getAnimations().filter((a) => a.effect?.pseudoElement?.includes("view-transition")).length }));
        fs.writeFileSync(path.join(dir, "seek.json"), JSON.stringify({ noViewTransition: true, ...r }, null, 1));
        return { noViewTransition: true, ...r };
    }
    await page.evaluate(() => window.__vt.ready.catch(() => {}));
    const anims = await page.evaluate(() => {
        const as = document.getAnimations().filter((a) => a.effect && a.effect.pseudoElement && a.effect.pseudoElement.includes("view-transition"));
        as.forEach((a) => a.pause());
        window.__vtAnims = as;
        return as.map((a) => {
            const t = a.effect.getComputedTiming();
            return {
                pseudo: a.effect.pseudoElement,
                name: a.animationName,
                duration: t.duration, delay: t.delay, easing: a.effect.getTiming().easing,
                keyframes: a.effect.getKeyframes().map((k) => {
                    const o = { offset: k.offset, easing: k.easing };
                    for (const p of ["opacity", "transform", "width", "height", "mixBlendMode", "filter"]) if (k[p] !== undefined) o[p] = k[p];
                    return o;
                }),
            };
        });
    });
    const total = Math.max(0, ...anims.map((a) => (a.delay || 0) + (typeof a.duration === "number" ? a.duration : 0)));
    const layerInfo = await page.evaluate(() => {
        const cs = (pe) => {
            const s = getComputedStyle(document.documentElement, pe);
            return { z: s.zIndex, blend: s.mixBlendMode, opacity: s.opacity, pos: s.position, w: s.width, h: s.height, transform: s.transform, iso: s.isolation };
        };
        const host = document.querySelector(".scene-host");
        const hs = getComputedStyle(host);
        const r = host.getBoundingClientRect();
        const dock = document.querySelector('[aria-label="Scene"]')?.closest("[class*=dock]");
        return {
            groupScene: cs("::view-transition-group(scene-subject)"),
            oldScene: cs("::view-transition-old(scene-subject)"),
            newScene: cs("::view-transition-new(scene-subject)"),
            groupRoot: cs("::view-transition-group(root)"),
            host: { opacity: hs.opacity, transform: hs.transform, z: hs.zIndex, vtName: hs.viewTransitionName, rect: [r.x, r.y, r.width, r.height], child: host.firstElementChild?.className },
            dock: dock ? { z: getComputedStyle(dock).zIndex, vtName: getComputedStyle(dock).viewTransitionName, rect: (() => { const b = dock.getBoundingClientRect(); return [b.x, b.y, b.width, b.height]; })() } : null,
            activeTypes: ["forward", "backward"].filter((t) => { try { return document.documentElement.matches(`:active-view-transition-type(${t})`); } catch { return false; } }),
        };
    });
    const shots = [];
    for (let i = 0; i < N; i++) {
        const t = (total * i) / (N - 1);
        await page.evaluate((t) => window.__vtAnims.forEach((a) => (a.currentTime = t)), t);
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
        const file = path.join(dir, `s${String(i).padStart(3, "0")}.png`);
        await page.screenshot({ path: file });
        shots.push({ i, t: +t.toFixed(1) });
    }
    await page.evaluate(() => window.__vtAnims.forEach((a) => a.finish()));
    await page.waitForFunction(() => window.__vtLog.at(-1).finished, null, { timeout: 5000 }).catch(() => {});
    await sleep(1500);
    await page.screenshot({ path: path.join(dir, "after-settle.png") });
    const post = await page.evaluate(() => ({ vt: window.__vtLog.at(-1), domLog: window.__domLog.slice(-6) }));
    fs.writeFileSync(path.join(dir, "seek.json"), JSON.stringify({ total, anims, layerInfo, shots, post }, null, 1));
    return { total, nAnims: anims.length, layerInfo, post };
}

const MODE = process.argv[2] || "all";
const browser = await chromium.launch({ headless: false, args: ["--window-size=1460,1000"] });
const seq = [["Amiga", "amiga"], ["Square", "square"], ["Easing", "easing"], ["Spring", "spring"], ["Sequence", "sequence"], ["Cube", "cube"]];
async function boot(cf) {
    const { ctx, page } = await newPage(browser, cf);
    await page.goto(URL0, { waitUntil: "load" });
    await sleep(3500);
    return { ctx, page };
}
try {
    if (MODE === "all" || MODE === "A") {
        // RUN A — SHIPPED: fresh load, dock swaps, real-time screencast (method 3)
        const { ctx, page } = await boot(false);
        await page.screenshot({ path: path.join(OUT, "A-00-at-rest-cube.png") });
        log.gpu = await page.evaluate(() => { const gl = document.createElement("canvas").getContext("webgl"); const e = gl && gl.getExtension("WEBGL_debug_renderer_info"); return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : "n/a"; });
        let prev = "cube";
        for (const [label, id] of seq) {
            const dir = path.join(OUT, `A-${prev}-to-${id}`);
            const r = await screencast(page, dir, 2200, () => pickScene(page, label));
            log.runs.push({ run: "A-shipped-screencast", from: prev, to: id, kf: kfState(), ...r, domLog: undefined });
            fs.writeFileSync(path.join(dir, "dom.json"), JSON.stringify(r.domLog, null, 1));
            await sleep(1200);
            prev = id;
        }
        await ctx.close();
    }
    if (MODE === "all" || MODE === "B") {
        // RUN B — SHIPPED: warm chunks, try method 1 (seek) on the VT; then direct-hash nav
        const { ctx, page } = await boot(false);
        for (const [label] of seq) { await pickScene(page, label); await sleep(1800); } // warm every chunk
        for (const [label, id, from] of [["Amiga", "amiga", "cube"], ["Easing", "easing", "amiga"]]) {
            const r = await seekVT(page, path.join(OUT, `B-shipped-seek-${from}-to-${id}`), 48, () => pickScene(page, label));
            log.runs.push({ run: "B-shipped-seek-warm", from, to: id, kf: kfState(), ...r });
            await sleep(1200);
        }
        const dir = path.join(OUT, "D-hash-amiga-to-easing");
        await page.evaluate(() => (location.hash = "#/amiga"));
        await sleep(2500);
        const r = await screencast(page, dir, 2000, () => page.evaluate(() => (location.hash = "#/easing")));
        log.runs.push({ run: "D-shipped-hash", from: "amiga", to: "easing", kf: kfState(), ...r, domLog: undefined });
        fs.writeFileSync(path.join(dir, "dom.json"), JSON.stringify(r.domLog, null, 1));
        await ctx.close();
    }
    if (MODE === "all" || MODE === "CF") {
        // RUN CF — COUNTERFACTUAL (instrument binds startViewTransition to document,
        // i.e. what the one-token fix would ship). Cold first swap, then warm swaps.
        const { ctx, page } = await boot(true);
        let r = await seekVT(page, path.join(OUT, "CF-seek-cold-cube-to-amiga"), 48, () => pickScene(page, "Amiga"));
        log.runs.push({ run: "CF-seek-cold", from: "cube", to: "amiga", kf: kfState(), ...r });
        await sleep(1500);
        const dirS = path.join(OUT, "CF-screencast-cold-amiga-to-square");
        const s2 = await screencast(page, dirS, 2200, () => pickScene(page, "Square"));
        log.runs.push({ run: "CF-screencast-cold", from: "amiga", to: "square", kf: kfState(), ...s2, domLog: undefined });
        fs.writeFileSync(path.join(dirS, "dom.json"), JSON.stringify(s2.domLog, null, 1));
        await sleep(1500);
        r = await seekVT(page, path.join(OUT, "CF-seek-warm-square-to-amiga"), 48, () => pickScene(page, "Amiga"));
        log.runs.push({ run: "CF-seek-warm", from: "square", to: "amiga", kf: kfState(), ...r });
        await ctx.close();
    }
} finally {
    log.kfAtEnd = kfState();
    fs.writeFileSync(path.join(OUT, `capture-log-${MODE}.json`), JSON.stringify(log, null, 1));
    await browser.close();
}
console.log(JSON.stringify(log, (k, v) => (k === "bigOnes" || k === "keyframes" || k === "domLog" ? undefined : v), 1).slice(0, 7000));
