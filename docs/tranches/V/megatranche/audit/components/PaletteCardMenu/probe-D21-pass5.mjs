// CHALLENGE-D pass 5 — probe D21 (follow-up to D20)
//   F. the 400% arm properly: why no menu opened, what the route actually renders,
//      and the panel measured after scrolling the trigger into view.
//   G. FIELD OCCLUSION with the submenu open — the union of the two panels as a
//      share of the viewport, and whether the panels bisect the name of the very
//      palette the menu belongs to.
//   H. the `remote` arm (isLocal:false) — a taller instance, to validate the pitch.
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const ROUTE = `${ORIGIN}/#/palettes`;
const OUT = new URL(".", import.meta.url).pathname;
mkdirSync(`${OUT}evidence`, { recursive: true });

const mk = (i, name, extra = {}) => ({
    id: `p-${i}`,
    slug: `pal-${i}-aaaaaaa`,
    name,
    isLocal: true,
    versionCount: 1,
    colors: Array.from({ length: 5 }, (_, k) => ({ css: `hsl(${(i * 47 + k * 31) % 360} 60% 55%)` })),
    ...extra,
});

const SEED = (extra = {}) => ({
    version: 1,
    palettes: [
        mk(1, "Muted Terracotta and Deep Sea Foam Study", extra),
        mk(2, "Second Palette", extra),
        mk(3, "Third Palette", extra),
        mk(4, "Fourth Palette", extra),
        mk(5, "Fifth Palette", extra),
        mk(6, "Sixth Palette", extra),
    ],
});

const results = {};

async function boot(ctx, seed) {
    const page = await ctx.newPage();
    await page.addInitScript((s) => {
        localStorage.setItem("color-palettes", JSON.stringify(s));
    }, seed);
    await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2600);
    return page;
}

const browser = await chromium.launch();

// ───────────────────────────────────────────────────────────────────────────
// ARM F — the 400% arm, diagnosed.
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 360, height: 225 }, deviceScaleFactor: 4 });
    const page = await boot(ctx, SEED());

    const pre = await page.evaluate(() => {
        const trig = document.querySelector('button[aria-label="Palette menu"]');
        const card = document.querySelector('[role="article"]');
        const t = trig ? trig.getBoundingClientRect() : null;
        const c = card ? card.getBoundingClientRect() : null;
        // find the nearest scrollable ancestor of the card
        let el = card, scroller = null;
        while (el && el !== document.documentElement) {
            const cs = getComputedStyle(el);
            if (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 1) { scroller = el; break; }
            el = el.parentElement;
        }
        const sr = scroller ? scroller.getBoundingClientRect() : null;
        return {
            viewport: { w: innerWidth, h: innerHeight, dpr: devicePixelRatio },
            cards: document.querySelectorAll('[role="article"]').length,
            triggers: document.querySelectorAll('button[aria-label="Palette menu"]').length,
            trigger: t ? { x: +t.x.toFixed(1), y: +t.y.toFixed(1), w: +t.width.toFixed(1), h: +t.height.toFixed(1),
                           bottom: +t.bottom.toFixed(1), inViewport: t.y >= 0 && t.bottom <= innerHeight } : null,
            card: c ? { x: +c.x.toFixed(1), y: +c.y.toFixed(1), w: +c.width.toFixed(1), h: +c.height.toFixed(1),
                        bottom: +c.bottom.toFixed(1),
                        visibleHeightPx: +Math.max(0, Math.min(c.bottom, innerHeight) - Math.max(c.y, 0)).toFixed(1) } : null,
            hitAtTriggerCentre: t
                ? (() => { const h = document.elementFromPoint(t.x + t.width / 2, Math.min(t.y + t.height / 2, innerHeight - 1));
                           return h ? `${h.tagName}.${(h.className||"").toString().slice(0,50)}` : null; })()
                : null,
            scroller: scroller
                ? { tag: scroller.tagName, cls: (scroller.className||"").toString().slice(0,60),
                    clientH: scroller.clientHeight, scrollH: scroller.scrollHeight,
                    rect: { y: +sr.y.toFixed(1), h: +sr.height.toFixed(1) } }
                : null,
            docScrollable: document.documentElement.scrollHeight > innerHeight + 1,
        };
    });

    // now force the trigger into view and open
    let post = null;
    try {
        const t = page.locator('button[aria-label="Palette menu"]').first();
        await t.scrollIntoViewIfNeeded({ timeout: 4000 });
        await page.waitForTimeout(400);
        await t.click({ timeout: 4000 });
        await page.waitForTimeout(700);
        post = await page.evaluate(() => {
            const menu = document.querySelector('[role="menu"]');
            if (!menu) return { opened: false };
            const cs = getComputedStyle(menu);
            const r = menu.getBoundingClientRect();
            const rows = [...menu.querySelectorAll('[role="menuitem"]')].map((el) => {
                const rr = el.getBoundingClientRect();
                return { text: el.textContent.trim().replace(/\s+/g," "), y: +rr.y.toFixed(1), bottom: +rr.bottom.toFixed(1),
                         insidePanel: rr.y >= r.y - 0.5 && rr.bottom <= r.bottom + 0.5 };
            });
            return {
                opened: true,
                viewport: { w: innerWidth, h: innerHeight },
                rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), bottom: +r.bottom.toFixed(1) },
                maxHeight: cs.maxHeight,
                availableHeightVar: cs.getPropertyValue("--reka-dropdown-menu-content-available-height").trim(),
                scrollHeight: menu.scrollHeight, clientHeight: menu.clientHeight,
                scrollable: menu.scrollHeight > menu.clientHeight + 1,
                hiddenPx: Math.max(0, menu.scrollHeight - menu.clientHeight),
                areaPctOfViewport: +((r.width * r.height) / (innerWidth * innerHeight) * 100).toFixed(1),
                rows, rowsInsidePanel: rows.filter(x=>x.insidePanel).length, rowsTotal: rows.length,
            };
        });
        await page.screenshot({ path: `${OUT}evidence/pass5-zoom400-open.png` }).catch(()=>{});
    } catch (e) {
        post = { opened: false, error: String(e).split("\n")[0] };
        await page.screenshot({ path: `${OUT}evidence/pass5-zoom400-failed.png` }).catch(()=>{});
    }

    results.F_zoom400 = { pre, post };
    await ctx.close();
}

