// X.KF.W13X.mobile · UIA-KF-008 / A2-KE-L3-13 served falsifier: on #/easing and
// #/spring at 1440x900 (+390x844), select every surface from the dock and count
// the facet bodies that render in the pane. RED when a facet body shows on a
// surface other than its own.  usage: DIST=<dist> TAG=<before|after> THEME=<light|dark> node facet.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./frames/", import.meta.url).pathname;
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const b = await chromium.launch();
const theme = process.env.THEME || "light";
const vps = [[1440, 900], [390, 844]];
const scenes = { easing: "easing", spring: "spring" };
let red = 0;
for (const [w, h] of vps) for (const [route, facet] of Object.entries(scenes)) {
  const p = await b.newPage({ viewport: { width: w, height: h }, colorScheme: theme });
  await p.goto(`${srv.url}/#/${route}`, { waitUntil: "load" });
  await p.waitForTimeout(2000);
  for (const surface of ["controls", "keyframes", "timeline", facet]) {
    const btn = p.locator(`[data-surface="${surface}"]`).first();
    if (!(await btn.count())) { console.log(`${w} ${route} ${surface}: no dock item`); continue; }
    // Select the surface and WAIT for the dock to report it pressed (a click
    // on a collapsed dock can land before it expands); unselected = no reading.
    let ok = false;
    for (let k = 0; k < 4 && !ok; k++) {
      if ((await btn.getAttribute("aria-pressed")) !== "true") await btn.click({ force: true }).catch(() => {});
      try { await p.waitForFunction((s) => document.querySelector(`[data-surface="${s}"]`)?.getAttribute("aria-pressed") === "true", surface, { timeout: 2000 }); ok = true; } catch {}
    }
    if (!ok) { red++; console.log(`UNSEL ${w}x${h} ${theme} #/${route} surface=${surface} (dock never reported it pressed)`); continue; }
    await p.waitForTimeout(900);
    const n = await p.evaluate(() => {
      const vis = (el) => { const r = el.getBoundingClientRect(); const c = getComputedStyle(el); return r.width > 4 && r.height > 4 && c.visibility !== "hidden" && c.display !== "none"; };
      const pane = [...document.querySelectorAll(".controls-surface")].filter(vis);
      let easing = 0, spring = 0;
      for (const s of pane) { easing += /Left and Right change x/.test(s.innerText) ? 1 : 0; spring += /peak overshoot/i.test(s.innerText) ? 1 : 0; }
      return { easing, spring };
    });
    const onOwn = surface === facet;
    const count = n[facet];
    const bad = onOwn ? count < 1 : count > 0;
    if (bad) red++;
    console.log(`${bad ? "RED  " : "GREEN"} ${w}x${h} ${theme} #/${route} surface=${surface} facetBodies=${count}`);
    if (w === 1440 && (surface === "keyframes" || surface === "timeline"))
      await p.screenshot({ path: `${OUT}uia008-${process.env.TAG || "x"}-${route}-${surface}-${w}-${theme}.png` });
  }
  await p.close();
}
console.log(`facet-gate ${red ? "RED" : "GREEN"} (${red} cells)`);
await b.close(); process.exit(red ? 1 : 0);
