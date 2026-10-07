// SERVED MODEL: claude-opus-5-5
// X.W12U.h — the Lens-3 falsifiers (A2-VA-L3-1..8) and the three hierarchy gates.
// Real Chrome, new headless (§0ei). One context per state; every arm writes its
// reading and an element frame. Usage:
//   node probe-h.mjs <tag d1440|v390> <theme light|dark> <phase before|after> [arms] [out.json]
// Arms: L3-1 L3-2 L3-4 L3-5 L3-7 L3-8 (L3-3 and L3-6 are glass rows: L3-3 is read
// inside L3-5's /blob cell, L3-6 inside the H gate's 390 cells).
// Gates read on every route visited: P (one primary per region) and
// H (every heading in a region out-sizes every control label in it).
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { prepare, VIEWPORTS, isPhone } from "../x/seed-x.mjs";
import { l35ok } from "./gate-l35.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE ?? "http://localhost:9000";
const [tag = "d1440", theme = "light", phase = "after"] = process.argv.slice(2, 5);
const ARMS = (process.argv[5] ?? "L3-1,L3-2,L3-4,L3-5,L3-7,L3-8").split(",");
const OUT = process.argv[6];
const [W, H] = VIEWPORTS[tag];
const touch = isPhone(tag);
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = { tag, theme, phase, W, H, base: BASE, at: new Date().toISOString(), arms: {}, gates: {} };
const put = (k, v, pass) => { res.arms[k] = { ...v, pass }; console.log(k, pass ? "GREEN" : "RED", JSON.stringify(v).slice(0, 400)); };

async function open(route, seed) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: touch, hasTouch: touch, colorScheme: theme });
    await prepare(ctx, { theme, ...seed });
    const p = await ctx.newPage();
    for (let i = 1; ; i++) {
        try { await p.goto(BASE + "/#" + route, { timeout: 240000 }); break; } catch (e) { console.log(`goto ${route} attempt ${i}: ${String(e).slice(0, 80)}`); if (i >= 3) throw e; }
    }
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 90000 }).catch(() => {});
    await p.waitForFunction(() => document.querySelectorAll(".pane-wrapper .pane-header-title").length > 0, null, { timeout: 90000 }).catch(() => {});
    await p.waitForTimeout(2500);
    return { p, ctx };
}
const frame = async (p, sel, name) => {
    const f = join(HERE, "frames", `${phase}-${name}-${tag}-${theme}.jpg`);
    const loc = p.locator(sel).first();
    try { await loc.screenshot({ path: f, type: "jpeg", quality: 55, timeout: 30000 }); }
    catch { await p.screenshot({ path: f, type: "jpeg", quality: 55 }); }
    return f.split("/").slice(-2).join("/");
};

// P + H, read per region (`.pane-wrapper`) of the settled route.
const gates = (p, route) => p.evaluate((route) => {
    const vis = (e) => { const q = e.getBoundingClientRect(); const s = getComputedStyle(e); return q.width > 0 && q.height > 0 && s.visibility !== "hidden" && s.display !== "none" && !e.closest("[aria-hidden=true], .sr-only, [inert]"); };
    const fs = (e) => parseFloat(getComputedStyle(e).fontSize);
    const out = [];
    for (const w of document.querySelectorAll(".pane-wrapper")) {
        const role = [...w.classList].find((c) => c.startsWith("pane-wrapper--"))?.slice(14) ?? "?";
        const primaries = [...w.querySelectorAll('[data-emphasis="primary"]')].filter(vis).map((e) => (e.getAttribute("aria-label") || e.textContent).trim().slice(0, 30));
        // The picker's colour-space trigger IS the plate title by ruling (S.W4 W4-1, "title-as-component";
        // display-3 rung, Q11a), so it is read as a heading, never as a control label.
        const heads = [...w.querySelectorAll("h1,h2,h3,h4,.config-section-title,.configurator-layer-heading,.space-trigger")].filter(vis).filter((e) => e.textContent.trim());
        // a control label = the text a control paints (buttons, tabs, triggers, fields), never an icon-only glyph
        const ctrls = [...w.querySelectorAll("button,[role=tab],[role=combobox],input:not([type=range]),select,textarea")].filter(vis).filter((e) => !e.classList.contains("space-trigger")).filter((e) => (e.textContent.trim() || e.value || e.placeholder || "").length > 0);
        const hMin = heads.length ? Math.min(...heads.map(fs)) : null;
        const hMinEl = heads.find((e) => fs(e) === hMin);
        const cMax = ctrls.length ? Math.max(...ctrls.map(fs)) : null;
        const cMaxEl = ctrls.find((e) => fs(e) === cMax);
        out.push({ role, primaries: primaries.length, primaryNames: primaries, hMin, hMinText: hMinEl?.textContent.trim().slice(0, 24), cMax, cMaxText: (cMaxEl?.textContent.trim() || cMaxEl?.placeholder || "").slice(0, 24), P: primaries.length <= 1, H: hMin === null || cMax === null || cMax < hMin });
    }
    return { route, regions: out };
}, route);
const gate = async (p, route) => { const g = await gates(p, route); res.gates[route] = g; for (const r of g.regions) console.log(`  gate ${route} ${r.role}: P=${r.primaries}${r.P ? "" : " RED"} H=${r.hMin}/${r.cMax}${r.H ? "" : " RED"} (${r.hMinText} vs ${r.cMaxText})`); };
const box = (p, sel) => p.evaluate((sel) => { const e = [...document.querySelectorAll(sel)].find((x) => x.getBoundingClientRect().width > 0); if (!e) return null; const q = e.getBoundingClientRect(); return { x: Math.round(q.left), y: Math.round(q.top), w: Math.round(q.width), h: Math.round(q.height), b: Math.round(q.bottom) }; }, sel);

