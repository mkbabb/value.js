// SERVED MODEL: claude-opus-5-5 — SS-8 Z1 Dock follow-up cells against the BUILT artifact compiled
// with VITE_API_URL=http://localhost:3000. API_PROXY=1 relays the page's :3000 calls through
// Playwright's request layer and stamps the artifact's own origin into the CORS reply (the API
// allows only :9000, which a hung dev server holds). Nothing else is modified.
import { chromium } from "playwright";
import { boot, runCells, parkOnDock, EVID, ORIGIN } from "./lib.mjs";

async function ctxOf(browser, o = {}) {
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...o });
    if (process.env.API_PROXY) await c.route("http://localhost:3000/**", async (r) => {
        try { const resp = await r.fetch(); r.fulfill({ response: resp, headers: { ...resp.headers(), "access-control-allow-origin": ORIGIN } }); } catch { r.abort(); }
    });
    return c;
}
async function expand(p) {
    await parkOnDock(p);
    if (await p.locator(".glass-dock.collapsed").count()) { await p.locator(".glass-dock.collapsed").first().click().catch(() => {}); await p.waitForTimeout(900); await parkOnDock(p); }
}
const lamp = (p) => p.evaluate(() => [...document.querySelectorAll(".glass-dock [role=alert], .glass-dock [role=status]")].map((e) => ({ role: e.getAttribute("role"), t: e.textContent.trim().slice(0, 90) })));

