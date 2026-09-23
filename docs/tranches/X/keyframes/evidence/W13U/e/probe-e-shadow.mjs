// SERVED MODEL: claude-opus-5-5
// KF.W13U.e · OA-34 frame gate: the controls card cropped 24 px beyond its box, light + dark,
// plus a pixel read of the column just outside the card's left edge (shadow alpha continuity):
// for each row y in the card's lower half, compare the pixel 3 px left of the card to the
// backdrop 22 px left — a clipped shadow reads identical (delta 0) at the clip column.
// argv: base tag route
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const [base = 'http://localhost:5173/', tag = 'dev', route = 'cube'] = process.argv.slice(2);
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const out = {};
for (const scheme of ['light', 'dark']) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  await p.goto(base + '#/' + route, { waitUntil: 'networkidle' }); await p.waitForTimeout(1800);
  const cards = p.locator('.card.cartoon-surface:visible');
  const n = await cards.count(); out[scheme] = [];
  for (let k = 0; k < n; k++) {
    const card = cards.nth(k); const bb = await card.boundingBox();
    if (!bb || bb.y + bb.height > 900 || bb.width < 40) continue;
    const clip = { x: Math.max(0, bb.x - 24), y: Math.max(0, bb.y - 24), width: bb.width + 48, height: bb.height + 48 };
    const file = new URL(`./${tag}-${route}-${scheme}-card${k}.png`, import.meta.url).pathname;
    await p.screenshot({ path: file, clip });
    const buf = await p.screenshot({ clip });
    const png = await p.evaluate(async (b64) => { const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode(); const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext('2d'); x.drawImage(img, 0, 0); const d = x.getImageData(0, 0, img.width, img.height); return { w: img.width, h: img.height, data: Array.from(d.data) }; }, buf.toString('base64'));
    const dpr = png.w / clip.width; const px = (X, Y) => { const i = (Math.round(Y * dpr) * png.w + Math.round(X * dpr)) * 4; return png.data.slice(i, i + 3); };
    const d3 = (a, c) => Math.abs(a[0] - c[0]) + Math.abs(a[1] - c[1]) + Math.abs(a[2] - c[2]);
    const L = bb.x - clip.x, T = bb.y - clip.y, Bm = T + bb.height;
    // the shadow column just outside the card's LEFT edge vs the backdrop 22 px out, lower half
    let left = 0, nl = 0, zero = 0; for (let y = T + bb.height * 0.5; y < Bm - 20; y += 4) { const v = d3(px(L - 3, y), px(L - 22, y)); left += v; nl++; if (v === 0) zero++; }
    out[scheme].push({ card: k, box: [bb.x, bb.y, bb.width, bb.height].map(Math.round), leftShadowDelta: +(left / nl).toFixed(1), leftZeroRows: zero, rows: nl, file: file.split('/').pop() });
  }
  await p.close();
}
console.log(JSON.stringify(out)); await b.close();
