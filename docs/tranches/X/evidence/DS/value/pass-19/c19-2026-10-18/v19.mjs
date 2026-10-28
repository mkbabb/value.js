// X-DS · value · pass 19 cure (critic V19C, 2026-10-18) — the witnesses for the consumer rows.
//   V19C-01: every admin console (5) at 1440 and 390, light and dark: the header paints no veil
//            (`.pane-header::before` display none), and the header band reads no tone step against
//            the body (median RGB of a strip inside the header vs one just below it, same columns).
//            A long roster (60 users) at 1440: the port scrolls (scrollHeight > clientHeight), the
//            document does not (scrollHeight <= innerHeight + 1), and the header does not move.
//   V19C-02: the @mbabb wordmark and the dock's view label read >= 4.5 (peak pixel against the
//            band median) on the default light, dark and owner-brown bands.
//   V19C-03: the Audit and Tags fields wear `.search-seated` and the body voice (field and placeholder).
//   V19C-04: no count over an empty Flagged / Tags plate; all four Refresh buttons are one grammar.
//   V19C-05: the steps start tile's glyph opens at the origin baseline.
//   V19C-06: Not Found's H1 / dock label and the About card's labels are sentence case.
//   V19C-07: the colour-space menu's HSV row carries the alpha clause.
// Real Chrome, new headless (§0ei). ONE browser per run, a new context per cell, closed in finally.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, NOW } from "./harness.mjs";

const BASE = process.argv[2] || "http://localhost:9491";
const OUT = import.meta.dirname;
const OWNER = "space=lab&color=" + encodeURIComponent("lab(38% 32 24)");
const out = { base: BASE, headers: [], roster: [], dockInk: [], fields: [], counts: [], misc: {} };

const users = (n) => Array.from({ length: n }, (_, i) => ({
    slug: `user-${String(i).padStart(2, "0")}`, createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: (i % 5) + 1,
}));

async function seedAdmin(page, { userCount = 2 } = {}) {
    await page.addInitScript(({ list }) => {
        try {
            for (const k of ["palette-user-slug", "palette-user-token", "palette-session-token"]) localStorage.removeItem(k);
            localStorage.setItem("palette-admin-token", "test-admin-token");
        } catch {}
        const real = window.fetch.bind(window);
        const json = (b) => Promise.resolve(new Response(JSON.stringify(b), { status: 200, headers: { "content-type": "application/json" } }));
        const pg = (data) => ({ data, total: data.length, limit: 100, offset: 0 });
        window.fetch = (input, init) => {
            const href = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
            const u = new URL(href, location.href);
            const method = (init?.method || (typeof input === "object" && input.method) || "GET").toUpperCase();
            if (u.pathname === "/sessions" && method === "POST") return json({ token: "test-session-token", userSlug: "test-user" });
            if (u.pathname.startsWith("/admin/")) {
                if (method !== "GET") return json({});
                if (u.pathname.startsWith("/admin/tags")) return json([]);
                if (u.pathname.startsWith("/admin/users")) return json(pg(list));
                return json(pg([]));
            }
            return real(input, init);
        };
    }, { list: users(userCount) });
}

/** Peak-pixel contrast of an element's text node against the median of its box. */
async function readWord(page, sel, text) {
    const rect = await page.evaluate(({ sel, text }) => {
        for (const el of document.querySelectorAll(sel)) {
            const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            let n;
            while ((n = w.nextNode())) if (n.textContent.trim() === text) break;
            if (!n) continue;
            const range = document.createRange();
            range.selectNodeContents(n);
            const r = range.getBoundingClientRect();
            if (r.width > 2 && r.height > 2 && r.right > 0 && r.left < innerWidth)
                return { x: r.x, y: r.y, w: r.width, h: r.height, color: getComputedStyle(n.parentElement).color };
        }
        return null;
    }, { sel, text });
    if (!rect) return { found: false };
    const png = (await page.screenshot()).toString("base64");
    return page.evaluate(async ({ png, r }) => {
        const bin = atob(png), u = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
        const img = await createImageBitmap(new Blob([u], { type: "image/png" }));
        const c = new OffscreenCanvas(img.width, img.height), g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, img.width, img.height).data;
        const sx = img.width / innerWidth;
        const lin = (v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
        const lum = ([a, b, cc]) => 0.2126 * lin(a) + 0.7152 * lin(b) + 0.0722 * lin(cc);
        const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
        const all = [];
        for (let y = Math.floor(r.y * sx); y < Math.ceil((r.y + r.h) * sx); y++)
            for (let x = Math.floor(r.x * sx); x < Math.ceil((r.x + r.w) * sx); x++) { const i = (y * img.width + x) * 4; all.push([d[i], d[i + 1], d[i + 2]]); }
        const ground = [...all].sort((a, b) => lum(a) - lum(b))[Math.floor(all.length / 2)];
        let top = 1, ink = ground;
        for (const p of all) { const q = ratio(p, ground); if (q > top) { top = q; ink = p; } }
        return { found: true, color: r.color, ground: `rgb(${ground})`, ink: `rgb(${ink})`, ratio: Math.round(top * 100) / 100 };
    }, { png, r: rect });
}

