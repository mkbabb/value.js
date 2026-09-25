// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.easing · the served easing probe
// rows: KFA-9/10/35/99/100/208 · UIA-KF-033/034/091/093/299/303 · A2-KE-L3-5
// usage: node easing.mjs <baseUrl> <tag>   (baseUrl e.g. http://localhost:5291)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.argv[2]; const TAG = process.argv[3] || "before";
const OUT = new URL("./frames/", import.meta.url).pathname;
const b = await chromium.launch();
const R = (o) => Math.round(o * 10) / 10;
// ball-on-curve: centre of each tile ball vs the nearest sampled point of its drawn path (screen px)
const onCurve = () => [...document.querySelectorAll(".specimen-tile")].map((t) => {
  const path = t.querySelector(".tile-sparkline path"); const ball = t.querySelector(".tile-ball");
  const m = path.getScreenCTM(); const L = path.getTotalLength(); let best = 1e9;
  const br = ball.getBoundingClientRect(); const cx = br.x + br.width / 2, cy = br.y + br.height / 2;
  for (let i = 0; i <= 400; i++) { const q = path.getPointAtLength((L * i) / 400); const x = m.a * q.x + m.c * q.y + m.e, y = m.b * q.x + m.d * q.y + m.f; best = Math.min(best, Math.hypot(x - cx, y - cy)); }
  const tr = t.getBoundingClientRect();
  const out = Math.max(0, tr.top - br.top, br.bottom - tr.bottom, tr.left - br.left, br.right - tr.right);
  return { name: t.querySelector(".tile-name").textContent.trim(), d: Math.round(best * 10) / 10, ballOutsideTile: Math.round(out * 10) / 10, cv: getComputedStyle(t).contentVisibility };
});
const linearX = () => { const c = document.querySelector('.tile-carriage[data-curve="linear"]'); const r = c.querySelector(".tile-ball").getBoundingClientRect(); return r.x + r.width / 2; };
const out = {};
for (const [w, h, theme] of [[1440, 900, "light"], [1440, 900, "dark"], [390, 844, "light"], [390, 844, "dark"]]) {
  const mob = w < 1024; const k = `${w}-${theme}`; const r = (out[k] = {});
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, isMobile: mob, hasTouch: mob });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/#/easing`, { waitUntil: "load" }); await p.waitForTimeout(3500);
  // grid (KFA-9 / KFA-208 / UIA-KF-033)
  r.grid = await p.evaluate(() => { const g = document.querySelector(".specimen-grid"); const d = document.querySelector(".specimen-drawer"); const cs = getComputedStyle(g); const tw = [...document.querySelectorAll(".specimen-tile")].map((t) => t.getBoundingClientRect().width);
    return { display: cs.display, cols: cs.gridTemplateColumns.split(" ").length, drawerOverflowX: d.scrollWidth - d.clientWidth, tiles: tw.length, tileWmin: Math.round(Math.min(...tw)), tileWmax: Math.round(Math.max(...tw)) }; });
  // plate gutter (A2-KE-L3-5)
  r.plate = await p.evaluate(() => { const e = document.querySelector(".easing-target").getBoundingClientRect(); return { left: Math.round(e.left), right: Math.round(innerWidth - e.right), top: Math.round(e.top), w: Math.round(e.width) }; });
  await p.screenshot({ path: `${OUT}${TAG}-${k}-rest.png` });
  // UIA-KF-303: inert attributes on the duration field
  r.inertAttrs = await p.evaluate(() => [...document.querySelectorAll(".labeled-field")].flatMap((e) => ["tooltip", "label-class"].filter((a) => e.hasAttribute(a))));
  // play → mid-motion ball-on-curve + overshoot (KFA-10 / UIA-KF-034 / KFA-99)
  const playBtn = p.locator("button[aria-label='Play animation'], button[aria-label='Pause animation']").first();
  await playBtn.click(); await p.waitForTimeout(650);
  await playBtn.click(); await p.waitForTimeout(250);
  r.curvePaused = await p.evaluate(onCurve);
  // KFA-35: resume continuity (pause→play, ball jump over 60 ms)
  r.resume = [];
  for (let i = 0; i < 2; i++) { const x0 = await p.evaluate(linearX); await playBtn.click(); await p.waitForTimeout(60); const x1 = await p.evaluate(linearX); r.resume.push(R(x1 - x0)); await p.waitForTimeout(400 + i * 300); await playBtn.click(); await p.waitForTimeout(200); }
  // free-run: 12 samples across a cycle — max ball-to-curve distance, max ball outside its tile, and the 60 ms step
  await playBtn.click(); let dMax = 0, outMax = 0, outName = ""; r.step60 = [];
  for (let i = 0; i < 12; i++) { const s = await p.evaluate(onCurve); for (const t of s) { dMax = Math.max(dMax, t.d); if (t.ballOutsideTile > outMax) { outMax = t.ballOutsideTile; outName = t.name; } } await p.waitForTimeout(110); }
  for (let i = 0; i < 2; i++) { const a = await p.evaluate(linearX); await p.waitForTimeout(60); r.step60.push(R((await p.evaluate(linearX)) - a)); }
  r.run = { ballToCurveMax: dMax, ballOutsideTileMax: outMax, outName, tileContentVisibility: r.curvePaused[0]?.cv };
  // KFA-100: Reverse reaches the race (1440 only — the ribbon lives in the open pane)
  const rev = p.getByRole("button", { name: "Reverse", exact: true }).first();
  if (!mob && (await rev.count())) {
    const a = await p.evaluate(linearX); await p.waitForTimeout(120); const b1 = await p.evaluate(linearX);
    await rev.click(); await p.waitForTimeout(40); const c = await p.evaluate(linearX); await p.waitForTimeout(120); const d = await p.evaluate(linearX);
    r.reverse = { vBefore: R(b1 - a), jumpAtFlip: R(c - b1), vAfter: R(d - c), flipped: Math.sign(b1 - a) !== 0 && Math.sign(d - c) === -Math.sign(b1 - a) };
    await rev.click(); await p.waitForTimeout(80);
  }
  await playBtn.click(); await p.waitForTimeout(250);
  // UIA-KF-299: keyboard focus into the tile group must not move the layout
  const box = () => p.evaluate(() => { const n = [...document.querySelectorAll(".tile-name")].slice(0, 4).map((e) => Math.round(e.getBoundingClientRect().top)); const t = document.querySelector(".specimen-tile").getBoundingClientRect(); return { names: n, tileH: Math.round(t.height), plateBottom: Math.round(document.querySelector(".easing-target").getBoundingClientRect().bottom) }; });
  const f0 = await box(); await p.locator(".specimen-tile").nth(1).focus(); await p.keyboard.press("ArrowRight"); await p.waitForTimeout(350); const f1 = await box();
  r.focusShift = { before: f0, after: f1, moved: JSON.stringify(f0) !== JSON.stringify(f1) };
  // UIA-KF-091 / UIA-KF-093: the engine-native (catalogue-gap) selection
  await p.locator(".specimen-tile", { hasText: "ease-in-bounce" }).first().click(); await p.waitForTimeout(700);
  r.gap = await p.evaluate(() => {
    const vis = (e) => { const q = e.getBoundingClientRect(); return q.width > 0 && q.height > 0 && getComputedStyle(e).visibility !== "hidden"; };
    const pane = document.querySelector("[aria-label='Easing curve editor']")?.closest(".panel-content") || document.querySelector(".panel-content");
    const txt = (pane?.innerText || "").replace(/\s+/g, " ");
    return { header: document.querySelector(".specimen-name")?.textContent.trim(), headerLiteral: document.querySelector(".literal-text")?.textContent.trim(),
      copyButtons: [...document.querySelectorAll("button")].filter((x) => /^Copy/.test(x.getAttribute("aria-label") || "") && vis(x)).map((x) => x.getAttribute("aria-label")),
      paneCubicReadout: (txt.match(/cubic-bezier\([^)]*\)/) || [null])[0], paneHasPickACurve: /Pick a curve/.test(txt), paneSaysBounce: /ease-in-bounce/.test(txt),
      paneCurvePaths: pane ? [...pane.querySelectorAll("svg path")].filter(vis).length : 0 };
  });
  await p.screenshot({ path: `${OUT}${TAG}-${k}-gap.png` });
  await ctx.close();
}
console.log(JSON.stringify(out, null, 1));
await b.close();
