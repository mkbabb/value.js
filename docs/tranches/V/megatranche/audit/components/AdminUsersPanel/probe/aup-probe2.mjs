import { chromium, webkit } from "playwright";
const ENGINE = process.argv[2] ?? "chromium";
const ONLY = process.argv[3] ?? "all";
const BASE = "http://localhost:9124";
const NOW = "2026-07-05T00:00:00.000Z";
const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "authorization,content-type", "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS", "access-control-max-age": "0" };
const USERS = [
  { slug: "azure-fox-01", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 4 },
  { slug: "crimson-owl-77", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 1 },
  { slug: "verdant-mole-33", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 0 },
  { slug: "empty-ghost-aa", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 0 },
];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const log = console.log;
async function boot(browser, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "test-admin-token"));
  const page = await ctx.newPage();
  page.on("pageerror", e => log("  [pageerror]", e.message.slice(0,120)));
  await page.route("**/sessions", r => r.fulfill({ status:200, contentType:"application/json", headers:CORS, body: JSON.stringify({token:"t",userSlug:"u"})}));
  await page.route("**/admin/**", async route => {
    const u = new URL(route.request().url()); const m = route.request().method();
    if (!u.pathname.startsWith("/admin/")) return route.continue();
    if (m === "OPTIONS") return route.fulfill({ status: 204, headers: CORS, body: "" });
    const json = (b, s=200) => route.fulfill({status:s, contentType:"application/json", headers:CORS, body:b});
    if (m === "POST" && u.pathname.includes("prune-empty")) return opts.pruneStatus ? json('{"e":1}', opts.pruneStatus) : json(JSON.stringify({pruned:1}));
    if (m === "DELETE") return json(JSON.stringify({deleted:true, palettesDeleted:0}));
    if (/^\/admin\/users\/[^/]+\/palettes$/.test(u.pathname)) return json("[]");
    if (u.pathname === "/admin/users") return json(JSON.stringify({data:USERS,total:4,limit:50,offset:0}));
    return json(JSON.stringify({data:[],total:0,limit:50,offset:0}));
  });
  await page.goto(`${BASE}/#/admin/users`, { waitUntil:"domcontentloaded" });
  await page.waitForSelector("main"); await sleep(2500);
  return { ctx, page };
}
const focusFacts = page => page.evaluate(() => {
  const a = document.activeElement;
  return { tag: a?.tagName, isBody: a === document.body, disabled: a?.hasAttribute?.("disabled") ?? null,
           label: (a?.getAttribute?.("aria-label") || a?.textContent?.trim().slice(0,32) || "") };
});

