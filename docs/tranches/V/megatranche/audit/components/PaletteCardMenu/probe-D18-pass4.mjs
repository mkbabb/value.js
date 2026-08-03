// CHALLENGE-D pass 4 — probe D18
//   C'. RTL, applied AFTER boot (index.html pins `dir="ltr"`, so the init-script
//       arm of D17 was invalid — re-instrumented here)
//   F.  the irreversible action: is there a confirmation, an undo, or a dialog?
//       measured against the app's OWN bulk-delete grammar in the same pane
//   G.  the side-flip photographs
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const ROUTE = `${ORIGIN}/#/palettes`;
const OUT = new URL(".", import.meta.url).pathname;

const mk = (i, name, n = 5) => ({
    id: `p-${i}`,
    slug: `pal-${i}-aaaaaaa`,
    name,
    isLocal: true,
    versionCount: 1,
    colors: Array.from({ length: n }, (_, k) => ({ css: `hsl(${(i * 47 + k * 31) % 360} 60% 55%)` })),
});
const SEED = {
    version: 1,
    palettes: [
        mk(1, "Muted Terracotta and Deep Sea Foam Study"),
        mk(2, "Second Palette"), mk(3, "Third Palette"), mk(4, "Fourth Palette"),
        mk(5, "Fifth Palette"), mk(6, "Sixth Palette"), mk(7, "Seventh Palette"),
        mk(8, "Eighth Palette"), mk(9, "Ninth Palette"), mk(10, "Tenth Palette"),
        mk(11, "Eleventh Palette"),
    ],
};
const results = {};

async function boot(ctx, viewport) {
    const page = await ctx.newPage();
    await page.setViewportSize(viewport);
    await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), SEED);
    await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2600);
    return page;
}

const browser = await chromium.launch();

// ───────────────────────────────────────────────────────────────────────────
// ARM C' — RTL, applied after boot
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await boot(ctx, { width: 1440, height: 900 });

    const ltr = await page.evaluate(() => {
        const t = document.querySelector('button[aria-label="Palette menu"]').getBoundingClientRect();
        const c = document.querySelectorAll('[role="article"]')[0].getBoundingClientRect();
        return { trigger: { x: +t.x.toFixed(1), right: +t.right.toFixed(1) }, card: { x: +c.x.toFixed(1), right: +c.right.toFixed(1) } };
    });

    await page.evaluate(() => {
        document.documentElement.setAttribute("dir", "rtl");
    });
    await page.waitForTimeout(600);
    const dirNow = await page.evaluate(() => ({
        attr: document.documentElement.getAttribute("dir"),
        computed: getComputedStyle(document.documentElement).direction,
    }));

    // where did the trigger go in RTL? (the card row is a flex row)
    const rowRtl = await page.evaluate(() => {
        const t = document.querySelector('button[aria-label="Palette menu"]').getBoundingClientRect();
        const c = document.querySelectorAll('[role="article"]')[0].getBoundingClientRect();
        const strip = document.querySelectorAll('[role="article"]')[0].firstElementChild;
        return {
            trigger: { x: +t.x.toFixed(1), right: +t.right.toFixed(1) },
            card: { x: +c.x.toFixed(1), right: +c.right.toFixed(1) },
        };
    });

    await page.locator('button[aria-label="Palette menu"]').first().click();
    await page.waitForTimeout(600);

    const menuRtl = await page.evaluate(() => {
        const menu = document.querySelector('[role="menu"]');
        const trig = document.querySelector('button[aria-label="Palette menu"]');
        const mr = menu.getBoundingClientRect();
        const tr = trig.getBoundingClientRect();
        // inject the annotated arm byte-for-byte as the SFC writes it
        const rows = [...menu.querySelectorAll('[role="menuitem"]')];
        const clone = rows[0].cloneNode(true);
        clone.setAttribute("data-probe", "annotated");
        clone.innerHTML =
            'Publish<span class="ml-auto fira-code text-mono-caption opacity-55 tracking-wide"' +
            ' style="font-variant: small-caps" data-probe-ann="1">private</span>';
        rows[0].parentElement.insertBefore(clone, rows[0]);
        const ann = clone.querySelector("[data-probe-ann]");
        const cr = clone.getBoundingClientRect();
        const ar = ann.getBoundingClientRect();
        const verb = clone.firstChild; // the text node "Publish"
        const range = document.createRange();
        range.selectNodeContents(clone);
        return {
            menuDirection: getComputedStyle(menu).direction,
            rowDirection: getComputedStyle(clone).direction,
            side: menu.getAttribute("data-side"),
            align: menu.getAttribute("data-align"),
            menu: { x: +mr.x.toFixed(1), right: +mr.right.toFixed(1), w: +mr.width.toFixed(1) },
            trigger: { x: +tr.x.toFixed(1), right: +tr.right.toFixed(1) },
            alignedEdge:
                Math.abs(mr.right - tr.right) < 1.5 ? "physical-right"
                : Math.abs(mr.x - tr.x) < 1.5 ? "physical-left" : "neither",
            row: { x: +cr.x.toFixed(1), right: +cr.right.toFixed(1), w: +cr.width.toFixed(1) },
            annotation: { x: +ar.x.toFixed(1), right: +ar.right.toFixed(1), w: +ar.width.toFixed(1) },
            annotationSits:
                ar.x - cr.x < cr.right - ar.right ? "at the physical LEFT of the row" : "at the physical RIGHT of the row",
            gapToRowStartEdge_inlineStart_RTL: +(cr.right - ar.right).toFixed(1),
            gapToRowEndEdge_inlineEnd_RTL: +(ar.x - cr.x).toFixed(1),
        };
    });

    await page.screenshot({ path: `${OUT}evidence/pass4-C-rtl-open.png`, clip: { x: 740, y: 380, width: 700, height: 420 } }).catch(() => {});

    // submenu side in RTL
    await page.locator('[role="menuitem"]', { hasText: "Export" }).first().hover();
    await page.waitForTimeout(800);
    const subRtl = await page.evaluate(() => {
        const menus = [...document.querySelectorAll('[role="menu"]')];
        if (menus.length < 2) return { menus: menus.length };
        const p = menus[0].getBoundingClientRect();
        const c = menus[1].getBoundingClientRect();
        return {
            menus: menus.length,
            parent: { x: +p.x.toFixed(1), right: +p.right.toFixed(1) },
            child: { x: +c.x.toFixed(1), right: +c.right.toFixed(1) },
            childSide: menus[1].getAttribute("data-side"),
            childOpensToward: c.x > p.x ? "physical right (outward in LTR, INWARD-over-parent in RTL)" : "physical left",
        };
    });
    await page.screenshot({ path: `${OUT}evidence/pass4-C-rtl-submenu.png`, clip: { x: 700, y: 380, width: 740, height: 460 } }).catch(() => {});

    results.C_rtl = { ltr, dirNow, rowRtl, menuRtl, subRtl };
    await ctx.close();
}

