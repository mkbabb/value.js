// SS-8 · Z4-admin-library-parser — AdminUsersPanel live cells (headless Chromium).
// One browser per run, one context per cell, every context + the browser closed in finally.
// /admin/* is fulfilled through ctx.route: the users stub below for /admin/users*, B18's
// stateful stub (audit/flagged/tags) for everything else. The live API refuses the dev token
// (B18 measured 403), so every data-backed cell is FIXTURED — stated in the packet.
//   ~/.claude/guard/guarded --timeout 40 -- node z4-admin-probe.mjs [cell,cell,...]
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { launch, routeAdmin } from "../B18/lib.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const EVID = resolve(HERE, "../../evidence/Z4-admin-library-parser");
mkdirSync(EVID, { recursive: true });
const save = (n, d) => writeFileSync(resolve(EVID, n), JSON.stringify(d, null, 2));
const BASE = process.env.BASE ?? "http://localhost:9000";
const URL_USERS = `${BASE}/#/admin/users`;
const NOW = "2026-10-19T12:00:00.000Z";

const USERS = [
    { slug: "amber-otter-1733", createdAt: NOW, paletteCount: 3 },
    { slug: "ghost-empty-1733", createdAt: NOW, paletteCount: 0 },
    { slug: "cobalt-heron-9021", createdAt: NOW, paletteCount: 2 },
    { slug: "ghost-empty-2208", createdAt: NOW, paletteCount: 0 },
    { slug: "an-extraordinarily-long-user-slug-that-keeps-going-4471", createdAt: NOW, paletteCount: 1 },
];
const pal = (slug, owner) => ({ slug, name: `Pal ${slug}`, userSlug: owner, tier: "standard", colors: ["#e11d48", "#2563eb", "#16a34a"].map((css, i) => ({ css, position: i })) });

/** opts: { users, total, listStatus, hang, palStatus, delStatus, palDelayFor:{slug:ms} } */
async function routeUsers(ctx, log, opts = {}) {
    const st = { users: [...(opts.users ?? USERS)] };
    await ctx.route((u) => /^(\/api)?\/admin\/users/.test(u.pathname), async (route) => {
        const req = route.request();
        const u = new URL(req.url());
        const m = req.method();
        const p = u.pathname;
        log.push({ t: Date.now(), m, p: p + u.search, body: req.postData() ?? null });
        const ok = (b, s = 200) => route.fulfill({ status: s, contentType: "application/json", body: JSON.stringify(b) }).catch(() => {});
        if (opts.hang) return;
        if (/\/admin\/users\/?$/.test(p) && m === "GET") {
            if (opts.listStatus) return ok({ error: "boom" }, opts.listStatus);
            const limit = +(u.searchParams.get("limit") ?? 20), offset = +(u.searchParams.get("offset") ?? 0);
            const q = u.searchParams.get("q");
            const arr = q ? st.users.filter((x) => x.slug.includes(q)) : st.users;
            return ok({ data: arr.slice(offset, offset + limit), total: opts.total ?? arr.length, limit, offset });
        }
        if (p.endsWith("/prune-empty") && m === "POST") {
            await new Promise((r) => setTimeout(r, 400));
            if (opts.pruneStatus) return ok({ error: "boom" }, opts.pruneStatus);
            const n = st.users.filter((x) => !x.paletteCount).length;
            st.users = st.users.filter((x) => x.paletteCount);
            return ok({ pruned: n });
        }
        const mm = p.match(/\/admin\/users\/([^/]+)(\/palettes)?$/);
        if (mm) {
            const slug = decodeURIComponent(mm[1]);
            if (mm[2] && m === "GET") {
                const d = opts.palDelayFor?.[slug];
                if (d) await new Promise((r) => setTimeout(r, d));
                if (opts.palStatus) return ok({ error: "boom" }, opts.palStatus);
                const n = st.users.find((x) => x.slug === slug)?.paletteCount ?? 0;
                return ok(Array.from({ length: n }, (_, i) => pal(`${slug}-p${i}`, slug)));
            }
            if (m === "DELETE") {
                if (opts.delStatus) return ok({ error: "boom" }, opts.delStatus);
                st.users = st.users.filter((x) => x.slug !== slug || mm[2]);
                return ok(mm[2] ? { deleted: 1 } : { deleted: true, palettesDeleted: 0 });
            }
        }
        return ok({ data: [], total: 0 });
    });
    return st;
}