// F1 · focus restoration after a destructive confirm
async function F1(browser) {
  const { ctx, page } = await boot(browser, {});
  const del = page.locator('button[aria-label="Delete user crimson-owl-77"]');
  log("  F1 delete-btn count:", await del.count());
  await del.first().focus();
  log("  F1 focus before:", JSON.stringify(await focusFacts(page)));
  await del.first().click({ force: true });
  await sleep(600);
  log("  F1 dialog open:", await page.locator('[role="dialog"]').count(), "| focus in dialog:", JSON.stringify(await focusFacts(page)));
  const confirm = page.locator('[role="dialog"] button').filter({ hasText: /Delete user/ });
  await confirm.first().click({ force: true });
  await sleep(1200);
  log("  F1 focus AFTER confirm (row deleted):", JSON.stringify(await focusFacts(page)));
  log("  F1 rows left:", await page.locator('[role="button"][aria-expanded]').count());
  await ctx.close();
}
// F2 · focus after prune confirm (trigger becomes disabled)
async function F2(browser) {
  const { ctx, page } = await boot(browser, { pruneStatus: 500 });
  const prune = page.getByRole("button", { name: /Prune empty/ }).first();
  await prune.focus();
  await prune.click({ force: true });
  await sleep(500);
  await page.getByRole("button", { name: "Prune", exact: true }).last().click({ force: true });
  await sleep(300);
  log("  F2 focus 300ms after prune confirm:", JSON.stringify(await focusFacts(page)));
  await sleep(1200);
  log("  F2 focus 1.5s after prune confirm:", JSON.stringify(await focusFacts(page)));
  await ctx.close();
}
// F3 · prune-result timer stacking (second banner truncated by the first timer)
async function F3(browser) {
  const { ctx, page } = await boot(browser, { pruneStatus: 500 });
  const doPrune = async () => {
    await page.getByRole("button", { name: /Prune empty/ }).first().click({ force: true });
    await sleep(250);
    await page.getByRole("button", { name: "Prune", exact: true }).last().click({ force: true });
  };
  const t0 = Date.now();
  await doPrune();
  const banner = () => page.locator("main").innerText().then(t => /No empty users to prune|Pruned \d/.test(t));
  await sleep(1400);
  log("  F3 banner1 alive at +%dms:", Date.now()-t0, await banner());
  await doPrune();                        // second result at ≈ +2.0s
  const t2 = Date.now();
  log("  F3 banner2 set at +%dms:", t2-t0, await banner());
  await sleep(1300);                      // ≈ +3.3s — first timer (3.0s from banner1) has fired
  log("  F3 banner alive %dms after banner2 (should be <3000 ⇒ true):", Date.now()-t2, await banner());
  await sleep(900);
  log("  F3 banner alive %dms after banner2:", Date.now()-t2, await banner());
  await ctx.close();
}
// F4 · slug pill text integrity (copy + accessible name)
async function F4(browser) {
  const { ctx, page } = await boot(browser, {});
  const facts = await page.evaluate(() => {
    const pill = document.querySelector("main .slug-pill");
    const row = pill?.closest('[role="button"]');
    const sel = window.getSelection(); const r = document.createRange();
    r.selectNodeContents(pill); sel.removeAllRanges(); sel.addRange(r);
    const copied = sel.toString();
    return {
      pillTitle: pill?.getAttribute("title"),
      pillInnerText: pill?.innerText,
      pillTextContent: pill?.textContent,
      selectionToString: copied,
      rowInnerText: row?.innerText.replace(/\n/g, "⏎"),
      childDisplays: [...pill.children].map(c => getComputedStyle(c).display),
      pillDisplay: getComputedStyle(pill).display,
    };
  });
  log("  F4", JSON.stringify(facts, null, 1));
  await ctx.close();
}
// F5 · live regions + nested interactive inside role=button, scoped to the panel
async function F5(browser) {
  const { ctx, page } = await boot(browser, {});
  const facts = await page.evaluate(() => {
    const row = document.querySelector('main [role="button"][aria-expanded]');
    const panel = row?.closest(".grid.gap-3.pb-3") ?? row?.parentElement?.parentElement?.parentElement;
    return {
      panelLiveRegions: panel ? panel.querySelectorAll("[aria-live],[role=status],[role=alert],[role=log]").length : -1,
      panelHTMLHead: panel ? panel.className : null,
      rowsWithNestedButtons: [...document.querySelectorAll('main [role="button"][aria-expanded]')]
        .map(r => r.querySelectorAll("button").length),
      skeletonLabels: [...document.querySelectorAll("main div[aria-label]")].map(d => ({ label: d.getAttribute("aria-label"), role: d.getAttribute("role") })),
      inertRowsInTabOrder: [...document.querySelectorAll("main [tabindex]")].length,
    };
  });
  log("  F5", JSON.stringify(facts));
  await ctx.close();
}
const P = { F1, F2, F3, F4, F5 };
const bt = ENGINE === "webkit" ? webkit : chromium;
const browser = await bt.launch();
for (const [k, fn] of Object.entries(P)) {
  if (ONLY !== "all" && ONLY !== k) continue;
  log(`\n== ${ENGINE} ${k} ==`);
  try { await fn(browser); } catch (e) { log("  !!", e.message.split("\n")[0]); }
}
await browser.close();
