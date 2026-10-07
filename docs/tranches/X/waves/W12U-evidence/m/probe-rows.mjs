// SERVED MODEL: claude-opus-5-5
// X.W12U.m — the interaction falsifiers of the Lens-2 rows, one page per arm.
//   L2-1  /browse Filters popover inside the viewport (844x390 is the RED cell)
//   L2-2  route H1 painted above the atmosphere canvas (red-ink pixel count, canvas on)
//   L2-5  /mix /blob /palettes: the routed subject region precedes the shared picker
//   L2-8  /generate plate verbs inside the plate (360 is the RED cell)
//   L2-11 /gradient Select open across a route change: no listbox survives
//   D     dock run overflow on /atmosphere (addendum (d)), every run element
// Real Chrome, new headless (§0ei). Usage: node probe-rows.mjs <tag> <theme> <arms,...> [out.json]
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { prepare, VIEWPORTS, isPhone } from "../x/seed-x.mjs";

const BASE = process.env.BASE ?? "http://localhost:9000";
const [tag = "v390", theme = "light"] = process.argv.slice(2, 4);
const ARMS = (process.argv[4] ?? "L2-1,L2-2,L2-5,L2-8,L2-11,D").split(",");
const OUT = process.argv[5];
const [W, H] = VIEWPORTS[tag];
const b = await chromium.launch({ channel: "chrome", headless: true });
const touch = isPhone(tag) || process.env.TOUCH === "1"; // TOUCH=1: a tablet is a coarse pointer (L2-6 is a coarse-pointer falsifier)
const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: touch, hasTouch: touch, colorScheme: theme });
await prepare(ctx, { theme, admin: true, palettes: true, browse: "ok" });
const p = await ctx.newPage();
// A2-VA-L2-12: safe areas emulated by CDP (portrait bottom 34; landscape L/R 47, bottom 21).
const INSET = process.env.INSET ?? (W > H && isPhone(tag) ? "landscape" : isPhone(tag) ? "portrait" : "none");
const INSETS = { none: { top: 0, bottom: 0, left: 0, right: 0 }, portrait: { top: 0, bottom: 34, left: 0, right: 0 }, landscape: { top: 0, bottom: 21, left: 47, right: 47 } };
await (await ctx.newCDPSession(p)).send("Emulation.setSafeAreaInsetsOverride", { insets: INSETS[INSET] });
// Instrument law under host load (load 150-480 during this seat): a navigation that times out
// is re-tried (max 3, each attempt logged); it never turns a reading GREEN by itself.
const go = async (r) => {
    for (let i = 1; ; i++) {
        try { await p.goto(BASE + "/#" + r, { timeout: 240000 }); break; } catch (e) { console.log(`goto ${r} attempt ${i} failed: ${String(e).slice(0, 80)}`); if (i >= 3) throw e; await p.waitForTimeout(5000); }
    }
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 90000 }).catch(() => {});
    await p.waitForTimeout(2500);
};
const rect = (s) => p.evaluate((s) => { const e = [...document.querySelectorAll(s)].find((x) => x.getBoundingClientRect().width > 0); if (!e) return null; const q = e.getBoundingClientRect(); return { x: Math.round(q.left), y: Math.round(q.top), r: Math.round(q.right), b: Math.round(q.bottom) }; }, s);
const res = { tag, theme, W, H, base: BASE, at: new Date().toISOString(), arms: {} };
const put = (k, v, pass) => { res.arms[k] = { ...v, pass }; console.log(k, pass ? "GREEN" : "RED", JSON.stringify(v)); };