/** Header band vs body: median RGB of a strip in the header's lower half and one just under it. */
async function headerStep(page) {
    const geo = await page.evaluate(() => {
        const h = [...document.querySelectorAll("main .pane-header")].find((e) => e.getBoundingClientRect().height > 0);
        if (!h) return null;
        const r = h.getBoundingClientRect(), card = h.closest(".card").getBoundingClientRect();
        const before = getComputedStyle(h, "::before");
        return { top: r.top, bottom: r.bottom, x0: card.right - 120, x1: card.right - 24, veil: before.display, veilOpacity: before.opacity };
    });
    if (!geo) return { found: false };
    const png = (await page.screenshot()).toString("base64");
    const step = await page.evaluate(async ({ png, g }) => {
        const bin = atob(png), u = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
        const img = await createImageBitmap(new Blob([u], { type: "image/png" }));
        const c = new OffscreenCanvas(img.width, img.height), cx = c.getContext("2d");
        cx.drawImage(img, 0, 0);
        const d = cx.getImageData(0, 0, img.width, img.height).data;
        const sx = img.width / innerWidth;
        const med = (y0, y1) => {
            const ch = [[], [], []];
            for (let y = Math.floor(y0 * sx); y < Math.ceil(y1 * sx); y++) for (let x = Math.floor(g.x0 * sx); x < Math.ceil(g.x1 * sx); x++) {
                const i = (y * img.width + x) * 4; ch[0].push(d[i]); ch[1].push(d[i + 1]); ch[2].push(d[i + 2]);
            }
            return ch.map((a) => a.sort((p, q) => p - q)[Math.floor(a.length / 2)]);
        };
        const head = med(g.top + (g.bottom - g.top) * 0.35, g.bottom - 18);
        const body = med(g.bottom + 4, g.bottom + 24);
        return { head, body, maxChannelStep: Math.max(...head.map((v, i) => Math.abs(v - body[i]))) };
    }, { png, g: geo });
    return { found: true, veil: geo.veil, veilOpacity: geo.veilOpacity, ...step };
}

