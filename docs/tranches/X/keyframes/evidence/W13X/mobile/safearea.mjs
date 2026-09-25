// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.mobile · A2-KE-L2-15 served falsifier: safe area under CDP
// Emulation.setSafeAreaInsetsOverride (technique: .x/safearea.mjs, audit-2/fourier-L2/probe-safearea.mjs).
// Per config x route: (1) the viewport opts in (`viewport-fit=cover` — without it iOS resolves every env() to 0 and the
// consumer's safe-area arithmetic is dead); (2) no CONSUMER interactive control paints inside an inset band. The glass
// sheet's own chrome (grip, close) is reported apart (O-74 E-4, the glass dock/sheet env() ask) and SIM=1 (default)
// injects the SHEET-POSITION glass half so the in-flow sheet's off-screen body is not read as consumer in-band.
// usage: DIST=<dist> TAG=<tag> THEME=light|dark SIM=1 node safearea.mjs
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./", import.meta.url).pathname;
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const ROUTES = (process.env.ROUTES || "home,cube,amiga,square,easing,spring,sequence").split(",");
const THEME = process.env.THEME || "light", TAG = process.env.TAG || "x", SIM = process.env.SIM !== "0";
const CONFIGS = [["p390", [390, 844], { top: 47, bottom: 34, left: 0, right: 0 }], ["l844", [844, 390], { top: 0, bottom: 21, left: 47, right: 47 }], ["l932", [932, 430], { top: 0, bottom: 21, left: 59, right: 59 }]];
const b = await chromium.launch();
const rows = []; let red = 0;
for (const [name, vp, ins] of CONFIGS) for (const route of ROUTES) {
  const ctx = await b.newContext({ viewport: { width: vp[0], height: vp[1] }, hasTouch: true, isMobile: true, colorScheme: THEME, reducedMotion: "reduce" });
  if (SIM) await ctx.addInitScript(() => { const s = document.createElement("style"); s.textContent = "[data-slot=sheet-content]{position:fixed!important}[data-slot=sheet-content][data-side=bottom]{inset-inline:0!important}"; document.addEventListener("DOMContentLoaded", () => document.head.append(s)); });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page); await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: ins });
  await page.goto(`${srv.url}/#/${route === "home" ? "" : route}`, { waitUntil: "load" }); await page.waitForTimeout(2500);
  const r = await page.evaluate((ins) => {
    const vw = innerWidth, vh = innerHeight;
    const all = [...document.querySelectorAll("button,a[href],input,[role=combobox],[role=slider],[role=tab],[role=switch]")].filter((e) => !e.closest("[inert]"))
      .map((e) => ({ e, q: e.getBoundingClientRect() })).filter(({ q }) => q.width > 0 && q.height > 0 && q.bottom > 0 && q.top < vh && q.right > 0 && q.left < vw)
      // a control the page itself occludes or clips (under the sheet, scrolled out of its scroller) takes no tap
      // wherever it lies, so it is no in-band hazard: keep only controls that win the hit test at their centre
      .filter(({ e, q }) => { const x = Math.min(vw - 1, Math.max(0, q.left + q.width / 2)), y = Math.min(vh - 1, Math.max(0, q.top + q.height / 2)); const h = document.elementFromPoint(x, y); return !!h && (h === e || e.contains(h)); })
      .filter(({ q }) => (ins.top && q.top < ins.top) || (ins.bottom && q.bottom > vh - ins.bottom) || (ins.left && q.left < ins.left) || (ins.right && q.right > vw - ins.right));
    const glass = (e) => !!e.closest("[data-slot=sheet-detent-handle],[data-slot=dialog-close]");
    const fmt = ({ e, q }) => `${(e.getAttribute("aria-label") || e.textContent || e.tagName).trim().replace(/\s+/g, " ").slice(0, 20)}[${Math.round(q.left)},${Math.round(q.top)},${Math.round(q.right)},${Math.round(q.bottom)}]`;
    const td = document.querySelector("[data-dock-tether=top] .glass-dock")?.getBoundingClientRect();
    return { meta: document.querySelector("meta[name=viewport]")?.content ?? "", consumer: all.filter((x) => !glass(x.e)).map(fmt), glass: all.filter((x) => glass(x.e)).map(fmt), topDockT: td ? Math.round(td.top) : null, sw: document.scrollingElement.scrollWidth, vw };
  }, ins);
  const cover = /viewport-fit\s*=\s*cover/.test(r.meta);
  const bad = !cover || r.consumer.length > 0 || r.sw > r.vw;
  red += bad ? 1 : 0;
  rows.push({ config: name, route, ...r, cover });
  console.log(`${bad ? "RED  " : "GREEN"} ${name} ${THEME} #/${route.padEnd(8)} cover=${cover} topDock.t=${r.topDockT} consumer-in-band ${r.consumer.length} ${r.consumer.slice(0, 3).join(" ")} | glass-in-band ${r.glass.length} (O-74 E-4)`);
  if (["cube", "easing", "home"].includes(route)) await page.screenshot({ path: `${OUT}frames/sa-${TAG}-${name}-${route}-${THEME}.png` });
  await ctx.close();
}
fs.writeFileSync(`${OUT}safearea-${TAG}-${THEME}.json`, JSON.stringify(rows, null, 1));
console.log(`safearea-probe ${TAG} ${THEME}${SIM ? " SIM" : ""}: ${red ? "RED" : "GREEN"} (${red} cells of ${rows.length})`);
await b.close(); process.exit(0);
