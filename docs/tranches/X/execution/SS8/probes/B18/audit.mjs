// SS-8 · B18 · AdminAuditPanel cells. Usage: node audit.mjs <cell...>
import { launch, cell, save, AUDIT } from "./lib.mjs";
import { gotoAdmin, contrast, rects, paneCard, shot } from "./measure.mjs";

const NOW = "2026-10-19T12:00:00.000Z";
// The record's guaranteed worst input: a batch target `count=… slugs=…` (~6 KB).
const WORST = "count=50 slugs=" + Array.from({ length: 50 }, (_, i) => `palette-slug-${i}-` + "q".repeat(100)).join(",");
const WORST_AUDIT = [{ id: "w0", timestamp: NOW, action: "palettes.batchDelete", target: WORST, actorSlug: "admin-one" }, ...AUDIT];

const PANEL = '[data-pane="admin-audit"]';
const rowSel = `${PANEL} .border-card-edge.rounded-md`;

async function readAudit(page) {
    return page.evaluate((PANEL) => {
        const p = document.querySelector(PANEL);
        const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1)); };
        const action = p.querySelector('input[aria-label="Filter by action"]')?.closest(".input-bar");
        const target = p.querySelector('input[aria-label="Filter by target"]')?.closest(".input-bar");
        const refresh = p.querySelector('[aria-label="Refresh audit log"]');
        const count = refresh?.parentElement?.querySelector("span");
        const toolbar = action?.parentElement;
        const rows = [...p.querySelectorAll(".border-card-edge.rounded-md")];
        const panelGrid = toolbar?.parentElement;
        const badge = rows[0]?.querySelector('[data-slot="badge"], .badge, span');
        const spans = rows[0] ? [...rows[0].querySelectorAll("span")] : [];
        const ts = spans.find((s) => s.className.includes("tabular-nums"));
        const tgt = spans.find((s) => s.className.includes("truncate"));
        const cs = (e) => e && (({ fontSize, fontFamily, color, lineHeight }) => ({ fontSize, fontFamily: fontFamily.slice(0, 40), color, lineHeight }))(getComputedStyle(e));
        // card: nearest ancestor that clips (overflow != visible) above the panel grid
        let card = panelGrid?.parentElement; while (card && getComputedStyle(card).overflowX === "visible") card = card.parentElement;
        return {
            vw: innerWidth,
            panelGrid: r(panelGrid), panelGridSW: panelGrid?.scrollWidth,
            card: card && { tag: card.tagName, cls: String(card.className).slice(0, 90), rect: r(card), cw: card.clientWidth, sw: card.scrollWidth },
            toolbar: r(toolbar), action: r(action), target: r(target), count: r(count), countText: count?.textContent.trim(), refresh: r(refresh),
            refreshCS: refresh && (({ minBlockSize, height, paddingInline }) => ({ minBlockSize, height, paddingInline }))(getComputedStyle(refresh)),
            rows: rows.slice(0, 6).map(r), rowSW: rows.slice(0, 2).map((e) => [e.clientWidth, e.scrollWidth]),
            badge: { cls: badge?.className, slot: badge?.getAttribute("data-slot"), ...cs(badge) },
            timestamp: cs(ts), targetCS: cs(tgt),
            coarse: matchMedia("(pointer: coarse)").matches,
        };
    }, PANEL);
}

