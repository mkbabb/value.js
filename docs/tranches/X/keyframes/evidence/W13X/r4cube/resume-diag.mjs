// SERVED MODEL: claude-opus-5-5 — r4cube diagnostic: does Play resume after a paused edit / a paused Reset? VARIANT=none|cell|reset|both
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const V = process.env.VARIANT || "none"; const BASE = process.env.BASE || "http://localhost:5493";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errors = []; p.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200))); p.on("console", (m) => { if (m.type() === "error") errors.push("console:" + m.text().slice(0, 160)); });
const press = async (sel, band = "bottom") => { await p.hover(`[data-dock-tether="${band}"] .glass-dock`); await sleep(1200); await p.locator(sel).first().click({ timeout: 20000 }); };
const state = () => p.evaluate(() => ({ cls: document.querySelector(".idle-hover").className, t: [...document.querySelectorAll("button")].filter((e) => /^(Pause|Play) animation/.test(e.getAttribute("aria-label") || "")).map((e) => e.getAttribute("aria-label")) }));
await p.goto(`${BASE}/#/cube`, { timeout: 120000 }); await p.reload(); await p.waitForSelector(".cube-pose", { timeout: 90000 }); await sleep(3000);
await press('[role=combobox][aria-label="Channel to edit"]'); await sleep(900);
await p.getByRole("option", { name: /^Matrix/ }).first().click(); await sleep(1200);
await press('[data-dock-surface-item][data-surface="matrix-controls"]', "top"); await sleep(1800);
await press("button[aria-label='Pause animation']"); await sleep(900);
const out = { variant: V, paused: await state() };
if (V === "cell" || V === "both") { await p.evaluate(() => { const i = [...document.querySelectorAll(".matrix-grid")].find((x) => x.getBoundingClientRect().width > 0).children[0].querySelector("input"); i.focus(); i.value = "1.5"; i.dispatchEvent(new Event("input", { bubbles: true })); i.blur(); }); await sleep(1500); }
if (V === "reset" || V === "both") { await p.evaluate(() => [...document.querySelectorAll("button[aria-label='Reset matrix']")].find((e) => e.getBoundingClientRect().width > 0)?.click()); await sleep(1500); }
if (V === "wait") await sleep(3000);
if (V === "cellwait") { await sleep(0); }
out.afterEdit = await state();
out.focus = await p.evaluate(() => document.activeElement?.outerHTML.slice(0, 120));
await p.evaluate(() => { window.__log = []; const t0 = performance.now(); const L = (m) => window.__log.push(Math.round(performance.now() - t0) + ":" + m);
  for (const ty of ["pointerdown", "pointerup", "pointercancel", "click", "blur", "focus"]) window.addEventListener(ty, (e) => L(ty + ">" + (e.target?.getAttribute?.("aria-label") || e.target?.tagName || "win")), true);
  new MutationObserver((ms) => { for (const m of ms) if (m.attributeName === "aria-label") L("label=" + m.target.getAttribute("aria-label")); }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["aria-label"] }); });
out.mirrors = await p.evaluate(() => [...document.querySelectorAll("button[aria-label='Play animation']")].map((e) => { const r = e.getBoundingClientRect(); return { w: Math.round(r.width), x: Math.round(r.x), y: Math.round(r.y), inert: !!e.closest("[inert]"), op: getComputedStyle(e.closest("[inert]") ?? e).opacity }; }));
if (process.env.KEY) { await p.hover('[data-dock-tether="bottom"] .glass-dock'); await sleep(1200); const h = await p.evaluateHandle(() => [...document.querySelectorAll("button[aria-label='Play animation']")].find((e) => !e.closest("[inert]") && e.getBoundingClientRect().width > 0)); await h.asElement().focus(); await p.keyboard.press("Enter"); } else
await press("button[aria-label='Play animation']"); out.focus2 = await p.evaluate(() => document.activeElement?.outerHTML.slice(0, 160)); await sleep(600); out.play600 = await state(); await sleep(2500); out.play3100 = await state();
out.log = await p.evaluate(() => window.__log); out.errors = errors; console.log(JSON.stringify(out)); await b.close();
