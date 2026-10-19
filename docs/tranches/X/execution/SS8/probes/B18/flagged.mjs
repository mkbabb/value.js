// SS-8 · B18 · AdminFlaggedPanel cells. Usage: node flagged.mjs <cell...>
import { launch, cell, save, FLAGGED } from "./lib.mjs";
import { gotoAdmin, contrast, paneCard, shot } from "./measure.mjs";

const PANEL = '[data-pane="admin-flagged"]';
const ROW = `${PANEL} .rounded-md.border.overflow-hidden`;

async function regionMedian(page, clip) {
    const png = await page.screenshot({ clip });
    return page.evaluate(async (b64) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height).data; const ch = [[], [], []];
        for (let i = 0; i < d.length; i += 4) for (let k = 0; k < 3; k++) ch[k].push(d[i + k]);
        return ch.map((a) => a.sort((p, q) => p - q)[a.length >> 1]);
    }, png.toString("base64"));
}
function ratio(a, b) {
    const t = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    const L = ([r, g, bb]) => 0.2126 * t(r) + 0.7152 * t(g) + 0.0722 * t(bb);
    const x = L(a), y = L(b);
    return +((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(3);
}

async function geometry(page) {
    return page.evaluate(({ PANEL, ROW }) => {
        const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1)); };
        const p = document.querySelector(PANEL);
        const card = p.querySelector('[data-slot="card"]');
        const rows = [...p.querySelectorAll(".rounded-md.border.overflow-hidden")];
        const pager = p.querySelector('[aria-label="Next page"]')?.parentElement;
        const lastContent = [...p.querySelectorAll(".rounded-md.border.overflow-hidden, [role=status], [role=alert]")].pop();
        const scroller = card?.querySelector(".fading-scroll");
        const badge = p.querySelector('[data-slot="badge"]');
        const probe = document.createElement("span"); p.appendChild(probe);
        probe.style.fontSize = "var(--control-text)"; const controlText = getComputedStyle(probe).fontSize;
        probe.style.fontSize = "var(--type-small)"; const typeSmall = getComputedStyle(probe).fontSize;
        probe.style.fontSize = "var(--type-caption)"; const typeCaption = getComputedStyle(probe).fontSize;
        probe.remove();
        return {
            vw: innerWidth, card: r(card), cardCH: card?.clientHeight, cardSH: card?.scrollHeight,
            scroller: scroller && { rect: r(scroller), cw: scroller.clientWidth, sw: scroller.scrollWidth, ch: scroller.clientHeight, sh: scroller.scrollHeight },
            rows: rows.map(r), rowOverflow: rows.map((e) => [e.clientWidth, e.scrollWidth]),
            lastContentBottom: lastContent ? +(lastContent.getBoundingClientRect().bottom).toFixed(1) : null,
            pager: r(pager),
            badge: badge && { cls: badge.className.split(" ").filter((c) => /text-|size|font/.test(c)).join(" "), fontSize: getComputedStyle(badge).fontSize, fontFamily: getComputedStyle(badge).fontFamily.slice(0, 30) },
            vars: { controlText, typeSmall, typeCaption },
            dismiss: [...p.querySelectorAll("button")].filter((b) => b.textContent.trim() === "Dismiss").slice(0, 2).map(r),
            del: [...p.querySelectorAll('button[aria-label^="Delete palette"]')].slice(0, 2).map(r),
            coarse: matchMedia("(pointer: coarse)").matches,
        };
    }, { PANEL, ROW });
}

