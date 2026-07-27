// CHALLENGE-C re-deploy — quantify the double-fire window + capture witnesses.
//   node docs/.../AdminUsersPanel/probe-C2c-window.mjs
// W1 how long does the confirm button stay hit-testable after onConfirm()?
// W2 witness frames: no-token "roster clear" lie; search false-negative.

import { chromium, webkit } from "@playwright/test";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminUsersPanel";
const FRAMES = `${OUT}/frames-C2`;
mkdirSync(FRAMES, { recursive: true });
const NOW = "2026-07-05T00:00:00.000Z";
const mkUser = (slug, paletteCount) => ({ slug, createdAt: NOW, status: "active", paletteCount });
const J = (o) => JSON.stringify(o);
const json = (b, s = 200) => ({ status: s, contentType: "application/json", body: J(b) });

const BIG = [
    ...Array.from({ length: 50 }, (_, i) => mkUser(`page-one-user-${String(i).padStart(4, "0")}`, i % 7)),
    ...Array.from({ length: 10 }, (_, i) => mkUser(`zed-offpage-user-${String(i).padStart(4, "0")}`, 3)),
];

async function boot(engine, { token = "probe", users, viewport = { width: 1440, height: 900 } } = {}) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
    await ctx.addInitScript(([t]) => {
        if (t) localStorage.setItem("palette-admin-token", t);
        else localStorage.removeItem("palette-admin-token");
    }, [token]);
    const page = await ctx.newPage();
    const api = [];
    page.on("request", (r) => {
        const p = new URL(r.url()).pathname;
        if (p.startsWith("/admin/") && !p.startsWith("/@fs")) api.push(`${r.method()} ${p}`);
    });
    await page.route(/transport\/client\.ts/, async (r) => {
        const res = await r.fetch();
        let t = await res.text();
        t = t.replace(/"https:\/\/api\.color\.babb\.dev"/g, '"http://localhost:9000"');
        await r.fulfill({ status: 200, headers: { "content-type": "application/javascript" }, body: t });
    });
    await page.route((u) => { try { return new URL(u).pathname.startsWith("/admin/"); } catch { return false; } }, (r) => {
        const u = new URL(r.request().url());
        const req = r.request();
        if (u.pathname === "/admin/users") {
            const off = Number(u.searchParams.get("offset") ?? 0);
            const lim = Number(u.searchParams.get("limit") ?? 50);
            return r.fulfill(json({ data: users.slice(off, off + lim), total: users.length, limit: lim, offset: off }));
        }
        if (req.method() === "POST" && u.pathname.includes("prune")) return r.fulfill(json({ pruned: 2 }));
        if (req.method() === "DELETE") return r.fulfill(json({ deleted: true }));
        return r.fulfill(json([]));
    });
    await page.route((u) => /api\.color\.babb\.dev/.test(u), (r) => r.fulfill(json({ data: [], total: 0 })));
    await page.goto("http://localhost:9000/#/admin/users", { waitUntil: "load" });
    await page.waitForTimeout(3500);
    return { browser, page, api };
}

const results = {};
for (const [name, engine] of [["chromium", chromium], ["webkit", webkit]]) {
    const R = {};

    // W1 — hit-test the confirm button's centre every 20 ms after the click
    {
        const { browser, page, api } = await boot(engine, {
            users: [mkUser("alpha-keeper-0001", 2), mkUser("empty-ghost-0002", 0), mkUser("empty-ghost-0003", 0)],
        });
        await page.locator("button", { hasText: "Prune empty" }).click();
        await page.waitForTimeout(600);
        const btn = page.locator('[role="dialog"] button', { hasText: "Prune" }).last();
        const b = await btn.boundingBox();
        const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
        await page.mouse.click(cx, cy);
        const t0 = Date.now();
        const samples = [];
        for (let i = 0; i < 40; i++) {
            const s = await page.evaluate(([x, y]) => {
                const el = document.elementFromPoint(x, y);
                const btn = el?.closest("button");
                return {
                    dialog: !!document.querySelector('[role="dialog"]'),
                    live: !!btn && /Prune/.test(btn.textContent) && !btn.disabled,
                };
            }, [cx, cy]);
            samples.push({ t: Date.now() - t0, ...s });
            if (!s.live && samples.length > 3) break;
            await page.waitForTimeout(20);
        }
        const lastLive = [...samples].reverse().find((s) => s.live);
        R.W1_confirmLiveWindowMs = {
            samplesTaken: samples.length,
            lastLiveAtMs: lastLive ? lastLive.t : null,
            firstDeadAtMs: samples.find((s) => !s.live)?.t ?? null,
            trace: samples.slice(0, 14),
            prunePosts: api.filter((x) => x.includes("prune")),
        };
        await browser.close();
    }

    // W2a — no-token witness
    {
        const { browser, page } = await boot(engine, { token: null, users: [] });
        await page.locator("main").screenshot({ path: `${FRAMES}/N5-${name}-no-token-roster-clear.png` }).catch(() => {});
        R.W2a_noTokenFrame = `frames-C2/N5-${name}-no-token-roster-clear.png`;
        await browser.close();
    }

    // W2b — search false-negative witness
    {
        const { browser, page, api } = await boot(engine, { users: BIG });
        await page.locator('input[placeholder="Search users..."]').fill("zed-offpage");
        await page.waitForTimeout(900);
        await page.locator("main").screenshot({ path: `${FRAMES}/N4-${name}-search-false-negative.png` }).catch(() => {});
        R.W2b_search = {
            frame: `frames-C2/N4-${name}-search-false-negative.png`,
            listRequests: api.filter((x) => x.startsWith("GET /admin/users")),
            visible: await page.evaluate(() => (document.querySelector("main") ?? document.body).innerText.replace(/\s+/g, " ").slice(0, 200)),
        };
        await browser.close();
    }

    results[name] = R;
    console.log(`\n===== ${name} =====\n${JSON.stringify(R, null, 1)}`);
}
writeFileSync(`${OUT}/probe-C2c-window.json`, JSON.stringify(results, null, 1));
console.log(`\nwrote ${OUT}/probe-C2c-window.json`);
