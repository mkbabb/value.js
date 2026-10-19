// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.cube2 · R-r-2 served deterministic falsifier (the race FORCED)
// usage: node served-race.mjs <devBaseUrl> <N> [label] [delayMs=4000]
// A served cold load of #/cube on a vite DEV server, with the cube's two scoped style modules
// (CubeTarget.css — the scene die; CubeMini.vue's <style> — the dock miniature) DEFERRED: the module
// still evaluates on time, but its `__vite__updateStyle` is postponed by delayMs, so the stylesheet
// reaches the target only after the autoplay has armed and the first group frame has run. That is the
// losing side of the R-r-2 race, forced on every run. Counts BrowserScalarResolutionError page errors
// and samples the spin element for ~3 s. Real Chrome, new headless (§0ei).
import { createRequire } from "node:module";
import { loadavg } from "node:os";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const [base, nArg, label = "run", delayArg = "4000"] = process.argv.slice(2);
const N = Number(nArg ?? 10), delay = Number(delayArg);
const startLoad = loadavg()[0].toFixed(2);
const b = await chromium.launch({ channel: "chrome", headless: true });
const runs = [];
for (let i = 0; i < N; i++) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  let deferred = 0;
  await ctx.route(/\/scenes\/cube\/(CubeTarget\.css|CubeMini\.vue)\?[^#]*type=style/, async (route) => {
    const resp = await route.fetch();
    const body = (await resp.text()).replace(
      "__vite__updateStyle(__vite__id, __vite__css)",
      `setTimeout(() => __vite__updateStyle(__vite__id, __vite__css), ${delay})`,
    );
    if (body.includes("setTimeout(() => __vite__updateStyle")) deferred++;
    await route.fulfill({ response: resp, body });
  });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message ?? e).slice(0, 240)));
  await p.goto(base + "/#/cube");
  await p.waitForSelector(".cube-side", { timeout: 60000 });
  const seen = new Set();
  for (let k = 0; k < 15; k++) {
    seen.add(await p.evaluate(() => document.querySelector(".cube")?.style.transform ?? ""));
    await p.waitForTimeout(200);
  }
  const sheetLate = await p.evaluate(() => getComputedStyle(document.querySelector(".cube")).getPropertyValue("--side-size") !== "");
  const throws = errs.filter((e) => /BrowserScalarResolutionError|rotationX/.test(e)).length;
  runs.push({ i, deferred, throws, spinDistinct: seen.size, sheetArrived: sheetLate, errs: errs.slice(0, 2) });
  await ctx.close();
}
await b.close();
const invalid = runs.filter((r) => r.deferred < 2).length; // the race is forced only when BOTH style modules were deferred
console.log(JSON.stringify({ label, base, N, delay, invalidRuns: invalid, runsWithThrow: runs.filter((r) => r.throws > 0).length, startLoad, endLoad: loadavg()[0].toFixed(2), runs }, null, 1));
