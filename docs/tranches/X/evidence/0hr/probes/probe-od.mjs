// §0hn.1 prod re-read: OD-9 / OD-10 / OD-11 / OD-15 / OD-3b on the served app.
// One headless Chromium per run, one context per cell, closed in finally.
// Usage: guarded -- node probe-od.mjs <tag> [origin]
// The Daraksha session token arrives ONLY as env VJ_SESSION (never printed or written).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";

const TAG = process.argv[2] || "r1";
const ORIGIN = process.argv[3] || "https://color.babb.dev";
const OUT = `${process.env.HOME}/.dev-logs/x-0hr/od/${TAG}`;
fs.mkdirSync(OUT, { recursive: true });
const TOKEN = process.env.VJ_SESSION || "";
const rows = [];
const browser = await chromium.launch({ headless: true });
try {
    const mk = async (vp, scheme, token) => {
        const ctx = await browser.newContext({ viewport: { width: vp[0], height: vp[1] }, deviceScaleFactor: vp[2] ?? 2, colorScheme: scheme });
        await ctx.addInitScript(([s, t, t2]) => {
            try { localStorage.setItem("vueuse-color-scheme", s); if (t) { localStorage.setItem("palette-user-token", t); localStorage.setItem("palette-user-slug", t2); } } catch {}
        }, [scheme, token, token ? (process.env.VJ_SLUG || "") : ""]);
        const page = await ctx.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push("PE " + String(e).slice(0, 160)));
        page.on("console", (m) => { if (m.type() === "error") errors.push("CE " + m.text().slice(0, 160)); });
        const bundles = new Set();
        page.on("response", (r) => { const m = r.url().match(/assets\/(index-[A-Za-z0-9_-]+\.js)/); if (m) bundles.add(m[1]); });
        return { ctx, page, errors, bundles };
    };

    // ── OD-9 / OD-10 / OD-11: the dock colour field (both viewports, both schemes)
    for (const vp of [[1800, 1000], [390, 844]]) for (const scheme of ["dark", "light"]) {
        const { ctx, page, errors, bundles } = await mk(vp, scheme, "");
        try {
            await page.goto(`${ORIGIN}/#/?space=oklch&color=efflorescence`, { waitUntil: "load", timeout: 60000 });
            await page.waitForTimeout(3500);
            await page.getByRole("button", { name: "Toggle action bar" }).click().catch(() => {});
            await page.waitForTimeout(1500);
            await page.getByRole("button", { name: "Open color input" }).click();
            await page.waitForSelector(".color-input", { timeout: 15000 });
            await page.waitForTimeout(800);
            await page.keyboard.press("ControlOrMeta+A");
            await page.keyboard.type("daraksha");
            await page.keyboard.press("Enter");
            await page.waitForTimeout(2000);
            const field = await page.evaluate(() => {
                const box = document.querySelector(".color-field") ?? document.querySelector(".color-input").parentElement;
                const isNew = !!document.querySelector(".color-field");
                const r = box.getBoundingClientRect();
                // OD-9: no mask/fade on the box or any ancestor; the box's right edge
                // is inside every clipping ancestor (overflow != visible).
                const masks = []; let clipRight = Infinity, clipLeft = -Infinity;
                for (let el = box; el && el !== document.documentElement; el = el.parentElement) {
                    const st = getComputedStyle(el);
                    const m = st.maskImage || st.webkitMaskImage;
                    if (m && m !== "none") masks.push(el.className.toString().slice(0, 40) + ":" + m.slice(0, 50));
                    if (el !== box && (st.overflowX !== "visible")) { const q = el.getBoundingClientRect(); clipRight = Math.min(clipRight, q.right); clipLeft = Math.max(clipLeft, q.left); }
                }
                for (const el of box.querySelectorAll("*")) { const st = getComputedStyle(el); const m = st.maskImage || st.webkitMaskImage; if (m && m !== "none") masks.push("desc " + el.className.toString().slice(0, 40) + ":" + m.slice(0, 50)); }
                const crown = box.querySelector("svg.gold-ink");
                const apply = box.querySelector('button[aria-label="Apply color"]');
                const inter = (a, b) => {
                    if (!a || !b) return null;
                    const p = a.getBoundingClientRect(), q = b.getBoundingClientRect();
                    return Math.max(0, Math.min(p.right, q.right) - Math.max(p.left, q.left)) * Math.max(0, Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top));
                };
                return {
                    isNew, text: box.querySelector(".color-input")?.textContent?.trim().slice(0, 30),
                    box: [Math.round(r.left), Math.round(r.right), Math.round(r.width)],
                    clip: [Math.round(clipLeft), Math.round(clipRight)],
                    clippedPx: Math.max(0, +(r.right - clipRight).toFixed(1), +(clipLeft - r.left).toFixed(1)),
                    masks, crown: !!crown, apply: !!apply, crownApplyOverlap: inter(crown, apply),
                    crownBoxInside: crown ? crown.getBoundingClientRect().right <= r.right + 0.5 : null,
                };
            });
            await page.screenshot({ path: `${OUT}/field-${vp[0]}-${scheme}.png` });
            // OD-11: type an invalid colour, commit, read the badge.
            const input = page.locator(".color-input").first();
            await input.click();
            await page.keyboard.press("ControlOrMeta+A");
            await page.keyboard.type("notacolourzz");
            await page.keyboard.press("Enter");
            await page.waitForTimeout(1200);
            const badge = await page.evaluate(() => {
                const b = document.getElementById("color-input-error");
                if (!b) return { present: false };
                const st = getComputedStyle(b); const r = b.getBoundingClientRect();
                const f = (document.querySelector(".color-field") ?? document.querySelector(".color-input")).getBoundingClientRect();
                return {
                    present: true, slot: b.dataset.slot, tone: b.dataset.tone, size: b.dataset.size,
                    text: b.textContent.trim(), radius: st.borderRadius, pad: `${st.paddingTop} ${st.paddingRight}`,
                    font: `${st.fontSize} ${st.fontWeight} ${st.fontFamily.split(",")[0]}`,
                    belowField: +(r.top - f.bottom).toFixed(1), overlapField: r.top < f.bottom - 0.5 && r.bottom > f.top,
                };
            });
            await page.screenshot({ path: `${OUT}/badge-${vp[0]}-${scheme}.png` });
            rows.push({ od: "9/10/11", vp: vp.slice(0, 2).join("x"), scheme, ...field, badge, bundles: [...bundles], pageErrors: errors.length, errs: errors.slice(0, 4) });
        } finally { await ctx.close(); }
    }

    // ── OD-15: picker stage ≤ --picker-measure at 1800 / 2560 / 3440 (picker, mix, palettes)
    for (const w of [1440, 1512, 1800, 2560, 3440]) for (const scheme of ["dark", "light"]) {
        const { ctx, page, errors } = await mk([w, w === 1440 ? 900 : w === 1512 ? 982 : Math.round(w * 0.5556), 1], scheme, "");
        try {
            for (const route of ["", "mix", "palettes"]) {
                await page.goto(`${ORIGIN}/#/${route}`, { waitUntil: "load", timeout: 60000 });
                await page.waitForSelector(".pane-container > .pane-wrapper--stage", { timeout: 30000 });
                await page.waitForTimeout(3000);
                const m = await page.evaluate(() => {
                    const probe = document.createElement("div");
                    probe.style.cssText = "position:absolute;visibility:hidden;inline-size:var(--picker-measure)";
                    document.querySelector(".app-layout")?.appendChild(probe);
                    const measure = probe.getBoundingClientRect().width; probe.remove();
                    const ow = (s) => document.querySelector(s)?.getBoundingClientRect().width ?? null;
                    return {
                        view: document.querySelector(".app-layout")?.dataset.view,
                        measureToken: getComputedStyle(document.documentElement).getPropertyValue("--picker-measure").trim(),
                        measurePx: +measure.toFixed(1),
                        stage: +ow(".pane-container > .pane-wrapper--stage")?.toFixed(1),
                        inspector: +ow(".pane-container > .pane-wrapper--inspector")?.toFixed(1),
                        spectrum: (() => { const e = document.querySelector(".pane-wrapper--stage .spectrum-picker"); if (!e) return null; const b = e.getBoundingClientRect(); return [+b.width.toFixed(1), +b.height.toFixed(1), +(b.width / b.height).toFixed(3)]; })(),
                    };
                });
                m.ok = m.stage != null && m.stage <= m.measurePx + 0.5;
                rows.push({ od: "15", w, scheme, route: route || "picker", ...m, errs: errors.length });
                if (route === "") await page.screenshot({ path: `${OUT}/picker-${w}-${scheme}.png` });
            }
        } finally { await ctx.close(); }
    }

    // ── OD-3b: My Palettes lists the account rows (Daraksha session)
    for (const vp of [[1800, 1000], [390, 844]]) {
        const { ctx, page, errors } = await mk(vp, "dark", TOKEN);
        try {
            const mine = page.waitForResponse((r) => r.url().includes("/palettes/mine"), { timeout: 30000 }).then((r) => r.status()).catch(() => null);
            await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "load", timeout: 60000 });
            const status = await mine;
            await page.waitForTimeout(4000);
            const r = await page.evaluate(() => {
                const grid = document.querySelector(".palettes-companion-grid");
                const txt = grid?.innerText ?? "";
                return {
                    grid: !!grid, hasDaraksha: /Daraksha/.test(txt), hasDarakshaGradient: /Daraksha Gradient/.test(txt),
                    owned: document.querySelector("[data-owned-status]")?.innerText.trim().slice(0, 80) ?? null,
                    empty: /No saved palettes yet/.test(txt),
                };
            });
            await page.screenshot({ path: `${OUT}/mine-${vp[0]}.png` });
            rows.push({ od: "3b", vp: vp.join("x"), mineStatus: status, ...r, errs: errors.length });
        } finally { await ctx.close(); }
    }
} finally {
    await browser.close();
}
fs.writeFileSync(`${OUT}/od.json`, JSON.stringify(rows, null, 1));
for (const r of rows) console.log(JSON.stringify(r));
