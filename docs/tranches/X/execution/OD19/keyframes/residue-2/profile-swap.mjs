// OD19 residue (COHESION §0gp) — CPU profile of the warm-swap commit frame on
// the real-GPU cell (headless real Chrome, channel:'chrome', ANGLE-Metal: the
// GPU cell of record per §0fr.2/§0gp.2; the full binary is needed for the
// Metal GL backend the shell does not ship). Usage:
//   node profile-swap.mjs <dist (unminified build)> <out.json> [rate]
// One browser, one context. Boots #/cube, idles 3 s, then per swap starts the
// CDP sampler, hash-navigates, waits for scene-swap:total and stops. Reports
// the self time by function@file:line inside the longest frame's window and
// the callers of the layout-forcing natives.
import fs from "node:fs";
import { SCENES, serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";

const [dist, out, rateArg] = process.argv.slice(2);
const RATE = Number(rateArg || 1);
const launch = { gpu: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] };
const FORCING = /^(getBoundingClientRect|getComputedStyle|getPropertyValue|offset(Width|Height|Top|Left)|client(Width|Height)|scroll(Width|Height|Top|Left)|getClientRects|focus)$/;

function analyse(profile, t0us, t1us) {
    const byId = new Map(profile.nodes.map((n) => [n.id, n]));
    const parent = new Map();
    for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
    const self = new Map();
    const forcing = new Map();
    const app = new Map();
    // the commit frame = the longest busy run of samples (idle gaps < 3 ms)
    const ts = [];
    let tt = profile.startTime;
    for (let i = 0; i < profile.samples.length; i++) ts.push((tt += profile.timeDeltas[i]));
    const idle = (i) => byId.get(profile.samples[i]).callFrame.functionName === "(idle)";
    let best = [0, 0], cur = null, lastBusy = -1;
    for (let i = 0; i < ts.length; i++) {
        if (idle(i)) continue;
        if (cur && ts[i] - ts[lastBusy] < 3000) cur[1] = i;
        else cur = [i, i];
        lastBusy = i;
        if (ts[cur[1]] - ts[cur[0]] > ts[best[1]] - ts[best[0]]) best = [...cur];
    }
    if (t0us === -Infinity) [t0us, t1us] = [ts[best[0]], ts[best[1]]];
    const busyMs = Math.round((t1us - t0us) / 100) / 10;
    let t = profile.startTime;
    for (let i = 0; i < profile.samples.length; i++) {
        t += profile.timeDeltas[i];
        if (t < t0us || t > t1us) continue;
        const dt = (profile.timeDeltas[i + 1] ?? 0) / 1000;
        const n = byId.get(profile.samples[i]);
        const cf = n.callFrame;
        const key = `${cf.functionName || "(anon)"}@${cf.url.split("/").pop()}:${cf.lineNumber + 1}`;
        self.set(key, (self.get(key) ?? 0) + dt);
        // walk up: the first layout-forcing native and its nearest app caller chain (3 frames)
        let id = n.id;
        let hit = null;
        const chain = [];
        while (id != null) {
            const f = byId.get(id).callFrame;
            if (!hit && FORCING.test(f.functionName)) hit = f.functionName;
            else if (hit && f.url && chain.length < 3) chain.push(`${f.functionName || "(anon)"}@${f.url.split("/").pop()}:${f.lineNumber + 1}`);
            if (n.callFrame.functionName === "(garbage collector)") break;
            id = parent.get(id);
        }
        // nearest consumer frame (not vendor, not glass, not native) — names the app cost
        for (let a = n.id; a != null; a = parent.get(a)) {
            const f = byId.get(a).callFrame;
            if (f.url && !/vendor-|glass-ui-/.test(f.url)) {
                const k = `${f.functionName || "(anon)"}@${f.url.split("/").pop()}:${f.lineNumber + 1}`;
                app.set(k, (app.get(k) ?? 0) + dt);
                break;
            }
        }
        if (hit) {
            const k = `${hit} <- ${chain.join(" <- ")}`;
            forcing.set(k, (forcing.get(k) ?? 0) + dt);
        }
    }
    const top = (m, k) => [...m].sort((a, b) => b[1] - a[1]).slice(0, k).map(([n, ms]) => [n, Math.round(ms * 10) / 10]);
    self.delete("(idle)@:0");
    return { busyMs, self: top(self, 25), app: top(app, 20), forcing: top(forcing, 15), forcedTotal: Math.round([...forcing.values()].reduce((a, b) => a + b, 0)) };
}

