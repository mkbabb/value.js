// X-DS fourier pass 3 cure probe: wide display math on /paper (DS-F3-C2). Headless real Chrome (§0ei).
// Walks the paper's scroll port top to bottom and lists every display-math box whose ink overflows it.
import { chromium } from "playwright";
const W = +(process.argv[2] ?? 1440);
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: W, height: 900 } });
await p.goto("http://localhost:3100/paper", { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
const port = await p.evaluate(() => {
  const els = [document.scrollingElement, ...document.querySelectorAll("*")].filter(e => e && e.scrollHeight > e.clientHeight + 200 && /auto|scroll/.test(getComputedStyle(e).overflowY) || e === document.scrollingElement);
  els.sort((a, z) => z.scrollHeight - a.scrollHeight);
  els[0].setAttribute("data-probe-port", "");
  return { tag: els[0].tagName, cls: String(els[0].className).slice(0, 80), sh: els[0].scrollHeight };
});
console.error("port", JSON.stringify(port));
const seen = new Map();
for (let i = 0; i < 2000; i++) {
  const done = await p.evaluate(() => { const se = document.querySelector("[data-probe-port]"); const before = se.scrollTop; se.scrollTop += 800; return se.scrollTop === before; });
  await p.waitForTimeout(40);
  const batch = await p.evaluate(() => [...document.querySelectorAll(".katex-display")].filter(d => d.scrollWidth > d.clientWidth + 1).map(d => {
    const row = d.closest("[class*=equation], [class*=eq]");
    return { sw: d.scrollWidth, cw: d.clientWidth, row: row ? String(row.className).slice(0, 60) : null, num: row?.textContent.match(/\(\d+\.\d+\)/)?.[0] ?? null };
  }));
  for (const x of batch) seen.set(x.num + ":" + x.sw, { ...x, ratio: +(x.sw / x.cw).toFixed(3) });
  if (done) break;
}
console.log(JSON.stringify([...seen.values()]));
await b.close();
