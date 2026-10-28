// SS-8 B16 — SS8-0458 (MigratePalettesDialog L-1): drive the ADMIN branch of the slug field (the only site
// A-1 named as unhandled) with the token check mocked 200; collect page errors and the landing view.
// Headless Chromium, one browser, one context; every API write is answered by the mock (lib.mjs).
import { chromium, newCell, mockApi, save, APP } from "./lib.mjs";
const out = {};
const b = await chromium.launch({ headless: true });
try {
  const { ctx, page, errs } = await newCell(b, {});
  try {
    const api = []; await mockApi(ctx, { log: api });
    // Registered after mockApi, so it is consulted first: every /admin/* read answers 200 (the token "verifies").
    await ctx.route((u) => /:3000\/admin\/|\/api\/admin\//.test(u.href), (r) => { api.push({ m: r.request().method(), p: new URL(r.request().url()).pathname, mocked: "admin" }); return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) }); });
    await page.goto(APP + "#/browse", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(5000);
    await page.getByRole("button", { name: "Profile" }).click(); await page.waitForTimeout(600);
    await page.getByRole("menuitem", { name: /^(Switch account|Login)$/ }).first().click(); await page.waitForTimeout(900);
    out.hashBefore = await page.evaluate(() => location.hash);
    await page.locator('input[aria-label="Slug or admin token"]').fill("ss8-not-a-slug-admin-token");
    await page.keyboard.press("Enter"); await page.waitForTimeout(3000);
    out.after = await page.evaluate(() => ({ hash: location.hash, slugLS: localStorage.getItem("palette-user-slug"), lsKeys: Object.keys(localStorage) }));
    out.api = api.filter((x) => /admin|session/.test(x.p)).slice(0, 12);
    out.errs = errs.slice(0, 8);
  } catch (e) { out.error = String(e).slice(0, 400); } finally { await ctx.close(); }
} finally { await b.close(); save("l1-admin.json", out); }
console.log(JSON.stringify(out, null, 1).slice(0, 2500));
