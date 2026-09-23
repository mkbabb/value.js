// read-only probe: what paints the gray slab inside the Profile/@mbabb/Login capsules (light, 1440)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); } catch {} });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/", { waitUntil: "load", timeout: 45000 }).catch(() => {});
await page.locator(".glass-dock").first().waitFor({ timeout: 30000 });
await page.waitForTimeout(3500);
const r = await page.evaluate(() => {
  const btns = [...document.querySelectorAll(".glass-dock button")].filter((b) => /Login|@mbabb|Home|Tools/.test(b.textContent) && b.offsetParent);
  const pe = (el, p) => { const s = getComputedStyle(el, p); return { content: s.content, bg: s.backgroundColor, bgi: s.backgroundImage.slice(0, 100), inset: `${s.inset}`, w: s.width, h: s.height, radius: s.borderRadius, backdrop: s.backdropFilter, filter: s.filter, opacity: s.opacity, mix: s.mixBlendMode, z: s.zIndex, pos: s.position }; };
  return btns.map((b) => ({ text: b.textContent.trim(), cls: b.className, self: pe(b), before: pe(b, "::before"), after: pe(b, "::after"), kids: [...b.children].map((k) => ({ tag: k.tagName, cls: String(k.className?.baseVal ?? k.className).slice(0, 80), ...pe(k) })) }));
});
console.log(JSON.stringify(r, null, 1));
const fam = await page.evaluate(() => ({ display: getComputedStyle(document.documentElement).getPropertyValue("--font-display"), serif: getComputedStyle(document.documentElement).getPropertyValue("--font-serif"), dockLabel: getComputedStyle([...document.querySelectorAll(".glass-dock *")].find((e) => e.textContent.trim() === "Home" && e.children.length === 0) || document.body).fontFamily }));
console.log(JSON.stringify(fam));
await browser.close();
