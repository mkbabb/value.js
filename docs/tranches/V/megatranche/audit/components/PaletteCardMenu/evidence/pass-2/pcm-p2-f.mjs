// PaletteCardMenu — CHALLENGE-C pass 2, probe F
// DEAD ACTIONS at a host that binds no listeners (/#/mix, MixSourceSelector).
// Control is probe E (/#/palettes → Delete removes the palette, 8 → 7).
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: Array.from({ length: 8 }, (_, i) => ({
        id: `seed${i}`, name: `Probe Palette ${i}`, slug: `probe-${i}`, isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }],
    })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
const pageErrors = []; const dl = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));
page.on("download", (d) => dl.push(d.suggestedFilename()));

const storeN = () => page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.length);

await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.evaluate(() => {
    const t = Array.from(document.querySelectorAll("button"))
        .find((b) => b.textContent.trim() === "Palettes" && !b.getAttribute("aria-label"));
    t?.click();
});
await page.waitForTimeout(1500);
log("mix_cards", await page.locator('[role="article"]').count());
log("mix_storeBefore", await storeN());

const trig = page.locator('[aria-label="Palette menu"]').first();
await trig.click();
await page.waitForTimeout(500);
log("mix_menuItems", await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="menuitem"]')).map((e) => e.textContent.replace(/\s+/g, " ").trim())));

await page.getByRole("menuitem", { name: /^Delete$/ }).click();
await page.waitForTimeout(1500);
log("mix_afterDelete", {
    storeN: await storeN(),
    cards: await page.locator('[role="article"]').count(),
    feedback: await page.evaluate(() => document.querySelector(".feedback-chip")?.textContent?.trim() ?? null),
    dialog: await page.evaluate(() => document.querySelector('[role="dialog"],[role="alertdialog"]')?.textContent?.slice(0, 80) ?? null),
    menusInDom: await page.locator('[role="menu"]').count(),
});

// Export → JSON on the same dead host
await trig.click();
await page.waitForTimeout(450);
await page.locator('[role="menuitem"][aria-haspopup="menu"]').hover();
await page.waitForTimeout(800);
const json = page.getByRole("menuitem", { name: /^JSON$/ });
log("mix_jsonItemPresent", await json.count());
if (await json.count()) { await json.click(); await page.waitForTimeout(2000); }
log("mix_downloads", dl);
log("mix_feedbackAfterExport", await page.evaluate(() => document.querySelector(".feedback-chip")?.textContent?.trim() ?? null));

// Rename on the same dead host — does the inline input even appear?
await trig.click();
await page.waitForTimeout(450);
const ren = page.getByRole("menuitem", { name: /^Rename$/ });
log("mix_renameItemPresent", await ren.count());
if (await ren.count()) { await ren.click(); await page.waitForTimeout(900); }
log("mix_renameInputAppeared", await page.locator('[role="article"] input').count());
log("mix_selectionToggledByMenuUse", await page.evaluate(() =>
    Array.from(document.querySelectorAll('button[aria-pressed]')).slice(0, 4)
        .map((b) => ({ label: b.getAttribute("aria-label"), pressed: b.getAttribute("aria-pressed") }))));

// ── CONTROL on /#/palettes: the same Export → JSON, which IS bound ──────────
dl.length = 0;
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(450);
await page.locator('[role="menuitem"][aria-haspopup="menu"]').hover();
await page.waitForTimeout(800);
const json2 = page.getByRole("menuitem", { name: /^JSON$/ });
if (await json2.count()) { await json2.click(); await page.waitForTimeout(2500); }
log("palettes_downloads_CONTROL", dl);
log("palettes_feedback_CONTROL", await page.evaluate(() => document.querySelector(".feedback-chip")?.textContent?.trim() ?? null));

// ── scroll under an open modal menu (body lock vs inner scroller) ──────────
await page.keyboard.press("Escape").catch(() => {});
await page.waitForTimeout(400);
const scroller = await page.evaluateHandle(() => {
    let best = null;
    document.querySelectorAll("div").forEach((el) => {
        if (el.scrollHeight > el.clientHeight + 40 && ["auto", "scroll"].includes(getComputedStyle(el).overflowY)) {
            if (!best || el.scrollHeight > best.scrollHeight) best = el;
        }
    });
    return best;
});
await page.locator('[aria-label="Palette menu"]').nth(1).click();
await page.waitForTimeout(450);
const p0 = await page.evaluate(() => {
    const t = document.querySelectorAll('[aria-label="Palette menu"]')[1].getBoundingClientRect();
    const m = document.querySelector('[role="menu"]').getBoundingClientRect();
    return { triggerTop: +t.top.toFixed(1), menuTop: +m.top.toFixed(1), delta: +(m.top - t.top).toFixed(1) };
});
log("anchor_beforeScroll", p0);
log("scrollAttempt", await page.evaluate((el) => {
    const b = el.scrollTop; el.scrollTop = b + 320; return { before: b, after: el.scrollTop, moved: el.scrollTop !== b };
}, scroller));
await page.waitForTimeout(600);
const p1 = await page.evaluate(() => {
    const t = document.querySelectorAll('[aria-label="Palette menu"]')[1]?.getBoundingClientRect();
    const m = document.querySelector('[role="menu"]')?.getBoundingClientRect();
    return m && t ? { triggerTop: +t.top.toFixed(1), menuTop: +m.top.toFixed(1), delta: +(m.top - t.top).toFixed(1) } : { gone: true };
});
log("anchor_afterScroll", p1);

log("pageErrors", pageErrors);
writeFileSync(new URL("./pcm-p2-f-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
