// transport-dock: Play glyph vs rainbow-pastel stops contrast — READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/square", { waitUntil: "networkidle" }); await page.waitForTimeout(2500);
  const r = await page.evaluate(() => {
    const c = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    const rgb = (v) => { c.clearRect(0, 0, 1, 1); c.fillStyle = "#000"; c.fillStyle = v; c.fillRect(0, 0, 1, 1); return [...c.getImageData(0, 0, 1, 1).data].slice(0, 3); };
    const L = ([r, g, b]) => { const f = (x) => { x /= 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const cr = (a, b) => { const [h, l] = [L(a), L(b)].sort((x, y) => y - x); return +((h + 0.05) / (l + 0.05)).toFixed(2); };
    const d = [...document.querySelectorAll(".glass-dock")].pop(); const btn = [...d.querySelectorAll("button")].find(b => /Play|Pause/.test(b.getAttribute("aria-label")) && !b.closest("[inert]"));
    const svg = btn.querySelector("svg"); const glyph = getComputedStyle(svg).color; const g = rgb(glyph);
    const cs = getComputedStyle(document.documentElement);
    const stops = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"].map(n => { const v = cs.getPropertyValue("--rainbow-pastel-" + n).trim(); return { n, v, cr: cr(g, rgb(v)) }; });
    return { theme: document.documentElement.className, glyph, cls: btn.className, stops };
  });
  console.log(JSON.stringify(r));
  await ctx.close();
}
await browser.close();