// ───────────────────────────────────────────────────────────────────────────
// ARM F — the irreversible action: confirmation / undo / dialog inventory
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await boot(ctx, { width: 1440, height: 900 });

    const before = await page.evaluate(() => ({
        cards: document.querySelectorAll('[role="article"]').length,
        dialogs: document.querySelectorAll('[role="dialog"], [role="alertdialog"]').length,
        stored: JSON.parse(localStorage.getItem("color-palettes") || "{}").palettes?.length ?? null,
    }));

    await page.locator('button[aria-label="Palette menu"]').first().click();
    await page.waitForTimeout(400);
    await page.locator('[role="menuitem"]', { hasText: "Delete" }).first().click();
    await page.waitForTimeout(900);

    const after = await page.evaluate(() => ({
        cards: document.querySelectorAll('[role="article"]').length,
        dialogs: document.querySelectorAll('[role="dialog"], [role="alertdialog"]').length,
        stored: JSON.parse(localStorage.getItem("color-palettes") || "{}").palettes?.length ?? null,
        bodyMentionsUndo: /undo/i.test(document.body.innerText),
        liveRegions: [...document.querySelectorAll("[aria-live]")].map((e) => ({
            live: e.getAttribute("aria-live"), text: e.textContent.trim().slice(0, 60),
        })),
        focused: document.activeElement ? `${document.activeElement.tagName}.${(document.activeElement.className||"").toString().slice(0,40)}` : null,
    }));

    // the app's OWN bulk grammar, in the same pane, for comparison
    await page.locator('button[aria-label="Delete all saved palettes"]').first().click().catch(() => {});
    await page.waitForTimeout(700);
    const bulk = await page.evaluate(() => {
        const d = document.querySelector('[role="dialog"], [role="alertdialog"]');
        return d
            ? { present: true, role: d.getAttribute("role"), text: d.textContent.trim().replace(/\s+/g, " ").slice(0, 220) }
            : { present: false };
    });

    results.F_irreversible = { before, afterSingleDelete: after, bulkDeleteGrammar: bulk };
    await ctx.close();
}

// ───────────────────────────────────────────────────────────────────────────
// ARM G — the side-flip photographs (top card vs bottom card)
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 820 } });
    const page = await boot(ctx, { width: 1440, height: 820 });
    const trigs = page.locator('button[aria-label="Palette menu"]');
    const n = await trigs.count();

    await trigs.nth(0).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}evidence/pass4-G-flip-top.png`, clip: { x: 740, y: 400, width: 700, height: 400 } });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);

    await trigs.nth(n - 1).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await trigs.nth(n - 1).click();
    await page.waitForTimeout(500);
    const box = await trigs.nth(n - 1).boundingBox();
    await page.screenshot({
        path: `${OUT}evidence/pass4-G-flip-bottom.png`,
        clip: { x: 740, y: Math.max(0, box.y - 300), width: 700, height: 400 },
    });
    results.G_flipShots = { cards: n, bottomTriggerY: +box.y.toFixed(1) };
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}probe-D18-pass4-results.json`, JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1));
