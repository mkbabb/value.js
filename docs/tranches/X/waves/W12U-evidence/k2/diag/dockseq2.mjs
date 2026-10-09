// SERVED MODEL: claude-opus-5-5
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await prepare(ctx, { theme: "light", admin: true, palettes: true, user: true, browse: "ok" });
const p = await ctx.newPage();
await p.goto(`http://localhost:9000/#/`, { waitUntil: "commit", timeout: 600000 });
await p.waitForFunction(() => !!document.querySelector("main .pane-header"), null, { timeout: 600000 });
await p.waitForTimeout(6000);
await p.getByRole("combobox", { name: /select view/i }).first().click({ timeout: 60000 }); await p.waitForTimeout(1200);
await p.keyboard.press("Escape"); await p.keyboard.press("Escape"); await p.waitForTimeout(1500);
const summary = p.locator('[id$="-summary"]:not([inert])').first();
console.log("summary live", await summary.count());
await summary.click({ timeout: 60000 }); await p.waitForTimeout(1000);
for (const [n, l] of [["admin", p.locator('[data-o18="admin-trigger"], [data-o18="profile-trigger"]').first()], ["mbabb", p.getByRole("button", { name: "@mbabb" }).first()], ["tools", p.getByRole("button", { name: /toggle action bar/i }).first()]]) {
  try { await l.click({ timeout: 15000, trial: true }); console.log(n, "clickable"); } catch (e) { console.log(n, String(e).split("\n")[0].slice(0, 200)); }
}
await p.getByRole("button", { name: /toggle action bar/i }).first().click({ timeout: 15000 }); await p.waitForTimeout(800);
try { await p.getByRole("button", { name: /open color input/i }).first().click({ timeout: 15000, trial: true }); console.log("colorinput clickable"); } catch (e) { console.log("colorinput", String(e).split("\n")[0].slice(0, 200)); }
await b.close();
