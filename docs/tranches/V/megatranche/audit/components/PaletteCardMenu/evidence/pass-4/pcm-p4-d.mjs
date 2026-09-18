// PaletteCardMenu — CHALLENGE-C pass 4, probe D
// How visible is the covered trigger, and does the collision hold on a phone?
//  D1  crop the covered trigger's 36x36 box with the menu OPEN and CLOSED;
//      per-pixel delta + the ⋯ glyph's contrast through the menu surface
//  D2  determinism: repeat the stray Delete twice more
//  D3  after a stray Delete, is there any undo affordance in the DOM?
//  D4  the same collision on a 390px touch viewport (card pitch differs)
import { chromium, devices } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = {};
const log = (k, v) => { OUT[k] = v; console.log("::" + k, JSON.stringify(v, null, 1)); };
const NOW = new Date().toISOString();
const mkSeed = (n = 6) => ({
    version: 1,
    palettes: Array.from({ length: n }, (_, i) => ({
        id: `seed${i}`, name: `Probe Palette ${i}`, slug: `probe-${i}`, isLocal: true,
        createdAt: NOW, updatedAt: NOW,
        colors: [{ css: "#ff0055", position: 0 }, { css: "#00ddaa", position: 1 }, { css: "#3355ff", position: 2 }],
    })),
});
const storeNames = () => { try { return JSON.parse(localStorage.getItem("color-palettes")).palettes.map((x) => x.name); } catch { return null; } };

const browser = await chromium.launch();

// ─────────── D1 / D2 / D3 : desktop ───────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), mkSeed(8));
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);

    const trigBox = async (i) => await page.locator('[aria-label="Palette menu"]').nth(i).boundingBox();

    // closed crop of trigger #2
    const b2 = await trigBox(2);
    const clip = { x: Math.round(b2.x), y: Math.round(b2.y), width: Math.round(b2.width), height: Math.round(b2.height) };
    const closedBuf = await page.screenshot({ clip });
    // open card0's menu, re-crop the SAME rect
    await page.locator('[aria-label="Palette menu"]').first().click();
    await page.waitForTimeout(600);
    const openBuf = await page.screenshot({ clip });

    writeFileSync(new URL("./pass4-trigger-closed.png", import.meta.url).pathname, closedBuf);
    writeFileSync(new URL("./pass4-trigger-under-menu.png", import.meta.url).pathname, openBuf);
    // decode both crops in a blank page via canvas (no node image dep)
    const decoder = await ctx.newPage();
    await decoder.goto("about:blank");
    log("D1_coveredTriggerVisibility", await decoder.evaluate(async ([a, b, rect]) => {
        const read = async (b64) => {
            const img = new Image();
            img.src = "data:image/png;base64," + b64;
            await img.decode();
            const c = document.createElement("canvas");
            c.width = img.width; c.height = img.height;
            const g = c.getContext("2d");
            g.drawImage(img, 0, 0);
            const d = g.getImageData(0, 0, c.width, c.height).data;
            const lum = [];
            let min = 255, max = 0, sum = 0;
            for (let i = 0; i < d.length; i += 4) {
                const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
                lum.push(l); if (l < min) min = l; if (l > max) max = l; sum += l;
            }
            return { w: c.width, h: c.height, lum, min, max, mean: sum / lum.length };
        };
        const A = await read(a), B = await read(b);
        const rl = (l255) => { const c = l255 / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
        const ratio = (x, y) => { const X = rl(x), Y = rl(y); return +((Math.max(X, Y) + 0.05) / (Math.min(X, Y) + 0.05)).toFixed(2); };
        let diff = 0, maxD = 0;
        const n = Math.min(A.lum.length, B.lum.length);
        for (let i = 0; i < n; i++) { const d = Math.abs(A.lum[i] - B.lum[i]); if (d > 8) diff++; if (d > maxD) maxD = d; }
        return {
            cropRect: rect,
            closed: { minLum: +A.min.toFixed(1), maxLum: +A.max.toFixed(1), meanLum: +A.mean.toFixed(1), inRectContrast: ratio(A.min, A.max) },
            openUnderMenu: { minLum: +B.min.toFixed(1), maxLum: +B.max.toFixed(1), meanLum: +B.mean.toFixed(1), inRectContrast: ratio(B.min, B.max) },
            pixelsChangedGt8: diff, totalPixels: n, maxLumDelta: +maxD.toFixed(1),
            note: "closed inRectContrast = the real ⋯ glyph against the card; open = whatever survives at the same rect through the menu surface",
        };
    }, [closedBuf.toString("base64"), openBuf.toString("base64"), clip]));
    await decoder.close();

    // D2 : determinism — repeat the stray Delete
    const runs = [];
    for (let r = 0; r < 3; r++) {
        // ensure a menu is open on the first visible card
        const menus = await page.locator('[role="menu"]').count();
        if (menus === 0) { await page.locator('[aria-label="Palette menu"]').first().click(); await page.waitForTimeout(500); }
        const before = await page.evaluate(storeNames);
        const geo = await page.evaluate(() => {
            const menu = document.querySelector('[role="menu"]');
            const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
            const trigs = Array.from(document.querySelectorAll('[aria-label="Palette menu"]'));
            const out = [];
            trigs.forEach((t, i) => {
                const r = t.getBoundingClientRect(); const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
                const hit = items.find((it) => { const ir = it.getBoundingClientRect(); return cx >= ir.x && cx <= ir.right && cy >= ir.top && cy <= ir.bottom; });
                if (hit) out.push({ i, cx: +cx.toFixed(1), cy: +cy.toFixed(1), item: hit.textContent.trim().slice(0, 20) });
            });
            return { owner: menu.firstElementChild.textContent.trim(), covered: out };
        });
        const del = geo.covered.find((c) => /^Delete$/i.test(c.item));
        if (!del) { runs.push({ run: r, geo, acted: false }); break; }
        await page.mouse.click(del.cx, del.cy);
        await page.waitForTimeout(800);
        const after = await page.evaluate(storeNames);
        runs.push({ run: r, menuOwner: geo.owner, clickedTriggerIndex: del.i, at: { x: del.cx, y: del.cy },
                    storeBefore: before.length, storeAfter: after.length,
                    removed: before.filter((x) => !after.includes(x)),
                    dialogs: await page.locator('[role="dialog"],[role="alertdialog"]').count(),
                    undoAffordance: await page.evaluate(() => {
                        const t = document.body.innerText.toLowerCase();
                        return { hasUndoText: /\bundo\b/.test(t), hasRestore: /restore/.test(t) };
                    }) });
    }
    log("D2_determinism", runs);
    await ctx.close();
}

