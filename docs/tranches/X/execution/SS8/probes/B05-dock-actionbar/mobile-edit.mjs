// SERVED MODEL: claude-opus-5-5 — SS-8 B05 ABT L-1/ABT-2 limb: LIVE witness of the mobile
// edit Save/Cancel (390x844 touch). Headless Chromium; one browser; one context per cell; closed
// in finally. Local seed only (localStorage), no server writes.
// Cells: save — edit swatch 1, move the colour with the keyboard on a slider, tap "Save edit",
//               assert the stored swatch changed.  cancel — same, tap "Cancel edit", assert it did not.
import { chromium } from "playwright";
import { save, ORIGIN } from "./lib.mjs";
import { hue } from "../b15-seed.mjs";

const PANEL = '[aria-label^="Actions for"]';
const stored = (p) => p.evaluate(() => { try { return JSON.parse(localStorage.getItem("color-picker")).savedColors; } catch { return null; } });

async function run(browser, arm) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const out = { arm };
    try {
        const cur = hue(5, 10);
        await ctx.addInitScript((c) => { try { localStorage.setItem("vueuse-color-scheme", "light"); localStorage.setItem("color-picker", JSON.stringify({ inputColor: c[c.length - 1], savedColors: c })); } catch {} }, cur);
        const p = await ctx.newPage();
        const errs = []; p.on("pageerror", (e) => errs.push(e.message.slice(0, 160)));
        await p.goto(`${ORIGIN}/#/palettes`, { waitUntil: "load", timeout: 90000 });
        await p.locator(".swatch-row button[aria-label^='Color swatch']").nth(1).waitFor({ timeout: 60000 });
        await p.waitForTimeout(1500);
        out.before = await stored(p);
        await p.locator(".swatch-row button[aria-label^='Color swatch']").nth(1).tap();
        await p.locator(PANEL).first().waitFor({ state: "visible", timeout: 5000 });
        await p.locator(`${PANEL} button[aria-label^='Edit color']`).first().tap();
        await p.waitForTimeout(1000);
        out.layer = await p.evaluate(() => [...document.querySelectorAll("[aria-label='Save edit'],[aria-label='Cancel edit']")].map((e) => ({ l: e.getAttribute("aria-label"), inert: !!e.closest("[inert]"), w: e.getBoundingClientRect().width })));
        // Move the colour: a role=slider on screen, keyboard (a real input path).
        const sliders = p.locator('[role="slider"]');
        out.sliderCount = await sliders.count();
        let moved = null;
        for (let i = 0; i < out.sliderCount && !moved; i++) {
            const s = sliders.nth(i);
            if (!(await s.isVisible().catch(() => false))) continue;
            const v0 = await s.getAttribute("aria-valuenow");
            await s.focus();
            for (let k = 0; k < 15; k++) await p.keyboard.press("ArrowLeft");
            await p.waitForTimeout(300);
            const v1 = await s.getAttribute("aria-valuenow");
            if (v0 !== v1) moved = { idx: i, label: await s.getAttribute("aria-label"), v0, v1 };
        }
        out.moved = moved;
        out.titleDuringEdit = await p.title();
        const btn = p.getByRole("button", { name: arm === "save" ? "Save edit" : "Cancel edit" });
        await btn.tap({ timeout: 4000 }).then(() => (out.tap = "tapped"), (e) => (out.tap = "refused: " + e.message.split("\n")[0].slice(0, 120)));
        await p.waitForTimeout(1200);
        out.after = await stored(p);
        out.changedIdx = (out.before ?? []).map((c, i) => (c !== out.after?.[i] ? i : -1)).filter((i) => i >= 0);
        out.layerAfter = await p.evaluate(() => [...document.querySelectorAll("[aria-label='Save edit']")].map((e) => ({ inert: !!e.closest("[inert]") })));
        out.errors = errs;
        await p.screenshot({ path: new URL(`../../evidence/B05-dock-actionbar/mobile-edit-${arm}-390.png`, import.meta.url).pathname });
    } catch (e) { out.ERROR = String(e.message).split("\n")[0]; }
    finally { await ctx.close(); }
    return out;
}

const browser = await chromium.launch();
try {
    const r = {};
    for (const arm of ["save", "cancel"]) { r[arm] = await run(browser, arm); console.log(arm, "done"); }
    save("mobile-edit.json", r);
} finally { await browser.close(); }
