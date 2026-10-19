// SS-8 B07 — wrapper structure recon (which element is the pane root; component names in dev).
import { chromium } from "playwright";
const b = await chromium.launch();
try {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/gradient", { waitUntil: "load" }); await p.waitForTimeout(4000);
  console.log(JSON.stringify(await p.evaluate(() => [...document.querySelectorAll(".pane-wrapper")].map((w) => {
    const walk = (el, d) => d > 3 ? null : { tag: el.tagName, cls: String(el.className).slice(0, 50), comp: el.__vueParentComponent?.type?.__name ?? el.__vueParentComponent?.type?.name ?? null, kids: [...el.children].slice(0, 3).map((c) => walk(c, d + 1)) };
    return walk(w, 0);
  })), null, 0));
  await ctx.close();
} finally { await b.close(); }
