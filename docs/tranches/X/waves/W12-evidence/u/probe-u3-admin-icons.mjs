// SERVED MODEL: claude-opus-5-5 — X.W12.u3: admin icon-only Buttons are square on the icon-only rung at 390 coarse and 1440 fine (UIA-V-172/181/434/631). Setup lines copied from the audit probe.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const ALL = Array.from({ length: 47 }, (_, i) => ({ id: `a${i}`, timestamp: new Date(Date.UTC(2026, 8, 23, 14) - i * 3.7e6).toISOString(), action: ["approve-color","delete-color","delete-user","delete-palette","impersonate","reject-color"][i % 6], target: ["color:ocean-mist-7f3a","user:azure-fox-01","palette:sunset-drift-9c21b4e7d0a1","color:very-long-colour-name-that-keeps-going-and-going-8812ff","user:quiet-river-bright-owl"][i % 5] }));
const out = { errs: [] };
const browser = await chromium.launch({ headless: true });
for (const [w, h, touch] of [[390, 844, true], [1440, 900, false]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: touch });
  await ctx.addInitScript(() => { try { localStorage.setItem("palette-admin-token", "dev"); } catch {} });
  const page = await ctx.newPage(); page.setDefaultTimeout(60000);
  await page.route(/\/admin\/audit\?/, (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: ALL.slice(0, 20), total: 47, limit: 20, offset: 0 }) }));
  await page.route(/\/admin\/users\?/, (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [{ slug: "azure-fox-01", createdAt: "2026-09-01T00:00:00Z", paletteCount: 4 }, { slug: "empty-ghost-33", createdAt: "2026-09-02T00:00:00Z", paletteCount: 0 }], total: 2, limit: 50, offset: 0 }) }));
  for (const hash of ["#/admin/audit", "#/admin/tags", "#/admin/names", "#/admin/flagged", "#/admin/users"]) {
    await page.goto(`http://localhost:9000/${hash}`, { waitUntil: "domcontentloaded", timeout: 180000 });
    await page.waitForTimeout(3500);
    const sizes = await page.evaluate(() => [...document.querySelectorAll('main button[data-icon-only], main button[aria-label]')].filter((b) => b.getBoundingClientRect().width > 0 && !b.innerText.trim()).map((b) => { const q = b.getBoundingClientRect(); return [b.getAttribute("aria-label")?.slice(0, 28), Math.round(q.width), Math.round(q.height), getComputedStyle(b).borderTopLeftRadius]; }));
    out[`${w}${hash}`] = sizes;
    await page.screenshot({ path: `${OUT}u3-admin-icons-${w}-${hash.split("/").pop()}${process.env.RUN ?? ""}.png` });
  }
  await ctx.close();
}
writeFileSync(`${OUT}probe-u3-admin-icons${process.env.RUN ?? ""}.json`, JSON.stringify(out, null, 1));
await browser.close(); console.log(JSON.stringify(out));
