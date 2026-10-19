// Probe B — loading/error lifecycle on the admin consoles: skeleton→row swap geometry + CLS,
// skeleton ink, hung-fetch stranding, latched Retry, error-plate geometry.
import { launch, cell, save, BASE, EVID } from "./lib.mjs";
import { pixels, rgba, okL, cr, over } from "./px.mjs";

const GOTO = { waitUntil: "domcontentloaded", timeout: 120000 };
const clsInit = () => {
    window.__shifts = [];
    try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__shifts.push({ t: +e.startTime.toFixed(1), v: +e.value.toFixed(5), recent: e.hadRecentInput, n: e.sources?.length ?? 0 }); }).observe({ type: "layout-shift", buffered: true }); } catch {}
};
const skel = () => {
    const R = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(2)); };
    return [...document.querySelectorAll('[data-slot="admin-list-skeleton"]')].map((s) => {
        const blocks = [...s.querySelectorAll('[data-slot="skeleton"], .skeleton')];
        const col = s.children[1];
        return { rect: R(s), col: R(col), colKids: [...col.children].map(R), blocks: blocks.map((b) => ({ rect: R(b), bg: getComputedStyle(b).backgroundColor, anim: getComputedStyle(b, "::after").animationName + " " + getComputedStyle(b, "::after").animationDuration, animSelf: getComputedStyle(b).animationName })), parentGap: getComputedStyle(s.parentElement).rowGap, parentRect: R(s.parentElement) };
    });
};
const rows = (sel) => {
    const R = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(2)); };
    const host = document.querySelector(sel);
    if (!host) return null;
    const list = [...host.querySelectorAll(".rounded-md.border")].filter((e) => !e.matches('[data-slot="admin-list-skeleton"]')).slice(0, 4);
    return { rows: list.map((r) => ({ rect: R(r), col: r.children[1] ? R(r.children[1]) : null, colKids: r.children[1] ? [...r.children[1].children].map((k) => ({ r: R(k), lh: getComputedStyle(k).lineHeight, fs: getComputedStyle(k).fontSize })) : [] })), gap: list[0] ? getComputedStyle(list[0].parentElement).rowGap : null };
};

