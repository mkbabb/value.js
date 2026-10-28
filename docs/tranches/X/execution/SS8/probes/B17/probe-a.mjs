// Probe A — #/admin/names at rest, seeded: regions, tab strip, rows, card, search node,
// secondary-line contrast, populated capture pair, hover/focus destructive register.
import { launch, cell, save, BASE, EVID } from "./lib.mjs";
import { pixels, rgba, over, cr } from "./px.mjs";

const VIEWS = [
    { w: 1440, h: 900 }, { w: 390, h: 844 }, { w: 320, h: 568 },
];
async function settle(page, hash = "#/admin/names") {
    await page.goto(`${BASE}/${hash}`, { waitUntil: "domcontentloaded", timeout: 120000 });
    await page.waitForSelector('[role="tablist"].segmented-tabs, [data-admin-access]', { timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);
}
const measure = () => {
    const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(2)); };
    const cs = (e, ...p) => { const s = getComputedStyle(e); return Object.fromEntries(p.map((k) => [k, k.startsWith("--") ? s.getPropertyValue(k).trim() : s[k]])); };
    const regions = [...document.querySelectorAll("[data-pane]")].map((e) => ({ pane: e.dataset.pane, rect: R(e) }));
    const tablists = [...document.querySelectorAll('[role="tablist"]')].map((t) => ({ label: t.getAttribute("aria-label"), text: t.innerText.replace(/\s+/g, " ").slice(0, 60), rect: R(t), inNames: !!t.closest("[data-names-direction]") }));
    const track = document.querySelector("[data-names-direction] .segmented-tabs");
    const ind = track?.querySelector(".segmented-indicator");
    const btn = track?.querySelector('[aria-selected="true"]');
    const t = R(track), i = R(ind), b = R(btn);
    const d = (p, q) => p && q ? { left: +(q[0] - p[0]).toFixed(2), right: +((p[0] + p[2]) - (q[0] + q[2])).toFixed(2), top: +(q[1] - p[1]).toFixed(2), bottom: +((p[1] + p[3]) - (q[1] + q[3])).toFixed(2) } : null;
    const tabs = { track: t, indicator: i, activeButton: b, indStyle: ind?.getAttribute("style"),
        indMinusButton: d(i, b) && { left: +(b[0] - i[0]).toFixed(2), right: +((i[0] + i[2]) - (b[0] + b[2])).toFixed(2), top: +(b[1] - i[1]).toFixed(2), bottom: +((i[1] + i[3]) - (b[1] + b[3])).toFixed(2) },
        indicatorBottomMinusTrackBottom: i && t ? +((i[1] + i[3]) - (t[1] + t[3])).toFixed(2) : null,
        indicatorTopMinusTrackTop: i && t ? +(i[1] - t[1]).toFixed(2) : null,
        trackStyle: track && cs(track, "paddingTop", "paddingBottom", "height", "--tab-indicator-duration"),
        indStyleCS: ind && cs(ind, "transitionProperty", "transitionDuration", "transitionTimingFunction", "--tab-indicator-duration"),
        rootDuration: getComputedStyle(document.documentElement).getPropertyValue("--tab-indicator-duration").trim(),
        buttons: [...(track?.querySelectorAll('[role="tab"]') ?? [])].map(R) };
    const panel = document.querySelector("#admin-names-pending, #admin-names-approved");
    const rowsEl = panel ? [...panel.querySelectorAll(".flex.items-center.gap-3.rounded-md")] : [];
    const rows = rowsEl.map((r) => {
        const col = r.children[1]; const [p, s] = col.children;
        return { rect: R(r), pad: cs(r, "paddingTop", "paddingLeft"), col: R(col), primary: { rect: R(p), ...cs(p, "fontSize", "lineHeight", "fontFamily", "color") }, secondary: { rect: R(s), ...cs(s, "fontSize", "lineHeight", "fontFamily", "color"), overflow: s.scrollWidth > s.clientWidth } , actions: R(r.children[2]), slotsEmpty: [...r.children].map((c) => c.children.length === 0) };
    });
    const card = document.querySelector('[data-pane="admin-names"] .pane-shell__card');
    const port = card?.querySelector(".pane-scroll-fade");
    const last = panel?.lastElementChild;
    const cardInfo = card && { rect: R(card), ...cs(card, "display", "minHeight", "height", "flexGrow", "flexShrink"), parentDisplay: getComputedStyle(card.parentElement).display, parentClass: card.parentElement.className.slice(0, 120), grand: getComputedStyle(card.parentElement.parentElement).display, port: port && { scrollHeight: port.scrollHeight, clientHeight: port.clientHeight }, contentBottom: last ? +(last.getBoundingClientRect().bottom).toFixed(2) : null };
    const seated = [...document.querySelectorAll(".search-seated")].map((e) => ({ tag: e.tagName, cls: e.className, hasInput: !!e.querySelector("input") }));
    const h1 = document.querySelector("h1");
    const h1Sibs = h1 ? [...h1.parentElement.children].map((e) => ({ tag: e.tagName, cls: String(e.className).slice(0, 80), rect: R(e) })) : [];
    return { dir: document.documentElement.dir, regions, tablists, tabs, rows, cardInfo, seated, h1: R(h1), h1Sibs, rowGaps: rows.slice(1).map((r, k) => +(r.rect[1] - (rows[k].rect[1] + rows[k].rect[3])).toFixed(2)) };
};

