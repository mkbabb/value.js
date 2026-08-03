// PaletteCardMenu — CHALLENGE-C pass 4, probe C
// The overlay/pitch collision, exactly.
//  C1  with card0's menu open, map every OTHER card's trigger centre onto the
//      menu's item rects — which item sits on which trigger?
//  C2  translucency: is the covered trigger still visible through the menu?
//  C3  DESTRUCTIVE: click the trigger whose centre lands on `Delete`.
//      Does palette 0 disappear from the store?
//  C4  control: the same click with NO menu open.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };

const NOW = new Date().toISOString();
const mkSeed = () => ({
    version: 1,
    palettes: Array.from({ length: 6 }, (_, i) => ({
        id: `seed${i}`, name: `Probe Palette ${i}`, slug: `probe-${i}`, isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }, { css: "#3355ff", position: 2 }],
    })),
});

const storeNames = () => {
    try {
        const raw = localStorage.getItem("color-palettes");
        const p = JSON.parse(raw);
        return (p.palettes || []).map((x) => x.name);
    } catch { return null; }
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), mkSeed());
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);

log("C0_storeBefore", await page.evaluate(storeNames));

// open card0's menu
await page.locator('[aria-label="Palette menu"]').first().click();
await page.waitForTimeout(500);

// ── C1 : the collision map ───────────────────────────────────────────────────
const map = await page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    const mr = menu.getBoundingClientRect();
    const items = Array.from(menu.querySelectorAll('[role="menuitem"]')).map((it) => {
        const r = it.getBoundingClientRect();
        return { text: it.textContent.trim().replace(/\s+/g, " ").slice(0, 30),
                 x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1),
                 top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1) };
    });
    const trigs = Array.from(document.querySelectorAll('[aria-label="Palette menu"]')).map((t, i) => {
        const r = t.getBoundingClientRect();
        const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
        const hit = items.find((it) => cx >= it.x && cx <= it.x + it.w && cy >= it.top && cy <= it.bottom);
        const card = t.closest('[role="article"]');
        return {
            cardIndex: i,
            cardName: card ? card.getAttribute("aria-label") : null,
            cx: +cx.toFixed(1), cy: +cy.toFixed(1),
            insideMenuRect: cx >= mr.x && cx <= mr.right && cy >= mr.y && cy <= mr.bottom,
            landsOnItem: hit ? hit.text : null,
            elementFromPoint: (() => { const e = document.elementFromPoint(cx, cy); return e ? `${e.tagName.toLowerCase()}${e.getAttribute("role") ? "{" + e.getAttribute("role") + "}" : ""}` : null; })(),
        };
    });
    const cs = getComputedStyle(menu);
    return {
        menuRect: { x: +mr.x.toFixed(1), y: +mr.y.toFixed(1), w: +mr.width.toFixed(1), h: +mr.height.toFixed(1), bottom: +mr.bottom.toFixed(1) },
        menuStyle: { background: cs.backgroundColor, backdropFilter: cs.backdropFilter, opacity: cs.opacity, zIndex: cs.zIndex },
        cardPitch: (() => {
            const cards = Array.from(document.querySelectorAll('[role="article"]'));
            if (cards.length < 2) return null;
            return +(cards[1].getBoundingClientRect().y - cards[0].getBoundingClientRect().y).toFixed(1);
        })(),
        itemPitch: items.length > 1 ? +(items[1].top - items[0].top).toFixed(1) : null,
        items, trigs,
    };
});
log("C1_collisionMap", map);

// ── C2 : is the covered trigger visible through the menu? ────────────────────
const covered = map.trigs.filter((t) => t.landsOnItem);
log("C2_coveredTriggers", covered);
await page.screenshot({ path: new URL("./pass4-collision-open.png", import.meta.url).pathname });
if (covered.length) {
    const t = covered[0];
    await page.screenshot({
        path: new URL("./pass4-collision-zoom.png", import.meta.url).pathname,
        clip: { x: Math.max(0, t.cx - 230), y: Math.max(0, map.menuRect.y - 20), width: 300, height: Math.min(320, map.menuRect.h + 60) },
    });
}

// ── C3 : the destructive collision ───────────────────────────────────────────
const deleteVictim = map.trigs.find((t) => t.landsOnItem && /^Delete$/i.test(t.landsOnItem));
log("C3_deleteVictimTrigger", deleteVictim || null);
if (deleteVictim) {
    await page.mouse.move(deleteVictim.cx, deleteVictim.cy);
    await page.mouse.down();
    await page.mouse.up();
    await page.waitForTimeout(900);
    log("C3_afterClickOnThatTrigger", {
        store: await page.evaluate(storeNames),
        cards: await page.locator('[role="article"]').count(),
        menus: await page.locator('[role="menu"]').count(),
        dialogs: await page.locator('[role="dialog"], [role="alertdialog"]').count(),
    });
    await page.screenshot({ path: new URL("./pass4-after-stray-delete.png", import.meta.url).pathname });
}

// ── C4 : control — same coordinates, no menu open ────────────────────────────
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
const ctlIdx = deleteVictim ? deleteVictim.cardIndex : 2;
log("C4_control_storeBeforeControlClick", await page.evaluate(storeNames));
const cb = await page.locator('[aria-label="Palette menu"]').nth(Math.min(ctlIdx, (await page.locator('[aria-label="Palette menu"]').count()) - 1)).boundingBox();
if (cb) {
    await page.mouse.click(cb.x + cb.width / 2, cb.y + cb.height / 2);
    await page.waitForTimeout(500);
    log("C4_control_afterClick", {
        store: await page.evaluate(storeNames),
        menus: await page.locator('[role="menu"]').count(),
        openOwner: await page.evaluate(() => { const m = document.querySelector('[role="menu"]'); return m && m.firstElementChild ? m.firstElementChild.textContent.trim() : null; }),
    });
}

log("pageErrors", pageErrors);
writeFileSync(new URL("./pcm-p4-c-results.json", import.meta.url), JSON.stringify(OUT, null, 2));
await browser.close();
