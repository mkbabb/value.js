// CHALLENGE-C re-deploy — CONTROLS for probe-C2-implementation.mjs.
//   node docs/.../AdminUsersPanel/probe-C2b-controls.mjs
//
// K2a single click on the confirm button  → must be exactly ONE request
// K2b double click on the PRUNE confirm   → how many POST prune-empty
// K2c is the dialog still on screen at the instant of the second click?
// K3  control for N3: collapse + re-expand DOES fetch the new generation
//     (proves the server truth really changed, so N3 is staleness not caching)

import { chromium, webkit } from "@playwright/test";
import { writeFileSync } from "node:fs";

const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AdminUsersPanel";
const NOW = "2026-07-05T00:00:00.000Z";
const mkUser = (slug, paletteCount) => ({ slug, createdAt: NOW, status: "active", paletteCount });
const PAL = (slug, name) => ({
    slug, name, colors: ["#ff0000", "#00ff00"], userSlug: "x",
    createdAt: NOW, updatedAt: NOW, tier: "standard", visibility: "public", tags: [],
});
const J = (o) => JSON.stringify(o);
const json = (body, status = 200) => ({ status, contentType: "application/json", body: J(body) });

let paletteGen = 1;
const handler = (r) => {
    const u = new URL(r.request().url());
    const req = r.request();
    if (u.pathname === "/admin/users") {
        return r.fulfill(json({
            data: [mkUser("alpha-keeper-0001", 2), mkUser("empty-ghost-0002", 0), mkUser("empty-ghost-0003", 0)],
            total: 3, limit: 50, offset: 0,
        }));
    }
    if (/\/palettes$/.test(u.pathname)) {
        const who = decodeURIComponent(u.pathname.split("/")[3]);
        return r.fulfill(json([PAL(`${who}-p-1`, `${who.toUpperCase()}-GEN-${paletteGen}`)]));
    }
    if (req.method() === "DELETE") return r.fulfill(json({ deleted: true }));
    if (req.method() === "POST" && u.pathname.includes("prune")) return r.fulfill(json({ pruned: 2 }));
    return r.fulfill(json({}));
};

async function withPage(engine, fn) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "probe"));
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
    await page.route((u) => { try { return new URL(u).pathname.startsWith("/admin/"); } catch { return false; } }, handler);
    await page.route((u) => /api\.color\.babb\.dev/.test(u), (r) => r.fulfill(json({ data: [], total: 0 })));
    await page.goto("http://localhost:9000/#/admin/users", { waitUntil: "load" });
    await page.waitForTimeout(3500);
    const out = await fn(page, api);
    await browser.close();
    return out;
}

const results = {};
for (const [name, engine] of [["chromium", chromium], ["webkit", webkit]]) {
    const R = {};

    // K2a — single click control
    R.K2a_singleClickDeleteUser = await withPage(engine, async (page, api) => {
        await page.locator('button[aria-label="Delete user alpha-keeper-0001"]').click();
        await page.waitForTimeout(600);
        const btn = page.locator('[role="dialog"] button', { hasText: "Delete user" }).last();
        const b = await btn.boundingBox();
        await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
        await page.waitForTimeout(1500);
        return { deletes: api.filter((x) => x.startsWith("DELETE")) };
    });

    // K2b — double click on the PRUNE confirm + dialog presence at click 2
    R.K2b_doubleClickPrune = await withPage(engine, async (page, api) => {
        await page.locator("button", { hasText: "Prune empty" }).click();
        await page.waitForTimeout(600);
        const btn = page.locator('[role="dialog"] button', { hasText: "Prune" }).last();
        const b = await btn.boundingBox();
        await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
        await page.waitForTimeout(30);
        const atSecondClick = await page.evaluate(([x, y]) => {
            const el = document.elementFromPoint(x, y);
            return {
                dialogPresent: !!document.querySelector('[role="dialog"]'),
                elementUnderCursor: el ? `${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]}` : null,
                elementText: el?.closest("button")?.textContent.trim().slice(0, 24) ?? null,
            };
        }, [b.x + b.width / 2, b.y + b.height / 2]);
        await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2).catch(() => {});
        await page.waitForTimeout(1800);
        const beat = await page.evaluate(() =>
            [...document.querySelectorAll("span")].map((s) => s.textContent.trim())
                .find((t) => /^Pruned|^No empty users/.test(t)) ?? null);
        return { prunePosts: api.filter((x) => x.includes("prune")), atSecondClick, beat };
    });

    // K3 — control: collapse + re-expand DOES pull the new generation
    R.K3_reexpandControl = await withPage(engine, async (page, api) => {
        paletteGen = 1;
        const row = page.locator('[role="button"][aria-expanded]').filter({ hasText: "alpha" }).first();
        await row.click();
        await page.waitForTimeout(900);
        const first = await page.evaluate(() => (document.querySelector("main") ?? document.body).innerText.replace(/\s+/g, " "));
        paletteGen = 2;
        await page.locator("button", { hasText: "Refresh" }).click();
        await page.waitForTimeout(1500);
        const afterRefresh = await page.evaluate(() => (document.querySelector("main") ?? document.body).innerText.replace(/\s+/g, " "));
        await row.click(); // collapse
        await page.waitForTimeout(200);
        await row.click(); // re-expand
        await page.waitForTimeout(1200);
        const afterReexpand = await page.evaluate(() => (document.querySelector("main") ?? document.body).innerText.replace(/\s+/g, " "));
        return {
            afterFirstExpand: /GEN-1/.test(first) ? "GEN-1" : /GEN-2/.test(first) ? "GEN-2" : "none",
            afterRefresh: /GEN-1/.test(afterRefresh) ? "GEN-1" : /GEN-2/.test(afterRefresh) ? "GEN-2" : "none",
            afterCollapseReexpand: /GEN-2/.test(afterReexpand) ? "GEN-2" : /GEN-1/.test(afterReexpand) ? "GEN-1" : "none",
            paletteFetches: api.filter((x) => x.includes("/palettes")),
        };
    });

    results[name] = R;
    console.log(`\n===== ${name} =====\n${JSON.stringify(R, null, 1)}`);
}
writeFileSync(`${OUT}/probe-C2b-controls.json`, JSON.stringify(results, null, 1));
console.log(`\nwrote ${OUT}/probe-C2b-controls.json`);
