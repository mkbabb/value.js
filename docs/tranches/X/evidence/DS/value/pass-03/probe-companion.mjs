// X-DS value pass 3 (V3C-03) — the My Palettes companion: card, scroll, the hint line and the first card's bottom.
import { chromium } from "@playwright/test";
const BASE = process.argv[2] || "http://localhost:9000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
async function read(page) {
  return page.evaluate(() => {
    const w = [...document.querySelectorAll(".pane-wrapper--inspector")].find((e) => e.querySelector(".palettes-companion-grid"));
    if (!w) return null;
    const card = w.firstElementChild?.closest(".card") ?? w.querySelector(".card");
    const port = w.querySelector(".pane-scroll-fade");
    const cr = card.getBoundingClientRect();
    const hint = [...w.querySelectorAll("p")].find((p) => /Add colors, then save/.test(p.textContent));
    const first = w.querySelector(".palettes-companion-grid > *:not(.sortable-ghost)");
    const trash = w.querySelector('[aria-label="Delete all saved palettes"]');
    return {
      dataPane: w.dataset.pane, cardH: Math.round(cr.height), portClient: port?.clientHeight, portScroll: port?.scrollHeight,
      cardBottom: Math.round(cr.bottom),
      hintBottom: hint ? Math.round(hint.getBoundingClientRect().bottom) : null,
      firstBottom: first ? Math.round(first.getBoundingClientRect().bottom) : null,
      trash: trash ? trash.getBoundingClientRect().toJSON() : null, trashText: trash?.textContent.trim(),
      stageH: Math.round(document.querySelector(".pane-wrapper--stage .card, .pane-wrapper--stage > *")?.getBoundingClientRect().height),
    };
  });
}
for (const theme of ["light"]) {
  for (const [name, route, save] of [["browse", "/#/browse", false], ["gensave", "/#/generate", true]]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, theme);
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "load" });
    await page.locator(".glass-dock").first().waitFor({ timeout: 60000 });
    await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 60000 });
    await page.waitForTimeout(3500);
    if (save) { await page.getByRole("button", { name: /save/i }).first().click(); await page.waitForTimeout(1500); }
    console.log(name, theme, JSON.stringify(await read(page)));
    await page.screenshot({ path: import.meta.dirname + `/${name}-1440-${theme}.png` });
    await ctx.close();
  }
}
await browser.close();
