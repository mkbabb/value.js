// focused probe: does "Share color" flip to "Copied!" on the mobile menu? (READ-ONLY)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: theme, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript((t) => { localStorage.setItem("vueuse-color-scheme", t); }, theme);
  const p = await ctx.newPage(); const errs = [];
  p.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errs.push(m.text().slice(0, 200)));
  await p.goto("http://localhost:9000/", { waitUntil: "load", timeout: 60000 }); await p.waitForTimeout(2500);
  await p.locator('[aria-label="Menu"]').first().click(); await p.waitForTimeout(600);
  const idx = await p.$$eval('[role="menu"] [role="menuitem"]', (els) => els.findIndex((e) => /Share/.test(e.textContent)));
  const row = p.locator('[role="menu"] [role="menuitem"]').nth(idx);
  await row.click();
  const seen = [];
  for (let i = 0; i < 12; i++) { seen.push((await row.textContent({ timeout: 500 }).catch(() => "?")).trim()); if (i === 1) await p.screenshot({ path: `${OUT}${theme}-390-out-4b-share-after-click.png` }); await p.waitForTimeout(150); }
  const clip = await p.evaluate(() => navigator.clipboard.readText().catch((e) => "ERR " + e));
  console.log(theme, "texts over 1.8s:", JSON.stringify([...new Set(seen)]), "clipboard:", clip.slice(0, 120), "errs:", JSON.stringify(errs.slice(0, 4)));
  await ctx.close();
}
// retry dark-390-in boot
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: "dark" });
await ctx.addInitScript(() => { localStorage.setItem("vueuse-color-scheme", "dark"); localStorage.setItem("palette-user-slug", "vivid-heron-42"); });
const p = await ctx.newPage(); const t0 = Date.now();
try { await p.goto("http://localhost:9000/", { waitUntil: "load", timeout: 60000 }); console.log("dark-390-in load ms", Date.now() - t0); } catch (e) { console.log("dark-390-in load FAIL", e.message.split("\n")[0]); }
await ctx.close(); await b.close();
