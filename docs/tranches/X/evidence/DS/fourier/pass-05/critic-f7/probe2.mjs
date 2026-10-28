import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT = process.argv[2];
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
for (const [theme, w] of [["light", 1440], ["dark", 390]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, ...(w === 390 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  await p.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  res[theme + w] = await p.evaluate(async () => {
    const out = {};
    const hs = [...document.querySelectorAll(".section-header--sub, .section-header--chapter")];
    out.count = hs.length;
    const h = hs.find(x => x.classList.contains("section-header--sub"));
    if (h) { const cs = getComputedStyle(h); out.sub = { pos: cs.position, top: cs.top, bg: cs.backgroundColor, z: cs.zIndex };
      h.scrollIntoView({ block: "start" }); await new Promise(r => setTimeout(r, 600));
      const sc = h.closest("[class*=scroll]") || document.scrollingElement;
      // scroll further a bit
      let s = h.parentElement; while (s && !(s.scrollHeight > s.clientHeight + 10 && /auto|scroll/.test(getComputedStyle(s).overflowY))) s = s.parentElement;
      (s || document.scrollingElement).scrollBy(0, 300); await new Promise(r => setTimeout(r, 600));
      const r = h.getBoundingClientRect(); out.subAfterScroll = [Math.round(r.top), Math.round(r.height)];
      const prev = h.parentElement?.previousElementSibling; out.parentCls = h.parentElement?.className; out.parentMt = h.parentElement && getComputedStyle(h.parentElement).marginTop;
    }
    const cs = getComputedStyle(document.documentElement); out.cardVar = cs.getPropertyValue("--card"); out.borderVar = cs.getPropertyValue("--border");
    return out;
  });
  await p.screenshot({ path: `${OUT}/paper-sticky-${theme}-${w}.png` });
  await ctx.close();
}
writeFileSync(`${OUT}/probe2.json`, JSON.stringify(res, null, 1)); await b.close();
