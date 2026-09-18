// PaletteCardMenu — CHALLENGE-C pass 4, probe E
// Is the trigger/menu-item collision an edge case or the general geometry?
//  E1  desktop: open EVERY card's menu in turn; record which neighbouring
//      triggers fall inside which menu item (both flip directions)
//  E2  mobile 390: the same sweep
//  E3  keyboard control: with a menu open, can a keyboard user reach another
//      card's trigger at all? (focus trap check)
import { chromium, devices } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };
const NOW = new Date().toISOString();
const SEED = (n) => ({
    version: 1,
    palettes: Array.from({ length: n }, (_, i) => ({
        id: `seed${i}`, name: `Probe Palette ${i}`, slug: `probe-${i}`, isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }],
    })),
});

const SWEEP = () => {
    const menu = document.querySelector('[role="menu"]');
    if (!menu) return null;
    const mr = menu.getBoundingClientRect();
    const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
    const trigs = Array.from(document.querySelectorAll('[aria-label="Palette menu"]'));
    const covered = [];
    trigs.forEach((t, i) => {
        const r = t.getBoundingClientRect();
        const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
        const hit = items.find((it) => {
            const ir = it.getBoundingClientRect();
            return cx >= ir.x && cx <= ir.right && cy >= ir.top && cy <= ir.bottom;
        });
        if (hit) {
            const ir = hit.getBoundingClientRect();
            covered.push({ trigger: i, item: hit.textContent.trim().replace(/\s+/g, " ").slice(0, 18),
                           offsetFromItemCentre: +(cy - (ir.top + ir.height / 2)).toFixed(1) });
        }
    });
    return { owner: menu.firstElementChild ? menu.firstElementChild.textContent.trim() : null,
             side: menu.getAttribute("data-side"),
             menuY: +mr.y.toFixed(1), menuH: +mr.height.toFixed(1),
             covered };
};

const browser = await chromium.launch();

// ── E1 desktop sweep ─────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED(8));
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);
    const n = await page.locator('[aria-label="Palette menu"]').count();
    const rows = [];
    for (let i = 0; i < n; i++) {
        const loc = page.locator('[aria-label="Palette menu"]').nth(i);
        await loc.scrollIntoViewIfNeeded().catch(() => {});
        await page.waitForTimeout(200);
        await loc.click();
        await page.waitForTimeout(420);
        const s = await page.evaluate(SWEEP);
        rows.push({ opened: i, ...(s || { owner: null, covered: [] }) });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
    }
    log("E1_desktopSweep", rows);
    log("E1_summary", {
        cards: n,
        openingsWithACoveredTrigger: rows.filter((r) => r.covered.length).length,
        openingsThatCoverDelete: rows.filter((r) => r.covered.some((c) => /^Delete$/i.test(c.item))).length,
        distinctCoveredItems: [...new Set(rows.flatMap((r) => r.covered.map((c) => c.item)))],
    });

    // ── E3 : keyboard reach while a menu is open ─────────────────────────────
    await page.locator('[aria-label="Palette menu"]').nth(3).click();
    await page.waitForTimeout(400);
    const keys = [];
    for (const k of ["Tab", "Shift+Tab", "ArrowDown", "Escape"]) {
        await page.keyboard.press(k);
        await page.waitForTimeout(220);
        keys.push({ key: k, ...(await page.evaluate(() => {
            const a = document.activeElement;
            return { menus: document.querySelectorAll('[role="menu"]').length,
                     active: a ? `${a.tagName}${a.getAttribute("role") ? "{" + a.getAttribute("role") + "}" : ""}` : null,
                     activeText: a ? (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 24) : null,
                     insideMenu: !!(a && a.closest && a.closest('[role="menu"]')) };
        })) });
    }
    log("E3_keyboardWhileOpen", keys);
    await ctx.close();
}

// ── E2 mobile sweep ──────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ ...devices["iPhone 14"] });
    await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED(8));
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForTimeout(2400);
    const n = await page.locator('[aria-label="Palette menu"]').count();
    const rows = [];
    for (let i = 0; i < n; i++) {
        const loc = page.locator('[aria-label="Palette menu"]').nth(i);
        await loc.scrollIntoViewIfNeeded().catch(() => {});
        await page.waitForTimeout(220);
        await loc.tap({ force: true });
        await page.waitForTimeout(480);
        const s = await page.evaluate(SWEEP);
        rows.push({ opened: i, ...(s || { owner: null, covered: [] }) });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
    }
    log("E2_mobileSweep", rows);
    log("E2_summary", {
        cards: n,
        openingsWithACoveredTrigger: rows.filter((r) => r.covered.length).length,
        openingsThatCoverDelete: rows.filter((r) => r.covered.some((c) => /^Delete$/i.test(c.item))).length,
        sides: [...new Set(rows.map((r) => r.side))],
    });
    await ctx.close();
}

writeFileSync(new URL("./pcm-p4-e-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
