import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(4000);
const info = await page.evaluate(() => {
  const c = document.createElement("canvas").getContext("webgl2");
  const ext = c && c.getExtension("WEBGL_debug_renderer_info");
  const renderer = ext ? c.getParameter(ext.UNMASKED_RENDERER_WEBGL) : null;
  const tether = document.querySelector('[data-dock-tether="top"]');
  const dock = tether?.querySelector(".glass-dock");
  const desc = (el, d = 0) => d > 4 ? "" : [...el.children].map(ch => "  ".repeat(d) + ch.tagName.toLowerCase() + "." + [...ch.classList].join(".") + (ch.getAttribute("aria-label") ? `[${ch.getAttribute("aria-label")}]` : "") + "\n" + (d < 3 ? desc(ch, d + 1) : "")).join("");
  return { renderer, hash: location.hash, dockClass: dock?.className, dockStyle: dock?.getAttribute("style"), rect: dock?.getBoundingClientRect().toJSON(), tree: dock ? desc(dock) : "NO DOCK" };
});
console.log(JSON.stringify(info, null, 1));
await page.screenshot({ path: "probe-rest.png" });
await browser.close();
