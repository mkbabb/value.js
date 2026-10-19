// SERVED MODEL: claude-opus-5-5
// KF.W13X.esc2 served falsifier (KF-W13.md addendum (g), COHESION §0er): headless real
// Chrome (COHESION §0ei), fresh context per cell (no stored picks).
//   D1 SHARE (ESC-dock-1 · KFA-114 · UIA-KF-056 · 140 · A2-KE-L2-12): the @mbabb menu's
//      Share row is a plain menuitem with 0 nested interactive descendants; selecting it
//      closes the menu and opens the share popover, which carries the copy glyph and is
//      anchored to the @mbabb trigger (below it, end-aligned to it unless the viewport
//      collision shifts it, and never over the closed menu).
//   D2 BANDS (ESC-dock-2 · A2-KE-L3-6): with the rail open (desktop), the top dock and
//      the transport centre on the stage column (`.stage-cell`), and with it closed, on
//      the viewport; each within 1 px. At 390 (no rail column) both centre on the viewport.
//   D3 HOME (ESC-dock-3 · UIA-KF-132): on home the Scene trigger, the collapsed face and
//      the Scene list's Home row each render a living miniature (`.scene-mini`), and the
//      dock and its list carry 0 lucide house glyphs.
// Usage: node esc2.mjs <base> <tag> [framesDir]
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, tag, outDir] = process.argv;
const only = (process.env.ONLY || "D1,D2,D3").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = [];
const shot = async (p, name) => { if (outDir) await p.screenshot({ path: `${outDir}/${tag}-${name}.png` }); };
const rect = (p, sel) => p.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height, cx: r.x + r.width / 2, b: r.bottom, r: r.right };
}, sel);
const r1 = (v) => (v == null ? v : Math.round(v * 10) / 10);
async function page(w, h, route, scheme = "light") {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    const p = await ctx.newPage();
    await p.goto(`${base}#/${route}`, { waitUntil: "load" });
    await p.waitForSelector('[data-dock-tether="top"] .glass-dock', { timeout: 30000 });
    await sleep(2500);
    return { ctx, p };
}

// ── D1 ──────────────────────────────────────────────────────────────────────
if (only.includes("D1")) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const { ctx, p } = await page(w, h, "cube");
    await p.hover('[data-dock-tether="top"] .glass-dock');
    await sleep(700);
    await p.click('[aria-label="@mbabb menu"]');
    await p.waitForSelector('[role="menu"]', { timeout: 5000 }).catch(() => {});
    await sleep(500);
    const row = await p.evaluate(() => {
        const r = [...document.querySelectorAll('[role="menuitem"]')].find((el) => el.textContent?.trim() === "Share");
        if (!r) return null;
        const nested = r.querySelectorAll('button, a[href], input, [role="button"], [aria-haspopup], [tabindex]:not([tabindex="-1"])').length;
        return { role: r.getAttribute("role"), nested };
    });
    await shot(p, `d1-${w}-menu`);
    await p.evaluate(() => {
        const r = [...document.querySelectorAll('[role="menuitem"]')].find((el) => el.textContent?.trim() === "Share");
        r?.focus();
    });
    await p.keyboard.press("Enter");
    await sleep(900);
    const after = await p.evaluate(() => {
        const menu = document.querySelector('[role="menu"]');
        const menuOpen = !!menu && menu.getClientRects().length > 0;
        const dlg = [...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent?.includes("Copy link"));
        const t = document.querySelector('[aria-label="@mbabb menu"]');
        const tr = t?.getBoundingClientRect();
        const dr = dlg?.getBoundingClientRect();
        const primary = dlg && [...dlg.querySelectorAll("button")].find((x) => x.textContent?.trim() === "Copy link");
        return {
            menuOpen,
            popover: !!dlg,
            copyGlyph: !!primary?.querySelector("svg.lucide-copy"),
            focusPrimary: !!primary && document.activeElement === primary,
            trigger: tr && { x: tr.x, r: tr.right, b: tr.bottom },
            pop: dr && { x: dr.x, r: dr.right, y: dr.y, b: dr.bottom },
            vw: innerWidth,
        };
    });
    await shot(p, `d1-${w}-share`);
    // Anchored: below the trigger, and end-aligned to it (right edges within 1 px) unless
    // the 16 px viewport collision padding moved it, in which case it still spans the
    // trigger's x range.
    let anchored = false;
    if (after.trigger && after.pop) {
        const below = after.pop.y >= after.trigger.b - 0.5 && after.pop.y - after.trigger.b <= 48;
        const endAligned = Math.abs(after.pop.r - after.trigger.r) <= 1;
        const collided = after.pop.r >= after.vw - 16 - 1 || after.pop.x <= 16 + 1;
        const spans = after.pop.x <= after.trigger.x + 1 && after.pop.r >= after.trigger.r - 1;
        anchored = below && (endAligned || (collided && spans));
    }
    const ok = !!row && row.role === "menuitem" && row.nested === 0 && !after.menuOpen && after.popover && after.copyGlyph && after.focusPrimary && anchored;
    res.push({ cell: `D1-cube-${w}`, ok, row, after, anchored });
    await ctx.close();
}

