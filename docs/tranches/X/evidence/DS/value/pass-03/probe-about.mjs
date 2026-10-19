// X-DS value pass 3 — probe the About card's header/veil/plate (headless real Chrome, §0ei)
import { chromium } from "@playwright/test";
const BASE = process.argv[2] || "http://localhost:9000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, theme);
  const page = await ctx.newPage();
  await page.goto(BASE + "/#/", { waitUntil: "load" });
  await page.locator(".about-card .pane-header").waitFor({ timeout: 60000 });
  await page.waitForTimeout(3000);
  const r = await page.evaluate(async () => {
    const card = document.querySelector(".about-card");
    const port = card.querySelector(".pane-scroll-fade");
    const h = card.querySelector(".pane-header");
    port.scrollTop = 99999;
    await new Promise((r) => setTimeout(r, 400));
    const cs = getComputedStyle(card), b = getComputedStyle(h, "::before"), a = getComputedStyle(h, "::after");
    return {
      cardBg: cs.backgroundColor, cardBackdrop: cs.backdropFilter, cardBgImg: cs.backgroundImage.slice(0, 200),
      veilBg: b.backgroundColor, veilOpacity: b.opacity, veilFilter: b.backdropFilter,
      occluderBg: a.backgroundColor, occluderOpacity: a.opacity, occluderContent: a.content,
      headerRect: h.getBoundingClientRect().toJSON(), titleRect: h.querySelector(".pane-header-title").getBoundingClientRect().toJSON(),
      portRect: port.getBoundingClientRect().toJSON(), scrollTop: port.scrollTop,
    };
  });
  console.log(theme, JSON.stringify(r));
  await page.screenshot({ path: import.meta.dirname + `/about-scrolled-1440-${theme}.png` });
  await ctx.close();
}
await browser.close();
