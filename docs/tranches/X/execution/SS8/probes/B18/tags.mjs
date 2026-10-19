// SS-8 · B18 · AdminTagsPanel cells. Usage: node tags.mjs <cell...>
import { launch, cell, save, TAGS } from "./lib.mjs";
import { gotoAdmin, contrast, paneCard, shot } from "./measure.mjs";

const PANEL = '[data-pane="admin-tags"]';
const CHIP = `${PANEL} .group.rounded-full`;
const TAGS30 = [...TAGS.filter((t) => t.id !== "t4"), { id: "t30", name: "abcdefghij-klmnopqrst-uvwxyz-12", category: "style" }].map((t, i) => (i === 5 ? { ...t, name: "w".repeat(30) } : t));

async function geo(page) {
    return page.evaluate((PANEL) => {
        const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1)); };
        const p = document.querySelector(PANEL);
        const card = p.querySelector('[data-slot="card"]');
        const body = card?.querySelector(".fading-scroll") ?? card;
        const name = p.querySelector('input[aria-label="New tag name"]');
        const cat = p.querySelector('input[aria-label="New tag category"]');
        const clip = (i) => i && { field: r(i.closest(".input-bar")), input: r(i), cw: i.clientWidth, placeholderW: (() => { const c = document.createElement("canvas").getContext("2d"); const s = getComputedStyle(i); c.font = `${s.fontWeight} ${s.fontSize} ${s.fontFamily}`; return +c.measureText(i.placeholder).width.toFixed(1); })(), padInline: getComputedStyle(i).paddingInline };
        const refresh = p.querySelector('[aria-label="Refresh tags"]');
        const add = [...p.querySelectorAll("button")].find((b) => b.textContent.trim() === "Add tag");
        const chips = [...p.querySelectorAll(".group.rounded-full")];
        const dels = [...p.querySelectorAll('button[aria-label^="Delete tag"]')];
        const lastContent = [...p.querySelectorAll(".group.rounded-full, form, [role=status], [role=alert]")].pop();
        return {
            vw: innerWidth, panes: [...document.querySelectorAll("[data-pane]")].map((e) => [e.getAttribute("data-pane"), r(e)]), main: r(document.querySelector("main")),
            card: r(card), body: r(body), contentBottom: lastContent ? +lastContent.getBoundingClientRect().bottom.toFixed(1) : null,
            name: clip(name), cat: clip(cat), add: r(add), refresh: r(refresh),
            chips: chips.map((c) => ({ text: c.textContent.trim().slice(0, 32), rect: r(c), lines: Math.round(c.getBoundingClientRect().height / parseFloat(getComputedStyle(c).lineHeight || "16")) })),
            del: dels.slice(0, 3).map((d) => ({ rect: r(d), opacity: getComputedStyle(d).opacity, hit: (() => { const b = d.getBoundingClientRect(); const e = document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2); return e === d || d.contains(e); })() })),
            coarse: matchMedia("(pointer: coarse)").matches, dir: document.documentElement.dir,
        };
    }, PANEL);
}

