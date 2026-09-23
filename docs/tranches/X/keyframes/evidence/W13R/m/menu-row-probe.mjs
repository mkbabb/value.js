// SERVED MODEL: claude-opus-5-5
// KF.W13R.m — MM-4 discharge probe: with the inline :style pair removed, the @mbabb menu's
// Clear-all row paints --accent-red and both rows carry cursor:pointer (glass 10 @layer components).
import { withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const url = process.argv[2] ?? "http://localhost:5173/";
const r = await withBrowser(async (browser) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  // the top dock mounts collapsed (collapse="closed"): hover it open first, as a user does.
  await page.locator('[data-dock-tether="top"] .glass-dock').first().hover();
  await page.waitForTimeout(900);
  await page.locator('[aria-label="@mbabb menu"]').first().click();
  await page.waitForTimeout(600);
  const out = await page.evaluate(() => {
    const row = (t) => [...document.querySelectorAll('[role^="menuitem"]')].find((e) => e.textContent.includes(t));
    const probe = document.createElement("span"); probe.style.color = "var(--accent-red)"; document.body.append(probe);
    const red = getComputedStyle(probe).color; probe.remove();
    const c = row("Clear all"), p = row("ppmycota");
    return { accentRed: red, clearColor: c && getComputedStyle(c).color, clearCursor: c && getComputedStyle(c).cursor, ppCursor: p && getComputedStyle(p).cursor, clearInline: c?.getAttribute("style") ?? null };
  });
  await ctx.close();
  return out;
}, { launch: { headless: false } });
console.log(JSON.stringify(r.value ?? r));
