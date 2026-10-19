// SERVED MODEL: claude-opus-5-5
// KF.W13X.r4dock served falsifier (KF-W13.md addendum (g), the R-4 "dock and menu" row):
// headless real Chrome (COHESION §0ei), fresh context per cell.
//   A  UIA-KF-230 — one dock row, one register: the @mbabb trigger's computed font-family
//      equals the expanded Scene trigger's (the dock label face); the menu's identifier
//      ("@mbabb · GitHub") keeps the mono register.
//   B  UIA-KF-321 — the Share flow: (b1) Share closes the @mbabb menu and the share popover
//      opens; (b2) a COMPLETED copy closes the popover and the menu stays closed; (b3) a
//      REFUSED copy (the page's clipboard write rejects, injected) keeps the popover open on a
//      read-only field holding the link, focused and wholly selected, with no address-bar
//      toast and the address unchanged.
//   C  UIA-KF-159 — the transport's channel Select is named for what it does: its accessible
//      name is "Channel to edit"; no control is named "Select animation".
//   N  UIA-KF-267 (witness, not a gate) — Matrix Controls in use: the dock's state after the
//      idle delay, the pane's visible surface title, and the dock item state on re-expand.
// Usage: node r4dock.mjs <base> <tag> [framesDir]   (ONLY=A,B,C,N)
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, tag, outDir] = process.argv;
const only = (process.env.ONLY || "A,B,C,N").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = [];
const shot = async (p, name) => { if (outDir) await p.screenshot({ path: `${outDir}/${tag}-${name}.png` }); };
const TOP = '[data-dock-tether="top"] .glass-dock';
async function page(w, h, route, scheme = "light", opts = {}) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, ...opts.ctx });
    if (opts.init) await ctx.addInitScript(opts.init);
    const p = await ctx.newPage();
    await p.goto(`${base}#/${route}`, { waitUntil: "load" });
    await p.waitForSelector(TOP, { timeout: 60000 });
    await sleep(2500);
    return { ctx, p };
}
async function openMenu(p) {
    await p.hover(TOP);
    await sleep(700);
    await p.click('[aria-label="@mbabb menu"]');
    await p.waitForSelector('[role="menu"]', { timeout: 8000 }).catch(() => {});
    await sleep(500);
}
async function selectShare(p) {
    await p.evaluate(() => {
        [...document.querySelectorAll('[role="menuitem"]')].find((el) => el.textContent?.trim() === "Share")?.focus();
    });
    await p.keyboard.press("Enter");
    await sleep(900);
}
const menuOpen = (p) => p.evaluate(() => { const m = document.querySelector('[role="menu"]'); return !!m && m.getClientRects().length > 0; });
const sharePop = (p) => p.evaluate(() => !![...document.querySelectorAll('[role="dialog"]')].find((d) => d.textContent?.includes("Copy link")));
async function clickCopy(p) {
    await p.evaluate(() => {
        const d = [...document.querySelectorAll('[role="dialog"]')].find((x) => x.textContent?.includes("Copy link"));
        [...(d?.querySelectorAll("button") ?? [])].find((x) => x.textContent?.trim() === "Copy link")?.click();
    });
    await sleep(1200);
}

