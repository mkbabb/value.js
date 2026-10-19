// SERVED MODEL: claude-opus-5-5
// X.W12U.o5b act (i) — CPU profile of THE BOOT TASK (COHESION §0fu.2 (i)).
// Same cell as g2d/o5-gpu-witness.mjs (headless channel:'chrome', ANGLE-Metal
// asserted). Unlike g2d/boot-profile.mjs (whole window to main+500 ms), this
// restricts samples to the FIRST longtask's window and reports, source-mapped:
//   SELF   ms per source file (top 20)
//   INCL   ms per demo/ or glass-ui source file, counted once per sample (top 25)
//   PHASE  ms of the task under `mount` vs module evaluation vs other
// Usage: node boot-task-profile.mjs <origin> <distDir> <label> [sittings=2]
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
        if (!existsSync(p)) maps.set(f, null);
        else {
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
const pkg = (k) => k.startsWith("npm:") && !k.startsWith("npm:@mkbabb/glass-ui") ? k.split("/").slice(0, k.startsWith("npm:@") ? 2 : 1).join("/") : k;
const GPU_RE = /ANGLE.*Metal/i;
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist", "--enable-gpu-rasterization"] });
try {
    for (let s = 1; s <= N; s++) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
        try {
            const page = await ctx.newPage();
            await page.addInitScript(() => { window.__lt = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: "longtask", buffered: true }); } catch {} });
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Profiler.enable");
            await cdp.send("Profiler.setSamplingInterval", { interval: 100 });
            await cdp.send("Profiler.start");
            await page.goto(origin + "/");
            await page.locator(MAIN).waitFor({ state: "visible", timeout: 20000 });
            await page.waitForTimeout(500);
            const { profile } = await cdp.send("Profiler.stop");
            const renderer = await page.evaluate(() => { const c = document.createElement("canvas"); const gl = c.getContext("webgl2"); const e = gl?.getExtension("WEBGL_debug_renderer_info"); return e ? String(gl.getParameter(e.UNMASKED_RENDERER_WEBGL)) : "none"; });
            if (!GPU_RE.test(renderer)) { console.log(`[o5b-profile ${label} s${s}] INSTRUMENT FAULT renderer=${renderer}`); continue; }
            const lt = await page.evaluate(() => window.__lt);
            const nodes = new Map(profile.nodes.map((n) => [n.id, n]));
            const parent = new Map();
            for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
            const IDLE = new Set(["(idle)", "(program)", "(root)"]);
            // samples [id, tEnd(µs), dt]; the boot task = the longest run of busy samples with no idle gap > 1 ms
            let t = profile.startTime; const smp = profile.samples.map((id, i) => { t += profile.timeDeltas[i]; return [id, t, profile.timeDeltas[i]]; });
            let best = [0, -1, 0], cur = null, idleRun = 0;
            for (let i = 0; i < smp.length; i++) {
                const busy = !IDLE.has(nodes.get(smp[i][0]).callFrame.functionName);
                if (busy) { if (!cur) cur = [i, i, 0]; cur[1] = i; cur[2] += smp[i][2]; idleRun = 0; }
                else if (cur) { idleRun += smp[i][2]; if (idleRun > 1000) { if (cur[2] > best[2]) best = cur; cur = null; idleRun = 0; } }
            }
            if (cur && cur[2] > best[2]) best = cur;
            const self = new Map(), incl = new Map(), phase = new Map(), fnIncl = new Map(), evalSelf = new Map(); let total = 0;
            for (let i = best[0]; i <= best[1]; i++) {
                const [id, , dt] = smp[i]; const n = nodes.get(id); const ms = dt / 1000;
                if (IDLE.has(n.callFrame.functionName)) continue;
                total += ms;
                const keyOf = (cf) => cf.url ? lookup(cf.url, cf.lineNumber, cf.columnNumber) : `(${cf.functionName || "native"})`;
                const k = pkg(keyOf(n.callFrame)); self.set(k, (self.get(k) ?? 0) + ms);
                const seen = new Set(); let ph = "other"; let p = id;
                while (p !== undefined) {
                    const cf = nodes.get(p).callFrame; const kk = pkg(keyOf(cf));
                    if (cf.functionName === "mount" && kk.includes("runtime-core")) ph = "mount";
                    if (!seen.has(kk) && (kk.startsWith("demo/") || kk.includes("glass-ui"))) { seen.add(kk); incl.set(kk, (incl.get(kk) ?? 0) + ms); }
                    const fk = `${kk.split("/").pop()}:${cf.functionName || "(anon)"}`;
                    if (!seen.has(fk) && (kk.startsWith("demo/") || kk.includes("glass-ui"))) { seen.add(fk); fnIncl.set(fk, (fnIncl.get(fk) ?? 0) + ms); }
                    p = parent.get(p);
                }
                if (ph === "other" && n.callFrame.url) ph = "eval/other-js";
                phase.set(ph, (phase.get(ph) ?? 0) + ms);
                if (ph !== "mount") evalSelf.set(k, (evalSelf.get(k) ?? 0) + ms);
            }
            const fmt = (m, k) => [...m].sort((a, b) => b[1] - a[1]).slice(0, k).map(([x, v]) => `${v.toFixed(1)}ms ${x}`);
            console.log(`[o5b-profile ${label} s${s}] renderer=${renderer.replace(/\(Apple, |, Unspecified Version\)/g, "")} longtasks=${JSON.stringify(lt)} bootTaskSampled=${total.toFixed(1)}ms span=${((smp[best[1]][1] - smp[best[0]][1]) / 1000).toFixed(1)}ms`);
            console.log("  PHASE " + fmt(phase, 5).join(" · "));
            console.log("  SELF outside mount (module evaluation)"); for (const l of fmt(evalSelf, 12)) console.log("    " + l);
            console.log("  SELF"); for (const l of fmt(self, 20)) console.log("    " + l);
            console.log("  INCL (demo/ + glass-ui)"); for (const l of fmt(incl, 25)) console.log("    " + l);
            console.log("  INCL-FN (file:function, demo/ + glass-ui)"); for (const l of fmt(fnIncl, 40)) console.log("    " + l);
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