// OWN_VITE serves from a non-:9000 origin; the live api's CORS answers only http://localhost:9000, so
// every un-stubbed api read would be blocked, trip the client's availability latch, and poison the
// mutation cells ("The palette service is not answering"). This passthrough (lowest priority —
// registered first) forwards un-stubbed api traffic and re-labels ACAO to the page origin. It changes
// no payload and is a no-op on :9000.
async function corsPassthrough(ctx) {
    const origin = new URL(BASE).origin;
    if (origin === "http://localhost:9000") return;
    await ctx.route((u) => u.port === "3000", async (route) => {
        const req = route.request();
        if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": origin, "access-control-allow-credentials": "true", "access-control-allow-headers": "*", "access-control-allow-methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS" } }).catch(() => {});
        try {
            const resp = await route.fetch();
            await route.fulfill({ response: resp, headers: { ...resp.headers(), "access-control-allow-origin": origin } });
        } catch { await route.abort().catch(() => {}); }
    });
}

async function cell(browser, name, opts, fn) {
    const { admin = true, dark = false, viewport = { width: 1440, height: 900 }, users = {}, ...ctxOpts } = opts;
    const ctx = await browser.newContext({ viewport, colorScheme: dark ? "dark" : "light", ...ctxOpts });
    const log = [];
    const errors = [];
    try {
        await ctx.addInitScript(({ admin, dark }) => {
            try {
                localStorage.setItem("vueuse-color-scheme", dark ? "dark" : "light");
                if (admin) localStorage.setItem("palette-admin-token", "test-admin-token");
                else localStorage.removeItem("palette-admin-token");
            } catch {}
        }, { admin, dark });
        await corsPassthrough(ctx);
        const b18 = await routeAdmin(ctx, {}); // registered first → lower priority
        const st = admin ? await routeUsers(ctx, log, users) : null;
        // anon: count any /admin request that reaches the network (no stub)
        if (!admin) ctx.on("request", (r) => { if (/\/admin\//.test(new URL(r.url()).pathname) && !/\.\w+$/.test(new URL(r.url()).pathname)) log.push({ m: r.method(), p: r.url() }); });
        const page = await ctx.newPage();
        page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
        const out = await fn(page, log, st, b18);
        const res = { cell: name, ...out, requests: log.slice(0, 40), pageErrors: errors.slice(0, 5) };
        save(`admin-${name}.json`, res);
        console.log(name, JSON.stringify(res).slice(0, 900));
    } catch (e) {
        const res = { cell: name, error: String(e).slice(0, 500), requests: log.slice(0, 20), pageErrors: errors };
        save(`admin-${name}.json`, res);
        console.log(name, "ERROR", res.error);
    } finally {
        await ctx.close().catch(() => {});
    }
}

const PANE = '[data-pane="admin-users"]';
async function go(page, sel = PANE) {
    await page.goto(URL_USERS, { waitUntil: "domcontentloaded", timeout: 240000 });
    await page.waitForSelector(sel, { timeout: 240000 });
    await page.waitForTimeout(1500);
}
const rowsReady = (page) => page.waitForSelector(`${PANE} .slug-pill`, { timeout: 90000 });
const btnInfo = `(root) => [...root.querySelectorAll("button")].map((b) => { const cs = getComputedStyle(b); const r = b.getBoundingClientRect(); return { label: (b.getAttribute("aria-label") || b.textContent.trim()).slice(0, 50), variant: b.getAttribute("variant"), emphasis: b.getAttribute("data-emphasis"), size: b.getAttribute("data-size"), attrs: [...b.attributes].map((a) => a.name).join(" "), h: +r.height.toFixed(1), w: +r.width.toFixed(1), minH: cs.minHeight, disabled: b.disabled, opacity: cs.opacity, color: cs.color, bg: cs.backgroundColor, fs: cs.fontSize, ff: cs.fontFamily.slice(0, 28), fst: cs.fontStyle, inTab: b.tabIndex >= 0 && !b.disabled }; })`;

const CELLS = {
    // L-5: an unauthenticated stranger on #/admin/users
    async anon(b) {
        await cell(b, "anon", { admin: false }, async (page, log) => {
            await page.goto(URL_USERS, { waitUntil: "domcontentloaded", timeout: 240000 });
            const paneSeen = await page.waitForSelector(PANE, { timeout: 90000 }).then(() => true, () => false);
            await page.waitForTimeout(1500);
            if (!paneSeen) {
                const where = await page.evaluate(() => ({ hash: location.hash, panes: [...document.querySelectorAll("[data-pane]")].map((e) => e.getAttribute("data-pane")), text: document.body.innerText.replace(/\s+/g, " ").slice(0, 400) }));
                await page.screenshot({ path: resolve(EVID, "admin-anon-1440.png") });
                return { paneSeen, where, adminRequests: log.length };
            }
            const pane = page.locator(PANE);
            const text = (await pane.innerText()).replace(/\s+/g, " ").slice(0, 400);
            const access = await page.locator(`${PANE} [data-admin-access]`).getAttribute("data-admin-access").catch(() => null);
            const buttons = await pane.evaluate(new Function(`return (${btnInfo})`)());
            await page.screenshot({ path: resolve(EVID, "admin-anon-1440.png") });
            return { text, access, buttons, sayNoUsers: /No users found|roster clear/i.test(text), adminRequests: log.length };
        });
    },
    // L-3 / D-23 / L-11 / D-24 / Δ-10 / Δ-11 / Δ-6 / C-24 / D-25 at 1440 and 390
    async pop(b) {
        for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
            await cell(b, `pop-${vp.width}`, { viewport: vp, users: { total: 400 } }, async (page, log) => {
                await go(page);
                await rowsReady(page);
                const pane = page.locator(PANE);
                const buttons = await pane.evaluate(new Function(`return (${btnInfo})`)());
                const dom = await page.evaluate((PANE) => {
                    const root = document.querySelector(PANE);
                    const trig = [...root.querySelectorAll("[data-state]")].filter((e) => e.tagName === "BUTTON" && e.querySelector(".slug-pill"));
                    const nested = trig.map((t) => t.querySelectorAll("button,a,[role=button],input").length);
                    const pill = root.querySelector(".slug-pill");
                    const live = root.querySelector("[aria-live]");
                    const toolbar = root.querySelector(".text-mono-small")?.parentElement?.innerText.replace(/\s+/g, " ");
                    return {
                        triggers: trig.length,
                        triggerRole: trig.map((t) => [t.tagName, t.getAttribute("role"), t.getAttribute("aria-expanded"), t.getAttribute("aria-controls")])[0],
                        nestedInteractiveInsideTrigger: nested,
                        pillSpans: pill?.children.length, pillInnerText: JSON.stringify(pill?.innerText), pillTextContent: pill?.textContent,
                        liveRegion: live ? { ariaLive: live.getAttribute("aria-live"), role: live.getAttribute("role") } : null,
                        rolesWithAriaLabelOnGeneric: [...root.querySelectorAll("div[aria-label]:not([role])")].length,
                        toolbar,
                        statusFont: (() => { const e = root.querySelector(".text-mono-small"); if (!e) return null; const c = getComputedStyle(e); return { text: e.innerText.slice(0, 60), fs: c.fontSize, ff: c.fontFamily.slice(0, 28) }; })(),
                    };
                }, PANE);
                // accessible names from Chromium's own tree
                const cdp = await page.context().newCDPSession(page);
                const { nodes } = await cdp.send("Accessibility.getFullAXTree");
                const names = nodes.filter((n) => /1733|9021|4471/.test(n.name?.value ?? "") && ["button", "generic", "StaticText"].includes(n.role?.value)).map((n) => [n.role.value, n.name.value]).slice(0, 12);
                await page.screenshot({ path: resolve(EVID, `admin-pop-${vp.width}.png`) });
                return { buttons, dom, axNames: names, listReqs: log.filter((r) => r.m === "GET").map((r) => r.p) };
            });
        }
    },
    // Δ-5: keyboard focus ring on the disclosure trigger (pixels, not just computed style)
    async focus(b) {
        await cell(b, "focus", { users: {} }, async (page) => {
            await go(page);
            await rowsReady(page);
            const trig = page.locator(`${PANE} button:has(.slug-pill)`).first();
            const box = await trig.boundingBox();
            const wrap = await trig.evaluate((t) => { const c = t.closest("[data-state]")?.parentElement?.closest(".overflow-hidden") ?? t.closest(".overflow-hidden"); const r = c.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
            const clip = { x: Math.max(0, wrap[0] - 6), y: Math.max(0, wrap[1] - 6), width: wrap[2] + 12, height: wrap[3] + 12 };
            const before = await page.screenshot({ clip });
            // keyboard focus: focus the previous focusable then Tab into the trigger
            await trig.evaluate((t) => { const all = [...document.querySelectorAll("button,input,a[href],[tabindex]")].filter((e) => e.tabIndex >= 0 && !e.disabled); const i = all.indexOf(t); (all[i - 1] ?? document.body).focus(); });
            await page.keyboard.press("Tab");
            await page.waitForTimeout(300);
            const focused = await page.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { isTrigger: !!a.querySelector?.(".slug-pill"), fv: a.matches(":focus-visible"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, outlineOffset: cs.outlineOffset, boxShadow: cs.boxShadow.slice(0, 160) }; });
            const after = await page.screenshot({ clip });
            writeFileSync(resolve(EVID, "admin-focus-before.png"), before);
            writeFileSync(resolve(EVID, "admin-focus-after.png"), after);
            const diff = await page.evaluate(async ([a, z]) => {
                const load = async (b64) => { const i = new Image(); i.src = "data:image/png;base64," + b64; await i.decode(); const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const x = c.getContext("2d"); x.drawImage(i, 0, 0); return x.getImageData(0, 0, c.width, c.height); };
                const A = await load(a), Z = await load(z);
                let n = 0, max = 0;
                for (let k = 0; k < A.data.length; k += 4) { const d = Math.abs(A.data[k] - Z.data[k]) + Math.abs(A.data[k + 1] - Z.data[k + 1]) + Math.abs(A.data[k + 2] - Z.data[k + 2]); if (d > 30) n++; if (d > max) max = d; }
                return { changedPx: n, maxDelta: max, w: A.width, h: A.height };
            }, [before.toString("base64"), after.toString("base64")]);
            return { triggerBox: box, wrapper: wrap, focused, pixelDiff: diff };
        });
    },
    // Δ-1 / D-25 / Δ-3 / C-25: prune dialog scope copy, POST body, double-fire on confirm
    async prune(b) {
        await cell(b, "prune", { users: { total: 400 } }, async (page, log) => {
            await go(page);
            await rowsReady(page);
            await page.getByRole("button", { name: /Prune empty/ }).click();
            const dlg = page.getByRole("dialog");
            await dlg.waitFor({ timeout: 10000 });
            const dialogText = (await dlg.innerText()).replace(/\s+/g, " ");
            const confirm = dlg.getByRole("button", { name: /^Prune$/ });
            await confirm.dblclick({ delay: 30 }).catch((e) => null);
            await page.waitForTimeout(150);
            await confirm.click({ timeout: 800, force: true }).catch(() => null);
            await page.waitForTimeout(1500);
            const posts = log.filter((r) => r.m === "POST" && /prune-empty/.test(r.p));
            const notice = await page.locator(`${PANE} [data-admin-notice]`).innerText().catch(() => null);
            return { dialogText, prunePosts: posts.length, postBodies: posts.map((p) => p.body), idempotencyHeader: null, notice };
        });
    },
    // L-7 / Δ-2: a prune that FAILS (500) — success-register copy or a failure?
    async pruneErr(b) {
        await cell(b, "pruneErr", { users: { pruneStatus: 500 } }, async (page, log) => {
            await go(page);
            await rowsReady(page);
            await page.getByRole("button", { name: /Prune empty/ }).click();
            await page.getByRole("dialog").getByRole("button", { name: /^Prune$/ }).click();
            await page.waitForTimeout(1800);
            const notice = await page.locator(`${PANE} [data-admin-notice]`).evaluate((e) => ({ text: e.innerText, live: e.getAttribute("aria-live"), role: e.firstElementChild?.getAttribute("role") ?? null })).catch(() => null);
            const text = (await page.locator(PANE).innerText()).replace(/\s+/g, " ").slice(0, 300);
            return { notice, text, saysNothingToPrune: /No empty users to prune/i.test(text), prunePosts: log.filter((r) => r.m === "POST").length };
        });
    },
    // Δ-1 C-25 header check (separate so the header is read off the real request)
    async pruneHdr(b) {
        await cell(b, "pruneHdr", { users: {} }, async (page) => {
            const hdrs = [];
            page.on("request", (r) => { if (/prune-empty/.test(r.url())) hdrs.push(r.headers()); });
            await go(page);
            await rowsReady(page);
            await page.getByRole("button", { name: /Prune empty/ }).click();
            await page.getByRole("dialog").getByRole("button", { name: /^Prune$/ }).click();
            await page.waitForTimeout(1500);
            return { headers: hdrs.map((h) => Object.fromEntries(Object.entries(h).filter(([k]) => /idempot|authoriz|content-type/i.test(k)).map(([k, v]) => [k, k === "authorization" ? v.slice(0, 12) + "…" : v]))) };
        });
    },
    // D-32: disabled Prune treatment (no empty users)
    async disabled(b) {
        await cell(b, "disabled", { users: { users: USERS.filter((u) => u.paletteCount) } }, async (page) => {
            await go(page);
            await rowsReady(page);
            const buttons = await page.locator(PANE).evaluate(new Function(`return (${btnInfo})`)());
            const why = (await page.locator(PANE).innerText()).replace(/\s+/g, " ").slice(0, 200);
            return { prune: buttons.find((x) => /Prune/.test(x.label)), refresh: buttons.find((x) => /Refresh/.test(x.label)), toolbarText: why };
        });
    },
    // Δ-9 / UIA-V-168: list read fails → no "0 users" over the error plate
    async listErr(b) {
        await cell(b, "listErr", { users: { listStatus: 500 } }, async (page) => {
            await go(page);
            await page.waitForTimeout(2500);
            const text = (await page.locator(PANE).innerText()).replace(/\s+/g, " ").slice(0, 300);
            return { text, zeroUsers: /\b0 users\b/.test(text), errorPlate: /Couldn.t load users/.test(text), noUsersFound: /No users found/.test(text) };
        });
    },
    // Δ-2: a DELETE that fails renders as failure, announced in the live region
    async delErr(b) {
        await cell(b, "delErr", { users: { delStatus: 500 } }, async (page, log) => {
            await go(page);
            await rowsReady(page);
            await page.getByRole("button", { name: "Delete user ghost-empty-1733" }).click();
            await page.getByRole("dialog").getByRole("button", { name: /^Delete user$/ }).click();
            await page.waitForTimeout(1500);
            const notice = await page.locator(`${PANE} [data-admin-notice]`).evaluate((e) => ({ text: e.innerText, live: e.getAttribute("aria-live"), role: e.firstElementChild?.getAttribute("role") ?? null })).catch(() => null);
            const stillListed = await page.locator(`${PANE} .slug-pill[title="ghost-empty-1733"]`).count();
            return { notice, stillListed, deletes: log.filter((r) => r.m === "DELETE").length };
        });
    },
    // Δ-8: nested palettes read fails → error, never "No palettes."
    async palErr(b) {
        await cell(b, "palErr", { users: { palStatus: 500 } }, async (page) => {
            await go(page);
            await rowsReady(page);
            await page.locator(`${PANE} button:has(.slug-pill[title="amber-otter-1733"])`).click();
            await page.waitForTimeout(1500);
            const text = (await page.locator(PANE).innerText()).replace(/\s+/g, " ");
            return { errorShown: /Couldn.t load this user.s palettes/.test(text), noPalettes: /No palettes\./.test(text) };
        });
    },
    // Δ-4 / Δ-13: slow first expand, fast second — which owner's palettes render?
    async race(b) {
        await cell(b, "race", { users: { palDelayFor: { "amber-otter-1733": 1500 } } }, async (page, log) => {
            await go(page);
            await rowsReady(page);
            await page.locator(`${PANE} button:has(.slug-pill[title="amber-otter-1733"])`).click();
            await page.waitForTimeout(120);
            await page.locator(`${PANE} button:has(.slug-pill[title="cobalt-heron-9021"])`).click();
            await page.waitForTimeout(2500);
            const rendered = await page.locator(`${PANE} [data-admin-palette]`).evaluateAll((els) => els.map((e) => e.getAttribute("data-admin-palette")));
            const open = await page.locator(`${PANE} [data-state="open"] .slug-pill`).evaluateAll((els) => els.map((e) => e.getAttribute("title")));
            // Refresh while open (Δ-13): re-read the open row after Refresh
            await page.getByRole("button", { name: "Refresh users" }).click();
            await page.waitForTimeout(2000);
            const afterRefresh = await page.locator(`${PANE} [data-admin-palette]`).evaluateAll((els) => els.map((e) => e.getAttribute("data-admin-palette")));
            const openAfter = await page.locator(`${PANE} [data-state="open"] .slug-pill`).evaluateAll((els) => els.map((e) => e.getAttribute("title")));
            return { open, rendered, afterRefresh, openAfter, palReqs: log.filter((r) => /palettes$/.test(r.p)).map((r) => r.p) };
        });
    },
    // Δ-7: search reaches the server (q param), off-page match not "roster clear"
    async search(b) {
        await cell(b, "search", { users: { total: 400 } }, async (page, log) => {
            await go(page);
            await rowsReady(page);
            const n0 = log.length;
            await page.getByPlaceholder("Search users...").fill("zzz-offpage");
            await page.waitForTimeout(1800);
            const text = (await page.locator(PANE).innerText()).replace(/\s+/g, " ").slice(0, 200);
            const pager = await page.locator(PANE).evaluate((r) => r.querySelector("nav,[aria-label*=agination i]")?.innerText ?? null);
            return { reqsAfterType: log.slice(n0).map((r) => r.p), text, pager };
        });
    },
    // Δ-6: RTL — the slug's visual order
    async rtl(b) {
        await cell(b, "rtl", { users: {} }, async (page) => {
            await go(page);
            await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
            await rowsReady(page);
            await page.waitForTimeout(400);
            const pills = await page.locator(`${PANE} .slug-pill`).evaluateAll((els) => els.slice(0, 5).map((p) => { const s = [...p.children].map((c) => ({ t: c.textContent, x: +c.getBoundingClientRect().x.toFixed(1) })); return { title: p.title, spans: s, visualOrder: [...s].sort((a, b) => a.x - b.x).map((c) => c.t).join(""), dir: getComputedStyle(p).direction }; }));
            await page.screenshot({ path: resolve(EVID, "admin-rtl-1440.png") });
            return { pills };
        });
    },
    // L-6 / D-28: skeleton anatomy vs the row it becomes
    async skel(b) {
        await cell(b, "skel", { users: { hang: true } }, async (page) => {
            await go(page);
            await page.waitForTimeout(1500);
            const sk = await page.locator(PANE).evaluate((r) => { const s = r.querySelector('[aria-label="Loading users"]'); if (!s) return null; const first = s.firstElementChild; const kids = [...first.querySelectorAll("*")].filter((e) => !e.children.length).map((e) => { const b = e.getBoundingClientRect(); return [e.className.toString().slice(0, 60), +b.width.toFixed(0), +b.height.toFixed(0)]; }); return { rows: s.children.length, rowH: +first.getBoundingClientRect().height.toFixed(1), leaves: kids }; });
            return { skeleton: sk };
        });
        await cell(b, "skelRow", { users: {} }, async (page) => {
            await go(page);
            await rowsReady(page);
            const row = await page.locator(PANE).evaluate((r) => { const c = r.querySelector(".slug-pill").closest(".overflow-hidden"); const pill = c.querySelector(".slug-pill").getBoundingClientRect(); return { rowH: +c.getBoundingClientRect().height.toFixed(1), identityStartX: +(pill.x - c.getBoundingClientRect().x).toFixed(1) }; });
            return { row };
        });
    },
    // L-8: sibling destructive verbs confirmed? (Flagged + Tags, B18 stub)
    async siblings(b) {
        await cell(b, "siblings", { users: {} }, async (page, log, st, b18) => {
            const out = {};
            for (const [tab, re] of [["flagged", /^Delete palette/], ["tags", /^Delete tag/]]) {
                await page.goto(`${BASE}/#/admin/${tab}`, { waitUntil: "domcontentloaded", timeout: 240000 });
                await page.waitForSelector(`[data-pane="admin-${tab}"]`, { timeout: 240000 });
                await page.waitForTimeout(2000);
                const n0 = b18.log.filter((r) => r.m === "DELETE").length;
                const btn = page.locator(`[data-pane="admin-${tab}"]`).getByRole("button", { name: re }).first();
                await btn.click();
                await page.waitForTimeout(600);
                const dialog = await page.getByRole("dialog").count();
                const dlgTitle = dialog ? await page.getByRole("dialog").locator("h2").first().innerText().catch(() => null) : null;
                out[tab] = { dialogOpened: dialog > 0, dlgTitle, deletesBeforeConfirm: b18.log.filter((r) => r.m === "DELETE").length - n0 };
                await page.keyboard.press("Escape");
            }
            return out;
        });
    },
};

// OWN_VITE=<port>: the shared :9000 dev server was wedged (93 % CPU, 7.6 GB, 0 bytes in 240 s), so the probe
// can serve the same working tree itself — a child `vite --port <port>` started here, killed in finally.
let viteChild = null;
if (process.env.OWN_VITE) {
    const { spawn } = await import("node:child_process");
    const repo = resolve(HERE, "../../../../../../..");
    viteChild = spawn("npx", ["vite", "--port", process.env.OWN_VITE, "--strictPort"], { cwd: repo, env: { ...process.env, VITE_API_URL: "http://localhost:3000" }, stdio: "ignore", detached: false });
    const t0 = Date.now();
    for (;;) {
        try { const r = await fetch(BASE + "/", { signal: AbortSignal.timeout(240000) }); if (r.ok) break; } catch {}
        if (Date.now() - t0 > 420000) throw new Error("own vite never answered");
        await new Promise((r) => setTimeout(r, 3000));
    }
    console.log("own vite up in", Date.now() - t0, "ms");
}
const want = (process.argv[2] && !["all"].includes(process.argv[2]) ? process.argv[2] : Object.keys(CELLS).join(",")).split(",");
const browser = await launch();
try {
    // warm-up (not a cell, nothing recorded): one throwaway context loads the route until the
    // pane AND a stubbed row render, so the dev server's cold transform cost is not charged to cell 1.
    {
        const wctx = await browser.newContext();
        try {
            await corsPassthrough(wctx);
            await routeAdmin(wctx, {});
            await routeUsers(wctx, [], {});
            await wctx.addInitScript(() => { try { localStorage.setItem("palette-admin-token", "test-admin-token"); } catch {} });
            const wp = await wctx.newPage();
            const t0 = Date.now();
            await wp.goto(URL_USERS, { waitUntil: "domcontentloaded", timeout: 480000 });
            await wp.waitForSelector(`${PANE} .slug-pill`, { timeout: 480000 });
            console.log("warm-up rows rendered in", Date.now() - t0, "ms");
        } catch (e) { console.log("warm-up failed", String(e).slice(0, 200)); } finally { await wctx.close().catch(() => {}); }
    }
    for (const k of want) await CELLS[k](browser);
} finally {
    await browser.close().catch(() => {});
    if (viteChild) viteChild.kill("SIGTERM");
}
