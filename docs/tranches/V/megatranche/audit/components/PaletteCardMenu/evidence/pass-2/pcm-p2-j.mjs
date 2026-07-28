// PaletteCardMenu — CHALLENGE-C pass 2, probe J
// Independent CAUSALITY test for the dead Export sub-trigger on pointer input.
// Hypothesis A: `@click.prevent` (:108) sets defaultPrevented, and reka's
//               MenuSubTrigger onClick bails on `event.defaultPrevented`.
// Hypothesis B: reka sub-triggers simply never open on click (design limit).
// Discriminator: dispatch a trusted-shaped click whose `defaultPrevented`
// getter is pinned false — only Hypothesis A predicts the submenu opens.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const SEED = { version: 1, palettes: [{ id: "s0", name: "Probe", slug: "probe", isLocal: true,
    createdAt: NOW, updatedAt: NOW, colors: [{ css: "#ff0055", position: 0 }] }] };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: true });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

const state = () => page.evaluate(() => {
    const st = document.querySelector('[role="menuitem"][aria-haspopup="menu"]');
    return {
        ariaExpanded: st?.getAttribute("aria-expanded") ?? null,
        dataState: st?.getAttribute("data-state") ?? null,
        menuCount: document.querySelectorAll('[role="menu"]').length,
        itemCount: document.querySelectorAll('[role="menuitem"]').length,
        disabledAttr: st?.getAttribute("data-disabled") ?? null,
    };
});

// ── control 1: an ordinary programmatic click (the .prevent path) ──────────
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(400);
log("J0_menuOpen", await state());
log("J1_plainClick", await page.evaluate(() => {
    const st = document.querySelector('[role="menuitem"][aria-haspopup="menu"]');
    const ev = new MouseEvent("click", { bubbles: true, cancelable: true, view: window });
    st.dispatchEvent(ev);
    return { defaultPreventedAfterDispatch: ev.defaultPrevented };
}));
await page.waitForTimeout(600);
log("J1_after", await state());

// ── discriminator: same click, defaultPrevented pinned false ───────────────
log("J2_pinnedClick", await page.evaluate(() => {
    const st = document.querySelector('[role="menuitem"][aria-haspopup="menu"]');
    const ev = new MouseEvent("click", { bubbles: true, cancelable: true, view: window });
    Object.defineProperty(ev, "defaultPrevented", { get: () => false, configurable: true });
    st.dispatchEvent(ev);
    return { pinned: ev.defaultPrevented };
}));
await page.waitForTimeout(700);
log("J2_after", await state());
log("J2_items", await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="menuitem"]')).map((e) => e.textContent.replace(/\s+/g, " ").trim())));

writeFileSync(new URL("./pcm-p2-j-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
