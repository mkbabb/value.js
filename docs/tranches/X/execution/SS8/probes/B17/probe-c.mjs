// Probe C — shell/route cells: approved actions, rest crops (D-1.6), pane selector at 390/320 (D-02),
// RTL (D-07), mx-auto/min-h-0 (D-12), >50 users (D-09), L-8 cross-pane leak, forced-colors /
// zoom-200 / keyboard-focus arms (chromium), empty-queue acreage (D-1.4), card shadow (D-11).
// Usage: node probe-c.mjs [cell,cell,...]   (default: all)
import { launch, cell, save, BASE, EVID, USERS } from "./lib.mjs";

const GOTO = { waitUntil: "domcontentloaded", timeout: 120000 };
const R = "(e)=>{if(!e)return null;const b=e.getBoundingClientRect();return [b.x,b.y,b.width,b.height].map(n=>+n.toFixed(2))}";
async function settle(page, hash = "#/admin/names", sel = '[role="tablist"].segmented-tabs') {
    await page.goto(`${BASE}/${hash}`, GOTO);
    await page.waitForSelector(sel, { timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);
}
const want = new Set((process.argv[2] ?? "approved,rest,selector,rtl,shell,users,leak,forced,zoom,keys,empty").split(","));
const browser = await launch();
const out = {};
try {
    if (want.has("approved")) for (const dark of [false, true]) {
        out[`approved-${dark ? "dark" : "light"}`] = await cell(browser, { dark }, async (page) => {
            await settle(page);
            const pend = await page.evaluate(`[...document.querySelectorAll("#admin-names-pending .flex.items-center.gap-3.rounded-md")].slice(0,2).map(r=>(${R})(r.children[2]))`);
            await page.getByRole("tab", { name: /Approved/ }).click();
            await page.waitForSelector("#admin-names-approved .flex.items-center.gap-3.rounded-md", { timeout: 15000 });
            await page.waitForTimeout(800);
            const appr = await page.evaluate(`[...document.querySelectorAll("#admin-names-approved .flex.items-center.gap-3.rounded-md")].slice(0,2).map(r=>(${R})(r.children[2]))`);
            await page.screenshot({ path: `${EVID}/c-approved-1440-${dark ? "dark" : "light"}.png` });
            return { pendingActions: pend, approvedActions: appr };
        });
    }
    if (want.has("rest")) for (const dark of [false, true]) {
        out[`rest-${dark ? "dark" : "light"}`] = await cell(browser, { dark }, async (page) => {
            await settle(page);
            await page.mouse.move(2, 898);
            const rej = page.locator('[aria-label^="Reject color name"]').first();
            const st = await rej.evaluate((e) => { const s = getComputedStyle(e); const row = e.closest(".rounded-md"); const rs = getComputedStyle(row); const b = e.getBoundingClientRect(); return { color: s.color, bg: s.backgroundColor, rowBg: rs.backgroundColor, rect: [b.x, b.y, b.width, b.height] }; });
            const [x, y, w, h] = st.rect;
            await page.screenshot({ path: `${EVID}/c-reject-rest-${dark ? "dark" : "light"}.png`, clip: { x: x - 120, y: y - 16, width: w + 136, height: h + 32 } });
            return st;
        });
    }
    if (want.has("selector")) for (const [w, h] of [[390, 844], [320, 568]]) {
        out[`selector-${w}`] = await cell(browser, { viewport: { width: w, height: h } }, async (page) => {
            await settle(page);
            return page.evaluate(() => ({
                panes: [...document.querySelectorAll("[data-pane]")].map((e) => e.dataset.pane),
                tablists: [...document.querySelectorAll('[role="tablist"]')].map((t) => ({ text: t.innerText.replace(/\s+/g, " ").slice(0, 60), inPane: t.closest("[data-pane]")?.dataset.pane ?? null })),
                palettesLabelNodes: [...document.querySelectorAll("button, [role=tab]")].filter((b) => /^\s*Palettes\s*$/.test(b.innerText)).map((b) => { const r = b.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; }),
            }));
        });
    }
    if (want.has("rtl")) for (const dir of ["ltr", "rtl"]) {
        out[`rtl-${dir}`] = await cell(browser, {}, async (page) => {
            await settle(page);
            await page.evaluate((d) => { document.documentElement.dir = d; }, dir);
            await page.waitForTimeout(600);
            const r = await page.evaluate(`(() => { const R=${R}; const h1=document.querySelector("h1"); const row=h1.parentElement; return { h1: R(h1), rowKids: [...row.children].map(e=>({tag:e.tagName, cls:String(e.className).slice(0,80), r:R(e), ml:getComputedStyle(e).marginLeft, mr:getComputedStyle(e).marginRight})), badges:[...document.querySelectorAll('[data-pane="admin-names"] [data-slot="badge"], [data-pane="admin-names"] .badge')].length, mlTwo: document.querySelectorAll('[data-pane^="admin"] .ml-2').length }; })()`);
            await page.screenshot({ path: `${EVID}/c-header-${dir}.png`, clip: { x: 199, y: 88, width: 1042, height: 180 } });
            return r;
        });
    }
    if (want.has("shell")) out.shell = await cell(browser, {}, async (page) => {
        await settle(page);
        return page.evaluate(() => {
            const sh = document.querySelector('[data-pane="admin-names"] .pane-shell'); const card = sh?.querySelector(".pane-shell__card");
            const s = getComputedStyle(sh), c = getComputedStyle(card);
            return { shellCls: sh.className, shellMargins: [s.marginLeft, s.marginRight], shellW: sh.getBoundingClientRect().width, parentW: sh.parentElement.getBoundingClientRect().width, parentDisplay: getComputedStyle(sh.parentElement).display,
                cardCls: card.className, cardDisplay: c.display, cardMinH: c.minHeight, cardParentDisplay: s.display, cardShadow: c.boxShadow.slice(0, 200), splitCols: getComputedStyle(document.querySelector(".pane-main") ?? document.body).gridTemplateColumns };
        });
    });
    if (want.has("users")) out.users = await cell(browser, { route: { users: USERS(120) } }, async (page, log) => {
        await page.goto(`${BASE}/#/admin/users`, GOTO);
        await page.waitForSelector('[data-pane="admin-users"]', { timeout: 90000 });
        await page.waitForTimeout(3000);
        const r = await page.evaluate(() => {
            const pane = document.querySelector('[data-pane="admin-users"]');
            const txt = pane.innerText;
            const slugs = (txt.match(/user-\d{3}/g) ?? []);
            return { distinctSlugs: new Set(slugs).size, maxSlug: slugs.sort().at(-1), pager: !!pane.querySelector('[aria-live="polite"][aria-atomic="true"], nav[aria-label*="agin"]'), pagerText: [...pane.querySelectorAll("nav, [aria-live]")].map((e) => e.innerText.replace(/\s+/g, " ").slice(0, 80)), countText: (txt.match(/\b\d+\s+(users?|of)\b[^\n]{0,30}/gi) ?? []).slice(0, 4) };
        });
        await page.screenshot({ path: `${EVID}/c-users-120.png` });
        return { ...r, requests: log.map((l) => l.p) };
    });
    if (want.has("leak")) out.leak = await cell(browser, {}, async (page) => {
        await settle(page);
        await page.getByLabel("Search color names").fill("ember");
        await page.waitForTimeout(800);
        const namesRows = await page.evaluate(() => document.querySelectorAll("#admin-names-pending .flex.items-center.gap-3.rounded-md").length);
        const hops = {};
        for (const h of ["#/palettes", "#/browse", "#/admin/users"]) {
            await page.evaluate((x) => { location.hash = x; }, h);
            await page.waitForTimeout(2500);
            hops[h] = await page.evaluate(() => [...document.querySelectorAll('input[type="search"], input[aria-label^="Search"]')].filter((i) => i.offsetParent).map((i) => ({ label: i.getAttribute("aria-label"), value: i.value })));
        }
        await page.evaluate(() => { location.hash = "#/admin/names"; });
        await page.waitForTimeout(2000);
        const back = await page.evaluate(() => document.querySelector('input[aria-label="Search color names"]')?.value);
        return { namesRowsFiltered: namesRows, hops, namesValueOnReturn: back };
    });
    if (want.has("forced")) for (const dark of [false, true]) {
        out[`forced-${dark ? "dark" : "light"}`] = await cell(browser, { dark, forcedColors: "active" }, async (page) => {
            await settle(page);
            const r = await page.evaluate(() => {
                const q = (s) => document.querySelector(s); const cs = (e, ...p) => e ? Object.fromEntries(p.map((k) => [k, getComputedStyle(e)[k]])) : null;
                return { fc: matchMedia("(forced-colors: active)").matches, body: cs(document.body, "backgroundColor", "color"), row: cs(q("#admin-names-pending .rounded-md"), "borderTopColor", "borderTopStyle", "backgroundColor", "color"), tab: cs(q('[role="tab"][aria-selected="true"]'), "color", "backgroundColor", "outlineStyle"), ind: cs(q(".segmented-indicator"), "backgroundColor", "borderTopStyle", "borderTopColor", "forcedColorAdjust", "opacity"), input: cs(q(".search-seated"), "borderTopStyle", "borderTopColor", "backgroundColor"), card: cs(q(".pane-shell__card"), "borderTopStyle", "borderTopColor", "backgroundColor") };
            });
            await page.screenshot({ path: `${EVID}/c-forced-chromium-${dark ? "dark" : "light"}.png` });
            return r;
        });
    }
    if (want.has("zoom")) out.zoom200 = await cell(browser, {}, async (page) => {
        await settle(page);
        // text-only 200%: double the root font-size (rem/clamp-driven type) — the WCAG 1.4.4 "resize text" cell
        await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
        await page.waitForTimeout(1200);
        const r = await page.evaluate(() => {
            const rows = [...document.querySelectorAll("#admin-names-pending .flex.items-center.gap-3.rounded-md")];
            return { rootFs: getComputedStyle(document.documentElement).fontSize, docScrollW: document.documentElement.scrollWidth, vw: innerWidth,
                rows: rows.slice(0, 6).map((r) => { const b = r.getBoundingClientRect(), col = r.children[1], a = r.children[2].getBoundingClientRect(); const sp = [...col.querySelectorAll("span, p, div")].filter((e) => e.children.length === 0); return { r: [b.x, b.y, b.width, b.height].map(Math.round), actionsRight: Math.round(a.right), rowRight: Math.round(b.right), truncated: sp.map((e) => e.scrollWidth > e.clientWidth), titles: sp.map((e) => e.getAttribute("title")) }; }) };
        });
        await page.screenshot({ path: `${EVID}/c-text200-chromium.png` });
        return r;
    });
    if (want.has("keys")) out.keys = await cell(browser, {}, async (page) => {
        await settle(page);
        await page.locator('[aria-label="Search color names"]').focus();
        const seq = [];
        for (let i = 0; i < 8; i++) {
            await page.keyboard.press("Tab");
            seq.push(await page.evaluate(() => { const a = document.activeElement; const s = getComputedStyle(a); return { label: a.getAttribute("aria-label") ?? a.innerText?.slice(0, 30), fv: a.matches(":focus-visible"), ring: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`, shadow: s.boxShadow.slice(0, 80) }; }));
        }
        await page.screenshot({ path: `${EVID}/c-keyfocus-1440.png` });
        return { seq };
    });
    if (want.has("empty")) for (const st of ["empty", "error"]) {
        out[`acreage-${st}`] = await cell(browser, st === "empty" ? { route: { queue: [] } } : { route: { fail: true } }, async (page) => {
            await page.goto(`${BASE}/#/admin/names`, GOTO);
            await page.waitForSelector('[data-pane="admin-names"] .pane-shell__card', { timeout: 90000 });
            await page.waitForTimeout(4000);
            const r = await page.evaluate(() => {
                const card = document.querySelector('[data-pane="admin-names"] .pane-shell__card').getBoundingClientRect();
                const p = document.querySelector("#admin-names-pending"); const pr = p.getBoundingClientRect();
                const leaf = [...p.querySelectorAll("*")].reduce((m, e) => Math.max(m, e.getBoundingClientRect().bottom), pr.top);
                return { card: [card.x, card.y, card.width, card.height].map(Math.round), panel: [pr.x, pr.y, pr.width, pr.height].map(Math.round), contentBottom: Math.round(leaf), emptyBelowContent: Math.round(card.bottom - leaf), text: p.innerText.slice(0, 200), textChars: p.innerText.length };
            });
            await page.screenshot({ path: `${EVID}/c-acreage-${st}.png` });
            return r;
        });
    }
} finally {
    await browser.close();
}
save(`probe-c-${[...want].join("_").slice(0, 40)}.json`, out);
for (const [k, m] of Object.entries(out)) console.log(k, JSON.stringify(m).slice(0, 900));
