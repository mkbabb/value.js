// SERVED MODEL: claude-opus-5-5 — SS-8 B06 recon2: visible dock buttons in main vs action face (1440).
import { chromium } from "playwright";
import { boot, ensureExpanded } from "./lib.mjs";
const vis = (page) => page.evaluate(() => [...document.querySelectorAll(".glass-dock button, .glass-dock [role=combobox]")].filter((b) => { const r = b.getBoundingClientRect(); let o = 1; for (let n = b; n; n = n.parentElement) o *= +getComputedStyle(n).opacity; return r.width > 0 && o > 0.5 && !b.closest("[inert]"); }).map((b) => (b.getAttribute("aria-label") || b.textContent.trim().slice(0, 20)) + "@" + Math.round(b.getBoundingClientRect().x) + (b.closest(".dock-face") ? "/" + b.closest(".dock-face").className.replace(/\s+/g, ".") : "")));
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  try {
    const page = await ctx.newPage();
    await boot(page, "#/");
    await ensureExpanded(page);
    console.log("MAIN", JSON.stringify(await vis(page)));
    await page.locator(".action-bar-toggle-inner button").first().click();
    await page.waitForTimeout(1200);
    console.log("ACTIONS", JSON.stringify(await vis(page)));
    await page.keyboard.press("Escape"); await page.waitForTimeout(800); await ensureExpanded(page);
    console.log("AFTER-ESC", JSON.stringify(await vis(page)));
  } finally { await ctx.close(); }
} finally { await browser.close(); }