const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
    // ── V19C-01 + V19C-03 + V19C-04: the five consoles ──
    for (const theme of ["light", "dark"]) for (const width of [1440, 390]) for (const sub of ["users", "names", "audit", "flagged", "tags"]) {
        const page = await newPage(browser, width, theme);
        const row = { sub, width, theme };
        try {
            await seedAdmin(page);
            await bootRoute(page, `${BASE}/#/admin/${sub}`);
            await page.waitForTimeout(1200);
            row.file = `admin-${sub}-${width}-${theme}.png`;
            await page.screenshot({ path: path.join(OUT, row.file) });
            row.header = await headerStep(page);
            row.seated = await page.evaluate(() => !!document.querySelector("main .card > .pane-header ~ .pane-scroll-fade.fading-scroll--y, main .card > .pane-header ~ .pane-scroll-fade"));
            if (sub === "audit" || sub === "tags") row.fields = await page.evaluate(() => [...document.querySelectorAll("main input[type=text]")].map((i) => ({
                label: i.getAttribute("aria-label"), seated: !!i.closest(".search-seated"),
                font: getComputedStyle(i).fontFamily.split(",")[0], placeholderFont: getComputedStyle(i, "::placeholder").fontFamily.split(",")[0],
                h: Math.round(i.closest(".input-bar")?.getBoundingClientRect().height ?? 0),
            })));
            row.toolbar = await page.evaluate(() => {
                const btn = [...document.querySelectorAll("main button")].find((b) => /^Refresh/.test(b.getAttribute("aria-label") || b.textContent.trim()));
                const count = [...document.querySelectorAll("main .text-mono-small")].map((s) => s.textContent.trim()).filter((t) => /^\d+ /.test(t));
                return { refresh: btn ? { label: btn.getAttribute("aria-label"), text: btn.textContent.trim(), w: Math.round(btn.getBoundingClientRect().width) } : null, counts: count,
                    emptyPlate: [...document.querySelectorAll("main p, main div")].map((e) => e.textContent.trim()).find((t) => /^No (flagged|tags)/.test(t)) ?? null };
            });
        } catch (e) { row.error = String(e).slice(0, 300); }
        finally { await page.context().close(); }
        out.headers.push(row);
    }
    // ── V19C-01: the long roster scrolls in the port ──
    for (const theme of ["light", "dark"]) {
        const page = await newPage(browser, 1440, theme);
        const row = { theme, width: 1440, users: 60 };
        try {
            await seedAdmin(page, { userCount: 60 });
            await bootRoute(page, `${BASE}/#/admin/users`);
            await page.getByText("user-59").first().waitFor({ state: "attached", timeout: 60_000 });
            await page.waitForTimeout(1000);
            const read = () => page.evaluate(() => {
                const port = document.querySelector("main .card > .pane-scroll-fade");
                const h = document.querySelector("main .pane-header");
                return { portScrollH: port.scrollHeight, portClientH: port.clientHeight, portScrollTop: Math.round(port.scrollTop),
                    docScrollH: document.documentElement.scrollHeight, innerH: innerHeight, headerTop: Math.round(h.getBoundingClientRect().top),
                    veil: getComputedStyle(h, "::before").display };
            });
            row.before = await read();
            await page.evaluate(() => { document.querySelector("main .card > .pane-scroll-fade").scrollTop = 600; });
            await page.waitForTimeout(600);
            row.after = await read();
            row.file = `admin-users-roster-1440-${theme}.png`;
            await page.screenshot({ path: path.join(OUT, row.file) });
            row.verdict = row.before.portScrollH > row.before.portClientH + 10 && row.before.docScrollH <= row.before.innerH + 1
                && row.after.portScrollTop > 0 && row.after.headerTop === row.before.headerTop ? "GREEN" : "RED";
        } catch (e) { row.error = String(e).slice(0, 300); }
        finally { await page.context().close(); }
        out.roster.push(row);
    }
    // ── V19C-02: the dock words on the default and owner-brown bands ──
    for (const theme of ["light", "dark"]) for (const [ground, q] of [["default", ""], ["owner-brown", "?" + OWNER]]) {
        const page = await newPage(browser, 1440, theme);
        const row = { ground, theme, width: 1440 };
        try {
            await seedAdmin(page);
            await bootRoute(page, `${BASE}/#/admin/users${q}`);
            await page.getByText("user-01").first().waitFor({ timeout: 60_000 });
            await page.waitForTimeout(1000);
            row.file = `dock-${ground}-1440-${theme}.png`;
            await page.screenshot({ path: path.join(OUT, row.file) });
            row.wordmark = await readWord(page, ".glass-dock button", "@mbabb");
            row.viewLabel = await readWord(page, ".glass-dock .view-select-trigger, .glass-dock [aria-label='Select view']", "Users");
            row.adminWord = await readWord(page, '[data-o18="admin-trigger"]', "admin");
            row.tokens = await page.evaluate(() => { const d = document.querySelector(".glass-dock"); const s = getComputedStyle(d);
                return { fg: s.getPropertyValue("--foreground").trim(), dockFg: s.getPropertyValue("--dock-fg-on-aurora").trim(), muted: s.getPropertyValue("--muted-foreground").trim(), contrastColor: CSS.supports("color", "contrast-color(white)") }; });
            row.verdict = [row.wordmark, row.viewLabel].every((w) => w.found && w.ratio >= 4.5) ? "GREEN" : "RED";
        } catch (e) { row.error = String(e).slice(0, 300); }
        finally { await page.context().close(); }
        out.dockInk.push(row);
    }
    // ── V19C-05 / -06: the step-start glyph; sentence case ──
    {
        const page = await newPage(browser, 1440, "light");
        try {
            await bootRoute(page, `${BASE}/#/gradient`);
            const head = page.locator("button.interval-head").first();
            if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
            await page.waitForTimeout(1000);
            out.misc.stepTiles = await page.evaluate(() => [...document.querySelectorAll(".easing-panel .strip-family")]
                .filter((f) => /step/i.test(f.querySelector(".family-eyebrow")?.textContent || ""))
                .flatMap((f) => [...f.querySelectorAll("button")].map((b) => ({ label: b.textContent.trim(), d: (b.querySelector("path")?.getAttribute("d") || "").slice(0, 40) }))));
            await page.locator(".easing-panel").evaluate((el) => el.scrollIntoView({ block: "center" }));
            await page.waitForTimeout(500);
            await page.screenshot({ path: path.join(OUT, "easing-steps-1440-light.png") });
        } catch (e) { out.misc.stepError = String(e).slice(0, 300); }
        finally { await page.context().close(); }
        const p2 = await newPage(browser, 1440, "light");
        try {
            await bootRoute(p2, `${BASE}/#/nope`, { allowAlert: true });
            out.misc.notFound = await p2.evaluate(() => ({ h1: document.querySelector("main h1")?.textContent.trim(), title: document.title,
                dock: document.querySelector(".glass-dock [aria-label='Select view']")?.textContent.trim() }));
        } catch (e) { out.misc.notFoundError = String(e).slice(0, 300); }
        finally { await p2.context().close(); }
        const p3 = await newPage(browser, 1440, "light");
        try {
            await bootRoute(p3, `${BASE}/#/`);
            await p3.waitForTimeout(800);
            out.misc.aboutLabels = await p3.evaluate(() => [...document.querySelectorAll(".pane-wrapper--inspector .plate-ink, .pane-wrapper--inspector h3, .pane-wrapper--inspector h4")]
                .map((e) => e.textContent.trim()).filter((t) => t && t.length < 40));
        } catch (e) { out.misc.aboutError = String(e).slice(0, 300); }
        finally { await p3.context().close(); }
        // ── V19C-07: the HSV row of the colour-space menu, over the picker (Mix) ──
        const p4 = await newPage(browser, 1440, "light");
        try {
            await bootRoute(p4, `${BASE}/#/mix`);
            await p4.locator("main [role=combobox]").first().click();
            await p4.waitForTimeout(800);
            out.misc.spaceRows = await p4.evaluate(() => [...document.querySelectorAll("[role=option]")].map((o) => o.textContent.replace(/\s+/g, " ").trim()).filter((t) => /^(HSV|HSL|RGB|OKLCh)/i.test(t) || /hsv/.test(t)));
            await p4.screenshot({ path: path.join(OUT, "mix-select-1440-light.png") });
        } catch (e) { out.misc.spaceError = String(e).slice(0, 300); }
        finally { await p4.context().close(); }
    }
} finally {
    await browser.close();
    fs.writeFileSync(path.join(OUT, "v19.json"), JSON.stringify(out, null, 1));
}
for (const h of out.headers) console.log("hdr", h.sub, h.width, h.theme, h.error ?? "", h.header?.veil, h.header?.maxChannelStep, "seated", h.seated, JSON.stringify(h.toolbar), JSON.stringify(h.fields ?? ""));
for (const r of out.roster) console.log("roster", r.theme, r.error ?? "", JSON.stringify(r.before), JSON.stringify(r.after), r.verdict);
for (const d of out.dockInk) console.log("dock", d.ground, d.theme, d.error ?? "", "wordmark", d.wordmark?.ratio, "view", d.viewLabel?.ratio, "admin", d.adminWord?.ratio, JSON.stringify(d.tokens), d.verdict);
console.log("misc", JSON.stringify(out.misc));
