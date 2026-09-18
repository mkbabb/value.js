// CHALLENGE-C · C8 — the roster is capped at one page and labelled as a total.
//
// useAdminUsers.ts:57 `listUsers(token, 50)`; :58 `adminUsers.value = res.data`
// — `res.total` is DISCARDED (the two sibling admin composables consume it:
// useAdminAudit.ts:62, useAdminFlagged.ts:70). AdminPane.vue:31 then feeds
// `totalUsers = pm.adminUsers.value.length` and the panel prints "{{totalUsers}}
// users". Serve 137 total / 50 returned and read what the console claims.
//
//   node docs/…/AdminUsersPanel/probe-impl-c8.mjs

import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const FRAMES = resolve(HERE, "frames-impl");
mkdirSync(FRAMES, { recursive: true });
const ORIGIN = process.env.PROBE_ORIGIN ?? "http://localhost:9077";

const TOTAL = 137;
const PAGE = Array.from({ length: 50 }, (_, i) => ({
    slug: `user-${String(i).padStart(4, "0")}`,
    createdAt: "2026-07-01T10:00:00Z",
    status: "active",
    paletteCount: i % 5 === 0 ? 0 : 3, // 10 empty on page 1
}));
const EMPTY_ON_PAGE1 = PAGE.filter((u) => !u.paletteCount).length;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
await ctx.addInitScript(`localStorage.setItem('vueuse-color-scheme','light');localStorage.setItem('palette-admin-token','T');`);
const listRequests = [];
await ctx.route("**/admin/users?**", (r) => {
    listRequests.push(r.request().url());
    r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: PAGE, total: TOTAL, limit: 50, offset: 0 }) });
});
await ctx.route("**/admin/users/*/palettes", (r) => r.fulfill({ status: 200, contentType: "application/json", body: "[]" }));
const page = await ctx.newPage();
await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);

const read = await page.evaluate(() => {
    const main = document.querySelector("main");
    const t = (main?.innerText || "").replace(/\s+/g, " ").trim();
    return {
        countLine: (t.match(/(\d+) users?/) || [])[0] ?? null,
        emptyLine: (t.match(/·\s*(\d+) empty/) || [])[0] ?? null,
        headerBadge: (document.querySelector("main [data-slot='badge'], main .rounded-full")?.textContent || "").trim(),
        rowsRendered: [...document.querySelectorAll("main .rounded-md.border.border-card-edge.overflow-hidden")].length,
        paginationControls: [...document.querySelectorAll("main button")]
            .map((b) => (b.getAttribute("aria-label") || b.textContent || "").trim())
            .filter((s) => /next|prev|page|more|›|‹/i.test(s)),
        head: t.slice(0, 120),
    };
});

// what the prune confirm promises against a 137-user roster
await page.getByRole("button", { name: /Prune empty/ }).first().click();
await page.waitForTimeout(700);
const dialog = await page.evaluate(() =>
    (document.querySelector('[role="dialog"],[role="alertdialog"]')?.innerText || "").replace(/\s+/g, " ").trim());
await page.screenshot({ path: resolve(FRAMES, "C8-pagination-and-prune.png") });

const out = {
    serverTotal: TOTAL, returned: PAGE.length, emptyOnPage1: EMPTY_ON_PAGE1,
    listRequests, read, pruneDialog: dialog,
    VERDICT: {
        claimsTotal: read.countLine,
        actualTotal: `${TOTAL} users`,
        pagingOffered: read.paginationControls.length,
        unreachableUsers: TOTAL - PAGE.length,
    },
};
writeFileSync(resolve(HERE, "probe-impl-c8.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
