// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.mobile · A2-KE-L2-11 served falsifier: the landscape chrome budget.
// Per scene route x viewport x theme (reduced motion, touch), read the stage band the chrome leaves: the gap between
// the top dock's bottom edge and the transport's top edge, and the two stage insets layout.css derives.
// RED when a SHORT viewport (height <= 500) leaves the stage < 60% of the height; a tall viewport's band is
// reported unchanged (the portrait regression floor: its insets must not move).
// usage: DIST=<dist> TAG=<tag> THEMES=light,dark VPS=844x390,932x430,390x844,360x780 node band.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./", import.meta.url).pathname;
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const ROUTES = (process.env.ROUTES || "home,cube,amiga,square,easing,spring,sequence").split(",");
const VPS = (process.env.VPS || "844x390,932x430,390x844,360x780").split(",");
const THEMES = (process.env.THEMES || "light,dark").split(",");
const TAG = process.env.TAG || "x";
const b = await chromium.launch();
const rows = [];
let red = 0;
for (const theme of THEMES) for (const vpS of VPS) {
  const [w, h] = vpS.split("x").map(Number);
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, colorScheme: theme, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  for (const route of ROUTES) {
    await p.goto(`${srv.url}/#/${route === "home" ? "" : route}`, { waitUntil: "load" }); await p.waitForTimeout(2200);
    const m = await p.evaluate(() => {
      const px = (v) => { const d = document.createElement("div"); d.style.cssText = `position:fixed;height:${v}`; document.body.append(d); const r = d.getBoundingClientRect().height; d.remove(); return Math.round(r); };
      const dock = (t) => document.querySelector(`[data-dock-tether=${t}] .glass-dock`)?.getBoundingClientRect();
      const top = dock("top"), bot = dock("bottom");
      return { ih: innerHeight, topIn: px("var(--stage-top-inset)"), botIn: px("var(--stage-bottom-inset)"),
        topB: top ? Math.round(top.bottom) : null, topT: top ? Math.round(top.top) : null, botT: bot ? Math.round(bot.top) : null, botB: bot ? Math.round(bot.bottom) : null,
        docSW: document.scrollingElement.scrollWidth, iw: innerWidth };
    });
    const band = (m.botT ?? m.ih) - (m.topB ?? 0);
    const frac = band / m.ih;
    const short = h <= 500;
    const bad = (short && frac < 0.6) || m.topT < 0 || (m.botB ?? 0) > m.ih || m.docSW > m.iw;
    red += bad ? 1 : 0;
    rows.push({ route, vp: vpS, theme, ...m, band, frac: +frac.toFixed(3) });
    console.log(`${bad ? "RED  " : short ? "GREEN" : "floor"} ${vpS.padEnd(8)} ${theme.padEnd(5)} #/${route.padEnd(8)} topDock [${m.topT},${m.topB}] transport [${m.botT},${m.botB}] band ${band}px (${(frac * 100).toFixed(0)}%) insets ${m.topIn}/${m.botIn}`);
    if (vpS === "844x390" && ["home", "cube", "spring", "easing"].includes(route)) await p.screenshot({ path: `${OUT}frames/band-${TAG}-${route}-${vpS}-${theme}.png` });
  }
  await ctx.close();
}
fs.writeFileSync(`${OUT}band-${TAG}.json`, JSON.stringify(rows, null, 1));
console.log(`band-probe ${TAG}: ${red ? "RED" : "GREEN"} (${red} cells of ${rows.length})`);
await b.close(); process.exit(0);
