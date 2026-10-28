// SERVED MODEL: claude-opus-5-5 · SS-8 B15-palettes · CurrentPaletteEditor U-1..U-8, U-10, U-11 + PaletteSlugBar U-4.
// One browser per run; one context per cell; closed in finally. Headless Chromium (default shell).
// Usage: node b15-cpe.mjs → JSON to stdout; frames + json to ../evidence/B15-palettes/
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { open, hue, samplePng, contrast, SAVED12 } from "./b15-seed.mjs";
const EV = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../evidence/B15-palettes");
const out = {};
const b = await chromium.launch();
const cell = async (name, fn) => { if (ONLY && !ONLY.has(name)) return; try { out[name] = await fn(); } catch (e) { out[name] = { ERROR: String(e).slice(0, 400) }; } };
// glass Popover trigger="hover": a reka HoverCard (no role) on fine pointers, a role=dialog Popover on coarse ones —
// the panel is addressed by its accessible name only (run 1 addressed role=dialog and timed out on every desktop cell).
const PANEL = '[aria-label^="Actions for"]';
const ONLY = process.env.CELLS ? new Set(process.env.CELLS.split(",")) : null;
const swatch = (p, i = 0) => p.locator(".swatch-row button[aria-label^='Color swatch']").nth(i);
const center = async (loc) => { const r = await loc.boundingBox(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, r }; };
const visible = (p, s) => p.locator(s).first().isVisible().catch(() => false);
async function hoverOpen(p, i = 0) {
    const c = await center(swatch(p, i));
    await p.mouse.move(c.x, c.y, { steps: 6 });
    await p.locator(PANEL).first().waitFor({ state: "visible", timeout: 5000 });
    return c;
}
try {
    // U-1: the populated tray's share of the stage at the 200 % zoom arm (720×450 CSS = 1440×900 @200 %), 12 colours
    await cell("U1-zoom200", async () => {
        const { ctx, p } = await open(b, { current: hue(12, 3) }, { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
        try {
            const r = await p.evaluate(() => { const w = document.querySelector(".dashed-well").getBoundingClientRect();
                return { wellH: Math.round(w.height), vh: innerHeight, share: Math.round((w.height / innerHeight) * 1000) / 10,
                    swatches: document.querySelectorAll(".swatch-row button[aria-label^='Color swatch']").length,
                    docOverflowX: document.documentElement.scrollWidth - innerWidth }; });
            await p.screenshot({ path: path.join(EV, "cpe-u1-zoom200-720x450.png") });
            return r;
        } finally { await ctx.close(); }
    });
    // U-2: forced-colors behaviour of the ACTIVE edit overlay
    await cell("U2-forced-edit", async () => {
        const { ctx, p } = await open(b, { current: hue(5, 10) }, { forcedColors: "active" });
        try {
            await p.emulateMedia({ forcedColors: "active" });
            await hoverOpen(p, 1);
            await p.locator(`${PANEL} button[aria-label^='Edit color']`).first().click();
            await p.waitForTimeout(600);
            const r = await p.evaluate(() => { const o = document.querySelector(".edit-overlay"); if (!o) return { overlay: null };
                const cs = getComputedStyle(o); const r = o.getBoundingClientRect();
                const under = document.elementsFromPoint(r.x + r.width / 2, r.y + r.height / 2).slice(0, 4).map((e) => e.tagName + "." + String(e.className).slice(0, 40));
                return { forced: matchMedia("(forced-colors: active)").matches, display: cs.display, bg: cs.backgroundColor, border: `${cs.borderStyle} ${cs.borderWidth} ${cs.borderColor}`,
                    outline: `${cs.outlineStyle} ${cs.outlineWidth}`, boxShadow: cs.boxShadow.slice(0, 80), backdrop: cs.backdropFilter, rect: r.toJSON(), under }; });
            if (r.rect) await p.screenshot({ path: path.join(EV, "cpe-u2-forced-colors-edit-1440.png"), clip: { x: Math.max(0, r.rect.x - 80), y: Math.max(0, r.rect.y - 80), width: r.rect.width + 160, height: r.rect.height + 160 } });
            return r;
        } finally { await ctx.close(); }
    });
    // U-3: the PAINTED focus state of the three hover-panel action buttons (ring-ring/40), both schemes
    for (const theme of ["light", "dark"]) {
        await cell(`U3-${theme}`, async () => {
            const { ctx, p } = await open(b, { theme, current: hue(5, 10) });
            try {
                await hoverOpen(p, 0);
                await p.keyboard.press("Shift");
                const btn = p.locator(`${PANEL} button[aria-label^='Edit color']`).first();
                await btn.focus();
                await p.waitForTimeout(250);
                const g = await btn.evaluate((e) => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
                    let rule = 0; const walk = (rs) => { for (const x of rs) { if (x.cssRules) walk(x.cssRules); if (x.selectorText && x.selectorText.includes("ring-ring\\/40")) rule++; } };
                    for (const s of document.styleSheets) { try { walk(s.cssRules); } catch {} }
                    const root = getComputedStyle(document.documentElement);
                    return { focusVisible: e.matches(":focus-visible"), boxShadow: cs.boxShadow, outline: `${cs.outlineStyle} ${cs.outlineWidth}`, twRingColor: cs.getPropertyValue("--tw-ring-color"),
                        colorRingToken: root.getPropertyValue("--color-ring").trim() || "(unset)", ringRuleCount: rule, panelBg: getComputedStyle(e.closest("[role=dialog]")).backgroundColor,
                        wellBg: root.getPropertyValue("--well-bg").trim(), r: r.toJSON() }; });
                const buf = await p.screenshot({ path: path.join(EV, `cpe-u3-focus-${theme}.png`), clip: { x: g.r.x - 20, y: g.r.y - 20, width: g.r.width + 40, height: g.r.height + 40 } });
                // clip coordinates: button sits at (20,20) in the clip
                const y = 20 + g.r.height / 2;
                const px = await samplePng(b, buf, { ring1: { x: 19, y }, ring2: { x: 18, y }, under: { x: 6, y } });
                return { ...g, px, ratioVsUnderlay: { ring1: contrast(px.ring1, px.under), ring2: contrast(px.ring2, px.under) } };
            } finally { await ctx.close(); }
        });
    }
    // U-4: reach a >50-colour draft through a SHIPPED add path only (slider keyboard + the add slot), from empty
    await cell("U4-fifty-one", async () => {
        const { ctx, p } = await open(b, { current: null });
        try {
            // run 1 stepped the FIRST slider (L) and saturated at 100 % after 27 distinct colours; run 2 walks the HUE
            // slider from Home by i steps, so every add is a distinct colour (the add slot reorders on a repeat).
            const slider = p.locator("[role=slider]").nth(2);
            for (let i = 0; i < 51; i++) {
                await slider.focus(); await slider.press("Home");
                for (let k = 0; k < i * 3; k++) await slider.press("ArrowRight");
                await p.locator(".add-slot-ghost").first().click();
            }
            await p.waitForTimeout(500);
            const n = await p.locator(".swatch-row button[aria-label^='Color swatch']").count();
            const r = await p.evaluate(() => ({ wellH: Math.round(document.querySelector(".dashed-well").getBoundingClientRect().height), count: document.querySelector("[data-well-label-row]").innerText.replace(/\s+/g, " ") }));
            await p.screenshot({ path: path.join(EV, "cpe-u4-51-colours-1440.png") });
            return { swatches: n, ...r };
        } finally { await ctx.close(); }
    });
    // U-5 + U-7 + U-8: real-pointer reachability both directions; the empty-buffer overwrite via the panel's Remove
    await cell("U5U7U8-hover-latch", async () => {
        const { ctx, p, errors } = await open(b, { current: ["oklch(0.6 0.15 30)"] });
        try {
            const before = await p.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.find((x) => x.name === "Sunset Ridge").colors.length);
            await p.fill("input[aria-label='New palette name']", "Sunset Ridge");
            await p.keyboard.press("Enter");
            await p.waitForTimeout(400);
            const banner1 = await p.getByText('"Sunset Ridge" already exists.').isVisible();
            const s = await hoverOpen(p, 0);
            const panel = await p.locator(PANEL).first().boundingBox();
            const rm = await center(p.locator(`${PANEL} button[aria-label^='Remove color']`).first());
            const u8 = { swatchCx: Math.round(s.x), panelCx: Math.round(panel.x + panel.width / 2), dx: Math.round(panel.x + panel.width / 2 - s.x), panelAbove: panel.y + panel.height <= s.r.y, gapPx: Math.round(panel.y > s.r.y ? panel.y - (s.r.y + s.r.height) : s.r.y - (panel.y + panel.height)) };
            await p.mouse.move(rm.x, rm.y, { steps: 20 }); await p.waitForTimeout(500);
            const swatchToPanel = await visible(p, PANEL);
            await p.mouse.move(s.x, s.y, { steps: 20 }); await p.waitForTimeout(500);
            const panelToSwatch = await visible(p, PANEL);
            await p.mouse.move(rm.x, rm.y, { steps: 20 }); await p.waitForTimeout(300);
            await p.mouse.click(rm.x, rm.y); // a REAL click: no force
            await p.waitForTimeout(600);
            const afterRemove = await p.evaluate(() => ({ swatches: document.querySelectorAll(".swatch-row button[aria-label^='Color swatch']").length, label: document.querySelector("[data-well-label-row]").innerText.trim() }));
            const banner2 = await p.getByText('"Sunset Ridge" already exists.').isVisible();
            let after = null;
            if (banner2) { await p.getByRole("button", { name: "Update", exact: true }).click(); await p.waitForTimeout(800);
                after = await p.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.find((x) => x.name === "Sunset Ridge")?.colors.length ?? "gone"); }
            await p.screenshot({ path: path.join(EV, "cpe-u7-after-update-1440.png") });
            return { U5: { swatchToPanel, panelToSwatch }, U8: u8, U7: { savedColorsBefore: before, banner1, afterRemove, bannerAfterRemove: banner2, savedColorsAfterUpdate: after }, errors };
        } finally { await ctx.close(); }
    });
    // U-6: churn cadence of the always-mounted add slot under one 60-move slider drag (the C4-2 gesture)
    await cell("U6-churn", async () => {
        const { ctx, p } = await open(b, { current: hue(5, 10) });
        try {
            await p.evaluate(() => { const el = document.querySelector(".add-slot-ghost"); const dot = el.querySelector("span[style]") ?? el.querySelector("span");
                const turb = el.querySelector("feTurbulence"); window.__c = { style: 0, seed: 0, radii: new Set(), seeds: new Set(), dotTag: dot?.outerHTML.slice(0, 160), hasTurb: !!turb };
                const all = el.querySelectorAll("*");
                new MutationObserver((ms) => { for (const m of ms) { if (m.attributeName === "style") { window.__c.style++; window.__c.radii.add(getComputedStyle(m.target).borderRadius); } if (m.attributeName === "seed") { window.__c.seed++; window.__c.seeds.add(m.target.getAttribute("seed")); } } })
                    .observe(el, { attributes: true, subtree: true, attributeFilter: ["style", "seed"] }); });
            const box = await p.locator("[role=slider]").first().boundingBox();
            await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await p.mouse.down();
            for (let i = 1; i <= 60; i++) { await p.mouse.move(box.x + box.width / 2 + i * 2, box.y + box.height / 2); await p.waitForTimeout(8); }
            await p.mouse.up(); await p.waitForTimeout(300);
            return await p.evaluate(() => ({ styleMutations: window.__c.style, seedMutations: window.__c.seed, distinctRadii: window.__c.radii.size, distinctSeeds: window.__c.seeds.size, hasTurb: window.__c.hasTurb, dot: window.__c.dotTag }));
        } finally { await ctx.close(); }
    });
    // U-10: whole-buffer rewrite over a diverse-syntax draft — does a Remove drop more than the one element?
    await cell("U10-apply-drop", async () => {
        const forms = ["#e11d48", "rgb(37 99 235)", "hsl(142 71% 45%)", "hwb(40 10% 5%)", "lab(60 40 -30)", "lch(55 60 250)", "oklab(0.7 0.1 0.05)", "oklch(0.6 0.15 200)", "color(display-p3 0.2 0.7 0.4)", "color(xyz-d65 0.3 0.4 0.2)", "rebeccapurple", "oklch(0.98 0.4 120)"];
        const { ctx, p } = await open(b, { current: forms });
        try {
            const n0 = await p.locator(".swatch-row button[aria-label^='Color swatch']").count();
            const stored0 = await p.evaluate(() => JSON.parse(localStorage.getItem("color-picker")).savedColors);
            await hoverOpen(p, 0);
            const rm = await center(p.locator(`${PANEL} button[aria-label^='Remove color']`).first());
            await p.mouse.move(rm.x, rm.y, { steps: 10 }); await p.mouse.click(rm.x, rm.y); await p.waitForTimeout(600);
            const n1 = await p.locator(".swatch-row button[aria-label^='Color swatch']").count();
            const stored1 = await p.evaluate(() => JSON.parse(localStorage.getItem("color-picker")).savedColors);
            return { seeded: forms.length, renderedAfterRestore: n0, stored0, afterOneRemove: n1, stored1, extraLoss: n0 - 1 - n1 };
        } finally { await ctx.close(); }
    });
    // U-11: the mobile-edit dock layer at 390×844 (touch)
    await cell("U11-mobile-edit", async () => {
        const { ctx, p } = await open(b, { current: hue(5, 10) }, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
        try {
            await swatch(p, 1).tap();
            await p.locator(PANEL).first().waitFor({ state: "visible", timeout: 5000 });
            await p.locator(`${PANEL} button[aria-label^='Edit color']`).first().tap();
            await p.waitForTimeout(900);
            const r = await p.evaluate(() => { const save = [...document.querySelectorAll("[aria-label='Save edit']")].map((e) => { const r = e.getBoundingClientRect(); return { inDock: !!e.closest(".glass-dock, [class*=dock]"), w: r.width, h: r.height, x: Math.round(r.x), y: Math.round(r.y), vis: r.width > 0 && getComputedStyle(e).visibility !== "hidden" }; });
                const ov = document.querySelector(".edit-overlay"); return { saveEditSeats: save, desktopOverlayDisplay: ov ? getComputedStyle(ov).display : null }; });
            await p.screenshot({ path: path.join(EV, "cpe-u11-mobile-edit-390.png") });
            return r;
        } finally { await ctx.close(); }
    });
    // PaletteSlugBar U-4: the browser-observable surface of the login success paths at HEAD (A-3's throw site)
    await cell("PSB-U4-login-surface", async () => {
        const arms = {};
        for (const [arm, value] of [["slug-login", "brave-quiet-amber-fox"], ["admin-login", "x9Kq-admin-token-7f3a"]]) {
            const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
            try {
                await ctx.addInitScript(() => { localStorage.setItem("vueuse-color-scheme", "light"); window.__rej = []; addEventListener("unhandledrejection", (e) => window.__rej.push(String(e.reason).slice(0, 200))); });
                await ctx.route("**/sessions/login", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "s2", userSlug: "brave-quiet-amber-fox" }) }));
                await ctx.route("**/sessions", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "s", userSlug: "test-user" }) }));
                await ctx.route("**/admin/tags", (r) => r.fulfill({ status: 200, contentType: "application/json", body: "[]" }));
                const p = await ctx.newPage(); const errs = [];
                p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 200)));
                p.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errs.push(m.type() + " " + m.text().slice(0, 200)));
                await p.goto("http://localhost:9000/#/palettes", { timeout: 90000 });
                await p.getByRole("button", { name: "Menu" }).first().waitFor({ timeout: 60000 }); await p.waitForTimeout(800);
                await p.getByRole("button", { name: "Menu" }).first().click(); await p.waitForTimeout(400);
                await p.getByRole("menuitem", { name: /^Login$/ }).first().click(); await p.waitForTimeout(600);
                await p.getByRole("textbox", { name: "Slug or admin token" }).first().fill(value);
                await p.keyboard.press("Enter"); await p.waitForTimeout(2000);
                arms[arm] = { hash: await p.evaluate(() => location.hash), rejections: await p.evaluate(() => window.__rej), errs,
                    ls: await p.evaluate(() => [localStorage.getItem("palette-user-slug"), localStorage.getItem("palette-admin-token")]),
                    alert: await p.locator("#slug-edit-error").innerText().catch(() => null) };
            } finally { await ctx.close(); }
        }
        return arms;
    });
} finally { await b.close(); }
fs.writeFileSync(path.join(EV, process.env.CELLS ? "b15-cpe.run2.out.json" : "b15-cpe.out.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1).slice(0, 9000));
