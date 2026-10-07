// X-DS fourier pass 3 cure probe: the wide-math edge cue under prefers-reduced-motion (glass's PRM duration reset). Headless real Chrome (§0ei).
import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: process.env.PRM === "0" ? "no-preference" : "reduce" });
await p.goto((process.argv[2] ?? "http://localhost:3112") + "/paper", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
let r = null;
for (let i = 0; i < 400 && !r; i++) {
  r = await p.evaluate(() => { const n = [...document.querySelectorAll(".math-block__number")].find((x) => x.textContent.trim() === "(1.51)"); const port = document.querySelector(".paper-scroll"); if (!n) { port.scrollTop += 900; return null; }
    n.closest(".math-block").querySelector(".katex-display").setAttribute("data-probe", ""); return true; });
  await p.waitForTimeout(30);
}
const out = {};
for (const [k, f] of [["rest", 0], ["mid", 0.5], ["end", 1]]) {
  await p.evaluate((f) => { const d = document.querySelector("[data-probe]"); d.scrollLeft = f * (d.scrollWidth - d.clientWidth); }, f);
  await p.waitForTimeout(300);
  out[k] = await p.evaluate(() => { const cs = getComputedStyle(document.querySelector("[data-probe]")); return [cs.getPropertyValue("--math-edge-start"), cs.getPropertyValue("--math-edge-end"), cs.animationDuration]; });
}
console.log(JSON.stringify(out));
await b.close();