// ── D2 ──────────────────────────────────────────────────────────────────────
async function setRail(p, open) {
    const isOpen = () => p.evaluate(() => !!document.querySelector(".controls-layout--open"));
    if ((await isOpen()) === open) return true;
    await p.hover('[data-dock-tether="top"] .glass-dock');
    await sleep(700);
    await p.click("[data-dock-surface-item][data-selected]").catch(() => {});
    await sleep(300);
    return (await isOpen()) === open;
}
const D2_SIZES = (process.env.W || "1440x900,1024x768,390x844").split(",").map((s) => s.split("x").map(Number));
const D2_SCENES = (process.env.S || "cube,easing,spring,square").split(",");
if (only.includes("D2")) for (const [w, h] of D2_SIZES) for (const scene of D2_SCENES) for (const rail of ["open", "closed"]) {
    if (w < 1024 && rail === "closed") continue;
    const { ctx, p } = await page(w, h, scene);
    const set = await setRail(p, rail === "open");
    await p.mouse.move(w / 2, h / 2);
    await sleep(1800);
    const top = await rect(p, '[data-dock-tether="top"] .glass-dock');
    const bot = await rect(p, '[data-dock-tether="bottom"] .glass-dock');
    const stage = await rect(p, ".stage-cell");
    const railed = await p.evaluate(() => !!document.querySelector(".controls-layout--open:not(.controls-layout--railless)"));
    // The target axis: the stage column when a desktop rail is open, else the viewport.
    const target = w >= 1024 && railed ? stage?.cx : w / 2;
    const dTop = top && target != null ? r1(top.cx - target) : null;
    const dBot = bot && target != null ? r1(bot.cx - target) : null;
    const ok = set && dTop != null && dBot != null && Math.abs(dTop) <= 1 && Math.abs(dBot) <= 1;
    if (scene === "cube" || scene === "easing") await shot(p, `d2-${scene}-${w}-${rail}`);
    res.push({ cell: `D2-${scene}-${w}-${rail}`, ok, set, railed, target: r1(target), topCx: r1(top?.cx), botCx: r1(bot?.cx), stageCx: r1(stage?.cx), dTop, dBot });
    await ctx.close();
}

// ── D3 ──────────────────────────────────────────────────────────────────────
if (only.includes("D3")) for (const [w, h, scheme] of [[1440, 900, "light"], [1440, 900, "dark"], [390, 844, "light"]]) {
    const { ctx, p } = await page(w, h, "", scheme);
    await p.mouse.move(w / 2, h - 40);
    await sleep(4500); // let the dock idle to its collapsed face
    const collapsed = await p.evaluate(() => {
        const btn = [...document.querySelectorAll('[data-dock-tether="top"] button[aria-label="Scene"]')].find((b) => b.getClientRects().length > 0 && !b.closest("[inert]"));
        return btn ? { mini: !!btn.querySelector(".scene-mini"), lucide: !!btn.querySelector("svg.lucide-house, svg.lucide-home") } : null;
    });
    await shot(p, `d3-${w}-${scheme}-collapsed`);
    await p.hover('[data-dock-tether="top"] .glass-dock');
    await sleep(800);
    const trigger = await p.evaluate(() => {
        const t = document.querySelector('[data-dock-tether="top"] [role="combobox"][aria-label="Scene"]');
        return t ? { mini: !!t.querySelector(".scene-mini"), lucide: !!t.querySelector("svg.lucide-house, svg.lucide-home") } : null;
    });
    await p.click('[data-dock-tether="top"] [role="combobox"][aria-label="Scene"]');
    await sleep(900);
    const list = await p.evaluate(() => {
        const opts = [...document.querySelectorAll('[role="option"]')];
        const home = opts.find((o) => o.textContent?.trim() === "Home");
        return {
            options: opts.length,
            homeMini: !!home?.querySelector(".scene-mini"),
            lucide: document.querySelectorAll('[role="listbox"] svg.lucide-house, [role="listbox"] svg.lucide-home').length,
            minis: opts.filter((o) => o.querySelector(".scene-mini")).length,
        };
    });
    await shot(p, `d3-${w}-${scheme}-list`);
    const ok = !!collapsed && collapsed.mini && !collapsed.lucide && !!trigger && trigger.mini && !trigger.lucide && list.homeMini && list.lucide === 0 && list.minis === list.options;
    res.push({ cell: `D3-home-${w}-${scheme}`, ok, collapsed, trigger, list });
    await ctx.close();
}

await b.close();
const pass = res.filter((x) => x.ok).length;
for (const x of res) console.log(JSON.stringify(x));
console.log(`${tag}: ${pass}/${res.length}`);
fs.writeFileSync(new URL(`./${tag}.json`, import.meta.url), JSON.stringify({ tag, base, pass, total: res.length, res }, null, 1));