// ─────────── D4 : mobile ───────────
{
    const ctx = await browser.newContext({ ...devices["iPhone 14"] });
    await ctx.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), mkSeed(8));
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
    await page.waitForTimeout(2400);
    await page.locator('[aria-label="Palette menu"]').first().tap({ force: true });
    await page.waitForTimeout(700);
    log("D4_mobileCollision", await page.evaluate(() => {
        const menu = document.querySelector('[role="menu"]');
        if (!menu) return { menu: null };
        const mr = menu.getBoundingClientRect();
        const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
        const trigs = Array.from(document.querySelectorAll('[aria-label="Palette menu"]'));
        const cards = Array.from(document.querySelectorAll('[role="article"]'));
        const covered = [];
        trigs.forEach((t, i) => {
            const r = t.getBoundingClientRect(); const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
            const hit = items.find((it) => { const ir = it.getBoundingClientRect(); return cx >= ir.x && cx <= ir.right && cy >= ir.top && cy <= ir.bottom; });
            if (hit) covered.push({ i, cx: +cx.toFixed(1), cy: +cy.toFixed(1), item: hit.textContent.trim().slice(0, 20) });
        });
        return {
            side: menu.getAttribute("data-side"), menuRect: { y: +mr.y.toFixed(1), h: +mr.height.toFixed(1) },
            cardPitch: cards.length > 1 ? +(cards[1].getBoundingClientRect().y - cards[0].getBoundingClientRect().y).toFixed(1) : null,
            itemPitch: items.length > 1 ? +(items[1].getBoundingClientRect().top - items[0].getBoundingClientRect().top).toFixed(1) : null,
            covered,
        };
    }));
    await page.screenshot({ path: new URL("./pass4-mobile-collision.png", import.meta.url).pathname });
    await ctx.close();
}

writeFileSync(new URL("./pcm-p4-d-results.json", import.meta.url), JSON.stringify(OUT, (k, v) => (k === "lum" || k === "data" ? undefined : v), 2));
await browser.close();
