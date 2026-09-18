// PaletteCardMenu — CHALLENGE-C pass 2, probe E
// Isolate the leaked pointer-blocking overlay: census overlays at each step of
// the menu→Delete flow, and after a route change.
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

const census = (page, tag) => page.evaluate((tag) => {
    const overlays = Array.from(document.querySelectorAll('.fixed, [data-state="open"]'))
        .filter((e) => {
            const cs = getComputedStyle(e);
            return cs.position === "fixed" && e.getBoundingClientRect().width > 300;
        })
        .map((e) => ({
            cls: (e.className || "").toString().slice(0, 70),
            state: e.getAttribute("data-state"),
            ariaHidden: e.getAttribute("aria-hidden"),
            pe: getComputedStyle(e).pointerEvents,
            z: getComputedStyle(e).zIndex,
            w: Math.round(e.getBoundingClientRect().width),
            h: Math.round(e.getBoundingClientRect().height),
        }));
    // what is on top at the card row?
    const card = document.querySelector('[role="article"]');
    let hit = null;
    if (card) {
        const r = card.getBoundingClientRect();
        const el = document.elementFromPoint(r.left + r.width - 20, r.top + 20);
        hit = el ? { tag: el.tagName, cls: (el.className || "").toString().slice(0, 70), label: el.getAttribute("aria-label") } : null;
    }
    return {
        tag,
        overlays,
        bodyPE: document.body.style.pointerEvents,
        bodyOverflow: document.body.style.overflow,
        menus: document.querySelectorAll('[role="menu"]').length,
        articles: document.querySelectorAll('[role="article"]').length,
        elementAtCardMenuCorner: hit,
    };
}, tag);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));

await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
log("E0_fresh", await census(page, "fresh"));

await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(450);
log("E1_menuOpen", await census(page, "menuOpen"));

await page.getByRole("menuitem", { name: /^Delete$/ }).click();
await page.waitForTimeout(1200);
log("E2_afterDelete", await census(page, "afterDelete"));
log("E2_storeN", await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.length));

// can we still click a trigger?
let clickable = "yes";
try {
    await page.locator('[aria-label="Palette menu"]').first().click({ timeout: 3000 });
    await page.waitForTimeout(300);
} catch (e) { clickable = "BLOCKED: " + String(e).slice(0, 120); }
log("E3_triggerClickableAfterDelete", clickable);
log("E3_census", await census(page, "afterSecondClickAttempt"));

await page.keyboard.press("Escape");
await page.waitForTimeout(400);

// route change
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(1800);
log("E4_afterRouteChange", await census(page, "afterRouteChange"));

// ── control: menu open then Escape (no delete) ─────────────────────────────
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(1800);
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(400);
await page.keyboard.press("Escape");
await page.waitForTimeout(600);
log("E5_controlEscapeNoDelete", await census(page, "controlEscape"));
let clickable2 = "yes";
try { await page.locator('[aria-label="Palette menu"]').first().click({ timeout: 3000 }); }
catch (e) { clickable2 = "BLOCKED: " + String(e).slice(0, 120); }
log("E5_triggerClickable", clickable2);
await page.keyboard.press("Escape");
await page.waitForTimeout(400);

// ── control 2: menu open then Rename (card survives) ───────────────────────
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(400);
await page.getByRole("menuitem", { name: /^Rename$/ }).click();
await page.waitForTimeout(900);
log("E6_afterRename", await census(page, "afterRename"));

log("pageErrors", pageErrors);
writeFileSync(new URL("./pcm-p2-e-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
