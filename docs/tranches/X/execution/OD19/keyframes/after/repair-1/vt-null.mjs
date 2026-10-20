// repair-1 control: a NULL View Transition (no DOM change) on each settled scene: the frame cost of the
// dissolve alone in this browser, with and without backdrop-filter. usage: node vt-null.mjs <dist>
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [dist] = process.argv.slice(2);
const out = [];
const server = await serveDist(dist);
try {
  await withBrowser(async (browser) => {
    for (const route of ["cube", "easing", "spring", "sequence"]) for (const nob of [false, true]) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
      try {
        const page = await ctx.newPage(); page.setDefaultTimeout(15000);
        await page.goto(server.url + "/#/" + route, { waitUntil: "load" });
        if (nob) await page.addStyleTag({ content: "*,*::before,*::after{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}" });
        await page.waitForTimeout(3500); await page.mouse.move(1437, 450); await page.waitForTimeout(800);
        const r = await page.evaluate(() => new Promise((res) => {
          const frames = (ms) => new Promise((ok) => { const f = []; const t0 = performance.now(); const s = () => { f.push(performance.now()); if (performance.now() - t0 < ms) requestAnimationFrame(s); else { const d = f.slice(1).map((t, i) => t - f[i]); ok({ n: d.length, worst: Math.round(Math.max(...d)), mean: Math.round(d.reduce((a, b) => a + b, 0) / d.length) }); } }; requestAnimationFrame(s); });
          frames(500).then((rest) => { const vt = document.startViewTransition(() => {}); const p = frames(450); vt.finished.then(() => p.then((during) => res({ rest, during }))); });
        }));
        out.push({ route, noBackdrop: nob, ...r }); console.error(route, nob, JSON.stringify(r));
      } finally { await ctx.close(); }
    }
  }, { label: "vt-null" });
} finally { await server.close(); }
console.log(JSON.stringify(out, null, 1));
