// PaletteCardMenu — CHALLENGE-C pass 2, probe H
// POSITIVE CONTROL for K-INV5: trip the latch to `unavailable` (a real network
// failure) and confirm the Publish item DOES disable + annotate. This isolates
// the C-2 defect to the `misconfigured` state specifically.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const HOST = process.env.PROBE_HOST || "http://192.168.1.166:9000";
const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: Array.from({ length: 3 }, (_, i) => ({
        id: `seed${i}`, name: `Probe Palette ${i}`, slug: `probe-${i}`, isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }],
    })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
let apiHits = 0;
await page.route("**://api.color.babb.dev/**", (route) => { apiHits++; return route.abort("connectionrefused"); });

// 1. visit browse so a real fetch fails and trips the latch
await page.goto(`${HOST}/#/browse`, { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
log("apiHits", apiHits);
log("browseEmptyState", (await page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 300));
log("lampVariants", await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-variant]")).map((e) => ({
        v: e.getAttribute("data-variant"), role: e.getAttribute("role"),
        text: e.textContent.replace(/\s+/g, " ").trim().slice(0, 60),
    }))));

// 2. now the saved-palette menu
await page.goto(`${HOST}/#/palettes`, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
log("cards", await page.locator('[role="article"]').count());
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(500);
log("itemsUnderUnavailableLatch", await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="menuitem"]')).map((el) => ({
        text: el.textContent.replace(/\s+/g, " ").trim(),
        ariaDisabled: el.getAttribute("aria-disabled"),
        dataDisabled: el.getAttribute("data-disabled"),
        pe: getComputedStyle(el).pointerEvents,
    }))));

const cdp = await ctx.newCDPSession(page);
await cdp.send("Accessibility.enable");
const t = await cdp.send("Accessibility.getFullAXTree");
log("axNames", t.nodes.filter((n) => n.role?.value === "menuitem")
    .map((n) => ({ name: n.name?.value, disabled: n.properties?.find((p) => p.name === "disabled")?.value?.value ?? null })));

// 3. is Delete still live while the API is down? (the latch gates only Publish)
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
log("errs", errs);
writeFileSync(new URL("./pcm-p2-h-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
