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
const state = () => p.evaluate(() => { const t = document.querySelector('[data-o18="admin-trigger"], [data-o18="profile-trigger"]'); const r = t?.getBoundingClientRect(); const top = r ? document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) : null; return { trig: !!t, inert: !!t?.closest("[inert]"), hidden: !!t?.closest("[aria-hidden=true]"), top: top ? `${top.tagName}.${String(top.className).slice(0, 60)}` : null, layers: [...document.querySelectorAll("[data-layer-id], [data-dock-layer], .dock-layer")].map((e) => (e.getAttribute("data-layer-id") ?? e.id ?? e.className.slice(0,30)) + (e.hasAttribute("inert") ? ":inert" : ":live")).slice(0, 8), band: document.querySelector("nav.dock-band")?.getAttribute("data-state") + "|" + document.querySelector("nav.dock-band")?.className.slice(0, 120), open: [...document.querySelectorAll("[data-state=open]")].map((e) => e.tagName + "." + String(e.className).slice(0, 30)).slice(0, 5) }; });
console.log("rest", JSON.stringify(await state()));
await p.getByRole("combobox", { name: /select view/i }).first().click({ timeout: 60000 });
await p.waitForTimeout(1200);
console.log("open", JSON.stringify(await state()));
await p.keyboard.press("Escape"); await p.keyboard.press("Escape");
await p.waitForTimeout(1500);
console.log("esc", JSON.stringify(await state()));
await p.evaluate(() => { location.hash = "#/blob"; }); await p.waitForTimeout(4000);
await p.evaluate(() => { location.hash = "#/"; }); await p.waitForTimeout(4000);
console.log("nav", JSON.stringify(await state()));
try { await p.locator('[data-o18="admin-trigger"], [data-o18="profile-trigger"]').first().click({ timeout: 15000, trial: true }); console.log("clickable"); } catch (e) { console.log(String(e).split("\n").slice(0, 14).join(" | ").slice(0, 900)); }
await b.close();
