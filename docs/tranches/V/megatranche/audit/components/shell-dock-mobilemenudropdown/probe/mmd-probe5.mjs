// mmd-probe5 — the logged-in branch: unhandled rejection on "Regenerate slug",
// the mutex swap-delay path, and the logged-in menu's separator/geometry census.
import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => {
    localStorage.setItem("palette-user-slug", "audit-seat-slug");
});
const page = await ctx.newPage();
const unhandled = [];
const pageErrs = [];
const consoleErrs = [];
page.on("pageerror", (e) => pageErrs.push(String(e).slice(0, 200)));
page.on("console", (m) => { if (m.type() === "error") consoleErrs.push(m.text().slice(0, 160)); });

await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.evaluate(() => {
    window.__unhandled = [];
    window.addEventListener("unhandledrejection", (e) => {
        window.__unhandled.push(String(e.reason && (e.reason.message || e.reason)).slice(0, 160));
    });
});
await page.waitForTimeout(1200);

await page.locator('[aria-label="Menu"]').tap();
await page.waitForTimeout(400);

const loggedIn = await page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    return {
        rows: [...menu.children].map((el) => ({
            role: el.getAttribute("role"),
            text: (el.textContent || "").trim().slice(0, 22),
            h: Math.round(el.getBoundingClientRect().height),
        })),
        separators: menu.querySelectorAll('[role="separator"]').length,
        slugPill: (() => {
            const p = menu.querySelector(".slug-pill");
            if (!p) return null;
            const cs = getComputedStyle(p);
            return { cls: p.className, color: cs.color, borderColor: cs.borderTopColor, animation: cs.animationName, bgClip: cs.webkitBackgroundClip || cs.backgroundClip };
        })(),
    };
});
console.log("LOGGED-IN MENU =", JSON.stringify(loggedIn, null, 1));

// ── Regenerate slug: the unguarded async ────────────────────────────────────
await page.locator('[role="menuitem"]', { hasText: "Regenerate slug" }).first().click();
await page.waitForTimeout(2500);
const rej = await page.evaluate(() => window.__unhandled);
console.log("UNHANDLED REJECTIONS after 'Regenerate slug' =", JSON.stringify(rej));
console.log("pageErrors =", JSON.stringify(pageErrs));
console.log("visible feedback (any toast/alert/dialog)? =", await page.evaluate(() =>
    [...document.querySelectorAll('[role="alert"],[role="status"],[role="alertdialog"],[role="dialog"],[aria-live]')]
        .filter((e) => e.offsetParent !== null).map((e) => (e.textContent || "").trim().slice(0, 60))));
console.log("slug after =", await page.evaluate(() => localStorage.getItem("palette-user-slug")));
console.log("menu still open? =", await page.evaluate(() => !!document.querySelector('[role="menu"]')));

// ── the mutex swap: open the view-select, then tap the ⋮ ─────────────────────
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const vs = page.locator('.dock-select-trigger').first();
if (await vs.count()) {
    await vs.tap();
    await page.waitForTimeout(400);
    console.log("view-select open? =", await page.evaluate(() => !!document.querySelector('[role="listbox"],[role="menu"],[data-reka-popper-content-wrapper]')));
    const t0 = Date.now();
    await page.locator('[aria-label="Menu"]').tap();
    let openedAt = null;
    for (let i = 0; i < 40; i++) {
        if (await page.evaluate(() => !!document.querySelector('[role="menu"]'))) { openedAt = Date.now() - t0; break; }
        await page.waitForTimeout(25);
    }
    console.log("mobile menu opened after swap in ms =", openedAt);
}

await browser.close();