// ── A · UIA-KF-230 ───────────────────────────────────────────────────────────
if (only.includes("A")) for (const [w, h, route, scheme] of [[1440, 900, "", "light"], [1440, 900, "cube", "dark"], [390, 844, "", "light"]]) {
    const { ctx, p } = await page(w, h, route, scheme);
    await p.hover(TOP);
    await sleep(900);
    const f = await p.evaluate(() => {
        const fam = (el) => el && getComputedStyle(el).fontFamily.split(",")[0].trim().replace(/["']/g, "");
        const mb = document.querySelector('[aria-label="@mbabb menu"]');
        const scene = [...document.querySelectorAll('[data-dock-tether="top"] [aria-label="Scene"]')].find((el) => el.getAttribute("role") === "combobox" || el.hasAttribute("aria-haspopup"));
        return { mbabb: fam(mb), scene: fam(scene), register: mb?.closest("[data-register]")?.getAttribute("data-register") ?? null };
    });
    await shot(p, `a-${w}-${route || "home"}-${scheme}`);
    await openMenu(p);
    const ident = await p.evaluate(() => {
        const s = document.querySelector('[role="menu"] [data-register="code"]');
        return s ? { text: s.textContent?.trim(), fam: getComputedStyle(s).fontFamily.split(",")[0].trim().replace(/["']/g, "") } : null;
    });
    await shot(p, `a-${w}-${route || "home"}-${scheme}-menu`);
    const ok = !!f.mbabb && f.mbabb === f.scene && f.register === null && ident?.text === "@mbabb" && /fira/i.test(ident.fam ?? "");
    res.push({ cell: `A ${w} ${route || "home"} ${scheme}`, ok, ...f, ident });
    await ctx.close();
}

// ── B · UIA-KF-321 ───────────────────────────────────────────────────────────
if (only.includes("B")) for (const [w, h] of [[1440, 900], [390, 844]]) {
    // b1 + b2: a completed copy (clipboard granted)
    {
        const origin = new URL(base).origin;
        const { ctx, p } = await page(w, h, "cube", "light", { ctx: { permissions: ["clipboard-read", "clipboard-write"] } });
        await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin });
        await openMenu(p);
        await selectShare(p);
        const b1 = { menuOpen: await menuOpen(p), popover: await sharePop(p) };
        await clickCopy(p);
        const b2 = { popover: await sharePop(p), menuOpen: await menuOpen(p), toast: await p.evaluate(() => document.body.innerText.includes("Link copied")) };
        await shot(p, `b2-${w}-copied`);
        res.push({ cell: `B1 ${w} Share closes the menu, opens the popover`, ok: !b1.menuOpen && b1.popover, ...b1 });
        res.push({ cell: `B2 ${w} a completed copy closes the chain`, ok: !b2.popover && !b2.menuOpen && b2.toast, ...b2 });
        await ctx.close();
    }
    // b3: a refused copy
    {
        const init = () => {
            Object.defineProperty(navigator, "clipboard", {
                configurable: true,
                value: { writeText: () => Promise.reject(new DOMException("blocked", "NotAllowedError")) },
            });
        };
        const { ctx, p } = await page(w, h, "cube", "light", { init });
        const before = await p.evaluate(() => location.href);
        await openMenu(p);
        await selectShare(p);
        await clickCopy(p);
        const b3 = await p.evaluate(() => {
            const d = [...document.querySelectorAll('[role="dialog"]')].find((x) => x.textContent?.includes("Copy link"));
            const f = d?.querySelector("input[readonly]");
            return {
                popover: !!d,
                field: !!f,
                value: f?.value?.slice(0, 60) ?? null,
                hasState: /[?&]state=/.test(f?.value ?? ""),
                focused: !!f && document.activeElement === f,
                selected: !!f && f.selectionStart === 0 && f.selectionEnd === f.value.length && f.value.length > 0,
                addressBarToast: /address bar/i.test(document.body.innerText),
                menuOpen: (() => { const m = document.querySelector('[role="menu"]'); return !!m && m.getClientRects().length > 0; })(),
                href: location.href,
            };
        });
        await shot(p, `b3-${w}-refused`);
        const unchanged = b3.href === before;
        res.push({ cell: `B3 ${w} a refused copy offers the link, selected`, ok: b3.popover && b3.field && b3.hasState && b3.focused && b3.selected && !b3.addressBarToast && !b3.menuOpen && unchanged, ...b3, unchanged });
        await ctx.close();
    }
}

// ── C · UIA-KF-159 ───────────────────────────────────────────────────────────
if (only.includes("C")) for (const [w, h, scheme] of [[1440, 900, "light"], [390, 844, "dark"]]) {
    const { ctx, p } = await page(w, h, "cube", scheme);
    await p.hover('[data-dock-tether="bottom"] .glass-dock');
    await sleep(900);
    const named = await p.getByRole("combobox", { name: "Channel to edit", exact: true }).count();
    const old = await p.locator('[aria-label="Select animation"]').count();
    const oldRole = await p.getByRole("combobox", { name: "Select animation", exact: true }).count();
    await shot(p, `c-${w}-${scheme}`);
    res.push({ cell: `C ${w} ${scheme} channel select named for what it does`, ok: named === 1 && old === 0 && oldRole === 0, named, old, oldRole });
    await ctx.close();
}

// ── N · UIA-KF-267 witness ───────────────────────────────────────────────────
if (only.includes("N")) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const { ctx, p } = await page(w, h, "cube", "light");
    const sel = p.locator('[aria-label="Channel to edit"], [aria-label="Select animation"]').first();
    await p.hover('[data-dock-tether="bottom"] .glass-dock');
    await sleep(900);
    await sel.click({ timeout: 10000 }).catch(() => {});
    await sleep(600);
    await p.getByRole("option", { name: "Matrix", exact: true }).click({ timeout: 8000 }).catch(() => {});
    await sleep(800);
    await p.hover(TOP);
    await sleep(700);
    await p.locator('[data-dock-surface-item][data-surface="matrix-controls"]').first().click({ timeout: 8000 }).catch(() => {});
    await sleep(1200);
    // use the grid: focus a cell's field
    const used = await p.evaluate(() => {
        const inp = [...document.querySelectorAll("input")].find((i) => i.getClientRects().length && i.closest(".controls-surface, [data-surface], .panel-content"));
        inp?.focus();
        return !!inp;
    });
    await p.mouse.move(Math.round(w / 2), Math.round(h / 2));
    await sleep(5000);
    const read = await p.evaluate(() => {
        const dock = document.querySelector('[data-dock-tether="top"] .glass-dock');
        const vis = (el) => { if (!el) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight; };
        const title = [...document.querySelectorAll("h1,h2,h3,[role=heading],legend,.section-title")].find((el) => /matrix/i.test(el.textContent ?? "") && vis(el));
        const face = document.querySelector('[data-dock-tether="top"] button[aria-label="Scene"]:not([role="combobox"])');
        const expandedTrigger = document.querySelector('[data-dock-tether="top"] [role="combobox"][aria-label="Scene"]');
        return {
            collapsedFaceVisible: vis(face) && getComputedStyle(face).visibility !== "hidden",
            expandedTriggerVisible: vis(expandedTrigger) && !expandedTrigger.closest("[inert]"),
            dockAttrs: dock ? Object.fromEntries([...dock.attributes].filter((a) => /^data-|^aria-/.test(a.name)).map((a) => [a.name, a.value])) : null,
            paneTitle: title?.textContent?.trim().slice(0, 40) ?? null,
        };
    });
    await shot(p, `n-${w}-in-use`);
    await p.hover(TOP);
    await sleep(900);
    const item = await p.evaluate(() => {
        const it = document.querySelector('[data-dock-surface-item][data-surface="matrix-controls"]');
        return it ? { label: it.getAttribute("aria-label"), pressed: it.getAttribute("aria-pressed"), active: it.getAttribute("data-active") ?? it.getAttribute("data-state") } : null;
    });
    await shot(p, `n-${w}-reexpand`);
    res.push({ cell: `N ${w} Matrix Controls in use (witness)`, ok: null, used, ...read, item });
    await ctx.close();
}

await b.close();
const out = `${process.env.OUT_DIR || "."}/${tag}.json`;
fs.writeFileSync(out, JSON.stringify(res, null, 1));
for (const r of res) console.log(`${r.ok === null ? "NOTE" : r.ok ? "GREEN" : "RED"}  ${r.cell}  ${JSON.stringify(r).slice(0, 260)}`);
