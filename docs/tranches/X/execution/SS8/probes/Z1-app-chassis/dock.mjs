// SERVED MODEL: claude-opus-5-5 — SS-8 Z1 Dock cells (Chromium headless; one browser per run,
// one context per cell, closed in finally). CELLS env picks a subset.
import { chromium } from "playwright";
import { boot, runCells, parkOnDock, save, EVID } from "./lib.mjs";

const ctxOf = (browser, o = {}) => browser.newContext({ viewport: { width: 1440, height: 900 }, ...o });
const vsGold = (p) => p.evaluate(() => { const v = document.querySelector('[aria-label="Select view"]'); if (!v) return null; return { text: v.textContent.trim(), gold: !!v.querySelector(".gold-ink, .gold-shimmer, .gold-shimmer-icon") || v.classList.contains("gold-ink") }; });
async function expand(p) {
    await parkOnDock(p);
    if (await p.locator(".glass-dock.collapsed").count()) { await p.locator(".glass-dock.collapsed").first().click().catch(() => {}); await p.waitForTimeout(900); await parkOnDock(p); }
}
async function openTools(p) {
    await expand(p);
    const t = p.getByRole("button", { name: "Toggle action bar" });
    if (!(await t.count())) return false;
    await t.first().click({ timeout: 4000 }).catch(() => {}); await p.waitForTimeout(900); return true;
}
const sceneSnap = (p) => p.evaluate(() => { const m = document.querySelector("main"); let h = 0; const s = m ? m.innerHTML : ""; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return { len: s.length, h }; });
const widthTrace = (p, ms) => p.evaluate((ms) => new Promise((res) => { const d = document.querySelector(".glass-dock"); const ws = []; const t0 = performance.now(); const f = () => { ws.push(+d.getBoundingClientRect().width.toFixed(1)); if (performance.now() - t0 < ms) requestAnimationFrame(f); else { let mx = 0; for (let i = 1; i < ws.length; i++) mx = Math.max(mx, Math.abs(ws[i] - ws[i - 1])); res({ frames: ws.length, w0: ws[0], w1: ws.at(-1), maxStep: +mx.toFixed(1) }); } }; requestAnimationFrame(f); }), ms);

