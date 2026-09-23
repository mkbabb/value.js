// read-only probe (writes only to the local dev DB via the app's own login): slug sign-in by typing,
// (a) an unknown slug-shaped value, (b) an existing slug. Light + dark, 1440.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const sha = execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim();
const dirty = execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim();
console.log(`value.js ${sha} dirty=${dirty} ${new Date().toISOString()}`);
const browser = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  const net = []; page.on("response", (r) => { if (/sessions/.test(r.url())) net.push(`${r.request().method()} ${new URL(r.url()).pathname} ${r.status()}`); });
  await page.goto("http://localhost:9000/", { waitUntil: "load", timeout: 45000 }).catch(() => {});
  await page.locator(".glass-dock").first().waitFor({ timeout: 30000 }); await page.waitForTimeout(3000);
  const clip = async (name) => { const b = await page.locator(".glass-dock").first().boundingBox(); await page.screenshot({ path: `${OUT}${theme}-1440-${name}.png`, clip: { x: b.x - 16, y: b.y - 16, width: b.width + 32, height: b.height + 60 } }); };
  const login = page.locator("button", { hasText: /^\s*Login\s*$/ }).filter({ visible: true }).first();
  // (a) unknown slug
  await login.click(); await page.waitForTimeout(700);
  const input = page.locator('[aria-label="Slug or admin token"]').first();
  await input.fill("zzzz-yyyy-xxxx-wwww"); await clip("13-login-typed");
  await input.press("Enter"); await page.waitForTimeout(2500);
  await clip("14-login-unknown-slug-result");
  const vis = await page.evaluate(() => [...document.querySelectorAll('[role="alert"],[role="status"],.text-destructive')].filter((e) => e.offsetParent && e.textContent.trim()).map((e) => e.textContent.trim().slice(0, 80)));
  console.log(theme, "unknown-slug: visible alerts/status =", JSON.stringify(vis), "net", JSON.stringify(net), "slugLS", await page.evaluate(() => localStorage.getItem("palette-user-slug")));
  // (b) existing slug (minted by capture.mjs)
  net.length = 0;
  await login.click(); await page.waitForTimeout(700);
  await input.fill("smoky-dipping-citrine-stork"); await input.press("Enter"); await page.waitForTimeout(2500);
  await clip("15-login-existing-slug-result");
  const t = page.locator('[data-o18="profile-trigger"]');
  console.log(theme, "existing-slug: profile trigger visible =", await t.isVisible().catch(() => false), "net", JSON.stringify(net), "slugLS", await page.evaluate(() => localStorage.getItem("palette-user-slug")), "url", page.url());
  if (await t.isVisible().catch(() => false)) {
    await t.click(); await page.waitForTimeout(700);
    const b = await page.evaluate(() => { const m = document.querySelector('[role="menu"]'); const r = m.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    await page.screenshot({ path: `${OUT}${theme}-1440-16-menu-after-slug-login.png`, clip: { x: b.x - 400, y: 0, width: b.w + 560, height: b.y + b.h + 20 } });
    console.log(theme, "menu verdict =", await page.locator("[data-identity-verdict]").textContent().catch(() => null));
  }
  await ctx.close();
}
await browser.close();