// ───────────────────────────────────────────────────────────────────────────
// ARM G — field occlusion with the submenu open.
// ───────────────────────────────────────────────────────────────────────────
results.G_occlusion = {};
for (const [label, vp, dsf] of [
    ["100%", { width: 1440, height: 900 }, 1],
    ["200%", { width: 720, height: 450 }, 2],
]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: dsf });
    const page = await boot(ctx, SEED());
    const t = page.locator('button[aria-label="Palette menu"]').first();
    await t.click({ force: true });
    await page.waitForTimeout(550);
    const st = page.locator('[role="menuitem"]', { hasText: "Export" }).first();
    await st.hover({ force: true }).catch(()=>{});
    await page.waitForTimeout(650);

    const m = await page.evaluate(() => {
        const menus = [...document.querySelectorAll('[role="menu"]')].map((el) => {
            const r = el.getBoundingClientRect();
            return { x: r.x, y: r.y, right: r.right, bottom: r.bottom, w: r.width, h: r.height };
        });
        const cards = [...document.querySelectorAll('[role="article"]')];
        const owner = cards[0];
        const or = owner.getBoundingClientRect();
        // the owning card's identity span = the widest text node in the row
        const nameEl = [...owner.querySelectorAll("span,div,h3,h4,p")]
            .filter((e) => e.children.length === 0 && e.textContent.trim().length > 6)
            .sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width)[0];
        const nr = nameEl ? nameEl.getBoundingClientRect() : null;

        // how much of the owning card's name x-range is covered by a panel?
        const coveredIntervals = [];
        if (nr) {
            for (const p of menus) {
                if (p.bottom < nr.y || p.y > nr.bottom) continue;
                const a = Math.max(p.x, nr.x), b = Math.min(p.right, nr.right);
                if (b > a) coveredIntervals.push([+a.toFixed(1), +b.toFixed(1)]);
            }
        }
        // list region = union bbox of all cards
        const fx = Math.min(...cards.map(c=>c.getBoundingClientRect().x));
        const fy = Math.min(...cards.map(c=>c.getBoundingClientRect().y));
        const fr = Math.max(...cards.map(c=>c.getBoundingClientRect().right));
        const fb = Math.max(...cards.map(c=>c.getBoundingClientRect().bottom));
        const fieldW = fr - fx, fieldH = fb - fy;
        let coveredArea = 0;
        for (const p of menus) {
            const ox = Math.max(0, Math.min(p.right, fr) - Math.max(p.x, fx));
            const oy = Math.max(0, Math.min(p.bottom, fb) - Math.max(p.y, fy));
            coveredArea += ox * oy;
        }
        // subtract panel/panel overlap once
        if (menus.length === 2) {
            const [a, b] = menus;
            const ox = Math.max(0, Math.min(a.right, b.right) - Math.max(a.x, b.x));
            const oy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y));
            coveredArea -= ox * oy;
        }
        const unionW = menus.length ? Math.max(...menus.map(p=>p.right)) - Math.min(...menus.map(p=>p.x)) : 0;
        const unionH = menus.length ? Math.max(...menus.map(p=>p.bottom)) - Math.min(...menus.map(p=>p.y)) : 0;
        return {
            viewport: { w: innerWidth, h: innerHeight },
            panels: menus.map(p => ({ x:+p.x.toFixed(1), y:+p.y.toFixed(1), w:+p.w.toFixed(1), h:+p.h.toFixed(1) })),
            unionBox: { w: +unionW.toFixed(1), h: +unionH.toFixed(1),
                        pctViewportW: +((unionW/innerWidth)*100).toFixed(1),
                        pctViewportH: +((unionH/innerHeight)*100).toFixed(1) },
            ownerCard: { x:+or.x.toFixed(1), y:+or.y.toFixed(1), w:+or.width.toFixed(1), h:+or.height.toFixed(1) },
            ownerName: nr ? { text: nameEl.textContent.trim(), x:+nr.x.toFixed(1), right:+nr.right.toFixed(1), w:+nr.width.toFixed(1) } : null,
            ownerNameCoveredIntervals: coveredIntervals,
            ownerNameCoveredPx: +coveredIntervals.reduce((s,[a,b])=>s+(b-a),0).toFixed(1),
            ownerNameCoveredPct: nr ? +((coveredIntervals.reduce((s,[a,b])=>s+(b-a),0)/nr.width)*100).toFixed(1) : null,
            field: { x:+fx.toFixed(1), y:+fy.toFixed(1), w:+fieldW.toFixed(1), h:+fieldH.toFixed(1) },
            fieldCoveredPct: +((coveredArea/(fieldW*fieldH))*100).toFixed(1),
        };
    });
    await page.screenshot({ path: `${OUT}evidence/pass5-occlusion-${label.replace("%","")}.png` }).catch(()=>{});
    results.G_occlusion[label] = m;
    await ctx.close();
}

