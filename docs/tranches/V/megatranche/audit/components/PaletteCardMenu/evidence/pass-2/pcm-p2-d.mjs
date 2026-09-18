// PaletteCardMenu — CHALLENGE-C pass 2, probe D
// (1) DEAD ACTIONS: on /#/mix the host binds no listeners — does Delete delete?
//     Control: the same Delete on /#/palettes (which DOES bind @delete).
// (2) modal scroll-lock targets <body> but the app scrolls an inner div —
//     is the page really inert behind the open menu, and does the menu track?
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = {
    version: 1,
    palettes: Array.from({ length: 12 }, (_, i) => ({
        id: `seed${i}`, name: `Probe Palette ${String(i).padStart(2, "0")}`, slug: `probe-${i}`,
        isLocal: true, createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }, { css: "#3355ff", position: 2 }],
    })),
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((seed) => localStorage.setItem("color-palettes", JSON.stringify(seed)), SEED);
const page = await ctx.newPage();
const pageErrors = []; const consoleAll = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));
page.on("console", (m) => consoleAll.push(m.type() + ": " + m.text().slice(0, 160)));

const storeNames = () => page.evaluate(() =>
    JSON.parse(localStorage.getItem("color-palettes") || "{}").palettes?.map((p) => p.name) ?? []);

// ── (1a) CONTROL: /#/palettes — Delete IS bound (@delete) ───────────────────
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
log("palettes_cards", await page.locator('[role="article"]').count());
log("palettes_storeBefore", (await storeNames()).length);
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(400);
await page.getByRole("menuitem", { name: /^Delete$/ }).click();
await page.waitForTimeout(900);
// a confirm dialog may stand between; capture whatever is on screen
log("palettes_afterDelete_dialogText", await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"],[role="alertdialog"]');
    return d ? d.textContent.replace(/\s+/g, " ").trim().slice(0, 220) : null;
}));
const confirmBtn = page.getByRole("button", { name: /^(Delete|Confirm|Yes)/ });
if (await confirmBtn.count()) { await confirmBtn.first().click().catch(() => {}); await page.waitForTimeout(800); }
log("palettes_storeAfter", (await storeNames()).length);
log("palettes_cardsAfter", await page.locator('[role="article"]').count());

// ── (1b) SUBJECT: /#/mix palettes mode — no listeners bound at the host ─────
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
// the source-mode toggle lives inside the Mix pane (text "Palettes"), NOT the nav
await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const t = btns.find((b) => b.textContent.trim() === "Palettes" && !b.getAttribute("aria-label"));
    t?.click();
});
await page.waitForTimeout(1500);
log("mix_cards", await page.locator('[role="article"]').count());
const mixBefore = await storeNames();
log("mix_storeBefore", { n: mixBefore.length, first: mixBefore[0] });

const mixTrigger = page.locator('[aria-label="Palette menu"]').first();
await mixTrigger.click();
await page.waitForTimeout(500);
log("mix_menuItems", await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="menuitem"]')).map((e) => e.textContent.replace(/\s+/g, " ").trim())));

// Delete
await page.getByRole("menuitem", { name: /^Delete$/ }).click();
await page.waitForTimeout(1200);
const mixAfterDelete = await storeNames();
log("mix_afterDelete", {
    storeN: mixAfterDelete.length,
    first: mixAfterDelete[0],
    cards: await page.locator('[role="article"]').count(),
    dialog: await page.evaluate(() => {
        const d = document.querySelector('[role="dialog"],[role="alertdialog"]');
        return d ? d.textContent.replace(/\s+/g, " ").trim().slice(0, 160) : null;
    }),
    feedbackChip: await page.evaluate(() => {
        const c = document.querySelector(".feedback-chip");
        return c ? c.textContent.replace(/\s+/g, " ").trim() : null;
    }),
    menuStillOpen: await page.locator('[role="menu"]').count(),
});

// Export → JSON (a download would prove liveness)
const dl = [];
page.on("download", (d) => dl.push(d.suggestedFilename()));
await mixTrigger.click();
await page.waitForTimeout(400);
await page.locator('[role="menuitem"][aria-haspopup="menu"]').hover();
await page.waitForTimeout(700);
const jsonItem = page.getByRole("menuitem", { name: /^JSON$/ });
log("mix_exportSubmenuReachable", await jsonItem.count());
if (await jsonItem.count()) { await jsonItem.click().catch(() => {}); await page.waitForTimeout(1500); }
log("mix_downloadsAfterExportJSON", dl);
log("mix_clipboardOrFeedback", await page.evaluate(() => {
    const c = document.querySelector(".feedback-chip");
    return c ? c.textContent.replace(/\s+/g, " ").trim() : null;
}));

// ── (2) scroll under an open modal menu ────────────────────────────────────
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
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
await page.waitForTimeout(400);
const pos0 = await page.evaluate(() => {
    const t = document.querySelectorAll('[aria-label="Palette menu"]')[1].getBoundingClientRect();
    const c = document.querySelector('[role="menu"]').getBoundingClientRect();
    return { triggerTop: +t.top.toFixed(1), menuTop: +c.top.toFixed(1), delta: +(c.top - t.top).toFixed(1) };
});
log("menuAnchor_beforeScroll", pos0);
const scrolled = await page.evaluate((el) => { const b = el.scrollTop; el.scrollTop = b + 300; return { before: b, after: el.scrollTop }; }, scroller);
log("innerScrollUnderOpenModal", scrolled);
await page.waitForTimeout(500);
const pos1 = await page.evaluate(() => {
    const t = document.querySelectorAll('[aria-label="Palette menu"]')[1].getBoundingClientRect();
    const c = document.querySelector('[role="menu"]')?.getBoundingClientRect();
    return c ? { triggerTop: +t.top.toFixed(1), menuTop: +c.top.toFixed(1), delta: +(c.top - t.top).toFixed(1) } : { menuGone: true };
});
log("menuAnchor_afterScroll", pos1);
log("pageErrors", pageErrors);
log("consoleErrors", consoleAll.filter((c) => c.startsWith("error")));

writeFileSync(new URL("./pcm-p2-d-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
