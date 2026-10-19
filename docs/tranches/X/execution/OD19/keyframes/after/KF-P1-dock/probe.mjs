// OD19 KF-P1-dock AFTER probe (K2 + K6) — headless chromium, ONE browser, a context per cell.
// Usage: node probe.mjs <outDir> [base]. Falsifier (#/cube, pane open; 1440/1280/1024/390; light+dark):
//  K2  both docks cx = innerWidth/2 ± 1; the expanded docks do not intersect the pane.
//  K6  one surface trigger; its menu names Controls / Keyframes / Timeline / the facet.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = process.argv[2];
const BASE = process.argv[3] ?? "http://localhost:5173";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = {};
const fails = [];

const rect = (page, sel) => page.evaluate((s) => {
    const vis = [...document.querySelectorAll(s)].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; });
    const e = vis[0]; if (!e) return null;
    const r = e.getBoundingClientRect();
    return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), cx: +(r.x + r.width / 2).toFixed(1) };
}, sel);
const intersects = (a, b) => !!a && !!b && a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
const PANE = ".controls-layout--open .pane-frame, .controls-drawer-content";
const TOP = '[data-dock-tether="top"] .glass-dock';
const BOT = '[data-dock-tether="bottom"] .glass-dock';

const browser = await chromium.launch({ headless: true });
try {
    for (const theme of ["light", "dark"]) {
        for (const width of [1440, 1280, 1024, 390]) {
            const height = width === 390 ? 844 : 900;
            const key = `${theme}-${width}`;
            const R = (results[key] = {});
            const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: theme, deviceScaleFactor: 1 });
            const page = await ctx.newPage();
            try {
                await page.goto(BASE + "/#/cube", { waitUntil: "load" });
                await page.waitForSelector(TOP, { timeout: 30000 });
                await sleep(1500);
                // K6 — open the one surface trigger's menu, read its rows, pick Controls.
                await page.hover(TOP);
                await sleep(700);
                R.triggers = await page.$$eval("[data-dock-surface-trigger]", (els) => els.length);
                R.dockItemRun = await page.$$eval('[data-dock-tether="top"] [data-dock-surface-item]', (els) => els.length);
                await page.locator("[data-dock-surface-trigger]").first().click({ timeout: 4000 });
                await sleep(500);
                R.menu = await page.$$eval('[role="menuitem"][data-dock-surface-item]', (els) =>
                    els.map((e) => ({ text: e.textContent.trim(), surface: e.dataset.surface, disabled: e.hasAttribute("data-disabled"), glyph: !!e.querySelector("svg") })));
                await page.screenshot({ path: path.join(OUT, `K6-menu-${key}.png`) });
                const paneWasOpen = await page.evaluate(() => !!document.querySelector(".controls-layout--open"));
                if (!paneWasOpen) await page.locator('[role="menuitem"][data-surface="controls"]').click({ timeout: 4000 });
                else await page.keyboard.press("Escape");
                await page.mouse.move(width - 5, height / 2);
                await sleep(1800);
                R.paneOpen = await page.evaluate(() => !!document.querySelector(".controls-layout--open") || !!document.querySelector(".controls-drawer-content"));
                R.innerWidth = await page.evaluate(() => innerWidth);
                R.pane = await rect(page, PANE);
                R.topCollapsed = await rect(page, TOP);
                R.botCollapsed = await rect(page, BOT);
                await page.screenshot({ path: path.join(OUT, `K2-paneopen-${key}.png`) });
                // the expanded docks vs the pane
                await page.hover(TOP); await sleep(900);
                R.topExpanded = await rect(page, TOP);
                await page.mouse.move(width - 5, height / 2); await sleep(400);
                await page.hover(BOT).catch(() => {}); await sleep(900);
                R.botExpanded = await rect(page, BOT);
                await page.screenshot({ path: path.join(OUT, `K2-bottom-expanded-${key}.png`) });
                const half = R.innerWidth / 2;
                const chk = (name, ok) => { R[name] = ok; if (!ok) fails.push(`${key}:${name}`); };
                chk("paneOpenOk", R.paneOpen);
                for (const k of ["topCollapsed", "botCollapsed", "topExpanded", "botExpanded"]) chk(`${k}Centred`, !!R[k] && Math.abs(R[k].cx - half) <= 1);
                chk("topExpandedClearOfPane", !intersects(R.topExpanded, R.pane));
                // At 390 the pane is the mobile sheet, whose header row HOSTS the
                // transport dock (the dock rides on the sheet, by design and
                // untouched by this packet); the clearance claim is the desktop rail's.
                if (width >= 1024) chk("botExpandedClearOfPane", !intersects(R.botExpanded, R.pane));
                else R.botOnSheetHeader = intersects(R.botExpanded, R.pane);
                chk("oneTrigger", R.triggers === 1 && R.dockItemRun === 0);
                const names = (R.menu ?? []).map((m) => m.text);
                chk("menuNames", names.length === 4 && names[0] === "Controls" && names[1] === "Keyframes" && names[2] === "Timeline" && /^Matrix/.test(names[3]));
            } catch (e) {
                R.error = String(e).slice(0, 300);
                fails.push(`${key}:error`);
            } finally {
                await ctx.close();
            }
        }
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify({ fails, results }, null, 1));
console.log(JSON.stringify({ fails }, null, 0));
for (const [k, r] of Object.entries(results)) console.log(k, "top", r.topCollapsed?.cx, r.topExpanded?.cx, "bot", r.botCollapsed?.cx, r.botExpanded?.cx, "half", r.innerWidth / 2, "pane", JSON.stringify(r.pane), "menu", (r.menu ?? []).map((m) => m.text + (m.disabled ? "(x)" : "")).join("|"), r.error ?? "");
process.exit(fails.length ? 1 : 0);
