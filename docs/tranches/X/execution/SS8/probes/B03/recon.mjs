// B03 recon — DOM shape of #/atmosphere, #/blob, #/ (headless chromium, one browser, ctx per cell)
import { chromium } from "playwright";
const BASE = "http://localhost:9000/";
const browser = await chromium.launch();
try {
  for (const [route, scheme] of [["#/atmosphere","light"],["#/blob","dark"],["#/","light"]]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    try {
      const page = await ctx.newPage();
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      await page.waitForTimeout(2500);
      const info = await page.evaluate(() => {
        const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x),Math.round(b.y),Math.round(b.width),Math.round(b.height)]; };
        const sliders = [...document.querySelectorAll('[role="slider"]')];
        const s0 = sliders[0];
        let anc = s0, chain = [];
        for (let i = 0; i < 4 && anc; i++) { chain.push(`${anc.tagName.toLowerCase()}.${[...anc.classList].slice(0,4).join('.')}[${[...anc.attributes].filter(a=>a.name.startsWith('aria')||a.name.startsWith('data-')).map(a=>a.name+'='+a.value).join(',')}]`); anc = anc.parentElement; }
        return {
          htmlClass: document.documentElement.className, dataTheme: document.documentElement.dataset.theme,
          main: r(document.querySelector("main")),
          canvases: [...document.querySelectorAll("canvas")].map(c => ({ r: r(c), cls: c.className.toString().slice(0,60), vis: getComputedStyle(c).visibility, w: c.width, h: c.height })),
          sliders: sliders.length, sliderChain: chain,
          ariaLabelDup: s0 ? document.querySelectorAll(`[aria-label="${s0.getAttribute('aria-label')}"]`).length : null,
          labels: [...document.querySelectorAll("label")].slice(0,6).map(l => [l.textContent.trim().slice(0,20), r(l)]),
          triggers: [...document.querySelectorAll('[role="combobox"]')].map(t => [t.textContent.trim().slice(0,20), r(t)]),
          wells: [...document.querySelectorAll(".console-well")].map(r),
          cards: [...document.querySelectorAll("[data-slot='card'], .card, [class*='pane-shell']")].slice(0,4).map(e => [e.className.toString().slice(0,50), r(e)]),
          hero: r(document.querySelector(".hero-blob-anchor")),
          bodyBg: getComputedStyle(document.body).backgroundColor,
        };
      });
      console.log(route, scheme, JSON.stringify(info));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
