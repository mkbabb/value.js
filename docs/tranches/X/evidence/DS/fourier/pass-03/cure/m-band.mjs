// X-DS fourier pass 3 cure probe: the band between the dock and the phone ToC bar on /paper (DS-F3-C11). Headless real Chrome (§0ei).
import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await p.goto("http://localhost:3100/paper", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
await p.evaluate(() => { document.querySelector(".paper-scroll").scrollTop = 1400; });
await p.waitForTimeout(800);
const r = await p.evaluate(() => {
  const g = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom)]; };
  const se = document.querySelector(".floating-toc");
  return { dock: g("nav, [data-slot=dock], .glass-dock") , header: g("header"), root: g(".paper-root"), scroll: g(".paper-scroll"), tocHost: g(".floating-toc"), bar: g(".floating-toc-bar"), tocBg: getComputedStyle(se).backgroundColor };
});
console.log(JSON.stringify(r));
await p.screenshot({ path: process.argv[2] ?? "/dev/null", clip: { x: 0, y: 0, width: 390, height: 160 } });
await b.close();