const cells = {
    async pop(b) {
        const out = {};
        for (const [k, o] of Object.entries({ "1440": {}, "1024": { viewport: { width: 1024, height: 900 } } })) {
            out[k] = await cell(b, o, async (page) => {
                await gotoAdmin(page, "flagged");
                await page.waitForSelector(ROW);
                const g = await geometry(page);
                g.paneCard = await paneCard(page, "admin-flagged");
                await shot(page, `flagged-populated-${k}-light`);
                return g;
            });
        }
        out.empty = await cell(b, { route: { flagged: [] } }, async (page) => {
            await gotoAdmin(page, "flagged");
            await page.waitForTimeout(600);
            return geometry(page);
        });
        return out;
    },
    async count(b) {
        const out = {};
        for (const dark of [false, true]) out[dark ? "dark" : "light"] = await cell(b, { dark }, async (page) => {
            await gotoAdmin(page, "flagged");
            await page.waitForSelector(ROW);
            await page.evaluate((P) => { const e = [...document.querySelectorAll(`${P} span`)].find((s) => /^\s*\d+ flagged\s*$/.test(s.textContent)); e?.setAttribute("data-ss8-count", ""); }, PANEL);
            const c = await contrast(page, "[data-ss8-count]");
            await shot(page, `flagged-populated-1440-${dark ? "dark" : "light"}`);
            return c;
        });
        return out;
    },
    async skel(b) {
        const out = {};
        for (const dark of [false, true]) out[dark ? "dark" : "light"] = await cell(b, { dark, route: { delayMs: 9000 } }, async (page) => {
            await page.goto("http://localhost:9000/#/admin/flagged", { waitUntil: "domcontentloaded", timeout: 90000 });
            const sk = page.locator(`${PANEL} [data-slot="admin-list-skeleton"]`).first();
            await sk.waitFor({ timeout: 15000 });
            await page.waitForTimeout(500);
            const info = await sk.evaluate((e) => {
                const kids = [...e.querySelectorAll('[data-slot="skeleton"], .skeleton, div')].filter((k) => k.getBoundingClientRect().width > 0);
                const blk = e.firstElementChild; const c = getComputedStyle(blk);
                const b = blk.getBoundingClientRect(), row = e.getBoundingClientRect();
                return { blockBg: c.backgroundColor, blockAnim: c.animationName, rowBg: getComputedStyle(e).backgroundColor, block: [b.x, b.y, b.width, b.height], row: [row.x, row.y, row.width, row.height] };
            });
            // freeze the breathe so the sample is a stable frame
            await page.addStyleTag({ content: '[data-slot="admin-list-skeleton"] *{animation-play-state:paused!important}' });
            const [bx, by, bw, bh] = info.block, [rx, ry] = info.row;
            const block = await regionMedian(page, { x: bx + bw * 0.3, y: by + bh * 0.3, width: bw * 0.4, height: bh * 0.4 });
            const ground = await regionMedian(page, { x: rx + 3, y: by + bh * 0.3, width: 6, height: bh * 0.4 });
            await shot(page, `flagged-skeleton-1440-${dark ? "dark" : "light"}`, { clip: { x: rx - 6, y: ry - 6, width: info.row[2] + 12, height: info.row[3] * 2 + 24 } });
            return { ...info, block, ground, ratio: ratio(block, ground) };
        });
        return out;
    },
    async narrow(b) {
        const out = {};
        const V = { width: 390, height: 844 };
        out.pop390 = await cell(b, { viewport: V }, async (page) => { await gotoAdmin(page, "flagged"); await page.waitForSelector(ROW); const g = await geometry(page); await shot(page, "flagged-populated-390-light"); return g; });
        out.empty390 = await cell(b, { viewport: V, route: { flagged: [] } }, async (page) => { await gotoAdmin(page, "flagged"); await page.waitForTimeout(600); return geometry(page); });
        out.coarse390 = await cell(b, { viewport: V, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, async (page) => {
            await gotoAdmin(page, "flagged"); await page.waitForSelector(ROW);
            const g = await geometry(page);
            g.dismissCS = await page.locator(`${PANEL} button:has-text("Dismiss")`).first().evaluate((e) => { const c = getComputedStyle(e); return { minBlockSize: c.minBlockSize, height: c.height, paddingInline: c.paddingInline, fontSize: c.fontSize, uiScale: getComputedStyle(document.documentElement).getPropertyValue("--ui-coarse-scale") + "|" + getComputedStyle(document.documentElement).getPropertyValue("--ui-scale") }; });
            await shot(page, "flagged-coarse-390");
            return g;
        });
        return out;
    },
    async forcedRtl(b) {
        const out = {};
        out.forced = await cell(b, { forcedColors: "active" }, async (page) => {
            await gotoAdmin(page, "flagged"); await page.waitForSelector(ROW);
            const sw = await page.locator(`${ROW} .h-5.w-5.rounded-full`).evaluateAll((es) => es.slice(0, 5).map((e) => { const c = getComputedStyle(e); return { bg: c.backgroundColor, border: c.borderTopColor, fca: c.forcedColorAdjust }; }));
            const del = page.locator(`${PANEL} button[aria-label^="Delete palette"]`).first();
            const delRest = await del.evaluate((e) => getComputedStyle(e).color);
            await del.hover(); await page.waitForTimeout(300);
            const delHover = await del.evaluate((e) => ({ color: getComputedStyle(e).color, bg: getComputedStyle(e).backgroundColor }));
            await page.mouse.move(5, 5);
            const box = await page.locator(ROW).first().boundingBox();
            const swPix = await regionMedian(page, { x: box.x + 14, y: box.y + 16, width: 6, height: 6 });
            await shot(page, "flagged-forced-colors-1440", { clip: { x: box.x - 8, y: box.y - 8, width: box.width + 16, height: box.height + 16 } });
            return { swatches: sw, swatchPixel: swPix, delRest, delHover };
        });
        out.rtl = await cell(b, {}, async (page) => {
            await page.addInitScript(() => document.addEventListener("DOMContentLoaded", () => document.documentElement.setAttribute("dir", "rtl")));
            await gotoAdmin(page, "flagged"); await page.waitForSelector(ROW);
            const m = await page.evaluate((ROW) => {
                const r = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1)); };
                const row = document.querySelector(ROW);
                const flagRows = [...row.querySelectorAll(".border-t > div")];
                return { dir: document.documentElement.dir, row: r(row), flags: flagRows.map((f) => ({ parent: r(f), kids: [...f.children].map((k) => ({ text: k.textContent.trim().slice(0, 20), rect: r(k), ml: getComputedStyle(k).marginLeft, mr: getComputedStyle(k).marginRight })) })) };
            }, ROW);
            const box = await page.locator(ROW).first().boundingBox();
            await shot(page, "flagged-rtl-1440", { clip: { x: box.x - 8, y: box.y - 8, width: box.width + 16, height: box.height + 16 } });
            return m;
        });
        return out;
    },
    // U-4: what sits under a stationary pointer after the row it acted on unmounts.
    async landing(b) {
        const out = {};
        out.dismiss = await cell(b, {}, async (page, log) => {
            await gotoAdmin(page, "flagged"); await page.waitForSelector(ROW);
            const btn = page.locator(`${PANEL} button:has-text("Dismiss")`).first();
            const label = await btn.getAttribute("aria-label");
            const bb = await btn.boundingBox(); const x = bb.x + bb.width / 2, y = bb.y + bb.height / 2;
            await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.up();
            await page.waitForTimeout(1500);
            const under = await page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); const btn = e?.closest("button"); return { tag: e?.tagName, button: btn?.getAttribute("aria-label") ?? btn?.textContent.trim() }; }, [x, y]);
            return { acted: label, at: [x, y], under, requests: log.map((l) => l.m + " " + l.p) };
        });
        out.delete = await cell(b, {}, async (page, log) => {
            await gotoAdmin(page, "flagged"); await page.waitForSelector(ROW);
            const btn = page.locator(`${PANEL} button[aria-label^="Delete palette"]`).first();
            const label = await btn.getAttribute("aria-label");
            const bb = await btn.boundingBox(); const x = bb.x + bb.width / 2, y = bb.y + bb.height / 2;
            await page.mouse.click(x, y);
            await page.waitForSelector('[role="dialog"]');
            const confirm = page.getByRole("button", { name: "Delete palette", exact: true });
            const cb = await confirm.boundingBox();
            await confirm.click();
            await page.waitForTimeout(1500);
            await page.mouse.move(x, y);
            const under = await page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); const btn = e?.closest("button"); return { tag: e?.tagName, button: btn?.getAttribute("aria-label") ?? btn?.textContent.trim() }; }, [x, y]);
            const underConfirm = await page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); const btn = e?.closest("button"); return { tag: e?.tagName, button: btn?.getAttribute("aria-label") ?? btn?.textContent.trim() }; }, [cb.x + cb.width / 2, cb.y + cb.height / 2]);
            return { acted: label, at: [x, y], underOriginalPoint: under, confirmAt: [cb.x, cb.y], underConfirmPoint: underConfirm, requests: log.map((l) => l.m + " " + l.p) };
        });
        return out;
    },
    // U-8: focus landing after the focused row unmounts.
    async focus(b) {
        const out = {};
        const ae = (page) => page.evaluate(() => { const e = document.activeElement; return { tag: e?.tagName, label: e?.getAttribute("aria-label") ?? e?.textContent?.trim().slice(0, 40), isBody: e === document.body }; });
        out.dismiss = await cell(b, {}, async (page) => {
            await gotoAdmin(page, "flagged"); await page.waitForSelector(ROW);
            await page.locator(`${PANEL} button:has-text("Dismiss")`).first().focus();
            const before = await ae(page);
            await page.keyboard.press("Enter"); await page.waitForTimeout(1500);
            return { before, after: await ae(page) };
        });
        out.delete = await cell(b, {}, async (page) => {
            await gotoAdmin(page, "flagged"); await page.waitForSelector(ROW);
            await page.locator(`${PANEL} button[aria-label^="Delete palette"]`).first().focus();
            const before = await ae(page);
            await page.keyboard.press("Enter"); await page.waitForSelector('[role="dialog"]');
            const inDialog = await ae(page);
            await page.getByRole("button", { name: "Delete palette", exact: true }).focus();
            await page.keyboard.press("Enter"); await page.waitForTimeout(1500);
            return { before, inDialog, after: await ae(page) };
        });
        return out;
    },
    // U-9: H-1 cold-boot throw, H-2 repeating admin poll, H-3 query-before-hash.
    async hyp(b) {
        const out = {};
        out.h1 = await cell(b, {}, async (page) => {
            const cons = []; page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") cons.push(m.type() + ": " + m.text().slice(0, 160)); });
            await gotoAdmin(page, "flagged"); await page.waitForSelector(ROW);
            const boundary = await page.evaluate(() => [...document.querySelectorAll('[data-error-boundary], [role="alert"]')].map((e) => e.textContent.trim().slice(0, 80)));
            return { console: cons.slice(0, 12), boundary };
        });
        for (const tab of ["names", "flagged"]) out["h2_" + tab] = await cell(b, {}, async (page, log) => {
            await gotoAdmin(page, tab);
            const t0 = Date.now(); const n0 = log.length;
            await page.waitForTimeout(10000);
            const win = log.slice(n0).map((l) => ({ dt: l.t - t0, m: l.m, p: l.p }));
            return { totalAdminRequests: log.length, inQuiet10s: win };
        });
        out.h3 = await cell(b, {}, async (page, log) => {
            await page.goto("http://localhost:9000/?utm=x&q=1#/admin/flagged", { waitUntil: "domcontentloaded", timeout: 90000 });
            await page.waitForTimeout(4000);
            return page.evaluate(() => ({ href: location.href, panes: [...document.querySelectorAll("[data-pane]")].map((e) => e.getAttribute("data-pane")), title: document.title }));
        });
        return out;
    },
};

const pick = process.argv.slice(2);
const browser = await launch();
const out = {};
try {
    for (const k of pick.length ? pick : Object.keys(cells)) { out[k] = await cells[k](browser); save(`flagged-${k}.json`, out[k]); }
} finally {
    await browser.close();
}
console.log("done", Object.keys(out).join(","));