await runCells(chromium, {
    // Z-Dock-2/3 + lamp: Login → focus; bogus slug → outcome over 10 s.
    async login(browser) {
        const ctx = await ctxOf(browser);
        try { const p = await ctx.newPage(); await boot(p, "/", 3000); await expand(p);
            const lampBefore = await lamp(p);
            await p.locator(".glass-dock").getByText("Login", { exact: true }).first().click(); await p.waitForTimeout(700);
            const focus = await p.evaluate(() => { const a = document.activeElement; return { tag: a?.tagName, label: a?.getAttribute("aria-label"), cls: a?.className?.toString().slice(0, 40) }; });
            const coarseFloor = null;
            const input = p.getByLabel("Slug or admin token");
            await input.fill("zzzz-zzzz-zzzz-zzzz"); await input.press("Enter");
            const t = [];
            for (const ms of [500, 2000, 6000, 10000]) { await p.waitForTimeout(ms - (t.at(-1)?.ms ?? 0));
                t.push({ ms, ...(await p.evaluate(() => { const i = document.querySelector('[aria-label="Slug or admin token"]'); const err = document.querySelector("#slug-edit-error"); const sw = document.querySelector('[aria-label="Signing in…"], [aria-label="Switch to slug"]');
                    return { inputVisible: !!i && i.getBoundingClientRect().width > 0, value: i?.value ?? null, error: err ? { t: err.textContent.trim(), role: err.getAttribute("role"), vis: err.getBoundingClientRect().width > 0 } : null, submit: sw?.getAttribute("aria-label") ?? null }; })) }); }
            await p.screenshot({ path: EVID + "r2-login-bogus.png" });
            return { lampBefore, focus, timeline: t };
        } finally { await ctx.close(); }
    },
    // Z-Dock-4/10: colour entry on "/" at 1440, 720 and 390 — reachable, focused, typed text lands.
    async colorentry(browser) {
        const out = {};
        for (const [k, o] of Object.entries({ d1440: {}, z720: { viewport: { width: 720, height: 900 } }, m390: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 } })) {
            const ctx = await ctxOf(browser, o);
            try { const p = await ctx.newPage(); await boot(p, "/", 3000); await expand(p);
                const tg = p.getByRole("button", { name: "Toggle action bar" });
                const toggle = await tg.count() ? await tg.first().isVisible() : false;
                if (toggle) { await tg.first().click(); await p.waitForTimeout(900); }
                const oc = p.getByRole("button", { name: "Open color input" });
                const ocVisible = await oc.count() ? await oc.first().isVisible() : false;
                let after = null;
                if (ocVisible) { await oc.first().click(); await p.waitForTimeout(900);
                    const focus = await p.evaluate(() => { const a = document.activeElement; return { tag: a?.tagName, label: a?.getAttribute("aria-label"), editable: !!a && (a.isContentEditable || a.tagName === "INPUT") }; });
                    const fields = await p.evaluate(() => [...document.querySelectorAll(".glass-dock input, .glass-dock [contenteditable=true]")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => ({ tag: e.tagName, label: e.getAttribute("aria-label"), w: Math.round(e.getBoundingClientRect().width) })));
                    await p.keyboard.type("red");
                    const typed = await p.evaluate(() => [...document.querySelectorAll(".glass-dock input, .glass-dock [contenteditable=true]")].map((e) => (e.value ?? e.textContent)).slice(0, 3));
                    after = { focus, fields, typed }; }
                await p.screenshot({ path: EVID + `r2-colorentry-${k}.png` });
                out[k] = { toggle, ocVisible, after };
            } finally { await ctx.close(); }
        }
        return out;
    },
    // Z-Dock-8: selected option visual delta (pixel) both schemes; Z-Dock-16 @-pill bidi.
    async viewmenu(browser) {
        const out = {};
        for (const scheme of ["light", "dark"]) { const ctx = await ctxOf(browser, { colorScheme: scheme });
            try { const p = await ctx.newPage(); await boot(p, "/generate", 3000); await expand(p);
                const pill = await p.evaluate(() => { const b = [...document.querySelectorAll(".glass-dock button, .glass-dock a")].find((x) => /^@/.test(x.textContent.trim())); if (!b) return null; const t = [...b.querySelectorAll("*")].find((x) => /^@/.test(x.textContent.trim()) && !x.children.length) ?? b; return { t: t.textContent.trim(), bidi: getComputedStyle(t).unicodeBidi, dirAttr: t.getAttribute("dir") ?? b.getAttribute("dir"), parentBidi: getComputedStyle(t.parentElement).unicodeBidi }; });
                await p.locator('[aria-label="Select view"]').first().click(); await p.waitForTimeout(900);
                const opts = p.locator("[role=option]"); const n = await opts.count(); const rows = [];
                for (let i = 0; i < n; i++) { const o = opts.nth(i); const buf = await o.screenshot(); const meta = await o.evaluate((e) => ({ t: e.textContent.trim().slice(0, 14), sel: e.getAttribute("aria-selected"), kids: e.querySelectorAll("*").length, checkedNodes: e.querySelectorAll("[data-state=checked]").length, html: e.outerHTML.replace(/<path[^>]*>/g, "").slice(0, 500),
                        pseudo: ["::before", "::after"].map((s) => { const c = getComputedStyle(e, s); return c.content === "none" ? null : { s, bg: c.backgroundColor, op: c.opacity, w: c.width }; }) }));
                    // mean luma of the option crop via PNG decode is heavy; compare raw size + bytes hash as a coarse delta and keep the crops.
                    let h = 0; for (let j = 0; j < buf.length; j += 7) h = (h * 31 + buf[j]) | 0;
                    rows.push({ ...meta, bytes: buf.length, h }); }
                await p.screenshot({ path: EVID + `r2-viewmenu-${scheme}.png` });
                out[scheme] = { pill, rows };
            } finally { await ctx.close(); } }
        return out;
    },
    // Z-Dock-10/11 whole-dock scope (hovered, 1440): cast shadows on every visible focusable + visible separators; Z-Dock-9 coarse arm.
    async pills(browser) {
        const out = {};
        for (const [k, o] of Object.entries({ fine: {}, coarse: { hasTouch: true } })) { const ctx = await ctxOf(browser, o);
            try { const p = await ctx.newPage(); await boot(p, "/", 3000); await expand(p);
                const census = () => p.evaluate(() => { const d = document.querySelector(".glass-dock"); const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== "hidden" && !e.closest("[inert]"); };
                    const foc = [...d.querySelectorAll("button,a[href],input,[tabindex]:not([tabindex='-1'])")].filter(vis);
                    return { focusables: foc.map((e) => (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 16)),
                        cast: foc.map((e) => ({ l: (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 16), sh: getComputedStyle(e).boxShadow })).filter((x) => x.sh !== "none" && x.sh.split(/,(?![^(]*\))/).some((l) => !/inset/.test(l))),
                        seps: [...d.querySelectorAll(".dock-separator, [role=separator]")].filter(vis).length,
                        ctrls: foc.map((e) => ({ l: (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 16), w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height) })) }; });
                const main = await census();
                await p.locator(".glass-dock").getByText("Login", { exact: true }).first().click(); await p.waitForTimeout(800);
                const slug = await census();
                out[k] = { coarse: await p.evaluate(() => matchMedia("(pointer: coarse)").matches), main, slug };
            } finally { await ctx.close(); } }
        return out;
    },
}, "dock2");
