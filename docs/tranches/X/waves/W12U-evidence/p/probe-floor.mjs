// SERVED MODEL: claude-opus-5-5
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--window-position=2600,200"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const rd = async (label) => {
  const f = await p.evaluate(() => new Promise((res) => { const t = []; let last = performance.now(); const s = last; const tick = (n) => { t.push(n - last); last = n; if (n - s < 2000) requestAnimationFrame(tick); else res(t.slice(1)); }; requestAnimationFrame(tick); }));
  f.sort((a, b) => a - b); const q = (x) => f[Math.min(f.length - 1, Math.floor(x * f.length))];
  console.log(label, "frames", f.length, "p50", q(0.5).toFixed(1), "p95", q(0.95).toFixed(1));
};
await p.setContent("<body style='background:#222'></body>"); await p.waitForTimeout(500); await rd("blank");
await p.goto((process.env.ORIGIN ?? "http://localhost:9873") + "/#/?space=lab"); await p.waitForTimeout(6000); await rd("app-idle");
await b.close();
