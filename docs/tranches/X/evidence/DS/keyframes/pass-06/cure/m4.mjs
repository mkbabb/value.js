// X-DS kf pass 6 cure seat — the rail budget vs the sub-pane chrome at several heights (KF-C6-03). Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const [w, h] of [[1440, 900], [1440, 1080], [1280, 760], [1024, 700]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
  await p.evaluate(() => localStorage.clear()); await p.reload({ waitUntil: "load" });
  await p.waitForTimeout(3500);
  await p.locator('[aria-label="Edit easing curve"]:visible').first().click();
  await p.waitForTimeout(1200);
  const o = await p.evaluate(() => {
    const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.y), Math.round(r.height), Math.round(r.bottom)]; };
    const wr = document.querySelector(".controls-pane-wrapper");
    const cs = getComputedStyle(wr);
    const surf = document.querySelector(".controls-surface");
    const body = [...document.querySelectorAll("[data-subpane-body]")].find(e => e.getBoundingClientRect().height > 0);
    const host = body.firstElementChild;
    const probe = document.createElement("div"); probe.style.blockSize = "calc(100dvh - var(--dock-menubar-reserve) - var(--work-area-vertical-slack) / 2)"; wr.appendChild(probe);
    const budget = probe.getBoundingClientRect().height; probe.remove();
    return { wrapper: R(wr), maxBlock: cs.maxBlockSize, budget, surf: R(surf), surfScroll: surf.scrollHeight, body: R(body), host: R(host), hostW: Math.round(host.getBoundingClientRect().width) };
  });
  console.log(w, h, JSON.stringify(o));
  await ctx.close();
}
await b.close();
