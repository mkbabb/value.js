import { chromium } from 'playwright';
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5173/#/easing', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const out = [];
for (let s = 0; s < 12; s++) {
  out.push(await p.evaluate(() => {
    const tiles = [...document.querySelectorAll('.specimen-tile')];
    return tiles.map(t => {
      const path = t.querySelector('.tile-sparkline path'), ball = t.querySelector('.tile-ball');
      if (!path || !ball) return null;
      const r = ball.getBoundingClientRect(); const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
      const m = path.getScreenCTM(), L = path.getTotalLength(); let best = 1e9;
      for (let i = 0; i <= 400; i++) { const q = path.getPointAtLength(L * i / 400); const x = m.a*q.x + m.c*q.y + m.e, y = m.b*q.x + m.d*q.y + m.f; best = Math.min(best, Math.hypot(x - cx, y - cy)); }
      return +best.toFixed(1);
    });
  }));
  await p.waitForTimeout(170);
}
const tiles = out[0].length; let fail = 0, total = 0, max = 0;
for (const row of out) for (const d of row) { if (d == null) continue; total++; if (d > 1.5) fail++; max = Math.max(max, d); }
console.log(JSON.stringify({ tiles, samples: total, over1_5px: fail, maxDistPx: max, firstRow: out[0] }));
await p.screenshot({ path: process.argv[2] });
await b.close();
