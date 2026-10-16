// SERVED MODEL: claude-opus-5-5
// X.W12U.g2d — O-5 GPU RED attribution: a CDP CPU profile of the boot window on
// the same cell as o5-gpu-witness.mjs (headless channel:'chrome', ANGLE-Metal
// asserted), with the sampled self time inside the boot long task attributed to
// SOURCE files through the build's hidden sourcemaps (dist/gh-pages/assets/*.map).
// Usage: node boot-profile.mjs <origin> <distDir> <label> [sittings=2]
import { chromium } from "@playwright/test";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const [origin, dist, label, nArg] = process.argv.slice(2);
const N = Number(nArg ?? 2);
const MAIN = 'main[aria-labelledby="route-title"]:has(> h1#route-title)';
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const dec = (s) => { const out = []; let v = 0, sh = 0; for (const c of s) { const d = B64.indexOf(c); v += (d & 31) << sh; if (d & 32) sh += 5; else { out.push(v & 1 ? -(v >>> 1) : v >>> 1); v = 0; sh = 0; } } return out; };
const maps = new Map();
function lookup(url, line, col) {
    const f = url.split("/").pop();
    if (!maps.has(f)) {
        const p = join(dist, "assets", f + ".map");
        if (!existsSync(p)) { maps.set(f, null); } else {
            const m = JSON.parse(readFileSync(p, "utf8")); const lines = []; let src = 0;
            for (const ln of m.mappings.split(";")) { let c = 0; const segs = []; for (const sg of ln.split(",")) { if (!sg) continue; const d = dec(sg); c += d[0]; if (d.length >= 4) { src += d[1]; segs.push([c, src]); } } lines.push(segs); }
            maps.set(f, { lines, sources: m.sources });
        }
    }
    const m = maps.get(f); if (!m) return f;
    const segs = m.lines[line] ?? []; let best = null; for (const s of segs) { if (s[0] <= col) best = s; else break; }
    if (!best) return f;
    return m.sources[best[1]].replace(/^(\.\.\/)+/, "").replace(/.*node_modules\//, "npm:");
}
const GPU_RE = /ANGLE.*Metal/i;
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist", "--enable-gpu-rasterization"] });
try {
    for (let s = 1; s <= N; s++) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
        try {
            const page = await ctx.newPage();
            await page.addInitScript(() => { window.__lt = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([e.startTime, e.duration]); }).observe({ type: "longtask", buffered: true }); } catch {} });
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Profiler.enable");
            await cdp.send("Profiler.setSamplingInterval", { interval: 100 });
            await cdp.send("Profiler.start");
            await page.goto(origin + "/");
            await page.locator(MAIN).waitFor({ state: "visible", timeout: 20000 });
            await page.waitForTimeout(500);
            const { profile } = await cdp.send("Profiler.stop");
            const renderer = await page.evaluate(() => { const c = document.createElement("canvas"); const gl = c.getContext("webgl2"); const e = gl?.getExtension("WEBGL_debug_renderer_info"); return e ? String(gl.getParameter(e.UNMASKED_RENDERER_WEBGL)) : "none"; });
            if (!GPU_RE.test(renderer)) { console.log(`[boot-profile ${label} s${s}] INSTRUMENT FAULT renderer=${renderer}`); continue; }
            const lt = await page.evaluate(() => window.__lt);
            const first = lt[0];
            const nodes = new Map(profile.nodes.map((n) => [n.id, n]));
            const self = new Map(); let t = profile.startTime; let total = 0;
            // timeDeltas are µs on the profile clock; restrict to the busiest contiguous span = the long task's duration window by sample density
            const samples = profile.samples.map((id, i) => { t += profile.timeDeltas[i]; return [id, t, profile.timeDeltas[i]]; });
            for (const [id, , dt] of samples) {
                const n = nodes.get(id); const cf = n.callFrame;
                if (cf.functionName === "(idle)" || cf.functionName === "(program)" || cf.functionName === "(root)") continue;
                const key = cf.url ? lookup(cf.url, cf.lineNumber, cf.columnNumber) : `(${cf.functionName || "native"})`;
                const k2 = key.startsWith("npm:") && !key.startsWith("npm:@mkbabb/glass-ui") ? key.split("/").slice(0, key.startsWith("npm:@") ? 2 : 1).join("/") : key;
                self.set(k2, (self.get(k2) ?? 0) + dt / 1000); total += dt / 1000;
            }
            const top = [...self].sort((a, b) => b[1] - a[1]).slice(0, 22).map(([k, v]) => `${v.toFixed(1)}ms ${k}`);
            console.log(`[boot-profile ${label} s${s}] renderer=${renderer.replace(/\(Apple, |, Unspecified Version\)/g, "")} firstLongtask=${first ? `[${first[0].toFixed(0)},+${first[1].toFixed(0)}]` : "none"} longtasks=${lt.length} busyTotal=${total.toFixed(1)}ms (to main+500ms)`);
            for (const l of top) console.log("    " + l);
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
