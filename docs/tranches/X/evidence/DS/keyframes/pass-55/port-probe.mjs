// pass 10: the spring port's uncapped fold and painted extent with 'Peak overshoot' open (headless real Chrome; closed in finally).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.env.BASE ?? "http://localhost:5193/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  for (const [w, h] of [[1440, 1080], [1440, 900], [1280, 800]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } }); const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      await page.locator(".spring-heatmap-section [data-figure-title]").first().click(); await page.waitForTimeout(1500);
      out[`${w}x${h}`] = await page.evaluate(() => {
        const s = document.querySelector('[data-fold-key="spring-physics"]');
        const capped = { cap: s.style.maxBlockSize, client: s.clientHeight, sh: s.scrollHeight };
        const cap = s.style.maxBlockSize; s.style.maxBlockSize = "";
        const fold = s.clientHeight; const sh = s.scrollHeight;
        const origin = s.getBoundingClientRect().top + s.clientTop - s.scrollTop;
        let lastPaint = 0, firstPaint = Infinity;
        for (const el of s.querySelectorAll("*")) { const r = el.getBoundingClientRect(); if (r.height <= 1 || r.width <= 1) continue; const cs = getComputedStyle(el);
          const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
          const paint = own || ["CANVAS","IMG","svg","INPUT"].includes(el.tagName) || (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent") || parseFloat(cs.borderBottomWidth) > 0;
          if (paint) { lastPaint = Math.max(lastPaint, r.bottom - origin); firstPaint = Math.min(firstPaint, r.top - origin); } }
        const kids = [...s.children].map((c) => { const r = c.getBoundingClientRect(); const cs = getComputedStyle(c); return `${c.className.slice(0,40)} ${Math.round(r.top-origin)}-${Math.round(r.bottom-origin)} pb=${cs.paddingBottom} mb=${cs.marginBottom}`; });
        const deep = [...s.firstElementChild.children].map((c) => { const r = c.getBoundingClientRect(); const cs = getComputedStyle(c); return `${c.tagName}.${String(c.className).slice(0,50)} ${Math.round(r.top-origin)}-${Math.round(r.bottom-origin)} pb=${cs.paddingBottom} mb=${cs.marginBottom}`; });
        const sp = getComputedStyle(s);
        s.style.maxBlockSize = cap;
        return { capped, uncapped: { fold, sh, reach: sh - fold }, firstPaint, lastPaint: Math.round(lastPaint*10)/10, portPad: [sp.paddingTop, sp.paddingBottom], kids, deep };
      });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); console.log(JSON.stringify(out, null, 1)); }
