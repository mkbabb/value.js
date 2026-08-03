import { chromium } from "@playwright/test";
const NOW = "2026-07-05T00:00:00.000Z";
const USERS = [
  { slug: "azure-fox-01", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 4 },
  { slug: "crimson-owl-77", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 1 },
  { slug: "verdant-mole-33", createdAt: NOW, lastSeenAt: NOW, status: "suspended", paletteCount: 0 },
  { slug: "empty-ghost-44", createdAt: NOW, lastSeenAt: NOW, status: "active", paletteCount: 0 },
];
const AUDIT = [{ id: "a1", timestamp: NOW, action: "palette.feature", target: "sunset-riot", ipHash: "ip1" }];
const paginated = (d) => JSON.stringify({ data: d, total: d.length, limit: 50, offset: 0 });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const hits = [];
await page.addInitScript(() => localStorage.setItem("palette-admin-token", "test-admin-token"));
// Catch-all: mock EVERY api.color.babb.dev call so the availability latch never trips.
await page.route("https://api.color.babb.dev/**", (route) => {
  const u = new URL(route.request().url());
  hits.push(route.request().method() + " " + u.pathname);
  const json = (b) => route.fulfill({ status: 200, contentType: "application/json", body: b });
  if (u.pathname === "/sessions") return json('{"token":"t","userSlug":"u"}');
  if (u.pathname.startsWith("/admin/tags")) return json("[]");
  if (u.pathname.startsWith("/admin/audit")) return json(paginated(AUDIT));
  if (u.pathname.startsWith("/admin/users")) return json(paginated(USERS));
  return json(paginated([]));
});
const snap = async (t) => console.log(t, JSON.stringify(await page.evaluate(() => ({
  hash: location.hash.split("?")[0],
  inputs: [...document.querySelectorAll("input")].filter(i => /Search/.test(i.placeholder)).map(i => i.placeholder + "=" + JSON.stringify(i.value)),
  left: document.querySelector(".pane-wrapper--left")?.innerText.replace(/\s+/g," ").trim().slice(0,150),
}))));

// A. leak: type in BROWSE, then walk to the admin console.
await page.goto("http://192.168.1.166:9000/#/browse", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
await page.getByPlaceholder(/Search/).first().fill("azure");
await page.waitForTimeout(700);
await snap("A1 browse after typing 'azure':");
await page.evaluate(() => { location.hash = "#/admin/users"; });
await page.waitForTimeout(2000);
await snap("A2 ARRIVED at admin/users (admin typed NOTHING):");

// B. KeepAlive refetch of the audit log.
await page.evaluate(() => { location.hash = "#/admin/audit"; }); await page.waitForTimeout(1800);
await snap("B1 audit first mount:");
console.log("  audit hits:", hits.filter(h=>h.includes("/admin/audit")).length);
await page.evaluate(() => { location.hash = "#/admin/tags"; }); await page.waitForTimeout(1400);
await page.evaluate(() => { location.hash = "#/admin/audit"; }); await page.waitForTimeout(1800);
await snap("B2 audit re-visited:");
console.log("  audit hits after return:", hits.filter(h=>h.includes("/admin/audit")).length);
console.log("ALL:", JSON.stringify(hits));
await browser.close();
