// X-DS kf pass 6 cure seat — the transport row's first word vs the pane's label column on every scene (KF-C6-01). Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
for (const route of ["cube", "amiga", "square", "easing", "spring", "sequence"]) {
  await p.goto(`http://localhost:5173/#/${route}`, { waitUntil: "load" });
  await p.waitForTimeout(3500);
  const o = await p.evaluate(() => {
    const vis = (e) => e.getBoundingClientRect().width > 0;
    const rev = [...document.querySelectorAll("button")].find((b) => b.textContent.trim().startsWith("Reverse") && vis(b));
    const frame = document.querySelector(".pane-frame");
    const lab = [...(frame?.querySelectorAll("label, .label, h3, [data-section-title]") ?? [])].filter(vis).map(e => [e.textContent.trim().slice(0, 14), Math.round(e.getBoundingClientRect().x)]).slice(0, 4);
    const sep = frame?.querySelector(".ribbon-bar [role=separator], .ribbon-bar hr, .ribbon-bar [data-orientation]");
    return { frameX: frame && Math.round(frame.getBoundingClientRect().x), revWord: rev && Math.round(rev.querySelector("span").getBoundingClientRect().x), revBox: rev && Math.round(rev.getBoundingClientRect().x), labels: lab, sepX: sep && Math.round(sep.getBoundingClientRect().x) };
  });
  console.log(route, JSON.stringify(o));
}
await b.close();
