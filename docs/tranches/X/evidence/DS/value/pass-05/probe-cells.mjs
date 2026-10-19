// X-DS value pass 5 cure — the critic's cells re-shot (critic/probe.mjs, plus the gradient Type menu and the brick filter). Headless real Chrome only (§0ei).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/@playwright/test/index.mjs";
const BASE = "http://localhost:9000";
const OUT = process.argv[2];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const shot = async (page, name) => page.screenshot({ path: `${OUT}/${name}.png` });
const safe = async (label, fn) => { try { await fn(); } catch (e) { console.log("FAIL", label, String(e).slice(0, 160)); } };
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  const page = await ctx.newPage(); page.setDefaultTimeout(60000);
  const go = async (r) => { await page.goto(BASE + "/#" + r, { waitUntil: "load", timeout: 180000 }); await page.waitForTimeout(6000); };
  await safe("filter", async () => { await go("/browse");
    await page.getByRole("button", { name: /^Filters/ }).first().click(); await page.waitForTimeout(800); await shot(page, `browse-filter-${theme}`); await page.keyboard.press("Escape"); });
  await safe("space", async () => { await go("/");
    await page.locator("main [role=combobox]").first().click(); await page.waitForTimeout(800); await shot(page, `picker-space-${theme}`); await page.keyboard.press("Escape"); });
  await safe("tools", async () => { await go("/");
    await page.getByRole("button", { name: /Tools/ }).first().click(); await page.waitForTimeout(900); await shot(page, `tools-${theme}`); await page.keyboard.press("Escape"); });
  await safe("mixpal", async () => { await go("/mix");
    await page.getByRole("tab", { name: "Palettes" }).first().click(); await page.waitForTimeout(900); await shot(page, `mix-palettes-${theme}`); });
  await safe("stop", async () => { await go("/gradient");
    await page.locator("main [role=slider], main button[aria-label*=stop i]").first().click(); await page.waitForTimeout(900); await shot(page, `gradient-stop-${theme}`); });
  await safe("gradscroll", async () => { await go("/gradient");
    await page.mouse.move(450, 500); await page.mouse.wheel(0, 300); await page.waitForTimeout(900); await shot(page, `gradient-scrolled-${theme}`); });
  await safe("login", async () => { await go("/");
    await page.getByRole("button", { name: /Login/ }).first().click(); await page.waitForTimeout(900); await shot(page, `login-${theme}`); await page.keyboard.press("Escape"); });
  await safe("newpal", async () => { await go("/palettes");
    await page.getByText("Start a new palette").first().click(); await page.waitForTimeout(1200); await shot(page, `palettes-new-${theme}`); });
  await safe("typemenu", async () => { await go("/gradient");
    await page.locator("main [role=combobox]").first().click(); await page.waitForTimeout(900); await shot(page, `selectmenu-${theme}`); await page.keyboard.press("Escape"); });
  await safe("brickfilter", async () => { await go("/browse?space=lab&color=" + encodeURIComponent("lab(38% 32 24)"));
    await page.getByRole("button", { name: /^Filters/ }).first().click(); await page.waitForTimeout(800); await shot(page, `brick-browse-filter-${theme}`); await page.keyboard.press("Escape"); });
  await ctx.close();
}
await browser.close();
