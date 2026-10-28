// SERVED MODEL: claude-opus-5-5 — SS-8 B06 P4: L:L-21 deep-link cold-load redirect (item 0170).
// Repro verbatim from DEFECT-LEDGER:48328 — about:blank, goto /#/blob (or /#/atmosphere), poll
// location.hash every 200ms for ~3s. One Chromium; a NEW context per cold load (24 cells: anon + admin-token).
import { chromium } from "playwright";
import { BASE, writeJson } from "./lib.mjs";

const out = { probe: "p4-deeplink", at: new Date().toISOString(), loads: [] };
const browser = await chromium.launch();
try {
  for (const auth of ["anon", "admin"]) for (const route of ["#/blob", "#/atmosphere"]) for (let i = 0; i < 6; i++) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
      if (auth === "admin") {
        await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "test-admin-token"));
        await ctx.route("**/admin/**", (r) => new URL(r.request().url()).pathname.startsWith("/admin/") ? r.fulfill({ status: 200, contentType: "application/json", body: r.request().url().includes("/admin/tags") ? "[]" : JSON.stringify({ data: [], total: 0, limit: 20, offset: 0 }) }) : r.continue());
      }
      const page = await ctx.newPage();
      await page.goto("about:blank");
      const t0 = Date.now();
      await page.goto(`${BASE}/${route}`, { waitUntil: "commit", timeout: 90000 });
      const seen = [];
      await page.locator(".glass-dock").first().waitFor({ state: "visible", timeout: 90000 }).catch(() => {});
      const tBoot = Date.now() - t0;
      for (let k = 0; k < 16; k++) { seen.push(await page.evaluate(() => location.hash)); await page.waitForTimeout(200); }
      const uniq = [...new Set(seen)];
      const final = seen[seen.length - 1];
      out.loads.push({ auth, route, i, bootMs: tBoot, final, kept: final.startsWith(route), trail: uniq });
    } finally { await ctx.close(); }
  }
} finally {
  await browser.close();
  out.summary = Object.fromEntries(["anon", "admin"].flatMap((a) => ["#/blob", "#/atmosphere"].map((r) => [`${a} ${r}`, `${out.loads.filter((l) => l.auth === a && l.route === r && !l.kept).length}/6 lost -> ${[...new Set(out.loads.filter((l) => l.auth === a && l.route === r).map((l) => l.final))].join(",")}`])));
  writeJson("p4-deeplink.json", out);
  console.log(JSON.stringify(out, null, 1).slice(0, 5000));
}
