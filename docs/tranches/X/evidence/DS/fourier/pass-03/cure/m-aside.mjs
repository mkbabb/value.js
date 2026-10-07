// X-DS fourier pass 3 cure probe: the /v aside plate vs its content (DS-F3-C8). Headless real Chrome (§0ei).
import { chromium } from "playwright";
const slug = process.argv[2] ?? "plush-evening-olive-squid";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const p = await b.newPage({ viewport: { width: 1440, height: +(process.argv[3] ?? 900) }, reducedMotion: "reduce" });
await p.goto(`http://localhost:3100/v/${slug}`, { waitUntil: "networkidle" });
await p.waitForTimeout(4000);
const r = await p.evaluate(() => {
  const a = document.querySelector('[data-slot="configurator"] > .configurator-aside');
  const st = document.querySelector('[data-slot="configurator"] > .configurator-stage');
  if (!a) return null;
  const cs = getComputedStyle(a);
  const kids = [...a.querySelectorAll(".configurator-layer, .viz-panel-left > *")];
  const lastBottom = Math.max(...kids.map(k => k.getBoundingClientRect().bottom));
  const ar = a.getBoundingClientRect();
  return { aside: { top: ar.top, bottom: ar.bottom, h: ar.height, overflowY: cs.overflowY, alignSelf: cs.alignSelf, sh: a.scrollHeight, ch: a.clientHeight }, stage: st?.getBoundingClientRect().toJSON(), contentBottom: lastBottom, emptyBelow: Math.round(ar.bottom - lastBottom) };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
