// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.cube2 · R-r-2 CUBE-AUTOPLAY-FIRST-FRAME-THROW: served cold-load reproduction
// usage: node repro.mjs <baseUrl> <N> [label] [mode=direct|home|from:<route>] [cpuThrottle=1]
// mode=home loads #/ then navigates to #/cube (the oracle's route; home and cube share one scene mount);
// cpuThrottle>1 applies CDP Emulation.setCPUThrottlingRate to emulate a loaded host on a quiet one.   (N cold loads of #/cube, each in a fresh context; counts
// BrowserScalarResolutionError page errors + console errors naming --rotationX; samples the spin element's
// transform for ~3 s to read whether the Rotations channel moved). Real Chrome, new headless (§0ei).
import { createRequire } from "node:module";
import { loadavg } from "node:os";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const [base, nArg, label = "run", mode = "direct", thr = "1"] = process.argv.slice(2);
const N = Number(nArg ?? 10);
const b = await chromium.launch({ channel: "chrome", headless: true });
const runs = [];
for (let i = 0; i < N; i++) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message ?? e).slice(0, 240)));
  p.on("console", (m) => { if (m.type() === "error" && /rotationX|BrowserScalar/.test(m.text())) errs.push("console: " + m.text().slice(0, 240)); });
  if (Number(thr) > 1) { const cdp = await ctx.newCDPSession(p); await cdp.send("Emulation.setCPUThrottlingRate", { rate: Number(thr) }); }
  const t0 = Date.now();
  if (mode !== "direct") {
    const from = mode === "home" ? "" : mode.replace(/^from:/, "");
    await p.goto(base + "/#/" + from);
    await p.waitForSelector(from === "" ? ".cube-side" : "#app *", { timeout: 60000 });
    await p.waitForTimeout(800);
    await p.waitForTimeout(300);
    await p.evaluate(() => { location.hash = "#/cube"; });
  } else {
    await p.goto(base + "/#/cube");
  }
  await p.waitForSelector(".cube-side", { timeout: 60000 });
  const seen = new Set();
  for (let k = 0; k < 15; k++) {
    seen.add(await p.evaluate(() => document.querySelector(".cube")?.style.transform ?? ""));
    await p.waitForTimeout(200);
  }
  const throws = errs.filter((e) => /BrowserScalarResolutionError|rotationX/.test(e)).length;
  runs.push({ i, throws, spinDistinct: seen.size, ms: Date.now() - t0, errs: errs.slice(0, 3) });
  await ctx.close();
}
await b.close();
const total = runs.filter((r) => r.throws > 0).length;
console.log(JSON.stringify({ label, base, mode, thr, N, runsWithThrow: total, load1: loadavg()[0].toFixed(2), runs }, null, 1));
