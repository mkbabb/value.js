// PaletteCardMenu — CHALLENGE-C pass 2, probe I
// Domain boundaries reached only through this menu's Export items:
//   (a) a zero-color palette (a state PaletteCard.vue:220-222 calls "real and reachable")
//   (b) a palette name carrying SVG-significant characters
import { chromium } from "playwright";
import { writeFileSync, readFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: [
        { id: "empty1", name: "Zero Color Palette", slug: "zero", isLocal: true,
          createdAt: NOW, updatedAt: NOW, colors: [] },
        { id: "hostile1", name: 'Ampersand & <tag> "quote"', slug: "hostile", isLocal: true,
          createdAt: NOW, updatedAt: NOW,
          colors: [{ css: "#ff0055", position: 0 }, { css: '#00ddaa" onload="alert(1)', position: 1 }] },
    ],
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
const errs = []; const warns = []; const dls = [];
page.on("pageerror", (e) => errs.push(String(e).slice(0, 250)));
page.on("console", (m) => { if (m.type() === "warning" || m.type() === "error") warns.push(m.type() + ": " + m.text().slice(0, 200)); });
page.on("download", (d) => dls.push(d));

await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
log("cards", await page.locator('[role="article"]').count());
log("cardLabels", await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="article"]')).map((e) => e.getAttribute("aria-label"))));

async function exportVia(cardIdx, itemName) {
    const before = dls.length; const wbefore = warns.length;
    await page.locator('[aria-label="Palette menu"]').nth(cardIdx).click();
    await page.waitForTimeout(400);
    await page.locator('[role="menuitem"][aria-haspopup="menu"]').hover();
    await page.waitForTimeout(700);
    const item = page.getByRole("menuitem", { name: itemName });
    if (!(await item.count())) { await page.keyboard.press("Escape"); return { reached: false }; }
    await item.click();
    await page.waitForTimeout(2200);
    const got = dls.slice(before);
    let body = null;
    if (got.length) {
        const p = await got[0].path();
        try { body = readFileSync(p, "utf8").slice(0, 700); } catch { body = "<binary>"; }
    }
    return {
        reached: true,
        downloads: got.map((d) => d.suggestedFilename()),
        newWarnings: warns.slice(wbefore),
        body,
    };
}

log("EMPTY_png", await exportVia(0, /^PNG Swatch$/));
log("EMPTY_svg", await exportVia(0, /^SVG Swatch$/));
log("EMPTY_json", await exportVia(0, /^JSON$/));
log("EMPTY_css", await exportVia(0, /^CSS Custom Properties$/));
log("HOSTILE_svg", await exportVia(1, /^SVG Swatch$/));
log("HOSTILE_png", await exportVia(1, /^PNG Swatch$/));

log("pageErrors", errs);
writeFileSync(new URL("./pcm-p2-i-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
