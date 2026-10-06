// SERVED MODEL: claude-opus-5-5
// X.W12U.s3 · /admin/audit + /admin/flagged falsifier (:9000), one arm per row:
//   424  every audit row says who acted (the actor slug the wire carries)
//   425  an inert audit row does not light up on hover
//   428  audit Refresh is busy (disabled) while its read runs, and absent beside the error plate's Retry
//   641  a first audit load is ONE status region, and the list is aria-busy while it loads
//   638  a filtered-zero audit plate offers "Clear filters", and no "0 entries" count repeats the plate
//   645  flagged Refresh: busy while its read runs, absent beside the error plate's Retry
//   646  a deleted-palette flagged row keeps the name column's left edge
//   649  Dismiss and the pager caption are not italic display type
//   644  the dismiss verdict names the palette as its row does (quoted name), as the delete verdict does
// Usage: node probe-admin-ledgers.mjs <w> <h> [theme]
import { chromium } from "@playwright/test";
import { prepare, NOW } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = [];
const push = (ok, id, v) => out.push(`${ok ? "PASS" : "RED "} ${id} ${typeof v === "string" ? v : JSON.stringify(v)}`);
const json = (r, body, status = 200) => r.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
const AUDIT = Array.from({ length: 30 }, (_, i) => ({ id: `a${i}`, timestamp: NOW, action: "palette.feature", target: `target-${i}`, actorSlug: i % 2 ? "admin-owl-7" : "admin-fox-3" }));
async function open(route, extra) {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, admin: true });
    if (extra) await extra(ctx);
    const p = await ctx.newPage();
    await p.goto(`http://localhost:9000/#${route}`, { timeout: 90000 });
    return [ctx, p];
}
{ // audit: slow first read (641), then rows (424, 425), then a held refresh (428)
    let hold = 6000; // the first read is held long enough to sample the loading state on a cold page
    const [ctx, p] = await open("/admin/audit", (c) => c.route(/\/admin\/audit/, async (r) => {
        const u = new URL(r.request().url());
        const hit = (u.searchParams.get("action") ?? "") === "zzz";
        await new Promise((res) => setTimeout(res, hold));
        return json(r, { data: hit ? [] : AUDIT.slice(0, 20), total: hit ? 0 : AUDIT.length, limit: 20, offset: 0 });
    }));
    await p.getByRole("textbox", { name: "Filter by action" }).waitFor({ timeout: 30000 });
    await p.waitForTimeout(500);
    // the panel = the card body's first child (the list host); the shell's route announcer is outside it
    const load = await p.evaluate(() => { const panel = [...document.querySelectorAll("main .grid")].find((g) => g.querySelector('[aria-label="Filter by action"]'));
        const st = panel ? [...panel.querySelectorAll('[role="status"]')] : [];
        return { status: st.length, busy: panel?.getAttribute("aria-busy") === "true", labels: st.map((e) => e.getAttribute("aria-label") ?? e.textContent.trim().slice(0, 40)) }; });
    push(load.status === 1 && load.busy, "641", load);
    await p.waitForSelector("[data-audit-actor]", { timeout: 20000 }).catch(() => {});
    await p.waitForTimeout(500);
    const rows = await p.evaluate(() => [...document.querySelectorAll("[data-audit-actor]")].map((e) => e.textContent.trim()));
    push(rows.length === 20 && rows.every((t) => /admin-(owl|fox)/.test(t)), "424", { n: rows.length, first: rows[0] ?? null });
    const row = p.locator("main .border-card-edge").filter({ hasText: "target-3" }).first();
    const bg0 = await row.evaluate((e) => getComputedStyle(e).backgroundColor);
    await row.hover(); await p.waitForTimeout(400);
    const bg1 = await row.evaluate((e) => getComputedStyle(e).backgroundColor);
    push(bg0 === bg1, "425", { rest: bg0, hover: bg1 });
    hold = 3000;
    await p.getByRole("button", { name: "Refresh audit log" }).click();
    await p.waitForTimeout(600);
    const busy = await p.getByRole("button", { name: "Refresh audit log" }).isDisabled();
    push(busy, "428-busy", { disabledWhileReading: busy });
    await p.waitForTimeout(3000);
    hold = 0;
    await p.getByRole("textbox", { name: "Filter by action" }).fill("zzz");
    await p.waitForTimeout(1500);
    const f = await p.evaluate(() => ({ clear: [...document.querySelectorAll("main button")].some((x) => x.innerText.trim() === "Clear filters"), count: /\b0 entries\b/.test(document.querySelector("main").innerText) }));
    push(f.clear && !f.count, "638", f);
    await ctx.close();
}
{ // audit error: Refresh stands down beside Retry
    const [ctx, p] = await open("/admin/audit", (c) => c.route(/\/admin\/audit/, (r) => json(r, { error: "boom" }, 500)));
    await p.waitForTimeout(3000);
    const n = await p.getByRole("button", { name: "Refresh audit log" }).count();
    push(n === 0, "428-error", { refreshBesideRetry: n });
    await ctx.close();
}
{ // flagged: a deleted palette (null) among full rows; held refresh; pager caption; Dismiss type
    let hold = 0;
    const [ctx, p] = await open("/admin/flagged", (c) => c.route(/\/admin\/flagged/, async (r) => {
        await new Promise((res) => setTimeout(res, hold));
        const data = Array.from({ length: 20 }, (_, i) => ({ paletteSlug: `flag-${i}`, flagCount: 1,
            palette: i === 1 ? null : { name: `Flagged ${i}`, slug: `flag-${i}`, userSlug: `user-${i}-fox`, colors: ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed"].slice(0, 2 + (i % 4)).map((css, position) => ({ css, position })), tags: [], createdAt: NOW, updatedAt: NOW },
            flags: [{ reporterSlug: "azure-fox-01", reason: "spam", createdAt: NOW }] }));
        return json(r, { data, total: 47, limit: 20, offset: 0 });
    }));
    await p.waitForTimeout(3000);
    const edges = await p.evaluate(() => [...document.querySelectorAll("main .border-card-edge .flex-col > span:first-child")].map((e) => Math.round(e.getBoundingClientRect().left)));
    push(edges.length >= 20 && new Set(edges).size === 1, "646", { distinctLeftEdges: [...new Set(edges)] });
    const type = await p.evaluate(() => {
        const d = [...document.querySelectorAll("main button")].find((x) => x.innerText.trim() === "Dismiss");
        const cap = [...document.querySelectorAll("main span")].find((x) => /^Page \d+ of \d+$/.test(x.innerText.trim()));
        const f = (e) => e ? { style: getComputedStyle(e).fontStyle, family: getComputedStyle(e).fontFamily.split(",")[0] } : null;
        return { dismiss: f(d), pager: f(cap) };
    });
    const plain = (t) => t && t.style === "normal" && !/fraunces/i.test(t.family);
    push(plain(type.dismiss), "649-dismiss", type.dismiss);
    push(plain(type.pager), "649-pager", type.pager);
    await p.getByRole("button", { name: "Dismiss reports on Flagged 0" }).click();
    await p.waitForTimeout(1200);
    const verdict = await p.evaluate(() => document.querySelector('[data-admin-notice="flagged"]')?.textContent.replace(/\s+/g, " ").trim() ?? "");
    push(/Dismissed the reports on “Flagged 0”/.test(verdict), "644", verdict);
    hold = 3000;
    await p.getByRole("button", { name: "Refresh flagged palettes" }).click();
    await p.waitForTimeout(600);
    const busy = await p.getByRole("button", { name: "Refresh flagged palettes" }).isDisabled();
    push(busy, "645-busy", { disabledWhileReading: busy });
    await ctx.close();
}
{
    const [ctx, p] = await open("/admin/flagged", (c) => c.route(/\/admin\/flagged/, (r) => json(r, { error: "boom" }, 500)));
    await p.waitForTimeout(3000);
    const n = await p.getByRole("button", { name: "Refresh flagged palettes" }).count();
    push(n === 0, "645-error", { refreshBesideRetry: n });
    await ctx.close();
}
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
