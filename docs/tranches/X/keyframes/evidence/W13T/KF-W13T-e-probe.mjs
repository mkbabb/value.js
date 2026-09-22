// SERVED MODEL: claude-opus-5-5[1m]
// X.KF.W13T.e — the bounded OA-7..OA-10 probe (value.js playwright 1.60.0, kf dev server :5173).
// Usage: node KF-W13T-e-probe.mjs <tag> [shotDir] [engine=chromium|webkit] [scheme=light|dark]
import { chromium, webkit } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const [tag = "before", shotDir = null, engine = "chromium", scheme = "light"] = process.argv.slice(2);
const B = "http://localhost:5173/";
const b = await (engine === "webkit" ? webkit : chromium).launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
const out = { tag, engine, scheme };
const shot = async (p, name, clip) => { if (shotDir) await p.screenshot({ path: `${shotDir}/KF-W13T-e-${tag}-${name}.png`, ...(clip ? { clip } : {}) }); };

// ── G-KFW13T-3 (OA-7): picker rows with a rendered <svg><path> glyph, at #/square's ChannelOptions
{
  const p = await ctx.newPage();
  await p.goto(B + "#/square", { waitUntil: "networkidle" }); await p.waitForTimeout(1000);
  const trig = p.locator('[role=combobox]').filter({ hasText: /ease|linear|step|cubic/ }).first();
  await trig.click(); await p.waitForTimeout(600);
  out.g3 = await p.evaluate(() => {
    const opts = [...document.querySelectorAll('[role=listbox] [role=option]')];
    const glyph = opts.filter((o) => { const path = o.querySelector('svg path'); if (!path) return false; const d = path.getAttribute('d') || ''; const r = path.closest('svg').getBoundingClientRect(); return /^M /.test(d) && r.width > 0 && r.height > 0; });
    const s = opts[0]?.querySelector('svg')?.getBoundingClientRect();
    const rowH = opts[0]?.getBoundingClientRect().height;
    return { rows: opts.length, glyphRows: glyph.length, glyphBox: s ? [Math.round(s.width), Math.round(s.height)] : null, rowH: rowH && Math.round(rowH) };
  });
  const lb = await p.locator('[role=listbox]').first().boundingBox();
  if (lb) await shot(p, "picker", { x: lb.x - 8, y: lb.y - 8, width: Math.min(lb.width + 16, 700), height: Math.min(lb.height + 16, 500) });
  await p.close();
}

// ── #/easing: G-4 (OA-8), G-5 (OA-9), G-6 (OA-10)
const openEasing = async () => {
  const p = await ctx.newPage(); const errs = [];
  p.on("pageerror", (e) => errs.push(e.message.slice(0, 120)));
  await p.goto(B + "#/easing", { waitUntil: "networkidle" }); await p.waitForTimeout(1200);
  return { p, errs };
};
{
  const { p, errs } = await openEasing();
  const th = p.locator('[role=slider][aria-label="Scrub animation timeline"]');
  const v = async () => Number(await th.getAttribute('aria-valuenow'));
  const rail = await p.locator('.scrub-rail .glass-slider').boundingBox();
  await shot(p, "ribbon", { x: rail.x - 24, y: rail.y - 24, width: rail.width + 48, height: 220 });
  const tb = await th.boundingBox();
  const g4 = { thumbBox: [tb.x, tb.width].map(Math.round), rail: [rail.x, rail.width].map(Math.round) };
  g4.thumbBg = await th.evaluate((e) => getComputedStyle(e).backgroundColor);
  g4.trackBg = await p.locator('.scrub-rail .slider-track').evaluate((e) => getComputedStyle(e).backgroundColor);
  let a = await v();
  await p.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await p.mouse.down();
  for (let i = 1; i <= 12; i++) { await p.mouse.move(tb.x + tb.width / 2 + i * 18, tb.y + tb.height / 2); await p.waitForTimeout(25); }
  await p.mouse.up(); await p.waitForTimeout(200);
  g4.drag = [a, await v()];
  a = await v(); await p.mouse.click(rail.x + rail.width * 0.3, rail.y + rail.height / 2); await p.waitForTimeout(200);
  g4.click = [a, await v()];
  a = await v(); await th.focus(); await p.keyboard.press("ArrowRight"); await p.waitForTimeout(200);
  g4.arrow = [a, await v()];
  await shot(p, "ribbon-after-scrub", { x: rail.x - 24, y: rail.y - 24, width: rail.width + 48, height: 220 });
  g4.pageerrors = [...errs];
  out.g4 = g4;
  await p.close();
}
{
  const { p, errs } = await openEasing();
  const th = p.locator('[role=slider][aria-label="Scrub animation timeline"]');
  const ballX = () => p.evaluate(() => [...document.querySelectorAll('.tile-ball')].slice(0, 6).map((e) => e.style.transform || "none"));
  const vizX = () => p.evaluate(() => { const b = document.querySelector('.scrub-rail')?.closest('.grid')?.querySelector('.visualizer-stage .progress-ball, .visualizer-stage [class*=ball]'); return b ? Math.round(b.getBoundingClientRect().x) : null; });
  const s0 = { t: Number(await th.getAttribute('aria-valuenow')), tiles: await ballX(), viz: await vizX() };
  await p.getByRole('button', { name: /^Play$/ }).first().click();
  await p.waitForTimeout(500);
  const s1 = { t: Number(await th.getAttribute('aria-valuenow')), tiles: await ballX(), viz: await vizX() };
  out.g5 = { before: s0, after500: s1, clockAdvanced: s1.t > s0.t, tilesMoved: JSON.stringify(s0.tiles) !== JSON.stringify(s1.tiles), vizMoved: s0.viz !== s1.viz, pageerrors: [...errs] };
  await shot(p, "playing-500ms");
  await p.close();
}
{
  const { p } = await openEasing();
  const tg = p.locator('button[aria-pressed]').filter({ hasText: /preview/i }).or(p.getByRole('button', { name: /preview/i }));
  const n = await tg.count();
  const vis = () => p.evaluate(() => { const s = document.querySelector('.scrub-rail')?.closest('.grid')?.querySelector('.visualizer-stage'); return !!s && s.getClientRects().length > 0; });
  const g6 = { toggles: n, visible0: await vis() };
  if (n) {
    const t = tg.first();
    g6.name = await t.getAttribute('aria-label') ?? (await t.textContent())?.trim();
    g6.pressed0 = await t.getAttribute('aria-pressed');
    await t.click(); await p.waitForTimeout(400);
    g6.pressed1 = await t.getAttribute('aria-pressed'); g6.visible1 = await vis();
    g6.a11yVisualizerNodes1 = await p.evaluate(() => document.querySelectorAll('.visualizer-stage').length);
    await shot(p, "preview-hidden");
    await p.reload({ waitUntil: "networkidle" }); await p.waitForTimeout(1200);
    const t2 = p.locator('button[aria-pressed]').filter({ hasText: /preview/i }).or(p.getByRole('button', { name: /preview/i })).first();
    g6.afterReload = { pressed: await t2.getAttribute('aria-pressed'), visible: await vis() };
    await t2.click(); await p.waitForTimeout(400);
    g6.restored = { pressed: await t2.getAttribute('aria-pressed'), visible: await vis() };
  }
  out.g6 = g6;
  await p.close();
}
await b.close();
console.log(JSON.stringify(out));