const rows = [];
let renderer = null;
const server = await serveDist(dist);
try {
    const r = await withBrowser(
        async (browser) => {
            const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
            try {
                await ctx.addInitScript(() => {
                    window.__frames = [];
                    let last = performance.now();
                    const tick = () => {
                        const n = performance.now();
                        window.__frames.push([n, n - last]);
                        last = n;
                        requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                });
                const page = await ctx.newPage();
                const cdp = await ctx.newCDPSession(page);
                if (RATE !== 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: RATE });
                await cdp.send("Profiler.enable");
                await cdp.send("Profiler.setSamplingInterval", { interval: 100 });
                await page.goto(server.url + "/#/cube", { waitUntil: "load" });
                renderer = await page.evaluate(() => {
                    const gl = document.createElement("canvas").getContext("webgl2");
                    const x = gl?.getExtension("WEBGL_debug_renderer_info");
                    return x ? gl.getParameter(x.UNMASKED_RENDERER_WEBGL) : null;
                });
                await page.waitForTimeout(4000);
                let from = "cube";
                const order = [...SCENES.map((s) => s.key).filter((k) => k !== "cube" && k !== "home"), "cube"];
                for (const key of order) {
                    const route = SCENES.find((s) => s.key === key).route;
                    // performance.now() origin == profile clock offset: read both
                    await cdp.send("Profiler.start");
                    const m = await page.evaluate(async (hash) => {
                        performance.clearMeasures();
                        const t0 = performance.now();
                        location.hash = hash;
                        for (let i = 0; i < 400 && !performance.getEntriesByName("scene-swap:total").length; i++)
                            await new Promise((r) => setTimeout(r, 16));
                        await new Promise((r) => setTimeout(r, 150));
                        const ms = Object.fromEntries(performance.getEntriesByType("measure").filter((e) => e.name.startsWith("scene-swap:")).map((e) => [e.name.slice(11), Math.round(e.duration)]));
                        const win = window.__frames.filter((x) => x[0] >= t0 && x[0] <= t0 + (ms.total ?? 1000) + 100);
                        const worst = win.reduce((a, b) => (b[1] > a[1] ? b : a), [0, 0]);
                        return { ...ms, t0, worstEnd: worst[0], worst: Math.round(worst[1]), over50: win.filter((x) => x[1] > 50).length, origin: performance.timeOrigin };
                    }, `#/${route}`);
                    const { profile } = await cdp.send("Profiler.stop");
                    // profile clock is monotonic µs; align by the sample nearest the frame end
                    const base = profile.startTime; // ≈ t0 - small; use relative offsets
                    const startPerf = m.t0; // profile started just before t0
                    const toUs = (perfMs) => base + (perfMs - startPerf) * 1000;
                    const a = analyse(profile, -Infinity, Infinity); // the whole swap: the sampler spans pick→total+150 ms
                    if (process.env.RAW_DIR) fs.writeFileSync(`${process.env.RAW_DIR}/${from}-${key}.cpuprofile`, JSON.stringify(profile));
                    rows.push({ swap: `${from}->${key}`, prepare: m.prepare, commit: m.commit, total: m.total, worst: m.worst, over50: m.over50, ...a });
                    from = key;
                    await page.waitForTimeout(1500);
                }
            } finally {
                await ctx.close();
            }
        },
        { launch, label: "profile-swap" },
    );
    if (r?.skipped) throw new Error("no browser: " + r.reason);
} finally {
    await server.close();
}
fs.writeFileSync(out, JSON.stringify({ dist, rate: RATE, renderer, rows }, null, 1));
console.log(renderer);
for (const r of rows) {
    console.log(`${r.swap} commit ${r.commit} worst ${r.worst} over50 ${r.over50} busy ${r.busyMs} forced ${r.forcedTotal}`);
    for (const [n, ms] of r.app.slice(0, 8)) console.log(`   APP ${ms}  ${n}`);
    for (const [n, ms] of r.self.slice(0, 6)) console.log(`   self ${ms}  ${n}`);
    for (const [n, ms] of r.forcing.slice(0, 6)) console.log(`   FORCE ${ms}  ${n}`);
}