// ───────────────────────────────────────────────────────────────────────────
// ARM H — the `remote` arm: taller instance, pitch validation.
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await boot(ctx, SEED({ isLocal: false, versionCount: 4, visibility: "public", tier: "featured" }));
    const t = page.locator('button[aria-label="Palette menu"]').first();
    const n = await t.count();
    let a = null;
    if (n) {
        await t.click({ force: true });
        await page.waitForTimeout(600);
        a = await page.evaluate(() => {
            const menu = document.querySelector('[role="menu"]');
            if (!menu) return null;
            const r = menu.getBoundingClientRect();
            const rows = [...menu.querySelectorAll('[role="menuitem"]')].map(el => ({
                text: el.textContent.trim().replace(/\s+/g," "),
                h: +el.getBoundingClientRect().height.toFixed(1),
            }));
            const seps = menu.querySelectorAll('[role="separator"], [data-slot*="separator"]').length;
            return {
                rect: { w:+r.width.toFixed(1), h:+r.height.toFixed(1) },
                rows, rowCount: rows.length, separators: seps,
                chromePx: +(r.height - rows.reduce((s,x)=>s+x.h,0)).toFixed(1),
            };
        });
        await page.screenshot({ path: `${OUT}evidence/pass5-remote-arm.png` }).catch(()=>{});
    }
    results.H_remoteArm = { triggers: n, anatomy: a };
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}probe-D21-pass5-results.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
