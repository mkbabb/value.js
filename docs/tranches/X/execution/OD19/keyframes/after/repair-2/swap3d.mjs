// repair-2 (C2-KF-01): swaps INTO the 3D/canvas scenes through the dock Scene select, built app, one browser,
// one context per variant. Records every rAF gap, LoAF (>50 ms) and the VT lifecycle.
// SWAP3D_GPU=1: the default headless shell with ANGLE-Metal (named GPU witness: it separates a SwiftShader software-raster
// frame from a real-compositor frame; no branded Chrome). usage: node swap3d.mjs <dist> <variants comma list: base,novt,named> [targets comma list]
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [dist, variantsArg = "base", targetsArg = "Cube,Spring,Amiga,Spring,Cube,Amiga,Easing"] = process.argv.slice(2);
const VARIANT_CSS = {
  // the 3D subject is its own snapshot group, so the scene-subject image no longer holds its raster
  wrap: ":root:active-view-transition .scene-host :has(> .graph){view-transition-name:scene-3d}",
  graph: ":root:active-view-transition .scene-host .graph{view-transition-name:scene-3d}",
  named: ":root:active-view-transition .scene-host .cube{view-transition-name:scene-3d}:root:active-view-transition .scene-host canvas{view-transition-name:scene-canvas}",
};
const out = [];
const server = await serveDist(dist);
try {
  await withBrowser(async (browser) => {
    for (const variant of variantsArg.split(",")) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
      try {
        await ctx.addInitScript(({ variant, css }) => {
          // every variant stamps the WebGL milestones (first context, program links, texture uploads, draws)
          const gl = (window.__gl = []); const stamp = (k) => gl.push([k, Math.round(performance.now() - (window.__t0 ?? 0))]);
          const gc = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, o, ...a) { if (/webgl/.test(t)) { stamp("ctx:" + t); if (variant.includes("noaa")) o = { ...o, antialias: false }; } return gc.call(this, t, o, ...a); };
          if (variant.includes("nomip") && globalThis.WebGL2RenderingContext) WebGL2RenderingContext.prototype.generateMipmap = function () { gl.push(["mipSkipped", Math.round(performance.now() - (window.__t0 ?? 0))]); };
          for (const P of [globalThis.WebGL2RenderingContext?.prototype].filter(Boolean)) for (const m of ["linkProgram", "texImage2D", "texSubImage2D", "drawElements", "drawArrays"]) { const o = P[m]; P[m] = function (...a) { const t0 = performance.now(); const r = o.apply(this, a); const d = performance.now() - t0; if (gl.length < 60) gl.push([m, Math.round(t0 - (window.__t0 ?? 0)), +d.toFixed(1)]); return r; }; }
          if (variant.startsWith("novt")) { delete Document.prototype.startViewTransition; return; }
          if (css) addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = css; document.head.append(s); });
          const orig = Document.prototype.startViewTransition; if (!orig) return;
          Document.prototype.startViewTransition = function (arg) {
            const s = (window.__vt = { call: performance.now() });
            const vt = orig.call(this, arg);
            vt.ready.then(() => (s.ready = performance.now()), () => (s.readyRejected = performance.now()));
            vt.finished.then(() => (s.finished = performance.now()), () => {});
            return vt;
          };
        }, { variant, css: VARIANT_CSS[variant] ?? null });
        const page = await ctx.newPage(); page.setDefaultTimeout(15000);
        if (!out.gpu) { out.gpu = await page.evaluate(() => { const g = document.createElement("canvas").getContext("webgl2"); const x = g?.getExtension("WEBGL_debug_renderer_info"); return { renderer: x ? g.getParameter(x.UNMASKED_RENDERER_WEBGL) : null, parallel: !!g?.getExtension("KHR_parallel_shader_compile") }; }); console.error("gpu", JSON.stringify(out.gpu)); }
        await page.goto(server.url + "/#/spring", { waitUntil: "load" }); await page.waitForTimeout(4000);
        for (const target of targetsArg.split(",")) {
          const d = page.locator(".glass-dock").first(); const b = await d.boundingBox();
          await page.mouse.move(b.x + b.width / 2, b.y + 28); await page.waitForTimeout(900);
          await page.locator('[aria-label="Scene"]:visible').first().click(); await page.waitForTimeout(600);
          await page.evaluate(() => {
            window.__vt = null; window.__gl.length = 0; window.__po?.disconnect(); window.__f = []; window.__loaf = []; const t0 = (window.__t0 = performance.now());
            const f = () => { const t = performance.now() - t0; window.__f.push(t); if (t < 1600) requestAnimationFrame(f); }; requestAnimationFrame(f);
            try { (window.__po = new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.duration > 50) window.__loaf.push({ at: Math.round(e.startTime - t0), d: Math.round(e.duration), blk: Math.round(e.blockingDuration), render: Math.round(e.renderStart ? e.startTime + e.duration - e.renderStart : 0), style: Math.round(e.styleAndLayoutStart ? e.startTime + e.duration - e.styleAndLayoutStart : 0), scripts: e.scripts.slice(0, 2).map((x) => (x.invoker || "").slice(0, 40) + ":" + Math.round(x.duration)) }); })).observe({ type: "long-animation-frame" }); } catch {}
          });
          await page.getByRole("option", { name: target }).click();
          await page.waitForTimeout(1800);
          const r = await page.evaluate(() => {
            const t0 = window.__t0, f = window.__f; const gaps = f.slice(1).map((t, i) => [Math.round(f[i]), Math.round(t - f[i])]);
            const vt = window.__vt ? Object.fromEntries(Object.entries(window.__vt).map(([k, v]) => [k, Math.round(v - t0)])) : null;
            return { hash: location.hash, worst: Math.max(...gaps.map((g) => g[1])), over50: gaps.filter((g) => g[1] > 50).length, over120: gaps.filter((g) => g[1] > 120).length, long: gaps.filter((g) => g[1] > 50), vt, loaf: window.__loaf, gl: window.__gl.slice() };
          });
          out.push({ variant, target, ...r }); console.error(variant, target, r.worst, r.over120, JSON.stringify(r.long));
          await page.mouse.move(1437, 450); await page.waitForTimeout(2200);
        }
      } finally { await ctx.close(); }
    }
  }, { label: "swap3d", launch: process.env.SWAP3D_GPU ? { args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] } : {} });
} finally { await server.close(); }
console.log(JSON.stringify({ gpu: out.gpu, runs: out }));