const browser = await launch();
const out = {};
try {
    for (const v of VIEWS) for (const dark of v.w === 320 ? [false] : [false, true]) {
        const key = `${v.w}-${dark ? "dark" : "light"}`;
        out[key] = await cell(browser, { dark, viewport: { width: v.w, height: v.h } }, async (page) => {
            await settle(page);
            const m = await page.evaluate(measure);
            const shot = await page.screenshot({ path: `${EVID}/a-names-${key}.png` });
            // secondary-line contrast: ink composited over the fill sampled 24px right of the text box end
            const s = m.rows[0]?.secondary, p = m.rows[0]?.primary;
            if (s) {
                const [ink, pink] = await rgba(page, [s.color, p.color]);
                const fx = Math.min(Math.round(s.rect[0] + s.rect[2] + 24), v.w - 60);
                const [fill, fill2] = await pixels(page, shot, [[fx, Math.round(s.rect[1] + s.rect[3] / 2)], [fx, Math.round(p.rect[1] + p.rect[3] / 2)]]);
                m.contrast = { secondaryInk: ink, fill, secondaryCR: cr(over(ink, fill), fill), primaryInk: pink, primaryCR: cr(over(pink, fill2), fill2) };
            }
            // hover + keyboard focus on the first row's Reject (desktop/phone, both schemes)
            if (v.w !== 320) {
                const rej = page.locator('[aria-label^="Reject color name"]').first();
                const read = () => rej.evaluate((e) => { const s = getComputedStyle(e); return { color: s.color, bg: s.backgroundColor }; });
                m.rejectRest = await read();
                await rej.hover(); await page.waitForTimeout(400);
                m.rejectHover = await read();
                const row = await rej.evaluate((e) => { const r = e.closest(".rounded-md").getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
                await page.screenshot({ path: `${EVID}/a-reject-hover-${key}.png`, clip: { x: Math.max(0, row[0] - 4), y: row[1] - 4, width: row[2] + 8, height: row[3] + 8 } });
                await page.mouse.move(2, v.h - 2); await page.waitForTimeout(300);
                // keyboard: Tab from the approve button (focused programmatically) lands on reject
                await page.locator('[aria-label^="Approve color name"]').first().focus();
                await page.keyboard.press("Tab"); await page.waitForTimeout(300);
                m.focusLanded = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
                m.rejectFocus = { ...(await read()), ring: await rej.evaluate((e) => { const s = getComputedStyle(e); return `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor} | ${s.boxShadow.slice(0, 120)}`; }), focusVisible: await rej.evaluate((e) => e.matches(":focus-visible")) };
                await page.screenshot({ path: `${EVID}/a-reject-focus-${key}.png`, clip: { x: Math.max(0, row[0] - 4), y: row[1] - 4, width: row[2] + 8, height: row[3] + 8 } });
            }
            return m;
        });
    }
} finally {
    await browser.close();
}
save("probe-a.json", out);
for (const [k, m] of Object.entries(out)) {
    if (m.error) { console.log(k, "ERROR", m.error); continue; }
    console.log(k, JSON.stringify({ regions: m.regions, tablists: m.tablists.length, ind: m.tabs.indMinusButton, indBotTrack: m.tabs.indicatorBottomMinusTrackBottom, dur: m.tabs.indStyleCS, rootDur: m.tabs.rootDuration, row0: m.rows[0]?.rect, col0: m.rows[0]?.col, gaps: m.rowGaps.slice(0, 2), card: m.cardInfo && { d: m.cardInfo.display, pd: m.cardInfo.parentDisplay, mh: m.cardInfo.minHeight, port: m.cardInfo.port, rect: m.cardInfo.rect, cb: m.cardInfo.contentBottom }, seated: m.seated, contrast: m.contrast && [m.contrast.secondaryCR, m.contrast.primaryCR], rej: [m.rejectRest, m.rejectHover, m.rejectFocus, m.focusLanded], err: m.pageErrors }));
}
