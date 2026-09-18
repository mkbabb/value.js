// CHALLENGE-C · C9 — the prune receipt is destroyed with the component.
//
// AdminPane.vue:25-26 mounts the panel behind `v-if="subView === 'admin-users'"`,
// so leaving the Users sub-view UNMOUNTS it. The prune result is delivered
// imperatively through the instance handle (usePalettePorts.ts:123
// `admin.adminUsersPanelRef.value?.onPruneDone(pruned)`) into script-setup
// state (`pruning`, `pruneResult`). Leave the sub-view while a prune is in
// flight and the `?.` swallows the only receipt the operator ever gets.
//
//   node docs/…/AdminUsersPanel/probe-impl-c9.mjs

import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const FRAMES = resolve(HERE, "frames-impl");
mkdirSync(FRAMES, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9077";

const USERS = [
    { slug: "keeper-alpha-0001", createdAt: "2026-07-01T10:00:00Z", status: "active", paletteCount: 4 },
    { slug: "ghost-gamma-0003", createdAt: "2026-06-02T10:00:00Z", status: "active", paletteCount: 0 },
    { slug: "ghost-delta-0004", createdAt: "2026-06-03T10:00:00Z", status: "active", paletteCount: 0 },
];

const browser = await chromium.launch();
const out = {};

for (const scenario of ["stay", "leave-and-return"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    await ctx.addInitScript(`localStorage.setItem('vueuse-color-scheme','light');localStorage.setItem('palette-admin-token','T');`);
    await ctx.route("**/admin/users?**", (r) =>
        r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: 3, limit: 50, offset: 0 }) }));
    await ctx.route("**/admin/queue**", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }) }));
    await ctx.route("**/admin/approved**", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }) }));
    let pruneCalled = 0;
    await ctx.route("**/admin/users/prune-empty", async (r) => {
        pruneCalled++;
        await new Promise((res) => setTimeout(res, 1500)); // in-flight window
        r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ pruned: 2 }) });
    });
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);

    await page.getByRole("button", { name: /Prune empty/ }).first().click();
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: /^Prune$/ }).last().click();
    await page.waitForTimeout(200);          // prune in flight (1500ms)

    if (scenario === "leave-and-return") {
        await page.evaluate(() => { location.hash = "#/admin/names"; });
        await page.waitForTimeout(1800);     // prune resolves while unmounted
        await page.evaluate(() => { location.hash = "#/admin/users"; });
        await page.waitForTimeout(1500);
    } else {
        await page.waitForTimeout(1800);
    }

    const read = await page.evaluate(() => {
        const t = (document.querySelector("main")?.innerText || "").replace(/\s+/g, " ").trim();
        return {
            receipt: ((t.match(/(Pruned \d+ users?|No empty users to prune)/) || [])[0]) ?? null,
            countLine: (t.match(/(\d+) users?/) || [])[0] ?? null,
            pruneBtnDisabled: [...document.querySelectorAll("main button")]
                .filter((b) => /Prune empty/.test(b.textContent || "")).map((b) => b.disabled)[0] ?? null,
            head: t.slice(0, 130),
        };
    });
    await page.screenshot({ path: resolve(FRAMES, `C9-${scenario}.png`) });
    out[scenario] = { pruneCalled, ...read };
    await ctx.close();
}

out.VERDICT = {
    receiptWhenStaying: out.stay.receipt,
    receiptWhenLeaving: out["leave-and-return"].receipt,
    RECEIPT_LOST: out.stay.receipt !== null && out["leave-and-return"].receipt === null,
};
writeFileSync(resolve(HERE, "probe-impl-c9.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