// L3-1 — the empty/error headline never out-ranks its pane title (size, then weight).
const headPair = (p) => p.evaluate(() => [...document.querySelectorAll(".pane-wrapper")].map((w) => {
    const t = w.querySelector(".pane-header-title"), hl = w.querySelector('[role=status] > p.font-display, [role=alert] > p.font-display');
    if (!t || !hl || !hl.getBoundingClientRect().width) return null;
    const cs = (e) => { const s = getComputedStyle(e); return { fs: parseFloat(s.fontSize), fw: Number(s.fontWeight), lines: Math.round(e.getBoundingClientRect().height / parseFloat(s.lineHeight || s.fontSize)) }; };
    return { title: t.textContent.trim().slice(0, 20), t: cs(t), headline: hl.textContent.trim().slice(0, 30), h: cs(hl) };
}).filter(Boolean));
for (const arm of ARMS) {
    try {
        if (arm === "L3-1") {
            const cells = {};
            for (const [route, seed] of [["/nope/xyz", {}], ["/palettes", {}], ["/admin/tags", { admin: true, refused: true }]]) {
                const { p, ctx } = await open(route, seed);
                cells[route] = { pairs: await headPair(p), frame: await frame(p, '.pane-wrapper:has([role=status] > p.font-display, [role=alert] > p.font-display)', `L3-1${route.replace(/\//g, "_")}`) };
                await gate(p, route);
                await ctx.close();
            }
            const all = Object.values(cells).flatMap((c) => c.pairs);
            put(arm, cells, all.length >= 3 && all.every((x) => x.h.fs < x.t.fs));
        }
        if (arm === "L3-2") {
            const cells = {};
            for (const route of ["/admin/tags", "/admin/flagged", "/admin/users", "/admin/audit"]) {
                const { p, ctx } = await open(route, { admin: true, refused: true });
                cells[route] = await p.evaluate(() => {
                    const plate = [...document.querySelectorAll("[role=alert], [data-admin-access]")].some((e) => e.getBoundingClientRect().width > 0);
                    const dead = [...document.querySelectorAll(".pane-wrapper button")].filter((e) => e.getBoundingClientRect().width > 0 && /refresh|prune/i.test(e.getAttribute("aria-label") || e.textContent) && (e.disabled || e.getAttribute("aria-disabled") === "true")).map((e) => (e.getAttribute("aria-label") || e.textContent).trim());
                    return { plate, deadControls: dead };
                });
                cells[route].frame = await frame(p, ".pane-wrapper", `L3-2${route.replace(/\//g, "_")}`);
                await gate(p, route);
                await ctx.close();
            }
            { const { p, ctx } = await open("/atmosphere", {}); cells["/atmosphere"] = { footerBand: await box(p, ".config-action-bar"), frame: await frame(p, ".pane-wrapper", "L3-2_atmosphere") }; await gate(p, "/atmosphere"); await ctx.close(); }
            put(arm, cells, ["/admin/tags", "/admin/flagged", "/admin/users", "/admin/audit"].every((r) => cells[r].plate && cells[r].deadControls.length === 0));
        }
        if (arm === "L3-4") {
            const { p, ctx } = await open("/palettes", {});
            const v = await p.evaluate(() => {
                const well = [...document.querySelectorAll(".pane-wrapper--inspector .dashed-well")].find((e) => e.getBoundingClientRect().width > 0);
                if (!well) return null;
                const cap = [...well.querySelectorAll("span")].find((e) => /start a new palette/i.test(e.textContent));
                const add = well.querySelector('[aria-label^="Add current color"]');
                const r = (e) => e && e.getBoundingClientRect();
                const c = r(cap), a = r(add), w = r(well);
                return { wellH: Math.round(w.height), capMidY: c && Math.round(c.top + c.height / 2), addMidY: a && Math.round(a.top + a.height / 2), addTop: a && Math.round(a.top), capBottom: c && Math.round(c.bottom) };
            });
            v.frame = await frame(p, ".pane-wrapper--inspector .dashed-well", "L3-4_palettes");
            await gate(p, "/palettes");
            put(arm, v, !!v && v.capMidY !== null && v.addMidY !== null && Math.abs(v.capMidY - v.addMidY) <= 8);
            await ctx.close();
        }
        if (arm === "L3-5") {
            const cells = {};
            // the companion's dead band: card bottom − the lowest painted content in it
            const read = (p) => p.evaluate(() => {
                const o = {};
                for (const w of document.querySelectorAll(".pane-wrapper")) {
                    const role = [...w.classList].find((c) => c.startsWith("pane-wrapper--"))?.slice(14);
                    const card = w.firstElementChild; if (!card) continue;
                    const cb = card.getBoundingClientRect();
                    let low = cb.top;
                    for (const e of card.querySelectorAll("p,span,button,input,svg,canvas,h2,h3,label,img,[role=slider]")) { const q = e.getBoundingClientRect(); if (q.width > 0 && q.height > 0 && getComputedStyle(e).visibility !== "hidden" && q.bottom <= cb.bottom + 1) low = Math.max(low, q.bottom); }
                    const es = card.querySelector("[role=status]");
                    o[role] = { wrapH: Math.round(w.getBoundingClientRect().height), cardH: Math.round(cb.height), dead: Math.round(cb.bottom - low), emptyFillGap: es && es.getBoundingClientRect().height ? Math.round(cb.bottom - es.getBoundingClientRect().bottom) : null };
                }
                return o;
            });
            for (const [route, seed] of [["/gradient", {}], ["/extract", {}], ["/generate", {}], ["/mix", {}], ["/blob", {}]]) {
                const { p, ctx } = await open(route, seed);
                cells[route] = await read(p);
                cells[route].frame = await frame(p, ".pane-container", `L3-5${route.replace(/\//g, "_")}`);
                await gate(p, route);
                await ctx.close();
            }
            // GREEN (two-track widths only), on the register's two limbs:
            //  (a) the companion follows the row — its region is never taller than the stage's;
            //  (b) a companion's empty plate takes the leftover ground (reaches the card floor,
            //      within the card padding, or scrolls inside it) — never pinned to the top;
            //  and the stage of /blob is not stretched over dead ground (stage wrapper − card ≤ 48).
            const ok = l35ok(cells, W);
            put(arm, cells, ok);
        }
        if (arm === "L3-7") {
            const { p, ctx } = await open("/gradient", {});
            const read = () => p.evaluate(() => {
                const ins = document.querySelector('[data-testid="gradient-stop-inspector"]'); if (!ins) return null;
                const vis = (e) => e && e.getBoundingClientRect().width > 0;
                const pos = ins.querySelector('[data-testid="gradient-stop-position"]'), rm = [...ins.querySelectorAll("button")].find((e) => /remove/i.test(e.getAttribute("aria-label") || ""));
                const tops = new Set([...ins.children].filter((e) => e.getBoundingClientRect().height > 1 && !e.classList.contains("sr-only")).map((e) => Math.round(e.getBoundingClientRect().top)));
                return { text: ins.innerText.replace(/\s+/g, " ").trim().slice(0, 90), rows: tops.size, h: Math.round(ins.getBoundingClientRect().height), position: vis(pos), remove: vis(rm), posTop: vis(pos) ? Math.round(pos.getBoundingClientRect().top) : null, rmTop: vis(rm) ? Math.round(rm.getBoundingClientRect().top) : null };
            });
            const rest = await read();
            const f1 = await frame(p, '[data-testid="gradient-stop-inspector"]', "L3-7_rest");
            await p.locator("[data-stop-id]").first().click({ timeout: 60000 });
            await p.waitForTimeout(600);
            const sel = await read();
            const f2 = await frame(p, '[data-testid="gradient-stop-inspector"]', "L3-7_selected");
            await gate(p, "/gradient");
            put(arm, { rest, sel, frames: [f1, f2] }, !!rest && !rest.position && !rest.remove && rest.rows === 1 && !!sel && sel.position && sel.remove && Math.abs(sel.posTop - sel.rmTop) <= 12);
            await ctx.close();
        }
        if (arm === "L3-8") {
            const { p, ctx } = await open("/browse", { browse: "ok" });
            await p.locator("[data-palette-name]").first().waitFor({ timeout: 60000 }).catch(() => {});
            const v = await p.evaluate(() => [...document.querySelectorAll(".pane-wrapper--stage [data-palette-name]")].slice(0, 6).map((e) => ({ name: e.textContent.trim(), w: Math.round(e.getBoundingClientRect().width), ch: Math.round(e.getBoundingClientRect().width / (parseFloat(getComputedStyle(e).fontSize) * 0.5)), clipped: e.scrollWidth > e.clientWidth + 1 })));
            const f = await frame(p, ".pane-wrapper--stage", "L3-8_browse");
            await gate(p, "/browse");
            put(arm, { names: v, frame: f }, v.length > 0 && v.every((x) => !x.clipped || x.ch >= 16));
            await ctx.close();
        }
    } catch (e) { put(arm, { error: String(e).slice(0, 200) }, false); }
}
await b.close();
if (OUT) writeFileSync(OUT, JSON.stringify(res, null, 1));
