// X.KF.W13X.mobile · home start screen served falsifier.
//  L2-5  a tap at the pause toggle's centre hits the toggle and flips aria-pressed;
//  L3-10 the toggle sits inline on the deck line (its centre inside the deck line's block span);
//  L2-4  (short viewports, height <= 500) no hero rect intersects a dock rect, and every hero rect is inside the viewport.
// usage: DIST=<dist> TAG=<before|after> THEME=<light|dark> node home.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./frames/", import.meta.url).pathname;
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const b = await chromium.launch();
const theme = process.env.THEME || "light";
const VPS = [[360, 780], [390, 844], [430, 932], [844, 390], [932, 430], [768, 1024], [1024, 768], [1440, 900]];
let red = 0;
for (const [w, h] of VPS) {
  const touch = w < 1024;
  const p = await b.newPage({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: touch, isMobile: touch });
  await p.goto(`${srv.url}/#/`, { waitUntil: "load" });
  await p.waitForTimeout(2500);
  const g = await p.evaluate(() => {
    const R = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom }; };
    const vis = (el) => { const c = getComputedStyle(el); const r = el.getBoundingClientRect(); return c.visibility !== "hidden" && c.display !== "none" && r.width > 4 && r.height > 4; };
    const btn = document.querySelector(".hero-motion-toggle");
    const deck = document.querySelector(".hero-deck");
    const hero = [...document.querySelectorAll(".hero-band h1, .hero-deck, .hero-hint, .hero-motion-toggle")].filter(vis).map((e) => ({ k: e.className.split(" ")[0] || e.tagName, ...R(e) }));
    const docks = [...document.querySelectorAll(".glass-dock")].filter(vis).map(R);
    const br = R(btn);
    const cx = (br.l + br.r) / 2, cy = (br.t + br.b) / 2;
    const hit = document.elementFromPoint(cx, cy);
    return { br, cx, cy, hitIsBtn: !!(hit && btn.contains(hit)), deck: R(deck), hero, docks, pressed: btn.getAttribute("aria-pressed"), pe: getComputedStyle(btn).pointerEvents, vw: innerWidth, vh: innerHeight };
  });
  // L2-5: tap
  if (touch) await p.touchscreen.tap(g.cx, g.cy); else await p.mouse.click(g.cx, g.cy);
  await p.waitForTimeout(300);
  const after = await p.evaluate(() => document.querySelector(".hero-motion-toggle").getAttribute("aria-pressed"));
  const l25 = g.hitIsBtn && after !== g.pressed;
  // L3-10: inline on the deck line
  const l310 = g.cy >= g.deck.t && g.cy <= g.deck.b;
  // L2-4
  let l24 = true, why = [];
  if (h <= 500) {
    for (const r of g.hero) {
      if (r.l < -1 || r.t < -1 || r.r > g.vw + 1 || r.b > g.vh + 1) { l24 = false; why.push(`${r.k} outside viewport`); }
      for (const d of g.docks) {
        const ix = Math.min(r.r, d.r) - Math.max(r.l, d.l), iy = Math.min(r.b, d.b) - Math.max(r.t, d.t);
        if (ix > 1 && iy > 1) { l24 = false; why.push(`${r.k}[${r.t | 0},${r.b | 0}] x dock[${d.t | 0},${d.b | 0}]`); }
      }
    }
  }
  for (const [id, ok, note] of [["L2-5", l25, `hit=${g.hitIsBtn} pe=${g.pe} pressed ${g.pressed}->${after}`], ["L3-10", l310, `toggle cy ${g.cy | 0} deck [${g.deck.t | 0},${g.deck.b | 0}]`], ...(h <= 500 ? [["L2-4", l24, why.join("; ") || "clear"]] : [])]) {
    if (!ok) red++;
    console.log(`${ok ? "GREEN" : "RED  "} ${id} ${w}x${h} ${theme} ${note}`);
  }
  await p.screenshot({ path: `${OUT}home-${process.env.TAG || "x"}-${w}x${h}-${theme}.png` });
  await p.close();
}
console.log(`home ${red ? "RED" : "GREEN"} (${red} cells)`);
await b.close(); process.exit(red ? 1 : 0);
