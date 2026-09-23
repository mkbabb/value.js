// amiga-scene semantics probe — READ-ONLY; headed Chromium. Panel values vs authored options; pose period.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
const panel = () => p.evaluate(() => [...document.querySelectorAll("input,[role=combobox]")].filter(e => e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().x < 480).map(e => e.value || e.textContent.trim()));
const hoverT = async () => { const bb = await p.getByRole("button", { name: "Reset animation" }).first().boundingBox(); await p.mouse.move(bb.x + 10, bb.y + 10); await p.waitForTimeout(700); };
const out = {};
for (const ch of ["Spin", "Bouncing X", "Bouncing Y"]) {
  await hoverT(); await p.getByRole("combobox", { name: "Select animation" }).first().click(); await p.waitForTimeout(500);
  out.options = await p.evaluate(() => [...document.querySelectorAll("[role=option]")].map(e => e.textContent.trim()));
  await p.getByRole("option", { name: ch, exact: true }).first().click(); await p.waitForTimeout(700);
  out["panel-" + ch] = await panel();
}
// transport play: sample pose every 250ms for 9s
await hoverT(); console.log(JSON.stringify(out)); { const bs = p.getByRole("button", { name: "Play animation" }); const n = await bs.count(); out.playBtns = []; for (let i = 0; i < n; i++) { const b2 = await bs.nth(i).boundingBox(); out.playBtns.push([b2, await bs.nth(i).isVisible(), await bs.nth(i).evaluate(e => e.className.slice(0,80))]); } for (let i = 0; i < n; i++) if (await bs.nth(i).isVisible()) { await bs.nth(i).click({ timeout: 3000 }).catch(e => out.clickErr = String(e).slice(0, 300)); break; } }
const s = []; for (let i = 0; i < 37; i++) { s.push(await p.evaluate(() => { const q = window.__kfAmigaProbe.pose(); return [+q.px.toFixed(2), +q.py.toFixed(2), +q.spin.toFixed(2), q.playing]; })); await p.waitForTimeout(250); }
out.transportPlaySamples = s;
await p.screenshot({ path: OUT + "probe2-playing.png" });
// pause → settle
await hoverT(); { const bs = p.getByRole("button", { name: "Pause animation" }); const n = await bs.count(); out.pauseBtn = n; for (let i = 0; i < n; i++) if (await bs.nth(i).isVisible()) { await bs.nth(i).click({ timeout: 3000 }).catch(e => out.pauseErr = String(e).slice(0, 300)); break; } }
const st = []; for (let i = 0; i < 12; i++) { st.push(await p.evaluate(() => { const q = window.__kfAmigaProbe.pose(); return [+q.px.toFixed(2), +q.py.toFixed(2), +q.spin.toFixed(2), q.playing]; })); await p.waitForTimeout(100); }
out.afterPause = st;
// controls tab options
const bb = await p.locator(".glass-dock").first().boundingBox(); if (bb) { await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(1000); }
await p.getByRole("combobox", { name: "Controls tab" }).first().click(); await p.waitForTimeout(500);
out.tabs = await p.evaluate(() => [...document.querySelectorAll("[role=option]")].map(e => e.textContent.trim()));
await p.screenshot({ path: OUT + "probe2-tabs.png" }); await p.keyboard.press("Escape");
await p.getByRole("combobox", { name: "Scene" }).first().click(); await p.waitForTimeout(500);
out.scenes = await p.evaluate(() => [...document.querySelectorAll("[role=option]")].map(e => e.textContent.trim()));
await p.keyboard.press("Escape");
console.log(JSON.stringify(out));
await b.close();
