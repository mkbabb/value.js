// SERVED MODEL: claude-opus-5-5
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await prepare(ctx, { theme: "light", admin: true, palettes: true, user: true, browse: "ok" });
const p = await ctx.newPage();
await p.goto(`http://localhost:9000/#${process.env.ROUTE ?? "/"}`, { waitUntil: "commit", timeout: 600000 });
await p.waitForFunction(() => !!document.querySelector("main .pane-header"), null, { timeout: 600000 });
await p.waitForTimeout(6000);
const info = await p.evaluate(() => {
  const q = (s) => [...document.querySelectorAll(s)].map((e) => { const r = e.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2; const top = document.elementFromPoint(x, y); return { s, vis: e.getClientRects().length > 0, r: [r.left|0, r.top|0, r.width|0, r.height|0], top: top ? `${top.tagName}.${String(top.className).slice(0, 50)}` : null, self: top ? e.contains(top) : false }; });
  return [...q('[data-o18="admin-trigger"]'), ...q('[data-o18="profile-trigger"]'), ...q('button[aria-label*="olor input" i]'), ...q('.api-status-chip')];
});
console.log(JSON.stringify(info));
for (const [n, l] of [["admin", p.locator('[data-o18="admin-trigger"], [data-o18="profile-trigger"]').first()], ["mbabb", p.getByRole("button", { name: "@mbabb" }).first()], ["colorinput", p.getByRole("button", { name: /open color input/i }).first()]]) {
  try { await l.click({ timeout: 15000, trial: true }); console.log(n, "clickable"); } catch (e) { console.log(n, String(e).split("\n").slice(0, 12).join(" | ").slice(0, 700)); }
}
await b.close();
