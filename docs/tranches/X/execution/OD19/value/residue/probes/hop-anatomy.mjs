// OD19 residue (§0gp) — the od19-pane-swap hop under a CDP CPU profile on the
// real-GPU cell (headless real Chrome, channel "chrome", ANGLE-Metal; named
// need: the §0gp.2 title/window budgets are frame-production measurements).
// Same flow as e2e/smoke/od19-pane-swap.spec.ts: load Home, wait until the app
// has warmed the Gradient and Mix panes and the network is quiet, then profile
// the in-app hops Home→Gradient, →Home, →Mix. One browser per run, one context
// per cell, closed in finally.
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:8475";
const OUT = process.env.OUT ?? "docs/tranches/X/execution/OD19/value/residue/anatomy";
const WIDTHS = (process.env.WIDTHS ?? "1440,390").split(",").map(Number);
const TAG = process.env.TAG ?? "run";
mkdirSync(OUT, { recursive: true });

function summarize(profile) {
    const byId = new Map(profile.nodes.map((n) => [n.id, n]));
    const parent = new Map();
    for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
    const key = (n) => { const f = n.callFrame; return `${f.functionName || "(anon)"} @ ${f.url.replace(/^https?:\/\/[^/]+/, "").replace(/\?.*$/, "").replace(/.*\/(node_modules|deps)\//, "$1/").replace(/^\/@fs\/Users\/mkbabb\/Programming\/value\.js\//, "")}:${f.lineNumber + 1}`; };
    const selfT = new Map(), inclT = new Map();
    profile.samples.forEach((id, i) => {
        const d = (profile.timeDeltas[i] ?? 0) / 1000;
        const k0 = key(byId.get(id));
        selfT.set(k0, (selfT.get(k0) ?? 0) + d);
        const seen = new Set();
        for (let cur = id; cur !== undefined; cur = parent.get(cur)) { const k = key(byId.get(cur)); if (seen.has(k)) continue; seen.add(k); inclT.set(k, (inclT.get(k) ?? 0) + d); }
    });
    // Callers of the native leaves named in CALLERS (the nearest two JS frames above the leaf).
    const callers = new Map();
    const re = new RegExp(process.env.CALLERS ?? "^(getPropertyValue|getImageData|getComputedStyle|getBoundingClientRect) ");
    profile.samples.forEach((id, i) => {
        const d = (profile.timeDeltas[i] ?? 0) / 1000;
        const k0 = key(byId.get(id));
        if (!re.test(k0)) return;
        const chain = [];
        for (let cur = parent.get(id); cur !== undefined && chain.length < 3; cur = parent.get(cur)) chain.push(key(byId.get(cur)));
        const k = `${k0.split(" ")[0]} <- ${chain.join(" <- ")}`;
        callers.set(k, (callers.get(k) ?? 0) + d);
    });
    const top = (m, f, n = 25) => [...m.entries()].filter(([k]) => f(k)).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => `${v.toFixed(1)} ${k}`);
    return {
        self: top(selfT, (k) => !/^\((idle|program)\)/.test(k)),
        inclApp: top(inclT, (k) => /(^|\s)(demo|src)\//.test(k) || /\.vue:/.test(k), 40),
        inclLib: top(inclT, (k) => /glass-ui|vue\.runtime|reka/.test(k), 25),
        idle: +(selfT.get("(idle) @ :0") ?? 0).toFixed(0),
        program: +(selfT.get("(program) @ :0") ?? 0).toFixed(0),
        gc: +(selfT.get("(garbage collector) @ :0") ?? 0).toFixed(0),
        callers: [...callers.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => `${v.toFixed(1)} ${k}`),
    };
}

async function hop(page, cdp, hash, label) {
    await cdp.send("Profiler.start");
    const t = await page.evaluate(async ({ hash, label }) => {
        const t0 = performance.now();
        location.hash = hash;
        let title = null;
        const frames = [];
        let last = t0;
        while (performance.now() - t0 < 1500) {
            const ts = await new Promise((r) => requestAnimationFrame(r));
            frames.push(Math.round(ts - last));
            last = ts;
            if (title === null && [...document.querySelectorAll("main h1")].some((h) => h.textContent?.trim() === label)) title = Math.round(ts - t0);
        }
        return { title, longFrames: frames.filter((d) => d > 20) };
    }, { hash, label });
    const { profile } = await cdp.send("Profiler.stop");
    return { ...t, ...summarize(profile) };
}

const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--force-device-scale-factor=2"] });
const out = {};
try {
    for (const width of WIDTHS) {
        const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 } });
        try {
            const page = await ctx.newPage();
            const requested = [];
            page.on("request", (r) => requested.push(r.url()));
            await page.goto(BASE + "/#/", { timeout: 120000 });
            await page.getByRole("main").waitFor({ timeout: 120000 });
            const deadline = Date.now() + 90000;
            while (![/\/GradientPane[.-]/, /\/MixPane[.-]/].every((p) => requested.some((u) => p.test(u))) && Date.now() < deadline) await page.waitForTimeout(500);
            await page.waitForLoadState("networkidle", { timeout: 60000 });
            await page.waitForTimeout(1500);
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Profiler.enable");
            await cdp.send("Profiler.setSamplingInterval", { interval: 200 });
            const gradient = await hop(page, cdp, "#/gradient", "Gradient");
            await page.waitForTimeout(800);
            const home = await hop(page, cdp, "#/", "Home");
            await page.waitForTimeout(800);
            const mix = await hop(page, cdp, "#/mix", "Mix");
            out[width] = { gradient, home, mix };
            for (const [k, v] of Object.entries(out[width])) console.log(width, k, JSON.stringify({ title: v.title, longFrames: v.longFrames, idle: v.idle, program: v.program, gc: v.gc }));
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
writeFileSync(`${OUT}/hop-${TAG}.json`, JSON.stringify(out, null, 1));