for (const arm of ARMS) {
    try {
        if (arm === "L2-1") {
            await go("/browse");
            await p.getByRole("button", { name: /filter/i }).first().click();
            await p.waitForTimeout(800);
            const box = await rect("[data-slot=popover-content], [role=dialog]");
            put(arm, { box, vh: H }, !!box && box.y >= 0 && box.b <= H);
        }
        if (arm === "L2-2") {
            await go("/generate");
            const v = await p.evaluate(() => { const h = document.querySelector("h1.route-title"); h.style.color = "rgb(255,0,0)"; const q = h.getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height, cv: getComputedStyle(document.querySelector(".atmosphere-canvas")).zIndex, hp: getComputedStyle(h).position }; });
            await p.waitForTimeout(300);
            const png = await p.screenshot({ clip: { x: v.x, y: v.y, width: Math.max(1, v.w), height: Math.max(1, v.h) } });
            const red = await p.evaluate(async (b64) => { const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode(); const c = new OffscreenCanvas(img.width, img.height); const g = c.getContext("2d"); g.drawImage(img, 0, 0); const d = g.getImageData(0, 0, img.width, img.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] > 200 && d[i + 1] < 60 && d[i + 2] < 60) n++; return n; }, png.toString("base64"));
            put(arm, { redInkPx: red, canvasZ: v.cv, h1Position: v.hp }, red > 20);
        }
        if (arm === "L2-5") {
            const o = {};
            for (const r of ["/palettes", "/mix", "/blob"]) { await go(r); o[r] = { stage: await rect(".pane-wrapper--stage"), inspector: await rect(".pane-wrapper--inspector") }; }
            const single = Object.values(o).every((v) => v.stage && v.inspector && Math.abs(v.stage.x - v.inspector.x) < 2);
            const ok = Object.values(o).every((v) => v.stage && v.inspector && (Math.abs(v.stage.x - v.inspector.x) >= 2 || v.inspector.y < v.stage.y));
            put(arm, { single, ...o }, ok);
        }
        if (arm === "L2-8") {
            await go("/generate");
            // the Generate pane is a lazy chunk: read only once its plate has mounted (a missing plate is an unread cell, not a pass)
            await p.locator('[aria-label="Copy all colors"]').first().waitFor({ timeout: 120000 }).catch(() => {});
            const v = await p.evaluate(() => { const c = document.querySelector('[aria-label="Copy all colors"]'); if (!c) return null; let card = c.closest("[data-slot=card], .glass-resting, section"); const q = c.getBoundingClientRect(), k = card.getBoundingClientRect(); const r = document.querySelector('[aria-label="Regenerate"], button'); return { verbR: Math.round(q.right), cardR: Math.round(k.right), vw: innerWidth }; });
            put(arm, v, !!v && v.verbR <= v.cardR && v.verbR <= v.vw);
        }
        if (arm === "L2-11") {
            await go("/gradient");
            const trig = p.locator("[data-slot=select-trigger], [role=combobox]").filter({ hasText: /linear|radial|conic/i }).first();
            await trig.click({ timeout: 120000 });
            await p.waitForTimeout(800);
            const before = await rect("[role=listbox]");
            await p.evaluate(() => { location.hash = "#/"; });
            await p.waitForTimeout(3000);
            const after = await rect("[role=listbox]");
            put(arm, { before, after }, !!before && !after);
        }
        if (arm.startsWith("SA")) {
            // every visible interactive box inside an inset band: the side bands at any scroll; the bottom band for viewport-pinned (fixed) boxes (a sticky ancestor sticks at its top edge, so a sticky header's control below the fold is in-flow content, not pinned), and for in-flow boxes at the document end
            const ins = INSETS[INSET], o = {};
            for (const r of (process.env.SA_ROUTES ?? "/,/palettes,/browse,/generate,/gradient,/atmosphere,/admin/users").split(",")) {
                await go(r);
                const read = (atEnd) => p.evaluate(([ins, atEnd]) => { const pinned = (e) => { for (let a = e; a; a = a.parentElement) { if (getComputedStyle(a).position === "fixed") return true; } return false; }; return [...document.querySelectorAll("button,a[href],input,[role=tab],[role=combobox],[role=slider]")].filter((e) => { const q = e.getBoundingClientRect(); return q.width > 0 && q.height > 0 && q.bottom > 0 && q.top < innerHeight && ((ins.left > 0 && q.left < ins.left) || (ins.right > 0 && q.right > innerWidth - ins.right) || (ins.bottom > 0 && q.bottom > innerHeight - ins.bottom && (atEnd || pinned(e)))); }).map((e) => { const q = e.getBoundingClientRect(); return `${e.getAttribute("aria-label") ?? (e.textContent || e.tagName).trim().slice(0, 18)}@${Math.round(q.left)},${Math.round(q.top)}-${Math.round(q.right)},${Math.round(q.bottom)}`; }); }, [ins, atEnd]);
                const top = await read(false);
                await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
                await p.waitForTimeout(600);
                o[r] = { top, end: await read(true), pad: await p.evaluate(() => getComputedStyle(document.querySelector(".app-layout")).padding), viewport: await p.evaluate(() => document.querySelector("meta[name=viewport]").content) };
            }
            put(arm, { inset: INSET, ...o }, Object.values(o).every((v) => v.top.length === 0 && v.end.length === 0));
        }
        if (arm === "L2-6") {
            // A2-VA-L2-6 value half (A2-VA-X-9): every scene action seat's hit box >= 44x44 on a coarse pointer
            const o = {};
            for (const r of ["/", "/generate", "/gradient"]) {
                await go(r);
                await p.getByRole("button", { name: /toggle action bar/i }).first().click().catch(() => {});
                await p.waitForTimeout(1200);
                o[r] = await p.evaluate(() => [...document.querySelectorAll("[data-scene-action] button")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => { const q = e.getBoundingClientRect(); return `${e.getAttribute("aria-label")}:${Math.round(q.width * 10) / 10}x${Math.round(q.height * 10) / 10}`; }));
            }
            const all = Object.values(o).flat();
            put(arm, o, all.length > 0 && all.every((t) => { const [w, h] = t.split(":").pop().split("x").map(Number); return w >= 44 && h >= 44; }));
        }
        if (arm === "D") {
            const o = {};
            for (const r of ["/atmosphere", "/", "/gradient"]) { await go(r); o[r] = await p.evaluate(() => [...document.querySelectorAll(".glass-dock *")].filter((e) => e.scrollWidth > e.clientWidth + 0.5 && getComputedStyle(e).overflowX !== "visible").map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(" ").slice(0, 3).join(".")}:${e.scrollWidth}/${e.clientWidth}`)); }
            put(arm, o, Object.values(o).every((v) => v.length === 0));
        }
    } catch (e) { put(arm, { error: String(e).slice(0, 200) }, false); }
}
if (OUT) writeFileSync(OUT, JSON.stringify(res, null, 1));
await b.close();