await runCells(chromium, {
    // Z-Dock-1: anon latch walk + cold atmosphere.
    async latch(browser) {
        const ctx = await ctxOf(browser);
        try { const p = await ctx.newPage(); const seq = [];
            await boot(p, "/", 2500); seq.push(["/", await vsGold(p)]);
            await p.evaluate(() => { location.hash = "#/atmosphere"; }); await p.waitForTimeout(1800); seq.push(["/atmosphere", await vsGold(p)]);
            await p.goBack(); await p.waitForTimeout(1800); seq.push(["back", await vsGold(p)]);
            await p.evaluate(() => { location.hash = "#/palettes"; }); await p.waitForTimeout(1800); seq.push(["/palettes", await vsGold(p)]);
            await p.evaluate(() => { location.hash = "#/"; }); await p.waitForTimeout(1800); seq.push(["/", await vsGold(p)]);
            await boot(p, "/atmosphere", 2500); const cold = await vsGold(p);
            const authed = await p.evaluate(() => [...document.querySelectorAll(".glass-dock button")].some((b) => /admin/i.test(b.textContent)));
            return { seq, coldAtmosphere: cold, adminAuthenticated: authed };
        } finally { await ctx.close(); }
    },
    // Z-Dock-2/3/6/13: login layer — focus on entry, controls floor, width trace across swap, bogus slug outcome.
    async login(browser) {
        const ctx = await ctxOf(browser);
        try { const p = await ctx.newPage(); await boot(p, "/", 2600); await expand(p);
            const login = p.locator(".glass-dock").getByText("Login", { exact: true });
            const loginVisible = await login.count() ? await login.first().isVisible() : false;
            if (!loginVisible) return { loginVisible };
            const trace = widthTrace(p, 800); await login.first().click(); const swap = await trace; await p.waitForTimeout(500);
            const focus = await p.evaluate(() => { const a = document.activeElement; return { tag: a?.tagName, label: a?.getAttribute("aria-label"), ph: a?.getAttribute("placeholder") }; });
            const controls = await p.evaluate(() => [...document.querySelectorAll(".glass-dock .dock-face.is-active input, .glass-dock .dock-face.is-active button")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => { const r = e.getBoundingClientRect(); return { tag: e.tagName, label: e.getAttribute("aria-label"), w: Math.round(r.width), h: Math.round(r.height) }; }));
            await p.screenshot({ path: EVID + "r2-login-open.png" });
            const input = p.getByLabel("Slug or admin token");
            await input.fill("zzzz-zzzz-zzzz-zzzz"); await input.press("Enter"); await p.waitForTimeout(3500);
            const after = await p.evaluate(() => { const i = document.querySelector('[aria-label="Slug or admin token"]'); const d = document.querySelector(".glass-dock"); return { inputPresent: !!i, inputVisible: !!i && i.getBoundingClientRect().width > 0, inputValue: i?.value ?? null,
                alerts: [...d.querySelectorAll("[role=alert],[role=status]")].map((e) => ({ role: e.getAttribute("role"), t: e.textContent.trim().slice(0, 120), vis: e.getBoundingClientRect().width > 0 })) }; });
            await p.screenshot({ path: EVID + "r2-login-after.png" });
            const net = await p.evaluate(() => performance.getEntriesByType("resource").filter((e) => /slug|user|session|auth/i.test(e.name)).map((e) => e.name.slice(0, 120)).slice(-5));
            return { loginVisible, swap, focus, controls, after, net };
        } finally { await ctx.close(); }
    },
    // Z-Dock-4/7/9/16: desktop tools + pill shadows + separators + live-region roles.
    async desk(browser) {
        const ctx = await ctxOf(browser);
        try { const p = await ctx.newPage(); await boot(p, "/", 2600); await expand(p);
            const census = await p.evaluate(() => { const d = document.querySelector(".glass-dock"); const vis = (e) => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== "hidden";
                const face = d.querySelector(".dock-face.is-active") ?? d;
                const foc = [...face.querySelectorAll("button,a,input,[tabindex]")].filter(vis);
                const cast = foc.map((e) => ({ l: e.getAttribute("aria-label") || e.textContent.trim().slice(0, 16), sh: getComputedStyle(e).boxShadow })).filter((x) => x.sh !== "none" && x.sh.split(/,(?![^(]*\))/).some((l) => !/inset/.test(l)));
                const seps = [...face.querySelectorAll('[role=separator], .dock-separator, [data-orientation="vertical"][role="none"]')].filter(vis).length;
                const live = [...d.querySelectorAll("[role=alert],[role=status],[aria-live]")].map((e) => ({ role: e.getAttribute("role"), live: e.getAttribute("aria-live"), cls: e.className.toString().slice(0, 50) }));
                const at = [...d.querySelectorAll("span")].find((s) => /^@/.test(s.textContent.trim()));
                return { focusables: foc.length, cast, seps, live, atPill: at ? { t: at.textContent.trim(), bidi: getComputedStyle(at).unicodeBidi, parentBidi: getComputedStyle(at.parentElement).unicodeBidi } : null,
                    bg: getComputedStyle(d).backgroundColor, backdrop: { state: d.getAttribute("data-backdrop-sample-state"), reason: d.getAttribute("data-backdrop-sample-reason"), luma: getComputedStyle(d).getPropertyValue("--glass-backdrop-luma").trim() },
                    dataAttrs: [...d.attributes].filter((a) => a.name.startsWith("data")).map((a) => a.name + "=" + a.value.slice(0, 30)) }; });
            const opened = await openTools(p);
            const oc = p.getByRole("button", { name: "Open color input" });
            let colorFocus = null, typed = null;
            if (opened && await oc.count()) { await oc.first().click(); await p.waitForTimeout(900);
                colorFocus = await p.evaluate(() => { const a = document.activeElement; return { tag: a?.tagName, label: a?.getAttribute("aria-label"), editable: a?.isContentEditable || a?.tagName === "INPUT" }; });
                await p.keyboard.type("red"); await p.waitForTimeout(300);
                typed = await p.evaluate(() => [...document.querySelectorAll(".glass-dock input, .glass-dock [contenteditable=true]")].map((e) => e.value ?? e.textContent).slice(0, 3)); }
            return { census, opened, openColorInput: await oc.count(), colorFocus, typed };
        } finally { await ctx.close(); }
    },
    // Z-Dock-12: dock paint both schemes.
    async schemes(browser) {
        const out = {};
        for (const scheme of ["light", "dark"]) { const ctx = await ctxOf(browser, { colorScheme: scheme });
            try { const p = await ctx.newPage(); await boot(p, "/", 3000); await expand(p);
                out[scheme] = await p.evaluate(() => { const d = document.querySelector(".glass-dock"); const layers = [d, ...d.querySelectorAll(":scope > *")].slice(0, 6).map((e) => ({ cls: e.className.toString().slice(0, 40), bg: getComputedStyle(e).backgroundColor, bgi: getComputedStyle(e).backgroundImage.slice(0, 60), bf: getComputedStyle(e).backdropFilter }));
                    const pse = ["::before", "::after"].map((s) => ({ s, bg: getComputedStyle(d, s).backgroundColor, bgi: getComputedStyle(d, s).backgroundImage.slice(0, 60) }));
                    return { layers, pse, state: d.getAttribute("data-backdrop-sample-state"), reason: d.getAttribute("data-backdrop-sample-reason"), luma: getComputedStyle(d).getPropertyValue("--glass-backdrop-luma").trim() }; });
            } finally { await ctx.close(); } }
        return out;
    },
    // Z-Dock-8: view menu selected-state delta, both schemes.
    async viewmenu(browser) {
        const out = {};
        for (const scheme of ["light", "dark"]) { const ctx = await ctxOf(browser, { colorScheme: scheme });
            try { const p = await ctx.newPage(); await boot(p, "/generate", 2600); await expand(p);
                await p.locator('[aria-label="Select view"]').first().click(); await p.waitForTimeout(900);
                out[scheme] = await p.evaluate(() => [...document.querySelectorAll("[role=option]")].map((o) => { const cs = getComputedStyle(o); const ind = o.querySelector("[data-state=checked], .indicator, svg"); return { t: o.textContent.trim().slice(0, 20), sel: o.getAttribute("aria-selected"), st: o.getAttribute("data-state"), bg: cs.backgroundColor, col: cs.color, fw: cs.fontWeight, ind: ind ? getComputedStyle(ind).opacity + "/" + getComputedStyle(ind).display : null }; }));
                if (scheme === "light") await p.screenshot({ path: EVID + "r2-viewmenu-light.png" });
            } finally { await ctx.close(); } }
        return out;
    },
    // Z-Dock-5: 1024x1366 one grammar.
    async tablet(browser) {
        const ctx = await ctxOf(browser, { viewport: { width: 1024, height: 1366 } });
        try { const p = await ctx.newPage(); await boot(p, "/", 2600);
            return await p.evaluate(() => { const vis = (e) => !!e && e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== "hidden";
                const d = document.querySelector(".glass-dock");
                const btn = (re) => [...d.querySelectorAll("button")].filter(vis).filter((b) => re.test((b.getAttribute("aria-label") || "") + " " + b.textContent)).map((b) => (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 20));
                return { mobileMenu: btn(/menu|more/i), desktopProfile: btn(/^ ?Login$|@|profile/i), allLabels: [...d.querySelectorAll("button")].filter(vis).map((b) => (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 20)) }; });
        } finally { await ctx.close(); }
    },
    // Z-Dock-10/15 · Z-App-7: mobile 390 + 720 zoom-equivalent: regenerate parity, colour entry, menu rows; desktop control.
    async mobile(browser) {
        const cells = { m390: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 }, z720: { viewport: { width: 720, height: 900 } }, d1440: {} };
        const out = {};
        for (const [k, o] of Object.entries(cells)) { const ctx = await ctxOf(browser, o);
            try { const p = await ctx.newPage(); await boot(p, "/generate", 3000);
                const opened = await openTools(p);
                const regen = p.locator('[data-scene-action="generate.regenerate"]');
                const regenVisible = (await regen.count()) ? await regen.first().isVisible() : false;
                let changed = null;
                if (regenVisible) { const a = await sceneSnap(p); await regen.first().click(); await p.waitForTimeout(1500); const b = await sceneSnap(p); changed = a.h !== b.h; }
                const oc = p.getByRole("button", { name: "Open color input" });
                let colorEntry = null;
                if (await oc.count() && await oc.first().isVisible()) { await oc.first().click(); await p.waitForTimeout(900); colorEntry = await p.evaluate(() => { const i = [...document.querySelectorAll(".glass-dock input, .glass-dock [contenteditable=true]")].filter((e) => e.getBoundingClientRect().width > 0); return { count: i.length, label: i[0]?.getAttribute("aria-label") ?? null }; }); }
                await p.screenshot({ path: EVID + `r2-mobile-${k}.png` });
                out[k] = { opened, regenVisible, changed, openColorInput: await oc.count(), colorEntry };
                if (k === "m390") { await boot(p, "/", 2500);
                    const trig = p.locator('.glass-dock button[aria-label*="menu" i], .glass-dock [aria-haspopup="menu"]');
                    if (await trig.count()) { await trig.first().click(); await p.waitForTimeout(800);
                        out[k].menuRows = await p.evaluate(() => [...document.querySelectorAll("[role=menuitem]")].map((e) => ({ t: e.textContent.trim().slice(0, 20), h: Math.round(e.getBoundingClientRect().height) }))); }
                    else out[k].menuRows = "no menu trigger"; }
            } finally { await ctx.close(); } }
        return out;
    },
    // Z-LG-6: coarse pointer dock control rung (emulated, NOT a device).
    async coarse(browser) {
        const out = {};
        for (const [k, o] of Object.entries({ fine: {}, coarse: { hasTouch: true } })) { const ctx = await ctxOf(browser, { viewport: { width: 1280, height: 900 }, ...o });
            try { const p = await ctx.newPage(); await boot(p, "/", 2500); await expand(p);
                out[k] = await p.evaluate(() => ({ coarse: matchMedia("(pointer: coarse)").matches, ctrls: [...document.querySelectorAll(".glass-dock .dock-face.is-active button")].filter((b) => b.getBoundingClientRect().width > 0).map((b) => ({ l: (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 18), h: Math.round(b.getBoundingClientRect().height), w: Math.round(b.getBoundingClientRect().width) })) }));
            } finally { await ctx.close(); } }
        return out;
    },
}, "dock");