const browser = await launch();
const out = {};
try {
    // 1. names skeleton → rows, 4 cells
    for (const [w, h] of [[1440, 900], [390, 844]]) for (const dark of [false, true]) {
        const key = `swap-names-${w}-${dark ? "dark" : "light"}`;
        out[key] = await cell(browser, { dark, viewport: { width: w, height: h }, route: { delayMs: 4000 } }, async (page) => {
            await page.addInitScript(clsInit);
            await page.goto(`${BASE}/#/admin/names`, GOTO);
            await page.waitForSelector('[data-slot="admin-list-skeleton"]', { timeout: 90000 });
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(500);
            const s = await page.evaluate(skel);
            const shot = await page.screenshot({ path: `${EVID}/b-skeleton-${w}-${dark ? "dark" : "light"}.png` });
            const s0 = s[0];
            // block pixel (centre of the primary bar) vs ground (70% across the content column, row mid)
            const bar = s0.blocks[1].rect, col = s0.col;
            const [blockPx, groundPx] = await pixels(page, shot, [[Math.round(bar[0] + 10), Math.round(bar[1] + bar[3] / 2)], [Math.round(col[0] + col[2] * 0.85), Math.round(s0.rect[1] + s0.rect[3] / 2)]]);
            const shiftsBefore = await page.evaluate(() => window.__shifts.length);
            await page.waitForSelector('#admin-names-pending .rounded-md.border:not([data-slot="admin-list-skeleton"])', { timeout: 30000 });
            await page.waitForTimeout(1200);
            const r = await page.evaluate(rows, "#admin-names-pending");
            const shot2 = await page.screenshot({ path: `${EVID}/b-rows-${w}-${dark ? "dark" : "light"}.png` });
            const k = r.rows[0].colKids[0];
            const [textPx, fill2] = await pixels(page, shot2, [[Math.round(k.r[0] + 3), Math.round(k.r[1] + k.r[3] / 2)], [Math.round(r.rows[0].col[0] + r.rows[0].col[2] * 0.85), Math.round(r.rows[0].rect[1] + r.rows[0].rect[3] / 2)]]);
            const primInk = (await page.evaluate(() => getComputedStyle(document.querySelector("#admin-names-pending .text-small")).color));
            const [pi] = await rgba(page, [primInk]);
            const shifts = await page.evaluate(() => window.__shifts);
            return {
                skeleton: s.map((x) => ({ rect: x.rect, col: x.col, colKids: x.colKids })), skelBlocks: s0.blocks, parentGap: s0.parentGap,
                rows: r, rowMinusSkel: r.rows.slice(0, 3).map((row, i) => s[i] && +(row.rect[3] - s[i].rect[3]).toFixed(2)), colMinusSkelCol: +(r.rows[0].col[3] - s0.col[3]).toFixed(2),
                ink: { blockPx, groundPx, dL_block: +(okL(blockPx) - okL(groundPx)).toFixed(4), blockCR: cr(blockPx, groundPx), primaryInkComposited: over(pi, fill2), fill2, dL_text: +(okL(over(pi, fill2)) - okL(fill2)).toFixed(4) },
                shifts, shiftsBefore, clsAfterSkeleton: +shifts.slice(shiftsBefore).filter((e) => !e.recent).reduce((a, e) => a + e.v, 0).toFixed(5),
            };
        });
    }
    // 2. users + audit skeleton → rows (CLS + geometry), 1440 light
    for (const route of ["users", "audit"]) {
        out[`swap-${route}`] = await cell(browser, { route: { delayMs: 4000 } }, async (page) => {
            await page.addInitScript(clsInit);
            await page.goto(`${BASE}/#/admin/${route}`, GOTO);
            await page.waitForSelector('[data-slot="admin-list-skeleton"]', { timeout: 90000 });
            await page.waitForTimeout(500);
            const s = await page.evaluate(skel);
            await page.screenshot({ path: `${EVID}/b-skeleton-${route}-1440-light.png` });
            const n0 = await page.evaluate(() => window.__shifts.length);
            await page.waitForFunction(() => !document.querySelector('[data-slot="admin-list-skeleton"]'), null, { timeout: 30000 });
            await page.waitForTimeout(1500);
            await page.screenshot({ path: `${EVID}/b-rows-${route}-1440-light.png` });
            const r = await page.evaluate(rows, `[data-pane="admin-${route}"] .pane-body`);
            const shifts = await page.evaluate(() => window.__shifts);
            return { skeleton: s.map((x) => ({ rect: x.rect, parentGap: x.parentGap })), rows: r, shifts, clsAfterSkeleton: +shifts.slice(n0).filter((e) => !e.recent).reduce((a, e) => a + e.v, 0).toFixed(5) };
        });
    }
    // 3. hung fetch — the queue socket never answers
    out.hang = await cell(browser, { route: { hang: true } }, async (page) => {
        await page.goto(`${BASE}/#/admin/names`, GOTO);
        await page.waitForSelector('[data-slot="admin-list-skeleton"]', { timeout: 90000 });
        const t0 = Date.now();
        await page.waitForTimeout(45000);
        const still = await page.evaluate(() => ({ skeletons: document.querySelectorAll('[data-slot="admin-list-skeleton"]').length, alert: document.querySelector('[role="alert"]')?.innerText ?? null }));
        await page.screenshot({ path: `${EVID}/b-hang-45s.png` });
        return { waitedMs: Date.now() - t0, ...still };
    });
    // 4. network failure → error plate geometry, then latched Retry
    out.latch = await cell(browser, { route: { fail: true } }, async (page, log) => {
        await page.goto(`${BASE}/#/admin/names`, GOTO);
        await page.waitForSelector("#admin-names-pending [role='alert'], #admin-names-pending .text-destructive, #admin-names-pending button:has-text('Retry')", { timeout: 90000 });
        await page.waitForTimeout(800);
        const plate = await page.evaluate(() => {
            const R = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(2)); };
            const p = document.querySelector("#admin-names-pending");
            const es = p.firstElementChild;
            const al = p.querySelector('[role="alert"]') ?? es;
            const txt = al.innerText;
            const card = document.querySelector('[data-pane="admin-names"] .pane-shell__card');
            return { text: txt, chars: txt.length, plate: R(es), alert: R(al), kids: [...es.querySelectorAll("p, div")].slice(0, 6).map((k) => ({ t: k.innerText.slice(0, 60), r: R(k) })), card: R(card) };
        });
        await page.screenshot({ path: `${EVID}/b-error-plate-1440-light.png` });
        const n0 = log.length;
        await page.evaluate(() => {
            window.__sk = { mutations: 0, frames: 0, framesWith: 0 };
            new MutationObserver((m) => { for (const x of m) for (const n of x.addedNodes) if (n.nodeType === 1 && (n.matches?.('[data-slot="admin-list-skeleton"]') || n.querySelector?.('[data-slot="admin-list-skeleton"]'))) window.__sk.mutations++; }).observe(document.body, { subtree: true, childList: true });
            const tick = () => { window.__sk.frames++; if (document.querySelector('[data-slot="admin-list-skeleton"]')) window.__sk.framesWith++; if (window.__sk.frames < 120) requestAnimationFrame(tick); };
            requestAnimationFrame(tick);
        });
        const before = await page.evaluate(() => document.querySelector("#admin-names-pending").innerText);
        await page.locator("#admin-names-pending button", { hasText: "Retry" }).click();
        await page.waitForTimeout(2500);
        const after = await page.evaluate(() => ({ text: document.querySelector("#admin-names-pending").innerText, sk: window.__sk }));
        return { plate, retry: { requestsDuringRetry: log.slice(n0).map((l) => l.p), textUnchanged: before === after.text, skeletonInsertions: after.sk.mutations, framesSampled: after.sk.frames, framesWithSkeleton: after.sk.framesWith, afterText: after.text.slice(0, 300) } };
    });
} finally {
    await browser.close();
}
save("probe-b.json", out);
for (const [k, m] of Object.entries(out)) {
    if (m.error) { console.log(k, "ERROR", m.error); continue; }
    const { skeleton, rows: r, shifts, skelBlocks, ...rest } = m;
    console.log(k, JSON.stringify({ sk0: skeleton?.[0], row0: r?.rows?.[0], gap: r?.gap, ...rest }).slice(0, 1400));
}