const cells = {
    // AAP-1 / AAP-9 / AAP-15 / Mobile: populated, worst input, five viewports.
    async populated(b) {
        const out = {};
        for (const w of (process.env.W ? process.env.W.split(",").map(Number) : [320, 390, 768, 1024, 1440])) {
            out[w] = await cell(b, { viewport: { width: w, height: 900 }, route: { audit: WORST_AUDIT } }, async (page) => {
                await gotoAdmin(page, "audit");
                await page.waitForSelector(rowSel);
                const m = await readAudit(page);
                m.card2 = await paneCard(page, "admin-audit");
                if (w === 390 || w === 1440 || w === 320) await shot(page, `audit-populated-${w}-light`);
                return m;
            });
        }
        return out;
    },
    // AAP-9 without the worst input (the record's table is a plain populated reading).
    async plain(b) {
        const out = {};
        for (const w of [390, 768, 1024, 1440]) {
            out[w] = await cell(b, { viewport: { width: w, height: 900 } }, async (page) => {
                await gotoAdmin(page, "audit");
                await page.waitForSelector(rowSel);
                const m = await readAudit(page);
                return { action: m.action, target: m.target, count: m.count, refresh: m.refresh, toolbar: m.toolbar, rows: m.rows, badge: m.badge, timestamp: m.timestamp, targetCS: m.targetCS };
            });
        }
        return out;
    },
    async contrastAudit(b) {
        const out = {};
        for (const dark of [false, true]) out[dark ? "dark" : "light"] = await cell(b, { dark }, async (page) => {
            await gotoAdmin(page, "audit");
            await page.waitForSelector(rowSel);
            return { timestamp: await contrast(page, `${rowSel} span.tabular-nums`), target: await contrast(page, `${rowSel} span.truncate`) };
        });
        return out;
    },
    // Skeleton vs row geometry + the true-empty void.
    async skeleton(b) {
        const skel = await cell(b, { route: { delayMs: 8000 } }, async (page) => {
            await page.goto("http://localhost:9000/#/admin/audit", { waitUntil: "load" });
            await page.waitForSelector(`${PANEL} [role="status"][aria-label="Loading audit log"]`, { timeout: 15000 });
            await page.waitForTimeout(400);
            const m = await page.evaluate((PANEL) => {
                const st = document.querySelector(`${PANEL} [role="status"][aria-label="Loading audit log"]`);
                const kids = [...st.children].map((e) => { const b = e.getBoundingClientRect(); return [+b.y.toFixed(1), +b.height.toFixed(1)]; });
                return { kids, gap: getComputedStyle(st).rowGap, statusRect: (({ y, height }) => [y, height])(st.getBoundingClientRect()) };
            }, PANEL);
            await shot(page, "audit-skeleton-1440-light");
            return m;
        });
        const rows = await cell(b, {}, async (page) => {
            await gotoAdmin(page, "audit");
            await page.waitForSelector(rowSel);
            return page.evaluate((s) => {
                const rs = [...document.querySelectorAll(s)].map((e) => { const b = e.getBoundingClientRect(); return [+b.y.toFixed(1), +b.height.toFixed(1)]; });
                const gap = getComputedStyle(document.querySelector(s).parentElement).rowGap;
                return { rs, gap, gaps: rs.slice(1).map((r, i) => +(r[0] - rs[i][0] - rs[i][1]).toFixed(1)) };
            }, rowSel);
        });
        const empty = await cell(b, { route: { audit: [] } }, async (page) => {
            await gotoAdmin(page, "audit");
            await page.waitForTimeout(600);
            const m = await paneCard(page, "admin-audit");
            m.plate = await page.evaluate((PANEL) => { const e = document.querySelector(`${PANEL} [role="status"], ${PANEL} [data-slot="empty-state"]`); if (!e) return null; const b = e.getBoundingClientRect(); return { text: e.textContent.trim().slice(0, 80), rect: [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1)) }; }, PANEL);
            await shot(page, "audit-empty-1440-light");
            return m;
        });
        return { skel, rows, empty };
    },
    async forced(b) {
        return cell(b, { forcedColors: "active" }, async (page) => {
            await gotoAdmin(page, "audit");
            await page.waitForSelector(rowSel);
            const fc = await page.evaluate(() => matchMedia("(forced-colors: active)").matches);
            const badge = await page.locator(`${rowSel} [data-slot="badge"], ${rowSel} .badge`).first().evaluate((e) => { const c = getComputedStyle(e); return { cls: e.className, bg: c.backgroundColor, border: `${c.borderTopWidth} ${c.borderTopStyle} ${c.borderTopColor}`, boxShadow: c.boxShadow, outline: c.outline, fca: c.forcedColorAdjust, color: c.color }; }).catch((e) => ({ err: String(e).slice(0, 120) }));
            const box = await page.locator(rowSel).first().boundingBox();
            await shot(page, "audit-forced-colors-1440", { clip: { x: box.x - 8, y: box.y - 8, width: Math.min(700, box.width + 16), height: box.height + 16 } });
            const nf = await cell(b, {}, async (p2) => { await gotoAdmin(p2, "audit"); await p2.waitForSelector(rowSel); return p2.locator(`${rowSel} [data-slot="badge"], ${rowSel} .badge`).first().evaluate((e) => { const c = getComputedStyle(e); return { bg: c.backgroundColor, border: `${c.borderTopWidth} ${c.borderTopStyle} ${c.borderTopColor}`, boxShadow: c.boxShadow }; }).catch((e) => ({ err: String(e).slice(0, 120) })); });
            return { forcedActive: fc, badge, badgeNoForced: nf };
        });
    },
    async coarse(b) {
        const out = {};
        for (const [k, o] of Object.entries({ coarse390: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, fine390: { viewport: { width: 390, height: 844 } } })) {
            out[k] = await cell(b, o, async (page) => {
                await gotoAdmin(page, "audit");
                await page.waitForSelector(rowSel);
                const m = await readAudit(page);
                m.uiScale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--ui-scale"));
                if (k === "coarse390") await shot(page, "audit-coarse-390");
                return { coarse: m.coarse, refresh: m.refresh, refreshCS: m.refreshCS, uiScale: m.uiScale, toolbar: m.toolbar, action: m.action, target: m.target, count: m.count };
            });
        }
        return out;
    },
    // AAP-22: offset window shift against an offset-faithful stub (sort timestamp desc, skip/limit).
    async window(b) {
        const base = Array.from({ length: 45 }, (_, i) => ({ id: "a" + i, timestamp: new Date(Date.parse(NOW) - i * 60000).toISOString(), action: "tag.create", target: "tag:t" + i, actorSlug: "admin-one" }));
        return cell(b, { route: { audit: base } }, async (page, log, st) => {
            await gotoAdmin(page, "audit");
            await page.waitForSelector(rowSel);
            const p1 = await page.locator(`${rowSel} span.truncate`).allTextContents();
            // a concurrent write lands at the head (newest first) between page turns
            st.audit.unshift({ id: "new1", timestamp: new Date(Date.parse(NOW) + 60000).toISOString(), action: "tag.create", target: "tag:CONCURRENT", actorSlug: "admin-two" });
            await page.getByRole("button", { name: "Next page" }).click();
            await page.waitForTimeout(1200);
            const p2 = await page.locator(`${rowSel} span.truncate`).allTextContents();
            const dup = p2.map((s) => s.trim()).filter((s) => p1.map((x) => x.trim()).includes(s));
            return { p1Last: p1.at(-1)?.trim(), p2First: p2[0]?.trim(), duplicated: dup, requests: log.map((l) => l.m + " " + l.p) };
        });
    },
    async motion(b) {
        return cell(b, { route: { delayMs: 1500 } }, async (page) => {
            await gotoAdmin(page, "audit");
            await page.waitForSelector(rowSel, { timeout: 15000 });
            const rest = await page.evaluate((PANEL) => [...document.querySelector(PANEL).querySelectorAll("*")].map((e) => { const c = getComputedStyle(e); return c.transitionDuration !== "0s" ? `${e.tagName.toLowerCase()}|${c.transitionProperty}|${c.transitionDuration}` : null; }).filter(Boolean), PANEL);
            await page.getByRole("button", { name: "Refresh audit log" }).click();
            await page.waitForTimeout(300);
            const during = await page.evaluate((PANEL) => document.getAnimations().filter((a) => document.querySelector(PANEL).contains(a.effect?.target)).map((a) => `${a.constructor.name}|${a.animationName ?? a.transitionProperty}|${a.effect.getTiming().duration}|${a.effect.target.tagName}`), PANEL);
            return { transitionsAtRest: [...new Set(rest)], animationsDuringRefetch: during };
        });
    },
};

const pick = process.argv.slice(2);
const browser = await launch();
const out = {};
try {
    for (const k of pick.length ? pick : Object.keys(cells)) { out[k] = await cells[k](browser); save(`audit-${k}.json`, out[k]); }
} finally {
    await browser.close();
}
console.log("done", Object.keys(out).join(","));
