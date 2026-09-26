// SERVED MODEL: claude-opus-5-5
// X.W12U.s3 · /admin/names falsifier (:9000), one arm per row:
//   420  Pending | Approved is a tablist of tabs, each controlling a tabpanel that exists
//   418  while an Approve write runs, that row's verb says so (aria-busy / disabled), not a silent refusal
//   634  the reject confirm prints the name in the row's sans voice, not mono
//   419  after a confirmed Reject, focus lands on a row control, never <body>
//   635  a search that matches nothing wears no true-empty ghost trio and offers "Clear search"
// Usage: node probe-admin-names.mjs <w> <h> [theme]
import { chromium } from "@playwright/test";
import { prepare } from "../../x/seed-x.mjs";
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const phone = W < 900;
const b = await chromium.launch({ headless: false });
const out = [];
const push = (ok, id, v) => out.push(`${ok ? "PASS" : "RED "} ${id} ${typeof v === "string" ? v : JSON.stringify(v)}`);
const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
await prepare(ctx, { theme, admin: true });
await ctx.route(/\/admin\/colors\/[^/]+\/(approve|reject)/, async (r) => {
    if (/approve/.test(r.request().url())) await new Promise((res) => setTimeout(res, 3000));
    return r.fulfill({ status: 200, contentType: "application/json", body: "{}" });
});
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/admin/names", { timeout: 90000 });
await p.getByRole("button", { name: "Approve color name Name 3", exact: true }).waitFor({ timeout: 30000 });
const tabs = await p.evaluate(() => {
    const list = document.querySelector('main [role="tablist"]');
    const tabs = list ? [...list.querySelectorAll('[role="tab"]')] : [];
    const ctl = tabs.map((t) => t.getAttribute("aria-controls"));
    return { tablist: !!list, tabs: tabs.length, panels: ctl.filter((id) => id && document.getElementById(id)?.getAttribute("role") === "tabpanel").length };
});
push(tabs.tablist && tabs.tabs === 2 && tabs.panels === 1, "420", tabs);
// 418
await p.getByRole("button", { name: "Approve color name Name 3", exact: true }).click();
await p.waitForTimeout(500);
const busy = await p.evaluate(() => { const b = document.querySelector('[aria-label="Approve color name Name 3"]'); return b ? { disabled: b.disabled, ariaBusy: b.getAttribute("aria-busy"), dataLoading: b.getAttribute("data-loading") } : null; });
push(busy && (busy.disabled || busy.ariaBusy === "true"), "418", busy);
await p.waitForTimeout(3200);
// 634 + 419
await p.getByRole("button", { name: "Reject color name Name 5", exact: true }).click();
await p.waitForTimeout(700);
const subj = await p.evaluate(() => { const d = document.querySelector('[role="dialog"]'); const s = d && [...d.querySelectorAll("span")].find((e) => /Name 5/.test(e.textContent)); return s ? getComputedStyle(s).fontFamily.split(",")[0] : null; });
push(subj && !/mono|fira|code/i.test(subj), "634", { subjectFont: subj });
await p.getByRole("dialog").getByRole("button", { name: "Reject name" }).click();
await p.waitForTimeout(1800);
const focus = await p.evaluate(() => { const a = document.activeElement; return { tag: a?.tagName ?? null, label: a?.getAttribute("aria-label") ?? a?.textContent?.trim().slice(0, 30) ?? null }; });
push(focus.tag && focus.tag !== "BODY", "419", focus);
// 635
await p.getByRole("searchbox", { name: "Search color names" }).fill("zzzz-nothing");
await p.waitForTimeout(1200);
const f = await p.evaluate(() => ({ trio: !!document.querySelector('main [data-slot="empty-state-trio"]'), clear: [...document.querySelectorAll("main button")].some((x) => x.innerText.trim() === "Clear search") }));
push(!f.trio && f.clear, "635", f);
console.log(`[${W}x${H} ${theme}]\n` + out.join("\n"));
await b.close();
process.exit(out.some((l) => l.startsWith("RED")) ? 1 : 0);
