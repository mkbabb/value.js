// PaletteCardMenu — CHALLENGE-C pass 3, probe E
// Independent re-test of the pass-2 BLOCKER C2-1 (dead actions at unbound hosts)
// plus a NEW question pass 2 left open: on `/#/mix` the menu trigger sits inside
// a selection <button> — does opening the menu, or dismissing it, flip the
// selection state that button owns?
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: Array.from({ length: 5 }, (_, i) => ({
        id: `seed${i}`, name: `Probe Palette ${i}`, slug: `probe-${i}`, isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }],
    })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 } });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
const errs = [], warns = [];
page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
page.on("console", (m) => { if (m.type() === "warning" || m.type() === "error") warns.push(m.text().slice(0, 160)); });

await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
// switch to the Palettes source mode if there is a toggle
const modeBtn = page.getByRole("button", { name: /^Palettes$/ }).first();
if (await modeBtn.count()) { await modeBtn.click(); await page.waitForTimeout(900); }

log("E0_mixState", await page.evaluate(() => ({
    cards: document.querySelectorAll('[role="article"]').length,
    nestedButtons: document.querySelectorAll("button button").length,
    triggers: document.querySelectorAll('[aria-label="Palette menu"]').length,
    pressedStates: Array.from(document.querySelectorAll("button[aria-pressed]")).map((b) => b.getAttribute("aria-pressed")),
    storeN: JSON.parse(localStorage.getItem("color-palettes") || '{"palettes":[]}').palettes.length,
})));

// NEW: does opening the menu flip the enclosing selection button?
const pressedBefore = await page.evaluate(() =>
    Array.from(document.querySelectorAll("button[aria-pressed]")).map((b) => b.getAttribute("aria-pressed")));
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(500);
const pressedAfterOpen = await page.evaluate(() =>
    Array.from(document.querySelectorAll("button[aria-pressed]")).map((b) => b.getAttribute("aria-pressed")));
log("E1_selectionOnMenuOpen", { pressedBefore, pressedAfterOpen,
    menus: await page.evaluate(() => document.querySelectorAll('[role="menu"]').length),
    items: await page.evaluate(() => Array.from(document.querySelectorAll('[role="menuitem"]')).map((e) => (e.textContent || "").trim())) });

// re-test C2-1: Delete on an unbound host
const storeBefore = await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.length);
await page.getByRole("menuitem", { name: /^Delete$/ }).click();
await page.waitForTimeout(1200);
log("E2_deleteOnMix", {
    storeBefore,
    storeAfter: await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.length),
    cards: await page.evaluate(() => document.querySelectorAll('[role="article"]').length),
    menus: await page.evaluate(() => document.querySelectorAll('[role="menu"]').length),
    pressedAfterDelete: await page.evaluate(() =>
        Array.from(document.querySelectorAll("button[aria-pressed]")).map((b) => b.getAttribute("aria-pressed"))),
    consoleSinceStart: warns.slice(-4),
});

// control on a bound host
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const ctrlBefore = await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.length);
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(450);
await page.getByRole("menuitem", { name: /^Delete$/ }).click();
await page.waitForTimeout(1200);
log("E3_deleteOnPalettes_CONTROL", {
    storeBefore: ctrlBefore,
    storeAfter: await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.length),
    cards: await page.evaluate(() => document.querySelectorAll('[role="article"]').length),
    confirmDialogs: await page.evaluate(() => document.querySelectorAll('[role="dialog"], [role="alertdialog"]').length),
});

log("errs", errs);
writeFileSync(new URL("./pcm-p3-e-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
