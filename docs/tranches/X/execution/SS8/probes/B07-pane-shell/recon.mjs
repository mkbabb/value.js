// SS-8 B07 recon — per-route PaneHeader census at HEAD (served dev :9000), Chromium headless.
import { chromium } from "playwright";
const ROUTES = ["/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient", "/atmosphere", "/blob", "/about", "/nope-404"];
const b = await chromium.launch();
try {
  for (const vp of [{ width: 1440, height: 900 }]) {
    for (const r of ROUTES) {
      const ctx = await b.newContext({ viewport: vp, colorScheme: "light" });
      try {
        const p = await ctx.newPage();
        await p.goto("http://localhost:9000/#" + r, { waitUntil: "load", timeout: 45000 });
        await p.waitForTimeout(3500);
        const m = await p.evaluate(() => {
          const hs = [...document.querySelectorAll(".pane-header")];
          return {
            hash: location.hash,
            regions: [...document.querySelectorAll(".pane-wrapper")].map((w) => w.dataset.pane),
            headers: hs.map((h) => {
              const t = h.querySelector(".pane-header-title"); const cs = getComputedStyle(t);
              const host = h.closest(".pane-scroll-fade") || h.parentElement.querySelector(".pane-scroll-fade");
              const bs = getComputedStyle(h, "::before");
              return { text: t.textContent.trim().slice(0, 30), tag: t.tagName, visible: h.offsetParent !== null, h: +h.getBoundingClientRect().height.toFixed(1),
                fs: cs.fontSize, tf: cs.transform, condensed: h.dataset.condensed ?? null,
                veil: { bg: bs.backgroundColor, bgImg: bs.backgroundImage.slice(0, 80), op: bs.opacity, bf: bs.backdropFilter, disp: bs.display },
                hostSeated: !!(h.parentElement.querySelector(":scope > .pane-scroll-fade")), hostOverlying: !!h.closest(".pane-scroll-fade"),
                hostScroll: host ? { sh: host.scrollHeight, ch: host.clientHeight, sp: getComputedStyle(host).scrollPaddingBlockStart } : null };
            }),
          };
        });
        console.log(JSON.stringify({ vp: vp.width, route: r, ...m }));
      } finally { await ctx.close(); }
    }
  }
} finally { await b.close(); }