const cells = {
    // "All live-DOM geometry": pane rects, input widths + placeholder clip, Refresh rect, body share, 30-char wrap.
    async geometry(b) {
        const out = {};
        for (const w of [320, 390, 768, 1024, 1440]) out[w] = await cell(b, { viewport: { width: w, height: 900 }, route: { tags: TAGS30 } }, async (page) => {
            await gotoAdmin(page, "tags"); await page.waitForSelector(CHIP);
            const g = await geo(page);
            if (w === 320 || w === 1440) await shot(page, `tags-populated-${w}-light`);
            return g;
        });
        out.coarse390 = await cell(b, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, async (page) => {
            await gotoAdmin(page, "tags"); await page.waitForSelector(CHIP); return geo(page);
        });
        out.rtl1440 = await cell(b, {}, async (page) => {
            await page.addInitScript(() => document.addEventListener("DOMContentLoaded", () => document.documentElement.setAttribute("dir", "rtl")));
            await gotoAdmin(page, "tags"); await page.waitForSelector(CHIP);
            const g = await geo(page); await shot(page, "tags-rtl-1440"); return g;
        });
        return out;
    },
    // ATP-2: the served hover wrapper + hit-test of the delete seat at rest.
    async atp2(b) {
        return cell(b, {}, async (page) => {
            await gotoAdmin(page, "tags"); await page.waitForSelector(CHIP);
            const css = await page.evaluate(() => {
                const hits = [];
                const walk = (rules, ctx) => { for (const r of rules) { if (r.cssRules && !r.selectorText) walk(r.cssRules, ctx.concat(r.conditionText ?? r.media?.mediaText ?? r.constructor.name)); else if (r.selectorText && /group-hover\\:opacity-100/.test(r.selectorText)) hits.push({ ctx, sel: r.selectorText.slice(0, 120), body: r.style.cssText.slice(0, 80) }); } };
                for (const s of document.styleSheets) { try { walk(s.cssRules, []); } catch {} }
                return hits;
            });
            const g = await geo(page);
            const cls = await page.locator(`${PANEL} button[aria-label^="Delete tag"]`).first().getAttribute("class");
            return { groupHoverRules: css, deleteClass: cls, del: g.del };
        });
    },
    // ATP-8: the category heading's composited ratio, both schemes.
    async atp8(b) {
        const out = {};
        for (const dark of [false, true]) out[dark ? "dark" : "light"] = await cell(b, { dark }, async (page) => {
            await gotoAdmin(page, "tags"); await page.waitForSelector(CHIP);
            const lab = page.locator(`${PANEL} label`).first();
            const meta = await lab.evaluate((e) => ({ cls: e.className, slot: e.getAttribute("data-slot"), color: getComputedStyle(e).color, paperField: document.body.hasAttribute("data-paper-field") }));
            const c = await contrast(page, `${PANEL} label`);
            const chip = await contrast(page, `${CHIP} span.truncate`);
            return { meta, heading: c, chipText: chip };
        });
        return out;
    },
    // C-axis: C-1 zero-request (signed out), C-3 race inversion, C-6 pillsAfterCreate, C-18 blank pill.
    async caxis(b) {
        const out = {};
        out.c1 = await cell(b, { admin: false }, async (page, log) => {
            await page.goto("http://localhost:9000/#/admin/tags", { waitUntil: "domcontentloaded", timeout: 90000 });
            await page.waitForTimeout(5000);
            return page.evaluate(() => ({ href: location.href, panes: [...document.querySelectorAll("[data-pane]")].map((e) => e.getAttribute("data-pane")), text: (document.querySelector('[data-pane="admin-tags"]') ?? document.querySelector("main"))?.innerText.slice(0, 200) })).then((v) => ({ ...v, adminRequests: log.map((l) => l.m + " " + l.p) }));
        });
        out.c3 = await cell(b, {}, async (page, log, st) => {
            // first GET slow and stale, second GET fast and fresh
            let n = 0;
            await page.route((u) => u.pathname.endsWith("/admin/tags"), async (route) => {
                if (route.request().method() !== "GET") return route.fallback();
                n++;
                const mine = n;
                if (mine === 1) { await new Promise((r) => setTimeout(r, 4000)); return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify([{ id: "s", name: "stale-first", category: "race" }]) }); }
                return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify([{ id: "f", name: "fresh-second", category: "race" }]) });
            });
            await page.goto("http://localhost:9000/#/admin/tags", { waitUntil: "domcontentloaded", timeout: 90000 });
            await page.waitForSelector(`${PANEL} [aria-label="Refresh tags"]`, { timeout: 90000 }).catch(() => {});
            await page.waitForTimeout(300);
            await page.locator(`${PANEL} [aria-label="Refresh tags"]`).click({ force: true }).catch((e) => null);
            await page.waitForTimeout(6000);
            return { gets: n, finalChips: await page.locator(CHIP).allTextContents() };
        });
        out.c6 = await cell(b, {}, async (page, log) => {
            let fail = true;
            await page.route((u) => u.pathname.endsWith("/admin/tags"), async (route) => {
                const m = route.request().method();
                if (m === "GET" && fail) return route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ title: "boom" }) });
                return route.fallback();
            });
            await gotoAdmin(page, "tags");
            await page.waitForTimeout(1200);
            const state = await page.evaluate((PANEL) => { const p = document.querySelector(PANEL); return { form: !!p.querySelector("form"), alert: p.querySelector('[role="alert"]')?.innerText.slice(0, 120) ?? null }; }, PANEL);
            await shot(page, "tags-loaderror-1440-light");
            return state;
        });
        out.c18 = await cell(b, { route: { tags: [{ id: "b", name: "", category: "blank" }, { id: "w", name: "warm", category: "mood" }, { id: "n", category: "nameless" }] } }, async (page) => {
            await gotoAdmin(page, "tags");
            await page.waitForTimeout(1500);
            const m = await page.evaluate((PANEL) => { const p = document.querySelector(PANEL); return { chips: [...p.querySelectorAll(".group.rounded-full")].map((c) => ({ text: c.textContent, w: +c.getBoundingClientRect().width.toFixed(1), label: c.querySelector("button")?.getAttribute("aria-label") })), boundary: document.querySelector('[data-error-boundary]') ? true : false, text: p.innerText.slice(0, 200) }; }, PANEL);
            await shot(page, "tags-blank-pill-1440-light");
            return m;
        });
        return out;
    },
    // ATP-29: which navigation sequences remount (evict) admin-tags.
    async atp29(b) {
        const out = {};
        const seqs = {
            back_once: ["admin/audit", "admin/tags"],
            all_admin: ["admin/users", "admin/names", "admin/audit", "admin/flagged", "admin/tags"],
            every_route: ["", "palettes", "browse", "extract", "mix", "generate", "gradient", "atmosphere", "blob", "admin/users", "admin/names", "admin/audit", "admin/flagged", "admin/tags"],
        };
        for (const [k, seq] of Object.entries(seqs)) out[k] = await cell(b, {}, async (page, log) => {
            await gotoAdmin(page, "tags");
            const steps = [];
            for (const r of seq) {
                await page.evaluate((r) => { location.hash = "#/" + r; }, r);
                await page.waitForTimeout(1800);
                steps.push({ r, tagGets: log.filter((l) => l.m === "GET" && l.p.endsWith("/admin/tags")).length });
            }
            const max = await page.evaluate(() => null);
            return { steps, tagGetsTotal: log.filter((l) => l.m === "GET" && l.p.endsWith("/admin/tags")).length };
        });
        return out;
    },
    async motion(b) {
        return cell(b, {}, async (page) => {
            await gotoAdmin(page, "tags"); await page.waitForSelector(CHIP);
            const rest = await page.evaluate((PANEL) => [...document.querySelector(PANEL).querySelectorAll("*")].map((e) => { const c = getComputedStyle(e); return c.transitionDuration.split(",").some((d) => parseFloat(d) > 0) ? `${e.tagName.toLowerCase()}|${c.transitionProperty}|${c.transitionDuration}` : null; }).filter(Boolean), PANEL);
            const del = page.locator(`${PANEL} button[aria-label^="Delete tag"]`).first();
            await del.hover(); await page.waitForTimeout(60);
            const hover = await page.evaluate((PANEL) => document.getAnimations().filter((a) => document.querySelector(PANEL).contains(a.effect?.target)).map((a) => `${a.constructor.name}|${a.transitionProperty ?? a.animationName}|${a.effect.getTiming().duration}`), PANEL);
            return { transitionsAtRest: [...new Set(rest)], animationsOnHover: hover };
        });
    },
    // ATP-23: EasingSpecimenStrip's Chip — does it render with cell geometry?
    async chip(b) {
        return cell(b, {}, async (page) => {
            await page.goto("http://localhost:9000/#/gradient", { waitUntil: "domcontentloaded", timeout: 90000 });
            await page.waitForSelector(".easing-row", { timeout: 90000 });
            await page.waitForTimeout(800);
            await page.locator(".easing-row button").first().click();
            await page.waitForSelector(".specimen-tile", { state: "visible", timeout: 15000 });
            await page.waitForTimeout(800);
            const m = await page.evaluate(() => {
                const sheetHas = [...document.styleSheets].some((s) => { try { return [...s.cssRules].some((r) => /glass-chip|data-shape="cell"|\.chip/.test(r.cssText.slice(0, 400))); } catch { return false; } });
                const tiles = [...document.querySelectorAll(".specimen-tile")].slice(0, 3).map((e) => { const c = getComputedStyle(e); const b = e.getBoundingClientRect(); return { attrs: [...e.attributes].map((a) => `${a.name}=${a.value}`).join(" ").slice(0, 220), rect: [b.width, b.height].map((n) => +n.toFixed(1)), bg: c.backgroundColor, radius: c.borderRadius, padding: c.padding, border: c.borderTopWidth + " " + c.borderTopColor, display: c.display }; });
                return { chipCssPresent: sheetHas, tiles };
            });
            const box = await page.locator(".specimen-strip").first().boundingBox();
            if (box) await shot(page, "chip-easing-strip-1440", { clip: { x: box.x - 8, y: box.y - 8, width: Math.min(box.width + 16, 900), height: box.height + 16 } });
            return m;
        });
    },
};

const pick = process.argv.slice(2);
const browser = await launch();
const out = {};
try {
    for (const k of pick.length ? pick : Object.keys(cells)) { out[k] = await cells[k](browser); save(`tags-${k}.json`, out[k]); }
} finally {
    await browser.close();
}
console.log("done", Object.keys(out).join(","));
