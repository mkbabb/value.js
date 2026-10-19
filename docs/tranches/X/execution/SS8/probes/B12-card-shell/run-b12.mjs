// SERVED MODEL: claude-opus-5-5 · SS-8 B12-card-shell — re-deployed seat, live cells against the REAL
// API (:3000) where the claim is a shipped-system claim, the routed WALL elsewhere.
// One browser per run; one context per cell (lib.cell closes it in finally); browser closed in finally.
// Usage: node run-b12.mjs <cell,cell,...>   env A_TOKEN/A_SLUG = the seeded owner (see packet).
import { launch, cell, openBrowse, card, save, palette, installColor, modePixels, EVID, BASE, API, WALL, routeWall } from "./lib.mjs";
import { resolve } from "node:path";
import { writeFileSync } from "node:fs";

const only = (process.argv[2] || "").split(",").filter(Boolean);
const want = (k) => only.includes(k);
const A = { token: process.env.A_TOKEN, slug: process.env.A_SLUG };
const OWNED = "SS8 B12 Owned Sunset";
const OWNED_SLUG = "ss8-b12-owned-sunset";

async function register() {
    const r = await fetch(`${API}/sessions`, { method: "POST" });
    return r.json();
}
async function auth(p, who, scheme = "light") {
    await p.addInitScript(([w, s]) => {
        try {
            localStorage.setItem("vueuse-color-scheme", s);
            if (w) { localStorage.setItem("palette-user-slug", w.slug); localStorage.setItem("palette-user-token", w.token); }
        } catch {}
    }, [who, scheme]);
}
async function liveBrowse(p, who, name = OWNED) {
    await auth(p, who);
    await p.goto(`${BASE}/#/browse`, { timeout: 90000 });
    await card(p, name).first().waitFor({ timeout: 60000 });
    await p.waitForTimeout(1200);
}
const sampler = (loc, ms) => loc.evaluate((el, ms) => new Promise((res) => {
    const vals = []; const t0 = performance.now();
    const f = () => {
        const s = getComputedStyle(el).scale; const inl = el.style.scale || "";
        const nums = s === "none" ? [1] : s.split(" ").map(Number);
        vals.push(...nums); if (inl) vals.push(...inl.split(" ").map(Number).filter((n) => !isNaN(n)));
        if (performance.now() - t0 < ms) requestAnimationFrame(f);
        else res({ frames: vals.length, min: Math.min(...vals), max: Math.max(...vals) });
    };
    requestAnimationFrame(f);
}), ms);
const menuItems = (p) => p.evaluate(() => [...document.querySelectorAll('[role="menu"] [role="menuitem"]')].map((n) => n.textContent.replace(/\s+/g, " ").trim()));
// Pass-through for API writes: Playwright's route serves the request (so Chromium's CORS preflight —
// which rejects `Idempotency-Key`/`If-Match` on this served model, see cell "cors" — is not the gate).
async function passWrites(p, log) {
    await p.route((u) => u.origin === API, async (route) => {
        const req = route.request();
        if (req.method() === "GET") return route.fallback();
        const resp = await route.fetch(); const body = await resp.text();
        log.push({ m: req.method(), path: new URL(req.url()).pathname, status: resp.status(), req: (req.postData() || "").slice(0, 200), body: body.slice(0, 240) });
        return route.fulfill({ response: resp, body });
    });
}
const out = [];
const b = await launch();
try {
    // ── PaletteCardMenu U-6 / U-3 / U-8 / U-10 — the owned remote arm on the REAL feed ──
    if (want("owned")) out.push(await cell(b, "MENU owned remote arm (real API, owner session)", {}, async (p) => {
        const net = [];
        p.on("response", (r) => { if (r.url().startsWith(API + "/palettes")) net.push(`${r.request().method()} ${new URL(r.url()).pathname}${new URL(r.url()).search} ${r.status()}`); });
        await liveBrowse(p, A);
        const c = card(p, OWNED).first();
        const trig = c.locator('button[aria-label="Palette menu"]');
        await trig.click(); await p.waitForTimeout(600);
        const items = await menuItems(p);
        const shortcuts = await p.evaluate(() => [...document.querySelectorAll('[role="menu"] [class*="shortcut"]')].map((n) => { const cs = getComputedStyle(n); return { text: n.textContent.trim(), w: n.getBoundingClientRect().width, tt: cs.textTransform, fv: cs.fontVariantCaps, ff: cs.fontFamily.slice(0, 40), fs: cs.fontSize }; }));
        // U-3 (pointer-opened, then ArrowDown)
        await p.keyboard.press("ArrowDown"); await p.waitForTimeout(250);
        const fvPointer = await p.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { role: a.getAttribute("role"), text: a.textContent.trim().slice(0, 30), fv: a.matches(":focus-visible"), hl: a.hasAttribute("data-highlighted"), boxShadow: cs.boxShadow, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} off=${cs.outlineOffset}`, bg: cs.backgroundColor, ring: getComputedStyle(document.documentElement).getPropertyValue("--focus-ring-shadow").trim().slice(0, 80) }; });
        await p.keyboard.press("Escape"); await p.waitForTimeout(400);
        // U-3 (keyboard-opened: focus trigger, Enter, ArrowDown)
        await trig.focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(500);
        const firstKb = await p.evaluate(() => { const a = document.activeElement; return { role: a.getAttribute("role"), text: a.textContent.trim().slice(0, 30), fv: a.matches(":focus-visible"), boxShadow: getComputedStyle(a).boxShadow }; });
        await p.keyboard.press("ArrowDown"); await p.waitForTimeout(250);
        const fvKb = await p.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { role: a.getAttribute("role"), text: a.textContent.trim().slice(0, 30), fv: a.matches(":focus-visible"), boxShadow: cs.boxShadow, outline: `${cs.outlineStyle} ${cs.outlineWidth}` }; });
        await p.keyboard.press("Escape"); await p.waitForTimeout(400);
        // U-10: export SVG, real download bytes
        await trig.click(); await p.waitForTimeout(500);
        await p.getByRole("menuitem", { name: "Export" }).hover(); await p.waitForTimeout(700);
        const dlP = p.waitForEvent("download", { timeout: 10000 });
        await p.getByRole("menuitem", { name: "SVG Swatch" }).click();
        const dl = await dlP; const svgPath = resolve(EVID, "menu-u10-export.svg"); await dl.saveAs(svgPath);
        return { items, shortcuts, fvPointer, firstKb, fvKb, download: { suggested: dl.suggestedFilename(), path: "menu-u10-export.svg" }, net: net.slice(0, 8) };
    }));
    // ── PaletteCardMenu U-10: the downloaded SVG bytes for a hostile name + hostile css (server-admitted) ──
    if (want("inj")) for (const NAME of ['SS8 InjName </title><script>alert(1)</script> & "q"', 'SS8 Inj </title><script>alert(1)</script> & "q"'])
      out.push(await cell(b, `MENU-U10 export SVG of hostile palette: ${NAME.slice(0, 12)}`, {}, async (p) => {
        const dialogs = []; p.on("dialog", (d) => { dialogs.push(d.message()); d.dismiss().catch(() => {}); });
        const cons = []; p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") cons.push(m.text().slice(0, 200)); });
        await liveBrowse(p, A);
        await p.evaluate((n) => { const a = [...document.querySelectorAll('[role="article"]')].find((x) => x.getAttribute("aria-label") === `Palette: ${n}`); a?.setAttribute("data-ss8", "hostile"); }, NAME);
        const c = p.locator('[data-ss8="hostile"]').first();
        const rendered = await c.evaluate((a) => ({ scripts: a.querySelectorAll("script").length, name: a.querySelector(".palette-specimen__name")?.textContent }));
        await c.locator('button[aria-label="Palette menu"]').click(); await p.waitForTimeout(500);
        await p.getByRole("menuitem", { name: "Export" }).hover(); await p.waitForTimeout(700);
        const dlP = p.waitForEvent("download", { timeout: 8000 }).catch((e) => null);
        await p.getByRole("menuitem", { name: "SVG Swatch" }).click();
        const dl = await dlP;
        if (!dl) { await p.waitForTimeout(500); return { rendered, download: null, cardText: (await c.innerText()).replace(/\s+/g, " ").slice(0, 200), console: cons.slice(0, 6), dialogs }; }
        const file = NAME.includes("InjName") ? "menu-u10-hostile-name.svg" : "menu-u10-hostile-both.svg";
        await dl.saveAs(resolve(EVID, file));
        const { readFileSync } = await import("node:fs");
        const svg = readFileSync(resolve(EVID, file), "utf8");
        const p2 = await p.context().newPage();
        await p2.setContent(svg); await p2.waitForTimeout(500);
        const parsed = await p2.evaluate(() => ({ scripts: document.querySelectorAll("script").length, title: document.querySelector("title")?.textContent, rects: document.querySelectorAll("rect").length }));
        await p2.close();
        return { rendered, suggested: dl.suggestedFilename(), file, bytes: svg.length, svg: svg.slice(0, 700), parsed, dialogs, console: cons.slice(0, 4) };
    }));
    // ── served-model write path: does a browser POST survive the CORS preflight? (no route installed) ──
    if (want("cors")) out.push(await cell(b, "WRITE-PATH one vote click, no interception", {}, async (p) => {
        const C = await register(); const ev = [];
        p.on("request", (r) => { if (r.url().startsWith(API) && r.method() !== "GET") ev.push({ ev: "req", m: r.method(), url: new URL(r.url()).pathname, hdrs: Object.keys(r.headers()).filter((h) => /idempot|session|if-match|content-type/i.test(h)) }); });
        p.on("requestfailed", (r) => { if (r.url().startsWith(API)) ev.push({ ev: "failed", m: r.method(), url: new URL(r.url()).pathname, why: r.failure()?.errorText }); });
        p.on("response", (r) => { if (r.url().startsWith(API) && r.request().method() !== "GET") ev.push({ ev: "resp", status: r.status() }); });
        const cons = []; p.on("console", (m) => { if (m.type() === "error") cons.push(m.text().slice(0, 220)); });
        await liveBrowse(p, C);
        await card(p, OWNED).first().locator('button[aria-label*="votes"]').click(); await p.waitForTimeout(2500);
        return { ev, console: cons.slice(0, 4), label: await card(p, OWNED).first().locator('button[aria-label*="votes"]').getAttribute("aria-label") };
    }));
    // ── PaletteCard U-9: a malformed colour admitted by the SHIPPED write path, rendered on Browse ──
    if (want("u9")) out.push(await cell(b, "PC-U9 malformed colour on the real feed (anon)", {}, async (p) => {
        const cons = []; p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") cons.push(m.text().slice(0, 160)); });
        await p.goto(`${BASE}/#/browse`, { timeout: 90000 });
        await card(p, OWNED).first().waitFor({ timeout: 60000 }); await p.waitForTimeout(1500);
        const r = await p.evaluate(() => {
            const arts = [...document.querySelectorAll('[role="article"].palette-card')].map((a) => a.getAttribute("aria-label"));
            const bad = document.querySelector('[role="article"][aria-label="Palette: probe"]');
            const strip = bad?.querySelector("[data-color-strip]");
            return { arts, badPresent: !!bad, badStrip: strip ? [...strip.children].map((k) => getComputedStyle(k).backgroundColor) : null, badText: bad?.innerText.replace(/\s+/g, " ").slice(0, 120) };
        });
        await card(p, "probe").first().locator(".palette-specimen__name").click(); await p.waitForTimeout(1200);
        const expanded = await card(p, "probe").first().evaluate((a) => ({ cur: a.getAttribute("aria-current"), swatches: [...a.querySelectorAll('[aria-label^="Color swatch"]')].map((s) => s.getAttribute("aria-label")) }));
        await card(p, "probe").first().screenshot({ path: resolve(EVID, "pc-u9-malformed-card.png") });
        return { ...r, expanded, console: cons.slice(0, 8) };
    }));
    // ── PaletteCardMenu U-5: Save a remote palette as another user, then Publish the saved copy ──
    if (want("u5")) out.push(await cell(b, "MENU-U5 publish of a saved-from-remote copy (real API)", {}, async (p) => {
        const B = await register();
        const net = [];
        await passWrites(p, net);
        await liveBrowse(p, B);
        const c = card(p, OWNED).first();
        await c.locator('button[aria-label="Palette menu"]').click(); await p.waitForTimeout(500);
        const browseItems = await menuItems(p);
        await p.getByRole("menuitem", { name: "Save" }).click(); await p.waitForTimeout(1200);
        const saveFeedback = await c.innerText().catch(() => "");
        await p.evaluate(() => { location.hash = "#/palettes"; }); await p.waitForTimeout(2500);
        const tagged = await p.evaluate((n) => { const all = [...document.querySelectorAll(`[role="article"][aria-label="Palette: ${n}"]`)]; const hit = all.find((a) => a.closest('[data-pane="palettes"]')) || all[all.length - 1]; if (hit) hit.setAttribute("data-ss8", "saved"); return { count: all.length, panes: all.map((a) => a.closest("[data-pane]")?.getAttribute("data-pane")) }; }, OWNED);
        const s = p.locator('[data-ss8="saved"]');
        await s.locator('button[aria-label="Palette menu"]').click(); await p.waitForTimeout(500);
        const savedItems = await menuItems(p);
        await p.getByRole("menuitem", { name: "Publish" }).click(); await p.waitForTimeout(2500);
        const after = await s.innerText().catch(() => "(gone)");
        const live = await p.evaluate(() => [...document.querySelectorAll('[role="status"],[aria-live],[data-sonner-toast],.action-feedback')].map((n) => n.textContent.trim()).filter(Boolean).slice(0, 6));
        await p.screenshot({ path: resolve(EVID, "menu-u5-after-publish.png") });
        return { B: B.userSlug, browseItems, saveFeedback: saveFeedback.replace(/\s+/g, " ").slice(0, 160), tagged, savedItems, after: after.replace(/\s+/g, " ").slice(0, 200), live, net };
    }));
    // ── PaletteCardMeta U-4: the double-click vote race on the real wire ──
    if (want("vote")) for (const mode of ["natural", "first-delayed-900ms"]) out.push(await cell(b, `META-U4 double-click vote (${mode})`, {}, async (p) => {
        const C = await register();
        const wire = []; const t0 = Date.now();
        if (mode !== "natural") {
            let n = 0;
            await p.route((u) => u.origin === API && /\/vote$/.test(u.pathname), async (route) => {
                const k = ++n; const resp = await route.fetch(); const body = await resp.text();
                wire.push({ k, t: Date.now() - t0, ev: "server-replied", status: resp.status(), body });
                if (k === 1) await new Promise((r) => setTimeout(r, 900));
                wire.push({ k, t: Date.now() - t0, ev: "delivered-to-page" });
                await route.fulfill({ response: resp, body });
            });
        } else {
            let n = 0;
            await p.route((u) => u.origin === API && /\/vote$/.test(u.pathname), async (route) => {
                const k = ++n; wire.push({ k, t: Date.now() - t0, ev: "sent" });
                const resp = await route.fetch(); const body = await resp.text();
                wire.push({ k, t: Date.now() - t0, ev: "server-replied+delivered", status: resp.status(), body });
                await route.fulfill({ response: resp, body });
            });
        }
        await liveBrowse(p, C);
        const v = card(p, OWNED).first().locator('button[aria-label*="votes"]');
        const before = await v.getAttribute("aria-label");
        await v.dblclick(); await p.waitForTimeout(2500);
        const ui = { label: await v.getAttribute("aria-label"), filled: await v.locator("svg").getAttribute("class") };
        const srv = await (await fetch(`${API}/palettes/${OWNED_SLUG}`, { headers: { "X-Session-Token": C.token } })).json();
        return { voter: C.userSlug, before, ui, server: { voted: srv.voted, voteCount: srv.voteCount }, wire };
    }));
    // ── PaletteCardMenu U-9: `d` typeahead + Space on the owned menu, delay sweep (DELETE intercepted) ──
    if (want("sweep")) out.push(await cell(b, "MENU-U9 typeahead-d + Space destruction sweep", {}, async (p) => {
        const dels = [];
        await p.route((u) => u.origin === API && u.pathname.startsWith("/palettes/"), async (route) => {
            if (route.request().method() === "DELETE") { dels.push(route.request().url()); return route.fulfill({ status: 200, contentType: "application/json", body: "{}" }); }
            return route.fallback();
        });
        await liveBrowse(p, A);
        const rows = [];
        for (const delay of [0, 100, 300, 600, 1000]) {
            const n0 = dels.length;
            const c = card(p, OWNED).first();
            if (!(await c.count())) { await p.reload(); await card(p, OWNED).first().waitFor({ timeout: 60000 }); await p.waitForTimeout(1000); }
            await card(p, OWNED).first().locator('button[aria-label="Palette menu"]').click(); await p.waitForTimeout(500);
            await p.keyboard.type("d"); await p.waitForTimeout(delay);
            const focused = await p.evaluate(() => document.activeElement?.textContent.trim().slice(0, 20));
            await p.keyboard.press("Space"); await p.waitForTimeout(800);
            const dialog = await p.evaluate(() => [...document.querySelectorAll('[role="alertdialog"],[role="dialog"]')].map((d) => d.textContent.replace(/\s+/g, " ").trim().slice(0, 90)));
            rows.push({ delay, focusedAfterD: focused, deleteRequests: dels.length - n0, dialog, cardStill: await card(p, OWNED).count() });
            await p.keyboard.press("Escape"); await p.waitForTimeout(300); await p.keyboard.press("Escape"); await p.waitForTimeout(300);
        }
        return { rows };
    }));
    console.error("cells done:", only.join(","));
    save(`run-b12-${only.join("+")}.json`, out);
} finally { await b.close(); }
console.log(JSON.stringify(out, null, 1).slice(0, 7000));
